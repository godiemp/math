import { OperationLevelDefinition } from '../types';

/**
 * PHASE 5: OPERACIONES ALGORÍTMICAS (Levels 101-120)
 * Sorting and counting
 */
export const algorithmicLevels: OperationLevelDefinition[] = [
  // Ordenamiento (101-110)
  {
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
