/**
 * Complete PAES M1 and M2 thematic units taxonomy
 * Based on official PAES Competencia Matemática 1 and 2 curriculum
 *
 * This module is organized as follows:
 * - types.ts: Type definitions (UnitSubsection, ThematicUnit, SkillDefinition)
 * - data/: Unit data split by level (M1, M2) and subject
 * - functions/: Query, copy, and statistics functions
 */

// Re-export all types
export * from './types';

// Re-export the combined THEMATIC_UNITS array and individual level/subject units
export {
  THEMATIC_UNITS,
  M1_NUMEROS_UNITS,
  M1_ALGEBRA_UNITS,
  M1_GEOMETRIA_UNITS,
  M1_PROBABILIDAD_UNITS,
  M2_NUMEROS_UNITS,
  M2_ALGEBRA_UNITS,
  M2_GEOMETRIA_UNITS,
  M2_PROBABILIDAD_UNITS,
} from './data';

// Re-export query functions
export {
  getUnitsByLevelAndSubject,
  getUnitsByLevel,
  getUnitByCode,
  getSubsectionsByUnit,
  getSubsection,
  formatSubsectionName,
} from './functions/queries';

// Re-export copy functions
export {
  copyThematicUnit,
  copyCurriculum,
  exportCurriculumAsJSON,
} from './functions/copy';

// Re-export stats functions
export {
  getUnitStats,
  getCurriculumSummary,
} from './functions/stats';
