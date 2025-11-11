import { pool } from '../config/database';

/**
 * Prediction Service - Manages PAES score predictions
 */

interface PredictionFactors {
  overallAccuracy: number;
  accuracyByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
    extreme: number;
  };
  accuracyBySubject: {
    números: number;
    álgebra: number;
    geometría: number;
    probabilidad: number;
  };
  totalAttempts: number;
  recentTrend: number; // -1 to 1, where positive means improving
}

interface PaesPrediction {
  id: string;
  userId: string;
  systemPrediction: number;
  confidenceRange: number;
  userPrediction: number | null;
  factors: PredictionFactors;
  calculatedAt: number;
  updatedAt: number;
}

export class PredictionService {
  /**
   * Calculate PAES prediction for a user
   */
  static async calculatePrediction(userId: string): Promise<PaesPrediction> {
    // Get user's question attempts
    const attemptsResult = await pool.query(
      `SELECT
        user_id,
        is_correct,
        difficulty,
        subject,
        time_spent_seconds,
        attempted_at
      FROM question_attempts
      WHERE user_id = $1
      ORDER BY attempted_at DESC
      LIMIT 500`,
      [userId]
    );

    const attempts = attemptsResult.rows;

    if (attempts.length === 0) {
      // Not enough data - return conservative estimate
      return this.createDefaultPrediction(userId);
    }

    // Calculate factors
    const factors = this.calculateFactors(attempts);

    // Calculate system prediction based on factors
    const systemPrediction = this.calculateScore(factors);
    const confidenceRange = this.calculateConfidence(factors);

    // Check if prediction already exists
    const existingResult = await pool.query(
      'SELECT id, user_prediction FROM paes_predictions WHERE user_id = $1',
      [userId]
    );

    const now = Date.now();
    const factorsJson = JSON.stringify(factors);
    const userPrediction = existingResult.rows.length > 0 ? existingResult.rows[0].user_prediction : null;

    let predictionId: string;

    if (existingResult.rows.length > 0) {
      // Update existing prediction
      const updateResult = await pool.query(
        `UPDATE paes_predictions
         SET system_prediction = $1,
             confidence_range = $2,
             factors = $3,
             updated_at = $4,
             calculated_at = $4
         WHERE user_id = $5
         RETURNING id`,
        [systemPrediction, confidenceRange, factorsJson, now, userId]
      );
      predictionId = updateResult.rows[0].id;
    } else {
      // Insert new prediction
      const insertResult = await pool.query(
        `INSERT INTO paes_predictions
         (user_id, system_prediction, confidence_range, factors, calculated_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $5)
         RETURNING id`,
        [userId, systemPrediction, confidenceRange, factorsJson, now]
      );
      predictionId = insertResult.rows[0].id;
    }

    return {
      id: predictionId,
      userId,
      systemPrediction,
      confidenceRange,
      userPrediction,
      factors,
      calculatedAt: now,
      updatedAt: now,
    };
  }

