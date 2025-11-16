import { Response } from 'express';
import { pool } from '../config/database';
import { AuthRequest } from '../types';

/**
 * Submit feedback about a question
 */
export const submitQuestionFeedback = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const {
      questionId,
      questionTopic,
      questionLevel,
      questionDifficulty,
      questionSubject,
      feedbackType,
      description,
      userAnswer,
      correctAnswer,
      questionLatex,
    } = req.body;

    // Validate required fields
    if (!questionId || !feedbackType || !description) {
      res.status(400).json({
        error: 'Missing required fields: questionId, feedbackType, and description are required',
      });
      return;
    }

    // Validate feedback type
    const validFeedbackTypes = [
      'wrong_answer',
      'wrong_explanation',
      'unclear_question',
      'typo',
      'other',
    ];
    if (!validFeedbackTypes.includes(feedbackType)) {
      res.status(400).json({
        error: `Invalid feedback type. Must be one of: ${validFeedbackTypes.join(', ')}`,
      });
      return;
    }

    // Validate description length
    if (description.length < 10) {
      res.status(400).json({
        error: 'Description must be at least 10 characters long',
      });
      return;
    }

    if (description.length > 2000) {
      res.status(400).json({
        error: 'Description must be less than 2000 characters',
      });
      return;
    }

    const result = await pool.query(
      `INSERT INTO question_feedback (
        user_id,
        question_id,
        question_topic,
        question_level,
        question_difficulty,
        question_subject,
        feedback_type,
        description,
        user_answer,
        correct_answer,
        question_latex
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, created_at`,
      [
        userId,
        questionId,
        questionTopic || null,
        questionLevel || null,
        questionDifficulty || null,
        questionSubject || null,
        feedbackType,
        description,
        userAnswer !== undefined ? userAnswer : null,
        correctAnswer !== undefined ? correctAnswer : null,
        questionLatex || null,
      ]
    );

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedbackId: result.rows[0].id,
      createdAt: result.rows[0].created_at,
    });
  } catch (error) {
    console.error('Error submitting question feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get all feedback (admin only)
 */
export const getAllFeedback = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userRole = req.user?.role;

    if (userRole !== 'admin') {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
      return;
    }

    const { status, feedbackType, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT
        qf.id,
        qf.user_id as "userId",
        u.username,
        u.display_name as "userDisplayName",
        qf.question_id as "questionId",
        qf.question_topic as "questionTopic",
        qf.question_level as "questionLevel",
        qf.question_difficulty as "questionDifficulty",
        qf.question_subject as "questionSubject",
        qf.feedback_type as "feedbackType",
        qf.description,
        qf.user_answer as "userAnswer",
        qf.correct_answer as "correctAnswer",
        qf.question_latex as "questionLatex",
        qf.status,
        qf.admin_notes as "adminNotes",
        qf.reviewed_by as "reviewedBy",
        qf.reviewed_at as "reviewedAt",
        qf.created_at as "createdAt",
        qf.updated_at as "updatedAt"
      FROM question_feedback qf
      LEFT JOIN users u ON qf.user_id = u.id
      WHERE 1=1
    `;

    const queryParams: any[] = [];

    if (status) {
      queryParams.push(status);
      query += ` AND qf.status = $${queryParams.length}`;
    }

    if (feedbackType) {
      queryParams.push(feedbackType);
      query += ` AND qf.feedback_type = $${queryParams.length}`;
    }

    query += ' ORDER BY qf.created_at DESC';

    queryParams.push(parseInt(limit as string, 10));
    query += ` LIMIT $${queryParams.length}`;

    queryParams.push(parseInt(offset as string, 10));
    query += ` OFFSET $${queryParams.length}`;

    const result = await pool.query(query, queryParams);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM question_feedback WHERE 1=1';
    const countParams: any[] = [];

    if (status) {
      countParams.push(status);
      countQuery += ` AND status = $${countParams.length}`;
    }

    if (feedbackType) {
      countParams.push(feedbackType);
      countQuery += ` AND feedback_type = $${countParams.length}`;
    }

    const countResult = await pool.query(countQuery, countParams);

    res.json({
      feedback: result.rows,
      total: parseInt(countResult.rows[0].total, 10),
      limit: parseInt(limit as string, 10),
      offset: parseInt(offset as string, 10),
    });
  } catch (error) {
    console.error('Error getting all feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Update feedback status (admin only)
 */
export const updateFeedbackStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    if (userRole !== 'admin') {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
      return;
    }

    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (!status) {
      res.status(400).json({ error: 'Status is required' });
      return;
    }

    const validStatuses = ['pending', 'reviewed', 'fixed', 'dismissed'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
      return;
    }

    const now = Date.now();

    const result = await pool.query(
      `UPDATE question_feedback
       SET status = $1,
           admin_notes = $2,
           reviewed_by = $3,
           reviewed_at = $4,
           updated_at = $5
       WHERE id = $6
       RETURNING id, status, admin_notes, reviewed_by, reviewed_at, updated_at`,
      [status, adminNotes || null, userId, now, now, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Feedback not found' });
      return;
    }

    res.json({
      message: 'Feedback status updated successfully',
      feedback: {
        id: result.rows[0].id,
        status: result.rows[0].status,
        adminNotes: result.rows[0].admin_notes,
        reviewedBy: result.rows[0].reviewed_by,
        reviewedAt: result.rows[0].reviewed_at,
        updatedAt: result.rows[0].updated_at,
      },
    });
  } catch (error) {
    console.error('Error updating feedback status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get feedback statistics (admin only)
 */
export const getFeedbackStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userRole = req.user?.role;

    if (userRole !== 'admin') {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
      return;
    }

    // Get counts by status
    const statusResult = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM question_feedback
      GROUP BY status
    `);

    // Get counts by feedback type
    const typeResult = await pool.query(`
      SELECT feedback_type as "feedbackType", COUNT(*) as count
      FROM question_feedback
      GROUP BY feedback_type
    `);

    // Get top reported questions
    const topQuestionsResult = await pool.query(`
      SELECT question_id as "questionId", COUNT(*) as "reportCount"
      FROM question_feedback
      GROUP BY question_id
      HAVING COUNT(*) > 1
      ORDER BY COUNT(*) DESC
      LIMIT 10
    `);

    res.json({
      byStatus: statusResult.rows.map((row) => ({
        status: row.status,
        count: parseInt(row.count, 10),
      })),
      byType: typeResult.rows.map((row) => ({
        feedbackType: row.feedbackType,
        count: parseInt(row.count, 10),
      })),
      topReportedQuestions: topQuestionsResult.rows.map((row) => ({
        questionId: row.questionId,
        reportCount: parseInt(row.reportCount, 10),
      })),
    });
  } catch (error) {
    console.error('Error getting feedback stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
