/**
 * ============================================================================
 * USER PROFILE ROUTES
 * ============================================================================
 *
 * Route definitions for user profile management endpoints
 */

import { Router } from 'express';
import { authenticate } from '../auth/middleware/authenticate';
import { updateUserProfile, markWelcomeSeen, updateCookieConsent, updateThemePreference } from '../controllers/userProfileController';
import { getKnowledgeDeclarations, updateKnowledgeDeclarations } from '../controllers/knowledgeDeclarationController';

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

/**
 * @route   PATCH /api/user/theme-preference
 * @desc    Update current user's theme preference
 * @access  Private
 */
router.patch('/theme-preference', updateThemePreference);

/**
 * @route   GET /api/user/knowledge-declarations
 * @desc    Get all knowledge declarations for current user
 * @query   level - Optional filter by level (M1 or M2)
 * @access  Private
 */
router.get('/knowledge-declarations', getKnowledgeDeclarations);

/**
 * @route   PUT /api/user/knowledge-declarations
 * @desc    Update knowledge declarations for current user
 * @body    { declarations: [{ type, itemCode, knows, cascade? }] }
 * @access  Private
 */
router.put('/knowledge-declarations', updateKnowledgeDeclarations);

export default router;
