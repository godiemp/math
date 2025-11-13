/**
 * Integration tests for levels 41-50 (Expression Evaluation)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 41-50: Expression Evaluation', () => {
  it('Level 41: Evaluar x+a', () => {
    const config = getLevelConfig(41);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿x\+\d+\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 42: Evaluar ax', () => {
    const config = getLevelConfig(42);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿\d+x\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 43: Evaluar ax+b', () => {
    const config = getLevelConfig(43);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿\d+x[+\-]\d+\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 44: Evaluar x²', () => {
    const config = getLevelConfig(44);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿x²\?/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify it's actually squared
      const xMatch = problem.expression.match(/Si x=(\d+)/);
      if (xMatch) {
        const x = parseInt(xMatch[1]);
        expect(problem.correctAnswer).toBe(x * x);
      }
    }
  });

  it('Level 45: Evaluar ax²+b', () => {
    const config = getLevelConfig(45);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿\d+x²[+\-]\d+\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 46: Evaluar x+y', () => {
    const config = getLevelConfig(46);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, y=\d+, ¿x\+y\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 47: Evaluar xy', () => {
    const config = getLevelConfig(47);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, y=\d+, ¿xy\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 48: Evaluar ax+by', () => {
    const config = getLevelConfig(48);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, y=\d+, ¿\d+x[+\-]\d+y\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 49: Evaluar x²+y²', () => {
    const config = getLevelConfig(49);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, y=\d+, ¿x²\+y²\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 50: Evaluar (x+y)²', () => {
    const config = getLevelConfig(50);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, y=\d+, ¿\(x\+y\)²\?/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify calculation is correct
      const matches = problem.expression.match(/Si x=(\d+), y=(\d+)/);
      if (matches) {
        const x = parseInt(matches[1]);
        const y = parseInt(matches[2]);
        expect(problem.correctAnswer).toBe((x + y) * (x + y));
      }
    }
  });
});
