import { Request, Response } from 'express';
import { pool } from '../config/database';
import { success, error, ErrorCodes } from '../types/result';
import { Session, SessionRow, UserRow, rowToSession } from '../types/session';
import { CreateSessionDto } from '../validators/session.validator';

const LOBBY_OPEN_MINUTES = 15;

/**
 * Generate unique session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new scheduled session
 * @route   POST /api/sessions
 * @access  Private (Admin only)
 */
export const createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    // Authentication check - no more (req as any)!
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(error('Unauthorized', ErrorCodes.AUTH_REQUIRED));
      return;
    }

    // Type-safe body access - validated by Zod middleware
    const {
      name,
      description,
      level,
      scheduledStartTime,
      durationMinutes,
      questions,
      maxParticipants,
    } = req.body as CreateSessionDto;

    // Get user info with typed query
    const userResult = await pool.query<UserRow>(
      'SELECT id, username, display_name, email, role FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      res.status(404).json(error('User not found', ErrorCodes.NOT_FOUND));
      return;
    }

    const { display_name: hostName } = userResult.rows[0];

    // Generate session data
    const sessionId = generateSessionId();
    const scheduledEndTime = scheduledStartTime + (durationMinutes * 60 * 1000);
    const lobbyOpenTime = scheduledStartTime - (LOBBY_OPEN_MINUTES * 60 * 1000);
    const createdAt = Date.now();

    // Insert session with typed query
    const result = await pool.query<SessionRow>(
      `INSERT INTO sessions (
        id, name, description, level, host_id, host_name, questions,
        status, current_question_index, created_at, scheduled_start_time,
        scheduled_end_time, duration_minutes, lobby_open_time, max_participants
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        sessionId,
        name,
        description || '',
        level,
        userId,
        hostName,
        JSON.stringify(questions),
        'scheduled',
        0,
        createdAt,
        scheduledStartTime,
        scheduledEndTime,
        durationMinutes,
        lobbyOpenTime,
        maxParticipants,
      ]
    );

    // Transform row to typed Session object
    const row = result.rows[0];
    const session: Session = {
      ...rowToSession(row),
      registeredUsers: [],
      participants: [],
    };

    res.status(201).json(success(session, 'Session created successfully'));
  } catch (err) {
    console.error('[createSession] Error:', err);
    res.status(500).json(
      error(
        'Failed to create session',
        ErrorCodes.INTERNAL_ERROR,
        err instanceof Error ? err.message : 'Unknown error'
      )
    );
  }
};

/**
 * Get all sessions (with filters)
 * @route   GET /api/sessions
 * @access  Public
 */
export const getSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, level } = req.query;

    let query = `
      SELECT s.*,
        COALESCE(
          (SELECT json_agg(json_build_object(
            'userId', user_id,
            'username', username,
            'displayName', display_name,
            'registeredAt', registered_at
          ))
          FROM session_registrations
          WHERE session_id = s.id), '[]'::json
        ) as registered_users,
        COALESCE(
          (SELECT json_agg(json_build_object(
            'userId', user_id,
            'username', username,
            'displayName', display_name,
            'answers', answers,
            'score', score,
            'joinedAt', joined_at
          ))
          FROM session_participants
          WHERE session_id = s.id), '[]'::json
        ) as participants
      FROM sessions s
      WHERE 1=1
    `;

    // Type-safe params array
    const params: (string | number)[] = [];
    let paramCount = 1;

    if (status && typeof status === 'string') {
      query += ` AND s.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (level && typeof level === 'string') {
      query += ` AND s.level = $${paramCount}`;
      params.push(level);
      paramCount++;
    }

    query += ' ORDER BY s.created_at DESC';

    // Typed database query
    const result = await pool.query<SessionRow>(query, params);

    // Transform rows to Session objects using helper function
    const sessions: Session[] = result.rows.map(rowToSession);

    res.status(200).json(
      success({
        count: sessions.length,
        sessions,
      })
    );
  } catch (err) {
    console.error('[getSessions] Error:', err);
    res.status(500).json(
      error(
        'Failed to fetch sessions',
        ErrorCodes.INTERNAL_ERROR,
        err instanceof Error ? err.message : 'Unknown error'
      )
    );
  }
};

