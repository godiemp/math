/**
 * ============================================================================
 * LEGACY AUTH FILE
 * ============================================================================
 *
 * This file re-exports from the new modular auth module for backward compatibility.
 * New code should import directly from './auth' instead.
 *
 * @deprecated Use './auth' module instead
 */

// Re-export everything from the new auth module
// Note: Using './auth/index' to avoid circular reference with this file
export {
  // API functions
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
  // Utilities
  isAuthenticated,
  isAdmin,
  requireAdmin,
  // User storage
  getCachedUser,
  setCachedUser,
  clearCachedUser,
} from './auth/index';

// Legacy alias for backward compatibility
export { getCachedUser as getCurrentUser } from './auth/index';

// Re-export token functions from api-client for backward compatibility
export { getAccessToken, setTokens, clearTokens } from './api-client';
