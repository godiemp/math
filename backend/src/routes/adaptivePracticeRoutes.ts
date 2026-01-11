/**
 * Routes for Adaptive Practice
 */

import { Router } from 'express';
import { authenticate } from '../auth/middleware';
import {
  getTopics,
  getNextProblem,
  getHint,
  submitAnswer,
  saveAttempt,
} from '../services/adaptivePracticeService';
import {
  generateScaffoldingQuestion,
  generateSimilarQuestion,
  decomposeQuestionSkills,
  generateSkillQuestion,
} from '../services/scaffoldingGeneratorService';

const router = Router();

/**
 * GET /api/adaptive/topics
 * Get available topics for practice
 */
router.get('/topics', authenticate, async (req, res) => {
  try {
    const topics = await getTopics();
    res.json({ topics });
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al obtener temas',
    });
  }
});

/**
 * POST /api/adaptive/start
 * Start adaptive practice session with a topic
 * Body: { focus: 'números' | 'álgebra' | 'geometría' | 'probabilidad' | 'surprise' }
 */
router.post('/start', authenticate, async (req, res) => {
  try {
    const { focus } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!focus) {
      return res.status(400).json({ error: 'focus es requerido' });
    }

    const problem = await getNextProblem(userId, focus);

    if (!problem) {
      return res.status(404).json({
        error: 'No hay problemas disponibles para este tema',
      });
    }

    // Don't send the correct answer to the client
    const { correctAnswer, explanation, explanationLatex, ...safeProblem } = problem;

    res.json({
      problem: safeProblem,
      focus,
    });
  } catch (error) {
    console.error('Start adaptive practice error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al iniciar práctica',
    });
  }
});

/**
 * POST /api/adaptive/hint
 * Get AI hint for current problem (Socratic method)
 * Body: { problem, studentMessage, conversationHistory }
 */
router.post('/hint', authenticate, async (req, res) => {
  try {
    const { problem, studentMessage, conversationHistory } = req.body;

    if (!problem || !studentMessage) {
      return res.status(400).json({
        error: 'problem y studentMessage son requeridos',
      });
    }

    const hint = await getHint({
      problem,
      studentMessage,
      conversationHistory: conversationHistory || [],
    });

    res.json({ hint });
  } catch (error) {
    console.error('Get hint error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    // Categorize errors for appropriate status codes and user messages
    let statusCode = 500;
    let userMessage = 'Error al obtener pista. Intenta de nuevo.';

    if (errorMessage.includes('OPENAI_API_KEY')) {
      statusCode = 503;
      userMessage = 'El servicio de tutor AI no está configurado.';
      console.error('OpenAI API key not configured');
    } else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      statusCode = 429;
      userMessage = 'Demasiadas solicitudes. Espera un momento antes de intentar de nuevo.';
      console.error('OpenAI rate limit exceeded');
    } else if (errorMessage.includes('insufficient_quota') || errorMessage.includes('billing')) {
      statusCode = 503;
      userMessage = 'El servicio de tutor AI no está disponible temporalmente.';
      console.error('OpenAI quota/billing issue:', errorMessage);
    } else if (errorMessage.includes('timeout') || errorMessage.includes('ECONNREFUSED')) {
      statusCode = 504;
      userMessage = 'El servicio tardó demasiado en responder. Intenta de nuevo.';
      console.error('OpenAI connection timeout');
    } else if (errorMessage.includes('invalid_api_key') || errorMessage.includes('401')) {
      statusCode = 503;
      userMessage = 'Error de configuración del servicio AI.';
      console.error('OpenAI authentication failed');
    } else {
      console.error('Unexpected OpenAI error:', errorMessage);
    }

    res.status(statusCode).json({ error: userMessage });
  }
});

/**
 * POST /api/adaptive/submit
 * Submit answer and get next problem
 * Body: { problemId, answer, focus }
 */
router.post('/submit', authenticate, async (req, res) => {
  try {
    const { problemId, answer, focus } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!problemId || answer === undefined || !focus) {
      return res.status(400).json({
        error: 'problemId, answer y focus son requeridos',
      });
    }

    const result = await submitAnswer(userId, problemId, answer, focus);

    // Don't send the correct answer of the next problem
    let safeNextProblem = undefined;
    if (result.nextProblem) {
      const { correctAnswer, explanation, explanationLatex, ...safeProblem } = result.nextProblem;
      safeNextProblem = safeProblem;
    }

    res.json({
      correct: result.correct,
      feedback: result.feedback,
      explanation: result.explanation,
      nextProblem: safeNextProblem,
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al enviar respuesta',
    });
  }
});

