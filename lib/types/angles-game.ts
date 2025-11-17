/**
 * ============================================================================
 * ANGLES GAME TYPES
 * ============================================================================
 *
 * Types for the angles learning game.
 * Includes angle definitions, difficulty levels, and game state.
 *
 * Route association: /practice/geometry/angles
 */

import type { GeometryFigure } from '@/components/GeometryCanvas';

/**
 * Types of angle problems
 */
export type AngleProblemType =
  | 'classify_angle' // What type of angle is this?
  | 'measure_angle' // What is the measure of this angle?
  | 'compare_angles'; // Which angle is larger/smaller?

/**
 * Types of angles
 */
export type AngleType =
  | 'acute' // 0° < angle < 90°
  | 'right' // angle = 90°
  | 'obtuse' // 90° < angle < 180°
  | 'straight' // angle = 180°
  | 'reflex'; // 180° < angle < 360°

/**
 * Game difficulty levels
 */
export type AnglesGameDifficulty = 'basic' | 'intermediate' | 'advanced';

/**
 * Representation of a ray (half-line) for angle visualization
 */
export interface AngleRay {
  id: string;
  startX: number; // Starting from vertex
  startY: number;
  endX: number;
  endY: number;
  angle: number; // Angle in degrees from positive x-axis
}

/**
 * Angle information for learning
 */
export interface AngleTypeInfo {
  id: AngleType;
  nameEs: string; // Spanish name
  nameEn: string; // English name
  symbol: string; // Mathematical notation
  rangeMin: number; // Minimum degrees (exclusive for ranges)
  rangeMax: number; // Maximum degrees (exclusive for ranges)
  exactValue?: number; // For right (90°) and straight (180°) angles
  description: string;
  explanation: string; // Educational content
  realWorldExample: string; // Real-world application
  colorHint: string; // Color used for visual feedback
}

/**
 * Difficulty level configuration
 */
export interface AnglesDifficultyConfig {
  level: AnglesGameDifficulty;
  title: string;
  description: string;
  angleTypes: AngleType[];
  problemTypes: AngleProblemType[];
  problemsToComplete: number;
  showDegrees: boolean; // Whether to show degree measurements
  showProtractor: boolean; // Whether to show protractor arc
  angleVariation: number; // How much the angle can vary from typical value
}

/**
 * A single angle problem
 */
export interface AngleProblem {
  id: string;
  type: AngleProblemType;
  angleType: AngleType;
  angleDegrees: number; // Actual measurement
  vertexX: number;
  vertexY: number;
  ray1: AngleRay;
  ray2: AngleRay;
  correctAnswer: string | number;
  options: (string | number)[]; // Multiple choice options
  difficulty: AnglesGameDifficulty;
  question: string; // The question text in Spanish
  hint?: string;
  explanation?: string; // Detailed explanation for learning
  comparisonAngle?: {
    // For compare_angles problems
    angleDegrees: number;
    ray1: AngleRay;
    ray2: AngleRay;
  };
}

/**
 * Game statistics
 */
export interface AnglesGameStats {
  correctCount: number;
  attemptCount: number;
  currentStreak: number;
  bestStreak: number;
  averageTime: number;
  angleTypesMastered: AngleType[];
}

/**
 * Game session state
 */
export interface AnglesGameSession {
  sessionId: string;
  difficulty: AnglesGameDifficulty;
  startedAt: number;
  completedAt?: number;
  problems: AngleProblem[];
  answers: {
    problemId: string;
    userAnswer: string | number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  stats: AnglesGameStats;
}

/**
 * Progress tracking for angle type mastery
 */
export interface AngleTypeProgress {
  angleType: AngleType;
  timesShown: number;
  timesCorrect: number;
  lastSeen: number;
  mastery: 'not-started' | 'learning' | 'mastered';
}

/**
 * User's overall angles game progress
 */
export interface UserAnglesProgress {
  userId: string;
  totalGamesPlayed: number;
  totalProblemsAttempted: number;
  totalCorrect: number;
  currentLevel: AnglesGameDifficulty;
  angleTypeProgress: Record<AngleType, AngleTypeProgress>;
  achievements: string[];
  lastPlayedAt: number;
}
