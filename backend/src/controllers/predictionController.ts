import { Response } from 'express';
import { PredictionService } from '../services/predictionService';
import { AuthRequest } from '../types';

/**
 * Prediction Controller
 * Handles PAES score prediction endpoints
 */

/**
 * Get or calculate prediction for the authenticated user
 * GET /api/prediction
 */
export const getPrediction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Try to get existing prediction
    let prediction = await PredictionService.getPrediction(userId);

    // If no prediction exists or it's older than 24 hours, recalculate
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    if (!prediction || prediction.calculatedAt < oneDayAgo) {
      prediction = await PredictionService.calculatePrediction(userId);
    }

    res.json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    console.error('Error getting prediction:', error);
    res.status(500).json({
      error: 'Failed to get prediction',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Force recalculate prediction for the authenticated user
 * POST /api/prediction/calculate
 */
export const calculatePrediction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const prediction = await PredictionService.calculatePrediction(userId);

    res.json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    console.error('Error calculating prediction:', error);
    res.status(500).json({
      error: 'Failed to calculate prediction',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Update user's initial estimate
 * POST /api/prediction/user
 * Body: { prediction: number }
 */
export const updateUserPrediction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { prediction } = req.body;

    if (!prediction || typeof prediction !== 'number') {
      return res.status(400).json({ error: 'Prediction value is required and must be a number' });
    }

    if (prediction < 150 || prediction > 1000) {
      return res.status(400).json({ error: 'Prediction must be between 150 and 1000' });
    }

    const updated = await PredictionService.updateUserPrediction(userId, prediction);

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating user prediction:', error);
    res.status(500).json({
      error: 'Failed to update user prediction',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Set user's initial estimate (onboarding)
 * POST /api/prediction/initial
 * Body: { estimate: number }
 */
export const setInitialEstimate = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { estimate } = req.body;

    if (!estimate || typeof estimate !== 'number') {
      return res.status(400).json({ error: 'Estimate value is required and must be a number' });
    }

    if (estimate < 150 || estimate > 1000) {
      return res.status(400).json({ error: 'Estimate must be between 150 and 1000' });
    }

    const prediction = await PredictionService.setInitialEstimate(userId, estimate);

    res.json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    console.error('Error setting initial estimate:', error);
    res.status(500).json({
      error: 'Failed to set initial estimate',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Get all score level definitions
 * GET /api/prediction/levels
 */
export const getLevels = async (req: AuthRequest, res: Response) => {
  try {
    const levels = PredictionService.getLevels();

    res.json({
      success: true,
      data: levels,
    });
  } catch (error) {
    console.error('Error getting levels:', error);
    res.status(500).json({
      error: 'Failed to get levels',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
