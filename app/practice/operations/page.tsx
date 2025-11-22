'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import OperationsPath from '@/components/games/operations/OperationsPath';
import OperationsPractice from '@/components/games/operations/OperationsPractice';
import { OPERATIONS_PATH } from '@/lib/operationsPath';
import { getOperationsProgress, unlockAllOperationsLevels } from '@/lib/operationsProgress';

interface OperationLevel {
  level: number;
  title: string;
  description?: string;
  operationType: string;
  difficulty: string;
  problemsToComplete: number;
}

interface UserProgress {
  currentLevel: number;
  highestLevelReached: number;
  totalOperationsSolved: number;
  lastPracticeAt?: number;
  levelStats?: {
    [level: number]: {
      correctAnswers: number;
      totalAttempts: number;
      completedAt?: number;
    };
  };
}

function OperationsPracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  // Initialize page from URL params
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (!isNaN(page) && page >= 0) {
        setCurrentPage(page);
        setIsInitialLoad(false);
      }
    }
  }, [searchParams]);

  const loadProgress = () => {
    // Load progress from localStorage
    const progress = getOperationsProgress();
    setUserProgress(progress);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsInitialLoad(false);
    // Update URL with new page
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    router.push(url.pathname + url.search, { scroll: false });
  };

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
  };

  const handleBackToPath = () => {
    setSelectedLevel(null);
    loadProgress(); // Refresh progress
    // Restore page from URL params
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (!isNaN(page) && page >= 0) {
        setCurrentPage(page);
      }
    }
  };

  const handleLevelComplete = () => {
    loadProgress(); // Refresh progress when level is completed
  };

  const handleNextLevel = () => {
    if (selectedLevel !== null && selectedLevel < OPERATIONS_PATH.length) {
      setSelectedLevel(selectedLevel + 1);
      loadProgress(); // Refresh progress
    } else {
      // If it's the last level, go back to level selection
      handleBackToPath();
    }
  };

  const handleUnlockAllLevels = () => {
    unlockAllOperationsLevels(OPERATIONS_PATH.length);
    loadProgress(); // Refresh progress to show all unlocked levels
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {selectedLevel ? (
        <div className="min-h-screen flex items-center px-3 sm:px-4 py-6 sm:py-8">
          <OperationsPractice
            level={selectedLevel}
            onBack={handleBackToPath}
            onLevelComplete={handleLevelComplete}
            onNextLevel={handleNextLevel}
          />
        </div>
      ) : (
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <OperationsPath
            levels={OPERATIONS_PATH}
            userProgress={userProgress}
            onLevelSelect={handleLevelSelect}
            onUnlockAllLevels={handleUnlockAllLevels}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            autoNavigateOnMount={isInitialLoad}
          />
        </div>
      )}
    </div>
  );
}

export default function OperationsPracticePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <OperationsPracticeContent />
    </Suspense>
  );
}
