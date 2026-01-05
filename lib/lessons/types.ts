/**
 * ============================================================================
 * LESSON TYPES
 * ============================================================================
 *
 * Types for the interactive lesson system.
 * Each lesson is a bespoke, step-by-step learning experience.
 */

import { Level, Subject } from '@/lib/types/core';

/**
 * Thumbnail types for lesson cards
 */
export type ThumbnailType =
  | 'triangle'
  | 'circle'
  | 'quadrilateral'
  | 'bar-chart'
  | 'pie-chart'
  | 'line-chart'
  | 'scatter-plot'
  | 'histogram'
  | 'number-line'
  | 'venn'
  | 'factor-grid'
  | 'equation'
  | 'fraction-bar'
  | 'area-model'
  | 'coordinate-plane'
  | 'custom';

/**
 * Thumbnail configuration for lesson cards
 */
export interface LessonThumbnail {
  type: ThumbnailType;
  config?: Record<string, unknown>;
  customSvg?: string;
}

/**
 * Step types in a lesson
 * - hook: Opening engagement (puzzle, question, real-world scenario)
 * - explore: Interactive discovery
 * - explain: Theory/concept explanation
 * - practice: Guided exercises
 * - verify: Checkpoint quiz to confirm learning
 */
export type LessonStepType = 'hook' | 'explore' | 'explain' | 'practice' | 'verify';

/**
 * Lesson step definition
 */
export interface LessonStep {
  id: string;
  type: LessonStepType;
  title: string;
  description?: string;
}

/**
 * Lesson definition
 */
export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: Level;
  subject: Subject;
  thematicUnit: string;
  skills: string[];
  estimatedMinutes: number;
  steps: LessonStep[];
  /** MINEDUC Learning Objectives this lesson covers (e.g., ['MA1M-OA-01']) */
  minEducOA?: string[];
  /** Thumbnail for lesson card display */
  thumbnail?: LessonThumbnail;
}

/**
 * Lesson progress tracking
 */
export interface LessonProgress {
  lessonId: string;
  currentStep: number;
  completedSteps: string[];
  startedAt: number;
  completedAt?: number;
  verifyAttempts: number;
  verifyCorrect: number;
}

/**
 * Props for individual step components
 */
export interface LessonStepProps {
  onComplete: () => void;
  onBack?: () => void;
  isActive: boolean;
}

/**
 * Verify step question
 */
export interface VerifyQuestion {
  id: string;
  question: string;
  questionLatex?: string;
  type: 'multiple-choice' | 'ordering' | 'fill-blank' | 'two-values';
  options?: string[];
  correctAnswer: number | number[] | string | string[];
  explanation: string;
}

// Re-export lessons and helper functions from the lessons module
export {
  M1_LESSONS,
  getLessonBySlug,
  getLessonsByUnit,
} from './lessons';
