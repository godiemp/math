/**
 * AI Service for content summarization and educational assistance
 * Uses Anthropic Claude API for high-quality educational content processing
 */

interface SummarizeOptions {
  content: string;
  mode: 'brief' | 'detailed';
  context?: string;
}

interface SummarizeResponse {
  summary: string;
  keyPoints?: string[];
}

/**
 * Summarize educational content using AI
 */
export async function summarizeContent(
  options: SummarizeOptions
): Promise<SummarizeResponse> {
  const { content, mode, context } = options;

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const systemPrompt = `Eres un tutor de matemáticas experto especializado en el examen PAES de Chile.
Tu tarea es resumir contenido educativo de forma clara y concisa para estudiantes de preparación PAES.

${mode === 'brief'
  ? 'Genera un resumen muy breve (2-3 oraciones) con solo lo esencial.'
  : 'Genera un resumen detallado pero conciso que capture los conceptos clave, fórmulas importantes y ejemplos relevantes.'
}

Mantén el formato matemático usando LaTeX donde sea apropiado (usa $...$ para inline y $$...$$ para bloques).`;

  const userPrompt = context
    ? `Contexto: ${context}\n\nContenido a resumir:\n${content}`
    : `Contenido a resumir:\n${content}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: mode === 'brief' ? 300 : 1000,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = await response.json() as { content: Array<{ text: string }> };
    const summary = data.content[0].text;

    return {
      summary,
      keyPoints: mode === 'detailed' ? extractKeyPoints(summary) : undefined,
    };
  } catch (error) {
    console.error('Error summarizing content:', error);
    throw error;
  }
}

/**
 * Extract key points from a summary (simple bullet point extraction)
 */
function extractKeyPoints(summary: string): string[] {
  const bulletPoints = summary.match(/^[-•*]\s+(.+)$/gm);
  if (bulletPoints) {
    return bulletPoints.map(point => point.replace(/^[-•*]\s+/, ''));
  }
  return [];
}

/**
 * Generate practice problems based on a topic
 */
export async function generatePracticeProblems(topic: string, count: number = 3) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const systemPrompt = `Eres un experto en crear problemas de práctica tipo PAES para matemáticas.
Genera problemas originales, realistas y apropiados para estudiantes chilenos preparando la PAES.`;

  const userPrompt = `Genera ${count} problemas de práctica sobre: ${topic}

Formato para cada problema:
- Enunciado claro
- 4 opciones (A, B, C, D)
- Solución detallada
- Nivel de dificultad

Usa formato matemático LaTeX donde sea apropiado.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = await response.json() as { content: Array<{ text: string }> };
    return data.content[0].text;
  } catch (error) {
    console.error('Error generating practice problems:', error);
    throw error;
  }
}

/**
 * Generate complete question with AI (answers, distractors, explanation)
 */
interface GenerateQuestionAnswerInput {
  question: string;
  questionLatex?: string;
  context: string;
  variables: Record<string, any>;
  skills: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GenerateQuestionAnswerResponse {
  correctAnswer: number; // Index 0-3
  options: string[];
  optionsLatex?: string[];
  explanation: string;
  explanationLatex?: string;
}

export async function generateQuestionAnswer(
  input: GenerateQuestionAnswerInput
): Promise<GenerateQuestionAnswerResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const systemPrompt = `Eres un experto en matemáticas PAES de Chile. Tu tarea es generar respuestas completas para preguntas de matemáticas.

Para cada pregunta debes:
1. Calcular la respuesta correcta
2. Generar 3 distractores plausibles (errores comunes que estudiantes cometerían)
3. Crear una explicación paso a paso clara

IMPORTANTE:
- Los distractores deben reflejar errores matemáticos comunes
- La explicación debe ser educativa y mostrar el proceso completo
- Usa LaTeX para fórmulas matemáticas (formato: $...$  para inline, $$...$$ para bloques)
- Responde SOLO con JSON válido, sin texto adicional`;

  const userPrompt = `Genera la respuesta completa para esta pregunta de matemáticas:

**Contexto:** ${input.context}

**Pregunta:** ${input.question}

**Variables usadas:**
${Object.entries(input.variables).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

**Habilidades:** ${input.skills.join(', ')}
**Dificultad:** ${input.difficulty}

Responde con este formato JSON exacto:
{
  "correctAnswer": 0,
  "options": ["opción correcta", "distractor 1", "distractor 2", "distractor 3"],
  "optionsLatex": ["$respuesta$ correcta", "$distractor$ 1", "$distractor$ 2", "$distractor$ 3"],
  "explanation": "Explicación paso a paso",
  "explanationLatex": "Explicación con $LaTeX$"
}

IMPORTANTE:
- correctAnswer debe ser el índice (0-3) donde está la respuesta correcta en el array options
- Mezcla la respuesta correcta entre los distractores (no siempre en posición 0)
- Los distractores deben ser errores comunes: olvidos de pasos, errores de signo, confusión de fórmulas, etc.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = (await response.json()) as { content: Array<{ text: string }> };
    const responseText = data.content[0].text;

    // Extract JSON from response (Claude might wrap it in markdown)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from AI response');
    }

    const result = JSON.parse(jsonMatch[0]) as GenerateQuestionAnswerResponse;

    // Validate response
    if (
      typeof result.correctAnswer !== 'number' ||
      result.correctAnswer < 0 ||
      result.correctAnswer > 3
    ) {
      throw new Error('Invalid correctAnswer index from AI');
    }

    if (!Array.isArray(result.options) || result.options.length !== 4) {
      throw new Error('Invalid options array from AI');
    }

    return result;
  } catch (error) {
    console.error('Error generating question answer with AI:', error);
    throw error;
  }
}
