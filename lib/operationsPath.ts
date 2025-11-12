/**
 * Operations Practice Path Configuration
 * Defines the progressive path from easiest to hardest operations
 * 150 levels organized in 5 phases: Arithmetic, Algebra, Logic, Structural, Algorithmic
 */

export type OperationType =
  // Arithmetic (Phase 1)
  | 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed-arithmetic'
  // Algebraic (Phase 2)
  | 'simple-equation' | 'expression-evaluation' | 'simplification'
  // Logical (Phase 3)
  | 'comparison' | 'logical-operators' | 'compound-conditions'
  // Structural (Phase 4)
  | 'sequences' | 'sets' | 'functions'
  // Algorithmic (Phase 5)
  | 'sorting' | 'counting' | 'composition';

export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';
export type PhaseType = 'arithmetic' | 'algebraic' | 'logical' | 'structural' | 'algorithmic';

export interface OperationLevel {
  level: number;
  title: string;
  description: string;
  operationType: OperationType;
  phase: PhaseType;
  difficulty: DifficultyLevel;
  problemsToComplete: number;
  config: {
    minValue?: number;
    maxValue?: number;
    allowNegatives?: boolean;
    forceNegative?: boolean;
    allowDecimals?: boolean;
    numberOfOperands?: number;
    mixedOperations?: OperationType[];
    specificTables?: number[];
    variables?: string[];
    operators?: string[];
    sequenceLength?: number;
    setSize?: number;
    algorithmSteps?: number;
    complexity?: number; // For algebraic expressions (1-4 indicating complexity level)
    arraySize?: number; // For algorithmic operations (sorting, counting)
  };
}

/**
 * The complete operations path - 150 progressive levels
 */
