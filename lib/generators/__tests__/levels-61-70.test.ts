/**
 * Integration tests for levels 61-70 (Advanced Simplification)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 61-70: Advanced Algebraic Simplification', () => {
  it('Level 61: Simplificar ax-by+x', () => {
    const config = getLevelConfig(61);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x-\d+y\+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 62: Simplificar ax+by+cx-dy', () => {
    const config = getLevelConfig(62);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x\+\d+y\+\d+x-\d+y$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 63: Simplificar ax+by-cx+dy', () => {
    const config = getLevelConfig(63);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x\+\d+y-\d+x\+\d+y$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 64: Simplificar ax-by+cx-dy', () => {
    const config = getLevelConfig(64);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+x-\d+y\+\d+x-\d+y$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 65: Simplificar a(x+b)+x', () => {
    const config = getLevelConfig(65);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+\(x\+\d+\)\+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 66: Simplificar a(x+b)+cx', () => {
    const config = getLevelConfig(66);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+\(x\+\d+\)\+\d+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 67: Simplificar a(x+b)-cx', () => {
    const config = getLevelConfig(67);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+\(x\+\d+\)-\d+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 68: Simplificar a(x+b)+c(x+d)', () => {
    const config = getLevelConfig(68);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+\(x\+\d+\)\+\d+\(x\+\d+\)$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 69: Simplificar a(x+y)+bx', () => {
    const config = getLevelConfig(69);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+\(x\+y\)\+\d+x$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 70: Simplificar a(x+b)+c(y+d)', () => {
    const config = getLevelConfig(70);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+\(x\+\d+\)\+\d+\(y\+\d+\)$/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });
});