  /**
   * Get existing prediction for a user
   */
  static async getPrediction(userId: string): Promise<PaesPrediction | null> {
    const result = await pool.query(
      'SELECT * FROM paes_predictions WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      userId: row.user_id,
      systemPrediction: row.system_prediction,
      confidenceRange: row.confidence_range,
      userPrediction: row.user_prediction,
      factors: row.factors,
      calculatedAt: row.calculated_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Update user's own prediction
   */
  static async updateUserPrediction(userId: string, userPrediction: number): Promise<PaesPrediction> {
    // Validate range
    if (userPrediction < 500 || userPrediction > 850) {
      throw new Error('User prediction must be between 500 and 850');
    }

    // Check if prediction exists, if not create one first
    let prediction = await this.getPrediction(userId);

    if (!prediction) {
      // Calculate prediction first
      prediction = await this.calculatePrediction(userId);
    }

    const now = Date.now();
    await pool.query(
      `UPDATE paes_predictions
       SET user_prediction = $1, updated_at = $2
       WHERE user_id = $3`,
      [userPrediction, now, userId]
    );

    return {
      ...prediction,
      userPrediction,
      updatedAt: now,
    };
  }

  /**
   * Calculate prediction factors from attempts
   */
  private static calculateFactors(attempts: any[]): PredictionFactors {
    const total = attempts.length;
    const correct = attempts.filter((a) => a.is_correct).length;
    const overallAccuracy = total > 0 ? (correct / total) * 100 : 0;

    // Accuracy by difficulty
    const difficultyGroups = {
      easy: attempts.filter((a) => a.difficulty === 'easy'),
      medium: attempts.filter((a) => a.difficulty === 'medium'),
      hard: attempts.filter((a) => a.difficulty === 'hard'),
      extreme: attempts.filter((a) => a.difficulty === 'extreme'),
    };

    const accuracyByDifficulty = {
      easy: this.calculateAccuracy(difficultyGroups.easy),
      medium: this.calculateAccuracy(difficultyGroups.medium),
      hard: this.calculateAccuracy(difficultyGroups.hard),
      extreme: this.calculateAccuracy(difficultyGroups.extreme),
    };

    // Accuracy by subject
    const subjects = ['números', 'álgebra', 'geometría', 'probabilidad'];
    const accuracyBySubject: any = {};
    subjects.forEach((subject) => {
      const subjectAttempts = attempts.filter((a) => a.subject === subject);
      accuracyBySubject[subject] = this.calculateAccuracy(subjectAttempts);
    });

    // Recent trend - compare last 20% vs first 20%
    const recentCount = Math.max(Math.floor(total * 0.2), 10);
    const recent = attempts.slice(0, recentCount);
    const old = attempts.slice(-recentCount);

    const recentAccuracy = this.calculateAccuracy(recent);
    const oldAccuracy = this.calculateAccuracy(old);

    // Normalize trend to -1 to 1
    const recentTrend = total >= 20 ? (recentAccuracy - oldAccuracy) / 100 : 0;

    return {
      overallAccuracy,
      accuracyByDifficulty,
      accuracyBySubject,
      totalAttempts: total,
      recentTrend,
    };
  }

  /**
   * Calculate accuracy percentage for a set of attempts
   */
  private static calculateAccuracy(attempts: any[]): number {
    if (attempts.length === 0) return 0;
    const correct = attempts.filter((a) => a.is_correct).length;
    return (correct / attempts.length) * 100;
  }

  /**
   * Calculate PAES score from factors
   * PAES scale: 500-850
   */
  private static calculateScore(factors: PredictionFactors): number {
    const minScore = 500;
    const maxScore = 850;
    const range = maxScore - minScore;

    // Weighted formula
    // Base score from overall accuracy
    let baseScore = factors.overallAccuracy / 100; // 0-1

    // Weight harder difficulties more heavily
    const difficultyWeight =
      (factors.accuracyByDifficulty.easy * 0.15 +
       factors.accuracyByDifficulty.medium * 0.25 +
       factors.accuracyByDifficulty.hard * 0.35 +
       factors.accuracyByDifficulty.extreme * 0.25) / 100;

    // Average of base and difficulty-weighted score
    const weightedScore = (baseScore * 0.6) + (difficultyWeight * 0.4);

    // Apply trend bonus/penalty (up to ±30 points)
    const trendAdjustment = factors.recentTrend * 30;

    // Calculate final score
    let finalScore = minScore + (weightedScore * range) + trendAdjustment;

    // Clamp to valid range
    finalScore = Math.max(minScore, Math.min(maxScore, finalScore));

    return Math.round(finalScore);
  }

  /**
   * Calculate confidence range based on data quality
   */
  private static calculateConfidence(factors: PredictionFactors): number {
    // More attempts = more confidence (lower range)
    // Less consistency = less confidence (higher range)

    const baseConfidence = 50; // ±50 points

    // Reduce confidence range based on number of attempts
    const attemptsFactor = Math.min(factors.totalAttempts / 100, 1); // 0-1

    // Reduce confidence range based on consistency (std dev of subject accuracies)
    const subjectAccuracies = Object.values(factors.accuracyBySubject);
    const mean = subjectAccuracies.reduce((a, b) => a + b, 0) / subjectAccuracies.length;
    const variance = subjectAccuracies.reduce((sum, acc) => sum + Math.pow(acc - mean, 2), 0) / subjectAccuracies.length;
    const stdDev = Math.sqrt(variance);
    const consistencyFactor = 1 - Math.min(stdDev / 50, 1); // Higher std dev = less consistent

    const confidence = baseConfidence * (1 - (attemptsFactor * 0.5 + consistencyFactor * 0.3));

    return Math.round(Math.max(15, Math.min(50, confidence)));
  }

  /**
   * Create default prediction for users with no data
   */
  private static createDefaultPrediction(userId: string): PaesPrediction {
    const now = Date.now();
    return {
      id: '',
      userId,
      systemPrediction: 650, // Conservative middle estimate
      confidenceRange: 50, // High uncertainty
      userPrediction: null,
      factors: {
        overallAccuracy: 0,
        accuracyByDifficulty: {
          easy: 0,
          medium: 0,
          hard: 0,
          extreme: 0,
        },
        accuracyBySubject: {
          números: 0,
          álgebra: 0,
          geometría: 0,
          probabilidad: 0,
        },
        totalAttempts: 0,
        recentTrend: 0,
      },
      calculatedAt: now,
      updatedAt: now,
    };
  }
}
