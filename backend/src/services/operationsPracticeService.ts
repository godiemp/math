/**
 * Operations Practice Service
 * Generates and validates operation problems based on level configuration
 */

import { OperationLevel, OperationType } from '../config/operationsPath';

export interface OperationProblem {
  expression: string;
  expressionLatex: string;
  answer: number | string | string[]; // Support for multiple choice, array answers, etc.
  operands: number[];
  operations: OperationType[];
  difficulty: string;
  answerType?: 'number' | 'string' | 'multipleChoice' | 'array'; // Type of answer expected
  choices?: string[]; // For multiple choice questions
  metadata?: Record<string, any>; // Additional problem-specific data
}

/**
 * Generate a random number within range, optionally as decimal
 */
function randomNumber(min: number, max: number, allowDecimals: boolean = false): number {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (allowDecimals && Math.random() > 0.5) {
    const decimal = Math.floor(Math.random() * 10);
    return parseFloat(`${num}.${decimal}`);
  }
  return num;
}

/**
 * Round to 1 decimal place
 */
function roundToOneDecimal(num: number): number {
  return Math.round(num * 10) / 10;
}

/**
 * Generate a problem for a specific level
 */
export function generateProblem(levelConfig: OperationLevel): OperationProblem {
  const { operationType, config } = levelConfig;

  // Arithmetic operations (Phase 1)
  if (operationType === 'mixed-arithmetic') {
    return generateMixedProblem(levelConfig);
  }

  switch (operationType) {
    // Arithmetic
    case 'addition':
      return generateAdditionProblem(levelConfig);
    case 'subtraction':
      return generateSubtractionProblem(levelConfig);
    case 'multiplication':
      return generateMultiplicationProblem(levelConfig);
    case 'division':
      return generateDivisionProblem(levelConfig);

    // Algebraic (Phase 2)
    case 'simple-equation':
      return generateSimpleEquationProblem(levelConfig);
    case 'expression-evaluation':
      return generateExpressionEvaluationProblem(levelConfig);
    case 'simplification':
      return generateSimplificationProblem(levelConfig);

    // Logical (Phase 3)
    case 'comparison':
      return generateComparisonProblem(levelConfig);
    case 'logical-operators':
      return generateLogicalOperatorsProblem(levelConfig);
    case 'compound-conditions':
      return generateCompoundConditionsProblem(levelConfig);

    // Structural (Phase 4)
    case 'sequences':
      return generateSequenceProblem(levelConfig);
    case 'sets':
      return generateSetsProblem(levelConfig);
    case 'functions':
      return generateFunctionsProblem(levelConfig);

    // Algorithmic (Phase 5)
    case 'sorting':
      return generateSortingProblem(levelConfig);
    case 'counting':
      return generateCountingProblem(levelConfig);
    case 'composition':
      return generateCompositionProblem(levelConfig);

    default:
      throw new Error(`Unknown operation type: ${operationType}`);
  }
}

/**
 * Generate an addition problem
 */
function generateAdditionProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const numOperands = config.numberOfOperands || 2;
  const operands: number[] = [];

  for (let i = 0; i < numOperands; i++) {
    operands.push(randomNumber(config.minValue!, config.maxValue!, config.allowDecimals));
  }

  const answer = config.allowDecimals
    ? roundToOneDecimal(operands.reduce((sum, n) => sum + n, 0))
    : operands.reduce((sum, n) => sum + n, 0);

  const expression = operands.join(' + ');
  const expressionLatex = operands.join(' + ');

  return {
    expression,
    expressionLatex,
    answer,
    operands,
    operations: ['addition'],
    difficulty: levelConfig.difficulty
  };
}

/**
 * Generate a subtraction problem
 */
function generateSubtractionProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const allowNegatives = config.allowNegatives || false;
  const forceNegative = config.forceNegative || false;

  let num1: number;
  let num2: number;

  if (forceNegative) {
    // Force negative result: ensure num2 > num1
    const a = randomNumber(config.minValue!, config.maxValue!, config.allowDecimals);
    const b = randomNumber(config.minValue!, config.maxValue!, config.allowDecimals);
    // Ensure b > a for negative result
    if (b > a) {
      num1 = a;
      num2 = b;
    } else {
      num1 = b;
      num2 = a;
    }
    // Edge case: if they're equal, regenerate num2 to be larger
    if (num1 === num2) {
      num2 = randomNumber(num1 + 1, config.maxValue!, config.allowDecimals);
    }
  } else if (allowNegatives) {
    // Allow negative results: both random
    num1 = randomNumber(config.minValue!, config.maxValue!, config.allowDecimals);
    num2 = randomNumber(config.minValue!, config.maxValue!, config.allowDecimals);
  } else {
    // No negatives: ensure num2 <= num1
    const a = randomNumber(config.minValue!, config.maxValue!, config.allowDecimals);
    const b = randomNumber(config.minValue!, config.maxValue!, config.allowDecimals);
    if (b > a) {
      num1 = b;
      num2 = a;
    } else {
      num1 = a;
      num2 = b;
    }
  }

  const answer = config.allowDecimals
    ? roundToOneDecimal(num1 - num2)
    : num1 - num2;

  const expression = `${num1} - ${num2}`;
  const expressionLatex = `${num1} - ${num2}`;

  return {
    expression,
    expressionLatex,
    answer,
    operands: [num1, num2],
    operations: ['subtraction'],
    difficulty: levelConfig.difficulty
  };
}

