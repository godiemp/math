/**
 * Operations Practice Service
 * Generates and validates operation problems based on level configuration
 */

import { OperationLevel, OperationType } from '../config/operationsPath';

export interface OperationProblem {
  expression: string;
  expressionLatex: string;
  answer: number | string;
  operands: number[];
  operations: OperationType[];
  difficulty: string;
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

  if (operationType === 'mixed') {
    return generateMixedProblem(levelConfig);
  }

  switch (operationType) {
    case 'addition':
      return generateAdditionProblem(levelConfig);
    case 'subtraction':
      return generateSubtractionProblem(levelConfig);
    case 'multiplication':
      return generateMultiplicationProblem(levelConfig);
    case 'division':
      return generateDivisionProblem(levelConfig);
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
  const a = randomNumber(config.minValue!, config.maxValue!, config.allowDecimals);
  const b = randomNumber(config.minValue!, config.maxValue!, config.allowDecimals);

  // Ensure positive result unless negatives are allowed
  let num1 = a;
  let num2 = b;
  if (!config.allowNegatives && b > a) {
    [num1, num2] = [num2, num1];
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
    quotient = randomNumber(config.minValue || 1, config.maxValue || 10);
    divisor = table;
    dividend = divisor * quotient;
  } else if (config.allowDecimals) {
    // Division with decimal results
    divisor = randomNumber(2, config.maxValue || 20);
    dividend = randomNumber(config.minValue!, config.maxValue!);
    quotient = roundToOneDecimal(dividend / divisor);
  } else {
    // Generate exact division
    divisor = randomNumber(2, Math.min(12, config.maxValue || 12));
    quotient = randomNumber(Math.ceil(config.minValue! / divisor), Math.floor(config.maxValue! / divisor));
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
    operations,
    difficulty: levelConfig.difficulty
  };
}

/**
 * Validate user's answer
 */
export function validateAnswer(problem: OperationProblem, userAnswer: string): boolean {
  const correctAnswer = problem.answer.toString();
  const normalized = userAnswer.trim();

  // For decimal answers, allow small floating point differences
  if (typeof problem.answer === 'number' && problem.answer % 1 !== 0) {
    const userNum = parseFloat(normalized);
    const correctNum = parseFloat(correctAnswer);
    return Math.abs(userNum - correctNum) < 0.01;
  }

  return normalized === correctAnswer;
}
