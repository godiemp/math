/**
 * ============================================================================
 * AUTH MODULE
 * ============================================================================
 *
 * Centralized authentication module providing:
 * - Token management
 * - User authentication operations
 * - Auth utilities and helpers
 * - Type definitions
 */

// Constants
export { STORAGE_KEYS, TOKEN_EXPIRATION, AUTH_ENDPOINTS } from './constants';

// Types
export type {
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  RefreshToken,
  AuthResponse,
  AuthResult,
} from './types';

// Token Service
export {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  hasValidTokens,
  refreshAccessToken,
} from './tokenService';

// User Storage
export {
  getCachedUser,
  setCachedUser,
  clearCachedUser,
} from './userStorage';

// Auth API
export {
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
  requestPasswordReset,
  resetPassword,
} from './authApi';

// Auth Utilities
export {
  isAuthenticated,
  isAdmin,
  requireAdmin,
  getUserRole,
  hasRole,
} from './authUtils';
