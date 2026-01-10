/**
 * Scaffolding Generator Service
 * Generates easier scaffolding questions using AI when a student fails a problem
 */

import OpenAI from 'openai';
import { pool } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

// ============================================================================
// Types
// ============================================================================

export interface FailedQuestion {
  id: string;
  questionLatex: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
  difficultyScore?: number;
  subject: string;
  topic?: string;
  skills: string[];
}

export interface GeneratedScaffoldingQuestion {
  id: string;
  questionLatex: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  targetSkills: string[];
  difficulty: 'easy' | 'medium';
  difficultyScore: number;
  subject: string;
  topic: string;
  isGenerated: true;
}

export interface GenerateScaffoldingRequest {
  failedQuestion: FailedQuestion;
  scaffoldingLevel: number; // 1, 2, or 3 (each level easier)
}

export interface GenerateScaffoldingResponse {
  question: GeneratedScaffoldingQuestion;
  generationTimeMs: number;
}

interface ExampleQuestion {
  question: string;
  options: string[];
  difficulty: string;
}

// ============================================================================
// OpenAI Client
// ============================================================================

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get example questions from the database for few-shot prompting
 */
async function getExampleQuestions(
  subject: string,
  skills: string[],
  maxDifficultyScore: number,
  limit: number = 3
): Promise<ExampleQuestion[]> {
  try {
    // Find questions with similar skills and lower difficulty
    const query = `
      SELECT
        cp.question_latex as question,
        cp.options,
        ap.difficulty
      FROM context_problems cp
      JOIN abstract_problems ap ON cp.abstract_problem_id = ap.id
      WHERE cp.status = 'active'
        AND ap.status = 'active'
        AND ap.subject = $1
        AND ap.difficulty_score <= $2
        AND ap.primary_skills && $3
      ORDER BY ap.difficulty_score ASC
      LIMIT $4
    `;

    const result = await pool.query(query, [subject, maxDifficultyScore, skills, limit]);

    return result.rows.map((row) => ({
      question: row.question,
      options: typeof row.options === 'string' ? JSON.parse(row.options) : row.options,
      difficulty: row.difficulty,
    }));
  } catch (error) {
    console.error('Error fetching example questions:', error);
    return [];
  }
}

/**
 * Calculate target difficulty score based on scaffolding level
 * Level 1: 0.2 less than original
 * Level 2: 0.4 less than original
 * Level 3: 0.6 less than original (very easy)
 */
function calculateTargetDifficulty(
  originalScore: number,
  level: number
): { score: number; label: 'easy' | 'medium' } {
  const reduction = level * 0.2;
  const targetScore = Math.max(0.1, originalScore - reduction);

  return {
    score: targetScore,
    label: targetScore <= 0.35 ? 'easy' : 'medium',
  };
}

/**
 * Map difficulty label to approximate score
 */
function difficultyLabelToScore(difficulty: string): number {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 0.3;
    case 'medium':
      return 0.5;
    case 'hard':
      return 0.7;
    case 'extreme':
      return 0.9;
    default:
      return 0.5;
  }
}

// ============================================================================
// Main Generation Function
// ============================================================================

