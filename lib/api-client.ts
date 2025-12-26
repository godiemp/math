/**
 * API Client for making authenticated requests to the backend
 */

/**
 * Automatically determine the backend API URL based on environment
 * - Production: Use NEXT_PUBLIC_API_URL from env
 * - Preview (Vercel): Use NEXT_PUBLIC_RAILWAY_URL or construct from PR
 * - Development: localhost:3001
 *
 * This function is called at RUNTIME to ensure environment variables
 * are available, especially for PR deployments where VERCEL_GIT_PULL_REQUEST_ID
 * might not be available at build time.
 */
export function getApiBaseUrl(): string {
  // Explicit env var takes precedence
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Railway provides this in preview environments
  if (process.env.NEXT_PUBLIC_RAILWAY_URL) {
    return process.env.NEXT_PUBLIC_RAILWAY_URL;
  }

  // For Vercel preview deployments, try to construct Railway URL
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    // First, try to get PR number directly from Vercel (exposed via next.config.ts)
    let prNumber = process.env.NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID;

    // Fallback: try to extract from branch name
    if (!prNumber) {
      const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
      if (branch) {
        const prMatch = branch.match(/pr[/-]?(\d+)|#(\d+)/i);
        prNumber = prMatch?.[1] || prMatch?.[2];
      }
    }

    if (prNumber) {
      // Construct Railway PR URL for this project
      // Pattern: https://paes-math-backend-math-pr-{number}.up.railway.app
      return `https://paes-math-backend-math-pr-${prNumber}.up.railway.app`;
    }
  }

  // Development environment
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001';
  }

  // Default to production backend
  return 'https://paes-math-backend-production.up.railway.app';
}

// Cache for API base URL - fetched from server at runtime on first access
let cachedApiBaseUrl: string | null = null;
let apiUrlPromise: Promise<string> | null = null;
let hasLoggedDebugInfo = false;

/**
 * Fetch the backend URL from server-side config endpoint
 * This ensures we get the PR number at REQUEST time, not BUILD time
 */
async function fetchBackendUrl(): Promise<string> {
  try {
    const response = await fetch('/api/config');
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch backend config. Status:', response.status, 'Response:', errorText);
      throw new Error(`Failed to fetch backend config: ${response.status}`);
    }
    const data = await response.json();

    // Log debug info once
    if (typeof window !== 'undefined' && !hasLoggedDebugInfo) {
      hasLoggedDebugInfo = true;
      console.log('🔗 Backend URL (from server):', data.backendUrl);
      console.log('📦 Vercel Environment:', data.debug.vercelEnv);
      console.log('🔢 PR Number:', data.debug.prNumber);
      console.log('🌿 Git Branch:', data.debug.branchName);
    }

    return data.backendUrl;
  } catch (error) {
    console.error('❌ Failed to fetch backend URL from /api/config, using fallback:', error);
    // Fallback to client-side detection if server config fails
    const fallbackUrl = getApiBaseUrl();
    console.warn('⚠️  Using fallback backend URL:', fallbackUrl);
    return fallbackUrl;
  }
}

/**
 * Get the API base URL, fetching from server on first call
 * Returns a Promise that resolves to the backend URL
 *
 * IMPORTANT: In the browser, we use the API proxy (/api/backend) to avoid
 * Safari ITP blocking third-party cookies from the Railway backend.
 * This makes all API requests "first-party" from the browser's perspective.
 */
async function getApiUrl(): Promise<string> {
  // In browser, always use the proxy to avoid Safari ITP cookie issues
  // The proxy forwards requests to the backend while keeping cookies first-party
  if (typeof window !== 'undefined') {
    if (!hasLoggedDebugInfo) {
      hasLoggedDebugInfo = true;
      console.log('🔗 Using API proxy for Safari compatibility');
      // Still fetch config for debug info
      fetchBackendUrl().catch(() => {});
    }
    return '/api/backend';
  }

  // Server-side: fetch the actual backend URL
  if (cachedApiBaseUrl) {
    return cachedApiBaseUrl;
  }

  // Avoid multiple concurrent fetches
  if (!apiUrlPromise) {
    apiUrlPromise = fetchBackendUrl().then(url => {
      cachedApiBaseUrl = url;
      return url;
    });
  }

  return apiUrlPromise;
}

