/**
 * Shared types for problem generators
 */

import { OperationLevel } from '../operationsPath';

export interface ProblemData {
  expression: string;
  expressionLatex: string;
  correctAnswer: number | string;
  problemKey: string;
}

export interface GeneratorContext {
  config: OperationLevel['config'];
  level: number;
}

export type ProblemGenerator = (context: GeneratorContext) => ProblemData;

/**
 * Helper to get random integer in range [min, max] inclusive
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