export async function generateScaffoldingQuestion(
  request: GenerateScaffoldingRequest
): Promise<GenerateScaffoldingResponse> {
  const startTime = Date.now();
  const openai = getOpenAIClient();

  const { failedQuestion, scaffoldingLevel } = request;

  // Calculate target difficulty
  const originalScore = failedQuestion.difficultyScore ?? difficultyLabelToScore(failedQuestion.difficulty);
  const targetDifficulty = calculateTargetDifficulty(originalScore, scaffoldingLevel);

  // Get example questions from DB for few-shot prompting
  const examples = await getExampleQuestions(
    failedQuestion.subject,
    failedQuestion.skills,
    targetDifficulty.score + 0.1, // Allow slightly harder examples
    3
  );

  // Build the prompt
  const systemPrompt = `Eres un experto en matemáticas PAES (Chile). Tu tarea es crear una pregunta de REFUERZO que ayude al estudiante a consolidar conceptos base.

REGLAS IMPORTANTES:
1. La pregunta debe ser MÁS FÁCIL que la pregunta original
2. Usa números más simples y redondos (preferir 2, 5, 10, 100 en lugar de 7, 13, 47)
3. El contexto debe ser directo y claro
4. Las 4 opciones deben ser plausibles pero solo una correcta
5. Los distractores deben basarse en errores comunes de estudiantes

FORMATO DE MATEMÁTICAS - MUY IMPORTANTE:
- TODO símbolo matemático DEBE ir entre signos de dólar: $x^2$, $\\frac{1}{2}$, $\\pi$, $50\\pi$
- El símbolo π SIEMPRE es $\\pi$, NUNCA uses el caracter π directamente
- Potencias y subíndices SIEMPRE en LaTeX: $m^2$, $x_1$
- Fracciones: $\\frac{a}{b}$
- Raíces: $\\sqrt{x}$
- El texto normal va sin formato especial, solo las matemáticas van entre $...$

EJEMPLOS CORRECTOS:
- "El área del círculo es $50\\pi$ metros cuadrados" ✓
- "Calcula $x^2 + 3x$" ✓
- "El radio mide $\\sqrt{50}$ m" ✓

EJEMPLOS INCORRECTOS:
- "El área es 50π m²" ✗ (falta $...$)
- "Calcula x² + 3x" ✗ (falta $...$)

FORMATO DE RESPUESTA - JSON válido únicamente:
{
  "questionLatex": "Texto de la pregunta con $matemáticas$ donde sea necesario",
  "options": ["opción A", "opción B", "opción C", "opción D"],
  "correctAnswer": 0,
  "explanation": "Explicación paso a paso de la solución"
}

NO incluyas texto adicional fuera del JSON.`;

  const examplesText = examples.length > 0
    ? `\n\n## EJEMPLOS DE PREGUNTAS SIMILARES (de nuestra base de datos, para referencia de estilo):
${examples.map((ex, i) => `
Ejemplo ${i + 1} (${ex.difficulty}):
${ex.question}
Opciones: ${ex.options.join(' | ')}`).join('\n')}`
    : '';

  const levelDescription = scaffoldingLevel === 1
    ? 'Reduce un poco la complejidad, simplifica los números'
    : scaffoldingLevel === 2
      ? 'Usa conceptos más básicos y números muy simples'
      : 'Pregunta muy básica, casi introductoria al tema';

  const userPrompt = `## PREGUNTA QUE EL ESTUDIANTE FALLÓ:
${failedQuestion.questionLatex}

Opciones originales:
${failedQuestion.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n')}

- Tema: ${failedQuestion.subject}
- Skills requeridas: ${failedQuestion.skills.join(', ')}
- Dificultad original: ${failedQuestion.difficulty}
${examplesText}

## TU TAREA:
Genera UNA pregunta de refuerzo de nivel ${scaffoldingLevel} de 3 (donde 3 es la más fácil).
${levelDescription}

La pregunta debe:
1. Evaluar los mismos conceptos base: ${failedQuestion.skills.join(', ')}
2. Tener dificultad "${targetDifficulty.label}"
3. Usar un contexto diferente pero claro
4. Tener 4 opciones (A, B, C, D)

Responde SOLO con el JSON, sin explicaciones adicionales.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Using GPT-4o - fallback while gpt-5.2 issues are resolved
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response
    let parsed: {
      questionLatex: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    };

    try {
      parsed = JSON.parse(responseContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseContent);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate the response structure
    if (
      !parsed.questionLatex ||
      !Array.isArray(parsed.options) ||
      parsed.options.length !== 4 ||
      typeof parsed.correctAnswer !== 'number' ||
      parsed.correctAnswer < 0 ||
      parsed.correctAnswer > 3 ||
      !parsed.explanation
    ) {
      console.error('Invalid response structure:', parsed);
      throw new Error('Invalid response structure from AI');
    }

    const generatedQuestion: GeneratedScaffoldingQuestion = {
      id: `scaffolding-${uuidv4()}`,
      questionLatex: parsed.questionLatex,
      options: parsed.options,
      correctAnswer: parsed.correctAnswer,
      explanation: parsed.explanation,
      targetSkills: failedQuestion.skills,
      difficulty: targetDifficulty.label,
      difficultyScore: targetDifficulty.score,
      subject: failedQuestion.subject,
      topic: failedQuestion.topic || failedQuestion.subject,
      isGenerated: true,
    };

    const generationTimeMs = Date.now() - startTime;

    return {
      question: generatedQuestion,
      generationTimeMs,
    };
  } catch (error) {
    console.error('Error generating scaffolding question:', error);
    throw error;
  }
}

/**
 * Generate a question similar to the original (for returning after successful scaffolding)
 */
export async function generateSimilarQuestion(
  originalQuestion: FailedQuestion
): Promise<GenerateScaffoldingResponse> {
  const startTime = Date.now();
  const openai = getOpenAIClient();

  const systemPrompt = `Eres un experto en matemáticas PAES (Chile). Tu tarea es crear una pregunta SIMILAR a la original, con la misma dificultad pero diferente contexto/números.

REGLAS:
1. La pregunta debe evaluar las MISMAS habilidades
2. La dificultad debe ser IGUAL a la original
3. Cambia los números y/o el contexto
4. Las 4 opciones deben ser plausibles

FORMATO DE MATEMÁTICAS - MUY IMPORTANTE:
- TODO símbolo matemático DEBE ir entre signos de dólar: $x^2$, $\\frac{1}{2}$, $\\pi$, $50\\pi$
- El símbolo π SIEMPRE es $\\pi$, NUNCA uses el caracter π directamente
- Potencias y subíndices SIEMPRE en LaTeX: $m^2$, $x_1$
- Fracciones: $\\frac{a}{b}$
- Raíces: $\\sqrt{x}$
- El texto normal va sin formato especial, solo las matemáticas van entre $...$

EJEMPLOS CORRECTOS:
- "El área del círculo es $50\\pi$ metros cuadrados" ✓
- "Calcula $x^2 + 3x$" ✓

EJEMPLOS INCORRECTOS:
- "El área es 50π m²" ✗ (falta $...$)
- "Calcula x² + 3x" ✗ (falta $...$)

FORMATO DE RESPUESTA - JSON válido únicamente:
{
  "questionLatex": "Texto de la pregunta",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "explanation": "Explicación paso a paso"
}`;

  const userPrompt = `## PREGUNTA ORIGINAL:
${originalQuestion.questionLatex}

Opciones:
${originalQuestion.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n')}

- Skills: ${originalQuestion.skills.join(', ')}
- Dificultad: ${originalQuestion.difficulty}

Genera una pregunta SIMILAR que evalúe los mismos conceptos pero con diferentes números o contexto.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('No response from AI');
    }

    const parsed = JSON.parse(responseContent);

    if (
      !parsed.questionLatex ||
      !Array.isArray(parsed.options) ||
      parsed.options.length !== 4 ||
      typeof parsed.correctAnswer !== 'number'
    ) {
      throw new Error('Invalid response structure from AI');
    }

    const originalScore = originalQuestion.difficultyScore ?? difficultyLabelToScore(originalQuestion.difficulty);

    const generatedQuestion: GeneratedScaffoldingQuestion = {
      id: `similar-${uuidv4()}`,
      questionLatex: parsed.questionLatex,
      options: parsed.options,
      correctAnswer: parsed.correctAnswer,
      explanation: parsed.explanation || 'Ver explicación de la pregunta original.',
      targetSkills: originalQuestion.skills,
      difficulty: originalQuestion.difficulty as 'easy' | 'medium',
      difficultyScore: originalScore,
      subject: originalQuestion.subject,
      topic: originalQuestion.topic || originalQuestion.subject,
      isGenerated: true,
    };

    return {
      question: generatedQuestion,
      generationTimeMs: Date.now() - startTime,
    };
  } catch (error) {
    console.error('Error generating similar question:', error);
    throw error;
  }
}