/**
 * Get a single session by ID
 * @route   GET /api/sessions/:id
 * @access  Public
 */
export const getSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Typed database query
    const result = await pool.query<SessionRow>(
      `SELECT s.*,
        COALESCE(
          (SELECT json_agg(json_build_object(
            'userId', user_id,
            'username', username,
            'displayName', display_name,
            'registeredAt', registered_at
          ))
          FROM session_registrations
          WHERE session_id = s.id), '[]'::json
        ) as registered_users,
        COALESCE(
          (SELECT json_agg(json_build_object(
            'userId', user_id,
            'username', username,
            'displayName', display_name,
            'answers', answers,
            'score', score,
            'joinedAt', joined_at
          ))
          FROM session_participants
          WHERE session_id = s.id), '[]'::json
        ) as participants
      FROM sessions s
      WHERE s.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json(error('Session not found', ErrorCodes.NOT_FOUND));
      return;
    }

    // Transform row to Session object
    const session: Session = rowToSession(result.rows[0]);

    res.status(200).json(success(session));
  } catch (err) {
    console.error('[getSession] Error:', err);
    res.status(500).json(
      error(
        'Failed to fetch session',
        ErrorCodes.INTERNAL_ERROR,
        err instanceof Error ? err.message : 'Unknown error'
      )
    );
  }
};

/**
 * Update a scheduled session
 * @route   PATCH /api/sessions/:id
 * @access  Private (Admin only)
 */
export const updateSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      level,
      scheduledStartTime,
      durationMinutes,
      questionCount,
      maxParticipants,
      questions,
    } = req.body;

    // Check if session exists and is scheduled
    const sessionCheck = await pool.query(
      'SELECT status FROM sessions WHERE id = $1',
      [id]
    );

    if (sessionCheck.rows.length === 0) {
      res.status(404).json(error('Session not found', ErrorCodes.NOT_FOUND));
      return;
    }

    if (sessionCheck.rows[0].status !== 'scheduled') {
      res.status(400).json({ error: 'Can only edit scheduled sessions' });
      return;
    }

    // Build update query dynamically
    const updates: string[] = [];
    const params: any[] = [];
    let paramCount = 1;

    if (name) {
      updates.push(`name = $${paramCount}`);
      params.push(name);
      paramCount++;
    }

    if (description !== undefined) {
      updates.push(`description = $${paramCount}`);
      params.push(description);
      paramCount++;
    }

    if (level) {
      updates.push(`level = $${paramCount}`);
      params.push(level);
      paramCount++;
    }

    if (maxParticipants) {
      updates.push(`max_participants = $${paramCount}`);
      params.push(maxParticipants);
      paramCount++;
    }

    if (questions) {
      updates.push(`questions = $${paramCount}`);
      params.push(JSON.stringify(questions));
      paramCount++;
    }

    // Handle time-related updates
    if (scheduledStartTime) {
      updates.push(`scheduled_start_time = $${paramCount}`);
      params.push(scheduledStartTime);
      paramCount++;

      const duration = durationMinutes || sessionCheck.rows[0].duration_minutes;
      const scheduledEndTime = scheduledStartTime + (duration * 60 * 1000);
      const lobbyOpenTime = scheduledStartTime - (LOBBY_OPEN_MINUTES * 60 * 1000);

      updates.push(`scheduled_end_time = $${paramCount}`);
      params.push(scheduledEndTime);
      paramCount++;

      updates.push(`lobby_open_time = $${paramCount}`);
      params.push(lobbyOpenTime);
      paramCount++;
    }

    if (durationMinutes && !scheduledStartTime) {
      updates.push(`duration_minutes = $${paramCount}`);
      params.push(durationMinutes);
      paramCount++;
    }

    if (updates.length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }

    params.push(id);
    const query = `UPDATE sessions SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;

    const result = await pool.query(query, params);
    const row = result.rows[0];
    const session = {
      id: row.id,
      name: row.name,
      description: row.description,
      level: row.level,
      hostId: row.host_id,
      hostName: row.host_name,
      questions: row.questions,
      status: row.status,
      currentQuestionIndex: row.current_question_index,
      createdAt: parseInt(row.created_at),
      scheduledStartTime: parseInt(row.scheduled_start_time),
      scheduledEndTime: parseInt(row.scheduled_end_time),
      durationMinutes: row.duration_minutes,
      lobbyOpenTime: parseInt(row.lobby_open_time),
      maxParticipants: row.max_participants,
      startedAt: row.started_at ? parseInt(row.started_at) : undefined,
      completedAt: row.completed_at ? parseInt(row.completed_at) : undefined,
      registeredUsers: [],
      participants: [],
    };

    res.json({
      success: true,
      session,
    });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({
      error: 'Failed to update session',
      message: (error as Error).message,
    });
  }
};

