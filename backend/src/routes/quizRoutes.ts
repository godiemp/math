import { Router } from 'express';
import {
  saveQuizAttempt,
  saveQuizAttempts,
  getQuizHistory,
  getQuizStats,
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

export default router;
