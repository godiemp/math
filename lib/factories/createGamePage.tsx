'use client';

import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useGameProgress } from '@/lib/hooks/useGameProgress';
import LoadingSpinner from '@/components/LoadingSpinner';

export interface GamePageConfig<T extends string> {
  storageKey: string;
  levels: T[];
  MenuComponent: React.ComponentType<{
    onStart: (difficulty: T) => void;
  }>;
  GameComponent: React.ComponentType<{
    difficulty: T;
    onBack: () => void;
    onLevelComplete: () => void;
    onNextLevel: () => void;
  }>;
  theme: {
    gradientFrom: string;
    gradientVia: string;
    gradientTo: string;
    spinnerColor: string;
  };
}

export function createGamePage<T extends string>(config: GamePageConfig<T>) {
  const { storageKey, levels, MenuComponent, GameComponent, theme } = config;

  function GameContent() {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const {
      selectedDifficulty,
      handleStart,
      handleBack,
      handleLevelComplete,
      handleNextLevel,
    } = useGameProgress<T>(storageKey, levels);

    useEffect(() => {
      if (!isLoading && !user) {
        router.push('/login');
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return (
        <LoadingSpinner
          gradientFrom={theme.gradientFrom}
          gradientVia={theme.gradientVia}
          gradientTo={theme.gradientTo}
          color={theme.spinnerColor}
        />
      );
    }

    if (!user) {
      return null;
    }

    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-${theme.gradientFrom} via-${theme.gradientVia} to-${theme.gradientTo} dark:from-gray-900 dark:via-gray-900 dark:to-gray-900`}
      >
        {selectedDifficulty ? (
          <div className="min-h-screen flex items-center px-3 sm:px-4 py-6 sm:py-8">
            <GameComponent
              difficulty={selectedDifficulty}
              onBack={handleBack}
              onLevelComplete={handleLevelComplete}
              onNextLevel={handleNextLevel}
            />
          </div>
        ) : (
          <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
            <MenuComponent onStart={handleStart} />
          </div>
        )}
      </div>
    );
  }

  return function GamePage() {
    return (
      <Suspense
        fallback={
          <LoadingSpinner
            gradientFrom={theme.gradientFrom}
            gradientVia={theme.gradientVia}
            gradientTo={theme.gradientTo}
            color={theme.spinnerColor}
          />
        }
      >
        <GameContent />
      </Suspense>
    );
  };
}
