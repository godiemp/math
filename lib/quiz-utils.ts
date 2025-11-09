/**
 * Shared utility functions for quiz components
 */

/**
 * Format time in seconds as MM:SS
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get timer color class based on percentage of time remaining
 */
export const getTimerColor = (timeRemaining: number, totalTime: number): string => {
  const percentRemaining = (timeRemaining / totalTime) * 100;
  if (percentRemaining > 50) return 'text-green-600 dark:text-green-400';
  if (percentRemaining > 25) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

/**
 * Generate a unique quiz session ID
 */
export const generateQuizSessionId = (): string => {
  return `quiz-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