/**
 * Delete a session
 * @route   DELETE /api/sessions/:id
 * @access  Private (Admin only)
 */
export const deleteSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM sessions WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json(error('Session not found', ErrorCodes.NOT_FOUND));
      return;
    }

    res.json({
      success: true,
      message: 'Session deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({
      error: 'Failed to delete session',
      message: (error as Error).message,
    });
  }
};

/**
 * Cancel a session
 * @route   POST /api/sessions/:id/cancel
 * @access  Private (Admin only)
 */
export const cancelSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE sessions
       SET status = 'cancelled'
       WHERE id = $1 AND status != 'completed'
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Session not found or already completed' });
      return;
    }

    const row = result.rows[0];
    const session = {
      id: row.id,
      name: row.name,
      description: row.description,
      level: row.level,
      hostId: row.host_id,
      hostName: row.host_name,
      questions: row.questions,
      status: row.status,
      currentQuestionIndex: row.current_question_index,
      createdAt: parseInt(row.created_at),
      scheduledStartTime: parseInt(row.scheduled_start_time),
      scheduledEndTime: parseInt(row.scheduled_end_time),
      durationMinutes: row.duration_minutes,
      lobbyOpenTime: parseInt(row.lobby_open_time),
      maxParticipants: row.max_participants,
      startedAt: row.started_at ? parseInt(row.started_at) : undefined,
      completedAt: row.completed_at ? parseInt(row.completed_at) : undefined,
      registeredUsers: [],
      participants: [],
    };

    res.json({
      success: true,
      session,
    });
  } catch (error) {
    console.error('Error cancelling session:', error);
    res.status(500).json({
      error: 'Failed to cancel session',
      message: (error as Error).message,
    });
  }
};

/**
 * Register a user for a session
 * @route   POST /api/sessions/:id/register
 * @access  Private
 */
export const registerForSession = async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json(error('Unauthorized', ErrorCodes.AUTH_REQUIRED));
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
      res.status(404).json(error('Session not found', ErrorCodes.NOT_FOUND));
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
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json(error('Unauthorized', ErrorCodes.AUTH_REQUIRED));
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
 * Update session statuses based on time
 * @route   POST /api/sessions/update-statuses
 * @access  Public (called by cron or client)
 */
export const updateSessionStatuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const now = Date.now();

    // Open lobbies
    await pool.query(
      `UPDATE sessions
       SET status = 'lobby'
       WHERE status = 'scheduled' AND lobby_open_time <= $1`,
      [now]
    );

    // Start sessions
    await pool.query(
      `UPDATE sessions
       SET status = 'active', started_at = $1
       WHERE status = 'lobby' AND scheduled_start_time <= $1`,
      [now]
    );

    // Complete sessions
    await pool.query(
      `UPDATE sessions
       SET status = 'completed', completed_at = $1
       WHERE status = 'active' AND scheduled_end_time <= $1`,
      [now]
    );

    res.json({
      success: true,
      message: 'Session statuses updated',
    });
  } catch (error) {
    console.error('Error updating session statuses:', error);
    res.status(500).json({
      error: 'Failed to update session statuses',
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
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json(error('Unauthorized', ErrorCodes.AUTH_REQUIRED));
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
      res.status(404).json(error('Session not found', ErrorCodes.NOT_FOUND));
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
      res.status(404).json(error('Session not found', ErrorCodes.NOT_FOUND));
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
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json(error('Unauthorized', ErrorCodes.AUTH_REQUIRED));
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
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json(error('Unauthorized', ErrorCodes.AUTH_REQUIRED));
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
