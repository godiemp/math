/**
 * Integration tests for Structural Operations: Sets, Sequences, and Functions
 * Note: Level numbers are dynamically assigned based on array position
 */

import { describe, it, expect } from 'vitest';
import { OPERATIONS_PATH } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

// Helper to get level config by title
function getLevelByTitle(title: string) {
  return OPERATIONS_PATH.find(l => l.title === title);
}

describe('Set Operations', () => {
  it('Unión de Conjuntos (∪)', () => {
    const config = getLevelByTitle('Unión de Conjuntos');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\{[\d,]+\} ∪ \{[\d,]+\}/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Intersección de Conjuntos (∩)', () => {
    const config = getLevelByTitle('Intersección de Conjuntos');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\{[\d,]+\} ∩ \{[\d,]+\}/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Diferencia de Conjuntos (-)', () => {
    const config = getLevelByTitle('Diferencia de Conjuntos');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\{[\d,]+\} - \{[\d,]+\}/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Pertenencia (∈)', () => {
    const config = getLevelByTitle('Pertenencia a Conjunto');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿\d+ ∈ \{[\d,]+\}\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Cardinalidad (|A|)', () => {
    const config = getLevelByTitle('Cardinalidad');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/\|\{[\d,]+\}\|/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Subconjuntos (⊆)', () => {
    const config = getLevelByTitle('Subconjuntos');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toContain('⊆');
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer as string);
    }
  });

  it('Unión e Intersección combined', () => {
    const config = getLevelByTitle('Unión e Intersección');
    expect(config).toBeDefined();

    const problem = generateProblem(config!);
    // Should involve sets with union or intersection
    expect(problem.expression).toMatch(/\{|∪|∩/);
  });

  it('Complemento', () => {
    const config = getLevelByTitle('Complemento');
    expect(config).toBeDefined();

    const problem = generateProblem(config!);
    // Should involve complement notation (A')
    expect(problem.expression).toContain("'");
  });

  it('Operaciones Mixtas de Conjuntos', () => {
    const config = getLevelByTitle('Operaciones Mixtas de Conjuntos');
    expect(config).toBeDefined();

    const problem = generateProblem(config!);
    // Should involve sets
    expect(problem.expression).toMatch(/\{|∪|∩|-/);
  });
});

describe('Sequences', () => {
  it('Secuencia Aritmética (+n)', () => {
    const config = getLevelByTitle('Secuencia Aritmética (+n)');
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

  it('Secuencia Decreciente (-n)', () => {
    const config = getLevelByTitle('Secuencia Decreciente (-n)');
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

  it('Secuencia Geométrica (*n)', () => {
    const config = getLevelByTitle('Secuencia Geométrica (*n)');
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

  it('Secuencia de Cuadrados', () => {
    const config = getLevelByTitle('Secuencia de Cuadrados');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Continúa: [\d, ]+, __/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Fibonacci', () => {
    const config = getLevelByTitle('Fibonacci');
    expect(config).toBeDefined();

    const problem = generateProblem(config!);
    expect(problem.expression).toMatch(/Continúa: 1, 1, 2, 3, 5, 8, __/);
    expect(problem.correctAnswer).toBe(13); // Next Fibonacci number
  });
});

describe('Functions', () => {
  it('Función f(x)=x+a', () => {
    const config = getLevelByTitle('Función f(x)=x+a');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x\)=x\+\d+, f\(\d+\)=\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Función f(x)=ax', () => {
    const config = getLevelByTitle('Función f(x)=ax');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x\)=\d+x, f\(\d+\)=\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Composición de Funciones', () => {
    const config = getLevelByTitle('Composición de Funciones');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x\)=\d+x[+\-]\d+, f\(\d+\)=\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Función Inversa (x²)', () => {
    const config = getLevelByTitle('Función Inversa');
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

  it('Funciones Complejas', () => {
    const config = getLevelByTitle('Funciones Complejas');
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/f\(x(,y)?\)=/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });
});
