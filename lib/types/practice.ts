/**
 * ============================================================================
 * PRACTICE & QUIZ TYPES
 * ============================================================================
 *
 * Types for the practice/quiz features of the application.
 *
 * Route association: /practice, /practice/m1, /practice/m2
 */

import type { Question, Level, Subject, QuizMode, DifficultyLevel, QuestionAttempt } from './core';

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
  replayQuestions?: Question[]; // Specific questions for replaying a quiz
}

/**
 * Quiz history API response
 * Returns the user's question attempt history
 */
export interface QuizHistoryResponse {
  history: QuestionAttempt[];
  count: number;
}

/**
 * Rapid Fire mode state tracking
 * Tracks various metrics and power-ups during rapid fire quiz
 */
export interface RapidFireState {
  hintsUsed: number[];          // Array of question indices where hints were used
  pausesUsed: number;
  pausesRemaining: number;
  livesRemaining: number;       // For hard/extreme modes
  wrongAnswerCount: number;     // Track wrong answers for lives system
  currentStreak: number;        // Current consecutive correct answers
  longestStreak: number;        // Longest streak in this quiz
  timePerQuestion: number[];    // Time spent on each question
  isPaused: boolean;
  pauseTimeRemaining: number;   // Time remaining in current pause
}

/**
 * Rapid Fire scoring breakdown
 * Comprehensive scoring metrics for rapid fire mode
 */
export interface RapidFireScore {
  basePoints: number;           // Points from correct answers
  speedBonus: number;           // Bonus from completing quickly
  streakBonus: number;          // Bonus from consecutive correct answers
  perfectBonus: number;         // Bonus for perfect score
  hintPenalty: number;          // Points lost from using hints
  totalPoints: number;          // Final score
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;             // Percentage
  timeUsed: number;             // Total time used in seconds
  timeSaved: number;            // Time saved vs allocated
  passed: boolean;              // Met passing percentage for difficulty
}
