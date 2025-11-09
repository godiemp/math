import { Request } from 'express';

/**
 * Import shared types from frontend lib/types
 * This ensures type consistency between frontend and backend
 */
export type {
  Question,
  User,
  PDFUpload,
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  RefreshToken,
  StreakData,
  QuestionWithMetadata,
  UserWithMetadata,
} from '../../../lib/types';

/**
 * Backend-specific types
 */

// QuestionImage is backend-specific (used for PDF upload processing)
export interface QuestionImage {
  id: string;
  url: string;
  description: string;
  type: 'diagram' | 'table' | 'graph' | 'formula' | 'other';
  position?: 'question' | 'option' | 'explanation';
}

// Type alias for authenticated requests
// Note: Request.user is already typed as TokenPayload via global declaration in middleware/auth.ts
export type AuthRequest = Request;
