import { OperationLevelDefinition } from '../types';

/**
 * PHASE 1: ARITMÉTICA FUNDAMENTAL (Levels 1-30)
 * Basic number operations: addition, subtraction, multiplication, division, and mixed operations
 */
export const arithmeticLevels: OperationLevelDefinition[] = [
  // Suma (1-5)
  {
    title: 'Suma Básica',
    operationType: 'addition',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ['M1-NUM-001'],
    config: { minValue: 1, maxValue: 5, numberOfOperands: 2 }
  },
  {
    title: 'Suma hasta 10',
    operationType: 'addition',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ['M1-NUM-001'],
    config: { minValue: 1, maxValue: 10, numberOfOperands: 2 }
  },
  {
    title: 'Suma hasta 20',
    operationType: 'addition',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ['M1-NUM-001'],
    config: { minValue: 1, maxValue: 20, numberOfOperands: 2 }
  },
  {
    title: 'Suma Tres Números',
    operationType: 'addition',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ['M1-NUM-001'],
    config: { minValue: 1, maxValue: 10, numberOfOperands: 3 }
  },
  {
    title: 'Suma hasta 50',
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
    operationType: 'subtraction',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ['M1-NUM-001'],
    config: { minValue: 1, maxValue: 10 }
  },
  {
    title: 'Resta hasta 20',
    operationType: 'subtraction',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ['M1-NUM-001'],
    config: { minValue: 1, maxValue: 20 }
  },
  {
    title: 'Resta hasta 50',
    operationType: 'subtraction',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ['M1-NUM-001'],
    config: { minValue: 1, maxValue: 50 }
  },
  {
    title: 'Resta hasta 100',
    operationType: 'subtraction',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ['M1-NUM-001'],
    config: { minValue: 1, maxValue: 100 }
  },
  {
    title: 'Resta con Negativos',
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
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001"],

    config: { specificTables: [2], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Tabla del 3',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001"],

    config: { specificTables: [3], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Tabla del 4',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001"],

    config: { specificTables: [4], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Tablas del 6 al 8',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001"],

    config: { specificTables: [6, 7, 8], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Tabla del 9',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001"],

    config: { specificTables: [9], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Multiplicación hasta 20',
    operationType: 'multiplication',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001"],

    config: { minValue: 2, maxValue: 20, numberOfOperands: 2 }
  },
  {
    title: 'Multiplicación de Dos Cifras',
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
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { specificTables: [2, 3, 4, 5], minValue: 1, maxValue: 10 }
  },
  {
    title: 'División Tablas Medias',
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { specificTables: [6, 7, 8, 9], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Todas las Divisiones',
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { minValue: 2, maxValue: 10, numberOfOperands: 2 }
  },
  {
    title: 'División hasta 100',
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { minValue: 2, maxValue: 100 }
  },
  {
    title: 'División de Dos Cifras',
    operationType: 'division',
    phase: 'arithmetic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { minValue: 10, maxValue: 99 }
  },
  {
    title: 'División con Decimales',
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
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction'], minValue: 1, maxValue: 20, numberOfOperands: 3 }
  },
  {
    title: 'Tres Operaciones Básicas',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication'], minValue: 1, maxValue: 20, numberOfOperands: 3 }
  },
  {
    title: 'Cuatro Operaciones',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 20, numberOfOperands: 3 }
  },
  {
    title: 'Operaciones hasta 50',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 3 }
  },
  {
    title: 'Expresiones de Tres Términos',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 3 }
  },
  {
    title: 'Operaciones con Decimales',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 50, numberOfOperands: 4, allowDecimals: true }
  },
  {
    title: 'Maestría Aritmética',
    operationType: 'mixed-arithmetic',
    phase: 'arithmetic',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-NUM-001","M1-NUM-002"],

    config: { mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'], minValue: 1, maxValue: 100, numberOfOperands: 4 }
  },
];