/**
 * Generate a multiplication problem
 */
function generateMultiplicationProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  let num1: number, num2: number;

  if (config.specificTables && config.specificTables.length > 0) {
    // Use specific multiplication tables
    const table = config.specificTables[Math.floor(Math.random() * config.specificTables.length)];
    const multiplier = randomNumber(config.minValue || 1, config.maxValue || 10);
    num1 = table;
    num2 = multiplier;
    if (Math.random() > 0.5) {
      [num1, num2] = [num2, num1]; // Randomly swap order
    }
  } else {
    // General multiplication
    num1 = randomNumber(config.minValue!, config.maxValue!, config.allowDecimals);
    num2 = randomNumber(config.minValue!, config.maxValue!, config.allowDecimals);
  }

  const answer = config.allowDecimals
    ? roundToOneDecimal(num1 * num2)
    : num1 * num2;

  const expression = `${num1} × ${num2}`;
  const expressionLatex = `${num1} \\times ${num2}`;

  return {
    expression,
    expressionLatex,
    answer,
    operands: [num1, num2],
    operations: ['multiplication'],
    difficulty: levelConfig.difficulty
  };
}

/**
 * Generate a division problem
 */
function generateDivisionProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  let divisor: number, quotient: number, dividend: number;

  if (config.specificTables && config.specificTables.length > 0) {
    // Use specific division tables (inverse of multiplication tables)
    const table = config.specificTables[Math.floor(Math.random() * config.specificTables.length)];
    divisor = table;
    // Constrain quotient so dividend doesn't exceed maxValue
    const maxQuotient = Math.floor((config.maxValue || 10) / divisor);
    const minQuotient = Math.max(1, Math.ceil((config.minValue || 1) / divisor));
    quotient = randomNumber(minQuotient, Math.max(minQuotient, maxQuotient));
    dividend = divisor * quotient;
  } else if (config.allowDecimals) {
    // Division with decimal results
    divisor = randomNumber(2, config.maxValue || 20);
    dividend = randomNumber(config.minValue!, config.maxValue!);
    quotient = roundToOneDecimal(dividend / divisor);
  } else {
    // Generate exact division
    const minDivisor = Math.max(2, config.minValue || 2);
    const maxDivisor = Math.min(12, config.maxValue || 12);
    divisor = randomNumber(minDivisor, maxDivisor);
    const minQuotient = Math.max(1, Math.ceil((config.minValue || 1) / divisor));
    const maxQuotient = Math.floor((config.maxValue || 100) / divisor);
    quotient = randomNumber(minQuotient, Math.max(minQuotient, maxQuotient));
    dividend = divisor * quotient;
  }

  const answer = config.allowDecimals ? roundToOneDecimal(dividend / divisor) : quotient;
  const expression = `${dividend} ÷ ${divisor}`;
  const expressionLatex = `${dividend} \\div ${divisor}`;

  return {
    expression,
    expressionLatex,
    answer,
    operands: [dividend, divisor],
    operations: ['division'],
    difficulty: levelConfig.difficulty
  };
}

/**
 * Generate a mixed operations problem
 */
function generateMixedProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const numOperands = config.numberOfOperands || 2;
  const availableOps = config.mixedOperations || ['addition', 'subtraction', 'multiplication', 'division'];

  const operands: number[] = [];
  const operations: OperationType[] = [];

  // Generate operands
  for (let i = 0; i < numOperands; i++) {
    operands.push(randomNumber(config.minValue!, config.maxValue!, config.allowDecimals));
  }

  // Generate operations (one less than operands)
  for (let i = 0; i < numOperands - 1; i++) {
    operations.push(availableOps[Math.floor(Math.random() * availableOps.length)]);
  }

  // Build expression and calculate answer
  let expressionParts: string[] = [];
  let latexParts: string[] = [];
  let currentValue = operands[0];

  expressionParts.push(operands[0].toString());
  latexParts.push(operands[0].toString());

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const nextOperand = operands[i + 1];

    let opSymbol = '';
    let latexOpSymbol = '';

    switch (op) {
      case 'addition':
        opSymbol = '+';
        latexOpSymbol = '+';
        currentValue += nextOperand;
        break;
      case 'subtraction':
        opSymbol = '-';
        latexOpSymbol = '-';
        currentValue -= nextOperand;
        break;
      case 'multiplication':
        opSymbol = '×';
        latexOpSymbol = '\\times';
        currentValue *= nextOperand;
        break;
      case 'division':
        opSymbol = '÷';
        latexOpSymbol = '\\div';
        currentValue /= nextOperand;
        break;
    }

    expressionParts.push(opSymbol, nextOperand.toString());
    latexParts.push(latexOpSymbol, nextOperand.toString());
  }

  const answer = config.allowDecimals ? roundToOneDecimal(currentValue) : Math.round(currentValue);
  const expression = expressionParts.join(' ');
  const expressionLatex = latexParts.join(' ');

  return {
    expression,
    expressionLatex,
    answer,
    operands,
    operations: ['mixed-arithmetic', ...operations],
    difficulty: levelConfig.difficulty,
    answerType: 'number'
  };
}

// ============================================================================
// ALGEBRAIC OPERATIONS (Phase 2)
// ============================================================================

/**
 * Generate a simple equation problem (x + a = b, x - a = b, ax = b, x/a = b)
 */
function generateSimpleEquationProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const variables = config.variables || ['x'];
  const variable = variables[0];

  // Randomly choose equation type
  const types = ['addition', 'subtraction', 'multiplication', 'division', 'linear-add', 'linear-sub'];
  const type = types[Math.floor(Math.random() * types.length)];

  const minVal = config.minValue || 1;
  const maxVal = config.maxValue || 20;

  let expression: string = '';
  let expressionLatex: string = '';
  let answer: number = 0;
  let a: number = 0;
  let b: number = 0;
  let c: number = 0;

  switch (type) {
    case 'addition': // x + a = b
      answer = randomNumber(minVal, maxVal);
      a = randomNumber(minVal, Math.floor((maxVal - answer) / 2));
      b = answer + a;
      expression = `${variable} + ${a} = ${b}`;
      expressionLatex = `${variable} + ${a} = ${b}`;
      break;

    case 'subtraction': // x - a = b
      answer = randomNumber(Math.max(minVal * 2, minVal + 1), maxVal);
      const maxA = Math.min(maxVal, answer - minVal);
      a = randomNumber(minVal, maxA);
      b = answer - a;
      expression = `${variable} - ${a} = ${b}`;
      expressionLatex = `${variable} - ${a} = ${b}`;
      break;

    case 'multiplication': // ax = b
      a = randomNumber(Math.max(2, minVal), Math.min(12, maxVal));
      const maxAnswer = Math.floor(maxVal / a);
      answer = randomNumber(Math.max(1, minVal), maxAnswer);
      b = a * answer;
      expression = `${a}${variable} = ${b}`;
      expressionLatex = `${a}${variable} = ${b}`;
      break;

    case 'division': // x/a = b
      a = randomNumber(Math.max(2, minVal), Math.min(10, maxVal));
      b = randomNumber(Math.max(1, minVal), Math.floor(maxVal / a));
      answer = a * b;
      expression = `${variable}/${a} = ${b}`;
      expressionLatex = `\\frac{${variable}}{${a}} = ${b}`;
      break;

    case 'linear-add': { // ax + b = c
      const coeff = randomNumber(Math.max(2, minVal), Math.min(10, maxVal));
      answer = randomNumber(Math.max(1, minVal), Math.floor((maxVal - minVal) / coeff));
      const constant = randomNumber(minVal, Math.min(maxVal, maxVal - coeff * answer));
      c = coeff * answer + constant;
      expression = `${coeff}${variable} + ${constant} = ${c}`;
      expressionLatex = `${coeff}${variable} + ${constant} = ${c}`;
      a = coeff;
      b = constant;
      break;
    }

    case 'linear-sub': { // ax - b = c
      const coeff = randomNumber(Math.max(2, minVal), Math.min(10, maxVal));
      answer = randomNumber(Math.max(1, minVal), Math.floor(maxVal / coeff));
      const constant = randomNumber(minVal, Math.min(maxVal, coeff * answer - minVal));
      c = coeff * answer - constant;
      expression = `${coeff}${variable} - ${constant} = ${c}`;
      expressionLatex = `${coeff}${variable} - ${constant} = ${c}`;
      a = coeff;
      b = constant;
      break;
    }
  }

  // For linear equations, include all coefficients as operands
  const operands = (type === 'linear-add' || type === 'linear-sub') ? [a, b, c] : [a, b];

  return {
    expression: `Resuelve para ${variable}: ${expression}`,
    expressionLatex: `\\text{Resuelve para } ${variable}: ${expressionLatex}`,
    answer,
    operands,
    operations: ['simple-equation'],
    difficulty: levelConfig.difficulty,
    answerType: 'number',
    metadata: { variable, equationType: type }
  };
}

