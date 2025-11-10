import { Response } from 'express';
import { AuthRequest } from '../types';
import { pool } from '../config/database';
import { generateGreeting, continueChat as continueChatService } from '../services/studyBuddyService';

/**
 * Get personalized greeting with progress insights
 */
export const getGreeting = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Fetch user data from database
    const userResult = await pool.query(
      `SELECT id, username, email, display_name, current_streak, longest_streak, last_practice_date
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = userResult.rows[0];

    // Get progress data from request body (sent from client's localStorage)
    const { progressData } = req.body;

    // Determine time of day
    const hour = new Date().getHours();
    let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    if (hour >= 5 && hour < 12) {
      timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 18) {
      timeOfDay = 'afternoon';
    } else if (hour >= 18 && hour < 22) {
      timeOfDay = 'evening';
    } else {
      timeOfDay = 'night';
    }

    // Generate greeting
    const greeting = await generateGreeting({
      userData: {
        displayName: user.display_name,
        currentStreak: user.current_streak,
        longestStreak: user.longest_streak,
        lastPracticeDate: user.last_practice_date,
      },
      progressData: progressData || {},
      timeOfDay,
    });

    res.json(greeting);
  } catch (error) {
    console.error('Error generating greeting:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate greeting',
    });
  }
};

/**
 * Continue conversation with study buddy
 */
export const continueChat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { progressData, messages, userMessage } = req.body;

    if (!userMessage || !messages) {
      res.status(400).json({ error: 'Missing required fields: userMessage, messages' });
      return;
    }

    // Fetch user data from database
    const userResult = await pool.query(
      `SELECT display_name, current_streak, longest_streak, last_practice_date
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = userResult.rows[0];

    // Continue chat
    const chatResponse = await continueChatService({
      userData: {
        displayName: user.display_name,
        currentStreak: user.current_streak,
        longestStreak: user.longest_streak,
        lastPracticeDate: user.last_practice_date,
      },
      progressData: progressData || {},
      messages,
      userMessage,
    });

    res.json(chatResponse);
  } catch (error) {
    console.error('Error in study buddy chat:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to continue chat',
    });
  }
};
