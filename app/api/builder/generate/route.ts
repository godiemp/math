/**
 * API Route: /api/builder/generate
 *
 * Generates or updates dynamic lessons using Claude AI.
 * Takes chat messages and current lesson state, returns updated lesson JSON.
 */

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { DynamicLesson } from '@/lib/builder/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GenerateRequest {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  currentLesson: DynamicLesson | null;
  activeStep: number;
  mode: 'create' | 'edit';
}

interface GenerateResponse {
  message: string;
  lessonUpdate?: DynamicLesson;
}

/**
 * Build the system prompt for creating lessons from scratch
 */
function buildCreateSystemPrompt(): string {
  return `Eres un experto pedagogo chileno que ayuda a profesores a crear lecciones de matemáticas interactivas para estudiantes que preparan la PAES.

## TU TAREA
El profesor te describirá un tema y debes crear una lección completa e interactiva desde cero.

## ESTRUCTURA DE LECCIÓN
Cada lección debe tener EXACTAMENTE 5 pasos en este orden:
1. **hook** - Gancho inicial con escenario de la vida real que capture la atención
2. **explore** - Exploración interactiva con ejemplos visuales
3. **explain** - Explicación teórica con fórmulas y conceptos
4. **practice** - Problemas de práctica con pistas
5. **verify** - Checkpoint final con 3 preguntas de opción múltiple

## ESQUEMA JSON REQUERIDO
{
  "id": "string-slug-basado-en-tema",
  "slug": "string-slug-basado-en-tema",
  "title": "Título Corto",
  "description": "Descripción breve de la lección",
  "level": "M1",
  "subject": "álgebra",
  "steps": [
    {
      "id": "hook",
      "type": "hook",
      "title": "Título del Gancho",
      "content": {
        "subtitle": "Subtítulo descriptivo del escenario...",
        "scenario": {
          "text": "Descripción del escenario. Usa <strong class='text-blue-600'>texto resaltado</strong> para énfasis.",
          "visual": { "type": "emoji", "content": "🔢📐", "size": "text-4xl" },
          "question": "¿Pregunta que plantea el escenario?"
        },
        "quiz": {
          "reminder": "Recordatorio del contexto con $LaTeX$ si es necesario",
          "options": ["Opción A", "Opción B", "Opción C (correcta)", "Opción D"],
          "correctIndex": 2
        },
        "result": {
          "title": "¡Título del Resultado!",
          "breakdown": ["Paso 1: explicación", "Paso 2: desarrollo", "Paso 3: resultado final"],
          "bridge": {
            "title": "Conexión con el Concepto",
            "concept": "Explicación de cómo el escenario se conecta con el tema matemático.",
            "formula": "$formula\\\\_clave = resultado$",
            "note": "Nota adicional opcional"
          }
        }
      }
    },
    {
      "id": "explore",
      "type": "explore",
      "title": "Descubre el Patrón",
      "content": {
        "subtitle": "Explora diferentes ejemplos",
        "intro": {
          "text": "Haz clic en cada ejemplo para ver cómo funciona."
        },
        "examples": [
          { "id": "ex1", "expression": "$expresión_1$", "result": "$resultado_1$", "hint": "Pista para resolver" },
          { "id": "ex2", "expression": "$expresión_2$", "result": "$resultado_2$", "hint": "Pista para resolver" },
          { "id": "ex3", "expression": "$expresión_3$", "result": "$resultado_3$", "hint": "Pista para resolver" }
        ],
        "summary": {
          "title": "¡Patrón descubierto!",
          "steps": ["Paso 1 del método", "Paso 2 del método", "Paso 3 del método"]
        }
      }
    },
    {
      "id": "explain",
      "type": "explain",
      "title": "La Teoría",
      "content": {
        "subtitle": "Conceptos y fórmulas clave",
        "tabs": [
          {
            "id": "tab1",
            "title": "Título Completo del Tab",
            "shortTitle": "Tab1",
            "description": "Descripción del concepto explicado en este tab",
            "formula": "$formula = resultado$",
            "color": "blue",
            "example": {
              "input": "$entrada$",
              "steps": ["Paso 1", "Paso 2", "Paso 3"],
              "result": "$resultado$"
            }
          },
          {
            "id": "tab2",
            "title": "Segundo Concepto",
            "shortTitle": "Tab2",
            "description": "Descripción del segundo concepto",
            "formula": "$otra\\\\_formula$",
            "color": "purple",
            "example": {
              "input": "$entrada$",
              "steps": ["Paso 1", "Paso 2"],
              "result": "$resultado$"
            }
          }
        ],
        "tips": {
          "correct": ["Consejo 1 para hacerlo bien", "Consejo 2 para hacerlo bien"],
          "errors": ["Error común 1 a evitar", "Error común 2 a evitar"],
          "insight": {
            "title": "Dato importante:",
            "text": "Información clave que el estudiante debe recordar."
          }
        }
      }
    },
    {
      "id": "practice",
      "type": "practice",
      "title": "Práctica Guiada",
      "content": {
        "subtitle": "Resuelve los siguientes ejercicios",
        "problems": [
          {
            "id": "p1",
            "question": "Pregunta 1 con $LaTeX$ si es necesario",
            "hint": "Pista para ayudar al estudiante",
            "options": ["Opción A", "Opción B (correcta)", "Opción C", "Opción D"],
            "correctAnswer": 1,
            "explanation": "Explicación de por qué B es correcta"
          },
          {
            "id": "p2",
            "question": "Pregunta 2",
            "hint": "Pista",
            "options": ["A", "B", "C (correcta)", "D"],
            "correctAnswer": 2,
            "explanation": "Explicación"
          },
          {
            "id": "p3",
            "question": "Pregunta 3",
            "hint": "Pista",
            "options": ["A (correcta)", "B", "C", "D"],
            "correctAnswer": 0,
            "explanation": "Explicación"
          }
        ],
        "requiredCorrect": 2
      }
    },
    {
      "id": "verify",
      "type": "verify",
      "title": "Checkpoint Final",
      "content": {
        "questions": [
          {
            "id": "q1",
            "question": "Pregunta de verificación 1",
            "options": ["A", "B (correcta)", "C", "D"],
            "correctAnswer": 1,
            "explanation": "Explicación"
          },
          {
            "id": "q2",
            "question": "Pregunta de verificación 2",
            "options": ["A", "B", "C (correcta)", "D"],
            "correctAnswer": 2,
            "explanation": "Explicación"
          },
          {
            "id": "q3",
            "question": "Pregunta de verificación 3",
            "options": ["A (correcta)", "B", "C", "D"],
            "correctAnswer": 0,
            "explanation": "Explicación"
          }
        ],
        "requiredCorrect": 2,
        "successMessage": "¡Excelente! Dominas este tema.",
        "failureMessage": "Repasa los conceptos y vuelve a intentar."
      }
    }
  ]
}

## INSTRUCCIONES
1. Crea contenido educativo de alta calidad en español chileno.
2. Los escenarios del gancho deben ser culturalmente relevantes para Chile (ej: feria, metro de Santiago, estadio).
3. Usa LaTeX para TODAS las fórmulas matemáticas ($...$ para inline, $$...$$ para display).
4. Incluye al menos 3 ejemplos en explore, 3 problemas en practice, y 3 preguntas en verify.
5. Las explicaciones deben ser progresivas, de simple a complejo.
6. Las opciones incorrectas deben ser errores comunes que cometen los estudiantes.

## FORMATO DE RESPUESTA
1. Un mensaje corto explicando la lección que creaste
2. Seguido de un bloque de código JSON con la lección completa

Ejemplo:
---
He creado una lección sobre [tema] que comienza con un escenario en [contexto chileno]...

\`\`\`json
{
  "id": "...",
  ...lección completa...
}
\`\`\`
---`;
}

