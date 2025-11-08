/**
 * API Client for making authenticated requests to the backend
 */

/**
 * Automatically determine the backend API URL based on environment
 * - Production: Use NEXT_PUBLIC_API_URL from env
 * - Preview (Vercel): Use NEXT_PUBLIC_RAILWAY_URL or construct from PR
 * - Development: localhost:3001
 */
function getApiBaseUrl(): string {
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

  // Default to localhost for development
  return 'http://localhost:3001';
}

const API_BASE_URL = getApiBaseUrl();

// Log the API URL for debugging (helps troubleshoot connection issues)
if (typeof window !== 'undefined') {
  console.log('🔗 API Base URL:', API_BASE_URL);
  console.log('📦 Vercel Environment:', process.env.NEXT_PUBLIC_VERCEL_ENV);
  console.log('🌿 Git Branch:', process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF);
  console.log('🔢 PR Number:', process.env.NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID);
  console.log('🚂 Railway URL (env):', process.env.NEXT_PUBLIC_RAILWAY_URL);
  console.log('🔧 API URL (env):', process.env.NEXT_PUBLIC_API_URL);
}

// Token storage keys
const ACCESS_TOKEN_KEY = 'paes-access-token';
const REFRESH_TOKEN_KEY = 'paes-refresh-token';

/**
 * Get stored access token
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Get stored refresh token
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Store authentication tokens
 */
export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 * Clear stored tokens
 */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
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
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      return data.accessToken;
    }

    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    return null;
  }
}

export interface ApiError {
  error: string;
  statusCode: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

/**
 * Make an authenticated API request
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Add access token to headers if available
  let accessToken = getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    let response = await fetch(url, {
      ...options,
      headers,
    });

    // If unauthorized and we have a refresh token, try to refresh
    if (response.status === 401 && getRefreshToken()) {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Retry the request with the new token
        headers['Authorization'] = `Bearer ${newAccessToken}`;
        response = await fetch(url, {
          ...options,
          headers,
        });
      } else {
        // Refresh failed, user needs to login again
        return {
          error: {
            error: 'Session expired. Please login again.',
            statusCode: 401,
          },
        };
      }
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          error: data.error || 'Request failed',
          statusCode: response.status,
        },
      };
    }

    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      error: {
        error: 'Network error. Please check your connection.',
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
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
