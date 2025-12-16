/**
 * Platform-agnostic API client factory
 * Works on both web (with cookies) and mobile (with Authorization header)
 */

import type { ApiResponse, ApiError } from '../types';
import { AUTH_ENDPOINTS } from '../constants';

/**
 * Token storage interface - implemented differently on web vs mobile
 */
export interface TokenStorage {
  getAccessToken(): Promise<string | null>;
  getRefreshToken(): Promise<string | null>;
  setTokens(accessToken: string, refreshToken: string): Promise<void>;
  clearTokens(): Promise<void>;
}

/**
 * API client configuration
 */
export interface ApiClientConfig {
  baseUrl: string;
  tokenStorage: TokenStorage;
  onAuthFailure?: () => void;
  /** Use Authorization header instead of cookies (for mobile) */
  useAuthHeader?: boolean;
  /** Custom headers to include in all requests */
  customHeaders?: Record<string, string>;
}

/**
 * Request options
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  /** Skip automatic token refresh on 401 */
  skipRefresh?: boolean;
}

/**
 * Create a platform-agnostic API client
 */
export function createApiClient(config: ApiClientConfig) {
  const { baseUrl, tokenStorage, onAuthFailure, useAuthHeader = true, customHeaders = {} } = config;

  let isRefreshing = false;
  let refreshPromise: Promise<boolean> | null = null;

  /**
   * Refresh the access token
   */
  async function refreshAccessToken(): Promise<boolean> {
    if (isRefreshing && refreshPromise) {
      return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise = (async () => {
      try {
        const refreshToken = await tokenStorage.getRefreshToken();
        if (!refreshToken) {
          return false;
        }

        const response = await fetch(`${baseUrl}${AUTH_ENDPOINTS.REFRESH}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...customHeaders,
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          await tokenStorage.clearTokens();
          return false;
        }

        const data = await response.json();
        if (data.accessToken) {
          await tokenStorage.setTokens(
            data.accessToken,
            data.refreshToken || refreshToken
          );
          return true;
        }

        return false;
      } catch (error) {
        console.error('Token refresh failed:', error);
        await tokenStorage.clearTokens();
        return false;
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  }

  /**
   * Make an authenticated request
   */
  async function request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { headers = {}, signal, skipRefresh = false } = options;

    const buildHeaders = async (): Promise<Record<string, string>> => {
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...customHeaders,
        ...headers,
      };

      if (useAuthHeader) {
        const accessToken = await tokenStorage.getAccessToken();
        if (accessToken) {
          requestHeaders['Authorization'] = `Bearer ${accessToken}`;
        }
      }

      return requestHeaders;
    };

    const makeRequest = async (): Promise<Response> => {
      const requestHeaders = await buildHeaders();
      return fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        credentials: useAuthHeader ? 'omit' : 'include',
        signal,
      });
    };

    try {
      let response = await makeRequest();

      // Handle 401 with token refresh
      if (response.status === 401 && !skipRefresh && useAuthHeader) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          response = await makeRequest();
        } else {
          onAuthFailure?.();
          return {
            error: {
              error: 'Authentication failed',
              statusCode: 401,
            },
          };
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: {
            error: errorData.error || errorData.message || 'Request failed',
            statusCode: response.status,
            details: errorData.details,
          },
        };
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return { data: undefined as T };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          error: {
            error: 'Request cancelled',
            statusCode: 0,
          },
        };
      }

      console.error('API request failed:', error);
      return {
        error: {
          error: error instanceof Error ? error.message : 'Network error',
          statusCode: 0,
        },
      };
    }
  }

  return {
    get: <T>(endpoint: string, options?: RequestOptions) =>
      request<T>('GET', endpoint, undefined, options),

    post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
      request<T>('POST', endpoint, body, options),

    put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
      request<T>('PUT', endpoint, body, options),

    patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
      request<T>('PATCH', endpoint, body, options),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
      request<T>('DELETE', endpoint, undefined, options),

    /** Manually trigger token refresh */
    refreshToken: refreshAccessToken,
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
