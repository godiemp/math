/**
 * Combined lessons registry
 *
 * This file combines all subject-specific lesson arrays into a single
 * registry and provides helper functions for querying lessons.
 */

import type { Lesson } from '../types';
import { NUMEROS_LESSONS } from './numeros';
import { ALGEBRA_LESSONS } from './algebra';
import { GEOMETRIA_LESSONS } from './geometria';
import { PROBABILIDAD_LESSONS } from './probabilidad';

/**
 * All lessons registry
 */
export const ALL_LESSONS: Lesson[] = [
  ...NUMEROS_LESSONS,
  ...ALGEBRA_LESSONS,
  ...GEOMETRIA_LESSONS,
  ...PROBABILIDAD_LESSONS,
];

/**
 * Backwards compatibility alias
 * @deprecated Use ALL_LESSONS instead
 */
export const M1_LESSONS = ALL_LESSONS;

/**
 * Get lesson by slug
 */
export function getLessonBySlug(slug: string): Lesson | undefined {
  return ALL_LESSONS.find(lesson => lesson.slug === slug);
}

/**
 * Get lessons by thematic unit
 */
export function getLessonsByUnit(unitCode: string): Lesson[] {
  return ALL_LESSONS.filter(lesson => lesson.thematicUnit === unitCode);
}

/**
 * Get lessons by MINEDUC OA code
 */
export function getLessonsByOA(oaCode: string): Lesson[] {
  return ALL_LESSONS.filter(lesson => lesson.minEducOA?.includes(oaCode));
}

/**
 * Get lessons by PAES competency level (M1 or M2)
 */
export function getLessonsByLevel(level: 'M1' | 'M2'): Lesson[] {
  return ALL_LESSONS.filter(lesson => lesson.level === level);
}

/**
 * Get lessons mapped to a specific grade level via minEducOA
 * This finds lessons that have OA codes matching the grade pattern
 */
export function getLessonsByGrade(grade: '1M' | '2M' | '3M' | '4M'): Lesson[] {
  const gradePatterns: Record<string, RegExp[]> = {
    '1M': [/^MA1M-OA-\d+$/],
    '2M': [/^MA2M-OA-\d+$/],
    '3M': [/^FG-MATE-3M-OAC-\d+$/],
    '4M': [/^FG-MATE-4M-OAC-\d+$/],
  };
  const patterns = gradePatterns[grade] || [];
  return ALL_LESSONS.filter(lesson =>
    lesson.minEducOA?.some(oa => patterns.some(pattern => pattern.test(oa)))
  );
}

/**
 * Get lessons by subject
 */
export function getLessonsBySubject(subject: string): Lesson[] {
  return ALL_LESSONS.filter(lesson => lesson.subject === subject);
}

// Re-export individual lesson arrays for direct access
export { NUMEROS_LESSONS } from './numeros';
export { ALGEBRA_LESSONS } from './algebra';
export { GEOMETRIA_LESSONS } from './geometria';
export { PROBABILIDAD_LESSONS } from './probabilidad';
