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

  it('Level 36: Ecuación ax+b=c', () => {
    const config = getLevelConfig(36);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x [+\-] \d+ = \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 37: Ecuación ax-b=c', () => {
    const config = getLevelConfig(37);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x - \d+ = -?\d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 38: Ecuación a(x+b)=c', () => {
    const config = getLevelConfig(38);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+\(x [+\-] \d+\) = \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 39: Ecuación 2x+a=x+b', () => {
    const config = getLevelConfig(39);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^2x [+\-] \d+ = x [+\-] \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 40: Ecuaciones Variadas', () => {
    const config = getLevelConfig(40);
    expect(config).toBeDefined();

    // Should generate variety of equation types
    const types = new Set<string>();

    for (let i = 0; i < 30; i++) {
      const problem = generateProblem(config!);

      // Classify equation type
      if (problem.expression.match(/^x [+\-] \d+ = \d+$/)) types.add('x+a=b');
      if (problem.expression.match(/^\d+x = \d+$/)) types.add('ax=b');
      if (problem.expression.match(/^\d+x [+\-] \d+ = \d+$/)) types.add('ax+b=c');
      if (problem.expression.match(/^\d+\(x [+\-] \d+\) = \d+$/)) types.add('a(x+b)=c');

      expect(typeof problem.correctAnswer).toBe('number');
    }

    // Should have variety (at least 2 different types)
    expect(types.size).toBeGreaterThanOrEqual(2);
  });
});
