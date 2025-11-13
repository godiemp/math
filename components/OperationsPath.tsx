'use client';

import { useState, useEffect } from 'react';
import { Lock, Check, PlayCircle, Trophy, Star, ChevronLeft, ChevronRight, Unlock, BookOpen } from 'lucide-react';
import { getUnitByCode } from '@/lib/thematicUnitsClient';

interface OperationLevel {
  level: number;
  title: string;
  description: string;
  operationType: string;
  difficulty: string;
  problemsToComplete: number;
  thematicUnits?: string[];
}

interface UserProgress {
  currentLevel: number;
  highestLevelReached: number;
  totalOperationsSolved: number;
  levelStats?: {
    [level: number]: {
      correctAnswers: number;
      totalAttempts: number;
      completedAt?: number;
    };
  };
}

interface OperationsPathProps {
  levels: OperationLevel[];
  userProgress: UserProgress | null;
  onLevelSelect: (level: number) => void;
  onUnlockAllLevels?: () => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  autoNavigateOnMount?: boolean;
}

const operationTypeColors: { [key: string]: string } = {
  // Phase 1: Arithmetic
  addition: 'bg-green-500',
  subtraction: 'bg-blue-500',
  multiplication: 'bg-purple-500',
  division: 'bg-orange-500',
  'mixed-arithmetic': 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500',

  // Phase 2: Algebraic
  'simple-equation': 'bg-indigo-500',
  'expression-evaluation': 'bg-violet-500',
  'simplification': 'bg-purple-600',

  // Phase 3: Logical
  'comparison': 'bg-cyan-500',
  'logical-operators': 'bg-teal-500',
  'compound-conditions': 'bg-sky-500',

  // Phase 4: Structural
  'sequences': 'bg-pink-500',
  'sets': 'bg-rose-500',
  'functions': 'bg-fuchsia-500',

  // Phase 5: Algorithmic
  'sorting': 'bg-amber-500',
  'counting': 'bg-yellow-500',
  'composition': 'bg-lime-500',
};

const operationTypeIcons: { [key: string]: string } = {
  // Phase 1: Arithmetic
  addition: '+',
  subtraction: '−',
  multiplication: '×',
  division: '÷',
  'mixed-arithmetic': '⊕',

  // Phase 2: Algebraic
  'simple-equation': 'x',
  'expression-evaluation': 'ƒ',
  'simplification': '≡',

  // Phase 3: Logical
  'comparison': '≶',
  'logical-operators': '∧',
  'compound-conditions': '⊤',

  // Phase 4: Structural
  'sequences': '…',
  'sets': '∪',
  'functions': '→',

  // Phase 5: Algorithmic
  'sorting': '↕',
  'counting': '#',
  'composition': '∘',
};

const operationTypeNames: { [key: string]: string } = {
  // Phase 1: Arithmetic
  addition: 'Suma',
  subtraction: 'Resta',
  multiplication: 'Multiplicación',
  division: 'División',
  'mixed-arithmetic': 'Aritmética Mixta',

  // Phase 2: Algebraic
  'simple-equation': 'Ecuación Simple',
  'expression-evaluation': 'Evaluación de Expresiones',
  'simplification': 'Simplificación',

  // Phase 3: Logical
  'comparison': 'Comparación',
  'logical-operators': 'Operadores Lógicos',
  'compound-conditions': 'Condiciones Compuestas',

  // Phase 4: Structural
  'sequences': 'Secuencias',
  'sets': 'Conjuntos',
  'functions': 'Funciones',

  // Phase 5: Algorithmic
  'sorting': 'Ordenamiento',
  'counting': 'Conteo',
  'composition': 'Composición',
};

const difficultyEmojis: { [key: string]: string } = {
  basic: '⭐',
  intermediate: '⭐⭐',
  advanced: '⭐⭐⭐',
  expert: '⭐⭐⭐⭐',
};

