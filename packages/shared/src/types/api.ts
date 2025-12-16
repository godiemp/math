/**
 * API client types shared between web and mobile apps
 */

/**
 * Validation error details for specific fields
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Generic API error structure
 */
export interface ApiError {
  error: string;
  statusCode: number;
  details?: ValidationError[];
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
