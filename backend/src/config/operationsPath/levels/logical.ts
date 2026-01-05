import { OperationLevelDefinition } from '../types';

/**
 * PHASE 3: OPERACIONES LÓGICAS (Levels 71-90)
 * Reasoning and conditions: comparisons and compound conditions
 */
export const logicalLevels: OperationLevelDefinition[] = [
  // Comparaciones (71-80)
  {
    title: 'Mayor que',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['>'], minValue: 1, maxValue: 10,}
  },
  {
    title: 'Menor que',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<'], minValue: 1, maxValue: 10,}
  },
  {
    title: 'Igual a',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['='], minValue: 1, maxValue: 10,}
  },
  {
    title: 'Mayor o Igual',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['≥'], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Menor o Igual',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['≤'], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Comparaciones con Negativos',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<', '>'], minValue: -10, maxValue: 10, allowNegatives: true }
  },
  {
    title: 'Comparar Expresiones',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<', '>', '='], minValue: 1, maxValue: 20 }
  },
  {
    title: 'Comparar Productos',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<', '>', '='], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Comparaciones con Variables',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<', '>', '='], minValue: 1, maxValue: 10, variables: ['x'] }
  },
  {
    title: 'Comparaciones Complejas',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<', '>', '=', '≤', '≥'], minValue: 1, maxValue: 20, variables: ['x'] }
  },

  // Condiciones Compuestas (81-90)
  {
    title: 'Condición Simple',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, conditionType: 'x>a',}
  },
  {
    title: 'Condición con AND',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { operators: ['AND'], variables: ['x'], minValue: 1, maxValue: 15, conditionType: 'x>a AND x<b',}
  },
  {
    title: 'Condición con OR',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { operators: ['OR'], variables: ['x'], minValue: 1, maxValue: 10, conditionType: 'x<a OR x>b',}
  },
  {
    title: 'Rangos Numéricos',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { minValue: 1, maxValue: 20, conditionType: 'range',}
  },
];
