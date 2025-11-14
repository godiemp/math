import { OperationLevelDefinition } from '../types';

/**
 * PHASE 2: ÁLGEBRA INTRODUCTORIA (Levels 31-60)
 * Introduction to variables and abstraction: simple equations, expression evaluation, and simplification
 */
export const algebraicLevels: OperationLevelDefinition[] = [
  // Ecuaciones Simples (31-40)
  {
    title: 'Ecuación de Suma x+a=b',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], equationType: 'x+a=b', minValue: 1, maxValue: 10 }
  },
  {
    title: 'Ecuación de Resta x-a=b',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], equationType: 'x-a=b', minValue: 1, maxValue: 10 }
  },
  {
    title: 'Ecuación a-x=b',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], equationType: 'a-x=b', minValue: 1, maxValue: 10 }
  },
  {
    title: 'Ecuación ax=b',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], equationType: 'ax=b', minValue: 1, maxValue: 10 }
  },
  {
    title: 'Ecuación x/a=b',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { variables: ['x'], equationType: 'x/a=b', minValue: 2, maxValue: 20 }
  },
  {
    title: 'Ecuaciones con Números Grandes',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { equationType: 'x+a=b', variables: ['x'], minValue: 10, maxValue: 50 }
  },
  {
    title: 'Ecuaciones ax+b=c',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { equationType: 'ax+b=c', variables: ['x'], minValue: 1, maxValue: 20 }
  },
  {
    title: 'Ecuaciones ax-b=c',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { equationType: 'ax-b=c', variables: ['x'], minValue: 1, maxValue: 20 }
  },
  {
    title: 'Ecuaciones con Paréntesis',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-006"],

    config: { equationType: 'a(x+b)=c', variables: ['x'], minValue: 1, maxValue: 20 }
  },
  {
    title: 'Ecuaciones con x a Ambos Lados',
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
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, expressionType: 'x+a',}
  },
  {
    title: 'Evaluar ax',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, expressionType: 'ax',}
  },
  {
    title: 'Evaluar ax+b',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, expressionType: 'ax+b',}
  },
  {
    title: 'Evaluar x²',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, expressionType: 'x²',}
  },
  {
    title: 'Evaluar ax²+b',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, expressionType: 'ax²+b',}
  },
  {
    title: 'Evaluar con Dos Variables',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, expressionType: 'x+y',}
  },
  {
    title: 'Evaluar xy',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, expressionType: 'xy',}
  },
  {
    title: 'Evaluar ax+by',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, expressionType: 'ax+by',}
  },
  {
    title: 'Evaluar x²+y²',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-002"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, expressionType: 'x²+y²',}
  },
  {
    title: 'Evaluar (x+y)²',
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
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'x+x',}
  },
  {
    title: 'Simplificar 2x+3x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'ax+bx',}
  },
  {
    title: 'Simplificar 5x-2x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'ax-bx',}
  },
  {
    title: 'Simplificar -ax-bx',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: '-ax-bx',}
  },
  {
    title: 'Simplificar -ax+bx',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: '-ax+bx',}
  },
  // Phase 2: Single Variable, 3 Terms (56-58)
  {
    title: 'Simplificar x±x±x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'x±x±x',}
  },
  {
    title: 'Simplificar ax±bx±cx',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'ax±bx±cx',}
  },
  {
    title: 'Simplificar ax+bx-cx',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'ax+bx-cx',}
  },

  // Phase 3: Two Variables, Basic (59-61)
  {
    title: 'Simplificar ax+by+x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'ax+by+x',}
  },
  {
    title: 'Simplificar ax+by-x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'ax+by-x',}
  },
  {
    title: 'Simplificar ax-by+x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'ax-by+x',}
  },

  // Phase 4: Two Variables, Complex (62-64)
  {
    title: 'Simplificar ax+by+cx-dy',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'ax+by+cx-dy',}
  },
  {
    title: 'Simplificar ax+by-cx+dy',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'ax+by-cx+dy',}
  },
  {
    title: 'Simplificar ax-by+cx-dy',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'ax-by+cx-dy',}
  },

  // Phase 5: Parenthesis, Single Variable (65-67)
  {
    title: 'Simplificar a(x+b)+x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'a(x+b)+x',}
  },
  {
    title: 'Simplificar a(x+b)+cx',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'a(x+b)+cx',}
  },
  {
    title: 'Simplificar a(x+b)-cx',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'a(x+b)-cx',}
  },

  // Phase 6: Parenthesis, Advanced (68-70)
  {
    title: 'Simplificar a(x+b)+c(x+d)',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x'], simplificationType: 'a(x+b)+c(x+d)',}
  },
  {
    title: 'Simplificar a(x+y)+bx',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'a(x+y)+bx',}
  },
  {
    title: 'Simplificar a(x+b)+c(y+d)',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-001","M1-ALG-002"],

    config: { variables: ['x', 'y'], simplificationType: 'a(x+b)+c(y+d)',}
  },
];
