'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ShapeGameMenu from '@/components/ShapeGameMenu';
import ShapeIdentificationGame from '@/components/ShapeIdentificationGame';
import type { ShapeGameDifficulty } from '@/lib/types/shape-game';

function ShapeGameContent() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<ShapeGameDifficulty | null>(null);
  const [completedLevels, setCompletedLevels] = useState<ShapeGameDifficulty[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Load completed levels from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shapeGameProgress');
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

  const handleStart = (difficulty: ShapeGameDifficulty) => {
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
        localStorage.setItem('shapeGameProgress', JSON.stringify(progress));
      }
    }
  };

  const handleNextLevel = () => {
    // Determine next level
    const levels: ShapeGameDifficulty[] = ['basic', 'intermediate', 'advanced'];
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {selectedDifficulty ? (
        <div className="min-h-screen flex items-center px-3 sm:px-4 py-6 sm:py-8">
          <ShapeIdentificationGame
            difficulty={selectedDifficulty}
            onBack={handleBack}
            onLevelComplete={handleLevelComplete}
            onNextLevel={handleNextLevel}
          />
        </div>
      ) : (
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <ShapeGameMenu onStart={handleStart} />
        </div>
      )}
    </div>
  );
}

export default function ShapeIdentificationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
          </div>
        </div>
      }
    >
      <ShapeGameContent />
    </Suspense>
  );
}
