import { Response } from 'express';
import { pool } from '../config/database';
import { AuthRequest } from '../types';

/**
 * Save a quiz attempt
 */
export const saveQuizAttempt = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const {
      questionId,
      level,
      topic,
      subject,
      question,
      options,
      userAnswer,
      correctAnswer,
      isCorrect,
      difficulty,
      explanation,
      skills,
      timestamp,
    } = req.body;

    // Validate required fields
    if (!questionId || !level || !topic || !question || !options ||
        userAnswer === undefined || correctAnswer === undefined ||
        isCorrect === undefined || !difficulty || !explanation || !skills) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Validate level
    if (level !== 'M1' && level !== 'M2') {
      res.status(400).json({ error: 'Invalid level. Must be M1 or M2' });
      return;
    }

    // Validate difficulty
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      res.status(400).json({ error: 'Invalid difficulty. Must be easy, medium, or hard' });
      return;
    }

    const attemptedAt = timestamp || Date.now();

    const result = await pool.query(
      `INSERT INTO quiz_attempts (
        user_id, question_id, level, topic, subject, question, options,
        user_answer, correct_answer, is_correct, difficulty, explanation,
        skills, attempted_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id`,
      [
        userId,
        questionId,
        level,
        topic,
        subject || '',
        question,
        JSON.stringify(options),
        userAnswer,
        correctAnswer,
        isCorrect,
        difficulty,
        explanation,
        JSON.stringify(skills),
        attemptedAt,
      ]
    );

    res.status(201).json({
      message: 'Quiz attempt saved successfully',
      attemptId: result.rows[0].id,
    });
  } catch (error) {
    console.error('Error saving quiz attempt:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Save multiple quiz attempts at once (batch save)
 */
export const saveQuizAttempts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { attempts, quizSessionId, aiConversation } = req.body;

    if (!Array.isArray(attempts) || attempts.length === 0) {
      res.status(400).json({ error: 'Invalid attempts array' });
      return;
    }

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Create or update quiz session
      const sessionId = quizSessionId || `quiz-${userId}-${Date.now()}`;
      const level = attempts[0].level; // Use level from first attempt
      const now = Date.now();
      const startedAt = attempts[0].timestamp || now;

      // Create quiz session
      await client.query(
        `INSERT INTO quiz_sessions (id, user_id, level, started_at, completed_at, ai_conversation, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO UPDATE SET
           completed_at = $5,
           ai_conversation = $6`,
        [
          sessionId,
          userId,
          level,
          startedAt,
          now,
          JSON.stringify(aiConversation || []),
          now,
        ]
      );

      const savedIds = [];

      for (const attempt of attempts) {
        const {
          questionId,
          level,
          topic,
          subject,
          question,
          options,
          userAnswer,
          correctAnswer,
          isCorrect,
          difficulty,
          explanation,
          skills,
          timestamp,
        } = attempt;

        const attemptedAt = timestamp || Date.now();

        const result = await client.query(
          `INSERT INTO quiz_attempts (
            user_id, quiz_session_id, question_id, level, topic, subject, question, options,
            user_answer, correct_answer, is_correct, difficulty, explanation,
            skills, attempted_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          RETURNING id`,
          [
            userId,
            sessionId,
            questionId,
            level,
            topic,
            subject || '',
            question,
            JSON.stringify(options),
            userAnswer,
            correctAnswer,
            isCorrect,
            difficulty,
            explanation,
            JSON.stringify(skills),
            attemptedAt,
          ]
        );

        savedIds.push(result.rows[0].id);
      }

      await client.query('COMMIT');

      res.status(201).json({
        message: 'Quiz attempts saved successfully',
        count: savedIds.length,
        attemptIds: savedIds,
        quizSessionId: sessionId,
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error saving quiz attempts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get quiz attempt history for the current user
 */
export const getQuizHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { level, limit, offset } = req.query;

    let query = `
      SELECT
        id, quiz_session_id as "quizSessionId", question_id as "questionId", level, topic, subject, question,
        options, user_answer as "userAnswer", correct_answer as "correctAnswer",
        is_correct as "isCorrect", difficulty, explanation, skills, attempted_at as "timestamp"
      FROM quiz_attempts
      WHERE user_id = $1
    `;

    const queryParams: any[] = [userId];

    // Filter by level if provided
    if (level && (level === 'M1' || level === 'M2')) {
      query += ` AND level = $${queryParams.length + 1}`;
      queryParams.push(level);
    }

    // Order by most recent first
    query += ' ORDER BY attempted_at DESC';

    // Add pagination
    if (limit) {
      query += ` LIMIT $${queryParams.length + 1}`;
      queryParams.push(parseInt(limit as string, 10));
    }

    if (offset) {
      query += ` OFFSET $${queryParams.length + 1}`;
      queryParams.push(parseInt(offset as string, 10));
    }

    const result = await pool.query(query, queryParams);

    // Parse JSON fields and convert timestamp to number
    const history = result.rows.map((row) => ({
      ...row,
      options: row.options,
      skills: row.skills,
      timestamp: parseInt(row.timestamp, 10), // Convert BIGINT string to number
    }));

    res.json({
      history,
      count: history.length,
    });
  } catch (error) {
    console.error('Error getting quiz history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get quiz statistics for the current user
 */
export const getQuizStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { level } = req.query;

    let whereClause = 'WHERE user_id = $1';
    const queryParams: any[] = [userId];

    if (level && (level === 'M1' || level === 'M2')) {
      whereClause += ' AND level = $2';
      queryParams.push(level);
    }

    // Get overall stats
    const statsResult = await pool.query(
      `SELECT
        COUNT(*) as total,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct,
        level
      FROM quiz_attempts
      ${whereClause}
      GROUP BY level`,
      queryParams
    );

    // Get stats by difficulty
    const difficultyResult = await pool.query(
      `SELECT
        difficulty,
        COUNT(*) as total,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct
      FROM quiz_attempts
      ${whereClause}
      GROUP BY difficulty`,
      queryParams
    );

    // Get stats by subject
    const subjectResult = await pool.query(
      `SELECT
        subject,
        COUNT(*) as total,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct
      FROM quiz_attempts
      ${whereClause}
      GROUP BY subject`,
      queryParams
    );

    res.json({
      overall: statsResult.rows.map((row) => ({
        level: row.level,
        total: parseInt(row.total, 10),
        correct: parseInt(row.correct, 10),
        percentage: row.total > 0 ? Math.round((row.correct / row.total) * 100) : 0,
      })),
      byDifficulty: difficultyResult.rows.map((row) => ({
        difficulty: row.difficulty,
        total: parseInt(row.total, 10),
        correct: parseInt(row.correct, 10),
        percentage: row.total > 0 ? Math.round((row.correct / row.total) * 100) : 0,
      })),
      bySubject: subjectResult.rows.map((row) => ({
        subject: row.subject,
        total: parseInt(row.total, 10),
        correct: parseInt(row.correct, 10),
        percentage: row.total > 0 ? Math.round((row.correct / row.total) * 100) : 0,
      })),
    });
  } catch (error) {
    console.error('Error getting quiz stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Save last quiz configuration for a user
 */
export const saveLastQuizConfig = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { level, subject, mode, difficulty } = req.body;

    // Validate required fields
    if (!level || !mode) {
      res.status(400).json({ error: 'Missing required fields: level and mode are required' });
      return;
    }

    // Validate level
    if (level !== 'M1' && level !== 'M2') {
      res.status(400).json({ error: 'Invalid level. Must be M1 or M2' });
      return;
    }

    // Validate mode
    if (mode !== 'zen' && mode !== 'rapidfire') {
      res.status(400).json({ error: 'Invalid mode. Must be zen or rapidfire' });
      return;
    }

    // Validate subject if provided
    if (subject && !['números', 'álgebra', 'geometría', 'probabilidad'].includes(subject)) {
      res.status(400).json({ error: 'Invalid subject' });
      return;
    }

    // Validate difficulty if provided
    if (difficulty && !['easy', 'medium', 'hard', 'extreme'].includes(difficulty)) {
      res.status(400).json({ error: 'Invalid difficulty' });
      return;
    }

    const updatedAt = Date.now();

    // Upsert the last config (insert or update if exists)
    await pool.query(
      `INSERT INTO last_quiz_config (user_id, level, subject, mode, difficulty, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id, level)
       DO UPDATE SET
         subject = $3,
         mode = $4,
         difficulty = $5,
         updated_at = $6`,
      [userId, level, subject, mode, difficulty, updatedAt]
    );

    res.status(200).json({
      message: 'Last quiz config saved successfully',
      config: { level, subject, mode, difficulty },
    });
  } catch (error) {
    console.error('Error saving last quiz config:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get last quiz configuration for a user
 */
export const getLastQuizConfig = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { level } = req.query;

    // Validate level if provided
    if (level && level !== 'M1' && level !== 'M2') {
      res.status(400).json({ error: 'Invalid level. Must be M1 or M2' });
      return;
    }

    let query = 'SELECT level, subject, mode, difficulty, updated_at FROM last_quiz_config WHERE user_id = $1';
    const queryParams: any[] = [userId];

    if (level) {
      query += ' AND level = $2';
      queryParams.push(level);
    }

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No last quiz config found' });
      return;
    }

    // If level was specified, return single config; otherwise return all configs
    if (level) {
      res.json({
        config: {
          level: result.rows[0].level,
          subject: result.rows[0].subject,
          mode: result.rows[0].mode,
          difficulty: result.rows[0].difficulty,
        },
      });
    } else {
      res.json({
        configs: result.rows.map((row) => ({
          level: row.level,
          subject: row.subject,
          mode: row.mode,
          difficulty: row.difficulty,
        })),
      });
    }
  } catch (error) {
    console.error('Error getting last quiz config:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get adaptive learning recommendations based on user performance
 */
export const getAdaptiveRecommendations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Get performance stats by subject and level
    const performanceResult = await pool.query(
      `SELECT
        level,
        subject,
        topic,
        COUNT(*) as total_attempts,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_attempts,
        ROUND(AVG(CASE WHEN is_correct THEN 100 ELSE 0 END)) as accuracy
      FROM quiz_attempts
      WHERE user_id = $1 AND subject IS NOT NULL AND subject != ''
      GROUP BY level, subject, topic
      HAVING COUNT(*) >= 3
      ORDER BY accuracy ASC, total_attempts DESC`,
      [userId]
    );

    // Get total questions attempted
    const totalResult = await pool.query(
      `SELECT
        COUNT(*) as total_questions,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_questions,
        COUNT(DISTINCT quiz_session_id) as total_sessions
      FROM quiz_attempts
      WHERE user_id = $1`,
      [userId]
    );

    // Get M1 and M2 specific stats
    const levelStatsResult = await pool.query(
      `SELECT
        level,
        COUNT(*) as attempted,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct
      FROM quiz_attempts
      WHERE user_id = $1
      GROUP BY level`,
      [userId]
    );

    const totalQuestions = parseInt(totalResult.rows[0]?.total_questions || '0', 10);
    const correctQuestions = parseInt(totalResult.rows[0]?.correct_questions || '0', 10);
    const totalSessions = parseInt(totalResult.rows[0]?.total_sessions || '0', 10);

    // Calculate readiness score (0-100)
    const overallAccuracy = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;
    const volumeScore = Math.min(100, Math.round((totalQuestions / 100) * 100)); // 100 questions = 100%
    const consistencyScore = Math.min(100, totalSessions * 10); // 10 sessions = 100%
    const readinessScore = Math.round((overallAccuracy * 0.5) + (volumeScore * 0.3) + (consistencyScore * 0.2));

    // Process level stats
    const m1Stats = levelStatsResult.rows.find((row) => row.level === 'M1');
    const m2Stats = levelStatsResult.rows.find((row) => row.level === 'M2');

    const m1Attempted = parseInt(m1Stats?.attempted || '0', 10);
    const m1Correct = parseInt(m1Stats?.correct || '0', 10);
    const m2Attempted = parseInt(m2Stats?.attempted || '0', 10);
    const m2Correct = parseInt(m2Stats?.correct || '0', 10);

    const m1Percentage = m1Attempted > 0 ? Math.round((m1Attempted / 406) * 100) : 0;
    const m2Percentage = m2Attempted > 0 ? Math.round((m2Attempted / 26) * 100) : 0;

    // Categorize areas
    const weakAreas = performanceResult.rows
      .filter((row) => parseInt(row.accuracy, 10) < 60 && parseInt(row.total_attempts, 10) >= 5)
      .slice(0, 3)
      .map((row) => ({
        level: row.level,
        subject: row.subject,
        topic: row.topic,
        accuracy: parseInt(row.accuracy, 10),
        attempts: parseInt(row.total_attempts, 10),
      }));

    const improvingAreas = performanceResult.rows
      .filter((row) => {
        const accuracy = parseInt(row.accuracy, 10);
        return accuracy >= 60 && accuracy < 80 && parseInt(row.total_attempts, 10) >= 5;
      })
      .slice(0, 3)
      .map((row) => ({
        level: row.level,
        subject: row.subject,
        topic: row.topic,
        accuracy: parseInt(row.accuracy, 10),
        attempts: parseInt(row.total_attempts, 10),
      }));

    const strongAreas = performanceResult.rows
      .filter((row) => parseInt(row.accuracy, 10) >= 80 && parseInt(row.total_attempts, 10) >= 5)
      .slice(0, 3)
      .map((row) => ({
        level: row.level,
        subject: row.subject,
        topic: row.topic,
        accuracy: parseInt(row.accuracy, 10),
        attempts: parseInt(row.total_attempts, 10),
      }));

    // Generate recommendations
    const recommendations = [];

    if (weakAreas.length > 0) {
      const weakSubject = weakAreas[0].subject;
      const weakLevel = weakAreas[0].level;
      recommendations.push({
        type: 'focus',
        priority: 'high',
        message: `Enfócate en ${weakSubject} (${weakLevel})`,
        detail: `Tu precisión es ${weakAreas[0].accuracy}%. Practica para mejorar.`,
        action: {
          level: weakLevel,
          subject: weakSubject,
          mode: 'zen',
        },
      });
    }

    if (improvingAreas.length > 0) {
      const improvingSubject = improvingAreas[0].subject;
      const improvingLevel = improvingAreas[0].level;
      recommendations.push({
        type: 'reinforce',
        priority: 'medium',
        message: `Refuerza ${improvingSubject} (${improvingLevel})`,
        detail: `Vas bien con ${improvingAreas[0].accuracy}%. Sigue practicando.`,
        action: {
          level: improvingLevel,
          subject: improvingSubject,
          mode: 'rapidfire',
        },
      });
    }

    if (strongAreas.length > 0) {
      const strongSubject = strongAreas[0].subject;
      const strongLevel = strongAreas[0].level;
      recommendations.push({
        type: 'maintain',
        priority: 'low',
        message: `Mantén tu nivel en ${strongSubject} (${strongLevel})`,
        detail: `Excelente precisión de ${strongAreas[0].accuracy}%.`,
        action: {
          level: strongLevel,
          subject: strongSubject,
          mode: 'rapidfire',
        },
      });
    }

    // If no data yet, give starter recommendations
    if (totalQuestions === 0) {
      recommendations.push({
        type: 'start',
        priority: 'high',
        message: 'Comienza tu preparación PAES',
        detail: 'Empieza con Modo Zen para familiarizarte con las preguntas.',
        action: {
          level: 'M1',
          subject: 'números',
          mode: 'zen',
        },
      });
    }

    res.json({
      readinessScore,
      progress: {
        totalQuestions,
        correctQuestions,
        overallAccuracy,
        totalSessions,
        m1: {
          attempted: m1Attempted,
          correct: m1Correct,
          percentage: m1Percentage,
          total: 406,
        },
        m2: {
          attempted: m2Attempted,
          correct: m2Correct,
          percentage: m2Percentage,
          total: 26,
        },
      },
      weakAreas,
      improvingAreas,
      strongAreas,
      recommendations,
    });
  } catch (error) {
    console.error('Error getting adaptive recommendations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
