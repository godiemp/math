/**
 * Operations Practice Progress Management
 * Uses localStorage to track user progress (like M1/M2 practice)
 */

export interface OperationsProgress {
  currentLevel: number;
  highestLevelReached: number;
  totalOperationsSolved: number;
  lastPracticeAt?: number;
  levelStats: {
    [level: number]: {
      correctAnswers: number;
      totalAttempts: number;
      completedAt?: number;
    };
  };
}

const STORAGE_KEY = 'operations-practice-progress';

/**
 * Get user's operations practice progress from localStorage
 */
export function getOperationsProgress(): OperationsProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading operations progress:', error);
  }

  // Return default progress
  return {
    currentLevel: 1,
    highestLevelReached: 1,
    totalOperationsSolved: 0,
    levelStats: {}
  };
}

/**
 * Save user's operations practice progress to localStorage
 */
export function saveOperationsProgress(progress: OperationsProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving operations progress:', error);
  }
}

/**
 * Record a correct answer for a level
 */
export function recordCorrectAnswer(level: number): OperationsProgress {
  const progress = getOperationsProgress();

  // Update level stats
  if (!progress.levelStats[level]) {
    progress.levelStats[level] = {
      correctAnswers: 0,
      totalAttempts: 0
    };
  }

  progress.levelStats[level].correctAnswers++;
  progress.levelStats[level].totalAttempts++;
  progress.totalOperationsSolved++;
  progress.lastPracticeAt = Date.now();

  saveOperationsProgress(progress);
  return progress;
}

/**
 * Record an incorrect answer for a level
 */
export function recordIncorrectAnswer(level: number): OperationsProgress {
  const progress = getOperationsProgress();

  // Update level stats
  if (!progress.levelStats[level]) {
    progress.levelStats[level] = {
      correctAnswers: 0,
      totalAttempts: 0
    };
  }

  progress.levelStats[level].totalAttempts++;
  progress.lastPracticeAt = Date.now();

  saveOperationsProgress(progress);
  return progress;
}

/**
 * Mark a level as completed and unlock the next level
 */
export function completeLevel(level: number): OperationsProgress {
  const progress = getOperationsProgress();

  // Mark level as completed
  if (!progress.levelStats[level]) {
    progress.levelStats[level] = {
      correctAnswers: 0,
      totalAttempts: 0
    };
  }
  progress.levelStats[level].completedAt = Date.now();

  // Move to next level
  const nextLevel = level + 1;
  progress.currentLevel = nextLevel;

  // Update highest level reached
  if (nextLevel > progress.highestLevelReached) {
    progress.highestLevelReached = nextLevel;
  }

  progress.lastPracticeAt = Date.now();

  saveOperationsProgress(progress);
  return progress;
}

/**
 * Reset progress (for testing)
 */
export function resetOperationsProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Check if a level is unlocked
 */
export function isLevelUnlocked(level: number): boolean {
  const progress = getOperationsProgress();
  return level <= progress.highestLevelReached;
}

/**
 * Get stats for a specific level
 */
export function getLevelStats(level: number) {
  const progress = getOperationsProgress();
  return progress.levelStats[level] || {
    correctAnswers: 0,
    totalAttempts: 0
  };
}
