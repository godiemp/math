/**
 * Operations Help Generator
 * Provides hints, examples, and step-by-step solutions for operations practice
 */

import { OperationLevel } from './operationsPath';

export interface HelpContent {
  hints: string[];
  example: {
    problem: string;
    solution: string[];
    answer: string;
  };
  stepByStep: string[];
  tips: string[];
}

/**
 * Generate help content for a specific problem
 */
export function generateHelpContent(
  levelConfig: OperationLevel,
  problem: {
    expression: string;
    correctAnswer: number | string;
  }
): HelpContent {
  const { operationType } = levelConfig;

  switch (operationType) {
    case 'addition':
      return generateAdditionHelp(problem);
    case 'subtraction':
      return generateSubtractionHelp(problem);
    case 'multiplication':
      return generateMultiplicationHelp(problem);
    case 'division':
      return generateDivisionHelp(problem);
    case 'mixed-arithmetic':
      return generateMixedArithmeticHelp(problem);
    case 'simple-equation':
      return generateEquationHelp(problem);
    case 'expression-evaluation':
      return generateExpressionEvaluationHelp(problem);
    case 'simplification':
      return generateSimplificationHelp(problem);
    case 'comparison':
      return generateComparisonHelp(problem);
    case 'compound-conditions':
      return generateConditionsHelp(problem);
    case 'sets':
      return generateSetsHelp(problem);
    case 'functions':
      return generateFunctionsHelp(problem);
    case 'sorting':
      return generateSortingHelp(problem);
    case 'counting':
      return generateCountingHelp(problem);
    default:
      return generateGenericHelp(problem);
  }
}

// ADDITION HELP
function generateAdditionHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  const match = problem.expression.match(/(\d+)\s*\+\s*(\d+)/);
  if (!match) return generateGenericHelp(problem);

  const [_, a, b] = match;
  const num1 = parseInt(a);
  const num2 = parseInt(b);

  return {
    hints: [
      `Piensa en sumar ${num2} a ${num1}`,
      `Empieza con ${num1} y cuenta hacia arriba ${num2} veces`,
      `La respuesta está entre ${num1} y ${num1 + num2 + 2}`,
    ],
    example: {
      problem: '3 + 2 = ?',
      solution: [
        'Empezamos con 3',
        'Sumamos 2 más',
        'Contamos: 3 → 4 → 5',
      ],
      answer: '5',
    },
    stepByStep: [
      `Empieza con el primer número: ${num1}`,
      `Cuenta hacia arriba ${num2} veces desde ${num1}`,
      `Respuesta: ${num1} + ${num2} = ${problem.correctAnswer}`,
    ],
    tips: [
      'Puedes usar tus dedos para contar',
      'También puedes dibujar círculos o puntos para visualizar',
      'Practica contando objetos a tu alrededor',
    ],
  };
}

// SUBTRACTION HELP
function generateSubtractionHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  const match = problem.expression.match(/(\d+)\s*-\s*(\d+)/);
  if (!match) return generateGenericHelp(problem);

  const [_, a, b] = match;
  const num1 = parseInt(a);
  const num2 = parseInt(b);

  return {
    hints: [
      `Piensa en quitar ${num2} de ${num1}`,
      `Empieza con ${num1} y cuenta hacia atrás ${num2} veces`,
      `¿Cuánto queda si tienes ${num1} y quitas ${num2}?`,
    ],
    example: {
      problem: '7 - 3 = ?',
      solution: [
        'Empezamos con 7',
        'Quitamos 3',
        'Contamos hacia atrás: 7 → 6 → 5 → 4',
      ],
      answer: '4',
    },
    stepByStep: [
      `Empieza con el primer número: ${num1}`,
      `Cuenta hacia atrás ${num2} veces desde ${num1}`,
      `Respuesta: ${num1} - ${num2} = ${problem.correctAnswer}`,
    ],
    tips: [
      'Cuenta hacia atrás con tus dedos',
      'Imagina que tienes objetos y quitas algunos',
      'La resta es lo contrario de la suma',
    ],
  };
}

