import { describe, it, expect } from 'vitest';
import {
  generateSorting,
  generateCounting,
  generateComposition,
} from '../algorithmic';
import { GeneratorContext } from '../types';

describe('Algorithmic Generators', () => {
  describe('generateSorting', () => {
    it('should generate sorting problem', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 4, minValue: 1, maxValue: 10 },
        level: 121,
      };

      const problem = generateSorting(context);

      expect(problem.expression).toMatch(/\[.*\]/);
      expect(problem.correctAnswer).toBeDefined();
    });

    it('should sort ascending correctly', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 4, minValue: 1, maxValue: 10, sortingType: 'sort-asc' },
        level: 121,
      };

      // Generate multiple ascending sort problems
      for (let i = 0; i < 10; i++) {
        const problem = generateSorting(context);
        expect(problem.expression).toContain('Ordena:');
        expect(problem.expression).not.toContain('mayor a menor');

        const resultNums = problem.correctAnswer.toString().split(',').map(Number);
        const isSorted = resultNums.every((val, idx, arr) => idx === 0 || arr[idx - 1] <= val);
        expect(isSorted).toBe(true);
      }
    });

    it('should find min/max correctly', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 5, minValue: 1, maxValue: 10 },
        level: 125,
      };

      let foundMinOrMax = false;
      for (let i = 0; i < 20; i++) {
        const problem = generateSorting(context);
        if (problem.expression.includes('Mínimo') || problem.expression.includes('Máximo')) {
          expect(typeof problem.correctAnswer).toBe('number');
          foundMinOrMax = true;
          break;
        }
      }

      expect(foundMinOrMax).toBe(true);
    });

    it('should calculate median correctly', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 5, minValue: 1, maxValue: 10 },
        level: 127,
      };

      let foundMedian = false;
      for (let i = 0; i < 20; i++) {
        const problem = generateSorting(context);
        if (problem.expression.includes('Mediana')) {
          expect(typeof problem.correctAnswer).toBe('number');
          foundMedian = true;
          break;
        }
      }

      expect(foundMedian).toBe(true);
    });
  });

  describe('generateCounting', () => {
    it('should generate counting problem', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 5, minValue: 1, maxValue: 10 },
        level: 131,
      };

      const problem = generateCounting(context);

      expect(problem.expression).toMatch(/\[.*\]/);
      expect(typeof problem.correctAnswer).toBe('number');
    });

    it('should count even numbers correctly', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 5, minValue: 1, maxValue: 10 },
        level: 132,
      };

      let foundEvenCount = false;
      for (let i = 0; i < 20; i++) {
        const problem = generateCounting(context);
        if (problem.expression.includes('¿Cuántos pares?')) {
          // This is counting, not summing
          expect(typeof problem.correctAnswer).toBe('number');
          expect(problem.correctAnswer).toBeGreaterThanOrEqual(0);
          expect(problem.correctAnswer).toBeLessThanOrEqual(5);
          foundEvenCount = true;
          break;
        } else if (problem.expression.includes('Suma los pares')) {
          // This is sum of evens, can be larger
          expect(typeof problem.correctAnswer).toBe('number');
          expect(problem.correctAnswer).toBeGreaterThanOrEqual(0);
          foundEvenCount = true;
          break;
        }
      }

      expect(foundEvenCount).toBe(true);
    });

    it('should handle different counting types', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 5, minValue: 1, maxValue: 10 },
        level: 135,
      };

      const types = new Set();
      for (let i = 0; i < 30; i++) {
        const problem = generateCounting(context);
        if (problem.expression.includes('pares')) types.add('even');
        if (problem.expression.includes('impares')) types.add('odd');
        if (problem.expression.includes('múltiplos')) types.add('multiples');
        if (problem.expression.includes('Suma')) types.add('sum');
      }

      expect(types.size).toBeGreaterThan(2);
    });
  });

  describe('generateComposition', () => {
    it('should generate composition problem', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 3, minValue: 1, maxValue: 10 },
        level: 141,
      };

      const problem = generateComposition(context);

      expect(problem.expression).toMatch(/\[.*\]/);
      expect(problem.correctAnswer).toBeDefined();
    });

    it('should handle map operations', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 3, minValue: 1, maxValue: 10 },
        level: 141,
      };

      let foundMap = false;
      for (let i = 0; i < 20; i++) {
        const problem = generateComposition(context);
        if (problem.expression.includes('Aplica')) {
          // Map result should be comma-separated numbers
          if (typeof problem.correctAnswer === 'string') {
            expect(problem.correctAnswer).toMatch(/^\d+(,\d+)*$/);
          }
          foundMap = true;
          break;
        }
      }

      expect(foundMap).toBe(true);
    });

    it('should handle filter operations', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 4, minValue: 1, maxValue: 10 },
        level: 144,
      };

      let foundFilter = false;
      for (let i = 0; i < 20; i++) {
        const problem = generateComposition(context);
        if (problem.expression.includes('Filtra') || problem.expression.includes('pares')) {
          expect(typeof problem.correctAnswer).toBe('string');
          // Result should be numbers or empty set
          expect(problem.correctAnswer).toMatch(/^\d+(,\d+)*$|^∅$/);
          foundFilter = true;
          break;
        }
      }

      expect(foundFilter).toBe(true);
    });

    it('should handle reduce operations', () => {
      const context: GeneratorContext = {
        config: { sequenceLength: 3, minValue: 1, maxValue: 10 },
        level: 147,
      };

      let foundReduce = false;
      for (let i = 0; i < 20; i++) {
        const problem = generateComposition(context);
        if (problem.expression.includes('suma')) {
          expect(typeof problem.correctAnswer).toBe('number');
          foundReduce = true;
          break;
        }
      }

      expect(foundReduce).toBe(true);
    });
  });
});
