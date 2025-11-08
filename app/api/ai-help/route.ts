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
    const { question, userAnswer, correctAnswer, explanation, options, topic } = body;

    if (!question || userAnswer === undefined || correctAnswer === undefined) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    // Build the prompt for Claude
    const prompt = `Eres un tutor de matemáticas empático y paciente que ayuda a estudiantes chilenos que se preparan para la PAES (Prueba de Acceso a la Educación Superior).

Un estudiante está trabajando en modo zen (sin presión de tiempo, enfocado en aprender) y ha respondido incorrectamente a esta pregunta:

**Pregunta:** ${question}
**Tema:** ${topic || 'Matemáticas'}

**Opciones:**
${options.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}. ${opt}`).join('\n')}

**Respuesta del estudiante:** Opción ${String.fromCharCode(65 + userAnswer)} - ${options[userAnswer]}
**Respuesta correcta:** Opción ${String.fromCharCode(65 + correctAnswer)} - ${options[correctAnswer]}

**Explicación oficial:** ${explanation}

Por favor, proporciona una explicación personalizada y empática que:
1. Sea comprensiva y motivadora (recuerda que estamos en modo zen - "cada error es aprendizaje")
2. Explique por qué la respuesta del estudiante es incorrecta de manera constructiva
3. Explique paso a paso por qué la respuesta correcta es la correcta
4. Use un lenguaje claro y accesible para estudiantes
5. Incluya un ejemplo similar si es relevante
6. Sea concisa pero completa (2-3 párrafos)

Usa emojis sutiles para mantener un tono amigable pero no exagerado.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const aiResponse = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({
      help: aiResponse,
      success: true
    });

  } catch (error) {
    console.error('Error calling Claude API:', error);
    return NextResponse.json(
      {
        error: 'Error al obtener ayuda de IA',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
