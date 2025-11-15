/**
 * AI Service for content summarization and educational assistance
 * Uses OpenAI API for high-quality educational content processing
 * Optimized for speed with model routing and streaming
 */

import { pool } from '../config/database';
import {
  completion,
  streamCompletion,
  optimizeConversationHistory,
  type ChatMessage,
  type CompletionResult,
} from './openaiService';

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
  userId?: string;
  quizSessionId?: string;
  questionId?: string;
}

interface AIChatResponse {
  response: string;
  success: boolean;
}

interface AIChatStreamOptions extends AIChatOptions {
  onToken: (token: string) => void;
  onComplete: (fullResponse: string) => void;
}

interface AIHelpOptions {
  question: string;
  userAnswer: number;
  correctAnswer: number;
  explanation: string;
  options: string[];
  topic?: string;
  userId?: string;
  quizSessionId?: string;
  questionId?: string;
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
  // Options in LaTeX format (pure LaTeX without $ delimiters)
  options: string[];
  // Explanation in LaTeX format
  explanation: string;
}

interface GenerateCompleteQuestionInput {
  skills: string[];
  level: string;
  subject: string;
  context?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface GenerateCompleteQuestionResponse {
  question: string;
  questionLatex?: string;
  // Options in LaTeX format
  options: string[];
  correctAnswer: number;
  // Explanation in LaTeX format
  explanation: string;
  context: string;
  variables?: Record<string, any>;
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
        model: 'claude-sonnet-4-5-20250929',
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
        model: 'claude-sonnet-4-5-20250929',
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
  "options": ["respuesta correcta en LaTeX", "distractor 1 en LaTeX", "distractor 2 en LaTeX", "distractor 3 en LaTeX"],
  "explanation": "Explicación paso a paso con LaTeX. Usa \\\\text{} para texto y notación matemática directa para fórmulas"
}

IMPORTANTE:
- correctAnswer debe ser el índice (0-3) donde está la respuesta correcta en el array options
- Las opciones deben ser en formato LaTeX puro (sin delimitadores $), ejemplo: "\\\\frac{1}{2}" o "6x" o "\\\\text{9 metros}"
- La explicación debe ser en formato LaTeX completo
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
        model: 'claude-sonnet-4-5-20250929',
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
 * Optimized with OpenAI, compact prompts, and conversation summarization
 */
export async function aiChat(options: AIChatOptions): Promise<AIChatResponse> {
  const startTime = Date.now();

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
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
    userMessage,
    userId,
    quizSessionId,
    questionId
  } = options;

  const isCorrect = userAnswer === correctAnswer;

  // Build COMPACT context (reduced from ~800 tokens to ~300 tokens)
  const contextInfo = `**CONTEXTO:**
Pregunta: ${questionLatex || question}
Opciones: ${answerOptions.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}) ${opt}`).join(' | ')}
Estudiante eligió: ${String.fromCharCode(65 + userAnswer)} (${isCorrect ? 'CORRECTO' : 'INCORRECTO'})
Correcta: ${String.fromCharCode(65 + correctAnswer)}
Tema: ${topic || 'Matemáticas'} | Dificultad: ${difficulty || 'media'}
${visualData?.type === 'geometry' ? 'Nota: Incluye figura geométrica' : ''}`;

  // COMPACT system prompt (reduced from ~500 tokens to ~200 tokens)
  const systemPrompt = `Eres tutor PAES chileno, empático y casual. Modo zen (sin presión).

${contextInfo}

**REGLAS (en orden):**
1. Si pregunta "por qué me equivoqué" → PRIMERO pregunta su razonamiento, NO asumas
2. Investiga: "¿Qué pensaste al elegir [su respuesta]?" o "¿Cómo llegaste a eso?"
3. DESPUÉS de entender SU lógica → explica el error específico
4. Conecta con su razonamiento: "Veo que pensaste X, tiene sentido, PERO..."
5. Verifica: "¿Tiene sentido?"

