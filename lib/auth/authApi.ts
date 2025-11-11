/**
 * ============================================================================
 * AUTH API SERVICE
 * ============================================================================
 *
 * SECURITY UPDATE: Now uses HttpOnly cookie-based authentication
 * instead of localStorage tokens to prevent XSS attacks.
 *
 * Handles authentication API calls:
 * - User registration
 * - User login
 * - User logout
 * - Fetch current user
 */

import { User } from '../types';
import { api } from '../api-client';
import { AUTH_ENDPOINTS } from './constants';
import { setCachedUser, clearCachedUser } from './userStorage';
import { AuthResponse, AuthResult } from './types';

/**
 * Register a new user
 * SECURITY: Tokens are automatically stored as HttpOnly cookies by backend
 */
export async function registerUser(
  username: string,
  email: string,
  password: string,
  displayName: string,
  acceptedTerms: boolean
): Promise<AuthResult> {
  const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, {
    username,
    email,
    password,
    displayName,
    acceptedTerms,
  });

  if (response.error) {
    return { success: false, error: response.error.error };
  }

  if (response.data) {
    // SECURITY: Tokens are now in HttpOnly cookies (set by backend)
    // Just store user data in memory cache
    setCachedUser(response.data.user);

    return { success: true, user: response.data.user };
  }

  return { success: false, error: 'Registration failed' };
}

/**
 * Login user
 * SECURITY: Tokens are automatically stored as HttpOnly cookies by backend
 */
export async function loginUser(
  usernameOrEmail: string,
  password: string
): Promise<AuthResult> {
  const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, {
    usernameOrEmail,
    password,
  });

  if (response.error) {
    return { success: false, error: response.error.error };
  }

  if (response.data) {
    // SECURITY: Tokens are now in HttpOnly cookies (set by backend)
    // Just store user data in memory cache
    setCachedUser(response.data.user);

    return { success: true, user: response.data.user };
  }

  return { success: false, error: 'Login failed' };
}

/**
 * Logout user
 * SECURITY: Backend clears HttpOnly cookies
 */
export async function logoutUser(): Promise<void> {
  // Call backend to revoke refresh token and clear cookies
  await api.post(AUTH_ENDPOINTS.LOGOUT, {});

  // Clear cached user data
  clearCachedUser();
}

/**
 * Fetch current user from backend
 * SECURITY: Access token is sent automatically via HttpOnly cookies
 */
export async function fetchCurrentUser(): Promise<User | null> {
  const response = await api.get<User>(AUTH_ENDPOINTS.ME);

  if (response.error) {
    // Token is invalid or expired - clear cached user
    clearCachedUser();
    return null;
  }

  if (response.data) {
    setCachedUser(response.data);
    return response.data;
  }

  return null;
}

/**
 * Request password reset (send reset email)
 */
export async function requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  const response = await api.post<{ message: string }>(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
    email,
  });

  if (response.error) {
    return { success: false, error: response.error.error || 'Failed to send reset email' };
  }

  // Always return success (backend doesn't reveal if email exists)
  return { success: true };
}

/**
 * Reset password with token
 */
export async function resetPassword(
  token: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const response = await api.post<{ message: string }>(AUTH_ENDPOINTS.RESET_PASSWORD, {
    token,
    password,
  });

  if (response.error) {
    return { success: false, error: response.error.error || 'Failed to reset password' };
  }

  return { success: true };
}
