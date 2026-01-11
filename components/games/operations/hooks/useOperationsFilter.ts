'use client';

import { useState, useMemo, useCallback } from 'react';
import { getUnitByCode } from '@/lib/thematicUnitsClient';

export interface OperationLevelConfig {
  specificTables?: number[];
  minValue?: number;
  maxValue?: number;
  allowNegatives?: boolean;
  forceNegative?: boolean;
  allowDecimals?: boolean;
  numberOfOperands?: number;
  mixedOperations?: string[];
  equationType?: string;
  expressionType?: string;
  simplificationType?: string;
  sequenceType?: string;
  functionType?: string;
  sortingType?: string;
  countingType?: string;
  compositionType?: string;
  [key: string]: unknown;
}

export interface FilterableLevel {
  level: number;
  title: string;
  description?: string;
  operationType: string;
  phase: string;
  difficulty: string;
  thematicUnits?: string[];
  config?: OperationLevelConfig;
}

export interface AvailableFilters {
  phases: string[];
  operations: string[];
}

export interface OperationsFilterState {
  searchQuery: string;
  phaseFilter: string;
  operationFilter: string;
}

export interface OperationsFilterActions {
  setSearchQuery: (query: string) => void;
  setPhaseFilter: (phase: string) => void;
  setOperationFilter: (operation: string) => void;
  clearAllFilters: () => void;
}

export interface UseOperationsFilterResult {
  // State
  state: OperationsFilterState;
  // Derived
  filteredLevels: FilterableLevel[];
  hasActiveFilters: boolean;
  availableFilters: AvailableFilters;
  activeFilterCount: number;
  // Actions
  actions: OperationsFilterActions;
}

// Name mappings for search
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

const phaseNames: Record<string, string> = {
  arithmetic: 'Aritmética',
  algebraic: 'Álgebra',
  logical: 'Lógica',
  structural: 'Estructural',
  algorithmic: 'Algorítmico',
};

// Phase to operations mapping - each operation type belongs exclusively to one phase
const phaseOperations: Record<string, string[]> = {
  arithmetic: ['addition', 'subtraction', 'multiplication', 'division', 'mixed-arithmetic'],
  algebraic: ['simple-equation', 'expression-evaluation', 'simplification'],
  logical: ['comparison', 'logical-operators', 'compound-conditions'],
  structural: ['sets', 'sequences', 'functions'],
  algorithmic: ['sorting', 'counting', 'composition'],
};

/**
 * Generate searchable keywords from level config
 */
function getLevelKeywords(level: FilterableLevel): string[] {
  const keywords: string[] = [];

  // Add basic info
  keywords.push(level.title.toLowerCase());
  if (level.description) keywords.push(level.description.toLowerCase());
  keywords.push(operationTypeNames[level.operationType]?.toLowerCase() || level.operationType);
  keywords.push(phaseNames[level.phase]?.toLowerCase() || level.phase);

  // Add config-based keywords
  if (level.config) {
    if (level.config.specificTables) {
      keywords.push('tablas');
      keywords.push('tablas de multiplicar');
      level.config.specificTables.forEach(t => {
        keywords.push(`tabla del ${t}`);
        keywords.push(`tabla ${t}`);
      });
    }
    if (level.config.allowDecimals) {
      keywords.push('decimales');
    }
    if (level.config.forceNegative || level.config.allowNegatives) {
      keywords.push('negativos');
      keywords.push('números negativos');
    }
    if (level.config.equationType) {
      keywords.push('ecuación');
      keywords.push('ecuaciones');
    }
    if (level.config.expressionType) {
      keywords.push('expresión');
      keywords.push('expresiones');
    }
    if (level.config.simplificationType) {
      keywords.push('simplificar');
      keywords.push('simplificación');
    }
    if (level.config.sequenceType) {
      keywords.push('secuencia');
      keywords.push('secuencias');
      keywords.push('patrón');
    }
    if (level.config.functionType) {
      keywords.push('función');
      keywords.push('funciones');
    }
  }

  // Add thematic unit names
  if (level.thematicUnits) {
    level.thematicUnits.forEach(code => {
      const unit = getUnitByCode(code);
      if (unit?.name) keywords.push(unit.name.toLowerCase());
      keywords.push(code.toLowerCase());
    });
  }

  return keywords;
}

/**
 * Hook for filtering operations levels with search and dropdown filters
 */
export function useOperationsFilter(levels: FilterableLevel[]): UseOperationsFilterResult {
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');
  const [operationFilter, setOperationFilter] = useState('');

  // Get unique phases from levels
  const availablePhases = useMemo(() => {
    const phases = new Set<string>();
    levels.forEach(level => {
      if (level.phase) phases.add(level.phase);
    });
    return Array.from(phases);
  }, [levels]);

  // Get operations based on selected phase (or all if no phase selected)
  const availableOperations = useMemo(() => {
    if (phaseFilter) {
      return phaseOperations[phaseFilter] || [];
    }
    // Return all operations
    const operations = new Set<string>();
    levels.forEach(level => {
      if (level.operationType) operations.add(level.operationType);
    });
    return Array.from(operations);
  }, [levels, phaseFilter]);

  const availableFilters = useMemo<AvailableFilters>(() => ({
    phases: availablePhases,
    operations: availableOperations,
  }), [availablePhases, availableOperations]);

  // Clear operation filter if it's not valid for the new phase
  const handleSetPhaseFilter = useCallback((phase: string) => {
    setPhaseFilter(phase);
    // If operation is not in new phase, clear it
    if (phase && operationFilter) {
      const phaseOps = phaseOperations[phase] || [];
      if (!phaseOps.includes(operationFilter)) {
        setOperationFilter('');
      }
    }
  }, [operationFilter]);

  // Filter levels based on search and filters
  const filteredLevels = useMemo(() => {
    return levels.filter(level => {
      // Phase filter
      if (phaseFilter && level.phase !== phaseFilter) return false;

      // Operation type filter
      if (operationFilter && level.operationType !== operationFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const keywords = getLevelKeywords(level);
        const matchesKeyword = keywords.some(kw => kw.includes(query));
        const matchesLevel = level.level.toString().includes(query);
        if (!matchesKeyword && !matchesLevel) return false;
      }

      return true;
    });
  }, [levels, searchQuery, phaseFilter, operationFilter]);

  const hasActiveFilters = Boolean(searchQuery || phaseFilter || operationFilter);

  const activeFilterCount = [phaseFilter, operationFilter].filter(Boolean).length;

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setPhaseFilter('');
    setOperationFilter('');
  }, []);

  return {
    state: {
      searchQuery,
      phaseFilter,
      operationFilter,
    },
    filteredLevels,
    hasActiveFilters,
    availableFilters,
    activeFilterCount,
    actions: {
      setSearchQuery,
      setPhaseFilter: handleSetPhaseFilter,
      setOperationFilter,
      clearAllFilters,
    },
  };
}