/**
 * Generate an expression evaluation problem (evaluate 2x + 3 when x = 5)
 */
function generateExpressionEvaluationProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const minVal = config.minValue || 1;
  const maxVal = config.maxValue || 10;

  const variable = 'x';
  const varValue = randomNumber(minVal, maxVal);
  const coeff = randomNumber(2, 10);
  const constant = randomNumber(minVal, maxVal);

  // Randomly choose expression type
  const types = ['linear-add', 'linear-sub', 'simple-mult', 'complex'];
  const type = types[Math.floor(Math.random() * Math.min(types.length, config.complexity || 2))];

  let expression: string = '';
  let expressionLatex: string = '';
  let answer: number = 0;

  switch (type) {
    case 'linear-add': // 2x + 3
      expression = `${coeff}${variable} + ${constant}`;
      expressionLatex = `${coeff}${variable} + ${constant}`;
      answer = coeff * varValue + constant;
      break;

    case 'linear-sub': // 2x - 3
      expression = `${coeff}${variable} - ${constant}`;
      expressionLatex = `${coeff}${variable} - ${constant}`;
      answer = coeff * varValue - constant;
      break;

    case 'simple-mult': // 3(x + 2)
      expression = `${coeff}(${variable} + ${constant})`;
      expressionLatex = `${coeff}(${variable} + ${constant})`;
      answer = coeff * (varValue + constant);
      break;

    case 'complex': // 2x + 3(x - 1)
      const coeff2 = randomNumber(2, 5);
      const constant2 = randomNumber(1, 5);
      expression = `${coeff}${variable} + ${coeff2}(${variable} - ${constant2})`;
      expressionLatex = `${coeff}${variable} + ${coeff2}(${variable} - ${constant2})`;
      answer = coeff * varValue + coeff2 * (varValue - constant2);
      break;

    default:
      expression = `${coeff}${variable}`;
      expressionLatex = `${coeff}${variable}`;
      answer = coeff * varValue;
  }

  return {
    expression: `Evalúa ${expression} cuando ${variable} = ${varValue}`,
    expressionLatex: `\\text{Evalúa } ${expressionLatex} \\text{ cuando } ${variable} = ${varValue}`,
    answer,
    operands: [coeff, constant, varValue],
    operations: ['expression-evaluation'],
    difficulty: levelConfig.difficulty,
    answerType: 'number',
    metadata: { variable, varValue, expressionType: type }
  };
}

/**
 * Generate a simplification problem (simplify 3x + 2x, 5(2 + x), etc.)
 */
function generateSimplificationProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const minVal = config.minValue || 1;
  const maxVal = config.maxValue || 10;

  const types = ['like-terms', 'distributive', 'combine'];
  const type = types[Math.floor(Math.random() * types.length)];

  let expression: string = '';
  let expressionLatex: string = '';
  let answer: string = '';

  const variable = 'x';

  switch (type) {
    case 'like-terms': { // 3x + 2x = 5x
      const a = randomNumber(minVal, maxVal);
      const b = randomNumber(minVal, maxVal);
      const sum = a + b;
      expression = `${a}${variable} + ${b}${variable}`;
      expressionLatex = `${a}${variable} + ${b}${variable}`;
      answer = `${sum}${variable}`;
      break;
    }

    case 'distributive': { // 5(2 + x) = 10 + 5x
      const factor = randomNumber(2, 10);
      const constant = randomNumber(minVal, maxVal);
      const product = factor * constant;
      expression = `${factor}(${constant} + ${variable})`;
      expressionLatex = `${factor}(${constant} + ${variable})`;
      answer = `${product} + ${factor}${variable}`;
      break;
    }

    case 'combine': { // 2x + 3 + 4x = 6x + 3
      const a = randomNumber(minVal, maxVal);
      const b = randomNumber(minVal, maxVal);
      const c = randomNumber(minVal, maxVal);
      const sum = a + b;
      expression = `${a}${variable} + ${c} + ${b}${variable}`;
      expressionLatex = `${a}${variable} + ${c} + ${b}${variable}`;
      answer = `${sum}${variable} + ${c}`;
      break;
    }

    default:
      expression = '';
      expressionLatex = '';
      answer = '';
  }

  return {
    expression: `Simplifica: ${expression}`,
    expressionLatex: `\\text{Simplifica: } ${expressionLatex}`,
    answer,
    operands: [],
    operations: ['simplification'],
    difficulty: levelConfig.difficulty,
    answerType: 'string',
    metadata: { simplificationType: type }
  };
}

