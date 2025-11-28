/**
 * Zen Mode Progress Save/Resume Utilities
 *
 * Manages saving and resuming quiz progress for Zen mode
 */

import type { Question } from './types';
import { getSavedZenQuizKey } from './constants';

export interface SavedZenQuiz {
  quizSessionId: string;
  questions: Question[];
  userAnswers: (number | null)[];
  currentQuestionIndex: number;
  startedAt: number;
  level: 'M1' | 'M2';
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad' | null;
  questionCount: number;
}

/**
 * Save current quiz progress to localStorage
 */
export function saveZenQuizProgress(
  level: 'M1' | 'M2',
  progress: SavedZenQuiz
): void {
  try {
    const key = getSavedZenQuizKey(level);
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save zen quiz progress:', error);
  }
}

/**
 * Load saved quiz progress from localStorage
 */
export function loadZenQuizProgress(
  level: 'M1' | 'M2'
): SavedZenQuiz | null {
  try {
    const key = getSavedZenQuizKey(level);
    const saved = localStorage.getItem(key);
    if (!saved) return null;

    return JSON.parse(saved) as SavedZenQuiz;
  } catch (error) {
    console.error('Failed to load zen quiz progress:', error);
    return null;
  }
}

/**
 * Clear saved quiz progress
 */
export function clearZenQuizProgress(level: 'M1' | 'M2'): void {
  try {
    const key = getSavedZenQuizKey(level);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to clear zen quiz progress:', error);
  }
}

/**
 * Check if there is saved progress for a level
 */
export function hasSavedZenQuiz(level: 'M1' | 'M2'): boolean {
  return loadZenQuizProgress(level) !== null;
}
