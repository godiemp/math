/**
 * Operations Practice Path Configuration
 * Defines the progressive path from easiest to hardest operations
 * 130 levels organized in 5 phases, all mapped to PAES M1/M2 thematic units
 *
 * Phases:
 * - Arithmetic (1-30): Basic number operations
 * - Algebraic (31-70): Equations, expressions, and simplification
 * - Logical (71-90): Comparisons and compound conditions
 * - Structural (91-110): Sets, sequences, and functions
 * - Algorithmic (111-130): Sorting, counting, and transformations
 */

// Re-export types
export * from './types';
export type { OperationType, OperationLevel, OperationLevelDefinition, DifficultyLevel, PhaseType } from './types';

// Import level arrays
import { arithmeticLevels } from './levels/arithmetic';
import { algebraicLevels } from './levels/algebraic';
import { logicalLevels } from './levels/logical';
import { structuralLevels } from './levels/structural';
import { algorithmicLevels } from './levels/algorithmic';

import type { OperationLevel, PhaseType } from './types';

/**
 * The complete operations path - 120 progressive levels
 * All levels are mapped to PAES M1/M2 thematic units
 * Level numbers are automatically assigned based on array position
 */
export const OPERATIONS_PATH: OperationLevel[] = [
  ...arithmeticLevels,
  ...algebraicLevels,
  ...logicalLevels,
  ...structuralLevels,
  ...algorithmicLevels,
].map((levelDef, index) => ({
  ...levelDef,
  level: index + 1,
}));

/**
 * Get level configuration by level number
 */
export function getLevelConfig(level: number): OperationLevel | undefined {
  return OPERATIONS_PATH.find(l => l.level === level);
}

/**
 * Get the total number of levels
 */
export function getTotalLevels(): number {
  return OPERATIONS_PATH.length;
}

/**
 * Check if a level exists
 */
export function isValidLevel(level: number): boolean {
  return level >= 1 && level <= OPERATIONS_PATH.length;
}

/**
 * Get levels by phase
 */
export function getLevelsByPhase(phase: PhaseType): OperationLevel[] {
  return OPERATIONS_PATH.filter(l => l.phase === phase);
}

/**
 * Get phase info
 */
export function getPhaseInfo(phase: PhaseType): { name: string; range: string; description: string } {
  const phases = {
    arithmetic: {
      name: 'Aritmética Fundamental',
      range: 'Niveles 1-30',
      description: 'Operaciones concretas con números'
    },
    algebraic: {
      name: 'Álgebra Introductoria',
      range: 'Niveles 31-70',
      description: 'Introducción a variables y abstracción'
    },
    logical: {
      name: 'Operaciones Lógicas',
      range: 'Niveles 71-90',
      description: 'Razonamiento y condiciones'
    },
    structural: {
      name: 'Operaciones Estructurales',
      range: 'Niveles 91-110',
      description: 'Conjuntos, secuencias y funciones'
    },
    algorithmic: {
      name: 'Operaciones Algorítmicas',
      range: 'Niveles 111-130',
      description: 'Ordenamiento, conteo y transformaciones'
    }
  };
  return phases[phase];
}
