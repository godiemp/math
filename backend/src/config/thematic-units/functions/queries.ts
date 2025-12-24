/**
 * Query functions for thematic units
 */

import { ThematicUnit, UnitSubsection, Level, Subject } from '../types';
import { THEMATIC_UNITS } from '../data';

/**
 * Get units by level and subject
 */
export function getUnitsByLevelAndSubject(level: Level, subject: Subject): ThematicUnit[] {
  return THEMATIC_UNITS.filter(u => u.level === level && u.subject === subject);
}

/**
 * Get all units for a specific level
 */
export function getUnitsByLevel(level: Level): ThematicUnit[] {
  return THEMATIC_UNITS.filter(u => u.level === level);
}

/**
 * Get unit by code
 */
export function getUnitByCode(code: string): ThematicUnit | undefined {
  return THEMATIC_UNITS.find(u => u.code === code);
}

/**
 * Get subsections for a specific unit
 */
export function getSubsectionsByUnit(unitCode: string): UnitSubsection[] {
  const unit = THEMATIC_UNITS.find(u => u.code === unitCode);
  return unit?.subsections || [];
}

/**
 * Get a specific subsection by unit code and subsection code
 */
export function getSubsection(unitCode: string, subsectionCode: string): UnitSubsection | undefined {
  const unit = THEMATIC_UNITS.find(u => u.code === unitCode);
  return unit?.subsections?.find(s => s.code === subsectionCode);
}

/**
 * Format subsection for display (e.g., "A. Orden y valor absoluto")
 */
export function formatSubsectionName(subsection: UnitSubsection): string {
  return `${subsection.code}. ${subsection.name}`;
}
