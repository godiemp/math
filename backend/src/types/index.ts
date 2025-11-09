import { Request } from 'express';

/**
 * Backend type definitions
 * Note: These are duplicated from frontend /lib/types for Docker build isolation.
 * Keep in sync with frontend types manually.
 */

export interface QuestionImage {
  id: string;
  url: string;
  description: string;
  type: 'diagram' | 'table' | 'graph' | 'formula' | 'other';
  position?: 'question' | 'option' | 'explanation';
}

export interface Question {
  id: string;
  topic: string;
  level: 'M1' | 'M2';
  question: string;
  questionLatex?: string;
  options: string[];
  optionsLatex?: string[];
  correctAnswer: number;
  explanation: string;
  explanationLatex?: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  skills: string[];
  images?: QuestionImage[];
  visualData?: {
    type: 'graph' | 'geometry' | 'table' | 'diagram';
    data: any;
  };
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: 'student' | 'admin';
  createdAt: number;
  updatedAt: number;
  currentStreak?: number;
  longestStreak?: number;
  lastPracticeDate?: string | null;
}

export interface PDFUpload {
  id: number;
  filename: string;
  fileSize: number;
  uploadedBy: string;
  status: 'processing' | 'completed' | 'failed';
  questionsExtracted: number;
  errorMessage?: string;
  uploadedAt: number;
}

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

export interface RefreshToken {
  id: number;
  userId: string;
  token: string;
  expiresAt: number;
  createdAt: number;
  revoked: boolean;
}

// Streak types
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
}

// Backend metadata types
// Question already has metadata fields, so this is just an alias
export type QuestionWithMetadata = Question;

export interface UserWithMetadata extends User {
  updatedAt: number;
}

// Type alias for authenticated requests
// Note: Request.user is already typed as TokenPayload via global declaration in middleware/auth.ts
export type AuthRequest = Request;
