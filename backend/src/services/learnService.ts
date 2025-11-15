/**
 * Learn Service - AI-guided problem solving with personalized guidance
 * Optimized with OpenAI for speed: model routing, compact prompts, JSON mode
 *
 * Flow:
 * 1. Assessment conversation to understand student's knowledge
 * 2. Select curated question from lib/questions
 * 3. Generate personalized step-by-step guidance
 * 4. Guide student through solving
 */

import {
  completion,
  optimizeConversationHistory,
  type ChatMessage,
} from './openaiService';

// Question type (from lib/types/core)
interface Question {
  id: string;
  topic: string;
  level: 'M1' | 'M2';
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  question: string;
  questionLatex?: string;
  // Options in LaTeX format
  options: string[];
  correctAnswer: number;
  // Explanation in LaTeX format
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  operacionBase?: string;
  skills: string[];
}

// ============================================================================
// Types & Interfaces
// ============================================================================

interface AssessmentOptions {
  userId: string;
  level: 'M1' | 'M2';
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
}

interface AssessmentResponse {
  sessionId: string;
  message: string;
  questions: string[];
}

interface ContinueAssessmentOptions {
  sessionId: string;
  userMessage: string;
}

interface ContinueAssessmentResponse {
  message: string;
  isComplete: boolean;
  assessment?: StudentAssessment;
}

interface StudentAssessment {
  knownConcepts: string[];
  uncertainConcepts: string[];
  gaps: string[];
  confidenceLevel: 'low' | 'medium' | 'high';
  recommendedDifficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  recommendedSkills: string[];
}

interface SelectQuestionOptions {
  sessionId: string;
  assessment: StudentAssessment;
  level: 'M1' | 'M2';
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  availableQuestions: Question[];
}

interface SelectQuestionResponse {
  problemId: string;
  question: Question;
  rationale: string;
}

interface GenerateGuidanceOptions {
  problemId: string;
  question: Question;
  assessment: StudentAssessment;
}

interface GenerateGuidanceResponse {
  problemId: string;
  steps: GuidanceStep[];
  personalizedHint: string;
}

interface GuidanceStep {
  number: number;
  description: string;
  guidance: string;
  correctAnswer: string;
  explanation: string;
}

interface VerifyStepOptions {
  problemId: string;
  stepNumber: number;
  userAnswer: string;
}

interface VerifyStepResponse {
  correct: boolean;
  feedback: string;
  correctAnswer?: string;
  canProceed: boolean;
}

interface GetNextStepOptions {
  problemId: string;
  currentStep: number;
}

interface GetNextStepResponse {
  stepNumber: number;
  stepDescription: string;
  stepGuidance: string;
  isComplete: boolean;
  finalAnswer?: string;
}

// ============================================================================
// In-memory storage (in production, use database)
// ============================================================================

interface AssessmentSession {
  userId: string;
  level: 'M1' | 'M2';
  subject: string;
  conversationHistory: Array<{ role: 'assistant' | 'user'; content: string }>;
  assessment?: StudentAssessment;
  createdAt: number;
}

interface LearningProblem {
  userId: string;
  question: Question;
  assessment: StudentAssessment;
  steps: GuidanceStep[];
  personalizedHint: string;
  currentStep: number;
  createdAt: number;
}

const assessmentSessions = new Map<string, AssessmentSession>();
const activeLearningProblems = new Map<string, LearningProblem>();

// ============================================================================
// Phase 1: Assessment Conversation
// ============================================================================

/**
 * Start an assessment conversation with the student
 */
export async function assessStudent(
  options: AssessmentOptions
): Promise<AssessmentResponse> {
  const { userId, level, subject } = options;
  const sessionId = `assess_${userId}_${Date.now()}`;

  const initialMessage = `¡Hola! Vamos a trabajar en **${subject}** de nivel **${level}**.

Antes de empezar, quiero entender mejor cómo te sientes con este tema para elegir el problema perfecto para ti.

Cuéntame:
- ¿Qué sabes sobre ${subject}?
- ¿Hay algo específico que te cueste o te confunda?
- ¿Te sientes cómodo/a con este tema o es algo nuevo para ti?

No te preocupes si hay cosas que no entiendes, ¡estoy aquí para ayudarte! 😊`;

  const questions = [
    `¿Qué conceptos de ${subject} ya conoces o has practicado?`,
    `¿Hay algo específico de ${subject} que te resulte difícil o confuso?`,
    `Del 1 al 5, ¿qué tan cómodo/a te sientes con ${subject}?`
  ];

  // Store session
  assessmentSessions.set(sessionId, {
    userId,
    level,
    subject,
    conversationHistory: [
      { role: 'assistant', content: initialMessage }
    ],
    createdAt: Date.now()
  });

  return {
    sessionId,
    message: initialMessage,
    questions
  };
}

