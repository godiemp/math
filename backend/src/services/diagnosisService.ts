/**
 * Diagnosis Service
 *
 * Handles knowledge gap diagnosis through:
 * 1. Fetching questions for specific skills
 * 2. Analyzing errors with AI
 * 3. Generating recommendations
 */

import { randomUUID } from 'crypto';
import { pool } from '../config/database';
import {
  DiagnosisSession,
  DiagnosisQuestion,
  DiagnosisResult,
  DetectedGap,
  GapRecommendation,
  AIErrorAnalysisInput,
  AIErrorAnalysisOutput,
  GetDiagnosisQuestionsResponse,
  SkillDiagnosisRecord,
} from '../types/diagnosis';
import { generateDiagnosticQuestions, DiagnosticQuestion } from './aiService';

/**
 * Convert skill code to readable name
 * e.g., "numeros-enteros-orden" -> "Números enteros orden"
 */
function getSkillName(skillCode: string): string {
  return skillCode
    .split('-')
    .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ');
}

/**
 * Infer subject from skill codes
 * Maps skill prefixes to subjects
 */
function inferSubjectFromSkills(skills: string[]): string | null {
  const subjectMap: Record<string, string> = {
    numeros: 'números',
    numero: 'números',
    porcentaje: 'números',
    potencias: 'números',
    raices: 'números',
    racionales: 'números',
    enteros: 'números',
    decimales: 'números',
    algebra: 'álgebra',
    ecuacion: 'álgebra',
    funcion: 'álgebra',
    expresion: 'álgebra',
    geometria: 'geometría',
    area: 'geometría',
    perimetro: 'geometría',
    volumen: 'geometría',
    angulo: 'geometría',
    triangulo: 'geometría',
    probabilidad: 'probabilidad',
    estadistica: 'probabilidad',
    datos: 'probabilidad',
  };

  console.log(`🔍 Inferring subject from skills: ${JSON.stringify(skills)}`);

  for (const skill of skills) {
    // Try first part of skill code
    const prefix = skill.split('-')[0].toLowerCase();
    if (subjectMap[prefix]) {
      console.log(`✅ Found subject "${subjectMap[prefix]}" from prefix "${prefix}"`);
      return subjectMap[prefix];
    }

    // Try second part of skill code (e.g., "numeros-enteros" → "enteros")
    const parts = skill.toLowerCase().split('-');
    for (const part of parts) {
      if (subjectMap[part]) {
        console.log(`✅ Found subject "${subjectMap[part]}" from part "${part}"`);
        return subjectMap[part];
      }
    }
  }

  console.log(`⚠️ Could not infer subject from skills: ${JSON.stringify(skills)}`);
  return null;
}

/**
 * Get skills the user has declared they know for a subject
 * Used to prioritize testing what user claims to know
 */
async function getDeclaredSkillsForSubject(
  userId: string,
  subject: string,
  level: 'M1' | 'M2'
): Promise<string[]> {
  // Map subject names to skill prefixes
  const subjectPrefixes: Record<string, string[]> = {
    números: ['numeros', 'numero', 'porcentaje', 'potencias', 'raices'],
    álgebra: ['algebra', 'ecuacion', 'funcion'],
    geometría: ['geometria', 'area', 'perimetro', 'volumen', 'angulo', 'triangulo'],
    probabilidad: ['probabilidad', 'estadistica'],
  };

  const prefixes = subjectPrefixes[subject] || [];
  if (prefixes.length === 0) {
    return [];
  }

  // Build LIKE conditions for each prefix
  // Parameters: $1 = userId, $2 = level, $3+ = prefixes
  const likeConditions = prefixes.map((_, i) => `item_code LIKE $${i + 3}`);
  const likeParams = prefixes.map((p) => `${p}%`);

  const query = `
    SELECT item_code
    FROM user_knowledge_declarations
    WHERE user_id = $1
      AND declaration_type = 'skill'
      AND knows = true
      AND level = $2
      AND (${likeConditions.join(' OR ')})
  `;

  try {
    const result = await pool.query(query, [userId, level, ...likeParams]);
    return result.rows.map((r: { item_code: string }) => r.item_code);
  } catch (error) {
    console.error('Error fetching declared skills:', error);
    return [];
  }
}

// ========================================
// Question Fetching
// ========================================

interface QuestionMisconception {
  optionIndex: number;
  misconception: string;
}

