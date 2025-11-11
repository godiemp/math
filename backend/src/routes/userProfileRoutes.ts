/**
 * ============================================================================
 * USER PROFILE ROUTES
 * ============================================================================
 *
 * Route definitions for user profile management endpoints
 */

import { Router } from 'express';
import { authenticate } from '../auth/middleware/authenticate';
import { updateUserProfile } from '../controllers/userProfileController';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   PUT /api/user/profile
 * @desc    Update current user's profile (displayName, email)
 * @access  Private
 */
router.put('/profile', updateUserProfile);

export default router;
