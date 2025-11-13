/**
 * Arithmetic problem generators
 * Handles: addition, subtraction, multiplication, division, mixed-arithmetic
 */

import { ProblemData, GeneratorContext, getRandomInt } from './types';

export function generateAddition(context: GeneratorContext): ProblemData {
  const { config } = context;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;
  const operands = config.numberOfOperands || 2;

  const numbers: number[] = [];
  for (let i = 0; i < operands; i++) {
    numbers.push(getRandomInt(min, max));
  }

  const correctAnswer = numbers.reduce((sum, num) => sum + num, 0);
  const expression = numbers.join(' + ');
  const expressionLatex = numbers.join(' + ');
  const problemKey = `add:${numbers.join(',')}`;

  return { expression, expressionLatex, correctAnswer, problemKey };
}

export function generateSubtraction(context: GeneratorContext): ProblemData {
  const { config } = context;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;
  const allowNegatives = config.allowNegatives || false;
  const forceNegative = config.forceNegative || false;

  let a: number;
  let b: number;

  if (forceNegative) {
    // Force negative result: ensure b > a
    a = getRandomInt(min, max);
    b = getRandomInt(a + 1, max);
    // If we can't get b > a (when a is already max), swap values
    if (b <= a) {
      const temp = a;
      a = getRandomInt(min, max - 1);
      b = getRandomInt(a + 1, max);
    }
  } else if (allowNegatives) {
    // Allow negative results: both random
    a = getRandomInt(min, max);
    b = getRandomInt(min, max);
  } else {
    // No negatives: ensure b <= a
    a = getRandomInt(min, max);
    b = getRandomInt(min, a);
  }

  const correctAnswer = a - b;
  const expression = `${a} - ${b}`;
  const expressionLatex = `${a} - ${b}`;
  const problemKey = `sub:${a},${b}`;

  return { expression, expressionLatex, correctAnswer, problemKey };
}

export function generateMultiplication(context: GeneratorContext): ProblemData {
  const { config } = context;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;
  const tables = config.specificTables || [2, 3, 4, 5];

  const table = tables[Math.floor(Math.random() * tables.length)];
  const multiplier = getRandomInt(min, max);

  const correctAnswer = table * multiplier;
  const expression = `${table} × ${multiplier}`;
  const expressionLatex = `${table} \\times ${multiplier}`;
  const problemKey = `mul:${table},${multiplier}`;

  return { expression, expressionLatex, correctAnswer, problemKey };
}

export function generateDivision(context: GeneratorContext): ProblemData {
  const { config } = context;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;
  const tables = config.specificTables || [2, 3, 4, 5];

  const divisor = tables[Math.floor(Math.random() * tables.length)];
  const quotient = getRandomInt(min, max);
  const dividend = divisor * quotient;

  const correctAnswer = quotient;
  const expression = `${dividend} ÷ ${divisor}`;
  const expressionLatex = `${dividend} \\div ${divisor}`;
  const problemKey = `div:${dividend},${divisor}`;

  return { expression, expressionLatex, correctAnswer, problemKey };
}

export function generateMixedArithmetic(context: GeneratorContext): ProblemData {
  const { config } = context;
  const min = config.minValue || 1;
  const max = config.maxValue || 20;
  const numOperands = config.numberOfOperands || 3; // Default to 3 for "mixed" operations

  // Use mixedOperations from config, or default to all operations
  const allowedOps = config.mixedOperations || ['addition', 'subtraction', 'multiplication', 'division'];

  // Map operation types to symbols
  const opMap: Record<string, string> = {
    'addition': '+',
    'subtraction': '-',
    'multiplication': '×',
    'division': '÷'
  };

  const operations = allowedOps.map(op => opMap[op]).filter(Boolean);

  // Generate multiple operands and operations
  const numbers: number[] = [];
  const ops: string[] = [];

  // Generate first number
  numbers.push(getRandomInt(min, max));

  // Generate remaining numbers and operations between them
  for (let i = 1; i < numOperands; i++) {
    const op = operations[Math.floor(Math.random() * operations.length)];
    ops.push(op);

    if (op === '÷') {
      // For division, generate divisor and ensure it divides evenly
      const divisor = getRandomInt(2, Math.min(10, max));
      numbers.push(divisor);
    } else if (op === '×') {
      // For multiplication, use smaller numbers to avoid overflow
      numbers.push(getRandomInt(2, Math.min(10, max)));
    } else {
      numbers.push(getRandomInt(min, max));
    }
  }

  // Calculate the correct answer by evaluating left to right
  let result = numbers[0];
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const nextNum = numbers[i + 1];

    if (op === '+') {
      result = result + nextNum;
    } else if (op === '-') {
      result = result - nextNum;
      // If result becomes negative and negatives not allowed, adjust
      if (!config.allowNegatives && result < 0) {
        // Swap this subtraction to addition and recalculate from start
        ops[i] = '+';
        result = numbers[0];
        for (let j = 0; j <= i; j++) {
          const recalcOp = ops[j];
          const recalcNum = numbers[j + 1];
          if (recalcOp === '+') result = result + recalcNum;
          else if (recalcOp === '-') result = result - recalcNum;
        }
      }
    } else if (op === '×') {
      result = result * nextNum;
    } else if (op === '÷') {
      result = result / nextNum;
    }
  }

  // Build expression string
  const expressionParts: string[] = [numbers[0].toString()];
  const latexParts: string[] = [numbers[0].toString()];

  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const num = numbers[i + 1];

    expressionParts.push(op);
    expressionParts.push(num.toString());

    // LaTeX conversion for multiplication and division
    if (op === '×') {
      latexParts.push('\\times');
    } else if (op === '÷') {
      latexParts.push('\\div');
    } else {
      latexParts.push(op);
    }
    latexParts.push(num.toString());
  }

  const expression = expressionParts.join(' ');
  const expressionLatex = latexParts.join(' ');
  const correctAnswer = Math.round(result * 100) / 100; // Round to 2 decimals
  const problemKey = `mix:${numbers.join(',')};${ops.join(',')}`;

  return { expression, expressionLatex, correctAnswer, problemKey };
}