/**
 * POST /api/adaptive/attempt
 * Save a single attempt (called after each answer)
 */
router.post('/attempt', authenticate, async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const attempt = req.body;

    if (!attempt.questionId || attempt.userAnswer === undefined) {
      return res.status(400).json({
        error: 'questionId y userAnswer son requeridos',
      });
    }

    await saveAttempt(userId, attempt);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Save attempt error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al guardar intento',
    });
  }
});

/**
 * POST /api/adaptive/generate-scaffolding
 * Generate an easier scaffolding question using AI
 * Body: { failedQuestion: Question, scaffoldingLevel: number }
 */
router.post('/generate-scaffolding', authenticate, async (req, res) => {
  try {
    const { failedQuestion, scaffoldingLevel } = req.body;

    if (!failedQuestion || !scaffoldingLevel) {
      return res.status(400).json({
        error: 'failedQuestion y scaffoldingLevel son requeridos',
      });
    }

    if (scaffoldingLevel < 1 || scaffoldingLevel > 3) {
      return res.status(400).json({
        error: 'scaffoldingLevel debe ser 1, 2, o 3',
      });
    }

    const result = await generateScaffoldingQuestion({
      failedQuestion,
      scaffoldingLevel,
    });

    res.json(result);
  } catch (error) {
    console.error('Generate scaffolding error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    let statusCode = 500;
    let userMessage = 'Error al generar pregunta de refuerzo.';

    if (errorMessage.includes('OPENAI_API_KEY')) {
      statusCode = 503;
      userMessage = 'El servicio de generación no está configurado.';
    } else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      statusCode = 429;
      userMessage = 'Demasiadas solicitudes. Espera un momento.';
    } else if (errorMessage.includes('Invalid')) {
      statusCode = 500;
      userMessage = 'Error al procesar la respuesta. Intenta de nuevo.';
    }

    res.status(statusCode).json({ error: userMessage });
  }
});

/**
 * POST /api/adaptive/generate-similar
 * Generate a similar question (same difficulty, different context)
 * Body: { originalQuestion: Question }
 */
router.post('/generate-similar', authenticate, async (req, res) => {
  try {
    const { originalQuestion } = req.body;

    if (!originalQuestion) {
      return res.status(400).json({
        error: 'originalQuestion es requerido',
      });
    }

    const result = await generateSimilarQuestion(originalQuestion);

    res.json(result);
  } catch (error) {
    console.error('Generate similar error:', error);

    res.status(500).json({
      error: 'Error al generar pregunta similar.',
    });
  }
});

/**
 * POST /api/adaptive/decompose-skills
 * Decompose a failed question into basic skills the student needs
 * Body: { failedQuestion: Question, userAnswer: number }
 */
router.post('/decompose-skills', authenticate, async (req, res) => {
  try {
    const { failedQuestion, userAnswer } = req.body;

    if (!failedQuestion || userAnswer === undefined) {
      return res.status(400).json({
        error: 'failedQuestion y userAnswer son requeridos',
      });
    }

    const result = await decomposeQuestionSkills(failedQuestion, userAnswer);

    res.json(result);
  } catch (error) {
    console.error('Decompose skills error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    let statusCode = 500;
    let userMessage = 'Error al analizar la pregunta.';

    if (errorMessage.includes('OPENAI_API_KEY')) {
      statusCode = 503;
      userMessage = 'El servicio de análisis no está configurado.';
    } else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      statusCode = 429;
      userMessage = 'Demasiadas solicitudes. Espera un momento.';
    }

    res.status(statusCode).json({ error: userMessage });
  }
});

/**
 * POST /api/adaptive/generate-skill-question
 * Generate a question targeting a specific skill
 * Body: { skill: DecomposedSkill, originalQuestion: FailedQuestion }
 */
router.post('/generate-skill-question', authenticate, async (req, res) => {
  try {
    const { skill, originalQuestion } = req.body;

    if (!skill || !originalQuestion) {
      return res.status(400).json({
        error: 'skill y originalQuestion son requeridos',
      });
    }

    const result = await generateSkillQuestion(skill, originalQuestion);

    res.json(result);
  } catch (error) {
    console.error('Generate skill question error:', error);

    res.status(500).json({
      error: 'Error al generar pregunta de habilidad.',
    });
  }
});

export default router;
