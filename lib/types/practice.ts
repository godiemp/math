/**
 * ============================================================================
 * PRACTICE & QUIZ TYPES
 * ============================================================================
 *
 * Types for the practice/quiz features of the application.
 *
 * Route association: /practice, /practice/m1, /practice/m2
 */

import type { Question, Level, Subject, QuizMode, DifficultyLevel } from './core';

/**
 * Props for Quiz component
 * Used in solo practice mode
 */
export interface QuizProps {
  questions: Question[];
  level: Level;
  subject?: Subject;
  quizMode?: QuizMode;
  difficulty?: DifficultyLevel;
}
