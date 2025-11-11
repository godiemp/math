/**
 * ============================================================================
 * TOKEN SERVICE
 * ============================================================================
 *
 * SECURITY UPDATE: Tokens are now stored in HttpOnly cookies (backend-managed)
 * instead of localStorage to prevent XSS attacks.
 *
 * This service now provides compatibility functions that work with cookie-based auth.
 */

import { AUTH_ENDPOINTS } from './constants';

/**
 * Check if code is running in browser
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * SECURITY: Tokens are stored in HttpOnly cookies and cannot be accessed by JavaScript.
 * This function exists for backward compatibility but always returns null.
 * Use API requests with credentials: 'include' instead.
 */
export function getAccessToken(): string | null {
  // Tokens are in HttpOnly cookies - not accessible from JavaScript
  return null;
}

/**
 * SECURITY: Tokens are stored in HttpOnly cookies and cannot be accessed by JavaScript.
 * This function exists for backward compatibility but always returns null.
 */
export function getRefreshToken(): string | null {
  // Tokens are in HttpOnly cookies - not accessible from JavaScript
  return null;
}

/**
 * SECURITY: Tokens are automatically set as HttpOnly cookies by the backend.
 * This function exists for backward compatibility but does nothing.
 */
export function setTokens(accessToken: string, refreshToken: string): void {
  // Tokens are managed as HttpOnly cookies by the backend
  // No action needed on frontend
  console.log('Tokens are now stored in HttpOnly cookies (managed by backend)');
}

/**
 * SECURITY: Tokens are automatically cleared by calling the logout endpoint.
 * This function exists for backward compatibility but does nothing.
 */
export function clearTokens(): void {
  // Tokens are cleared by the backend logout endpoint
  // No action needed on frontend
  console.log('Tokens will be cleared by backend logout endpoint');
}

/**
 * Check if user appears to be authenticated
 * SECURITY: Since we can't access HttpOnly cookies, we rely on API responses
 */
export function hasValidTokens(): boolean {
  // We can't check HttpOnly cookies from JavaScript
  // Authentication status should be determined by API responses
  return false; // Frontend should check auth status via /api/auth/me endpoint
}

/**
 * Refresh the access token using the refresh token
 * SECURITY: Tokens are now in HttpOnly cookies, automatically sent by browser
 *
 * @param backendUrl - The backend API URL
 * @returns True if refresh succeeded, false otherwise
 */
export async function refreshAccessToken(backendUrl: string): Promise<string | null> {
  try {
    const response = await fetch(`${backendUrl}${AUTH_ENDPOINTS.REFRESH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // SECURITY: Send HttpOnly cookies
    });

    if (!response.ok) {
      // Refresh token is invalid or expired
      return null;
    }

    // Backend sets new access token as HttpOnly cookie
    // Return a dummy value to indicate success
    return 'cookie-based-auth';
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}
