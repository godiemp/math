import { Request, Response } from 'express';
import { pool } from '../config/database';

/**
 * Session Controller - Registration and Joining
 * Handles user registration for sessions and joining active sessions
 */

/**
 * Register a user for a session
 * @route   POST /api/sessions/:id/register
 * @access  Private
 */
export const registerForSession = async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Get user info
    const userResult = await client.query(
      'SELECT username, display_name FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { username, display_name } = userResult.rows[0];

    // Start transaction
    await client.query('BEGIN');

    // Check session status and lock the row to prevent race conditions
    const sessionResult = await client.query(
      'SELECT status, max_participants FROM sessions WHERE id = $1 FOR UPDATE',
      [id]
    );

    if (sessionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    const { status, max_participants } = sessionResult.rows[0];

    if (status !== 'scheduled') {
      await client.query('ROLLBACK');
      res.status(400).json({ error: 'Can only register for scheduled sessions' });
      return;
    }

    // Check if already registered
    const existingReg = await client.query(
      'SELECT id FROM session_registrations WHERE session_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (existingReg.rows.length > 0) {
      await client.query('COMMIT');
      res.json({ success: true, message: 'Already registered' });
      return;
    }

    // Check capacity (atomically within transaction)
    const countResult = await client.query(
      'SELECT COUNT(*) as count FROM session_registrations WHERE session_id = $1',
      [id]
    );

    if (parseInt(countResult.rows[0].count) >= max_participants) {
      await client.query('ROLLBACK');
      res.status(400).json({ error: 'Session is full' });
      return;
    }

    // Register user
    await client.query(
      `INSERT INTO session_registrations (session_id, user_id, username, display_name, registered_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, userId, username, display_name, Date.now()]
    );

    // Commit transaction
    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Successfully registered',
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error registering for session:', error);
    res.status(500).json({
      error: 'Failed to register for session',
      message: (error as Error).message,
    });
  } finally {
    client.release();
  }
};

/**
 * Unregister a user from a session
 * @route   POST /api/sessions/:id/unregister
 * @access  Private
 */
export const unregisterFromSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    await pool.query(
      'DELETE FROM session_registrations WHERE session_id = $1 AND user_id = $2',
      [id, userId]
    );

    res.json({
      success: true,
      message: 'Successfully unregistered',
    });
  } catch (error) {
    console.error('Error unregistering from session:', error);
    res.status(500).json({
      error: 'Failed to unregister from session',
      message: (error as Error).message,
    });
  }
};

/**
 * Join a session as a participant
 * @route   POST /api/sessions/:id/join
 * @access  Private
 */
export const joinSession = async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Get user info
    const userResult = await client.query(
      'SELECT username, display_name FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { username, display_name } = userResult.rows[0];

    // Start transaction
    await client.query('BEGIN');

    // Get session info and lock the row to prevent race conditions
    const sessionResult = await client.query(
      'SELECT status, max_participants, questions FROM sessions WHERE id = $1 FOR UPDATE',
      [id]
    );

    if (sessionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    const { status, max_participants, questions } = sessionResult.rows[0];

    // Can only join lobby or active sessions
    if (status !== 'lobby' && status !== 'active') {
      await client.query('ROLLBACK');
      res.status(400).json({ error: 'Session is not available to join' });
      return;
    }

    // Check if already a participant
    const existingParticipant = await client.query(
      'SELECT id FROM session_participants WHERE session_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (existingParticipant.rows.length > 0) {
      await client.query('COMMIT');
      res.json({ success: true, message: 'Already joined' });
      return;
    }

    // Check capacity (atomically within transaction)
    const countResult = await client.query(
      'SELECT COUNT(*) as count FROM session_participants WHERE session_id = $1',
      [id]
    );

    if (parseInt(countResult.rows[0].count) >= max_participants) {
      await client.query('ROLLBACK');
      res.status(400).json({ error: 'Session is full' });
      return;
    }

    // Initialize answers array with nulls
    const questionsArray = typeof questions === 'string' ? JSON.parse(questions) : questions;
    const initialAnswers = new Array(questionsArray.length).fill(null);

    // Add participant
    await client.query(
      `INSERT INTO session_participants (session_id, user_id, username, display_name, answers, score, joined_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, userId, username, display_name, JSON.stringify(initialAnswers), 0, Date.now()]
    );

    // Commit transaction
    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Successfully joined session',
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error joining session:', error);
    res.status(500).json({
      error: 'Failed to join session',
      message: (error as Error).message,
    });
  } finally {
    client.release();
  }
};
