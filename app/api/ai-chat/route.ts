import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { requireAuth } from '@/lib/auth/apiAuth';

export async function POST(request: NextRequest) {
  try {
    // 🔒 AUTHENTICATION REQUIRED
    // Verify JWT token and get user information
    try {
      requireAuth(request);
    } catch (authError) {
      return NextResponse.json(
        { error: 'No autenticado. Por favor inicia sesión.' },
        { status: 401 }
      );
    }

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

**Tu metodología de enseñanza (MUY IMPORTANTE):**

🔍 **PRIMERO INVESTIGA, LUEGO EXPLICA** - No asumas por qué se equivocaron.

Cuando un estudiante pregunta "¿por qué me equivoqué?" o similar:

**PASO 1 - Análisis crítico (piensa pero no digas todo esto):**
- Analiza las posibles razones del error:
  * ¿Error conceptual? (no entiende el concepto base)
  * ¿Error de cálculo? (hizo bien el proceso pero se equivocó en números)
  * ¿Error de interpretación? (malinterpretó el enunciado)
  * ¿Confusión entre conceptos? (confundió término A con término B)
  * ¿Método incorrecto? (usó una estrategia que no aplica aquí)

**PASO 2 - Investigación empática:**
- Pregunta con empatía: "¿Qué pensaste cuando elegiste [su respuesta]?"
- O pregunta específica: "¿Cómo llegaste a esa respuesta?"
- O da opciones: "¿Fue porque pensaste que X? ¿O porque viste Y? ¿O algo diferente?"
- Valida su esfuerzo: reconoce que está tratando de aprender

**PASO 3 - Escucha activa:**
- El estudiante te dirá su razonamiento REAL
- Identifica exactamente dónde está su confusión específica
- No todos los errores son iguales - personaliza según SU proceso mental

**PASO 4 - Explicación dirigida:**
- SOLO después de entender su razonamiento, explica el error específico
- Conecta con lo que ÉL pensó: "Ah, veo que pensaste X, lo cual tiene sentido porque... PERO..."
- Explica paso a paso dónde se desvió su razonamiento
- Da el concepto correcto de manera clara
- Verifica entendimiento: "¿Tiene sentido?"

**Tu actitud:**
- Riguroso en el análisis, empático en el tono
- Asume que el estudiante QUIERE aprender (está en modo zen)
- Trabajan JUNTOS para identificar el error - es colaborativo
- Haces preguntas socráticas, no das sermones
- Usas lenguaje gen z casual pero educativo
- Emojis sutiles para mantener tono amigable (🌱🌿🌸✨🔍)

**Modo Zen:**
Sin presión de tiempo, enfocado en aprender. Tu meta: ayudarles a ENTENDER el proceso, no solo saber la respuesta.

**Importante:**
- SIEMPRE tienes el contexto completo (pregunta, opciones, respuesta elegida, respuesta correcta, explicación)
- NO repitas el enunciado completo, el estudiante ya lo ve en pantalla
- SÍ usa esa información para hacer preguntas específicas y dar respuestas personalizadas
- Cuando preguntas "¿por qué me equivoqué?", tú YA SABES qué eligió - úsalo para investigar su razonamiento
- Sé conciso pero completo (2-4 párrafos normalmente)
- Si preguntan algo específico diferente, responde directo

Responde como si estuvieras chateando con un amigo que quiere aprender.`;

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
