/**
 * Integration tests for all generators
 * Verifies that generators respect their configuration parameters
 */

import { describe, it, expect } from 'vitest';
import {
  generateAddition,
  generateSubtraction,
  generateMultiplication,
  generateDivision,
  generateMixedArithmetic,
} from '../arithmetic';
import {
  generateSimpleEquation,
  generateExpressionEvaluation,
  generateSimplification,
} from '../algebra';
import {
  generateComparison,
  generateLogicalOperators,
  generateCompoundConditions,
} from '../logic';
import {
  generateSequences,
  generateSets,
  generateFunctions,
} from '../structural';
import {
  generateSorting,
  generateCounting,
  generateComposition,
} from '../algorithmic';
import { GeneratorContext } from '../types';

describe('Generator Integration Tests', () => {
  describe('Arithmetic Generators', () => {
    it('generateMixedArithmetic should respect mixedOperations config', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 20,
          mixedOperations: ['addition', 'subtraction'],
          numberOfOperands: 2,
        },
        level: 24,
      };

      // Generate 50 problems and verify only addition and subtraction are used
      const operations = new Set<string>();
      for (let i = 0; i < 50; i++) {
        const problem = generateMixedArithmetic(context);

        // Extract operation from expression
        if (problem.expression.includes('+')) operations.add('+');
        if (problem.expression.includes('-') && !problem.expression.startsWith('-')) operations.add('-');
        if (problem.expression.includes('×')) operations.add('×');
        if (problem.expression.includes('÷')) operations.add('÷');
      }

      // Should only have + and -, not × or ÷
      expect(operations.has('+')).toBe(true);
      expect(operations.has('-')).toBe(true);
      expect(operations.has('×')).toBe(false);
      expect(operations.has('÷')).toBe(false);
    });

    it('generateMixedArithmetic should only generate subtraction when specified', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 20,
          mixedOperations: ['subtraction'],
          numberOfOperands: 2,
        },
        level: 24,
      };

      // Generate 20 problems and verify only subtraction is used
      for (let i = 0; i < 20; i++) {
        const problem = generateMixedArithmetic(context);
        expect(problem.expression).toMatch(/^\d+ - \d+$/);
      }
    });

    it('generateMixedArithmetic should handle all four operations', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 20,
          mixedOperations: ['addition', 'subtraction', 'multiplication', 'division'],
          numberOfOperands: 2,
        },
        level: 26,
      };

      const operations = new Set<string>();
      for (let i = 0; i < 100; i++) {
        const problem = generateMixedArithmetic(context);

        if (problem.expression.includes('+')) operations.add('+');
        if (problem.expression.match(/\d+ - \d+/)) operations.add('-');
        if (problem.expression.includes('×')) operations.add('×');
        if (problem.expression.includes('÷')) operations.add('÷');
      }

      // Should have all 4 operations
      expect(operations.size).toBeGreaterThanOrEqual(3); // At least 3 of 4 due to randomness
    });
  });

  describe('Algebraic Generators', () => {
    it('generateSimpleEquation should respect equationType config', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          variables: ['x'],
          equationType: 'x+a=b',
        },
        level: 31,
      };

      // Generate 20 problems and verify they're all x+a=b format
      for (let i = 0; i < 20; i++) {
        const problem = generateSimpleEquation(context);
        expect(problem.expression).toMatch(/^x \+ \d+ = \d+$/);
      }
    });

    it('generateSimpleEquation should generate ax=b when specified', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          variables: ['x'],
          equationType: 'ax=b',
        },
        level: 34,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateSimpleEquation(context);
        expect(problem.expression).toMatch(/^\d+x = \d+$/);
      }
    });

    it('generateExpressionEvaluation should respect expressionType config', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          variables: ['x'],
          expressionType: 'x+a',
        },
        level: 41,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateExpressionEvaluation(context);
        expect(problem.expression).toMatch(/Si x=\d+, ¿x\+\d+\?/);
      }
    });

    it('generateExpressionEvaluation should generate x² when specified', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          variables: ['x'],
          expressionType: 'x²',
        },
        level: 44,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateExpressionEvaluation(context);
        expect(problem.expression).toMatch(/Si x=\d+, ¿x²\?/);
      }
    });

    it('generateSimplification should respect simplificationType config', () => {
      const context: GeneratorContext = {
        config: {
          variables: ['x'],
          simplificationType: 'x+x',
        },
        level: 51,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateSimplification(context);
        expect(problem.expression).toBe('x+x');
        expect(problem.correctAnswer).toBe('2x');
      }
    });
  });

  describe('Logical Generators', () => {
    it('generateCompoundConditions should respect conditionType config', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          variables: ['x'],
          conditionType: 'x>a',
        },
        level: 71,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateCompoundConditions(context);
        expect(problem.expression).toMatch(/Si x=\d+, ¿x>\d+\?/);
      }
    });

    it('generateCompoundConditions should generate range conditions when specified', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 20,
          conditionType: 'range',
        },
        level: 74,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateCompoundConditions(context);
        expect(problem.expression).toMatch(/Si x=\d+, ¿x∈\[\d+,\d+\]\?/);
      }
    });
  });

  describe('Structural Generators', () => {
    it('generateSequences should respect sequenceType config', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 20,
          sequenceLength: 4,
          sequenceType: '+n',
        },
        level: 91,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateSequences(context);
        expect(problem.expression).toMatch(/Continúa: \d+, \d+, \d+, \d+, __/);

        // Verify it's an arithmetic sequence (constant difference)
        const numbers = problem.expression.match(/\d+/g)?.map(Number);
        if (numbers && numbers.length >= 4) {
          const diff1 = numbers[1] - numbers[0];
          const diff2 = numbers[2] - numbers[1];
          const diff3 = numbers[3] - numbers[2];
          expect(diff1).toBe(diff2);
          expect(diff2).toBe(diff3);
          expect(diff1).toBeGreaterThan(0); // Should be increasing
        }
      }
    });

    it('generateSequences should generate fibonacci when specified', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 50,
          sequenceLength: 6,
          sequenceType: 'fibonacci',
        },
        level: 97,
      };

      const problem = generateSequences(context);
      expect(problem.expression).toMatch(/Continúa: 1, 1, 2, 3, 5, 8, __/);
    });

    it('generateFunctions should respect functionType config', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          variables: ['x'],
          functionType: 'x+a',
        },
        level: 91,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateFunctions(context);
        expect(problem.expression).toMatch(/f\(x\)=x\+\d+, f\(\d+\)=\?/);
      }
    });

    it('generateFunctions should generate quadratic when specified', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          variables: ['x'],
          functionType: 'x²',
        },
        level: 94,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateFunctions(context);
        expect(problem.expression).toMatch(/f\(x\)=x², f\(\d+\)=\?/);
      }
    });
  });

  describe('Algorithmic Generators', () => {
    it('generateSorting should respect sortingType config', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          sequenceLength: 4,
          sortingType: 'sort-asc',
        },
        level: 101,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateSorting(context);
        expect(problem.expression).toMatch(/Ordena: \[[\d, ]+\]/);

        // Verify answer is sorted ascending
        const sorted = (problem.correctAnswer as string).split(',').map(Number);
        for (let j = 1; j < sorted.length; j++) {
          expect(sorted[j]).toBeGreaterThanOrEqual(sorted[j - 1]);
        }
      }
    });

    it('generateSorting should find minimum when specified', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          sequenceLength: 4,
          sortingType: 'min',
        },
        level: 105,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateSorting(context);
        expect(problem.expression).toMatch(/Mínimo de \[[\d, ]+\]/);
        expect(typeof problem.correctAnswer).toBe('number');
      }
    });

    it('generateCounting should respect countingType config', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          sequenceLength: 5,
          countingType: 'count-even',
        },
        level: 112,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateCounting(context);
        expect(problem.expression).toMatch(/¿Cuántos pares\?: \[[\d, ]+\]/);
        expect(typeof problem.correctAnswer).toBe('number');
      }
    });

    it('generateComposition should respect compositionType config', () => {
      const context: GeneratorContext = {
        config: {
          minValue: 1,
          maxValue: 10,
          sequenceLength: 3,
          compositionType: 'map+n',
        },
        level: 141,
      };

      for (let i = 0; i < 20; i++) {
        const problem = generateComposition(context);
        expect(problem.expression).toMatch(/Aplica \+\d+ a: \[[\d, ]+\]/);
      }
    });
  });

  describe('Backward Compatibility', () => {
    it('generators should work without specific config (random selection)', () => {
      // Test that generators still work with minimal config (backward compatibility)
      const contexts: Array<{ generator: Function; config: any }> = [
        {
          generator: generateMixedArithmetic,
          config: { minValue: 1, maxValue: 20, numberOfOperands: 2 },
        },
        {
          generator: generateSimpleEquation,
          config: { minValue: 1, maxValue: 10 },
        },
        {
          generator: generateExpressionEvaluation,
          config: { minValue: 1, maxValue: 10, variables: ['x'] },
        },
        {
          generator: generateSequences,
          config: { minValue: 1, maxValue: 20, sequenceLength: 4 },
        },
        {
          generator: generateFunctions,
          config: { minValue: 1, maxValue: 10, variables: ['x'] },
        },
        {
          generator: generateSorting,
          config: { minValue: 1, maxValue: 10, sequenceLength: 4 },
        },
        {
          generator: generateCounting,
          config: { minValue: 1, maxValue: 10, sequenceLength: 5 },
        },
        {
          generator: generateComposition,
          config: { minValue: 1, maxValue: 10, sequenceLength: 3 },
        },
      ];

      contexts.forEach(({ generator, config }) => {
        const context: GeneratorContext = { config, level: 1 };

        // Should not throw and should return valid problem
        const problem = generator(context);
        expect(problem).toHaveProperty('expression');
        expect(problem).toHaveProperty('correctAnswer');
        expect(problem).toHaveProperty('problemKey');
      });
    });
  });

  describe('Level 24 Specific Test', () => {
    it('Level 24 should only generate addition and subtraction', () => {
      // This is the specific bug that was reported
      const level24Config: GeneratorContext = {
        config: {
          mixedOperations: ['addition', 'subtraction'],
          minValue: 1,
          maxValue: 20,
          numberOfOperands: 2,
        },
        level: 24,
      };

      const operations = new Set<string>();

      // Generate 100 problems to be very confident
      for (let i = 0; i < 100; i++) {
        const problem = generateMixedArithmetic(level24Config);

        if (problem.expression.includes('+')) operations.add('+');
        if (problem.expression.match(/\d+ - \d+/)) operations.add('-');
        if (problem.expression.includes('×')) operations.add('×');
        if (problem.expression.includes('÷')) operations.add('÷');
      }

      // Verify: should have + and -, should NOT have × or ÷
      expect(operations.has('+')).toBe(true);
      expect(operations.has('-')).toBe(true);
      expect(operations.has('×')).toBe(false);
      expect(operations.has('÷')).toBe(false);
      expect(operations.size).toBe(2);
    });
  });
});
