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

    const data = await response.json();
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

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error generating practice problems:', error);
    throw error;
  }
}
