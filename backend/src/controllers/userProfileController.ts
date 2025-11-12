/**
 * ============================================================================
 * USER PROFILE CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for user profile management endpoints
 */

import { Request, Response } from 'express';
import { pool } from '../config/database';

interface UpdateProfileRequest {
  displayName?: string;
  email?: string;
  targetLevel?: 'M1_ONLY' | 'M1_AND_M2';
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
    const { displayName, email, targetLevel } = req.body as UpdateProfileRequest;

    // Validate input
    if (!displayName && !email && !targetLevel) {
      res.status(400).json({ error: 'At least one field (displayName, email, or targetLevel) must be provided' });
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
