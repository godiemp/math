/**
 * ============================================================================
 * AUTH CONSTANTS
 * ============================================================================
 *
 * Centralized constants for authentication
 */

/**
 * LocalStorage keys for authentication
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'paes-access-token',
  REFRESH_TOKEN: 'paes-refresh-token',
  CURRENT_USER: 'paes-current-user',
} as const;

/**
 * Token expiration times (in milliseconds)
 */
export const TOKEN_EXPIRATION = {
  ACCESS_TOKEN: 60 * 60 * 1000, // 1 hour
  REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

/**
 * API endpoints for authentication
 */
export const AUTH_ENDPOINTS = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  ME: '/api/auth/me',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
} as const;
