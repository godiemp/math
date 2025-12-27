import express from 'express';
import {
  getDiagnosisQuestions,
  submitAnswer,
  analyzeError,
  completeDiagnosisSession,
  getSessionStatus,
  getHistory,
} from '../controllers/diagnosisController';
import { authenticate } from '../auth/middleware';

const router = express.Router();

/**
 * Diagnosis Routes
 * All routes require authentication
 *
 * These endpoints support the knowledge gap diagnosis system,
 * which verifies student self-assessments using AI-powered analysis.
 */

// GET /api/diagnosis/questions - Get questions for diagnosing specific skills
// Query params: skills (comma-separated), level (M1|M2), limit (number)
router.get('/questions', authenticate, getDiagnosisQuestions);

// POST /api/diagnosis/answer - Submit an answer for a diagnosis question
router.post('/answer', authenticate, submitAnswer);

// POST /api/diagnosis/analyze-error - Analyze an error with AI
router.post('/analyze-error', authenticate, analyzeError);

// POST /api/diagnosis/complete - Complete a diagnosis session and get results
router.post('/complete', authenticate, completeDiagnosisSession);

// GET /api/diagnosis/session/:sessionId - Get current session status
router.get('/session/:sessionId', authenticate, getSessionStatus);

// GET /api/diagnosis/history - Get diagnosis history for current user
router.get('/history', authenticate, getHistory);

export default router;
