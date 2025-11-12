import express from 'express';
import { getPrediction, calculatePrediction, updateUserPrediction } from '../controllers/predictionController';
import { authenticate } from '../auth/middleware';

const router = express.Router();

/**
 * Prediction Routes
 * All routes require authentication
 */

// GET /api/prediction - Get or calculate prediction for authenticated user
router.get('/', authenticate, getPrediction);

// POST /api/prediction/calculate - Force recalculate prediction
router.post('/calculate', authenticate, calculatePrediction);

// POST /api/prediction/user - Update user's own prediction
router.post('/user', authenticate, updateUserPrediction);

export default router;
