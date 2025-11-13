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
  const op = operations[Math.floor(Math.random() * operations.length)];

  let a = getRandomInt(min, max);
  let b = getRandomInt(min, max);
  let correctAnswer: number;
  let expression: string;
  let expressionLatex: string;
  let problemKey: string;

  if (op === '+') {
    correctAnswer = a + b;
    expression = `${a} + ${b}`;
    expressionLatex = `${a} + ${b}`;
    problemKey = `mix:${a},${b},+`;
  } else if (op === '-') {
    // Ensure non-negative result unless negatives are allowed
    if (!config.allowNegatives && b > a) {
      const temp = a;
      a = b;
      b = temp;
    }
    correctAnswer = a - b;
    expression = `${a} - ${b}`;
    expressionLatex = `${a} - ${b}`;
    problemKey = `mix:${a},${b},-`;
  } else if (op === '×') {
    correctAnswer = a * b;
    expression = `${a} × ${b}`;
    expressionLatex = `${a} \\times ${b}`;
    problemKey = `mix:${a},${b},×`;
  } else { // ÷
    // For division, ensure exact division
    const divisor = getRandomInt(2, Math.min(10, max));
    const quotient = getRandomInt(min, Math.floor(max / divisor));
    const dividend = divisor * quotient;
    correctAnswer = quotient;
    expression = `${dividend} ÷ ${divisor}`;
    expressionLatex = `${dividend} \\div ${divisor}`;
    problemKey = `mix:${dividend},${divisor},÷`;
  }

  return { expression, expressionLatex, correctAnswer, problemKey };
}
