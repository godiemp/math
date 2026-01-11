/**
 * ============================================================================
 * AUTH ROUTES
 * ============================================================================
 *
 * Route definitions for authentication endpoints
 */

import { Router } from 'express';
import { register, login, refresh, logout, getCurrentUser, getSocketToken } from '../controllers/authController';
import {
  handleSendVerification,
  handleVerifyEmail,
  handleForgotPassword,
  handleResetPassword,
  handleResendVerification,
} from '../controllers/emailController';
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

/**
 * @route   GET /api/auth/socket-token
 * @desc    Get token for WebSocket authentication
 * @access  Private
 *
 * This endpoint returns the access token for Socket.io authentication.
 * Needed because REST API uses a proxy (cookies are first-party to Vercel),
 * while Socket.io connects directly to Railway (different domain).
 */
router.get('/socket-token', authenticate, getSocketToken);

/**
 * @route   POST /api/auth/send-verification
 * @desc    Send email verification
 * @access  Private
 */
router.post('/send-verification', authenticate, handleSendVerification);

/**
 * @route   GET /api/auth/verify-email/:token
 * @desc    Verify email with token
 * @access  Public
 */
router.get('/verify-email/:token', handleVerifyEmail);

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend verification email
 * @access  Public
 */
router.post('/resend-verification', handleResendVerification);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset
 * @access  Public
 */
router.post('/forgot-password', handleForgotPassword);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', handleResetPassword);

export default router;