export const OPERATIONS_PATH: OperationLevel[] = [
  // ==========================================
  // PHASE 1: ARITMÉTICA FUNDAMENTAL (1-30)
  // ==========================================

  // Suma (1-5)
  {
    level: 1,
    title: 'Suma Básica',
    description: 'Suma números del 1 al 5',
    operationType: 'addition',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 5, numberOfOperands: 2 }
  },
  {
    level: 2,
    title: 'Suma hasta 10',
    description: 'Suma números del 1 al 10',
    operationType: 'addition',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 10, numberOfOperands: 2 }
  },
  {
    level: 3,
    title: 'Suma hasta 20',
    description: 'Suma números del 1 al 20',
    operationType: 'addition',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 20, numberOfOperands: 2 }
  },
  {
    level: 4,
    title: 'Suma Tres Números',
    description: 'Suma tres números del 1 al 10',
    operationType: 'addition',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 10, numberOfOperands: 3 }
  },
  {
    level: 5,
    title: 'Suma hasta 50',
    description: 'Suma números del 1 al 50',
    operationType: 'addition',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 50, numberOfOperands: 2 }
  },

  // Resta (6-10)
  {
    level: 6,
    title: 'Resta Básica',
    description: 'Resta números del 1 al 10',
    operationType: 'subtraction',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 10 }
  },
  {
    level: 7,
    title: 'Resta hasta 20',
    description: 'Resta números del 1 al 20',
    operationType: 'subtraction',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 20 }
  },
  {
    level: 8,
    title: 'Resta hasta 50',
    description: 'Resta números del 1 al 50',
    operationType: 'subtraction',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 50 }
  },
  {
    level: 9,
    title: 'Resta hasta 100',
    description: 'Resta números del 1 al 100',
    operationType: 'subtraction',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 100 }
  },
  {
    level: 10,
    title: 'Resta con Negativos',
    description: 'Resta que puede dar resultados negativos',
    operationType: 'subtraction',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 50, forceNegative: true }
  },

  // Multiplicación (11-17)
  {
    level: 11,
    title: 'Tabla del 2',
    description: 'Multiplicaciones de la tabla del 2',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { specificTables: [2], minValue: 1, maxValue: 10 }
  },
  {
    level: 12,
    title: 'Tabla del 3',
    description: 'Multiplicaciones de la tabla del 3',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { specificTables: [3], minValue: 1, maxValue: 10 }
  },
  {
    level: 13,
    title: 'Tabla del 4 y 5',
    description: 'Multiplicaciones de las tablas del 4 y 5',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { specificTables: [4, 5], minValue: 1, maxValue: 10 }
  },
  {
    level: 14,
    title: 'Tablas del 6 al 8',
    description: 'Multiplicaciones de las tablas del 6, 7 y 8',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { specificTables: [6, 7, 8], minValue: 1, maxValue: 10 }
  },
  {
    level: 15,
    title: 'Tabla del 9',
    description: 'Multiplicaciones de la tabla del 9',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { specificTables: [9], minValue: 1, maxValue: 10 }
  },
  {
    level: 16,
    title: 'Multiplicación hasta 20',
    description: 'Multiplicaciones con números hasta 20',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 2, maxValue: 20, numberOfOperands: 2 }
  },
  {
    level: 17,
    title: 'Multiplicación de Dos Cifras',
    description: 'Multiplicaciones con números de hasta 2 cifras',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 10, maxValue: 99, numberOfOperands: 2 }
  },

  // División (18-23)
  {
    level: 18,
    title: 'División Básica',
    description: 'Divisiones exactas simples (tablas 2-5)',
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { specificTables: [2, 3, 4, 5], minValue: 1, maxValue: 10 }
  },
  {
    level: 19,
    title: 'División Tablas Medias',
    description: 'Divisiones exactas de tablas del 6 al 9',
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { specificTables: [6, 7, 8, 9], minValue: 1, maxValue: 10 }
  },
  {
    level: 20,
    title: 'Todas las Divisiones',
    description: 'Divisiones exactas de todas las tablas',
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 2, maxValue: 10, numberOfOperands: 2 }
  },
  {
    level: 21,
    title: 'División hasta 100',
    description: 'Divisiones exactas con dividendos hasta 100',
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 2, maxValue: 100 }
  },
  {
    level: 22,
    title: 'División de Dos Cifras',
    description: 'Divisiones exactas con números de 2 cifras',
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 10, maxValue: 99 }
  },
  {
    level: 23,
    title: 'División con Decimales',
    description: 'Divisiones que dan resultados decimales',
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 50, allowDecimals: true }
  },

  // Operaciones Mixtas Aritméticas (24-30)
  {
    level: 24,
    title: 'Suma y Resta Simples',
    description: 'Combina suma y resta con números pequeños',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction'], minValue: 1, maxValue: 20, numberOfOperands: 2 }
  },
  {
    level: 25,
    title: 'Tres Operaciones Básicas',
    description: 'Suma, resta y multiplicación',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication'], minValue: 1, maxValue: 20, numberOfOperands: 2 }
  },
  {
    level: 26,
    title: 'Cuatro Operaciones',
    description: 'Suma, resta, multiplicación y división',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 20, numberOfOperands: 2 }
  },
  {
    level: 27,
    title: 'Operaciones hasta 50',
    description: 'Todas las operaciones con números hasta 50',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 2 }
  },
  {
    level: 28,
    title: 'Expresiones de Tres Términos',
    description: 'Expresiones con 3 números y 2 operaciones',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 3 }
  },
  {
    level: 29,
    title: 'Operaciones con Decimales',
    description: 'Operaciones mixtas con decimales',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 2, allowDecimals: true }
  },
  {
    level: 30,
    title: 'Maestría Aritmética',
    description: 'Expresiones complejas de 4 términos',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 100, numberOfOperands: 4 }
  },

  // ==========================================
  // PHASE 2: ÁLGEBRA INTRODUCTORIA (31-60)
  // ==========================================

  // Ecuaciones Simples (31-40)
  {
    level: 31,
    title: 'Ecuación de Suma x+a=b',
    description: 'Resuelve: x + 5 = 8',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 32,
    title: 'Ecuación de Resta x-a=b',
    description: 'Resuelve: x - 3 = 5',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 33,
    title: 'Ecuación a-x=b',
    description: 'Resuelve: 10 - x = 3',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 34,
    title: 'Ecuación de Multiplicación',
    description: 'Resuelve: 3x = 12',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 35,
    title: 'Ecuación de División',
    description: 'Resuelve: x/2 = 5',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 2, maxValue: 20 }
  },
  {
    level: 36,
    title: 'Ecuaciones con Números Grandes',
    description: 'Resuelve: x + 25 = 50',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 10, maxValue: 50 }
  },
  {
    level: 37,
    title: 'Ecuaciones ax+b=c',
    description: 'Resuelve: 2x + 5 = 13',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 20 }
  },
  {
    level: 38,
    title: 'Ecuaciones ax-b=c',
    description: 'Resuelve: 3x - 4 = 11',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 20 }
  },
  {
    level: 39,
    title: 'Ecuaciones con Paréntesis',
    description: 'Resuelve: 2(x+3) = 14',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 20 }
  },
  {
    level: 40,
    title: 'Ecuaciones con x a Ambos Lados',
    description: 'Resuelve: 2x + 5 = x + 10',
    operationType: 'simple-equation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 20 }
  },

  // Evaluación de Expresiones (41-50)
  {
    level: 41,
    title: 'Evaluar x+a',
    description: 'Si x=3, ¿cuánto es x+5?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 42,
    title: 'Evaluar ax',
    description: 'Si x=4, ¿cuánto es 3x?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 43,
    title: 'Evaluar ax+b',
    description: 'Si x=5, ¿cuánto es 2x+3?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 44,
    title: 'Evaluar x²',
    description: 'Si x=4, ¿cuánto es x²?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 45,
    title: 'Evaluar ax²+b',
    description: 'Si x=3, ¿cuánto es 2x²+1?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 46,
    title: 'Evaluar con Dos Variables',
    description: 'Si x=2 y y=3, ¿cuánto es x+y?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10 }
  },
  {
    level: 47,
    title: 'Evaluar xy',
    description: 'Si x=3 y y=4, ¿cuánto es xy?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10 }
  },
  {
    level: 48,
    title: 'Evaluar ax+by',
    description: 'Si x=2 y y=3, ¿cuánto es 2x+3y?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10 }
  },
  {
    level: 49,
    title: 'Evaluar x²+y²',
    description: 'Si x=3 y y=4, ¿cuánto es x²+y²?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10 }
  },
  {
    level: 50,
    title: 'Evaluar (x+y)²',
    description: 'Si x=2 y y=3, ¿cuánto es (x+y)²?',
    operationType: 'expression-evaluation',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10 }
  },

  // Simplificación (51-60)
  {
    level: 51,
    title: 'Simplificar x+x',
    description: 'Simplifica: x + x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'] }
  },
  {
    level: 52,
    title: 'Simplificar 2x+3x',
    description: 'Simplifica: 2x + 3x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'] }
  },
  {
    level: 53,
    title: 'Simplificar 5x-2x',
    description: 'Simplifica: 5x - 2x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'] }
  },
  {
    level: 54,
    title: 'Simplificar x+x+x',
    description: 'Simplifica: x + x + x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'] }
  },
  {
    level: 55,
    title: 'Simplificar 2x+x-x',
    description: 'Simplifica: 2x + x - x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x'] }
  },
  {
    level: 56,
    title: 'Simplificar con Dos Variables',
    description: 'Simplifica: 2x + 3y + x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'] }
  },
  {
    level: 57,
    title: 'Simplificar 3x+2y-x',
    description: 'Simplifica: 3x + 2y - x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'] }
  },
  {
    level: 58,
    title: 'Simplificar con Coeficientes',
    description: 'Simplifica: 4x + 2y + 3x - y',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'] }
  },
  {
    level: 59,
    title: 'Simplificar Paréntesis',
    description: 'Simplifica: 2(x+3) + x',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { variables: ['x'] }
  },
  {
    level: 60,
    title: 'Simplificación Compleja',
    description: 'Simplifica: 3(2x+y) - 2(x-y)',
    operationType: 'simplification',
    phase: 'algebraic',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'] }
  },

  // ==========================================
  // PHASE 3: OPERACIONES LÓGICAS (61-90)
  // ==========================================

  // Comparaciones (61-70)
  {
    level: 61,
    title: 'Mayor que',
    description: '¿5 > 3?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { operators: ['>'], minValue: 1, maxValue: 10 }
  },
  {
    level: 62,
    title: 'Menor que',
    description: '¿2 < 7?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { operators: ['<'], minValue: 1, maxValue: 10 }
  },
  {
    level: 63,
    title: 'Igual a',
    description: '¿5 = 5?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { operators: ['='], minValue: 1, maxValue: 10 }
  },
  {
    level: 64,
    title: 'Mayor o Igual',
    description: '¿6 ≥ 4?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { operators: ['≥'], minValue: 1, maxValue: 10 }
  },
  {
    level: 65,
    title: 'Menor o Igual',
    description: '¿3 ≤ 8?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { operators: ['≤'], minValue: 1, maxValue: 10 }
  },
  {
    level: 66,
    title: 'Comparaciones con Negativos',
    description: '¿-3 < 2?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { operators: ['<', '>'], minValue: -10, maxValue: 10 }
  },
  {
    level: 67,
    title: 'Comparar Expresiones',
    description: '¿5+3 > 7?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { operators: ['<', '>', '='], minValue: 1, maxValue: 20 }
  },
  {
    level: 68,
    title: 'Comparar Productos',
    description: '¿2×4 = 8?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { operators: ['<', '>', '='], minValue: 1, maxValue: 10 }
  },
  {
    level: 69,
    title: 'Comparaciones con Variables',
    description: 'Si x=5, ¿x > 3?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { operators: ['<', '>', '='], minValue: 1, maxValue: 10, variables: ['x'] }
  },
  {
    level: 70,
    title: 'Comparaciones Complejas',
    description: '¿2x+3 ≥ 11 cuando x=4?',
    operationType: 'comparison',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { operators: ['<', '>', '=', '≤', '≥'], minValue: 1, maxValue: 20, variables: ['x'] }
  },

  // Operadores Lógicos (71-80)
  {
    level: 71,
    title: 'Operador AND Básico',
    description: '¿Verdadero AND Verdadero?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { operators: ['AND'] }
  },
  {
    level: 72,
    title: 'Operador OR Básico',
    description: '¿Verdadero OR Falso?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { operators: ['OR'] }
  },
  {
    level: 73,
    title: 'Operador NOT Básico',
    description: '¿NOT Verdadero?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { operators: ['NOT'] }
  },
  {
    level: 74,
    title: 'AND con Comparaciones',
    description: '¿(5>3) AND (2<4)?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { operators: ['AND'], minValue: 1, maxValue: 10 }
  },
  {
    level: 75,
    title: 'OR con Comparaciones',
    description: '¿(5<3) OR (2<4)?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { operators: ['OR'], minValue: 1, maxValue: 10 }
  },
  {
    level: 76,
    title: 'NOT con Comparaciones',
    description: '¿NOT(5<3)?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { operators: ['NOT'], minValue: 1, maxValue: 10 }
  },
  {
    level: 77,
    title: 'AND y OR Combinados',
    description: '¿(V AND F) OR V?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { operators: ['AND', 'OR'] }
  },
  {
    level: 78,
    title: 'Expresiones con Paréntesis',
    description: '¿(V OR F) AND (V OR V)?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { operators: ['AND', 'OR'] }
  },
  {
    level: 79,
    title: 'NOT con AND y OR',
    description: '¿NOT((V AND F) OR F)?',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { operators: ['AND', 'OR', 'NOT'] }
  },
  {
    level: 80,
    title: 'Expresiones Lógicas Complejas',
    description: 'Evalúa: (A AND B) OR (NOT C)',
    operationType: 'logical-operators',
    phase: 'logical',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { operators: ['AND', 'OR', 'NOT'] }
  },

  // Condiciones Compuestas (81-90)
  {
    level: 81,
    title: 'Condición Simple',
    description: 'Si x>5, ¿x=7 cumple?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 82,
    title: 'Condición con AND',
    description: 'Si x>5 AND x<10, ¿x=7 cumple?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { operators: ['AND'], variables: ['x'], minValue: 1, maxValue: 15 }
  },
  {
    level: 83,
    title: 'Condición con OR',
    description: 'Si x<3 OR x>8, ¿x=5 cumple?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { operators: ['OR'], variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 84,
    title: 'Rangos Numéricos',
    description: '¿5 está en el rango [3, 8]?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 20 }
  },
  {
    level: 85,
    title: 'Condiciones con Variables',
    description: 'Si x=4, ¿cumple 2<x<7?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 86,
    title: 'Dos Variables con AND',
    description: 'Si x=3 y y=5, ¿x<y AND x>0?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { operators: ['AND'], variables: ['x', 'y'], minValue: 1, maxValue: 10 }
  },
  {
    level: 87,
    title: 'Dos Variables con OR',
    description: 'Si x=2 y y=8, ¿x>5 OR y>5?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { operators: ['OR'], variables: ['x', 'y'], minValue: 1, maxValue: 10 }
  },
  {
    level: 88,
    title: 'Condiciones con NOT',
    description: 'Si x=4, ¿cumple NOT(x<3)?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { operators: ['NOT'], variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 89,
    title: 'Condiciones Múltiples',
    description: 'Si x=5, ¿(x>3 AND x<8) OR x=10?',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { operators: ['AND', 'OR'], variables: ['x'], minValue: 1, maxValue: 15 }
  },
  {
    level: 90,
    title: 'Condiciones Expertas',
    description: 'Evalúa: (x>y AND y>z) OR (x=z)',
    operationType: 'compound-conditions',
    phase: 'logical',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { operators: ['AND', 'OR'], variables: ['x', 'y', 'z'], minValue: 1, maxValue: 10 }
  },

  // ==========================================
  // PHASE 4: OPERACIONES ESTRUCTURALES (91-120)
  // ==========================================

  // Secuencias (91-100)
  {
    level: 91,
    title: 'Secuencia +1',
    description: 'Continúa: 2, 3, 4, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10 }
  },
  {
    level: 92,
    title: 'Secuencia +2',
    description: 'Continúa: 2, 4, 6, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 20 }
  },
  {
    level: 93,
    title: 'Secuencia +5',
    description: 'Continúa: 5, 10, 15, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 5, maxValue: 50 }
  },
  {
    level: 94,
    title: 'Secuencia -1',
    description: 'Continúa: 10, 9, 8, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10 }
  },
  {
    level: 95,
    title: 'Secuencia ×2',
    description: 'Continúa: 2, 4, 8, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 50 }
  },
  {
    level: 96,
    title: 'Secuencia Cuadrados',
    description: 'Continúa: 1, 4, 9, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 100 }
  },
  {
    level: 97,
    title: 'Fibonacci Básico',
    description: 'Continúa: 1, 1, 2, 3, 5, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 6, minValue: 1, maxValue: 50 }
  },
  {
    level: 98,
    title: 'Secuencia Alternada',
    description: 'Continúa: 1, 4, 2, 5, 3, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 6, minValue: 1, maxValue: 20 }
  },
  {
    level: 99,
    title: 'Secuencia con Dos Reglas',
    description: 'Continúa: 1, 2, 4, 5, 7, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { sequenceLength: 6, minValue: 1, maxValue: 30 }
  },
  {
    level: 100,
    title: 'Secuencia Compleja',
    description: 'Encuentra el patrón',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { sequenceLength: 5, minValue: 1, maxValue: 50 }
  },

  // Conjuntos (101-110)
  {
    level: 101,
    title: 'Unión de Conjuntos',
    description: '{1,2} ∪ {2,3} = ?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { setSize: 2, operators: ['∪'], minValue: 1, maxValue: 5 }
  },
  {
    level: 102,
    title: 'Intersección de Conjuntos',
    description: '{1,2,3} ∩ {2,3,4} = ?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { setSize: 3, operators: ['∩'], minValue: 1, maxValue: 5 }
  },
  {
    level: 103,
    title: 'Diferencia de Conjuntos',
    description: '{1,2,3} - {2,4} = ?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { setSize: 3, operators: ['-'], minValue: 1, maxValue: 5 }
  },
  {
    level: 104,
    title: 'Pertenencia a Conjunto',
    description: '¿3 ∈ {1,2,3,4}?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { setSize: 4, operators: ['∈'], minValue: 1, maxValue: 5 }
  },
  {
    level: 105,
    title: 'Cardinalidad',
    description: '|{1,2,3,4,5}| = ?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { setSize: 5, operators: ['|'], minValue: 1, maxValue: 10 }
  },
  {
    level: 106,
    title: 'Subconjuntos',
    description: '¿{1,2} ⊆ {1,2,3}?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { setSize: 3, operators: ['⊆'], minValue: 1, maxValue: 5 }
  },
  {
    level: 107,
    title: 'Unión e Intersección',
    description: '({1,2} ∪ {3}) ∩ {2,3}',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { setSize: 3, operators: ['∪', '∩'], minValue: 1, maxValue: 5 }
  },
  {
    level: 108,
    title: 'Complemento',
    description: 'Si U={1,2,3,4,5}, A={1,2}, A\' = ?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { setSize: 5, operators: ['\''], minValue: 1, maxValue: 10 }
  },
  {
    level: 109,
    title: 'Producto Cartesiano',
    description: '{1,2} × {a,b}',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { setSize: 2, operators: ['×'], minValue: 1, maxValue: 3 }
  },
  {
    level: 110,
    title: 'Operaciones Mixtas de Conjuntos',
    description: '(A ∪ B) ∩ (A - C)',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { setSize: 4, operators: ['∪', '∩', '-'], minValue: 1, maxValue: 5 }
  },

  // Funciones (111-120)
  {
    level: 111,
    title: 'Función Suma',
    description: 'f(x) = x+2, f(3) = ?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 112,
    title: 'Función Multiplicación',
    description: 'f(x) = 2x, f(4) = ?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 113,
    title: 'Función Lineal',
    description: 'f(x) = 2x+1, f(3) = ?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 114,
    title: 'Función Cuadrática',
    description: 'f(x) = x², f(5) = ?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 115,
    title: 'Función con Dos Términos',
    description: 'f(x) = x²+2x, f(3) = ?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 116,
    title: 'Función de Dos Variables',
    description: 'f(x,y) = x+y, f(2,3) = ?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10 }
  },
  {
    level: 117,
    title: 'Función Producto',
    description: 'f(x,y) = xy, f(3,4) = ?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10 }
  },
  {
    level: 118,
    title: 'Composición de Funciones',
    description: 'f(x)=x+1, g(x)=2x, f(g(3))=?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 119,
    title: 'Función Inversa',
    description: 'Si f(x)=2x, ¿f⁻¹(6)=?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { variables: ['x'], minValue: 1, maxValue: 10 }
  },
  {
    level: 120,
    title: 'Funciones Complejas',
    description: 'f(x,y)=x²+y², f(3,4)=?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10 }
  },

  // ==========================================
  // PHASE 5: OPERACIONES ALGORÍTMICAS (121-150)
  // ==========================================

  // Ordenamiento (121-130)
  {
    level: 121,
    title: 'Ordenar 3 Números',
    description: 'Ordena: [3, 1, 2]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { sequenceLength: 3, minValue: 1, maxValue: 10 }
  },
  {
    level: 122,
    title: 'Ordenar 4 Números',
    description: 'Ordena: [4, 2, 1, 3]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10 }
  },
  {
    level: 123,
    title: 'Ordenar 5 Números',
    description: 'Ordena: [5, 2, 8, 1, 4]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { sequenceLength: 5, minValue: 1, maxValue: 10 }
  },
  {
    level: 124,
    title: 'Ordenar Descendente',
    description: 'Ordena mayor a menor: [2, 5, 1]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { sequenceLength: 3, minValue: 1, maxValue: 10 }
  },
  {
    level: 125,
    title: 'Encontrar el Mínimo',
    description: 'Mínimo de [4, 2, 7, 1]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10 }
  },
  {
    level: 126,
    title: 'Encontrar el Máximo',
    description: 'Máximo de [3, 9, 2, 5]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10 }
  },
  {
    level: 127,
    title: 'Encontrar la Mediana',
    description: 'Mediana de [1, 3, 5]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 5, minValue: 1, maxValue: 10 }
  },
  {
    level: 128,
    title: 'Ordenar con Duplicados',
    description: 'Ordena: [3, 1, 2, 1, 3]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 5, minValue: 1, maxValue: 5 }
  },
  {
    level: 129,
    title: 'Ordenar 6 Números',
    description: 'Ordena: [6, 2, 9, 1, 4, 7]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 6, minValue: 1, maxValue: 10 }
  },
  {
    level: 130,
    title: 'Ordenar con Negativos',
    description: 'Ordena: [-3, 5, -1, 2]',
    operationType: 'sorting',
    phase: 'algorithmic',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { arraySize: 5, minValue: -10, maxValue: 10 }
  },

  // Conteo (131-140)
  {
    level: 131,
    title: 'Contar Elementos',
    description: 'Cuenta: [1, 2, 3, 4]',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10 }
  },
  {
    level: 132,
    title: 'Contar Pares',
    description: '¿Cuántos pares en [1,2,3,4]?',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10 }
  },
  {
    level: 133,
    title: 'Contar Impares',
    description: '¿Cuántos impares en [1,2,3,4,5]?',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { sequenceLength: 5, minValue: 1, maxValue: 10 }
  },
  {
    level: 134,
    title: 'Contar Mayores que N',
    description: '¿Cuántos >5 en [3,6,2,7,1]?',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { sequenceLength: 5, minValue: 1, maxValue: 10 }
  },
  {
    level: 135,
    title: 'Contar Múltiplos',
    description: '¿Cuántos múltiplos de 3?',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { sequenceLength: 5, minValue: 1, maxValue: 15 }
  },
  {
    level: 136,
    title: 'Contar con Condición',
    description: 'Cuenta si x>3 AND x<8',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { sequenceLength: 6, minValue: 1, maxValue: 10 }
  },
  {
    level: 137,
    title: 'Contar Duplicados',
    description: '¿Cuántas veces aparece 3?',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 6, minValue: 1, maxValue: 5 }
  },
  {
    level: 138,
    title: 'Contar Únicos',
    description: '¿Cuántos números diferentes?',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 6, minValue: 1, maxValue: 5 }
  },
  {
    level: 139,
    title: 'Suma Condicional',
    description: 'Suma solo los pares',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 5, minValue: 1, maxValue: 10 }
  },
  {
    level: 140,
    title: 'Conteo Complejo',
    description: 'Cuenta si x%2=0 OR x>7',
    operationType: 'counting',
    phase: 'algorithmic',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { sequenceLength: 6, minValue: 1, maxValue: 10 }
  },

  // Composición (141-150)
  {
    level: 141,
    title: 'Transformación Simple',
    description: 'Aplica +2 a cada: [1,2,3]',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { sequenceLength: 3, minValue: 1, maxValue: 10, algorithmSteps: 1 }
  },
  {
    level: 142,
    title: 'Multiplicar por 2',
    description: 'Aplica ×2 a cada: [2,3,4]',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { sequenceLength: 3, minValue: 1, maxValue: 10, algorithmSteps: 1 }
  },
  {
    level: 143,
    title: 'Dos Transformaciones',
    description: 'Aplica +1 luego ×2',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 3, minValue: 1, maxValue: 10, algorithmSteps: 2 }
  },
  {
    level: 144,
    title: 'Filtrar y Transformar',
    description: 'Toma pares, luego ÷2',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10, algorithmSteps: 2 }
  },
  {
    level: 145,
    title: 'Tres Transformaciones',
    description: 'Aplica ×2, +1, -3',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 3, minValue: 1, maxValue: 10, algorithmSteps: 3 }
  },
  {
    level: 146,
    title: 'Reducción',
    description: 'Suma todos los elementos',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10, algorithmSteps: 1 }
  },
  {
    level: 147,
    title: 'Map y Reduce',
    description: 'Aplica ×2 luego suma todo',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10, algorithmSteps: 2 }
  },
  {
    level: 148,
    title: 'Algoritmo con Condición',
    description: 'Si x>5 aplica ×2, sino +1',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { sequenceLength: 4, minValue: 1, maxValue: 10, algorithmSteps: 2 }
  },
  {
    level: 149,
    title: 'Pipeline Completo',
    description: 'Filtra, transforma y reduce',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'expert',
    problemsToComplete: 5,
    config: { sequenceLength: 5, minValue: 1, maxValue: 10, algorithmSteps: 3 }
  },
  {
    level: 150,
    title: 'Gran Maestro Computacional',
    description: 'El desafío algorítmico definitivo',
    operationType: 'composition',
    phase: 'algorithmic',
    difficulty: 'expert',
    problemsToComplete: 5,
    config: { sequenceLength: 6, minValue: 1, maxValue: 20, algorithmSteps: 4 }
  }
];

