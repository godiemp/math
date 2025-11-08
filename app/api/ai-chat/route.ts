import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
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

    // Build rich context for the AI
    let contextInfo = `**Contexto de la pregunta:**

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

    // System context as first user message
    conversationMessages.push({
      role: 'user',
      content: contextInfo
    });

    // Add conversation history
    if (messages && messages.length > 0) {
      messages.forEach((msg: any) => {
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

    const systemPrompt = `Eres un tutor de matemáticas empático, paciente y muy educativo para estudiantes chilenos preparándose para la PAES.

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
- NO repitas el contexto que ya te di, el estudiante ya lo sabe
- Enfócate en responder su pregunta específica
- Sé conciso pero completo (2-4 párrafos idealmente)
- Si preguntan "¿por qué?" o "¿cómo?", profundiza más
- Si dicen algo como "no entiendo", pide que sean más específicos

Responde de manera conversacional, como si estuvieras chateando.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
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
