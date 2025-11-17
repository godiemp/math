'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ShapePropertiesMenu from '@/components/ShapePropertiesMenu';
import ShapePropertiesGame from '@/components/ShapePropertiesGame';
import type { PropertiesGameDifficulty } from '@/lib/types/shape-properties-game';

function ShapePropertiesContent() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<PropertiesGameDifficulty | null>(
    null
  );
  const [completedLevels, setCompletedLevels] = useState<PropertiesGameDifficulty[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Load completed levels from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shapePropertiesGameProgress');
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

  const handleStart = (difficulty: PropertiesGameDifficulty) => {
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
        localStorage.setItem('shapePropertiesGameProgress', JSON.stringify(progress));
      }
    }
  };

  const handleNextLevel = () => {
    const levels: PropertiesGameDifficulty[] = ['counting', 'identifying', 'comparing'];
    const currentIndex = selectedDifficulty ? levels.indexOf(selectedDifficulty) : -1;

    if (currentIndex < levels.length - 1) {
      setSelectedDifficulty(levels[currentIndex + 1]);
    } else {
      setSelectedDifficulty(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {selectedDifficulty ? (
        <div className="min-h-screen flex items-center px-3 sm:px-4 py-6 sm:py-8">
          <ShapePropertiesGame
            difficulty={selectedDifficulty}
            onBack={handleBack}
            onLevelComplete={handleLevelComplete}
            onNextLevel={handleNextLevel}
          />
        </div>
      ) : (
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <ShapePropertiesMenu onStart={handleStart} />
        </div>
      )}
    </div>
  );
}

export default function ShapePropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
          </div>
        </div>
      }
    >
      <ShapePropertiesContent />
    </Suspense>
  );
}