interface QuestionForDiagnosis {
  id: string;
  skillId: string;
  skillName: string;
  question: string;
  questionLatex?: string;
  options: string[];
  optionsLatex?: string[];
  correctAnswer: number;
  misconceptions?: QuestionMisconception[];  // For AI-generated questions
  difficulty: string;
  subject: string;
}

/**
 * Get questions for diagnosing specific skills
 * Fetches from the questions table, filtered by skills
 */
export async function getQuestionsForSkills(
  skills: string[],
  level: 'M1' | 'M2',
  limit: number = 5
): Promise<{ sessionId: string; questions: QuestionForDiagnosis[] }> {
  const sessionId = randomUUID();

  console.log(`\n🔍 [DIAGNOSIS] Starting getQuestionsForSkills`);
  console.log(`   Skills: ${JSON.stringify(skills)}`);
  console.log(`   Level: ${level}, Limit: ${limit}`);
  console.log(`   SessionId: ${sessionId}`);

  // Query questions from database that match the requested skills
  const query = `
    SELECT
      q.id,
      q.question_latex as "questionLatex",
      q.options,
      q.correct_answer as "correctAnswer",
      q.difficulty,
      q.subject,
      q.skills
    FROM questions q
    WHERE q.level = $1
      AND q.skills && $2::text[]
    ORDER BY RANDOM()
    LIMIT $3
  `;

  try {
    console.log(`   📊 Querying 'questions' table...`);
    const result = await pool.query(query, [level, skills, limit]);
    console.log(`   📊 Found ${result.rows.length} questions in 'questions' table`);

    // Transform questions and add skill info
    const questions: QuestionForDiagnosis[] = result.rows.map((row: any) => {
      // Find the first matching skill from the question's skills array
      const matchingSkill = row.skills?.find((s: string) => skills.includes(s)) || skills[0];

      return {
        id: row.id,
        skillId: matchingSkill,
        skillName: getSkillName(matchingSkill),
        question: row.questionLatex || '',
        questionLatex: row.questionLatex,
        options: row.options || [],
        correctAnswer: row.correctAnswer,
        difficulty: row.difficulty,
        subject: row.subject,
      };
    });

    // If no questions in DB, try to get from context_problems
    if (questions.length === 0) {
      console.log(`   ⚠️ No questions in 'questions' table, trying context_problems...`);
      return await getQuestionsFromContextProblems(skills, level, limit, sessionId);
    }
    console.log(`   ✅ Returning ${questions.length} questions from 'questions' table`);

    // Create session in memory (could also store in DB for persistence)
    await createDiagnosisSession(sessionId, skills, level, questions);

    return { sessionId, questions };
  } catch (error) {
    console.error('Error fetching questions for diagnosis:', error);
    throw error;
  }
}

/**
 * Fallback: Get questions from context_problems (abstract problem system)
 */
async function getQuestionsFromContextProblems(
  skills: string[],
  level: 'M1' | 'M2',
  limit: number,
  sessionId: string
): Promise<{ sessionId: string; questions: QuestionForDiagnosis[] }> {
  console.log(`   📊 Querying 'context_problems' table...`);
  const query = `
    SELECT
      cp.id,
      cp.question,
      cp.question_latex as "questionLatex",
      cp.options,
      cp.options_latex as "optionsLatex",
      cp.correct_answer as "correctAnswer",
      ap.difficulty,
      ap.subject,
      ap.primary_skills as skills
    FROM context_problems cp
    JOIN abstract_problems ap ON cp.abstract_problem_id = ap.id
    WHERE ap.level = $1
      AND ap.primary_skills && $2::text[]
      AND cp.status = 'active'
      AND ap.status = 'active'
    ORDER BY RANDOM()
    LIMIT $3
  `;

  try {
    const result = await pool.query(query, [level, skills, limit]);
    console.log(`   📊 Found ${result.rows.length} questions in 'context_problems' table`);

    const questions: QuestionForDiagnosis[] = result.rows.map((row: any) => {
      const matchingSkill = row.skills?.find((s: string) => skills.includes(s)) || skills[0];

      return {
        id: row.id,
        skillId: matchingSkill,
        skillName: getSkillName(matchingSkill),
        question: row.question || row.questionLatex || '',
        questionLatex: row.questionLatex,
        options: row.optionsLatex || row.options || [],
        correctAnswer: row.correctAnswer,
        difficulty: row.difficulty,
        subject: row.subject,
      };
    });

    // If still no questions, try fetching by subject
    if (questions.length === 0) {
      console.log(`   ⚠️ No questions in 'context_problems' table, trying by subject...`);
      return await getQuestionsBySubject(skills, level, limit, sessionId);
    }
    console.log(`   ✅ Returning ${questions.length} questions from 'context_problems' table`);

    await createDiagnosisSession(sessionId, skills, level, questions);

    return { sessionId, questions };
  } catch (error) {
    console.error('❌ Error fetching from context_problems:', error);
    throw error;
  }
}

