/**
 * ============================================================================
 * USER STORAGE SERVICE
 * ============================================================================
 *
 * Handles user data caching in localStorage
 */

import { User } from '../types';
import { STORAGE_KEYS } from './constants';

/**
 * Check if code is running in browser
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get cached user data from localStorage
 */
export function getCachedUser(): User | null {
  if (!isBrowser()) return null;
  const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userJson ? JSON.parse(userJson) : null;
}

/**
 * Store user data in localStorage
 */
export function setCachedUser(user: User | null): void {
  if (!isBrowser()) return;
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

/**
 * Clear cached user data
 */
export function clearCachedUser(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}
