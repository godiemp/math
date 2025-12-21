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
  "id": "string (slug único basado en el tema)",
  "slug": "string (igual al id)",
  "title": "string (título corto y atractivo)",
  "description": "string (descripción breve de la lección)",
  "level": "m1" | "m2",
  "subject": "algebra" | "numeros" | "geometria" | "probabilidad",
  "steps": [
    {
      "id": "hook",
      "type": "hook",
      "title": "¿Sabías que...?",
      "content": {
        "subtitle": "string",
        "scenario": {
          "text": "string (escenario de la vida real)",
          "visual": "string (emoji o descripción visual)",
          "question": "string (pregunta enganche)"
        },
        "quiz": {
          "reminder": "string",
          "options": ["opción1", "opción2", "opción3", "opción4"],
          "correctIndex": 0-3
        },
        "result": {
          "title": "string",
          "breakdown": [{ "type": "text", "content": "string" }],
          "bridge": [{ "type": "text", "content": "string" }]
        }
      }
    },
    {
      "id": "explore",
      "type": "explore",
      "title": "Exploremos",
      "content": {
        "introduction": "string",
        "examples": [
          {
            "id": "string",
            "title": "string",
            "description": "string",
            "visual": { "type": "text", "content": "string (usa LaTeX: $formula$)" },
            "explanation": "string"
          }
        ],
        "interactivePrompt": "string",
        "insight": "string"
      }
    },
    {
      "id": "explain",
      "type": "explain",
      "title": "La Teoría",
      "content": {
        "introduction": "string",
        "tabs": [
          {
            "id": "string",
            "title": "string",
            "content": [{ "type": "text", "content": "string (usa LaTeX para fórmulas)" }]
          }
        ],
        "keyFormula": {
          "title": "string",
          "formula": "string (LaTeX)",
          "explanation": "string"
        },
        "summary": "string"
      }
    },
    {
      "id": "practice",
      "type": "practice",
      "title": "A Practicar",
      "content": {
        "introduction": "string",
        "problems": [
          {
            "id": "string",
            "question": "string",
            "options": ["opción1", "opción2", "opción3", "opción4"],
            "correctIndex": 0-3,
            "explanation": "string",
            "hint": "string"
          }
        ],
        "encouragement": "string"
      }
    },
    {
      "id": "verify",
      "type": "verify",
      "title": "Checkpoint",
      "content": {
        "introduction": "string",
        "questions": [
          {
            "id": "string",
            "question": "string",
            "options": ["A", "B", "C", "D"],
            "correctIndex": 0-3,
            "explanation": "string"
          }
        ],
        "passingScore": 2,
        "successMessage": "string",
        "retryMessage": "string"
      }
    }
  ],
  "createdAt": "${new Date().toISOString()}",
  "updatedAt": "${new Date().toISOString()}"
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

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: systemPrompt,
      messages: messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    // Extract text from response
    const responseText = response.content
      .filter(block => block.type === 'text')
      .map(block => (block as { type: 'text'; text: string }).text)
      .join('\n');

    // Parse the response
    const { message, lessonJson } = parseAIResponse(responseText);

    const result: GenerateResponse = {
      message,
      lessonUpdate: lessonJson || undefined,
    };

    return NextResponse.json(result);
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
