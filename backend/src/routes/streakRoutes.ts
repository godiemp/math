import { Router } from 'express';
import { getStreak, updateStreak } from '../controllers/streakController';
import { authenticate } from '../auth/middleware';

const router = Router();

/**
 * @route   GET /api/streak
 * @desc    Get current user's streak data
 * @access  Private
 */
router.get('/', authenticate, getStreak);

/**
 * @route   POST /api/streak/update
 * @desc    Update streak after completing practice
 * @access  Private
 */
router.post('/update', authenticate, updateStreak);

export default router;
