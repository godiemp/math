/**
 * Authentication types shared between web and mobile apps
 */

import type { User } from './core';

/**
 * User registration request
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
  acceptedTerms?: boolean;
}

/**
 * User login request
 */
export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

/**
 * Authentication response with user data and tokens
 * Mobile clients receive tokens in body, web clients use HttpOnly cookies
 */
export interface AuthResponse {
  user: User;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Auth operation result
 */
export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

/**
 * Token refresh response
 */
export interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}
