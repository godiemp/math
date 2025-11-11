import { Router } from 'express';
import {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession,
  cancelSession,
  registerForSession,
  unregisterFromSession,
  updateSessionStatuses,
  joinSession,
  submitAnswer,
  getMyParticipation,
  getMyStatistics,
} from '../controllers/sessionController';
import { authenticate, requireAdmin } from '../auth/middleware';

const router = Router();

/**
 * @route   GET /api/sessions
 * @desc    Get all sessions (with optional filters)
 * @access  Public
 */
router.get('/', getSessions);

/**
 * @route   POST /api/sessions
 * @desc    Create a new session
 * @access  Private (Admin only)
 */
router.post('/', authenticate, requireAdmin, createSession);

/**
 * @route   POST /api/sessions/update-statuses
 * @desc    Update session statuses based on time
 * @access  Public
 */
router.post('/update-statuses', updateSessionStatuses);

/**
 * @route   GET /api/sessions/stats/me
 * @desc    Get my statistics for live practice sessions
 * @access  Private
 */
router.get('/stats/me', authenticate, getMyStatistics);

/**
 * @route   GET /api/sessions/:id
 * @desc    Get a single session by ID
 * @access  Public
 */
router.get('/:id', getSession);

/**
 * @route   PATCH /api/sessions/:id
 * @desc    Update a scheduled session
 * @access  Private (Admin only)
 */
router.patch('/:id', authenticate, requireAdmin, updateSession);

/**
 * @route   DELETE /api/sessions/:id
 * @desc    Delete a session
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, requireAdmin, deleteSession);

/**
 * @route   POST /api/sessions/:id/cancel
 * @desc    Cancel a session
 * @access  Private (Admin only)
 */
router.post('/:id/cancel', authenticate, requireAdmin, cancelSession);

/**
 * @route   POST /api/sessions/:id/register
 * @desc    Register for a session
 * @access  Private
 */
router.post('/:id/register', authenticate, registerForSession);

/**
 * @route   POST /api/sessions/:id/unregister
 * @desc    Unregister from a session
 * @access  Private
 */
router.post('/:id/unregister', authenticate, unregisterFromSession);

/**
 * @route   POST /api/sessions/:id/join
 * @desc    Join a session as a participant
 * @access  Private
 */
router.post('/:id/join', authenticate, joinSession);

/**
 * @route   POST /api/sessions/:id/answers
 * @desc    Submit an answer for a question
 * @access  Private
 */
router.post('/:id/answers', authenticate, submitAnswer);

/**
 * @route   GET /api/sessions/:id/participants/me
 * @desc    Get my participation data for a session
 * @access  Private
 */
router.get('/:id/participants/me', authenticate, getMyParticipation);

export default router;
