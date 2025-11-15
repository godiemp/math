/**
 * Learn Service - AI-guided problem solving with personalized guidance
 * Flow:
 * 1. Assessment conversation to understand student's knowledge
 * 2. Select curated question from lib/questions
 * 3. Generate personalized step-by-step guidance
 * 4. Guide student through solving
 */

// Question type (from lib/types/core)
interface Question {
  id: string;
  topic: string;
  level: 'M1' | 'M2';
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  question: string;
  questionLatex?: string;
  options: string[];
  optionsLatex?: string[];
  correctAnswer: number;
  explanation: string;
  explanationLatex?: string;
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
 */
export async function continueAssessment(
  options: ContinueAssessmentOptions
): Promise<ContinueAssessmentResponse> {
  const { sessionId, userMessage } = options;

  const session = assessmentSessions.get(sessionId);
  if (!session) {
    throw new Error('Assessment session not found or expired');
  }

  // Add user message to history
  session.conversationHistory.push({
    role: 'user',
    content: userMessage
  });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  // Determine if we have enough information or need more conversation
  const conversationTurns = session.conversationHistory.filter(m => m.role === 'user').length;

  if (conversationTurns >= 2) {
    // We have enough information, analyze and provide assessment
    const analysisPrompt = `Eres un tutor de matemáticas experto. Has conversado con un estudiante sobre ${session.subject} de nivel ${session.level}.

Aquí está la conversación:
${session.conversationHistory.map(m => `${m.role === 'user' ? 'Estudiante' : 'Tutor'}: ${m.content}`).join('\n\n')}

Analiza la conversación y genera un perfil del estudiante. Responde con JSON:
{
  "knownConcepts": ["conceptos que el estudiante mencionó que conoce"],
  "uncertainConcepts": ["conceptos donde muestra incertidumbre"],
  "gaps": ["áreas donde claramente tiene dificultades o desconocimiento"],
  "confidenceLevel": "low" | "medium" | "high",
  "recommendedDifficulty": "easy" | "medium" | "hard" | "extreme",
  "recommendedSkills": ["habilidades específicas a practicar basado en sus gaps"],
  "nextMessage": "Mensaje personalizado de 2-3 oraciones confirmando lo que entendiste de su nivel y qué tipo de problema vas a darle"
}`;

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
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: analysisPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('AI assessment analysis failed');
    }

    const data = await response.json() as { content: Array<{ text: string }> };
    const responseText = data.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Failed to parse assessment');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Store assessment in session
    session.assessment = {
      knownConcepts: analysis.knownConcepts,
      uncertainConcepts: analysis.uncertainConcepts,
      gaps: analysis.gaps,
      confidenceLevel: analysis.confidenceLevel,
      recommendedDifficulty: analysis.recommendedDifficulty,
      recommendedSkills: analysis.recommendedSkills,
    };

    session.conversationHistory.push({
      role: 'assistant',
      content: analysis.nextMessage
    });

    assessmentSessions.set(sessionId, session);

    return {
      message: analysis.nextMessage,
      isComplete: true,
      assessment: session.assessment
    };
  } else {
    // Need more conversation - ask follow-up
    const followUpPrompt = `Eres un tutor de matemáticas Socratiano. Estás evaluando el conocimiento de un estudiante sobre ${session.subject} de nivel ${session.level}.

Conversación hasta ahora:
${session.conversationHistory.map(m => `${m.role === 'user' ? 'Estudiante' : 'Tutor'}: ${m.content}`).join('\n\n')}

Genera una pregunta de seguimiento amigable y breve (1-2 oraciones) para entender mejor su nivel. Enfócate en identificar conceptos específicos que conoce o le cuestan. Responde con JSON:
{
  "message": "tu pregunta de seguimiento"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 256,
        temperature: 0.8,
        messages: [
          {
            role: 'user',
            content: followUpPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('AI follow-up generation failed');
    }

    const data = await response.json() as { content: Array<{ text: string }> };
    const responseText = data.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Failed to parse follow-up');
    }

    const followUp = JSON.parse(jsonMatch[0]);

    session.conversationHistory.push({
      role: 'assistant',
      content: followUp.message
    });

    assessmentSessions.set(sessionId, session);

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
 */
export async function selectQuestion(
  options: SelectQuestionOptions
): Promise<SelectQuestionResponse> {
  const { sessionId, assessment, level, subject, availableQuestions } = options;

  if (availableQuestions.length === 0) {
    throw new Error(`No questions found for ${subject} at level ${level}`);
  }

  // Filter by difficulty
  const candidateQuestions = availableQuestions.filter(
    (q: Question) => q.difficulty === assessment.recommendedDifficulty
  );

  // If no questions at recommended difficulty, expand search
  const questionsToConsider = candidateQuestions.length > 0
    ? candidateQuestions
    : availableQuestions;

  // Use AI to select the most appropriate question
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  // Prepare question summaries for AI
  const questionSummaries = questionsToConsider.slice(0, 20).map((q: Question) => ({
    id: q.id,
    topic: q.topic,
    difficulty: q.difficulty,
    skills: q.skills,
    operacionBase: q.operacionBase || 'N/A'
  }));

  const selectionPrompt = `Eres un tutor de matemáticas. Necesitas seleccionar LA MEJOR pregunta para este estudiante.

**Perfil del estudiante:**
- Conceptos que conoce: ${assessment.knownConcepts.join(', ')}
- Conceptos con incertidumbre: ${assessment.uncertainConcepts.join(', ')}
- Gaps/dificultades: ${assessment.gaps.join(', ')}
- Nivel de confianza: ${assessment.confidenceLevel}
- Dificultad recomendada: ${assessment.recommendedDifficulty}

**Preguntas disponibles:**
${JSON.stringify(questionSummaries, null, 2)}

Selecciona UNA pregunta que:
1. Aborde sus gaps sin ser demasiado abrumadora
2. Construya sobre lo que ya conoce
3. Sea apropiada para su nivel de confianza

Responde con JSON:
{
  "selectedQuestionId": "id de la pregunta elegida",
  "rationale": "Breve explicación (2-3 oraciones) de por qué elegiste esta pregunta para este estudiante específico"
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 512,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: selectionPrompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('AI question selection failed');
  }

  const data = await response.json() as { content: Array<{ text: string }> };
  const responseText = data.content[0].text;
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error('Failed to parse question selection');
  }

