/**
 * Goal-Skill Mappings
 *
 * Defines which goals fit which skill combinations.
 * This is the "goal map" from the QGen algorithm.
 */

import { GoalSkillMapping } from '../types/core';

/**
 * Goal-Skill mappings
 * Maps which question goals work with which skill combinations
 */
export const goalSkillMappings: GoalSkillMapping[] = [
  // ============================================================================
  // NÚMEROS - PORCENTAJES
  // ============================================================================
  {
    id: 1,
    goalId: 'goal-compute-percentage',
    skillCombination: ['numeros-porcentajes'],
    minSkills: 1,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 2,
    goalId: 'goal-compute-percentage',
    skillCombination: ['numeros-porcentajes', 'numeros-operaciones-basicas'],
    minSkills: 2,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 3,
    goalId: 'goal-compute-reverse-percentage',
    skillCombination: ['numeros-porcentajes', 'numeros-operaciones-basicas'],
    minSkills: 2,
    maxSkills: 3,
    createdAt: Date.now(),
  },
  {
    id: 4,
    goalId: 'goal-compute-reverse-percentage',
    skillCombination: ['numeros-porcentajes', 'numeros-decimales'],
    minSkills: 2,
    maxSkills: 3,
    createdAt: Date.now(),
  },

  // ============================================================================
  // NÚMEROS - PROPORCIONALIDAD
  // ============================================================================
  {
    id: 5,
    goalId: 'goal-compute-proportion',
    skillCombination: ['numeros-proporcionalidad'],
    minSkills: 1,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 6,
    goalId: 'goal-compute-proportion',
    skillCombination: ['numeros-proporcionalidad', 'numeros-fracciones'],
    minSkills: 2,
    maxSkills: 2,
    createdAt: Date.now(),
  },

  // ============================================================================
  // NÚMEROS - FRACCIONES Y OPERACIONES BÁSICAS
  // ============================================================================
  {
    id: 7,
    goalId: 'goal-compute-basic',
    skillCombination: ['numeros-operaciones-basicas', 'numeros-fracciones'],
    minSkills: 2,
    maxSkills: 2,
    createdAt: Date.now(),
  },

  // ============================================================================
  // ÁLGEBRA - FUNCIONES LINEALES
  // ============================================================================
  {
    id: 8,
    goalId: 'goal-compute-basic',
    skillCombination: ['algebra-funciones-lineales'],
    minSkills: 1,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 9,
    goalId: 'goal-model-function',
    skillCombination: ['algebra-funciones-lineales', 'algebra-expresiones-algebraicas'],
    minSkills: 2,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 10,
    goalId: 'goal-compare-options',
    skillCombination: ['algebra-funciones-lineales', 'algebra-sistemas-ecuaciones'],
    minSkills: 2,
    maxSkills: 3,
    createdAt: Date.now(),
  },
  {
    id: 11,
    goalId: 'goal-compare-options',
    skillCombination: ['algebra-funciones-lineales', 'algebra-inecuaciones'],
    minSkills: 2,
    maxSkills: 3,
    createdAt: Date.now(),
  },

  // ============================================================================
  // ÁLGEBRA - ECUACIONES
  // ============================================================================
  {
    id: 12,
    goalId: 'goal-model-equation',
    skillCombination: ['algebra-ecuaciones-lineales', 'algebra-expresiones-algebraicas'],
    minSkills: 2,
    maxSkills: 2,
    createdAt: Date.now(),
  },

  // ============================================================================
  // GEOMETRÍA - PERÍMETRO Y ÁREA
  // ============================================================================
  {
    id: 13,
    goalId: 'goal-compute-perimeter',
    skillCombination: ['geometria-perimetro'],
    minSkills: 1,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 14,
    goalId: 'goal-compute-perimeter',
    skillCombination: ['geometria-perimetro', 'geometria-rectangulo'],
    minSkills: 2,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 15,
    goalId: 'goal-compute-area',
    skillCombination: ['geometria-area'],
    minSkills: 1,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 16,
    goalId: 'goal-compute-area',
    skillCombination: ['geometria-area', 'geometria-rectangulo'],
    minSkills: 2,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 17,
    goalId: 'goal-compute-area',
    skillCombination: ['geometria-area', 'geometria-triangulos'],
    minSkills: 2,
    maxSkills: 2,
    createdAt: Date.now(),
  },

  // ============================================================================
  // GEOMETRÍA - TEOREMA DE PITÁGORAS
  // ============================================================================
  {
    id: 18,
    goalId: 'goal-compute-pythagorean',
    skillCombination: ['geometria-teorema-pitagoras'],
    minSkills: 1,
    maxSkills: 3,
    createdAt: Date.now(),
  },
  {
    id: 19,
    goalId: 'goal-compute-pythagorean',
    skillCombination: ['geometria-teorema-pitagoras', 'numeros-raices', 'numeros-potencias'],
    minSkills: 3,
    maxSkills: 3,
    createdAt: Date.now(),
  },

  // ============================================================================
  // PROBABILIDAD - TENDENCIA CENTRAL
  // ============================================================================
  {
    id: 20,
    goalId: 'goal-compute-basic',
    skillCombination: ['probabilidad-media'],
    minSkills: 1,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 21,
    goalId: 'goal-compute-basic',
    skillCombination: ['probabilidad-mediana'],
    minSkills: 1,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 22,
    goalId: 'goal-compute-basic',
    skillCombination: ['probabilidad-moda'],
    minSkills: 1,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 23,
    goalId: 'goal-interpret-table',
    skillCombination: ['probabilidad-tablas-frecuencia'],
    minSkills: 1,
    maxSkills: 2,
    createdAt: Date.now(),
  },
  {
    id: 24,
    goalId: 'goal-interpret-graph',
    skillCombination: ['probabilidad-graficos'],
    minSkills: 1,
    maxSkills: 2,
    createdAt: Date.now(),
  },

  // ============================================================================
  // COMBINED SKILLS - Progressive complexity
  // ============================================================================
  {
    id: 25,
    goalId: 'goal-analyze-relationship',
    skillCombination: ['numeros-proporcionalidad', 'algebra-funciones-lineales'],
    minSkills: 2,
    maxSkills: 3,
    createdAt: Date.now(),
  },
  {
    id: 26,
    goalId: 'goal-compare-values',
    skillCombination: ['numeros-operaciones-basicas', 'numeros-fracciones', 'numeros-decimales'],
    minSkills: 2,
    maxSkills: 3,
    createdAt: Date.now(),
  },
];

