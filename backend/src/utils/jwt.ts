/**
 * ============================================================================
 * LEGACY JWT UTILS
 * ============================================================================
 *
 * This file re-exports from the new modular auth module for backward compatibility.
 * New code should import from '../auth' instead.
 *
 * @deprecated Use '../auth/services/tokenService' instead
 */

export * from '../auth/services/tokenService';
export type { TokenPayload } from '../auth/types';
