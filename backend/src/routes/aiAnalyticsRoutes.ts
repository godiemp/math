import { Router } from 'express';
import {
  getAIAnalyticsDashboard,
  getConversationDetails,
  getCommonQuestions
} from '../controllers/aiAnalyticsController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

/**
 * All AI analytics routes require admin authentication
 */

/**
 * GET /api/ai-analytics/dashboard
 * Get comprehensive AI analytics dashboard data
 */
router.get('/dashboard', authenticate, authorize('admin'), getAIAnalyticsDashboard);

/**
 * GET /api/ai-analytics/conversations/:sessionId
 * Get detailed conversation history for a specific quiz session
 */
router.get('/conversations/:sessionId', authenticate, authorize('admin'), getConversationDetails);

/**
 * GET /api/ai-analytics/common-questions
 * Get most common student questions and patterns
 */
router.get('/common-questions', authenticate, authorize('admin'), getCommonQuestions);

export default router;
