// User types
export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: 'student' | 'admin';
  createdAt: number;
  updatedAt: number;
}

export interface UserWithPassword extends User {
  passwordHash: string;
}

// Auth request/response types
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

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshToken {
  id: number;
  userId: string;
  token: string;
  expiresAt: number;
  createdAt: number;
  revoked: boolean;
}

// Express request extension for authenticated requests
export interface AuthenticatedRequest extends Request {
  user?: User;
  userId?: string;
}
