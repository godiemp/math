/**
 * Integration tests for levels 51-60 (Simplification)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 51-60: Algebraic Simplification', () => {
  it('Level 51: Simplificar x+x', () => {
    const config = getLevelConfig(51);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toBe('x+x');
      expect(problem.correctAnswer).toBe('2x');
    }
  });

  it('Level 52: Simplificar ax+bx', () => {
    const config = getLevelConfig(52);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x\+\d+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
      expect(problem.correctAnswer).toMatch(/^\d+x$/);
    }
  });

  it('Level 53: Simplificar ax-bx', () => {
    const config = getLevelConfig(53);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x-\d+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 54: Simplificar -ax-bx', () => {
    const config = getLevelConfig(54);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^-\d+x-\d+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
      expect(problem.correctAnswer).toMatch(/^-\d+x$/);
    }
  });

  it('Level 55: Simplificar -ax+bx', () => {
    const config = getLevelConfig(55);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^-\d+x\+\d+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 56: Simplificar x±x±x', () => {
    const config = getLevelConfig(56);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      // Should match x+x+x, x-x+x, x+x-x, or x-x-x patterns
      expect(problem.expression).toMatch(/^x[+-]x[+-]x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 57: Simplificar ax+bx+cx', () => {
    const config = getLevelConfig(57);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x\+\d+x\+\d+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
      expect(problem.correctAnswer).toMatch(/^\d+x$/);
    }
  });

  it('Level 58: Simplificar ax+bx-cx', () => {
    const config = getLevelConfig(58);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x\+\d+x-\d+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 59: Simplificar ax+by+x', () => {
    const config = getLevelConfig(59);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x\+\d+y\+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 60: Simplificar ax+by-x', () => {
    const config = getLevelConfig(60);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x\+\d+y-x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });
});
