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

    const { attempts } = req.body;

    if (!Array.isArray(attempts) || attempts.length === 0) {
      res.status(400).json({ error: 'Invalid attempts array' });
      return;
    }

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

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

        savedIds.push(result.rows[0].id);
      }

      await client.query('COMMIT');

      res.status(201).json({
        message: 'Quiz attempts saved successfully',
        count: savedIds.length,
        attemptIds: savedIds,
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
        id, question_id as "questionId", level, topic, subject, question,
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