// ============================================================================
// LOGICAL OPERATIONS (Phase 3)
// ============================================================================

/**
 * Generate a comparison problem (5 _ 3, fill in <, >, or =)
 */
function generateComparisonProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const minVal = config.minValue || 1;
  const maxVal = config.maxValue || 100;

  const a = randomNumber(minVal, maxVal);
  const b = randomNumber(minVal, maxVal);

  let answer: string;
  if (a < b) answer = '<';
  else if (a > b) answer = '>';
  else answer = '=';

  const expression = `${a} ___ ${b}`;
  const expressionLatex = `${a} \\; \\underline{\\quad} \\; ${b}`;

  return {
    expression: `Completa con <, >, o =: ${expression}`,
    expressionLatex: `\\text{Completa con } <, >, \\text{ o } =: ${expressionLatex}`,
    answer,
    operands: [a, b],
    operations: ['comparison'],
    difficulty: levelConfig.difficulty,
    answerType: 'multipleChoice',
    choices: ['<', '>', '=']
  };
}

/**
 * Generate a logical operators problem (AND, OR, NOT)
 */
function generateLogicalOperatorsProblem(levelConfig: OperationLevel): OperationProblem {
  const boolValues = ['V', 'F']; // Verdadero/Falso
  const a = boolValues[Math.floor(Math.random() * 2)];
  const b = boolValues[Math.floor(Math.random() * 2)];

  const operators = ['AND', 'OR'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let answer: string;
  const aVal = a === 'V';
  const bVal = b === 'V';

  if (operator === 'AND') {
    answer = (aVal && bVal) ? 'V' : 'F';
  } else {
    answer = (aVal || bVal) ? 'V' : 'F';
  }

  const expression = `${a} ${operator} ${b}`;
  const expressionLatex = `${a} \\text{ ${operator} } ${b}`;

  return {
    expression: `Evalúa: ${expression}`,
    expressionLatex: `\\text{Evalúa: } ${expressionLatex}`,
    answer,
    operands: [],
    operations: ['logical-operators'],
    difficulty: levelConfig.difficulty,
    answerType: 'multipleChoice',
    choices: ['V', 'F'],
    metadata: { operator, values: [a, b] }
  };
}

/**
 * Generate a compound conditions problem
 */
function generateCompoundConditionsProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const minVal = config.minValue || 1;
  const maxVal = config.maxValue || 20;
  const x = randomNumber(minVal, maxVal);

  // Generate random condition like "x > 5 AND x < 15"
  const midPoint = Math.floor((minVal + maxVal) / 2);
  const lower = randomNumber(minVal, midPoint);
  const upper = randomNumber(midPoint, maxVal);

  const operators = ['AND', 'OR'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  const cond1 = x > lower;
  const cond2 = x < upper;

  let answer: string;
  if (operator === 'AND') {
    answer = (cond1 && cond2) ? 'V' : 'F';
  } else {
    answer = (cond1 || cond2) ? 'V' : 'F';
  }

  const expression = `x > ${lower} ${operator} x < ${upper}, donde x = ${x}`;
  const expressionLatex = `x > ${lower} \\text{ ${operator} } x < ${upper}, \\text{ donde } x = ${x}`;

  return {
    expression: `Evalúa: ${expression}`,
    expressionLatex: `\\text{Evalúa: } ${expressionLatex}`,
    answer,
    operands: [x, lower, upper],
    operations: ['compound-conditions'],
    difficulty: levelConfig.difficulty,
    answerType: 'multipleChoice',
    choices: ['V', 'F'],
    metadata: { operator, x, lower, upper }
  };
}

// ============================================================================
// STRUCTURAL OPERATIONS (Phase 4)
// ============================================================================

/**
 * Generate a sequence problem (find pattern, next number)
 */
function generateSequenceProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const types = ['arithmetic', 'geometric', 'fibonacci'];
  const type = types[Math.floor(Math.random() * types.length)];

  let sequence: number[] = [];
  let answer: number = 0;
  let pattern: string = '';

  switch (type) {
    case 'arithmetic': { // a, a+d, a+2d, ...
      const maxVal = config.maxValue || 10;
      const minVal = config.minValue || 1;
      // Constrain start and diff so all sequence values stay within bounds
      const maxDiff = Math.max(1, Math.floor((maxVal - minVal) / 4));
      const diff = randomNumber(1, maxDiff);
      const start = randomNumber(minVal, maxVal - 4 * diff);
      for (let i = 0; i < 4; i++) {
        sequence.push(start + i * diff);
      }
      answer = start + 4 * diff;
      pattern = `+${diff}`;
      break;
    }

    case 'geometric': { // a, ar, ar², ...
      const maxVal = config.maxValue || 10;
      const minVal = config.minValue || 1;
      // Use ratio of 2 and constrain start so sequence doesn't exceed maxValue
      const ratio = 2;
      const maxStart = Math.floor(maxVal / Math.pow(ratio, 3));
      const start = randomNumber(Math.max(1, minVal), Math.max(minVal, maxStart));
      for (let i = 0; i < 4; i++) {
        sequence.push(start * Math.pow(ratio, i));
      }
      answer = start * Math.pow(ratio, 4);
      pattern = `×${ratio}`;
      break;
    }

    case 'fibonacci': { // a, b, a+b, b+(a+b), ...
      const maxVal = config.maxValue || 10;
      const minVal = config.minValue || 1;
      // Constrain a and b so the sequence doesn't exceed maxValue
      // Last value in sequence is (a+b) + (b+(a+b)) = 2a + 3b
      const maxA = Math.floor(maxVal / 2);
      const a = randomNumber(Math.max(1, minVal), Math.max(minVal, Math.min(3, maxA)));
      const maxB = Math.floor((maxVal - 2 * a) / 3);
      const b = randomNumber(Math.max(1, minVal), Math.max(minVal, Math.min(3, maxB)));
      sequence = [a, b, a + b, b + (a + b)];
      answer = (a + b) + (b + (a + b));
      pattern = 'Fibonacci';
      break;
    }

    default:
      answer = 0;
      pattern = '';
  }

  const expression = `${sequence.join(', ')}, ___`;
  const expressionLatex = `${sequence.join(', ')}, \\underline{\\quad}`;

  return {
    expression: `¿Cuál es el siguiente número en la secuencia? ${expression}`,
    expressionLatex: `\\text{¿Cuál es el siguiente número?} \\; ${expressionLatex}`,
    answer,
    operands: sequence,
    operations: ['sequences'],
    difficulty: levelConfig.difficulty,
    answerType: 'number',
    metadata: { sequenceType: type, pattern }
  };
}

