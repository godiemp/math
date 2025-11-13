import { OperationLevelDefinition } from '../types';

/**
 * PHASE 4: OPERACIONES ESTRUCTURALES (Levels 81-100)
 * Sets and functions
 */
export const structuralLevels: OperationLevelDefinition[] = [
  // Conjuntos (81-90)
  {
    title: 'Unión de Conjuntos',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 2, operators: ['∪'], minValue: 1, maxValue: 5 }
  },
  {
    title: 'Intersección de Conjuntos',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 3, operators: ['∩'], minValue: 1, maxValue: 5 }
  },
  {
    title: 'Diferencia de Conjuntos',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 3, operators: ['-'], minValue: 1, maxValue: 5 }
  },
  {
    title: 'Pertenencia a Conjunto',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 4, operators: ['∈'], minValue: 1, maxValue: 5 }
  },
  {
    title: 'Cardinalidad',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 5, operators: ['|'], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Subconjuntos',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 3, operators: ['⊆'], minValue: 1, maxValue: 5 }
  },
  {
    title: 'Unión e Intersección',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 3, operators: ['∪', '∩'], minValue: 1, maxValue: 5 }
  },
  {
    title: 'Complemento',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 5, operators: ['\''], minValue: 1, maxValue: 10 }
  },
  {
    title: 'Producto Cartesiano',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 2, operators: ['×'], minValue: 1, maxValue: 3 }
  },
  {
    title: 'Operaciones Mixtas de Conjuntos',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 4, operators: ['∪', '∩', '-'], minValue: 1, maxValue: 5 }
  },

  // Funciones (91-100)
  {
    title: 'Secuencia Aritmética (+n)',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, sequenceType: '+n',}
  },
  {
    title: 'Secuencia Decreciente (-n)',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, sequenceType: '-n',}
  },
  {
    title: 'Secuencia Geométrica (*n)',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, sequenceType: '*n',}
  },
  {
    title: 'Secuencia de Cuadrados',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, sequenceType: 'squares',}
  },
  {
    title: 'Fibonacci',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, sequenceType: 'fibonacci', sequenceLength: 6,}
  },
  {
    title: 'Función f(x)=x+a',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, functionType: 'x+a',}
  },
  {
    title: 'Función f(x)=ax',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, functionType: 'ax',}
  },
  {
    title: 'Composición de Funciones',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, functionType: 'ax+b',}
  },
  {
    title: 'Función Inversa',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, functionType: 'x²',}
  },
  {
    title: 'Funciones Complejas',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, functionType: 'x²+y²' }
  },
];
