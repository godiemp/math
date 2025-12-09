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
} from '../services/adaptivePracticeService';

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
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al obtener pista',
    });
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

export default router;
