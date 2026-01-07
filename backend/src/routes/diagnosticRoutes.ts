import { Router } from 'express';
import {
  startDiagnosticSession,
  continueDiagnosticChat,
  confirmDiagnosticInferences,
  getDiagnosticStatusHandler,
} from '../controllers/diagnosticController';
import { authenticate } from '../auth/middleware';

const router = Router();

/**
 * POST /api/diagnostic/start
 * Start a new diagnostic session for a subject
 */
router.post('/start', authenticate, startDiagnosticSession);

/**
 * POST /api/diagnostic/chat
 * Continue diagnostic conversation
 */
router.post('/chat', authenticate, continueDiagnosticChat);

/**
 * POST /api/diagnostic/confirm
 * Confirm inferences and write to knowledge declarations
 */
router.post('/confirm', authenticate, confirmDiagnosticInferences);

/**
 * GET /api/diagnostic/status
 * Get diagnostic status for all subjects
 */
router.get('/status', authenticate, getDiagnosticStatusHandler);

export default router;
