/**
 * ============================================================================
 * SYMMETRY GAME TYPES
 * ============================================================================
 *
 * Types for the symmetry and reflections learning game.
 * Includes symmetry definitions, difficulty levels, and game state.
 *
 * Route association: /practice/geometry/symmetry
 */

import type { GeometryFigure } from '@/components/GeometryCanvas';

/**
 * Types of symmetry problems
 */
export type SymmetryProblemType =
  | 'count_lines' // How many lines of symmetry?
  | 'identify_line' // Is this a line of symmetry?
  | 'has_symmetry'; // Does this shape have line symmetry?

/**
 * Shape types that can be used in symmetry problems
 */
export type SymmetryShape =
  | 'circle'
  | 'square'
  | 'rectangle'
  | 'equilateral_triangle'
  | 'isosceles_triangle'
  | 'scalene_triangle'
  | 'regular_pentagon'
  | 'regular_hexagon'
  | 'regular_octagon'
  | 'oval'
  | 'rhombus'
  | 'trapezoid'
  | 'parallelogram'
  | 'star'
  | 'heart'
  | 'arrow'
  | 'cross';

/**
 * Representation of a line of symmetry
 */
export interface SymmetryLine {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  type: 'vertical' | 'horizontal' | 'diagonal';
  isCorrect?: boolean; // For problems where user identifies correct lines
}

/**
 * Shape information for symmetry learning
 */
export interface SymmetryShapeInfo {
  id: SymmetryShape;
  nameEs: string; // Spanish name
  nameEn: string; // English name
  linesOfSymmetry: number | 'infinite'; // Number of lines of symmetry
  hasLineSymmetry: boolean;
  description: string;
  explanation: string; // Why it has this many lines of symmetry
  etymology?: string; // Word origin hints
}

/**
 * Game difficulty levels
 */
export type SymmetryGameDifficulty = 'basic' | 'intermediate' | 'advanced';

/**
 * Difficulty level configuration
 */
export interface SymmetryDifficultyConfig {
  level: SymmetryGameDifficulty;
  title: string;
  description: string;
  shapes: SymmetryShape[];
  problemTypes: SymmetryProblemType[];
  problemsToComplete: number;
  showSymmetryLines: boolean; // Whether to show lines on the shape
}

/**
 * A single symmetry problem
 */
export interface SymmetryProblem {
  id: string;
  type: SymmetryProblemType;
  figure: GeometryFigure;
  shape: SymmetryShape;
  symmetryLines: SymmetryLine[]; // All possible symmetry lines for reference
  displayedLine?: SymmetryLine; // Line shown for 'identify_line' problems
  correctAnswer: string | number | boolean;
  options: (string | number)[]; // Multiple choice options
  difficulty: SymmetryGameDifficulty;
  question: string; // The question text in Spanish
  hint?: string;
  explanation?: string; // Detailed explanation for learning
}

/**
 * Game statistics
 */
export interface SymmetryGameStats {
  correctCount: number;
  attemptCount: number;
  currentStreak: number;
  bestStreak: number;
  averageTime: number;
  shapesMastered: SymmetryShape[];
}

/**
 * Game session state
 */
export interface SymmetryGameSession {
  sessionId: string;
  difficulty: SymmetryGameDifficulty;
  startedAt: number;
  completedAt?: number;
  problems: SymmetryProblem[];
  answers: {
    problemId: string;
    userAnswer: string | number | boolean;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  stats: SymmetryGameStats;
}

/**
 * Progress tracking for symmetry mastery
 */
export interface SymmetryProgress {
  shape: SymmetryShape;
  timesShown: number;
  timesCorrect: number;
  lastSeen: number;
  mastery: 'not-started' | 'learning' | 'mastered';
}

/**
 * User's overall symmetry game progress
 */
export interface UserSymmetryProgress {
  userId: string;
  totalGamesPlayed: number;
  totalProblemsAttempted: number;
  totalCorrect: number;
  currentLevel: SymmetryGameDifficulty;
  shapeProgress: Record<SymmetryShape, SymmetryProgress>;
  achievements: string[];
  lastPlayedAt: number;
}
