/**
 * ============================================================================
 * 3D SOLIDS GAME TYPES
 * ============================================================================
 *
 * Types for the 3D solids learning game.
 * Includes solid definitions, difficulty levels, and game state.
 *
 * Route association: /practice/geometry/3d-solids
 */

/**
 * Types of 3D solid problems
 */
export type SolidsProblemType =
  | 'identify_solid' // What solid is this?
  | 'count_faces' // How many faces does this solid have?
  | 'count_edges' // How many edges does this solid have?
  | 'count_vertices'; // How many vertices does this solid have?

/**
 * Types of 3D solids
 */
export type SolidType =
  | 'sphere' // Esfera - 0 faces, 0 edges, 0 vertices (continuous surface)
  | 'cube' // Cubo - 6 faces, 12 edges, 8 vertices
  | 'rectangular_prism' // Prisma Rectangular - 6 faces, 12 edges, 8 vertices
  | 'cylinder' // Cilindro - 3 faces (2 bases + lateral), 2 edges, 0 vertices
  | 'cone' // Cono - 2 faces (base + lateral), 1 edge, 1 vertex
  | 'pyramid' // Pirámide - 5 faces, 8 edges, 5 vertices (square base)
  | 'triangular_prism'; // Prisma Triangular - 5 faces, 9 edges, 6 vertices

/**
 * Game difficulty levels
 */
export type SolidsGameDifficulty = 'basic' | 'intermediate' | 'advanced';

/**
 * 3D solid information for learning
 */
export interface SolidTypeInfo {
  id: SolidType;
  nameEs: string; // Spanish name
  nameEn: string; // English name
  faces: number; // Number of flat faces (caras)
  edges: number; // Number of edges (aristas)
  vertices: number; // Number of vertices (vértices)
  description: string;
  explanation: string; // Educational content
  realWorldExample: string; // Real-world application
  colorHint: string; // Color used for visual feedback
  eulerFormula?: string; // V - E + F = 2 (for polyhedra)
}

/**
 * Difficulty level configuration
 */
export interface SolidsDifficultyConfig {
  level: SolidsGameDifficulty;
  title: string;
  description: string;
  solidTypes: SolidType[];
  problemTypes: SolidsProblemType[];
  problemsToComplete: number;
  showLabels: boolean; // Whether to show face/edge/vertex labels
  showWireframe: boolean; // Whether to show wireframe view
}

/**
 * Isometric coordinates for 3D rendering
 */
export interface IsometricPoint {
  x: number;
  y: number;
  z: number;
}

/**
 * A single 3D solids problem
 */
export interface SolidsProblem {
  id: string;
  type: SolidsProblemType;
  solidType: SolidType;
  correctAnswer: string | number;
  options: (string | number)[]; // Multiple choice options
  difficulty: SolidsGameDifficulty;
  question: string; // The question text in Spanish
  hint?: string;
  explanation?: string; // Detailed explanation for learning
}

/**
 * Game statistics
 */
export interface SolidsGameStats {
  correctCount: number;
  attemptCount: number;
  currentStreak: number;
  bestStreak: number;
  averageTime: number;
  solidTypesMastered: SolidType[];
}

/**
 * Game session state
 */
export interface SolidsGameSession {
  sessionId: string;
  difficulty: SolidsGameDifficulty;
  startedAt: number;
  completedAt?: number;
  problems: SolidsProblem[];
  answers: {
    problemId: string;
    userAnswer: string | number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  stats: SolidsGameStats;
}

/**
 * Progress tracking for solid type mastery
 */
export interface SolidTypeProgress {
  solidType: SolidType;
  timesShown: number;
  timesCorrect: number;
  lastSeen: number;
  mastery: 'not-started' | 'learning' | 'mastered';
}

/**
 * User's overall 3D solids game progress
 */
export interface UserSolidsProgress {
  userId: string;
  totalGamesPlayed: number;
  totalProblemsAttempted: number;
  totalCorrect: number;
  currentLevel: SolidsGameDifficulty;
  solidTypeProgress: Record<SolidType, SolidTypeProgress>;
  achievements: string[];
  lastPlayedAt: number;
}