/**
 * Get level configuration by level number
 */
export function getLevelConfig(level: number): OperationLevel | undefined {
  return OPERATIONS_PATH.find(l => l.level === level);
}

/**
 * Get the total number of levels
 */
export function getTotalLevels(): number {
  return OPERATIONS_PATH.length;
}

/**
 * Check if a level exists
 */
export function isValidLevel(level: number): boolean {
  return level >= 1 && level <= OPERATIONS_PATH.length;
}

/**
 * Get levels by phase
 */
export function getLevelsByPhase(phase: PhaseType): OperationLevel[] {
  return OPERATIONS_PATH.filter(l => l.phase === phase);
}

/**
 * Get phase info
 */
export function getPhaseInfo(phase: PhaseType): { name: string; range: string; description: string } {
  const phases = {
    arithmetic: {
      name: 'Aritmética Fundamental',
      range: 'Niveles 1-30',
      description: 'Operaciones concretas con números'
    },
    algebraic: {
      name: 'Álgebra Introductoria',
      range: 'Niveles 31-60',
      description: 'Introducción a variables y abstracción'
    },
    logical: {
      name: 'Operaciones Lógicas',
      range: 'Niveles 61-90',
      description: 'Razonamiento y condiciones'
    },
    structural: {
      name: 'Operaciones Estructurales',
      range: 'Niveles 91-120',
      description: 'Patrones y transformaciones'
    },
    algorithmic: {
      name: 'Operaciones Algorítmicas',
      range: 'Niveles 121-150',
      description: 'Procesos de múltiples pasos'
    }
  };
  return phases[phase];
}
