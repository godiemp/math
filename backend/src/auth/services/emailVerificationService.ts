import { pool } from '../../config/database';
import crypto from 'crypto';
import { emailService } from '../../services/emailService';

const VERIFICATION_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const PASSWORD_RESET_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

/**
 * Generate a secure random token
 */
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Send email verification
 */
export async function sendEmailVerification(userId: string): Promise<void> {
  // Get user details
  const userResult = await pool.query(
    'SELECT username, email, email_verified FROM users WHERE id = $1',
    [userId]
  );

  if (userResult.rows.length === 0) {
    throw new Error('User not found');
  }

  const user = userResult.rows[0];

  if (user.email_verified) {
    throw new Error('Email already verified');
  }

  // Generate verification token
  const token = generateToken();
  const expiresAt = Date.now() + VERIFICATION_TOKEN_EXPIRY;

  // Store token in database
  await pool.query(
    `UPDATE users
     SET verification_token = $1,
         verification_token_expires_at = $2,
         updated_at = $3
     WHERE id = $4`,
    [token, expiresAt, Date.now(), userId]
  );

  // Send verification email
  await emailService.sendVerificationEmail(user.email, user.username, token);
}

/**
 * Verify email with token
 */
export async function verifyEmail(token: string): Promise<boolean> {
  const result = await pool.query(
    `SELECT id, email, username, verification_token_expires_at
     FROM users
     WHERE verification_token = $1`,
    [token]
  );

  if (result.rows.length === 0) {
    throw new Error('Invalid verification token');
  }

  const user = result.rows[0];

  // Check if token is expired
  if (user.verification_token_expires_at < Date.now()) {
    throw new Error('Verification token has expired');
  }

  // Update user as verified
  await pool.query(
    `UPDATE users
     SET email_verified = true,
         email_verified_at = $1,
         verification_token = NULL,
         verification_token_expires_at = NULL,
         updated_at = $2
     WHERE id = $3`,
    [Date.now(), Date.now(), user.id]
  );

  return true;
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<void> {
  // Get user by email
  const userResult = await pool.query(
    'SELECT id, username, email FROM users WHERE email = $1',
    [email.toLowerCase()]
  );

  // Don't reveal if email exists or not for security
  if (userResult.rows.length === 0) {
    // Still return success to prevent email enumeration
    return;
  }

  const user = userResult.rows[0];

  // Generate reset token
  const token = generateToken();
  const expiresAt = Date.now() + PASSWORD_RESET_TOKEN_EXPIRY;

  // Store token in database
  await pool.query(
    `UPDATE users
     SET password_reset_token = $1,
         password_reset_token_expires_at = $2,
         updated_at = $3
     WHERE id = $4`,
    [token, expiresAt, Date.now(), user.id]
  );

  // Send password reset email
  await emailService.sendPasswordResetEmail(user.email, user.username, token);
}

/**
 * Verify reset token
 */
export async function verifyResetToken(token: string): Promise<string> {
  const result = await pool.query(
    `SELECT id, password_reset_token_expires_at
     FROM users
     WHERE password_reset_token = $1`,
    [token]
  );

  if (result.rows.length === 0) {
    throw new Error('Invalid reset token');
  }

  const user = result.rows[0];

  // Check if token is expired
  if (user.password_reset_token_expires_at < Date.now()) {
    throw new Error('Reset token has expired');
  }

  return user.id;
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const bcrypt = await import('bcryptjs');

  // Verify token and get user ID
  const userId = await verifyResetToken(token);

  // Hash new password
  const passwordHash = await bcrypt.hash(newPassword, 10);

  // Update password and clear reset token
  await pool.query(
    `UPDATE users
     SET password_hash = $1,
         password_reset_token = NULL,
         password_reset_token_expires_at = NULL,
         updated_at = $2
     WHERE id = $3`,
    [passwordHash, Date.now(), userId]
  );

  // Revoke all refresh tokens for security
  await pool.query(
    'UPDATE refresh_tokens SET revoked = true WHERE user_id = $1',
    [userId]
  );
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(email: string): Promise<void> {
  // Get user by email
  const userResult = await pool.query(
    'SELECT id, username, email, email_verified FROM users WHERE email = $1',
    [email.toLowerCase()]
  );

  if (userResult.rows.length === 0) {
    throw new Error('User not found');
  }

  const user = userResult.rows[0];

  if (user.email_verified) {
    throw new Error('Email already verified');
  }

  // Send verification email
  await sendEmailVerification(user.id);
}
