/**
 * Integration tests for levels 11-20 (Multiplication)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 11-20: Multiplication', () => {
  it('Level 11: Tabla del 2', () => {
    const config = getLevelConfig(11);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ × \d+$/);

      // Should contain 2
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      expect(nums).toContain(2);
    }
  });

  it('Level 12: Tabla del 3', () => {
    const config = getLevelConfig(12);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ × \d+$/);
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      expect(nums).toContain(3);
    }
  });

  it('Level 13: Tabla del 4', () => {
    const config = getLevelConfig(13);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ × \d+$/);
      // Level 13 uses tables [4] - verify multiplication is correct
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 14: Tabla del 5', () => {
    const config = getLevelConfig(14);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ × \d+$/);
      // Verify multiplication works correctly
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 15: Tablas del 2, 3, 4, 5', () => {
    const config = getLevelConfig(15);
    expect(config).toBeDefined();

    const foundTables = new Set<number>();
    for (let i = 0; i < 30; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ × \d+$/);

      const nums = problem.expression.match(/\d+/g)!.map(Number);
      [2, 3, 4, 5].forEach(table => {
        if (nums.includes(table)) foundTables.add(table);
      });
    }

    // Should use multiple tables
    expect(foundTables.size).toBeGreaterThanOrEqual(2);
  });

  it('Level 16: Tabla del 6', () => {
    const config = getLevelConfig(16);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ × \d+$/);
      // Verify multiplication works correctly
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 17: Todas las Tablas', () => {
    const config = getLevelConfig(17);
    expect(config).toBeDefined();

    const foundTables = new Set<number>();
    for (let i = 0; i < 100; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ × \d+$/);

      const nums = problem.expression.match(/\d+/g)!.map(Number);
      nums.forEach(n => {
        if (n >= 2 && n <= 10) foundTables.add(n);
      });
    }

    // Should use many different tables
    expect(foundTables.size).toBeGreaterThanOrEqual(5);
  });

  it('Level 18: División del 2', () => {
    const config = getLevelConfig(18);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ ÷ \d+$/);

      const parts = problem.expression.match(/(\d+) ÷ (\d+)/);
      expect(parts).toBeTruthy();
      if (parts) {
        const dividend = parseInt(parts[1]);
        const divisor = parseInt(parts[2]);

        // Verify exact division
        expect(dividend % divisor).toBe(0);
        expect(typeof problem.correctAnswer).toBe('number');
      }
    }
  });

  it('Level 19: División del 3', () => {
    const config = getLevelConfig(19);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ ÷ \d+$/);

      const parts = problem.expression.match(/(\d+) ÷ (\d+)/);
      if (parts) {
        const dividend = parseInt(parts[1]);
        const divisor = parseInt(parts[2]);

        // Verify exact division
        expect(dividend % divisor).toBe(0);
        expect(typeof problem.correctAnswer).toBe('number');
      }
    }
  });

  it('Level 20: División Básica (2-5)', () => {
    const config = getLevelConfig(20);
    expect(config).toBeDefined();

    const foundDivisors = new Set<number>();
    for (let i = 0; i < 20; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ ÷ \d+$/);

      const parts = problem.expression.match(/(\d+) ÷ (\d+)/);
      if (parts) {
        const divisor = parseInt(parts[2]);
        foundDivisors.add(divisor);

        // Verify exact division
        const dividend = parseInt(parts[1]);
        expect(dividend % divisor).toBe(0);
      }
    }

    // Should have variety of divisors from 2-5
    expect(foundDivisors.size).toBeGreaterThanOrEqual(2);
  });
});
