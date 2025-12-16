/**
 * API client instance configured for mobile
 */

import { createApiClient } from '@paes/shared';
import { secureTokenStorage } from './tokenStorage';

// API base URL - uses environment variable or defaults
const getApiBaseUrl = (): string => {
  // In development, use local backend or Railway
  if (__DEV__) {
    // For iOS simulator, localhost works
    // For Android emulator, use 10.0.2.2 instead of localhost
    return 'http://localhost:3001';
  }

  // Production backend URL
  return 'https://paes-math-backend-production.up.railway.app';
};

// Create a callback holder for navigation
let authFailureCallback: (() => void) | null = null;

export const setAuthFailureCallback = (callback: () => void) => {
  authFailureCallback = callback;
};

export const api = createApiClient({
  baseUrl: getApiBaseUrl(),
  tokenStorage: secureTokenStorage,
  useAuthHeader: true,
  customHeaders: {
    'X-Client-Type': 'mobile',
  },
  onAuthFailure: () => {
    authFailureCallback?.();
  },
});
