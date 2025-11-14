/**
 * Learn Service - Step-by-step AI-guided problem solving
 * Provides controlled, incremental learning experiences
 */

interface GenerateProblemOptions {
  userId: string;
  weakTopics?: string[];
  level?: string;
  subject?: string;
}

interface GenerateProblemResponse {
  problemId: string;
  question: string;
  questionLatex?: string;
  topic: string;
  difficulty: string;
  totalSteps: number;
  hint: string;
}

interface GetNextStepOptions {
  problemId: string;
  currentStep: number;
  userAnswer?: string;
}

interface GetNextStepResponse {
  stepNumber: number;
  stepDescription: string;
  stepGuidance: string;
  isCorrect?: boolean;
  feedback?: string;
  isComplete: boolean;
  nextAction?: string;
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

// In-memory problem storage (in production, use database)
const activeLearningProblems = new Map<string, any>();

/**
 * Generate a new practice problem based on user's weak areas
 */
export async function generatePracticeProblem(
  options: GenerateProblemOptions
): Promise<GenerateProblemResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const { userId, weakTopics = [], level = 'M1', subject = 'Números' } = options;

  // Determine topic focus based on weak areas
  const topicFocus = weakTopics.length > 0
    ? weakTopics[0]
    : subject;

  const systemPrompt = `Eres un tutor experto en matemáticas PAES de Chile. Tu especialidad es crear problemas paso a paso para ayudar a estudiantes a aprender.

Tu tarea es crear un problema de práctica que pueda resolverse en 3-5 pasos claros y manejables.

IMPORTANTE:
- El problema debe ser apropiado para nivel ${level}
- Debe enfocarse en: ${topicFocus}
- Debe tener una solución clara paso a paso
- Cada paso debe ser verificable
- Los números deben dar resultados "limpios"
- Responde SOLO con JSON válido`;

  const userPrompt = `Genera un problema de práctica de matemáticas con estas especificaciones:

**Nivel:** ${level}
**Tema:** ${topicFocus}
**Dificultad:** media

El problema debe resolverse en 3-5 pasos claros.

Responde con este formato JSON:
{
  "question": "Texto del problema",
  "questionLatex": "Texto con $LaTeX$ si es necesario",
  "topic": "${topicFocus}",
  "difficulty": "media",
  "steps": [
    {
      "number": 1,
      "description": "¿Qué debes hacer primero?",
      "guidance": "Pista o guía para este paso",
      "correctAnswer": "respuesta esperada",
      "explanation": "Por qué es así"
    }
  ],
  "finalAnswer": "Respuesta completa del problema",
  "hint": "Pista inicial para empezar"
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
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = await response.json() as { content: Array<{ text: string }> };
    const responseText = data.content[0].text;

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from AI response');
    }

    const problemData = JSON.parse(jsonMatch[0]);

    // Generate unique problem ID
    const problemId = `learn_${userId}_${Date.now()}`;

    // Store problem data
    activeLearningProblems.set(problemId, {
      ...problemData,
      userId,
      createdAt: Date.now(),
      currentStep: 0,
    });

    return {
      problemId,
      question: problemData.question,
      questionLatex: problemData.questionLatex,
      topic: problemData.topic,
      difficulty: problemData.difficulty,
      totalSteps: problemData.steps.length,
      hint: problemData.hint,
    };
  } catch (error) {
    console.error('Error generating practice problem:', error);
    throw error;
  }
}

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
    return {
      stepNumber: nextStep,
      stepDescription: '¡Felicidades! Has completado el problema.',
      stepGuidance: `La respuesta final es: ${problemData.finalAnswer}`,
      isComplete: true,
    };
  }

  return {
    stepNumber: nextStep,
    stepDescription: step.description,
    stepGuidance: step.guidance,
    isComplete: false,
    nextAction: 'Escribe tu respuesta para este paso',
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

  // Use AI to verify if the answer is correct (allows for variations in notation)
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const verificationPrompt = `Eres un tutor de matemáticas. Verifica si la respuesta del estudiante es correcta.

**Paso del problema:** ${step.description}
**Respuesta esperada:** ${step.correctAnswer}
**Respuesta del estudiante:** ${userAnswer}

¿La respuesta del estudiante es correcta? Considera que puede estar en diferente notación pero ser equivalente.

Responde con JSON:
{
  "correct": true o false,
  "feedback": "Retroalimentación para el estudiante (2-3 oraciones)"
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