// Re-export token functions from the auth module for backward compatibility
export {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from './auth/tokenService';

import {
  refreshAccessToken as refreshToken,
} from './auth/tokenService';

import type { ApiError, ApiResponse } from './types';

// Re-export types for convenience
export type { ApiError, ApiResponse };

// Global callback for auth failures - called when token refresh fails
// This allows external code (like AuthContext) to react to auth failures
let onAuthFailureCallback: (() => void) | null = null;

/**
 * Register a callback to be notified when authentication fails permanently
 * (i.e., when token refresh fails and user needs to login again)
 */
export function setOnAuthFailure(callback: (() => void) | null): void {
  onAuthFailureCallback = callback;
}

/**
 * Refresh the access token using the refresh token
 * Internal wrapper that provides the backend URL to the token service
 */
async function refreshAccessToken(): Promise<string | null> {
  const backendUrl = await getApiUrl();
  return refreshToken(backendUrl);
}

/**
 * Make an authenticated API request
 * SECURITY: Authentication now uses HttpOnly cookies instead of Authorization header
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  let backendUrl = await getApiUrl();

  // Ensure URL has protocol (defensive fix for misconfigured env vars)
  // Skip for relative URLs (proxy) which start with '/'
  if (backendUrl && !backendUrl.startsWith('/') && !backendUrl.startsWith('http://') && !backendUrl.startsWith('https://')) {
    console.warn('⚠️  Backend URL missing protocol, adding https://', backendUrl);
    backendUrl = `https://${backendUrl}`;
  }

  const url = `${backendUrl}${endpoint}`;

  // Don't set Content-Type for FormData - browser will set it with boundary
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  // Only set Content-Type for non-FormData requests
  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  console.log('🌐 API Request:', {
    url,
    method: options.method || 'GET',
    isFormData,
    headers: Object.keys(headers),
    credentials: 'include', // Using cookies for auth
  });

  try {
    let response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // SECURITY: Send HttpOnly cookies with every request
    });

    // If unauthorized, try to refresh the token
    if (response.status === 401) {
      const refreshSuccess = await refreshAccessToken();

      if (refreshSuccess) {
        // Retry the request - new access token cookie is automatically sent
        response = await fetch(url, {
          ...options,
          headers,
          credentials: 'include',
        });
      } else {
        // Refresh failed, user needs to login again
        // Notify any registered callback about auth failure
        if (onAuthFailureCallback) {
          onAuthFailureCallback();
        }
        return {
          error: {
            error: 'Session expired. Please login again.',
            statusCode: 401,
          },
        };
      }
    }

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');

    // Handle empty responses
    if (contentLength === '0' || (!contentType?.includes('application/json') && !response.ok)) {
      if (!response.ok) {
        return {
          error: {
            error: 'Request failed with no response body',
            statusCode: response.status,
          },
        };
      }
      return { data: {} as T };
    }

    // Parse JSON response
    let data;
    try {
      const text = await response.text();
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Failed to parse response JSON:', parseError);
      if (!response.ok) {
        return {
          error: {
            error: 'Invalid response from server',
            statusCode: response.status,
          },
        };
      }
      // If response was OK but JSON parsing failed, return empty object
      return { data: {} as T };
    }

    if (!response.ok) {
      return {
        error: {
          error: data.error || data.message || 'Request failed',
          statusCode: response.status,
          details: data.details, // Pass through detailed validation errors if available
        },
      };
    }

    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    console.error('Request URL:', url);
    console.error('Backend URL:', backendUrl);

    // Provide more detailed error information
    let errorMessage = 'Network error. Please check your connection.';
    if (error instanceof TypeError && error.message.includes('fetch')) {
      errorMessage = `Unable to connect to server at ${backendUrl}. Please check if the backend is running.`;
    } else if (error instanceof Error) {
      errorMessage = `Network error: ${error.message}`;
    }

    return {
      error: {
        error: errorMessage,
        statusCode: 0,
      },
    };
  }
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
