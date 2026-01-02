/**
 * ============================================================================
 * USER PROFILE CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for user profile management endpoints
 */

import { Request, Response } from 'express';
import { pool } from '../config/database';

type PaesExamTarget = 'invierno_2026' | 'verano_2026' | 'verano_e_invierno_2026';

interface UpdateProfileRequest {
  displayName?: string;
  email?: string;
  targetLevel?: 'M1_ONLY' | 'M1_AND_M2';
  paesExamTarget?: PaesExamTarget;
}

interface MarkWelcomeSeenRequest {
  hasSeenWelcome: boolean;
  paesExamTarget?: PaesExamTarget;
}

interface UpdateCookieConsentRequest {
  cookieConsent: 'accepted' | 'declined';
}

/**
 * Update current user's profile
 */
export async function updateUserProfile(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const userId = req.user.userId;
    const { displayName, email, targetLevel, paesExamTarget } = req.body as UpdateProfileRequest;

    // Validate input
    if (!displayName && !email && !targetLevel && !paesExamTarget) {
      res.status(400).json({ error: 'At least one field (displayName, email, targetLevel, or paesExamTarget) must be provided' });
      return;
    }

    // Build update query dynamically based on provided fields
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (displayName !== undefined) {
      if (typeof displayName !== 'string' || displayName.trim().length === 0) {
        res.status(400).json({ error: 'Display name cannot be empty' });
        return;
      }
      updates.push(`display_name = $${paramIndex++}`);
      values.push(displayName.trim());
    }

    if (email !== undefined) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
      }

      // Check if email is already taken by another user
      const emailCheckResult = await pool.query(
        'SELECT id FROM users WHERE email = $1 AND id != $2',
        [email, userId]
      );

      if (emailCheckResult.rows.length > 0) {
        res.status(409).json({ error: 'Email is already taken' });
        return;
      }

      updates.push(`email = $${paramIndex++}`);
      values.push(email.toLowerCase().trim());
    }

    if (targetLevel !== undefined) {
      // Validate targetLevel value
      if (targetLevel !== 'M1_ONLY' && targetLevel !== 'M1_AND_M2') {
        res.status(400).json({ error: 'Invalid target level. Must be M1_ONLY or M1_AND_M2' });
        return;
      }
      updates.push(`target_level = $${paramIndex++}`);
      values.push(targetLevel);
    }

    if (paesExamTarget !== undefined) {
      // Validate paesExamTarget value
      const validTargets: PaesExamTarget[] = ['invierno_2026', 'verano_2026', 'verano_e_invierno_2026'];
      if (!validTargets.includes(paesExamTarget)) {
        res.status(400).json({ error: 'Invalid PAES exam target. Must be invierno_2026, verano_2026, or verano_e_invierno_2026' });
        return;
      }
      updates.push(`paes_exam_target = $${paramIndex++}`);
      values.push(paesExamTarget);
    }

    // Check if there are any updates to make
    if (updates.length === 0) {
      res.status(400).json({ error: 'No valid fields to update' });
      return;
    }

    // Add updated_at timestamp
    updates.push(`updated_at = $${paramIndex++}`);
    values.push(Date.now());

    // Add userId as the last parameter
    values.push(userId);

    // Execute update query
    const query = `
      UPDATE users
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, username, email, display_name, role, created_at
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const updatedUser = result.rows[0];

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        displayName: updatedUser.display_name,
        role: updatedUser.role,
        createdAt: updatedUser.created_at,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

/**
 * Mark welcome message as seen for current user and save PAES exam target
 */
export async function markWelcomeSeen(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const userId = req.user.userId;
    const { paesExamTarget } = req.body as MarkWelcomeSeenRequest;

    // Validate paesExamTarget if provided
    if (paesExamTarget !== undefined) {
      const validTargets: PaesExamTarget[] = ['invierno_2026', 'verano_2026', 'verano_e_invierno_2026'];
      if (!validTargets.includes(paesExamTarget)) {
        res.status(400).json({ error: 'Invalid PAES exam target. Must be invierno_2026, verano_2026, or verano_e_invierno_2026' });
        return;
      }
    }

    // Update has_seen_welcome flag and optionally paes_exam_target
    const query = paesExamTarget
      ? `
        UPDATE users
        SET has_seen_welcome = TRUE, paes_exam_target = $1, updated_at = $2
        WHERE id = $3
        RETURNING has_seen_welcome, paes_exam_target
      `
      : `
        UPDATE users
        SET has_seen_welcome = TRUE, updated_at = $1
        WHERE id = $2
        RETURNING has_seen_welcome, paes_exam_target
      `;

    const params = paesExamTarget
      ? [paesExamTarget, Date.now(), userId]
      : [Date.now(), userId];

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Welcome message marked as seen',
      hasSeenWelcome: result.rows[0].has_seen_welcome,
      paesExamTarget: result.rows[0].paes_exam_target,
    });
  } catch (error) {
    console.error('Mark welcome seen error:', error);
    res.status(500).json({ error: 'Failed to mark welcome as seen' });
  }
}

/**
 * Update current user's cookie consent preference
 */
export async function updateCookieConsent(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const userId = req.user.userId;
    const { cookieConsent } = req.body as UpdateCookieConsentRequest;

    // Validate input
    if (!cookieConsent || (cookieConsent !== 'accepted' && cookieConsent !== 'declined')) {
      res.status(400).json({ error: 'Cookie consent must be either "accepted" or "declined"' });
      return;
    }

    // Update cookie_consent field
    const query = `
      UPDATE users
      SET cookie_consent = $1, updated_at = $2
      WHERE id = $3
      RETURNING cookie_consent
    `;

    const result = await pool.query(query, [cookieConsent, Date.now(), userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Cookie consent preference updated successfully',
      cookieConsent: result.rows[0].cookie_consent,
    });
  } catch (error) {
    console.error('Update cookie consent error:', error);
    res.status(500).json({ error: 'Failed to update cookie consent' });
  }
}