**ESTILO:**
- Casual, gen z, empático
- 2-3 párrafos máximo
- LaTeX: $expresión$
- Emojis sutiles (🌱✨🔍)
- NO repitas el enunciado completo
- Sé conciso y directo`;

  // Build conversation history with optimization
  const conversationMessages: ChatMessage[] = [];

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

  try {
    // Optimize conversation history (summarize if > 5 messages)
    const optimizedMessages = await optimizeConversationHistory(
      systemPrompt,
      conversationMessages,
      5,  // max messages before summarizing
      2000 // max token estimate
    );

    // Use OpenAI with optimized settings
    const result = await completion({
      messages: optimizedMessages,
      taskType: 'chat_response',
      temperature: 0.7,
    });

    const aiResponse = result.content;
    const responseTime = Date.now() - startTime;

    // Save interaction to database if userId is provided
    if (userId) {
      try {
        const turnNumber = messages ? messages.length + 1 : 1;
        const requestContext = {
          question,
          questionLatex,
          userAnswer,
          correctAnswer,
          explanation,
          options: answerOptions,
          topic,
          difficulty,
          visualData
        };

        await pool.query(`
          INSERT INTO ai_interactions (
            user_id, quiz_session_id, question_id,
            interaction_type, user_message, ai_response,
            ai_model, turn_number, response_time_ms,
            request_context, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [
          userId,
          quizSessionId || null,
          questionId || null,
          'chat',
          userMessage,
          aiResponse,
          result.model,
          turnNumber,
          responseTime,
          JSON.stringify(requestContext),
          Date.now()
        ]);

        console.log(`✅ AI chat: ${result.model}, ${result.totalTokens} tokens, ${responseTime}ms`);
      } catch (dbError) {
        console.error('❌ Failed to save AI interaction:', dbError);
      }
    }

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
 * AI Chat Streaming - Real-time token-by-token responses
 * Provides immediate feedback with streaming for better UX
 */
export async function aiChatStream(options: AIChatStreamOptions): Promise<void> {
  const startTime = Date.now();

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
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
    userMessage,
    userId,
    quizSessionId,
    questionId,
    onToken,
    onComplete
  } = options;

  const isCorrect = userAnswer === correctAnswer;

  // Build COMPACT context
  const contextInfo = `**CONTEXTO:**
Pregunta: ${questionLatex || question}
Opciones: ${answerOptions.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}) ${opt}`).join(' | ')}
Estudiante eligió: ${String.fromCharCode(65 + userAnswer)} (${isCorrect ? 'CORRECTO' : 'INCORRECTO'})
Correcta: ${String.fromCharCode(65 + correctAnswer)}
Tema: ${topic || 'Matemáticas'} | Dificultad: ${difficulty || 'media'}
${visualData?.type === 'geometry' ? 'Nota: Incluye figura geométrica' : ''}`;

  // COMPACT system prompt
  const systemPrompt = `Eres tutor PAES chileno, empático y casual. Modo zen (sin presión).

${contextInfo}

**REGLAS (en orden):**
1. Si pregunta "por qué me equivoqué" → PRIMERO pregunta su razonamiento, NO asumas
2. Investiga: "¿Qué pensaste al elegir [su respuesta]?" o "¿Cómo llegaste a eso?"
3. DESPUÉS de entender SU lógica → explica el error específico
4. Conecta con su razonamiento: "Veo que pensaste X, tiene sentido, PERO..."
5. Verifica: "¿Tiene sentido?"

