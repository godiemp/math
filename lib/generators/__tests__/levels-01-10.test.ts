/**
 * Integration tests for levels 1-10 (Addition and Subtraction)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 1-10: Addition and Subtraction', () => {
  it('Level 1: Suma Básica (1-5)', () => {
    const config = getLevelConfig(1);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ \+ \d+$/);

      // Parse and verify range
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      nums.forEach(n => {
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(5);
      });
    }
  });

  it('Level 2: Suma hasta 10', () => {
    const config = getLevelConfig(2);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ \+ \d+$/);

      const nums = problem.expression.match(/\d+/g)!.map(Number);
      nums.forEach(n => {
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(10);
      });
    }
  });

  it('Level 3: Suma hasta 20', () => {
    const config = getLevelConfig(3);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ \+ \d+$/);

      const nums = problem.expression.match(/\d+/g)!.map(Number);
      nums.forEach(n => {
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(20);
      });
    }
  });

  it('Level 4: Suma Tres Números', () => {
    const config = getLevelConfig(4);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ \+ \d+ \+ \d+$/);

      const nums = problem.expression.match(/\d+/g)!.map(Number);
      expect(nums).toHaveLength(3);
      nums.forEach(n => {
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(10);
      });
    }
  });

  it('Level 5: Suma hasta 50', () => {
    const config = getLevelConfig(5);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ \+ \d+$/);

      const nums = problem.expression.match(/\d+/g)!.map(Number);
      nums.forEach(n => {
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(50);
      });
    }
  });

  it('Level 6: Resta Básica (1-10)', () => {
    const config = getLevelConfig(6);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ - \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(0); // No negatives
    }
  });

  it('Level 7: Resta hasta 20', () => {
    const config = getLevelConfig(7);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ - \d+$/);
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(0);
    }
  });

  it('Level 8: Resta hasta 50', () => {
    const config = getLevelConfig(8);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ - \d+$/);
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(0);
    }
  });

  it('Level 9: Resta hasta 100', () => {
    const config = getLevelConfig(9);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ - \d+$/);
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(0);
    }
  });

  it('Level 10: Resta con Negativos', () => {
    const config = getLevelConfig(10);
    expect(config).toBeDefined();

    let foundNegative = false;
    for (let i = 0; i < 20; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ - \d+$/);
      if ((problem.correctAnswer as number) < 0) {
        foundNegative = true;
      }
    }
    expect(foundNegative).toBe(true); // Should generate at least one negative
  });
});
