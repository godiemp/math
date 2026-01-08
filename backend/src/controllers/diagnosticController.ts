/**
 * ============================================================================
 * DIAGNOSTIC CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for AI-powered knowledge diagnostic endpoints
 */

import { Response } from 'express';
import {
  startDiagnostic,
  continueDiagnostic,
  confirmInferences,
  getDiagnosticStatus,
  Subject,
} from '../services/diagnosticService';
import { AuthRequest } from '../types';
import { pool } from '../config/database';

/**
 * Start a new diagnostic session
 * POST /api/diagnostic/start
 */
export async function startDiagnosticSession(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { subject } = req.body as { subject: Subject };

    if (!subject || !['números', 'álgebra', 'geometría', 'probabilidad'].includes(subject)) {
      res.status(400).json({ error: 'Valid subject is required (números, álgebra, geometría, probabilidad)' });
      return;
    }

    // Fetch user's target level from database
    const userResult = await pool.query(
      'SELECT target_level FROM users WHERE id = $1',
      [req.user.userId]
    );
    const targetLevel = userResult.rows[0]?.target_level || 'M1_AND_M2';

    const result = await startDiagnostic({
      userId: req.user.userId,
      subject,
      targetLevel,
    });

    res.json(result);
  } catch (error) {
    console.error('Start diagnostic error:', error);
    res.status(500).json({
      error: 'Failed to start diagnostic session',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Continue diagnostic conversation
 * POST /api/diagnostic/chat
 */
export async function continueDiagnosticChat(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { sessionId, message } = req.body as { sessionId: string; message: string };

    if (!sessionId) {
      res.status(400).json({ error: 'Session ID is required' });
      return;
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const result = await continueDiagnostic({
      userId: req.user.userId,
      sessionId,
      message: message.trim(),
    });

    res.json(result);
  } catch (error) {
    console.error('Continue diagnostic error:', error);
    res.status(500).json({
      error: 'Failed to continue diagnostic conversation',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Confirm inferences and write to knowledge declarations
 * POST /api/diagnostic/confirm
 */
export async function confirmDiagnosticInferences(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { sessionId, adjustments } = req.body as {
      sessionId: string;
      adjustments?: { unitCode: string; subsectionCode?: string; knows: boolean }[];
    };

    if (!sessionId) {
      res.status(400).json({ error: 'Session ID is required' });
      return;
    }

    const result = await confirmInferences(req.user.userId, sessionId, adjustments);

    res.json(result);
  } catch (error) {
    console.error('Confirm inferences error:', error);
    res.status(500).json({
      error: 'Failed to confirm inferences',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Get diagnostic status for all subjects
 * GET /api/diagnostic/status
 */
export async function getDiagnosticStatusHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // Fetch user's target level from database
    const userResult = await pool.query(
      'SELECT target_level FROM users WHERE id = $1',
      [req.user.userId]
    );
    const targetLevel = userResult.rows[0]?.target_level || 'M1_AND_M2';

    const result = await getDiagnosticStatus(req.user.userId, targetLevel);

    res.json(result);
  } catch (error) {
    console.error('Get diagnostic status error:', error);
    res.status(500).json({
      error: 'Failed to get diagnostic status',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
