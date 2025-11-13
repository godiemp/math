'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import OperationsPath from '@/components/OperationsPath';
import OperationsPractice from '@/components/OperationsPractice';
import { OPERATIONS_PATH } from '@/lib/operationsPath';
import { getOperationsProgress, unlockAllOperationsLevels } from '@/lib/operationsProgress';

interface OperationLevel {
  level: number;
  title: string;
  description: string;
  operationType: string;
  difficulty: string;
  problemsToComplete: number;
}

interface UserProgress {
  currentLevel: number;
  highestLevelReached: number;
  totalOperationsSolved: number;
  lastPracticeAt?: number;
}

export default function OperationsPracticePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

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

  const loadProgress = () => {
    // Load progress from localStorage
    const progress = getOperationsProgress();
    setUserProgress(progress);
  };

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
  };

  const handleBackToPath = () => {
    setSelectedLevel(null);
    loadProgress(); // Refresh progress
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Práctica de Operaciones
          </h1>
          <p className="text-gray-600 text-lg">
            Progresa desde lo más básico hasta convertirte en un maestro de las operaciones matemáticas
          </p>
        </div>

        {/* Progress Summary */}
        {userProgress && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {userProgress.currentLevel}
                </div>
                <div className="text-sm text-gray-600">Nivel Actual</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {userProgress.highestLevelReached}
                </div>
                <div className="text-sm text-gray-600">Nivel Más Alto Alcanzado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {userProgress.totalOperationsSolved}
                </div>
                <div className="text-sm text-gray-600">Operaciones Resueltas</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {selectedLevel ? (
          <OperationsPractice
            level={selectedLevel}
            onBack={handleBackToPath}
            onLevelComplete={handleLevelComplete}
            onNextLevel={handleNextLevel}
          />
        ) : (
          <OperationsPath
            levels={OPERATIONS_PATH}
            userProgress={userProgress}
            onLevelSelect={handleLevelSelect}
            onUnlockAllLevels={handleUnlockAllLevels}
          />
        )}
      </div>
    </div>
  );
}
