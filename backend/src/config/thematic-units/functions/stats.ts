/**
 * Statistics and summary functions for thematic units
 */

import { Level } from '../types';
import { THEMATIC_UNITS } from '../data';
import { copyCurriculum } from './copy';

/**
 * Get summary statistics
 */
export function getUnitStats() {
  const m1Units = THEMATIC_UNITS.filter(u => u.level === 'M1');
  const m2Units = THEMATIC_UNITS.filter(u => u.level === 'M2');

  const bySubject = {
    números: THEMATIC_UNITS.filter(u => u.subject === 'números'),
    álgebra: THEMATIC_UNITS.filter(u => u.subject === 'álgebra'),
    geometría: THEMATIC_UNITS.filter(u => u.subject === 'geometría'),
    probabilidad: THEMATIC_UNITS.filter(u => u.subject === 'probabilidad'),
  };

  return {
    total: THEMATIC_UNITS.length,
    m1: m1Units.length,
    m2: m2Units.length,
    bySubject: {
      números: bySubject.números.length,
      álgebra: bySubject.álgebra.length,
      geometría: bySubject.geometría.length,
      probabilidad: bySubject.probabilidad.length,
    },
  };
}

/**
 * Get a summary of the curriculum structure
 *
 * @param level - Optional: 'M1' or 'M2' to get summary for that level only
 * @returns Object with curriculum statistics including units, subsections, and skills count
 *
 * @example
 * const summary = getCurriculumSummary();
 * // Returns: { totalUnits: 41, totalSubsections: 180, totalSkills: 180, byLevel: {...}, bySubject: {...} }
 */
export function getCurriculumSummary(level?: Level) {
  const units = level ? copyCurriculum(level) : copyCurriculum();

  const totalSubsections = units.reduce((sum, unit) =>
    sum + (unit.subsections?.length || 0), 0
  );

  const totalSkills = units.reduce((sum, unit) =>
    sum + (unit.subsections?.reduce((subSum, subsection) =>
      subSum + subsection.primary_skills.length, 0) || 0), 0
  );

  const byLevel = {
    M1: units.filter(u => u.level === 'M1').length,
    M2: units.filter(u => u.level === 'M2').length,
  };

  const bySubject = {
    números: units.filter(u => u.subject === 'números').length,
    álgebra: units.filter(u => u.subject === 'álgebra').length,
    geometría: units.filter(u => u.subject === 'geometría').length,
    probabilidad: units.filter(u => u.subject === 'probabilidad').length,
  };

  return {
    totalUnits: units.length,
    totalSubsections,
    totalSkills,
    byLevel,
    bySubject,
  };
}
