import { pool } from '../config/database';

/**
 * Prediction Service - Manages PAES score predictions with user level system
 */

/**
 * Score level definitions for Chilean PAES
 */
interface ScoreLevel {
  name: string;
  min: number;
  max: number;
  description: string;
}

const SCORE_LEVELS: ScoreLevel[] = [
  { name: 'Pre-Básico', min: 150, max: 300, description: 'Desarrollando habilidades fundamentales' },
  { name: 'Básico', min: 300, max: 450, description: 'Competencia básica' },
  { name: 'Medio Inicial', min: 450, max: 600, description: 'Acercándose a la preparación universitaria' },
  { name: 'Medio Avanzado', min: 600, max: 700, description: 'Preparado para la universidad' },
  { name: 'Avanzado', min: 700, max: 850, description: 'Postulante competitivo' },
  { name: 'Sobresaliente', min: 850, max: 950, description: 'Rendimiento excepcional' },
  { name: 'Excelencia', min: 950, max: 1000, description: 'Nivel élite' },
];

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
  currentLevel: string;
  scoreMin: number;
  scoreMax: number;
  userInitialEstimate: number | null;
  factors: PredictionFactors;
  calculatedAt: number;
  updatedAt: number;
  // Deprecated fields (kept for backward compatibility)
  systemPrediction?: number;
  confidenceRange?: number;
}

export class PredictionService {
  /**
   * Get level definition by score
   */
  private static getLevelByScore(score: number): ScoreLevel {
    for (const level of SCORE_LEVELS) {
      if (score >= level.min && score < level.max) {
        return level;
      }
      // Handle edge case: score exactly at max of highest level
      if (score === 1000 && level.name === 'Excelencia') {
        return level;
      }
    }
    // Fallback to first level if somehow out of range
    return SCORE_LEVELS[0];
  }

  /**
   * Calculate score interval within a level based on confidence
   */
  private static calculateScoreInterval(
    estimatedScore: number,
    confidence: number,
    level: ScoreLevel
  ): { scoreMin: number; scoreMax: number } {
    // Start with the confidence range
    let scoreMin = Math.max(level.min, estimatedScore - confidence);
    let scoreMax = Math.min(level.max, estimatedScore + confidence);

    // Ensure minimum interval width of 20 points (unless at level boundary)
    const minIntervalWidth = 20;
    const currentWidth = scoreMax - scoreMin;
    if (currentWidth < minIntervalWidth) {
      const expansion = Math.floor((minIntervalWidth - currentWidth) / 2);
      scoreMin = Math.max(level.min, scoreMin - expansion);
      scoreMax = Math.min(level.max, scoreMax + expansion);
    }

    return { scoreMin: Math.round(scoreMin), scoreMax: Math.round(scoreMax) };
  }

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

    // Calculate estimated score (point estimate)
    const estimatedScore = this.calculateScore(factors);

    // Calculate confidence (used to determine interval width)
    const confidence = this.calculateConfidence(factors);

    // Determine current level based on estimated score
    const level = this.getLevelByScore(estimatedScore);

    // Calculate score interval within the level
    const { scoreMin, scoreMax } = this.calculateScoreInterval(
      estimatedScore,
      confidence,
      level
    );

    // Check if prediction already exists
    const existingResult = await pool.query(
      'SELECT id, user_initial_estimate FROM paes_predictions WHERE user_id = $1',
      [userId]
    );

    const now = Date.now();
    const factorsJson = JSON.stringify(factors);
    const userInitialEstimate = existingResult.rows.length > 0 ? existingResult.rows[0].user_initial_estimate : null;

    let predictionId: string;

