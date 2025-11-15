import { Router } from 'express';
import {
  assessStudent,
  continueAssessment,
  selectQuestion,
  generatePersonalizedGuidance,
  startLearningSession,
  getNextStep,
  verifyStep,
  getProblemStatus,
  getAssessmentSession,
  startSocraticSession,
  continueSocraticSession,
} from '../services/learnService';
import { authenticate } from '../auth/middleware';

const router = Router();

/**
 * POST /api/learn/start-assessment
 * Start an assessment conversation with the student
 */
router.post('/start-assessment', authenticate, async (req, res) => {
  try {
    const { level, subject } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!level || !subject) {
      return res.status(400).json({ error: 'level y subject son requeridos' });
    }

    const assessment = await assessStudent({
      userId,
      level,
      subject,
    });

    res.json(assessment);
  } catch (error) {
    console.error('Start assessment endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al iniciar evaluación',
    });
  }
});

/**
 * POST /api/learn/continue-assessment
 * Continue the assessment conversation
 */
router.post('/continue-assessment', authenticate, async (req, res) => {
  try {
    const { sessionId, userMessage } = req.body;

    if (!sessionId || !userMessage) {
      return res.status(400).json({ error: 'sessionId y userMessage son requeridos' });
    }

    const response = await continueAssessment({
      sessionId,
      userMessage,
    });

    res.json(response);
  } catch (error) {
    console.error('Continue assessment endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error en la evaluación',
    });
  }
});

/**
 * POST /api/learn/select-question
 * Select a question from lib/questions based on assessment
 */
router.post('/select-question', authenticate, async (req, res) => {
  try {
    const { sessionId, availableQuestions } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId es requerido' });
    }

    if (!availableQuestions || !Array.isArray(availableQuestions)) {
      return res.status(400).json({ error: 'availableQuestions es requerido' });
    }

    // Get assessment from session
    const session = getAssessmentSession(sessionId);
    if (!session || !session.assessment) {
      return res.status(400).json({ error: 'Assessment no completado o sesión inválida' });
    }

    const selection = await selectQuestion({
      sessionId,
      assessment: session.assessment,
      level: session.level,
      subject: session.subject as 'números' | 'álgebra' | 'geometría' | 'probabilidad',
      availableQuestions,
    });

    res.json(selection);
  } catch (error) {
    console.error('Select question endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al seleccionar pregunta',
    });
  }
});

/**
 * POST /api/learn/generate-guidance
 * Generate personalized guidance for selected question
 */
router.post('/generate-guidance', authenticate, async (req, res) => {
  try {
    const { sessionId, problemId, question } = req.body;

    if (!sessionId || !problemId || !question) {
      return res.status(400).json({ error: 'sessionId, problemId y question son requeridos' });
    }

    const session = getAssessmentSession(sessionId);
    if (!session || !session.assessment) {
      return res.status(400).json({ error: 'Assessment no completado o sesión inválida' });
    }

    const guidance = await generatePersonalizedGuidance({
      problemId,
      question,
      assessment: session.assessment,
    });

    res.json(guidance);
  } catch (error) {
    console.error('Generate guidance endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al generar guía',
    });
  }
});

/**
 * POST /api/learn/start-session
 * Start learning session with question and guidance
 */
router.post('/start-session', authenticate, async (req, res) => {
  try {
    const { problemId, question, steps, personalizedHint, sessionId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!problemId || !question || !steps || !personalizedHint || !sessionId) {
      return res.status(400).json({
        error: 'problemId, question, steps, personalizedHint y sessionId son requeridos',
      });
    }

    const session = getAssessmentSession(sessionId);
    if (!session || !session.assessment) {
      return res.status(400).json({ error: 'Assessment no completado o sesión inválida' });
    }

    await startLearningSession(
      userId,
      problemId,
      question,
      session.assessment,
      steps,
      personalizedHint
    );

    res.json({
      success: true,
      problemId,
      question,
      totalSteps: steps.length,
      hint: personalizedHint,
    });
  } catch (error) {
    console.error('Start session endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al iniciar sesión de aprendizaje',
    });
  }
});

/**
 * POST /api/learn/next-step
 * Get the next step in the problem
 */
router.post('/next-step', authenticate, async (req, res) => {
  try {
    const { problemId, currentStep } = req.body;

    if (!problemId || currentStep === undefined) {
      return res.status(400).json({ error: 'problemId y currentStep son requeridos' });
    }

    const step = await getNextStep({
      problemId,
      currentStep,
    });

    res.json(step);
  } catch (error) {
    console.error('Next step endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al obtener siguiente paso',
    });
  }
});

/**
 * POST /api/learn/verify
 * Verify user's answer for a step
 */
router.post('/verify', authenticate, async (req, res) => {
  try {
    const { problemId, stepNumber, userAnswer } = req.body;

    if (!problemId || !stepNumber || !userAnswer) {
      return res.status(400).json({
        error: 'problemId, stepNumber y userAnswer son requeridos',
      });
    }

    const verification = await verifyStep({
      problemId,
      stepNumber,
      userAnswer,
    });

    res.json(verification);
  } catch (error) {
    console.error('Verify step endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al verificar respuesta',
    });
  }
});

/**
 * GET /api/learn/status/:problemId
 * Get problem progress status
 */
router.get('/status/:problemId', authenticate, async (req, res) => {
  try {
    const { problemId } = req.params;

    const status = await getProblemStatus(problemId);

    if (!status) {
      return res.status(404).json({ error: 'Problema no encontrado' });
    }

    res.json(status);
  } catch (error) {
    console.error('Problem status endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al obtener estado del problema',
    });
  }
});

// ============================================================================
// NEW: Socratic Method Learning Routes
// ============================================================================

/**
 * POST /api/learn/start-socratic
 * Start a Socratic learning session with a selected question
 */
router.post('/start-socratic', authenticate, async (req, res) => {
  try {
    const { question, level, subject } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!question || !level || !subject) {
      return res.status(400).json({ error: 'question, level y subject son requeridos' });
    }

    const response = await startSocraticSession({
      userId,
      question,
      level,
      subject,
    });

    res.json(response);
  } catch (error) {
    console.error('Start Socratic endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al iniciar sesión socrática',
    });
  }
});

/**
 * POST /api/learn/continue-socratic
 * Continue the Socratic conversation
 */
router.post('/continue-socratic', authenticate, async (req, res) => {
  try {
    const { sessionId, userMessage } = req.body;

    if (!sessionId || !userMessage) {
      return res.status(400).json({ error: 'sessionId y userMessage son requeridos' });
    }

    const response = await continueSocraticSession({
      sessionId,
      userMessage,
    });

    res.json(response);
  } catch (error) {
    console.error('Continue Socratic endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error en la conversación socrática',
    });
  }
});

export default router;
