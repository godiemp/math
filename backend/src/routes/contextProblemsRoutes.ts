/**
 * Routes for Context Problems
 */

import express from 'express';
import {
  generateContextProblemsController,
  listContextProblemsController,
  getContextsByAbstractController,
  suggestContextTypesController,
} from '../controllers/abstractProblemsController';
import { authenticateToken, requireAdmin } from '../auth/middleware/authMiddleware';

const router = express.Router();

/**
 * POST /api/context-problems/generate
 * Generate context problems from abstract problem
 * Body: { abstract_problem_id, context_type, count, save_to_db }
 * Requires: Admin authentication
 */
router.post('/generate', authenticateToken, requireAdmin, generateContextProblemsController);

/**
 * GET /api/context-problems
 * List context problems with filters
 * Query params: abstract_problem_id, context_type, status, verified, quality_score, limit, offset, sort_by, sort_order
 */
router.get('/', authenticateToken, listContextProblemsController);

/**
 * GET /api/context-problems/by-abstract/:id
 * Get all context problems for a specific abstract problem
 */
router.get('/by-abstract/:id', authenticateToken, getContextsByAbstractController);

/**
 * GET /api/context-problems/suggest-contexts/:id
 * Suggest appropriate context types for an abstract problem
 */
router.get('/suggest-contexts/:id', authenticateToken, suggestContextTypesController);

export default router;
