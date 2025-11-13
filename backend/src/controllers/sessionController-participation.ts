import { Request, Response } from 'express';
import { pool } from '../config/database';

/**
 * Session Controller - Participation and Statistics
 * Handles answer submission and retrieving participation statistics
 */

/**
 * Submit an answer for a question
 * @route   POST /api/sessions/:id/answers
 * @access  Private
 */
export const submitAnswer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;
    const { questionIndex, answer } = req.body;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (questionIndex === undefined || answer === undefined) {
      res.status(400).json({ error: 'Missing questionIndex or answer' });
      return;
    }

    // Check session status
    const sessionResult = await pool.query(
      'SELECT status, questions FROM sessions WHERE id = $1',
      [id]
    );

    if (sessionResult.rows.length === 0) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    const { status, questions } = sessionResult.rows[0];

    // Can only submit answers during active sessions
    if (status !== 'active') {
      res.status(400).json({ error: 'Session is not active' });
      return;
    }

    // Get participant
    const participantResult = await pool.query(
      'SELECT answers FROM session_participants WHERE session_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (participantResult.rows.length === 0) {
      res.status(404).json({ error: 'Not a participant of this session' });
      return;
    }

    let answers = participantResult.rows[0].answers;
    if (typeof answers === 'string') {
      answers = JSON.parse(answers);
    }

    // Update answer at index
    answers[questionIndex] = answer;

    // Calculate score
    const questionsArray = typeof questions === 'string' ? JSON.parse(questions) : questions;
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] !== null && answers[i] === questionsArray[i]?.correctAnswer) {
        score++;
      }
    }

    // Update participant
    await pool.query(
      'UPDATE session_participants SET answers = $1, score = $2 WHERE session_id = $3 AND user_id = $4',
      [JSON.stringify(answers), score, id, userId]
    );

    res.json({
      success: true,
      message: 'Answer submitted',
      score,
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({
      error: 'Failed to submit answer',
      message: (error as Error).message,
    });
  }
};

/**
 * Get my participation data for a session
 * @route   GET /api/sessions/:id/participants/me
 * @access  Private
 */
export const getMyParticipation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const result = await pool.query(
      'SELECT user_id, username, display_name, answers, score, joined_at FROM session_participants WHERE session_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Not a participant of this session' });
      return;
    }

    const row = result.rows[0];
    res.json({
      userId: row.user_id,
      username: row.username,
      displayName: row.display_name,
      answers: typeof row.answers === 'string' ? JSON.parse(row.answers) : row.answers,
      score: row.score,
      joinedAt: row.joined_at,
    });
  } catch (error) {
    console.error('Error getting participation:', error);
    res.status(500).json({
      error: 'Failed to get participation',
      message: (error as Error).message,
    });
  }
};

/**
 * Get student statistics for live practice sessions
 * @route   GET /api/sessions/stats/me
 * @access  Private
 */
