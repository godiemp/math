/**
 * Routes for Abstract Problems and Context Problems
 */

import express from 'express';
import {
  generateAbstractProblemsController,
  generateNumerosM1Controller,
  listAbstractProblemsController,
  getAbstractProblemController,
  updateAbstractProblemController,
  deleteAbstractProblemController,
  activateAbstractProblemController,
  getStatsByUnitController,
  generateContextProblemsController,
  listContextProblemsController,
  getContextsByAbstractController,
  suggestContextTypesController,
} from '../controllers/abstractProblemsController';
import { authenticateToken, requireAdmin } from '../auth/middleware/authMiddleware';

const router = express.Router();

// ========================================
// Abstract Problems Routes
// ========================================

/**
 * POST /api/abstract-problems/generate
 * Generate abstract problems using OpenAI
 * Requires: Admin authentication
 */
router.post('/generate', authenticateToken, requireAdmin, generateAbstractProblemsController);

/**
 * POST /api/abstract-problems/generate-numeros-m1
 * Generate all números M1 problems
 * Requires: Admin authentication
 */
router.post(
  '/generate-numeros-m1',
  authenticateToken,
  requireAdmin,
  generateNumerosM1Controller
);

/**
 * GET /api/abstract-problems
 * List abstract problems with filters
 * Query params: level, subject, unit, difficulty, status, cognitive_level, skills, limit, offset, sort_by, sort_order
 */
router.get('/', authenticateToken, listAbstractProblemsController);

/**
 * GET /api/abstract-problems/stats/by-unit
 * Get statistics grouped by unit
 * Query params: level, subject
 */
router.get('/stats/by-unit', authenticateToken, getStatsByUnitController);

/**
 * GET /api/abstract-problems/:id
 * Get single abstract problem by ID
 */
router.get('/:id', authenticateToken, getAbstractProblemController);

/**
 * PUT /api/abstract-problems/:id
 * Update abstract problem
 * Requires: Admin authentication
 */
router.put('/:id', authenticateToken, requireAdmin, updateAbstractProblemController);

/**
 * DELETE /api/abstract-problems/:id
 * Delete abstract problem
 * Requires: Admin authentication
 */
router.delete('/:id', authenticateToken, requireAdmin, deleteAbstractProblemController);

/**
 * POST /api/abstract-problems/:id/activate
 * Activate abstract problem (set status to active)
 * Requires: Admin authentication
 */
router.post('/:id/activate', authenticateToken, requireAdmin, activateAbstractProblemController);

export default router;