/**
 * Generate a sets problem (union, intersection, etc.)
 */
function generateSetsProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const size = config.setSize || 5;

  // Generate two sets
  const setA: number[] = [];
  const setB: number[] = [];
  const minVal = config.minValue || 1;
  const maxVal = config.maxValue || 20;

  for (let i = 0; i < size; i++) {
    setA.push(randomNumber(minVal, maxVal));
    setB.push(randomNumber(minVal, maxVal));
  }

  const operations = ['union', 'intersection', 'difference'];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let answer: string = '';
  let symbol: string = '';

  switch (operation) {
    case 'union': {
      const union = [...new Set([...setA, ...setB])].sort((a, b) => a - b);
      answer = `{${union.join(', ')}}`;
      symbol = '∪';
      break;
    }

    case 'intersection': {
      const intersection = setA.filter(x => setB.includes(x));
      const unique = [...new Set(intersection)].sort((a, b) => a - b);
      answer = `{${unique.join(', ')}}`;
      symbol = '∩';
      break;
    }

    case 'difference': {
      const diff = setA.filter(x => !setB.includes(x));
      const unique = [...new Set(diff)].sort((a, b) => a - b);
      answer = `{${unique.join(', ')}}`;
      symbol = '-';
      break;
    }

    default:
      answer = '';
      symbol = '';
  }

  const expression = `A ${symbol} B, donde A = {${setA.join(', ')}} y B = {${setB.join(', ')}}`;
  const expressionLatex = `A ${symbol} B, \\text{ donde } A = \\{${setA.join(', ')}\\} \\text{ y } B = \\{${setB.join(', ')}\\}`;

  return {
    expression: `Calcula: ${expression}`,
    expressionLatex: `\\text{Calcula: } ${expressionLatex}`,
    answer,
    operands: [...setA, ...setB],
    operations: ['sets'],
    difficulty: levelConfig.difficulty,
    answerType: 'string',
    metadata: { setA, setB, operation }
  };
}

/**
 * Generate a functions problem (evaluate f(x), compose functions)
 */
function generateFunctionsProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const x = randomNumber(config.minValue || 1, config.maxValue || 10);

  const types = ['simple', 'quadratic', 'piecewise'];
  const type = types[Math.floor(Math.random() * Math.min(types.length, config.complexity || 1))];

  let expression: string = '';
  let expressionLatex: string = '';
  let answer: number = 0;
  let functionDef: string = '';
  let functionDefLatex: string = '';

  switch (type) {
    case 'simple': { // f(x) = 2x + 3
      const m = randomNumber(2, 10);
      const b = randomNumber(1, 10);
      answer = m * x + b;
      functionDef = `f(x) = ${m}x + ${b}`;
      functionDefLatex = `f(x) = ${m}x + ${b}`;
      expression = `f(${x})`;
      expressionLatex = `f(${x})`;
      break;
    }

    case 'quadratic': { // f(x) = x²
      answer = x * x;
      functionDef = `f(x) = x²`;
      functionDefLatex = `f(x) = x^2`;
      expression = `f(${x})`;
      expressionLatex = `f(${x})`;
      break;
    }

    case 'piecewise': { // f(x) = x if x < 5, 2x otherwise
      const threshold = 5;
      if (x < threshold) {
        answer = x;
      } else {
        answer = 2 * x;
      }
      functionDef = `f(x) = x si x < ${threshold}, 2x si x ≥ ${threshold}`;
      functionDefLatex = `f(x) = \\begin{cases} x & \\text{si } x < ${threshold} \\\\ 2x & \\text{si } x \\geq ${threshold} \\end{cases}`;
      expression = `f(${x})`;
      expressionLatex = `f(${x})`;
      break;
    }

    default:
      answer = 0;
      functionDef = '';
      functionDefLatex = '';
      expression = '';
      expressionLatex = '';
  }

  return {
    expression: `Dada ${functionDef}, calcula ${expression}`,
    expressionLatex: `\\text{Dada } ${functionDefLatex}, \\text{ calcula } ${expressionLatex}`,
    answer,
    operands: [x],
    operations: ['functions'],
    difficulty: levelConfig.difficulty,
    answerType: 'number',
    metadata: { functionType: type, x }
  };
}

// ============================================================================
// ALGORITHMIC OPERATIONS (Phase 5)
// ============================================================================

/**
 * Generate a sorting problem
 */
function generateSortingProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const size = config.arraySize || 5;

  const array: number[] = [];
  for (let i = 0; i < size; i++) {
    array.push(randomNumber(config.minValue || 1, config.maxValue || 100));
  }

  const types = ['ascending', 'descending'];
  const type = types[Math.floor(Math.random() * types.length)];

  let sorted: number[] = [];
  let orderText: string = '';

  if (type === 'ascending') {
    sorted = [...array].sort((a, b) => a - b);
    orderText = 'ascendente (menor a mayor)';
  } else {
    sorted = [...array].sort((a, b) => b - a);
    orderText = 'descendente (mayor a menor)';
  }

  const answer = sorted.join(',');

  return {
    expression: `Ordena en orden ${orderText}: [${array.join(', ')}]`,
    expressionLatex: `\\text{Ordena en orden ${orderText}: } [${array.join(', ')}]`,
    answer,
    operands: array,
    operations: ['sorting'],
    difficulty: levelConfig.difficulty,
    answerType: 'string',
    metadata: { array, sortType: type }
  };
}

/**
 * Generate a counting problem
 */
function generateCountingProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const size = config.arraySize || 10;

  const array: number[] = [];
  for (let i = 0; i < size; i++) {
    array.push(randomNumber(config.minValue || 1, config.maxValue || 10));
  }

  const types = ['count-specific', 'count-greater', 'count-even'];
  const type = types[Math.floor(Math.random() * types.length)];

  let answer: number = 0;
  let question: string = '';

  switch (type) {
    case 'count-specific': {
      const target = randomNumber(config.minValue || 1, config.maxValue || 10);
      answer = array.filter(x => x === target).length;
      question = `¿Cuántas veces aparece el número ${target}?`;
      break;
    }

    case 'count-greater': {
      const threshold = randomNumber(config.minValue || 1, config.maxValue || 10);
      answer = array.filter(x => x > threshold).length;
      question = `¿Cuántos números son mayores que ${threshold}?`;
      break;
    }

    case 'count-even': {
      answer = array.filter(x => x % 2 === 0).length;
      question = `¿Cuántos números son pares?`;
      break;
    }

    default:
      answer = 0;
      question = '';
  }

  return {
    expression: `${question} En el arreglo: [${array.join(', ')}]`,
    expressionLatex: `\\text{${question}} \\; [${array.join(', ')}]`,
    answer,
    operands: array,
    operations: ['counting'],
    difficulty: levelConfig.difficulty,
    answerType: 'number',
    metadata: { array, countType: type }
  };
}

/**
 * Generate a composition problem (apply multiple operations)
 */
