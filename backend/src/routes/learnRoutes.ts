import { Router } from 'express';
import {
  generatePracticeProblem,
  getNextStep,
  verifyStep,
  getProblemStatus,
} from '../services/learnService';
import { authenticate } from '../auth/middleware';

const router = Router();

/**
 * POST /api/learn/generate
 * Generate a new practice problem for step-by-step learning
 */
router.post('/generate', authenticate, async (req, res) => {
  try {
    const { weakTopics, level, subject } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const problem = await generatePracticeProblem({
      userId,
      weakTopics,
      level,
      subject,
    });

    res.json(problem);
  } catch (error) {
    console.error('Generate problem endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al generar problema',
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

export default router;
