/**
 * Type definitions for PAES thematic units
 */

import { Level, Subject, CognitiveLevel, DifficultyLevel } from '../../types/abstractProblems';

export interface UnitSubsection {
  code: string; // e.g., "A", "B", "C"
  name: string; // e.g., "Orden y valor absoluto"
  description?: string;
  primary_skills: string[];
}

export interface ThematicUnit {
  code: string;
  name: string;
  level: Level;
  subject: Subject;
  description?: string;
  subsections?: UnitSubsection[];
}

export interface SkillDefinition {
  code: string;
  name: string;
  unit_code: string;
  cognitive_levels: CognitiveLevel[];
  difficulties: DifficultyLevel[];
}

// Re-export for convenience
export type { Level, Subject, CognitiveLevel, DifficultyLevel };
