/**
 * ============================================================================
 * USER STORAGE SERVICE
 * ============================================================================
 *
 * Handles user data caching in localStorage with fallback to in-memory storage
 * for incognito/private browsing modes where localStorage may be unavailable.
 */

import { User } from '../types';
import { STORAGE_KEYS } from './constants';

/**
 * In-memory fallback storage for when localStorage is unavailable
 * (e.g., incognito mode, storage quota exceeded)
 */
let memoryStorage: Record<string, string> = {};

/**
 * Check if code is running in browser
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if localStorage is available and functional
 */
function isLocalStorageAvailable(): boolean {
  if (!isBrowser()) return false;

  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely get item from storage (localStorage with memory fallback)
 */
function safeGetItem(key: string): string | null {
  if (!isBrowser()) return null;

  try {
    if (isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
  } catch {
    // Fall through to memory storage
  }

  return memoryStorage[key] ?? null;
}

/**
 * Safely set item in storage (localStorage with memory fallback)
 */
function safeSetItem(key: string, value: string): void {
  if (!isBrowser()) return;

  try {
    if (isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
      return;
    }
  } catch {
    // Fall through to memory storage
  }

  memoryStorage[key] = value;
}

/**
 * Safely remove item from storage (localStorage with memory fallback)
 */
function safeRemoveItem(key: string): void {
  if (!isBrowser()) return;

  try {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  } catch {
    // Ignore errors
  }

  delete memoryStorage[key];
}

/**
 * Get cached user data from localStorage (with memory fallback)
 */
export function getCachedUser(): User | null {
  const userJson = safeGetItem(STORAGE_KEYS.CURRENT_USER);
  if (!userJson) return null;

  try {
    return JSON.parse(userJson);
  } catch {
    // Invalid JSON, clear corrupted data
    safeRemoveItem(STORAGE_KEYS.CURRENT_USER);
    return null;
  }
}

/**
 * Store user data in localStorage (with memory fallback)
 */
export function setCachedUser(user: User | null): void {
  if (user) {
    safeSetItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    safeRemoveItem(STORAGE_KEYS.CURRENT_USER);
  }
}

/**
 * Clear cached user data
 */
export function clearCachedUser(): void {
  safeRemoveItem(STORAGE_KEYS.CURRENT_USER);
}
