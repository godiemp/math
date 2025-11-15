/**
 * Standard API Response Helpers
 *
 * These helpers ensure consistent response format across all API endpoints.
 * All responses follow the pattern defined in code-patterns skill.
 *
 * @see .claude/skills/code-patterns/SKILL.md - Section 1: Error Response Format
 */

/**
 * Success response structure
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Error response structure
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}

/**
 * Union type for all API responses
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Creates a standardized success response
 *
 * @param data - The response data
 * @param message - Optional success message
 * @returns Standardized success response object
 *
 * @example
 * ```typescript
 * return res.status(200).json(success(user));
 * return res.status(201).json(success(newSession, 'Session created successfully'));
 * ```
 */
export function success<T>(data: T, message?: string): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    ...(message && { message })
  };
}

/**
 * Creates a standardized error response
 *
 * @param error - User-friendly error message
 * @param message - Optional technical details (for debugging)
 * @param statusCode - Optional status code (for reference)
 * @returns Standardized error response object
 *
 * @example
 * ```typescript
 * return res.status(400).json(error('Invalid input'));
 * return res.status(500).json(error('Failed to save data', err.message));
 * ```
 */
export function error(
  error: string,
  message?: string,
  statusCode?: number
): ApiErrorResponse {
  return {
    success: false,
    error,
    ...(message && { message }),
    ...(statusCode && { statusCode })
  };
}

/**
 * Type guard to check if a response is an error
 *
 * @param response - The response to check
 * @returns True if the response is an error
 *
 * @example
 * ```typescript
 * const response = await apiCall();
 * if (isError(response)) {
 *   console.error(response.error);
 * } else {
 *   console.log(response.data);
 * }
 * ```
 */
export function isError<T>(response: ApiResponse<T>): response is ApiErrorResponse {
  return response.success === false;
}

/**
 * Type guard to check if a response is successful
 *
 * @param response - The response to check
 * @returns True if the response is successful
 */
export function isSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return response.success === true;
}

/**
 * Common error response creators with standard messages
 */
export const errorResponses = {
  /**
   * 401 Unauthorized - Missing or invalid authentication
   */
  unauthorized: (message = 'Authentication required') =>
    error(message, undefined, 401),

  /**
   * 403 Forbidden - Authenticated but not authorized
   */
  forbidden: (message = 'You do not have permission to perform this action') =>
    error(message, undefined, 403),

  /**
   * 404 Not Found - Resource doesn't exist
   */
  notFound: (resource = 'Resource') =>
    error(`${resource} not found`, undefined, 404),

  /**
   * 400 Bad Request - Invalid input
   */
  badRequest: (message: string, details?: string) =>
    error(message, details, 400),

  /**
   * 409 Conflict - Resource already exists
   */
  conflict: (resource = 'Resource', details?: string) =>
    error(`${resource} already exists`, details, 409),

  /**
   * 500 Internal Server Error - Unexpected server error
   */
  internal: (message = 'An unexpected error occurred', details?: string) =>
    error(message, details, 500),

  /**
   * 422 Unprocessable Entity - Validation failed
   */
  validation: (message: string, details?: string) =>
    error(message, details, 422)
};

/**
 * Helper to extract error message from unknown error types
 *
 * @param err - The error object (unknown type)
 * @returns Error message string
 *
 * @example
 * ```typescript
 * catch (err) {
 *   return res.status(500).json(error('Operation failed', getErrorMessage(err)));
 * }
 * ```
 */
export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === 'string') {
    return err;
  }
  return 'Unknown error';
}

/**
 * Helper to extract error stack from unknown error types
 *
 * @param err - The error object (unknown type)
 * @returns Error stack string or undefined
 */
export function getErrorStack(err: unknown): string | undefined {
  if (err instanceof Error) {
    return err.stack;
  }
  return undefined;
}
