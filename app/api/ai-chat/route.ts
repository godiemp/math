import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json(
        {
          error: 'API key no configurada',
          details: 'ANTHROPIC_API_KEY environment variable is not set'
        },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const body = await request.json();
    const {
      question,
      questionLatex,
      userAnswer,
      correctAnswer,
      explanation,
      options,
      topic,
      difficulty,
      visualData,
      messages,
      userMessage
    } = body;

    if (!question || userAnswer === undefined || correctAnswer === undefined || !userMessage) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    const isCorrect = userAnswer === correctAnswer;

    // Build rich context for the AI - this will be included in the system prompt
    let contextInfo = `**CONTEXTO DE LA PREGUNTA (SIEMPRE DISPONIBLE):**

**Pregunta:** ${question}
${questionLatex ? `**LaTeX:** ${questionLatex}` : ''}
**Tema:** ${topic || 'Matemáticas'}
**Dificultad:** ${difficulty || 'media'}

**Opciones:**
${options.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}. ${opt}`).join('\n')}

**Respuesta del estudiante:** Opción ${String.fromCharCode(65 + userAnswer)} - ${options[userAnswer]}
**Respuesta correcta:** Opción ${String.fromCharCode(65 + correctAnswer)} - ${options[correctAnswer]}
**Estado:** ${isCorrect ? 'CORRECTA ✓' : 'INCORRECTA'}

**Explicación oficial:** ${explanation}
`;

    if (visualData && visualData.type === 'geometry') {
      contextInfo += `\n**Nota:** Esta pregunta incluye una figura geométrica que el estudiante puede ver.`;
    }

    // Build conversation history for Claude
    const conversationMessages: Anthropic.MessageParam[] = [];

    // Always use clean conversation history (skip welcome message)
    if (messages && messages.length > 0) {
      messages.forEach((msg: any, index: number) => {
        // Skip the first assistant message (welcome) from history
        if (msg.role === 'assistant' && index === 0) {
          return;
        }

        if (msg.role === 'user' || msg.role === 'assistant') {
          conversationMessages.push({
            role: msg.role,
            content: msg.content
          });
        }
      });
    }

    // Add current user message
    conversationMessages.push({
      role: 'user',
      content: userMessage
    });

    // System prompt with full context embedded
    const systemPrompt = `Eres un tutor de matemáticas empático, paciente y muy educativo para estudiantes chilenos preparándose para la PAES.

${contextInfo}

**Tu personalidad:**
- Hablas de manera casual y cercana, como un amigo que sabe mucho de matemáticas
- Usas lenguaje gen z cuando es apropiado (pero sin forzarlo)
- Eres motivacional sin ser cursi
- Celebras los éxitos genuinamente
- Cuando hay errores, los ves como oportunidades de aprendizaje

**Tu forma de enseñar:**
- Explicas conceptos paso a paso, de manera super clara
- Usas ejemplos concretos y relatable
- Haces preguntas socráticas para guiar el pensamiento
- Adaptas tu explicación al nivel de entendimiento del estudiante
- Si el estudiante pregunta algo específico, vas directo al punto
- Usas emojis sutilmente para mantener el tono amigable (🌱🌿🌸✨)

**Modo Zen:**
El estudiante está en "modo zen" - sin presión de tiempo, enfocado en aprender.
Tu meta es ayudarles a ENTENDER, no solo a saber la respuesta correcta.

**Importante:**
- SIEMPRE tienes acceso al contexto completo de la pregunta arriba (pregunta, opciones, respuesta del estudiante, respuesta correcta)
- NO repitas el enunciado completo de la pregunta, el estudiante ya lo ve en pantalla
- PERO SÍ usa esa información para dar respuestas específicas y personalizadas
- Cuando el estudiante pregunta "¿por qué me equivoqué?", tú YA SABES qué eligió y cuál es la correcta - úsalo!
- Enfócate en responder su pregunta específica con el contexto que tienes
- Sé conciso pero completo (2-4 párrafos idealmente)
- Si preguntan "¿por qué?" o "¿cómo?", profundiza más
- Si dicen algo como "no entiendo", usa el contexto para explicar de manera específica

Responde de manera conversacional, como si estuvieras chateando.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      system: systemPrompt,
      messages: conversationMessages,
    });

    const aiResponse = response.content[0].type === 'text' ? response.content[0].text : '';

    return NextResponse.json({
      response: aiResponse,
      success: true
    });

  } catch (error) {
    console.error('Error calling Claude API:', error);
    return NextResponse.json(
      {
        error: 'Error al obtener respuesta de IA',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
