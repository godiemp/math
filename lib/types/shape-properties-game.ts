/**
 * ============================================================================
 * SHAPE PROPERTIES GAME TYPES
 * ============================================================================
 *
 * Types for the sides, vertices, and edges learning game.
 * Students learn to count and identify properties of 2D and 3D shapes.
 *
 * Route association: /practice/geometry/properties
 */

import type { GeometryFigure } from '@/components/math/GeometryCanvas';
import type { Shape2D } from './shape-game';

/**
 * 3D shape types for the game
 */
export type Shape3D =
  | 'cube'
  | 'rectangular_prism'
  | 'sphere'
  | 'cylinder'
  | 'cone'
  | 'pyramid'
  | 'triangular_prism';

/**
 * Property types that can be questioned
 */
export type ShapeProperty = 'sides' | 'vertices' | 'edges' | 'faces';

/**
 * Question types for the game
 */
export type PropertyQuestionType =
  | 'count_sides' // How many sides does this shape have?
  | 'count_vertices' // How many vertices/corners?
  | 'count_edges' // How many edges? (3D)
  | 'count_faces' // How many faces? (3D)
  | 'identify_by_property' // Which shape has X sides?
  | 'compare_properties'; // Which has more sides?

/**
 * Shape property information
 */
export interface ShapePropertyInfo {
  id: Shape2D | Shape3D;
  nameEs: string;
  nameEn: string;
  sides: number; // 0 for curved shapes
  vertices: number; // corners/points
  edges?: number; // for 3D shapes
  faces?: number; // for 3D shapes
  is3D: boolean;
  description: string;
}

/**
 * Game difficulty levels
 */
export type PropertiesGameDifficulty = 'counting' | 'identifying' | 'comparing';

/**
 * Difficulty configuration
 */
export interface PropertiesDifficultyConfig {
  level: PropertiesGameDifficulty;
  title: string;
  description: string;
  shapes: (Shape2D | Shape3D)[];
  questionTypes: PropertyQuestionType[];
  include3D: boolean;
  problemsToComplete: number;
}

/**
 * A single properties question
 */
export interface PropertiesProblem {
  id: string;
  questionType: PropertyQuestionType;
  figure?: GeometryFigure; // Visual representation
  shapeName?: string; // Name of the shape being asked about
  shapeId?: Shape2D | Shape3D;
  property: ShapeProperty;
  questionText: string;
  correctAnswer: number | string;
  options: (number | string)[];
  difficulty: PropertiesGameDifficulty;
  hint?: string;
}

/**
 * Game statistics
 */
export interface PropertiesGameStats {
  correctCount: number;
  attemptCount: number;
  currentStreak: number;
  bestStreak: number;
  propertiesMastered: ShapeProperty[];
}

/**
 * Game session state
 */
export interface PropertiesGameSession {
  sessionId: string;
  difficulty: PropertiesGameDifficulty;
  startedAt: number;
  completedAt?: number;
  problems: PropertiesProblem[];
  answers: {
    problemId: string;
    userAnswer: number | string;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  stats: PropertiesGameStats;
}
