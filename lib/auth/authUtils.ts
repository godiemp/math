/**
 * ============================================================================
 * AUTH UTILITIES
 * ============================================================================
 *
 * Helper functions for authentication:
 * - Auth status checks
 * - Role validation
 * - User info retrieval
 */

import { User } from '../types';
import { getAccessToken } from './tokenService';
import { getCachedUser } from './userStorage';

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCachedUser() !== null && getAccessToken() !== null;
}

/**
 * Check if user is an admin
 */
export function isAdmin(): boolean {
  const user = getCachedUser();
  return user !== null && user.role === 'admin';
}

/**
 * Get current user if admin, null otherwise
 */
export function requireAdmin(): User | null {
  const user = getCachedUser();
  if (!user || user.role !== 'admin') {
    return null;
  }
  return user;
}

/**
 * Get current user's role
 */
export function getUserRole(): 'admin' | 'student' | null {
  const user = getCachedUser();
  return user?.role ?? null;
}

/**
 * Check if user has a specific role
 */
export function hasRole(role: 'admin' | 'student'): boolean {
  return getUserRole() === role;
}
