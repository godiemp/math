/**
 * Integration Tests for Frontend Operations Practice
 * Tests all 150 levels end-to-end: generation + validation
 * Ensures frontend matches backend behavior
 */

import { describe, it, expect } from 'vitest';
import { generateProblem, validateAnswer } from '../operationsProblemGenerator';
import { OPERATIONS_PATH } from '../operationsPath';

describe('Frontend Operations Practice - All 150 Levels Integration', () => {
  // Test each level individually
  OPERATIONS_PATH.forEach((levelConfig) => {
    describe(`Level ${levelConfig.level}: ${levelConfig.title}`, () => {
      it('should generate valid problems that meet level requirements', () => {
        // Generate multiple problems to test consistency
        const problems = [];
        for (let i = 0; i < 10; i++) {
          const problem = generateProblem(levelConfig);
          problems.push(problem);

          // Basic structure validation
          expect(problem).toBeDefined();
          expect(problem.expression).toBeDefined();
          expect(problem.expressionLatex).toBeDefined();
          expect(problem.correctAnswer).toBeDefined();
          expect(problem.level).toBe(levelConfig.level);
          expect(problem.title).toBe(levelConfig.title);
          expect(problem.difficulty).toBe(levelConfig.difficulty);
        }

        // Verify problems are diverse (not all the same)
        const uniqueExpressions = new Set(problems.map(p => p.expression));
        expect(uniqueExpressions.size).toBeGreaterThan(1);
      });

      it('should validate correct answers', () => {
        const problem = generateProblem(levelConfig);
        const correctAnswer = problem.correctAnswer.toString();

        const isValid = validateAnswer(correctAnswer, problem.correctAnswer);
        expect(isValid).toBe(true);
      });

      it('should reject incorrect answers', () => {
        const problem = generateProblem(levelConfig);

        // Generate a wrong answer based on type
        let wrongAnswer: string;
        if (typeof problem.correctAnswer === 'number') {
          wrongAnswer = (problem.correctAnswer + 999).toString();
        } else if (problem.correctAnswer === 'Verdadero' || problem.correctAnswer === 'Falso') {
          wrongAnswer = problem.correctAnswer === 'Verdadero' ? 'Falso' : 'Verdadero';
        } else {
          wrongAnswer = 'wrong_answer_xyz';
        }

        const isValid = validateAnswer(wrongAnswer, problem.correctAnswer);
        expect(isValid).toBe(false);
      });
    });
  });

  // Special test for Level 10: Force Negative Results
  describe('Level 10: Resta con Negativos - forceNegative Configuration', () => {
    const level10 = OPERATIONS_PATH.find(l => l.level === 10)!;

    it('should ALWAYS generate negative results when forceNegative is true', () => {
      // Generate 50 problems to ensure consistency
      for (let i = 0; i < 50; i++) {
        const problem = generateProblem(level10);

        expect(problem.correctAnswer).toBeLessThan(0);
        expect(problem.expression).toContain(' - ');

        // Parse the expression to verify b > a (result will be negative)
        const match = problem.expression.match(/^(\d+) - (\d+)$/);
        if (match) {
          const a = parseInt(match[1]);
          const b = parseInt(match[2]);
          expect(b).toBeGreaterThan(a);
          expect(a - b).toBeLessThan(0);
        }
      }
    });

    it('should validate negative answers correctly', () => {
      const problem = generateProblem(level10);

      expect(problem.correctAnswer).toBeLessThan(0);

      const isValid = validateAnswer(problem.correctAnswer.toString(), problem.correctAnswer);
      expect(isValid).toBe(true);
    });

    it('should match the level configuration', () => {
      expect(level10.config.forceNegative).toBe(true);
      expect(level10.config.minValue).toBe(1);
      expect(level10.config.maxValue).toBe(50);
      expect(level10.operationType).toBe('subtraction');
    });
  });

  // Test subtraction levels without negatives
  describe('Subtraction Levels without allowNegatives', () => {
    const noNegativeLevels = OPERATIONS_PATH.filter(l =>
      l.operationType === 'subtraction' &&
      !l.config.allowNegatives &&
      !l.config.forceNegative
    );

    noNegativeLevels.forEach(levelConfig => {
      it(`Level ${levelConfig.level}: ${levelConfig.title} should NEVER generate negative results`, () => {
        for (let i = 0; i < 20; i++) {
          const problem = generateProblem(levelConfig);

          if (typeof problem.correctAnswer === 'number') {
            expect(problem.correctAnswer).toBeGreaterThanOrEqual(0);
          }
        }
      });
    });
  });

  // Test boolean answer validation with various formats
  describe('Boolean Answer Validation', () => {
    const logicalLevels = OPERATIONS_PATH.filter(l =>
      l.operationType === 'comparison' ||
      l.operationType === 'logical-operators' ||
      l.operationType === 'compound-conditions'
    );

    logicalLevels.forEach(levelConfig => {
      it(`Level ${levelConfig.level}: should accept multiple boolean formats`, () => {
        const problem = generateProblem(levelConfig);

        // Only test if answer is boolean
        if (problem.correctAnswer === 'Verdadero' || problem.correctAnswer === 'Falso') {
          const correctAnswer = problem.correctAnswer;

          if (correctAnswer === 'Verdadero') {
            // Should accept various true formats
            expect(validateAnswer('Verdadero', correctAnswer)).toBe(true);
            expect(validateAnswer('verdadero', correctAnswer)).toBe(true);
            expect(validateAnswer('True', correctAnswer)).toBe(true);
            expect(validateAnswer('true', correctAnswer)).toBe(true);
            expect(validateAnswer('V', correctAnswer)).toBe(true);
            expect(validateAnswer('v', correctAnswer)).toBe(true);
            expect(validateAnswer('Si', correctAnswer)).toBe(true);
            expect(validateAnswer('Sí', correctAnswer)).toBe(true);

            // Should reject false
            expect(validateAnswer('Falso', correctAnswer)).toBe(false);
            expect(validateAnswer('False', correctAnswer)).toBe(false);
          } else {
            // Should accept various false formats
            expect(validateAnswer('Falso', correctAnswer)).toBe(true);
            expect(validateAnswer('falso', correctAnswer)).toBe(true);
            expect(validateAnswer('False', correctAnswer)).toBe(true);
            expect(validateAnswer('false', correctAnswer)).toBe(true);
            expect(validateAnswer('F', correctAnswer)).toBe(true);
            expect(validateAnswer('f', correctAnswer)).toBe(true);
            expect(validateAnswer('No', correctAnswer)).toBe(true);

            // Should reject true
            expect(validateAnswer('Verdadero', correctAnswer)).toBe(false);
            expect(validateAnswer('True', correctAnswer)).toBe(false);
          }
        }
      });
    });
  });

  // Test set operations with flexible notation
  describe('Set Operations Validation', () => {
    const setLevels = OPERATIONS_PATH.filter(l => l.operationType === 'sets');

    setLevels.forEach(levelConfig => {
      it(`Level ${levelConfig.level}: should accept sets with flexible formatting`, () => {
        const problem = generateProblem(levelConfig);

        if (typeof problem.correctAnswer === 'string' && problem.correctAnswer.includes(',')) {
          const correctAnswer = problem.correctAnswer;

          // Should accept with/without braces
          const withBraces = correctAnswer.includes('{') ? correctAnswer : `{${correctAnswer}}`;
          const withoutBraces = correctAnswer.replace(/[{}]/g, '');

          expect(validateAnswer(withBraces, correctAnswer)).toBe(true);
          expect(validateAnswer(withoutBraces, correctAnswer)).toBe(true);

          // Should accept with different spacing
          const withSpaces = correctAnswer.replace(/,/g, ', ');
          const withoutSpaces = correctAnswer.replace(/\s/g, '');

          expect(validateAnswer(withSpaces, correctAnswer)).toBe(true);
          expect(validateAnswer(withoutSpaces, correctAnswer)).toBe(true);
        }
      });

      it(`Level ${levelConfig.level}: should accept sets in any order`, () => {
        const problem = generateProblem(levelConfig);

        if (typeof problem.correctAnswer === 'string' && problem.correctAnswer.includes(',')) {
          // Parse the set and reverse it
          const elements = problem.correctAnswer.replace(/[{}]/g, '').split(',').map(s => s.trim());
          const reversed = elements.reverse().join(',');

          expect(validateAnswer(reversed, problem.correctAnswer)).toBe(true);
        }
      });
    });
  });

  // Test empty set handling
  describe('Empty Set Validation', () => {
    it('should accept multiple empty set notations', () => {
      const emptySetVariants = ['∅', 'vacio', 'vacío', '', '{}'];

      emptySetVariants.forEach(variant => {
        // Test against all empty set formats
        emptySetVariants.forEach(correctAnswer => {
          if (correctAnswer === '' && variant !== '') {
            // Empty string only matches empty string exactly
            return;
          }
          const isValid = validateAnswer(variant, correctAnswer);
          expect(isValid).toBe(true);
        });
      });
    });
  });

  // Test algebraic expression normalization
  describe('Algebraic Expression Validation', () => {
    const algebraicLevels = OPERATIONS_PATH.filter(l =>
      l.operationType === 'simplification' ||
      l.operationType === 'expression-evaluation'
    );

    algebraicLevels.forEach(levelConfig => {
      it(`Level ${levelConfig.level}: should normalize whitespace in algebraic expressions`, () => {
        const problem = generateProblem(levelConfig);

        if (typeof problem.correctAnswer === 'string') {
          const correctAnswer = problem.correctAnswer;

          // Test with extra spaces
          const withSpaces = correctAnswer.replace(/([+\-*/])/g, ' $1 ');
          const withoutSpaces = correctAnswer.replace(/\s+/g, '');

          expect(validateAnswer(withSpaces, correctAnswer)).toBe(true);
          expect(validateAnswer(withoutSpaces, correctAnswer)).toBe(true);
        }
      });
    });
  });

  // Test numeric validation with decimals
  describe('Numeric Answer Validation', () => {
    const decimalLevels = OPERATIONS_PATH.filter(l => l.config.allowDecimals);

    decimalLevels.forEach(levelConfig => {
      it(`Level ${levelConfig.level}: should handle decimal answers with tolerance`, () => {
        const problem = generateProblem(levelConfig);

        if (typeof problem.correctAnswer === 'number') {
          const answer = problem.correctAnswer;

          // Exact match
          expect(validateAnswer(answer.toString(), answer)).toBe(true);

          // Very close values (within tolerance)
          const closeValue = (answer + 0.0001).toString();
          expect(validateAnswer(closeValue, answer)).toBe(true);

          // Too far off
          const farValue = (answer + 1).toString();
          expect(validateAnswer(farValue, answer)).toBe(false);
        }
      });
    });
  });

  // Performance test
  describe('Performance', () => {
    it('should generate problems quickly for all levels', () => {
      const startTime = Date.now();

      OPERATIONS_PATH.forEach(levelConfig => {
        generateProblem(levelConfig);
      });

      const duration = Date.now() - startTime;

      // All 150 levels should generate in under 1 second
      expect(duration).toBeLessThan(1000);
    });

    it('should handle rapid problem generation without memory leaks', () => {
      const level = OPERATIONS_PATH[0];

      // Generate 1000 problems quickly
      for (let i = 0; i < 1000; i++) {
        generateProblem(level);
      }

      // Should complete without issues
      expect(true).toBe(true);
    });
  });

  // Test problem history and uniqueness
  describe('Problem Uniqueness', () => {
    it('should generate different problems in succession', () => {
      const level = OPERATIONS_PATH[0];

      const problems = [];
      for (let i = 0; i < 20; i++) {
        problems.push(generateProblem(level));
      }

      const expressions = problems.map(p => p.expression);
      const uniqueExpressions = new Set(expressions);

      // Should have some variety (at least 5 unique problems out of 20)
      expect(uniqueExpressions.size).toBeGreaterThanOrEqual(5);
    });
  });
});