export const getMyStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Get all completed sessions the user participated in
    const participationsResult = await pool.query(
      `SELECT
        sp.session_id,
        sp.answers,
        sp.score,
        sp.joined_at,
        s.name as session_name,
        s.level,
        s.questions,
        s.completed_at,
        s.scheduled_start_time
      FROM session_participants sp
      JOIN sessions s ON sp.session_id = s.id
      WHERE sp.user_id = $1 AND s.status = 'completed'
      ORDER BY s.completed_at DESC`,
      [userId]
    );

    const participations = participationsResult.rows;
    const totalSessions = participations.length;

    if (totalSessions === 0) {
      res.json({
        totalSessions: 0,
        totalQuestions: 0,
        totalCorrect: 0,
        averageScore: 0,
        averageAccuracy: 0,
        bestScore: 0,
        bestAccuracy: 0,
        byLevel: {
          M1: { sessions: 0, averageScore: 0, averageAccuracy: 0 },
          M2: { sessions: 0, averageScore: 0, averageAccuracy: 0 },
        },
        topRankings: {
          first: 0,
          second: 0,
          third: 0,
        },
        recentSessions: [],
      });
      return;
    }

    // Calculate statistics
    let totalQuestions = 0;
    let totalCorrect = 0;
    let bestScore = 0;
    let bestAccuracy = 0;
    const levelStats = {
      M1: { sessions: 0, totalQuestions: 0, totalCorrect: 0 },
      M2: { sessions: 0, totalQuestions: 0, totalCorrect: 0 },
    };

    const recentSessions = [];

    // Calculate rankings for each session
    let topRankings = { first: 0, second: 0, third: 0 };

    for (const participation of participations) {
      const questions = typeof participation.questions === 'string'
        ? JSON.parse(participation.questions)
        : participation.questions;
      const numQuestions = questions.length;
      const score = participation.score;
      const accuracy = numQuestions > 0 ? (score / numQuestions) * 100 : 0;

      totalQuestions += numQuestions;
      totalCorrect += score;
      bestScore = Math.max(bestScore, score);
      bestAccuracy = Math.max(bestAccuracy, accuracy);

      // Level stats
      const level = participation.level as 'M1' | 'M2';
      if (level === 'M1' || level === 'M2') {
        levelStats[level].sessions++;
        levelStats[level].totalQuestions += numQuestions;
        levelStats[level].totalCorrect += score;
      }

      // Get ranking for this session
      const rankingResult = await pool.query(
        `SELECT COUNT(*) as better_scores
         FROM session_participants
         WHERE session_id = $1 AND score > $2`,
        [participation.session_id, score]
      );

      const rank = parseInt(rankingResult.rows[0].better_scores) + 1;
      if (rank === 1) topRankings.first++;
      else if (rank === 2) topRankings.second++;
      else if (rank === 3) topRankings.third++;

      // Add to recent sessions (limit to 10)
      if (recentSessions.length < 10) {
        recentSessions.push({
          sessionId: participation.session_id,
          sessionName: participation.session_name,
          level: participation.level,
          score: score,
          totalQuestions: numQuestions,
          accuracy: Math.round(accuracy * 10) / 10,
          rank: rank,
          completedAt: parseInt(participation.completed_at),
        });
      }
    }

    // Calculate averages
    const averageScore = totalSessions > 0 ? totalCorrect / totalSessions : 0;
    const averageAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    const byLevel = {
      M1: {
        sessions: levelStats.M1.sessions,
        averageScore: levelStats.M1.sessions > 0
          ? levelStats.M1.totalCorrect / levelStats.M1.sessions
          : 0,
        averageAccuracy: levelStats.M1.totalQuestions > 0
          ? (levelStats.M1.totalCorrect / levelStats.M1.totalQuestions) * 100
          : 0,
      },
      M2: {
        sessions: levelStats.M2.sessions,
        averageScore: levelStats.M2.sessions > 0
          ? levelStats.M2.totalCorrect / levelStats.M2.sessions
          : 0,
        averageAccuracy: levelStats.M2.totalQuestions > 0
          ? (levelStats.M2.totalCorrect / levelStats.M2.totalQuestions) * 100
          : 0,
      },
    };

    res.json({
      totalSessions,
      totalQuestions,
      totalCorrect,
      averageScore: Math.round(averageScore * 10) / 10,
      averageAccuracy: Math.round(averageAccuracy * 10) / 10,
      bestScore,
      bestAccuracy: Math.round(bestAccuracy * 10) / 10,
      byLevel: {
        M1: {
          sessions: byLevel.M1.sessions,
          averageScore: Math.round(byLevel.M1.averageScore * 10) / 10,
          averageAccuracy: Math.round(byLevel.M1.averageAccuracy * 10) / 10,
        },
        M2: {
          sessions: byLevel.M2.sessions,
          averageScore: Math.round(byLevel.M2.averageScore * 10) / 10,
          averageAccuracy: Math.round(byLevel.M2.averageAccuracy * 10) / 10,
        },
      },
      topRankings,
      recentSessions,
    });
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({
      error: 'Failed to get statistics',
      message: (error as Error).message,
    });
  }
};
