/**
 * Goal Library
 *
 * Defines the types of reasoning and question goals that can be used
 * in the QGen algorithm. Goals determine what kind of thinking the
 * student must perform.
 */

import { Goal } from '../types/core';

/**
 * Goal library - collection of question goals/reasoning types
 */
export const goalLibrary: Goal[] = [
  // ============================================================================
  // COMPUTE - Perform calculations
  // ============================================================================
  {
    id: 'goal-compute-basic',
    name: 'Calcular valor básico',
    description: 'Calcular un valor usando operaciones aritméticas básicas',
    type: 'compute',
    cognitiveLevel: 'apply',
    createdAt: Date.now(),
  },
  {
    id: 'goal-compute-percentage',
    name: 'Calcular porcentaje',
    description: 'Calcular el porcentaje de una cantidad',
    type: 'compute',
    cognitiveLevel: 'apply',
    createdAt: Date.now(),
  },
  {
    id: 'goal-compute-reverse-percentage',
    name: 'Calcular valor original desde porcentaje',
    description: 'Encontrar el valor original conociendo el resultado después de aplicar un porcentaje',
    type: 'compute',
    cognitiveLevel: 'apply',
    createdAt: Date.now(),
  },
  {
    id: 'goal-compute-proportion',
    name: 'Resolver proporción',
    description: 'Resolver un problema de proporcionalidad directa o inversa',
    type: 'compute',
    cognitiveLevel: 'apply',
    createdAt: Date.now(),
  },
  {
    id: 'goal-compute-area',
    name: 'Calcular área',
    description: 'Calcular el área de una figura geométrica',
    type: 'compute',
    cognitiveLevel: 'apply',
    createdAt: Date.now(),
  },
  {
    id: 'goal-compute-perimeter',
    name: 'Calcular perímetro',
    description: 'Calcular el perímetro de una figura geométrica',
    type: 'compute',
    cognitiveLevel: 'apply',
    createdAt: Date.now(),
  },
  {
    id: 'goal-compute-pythagorean',
    name: 'Aplicar teorema de Pitágoras',
    description: 'Usar el teorema de Pitágoras para encontrar un lado desconocido',
    type: 'compute',
    cognitiveLevel: 'apply',
    createdAt: Date.now(),
  },

  // ============================================================================
  // COMPARE - Compare values
  // ============================================================================
  {
    id: 'goal-compare-values',
    name: 'Comparar valores',
    description: 'Determinar cuál de dos o más valores es mayor, menor, o si son iguales',
    type: 'compare',
    cognitiveLevel: 'analyze',
    createdAt: Date.now(),
  },
  {
    id: 'goal-compare-expressions',
    name: 'Comparar expresiones algebraicas',
    description: 'Comparar el valor de diferentes expresiones algebraicas',
    type: 'compare',
    cognitiveLevel: 'analyze',
    createdAt: Date.now(),
  },
  {
    id: 'goal-compare-options',
    name: 'Comparar opciones',
    description: 'Comparar diferentes opciones para tomar la mejor decisión',
    type: 'compare',
    cognitiveLevel: 'evaluate',
    createdAt: Date.now(),
  },

  // ============================================================================
  // JUSTIFY - Explain or prove
  // ============================================================================
  {
    id: 'goal-justify-result',
    name: 'Justificar resultado',
    description: 'Explicar por qué un resultado es correcto',
    type: 'justify',
    cognitiveLevel: 'evaluate',
    createdAt: Date.now(),
  },
  {
    id: 'goal-justify-method',
    name: 'Justificar método',
    description: 'Explicar qué método o procedimiento usar y por qué',
    type: 'justify',
    cognitiveLevel: 'evaluate',
    createdAt: Date.now(),
  },

  // ============================================================================
  // MODEL - Create mathematical model
  // ============================================================================
  {
    id: 'goal-model-equation',
    name: 'Modelar con ecuación',
    description: 'Crear una ecuación que modele una situación real',
    type: 'model',
    cognitiveLevel: 'create',
    createdAt: Date.now(),
  },
  {
    id: 'goal-model-function',
    name: 'Modelar con función',
    description: 'Crear una función que modele una situación real',
    type: 'model',
    cognitiveLevel: 'create',
    createdAt: Date.now(),
  },
  {
    id: 'goal-model-expression',
    name: 'Modelar con expresión',
    description: 'Crear una expresión algebraica que represente una situación',
    type: 'model',
    cognitiveLevel: 'create',
    createdAt: Date.now(),
  },

  // ============================================================================
  // INTERPRET - Interpret results or representations
  // ============================================================================
  {
    id: 'goal-interpret-graph',
    name: 'Interpretar gráfico',
    description: 'Extraer información de un gráfico',
    type: 'interpret',
    cognitiveLevel: 'understand',
    createdAt: Date.now(),
  },
  {
    id: 'goal-interpret-table',
    name: 'Interpretar tabla',
    description: 'Extraer información de una tabla de datos',
    type: 'interpret',
    cognitiveLevel: 'understand',
    createdAt: Date.now(),
  },
  {
    id: 'goal-interpret-result',
    name: 'Interpretar resultado',
    description: 'Entender el significado de un resultado en el contexto del problema',
    type: 'interpret',
    cognitiveLevel: 'understand',
    createdAt: Date.now(),
  },

  // ============================================================================
  // ANALYZE - Break down complex problems
  // ============================================================================
  {
    id: 'goal-analyze-steps',
    name: 'Analizar pasos',
    description: 'Identificar los pasos necesarios para resolver un problema',
    type: 'analyze',
    cognitiveLevel: 'analyze',
    createdAt: Date.now(),
  },
  {
    id: 'goal-analyze-patterns',
    name: 'Analizar patrones',
    description: 'Identificar patrones en datos o secuencias',
    type: 'analyze',
    cognitiveLevel: 'analyze',
    createdAt: Date.now(),
  },
  {
    id: 'goal-analyze-relationship',
    name: 'Analizar relación',
    description: 'Determinar la relación entre diferentes cantidades',
    type: 'analyze',
    cognitiveLevel: 'analyze',
    createdAt: Date.now(),
  },
];

/**
 * Get goals by type
 */
export function getGoalsByType(type: string): Goal[] {
  return goalLibrary.filter((goal) => goal.type === type);
}

/**
 * Get goals by cognitive level
 */
export function getGoalsByCognitiveLevel(level: string): Goal[] {
  return goalLibrary.filter((goal) => goal.cognitiveLevel === level);
}

/**
 * Get goal by ID
 */
export function getGoalById(id: string): Goal | undefined {
  return goalLibrary.find((goal) => goal.id === id);
}

/**
 * Get goals sorted by cognitive complexity (simple to complex)
 */
export function getGoalsByComplexity(): Goal[] {
  const levelOrder = ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'];
  return [...goalLibrary].sort((a, b) => {
    return levelOrder.indexOf(a.cognitiveLevel) - levelOrder.indexOf(b.cognitiveLevel);
  });
}
