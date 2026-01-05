/**
 * Integration tests for levels 71-90 (Logical Operations)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 71-80: Comparison Operations', () => {
  it('Level 71: Mayor que', () => {
    const config = getLevelConfig(71);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ > \d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 72: Menor que', () => {
    const config = getLevelConfig(72);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ < \d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 73: Igual a', () => {
    const config = getLevelConfig(73);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ = \d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 74: Mayor o Igual', () => {
    const config = getLevelConfig(74);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ ≥ \d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 75: Menor o Igual', () => {
    const config = getLevelConfig(75);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ ≤ \d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 76-80: Advanced Comparisons', () => {
    for (let level = 76; level <= 80; level++) {
      const config = getLevelConfig(level);
      expect(config).toBeDefined();

      const problem = generateProblem(config!);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });
});

describe('Levels 81-84: Compound Conditions', () => {
  it('Level 81: Condición Simple (x>a)', () => {
    const config = getLevelConfig(81);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿x>\d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 82: Condición con AND', () => {
    const config = getLevelConfig(82);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿x>\d+ AND x<\d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 83: Condición con OR', () => {
    const config = getLevelConfig(83);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿x<\d+ OR x>\d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 84: Rangos Numéricos', () => {
    const config = getLevelConfig(84);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿x∈\[\d+,\d+\]\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });
});
