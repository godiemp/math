/**
 * Combined lessons registry
 *
 * This file combines all subject-specific lesson arrays into a single
 * M1_LESSONS array and provides helper functions for querying lessons.
 */

import type { Lesson } from '../types';
import { NUMEROS_LESSONS } from './numeros';
import { ALGEBRA_LESSONS } from './algebra';
import { GEOMETRIA_LESSONS } from './geometria';
import { PROBABILIDAD_LESSONS } from './probabilidad';

/**
 * All lessons registry (M1 and M2)
 */
export const M1_LESSONS: Lesson[] = [
  ...NUMEROS_LESSONS,
  ...ALGEBRA_LESSONS,
  ...GEOMETRIA_LESSONS,
  ...PROBABILIDAD_LESSONS,
];

/**
 * Get lesson by slug
 */
export function getLessonBySlug(slug: string): Lesson | undefined {
  return M1_LESSONS.find(lesson => lesson.slug === slug);
}

/**
 * Get lessons by thematic unit
 */
export function getLessonsByUnit(unitCode: string): Lesson[] {
  return M1_LESSONS.filter(lesson => lesson.thematicUnit === unitCode);
}

/**
 * Get lessons by MINEDUC OA code
 */
export function getLessonsByOA(oaCode: string): Lesson[] {
  return M1_LESSONS.filter(lesson => lesson.minEducOA?.includes(oaCode));
}

/**
 * Get lessons by level
 */
export function getLessonsByLevel(level: 'M1' | 'M2'): Lesson[] {
  return M1_LESSONS.filter(lesson => lesson.level === level);
}

/**
 * Get lessons by subject
 */
export function getLessonsBySubject(subject: string): Lesson[] {
  return M1_LESSONS.filter(lesson => lesson.subject === subject);
}

// Re-export individual lesson arrays for direct access
export { NUMEROS_LESSONS } from './numeros';
export { ALGEBRA_LESSONS } from './algebra';
export { GEOMETRIA_LESSONS } from './geometria';
export { PROBABILIDAD_LESSONS } from './probabilidad';
