import { describe, it, expect } from 'vitest';
import {
  generateSequences,
  generateSets,
  generateFunctions,
} from '../structural';
import { GeneratorContext } from '../types';

describe('Structural Generators', () => {
  describe('generateSequences', () => {
    it('should generate sequence with next number', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 4, minValue: 1, maxValue: 20 },
        level: 91,
      };

      const problem = generateSequences(context);

      expect(problem.expression).toMatch(/Continúa:/);
      expect(problem.expression).toMatch(/__/);
      expect(typeof problem.correctAnswer).toBe('number');
    });

    it('should generate different sequence types', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 4, minValue: 1, maxValue: 20 },
        level: 91,
      };

      const types = new Set();
      for (let i = 0; i < 20; i++) {
        const problem = generateSequences(context);
        // Try to identify pattern
        const nums = problem.expression.match(/\d+/g);
        if (nums && nums.length >= 3) {
          const n1 = parseInt(nums[0]);
          const n2 = parseInt(nums[1]);
          const n3 = parseInt(nums[2]);

          if (n2 - n1 === n3 - n2) types.add('arithmetic');
          if (n2 / n1 === n3 / n2) types.add('geometric');
        }
      }

      expect(types.size).toBeGreaterThan(0);
    });
  });

  describe('generateSets', () => {
    it('should generate set operation', () => {
      const context: GeneratorContext = {
        config: { setSize: 3, minValue: 1, maxValue: 5, operators: ['∪', '∩'] },
        level: 101,
      };

      const problem = generateSets(context);

      expect(problem.expression).toMatch(/\{.*\}/); // Should have sets
      expect(typeof problem.correctAnswer).toBe('string');
    });

    it('should handle union operation', () => {
      const context: GeneratorContext = {
        config: { setSize: 2, minValue: 1, maxValue: 3, operators: ['∪'] },
        level: 101,
      };

      const problem = generateSets(context);

      expect(problem.expression).toMatch(/∪/);
      // Result should be comma-separated or ∅
      expect(problem.correctAnswer).toMatch(/^\d+(,\d+)*$|^∅$/);
    });

    it('should handle intersection operation', () => {
      const context: GeneratorContext = {
        config: { setSize: 2, minValue: 1, maxValue: 3, operators: ['∩'] },
        level: 102,
      };

      const problem = generateSets(context);

      expect(problem.expression).toMatch(/∩/);
    });
  });

  describe('generateFunctions', () => {
    it('should generate function evaluation', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, variables: ['x'] },
        level: 111,
      };

      const problem = generateFunctions(context);

      expect(problem.expression).toMatch(/f\(x\)/);
      expect(problem.expression).toMatch(/f\(\d+\)/);
      expect(typeof problem.correctAnswer).toBe('number');
    });

    it('should handle different function types', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, variables: ['x'] },
        level: 112,
      };

      const functions = new Set();
      for (let i = 0; i < 20; i++) {
        const problem = generateFunctions(context);
        if (problem.expression.includes('x+')) functions.add('linear');
        if (problem.expression.includes('x²') || problem.expression.includes('x^2')) functions.add('quadratic');
      }

      expect(functions.size).toBeGreaterThan(1);
    });

    it('should handle two-variable functions', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, variables: ['x', 'y'] },
        level: 116,
      };

      const problem = generateFunctions(context);

      expect(problem.expression).toMatch(/f\(x,y\)/);
      expect(problem.expression).toMatch(/f\(\d+,\d+\)/);
      expect(typeof problem.correctAnswer).toBe('number');
    });
  });
});
