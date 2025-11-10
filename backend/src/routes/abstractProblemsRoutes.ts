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
import { authenticate, requireAdmin } from '../auth/middleware';

const router = express.Router();

// ========================================
// Abstract Problems Routes
// ========================================

/**
 * POST /api/abstract-problems/generate
 * Generate abstract problems using OpenAI
 * Requires: Admin authentication
 */
router.post('/generate', authenticate, requireAdmin, generateAbstractProblemsController);

/**
 * POST /api/abstract-problems/generate-numeros-m1
 * Generate all números M1 problems
 * Requires: Admin authentication
 */
router.post(
  '/generate-numeros-m1',
  authenticate,
  requireAdmin,
  generateNumerosM1Controller
);

/**
 * GET /api/abstract-problems
 * List abstract problems with filters
 * Query params: level, subject, unit, difficulty, status, cognitive_level, skills, limit, offset, sort_by, sort_order
 */
router.get('/', authenticate, listAbstractProblemsController);

/**
 * GET /api/abstract-problems/stats/by-unit
 * Get statistics grouped by unit
 * Query params: level, subject
 */
router.get('/stats/by-unit', authenticate, getStatsByUnitController);

/**
 * GET /api/abstract-problems/:id
 * Get single abstract problem by ID
 */
router.get('/:id', authenticate, getAbstractProblemController);

/**
 * PUT /api/abstract-problems/:id
 * Update abstract problem
 * Requires: Admin authentication
 */
router.put('/:id', authenticate, requireAdmin, updateAbstractProblemController);

/**
 * DELETE /api/abstract-problems/:id
 * Delete abstract problem
 * Requires: Admin authentication
 */
router.delete('/:id', authenticate, requireAdmin, deleteAbstractProblemController);

/**
 * POST /api/abstract-problems/:id/activate
 * Activate abstract problem (set status to active)
 * Requires: Admin authentication
 */
router.post('/:id/activate', authenticate, requireAdmin, activateAbstractProblemController);

export default router;
