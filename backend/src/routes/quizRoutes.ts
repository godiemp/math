import { Router } from 'express';
import {
  saveQuizAttempt,
  saveQuizAttempts,
  getQuizHistory,
  getQuizStats,
  saveLastQuizConfig,
  getLastQuizConfig,
  getAdaptiveQuestionSelection,
} from '../controllers/quizController';
import { authenticate } from '../auth/middleware/authenticate';

const router = Router();

/**
 * @route   POST /api/quiz/attempt
 * @desc    Save a single quiz attempt
 * @access  Private
 */
router.post('/attempt', authenticate, saveQuizAttempt);

/**
 * @route   POST /api/quiz/attempts
 * @desc    Save multiple quiz attempts (batch)
 * @access  Private
 */
router.post('/attempts', authenticate, saveQuizAttempts);

/**
 * @route   GET /api/quiz/history
 * @desc    Get quiz attempt history for current user
 * @query   level (optional): M1 or M2
 * @query   limit (optional): number of results
 * @query   offset (optional): pagination offset
 * @access  Private
 */
router.get('/history', authenticate, getQuizHistory);

/**
 * @route   GET /api/quiz/stats
 * @desc    Get quiz statistics for current user
 * @query   level (optional): M1 or M2
 * @access  Private
 */
router.get('/stats', authenticate, getQuizStats);

/**
 * @route   POST /api/quiz/last-config
 * @desc    Save last quiz configuration for current user
 * @body    level: M1 or M2, subject, mode: zen or rapidfire, difficulty
 * @access  Private
 */
router.post('/last-config', authenticate, saveLastQuizConfig);

/**
 * @route   GET /api/quiz/last-config
 * @desc    Get last quiz configuration for current user
 * @query   level (optional): M1 or M2
 * @access  Private
 */
router.get('/last-config', authenticate, getLastQuizConfig);

/**
 * @route   GET /api/quiz/adaptive-questions
 * @desc    Get adaptive question selection based on user's learning history
 * @query   level (required): M1 or M2
 * @query   count (optional): number of questions (default 10, max 100)
 * @query   subject (optional): números, álgebra, geometría, probabilidad
 * @access  Private
 */
router.get('/adaptive-questions', authenticate, getAdaptiveQuestionSelection);

export default router;
