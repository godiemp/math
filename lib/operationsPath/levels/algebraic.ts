import { OperationLevelDefinition } from '../types';

/**
 * PHASE 2: ÁLGEBRA INTRODUCTORIA (Levels 31-60)
 * Introduction to variables and abstraction: simple equations, expression evaluation, and simplification
 */
export const algebraicLevels: OperationLevelDefinition[] = [
  // Ecuaciones Simples (31-40)
  {
    title: 'Ecuación de Suma x+a=b',
    description: 'Resuelve: x + 5 = 8',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], equationType: 'x+a=b', minValue: 1, maxValue: 10 }
  },
  {
    title: 'Ecuación de Resta x-a=b',
    description: 'Resuelve: x - 3 = 5',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], equationType: 'x-a=b', minValue: 1, maxValue: 10 }
  },
  {
    title: 'Ecuación a-x=b',
    description: 'Resuelve: 10 - x = 3',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], equationType: 'a-x=b', minValue: 1, maxValue: 10 }
  },
  {
    title: 'Ecuación ax=b',
    description: 'Resuelve: 3x = 12',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], equationType: 'ax=b', minValue: 1, maxValue: 10 }
  },
  {
    title: 'Ecuación x/a=b',
    description: 'Resuelve: x/2 = 5',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], equationType: 'x/a=b', minValue: 2, maxValue: 20 }
  },
  {
    title: 'Ecuaciones con Números Grandes',
    description: 'Resuelve: x + 25 = 50',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { equationType: 'x+a=b', variables: ['x'], minValue: 10, maxValue: 50 }
  },
  {
    title: 'Ecuaciones ax+b=c',
    description: 'Resuelve: 2x + 5 = 13',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { equationType: 'ax+b=c', variables: ['x'], minValue: 1, maxValue: 20 }
  },
  {
    title: 'Ecuaciones ax-b=c',
    description: 'Resuelve: 3x - 4 = 11',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { equationType: 'ax-b=c', variables: ['x'], minValue: 1, maxValue: 20 }
  },
  {
    title: 'Ecuaciones con Paréntesis',
    description: 'Resuelve: 2(x+3) = 14',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { equationType: 'a(x+b)=c', variables: ['x'], minValue: 1, maxValue: 20 }
  },
  {
    title: 'Ecuaciones con x a Ambos Lados',
    description: 'Resuelve: 2x + 5 = x + 10',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { equationType: 'ax+b=cx+d', variables: ['x'], minValue: 1, maxValue: 20 }
  },

  // Evaluación de Expresiones (41-50)
  {
    title: 'Evaluar x+a',
    description: 'Si x=3, ¿cuánto es x+5?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, expressionType: 'x+a',}
  },
  {
    title: 'Evaluar ax',
    description: 'Si x=4, ¿cuánto es 3x?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, expressionType: 'ax',}
  },
  {
    title: 'Evaluar ax+b',
    description: 'Si x=5, ¿cuánto es 2x+3?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, expressionType: 'ax+b',}
  },
  {
    title: 'Evaluar x²',
    description: 'Si x=4, ¿cuánto es x²?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, expressionType: 'x²',}
  },
  {
    title: 'Evaluar ax²+b',
    description: 'Si x=3, ¿cuánto es 2x²+1?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, expressionType: 'ax²+b',}
  },
  {
    title: 'Evaluar con Dos Variables',
    description: 'Si x=2 y y=3, ¿cuánto es x+y?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, expressionType: 'x+y',}
  },
  {
    title: 'Evaluar xy',
    description: 'Si x=3 y y=4, ¿cuánto es xy?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, expressionType: 'xy',}
  },
  {
    title: 'Evaluar ax+by',
    description: 'Si x=2 y y=3, ¿cuánto es 2x+3y?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, expressionType: 'ax+by',}
  },
  {
    title: 'Evaluar x²+y²',
    description: 'Si x=3 y y=4, ¿cuánto es x²+y²?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, expressionType: 'x²+y²',}
  },
  {
    title: 'Evaluar (x+y)²',
    description: 'Si x=2 y y=3, ¿cuánto es (x+y)²?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, expressionType: '(x+y)²',}
  },

  // Simplificación (51-60)
  {
    title: 'Simplificar x+x',
    description: 'Simplifica: x + x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'x+x',}
  },
  {
    title: 'Simplificar 2x+3x',
    description: 'Simplifica: 2x + 3x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'ax+bx',}
  },
  {
    title: 'Simplificar 5x-2x',
    description: 'Simplifica: 5x - 2x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'ax-bx',}
  },
  {
    title: 'Simplificar x+x+x',
    description: 'Simplifica: x + x + x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'x+x+x',}
  },
  {
    title: 'Simplificar 2x+x-x',
    description: 'Simplifica: 2x + x - x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'ax+x-x',}
  },
  {
    title: 'Simplificar con Dos Variables',
    description: 'Simplifica: 2x + 3y + x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'ax+by+x',}
  },
  {
    title: 'Simplificar 3x+2y-x',
    description: 'Simplifica: 3x + 2y - x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'ax+by-x',}
  },
  {
    title: 'Simplificar con Coeficientes',
    description: 'Simplifica: 4x + 2y + 3x - y',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'ax+by+cx-dy',}
  },
  {
    title: 'Simplificar Paréntesis',
    description: 'Simplifica: 2(x+3) + x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'a(x+b)+x',}
  },
  {
    title: 'Simplificación Compleja',
    description: 'Simplifica: 3(2x+y) - 2(x-y)',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'] }
  },
];