export default function OperationsPath({
  levels,
  userProgress,
  onLevelSelect,
  onUnlockAllLevels,
  currentPage,
  onPageChange,
  autoNavigateOnMount = false,
}: OperationsPathProps) {
  const LEVELS_PER_PAGE = 12;
  const highestLevel = userProgress?.highestLevelReached || 1;
  const currentLevel = userProgress?.currentLevel || 1;

  // Auto-navigate to current level on mount
  useEffect(() => {
    if (autoNavigateOnMount && userProgress) {
      goToCurrentLevel();
    }
  }, [autoNavigateOnMount, userProgress]);

  const getLevelStatus = (level: number): 'locked' | 'available' | 'current' | 'completed' => {
    // Check if level is individually completed
    const isCompleted = userProgress?.levelStats?.[level]?.completedAt !== undefined;

    if (isCompleted) return 'completed';
    if (level === currentLevel) return 'current';
    if (level > highestLevel) return 'locked';
    return 'available';
  };

  // Calculate pages
  const totalPages = Math.ceil(levels.length / LEVELS_PER_PAGE);
  const startIndex = currentPage * LEVELS_PER_PAGE;
  const endIndex = Math.min(startIndex + LEVELS_PER_PAGE, levels.length);
  const visibleLevels = levels.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const goToCurrentLevel = () => {
    const currentLevelIndex = levels.findIndex(l => l.level === currentLevel);
    if (currentLevelIndex !== -1) {
      onPageChange(Math.floor(currentLevelIndex / LEVELS_PER_PAGE));
    }
  };


  return (
    <div className="space-y-6">
      {/* Header with Navigation and Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Niveles {startIndex + 1} - {endIndex}
          </h2>
          <span className="text-sm text-gray-500">
            de {levels.length} totales
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Go to Current Level Button */}
          <button
            onClick={goToCurrentLevel}
            className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Ir a nivel actual
          </button>

          {/* Unlock All Levels Button */}
          {onUnlockAllLevels && highestLevel < levels.length && (
            <button
              onClick={onUnlockAllLevels}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Unlock size={16} />
              Desbloquear todos
            </button>
          )}
        </div>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleLevels.map((level) => {
          const status = getLevelStatus(level.level);
          const colorClass = operationTypeColors[level.operationType] || 'bg-gray-500';

          return (
            <div
              key={level.level}
              onClick={() => status !== 'locked' && onLevelSelect(level.level)}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all ${
                status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-102'
              } ${status === 'current' ? 'ring-2 ring-blue-500' : ''}`}
            >
              {/* Level Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`${colorClass} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}>
                    {level.level}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{level.title}</h3>
                    <p className="text-xs text-gray-500">{difficultyEmojis[level.difficulty]}</p>
                  </div>
                </div>
                {status === 'completed' && <Check className="text-green-500" size={24} />}
                {status === 'current' && <PlayCircle className="text-blue-500" size={24} />}
                {status === 'locked' && <Lock className="text-gray-400" size={24} />}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3">{level.description}</p>

              {/* Thematic Units */}
              {level.thematicUnits && level.thematicUnits.length > 0 && (
                <div className="mb-3 space-y-1">
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-700">
                    <BookOpen size={12} />
                    <span>Unidades temáticas:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {level.thematicUnits.map((unitCode) => {
                      const unit = getUnitByCode(unitCode);
                      return (
                        <span
                          key={unitCode}
                          className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md border border-blue-200"
                          title={unitCode}
                        >
                          {unit?.name || unitCode}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Warning for unmapped operations */}
              {(!level.thematicUnits || level.thematicUnits.length === 0) && (
                <div className="mb-3 px-2 py-1 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-xs text-amber-700">
                    ⚠️ Sin unidad temática relacionada
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{operationTypeIcons[level.operationType]} {operationTypeNames[level.operationType] || level.operationType}</span>
                <span>{level.problemsToComplete} problemas</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} />
            Anterior
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  currentPage === i
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Siguiente
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Completion Message */}
      {levels.length > 0 && currentLevel > levels.length && (
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
          <Trophy size={64} className="mx-auto text-yellow-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Felicitaciones, Gran Maestro! 🎉
          </h2>
          <p className="text-gray-600">
            Has completado todos los niveles del camino de operaciones.
            ¡Eres un verdadero maestro de las matemáticas!
          </p>
        </div>
      )}
    </div>
  );
}
