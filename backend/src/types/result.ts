/**
 * Result Type Pattern
 * Provides consistent response format across all API endpoints
 */

export interface SuccessResult<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResult {
  success: false;
  error: string;      // User-facing error message
  code?: string;      // Error code for programmatic handling
  details?: unknown;  // Additional error context (development only)
}

export type Result<T> = SuccessResult<T> | ErrorResult;

/**
 * Create a success result
 * @param data - The response data
 * @param message - Optional success message
 */
export const success = <T>(data: T, message?: string): SuccessResult<T> => ({
  success: true,
  data,
  message,
});

/**
 * Create an error result
 * @param error - User-facing error message
 * @param code - Optional error code for programmatic handling
 * @param details - Additional error context (only included in development)
 */
export const error = (
  error: string,
  code?: string,
  details?: unknown
): ErrorResult => ({
  success: false,
  error,
  code,
  details: process.env.NODE_ENV === 'development' ? details : undefined,
});

/**
 * Common error codes for consistency
 */
export const ErrorCodes = {
  // Authentication & Authorization
  UNAUTHORIZED: 'UNAUTHORIZED',
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  INVALID_TOKEN: 'INVALID_TOKEN',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  MISSING_FIELDS: 'MISSING_FIELDS',
  INVALID_INPUT: 'INVALID_INPUT',

  // Resources
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',

  // Operations
  OPERATION_FAILED: 'OPERATION_FAILED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',

  // Business Logic
  INVALID_STATE: 'INVALID_STATE',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  SESSION_FULL: 'SESSION_FULL',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];
