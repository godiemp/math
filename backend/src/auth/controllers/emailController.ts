import { Request, Response } from 'express';
import {
  sendEmailVerification,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  resendVerificationEmail,
} from '../services/emailVerificationService';

/**
 * Send verification email
 * POST /api/auth/send-verification
 */
export async function handleSendVerification(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    await sendEmailVerification(userId);

    res.json({
      message: 'Verification email sent successfully',
    });
  } catch (error) {
    console.error('Send verification error:', error);
    const message = error instanceof Error ? error.message : 'Failed to send verification email';
    res.status(400).json({ error: message });
  }
}

/**
 * Verify email with token
 * GET /api/auth/verify-email/:token
 */
export async function handleVerifyEmail(req: Request, res: Response): Promise<void> {
  try {
    const { token } = req.params;

    if (!token) {
      res.status(400).json({ error: 'Token is required' });
      return;
    }

    await verifyEmail(token);

    res.json({
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    const message = error instanceof Error ? error.message : 'Email verification failed';
    res.status(400).json({ error: message });
  }
}

/**
 * Request password reset
 * POST /api/auth/forgot-password
 */
export async function handleForgotPassword(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    await requestPasswordReset(email);

    // Always return success to prevent email enumeration
    res.json({
      message: 'If an account exists with this email, a password reset link has been sent',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    // Still return success for security
    res.json({
      message: 'If an account exists with this email, a password reset link has been sent',
    });
  }
}

/**
 * Reset password with token
 * POST /api/auth/reset-password
 */
export async function handleResetPassword(req: Request, res: Response): Promise<void> {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      res.status(400).json({ error: 'Token and password are required' });
      return;
    }

    // Validate password length
    if (password.length < 8) {
      res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
      return;
    }

    await resetPassword(token, password);

    res.json({
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    const message = error instanceof Error ? error.message : 'Password reset failed';
    res.status(400).json({ error: message });
  }
}

/**
 * Resend verification email
 * POST /api/auth/resend-verification
 */
export async function handleResendVerification(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    await resendVerificationEmail(email);

    res.json({
      message: 'Verification email sent successfully',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    const message = error instanceof Error ? error.message : 'Failed to send verification email';
    res.status(400).json({ error: message });
  }
}