/**
 * Get mappings for a specific goal
 */
export function getMappingsByGoal(goalId: string): GoalSkillMapping[] {
  return goalSkillMappings.filter((mapping) => mapping.goalId === goalId);
}

/**
 * Get mappings that include all specified skills
 */
export function getMappingsBySkills(skills: string[]): GoalSkillMapping[] {
  return goalSkillMappings.filter((mapping) =>
    skills.every((skill) => mapping.skillCombination.includes(skill))
  );
}

/**
 * Get mappings that match a specific skill combination
 */
export function getMappingsBySkillCombination(skills: string[]): GoalSkillMapping[] {
  return goalSkillMappings.filter(
    (mapping) =>
      mapping.skillCombination.length === skills.length &&
      mapping.skillCombination.every((skill) => skills.includes(skill))
  );
}

/**
 * Find compatible goals for a set of skills
 */
export function getCompatibleGoals(skills: string[]): string[] {
  const compatibleMappings = goalSkillMappings.filter(
    (mapping) =>
      skills.length >= mapping.minSkills &&
      (!mapping.maxSkills || skills.length <= mapping.maxSkills) &&
      mapping.skillCombination.every((skill) => skills.includes(skill))
  );

  return [...new Set(compatibleMappings.map((m) => m.goalId))];
}

/**
 * Check if a skill combination is valid for a goal
 */
export function isValidSkillCombination(
  goalId: string,
  skills: string[]
): GoalSkillMapping | undefined {
  return goalSkillMappings.find(
    (mapping) =>
      mapping.goalId === goalId &&
      skills.length >= mapping.minSkills &&
      (!mapping.maxSkills || skills.length <= mapping.maxSkills) &&
      mapping.skillCombination.every((skill) => skills.includes(skill))
  );
}
