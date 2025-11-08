/**
 * ============================================================================
 * AUTH MODULE TYPES
 * ============================================================================
 */

/**
 * JWT token payload
 */
export interface TokenPayload {
  userId: string;
  username: string;
  email: string;
  role: 'student' | 'admin';
}

/**
 * Auth request types
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * User data from database
 */
export interface UserRecord {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  display_name: string;
  role: 'student' | 'admin';
  created_at: number;
  updated_at: number;
  current_streak: number;
  longest_streak: number;
  last_practice_date: string | null;
}

/**
 * User response (without password)
 */
export interface UserResponse {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: 'student' | 'admin';
  createdAt: number;
  updatedAt?: number;
  currentStreak?: number;
  longestStreak?: number;
  lastPracticeDate?: string | null;
}

/**
 * Auth response with tokens
 */
export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}
