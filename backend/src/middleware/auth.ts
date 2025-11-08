/**
 * ============================================================================
 * LEGACY AUTH MIDDLEWARE
 * ============================================================================
 *
 * This file re-exports from the new modular auth module for backward compatibility.
 * New code should import from '../auth' instead.
 *
 * @deprecated Use '../auth' module instead
 */

export * from '../auth/middleware';

// Also export TokenPayload type for backward compatibility
export type { TokenPayload } from '../auth/types';