function generateCompositionProblem(levelConfig: OperationLevel): OperationProblem {
  const { config } = levelConfig;
  const x = randomNumber(config.minValue || 1, config.maxValue || 10);

  // Create a composition like f(g(x)) where f(x) = 2x and g(x) = x + 3
  const types = ['simple', 'triple'];
  const type = types[Math.floor(Math.random() * types.length)];

  let expression: string = '';
  let expressionLatex: string = '';
  let answer: number = 0;

  if (type === 'simple') {
    const m1 = randomNumber(2, 5);
    const m2 = randomNumber(2, 5);
    const b = randomNumber(1, 5);

    // f(x) = m1*x, g(x) = m2*x + b
    // f(g(x)) = m1*(m2*x + b) = m1*m2*x + m1*b
    answer = m1 * (m2 * x + b);

    expression = `f(g(${x})) donde f(x) = ${m1}x y g(x) = ${m2}x + ${b}`;
    expressionLatex = `f(g(${x})) \\text{ donde } f(x) = ${m1}x \\text{ y } g(x) = ${m2}x + ${b}`;
  } else {
    // Triple composition: f(g(h(x)))
    const m1 = randomNumber(2, 3);
    const m2 = randomNumber(2, 3);
    const b = randomNumber(1, 3);

    // f(x) = m1*x, g(x) = x + b, h(x) = m2*x
    answer = m1 * (m2 * x + b);

    expression = `f(g(h(${x}))) donde f(x) = ${m1}x, g(x) = x + ${b}, h(x) = ${m2}x`;
    expressionLatex = `f(g(h(${x}))) \\text{ donde } f(x) = ${m1}x, g(x) = x + ${b}, h(x) = ${m2}x`;
  }

  return {
    expression: `Evalúa: ${expression}`,
    expressionLatex: `\\text{Evalúa: } ${expressionLatex}`,
    answer,
    operands: [x],
    operations: ['composition'],
    difficulty: levelConfig.difficulty,
    answerType: 'number',
    metadata: { compositionType: type, x }
  };
}

/**
 * Validate user's answer
 */
export function validateAnswer(problem: OperationProblem, userAnswer: string): boolean {
  const normalized = userAnswer.trim();

  // Handle different answer types
  switch (problem.answerType) {
    case 'number': {
      const correctAnswer = problem.answer as number;
      const userNum = parseFloat(normalized);

      if (isNaN(userNum)) {
        return false;
      }

      // For decimal answers, allow small floating point differences
      if (correctAnswer % 1 !== 0) {
        return Math.abs(userNum - correctAnswer) < 0.01;
      }

      return userNum === correctAnswer;
    }

    case 'string': {
      const correctAnswer = problem.answer as string;

      // For comma-separated values (sets, arrays), strip all whitespace for flexible comparison
      if (correctAnswer.includes(',') || normalized.includes(',')) {
        const normalizedCorrect = correctAnswer.replace(/\s+/g, '').toLowerCase();
        const normalizedUser = normalized.replace(/\s+/g, '').toLowerCase();
        return normalizedUser === normalizedCorrect;
      }

      // For other strings, normalize whitespace
      const normalizedCorrect = correctAnswer.replace(/\s+/g, ' ').trim().toLowerCase();
      const normalizedUser = normalized.replace(/\s+/g, ' ').toLowerCase();
      return normalizedUser === normalizedCorrect;
    }

    case 'multipleChoice': {
      const correctAnswer = problem.answer as string;

      // Handle boolean answer aliases (V/F, verdadero/falso, true/false)
      if (correctAnswer === 'V' || correctAnswer === 'F') {
        const normalizedLower = normalized.toLowerCase();
        if (correctAnswer === 'V') {
          return normalized === 'V' || normalizedLower === 'verdadero' || normalizedLower === 'true';
        } else {
          return normalized === 'F' || normalizedLower === 'falso' || normalizedLower === 'false';
        }
      }

      return normalized === correctAnswer;
    }

    case 'array': {
      // For array answers (e.g., sorting), compare comma-separated values
      const correctAnswer = Array.isArray(problem.answer)
        ? problem.answer.join(',')
        : problem.answer.toString();
      const normalizedCorrect = correctAnswer.replace(/\s+/g, '');
      const normalizedUser = normalized.replace(/\s+/g, '');
      return normalizedUser === normalizedCorrect;
    }

    default: {
      // Default: string comparison for backward compatibility
      const correctAnswer = problem.answer.toString();

      // Try numeric comparison first
      if (typeof problem.answer === 'number') {
        const userNum = parseFloat(normalized);
        const correctNum = parseFloat(correctAnswer);

        if (!isNaN(userNum) && !isNaN(correctNum)) {
          if (correctNum % 1 !== 0) {
            return Math.abs(userNum - correctNum) < 0.01;
          }
          return userNum === correctNum;
        }
      }

      // Fall back to string comparison
      return normalized === correctAnswer;
    }
  }
}
