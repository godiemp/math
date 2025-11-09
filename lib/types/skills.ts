/**
 * ============================================================================
 * SKILLS & PROGRESS TYPES
 * ============================================================================
 *
 * Types for skill taxonomy, skill progress tracking, and curriculum features.
 *
 * Route association: /curriculum, /progress
 */

import type { Subject, MasteryLevel, Level, QuestionAttempt } from './core';

/**
 * ============================================================================
 * SKILL TAXONOMY
 * ============================================================================
 */

/**
 * PAES mathematical competencies
 * These are the four core competencies evaluated in the PAES exam
 */
export type Competency = 'Resolver' | 'Modelar' | 'Representar' | 'Argumentar';

/**
 * Skill categories for atomic skills organization
 */
export type SkillCategory =
  | 'comprension-conceptual'      // A. Comprensión conceptual
  | 'operaciones-basicas'         // B. Operaciones básicas
  | 'comparacion-orden'           // C. Comparación y orden
  | 'propiedades-relaciones'      // D. Propiedades y relaciones
  | 'problemas-modelamiento'      // E. Problemas y modelamiento contextual
  | 'razonamiento-metacognicion'; // F. Razonamiento y metacognición

/**
 * Base skill from skill taxonomy
 */
export interface Skill {
  id: string;
  name: string;
  description: string;
  topic: Subject;
  parentSkill?: string;
  category?: SkillCategory; // Optional category for atomic skills
}

/**
 * Enhanced skill with metadata and statistics
 * Extends the base Skill with question counts, difficulty analysis, and learning paths
 */
export interface EnhancedSkill extends Skill {
  // Statistics from question analysis
  questionCount: number;
  m1QuestionCount: number;
  m2QuestionCount: number;

  // Difficulty distribution
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  averageDifficulty: number; // 1 = easy, 2 = medium, 3 = hard

  // Competencies this skill supports
  competencies: Competency[];

  // Learning metadata
  prerequisites: string[]; // Skills that should be learned first
  relatedSkills: string[]; // Skills commonly used together

  // Curriculum integration
  isCore: boolean; // Is this a fundamental skill?
  level: 'M1' | 'M2' | 'Both'; // Which level primarily uses this skill
}

/**
 * ============================================================================
 * PROGRESS TRACKING
 * ============================================================================
 */

/**
 * User's progress on a specific skill
 */
export interface SkillProgress {
  skillId: string;
  skill: EnhancedSkill;
  attemptsCount: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number; // 0-100
  lastAttempted?: number; // timestamp
  masteryLevel: MasteryLevel;
}

/**
 * Summary of user's progress across all skills
 */
export interface SkillProgressSummary {
  mastered: SkillProgress[];
  learning: SkillProgress[];
  notStarted: SkillProgress[];
  totalSkills: number;
  totalAttempts: number;
  overallAccuracy: number;
}

/**
 * ============================================================================
 * COMPONENT PROPS
 * ============================================================================
 */

/**
 * Props for SkillsDisplay component
 */
export interface SkillsDisplayProps {
  attempts: QuestionAttempt[];
  level?: Level;
  showRecommendations?: boolean;
}