// MULTIPLICATION HELP
function generateMultiplicationHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  const match = problem.expression.match(/(\d+)\s*[×*]\s*(\d+)/);
  if (!match) return generateGenericHelp(problem);

  const [_, a, b] = match;
  const num1 = parseInt(a);
  const num2 = parseInt(b);

  return {
    hints: [
      `Suma ${num1} un total de ${num2} veces`,
      `Piensa en ${num2} grupos de ${num1}`,
      `¿Cuánto es ${num1} + ${num1} + ${num1}...? (${num2} veces)`,
    ],
    example: {
      problem: '3 × 4 = ?',
      solution: [
        '3 grupos de 4',
        '4 + 4 + 4 = 12',
        'O: 3 veces el número 4',
      ],
      answer: '12',
    },
    stepByStep: [
      `Piensa en ${num2} grupos de ${num1}`,
      `Suma: ${Array(num2).fill(num1).join(' + ')}`,
      `Respuesta: ${num1} × ${num2} = ${problem.correctAnswer}`,
    ],
    tips: [
      'La multiplicación es suma repetida',
      'Practica las tablas de multiplicar',
      'Usa objetos para hacer grupos visuales',
    ],
  };
}

// DIVISION HELP
function generateDivisionHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  const match = problem.expression.match(/(\d+)\s*[÷/]\s*(\d+)/);
  if (!match) return generateGenericHelp(problem);

  const [_, a, b] = match;
  const dividend = parseInt(a);
  const divisor = parseInt(b);

  return {
    hints: [
      `¿Cuántas veces cabe ${divisor} en ${dividend}?`,
      `Divide ${dividend} en ${divisor} grupos iguales`,
      `Piensa: ${divisor} × ? = ${dividend}`,
    ],
    example: {
      problem: '12 ÷ 3 = ?',
      solution: [
        '¿Cuántas veces cabe 3 en 12?',
        '3 + 3 + 3 + 3 = 12',
        'Cabe 4 veces',
      ],
      answer: '4',
    },
    stepByStep: [
      `¿Cuántas veces cabe ${divisor} en ${dividend}?`,
      `Cuenta: ${divisor}, ${divisor * 2}, ${divisor * 3}...`,
      `Respuesta: ${dividend} ÷ ${divisor} = ${problem.correctAnswer}`,
    ],
    tips: [
      'La división es lo contrario de la multiplicación',
      'Puedes usar las tablas de multiplicar',
      'Distribuye objetos en grupos iguales',
    ],
  };
}

// MIXED ARITHMETIC HELP
function generateMixedArithmeticHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Recuerda el orden de operaciones: primero multiplicación/división, luego suma/resta',
      'Resuelve de izquierda a derecha respetando las prioridades',
      'Si hay paréntesis, resuélvelos primero',
    ],
    example: {
      problem: '2 + 3 × 4 = ?',
      solution: [
        'Primero: 3 × 4 = 12',
        'Luego: 2 + 12 = 14',
        'Orden de operaciones es importante',
      ],
      answer: '14',
    },
    stepByStep: [
      'Identifica las operaciones en el orden correcto',
      '1. Multiplicación y división (de izquierda a derecha)',
      '2. Suma y resta (de izquierda a derecha)',
      `Respuesta: ${problem.correctAnswer}`,
    ],
    tips: [
      'PEMDAS: Paréntesis, Exponentes, Multiplicación/División, Suma/Resta',
      'Resuelve paso a paso, no todo a la vez',
      'Escribe cada paso para no confundirte',
    ],
  };
}

// EQUATION HELP
function generateEquationHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Aísla la variable (x) en un lado de la ecuación',
      'Lo que haces a un lado, hazlo al otro lado también',
      'Usa operaciones inversas para despejar x',
    ],
    example: {
      problem: 'x + 5 = 8',
      solution: [
        'Paso 1: Resta 5 de ambos lados',
        'x + 5 - 5 = 8 - 5',
        'x = 3',
      ],
      answer: 'x = 3',
    },
    stepByStep: [
      'Identifica qué operación está con la x',
      'Usa la operación inversa en ambos lados',
      'Simplifica hasta que x esté sola',
      `Respuesta: x = ${problem.correctAnswer}`,
    ],
    tips: [
      'Suma ↔ Resta son operaciones inversas',
      'Multiplicación ↔ División son operaciones inversas',
      'Mantén la ecuación balanceada',
    ],
  };
}

