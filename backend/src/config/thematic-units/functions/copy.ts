/**
 * Copy/clone functions for thematic units
 */

import { ThematicUnit, UnitSubsection, Level } from '../types';
import { THEMATIC_UNITS } from '../data';

/**
 * Deep copy a subsection
 */
function copySubsection(subsection: UnitSubsection): UnitSubsection {
  return {
    code: subsection.code,
    name: subsection.name,
    description: subsection.description,
    primary_skills: [...subsection.primary_skills],
  };
}

/**
 * Deep copy a thematic unit
 */
export function copyThematicUnit(unit: ThematicUnit): ThematicUnit {
  return {
    code: unit.code,
    name: unit.name,
    level: unit.level,
    subject: unit.subject,
    description: unit.description,
    subsections: unit.subsections?.map(copySubsection),
  };
}

/**
 * Copy the entire curriculum or specific level
 *
 * @param level - Optional: 'M1' or 'M2' to copy only that level. If not provided, copies both.
 * @returns Deep copy of the curriculum units
 *
 * @example
 * // Copy entire curriculum (M1 and M2)
 * const allUnits = copyCurriculum();
 *
 * // Copy only M1 curriculum
 * const m1Units = copyCurriculum('M1');
 *
 * // Copy only M2 curriculum
 * const m2Units = copyCurriculum('M2');
 */
export function copyCurriculum(level?: Level): ThematicUnit[] {
  const unitsToCopy = level
    ? THEMATIC_UNITS.filter(u => u.level === level)
    : THEMATIC_UNITS;

  return unitsToCopy.map(copyThematicUnit);
}

/**
 * Export curriculum as JSON string
 *
 * @param level - Optional: 'M1' or 'M2' to export only that level
 * @param pretty - If true, formats JSON with indentation (default: true)
 * @returns JSON string representation of the curriculum
 *
 * @example
 * // Export entire curriculum as formatted JSON
 * const json = exportCurriculumAsJSON();
 *
 * // Export only M1 as compact JSON
 * const m1Json = exportCurriculumAsJSON('M1', false);
 */
export function exportCurriculumAsJSON(level?: Level, pretty: boolean = true): string {
  const curriculum = copyCurriculum(level);
  return pretty
    ? JSON.stringify(curriculum, null, 2)
    : JSON.stringify(curriculum);
}
