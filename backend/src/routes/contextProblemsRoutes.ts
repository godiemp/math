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
import { authenticate, requireAdmin } from '../auth/middleware';

const router = express.Router();

/**
 * POST /api/context-problems/generate
 * Generate context problems from abstract problem
 * Body: { abstract_problem_id, context_type, count, save_to_db }
 * Requires: Admin authentication
 */
router.post('/generate', authenticate, requireAdmin, generateContextProblemsController);

/**
 * GET /api/context-problems
 * List context problems with filters
 * Query params: abstract_problem_id, context_type, status, verified, quality_score, limit, offset, sort_by, sort_order
 */
router.get('/', authenticate, listContextProblemsController);

/**
 * GET /api/context-problems/by-abstract/:id
 * Get all context problems for a specific abstract problem
 */
router.get('/by-abstract/:id', authenticate, getContextsByAbstractController);

/**
 * GET /api/context-problems/suggest-contexts/:id
 * Suggest appropriate context types for an abstract problem
 */
router.get('/suggest-contexts/:id', authenticate, suggestContextTypesController);

export default router;
