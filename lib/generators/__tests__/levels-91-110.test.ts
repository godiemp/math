/**
 * Integration tests for levels 91-110 (Structural Operations: Sets, Sequences, and Functions)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 91-100: Set Operations', () => {
  it('Level 91: Unión de Conjuntos (∪)', () => {
    const config = getLevelConfig(91);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\{[\d,]+\} ∪ \{[\d,]+\}/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 92: Intersección de Conjuntos (∩)', () => {
    const config = getLevelConfig(92);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\{[\d,]+\} ∩ \{[\d,]+\}/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 93: Diferencia de Conjuntos (-)', () => {
    const config = getLevelConfig(93);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\{[\d,]+\} - \{[\d,]+\}/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 94: Pertenencia (∈)', () => {
    const config = getLevelConfig(94);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ ∈ \{[\d,]+\}\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Level 95: Cardinalidad (|A|)', () => {
    const config = getLevelConfig(95);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\|\{[\d,]+\}\|/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 96-100: Advanced Set Operations', () => {
    for (let level = 96; level <= 100; level++) {
      const config = getLevelConfig(level);
      expect(config).toBeDefined();

      const problem = generateProblem(config!);
      // Should involve sets
      expect(problem.expression).toMatch(/\{|∪|∩|∈|⊆/);
    }
  });
});

describe('Levels 101-110: Sequences and Functions', () => {
  it('Level 101: Secuencia Aritmética (+n)', () => {
    const config = getLevelConfig(101);
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

  it('Level 102: Secuencia Decreciente (-n)', () => {
    const config = getLevelConfig(102);
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

  it('Level 103: Secuencia Geométrica (*n)', () => {
    const config = getLevelConfig(103);
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

  it('Level 104: Secuencia de Cuadrados', () => {
    const config = getLevelConfig(104);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Continúa: [\d, ]+, __/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 105: Fibonacci', () => {
    const config = getLevelConfig(105);
    expect(config).toBeDefined();

    const problem = generateProblem(config!);
    expect(problem.expression).toMatch(/Continúa: 1, 1, 2, 3, 5, 8, __/);
    expect(problem.correctAnswer).toBe(13); // Next Fibonacci number
  });

  it('Level 106: Función f(x)=x+a', () => {
    const config = getLevelConfig(106);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x\)=x\+\d+, f\(\d+\)=\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 107: Función f(x)=ax', () => {
    const config = getLevelConfig(107);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x\)=\d+x, f\(\d+\)=\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 108: Composición de Funciones', () => {
    const config = getLevelConfig(108);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x\)=\d+x[+\-]\d+, f\(\d+\)=\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 109: Función Inversa', () => {
    const config = getLevelConfig(109);
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

  it('Level 110: Funciones Complejas', () => {
    const config = getLevelConfig(110);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x(,y)?\)=/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });
});