// EXPRESSION EVALUATION HELP
function generateExpressionEvaluationHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Sustituye el valor de la variable en la expresión',
      'Calcula paso a paso después de sustituir',
      'Sigue el orden de operaciones',
    ],
    example: {
      problem: 'Si x = 3, ¿cuánto es 2x + 1?',
      solution: [
        'Paso 1: Sustituye x = 3',
        '2(3) + 1',
        'Paso 2: Calcula: 6 + 1 = 7',
      ],
      answer: '7',
    },
    stepByStep: [
      'Identifica el valor de cada variable',
      'Sustituye los valores en la expresión',
      'Calcula usando el orden de operaciones',
      `Respuesta: ${problem.correctAnswer}`,
    ],
    tips: [
      'Escribe la sustitución antes de calcular',
      'No olvides el orden de operaciones',
      'Revisa que usaste el valor correcto',
    ],
  };
}

// SIMPLIFICATION HELP
function generateSimplificationHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Combina términos semejantes (misma variable)',
      'Suma o resta los coeficientes',
      'Mantén la variable al final',
    ],
    example: {
      problem: '3x + 2x = ?',
      solution: [
        'Ambos términos tienen x',
        'Suma los coeficientes: 3 + 2 = 5',
        'Resultado: 5x',
      ],
      answer: '5x',
    },
    stepByStep: [
      'Identifica términos con la misma variable',
      'Suma o resta sus coeficientes',
      'Escribe el resultado simplificado',
      `Respuesta: ${problem.correctAnswer}`,
    ],
    tips: [
      'Solo puedes combinar términos semejantes',
      '3x y 2y NO se pueden combinar',
      'El resultado debe ser más simple',
    ],
  };
}

// COMPARISON HELP
function generateComparisonHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Calcula ambos lados si es necesario',
      'Compara los valores',
      'Recuerda: < significa menor, > significa mayor',
    ],
    example: {
      problem: '¿5 > 3?',
      solution: [
        '5 está a la derecha de 3 en la recta numérica',
        '5 es mayor que 3',
        'La comparación es Verdadera',
      ],
      answer: 'Verdadero',
    },
    stepByStep: [
      'Evalúa el lado izquierdo',
      'Evalúa el lado derecho',
      'Compara los valores',
      `Respuesta: ${problem.correctAnswer}`,
    ],
    tips: [
      'Usa una recta numérica para visualizar',
      'El símbolo "come" al número más grande',
      'Números negativos son menores que positivos',
    ],
  };
}

// CONDITIONS HELP
function generateConditionsHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Evalúa cada condición por separado',
      'AND requiere que AMBAS sean verdaderas',
      'OR requiere que AL MENOS UNA sea verdadera',
    ],
    example: {
      problem: 'Si x = 5, ¿cumple x > 3 AND x < 10?',
      solution: [
        'Condición 1: 5 > 3 ✓ (Verdadero)',
        'Condición 2: 5 < 10 ✓ (Verdadero)',
        'AND: Ambas verdaderas = Verdadero',
      ],
      answer: 'Verdadero',
    },
    stepByStep: [
      'Sustituye el valor de la variable',
      'Evalúa cada condición individualmente',
      'Aplica el operador lógico (AND/OR/NOT)',
      `Respuesta: ${problem.correctAnswer}`,
    ],
    tips: [
      'AND: todas deben ser verdaderas',
      'OR: al menos una debe ser verdadera',
      'NOT: invierte el valor',
    ],
  };
}