/**
 * Last resort: Get any questions from the same subject
 * Used when no skill-matched questions exist
 */
async function getQuestionsBySubject(
  skills: string[],
  level: 'M1' | 'M2',
  limit: number,
  sessionId: string
): Promise<{ sessionId: string; questions: QuestionForDiagnosis[] }> {
  console.log(`   🎯 Attempting to get questions by subject...`);
  let subject = inferSubjectFromSkills(skills);

  // If subject inference fails, try to generate AI questions directly
  // Default to 'números' as it's the most common subject
  if (!subject) {
    console.log(`   ⚠️ Subject inference failed, defaulting to 'números' for AI generation`);
    subject = 'números';
    // Skip DB queries and go straight to AI generation
    return await generateDiagnosticQuestionsWithAI(skills, level, limit, sessionId, subject);
  }
  console.log(`   🎯 Inferred subject: ${subject}`);

  // Try questions table by subject
  const questionsQuery = `
    SELECT
      q.id,
      q.question_latex as "questionLatex",
      q.options,
      q.correct_answer as "correctAnswer",
      q.difficulty,
      q.subject,
      q.skills
    FROM questions q
    WHERE q.level = $1
      AND q.subject = $2
    ORDER BY RANDOM()
    LIMIT $3
  `;

  try {
    console.log(`   📊 Querying 'questions' table by subject '${subject}'...`);
    let result = await pool.query(questionsQuery, [level, subject, limit]);
    console.log(`   📊 Found ${result.rows.length} questions by subject in 'questions' table`);

    // If no questions in questions table, try context_problems by subject
    if (result.rows.length === 0) {
      console.log(`   📊 Querying 'context_problems' table by subject '${subject}'...`);
      const contextQuery = `
        SELECT
          cp.id,
          cp.question,
          cp.question_latex as "questionLatex",
          cp.options,
          cp.options_latex as "optionsLatex",
          cp.correct_answer as "correctAnswer",
          ap.difficulty,
          ap.subject,
          ap.primary_skills as skills
        FROM context_problems cp
        JOIN abstract_problems ap ON cp.abstract_problem_id = ap.id
        WHERE ap.level = $1
          AND ap.subject = $2
          AND cp.status = 'active'
          AND ap.status = 'active'
        ORDER BY RANDOM()
        LIMIT $3
      `;
      result = await pool.query(contextQuery, [level, subject, limit]);
      console.log(`   📊 Found ${result.rows.length} questions by subject in 'context_problems' table`);
    }

    // If no DB questions found, generate with AI
    if (result.rows.length === 0) {
      console.log(`   📝 No DB questions found for ${subject}, generating with AI...`);
      return await generateDiagnosticQuestionsWithAI(skills, level, limit, sessionId, subject);
    }
    console.log(`   ✅ Found ${result.rows.length} questions in DB by subject`);

    const questions: QuestionForDiagnosis[] = result.rows.map((row: any) => {
      // Use first skill from the question, or the requested skill as fallback
      const skillId = row.skills?.[0] || skills[0];

      return {
        id: row.id,
        skillId,
        skillName: getSkillName(skillId),
        question: row.question || row.questionLatex || '',
        questionLatex: row.questionLatex,
        options: row.optionsLatex || row.options || [],
        correctAnswer: row.correctAnswer,
        difficulty: row.difficulty,
        subject: row.subject,
      };
    });

    await createDiagnosisSession(sessionId, skills, level, questions);

    return { sessionId, questions };
  } catch (error) {
    console.error('Error fetching questions by subject:', error);
    throw error;
  }
}

/**
 * Generate diagnostic questions using AI when no DB questions exist
 * Stores misconceptions for use during error analysis
 */
