/**
 * Client-side Operations Problem Generator
 * Orchestrates problem generation using modular generators
 */

import { OperationLevel } from './operationsPath';
import {
  getRandomInt,
  GeneratorContext,
  ProblemData,
  generateAddition,
  generateSubtraction,
  generateMultiplication,
  generateDivision,
  generateMixedArithmetic,
  generateSimpleEquation,
  generateExpressionEvaluation,
  generateSimplification,
  generateComparison,
  generateLogicalOperators,
  generateCompoundConditions,
  generateSequences,
  generateSets,
  generateFunctions,
  generateSorting,
  generateCounting,
  generateComposition,
} from './generators';

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
const MAX_HISTORY_SIZE = 10;

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

/**
 * Map operation types to their generator functions
 */
const generatorMap: Record<string, (ctx: GeneratorContext) => ProblemData> = {
  'addition': generateAddition,
  'subtraction': generateSubtraction,
  'multiplication': generateMultiplication,
  'division': generateDivision,
  'mixed-arithmetic': generateMixedArithmetic,
  'simple-equation': generateSimpleEquation,
  'expression-evaluation': generateExpressionEvaluation,
  'simplification': generateSimplification,
  'comparison': generateComparison,
  'logical-operators': generateLogicalOperators,
  'compound-conditions': generateCompoundConditions,
  'sequences': generateSequences,
  'sets': generateSets,
  'functions': generateFunctions,
  'sorting': generateSorting,
  'counting': generateCounting,
  'composition': generateComposition,
};

/**
 * Generate a problem for a given level configuration
 */
export function generateProblem(levelConfig: OperationLevel): GeneratedProblem {
  const { operationType, config, level, title, description, difficulty, problemsToComplete } = levelConfig;

  // Try to generate a unique problem (max 20 attempts to avoid infinite loops)
  let attempts = 0;
  const maxAttempts = 20;

  while (attempts < maxAttempts) {
    attempts++;

    const generator = generatorMap[operationType];

    if (!generator) {
      // Fallback for unknown operation types
      console.warn(`No generator found for operation type: ${operationType}`);
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

    const context: GeneratorContext = { config, level };
    const problemData = generator(context);

    // Check if this problem was recently generated
    if (!isProblemRecent(level, problemData.problemKey)) {
      // This is a new problem, add it to history and return it
      addToHistory(level, problemData.problemKey);

      return {
        ...problemData,
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
  console.warn(`Could not generate unique problem after ${maxAttempts} attempts for level ${level}`);

  // Generate one more time without history check
  const generator = generatorMap[operationType];
  const context: GeneratorContext = { config, level };
  const problemData = generator ? generator(context) : {
    expression: '1 + 1',
    expressionLatex: '1 + 1',
    correctAnswer: 2,
    problemKey: 'fallback'
  };

  return {
    ...problemData,
    title,
    description,
    level,
    difficulty,
    problemsToComplete
  };
}

/**
 * Validate user's answer against the correct answer
 */
export function validateAnswer(userAnswer: string, correctAnswer: number | string): boolean {
  const trimmedAnswer = userAnswer.trim();

  if (typeof correctAnswer === 'number') {
    const numericAnswer = parseFloat(trimmedAnswer);
    return !isNaN(numericAnswer) && Math.abs(numericAnswer - correctAnswer) < 0.001;
  }

  // For string answers, handle special cases
  const correctStr = correctAnswer.toString().toLowerCase();
  const userStr = trimmedAnswer.toLowerCase();

  // Handle boolean answers (Verdadero/Falso, True/False, V/F, Si/No)
  if (correctStr === 'verdadero' || correctStr === 'falso') {
    return (
      userStr === correctStr ||
      (correctStr === 'verdadero' && (userStr === 'true' || userStr === 'v' || userStr === 'si' || userStr === 'sí')) ||
      (correctStr === 'falso' && (userStr === 'false' || userStr === 'f' || userStr === 'no'))
    );
  }

  // Handle set notation - accept both {1,2,3} and 1,2,3
  if (correctStr.includes(',')) {
    // Remove spaces and braces for comparison
    const normalizeSet = (str: string) => str.replace(/[\s\{\}]/g, '').split(',').sort().join(',');
    return normalizeSet(userStr) === normalizeSet(correctStr);
  }

  // Handle empty set notation
  const emptySetVariants = ['∅', 'vacio', 'vacío', '', '{}'];
  const isCorrectEmpty = emptySetVariants.includes(correctStr);
  const isUserEmpty = emptySetVariants.includes(userStr);
  if (isCorrectEmpty || isUserEmpty) {
    // Both must be empty set variants
    return isCorrectEmpty && isUserEmpty;
  }

  // Handle algebraic expressions - accept with or without spaces
  const normalizeAlgebra = (str: string) => str.replace(/\s+/g, '');
  return normalizeAlgebra(userStr) === normalizeAlgebra(correctStr);
}
