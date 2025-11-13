/**
 * Integration tests for levels 101-120 (Sorting, Counting, and Algorithmic)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 101-110: Sorting Operations', () => {
  it('Level 101: Ordenar Ascendente', () => {
    const config = getLevelConfig(101);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Ordena: \[[\d, ]+\]/);

      // Verify answer is sorted ascending
      const sorted = (problem.correctAnswer as string).split(',').map(n => parseInt(n.trim()));
      for (let j = 1; j < sorted.length; j++) {
        expect(sorted[j]).toBeGreaterThanOrEqual(sorted[j - 1]);
      }
    }
  });

  it('Level 102: Ordenar Descendente', () => {
    const config = getLevelConfig(102);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Ordena \(mayor a menor\): \[[\d, ]+\]/);

      // Verify answer is sorted descending
      const sorted = (problem.correctAnswer as string).split(',').map(n => parseInt(n.trim()));
      for (let j = 1; j < sorted.length; j++) {
        expect(sorted[j]).toBeLessThanOrEqual(sorted[j - 1]);
      }
    }
  });

  it('Level 103: Encontrar Mínimo', () => {
    const config = getLevelConfig(103);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Mínimo de \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify it's actually the minimum
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      const min = Math.min(...nums);
      expect(problem.correctAnswer).toBe(min);
    }
  });

  it('Level 104: Encontrar Máximo', () => {
    const config = getLevelConfig(104);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Máximo de \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify it's actually the maximum
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      const max = Math.max(...nums);
      expect(problem.correctAnswer).toBe(max);
    }
  });

  it('Level 105: Calcular Mediana', () => {
    const config = getLevelConfig(105);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Mediana de \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 106-110: Mixed Sorting Operations', () => {
    for (let level = 106; level <= 110; level++) {
      const config = getLevelConfig(level);
      expect(config).toBeDefined();

      const problem = generateProblem(config!);
      // Should involve array/list operations
      expect(problem.expression).toMatch(/\[[\d, ]+\]/);
    }
  });
});

describe('Levels 111-120: Counting and Algorithmic Operations', () => {
  it('Level 111: Contar Todos los Elementos', () => {
    const config = getLevelConfig(111);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Cuenta elementos: \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify count is correct
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      expect(problem.correctAnswer).toBe(nums.length);
    }
  });

  it('Level 112: Contar Pares', () => {
    const config = getLevelConfig(112);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿Cuántos pares\?: \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify count is correct
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      const evenCount = nums.filter(n => n % 2 === 0).length;
      expect(problem.correctAnswer).toBe(evenCount);
    }
  });

  it('Level 113: Contar Impares', () => {
    const config = getLevelConfig(113);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿Cuántos impares\?: \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify count is correct
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      const oddCount = nums.filter(n => n % 2 !== 0).length;
      expect(problem.correctAnswer).toBe(oddCount);
    }
  });

  it('Level 114: Contar Mayores que N', () => {
    const config = getLevelConfig(114);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿Cuántos >\d+\?: \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 115: Contar Múltiplos', () => {
    const config = getLevelConfig(115);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/¿Cuántos múltiplos de \d+\?: \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 116: Sumar Pares', () => {
    const config = getLevelConfig(116);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Suma los pares: \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('number');

      // Verify sum is correct
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      const evenSum = nums.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0);
      expect(problem.correctAnswer).toBe(evenSum);
    }
  });

  it('Level 117: Aplicar Transformación +n', () => {
    const config = getLevelConfig(117);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Aplica \+\d+ a: \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 118: Aplicar Transformación ×n', () => {
    const config = getLevelConfig(118);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Aplica ×\d+ a: \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('string');
    }
  });

  it('Level 119: Transformar y Sumar', () => {
    const config = getLevelConfig(119);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Aplica ×\d+ luego suma: \[[\d, ]+\]/);
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 120: Filtrar Pares', () => {
    const config = getLevelConfig(120);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/Filtra pares: \[[\d, ]+\]/);

      // Answer should be array of evens or ∅
      if (problem.correctAnswer !== '∅') {
        const result = (problem.correctAnswer as string).split(',').map(n => parseInt(n.trim()));
        result.forEach(n => {
          expect(n % 2).toBe(0); // All should be even
        });
      }
    }
  });
});

describe('All Levels: Basic Validation', () => {
  it('All 120 levels should generate valid problems', () => {
    for (let level = 1; level <= 120; level++) {
      const config = getLevelConfig(level);
      expect(config, `Level ${level} config should exist`).toBeDefined();

      if (config) {
        const problem = generateProblem(config);

        // Basic validation
        expect(problem.expression, `Level ${level} should have expression`).toBeTruthy();
        expect(problem.correctAnswer, `Level ${level} should have answer`).toBeDefined();
        expect(problem.problemKey, `Level ${level} should have problemKey`).toBeTruthy();
        expect(problem.level, `Level ${level} number should match`).toBe(level);
      }
    }
  });
});
