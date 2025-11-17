'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import SymmetryGameMenu from '@/components/SymmetryGameMenu';
import SymmetryGame from '@/components/SymmetryGame';
import type { SymmetryGameDifficulty } from '@/lib/types/symmetry-game';

function SymmetryGameContent() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<SymmetryGameDifficulty | null>(
    null
  );
  const [completedLevels, setCompletedLevels] = useState<SymmetryGameDifficulty[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Load completed levels from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('symmetryGameProgress');
      if (saved) {
        try {
          const progress = JSON.parse(saved);
          setCompletedLevels(progress.completedLevels || []);
        } catch {
          // Invalid data, ignore
        }
      }
    }
  }, []);

  const handleStart = (difficulty: SymmetryGameDifficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleBack = () => {
    setSelectedDifficulty(null);
  };

  const handleLevelComplete = () => {
    if (selectedDifficulty && !completedLevels.includes(selectedDifficulty)) {
      const newCompleted = [...completedLevels, selectedDifficulty];
      setCompletedLevels(newCompleted);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        const progress = {
          completedLevels: newCompleted,
          lastPlayedAt: Date.now(),
        };
        localStorage.setItem('symmetryGameProgress', JSON.stringify(progress));
      }
    }
  };

  const handleNextLevel = () => {
    // Determine next level
    const levels: SymmetryGameDifficulty[] = ['basic', 'intermediate', 'advanced'];
    const currentIndex = selectedDifficulty ? levels.indexOf(selectedDifficulty) : -1;

    if (currentIndex < levels.length - 1) {
      setSelectedDifficulty(levels[currentIndex + 1]);
    } else {
      // Completed all levels, go back to menu
      setSelectedDifficulty(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {selectedDifficulty ? (
        <div className="min-h-screen flex items-center px-3 sm:px-4 py-6 sm:py-8">
          <SymmetryGame
            difficulty={selectedDifficulty}
            onBack={handleBack}
            onLevelComplete={handleLevelComplete}
            onNextLevel={handleNextLevel}
          />
        </div>
      ) : (
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <SymmetryGameMenu onStart={handleStart} />
        </div>
      )}
    </div>
  );
}

export default function SymmetryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
          </div>
        </div>
      }
    >
      <SymmetryGameContent />
    </Suspense>
  );
}
