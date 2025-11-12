/**
 * Client-side Operations Problem Generator
 * Generates problems locally (similar to backend but simpler)
 */

import { OperationLevel } from './operationsPath';

export interface GeneratedProblem {
  expression: string;
  expressionLatex: string;
  correctAnswer: number | string;
  title: string;
  description: string;
  level: number;
  difficulty: string;
  problemsToComplete: number;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateProblem(levelConfig: OperationLevel): GeneratedProblem {
  const { operationType, config, level, title, description, difficulty, problemsToComplete } = levelConfig;

  let expression = '';
  let expressionLatex = '';
  let correctAnswer: number | string = 0;

  switch (operationType) {
    case 'addition': {
      const min = config.minValue || 1;
      const max = config.maxValue || 10;
      const operands = config.numberOfOperands || 2;

      const numbers: number[] = [];
      for (let i = 0; i < operands; i++) {
        numbers.push(getRandomInt(min, max));
      }

      correctAnswer = numbers.reduce((sum, num) => sum + num, 0);
      expression = numbers.join(' + ');
      expressionLatex = numbers.join(' + ');
      break;
    }

    case 'subtraction': {
      const min = config.minValue || 1;
      const max = config.maxValue || 10;
      const allowNegatives = config.allowNegatives || false;

      const a = getRandomInt(min, max);
      const b = allowNegatives ? getRandomInt(min, max) : getRandomInt(min, a);

      correctAnswer = a - b;
      expression = `${a} - ${b}`;
      expressionLatex = `${a} - ${b}`;
      break;
    }

    case 'multiplication': {
      const min = config.minValue || 1;
      const max = config.maxValue || 10;
      const tables = config.specificTables || [2, 3, 4, 5];

      const table = tables[Math.floor(Math.random() * tables.length)];
      const multiplier = getRandomInt(min, max);

      correctAnswer = table * multiplier;
      expression = `${table} × ${multiplier}`;
      expressionLatex = `${table} \\times ${multiplier}`;
      break;
    }

    case 'division': {
      const min = config.minValue || 1;
      const max = config.maxValue || 10;
      const tables = config.specificTables || [2, 3, 4, 5];

      const divisor = tables[Math.floor(Math.random() * tables.length)];
      const quotient = getRandomInt(min, max);
      const dividend = divisor * quotient;

      correctAnswer = quotient;
      expression = `${dividend} ÷ ${divisor}`;
      expressionLatex = `${dividend} \\div ${divisor}`;
      break;
    }

    case 'mixed-arithmetic': {
      const min = config.minValue || 1;
      const max = config.maxValue || 20;
      const operations = ['+', '-', '×'];
      const op = operations[Math.floor(Math.random() * operations.length)];

      const a = getRandomInt(min, max);
      const b = getRandomInt(min, op === '-' ? a : max);

      if (op === '+') {
        correctAnswer = a + b;
        expression = `${a} + ${b}`;
        expressionLatex = `${a} + ${b}`;
      } else if (op === '-') {
        correctAnswer = a - b;
        expression = `${a} - ${b}`;
        expressionLatex = `${a} - ${b}`;
      } else {
        correctAnswer = a * b;
        expression = `${a} × ${b}`;
        expressionLatex = `${a} \\times ${b}`;
      }
      break;
    }

    default: {
      // For other operation types, generate a simple addition problem as fallback
      const a = getRandomInt(1, 10);
      const b = getRandomInt(1, 10);
      correctAnswer = a + b;
      expression = `${a} + ${b}`;
      expressionLatex = `${a} + ${b}`;
    }
  }

  return {
    expression,
    expressionLatex,
    correctAnswer,
    title,
    description,
    level,
    difficulty,
    problemsToComplete
  };
}

export function validateAnswer(userAnswer: string, correctAnswer: number | string): boolean {
  const trimmedAnswer = userAnswer.trim();

  if (typeof correctAnswer === 'number') {
    const numericAnswer = parseFloat(trimmedAnswer);
    return !isNaN(numericAnswer) && Math.abs(numericAnswer - correctAnswer) < 0.001;
  }

  return trimmedAnswer.toLowerCase() === correctAnswer.toString().toLowerCase();
}
