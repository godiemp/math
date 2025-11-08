/**
 * ============================================================================
 * API CLIENT TYPES
 * ============================================================================
 *
 * Generic types for API requests and responses.
 * Used by lib/api-client.ts and all API communication.
 *
 * Route association: Used by all API calls
 */

/**
 * Generic API error structure
 */
export interface ApiError {
  error: string;
  statusCode: number;
}

/**
 * Generic API response wrapper
 * Used to wrap all API responses with optional error handling
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
