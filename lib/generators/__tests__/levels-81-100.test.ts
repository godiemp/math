/**
 * Integration tests for levels 81-100 (Sets, Sequences, and Functions)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 81-90: Set Operations', () => {
  it('Level 81: Unión de Conjuntos (∪)', () => {
    const config = getLevelConfig(81);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\{[\d,]+\} ∪ \{[\d,]+\}/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 82: Intersección de Conjuntos (∩)', () => {
    const config = getLevelConfig(82);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\{[\d,]+\} ∩ \{[\d,]+\}/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 83: Diferencia de Conjuntos (-)', () => {
    const config = getLevelConfig(83);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\{[\d,]+\} - \{[\d,]+\}/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 84: Pertenencia (∈)', () => {
    const config = getLevelConfig(84);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ ∈ \{[\d,]+\}\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 85: Cardinalidad (|A|)', () => {
    const config = getLevelConfig(85);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\|\{[\d,]+\}\|/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 86-90: Mixed Set Operations', () => {
    for (let level = 86; level <= 90; level++) {
      const config = getLevelConfig(level);
      expect(config).toBeDefined();

      const problem = generateProblem(config!);
      // Should involve sets
      expect(problem.expression).toMatch(/\{|∪|∩|∈/);
    }
  });
});

describe('Levels 91-95: Sequences', () => {
  it('Level 91: Secuencia Aritmética (+n)', () => {
    const config = getLevelConfig(91);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Continúa: -?[\d, -]+, __/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify arithmetic progression
      const nums = problem.expression.match(/-?\d+/g)!.map(Number);
      if (nums.length >= 3) {
        const diff1 = nums[1] - nums[0];
        const diff2 = nums[2] - nums[1];
        expect(diff1).toBe(diff2);
        expect(diff1).toBeGreaterThan(0); // Increasing
      }
    }
  });

  it('Level 92: Secuencia Decreciente (-n)', () => {
    const config = getLevelConfig(92);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Continúa: [\d, ]+, __/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Should be decreasing
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      if (nums.length >= 3) {
        const diff1 = nums[1] - nums[0];
        const diff2 = nums[2] - nums[1];
        expect(diff1).toBe(diff2);
        expect(diff1).toBeLessThan(0); // Decreasing
      }
    }
  });

  it('Level 93: Secuencia Geométrica (*n)', () => {
    const config = getLevelConfig(93);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Continúa: [\d, ]+, __/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify geometric progression (constant ratio)
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      if (nums.length >= 3) {
        const ratio1 = nums[1] / nums[0];
        const ratio2 = nums[2] / nums[1];
        expect(Math.abs(ratio1 - ratio2)).toBeLessThan(0.01); // Close to same ratio
      }
    }
  });

  it('Level 94: Secuencia de Cuadrados', () => {
    const config = getLevelConfig(94);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Continúa: [\d, ]+, __/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 95: Fibonacci', () => {
    const config = getLevelConfig(95);
    expect(config).toBeDefined();

    const problem = generateProblem(config!);
    expect(problem.expression).toMatch(/Continúa: 1, 1, 2, 3, 5, 8, __/);
    expect(problem.correctAnswer).toBe(13); // Next Fibonacci number
  });
});

describe('Levels 96-100: Functions', () => {
  it('Level 96: Función f(x)=x+a', () => {
    const config = getLevelConfig(96);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x\)=x\+\d+, f\(\d+\)=\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 97: Función f(x)=ax', () => {
    const config = getLevelConfig(97);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x\)=\d+x, f\(\d+\)=\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 98: Función f(x)=ax+b', () => {
    const config = getLevelConfig(98);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x\)=\d+x[+\-]\d+, f\(\d+\)=\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 99: Función f(x)=x²', () => {
    const config = getLevelConfig(99);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x\)=x², f\(\d+\)=\?/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify squared
      const match = problem.expression.match(/f\((\d+)\)=\?/);
      if (match) {
        const x = parseInt(match[1]);
        expect(problem.correctAnswer).toBe(x * x);
      }
    }
  });

  it('Level 100: Funciones Complejas', () => {
    const config = getLevelConfig(100);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x(,y)?\)=/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });
});
