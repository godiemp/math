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

// Track recently generated problems to avoid repeats (per level)
const problemHistory: Map<number, string[]> = new Map();
const MAX_HISTORY_SIZE = 10; // Remember last 10 problems per level

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if a problem was recently generated for this level
 */
function isProblemRecent(level: number, problemKey: string): boolean {
  const history = problemHistory.get(level) || [];
  return history.includes(problemKey);
}

/**
 * Add a problem to the history for this level
 */
function addToHistory(level: number, problemKey: string): void {
  const history = problemHistory.get(level) || [];
  history.push(problemKey);

  // Keep only the last MAX_HISTORY_SIZE problems
  if (history.length > MAX_HISTORY_SIZE) {
    history.shift();
  }

  problemHistory.set(level, history);
}

/**
 * Clear history for a level (useful when completing a level)
 */
export function clearProblemHistory(level: number): void {
  problemHistory.delete(level);
}

export function generateProblem(levelConfig: OperationLevel): GeneratedProblem {
  const { operationType, config, level, title, description, difficulty, problemsToComplete } = levelConfig;

  // Try to generate a unique problem (max 20 attempts to avoid infinite loops)
  let attempts = 0;
  const maxAttempts = 20;

  while (attempts < maxAttempts) {
    attempts++;

    let expression = '';
    let expressionLatex = '';
    let correctAnswer: number | string = 0;
    let problemKey = '';

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
        problemKey = `add:${numbers.join(',')}`;
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
        problemKey = `sub:${a},${b}`;
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
        problemKey = `mul:${table},${multiplier}`;
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
        problemKey = `div:${dividend},${divisor}`;
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
        break;
      }

      default: {
        // For other operation types, generate a simple addition problem as fallback
        const a = getRandomInt(1, 10);
        const b = getRandomInt(1, 10);
        correctAnswer = a + b;
        expression = `${a} + ${b}`;
        expressionLatex = `${a} + ${b}`;
        problemKey = `default:${a},${b}`;
      }
    }

    // Check if this problem was recently generated
    if (!isProblemRecent(level, problemKey)) {
      // This is a new problem, add it to history and return it
      addToHistory(level, problemKey);

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

    // Problem was recent, try again
  }

  // If we couldn't find a unique problem after max attempts, just return the last one
  // This shouldn't happen unless the problem space is very small
  console.warn(`Could not generate unique problem after ${maxAttempts} attempts for level ${level}`);

  return generateFallbackProblem(levelConfig);
}

/**
 * Generate a fallback problem without history checking
 */
function generateFallbackProblem(levelConfig: OperationLevel): GeneratedProblem {
  const { operationType, config, level, title, description, difficulty, problemsToComplete } = levelConfig;

  // Simple fallback generation without history
  const a = getRandomInt(1, 10);
  const b = getRandomInt(1, 10);

  return {
    expression: `${a} + ${b}`,
    expressionLatex: `${a} + ${b}`,
    correctAnswer: a + b,
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
