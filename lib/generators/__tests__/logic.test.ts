import { describe, it, expect } from 'vitest';
import {
  generateComparison,
  generateLogicalOperators,
  generateCompoundConditions,
} from '../logic';
import { GeneratorContext } from '../types';

describe('Logic Generators', () => {
  describe('generateComparison', () => {
    it('should generate comparison with boolean result', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, operators: ['>', '<', '='] },
        level: 61,
      };

      const problem = generateComparison(context);

      expect(problem.expression).toMatch(/¿\d+ [><=>≤≥] \d+\?/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer);
    });

    it('should use specified operators', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10, operators: ['>'] },
        level: 61,
      };

      const problem = generateComparison(context);

      expect(problem.expression).toMatch(/>/);
    });
  });

  describe('generateLogicalOperators', () => {
    it('should generate logical operation', () => {
      const context: GeneratorContext = {
        config: { operators: ['AND', 'OR'] },
        level: 71,
      };

      const problem = generateLogicalOperators(context);

      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer);
      expect(problem.expression).toMatch(/Verdadero|Falso/);
    });

    it('should handle NOT operator', () => {
      const context: GeneratorContext = {
        config: { operators: ['NOT'] },
        level: 73,
      };

      const problem = generateLogicalOperators(context);

      expect(problem.expression).toMatch(/NOT/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer);
    });
  });

  describe('generateCompoundConditions', () => {
    it('should include variable value and condition', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10 },
        level: 81,
      };

      const problem = generateCompoundConditions(context);

      expect(problem.expression).toMatch(/Si x=\d+/);
      expect(['Verdadero', 'Falso']).toContain(problem.correctAnswer);
    });

    it('should generate range conditions', () => {
      const context: GeneratorContext = {
        config: { minValue: 1, maxValue: 10 },
        level: 84,
      };

      const results = new Set();
      for (let i = 0; i < 20; i++) {
        const problem = generateCompoundConditions(context);
        if (problem.expression.includes('AND')) results.add('AND');
        if (problem.expression.includes('OR')) results.add('OR');
        if (problem.expression.includes('∈')) results.add('range');
      }

      expect(results.size).toBeGreaterThan(1); // Should have variety
    });
  });
});
