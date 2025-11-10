/**
 * ============================================================================
 * AUTH ROUTES
 * ============================================================================
 *
 * Route definitions for authentication endpoints
 */

import { Router } from 'express';
import { register, login, refresh, logout, getCurrentUser } from '../controllers/authController';
import { authenticate } from '../middleware';
import { validateRegister, validateLogin, validateRefreshToken } from '../../middleware/validation';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateRegister, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateLogin, login);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', validateRefreshToken, refresh);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (revoke refresh token)
 * @access  Public
 */
router.post('/logout', logout);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user info
 * @access  Private
 */
router.get('/me', authenticate, getCurrentUser);

export default router;
