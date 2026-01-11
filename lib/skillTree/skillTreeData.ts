import type { SkillTreeNode } from './types';

export const SKILL_TREE: SkillTreeNode[] = [
  {
    id: 'contar',
    name: 'Contar',
    description: 'Contar objetos y reconocer cantidades',
    prerequisiteIds: [],
    verificationPrompt:
      '¿Puedes contar cuántos objetos hay? ¿Qué número viene después del 7?',
  },
  {
    id: 'sumar',
    name: 'Sumar',
    description: 'Combinar cantidades para obtener un total',
    prerequisiteIds: ['contar'],
    verificationPrompt:
      'Si tienes 3 manzanas y te dan 2 más, ¿cuántas tienes en total?',
  },
  {
    id: 'restar',
    name: 'Restar',
    description: 'Quitar una cantidad de otra',
    prerequisiteIds: ['sumar'],
    verificationPrompt:
      'Si tienes 5 galletas y te comes 2, ¿cuántas te quedan?',
  },
];

export function getSkillById(id: string): SkillTreeNode | undefined {
  return SKILL_TREE.find((skill) => skill.id === id);
}

export function getSkillStatus(
  skillId: string,
  verifiedSkillIds: string[]
): 'locked' | 'unlocked' | 'verified' {
  if (verifiedSkillIds.includes(skillId)) {
    return 'verified';
  }

  const skill = getSkillById(skillId);
  if (!skill) return 'locked';

  // Check if all prerequisites are verified
  const allPrereqsVerified = skill.prerequisiteIds.every((prereqId) =>
    verifiedSkillIds.includes(prereqId)
  );

  return allPrereqsVerified ? 'unlocked' : 'locked';
}
