import { Request, Response } from 'express';
import { PredictionService } from '../services/predictionService';

/**
 * Prediction Controller
 * Handles PAES score prediction endpoints
 */

/**
 * Get or calculate prediction for the authenticated user
 * GET /api/prediction
 */
export const getPrediction = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

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
export const calculatePrediction = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

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
 * Update user's own prediction
 * POST /api/prediction/user
 * Body: { prediction: number }
 */
export const updateUserPrediction = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { prediction } = req.body;

    if (!prediction || typeof prediction !== 'number') {
      return res.status(400).json({ error: 'Prediction value is required and must be a number' });
    }

    if (prediction < 500 || prediction > 850) {
      return res.status(400).json({ error: 'Prediction must be between 500 and 850' });
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