/**
 * Continue the assessment conversation
 * Optimized with OpenAI JSON mode and fast model for follow-ups
 */
export async function continueAssessment(
  options: ContinueAssessmentOptions
): Promise<ContinueAssessmentResponse> {
  const { sessionId, userMessage } = options;

  const session = assessmentSessions.get(sessionId);
  if (!session) {
    throw new Error('Assessment session not found or expired');
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  // Add user message to history
  session.conversationHistory.push({
    role: 'user',
    content: userMessage
  });

  // Determine if we have enough information or need more conversation
  const conversationTurns = session.conversationHistory.filter(m => m.role === 'user').length;

  if (conversationTurns >= 2) {
    // We have enough information, analyze and provide assessment
    // COMPACT prompt with JSON mode
    const conversationSummary = session.conversationHistory
      .map(m => `${m.role === 'user' ? 'E' : 'T'}: ${m.content}`)
      .join('\n');

    const result = await completion({
      messages: [
        {
          role: 'system',
          content: `Analiza conversación estudiante-tutor sobre ${session.subject} (${session.level}). Genera perfil del estudiante en JSON.`,
        },
        {
          role: 'user',
          content: `Conversación:\n${conversationSummary}\n\nResponde JSON con: knownConcepts, uncertainConcepts, gaps, confidenceLevel (low/medium/high), recommendedDifficulty (easy/medium/hard/extreme), recommendedSkills, nextMessage (2-3 oraciones confirmando nivel y tipo de problema a dar).`,
        },
      ],
      taskType: 'assessment_analysis',
      jsonMode: true,
      temperature: 0.7,
    });

    const analysis = JSON.parse(result.content);

    // Store assessment in session
    session.assessment = {
      knownConcepts: analysis.knownConcepts || [],
      uncertainConcepts: analysis.uncertainConcepts || [],
      gaps: analysis.gaps || [],
      confidenceLevel: analysis.confidenceLevel || 'medium',
      recommendedDifficulty: analysis.recommendedDifficulty || 'medium',
      recommendedSkills: analysis.recommendedSkills || [],
    };

    session.conversationHistory.push({
      role: 'assistant',
      content: analysis.nextMessage
    });

    assessmentSessions.set(sessionId, session);

    console.log(`✅ Assessment analysis: ${result.model}, ${result.totalTokens} tokens, ${result.latencyMs}ms`);

    return {
      message: analysis.nextMessage,
      isComplete: true,
      assessment: session.assessment
    };
  } else {
    // Need more conversation - ask follow-up (use FAST model)
    const conversationSummary = session.conversationHistory
      .map(m => `${m.role === 'user' ? 'E' : 'T'}: ${m.content}`)
      .join('\n');

    const result = await completion({
      messages: [
        {
          role: 'system',
          content: `Tutor PAES evaluando conocimiento de ${session.subject} (${session.level}). Genera pregunta de seguimiento breve (1-2 oraciones).`,
        },
        {
          role: 'user',
          content: `Conversación:\n${conversationSummary}\n\nResponde JSON con: message (pregunta de seguimiento para entender mejor su nivel).`,
        },
      ],
      taskType: 'follow_up_question',
      jsonMode: true,
      temperature: 0.8,
    });

    const followUp = JSON.parse(result.content);

    session.conversationHistory.push({
      role: 'assistant',
      content: followUp.message
    });

    assessmentSessions.set(sessionId, session);

    console.log(`✅ Follow-up: ${result.model}, ${result.totalTokens} tokens, ${result.latencyMs}ms`);

    return {
      message: followUp.message,
      isComplete: false
    };
  }
}

// ============================================================================
// Phase 2: Question Selection from lib/questions
// ============================================================================

/**
 * Select a curated question from lib/questions based on student assessment
 * Optimized with OpenAI JSON mode and compact prompts
 */
export async function selectQuestion(
  options: SelectQuestionOptions
): Promise<SelectQuestionResponse> {
  const { sessionId, assessment, level, subject, availableQuestions } = options;

  if (availableQuestions.length === 0) {
    throw new Error(`No questions found for ${subject} at level ${level}`);
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  // Filter by difficulty
  const candidateQuestions = availableQuestions.filter(
    (q: Question) => q.difficulty === assessment.recommendedDifficulty
  );

  // If no questions at recommended difficulty, expand search
  const questionsToConsider = candidateQuestions.length > 0
    ? candidateQuestions
    : availableQuestions;

  // Prepare COMPACT question summaries (reduced data)
  const questionSummaries = questionsToConsider.slice(0, 15).map((q: Question) => ({
    id: q.id,
    skills: q.skills.join(','),
    diff: q.difficulty,
  }));

  // COMPACT prompt for question selection
  const result = await completion({
    messages: [
      {
        role: 'system',
        content: `Selecciona la mejor pregunta para el estudiante. Considera sus gaps y nivel de confianza.`,
      },
      {
        role: 'user',
        content: `Estudiante: conoce [${assessment.knownConcepts.join(',')}], gaps [${assessment.gaps.join(',')}], confianza ${assessment.confidenceLevel}, dificultad ${assessment.recommendedDifficulty}.

Preguntas: ${JSON.stringify(questionSummaries)}

Responde JSON con: selectedQuestionId, rationale (2-3 oraciones breves).`,
      },
    ],
    taskType: 'json_parsing',
    jsonMode: true,
    temperature: 0.7,
  });

  const selection = JSON.parse(result.content);

  console.log(`✅ Question selection: ${result.model}, ${result.totalTokens} tokens, ${result.latencyMs}ms`);

  // Find the selected question
  const selectedQuestion = questionsToConsider.find(
    (q: Question) => q.id === selection.selectedQuestionId
  );

  if (!selectedQuestion) {
    // Fallback: pick first question
    const fallbackQuestion = questionsToConsider[0];
    const problemId = `learn_${sessionId}_${Date.now()}`;

    return {
      problemId,
      question: fallbackQuestion,
      rationale: 'Seleccioné esta pregunta para comenzar tu práctica.'
    };
  }

  const problemId = `learn_${sessionId}_${Date.now()}`;

  return {
    problemId,
    question: selectedQuestion,
    rationale: selection.rationale
  };
}

// ============================================================================
// Phase 3: Generate Personalized Guidance for Selected Question
// ============================================================================

/**
 * Generate personalized step-by-step guidance for the selected question
 * Optimized with OpenAI JSON mode and compact prompts
 */
export async function generatePersonalizedGuidance(
  options: GenerateGuidanceOptions
): Promise<GenerateGuidanceResponse> {
  const { problemId, question, assessment } = options;

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  // COMPACT system prompt (reduced from ~300 tokens to ~100 tokens)
  const systemPrompt = `Tutor PAES. Genera 3-5 pasos personalizados para resolver el problema. Usa LaTeX: $expresión$. Cada paso debe ser verificable.`;

  // COMPACT user prompt
  const userPrompt = `Estudiante: conoce [${assessment.knownConcepts.join(',')}], gaps [${assessment.gaps.join(',')}], confianza ${assessment.confidenceLevel}.

Pregunta: ${question.questionLatex || question.question}
Correcta: ${question.optionsLatex?.[question.correctAnswer] || question.options[question.correctAnswer]}

Genera JSON con:
- steps: [{number, description, guidance (personalizada), correctAnswer, explanation}]
- personalizedHint: pista inicial basada en sus conocimientos`;

  try {
    const result = await completion({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      taskType: 'guidance_generation',
      jsonMode: true,
      temperature: 0.7,
    });

    const guidance = JSON.parse(result.content);

    console.log(`✅ Guidance generation: ${result.model}, ${result.totalTokens} tokens, ${result.latencyMs}ms`);

    return {
      problemId,
      steps: guidance.steps || [],
      personalizedHint: guidance.personalizedHint || 'Comienza identificando los datos del problema.'
    };
  } catch (error) {
    console.error('Error generating personalized guidance:', error);
    throw error;
  }
}

/**
 * Start a learning session with selected question and personalized guidance
 */
export async function startLearningSession(
  userId: string,
  problemId: string,
  question: Question,
  assessment: StudentAssessment,
  steps: GuidanceStep[],
  personalizedHint: string
): Promise<void> {
  activeLearningProblems.set(problemId, {
    userId,
    question,
    assessment,
    steps,
    personalizedHint,
    currentStep: 0,
    createdAt: Date.now()
  });
}

// ============================================================================
// Phase 4: Guide Through Solving
// ============================================================================

/**
 * Get the next step in the problem-solving process
 */
export async function getNextStep(
  options: GetNextStepOptions
): Promise<GetNextStepResponse> {
  const { problemId, currentStep } = options;

  const problemData = activeLearningProblems.get(problemId);
  if (!problemData) {
    throw new Error('Problem not found or expired');
  }

  const nextStep = currentStep + 1;
  const step = problemData.steps[nextStep - 1];

  if (!step) {
    // Problem is complete
    const correctAnswer = problemData.question.options[problemData.question.correctAnswer];

    return {
      stepNumber: nextStep,
      stepDescription: '¡Felicidades! Has completado todos los pasos.',
      stepGuidance: problemData.question.explanation,
      isComplete: true,
      finalAnswer: correctAnswer
    };
  }

  return {
    stepNumber: nextStep,
    stepDescription: step.description,
    stepGuidance: step.guidance,
    isComplete: false
  };
}

/**
 * Verify user's answer for a specific step
 * Optimized with OpenAI fast model for quick verification
 */
export async function verifyStep(
  options: VerifyStepOptions
): Promise<VerifyStepResponse> {
  const { problemId, stepNumber, userAnswer } = options;

  const problemData = activeLearningProblems.get(problemId);
  if (!problemData) {
    throw new Error('Problem not found or expired');
  }

  const step = problemData.steps[stepNumber - 1];
  if (!step) {
    throw new Error('Invalid step number');
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  try {
    // COMPACT verification prompt using FAST model
    const result = await completion({
      messages: [
        {
          role: 'system',
          content: 'Verifica respuesta matemática. Considera notación equivalente. Usa LaTeX: $expresión$.',
        },
        {
          role: 'user',
          content: `Paso: ${step.description}
Esperada: ${step.correctAnswer}
Estudiante: ${userAnswer}

Responde JSON con: correct (boolean), feedback (2-3 oraciones con LaTeX).`,
        },
      ],
      taskType: 'step_verification',
      jsonMode: true,
      temperature: 0.3,
    });

    const verification = JSON.parse(result.content);

    console.log(`✅ Step verification: ${result.model}, ${result.totalTokens} tokens, ${result.latencyMs}ms`);

    // Update problem progress if correct
    if (verification.correct) {
      problemData.currentStep = stepNumber;
      activeLearningProblems.set(problemId, problemData);
    }

    return {
      correct: verification.correct,
      feedback: verification.feedback,
      correctAnswer: verification.correct ? undefined : step.correctAnswer,
      canProceed: verification.correct,
    };
  } catch (error) {
    console.error('Error verifying step:', error);
    throw error;
  }
}

/**
 * Get problem status
 */
export async function getProblemStatus(problemId: string) {
  const problemData = activeLearningProblems.get(problemId);
  if (!problemData) {
    return null;
  }

  return {
    currentStep: problemData.currentStep,
    totalSteps: problemData.steps.length,
    isComplete: problemData.currentStep >= problemData.steps.length,
  };
}

/**
 * Get assessment session
 */
export function getAssessmentSession(sessionId: string): AssessmentSession | undefined {
  return assessmentSessions.get(sessionId);
}

// ============================================================================
// NEW: Socratic Method Learning (Proactive Question Selection)
// ============================================================================

interface SocraticSession {
  userId: string;
  question: Question;
  level: 'M1' | 'M2';
  subject: string;
  conversationHistory: Array<{ role: 'assistant' | 'user'; content: string }>;
  isComplete: boolean;
  createdAt: number;
}

interface StartSocraticOptions {
  userId: string;
  question: Question;
  level: 'M1' | 'M2';
  subject: string;
}

interface StartSocraticResponse {
  sessionId: string;
  initialMessage: string;
}

interface ContinueSocraticOptions {
  sessionId: string;
  userMessage: string;
}

interface ContinueSocraticResponse {
  message: string;
  isComplete: boolean;
  summary?: string;
}

const socraticSessions = new Map<string, SocraticSession>();

/**
 * Start a Socratic learning session with a selected question
 * Optimized with OpenAI JSON mode and compact prompts
 */
export async function startSocraticSession(
  options: StartSocraticOptions
): Promise<StartSocraticResponse> {
  const { userId, question, level, subject } = options;
  const sessionId = `socratic_${userId}_${Date.now()}`;

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  // COMPACT Socratic prompt
  const systemPrompt = `Tutor PAES con método socrático. NUNCA des la respuesta directamente. Guía con preguntas. LaTeX: $expresión$. Respuestas concisas (2-4 oraciones + 1-2 preguntas).`;

  const optionsText = question.options.map((opt, i) => `${String.fromCharCode(65+i)}) ${question.optionsLatex?.[i] || opt}`).join(' | ');

  const userPrompt = `Problema: ${question.questionLatex || question.question}
Opciones: ${optionsText}
Correcta: ${String.fromCharCode(65 + question.correctAnswer)} | Tema: ${subject} (${level})

Genera primera pregunta socrática: saluda brevemente, pregunta qué se pide (NO des pistas). Responde JSON con: message.`;

  try {
    const result = await completion({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      taskType: 'socratic_response',
      jsonMode: true,
      temperature: 0.8,
    });

    const parsed = JSON.parse(result.content);

    console.log(`✅ Socratic start: ${result.model}, ${result.totalTokens} tokens, ${result.latencyMs}ms`);

    // Store session
    socraticSessions.set(sessionId, {
      userId,
      question,
      level,
      subject,
      conversationHistory: [
        { role: 'assistant', content: parsed.message }
      ],
      isComplete: false,
      createdAt: Date.now()
    });

    return {
      sessionId,
      initialMessage: parsed.message
    };
  } catch (error) {
    console.error('Error starting Socratic session:', error);
    throw error;
  }
}

/**
 * Continue the Socratic conversation
 * Optimized with OpenAI, conversation summarization, and JSON mode
 */
export async function continueSocraticSession(
  options: ContinueSocraticOptions
): Promise<ContinueSocraticResponse> {
  const { sessionId, userMessage } = options;

  const session = socraticSessions.get(sessionId);
  if (!session) {
    throw new Error('Socratic session not found or expired');
  }

  if (session.isComplete) {
    throw new Error('This learning session has already been completed');
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  // Add user message to history
  session.conversationHistory.push({
    role: 'user',
    content: userMessage
  });

  // COMPACT Socratic system prompt
  const correctLetter = String.fromCharCode(65 + session.question.correctAnswer);
  const systemPrompt = `Tutor PAES socrático. NUNCA des respuesta directa. Guía con preguntas. LaTeX: $expresión$. Conciso: 2-4 oraciones + 1-2 preguntas. Si estudiante dice "${correctLetter}", marca isComplete=true y resume.`;

  // Build optimized context
  const optionsText = session.question.options.map((opt, i) =>
    `${String.fromCharCode(65+i)}) ${session.question.optionsLatex?.[i] || opt}`
  ).join(' | ');

  const conversationSummary = session.conversationHistory
    .map(m => `${m.role === 'user' ? 'E' : 'T'}: ${m.content}`)
    .join('\n');

  // COMPACT user prompt
  const userPrompt = `Problema: ${session.question.questionLatex || session.question.question}
Opciones: ${optionsText}
Correcta: ${correctLetter}

Conversación:
${conversationSummary}

Continúa guiando. Responde JSON con: message (LaTeX), isComplete (boolean), summary (solo si isComplete).`;

  try {
    // Use optimized conversation history if too long
    const messages: ChatMessage[] = await optimizeConversationHistory(
      systemPrompt,
      [{ role: 'user', content: userPrompt }],
      5,
      2000
    );

    const result = await completion({
      messages,
      taskType: 'socratic_response',
      jsonMode: true,
      temperature: 0.7,
    });

    const parsed = JSON.parse(result.content);

    console.log(`✅ Socratic continue: ${result.model}, ${result.totalTokens} tokens, ${result.latencyMs}ms`);

    // Update session
    session.conversationHistory.push({
      role: 'assistant',
      content: parsed.message
    });

    if (parsed.isComplete) {
      session.isComplete = true;
    }

    socraticSessions.set(sessionId, session);

    return {
      message: parsed.message,
      isComplete: parsed.isComplete || false,
      summary: parsed.summary
    };
  } catch (error) {
    console.error('Error continuing Socratic session:', error);
    throw error;
  }
}

/**
 * Get Socratic session
 */
export function getSocraticSession(sessionId: string): SocraticSession | undefined {
  return socraticSessions.get(sessionId);
}
