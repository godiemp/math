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
} from '../controllers/sessionController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/sessions
 * @desc    Get all sessions (with optional filters)
 * @access  Public
 */
router.get('/', getSessions);

/**
 * @route   GET /api/sessions/:id
 * @desc    Get a single session by ID
 * @access  Public
 */
router.get('/:id', getSession);

/**
 * @route   POST /api/sessions
 * @desc    Create a new session
 * @access  Private (Admin only)
 */
router.post('/', authenticate, requireAdmin, createSession);

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
 * @route   POST /api/sessions/update-statuses
 * @desc    Update session statuses based on time
 * @access  Public
 */
router.post('/update-statuses', updateSessionStatuses);

export default router;
