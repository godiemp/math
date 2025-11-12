/**
 * Operations Practice Path Configuration
 * Defines the progressive path from easiest to hardest operations
 */

export type OperationType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed';
export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';

export interface OperationLevel {
  level: number;
  title: string;
  description: string;
  operationType: OperationType;
  difficulty: DifficultyLevel;
  problemsToComplete: number; // Number of correct answers needed to unlock next level
  config: {
    minValue?: number;
    maxValue?: number;
    allowNegatives?: boolean;
    allowDecimals?: boolean;
    numberOfOperands?: number;
    mixedOperations?: OperationType[];
    specificTables?: number[]; // For multiplication/division tables
  };
}

/**
 * The complete operations path - 50 progressive levels
 */
export const OPERATIONS_PATH: OperationLevel[] = [
  // ADDITION - Levels 1-10
  {
    level: 1,
    title: 'Suma Básica',
    description: 'Suma números del 1 al 5',
    operationType: 'addition',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 5, numberOfOperands: 2 }
  },
  {
    level: 2,
    title: 'Suma hasta 10',
    description: 'Suma números del 1 al 10',
    operationType: 'addition',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 10, numberOfOperands: 2 }
  },
  {
    level: 3,
    title: 'Suma hasta 20',
    description: 'Suma números del 1 al 20',
    operationType: 'addition',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 20, numberOfOperands: 2 }
  },
  {
    level: 4,
    title: 'Suma Tres Números',
    description: 'Suma tres números del 1 al 10',
    operationType: 'addition',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 10, numberOfOperands: 3 }
  },
  {
    level: 5,
    title: 'Suma hasta 50',
    description: 'Suma números del 1 al 50',
    operationType: 'addition',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 50, numberOfOperands: 2 }
  },
  {
    level: 6,
    title: 'Suma hasta 100',
    description: 'Suma números del 1 al 100',
    operationType: 'addition',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 100, numberOfOperands: 2 }
  },
  {
    level: 7,
    title: 'Suma de Tres Cifras',
    description: 'Suma números de hasta 3 cifras',
    operationType: 'addition',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 10, maxValue: 999, numberOfOperands: 2 }
  },
  {
    level: 8,
    title: 'Suma Grande',
    description: 'Suma números de hasta 4 cifras',
    operationType: 'addition',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 100, maxValue: 9999, numberOfOperands: 2 }
  },
  {
    level: 9,
    title: 'Suma Múltiple',
    description: 'Suma cuatro números de hasta 2 cifras',
    operationType: 'addition',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 10, maxValue: 99, numberOfOperands: 4 }
  },
  {
    level: 10,
    title: 'Suma con Decimales',
    description: 'Suma números con un decimal',
    operationType: 'addition',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 100, numberOfOperands: 2, allowDecimals: true }
  },

  // SUBTRACTION - Levels 11-20
  {
    level: 11,
    title: 'Resta Básica',
    description: 'Resta números del 1 al 5',
    operationType: 'subtraction',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 5 }
  },
  {
    level: 12,
    title: 'Resta hasta 10',
    description: 'Resta números del 1 al 10',
    operationType: 'subtraction',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 10 }
  },
  {
    level: 13,
    title: 'Resta hasta 20',
    description: 'Resta números del 1 al 20',
    operationType: 'subtraction',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 20 }
  },
  {
    level: 14,
    title: 'Resta hasta 50',
    description: 'Resta números del 1 al 50',
    operationType: 'subtraction',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 50 }
  },
  {
    level: 15,
    title: 'Resta hasta 100',
    description: 'Resta números del 1 al 100',
    operationType: 'subtraction',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 100 }
  },
  {
    level: 16,
    title: 'Resta con Negativos',
    description: 'Resta que puede dar resultados negativos',
    operationType: 'subtraction',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 50, allowNegatives: true }
  },
  {
    level: 17,
    title: 'Resta de Tres Cifras',
    description: 'Resta números de hasta 3 cifras',
    operationType: 'subtraction',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 10, maxValue: 999 }
  },
  {
    level: 18,
    title: 'Resta Grande',
    description: 'Resta números de hasta 4 cifras',
    operationType: 'subtraction',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 100, maxValue: 9999 }
  },
  {
    level: 19,
    title: 'Resta con Decimales',
    description: 'Resta números con un decimal',
    operationType: 'subtraction',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 100, allowDecimals: true }
  },
  {
    level: 20,
    title: 'Resta Negativa Avanzada',
    description: 'Resta con negativos y hasta 3 cifras',
    operationType: 'subtraction',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 10, maxValue: 999, allowNegatives: true }
  },

  // MULTIPLICATION - Levels 21-30
  {
    level: 21,
    title: 'Tabla del 2',
    description: 'Multiplicaciones de la tabla del 2',
    operationType: 'multiplication',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { specificTables: [2], minValue: 1, maxValue: 10 }
  },
  {
    level: 22,
    title: 'Tabla del 3 y 4',
    description: 'Multiplicaciones de las tablas del 3 y 4',
    operationType: 'multiplication',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { specificTables: [3, 4], minValue: 1, maxValue: 10 }
  },
  {
    level: 23,
    title: 'Tabla del 5',
    description: 'Multiplicaciones de la tabla del 5',
    operationType: 'multiplication',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { specificTables: [5], minValue: 1, maxValue: 10 }
  },
  {
    level: 24,
    title: 'Tablas del 6 al 8',
    description: 'Multiplicaciones de las tablas del 6, 7 y 8',
    operationType: 'multiplication',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { specificTables: [6, 7, 8], minValue: 1, maxValue: 10 }
  },
  {
    level: 25,
    title: 'Tabla del 9',
    description: 'Multiplicaciones de la tabla del 9',
    operationType: 'multiplication',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { specificTables: [9], minValue: 1, maxValue: 10 }
  },
  {
    level: 26,
    title: 'Todas las Tablas',
    description: 'Multiplicaciones de todas las tablas del 2 al 9',
    operationType: 'multiplication',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 2, maxValue: 9, numberOfOperands: 2 }
  },
  {
    level: 27,
    title: 'Multiplicación hasta 20',
    description: 'Multiplicaciones con números hasta 20',
    operationType: 'multiplication',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 2, maxValue: 20, numberOfOperands: 2 }
  },
  {
    level: 28,
    title: 'Multiplicación de Dos Cifras',
    description: 'Multiplicaciones con números de hasta 2 cifras',
    operationType: 'multiplication',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 10, maxValue: 99, numberOfOperands: 2 }
  },
  {
    level: 29,
    title: 'Multiplicación Grande',
    description: 'Multiplicaciones con números de hasta 3 cifras',
    operationType: 'multiplication',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 10, maxValue: 999, numberOfOperands: 2 }
  },
  {
    level: 30,
    title: 'Multiplicación con Decimales',
    description: 'Multiplicaciones con un decimal',
    operationType: 'multiplication',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 50, numberOfOperands: 2, allowDecimals: true }
  },

  // DIVISION - Levels 31-40
  {
    level: 31,
    title: 'División Básica',
    description: 'Divisiones exactas simples (2-5)',
    operationType: 'division',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { specificTables: [2, 3, 4, 5], minValue: 1, maxValue: 10 }
  },
  {
    level: 32,
    title: 'División Tablas Básicas',
    description: 'Divisiones exactas de tablas del 2 al 5',
    operationType: 'division',
    difficulty: 'basic',
    problemsToComplete: 3,
    config: { minValue: 2, maxValue: 5, numberOfOperands: 2 }
  },
  {
    level: 33,
    title: 'División Tablas Medias',
    description: 'Divisiones exactas de tablas del 6 al 9',
    operationType: 'division',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { specificTables: [6, 7, 8, 9], minValue: 1, maxValue: 10 }
  },
  {
    level: 34,
    title: 'Todas las Divisiones',
    description: 'Divisiones exactas de todas las tablas',
    operationType: 'division',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 2, maxValue: 10, numberOfOperands: 2 }
  },
  {
    level: 35,
    title: 'División hasta 100',
    description: 'Divisiones exactas con dividendos hasta 100',
    operationType: 'division',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { minValue: 2, maxValue: 100 }
  },
  {
    level: 36,
    title: 'División de Dos Cifras',
    description: 'Divisiones exactas con números de 2 cifras',
    operationType: 'division',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 10, maxValue: 99 }
  },
  {
    level: 37,
    title: 'División Grande',
    description: 'Divisiones con números de hasta 3 cifras',
    operationType: 'division',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 10, maxValue: 999 }
  },
  {
    level: 38,
    title: 'División con Decimales',
    description: 'Divisiones que dan resultados decimales (1 decimal)',
    operationType: 'division',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 50, allowDecimals: true }
  },
  {
    level: 39,
    title: 'División Decimal Compleja',
    description: 'Divisiones con decimales en operandos y resultado',
    operationType: 'division',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { minValue: 1, maxValue: 100, allowDecimals: true }
  },
  {
    level: 40,
    title: 'División Experta',
    description: 'Divisiones complejas de hasta 4 cifras',
    operationType: 'division',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { minValue: 100, maxValue: 9999 }
  },

  // MIXED OPERATIONS - Levels 41-50
  {
    level: 41,
    title: 'Operaciones Mixtas Básicas',
    description: 'Suma y resta simples',
    operationType: 'mixed',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction'], minValue: 1, maxValue: 20, numberOfOperands: 2 }
  },
  {
    level: 42,
    title: 'Tres Operaciones Básicas',
    description: 'Suma, resta y multiplicación',
    operationType: 'mixed',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication'], minValue: 1, maxValue: 20, numberOfOperands: 2 }
  },
  {
    level: 43,
    title: 'Cuatro Operaciones',
    description: 'Suma, resta, multiplicación y división',
    operationType: 'mixed',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 20, numberOfOperands: 2 }
  },
  {
    level: 44,
    title: 'Operaciones Mixtas Medianas',
    description: 'Todas las operaciones con números hasta 50',
    operationType: 'mixed',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 2 }
  },
  {
    level: 45,
    title: 'Operaciones Mixtas Grandes',
    description: 'Todas las operaciones con números hasta 100',
    operationType: 'mixed',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 100, numberOfOperands: 2 }
  },
  {
    level: 46,
    title: 'Expresiones de Tres Términos',
    description: 'Expresiones con 3 números y 2 operaciones',
    operationType: 'mixed',
    difficulty: 'advanced',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 3 }
  },
  {
    level: 47,
    title: 'Operaciones con Decimales',
    description: 'Operaciones mixtas con decimales',
    operationType: 'mixed',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 2, allowDecimals: true }
  },
  {
    level: 48,
    title: 'Expresiones Complejas',
    description: 'Expresiones de 4 términos con todas las operaciones',
    operationType: 'mixed',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 100, numberOfOperands: 4 }
  },
  {
    level: 49,
    title: 'Maestría Matemática',
    description: 'Operaciones complejas con números grandes',
    operationType: 'mixed',
    difficulty: 'expert',
    problemsToComplete: 3,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 10, maxValue: 999, numberOfOperands: 3 }
  },
  {
    level: 50,
    title: 'Gran Maestro',
    description: 'El desafío definitivo: operaciones expertas',
    operationType: 'mixed',
    difficulty: 'expert',
    problemsToComplete: 5,
    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 999, numberOfOperands: 4, allowDecimals: true }
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
