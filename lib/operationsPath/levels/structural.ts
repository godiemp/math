import { OperationLevel } from '../types';

/**
 * PHASE 4: OPERACIONES ESTRUCTURALES (Levels 81-100)
 * Sets and functions
 */
export const structuralLevels: OperationLevel[] = [
  // Conjuntos (81-90)
  {
    level: 81,
    title: 'Unión de Conjuntos',
    description: '{1,2} ∪ {2,3} = ?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 2, operators: ['∪'], minValue: 1, maxValue: 5 }
  },
  {
    level: 82,
    title: 'Intersección de Conjuntos',
    description: '{1,2,3} ∩ {2,3,4} = ?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 3, operators: ['∩'], minValue: 1, maxValue: 5 }
  },
  {
    level: 83,
    title: 'Diferencia de Conjuntos',
    description: '{1,2,3} - {2,4} = ?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 3, operators: ['-'], minValue: 1, maxValue: 5 }
  },
  {
    level: 84,
    title: 'Pertenencia a Conjunto',
    description: '¿3 ∈ {1,2,3,4}?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 4, operators: ['∈'], minValue: 1, maxValue: 5 }
  },
  {
    level: 85,
    title: 'Cardinalidad',
    description: '|{1,2,3,4,5}| = ?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 5, operators: ['|'], minValue: 1, maxValue: 10 }
  },
  {
    level: 86,
    title: 'Subconjuntos',
    description: '¿{1,2} ⊆ {1,2,3}?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 3, operators: ['⊆'], minValue: 1, maxValue: 5 }
  },
  {
    level: 87,
    title: 'Unión e Intersección',
    description: '({1,2} ∪ {3}) ∩ {2,3}',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 3, operators: ['∪', '∩'], minValue: 1, maxValue: 5 }
  },
  {
    level: 88,
    title: 'Complemento',
    description: 'Si U={1,2,3,4,5}, A={1,2}, A\' = ?',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 5, operators: ['\''], minValue: 1, maxValue: 10 }
  },
  {
    level: 89,
    title: 'Producto Cartesiano',
    description: '{1,2} × {a,b}',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 2, operators: ['×'], minValue: 1, maxValue: 3 }
  },
  {
    level: 90,
    title: 'Operaciones Mixtas de Conjuntos',
    description: '(A ∪ B) ∩ (A - C)',
    operationType: 'sets',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-PROB-004"],

    config: { setSize: 4, operators: ['∪', '∩', '-'], minValue: 1, maxValue: 5 }
  },

  // Funciones (91-100)
  {
    level: 91,
    title: 'Secuencia Aritmética (+n)',
    description: 'Continúa: 2, 4, 6, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, sequenceType: '+n',}
  },
  {
    level: 92,
    title: 'Secuencia Decreciente (-n)',
    description: 'Continúa: 10, 8, 6, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, sequenceType: '-n',}
  },
  {
    level: 93,
    title: 'Secuencia Geométrica (*n)',
    description: 'Continúa: 2, 4, 8, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'basic',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, sequenceType: '*n',}
  },
  {
    level: 94,
    title: 'Secuencia de Cuadrados',
    description: 'Continúa: 1, 4, 9, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, sequenceType: 'squares',}
  },
  {
    level: 95,
    title: 'Fibonacci',
    description: 'Continúa: 1, 1, 2, 3, 5, 8, __',
    operationType: 'sequences',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, sequenceType: 'fibonacci', sequenceLength: 6,}
  },
  {
    level: 96,
    title: 'Función f(x)=x+a',
    description: 'f(x)=x+3, f(5)=?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, functionType: 'x+a',}
  },
  {
    level: 97,
    title: 'Función f(x)=ax',
    description: 'f(x)=3x, f(4)=?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'intermediate',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, functionType: 'ax',}
  },
  {
    level: 98,
    title: 'Composición de Funciones',
    description: 'f(x)=x+1, g(x)=2x, f(g(3))=?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, functionType: 'ax+b',}
  },
  {
    level: 99,
    title: 'Función Inversa',
    description: 'Si f(x)=2x, ¿f⁻¹(6)=?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'advanced',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x'], minValue: 1, maxValue: 10, functionType: 'x²',}
  },
  {
    level: 100,
    title: 'Funciones Complejas',
    description: 'f(x,y)=x²+y², f(3,4)=?',
    operationType: 'functions',
    phase: 'structural',
    difficulty: 'expert',
    problemsToComplete: 3,
    thematicUnits: ["M1-ALG-009","M1-ALG-012"],

    config: { variables: ['x', 'y'], minValue: 1, maxValue: 10, functionType: 'x²+y²' }
  },
];
