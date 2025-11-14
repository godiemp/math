/**
 * Integration tests for levels 71-90 (Comparison and Logic)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 71-80: Comparison Operations', () => {
  it('Level 71: Comparación >', () => {
    const config = getLevelConfig(71);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ > \d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 72: Comparación <', () => {
    const config = getLevelConfig(72);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ < \d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 73: Comparación =', () => {
    const config = getLevelConfig(73);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ = \d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 64-70: Mixed Comparisons', () => {
    for (let level = 64; level <= 70; level++) {
      const config = getLevelConfig(level);
      expect(config).toBeDefined();

      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿-?\d+ [<>=≥≤] -?\d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });
});

describe('Levels 81-90: Logical Conditions and Operators', () => {
  it('Level 71: Condición x>a', () => {
    const config = getLevelConfig(71);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿x>\d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 72: Condición x>a AND x<b', () => {
    const config = getLevelConfig(72);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿x>\d+ AND x<\d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 73: Condición x<a OR x>b', () => {
    const config = getLevelConfig(73);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿x<\d+ OR x>\d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 74: Rango x∈[a,b]', () => {
    const config = getLevelConfig(74);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Si x=\d+, ¿x∈\[\d+,\d+\]\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 75: Operador AND', () => {
    const config = getLevelConfig(75);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿(Verdadero|Falso) AND (Verdadero|Falso)\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 76: Operador OR', () => {
    const config = getLevelConfig(76);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿(Verdadero|Falso) OR (Verdadero|Falso)\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 77: Operador NOT', () => {
    const config = getLevelConfig(77);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿NOT (Verdadero|Falso)\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 78-80: Complex Logical Operations', () => {
    for (let level = 78; level <= 80; level++) {
      const config = getLevelConfig(level);
      expect(config).toBeDefined();

      const problem = generateProblem(config!);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });
});