    if (existingResult.rows.length > 0) {
      // Update existing prediction
      const updateResult = await pool.query(
        `UPDATE paes_predictions
         SET current_level = $1,
             score_min = $2,
             score_max = $3,
             factors = $4,
             updated_at = $5,
             calculated_at = $5,
             system_prediction = $6,
             confidence_range = $7
         WHERE user_id = $8
         RETURNING id`,
        [level.name, scoreMin, scoreMax, factorsJson, now, estimatedScore, confidence, userId]
      );
      predictionId = updateResult.rows[0].id;
    } else {
      // Insert new prediction
      const insertResult = await pool.query(
        `INSERT INTO paes_predictions
         (user_id, current_level, score_min, score_max, factors, calculated_at, updated_at, system_prediction, confidence_range)
         VALUES ($1, $2, $3, $4, $5, $6, $6, $7, $8)
         RETURNING id`,
        [userId, level.name, scoreMin, scoreMax, factorsJson, now, estimatedScore, confidence]
      );
      predictionId = insertResult.rows[0].id;
    }

    return {
      id: predictionId,
      userId,
      currentLevel: level.name,
      scoreMin,
      scoreMax,
      userInitialEstimate,
      factors,
      calculatedAt: now,
      updatedAt: now,
      systemPrediction: estimatedScore,
      confidenceRange: confidence,
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
      currentLevel: row.current_level,
      scoreMin: row.score_min,
      scoreMax: row.score_max,
      userInitialEstimate: row.user_initial_estimate,
      factors: row.factors,
      calculatedAt: row.calculated_at,
      updatedAt: row.updated_at,
      systemPrediction: row.system_prediction,
      confidenceRange: row.confidence_range,
    };
  }

  /**
   * Set user's initial estimate (used during onboarding)
   */
  static async setInitialEstimate(userId: string, initialEstimate: number): Promise<PaesPrediction> {
    // Validate range
    if (initialEstimate < 150 || initialEstimate > 1000) {
      throw new Error('Initial estimate must be between 150 and 1000');
    }

    // Determine level from initial estimate
    const level = this.getLevelByScore(initialEstimate);

    // Create a wide interval within the level (high uncertainty at start)
    const { scoreMin, scoreMax } = this.calculateScoreInterval(
      initialEstimate,
      75, // High confidence range for initial estimate
      level
    );

    // Check if prediction exists
    let prediction = await this.getPrediction(userId);

    const now = Date.now();

    if (!prediction) {
      // Create new prediction based on user's initial estimate
      const defaultFactors: PredictionFactors = {
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
      };

      const insertResult = await pool.query(
        `INSERT INTO paes_predictions
         (user_id, current_level, score_min, score_max, user_initial_estimate, factors, calculated_at, updated_at, system_prediction, confidence_range)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $7, $8, $9)
         RETURNING id`,
        [userId, level.name, scoreMin, scoreMax, initialEstimate, JSON.stringify(defaultFactors), now, initialEstimate, 75]
      );

      return {
        id: insertResult.rows[0].id,
        userId,
        currentLevel: level.name,
        scoreMin,
        scoreMax,
        userInitialEstimate: initialEstimate,
        factors: defaultFactors,
        calculatedAt: now,
        updatedAt: now,
        systemPrediction: initialEstimate,
        confidenceRange: 75,
      };
    } else {
      // Update existing prediction with initial estimate
      await pool.query(
        `UPDATE paes_predictions
         SET user_initial_estimate = $1, updated_at = $2
         WHERE user_id = $3`,
        [initialEstimate, now, userId]
      );

      return {
        ...prediction,
        userInitialEstimate: initialEstimate,
        updatedAt: now,
      };
    }
  }

  /**
   * Update user's initial estimate (alias for backward compatibility)
   */
  static async updateUserPrediction(userId: string, userPrediction: number): Promise<PaesPrediction> {
    return this.setInitialEstimate(userId, userPrediction);
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
   * PAES scale: 150-1000
   */
  private static calculateScore(factors: PredictionFactors): number {
    const minScore = 150;
    const maxScore = 1000;
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
    const defaultScore = 525; // Middle of Medio Inicial level
    const defaultLevel = this.getLevelByScore(defaultScore);

    return {
      id: '',
      userId,
      currentLevel: defaultLevel.name,
      scoreMin: defaultLevel.min,
      scoreMax: defaultLevel.max,
      userInitialEstimate: null,
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
      systemPrediction: defaultScore,
      confidenceRange: 100,
    };
  }

  /**
   * Get all level definitions
   */
  static getLevels(): ScoreLevel[] {
    return SCORE_LEVELS;
  }
}
