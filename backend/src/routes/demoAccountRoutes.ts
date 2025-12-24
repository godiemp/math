/**
 * ============================================================================
 * DEMO ACCOUNT ROUTES
 * ============================================================================
 *
 * Route definitions for demo account management (school free trials)
 */

import { Router } from 'express';
import { authenticate, requireAdmin } from '../auth/middleware';
import {
  createDemoAccount,
  getDemoAccounts,
  deleteDemoAccount,
} from '../controllers/demoAccountController';

const router = Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

/**
 * @route   POST /api/admin/demo-accounts
 * @desc    Create a new demo account for a school
 * @body    { schoolRbd, schoolName, gradeLevel, trialDurationDays? }
 * @access  Private (Admin only)
 */
router.post('/', createDemoAccount);

/**
 * @route   GET /api/admin/demo-accounts
 * @desc    Get all demo accounts
 * @access  Private (Admin only)
 */
router.get('/', getDemoAccounts);

/**
 * @route   DELETE /api/admin/demo-accounts/:id
 * @desc    Delete a demo account
 * @access  Private (Admin only)
 */
router.delete('/:id', deleteDemoAccount);

export default router;
