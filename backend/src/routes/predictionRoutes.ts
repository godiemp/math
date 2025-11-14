import express from 'express';
import {
  getPrediction,
  calculatePrediction,
  updateUserPrediction,
  setInitialEstimate,
  getLevels
} from '../controllers/predictionController';
import { authenticate } from '../auth/middleware';

const router = express.Router();

/**
 * Prediction Routes
 * All routes require authentication (except /levels which is public)
 */

// GET /api/prediction/levels - Get all score level definitions (public)
router.get('/levels', getLevels);

// GET /api/prediction - Get or calculate prediction for authenticated user
router.get('/', authenticate, getPrediction);

// POST /api/prediction/calculate - Force recalculate prediction
router.post('/calculate', authenticate, calculatePrediction);

// POST /api/prediction/user - Update user's initial estimate (backward compatibility)
router.post('/user', authenticate, updateUserPrediction);

// POST /api/prediction/initial - Set user's initial estimate (onboarding)
router.post('/initial', authenticate, setInitialEstimate);

export default router;
