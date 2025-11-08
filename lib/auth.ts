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
export {
  // API functions
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
  // Utilities
  isAuthenticated,
  isAdmin,
  requireAdmin,
  // User storage (legacy name compatibility)
  getCachedUser as getCurrentUser,
} from './auth';

// Re-export token functions from api-client for backward compatibility
export { getAccessToken, setTokens, clearTokens } from './api-client';
