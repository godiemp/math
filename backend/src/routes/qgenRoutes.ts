/**
 * QGen Routes
 * Routes for question generation using QGen algorithm
 */

import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  generateQGenQuestions,
  getContexts,
  getTemplates,
} from '../controllers/qgenController.js';

const router = express.Router();

// All routes require authentication and admin privileges
router.use(authenticate);
router.use(requireAdmin);

/**
 * POST /api/qgen/generate
 * Generate questions using QGen algorithm
 */
router.post('/generate', generateQGenQuestions);

/**
 * GET /api/qgen/contexts
 * Get available contexts
 */
router.get('/contexts', getContexts);

/**
 * GET /api/qgen/templates
 * Get available templates
 */
router.get('/templates', getTemplates);

export default router;
