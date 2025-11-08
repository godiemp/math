import { Response } from 'express';
import { pool } from '../config/database';
import { AuthRequest } from '../types';

/**
 * Calculate if streak should continue based on last practice date
 */
const calculateStreak = (lastPracticeDate: string | null): { shouldContinue: boolean; shouldReset: boolean } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD

  if (!lastPracticeDate) {
    return { shouldContinue: false, shouldReset: false };
  }

  const lastPractice = new Date(lastPracticeDate);
  lastPractice.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // If practiced today, streak continues (but don't increment again)
  if (lastPracticeDate === todayString) {
    return { shouldContinue: true, shouldReset: false };
  }

  // If practiced yesterday, streak continues
  if (lastPractice.getTime() === yesterday.getTime()) {
    return { shouldContinue: true, shouldReset: false };
  }

  // If last practice was more than 1 day ago, streak is broken
  return { shouldContinue: false, shouldReset: true };
};

/**
 * Get current user's streak data
 */
export const getStreak = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const result = await pool.query(
      'SELECT current_streak, longest_streak, last_practice_date FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = result.rows[0];
    const { shouldContinue, shouldReset } = calculateStreak(user.last_practice_date);

    // Auto-reset streak if it's broken
    let currentStreak = user.current_streak;
    if (shouldReset && currentStreak > 0) {
      await pool.query(
        'UPDATE users SET current_streak = 0 WHERE id = $1',
        [userId]
      );
      currentStreak = 0;
    }

    res.json({
      currentStreak,
      longestStreak: user.longest_streak,
      lastPracticeDate: user.last_practice_date,
    });
  } catch (error) {
    console.error('Error getting streak:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Update streak after user completes practice
 */
export const updateStreak = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD

    const result = await pool.query(
      'SELECT current_streak, longest_streak, last_practice_date FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = result.rows[0];
    let currentStreak = user.current_streak;
    let longestStreak = user.longest_streak;

    // Check if already practiced today
    if (user.last_practice_date === todayString) {
      res.json({
        currentStreak,
        longestStreak,
        lastPracticeDate: todayString,
        message: 'Streak already updated today',
      });
      return;
    }

    const { shouldContinue, shouldReset } = calculateStreak(user.last_practice_date);

    if (shouldReset) {
      // Streak was broken, start fresh
      currentStreak = 1;
    } else if (shouldContinue) {
      // Continue streak from yesterday
      currentStreak += 1;
    } else {
      // First practice or no previous data
      currentStreak = 1;
    }

    // Update longest streak if current is higher
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    // Update database
    await pool.query(
      `UPDATE users
       SET current_streak = $1,
           longest_streak = $2,
           last_practice_date = $3,
           updated_at = $4
       WHERE id = $5`,
      [currentStreak, longestStreak, todayString, Date.now(), userId]
    );

    res.json({
      currentStreak,
      longestStreak,
      lastPracticeDate: todayString,
      message: 'Streak updated successfully',
    });
  } catch (error) {
    console.error('Error updating streak:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