async function generateDiagnosticQuestionsWithAI(
  skills: string[],
  level: 'M1' | 'M2',
  limit: number,
  sessionId: string,
  subject: string
): Promise<{ sessionId: string; questions: QuestionForDiagnosis[] }> {
  console.log(`   🤖 [AI] Generating diagnostic questions with AI...`);
  console.log(`   🤖 [AI] Subject: ${subject}, Level: ${level}, Count: ${limit}`);
  console.log(`   🤖 [AI] Skills: ${JSON.stringify(skills)}`);

  // Check if API key is configured
  const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
  console.log(`   🤖 [AI] ANTHROPIC_API_KEY configured: ${hasApiKey}`);

  if (!hasApiKey) {
    console.error(`   ❌ [AI] ANTHROPIC_API_KEY is not configured!`);
    throw new Error('AI service not configured. Please set ANTHROPIC_API_KEY environment variable.');
  }

  try {
    // Generate questions with AI
    console.log(`   🤖 [AI] Calling generateDiagnosticQuestions...`);
    const aiQuestions = await generateDiagnosticQuestions({
      subject: subject as 'números' | 'álgebra' | 'geometría' | 'probabilidad',
      level,
      skillsToTest: skills,
      count: limit,
    });
    console.log(`   🤖 [AI] Received ${aiQuestions.length} questions from AI`);

    // Transform AI questions to QuestionForDiagnosis format
    const questions: QuestionForDiagnosis[] = aiQuestions.map((q, index) => ({
      id: `ai-${sessionId}-${index}`,  // Generated ID for AI questions
      skillId: q.skillTested,
      skillName: getSkillName(q.skillTested),
      question: q.question,
      questionLatex: q.questionLatex,
      options: q.options,
      optionsLatex: q.optionsLatex,
      correctAnswer: q.correctAnswer,
      misconceptions: q.misconceptions,  // Store for error analysis
      difficulty: 'medium',
      subject,
    }));

    await createDiagnosisSession(sessionId, skills, level, questions);

    console.log(`   ✅ [AI] Generated ${questions.length} AI diagnostic questions for ${subject}`);
    return { sessionId, questions };
  } catch (error) {
    console.error(`   ❌ [AI] Error generating AI diagnostic questions:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`   ❌ [AI] Error message: ${errorMessage}`);
    throw new Error(`No pudimos generar preguntas diagnósticas: ${errorMessage}`);
  }
}

// ========================================
// Session Management
// ========================================

// In-memory session storage (could be Redis in production)
const activeSessions = new Map<string, DiagnosisSession>();

async function createDiagnosisSession(
  sessionId: string,
  skills: string[],
  level: 'M1' | 'M2',
  questions: QuestionForDiagnosis[]
): Promise<void> {
  const session: DiagnosisSession = {
    id: sessionId,
    userId: '', // Will be set when first answer is submitted
    level,
    skillsToVerify: skills,
    questions: questions.map((q) => ({
      questionId: q.id,
      skillId: q.skillId,
      skillName: q.skillName,
      userAnswer: null,
      correctAnswer: q.correctAnswer,
      isCorrect: null,
      answeredAt: null,
      followUpResponse: null,
      detectedGap: null,
      misconceptions: q.misconceptions,  // Store for error analysis (AI-generated questions)
    })),
    status: 'in_progress',
    startedAt: Date.now(),
    completedAt: null,
  };

  activeSessions.set(sessionId, session);
}

export function getSession(sessionId: string): DiagnosisSession | undefined {
  return activeSessions.get(sessionId);
}

export function updateSession(sessionId: string, updates: Partial<DiagnosisSession>): void {
  const session = activeSessions.get(sessionId);
  if (session) {
    activeSessions.set(sessionId, { ...session, ...updates });
  }
}

// ========================================
// Answer Processing
// ========================================

export function recordAnswer(
  sessionId: string,
  questionId: string,
  userAnswer: number,
  userId: string
): { isCorrect: boolean; correctAnswer: number; requiresFollowUp: boolean } {
  const session = activeSessions.get(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }

  // Set userId if not set
  if (!session.userId) {
    session.userId = userId;
  }

  // Find and update the question
  const question = session.questions.find((q) => q.questionId === questionId);
  if (!question) {
    throw new Error('Question not found in session');
  }

  const isCorrect = userAnswer === question.correctAnswer;
  question.userAnswer = userAnswer;
  question.isCorrect = isCorrect;
  question.answeredAt = Date.now();

  activeSessions.set(sessionId, session);

  return {
    isCorrect,
    correctAnswer: question.correctAnswer,
    requiresFollowUp: !isCorrect, // Ask for explanation if wrong
  };
}

// ========================================
// AI Error Analysis
// ========================================

const DIAGNOSIS_SYSTEM_PROMPT = `Eres un tutor de matemáticas experto analizando los errores de un estudiante chileno preparando la PAES.

Tu tarea es identificar la laguna de conocimiento específica basándote en:
1. La pregunta y las opciones
2. La respuesta incorrecta del estudiante
3. La explicación que dio el estudiante sobre su razonamiento

Debes ser muy específico. No digas "no entiende álgebra", sino "confunde el signo al mover términos de un lado a otro de la ecuación".

Responde SOLO con un objeto JSON válido (sin markdown, sin texto adicional):
{
  "specificIssue": "descripción corta y específica de la laguna (máximo 20 palabras)",
  "conceptMissing": "el concepto matemático que no domina",
  "severity": "critical" | "moderate" | "minor"
}

Criterios de severidad:
- critical: Error conceptual fundamental que afecta muchos otros temas
- moderate: Error en una técnica o procedimiento específico
- minor: Error de cálculo o descuido, el concepto parece entendido`;

export async function analyzeErrorWithAI(
  input: AIErrorAnalysisInput
): Promise<AIErrorAnalysisOutput> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Fallback if no API key
    return {
      specificIssue: `Error en ${input.skillName}`,
      conceptMissing: input.skillName,
      severity: 'moderate',
    };
  }

  // Build prompt with optional expected misconception
  const misconceptionHint = input.expectedMisconception
    ? `\n\nPista sobre el error esperado: "${input.expectedMisconception}"
(Confirma si la explicación del estudiante coincide con este error, o identifica un error diferente si corresponde)`
    : '';

  const userPrompt = `Pregunta: ${input.questionLatex || input.question}

Opciones:
${input.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n')}

Respuesta correcta: ${String.fromCharCode(65 + input.correctAnswer)}
Respuesta del estudiante: ${String.fromCharCode(65 + input.userAnswer)}

Explicación del estudiante sobre su razonamiento:
"${input.followUpExplanation}"

Habilidad evaluada: ${input.skillName}${misconceptionHint}

Analiza el error y responde con el JSON.`;

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
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        system: DIAGNOSIS_SYSTEM_PROMPT,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = (await response.json()) as { content: Array<{ text: string }> };
    const text = data.content[0].text.trim();

    // Parse JSON response
    const analysis = JSON.parse(text) as AIErrorAnalysisOutput;
    return analysis;
  } catch (error) {
    console.error('Error analyzing with AI:', error);
    // Fallback response
    return {
      specificIssue: `Dificultad con ${input.skillName}`,
      conceptMissing: input.skillName,
      severity: 'moderate',
    };
  }
}

export async function processFollowUp(
  sessionId: string,
  questionId: string,
  input: AIErrorAnalysisInput
): Promise<DetectedGap> {
  const session = activeSessions.get(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }

  const question = session.questions.find((q) => q.questionId === questionId);
  if (!question) {
    throw new Error('Question not found');
  }

  // Check if question has pre-mapped misconception for the chosen answer
  let expectedMisconception: string | undefined;
  if (question.misconceptions) {
    const match = question.misconceptions.find((m) => m.optionIndex === input.userAnswer);
    expectedMisconception = match?.misconception;
  }

  // Analyze error with AI, passing expected misconception if available
  const analysis = await analyzeErrorWithAI({
    ...input,
    expectedMisconception,
  });

  // Create detected gap
  const gap: DetectedGap = {
    skillId: input.skillId,
    skillName: input.skillName,
    severity: analysis.severity,
    specificIssue: analysis.specificIssue,
    conceptMissing: analysis.conceptMissing,
    evidenceQuestionId: questionId,
    userAnswer: input.userAnswer,
    correctAnswer: input.correctAnswer,
    followUpExplanation: input.followUpExplanation,
  };

  // Update question with gap
  question.followUpResponse = input.followUpExplanation;
  question.detectedGap = gap;

  activeSessions.set(sessionId, session);

  return gap;
}

// ========================================
// Diagnosis Completion
// ========================================

export async function completeDiagnosis(
  sessionId: string,
  userId: string
): Promise<DiagnosisResult> {
  const session = activeSessions.get(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }

  // Calculate results
  const answeredQuestions = session.questions.filter((q) => q.userAnswer !== null);
  const correctAnswers = answeredQuestions.filter((q) => q.isCorrect).length;

  // Collect verified and unverified skills
  const verifiedSkills: string[] = [];
  const unverifiedSkills: string[] = [];
  const gaps: DetectedGap[] = [];

  for (const question of answeredQuestions) {
    if (question.isCorrect) {
      if (!verifiedSkills.includes(question.skillId)) {
        verifiedSkills.push(question.skillId);
      }
    } else {
      if (!unverifiedSkills.includes(question.skillId)) {
        unverifiedSkills.push(question.skillId);
      }
      if (question.detectedGap) {
        gaps.push(question.detectedGap);
      }
    }
  }

  // Generate recommendations
  const recommendations = generateRecommendations(gaps, unverifiedSkills);

  const result: DiagnosisResult = {
    sessionId,
    userId,
    level: session.level,
    totalQuestions: answeredQuestions.length,
    correctAnswers,
    verifiedSkills,
    unverifiedSkills,
    gaps,
    recommendations,
    completedAt: Date.now(),
  };

  // Update session status
  session.status = 'completed';
  session.completedAt = Date.now();
  activeSessions.set(sessionId, session);

  // Save to database
  await saveDiagnosisResult(userId, result);

  return result;
}

function generateRecommendations(
  gaps: DetectedGap[],
  unverifiedSkills: string[]
): GapRecommendation[] {
  const recommendations: GapRecommendation[] = [];

  // Sort gaps by severity (critical first)
  const sortedGaps = [...gaps].sort((a, b) => {
    const severityOrder = { critical: 0, moderate: 1, minor: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  for (const gap of sortedGaps) {
    recommendations.push({
      type: 'practice',
      skillId: gap.skillId,
      skillName: gap.skillName,
      reason: gap.specificIssue,
      priority: gap.severity === 'critical' ? 3 : gap.severity === 'moderate' ? 2 : 1,
    });
  }

  // Add recommendations for unverified skills without detected gaps
  for (const skillId of unverifiedSkills) {
    if (!gaps.find((g) => g.skillId === skillId)) {
      recommendations.push({
        type: 'practice',
        skillId,
        skillName: getSkillName(skillId),
        reason: 'Necesita más práctica',
        priority: 1,
      });
    }
  }

  return recommendations;
}

// ========================================
// Database Persistence
// ========================================

async function saveDiagnosisResult(userId: string, result: DiagnosisResult): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Save each gap to skill_diagnosis table
    for (const gap of result.gaps) {
      await client.query(
        `
        INSERT INTO skill_diagnosis (user_id, skill_code, declared_knows, verified_knows, specific_gap, diagnosed_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id, skill_code)
        DO UPDATE SET
          verified_knows = EXCLUDED.verified_knows,
          specific_gap = EXCLUDED.specific_gap,
          diagnosed_at = EXCLUDED.diagnosed_at
        `,
        [userId, gap.skillId, true, false, gap.specificIssue, result.completedAt]
      );
    }

    // Save verified skills
    for (const skillId of result.verifiedSkills) {
      await client.query(
        `
        INSERT INTO skill_diagnosis (user_id, skill_code, declared_knows, verified_knows, specific_gap, diagnosed_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id, skill_code)
        DO UPDATE SET
          verified_knows = EXCLUDED.verified_knows,
          specific_gap = NULL,
          diagnosed_at = EXCLUDED.diagnosed_at
        `,
        [userId, skillId, true, true, null, result.completedAt]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saving diagnosis result:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Get diagnosis history for a user
 */
export async function getDiagnosisHistory(
  userId: string
): Promise<SkillDiagnosisRecord[]> {
  const query = `
    SELECT
      id,
      user_id as "userId",
      skill_code as "skillCode",
      declared_knows as "declaredKnows",
      verified_knows as "verifiedKnows",
      specific_gap as "specificGap",
      diagnosed_at as "diagnosedAt"
    FROM skill_diagnosis
    WHERE user_id = $1
    ORDER BY diagnosed_at DESC
  `;

  const result = await pool.query(query, [userId]);
  return result.rows;
}