/**
 * Build the system prompt for editing existing lessons
 */
function buildEditSystemPrompt(lesson: DynamicLesson, activeStep: number): string {
  return `Eres un experto pedagogo chileno que ayuda a profesores a crear lecciones de matemáticas interactivas para estudiantes que preparan la PAES.

## CONTEXTO
El profesor está editando una lección con la siguiente estructura:
- Título: ${lesson.title}
- Descripción: ${lesson.description}
- Nivel: ${lesson.level}
- Materia: ${lesson.subject}
- Paso activo: ${activeStep + 1} de ${lesson.steps.length}

## ESTRUCTURA DE LECCIÓN
Una lección tiene estos tipos de pasos:
1. **hook** - Gancho inicial con escenario de la vida real
2. **explore** - Exploración interactiva con ejemplos
3. **explain** - Explicación teórica con pestañas de fórmulas
4. **practice** - Problemas de práctica con pistas
5. **verify** - Checkpoint final con preguntas

## ESQUEMA JSON DE LA LECCIÓN
${JSON.stringify(lesson, null, 2)}

## INSTRUCCIONES
1. Cuando el usuario pida cambios, modifica SOLO las partes necesarias de la lección.
2. Mantén la estructura JSON válida.
3. El contenido debe ser en español chileno, apropiado para estudiantes de enseñanza media.
4. Los escenarios del gancho deben ser culturalmente relevantes para Chile.
5. Usa LaTeX para fórmulas matemáticas (con $...$ para inline o $$...$$ para display).
6. Mantén las explicaciones claras y progresivas.

## FORMATO DE RESPUESTA
Responde en este formato EXACTO:
1. Un mensaje corto explicando qué cambios realizaste
2. Seguido de un bloque de código JSON con la lección completa actualizada

Ejemplo:
---
He cambiado el título de la lección y ajustado la descripción.

\`\`\`json
{
  "id": "...",
  ...lección actualizada...
}
\`\`\`
---

IMPORTANTE: Siempre devuelve la lección COMPLETA en el bloque JSON, no solo los cambios parciales.`;
}

/**
 * Parse the AI response to extract message and lesson JSON
 */
function parseAIResponse(response: string): { message: string; lessonJson: DynamicLesson | null } {
  // Find JSON block
  const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);

  if (jsonMatch) {
    const message = response.replace(/```json[\s\S]*?```/, '').trim();

    try {
      const lessonJson = JSON.parse(jsonMatch[1]);
      return { message, lessonJson };
    } catch (e) {
      console.error('Failed to parse lesson JSON:', e);
      return { message: response, lessonJson: null };
    }
  }

  return { message: response, lessonJson: null };
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { messages, currentLesson, activeStep, mode } = body;

    // Build the appropriate system prompt based on mode
    const systemPrompt = mode === 'create' || !currentLesson
      ? buildCreateSystemPrompt()
      : buildEditSystemPrompt(currentLesson, activeStep);

    // Create streaming response
    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: systemPrompt,
      messages: messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    // Create a TransformStream to handle the response
    const encoder = new TextEncoder();
    let fullText = '';

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              const text = event.delta.text;
              fullText += text;

              // Send the text chunk to the client
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text', content: text })}\n\n`));
            }
          }

          // Parse the complete response for lesson JSON
          const { message, lessonJson } = parseAIResponse(fullText);

          // Send the final result with the parsed lesson
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: 'done',
            message,
            lessonUpdate: lessonJson || undefined
          })}\n\n`));

          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: 'error',
            message: 'Error al generar la lección'
          })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Builder generate error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate lesson update',
        message: 'Lo siento, hubo un error al procesar tu solicitud.',
      },
      { status: 500 }
    );
  }
}
