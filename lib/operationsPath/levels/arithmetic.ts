import { OperationLevel } from '../types';

/**
 * PHASE 1: ARITMÉTICA FUNDAMENTAL (Levels 1-30)
 * Basic number operations: addition, subtraction, multiplication, division, and mixed operations
 */
export const arithmeticLevels: OperationLevel[] = [
  // Suma (1-5)
  {
    level: 1,
    title: 'Suma Básica',
    description: 'Suma números del 1 al 5',
    operationType: 'addition',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ['M1-NUM-001'],
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
    thematicUnits: ['M1-NUM-001'],
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
    thematicUnits: ['M1-NUM-001'],
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
    thematicUnits: ['M1-NUM-001'],
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
    thematicUnits: ['M1-NUM-001'],
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
    thematicUnits: ['M1-NUM-001'],
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
    thematicUnits: ['M1-NUM-001'],
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
    thematicUnits: ['M1-NUM-001'],
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
    thematicUnits: ['M1-NUM-001'],
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
    thematicUnits: ['M1-NUM-001'],
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
    thematicUnits: ["M1-NUM-001"],

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
    thematicUnits: ["M1-NUM-001"],

    config: { specificTables: [3], minValue: 1, maxValue: 10 }
  },
  {
    level: 13,
    title: 'Tabla del 4',
    description: 'Multiplicaciones de la tabla del 4',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001"],

    config: { specificTables: [4], minValue: 1, maxValue: 10 }
  },
  {
    level: 14,
    title: 'Tablas del 6 al 8',
    description: 'Multiplicaciones de las tablas del 6, 7 y 8',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001"],

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
    thematicUnits: ["M1-NUM-001"],

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
    thematicUnits: ["M1-NUM-001"],

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
    thematicUnits: ["M1-NUM-001"],

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
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

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
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

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
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

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
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

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
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

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
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

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
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction'], minValue: 1, maxValue: 20, numberOfOperands: 3 }
  },
  {
    level: 25,
    title: 'Tres Operaciones Básicas',
    description: 'Suma, resta y multiplicación',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication'], minValue: 1, maxValue: 20, numberOfOperands: 3 }
  },
  {
    level: 26,
    title: 'Cuatro Operaciones',
    description: 'Suma, resta, multiplicación y división',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 20, numberOfOperands: 3 }
  },
  {
    level: 27,
    title: 'Operaciones hasta 50',
    description: 'Todas las operaciones con números hasta 50',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 3 }
  },
  {
    level: 28,
    title: 'Expresiones de Tres Términos',
    description: 'Expresiones con 3 números y 2 operaciones',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

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
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 4, allowDecimals: true }
  },
  {
    level: 30,
    title: 'Maestría Aritmética',
    description: 'Expresiones complejas de 4 términos',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 100, numberOfOperands: 4 }
  },
];
