/**
 * ============================================================================
 * AUTHENTICATION TYPES
 * ============================================================================
 *
 * All authentication-related types in one place
 */

import type { User } from '../types';

/**
 * ============================================================================
 * AUTH REQUESTS
 * ============================================================================
 */

/**
 * User registration request
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

/**
 * User login request
 */
export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * ============================================================================
 * AUTH ENTITIES
 * ============================================================================
 */

/**
 * Stored refresh token in database
 */
export interface RefreshToken {
  id: number;
  userId: string;
  token: string;
  expiresAt: number;
  createdAt: number;
  revoked: boolean;
}

/**
 * ============================================================================
 * AUTH RESPONSES
 * ============================================================================
 */

/**
 * Authentication response with user and tokens
 * Returned on successful login or registration
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

/**
 * Auth operation result
 */
export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}
