/**
 * QGen Routes
 * Routes for question generation using QGen algorithm
 */

import express from 'express';
import { authenticate, requireAdmin } from '../auth/middleware';
import {
  generateQGenQuestions,
  generateSingleQuestion,
  getContexts,
  getTemplates,
} from '../controllers/qgenController';

const router = express.Router();

// Logging middleware for all qgen routes
router.use((req, res, next) => {
  console.log('\n========================================');
  console.log('🎯 QGEN ROUTE ACCESSED');
  console.log(`   Time: ${new Date().toISOString()}`);
  console.log(`   Method: ${req.method}`);
  console.log(`   URL: ${req.url}`);
  console.log(`   Path: ${req.path}`);
  console.log(`   Original URL: ${req.originalUrl}`);
  console.log(`   Content-Type: ${req.get('content-type')}`);
  console.log(`   Authorization: ${req.get('authorization') ? 'Present' : 'Missing'}`);
  console.log('========================================\n');
  next();
});

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
