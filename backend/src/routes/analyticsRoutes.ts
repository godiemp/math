import express from 'express';
import { getAnalyticsDashboard, getWeeklyTrends } from '../controllers/analyticsController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

/**
 * Analytics Routes
 * All routes require authentication and admin role
 */

// GET /api/analytics/dashboard - Get full analytics dashboard data
router.get('/dashboard', authenticate, requireAdmin, getAnalyticsDashboard);

// GET /api/analytics/trends - Get weekly trend data for charts
router.get('/trends', authenticate, requireAdmin, getWeeklyTrends);

export default router;
