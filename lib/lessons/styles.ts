/**
 * Reusable color classes for mini-lesson components.
 * All colors include dark mode variants.
 */

export const colors = {
  feedback: {
    correct: 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800',
    incorrect: 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800',
  },

  option: {
    default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400',
    selected: 'bg-amber-100 dark:bg-amber-900/50 border-amber-500',
    selectedCorrect: 'bg-green-100 dark:bg-green-900/50 border-green-500',
    selectedIncorrect: 'bg-red-100 dark:bg-red-900/50 border-red-500',
    revealed: 'bg-green-50 dark:bg-green-900/30 border-green-400',
  },

  progressDot: {
    correct: 'bg-green-500 text-white',
    incorrect: 'bg-red-500 text-white',
    current: 'bg-amber-500 text-white',
    pending: 'bg-gray-200 dark:bg-gray-700 text-gray-500',
  },

  badge: {
    correct: 'bg-green-500 text-white',
    incorrect: 'bg-red-500 text-white',
  },

  gradient: {
    primary: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
    disabled: 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
  },

  result: {
    passed: 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
    failed: 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30',
  },

  hint: {
    container: 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700',
    icon: 'text-amber-500',
    text: 'text-amber-800 dark:text-amber-200',
  },

  // Step1 Hook primitives
  scenario: {
    warm: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700',
    cool: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700',
    neutral: 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 border border-gray-200 dark:border-gray-700',
  },

  questionPrompt: {
    default: 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700',
    math: 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700',
  },

  insight: {
    purple: 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700',
    green: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800',
    blue: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700',
  },
} as const;

export type ProgressDotStatus = 'correct' | 'incorrect' | 'current' | 'pending';
export type ActionButtonVariant = 'primary' | 'secondary' | 'success' | 'disabled';
