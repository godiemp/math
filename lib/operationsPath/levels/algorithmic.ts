import { OperationLevel } from '../types';

/**
 * PHASE 5: OPERACIONES ALGORÍTMICAS (Levels 101-120)
 * Sorting and counting
 */
export const algorithmicLevels: OperationLevel[] = [
  // Ordenamiento (101-110)
  {
    level: 101,
    title: 'Ordenar 3 Números',
    description: 'Ordena: [3, 1, 2]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-002"],

    config: { sequenceLength: 3, minValue: 1, maxValue: 10, sortingType: 'sort-asc',}
  },
  {
    level: 102,
    title: 'Ordenar 4 Números',
    description: 'Ordena: [4, 2, 1, 3]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-002"],

    config: { sequenceLength: 4, minValue: 1, maxValue: 10, sortingType: 'sort-desc',}
  },
  {
    level: 103,
    title: 'Ordenar 5 Números',
    description: 'Ordena: [5, 2, 8, 1, 4]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-002"],

    config: { sequenceLength: 5, minValue: 1, maxValue: 10, sortingType: 'min',}
  },
  {
    level: 104,
    title: 'Ordenar Descendente',
    description: 'Ordena mayor a menor: [2, 5, 1]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-002"],

    config: { sequenceLength: 3, minValue: 1, maxValue: 10, sortingType: 'max',}
  },
  {
    level: 105,
    title: 'Encontrar el Mínimo',
    description: 'Mínimo de [4, 2, 7, 1]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-002"],

    config: { sequenceLength: 4, minValue: 1, maxValue: 10, sortingType: 'median',}
  },
  {
    level: 106,
    title: 'Encontrar el Máximo',
    description: 'Máximo de [3, 9, 2, 5]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-002"],

    config: { sequenceLength: 4, minValue: 1, maxValue: 10 }
  },
  {
    level: 107,
    title: 'Encontrar la Mediana',
    description: 'Mediana de [1, 3, 5]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-002"],

    config: { sequenceLength: 5, minValue: 1, maxValue: 10 }
  },
  {
    level: 108,
    title: 'Ordenar con Duplicados',
    description: 'Ordena: [3, 1, 2, 1, 3]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-002"],

    config: { sequenceLength: 5, minValue: 1, maxValue: 5 }
  },
  {
    level: 109,
    title: 'Ordenar 6 Números',
    description: 'Ordena: [6, 2, 9, 1, 4, 7]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-002"],

    config: { sequenceLength: 6, minValue: 1, maxValue: 10 }
  },
  {
    level: 110,
    title: 'Ordenar con Negativos',
    description: 'Ordena: [-3, 5, -1, 2]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-002"],

    config: { arraySize: 4, minValue: -10, maxValue: 10, allowNegatives: true }
  },

  // Conteo (111-120)
  {
    level: 111,
    title: 'Contar Elementos',
    description: 'Cuenta: [1, 2, 3, 4]',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M2-PROB-003"],

    config: { sequenceLength: 4, minValue: 1, maxValue: 10, countingType: 'count-all',}
  },
  {
    level: 112,
    title: 'Contar Pares',
    description: '¿Cuántos pares en [1,2,3,4]?',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M2-PROB-003"],

    config: { sequenceLength: 4, minValue: 1, maxValue: 10, countingType: 'count-even',}
  },
  {
    level: 113,
    title: 'Contar Impares',
    description: '¿Cuántos impares en [1,2,3,4,5]?',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M2-PROB-003"],

    config: { sequenceLength: 5, minValue: 1, maxValue: 10, countingType: 'count-odd',}
  },
  {
    level: 114,
    title: 'Contar Mayores que N',
    description: '¿Cuántos >5 en [3,6,2,7,1]?',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M2-PROB-003"],

    config: { sequenceLength: 5, minValue: 1, maxValue: 10, countingType: 'count-greater',}
  },
  {
    level: 115,
    title: 'Contar Múltiplos',
    description: '¿Cuántos múltiplos de 3?',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M2-PROB-003"],

    config: { sequenceLength: 5, minValue: 1, maxValue: 15, countingType: 'count-multiples',}
  },
  {
    level: 116,
    title: 'Contar con Condición',
    description: 'Cuenta si x>3 AND x<8',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M2-PROB-003"],

    config: { sequenceLength: 6, minValue: 1, maxValue: 10, countingType: 'sum-even',}
  },
  {
    level: 117,
    title: 'Aplicar Transformación +n',
    description: 'Aplica +3 a: [1, 2, 3]',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M2-PROB-003"],

    config: { sequenceLength: 6, minValue: 1, maxValue: 5, compositionType: 'map+n',}
  },
  {
    level: 118,
    title: 'Aplicar Transformación ×n',
    description: 'Aplica ×2 a: [1, 2, 3]',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M2-PROB-003"],

    config: { sequenceLength: 6, minValue: 1, maxValue: 5, compositionType: 'map*n',}
  },
  {
    level: 119,
    title: 'Transformar y Sumar',
    description: 'Aplica ×2 luego suma: [1, 2, 3]',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M2-PROB-003"],

    config: { sequenceLength: 5, minValue: 1, maxValue: 10, compositionType: 'map-then-reduce',}
  },
  {
    level: 120,
    title: 'Filtrar Pares',
    description: 'Filtra pares: [1, 2, 3, 4]',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M2-PROB-003"],

    config: { sequenceLength: 6, minValue: 1, maxValue: 10, compositionType: 'filter-even',}
  }
];
