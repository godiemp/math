'use client';

import { useEffect } from 'react';
import { Lock, Check, PlayCircle, Trophy, ChevronLeft, ChevronRight, Unlock, BookOpen, Filter, X, Search, Home } from 'lucide-react';
import Link from 'next/link';
import { getUnitByCode } from '@/lib/thematicUnitsClient';
import { useOperationsFilter, useOperationsPagination } from './hooks';
import type { FilterableLevel } from './hooks';

interface OperationLevel extends FilterableLevel {
  problemsToComplete: number;
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

const operationTypeColors: Record<string, string> = {
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

const operationTypeIcons: Record<string, string> = {
  addition: '+',
  subtraction: '−',
  multiplication: '×',
  division: '÷',
  'mixed-arithmetic': '⊕',
  'simple-equation': 'x',
  'expression-evaluation': 'ƒ',
  'simplification': '≡',
  'comparison': '≶',
  'logical-operators': '∧',
  'compound-conditions': '⊤',
  'sequences': '…',
  'sets': '∪',
  'functions': '→',
  'sorting': '↕',
  'counting': '#',
  'composition': '∘',
};

const operationTypeNames: Record<string, string> = {
  addition: 'Suma',
  subtraction: 'Resta',
  multiplication: 'Multiplicación',
  division: 'División',
  'mixed-arithmetic': 'Aritmética Mixta',
  'simple-equation': 'Ecuación Simple',
  'expression-evaluation': 'Evaluación de Expresiones',
  'simplification': 'Simplificación',
  'comparison': 'Comparación',
  'logical-operators': 'Operadores Lógicos',
  'compound-conditions': 'Condiciones Compuestas',
  'sequences': 'Secuencias',
  'sets': 'Conjuntos',
  'functions': 'Funciones',
  'sorting': 'Ordenamiento',
  'counting': 'Conteo',
  'composition': 'Composición',
};

const difficultyEmojis: Record<string, string> = {
  basic: '⭐',
  intermediate: '⭐⭐',
  advanced: '⭐⭐⭐',
  expert: '⭐⭐⭐⭐',
};

const difficultyNames: Record<string, string> = {
  basic: 'Básico',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
  expert: 'Experto',
};

const phaseNames: Record<string, string> = {
  arithmetic: 'Aritmética',
  algebraic: 'Álgebra',
  logical: 'Lógica',
  structural: 'Estructural',
  algorithmic: 'Algorítmico',
};

const LEVELS_PER_PAGE = 12;

export default function OperationsPath({
  levels,
  userProgress,
  onLevelSelect,
  onUnlockAllLevels,
  currentPage,
  onPageChange,
  autoNavigateOnMount = false,
}: OperationsPathProps) {
  const highestLevel = userProgress?.highestLevelReached || 1;
  const currentLevel = userProgress?.currentLevel || 1;

  // Use filter hook
  const {
    state: filterState,
    filteredLevels,
    hasActiveFilters,
    availableFilters,
    activeFilterCount,
    actions: filterActions,
  } = useOperationsFilter(levels);

  // Use pagination hook
  const {
    totalPages,
    startIndex,
    endIndex,
    paginationItems,
    canGoNext,
    canGoPrevious,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    goToItemIndex,
  } = useOperationsPagination({
    totalItems: filteredLevels.length,
    itemsPerPage: LEVELS_PER_PAGE,
    currentPage,
    onPageChange,
  });

  const visibleLevels = filteredLevels.slice(startIndex, endIndex) as OperationLevel[];

  const getLevelStatus = (level: number): 'locked' | 'available' | 'current' | 'completed' => {
    const isCompleted = userProgress?.levelStats?.[level]?.completedAt !== undefined;
    if (isCompleted) return 'completed';
    if (level === currentLevel) return 'current';
    if (level > highestLevel) return 'locked';
    return 'available';
  };

  const goToCurrentLevel = () => {
    const targetLevels = hasActiveFilters ? filteredLevels : levels;
    const currentLevelIndex = targetLevels.findIndex(l => l.level === currentLevel);
    if (currentLevelIndex !== -1) {
      goToItemIndex(currentLevelIndex);
    }
  };

  const handleClearAllFilters = () => {
    filterActions.clearAllFilters();
    onPageChange(0);
  };

  // Reset page when filters change
  useEffect(() => {
    if (hasActiveFilters) {
      onPageChange(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState.searchQuery, filterState.phaseFilter, filterState.operationFilter, filterState.difficultyFilter]);

  // Auto-navigate to current level on mount
  useEffect(() => {
    if (autoNavigateOnMount && userProgress && !hasActiveFilters) {
      goToCurrentLevel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoNavigateOnMount, userProgress]);

  return (
    <div className="space-y-6">
      {/* Page Header with Home Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/practice"
          className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Volver</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Operaciones
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-md space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => filterActions.setSearchQuery(e.target.value)}
              placeholder="Buscar niveles (ej: tablas de multiplicar, ecuaciones, decimales...)"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => filterActions.setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            onClick={filterActions.toggleFilters}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
              filterState.showFilters || hasActiveFilters
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter size={18} />
            <span>Filtros</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-white text-blue-600 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Dropdowns */}
        {filterState.showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Fase</label>
              <select
                value={filterState.phaseFilter}
                onChange={(e) => filterActions.setPhaseFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Todas las fases</option>
                {availableFilters.phases.map(phase => (
                  <option key={phase} value={phase}>{phaseNames[phase] || phase}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tipo de operación</label>
              <select
                value={filterState.operationFilter}
                onChange={(e) => filterActions.setOperationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Todas las operaciones</option>
                {availableFilters.operations.map(op => (
                  <option key={op} value={op}>
                    {operationTypeIcons[op]} {operationTypeNames[op] || op}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Dificultad</label>
              <select
                value={filterState.difficultyFilter}
                onChange={(e) => filterActions.setDifficultyFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Todas las dificultades</option>
                {availableFilters.difficulties.map(diff => (
                  <option key={diff} value={diff}>
                    {difficultyEmojis[diff]} {difficultyNames[diff] || diff}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Active Filters Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-gray-500">Filtros activos:</span>
            {filterState.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                &quot;{filterState.searchQuery}&quot;
                <button onClick={() => filterActions.setSearchQuery('')} className="hover:text-blue-600">
                  <X size={14} />
                </button>
              </span>
            )}
            {filterState.phaseFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {phaseNames[filterState.phaseFilter]}
                <button onClick={() => filterActions.setPhaseFilter('')} className="hover:text-green-600">
                  <X size={14} />
                </button>
              </span>
            )}
            {filterState.operationFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                {operationTypeNames[filterState.operationFilter]}
                <button onClick={() => filterActions.setOperationFilter('')} className="hover:text-purple-600">
                  <X size={14} />
                </button>
              </span>
            )}
            {filterState.difficultyFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                {difficultyNames[filterState.difficultyFilter]}
                <button onClick={() => filterActions.setDifficultyFilter('')} className="hover:text-orange-600">
                  <X size={14} />
                </button>
              </span>
            )}
            <button
              onClick={handleClearAllFilters}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Limpiar todo
            </button>
          </div>
        )}
      </div>

      {/* Header with Navigation and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {hasActiveFilters ? (
              <>Mostrando {filteredLevels.length} nivel{filteredLevels.length !== 1 ? 'es' : ''}</>
            ) : (
              <>Niveles {startIndex + 1} - {endIndex}</>
            )}
          </h2>
          <span className="text-xs sm:text-sm text-gray-500">
            de {levels.length} totales
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!hasActiveFilters && (
            <button
              onClick={goToCurrentLevel}
              className="flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap"
            >
              Ir a nivel actual
            </button>
          )}
          {onUnlockAllLevels && highestLevel < levels.length && (
            <button
              onClick={onUnlockAllLevels}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors whitespace-nowrap"
            >
              <Unlock size={16} />
              <span className="hidden xs:inline">Desbloquear todos</span>
              <span className="xs:hidden">Desbloquear</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredLevels.length === 0 && hasActiveFilters && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <Search className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No se encontraron niveles
          </h3>
          <p className="text-gray-500 mb-4">
            No hay niveles que coincidan con tu búsqueda.
          </p>
          <button
            onClick={handleClearAllFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Levels Grid */}
      {visibleLevels.length > 0 && (
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

                <p className="text-sm text-gray-600 mb-3">{level.description}</p>

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

                {(!level.thematicUnits || level.thematicUnits.length === 0) && (
                  <div className="mb-3 px-2 py-1 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-xs text-amber-700">
                      ⚠️ Sin unidad temática relacionada
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{operationTypeIcons[level.operationType]} {operationTypeNames[level.operationType] || level.operationType}</span>
                  <span>{level.problemsToComplete} problemas</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
          <button
            onClick={goToPreviousPage}
            disabled={!canGoPrevious}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
            {paginationItems.map((item, index) => {
              if (item.type === 'ellipsis') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-400 text-lg">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={item.value}
                  onClick={() => goToPage(item.value!)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                    currentPage === item.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.value! + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={goToNextPage}
            disabled={!canGoNext}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span>Siguiente</span>
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
