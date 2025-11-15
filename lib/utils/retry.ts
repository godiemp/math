/**
 * Utility for API calls with retry logic and exponential backoff
 */

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  onRetry?: (attempt: number, maxRetries: number) => void;
}

interface ApiResponse<T> {
  data?: T;
  error?: { error: string; status?: number };
}

/**
 * Wraps an API call with retry logic and exponential backoff
 * - Retries on server errors (5xx) and network failures
 * - Does NOT retry on client errors (4xx)
 * - Uses exponential backoff: 2s, 4s, 8s...
 */
export async function fetchWithRetry<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: RetryOptions = {}
): Promise<ApiResponse<T>> {
  const { maxRetries = 3, baseDelay = 1000, onRetry } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await apiCall();

      // Check for errors
      if (response.error) {
        const status = response.error.status || 500;

        // Don't retry on client errors (4xx)
        if (status >= 400 && status < 500) {
          return response;
        }

        // Server error (5xx) - retry if attempts remaining
        if (attempt < maxRetries) {
          onRetry?.(attempt, maxRetries);
          await delay(Math.pow(2, attempt) * baseDelay);
          continue;
        }
      }

      return response;
    } catch (err) {
      // Network error - retry if attempts remaining
      if (attempt < maxRetries) {
        onRetry?.(attempt, maxRetries);
        await delay(Math.pow(2, attempt) * baseDelay);
        continue;
      }
      throw err;
    }
  }

  // Should never reach here
  return { error: { error: 'Max retries exceeded', status: 500 } };
}

/**
 * Determines if an error is retryable
 */
export function isRetryableError(status?: number): boolean {
  if (!status) return true; // Network error - retryable
  return status >= 500; // Server errors are retryable
}

/**
 * Format error message for user display
 */
export function formatErrorMessage(error: { error: string; status?: number }): string {
  if (!error.status || error.status >= 500) {
    return `Error del servidor: ${error.error}`;
  }
  if (error.status === 401) {
    return 'Sesión expirada. Por favor vuelve a iniciar sesión.';
  }
  if (error.status === 403) {
    return 'No tienes permiso para realizar esta acción.';
  }
  if (error.status === 404) {
    return 'Recurso no encontrado.';
  }
  return error.error;
}
