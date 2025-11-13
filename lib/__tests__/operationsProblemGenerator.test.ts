import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateProblem,
  validateAnswer,
  clearProblemHistory,
} from '../operationsProblemGenerator';
import { OPERATIONS_PATH } from '../operationsPath';

describe('Operation Problem Generator (Integration)', () => {
  beforeEach(() => {
    // Clear history before each test
    for (let i = 1; i <= 120; i++) {
      clearProblemHistory(i);
    }
  });

  describe('generateProblem', () => {
    it('should generate problem for each level', () => {
      // Test a sample of levels
      const testLevels = [1, 5, 15, 31, 51, 71, 91, 111];

      for (const levelNum of testLevels) {
        const levelConfig = OPERATIONS_PATH.find(l => l.level === levelNum);
        expect(levelConfig).toBeDefined();

        if (levelConfig) {
          const problem = generateProblem(levelConfig);

          expect(problem).toHaveProperty('expression');
          expect(problem).toHaveProperty('expressionLatex');
          expect(problem).toHaveProperty('correctAnswer');
          expect(problem).toHaveProperty('title');
          expect(problem).toHaveProperty('description');
          expect(problem).toHaveProperty('level');
          expect(problem).toHaveProperty('difficulty');
          expect(problem).toHaveProperty('problemsToComplete');
          expect(problem.level).toBe(levelNum);
        }
      }
    });

    it('should generate unique problems using history', () => {
      const levelConfig = OPERATIONS_PATH.find(l => l.level === 1);
      expect(levelConfig).toBeDefined();

      if (levelConfig) {
        const problems = new Set();

        for (let i = 0; i < 10; i++) {
          const problem = generateProblem(levelConfig);
          problems.add(problem.expression);
        }

        // Should generate at least some variety (may have duplicates due to randomness)
        expect(problems.size).toBeGreaterThan(1);
      }
    });

    it('should handle all operation types', () => {
      const operationTypes = new Set(OPERATIONS_PATH.map(l => l.operationType));

      for (const opType of operationTypes) {
        const levelConfig = OPERATIONS_PATH.find(l => l.operationType === opType);
        expect(levelConfig).toBeDefined();

        if (levelConfig) {
          const problem = generateProblem(levelConfig);
          expect(problem.expression).toBeTruthy();
          expect(problem.correctAnswer).toBeDefined();
        }
      }
    });

    it('should not include "Simplifica:" prefix in simplification problems', () => {
      const simplificationLevel = OPERATIONS_PATH.find(l => l.operationType === 'simplification');
      expect(simplificationLevel).toBeDefined();

      if (simplificationLevel) {
        const problem = generateProblem(simplificationLevel);
        expect(problem.expression).not.toMatch(/^Simplifica:/);
      }
    });

    it('should not include "Resuelve:" prefix in equation problems', () => {
      const equationLevel = OPERATIONS_PATH.find(l => l.operationType === 'simple-equation');
      expect(equationLevel).toBeDefined();

      if (equationLevel) {
        const problem = generateProblem(equationLevel);
        expect(problem.expression).not.toMatch(/^Resuelve:/);
      }
    });
  });

  describe('validateAnswer', () => {
    it('should validate numeric answers correctly', () => {
      expect(validateAnswer('42', 42)).toBe(true);
      expect(validateAnswer('42', 43)).toBe(false);
      expect(validateAnswer('3.14', 3.14)).toBe(true);
      expect(validateAnswer(' 42 ', 42)).toBe(true); // Trimmed
    });

    it('should validate boolean answers with aliases', () => {
      expect(validateAnswer('Verdadero', 'Verdadero')).toBe(true);
      expect(validateAnswer('True', 'Verdadero')).toBe(true);
      expect(validateAnswer('V', 'Verdadero')).toBe(true);
      expect(validateAnswer('Si', 'Verdadero')).toBe(true);
      expect(validateAnswer('Sí', 'Verdadero')).toBe(true);

      expect(validateAnswer('Falso', 'Falso')).toBe(true);
      expect(validateAnswer('False', 'Falso')).toBe(true);
      expect(validateAnswer('F', 'Falso')).toBe(true);
      expect(validateAnswer('No', 'Falso')).toBe(true);
    });

    it('should validate set notation flexibly', () => {
      expect(validateAnswer('1,2,3', '1,2,3')).toBe(true);
      expect(validateAnswer('3,1,2', '1,2,3')).toBe(true); // Order doesn't matter
      expect(validateAnswer('{1,2,3}', '1,2,3')).toBe(true);
      expect(validateAnswer('1, 2, 3', '1,2,3')).toBe(true); // Spaces ignored
    });

    it('should validate empty set', () => {
      expect(validateAnswer('∅', '∅')).toBe(true);
      expect(validateAnswer('vacio', '∅')).toBe(true);
      expect(validateAnswer('vacío', '∅')).toBe(true);
      expect(validateAnswer('{}', '∅')).toBe(true);
      expect(validateAnswer('', '∅')).toBe(true);
    });

    it('should validate algebraic expressions', () => {
      expect(validateAnswer('2x', '2x')).toBe(true);
      expect(validateAnswer('2x+3', '2x+3')).toBe(true);
      expect(validateAnswer('2 x + 3', '2x+3')).toBe(true); // Spaces normalized
      expect(validateAnswer('2x+3', '2x + 3')).toBe(true);
    });

    it('should be case insensitive for strings', () => {
      expect(validateAnswer('verdadero', 'Verdadero')).toBe(true);
      expect(validateAnswer('VERDADERO', 'Verdadero')).toBe(true);
    });
  });

  describe('clearProblemHistory', () => {
    it('should clear history for a level', () => {
      const levelConfig = OPERATIONS_PATH.find(l => l.level === 1);
      expect(levelConfig).toBeDefined();

      if (levelConfig) {
        // Generate some problems to populate history
        for (let i = 0; i < 5; i++) {
          generateProblem(levelConfig);
        }

        // Clear history
        clearProblemHistory(1);

        // Generate again - should work fine
        const problem = generateProblem(levelConfig);
        expect(problem).toBeDefined();
      }
    });
  });

  describe('All 120 levels', () => {
    it('should be able to generate problems for all 120 levels', () => {
      const failedLevels = [];

      for (let i = 1; i <= 120; i++) {
        const levelConfig = OPERATIONS_PATH.find(l => l.level === i);

        if (!levelConfig) {
          failedLevels.push(i);
          continue;
        }

        try {
          const problem = generateProblem(levelConfig);
          expect(problem.expression).toBeTruthy();
          expect(problem.correctAnswer).toBeDefined();
        } catch (error) {
          failedLevels.push(i);
        }
      }

      expect(failedLevels).toEqual([]); // All levels should work
    });
  });
});
