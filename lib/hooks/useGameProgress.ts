import { useState, useEffect } from 'react';

export interface GameProgress<T extends string> {
  completedLevels: T[];
  lastPlayedAt: number;
}

export function useGameProgress<T extends string>(
  storageKey: string,
  levels: T[]
) {
  const [completedLevels, setCompletedLevels] = useState<T[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<T | null>(null);

  // Load completed levels from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const progress: GameProgress<T> = JSON.parse(saved);
          setCompletedLevels(progress.completedLevels || []);
        } catch {
          // Invalid data, ignore
        }
      }
    }
  }, [storageKey]);

  const markLevelComplete = (level: T) => {
    if (!completedLevels.includes(level)) {
      const newCompleted = [...completedLevels, level];
      setCompletedLevels(newCompleted);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        const progress: GameProgress<T> = {
          completedLevels: newCompleted,
          lastPlayedAt: Date.now(),
        };
        localStorage.setItem(storageKey, JSON.stringify(progress));
      }
    }
  };

  const handleStart = (difficulty: T) => {
    setSelectedDifficulty(difficulty);
  };

  const handleBack = () => {
    setSelectedDifficulty(null);
  };

  const handleLevelComplete = () => {
    if (selectedDifficulty) {
      markLevelComplete(selectedDifficulty);
    }
  };

  const handleNextLevel = () => {
    const currentIndex = selectedDifficulty ? levels.indexOf(selectedDifficulty) : -1;

    if (currentIndex < levels.length - 1) {
      setSelectedDifficulty(levels[currentIndex + 1]);
    } else {
      // Completed all levels, go back to menu
      setSelectedDifficulty(null);
    }
  };

  return {
    completedLevels,
    selectedDifficulty,
    handleStart,
    handleBack,
    handleLevelComplete,
    handleNextLevel,
  };
}
