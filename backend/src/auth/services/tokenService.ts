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

// JWT configuration - SECURITY: Secrets are REQUIRED, no fallbacks
// Validate required secrets on module load
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('SECURITY ERROR: JWT_SECRET must be set and at least 32 characters long');
}
if (!process.env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH_SECRET.length < 32) {
  throw new Error('SECURITY ERROR: JWT_REFRESH_SECRET must be set and at least 32 characters long');
}

// After validation, these are guaranteed to be defined
const JWT_SECRET: string = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET;
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
    // Preserve original error details for better debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Token verification failed:', errorMessage);
    console.error('   JWT_SECRET configured:', JWT_SECRET ? 'Yes (length: ' + JWT_SECRET.length + ')' : 'No');
    throw new Error(`Invalid or expired access token: ${errorMessage}`);
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch (error) {
    // Preserve original error details for better debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Refresh token verification failed:', errorMessage);
    console.error('   JWT_REFRESH_SECRET configured:', JWT_REFRESH_SECRET ? 'Yes (length: ' + JWT_REFRESH_SECRET.length + ')' : 'No');
    throw new Error(`Invalid or expired refresh token: ${errorMessage}`);
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
