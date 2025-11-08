import { Request, Response } from 'express';
import { pool } from '../config/database';

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
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const {
      name,
      description,
      level,
      scheduledStartTime,
      durationMinutes,
      questions,
      maxParticipants = 1000000,
    } = req.body;

    // Validation
    if (!name || !level || !scheduledStartTime || !durationMinutes || !questions) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      res.status(400).json({ error: 'Questions must be a non-empty array' });
      return;
    }

    // Get user info
    const userResult = await pool.query(
      'SELECT username, display_name FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { display_name: hostName } = userResult.rows[0];

    const sessionId = generateSessionId();
    const scheduledEndTime = scheduledStartTime + (durationMinutes * 60 * 1000);
    const lobbyOpenTime = scheduledStartTime - (LOBBY_OPEN_MINUTES * 60 * 1000);
    const createdAt = Date.now();

    const result = await pool.query(
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
    console.error('Error creating session:', error);
    res.status(500).json({
      error: 'Failed to create session',
      message: (error as Error).message,
    });
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

    const params: any[] = [];
    let paramCount = 1;

    if (status) {
      query += ` AND s.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (level) {
      query += ` AND s.level = $${paramCount}`;
      params.push(level);
      paramCount++;
    }

    query += ' ORDER BY s.created_at DESC';

    const result = await pool.query(query, params);

    const sessions = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      level: row.level,
      hostId: row.host_id,
      hostName: row.host_name,
      questions: row.questions, // Already parsed by JSONB
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
      registeredUsers: (row.registered_users || []).map((u: any) => ({
        ...u,
        registeredAt: parseInt(u.registeredAt),
      })),
      participants: (row.participants || []).map((p: any) => ({
        ...p,
        joinedAt: parseInt(p.joinedAt),
      })),
    }));

    res.json({
      success: true,
      count: sessions.length,
      sessions,
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({
      error: 'Failed to fetch sessions',
      message: (error as Error).message,
    });
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

    const result = await pool.query(
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
      res.status(404).json({ error: 'Session not found' });
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
      registeredUsers: (row.registered_users || []).map((u: any) => ({
        ...u,
        registeredAt: parseInt(u.registeredAt),
      })),
      participants: (row.participants || []).map((p: any) => ({
        ...p,
        joinedAt: parseInt(p.joinedAt),
      })),
    };

    res.json({
      success: true,
      session,
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({
      error: 'Failed to fetch session',
      message: (error as Error).message,
    });
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
      res.status(404).json({ error: 'Session not found' });
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
      res.status(404).json({ error: 'Session not found' });
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
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Get user info
    const userResult = await pool.query(
      'SELECT username, display_name FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { username, display_name } = userResult.rows[0];

    // Check session status
    const sessionResult = await pool.query(
      'SELECT status, max_participants FROM sessions WHERE id = $1',
      [id]
    );

    if (sessionResult.rows.length === 0) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    const { status, max_participants } = sessionResult.rows[0];

    if (status !== 'scheduled') {
      res.status(400).json({ error: 'Can only register for scheduled sessions' });
      return;
    }

    // Check if already registered
    const existingReg = await pool.query(
      'SELECT id FROM session_registrations WHERE session_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (existingReg.rows.length > 0) {
      res.json({ success: true, message: 'Already registered' });
      return;
    }

    // Check capacity
    const countResult = await pool.query(
      'SELECT COUNT(*) as count FROM session_registrations WHERE session_id = $1',
      [id]
    );

    if (parseInt(countResult.rows[0].count) >= max_participants) {
      res.status(400).json({ error: 'Session is full' });
      return;
    }

    // Register user
    await pool.query(
      `INSERT INTO session_registrations (session_id, user_id, username, display_name, registered_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, userId, username, display_name, Date.now()]
    );

    res.json({
      success: true,
      message: 'Successfully registered',
    });
  } catch (error) {
    console.error('Error registering for session:', error);
    res.status(500).json({
      error: 'Failed to register for session',
      message: (error as Error).message,
    });
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