// SETS HELP
function generateSetsHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Identifica la operación de conjuntos',
      'Unión (∪): combina todos los elementos',
      'Intersección (∩): solo elementos comunes',
    ],
    example: {
      problem: '{1, 2} ∪ {2, 3} = ?',
      solution: [
        'Unión combina ambos conjuntos',
        'Elementos: 1, 2, 3',
        'Sin repetir: {1, 2, 3}',
      ],
      answer: '{1, 2, 3}',
    },
    stepByStep: [
      'Identifica los conjuntos',
      'Aplica la operación correspondiente',
      'Elimina elementos duplicados',
      `Respuesta: ${problem.correctAnswer}`,
    ],
    tips: [
      '∪ (unión): todos los elementos',
      '∩ (intersección): solo comunes',
      '- (diferencia): del primero que no están en el segundo',
    ],
  };
}

// FUNCTIONS HELP
function generateFunctionsHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Sustituye el valor en lugar de la variable',
      'Calcula la expresión paso a paso',
      'Sigue el orden de operaciones',
    ],
    example: {
      problem: 'f(x) = x + 2, f(3) = ?',
      solution: [
        'Sustituye x = 3 en la función',
        'f(3) = 3 + 2',
        'f(3) = 5',
      ],
      answer: '5',
    },
    stepByStep: [
      'Identifica el valor de entrada',
      'Sustituye en la función',
      'Calcula el resultado',
      `Respuesta: ${problem.correctAnswer}`,
    ],
    tips: [
      'La función es como una máquina: entrada → proceso → salida',
      'Sustituye con cuidado',
      'No olvides el orden de operaciones',
    ],
  };
}

// SORTING HELP
function generateSortingHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Compara los números de dos en dos',
      'El más pequeño va primero (orden ascendente)',
      'Ordena de menor a mayor',
    ],
    example: {
      problem: 'Ordena: [3, 1, 2]',
      solution: [
        'Encuentra el más pequeño: 1',
        'Luego el siguiente: 2',
        'Y el último: 3',
      ],
      answer: '[1, 2, 3]',
    },
    stepByStep: [
      'Encuentra el número más pequeño',
      'Encuentra el siguiente más pequeño',
      'Continúa hasta ordenar todos',
      `Respuesta: ${problem.correctAnswer}`,
    ],
    tips: [
      'Busca primero el más pequeño',
      'Usa una recta numérica si ayuda',
      'Verifica que no falte ningún número',
    ],
  };
}

// COUNTING HELP
function generateCountingHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Lee la pregunta con cuidado',
      'Identifica la condición (pares, impares, mayores que...)',
      'Cuenta solo los que cumplen la condición',
    ],
    example: {
      problem: '¿Cuántos pares en [1, 2, 3, 4]?',
      solution: [
        'Pares son números divisibles entre 2',
        'En la lista: 2 y 4 son pares',
        'Total: 2 números pares',
      ],
      answer: '2',
    },
    stepByStep: [
      'Lee qué tipo de números debes contar',
      'Revisa cada número uno por uno',
      'Cuenta los que cumplen la condición',
      `Respuesta: ${problem.correctAnswer}`,
    ],
    tips: [
      'Marca los números que cuentas',
      'Verifica la condición para cada uno',
      'No cuentes el mismo número dos veces',
    ],
  };
}

// GENERIC HELP (fallback)
function generateGenericHelp(problem: { expression: string; correctAnswer: number | string }): HelpContent {
  return {
    hints: [
      'Lee el problema con cuidado',
      'Identifica qué operación necesitas usar',
      'Resuelve paso a paso',
    ],
    example: {
      problem: 'Ejemplo general',
      solution: [
        'Lee el problema',
        'Identifica la operación',
        'Calcula el resultado',
      ],
      answer: 'Resultado',
    },
    stepByStep: [
      'Lee el problema cuidadosamente',
      'Identifica los números y operaciones',
      'Calcula paso a paso',
      `Respuesta: ${problem.correctAnswer}`,
    ],
    tips: [
      'Tómate tu tiempo para entender',
      'Escribe los pasos intermedios',
      'Verifica tu respuesta al final',
    ],
  };
}