  const selection = JSON.parse(jsonMatch[0]);

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
 */
export async function generatePersonalizedGuidance(
  options: GenerateGuidanceOptions
): Promise<GenerateGuidanceResponse> {
  const { problemId, question, assessment } = options;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const systemPrompt = `Eres un tutor experto en matemáticas PAES de Chile. Tu especialidad es crear guías paso a paso PERSONALIZADAS.

IMPORTANTE:
- Genera 3-5 pasos claros para resolver el problema
- PERSONALIZA la guía basándote en lo que el estudiante sabe y sus gaps
- Si tiene gaps en conceptos básicos, refuérzalos en los pasos
- Si ya conoce ciertos conceptos, no los sobre-expliques
- Usa LaTeX para todas las expresiones matemáticas: $expresión$
- Cada paso debe ser verificable con una respuesta específica

FORMATO LATEX:
- Inline: $x + 5 = 10$
- Fracciones: $\\frac{a}{b}$
- Raíces: $\\sqrt{x}$
- Exponentes: $x^2$`;

  const userPrompt = `Genera una guía paso a paso PERSONALIZADA para este estudiante.

**Perfil del estudiante:**
- Conoce: ${assessment.knownConcepts.join(', ')}
- Tiene dudas en: ${assessment.uncertainConcepts.join(', ')}
- Gaps: ${assessment.gaps.join(', ')}
- Confianza: ${assessment.confidenceLevel}

**Pregunta seleccionada:**
${question.questionLatex}

**Respuesta correcta:** ${question.optionsLatex?.[question.correctAnswer] || question.options[question.correctAnswer]}

**Explicación oficial:**
${question.explanationLatex || question.explanation}

Crea pasos personalizados que:
1. Aborden sus gaps específicos
2. No asuman conocimiento que no tiene
3. Construyan sobre lo que ya sabe

Responde con JSON:
{
  "steps": [
    {
      "number": 1,
      "description": "Descripción del paso (con LaTeX si es necesario)",
      "guidance": "Guía personalizada que considera sus gaps (con LaTeX)",
      "correctAnswer": "respuesta esperada para este paso (con LaTeX)",
      "explanation": "Por qué este paso es importante (con LaTeX)"
    }
  ],
  "personalizedHint": "Pista inicial personalizada basada en sus conocimientos actuales (con LaTeX)"
}`;

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
      throw new Error('AI guidance generation failed');
    }

    const data = await response.json() as { content: Array<{ text: string }> };
    const responseText = data.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Failed to parse guidance');
    }

    const guidance = JSON.parse(jsonMatch[0]);

    return {
      problemId,
      steps: guidance.steps,
      personalizedHint: guidance.personalizedHint
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
    const correctAnswer = problemData.question.optionsLatex?.[problemData.question.correctAnswer]
      || problemData.question.options[problemData.question.correctAnswer];

    return {
      stepNumber: nextStep,
      stepDescription: '¡Felicidades! Has completado todos los pasos.',
      stepGuidance: problemData.question.explanationLatex || problemData.question.explanation,
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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const verificationPrompt = `Eres un tutor de matemáticas. Verifica si la respuesta del estudiante es correcta.

**Paso del problema:** ${step.description}
**Respuesta esperada:** ${step.correctAnswer}
**Respuesta del estudiante:** ${userAnswer}

¿La respuesta del estudiante es correcta? Considera que puede estar en diferente notación pero ser equivalente.

FORMATO DEL FEEDBACK:
- Usa LaTeX para todas las expresiones matemáticas en el feedback
- Inline math: $expresión$
- Ejemplos: $x = 5$, $\\frac{2}{3}$, $2x + 3$

Responde con JSON:
{
  "correct": true o false,
  "feedback": "Retroalimentación para el estudiante (2-3 oraciones, usa LaTeX para matemáticas)"
}`;

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
        max_tokens: 512,
        messages: [
          {
            role: 'user',
            content: verificationPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('AI verification failed');
    }

    const data = await response.json() as { content: Array<{ text: string }> };
    const responseText = data.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Failed to parse verification response');
    }

    const verification = JSON.parse(jsonMatch[0]);

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
