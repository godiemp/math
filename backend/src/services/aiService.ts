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

interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatOptions {
  question: string;
  questionLatex?: string;
  userAnswer: number;
  correctAnswer: number;
  explanation: string;
  options: string[];
  topic?: string;
  difficulty?: string;
  visualData?: any;
  messages: AIChatMessage[];
  userMessage: string;
}

interface AIChatResponse {
  response: string;
  success: boolean;
}

interface AIHelpOptions {
  question: string;
  userAnswer: number;
  correctAnswer: number;
  explanation: string;
  options: string[];
  topic?: string;
}

interface AIHelpResponse {
  help: string;
  success: boolean;
}

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

/**
 * AI Chat - Socratic tutoring for student questions
 */
export async function aiChat(options: AIChatOptions): Promise<AIChatResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const {
    question,
    questionLatex,
    userAnswer,
    correctAnswer,
    explanation,
    options: answerOptions,
    topic,
    difficulty,
    visualData,
    messages,
    userMessage
  } = options;

  const isCorrect = userAnswer === correctAnswer;

  // Build rich context for the AI
  let contextInfo = `**CONTEXTO DE LA PREGUNTA (SIEMPRE DISPONIBLE):**

**Pregunta:** ${question}
${questionLatex ? `**LaTeX:** ${questionLatex}` : ''}
**Tema:** ${topic || 'Matemáticas'}
**Dificultad:** ${difficulty || 'media'}

**Opciones:**
${answerOptions.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}. ${opt}`).join('\n')}

**Respuesta del estudiante:** Opción ${String.fromCharCode(65 + userAnswer)} - ${answerOptions[userAnswer]}
**Respuesta correcta:** Opción ${String.fromCharCode(65 + correctAnswer)} - ${answerOptions[correctAnswer]}
**Estado:** ${isCorrect ? 'CORRECTA ✓' : 'INCORRECTA'}

**Explicación oficial:** ${explanation}
`;

  if (visualData && visualData.type === 'geometry') {
    contextInfo += `\n**Nota:** Esta pregunta incluye una figura geométrica que el estudiante puede ver.`;
  }

  // Build conversation history
  const conversationMessages: any[] = [];

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

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2048,
        system: systemPrompt,
        messages: conversationMessages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = await response.json() as { content: Array<{ type: string; text: string }> };
    const aiResponse = data.content[0].type === 'text' ? data.content[0].text : '';

    return {
      response: aiResponse,
      success: true
    };
  } catch (error) {
    console.error('Error in AI chat:', error);
    throw error;
  }
}

/**
 * AI Help - Provides explanations when students answer incorrectly
 */
export async function aiHelp(options: AIHelpOptions): Promise<AIHelpResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const { question, userAnswer, correctAnswer, explanation, options: answerOptions, topic } = options;

  const prompt = `Eres un tutor de matemáticas empático y paciente que ayuda a estudiantes chilenos que se preparan para la PAES (Prueba de Acceso a la Educación Superior).

Un estudiante está trabajando en modo zen (sin presión de tiempo, enfocado en aprender) y ha respondido incorrectamente a esta pregunta:

**Pregunta:** ${question}
**Tema:** ${topic || 'Matemáticas'}

**Opciones:**
${answerOptions.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}. ${opt}`).join('\n')}

**Respuesta del estudiante:** Opción ${String.fromCharCode(65 + userAnswer)} - ${answerOptions[userAnswer]}
**Respuesta correcta:** Opción ${String.fromCharCode(65 + correctAnswer)} - ${answerOptions[correctAnswer]}

**Explicación oficial:** ${explanation}

Por favor, proporciona una explicación personalizada y empática que:
1. Sea comprensiva y motivadora (recuerda que estamos en modo zen - "cada error es aprendizaje")
2. Explique por qué la respuesta del estudiante es incorrecta de manera constructiva
3. Explique paso a paso por qué la respuesta correcta es la correcta
4. Use un lenguaje claro y accesible para estudiantes
5. Incluya un ejemplo similar si es relevante
6. Sea concisa pero completa (2-3 párrafos)

Usa emojis sutiles para mantener un tono amigable pero no exagerado.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = await response.json() as { content: Array<{ type: string; text: string }> };
    const aiResponse = data.content[0].type === 'text' ? data.content[0].text : '';

    return {
      help: aiResponse,
      success: true
    };
  } catch (error) {
    console.error('Error in AI help:', error);
    throw error;
  }
}
