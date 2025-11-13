import { OperationLevelDefinition } from '../types';

/**
 * PHASE 3: OPERACIONES LÓGICAS (Levels 61-80)
 * Reasoning and conditions: comparisons and compound conditions
 */
export const logicalLevels: OperationLevelDefinition[] = [
  // Comparaciones (61-70)
  {
    title: 'Mayor que',
    description: '¿5 > 3?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['>'], minValue: 1, maxValue: 10,}
  },
  {
    title: 'Menor que',
    description: '¿2 < 7?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<'], minValue: 1, maxValue: 10,}
  },
  {
    title: 'Igual a',
    description: '¿5 = 5?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['='], minValue: 1, maxValue: 10,}
  },
  {
    title: 'Mayor o Igual',
    description: '¿6 ≥ 4?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['≥'], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Menor o Igual',
    description: '¿3 ≤ 8?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['≤'], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Comparaciones con Negativos',
    description: '¿-3 < 2?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<', '>'], minValue: -10, maxValue: 10, allowNegatives: true }
  },
  {
    title: 'Comparar Expresiones',
    description: '¿5+3 > 7?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<', '>', '='], minValue: 1, maxValue: 20 }
  },
  {
    title: 'Comparar Productos',
    description: '¿2×4 = 8?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<', '>', '='], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Comparaciones con Variables',
    description: 'Si x=5, ¿x > 3?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<', '>', '='], minValue: 1, maxValue: 10, variables: ['x'] }
  },
  {
    title: 'Comparaciones Complejas',
    description: '¿2x+3 ≥ 11 cuando x=4?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-ALG-006"],

    config: { operators: ['<', '>', '=', '≤', '≥'], minValue: 1, maxValue: 20, variables: ['x'] }
  },

  // Condiciones Compuestas (71-80)
  {
    title: 'Condición Simple',
    description: 'Si x>5, ¿x=7 cumple?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, conditionType: 'x>a',}
  },
  {
    title: 'Condición con AND',
    description: 'Si x>5 AND x<10, ¿x=7 cumple?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { operators: ['AND'], variables: ['x'], minValue: 1, maxValue: 15, conditionType: 'x>a AND x<b',}
  },
  {
    title: 'Condición con OR',
    description: 'Si x<3 OR x>8, ¿x=5 cumple?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { operators: ['OR'], variables: ['x'], minValue: 1, maxValue: 10, conditionType: 'x<a OR x>b',}
  },
  {
    title: 'Rangos Numéricos',
    description: '¿5 está en el rango [3, 8]?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { minValue: 1, maxValue: 20, conditionType: 'range',}
  },
  {
    title: 'Operador AND',
    description: '¿Verdadero AND Falso?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { operators: ['AND'], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Operador OR',
    description: '¿Verdadero OR Falso?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { operators: ['OR'], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Operador NOT',
    description: '¿NOT Verdadero?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { operators: ['NOT'], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Condiciones con NOT',
    description: 'Si x=4, ¿cumple NOT(x<3)?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { operators: ['NOT'], variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Condiciones Múltiples',
    description: 'Si x=5, ¿(x>3 AND x<8) OR x=10?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { operators: ['AND', 'OR'], variables: ['x'], minValue: 1, maxValue: 15 }
  },
  {
    title: 'Condiciones Expertas',
    description: 'Evalúa: (x>y AND y>z) OR (x=z)',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { operators: ['AND', 'OR'], variables: ['x', 'y', 'z'], minValue: 1, maxValue: 10 }
  },
];
