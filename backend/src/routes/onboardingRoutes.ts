/**
 * ============================================================================
 * ONBOARDING ROUTES
 * ============================================================================
 *
 * Routes for handling user onboarding progress
 */

import { Router } from 'express';
import { Request, Response } from 'express';
import { pool } from '../config/database';
import { authenticate } from '../auth/middleware';

const router = Router();

/**
 * @route   PATCH /api/onboarding/progress
 * @desc    Update user onboarding progress
 * @access  Private
 */
router.patch('/progress', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { onboardingStage, preferredSubject, hasCompletedOnboarding } = req.body;

    // Build update query dynamically based on provided fields
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (onboardingStage !== undefined) {
      updates.push(`onboarding_stage = $${paramCount}`);
      values.push(onboardingStage);
      paramCount++;
    }

    if (preferredSubject !== undefined) {
      updates.push(`preferred_subject = $${paramCount}`);
      values.push(preferredSubject);
      paramCount++;
    }

    if (hasCompletedOnboarding !== undefined) {
      updates.push(`has_completed_onboarding = $${paramCount}`);
      values.push(hasCompletedOnboarding);
      paramCount++;
    }

    if (updates.length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }

    // Add user ID and updated_at to values
    values.push(req.user.userId);
    values.push(Date.now());

    const query = `
      UPDATE users
      SET ${updates.join(', ')}, updated_at = $${paramCount + 1}
      WHERE id = $${paramCount}
      RETURNING id, username, email, display_name, role, created_at, updated_at,
                current_streak, longest_streak, last_practice_date,
                has_completed_onboarding, onboarding_stage, preferred_subject
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = result.rows[0];

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.display_name,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      currentStreak: user.current_streak,
      longestStreak: user.longest_streak,
      lastPracticeDate: user.last_practice_date,
      hasCompletedOnboarding: user.has_completed_onboarding,
      onboardingStage: user.onboarding_stage,
      preferredSubject: user.preferred_subject,
    });
  } catch (error) {
    console.error('Update onboarding progress error:', error);
    res.status(500).json({ error: 'Failed to update onboarding progress' });
  }
});

export default router;