**ESTILO:**
- Casual, gen z, empático
- 2-3 párrafos máximo
- LaTeX: $expresión$
- Emojis sutiles (🌱✨🔍)
- NO repitas el enunciado completo
- Sé conciso y directo`;

  // Build conversation history
  const conversationMessages: ChatMessage[] = [];

  if (messages && messages.length > 0) {
    messages.forEach((msg: any, index: number) => {
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

  conversationMessages.push({
    role: 'user',
    content: userMessage
  });

  try {
    // Optimize conversation history
    const optimizedMessages = await optimizeConversationHistory(
      systemPrompt,
      conversationMessages,
      5,
      2000
    );

    // Use streaming completion
    const result = await streamCompletion({
      messages: optimizedMessages,
      taskType: 'chat_response',
      temperature: 0.7,
      onToken,
      onComplete: async (fullResponse) => {
        const responseTime = Date.now() - startTime;

        // Save interaction to database if userId is provided
        if (userId) {
          try {
            const turnNumber = messages ? messages.length + 1 : 1;
            const requestContext = {
              question,
              questionLatex,
              userAnswer,
              correctAnswer,
              explanation,
              options: answerOptions,
              topic,
              difficulty,
              visualData
            };

            await pool.query(`
              INSERT INTO ai_interactions (
                user_id, quiz_session_id, question_id,
                interaction_type, user_message, ai_response,
                ai_model, turn_number, response_time_ms,
                request_context, created_at
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            `, [
              userId,
              quizSessionId || null,
              questionId || null,
              'chat_stream',
              userMessage,
              fullResponse,
              result.model,
              turnNumber,
              responseTime,
              JSON.stringify(requestContext),
              Date.now()
            ]);

            console.log(`✅ AI chat stream: ${result.model}, ${result.totalTokens} tokens, ${responseTime}ms`);
          } catch (dbError) {
            console.error('❌ Failed to save AI stream interaction:', dbError);
          }
        }

        onComplete(fullResponse);
      }
    });
  } catch (error) {
    console.error('Error in AI chat stream:', error);
    throw error;
  }
}

/**
 * AI Help - Provides explanations when students answer incorrectly
 * Optimized with OpenAI and compact prompts
 */
export async function aiHelp(options: AIHelpOptions): Promise<AIHelpResponse> {
  const startTime = Date.now();

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  const {
    question,
    userAnswer,
    correctAnswer,
    explanation,
    options: answerOptions,
    topic,
    userId,
    quizSessionId,
    questionId
  } = options;

  // COMPACT prompt (reduced from ~400 tokens to ~150 tokens)
  const systemPrompt = `Tutor PAES empático. Modo zen (sin presión). Explica errores de forma constructiva.

**FORMATO:**
- 2-3 párrafos máximo
- Emojis sutiles (🌱✨)
- LaTeX: $expresión$
- Lenguaje casual y claro`;

  const userPrompt = `Estudiante respondió incorrectamente:

Pregunta: ${question}
Tema: ${topic || 'Matemáticas'}
Opciones: ${answerOptions.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}) ${opt}`).join(' | ')}
Eligió: ${String.fromCharCode(65 + userAnswer)} | Correcta: ${String.fromCharCode(65 + correctAnswer)}
Explicación oficial: ${explanation}

Explica brevemente: 1) Por qué su respuesta es incorrecta, 2) Por qué la correcta es correcta. Sé empático y conciso.`;

  try {
    const result = await completion({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      taskType: 'chat_response',
      temperature: 0.7,
    });

    const aiResponse = result.content;
    const responseTime = Date.now() - startTime;

    // Save interaction to database if userId is provided
    if (userId) {
      try {
        const requestContext = {
          question,
          userAnswer,
          correctAnswer,
          explanation,
          options: answerOptions,
          topic
        };

        await pool.query(`
          INSERT INTO ai_interactions (
            user_id, quiz_session_id, question_id,
            interaction_type, user_message, ai_response,
            ai_model, turn_number, response_time_ms,
            request_context, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [
          userId,
          quizSessionId || null,
          questionId || null,
          'help',
          'Incorrect answer - automatic AI help requested',
          aiResponse,
          result.model,
          1,
          responseTime,
          JSON.stringify(requestContext),
          Date.now()
        ]);

        console.log(`✅ AI help: ${result.model}, ${result.totalTokens} tokens, ${responseTime}ms`);
      } catch (dbError) {
        console.error('❌ Failed to save AI interaction:', dbError);
      }
    }

    return {
      help: aiResponse,
      success: true
    };
  } catch (error) {
    console.error('Error in AI help:', error);
    throw error;
  }
}

/**
 * Generate Complete Question - Generates a full question from scratch without templates
 */
export async function generateCompleteQuestion(
  input: GenerateCompleteQuestionInput
): Promise<GenerateCompleteQuestionResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const { skills, level, subject, context, difficulty = 'medium' } = input;

  // Map skill IDs to readable names
  const skillMap: Record<string, string> = {
    'numeros-porcentajes': 'Porcentajes',
    'numeros-operaciones-basicas': 'Operaciones Básicas',
    'numeros-decimales': 'Decimales',
    'numeros-fracciones': 'Fracciones',
    'numeros-proporcionalidad': 'Proporcionalidad',
    'numeros-potencias': 'Potencias',
    'numeros-raices': 'Raíces',
    'algebra-funciones-lineales': 'Funciones Lineales',
    'algebra-expresiones-algebraicas': 'Expresiones Algebraicas',
    'algebra-ecuaciones-lineales': 'Ecuaciones Lineales',
    'algebra-sistemas-ecuaciones': 'Sistemas de Ecuaciones',
    'algebra-inecuaciones': 'Inecuaciones',
    'algebra-funciones-cuadraticas': 'Funciones Cuadráticas',
    'geometria-perimetro': 'Perímetro',
    'geometria-area': 'Área',
    'geometria-rectangulo': 'Rectángulos',
    'geometria-triangulos': 'Triángulos',
    'geometria-teorema-pitagoras': 'Teorema de Pitágoras',
    'probabilidad-media': 'Media',
    'probabilidad-mediana': 'Mediana',
    'probabilidad-moda': 'Moda',
    'probabilidad-tablas-frecuencia': 'Tablas de Frecuencia',
    'probabilidad-graficos': 'Gráficos',
  };

  const skillNames = skills.map(s => skillMap[s] || s).join(', ');

  const systemPrompt = `Eres un experto en matemáticas PAES de Chile especializado en crear preguntas de alta calidad.

Tu tarea es generar una pregunta COMPLETA de matemáticas que integre las habilidades especificadas.

REGLAS IMPORTANTES:
1. La pregunta debe ser contextualizada en una situación realista y relevante para estudiantes chilenos
2. Debe requerir aplicar TODAS las habilidades especificadas para resolverla
3. Genera 4 opciones de respuesta (A, B, C, D) donde:
   - UNA es correcta
   - TRES son distractores que reflejan errores comunes
4. La explicación debe ser paso a paso, clara y educativa
5. Usa LaTeX para fórmulas matemáticas: $...$ para inline, $$...$$ para bloques
6. Usa markdown para formato: **negrita**, listas, etc.
7. Responde SOLO con JSON válido, sin texto adicional`;

  const contextPrompt = context
    ? `\n**Contexto específico:** ${context}\n`
    : '';

  const userPrompt = `Genera una pregunta COMPLETA de matemáticas con estas especificaciones:

**Nivel:** ${level}
**Asignatura:** ${subject}
**Habilidades a evaluar:** ${skillNames}
**Dificultad:** ${difficulty}${contextPrompt}

IMPORTANTE:
- La pregunta debe integrar TODAS las habilidades de forma natural
- Debe ser apropiada para el nivel ${level}
- Los valores numéricos deben dar resultados "limpios" (sin decimales muy largos)
- Los distractores deben reflejar errores típicos de estudiantes

Responde con este formato JSON exacto:
{
  "question": "Texto de la pregunta",
  "questionLatex": "Texto de la pregunta con LaTeX",
  "options": ["opción A en LaTeX", "opción B en LaTeX", "opción C en LaTeX", "opción D en LaTeX"],
  "correctAnswer": 0,
  "explanation": "\\\\text{Paso 1:} formula \\\\quad \\\\text{Paso 2:} ... Explicación completa en LaTeX",
  "context": "Breve descripción del contexto usado",
  "variables": {"variable1": valor1, "variable2": valor2}
}

NOTA:
- correctAnswer debe ser el índice (0-3) de la opción correcta. Mezcla la posición de la respuesta correcta.
- Las opciones deben ser en formato LaTeX puro (sin delimitadores $), ejemplo: "\\\\frac{1}{2}" o "6x" o "\\\\text{9 metros}"
- La explicación debe ser en formato LaTeX completo, usa \\\\text{} para texto narrativo`;

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
        temperature: 0.8,
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

    const result = JSON.parse(jsonMatch[0]) as GenerateCompleteQuestionResponse;

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

    if (!result.question || !result.explanation) {
      throw new Error('Missing required fields in AI response');
    }

    return result;
  } catch (error) {
    console.error('Error generating complete question:', error);
    throw error;
  }
}
