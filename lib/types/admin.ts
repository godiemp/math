/**
 * ============================================================================
 * ADMIN FEATURE TYPES
 * ============================================================================
 *
 * Types for admin-only features like PDF upload, question management,
 * and backend-specific entities.
 *
 * Route association: /admin, /admin/upload, /admin/problems
 */

import type { Question, User } from './core';

/**
 * ============================================================================
 * PDF UPLOAD
 * ============================================================================
 */

/**
 * PDF upload processing status
 */
export type PDFUploadStatus = 'processing' | 'completed' | 'failed';

/**
 * PDF upload record
 * Tracks uploaded PDF files and their processing status
 */
export interface PDFUpload {
  id: number;
  filename: string;
  fileSize: number;
  uploadedBy: string;
  status: PDFUploadStatus;
  questionsExtracted: number;
  errorMessage?: string;
  uploadedAt: number;
}

/**
 * ============================================================================
 * BACKEND METADATA TYPES
 * ============================================================================
 */

/**
 * Question with backend metadata (for database storage)
 * Adds creation/update tracking fields
 */
export interface QuestionWithMetadata extends Question {
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
}

/**
 * User with backend metadata (for database storage)
 * Adds update tracking field
 */
export interface UserWithMetadata extends User {
  updatedAt: number;
}
