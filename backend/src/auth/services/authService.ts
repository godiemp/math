/**
 * ============================================================================
 * AUTH SERVICE
 * ============================================================================
 *
 * Business logic for authentication operations
 */

import bcrypt from 'bcryptjs';
import { pool } from '../../config/database';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiration,
  createTokenPayload,
} from './tokenService';
import {
  RegisterRequest,
  LoginRequest,
  UserRecord,
  AuthResponse,
  UserResponse,
  TokenPayload,
} from '../types';
import { emailService } from '../../services/emailService';
import { sendEmailVerification } from './emailVerificationService';

/**
 * Convert database user record to API response format
 */
function formatUserResponse(user: UserRecord): UserResponse {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.display_name,
    role: user.role,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    currentStreak: user.current_streak,
    longestStreak: user.longest_streak,
    lastPracticeDate: user.last_practice_date,
    emailVerified: user.email_verified,
  };
}

/**
 * Register a new user
 */
export async function registerUser(
  data: RegisterRequest
): Promise<AuthResponse> {
  const { username, email, password, displayName } = data;

  // Validation
  if (!username || !email || !password || !displayName) {
    throw new Error('All fields are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Check if user already exists
  const existingUser = await pool.query(
    'SELECT id FROM users WHERE username = $1 OR email = $2',
    [username, email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error('Username or email already exists');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Generate user ID
  const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const now = Date.now();

  // Insert user
  const result = await pool.query<UserRecord>(
    `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at, email_verified)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [userId, username, email, passwordHash, displayName, 'student', now, now, false]
  );

  const user = result.rows[0];

  // Send welcome email (non-blocking, don't wait for it)
  emailService
    .sendWelcomeEmail(user.email, user.username, user.display_name)
    .catch((error) => {
      console.error('Failed to send welcome email:', error);
    });

  // Send verification email (non-blocking, don't wait for it)
  sendEmailVerification(user.id).catch((error) => {
    console.error('Failed to send verification email:', error);
  });

  // Generate tokens
  const tokenPayload = createTokenPayload(user);
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  // Store refresh token
  await pool.query(
    'INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES ($1, $2, $3, $4)',
    [user.id, refreshToken, getRefreshTokenExpiration(), now]
  );

  return {
    user: formatUserResponse(user),
    accessToken,
    refreshToken,
  };
}

/**
 * Login user
 */
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const { usernameOrEmail, password } = data;

  if (!usernameOrEmail || !password) {
    throw new Error('Username/email and password are required');
  }

  // Find user by username or email
  const result = await pool.query<UserRecord>(
    `SELECT *
     FROM users
     WHERE username = $1 OR email = $1`,
    [usernameOrEmail]
  );

  if (result.rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = result.rows[0];

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  // Generate tokens
  const tokenPayload = createTokenPayload(user);
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  // Store refresh token
  const now = Date.now();
  await pool.query(
    'INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES ($1, $2, $3, $4)',
    [user.id, refreshToken, getRefreshTokenExpiration(), now]
  );

  return {
    user: formatUserResponse(user),
    accessToken,
    refreshToken,
  };
}

/**
 * Refresh access token
 */
export async function refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
  if (!refreshToken) {
    throw new Error('Refresh token is required');
  }

  // Verify refresh token
  const payload = verifyRefreshToken(refreshToken);

  // Check if token exists and is not revoked
  const tokenResult = await pool.query(
    'SELECT * FROM refresh_tokens WHERE token = $1 AND revoked = FALSE',
    [refreshToken]
  );

  if (tokenResult.rows.length === 0) {
    throw new Error('Invalid refresh token');
  }

  const storedToken = tokenResult.rows[0];

  // Check if token is expired
  if (storedToken.expires_at < Date.now()) {
    throw new Error('Refresh token expired');
  }

  // Generate new access token
  const newAccessToken = generateAccessToken({
    userId: payload.userId,
    username: payload.username,
    email: payload.email,
    role: payload.role,
  });

  return {
    accessToken: newAccessToken,
  };
}

/**
 * Logout user (revoke refresh token)
 */
export async function logoutUser(refreshToken: string): Promise<void> {
  if (!refreshToken) {
    throw new Error('Refresh token is required');
  }

  // Revoke the refresh token
  await pool.query(
    'UPDATE refresh_tokens SET revoked = TRUE WHERE token = $1',
    [refreshToken]
  );
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<UserResponse | null> {
  const result = await pool.query<UserRecord>(
    `SELECT *
     FROM users
     WHERE id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return formatUserResponse(result.rows[0]);
}
