import { OperationLevelDefinition } from '../types';

/**
 * PHASE 1: ARITMÉTICA FUNDAMENTAL (Levels 1-30)
 * Basic number operations: addition, subtraction, multiplication, division, and mixed operations
 */
export const arithmeticLevels: OperationLevelDefinition[] = [
  // Suma (1-5)
  {
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
