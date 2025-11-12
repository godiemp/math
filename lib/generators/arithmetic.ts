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

  const a = getRandomInt(min, max);
  const b = allowNegatives ? getRandomInt(min, max) : getRandomInt(min, a);

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
  const operations = ['+', '-', '×'];
  const op = operations[Math.floor(Math.random() * operations.length)];

  const a = getRandomInt(min, max);
  const b = getRandomInt(min, op === '-' ? a : max);

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
    correctAnswer = a - b;
    expression = `${a} - ${b}`;
    expressionLatex = `${a} - ${b}`;
    problemKey = `mix:${a},${b},-`;
  } else {
    correctAnswer = a * b;
    expression = `${a} × ${b}`;
    expressionLatex = `${a} \\times ${b}`;
    problemKey = `mix:${a},${b},×`;
  }

  return { expression, expressionLatex, correctAnswer, problemKey };
}
