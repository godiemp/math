/**
 * ============================================================================
 * TOKEN SERVICE
 * ============================================================================
 *
 * Handles all token-related operations:
 * - Token storage and retrieval
 * - Token refresh
 * - Token validation
 */

import { STORAGE_KEYS, AUTH_ENDPOINTS } from './constants';

/**
 * Check if code is running in browser
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get stored access token
 */
export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

/**
 * Get stored refresh token
 */
export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

/**
 * Store authentication tokens
 */
export function setTokens(accessToken: string, refreshToken: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
}

/**
 * Clear stored tokens
 */
export function clearTokens(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
}

/**
 * Check if user has valid tokens
 */
export function hasValidTokens(): boolean {
  return getAccessToken() !== null && getRefreshToken() !== null;
}

/**
 * Refresh the access token using the refresh token
 * This function is used internally by the API client
 *
 * @param backendUrl - The backend API URL
 * @returns New access token or null if refresh failed
 */
export async function refreshAccessToken(backendUrl: string): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${backendUrl}${AUTH_ENDPOINTS.REFRESH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      // Refresh token is invalid or expired
      clearTokens();
      return null;
    }

    const data = await response.json();

    // Update stored access token
    if (data.accessToken) {
      if (isBrowser()) {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      }
      return data.accessToken;
    }

    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    return null;
  }
}
