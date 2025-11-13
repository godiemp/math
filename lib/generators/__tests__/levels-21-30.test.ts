/**
 * Integration tests for levels 21-30 (Division and Mixed Arithmetic)
 */

import { describe, it, expect } from 'vitest';
import { getLevelConfig } from '../../operationsPath';
import { generateProblem } from '../../operationsProblemGenerator';

describe('Levels 21-30: Division and Mixed Arithmetic', () => {
  it('Level 21: Todas las Divisiones', () => {
    const config = getLevelConfig(21);
    expect(config).toBeDefined();

    for (let i = 0; i < 20; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ ÷ \d+$/);

      const parts = problem.expression.match(/(\d+) ÷ (\d+)/);
      if (parts) {
        const dividend = parseInt(parts[1]);
        const divisor = parseInt(parts[2]);
        expect(dividend % divisor).toBe(0); // Exact division
      }
    }
  });

  it('Level 22: División con Números Grandes', () => {
    const config = getLevelConfig(22);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ ÷ \d+$/);

      const nums = problem.expression.match(/\d+/g)!.map(Number);
      // At least one number should be >= 10 (two digits)
      const hasTwoDigit = nums.some(n => n >= 10);
      expect(hasTwoDigit).toBe(true);
    }
  });

  it('Level 23: División con Decimales', () => {
    const config = getLevelConfig(23);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);
      expect(problem.expression).toMatch(/^\d+ ÷ \d+$/);
      // Result might be decimal
      expect(typeof problem.correctAnswer).toBe('number');
    }
  });

  it('Level 24: Suma y Resta Simples (COMBINED)', () => {
    const config = getLevelConfig(24);
    expect(config).toBeDefined();

    const operations = new Set<string>();
    let problemsWithBoth = 0;

    for (let i = 0; i < 50; i++) {
      const problem = generateProblem(config!);

      // Should have 3 operands = 2 operations
      const opCount = (problem.expression.match(/[+\-×÷]/g) || []).length;
      expect(opCount).toBe(2);

      // Verify format: "a op b op c"
      expect(problem.expression).toMatch(/^\d+\s[+\-]\s\d+\s[+\-]\s\d+$/);

      // Track operations
      const hasAddition = problem.expression.includes('+');
      const hasSubtraction = problem.expression.match(/\d+ - \d+/) !== null;
      const hasMultiplication = problem.expression.includes('×');
      const hasDivision = problem.expression.includes('÷');

      if (hasAddition) operations.add('+');
      if (hasSubtraction) operations.add('-');
      if (hasMultiplication) operations.add('×');
      if (hasDivision) operations.add('÷');

      // Count problems that combine BOTH + and -
      if (hasAddition && hasSubtraction) problemsWithBoth++;
    }

    // Verify only + and - are used (no × or ÷)
    expect(operations.has('+')).toBe(true);
    expect(operations.has('-')).toBe(true);
    expect(operations.has('×')).toBe(false);
    expect(operations.has('÷')).toBe(false);

    // At least some problems should combine both operations
    expect(problemsWithBoth).toBeGreaterThan(5);
  });

  it('Level 25: Tres Operaciones Básicas (+, -, ×)', () => {
    const config = getLevelConfig(25);
    expect(config).toBeDefined();

    const operations = new Set<string>();

    for (let i = 0; i < 50; i++) {
      const problem = generateProblem(config!);

      // Should have 3 operands = 2 operations
      const opCount = (problem.expression.match(/[+\-×÷]/g) || []).length;
      expect(opCount).toBe(2);

      // Track operations
      if (problem.expression.includes('+')) operations.add('+');
      if (problem.expression.match(/\d+ - \d+/)) operations.add('-');
      if (problem.expression.includes('×')) operations.add('×');
      if (problem.expression.includes('÷')) operations.add('÷');
    }

    // Should have +, -, × but NOT ÷
    expect(operations.has('+')).toBe(true);
    expect(operations.has('-')).toBe(true);
    expect(operations.has('×')).toBe(true);
    expect(operations.has('÷')).toBe(false);
  });

  it('Level 26: Cuatro Operaciones (+, -, ×, ÷)', () => {
    const config = getLevelConfig(26);
    expect(config).toBeDefined();

    const operations = new Set<string>();

    for (let i = 0; i < 100; i++) {
      const problem = generateProblem(config!);

      // Should have 3 operands = 2 operations
      const opCount = (problem.expression.match(/[+\-×÷]/g) || []).length;
      expect(opCount).toBe(2);

      // Track all operations
      if (problem.expression.includes('+')) operations.add('+');
      if (problem.expression.match(/\d+ - \d+/)) operations.add('-');
      if (problem.expression.includes('×')) operations.add('×');
      if (problem.expression.includes('÷')) operations.add('÷');
    }

    // Should use at least 3 of the 4 operations
    expect(operations.size).toBeGreaterThanOrEqual(3);
  });

  it('Level 27: Operaciones hasta 50', () => {
    const config = getLevelConfig(27);
    expect(config).toBeDefined();

    for (let i = 0; i < 20; i++) {
      const problem = generateProblem(config!);

      // Should have multiple operations
      const opCount = (problem.expression.match(/[+\-×÷]/g) || []).length;
      expect(opCount).toBeGreaterThanOrEqual(2);

      // Numbers should be <= 50
      const nums = problem.expression.match(/\d+/g)!.map(Number);
      nums.forEach(n => {
        expect(n).toBeLessThanOrEqual(50);
      });
    }
  });

  it('Level 28: Expresiones de Tres Términos', () => {
    const config = getLevelConfig(28);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);

      // Should have exactly 3 operands
      const nums = problem.expression.match(/\d+/g);
      expect(nums).toHaveLength(3);

      // Should have exactly 2 operations
      const opCount = (problem.expression.match(/[+\-×÷]/g) || []).length;
      expect(opCount).toBe(2);
    }
  });

  it('Level 29: Expresiones de Cuatro Términos', () => {
    const config = getLevelConfig(29);
    expect(config).toBeDefined();

    for (let i = 0; i < 10; i++) {
      const problem = generateProblem(config!);

      // Should have exactly 4 operands
      const nums = problem.expression.match(/\d+/g);
      expect(nums).toHaveLength(4);

      // Should have exactly 3 operations
      const opCount = (problem.expression.match(/[+\-×÷]/g) || []).length;
      expect(opCount).toBe(3);
    }
  });

  it('Level 30: Maestría Aritmética', () => {
    const config = getLevelConfig(30);
    expect(config).toBeDefined();

    const operations = new Set<string>();

    for (let i = 0; i < 50; i++) {
      const problem = generateProblem(config!);

      // Should have 4 or 5 operands
      const nums = problem.expression.match(/\d+/g);
      expect(nums!.length).toBeGreaterThanOrEqual(4);

      // Track operations
      if (problem.expression.includes('+')) operations.add('+');
      if (problem.expression.match(/\d+ - \d+/)) operations.add('-');
      if (problem.expression.includes('×')) operations.add('×');
      if (problem.expression.includes('÷')) operations.add('÷');
    }

    // Should use all 4 operations types
    expect(operations.size).toBe(4);
  });
});
