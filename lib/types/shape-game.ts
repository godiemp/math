/**
 * ============================================================================
 * SHAPE IDENTIFICATION GAME TYPES
 * ============================================================================
 *
 * Types for the 2D shape identification learning game.
 * Includes shape definitions, difficulty levels, and game state.
 *
 * Route association: /practice/geometry/shapes
 */

import type { GeometryFigure } from '@/components/GeometryCanvas';

/**
 * 2D shape types that can be identified in the game
 */
export type Shape2D =
  | 'circle'
  | 'square'
  | 'rectangle'
  | 'triangle'
  | 'pentagon'
  | 'hexagon'
  | 'octagon'
  | 'oval'
  | 'rhombus'
  | 'trapezoid'
  | 'parallelogram'
  | 'star';

/**
 * Shape information for display and identification
 */
export interface ShapeInfo {
  id: Shape2D;
  nameEs: string; // Spanish name
  nameEn: string; // English name for reference
  sides: number; // Number of sides (0 for circle/oval)
  description: string;
  hint: string;
}

/**
 * Game difficulty levels
 */
export type ShapeGameDifficulty = 'basic' | 'intermediate' | 'advanced';

/**
 * Difficulty level configuration
 */
export interface DifficultyConfig {
  level: ShapeGameDifficulty;
  title: string;
  description: string;
  shapes: Shape2D[];
  distractorCount: number; // Number of wrong options
  problemsToComplete: number;
  timeLimit?: number; // Optional time limit in seconds
}

/**
 * A single shape identification problem
 */
export interface ShapeProblem {
  id: string;
  figure: GeometryFigure;
  correctShape: Shape2D;
  correctAnswer: string; // Spanish name
  options: string[]; // Multiple choice options (Spanish names)
  difficulty: ShapeGameDifficulty;
  hint?: string;
}

/**
 * Game statistics
 */
export interface ShapeGameStats {
  correctCount: number;
  attemptCount: number;
  currentStreak: number;
  bestStreak: number;
  averageTime: number; // in seconds
  shapesMastered: Shape2D[];
}

/**
 * Game session state
 */
export interface ShapeGameSession {
  sessionId: string;
  difficulty: ShapeGameDifficulty;
  startedAt: number;
  completedAt?: number;
  problems: ShapeProblem[];
  answers: {
    problemId: string;
    userAnswer: string;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  stats: ShapeGameStats;
}

/**
 * Progress tracking for shape mastery
 */
export interface ShapeProgress {
  shape: Shape2D;
  timesShown: number;
  timesCorrect: number;
  lastSeen: number;
  mastery: 'not-started' | 'learning' | 'mastered';
}

/**
 * User's overall shape identification progress
 */
export interface UserShapeProgress {
  userId: string;
  totalGamesPlayed: number;
  totalProblemsAttempted: number;
  totalCorrect: number;
  currentLevel: ShapeGameDifficulty;
  shapeProgress: Record<Shape2D, ShapeProgress>;
  achievements: string[];
  lastPlayedAt: number;
}
