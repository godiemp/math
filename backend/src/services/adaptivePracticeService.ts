/**
 * Adaptive Practice Service
 * Personalized problem selection with AI-powered Socratic hints
 */

import OpenAI from 'openai';
import { pool } from '../config/database';

// ============================================================================
// Types
// ============================================================================

export interface Topic {
  id: string;
  name: string;
  type: 'subject' | 'unit';
  level?: 'M1' | 'M2';
  subject?: string;
}

export interface Problem {
  id: string;
  question: string;
  questionLatex: string | null;
  options: string[];
  optionsLatex: string[] | null;
  correctAnswer: number;
  explanation: string;
  explanationLatex: string | null;
  difficulty: string;
  subject: string;
  unit: string;
  skills: string[];
}

export interface HintRequest {
  problem: Problem;
  studentMessage: string;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
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
// Topics
// ============================================================================

export async function getTopics(): Promise<Topic[]> {
  // Return subjects as topics for MVP
  const subjects: Topic[] = [
    { id: 'números', name: 'Números', type: 'subject' },
    { id: 'álgebra', name: 'Álgebra y Funciones', type: 'subject' },
    { id: 'geometría', name: 'Geometría', type: 'subject' },
    { id: 'probabilidad', name: 'Probabilidades y Estadística', type: 'subject' },
  ];

  return subjects;
}

// ============================================================================
// Problem Selection
// ============================================================================

export async function getNextProblem(
  userId: string,
  focus: string // 'números' | 'álgebra' | etc. | 'surprise'
): Promise<Problem | null> {
  // Build query based on focus
  let subjectFilter = '';
  const values: any[] = [];
  let paramCount = 1;

  if (focus !== 'surprise') {
    subjectFilter = `AND ap.subject = $${paramCount++}`;
    values.push(focus);
  }

  // MVP: Pick a random active problem from context_problems
  // In the future, we can add skill-based selection
  const query = `
    SELECT
      cp.id,
      cp.question,
      cp.question_latex,
      cp.options,
      cp.options_latex,
      cp.correct_answer,
      cp.explanation,
      cp.explanation_latex,
      ap.difficulty,
      ap.subject,
      ap.unit,
      ap.primary_skills
    FROM context_problems cp
    JOIN abstract_problems ap ON cp.abstract_problem_id = ap.id
    WHERE cp.status = 'active'
      AND ap.status = 'active'
      ${subjectFilter}
    ORDER BY RANDOM()
    LIMIT 1
  `;

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    question: row.question,
    questionLatex: row.question_latex,
    options: typeof row.options === 'string' ? JSON.parse(row.options) : row.options,
    optionsLatex: row.options_latex
      ? (typeof row.options_latex === 'string' ? JSON.parse(row.options_latex) : row.options_latex)
      : null,
    correctAnswer: row.correct_answer,
    explanation: row.explanation,
    explanationLatex: row.explanation_latex,
    difficulty: row.difficulty,
    subject: row.subject,
    unit: row.unit,
    skills: row.primary_skills || [],
  };
}

// ============================================================================
// AI Hints (Socratic Method)
// ============================================================================

export async function getHint(request: HintRequest): Promise<string> {
  const openai = getOpenAIClient();

  const systemPrompt = `Eres un tutor de matemáticas paciente y alentador para estudiantes chilenos preparándose para la PAES.

Tu rol es guiar al estudiante hacia la solución usando el método socrático - NUNCA des la respuesta directamente.

Reglas estrictas:
1. NUNCA reveles la respuesta correcta ni la opción correcta
2. NUNCA digas frases como "la respuesta es...", "debes elegir...", "la opción correcta es..."
3. Usa preguntas guía para que el estudiante piense
4. Si el estudiante está perdido, da una pista sobre el concepto que debe usar
5. Sé breve (2-3 oraciones máximo)
6. Usa español chileno informal pero respetuoso

Ejemplos de buenas respuestas:
- "¿Qué operación usarías primero aquí? Piensa en el orden de las operaciones."
- "Interesante intento. ¿Qué pasa si pruebas reemplazar el valor en la ecuación?"
- "Casi! Revisa el signo en el segundo paso. ¿Qué regla aplica cuando multiplicas negativos?"`;

  const problemContext = `PROBLEMA ACTUAL:
${request.problem.question}

Opciones:
${request.problem.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n')}

[Nota interna - NO REVELAR: La respuesta correcta es la opción ${String.fromCharCode(65 + request.problem.correctAnswer)}]`;

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: problemContext },
  ];

  // Add conversation history
  for (const msg of request.conversationHistory) {
    messages.push({
      role: msg.role,
      content: msg.content,
    });
  }

  // Add current message
  messages.push({
    role: 'user',
    content: request.studentMessage,
  });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    temperature: 0.7,
    max_tokens: 200,
  });

  return completion.choices[0]?.message?.content || 'Hmm, intenta de nuevo. ¿Qué concepto crees que aplica aquí?';
}

// ============================================================================
// Answer Submission
// ============================================================================

export interface SubmitAnswerResult {
  correct: boolean;
  feedback: string;
  explanation?: string;
  nextProblem?: Problem;
}

export async function submitAnswer(
  userId: string,
  problemId: string,
  answer: number,
  focus: string
): Promise<SubmitAnswerResult> {
  // Get the problem to check the answer
  const query = `
    SELECT
      cp.correct_answer,
      cp.explanation,
      cp.explanation_latex
    FROM context_problems cp
    WHERE cp.id = $1
  `;

  const result = await pool.query(query, [problemId]);

  if (result.rows.length === 0) {
    throw new Error('Problema no encontrado');
  }

  const row = result.rows[0];
  const correct = answer === row.correct_answer;

  // Get next problem
  const nextProblem = await getNextProblem(userId, focus);

  if (correct) {
    return {
      correct: true,
      feedback: '¡Correcto! Muy bien.',
      nextProblem: nextProblem || undefined,
    };
  } else {
    return {
      correct: false,
      feedback: 'No es correcto. Revisa la explicación e intenta el siguiente.',
      explanation: row.explanation_latex || row.explanation,
      nextProblem: nextProblem || undefined,
    };
  }
}
