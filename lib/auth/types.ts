/**
 * ============================================================================
 * AUTHENTICATION TYPES
 * ============================================================================
 *
 * Re-exports authentication types from the centralized types location.
 * This file exists for backward compatibility and convenience.
 */

export type {
  User,
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  RefreshToken,
  AuthResponse,
  AuthResult,
} from '../types';
