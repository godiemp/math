/**
 * ============================================================================
 * TOKEN SERVICE
 * ============================================================================
 *
 * Handles JWT token generation and verification
 */

import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenPayload } from '../types';

dotenv.config();

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key';
const JWT_EXPIRES_IN: string | number = process.env.JWT_EXPIRES_IN || '1h';
const JWT_REFRESH_EXPIRES_IN: string | number = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * Generate access token (short-lived)
 */
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as string,
  } as SignOptions);
}

/**
 * Generate refresh token (long-lived)
 */
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN as string,
  } as SignOptions);
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
}

/**
 * Get token expiration time in milliseconds
 */
export function getRefreshTokenExpiration(): number {
  // Convert '7d' to milliseconds
  const days = parseInt((JWT_REFRESH_EXPIRES_IN as string).replace('d', ''));
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

/**
 * Create token payload from user data
 */
export function createTokenPayload(user: {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'admin';
}): TokenPayload {
  return {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}
