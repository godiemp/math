/**
 * Operations Practice Routes
 */

import express from 'express';
import {
  getOperationsPath,
  getUserProgress,
  getProblem,
  submitAnswer,
  getLevelStats,
  resetProgress
} from '../controllers/operationsPracticeController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get the complete operations path
router.get('/path', getOperationsPath);

// Get user's progress
router.get('/progress', getUserProgress);

// Get a problem for a specific level
router.get('/problem/:level', getProblem);

// Submit an answer
router.post('/submit', submitAnswer);

// Get statistics for a level
router.get('/stats/:level', getLevelStats);

// Reset progress (for testing)
router.post('/reset', resetProgress);

export default router;
