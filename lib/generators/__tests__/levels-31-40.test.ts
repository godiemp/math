/**
 * Integration tests for levels 31-40 (Simple Equations - Algebra)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 31-40: Simple Equations (Algebra)', () => {
  it('Level 31: Ecuación Simple x+a=b', () => {
    const config = getLevelConfig(31);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      // Should match format: x + number = number
      expect(problem.expression).toMatch(/^x \+ \d+ = \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 32: Ecuación x-a=b', () => {
    const config = getLevelConfig(32);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^x - \d+ = -?\d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 33: Ecuación a-x=b', () => {
    const config = getLevelConfig(33);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ - x = \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 34: Ecuación ax=b', () => {
    const config = getLevelConfig(34);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x = \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 35: Ecuación x/a=b', () => {
    const config = getLevelConfig(35);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^x\/\d+ = \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 36: Ecuaciones con Números Grandes (x+a=b)', () => {
    const config = getLevelConfig(36);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      // x + large_number = large_number (10-50 range)
      expect(problem.expression).toMatch(/^x \+ \d+ = \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 37: Ecuaciones ax+b=c', () => {
    const config = getLevelConfig(37);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      // Should match format: 2x + 5 = 13
      expect(problem.expression).toMatch(/^\d+x [+\-] \d+ = \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 38: Ecuaciones ax-b=c', () => {
    const config = getLevelConfig(38);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      // Should match format: 3x - 4 = 11
      expect(problem.expression).toMatch(/^\d+x - \d+ = -?\d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 39: Ecuaciones con Paréntesis a(x+b)=c', () => {
    const config = getLevelConfig(39);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      // Should match format: 2(x+3) = 14 or 2(x-3) = 14
      expect(problem.expression).toMatch(/^\d+\(x [+\-] \d+\) = \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 40: Ecuaciones con x a Ambos Lados (ax+b=cx+d)', () => {
    const config = getLevelConfig(40);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      // Should match format: 2x + 5 = x + 10 or 2x + 2 = x + 3 (coefficient can be implicit 1)
      expect(problem.expression).toMatch(/^(\d+)?x [+\-] \d+ = (\d+)?x [+\-] \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });
});
