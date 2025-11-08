/**
 * ============================================================================
 * SKILL TAXONOMY - AGGREGATOR
 * ============================================================================
 * Comprehensive Skill Taxonomy for PAES Math
 * Organized by topic with hierarchical skill definitions
 */

export type { Skill } from './types';
export { NUMEROS_SKILLS } from './numeros';
export { ALGEBRA_SKILLS } from './algebra';
export { GEOMETRIA_SKILLS } from './geometria';
export { PROBABILIDAD_SKILLS } from './probabilidad';

import type { Skill } from './types';
import { NUMEROS_SKILLS } from './numeros';
import { ALGEBRA_SKILLS } from './algebra';
import { GEOMETRIA_SKILLS } from './geometria';
import { PROBABILIDAD_SKILLS } from './probabilidad';

/**
 * All skills combined into a single record
 */
export const SKILLS: Record<string, Skill> = {
  ...NUMEROS_SKILLS,
  ...ALGEBRA_SKILLS,
  ...GEOMETRIA_SKILLS,
  ...PROBABILIDAD_SKILLS,
};

/**
 * Helper function to get all skills for a topic
 */
export function getSkillsByTopic(topic: 'números' | 'álgebra' | 'geometría' | 'probabilidad'): Skill[] {
  return Object.values(SKILLS).filter(skill => skill.topic === topic);
}

/**
 * Helper function to get skill by ID
 */
export function getSkillById(skillId: string): Skill | undefined {
  return SKILLS[skillId];
}

/**
 * Helper function to get all skill IDs
 */
export function getAllSkillIds(): string[] {
  return Object.keys(SKILLS);
}

/**
 * Helper function to get skill names for display
 */
export function getSkillNames(skillIds: string[]): string[] {
  return skillIds.map(id => SKILLS[id]?.name || id).filter(Boolean);
}

/**
 * Legacy export for backward compatibility
 */
export const M1_SKILLS = SKILLS;
