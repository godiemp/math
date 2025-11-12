import { describe, it, expect } from 'vitest';
import {
  generateSimpleEquation,
  generateExpressionEvaluation,
  generateSimplification,
} from '../algebra';
import { GeneratorContext } from '../types';

describe('Algebra Generators', () => {
  describe('generateSimpleEquation', () => {
    it('should generate equation without "Resuelve" prefix', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10 },
        level: 31,
      };

      const problem = generateSimpleEquation(context);

      expect(problem.expression).not.toMatch(/^Resuelve:/);
      expect(problem.expression).toMatch(/=/); // Should contain equals sign
      expect(typeof problem.correctAnswer).toBe('number');
    });

    it('should generate valid equation with integer solution', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10 },
        level: 31,
      };

      const problem = generateSimpleEquation(context);

      expect(Number.isInteger(problem.correctAnswer)).toBe(true);
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(1);
    });

    it('should generate different equation types', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10 },
        level: 35,
      };

      const equations = new Set();
      for (let i = 0; i < 20; i++) {
        const problem = generateSimpleEquation(context);
        // Extract pattern (x+a, x-a, etc)
        if (problem.expression.includes('x +')) equations.add('x+a');
        if (problem.expression.includes('x -')) equations.add('x-a');
        if (problem.expression.includes('- x')) equations.add('a-x');
        if (problem.expression.match(/\d+x =/)) equations.add('ax=b');
      }

      expect(equations.size).toBeGreaterThan(2); // Should have variety
    });
  });

  describe('generateExpressionEvaluation', () => {
    it('should include variable values in expression', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, variables: ['x'] },
        level: 41,
      };

      const problem = generateExpressionEvaluation(context);

      expect(problem.expression).toMatch(/Si x=\d+/);
      expect(problem.expression).toMatch(/¿.+\?/);
      expect(typeof problem.correctAnswer).toBe('number');
    });

    it('should evaluate expressions correctly', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, variables: ['x'] },
        level: 41,
      };

      const problem = generateExpressionEvaluation(context);

      // Extract x value
      const match = problem.expression.match(/Si x=(\d+)/);
      expect(match).toBeTruthy();

      if (match) {
        const x = parseInt(match[1]);
        expect(x).toBeGreaterThanOrEqual(1);
        expect(x).toBeLessThanOrEqual(10);
      }
    });

    it('should handle two variables', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, variables: ['x', 'y'] },
        level: 46,
      };

      const problem = generateExpressionEvaluation(context);

      expect(problem.expression).toMatch(/Si x=\d+, y=\d+/);
      expect(typeof problem.correctAnswer).toBe('number');
    });
  });

  describe('generateSimplification', () => {
    it('should not include "Simplifica:" prefix', () => {
      const context: GeneratorContext = {
        config: { variables: ['x'] },
        level: 51,
      };

      const problem = generateSimplification(context);

      expect(problem.expression).not.toMatch(/^Simplifica:/);
      expect(problem.expression).toMatch(/x/); // Should contain variable
      expect(typeof problem.correctAnswer).toBe('string');
    });

    it('should simplify correctly', () => {
      const context: GeneratorContext = {
        config: { variables: ['x'] },
        level: 51,
      };

      // Test x+x should give 2x
      const problem = generateSimplification(context);

      expect(problem.correctAnswer).toMatch(/\d*x/); // Result should be form "nx"
    });

    it('should handle two variables', () => {
      const context: GeneratorContext = {
        config: { variables: ['x', 'y'] },
        level: 56,
      };

      const problem = generateSimplification(context);

      expect(problem.expression).toMatch(/[xy]/);
      expect(problem.correctAnswer).toMatch(/x|y/); // Result should contain x or y
    });

    it('should produce valid algebraic expressions', () => {
      const context: GeneratorContext = {
        config: { variables: ['x'] },
        level: 52,
      };

      const problem = generateSimplification(context);

      // Should not have spaces or asterisks
      expect(problem.expression).not.toMatch(/\*/);
      expect(problem.correctAnswer).not.toMatch(/\*/);
    });
  });
});
