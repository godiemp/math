/**
 * ============================================================================
 * AUTH API SERVICE
 * ============================================================================
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
import { setTokens, clearTokens, getAccessToken } from './tokenService';
import { setCachedUser, clearCachedUser } from './userStorage';
import { AuthResponse, AuthResult } from './types';

/**
 * Register a new user
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
    // Store tokens and user data
    setTokens(response.data.accessToken, response.data.refreshToken);
    setCachedUser(response.data.user);

    return { success: true, user: response.data.user };
  }

  return { success: false, error: 'Registration failed' };
}

/**
 * Login user
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
    // Store tokens and user data
    setTokens(response.data.accessToken, response.data.refreshToken);
    setCachedUser(response.data.user);

    return { success: true, user: response.data.user };
  }

  return { success: false, error: 'Login failed' };
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<void> {
  const refreshToken = typeof window !== 'undefined'
    ? localStorage.getItem('paes-refresh-token')
    : null;

  if (refreshToken) {
    // Call backend to revoke refresh token
    await api.post(AUTH_ENDPOINTS.LOGOUT, { refreshToken });
  }

  // Clear all local data
  clearTokens();
  clearCachedUser();
}

/**
 * Fetch current user from backend
 */
export async function fetchCurrentUser(): Promise<User | null> {
  if (!getAccessToken()) {
    return null;
  }

  const response = await api.get<User>(AUTH_ENDPOINTS.ME);

  if (response.error) {
    // Token is invalid or expired
    clearTokens();
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
