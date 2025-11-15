/**
 * ============================================================================
 * USER PROFILE ROUTES
 * ============================================================================
 *
 * Route definitions for user profile management endpoints
 */

import { Router } from 'express';
import { authenticate } from '../auth/middleware/authenticate';
import { updateUserProfile, markWelcomeSeen, updateCookieConsent } from '../controllers/userProfileController';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   PUT /api/user/profile
 * @desc    Update current user's profile (displayName, email)
 * @access  Private
 */
router.put('/profile', updateUserProfile);

/**
 * @route   POST /api/user/welcome-seen
 * @desc    Mark welcome message as seen for current user
 * @access  Private
 */
router.post('/welcome-seen', markWelcomeSeen);

/**
 * @route   PATCH /api/user/cookie-consent
 * @desc    Update current user's cookie consent preference
 * @access  Private
 */
router.patch('/cookie-consent', updateCookieConsent);

export default router;
