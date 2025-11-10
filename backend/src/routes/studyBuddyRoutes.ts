import { Router } from 'express';
import { getGreeting, continueChat } from '../controllers/studyBuddyController';
import { authenticate } from '../auth/middleware';

const router = Router();

/**
 * POST /api/study-buddy/greeting
 * Get personalized greeting with progress insights
 */
router.post('/greeting', authenticate, getGreeting);

/**
 * POST /api/study-buddy/chat
 * Continue conversation with study buddy
 */
router.post('/chat', authenticate, continueChat);

export default router;
