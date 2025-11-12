import { describe, it, expect } from 'vitest';
import {
  generateAddition,
  generateSubtraction,
  generateMultiplication,
  generateDivision,
  generateMixedArithmetic,
} from '../arithmetic';
import { GeneratorContext } from '../types';

describe('Arithmetic Generators', () => {
  describe('generateAddition', () => {
    it('should generate addition problem with 2 operands', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, numberOfOperands: 2 },
        level: 1,
      };

      const problem = generateAddition(context);

      expect(problem).toHaveProperty('expression');
      expect(problem).toHaveProperty('expressionLatex');
      expect(problem).toHaveProperty('correctAnswer');
      expect(problem).toHaveProperty('problemKey');
      expect(problem.expression).toMatch(/^\d+ \+ \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(2);
      expect(problem.correctAnswer).toBeLessThanOrEqual(20);
    });

    it('should generate addition with 3 operands', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 5, numberOfOperands: 3 },
        level: 4,
      };

      const problem = generateAddition(context);

      expect(problem.expression).toMatch(/^\d+ \+ \d+ \+ \d+$/);
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(3);
      expect(problem.correctAnswer).toBeLessThanOrEqual(15);
    });
  });

  describe('generateSubtraction', () => {
    it('should generate subtraction without negatives', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, allowNegatives: false },
        level: 6,
      };

      const problem = generateSubtraction(context);

      expect(problem.expression).toMatch(/^\d+ - \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(0);
    });

    it('should generate subtraction with potential negatives', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, allowNegatives: true },
        level: 10,
      };

      const problem = generateSubtraction(context);

      expect(problem.expression).toMatch(/^\d+ - \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
      // Result can be negative
    });
  });

  describe('generateMultiplication', () => {
    it('should generate multiplication from specific tables', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, specificTables: [2, 3] },
        level: 11,
      };

      const problem = generateMultiplication(context);

      expect(problem.expression).toMatch(/^\d+ × \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(2);
    });

    it('should use specified multiplication tables', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, specificTables: [5] },
        level: 13,
      };

      const results = new Set();
      // Generate multiple to verify it uses the correct table
      for (let i = 0; i < 10; i++) {
        const problem = generateMultiplication(context);
        const parts = problem.expression.match(/(\d+) × (\d+)/);
        if (parts) {
          results.add(parseInt(parts[1]));
        }
      }

      expect(results.has(5)).toBe(true);
      expect(results.size).toBe(1); // Only table 5
    });
  });

  describe('generateDivision', () => {
    it('should generate exact division', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, specificTables: [2, 3, 4] },
        level: 18,
      };

      const problem = generateDivision(context);

      expect(problem.expression).toMatch(/^\d+ ÷ \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
      expect(Number.isInteger(problem.correctAnswer)).toBe(true);
    });

    it('should produce correct answer for division', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, specificTables: [2] },
        level: 18,
      };

      const problem = generateDivision(context);
      const parts = problem.expression.match(/(\d+) ÷ (\d+)/);

      expect(parts).toBeTruthy();
      if (parts) {
        const dividend = parseInt(parts[1]);
        const divisor = parseInt(parts[2]);
        expect(dividend / divisor).toBe(problem.correctAnswer);
      }
    });
  });

  describe('generateMixedArithmetic', () => {
    it('should generate mixed operations', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 20, numberOfOperands: 2 },
        level: 24,
      };

      const problem = generateMixedArithmetic(context);

      expect(problem.expression).toMatch(/^\d+ [+\-×] \d+$/);
      expect(typeof problem.correctAnswer).toBe('number');
    });

    it('should generate different operation types', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, numberOfOperands: 2 },
        level: 25,
      };

      const operations = new Set();
      for (let i = 0; i < 30; i++) {
        const problem = generateMixedArithmetic(context);
        const match = problem.expression.match(/[+\-×]/);
        if (match) operations.add(match[0]);
      }

      expect(operations.size).toBeGreaterThan(1); // Should have variety
    });
  });
});
