/**
 * QGen Routes
 * Routes for question generation using QGen algorithm
 */

import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import {
  generateQGenQuestions,
  generateSingleQuestion,
  getContexts,
  getTemplates,
} from '../controllers/qgenController';

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
 * POST /api/qgen/generate-single
 * Generate a single complete question with AI
 */
router.post('/generate-single', generateSingleQuestion);

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
