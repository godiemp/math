/**
 * ============================================================================
 * SKILL TYPE DEFINITIONS
 * ============================================================================
 */

export interface Skill {
  id: string;
  name: string;
  description: string;
  topic: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  parentSkill?: string; // For hierarchical relationships
}
