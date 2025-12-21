/**
 * AI Service for content summarization and educational assistance
 * Uses Anthropic Claude API for high-quality educational content processing
 */

import { pool } from '../config/database';

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
 */
export async function aiChat(options: AIChatOptions): Promise<AIChatResponse> {
  const startTime = Date.now();
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
    userMessage,
    userId,
    quizSessionId,
    questionId
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
          'claude-sonnet-4-5-20250929',
          turnNumber,
          responseTime,
          JSON.stringify(requestContext),
          Date.now()
        ]);

        console.log(`✅ Saved AI chat interaction for user ${userId}, turn ${turnNumber}`);
      } catch (dbError) {
        // Log error but don't fail the request - interaction data is important but not critical
        console.error('❌ Failed to save AI interaction to database:', dbError);
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
 * AI Help - Provides explanations when students answer incorrectly
 */
export async function aiHelp(options: AIHelpOptions): Promise<AIHelpResponse> {
  const startTime = Date.now();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
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
          'claude-sonnet-4-5-20250929',
          1,
          responseTime,
          JSON.stringify(requestContext),
          Date.now()
        ]);

        console.log(`✅ Saved AI help interaction for user ${userId}`);
      } catch (dbError) {
        // Log error but don't fail the request
        console.error('❌ Failed to save AI interaction to database:', dbError);
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

// ========================================
// Diagnostic Question Generation
// ========================================

interface GenerateDiagnosticQuestionsInput {
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  level: 'M1' | 'M2';
  skillsToTest: string[];
  count: number;
}

interface DiagnosticQuestionMisconception {
  optionIndex: number;
  misconception: string;
}

export interface DiagnosticQuestion {
  question: string;
  questionLatex: string;
  options: string[];
  optionsLatex: string[];
  correctAnswer: number;
  skillTested: string;
  misconceptions: DiagnosticQuestionMisconception[];
}

/**
 * Generate diagnostic questions with misconception-mapped distractors
 *
 * Key difference from generateCompleteQuestion():
 * - Generates MULTIPLE questions in one API call (faster)
 * - Each wrong answer has a NAMED misconception
 * - Questions test CORE concepts to reveal WHY student doesn't understand
 */
export async function generateDiagnosticQuestions(
  input: GenerateDiagnosticQuestionsInput
): Promise<DiagnosticQuestion[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const { subject, level, skillsToTest, count } = input;

  // Map skill codes to readable names
  const skillNames = skillsToTest.map((skill) => {
    return skill
      .split('-')
      .map((word, i) => (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
      .join(' ');
  });

  const systemPrompt = `Eres un experto en diseño de evaluaciones diagnósticas para matemáticas PAES Chile.

Tu tarea es crear preguntas diagnósticas que:
1. Evalúen directamente las habilidades especificadas
2. Tengan 4 opciones donde cada respuesta incorrecta revele una confusión ESPECÍFICA y NOMBRADA
3. Sean de dificultad apropiada para ${level}

Las preguntas deben:
- Ir al corazón del concepto, no a detalles periféricos
- Usar números/valores que hagan evidentes los errores comunes
- Estar en español chileno, formato LaTeX para matemáticas
- Cada distractor debe revelar UN error conceptual específico (no simplemente "error de cálculo")

IMPORTANTE:
- La respuesta debe ser SOLO un array JSON válido, sin texto adicional
- Cada pregunta debe evaluar UNA habilidad de la lista proporcionada
- Los distractores deben ser errores REALES que los estudiantes cometen`;

  const userPrompt = `Genera ${count} preguntas diagnósticas para el tema "${subject}" nivel ${level}.

Habilidades a evaluar:
${skillsToTest.map((s, i) => `- ${s} (${skillNames[i]})`).join('\n')}

Para cada pregunta, genera:
1. Una pregunta clara que evalúe el corazón del concepto
2. 4 opciones de respuesta en LaTeX
3. La posición de la respuesta correcta (0-3)
4. Para cada distractor, la confusión específica que revela

Responde con un array JSON:
[
  {
    "question": "texto de la pregunta",
    "questionLatex": "pregunta con $LaTeX$",
    "options": ["opción A", "opción B", "opción C", "opción D"],
    "optionsLatex": ["$A$", "$B$", "$C$", "$D$"],
    "correctAnswer": 0,
    "skillTested": "skill-code-exacto",
    "misconceptions": [
      { "optionIndex": 1, "misconception": "descripción del error conceptual" },
      { "optionIndex": 2, "misconception": "descripción del error conceptual" },
      { "optionIndex": 3, "misconception": "descripción del error conceptual" }
    ]
  }
]

IMPORTANTE:
- Las opciones deben ser en formato LaTeX puro (sin delimitadores $)
- correctAnswer es el índice (0-3) de la respuesta correcta
- misconceptions solo incluye los índices de respuestas INCORRECTAS
- skillTested debe ser exactamente uno de los skill codes proporcionados`;

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
        max_tokens: 4096,
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

    // Extract JSON array from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON array from AI response');
    }

    const questions = JSON.parse(jsonMatch[0]) as DiagnosticQuestion[];

    // Validate each question
    for (const q of questions) {
      if (
        typeof q.correctAnswer !== 'number' ||
        q.correctAnswer < 0 ||
        q.correctAnswer > 3
      ) {
        throw new Error('Invalid correctAnswer index in diagnostic question');
      }

      if (!Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error('Invalid options array in diagnostic question');
      }

      if (!q.question || !q.skillTested) {
        throw new Error('Missing required fields in diagnostic question');
      }

      // Ensure misconceptions don't include the correct answer
      if (q.misconceptions) {
        q.misconceptions = q.misconceptions.filter(
          (m) => m.optionIndex !== q.correctAnswer
        );
      }
    }

    console.log(`✅ Generated ${questions.length} diagnostic questions for ${subject}`);
    return questions;
  } catch (error) {
    console.error('Error generating diagnostic questions:', error);
    throw error;
  }
}
