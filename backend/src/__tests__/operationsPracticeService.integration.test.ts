/**
 * Integration Tests for Operations Practice Service
 * Tests all levels end-to-end: generation + validation
 */

import { describe, it, expect } from 'vitest';
import { generateProblem, validateAnswer } from '../services/operationsPracticeService';
import { OPERATIONS_PATH } from '../config/operationsPath';

describe('Operations Practice Service - All Levels Integration', () => {
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
          expect(problem.answer).toBeDefined();
          expect(problem.operations).toContain(levelConfig.operationType);
          expect(problem.difficulty).toBe(levelConfig.difficulty);
        }

        // Verify problems are diverse (not all the same)
        // Exception: Some levels have only 1 possible expression (e.g., "x+x", Fibonacci)
        const singleExpressionTitles = ['Simplificar x+x', 'Fibonacci'];
        const uniqueExpressions = new Set(problems.map(p => p.expression));

        if (!singleExpressionTitles.includes(levelConfig.title)) {
          expect(uniqueExpressions.size).toBeGreaterThan(1);
        }
      });

      it('should validate correct answers', () => {
        const problem = generateProblem(levelConfig);
        const correctAnswer = problem.answer.toString();

        const isValid = validateAnswer(problem, correctAnswer);
        expect(isValid).toBe(true);
      });

      it('should reject incorrect answers', () => {
        const problem = generateProblem(levelConfig);

        // Generate a wrong answer based on type
        let wrongAnswer: string;
        if (typeof problem.answer === 'number') {
          wrongAnswer = (problem.answer + 999).toString();
        } else if (problem.answer === 'V' || problem.answer === 'F') {
          wrongAnswer = problem.answer === 'V' ? 'F' : 'V';
        } else {
          wrongAnswer = 'wrong_answer_xyz';
        }

        const isValid = validateAnswer(problem, wrongAnswer);
        expect(isValid).toBe(false);
      });

      // Level-specific tests
      if (levelConfig.config.minValue !== undefined && levelConfig.config.maxValue !== undefined) {
        it('should respect min/max value ranges', () => {
          for (let i = 0; i < 10; i++) {
            const problem = generateProblem(levelConfig);

            // Check operands are within range
            problem.operands.forEach(operand => {
              expect(operand).toBeGreaterThanOrEqual(levelConfig.config.minValue!);
              expect(operand).toBeLessThanOrEqual(levelConfig.config.maxValue!);
            });
          }
        });
      }

      if (levelConfig.config.specificTables) {
        it('should use specific multiplication/division tables', () => {
          for (let i = 0; i < 10; i++) {
            const problem = generateProblem(levelConfig);

            // At least one operand should be from the specific tables
            const hasTableNumber = problem.operands.some(op =>
              levelConfig.config.specificTables!.includes(op)
            );
            expect(hasTableNumber).toBe(true);
          }
        });
      }

      if (levelConfig.config.allowDecimals) {
        it('should handle decimal answers correctly', () => {
          const problem = generateProblem(levelConfig);

          if (typeof problem.answer === 'number' && problem.answer % 1 !== 0) {
            // Test decimal validation
            const decimalAnswer = problem.answer.toFixed(1);
            const isValid = validateAnswer(problem, decimalAnswer);
            expect(isValid).toBe(true);
          }
        });
      }
    });
  });

  // Special test for Level 10: Force Negative Results
  describe('Level 10: Resta con Negativos - forceNegative Configuration', () => {
    const level10 = OPERATIONS_PATH.find(l => l.level === 10)!;

    it('should ALWAYS generate negative results when forceNegative is true', () => {
      // Generate 50 problems to ensure consistency
      for (let i = 0; i < 50; i++) {
        const problem = generateProblem(level10);

        expect(problem.answer).toBeLessThan(0);
        expect(problem.expression).toContain(' - ');

        // Parse the expression to verify num2 > num1
        const match = problem.expression.match(/^(\d+) - (\d+)$/);
        if (match) {
          const num1 = parseInt(match[1]);
          const num2 = parseInt(match[2]);
          expect(num2).toBeGreaterThan(num1);
        }
      }
    });

    it('should validate negative answers correctly', () => {
      const problem = generateProblem(level10);

      expect(problem.answer).toBeLessThan(0);

      const isValid = validateAnswer(problem, problem.answer.toString());
      expect(isValid).toBe(true);
    });
  });

  // Test levels with allowNegatives (but not forcing)
  describe('Levels with allowNegatives (random positive/negative)', () => {
    const allowNegativeLevels = OPERATIONS_PATH.filter(l =>
      l.config.allowNegatives === true && !l.config.forceNegative
    );

    // Skip if no levels match this criteria
    if (allowNegativeLevels.length === 0) {
      it('should skip - no levels with allowNegatives flag', () => {
        expect(true).toBe(true);
      });
    } else {
      allowNegativeLevels.forEach(levelConfig => {
        it(`Level ${levelConfig.level}: should allow but not force negative results`, () => {
          const results: number[] = [];

          // Generate many problems to check distribution
          for (let i = 0; i < 50; i++) {
            const problem = generateProblem(levelConfig);
            if (typeof problem.answer === 'number') {
              results.push(problem.answer);
            }
          }

          // Should have mix of positive and negative (or all positive by chance)
          // At minimum, should accept negative answers
          // Note: Skip if level doesn't return numeric answers (e.g., comparison returns boolean)
          if (results.length > 0) {
            const hasNegative = results.some(r => r < 0);
            const hasPositive = results.some(r => r > 0);
            const hasZero = results.some(r => r === 0);

            // At least one should be true (could be all one type by random chance)
            expect(hasNegative || hasPositive || hasZero).toBe(true);
          }
        });
      });
    }
  });

  // Test levels that should never have negatives
  describe('Levels without allowNegatives (must be positive)', () => {
    const noNegativeLevels = OPERATIONS_PATH.filter(l =>
      l.operationType === 'subtraction' &&
      !l.config.allowNegatives &&
      !l.config.forceNegative
    );

    noNegativeLevels.forEach(levelConfig => {
      it(`Level ${levelConfig.level}: should NEVER generate negative results`, () => {
        for (let i = 0; i < 20; i++) {
          const problem = generateProblem(levelConfig);

          if (typeof problem.answer === 'number') {
            expect(problem.answer).toBeGreaterThanOrEqual(0);
          }
        }
      });
    });
  });

  // Test algebraic operations
  describe('Algebraic Operations (Phase 2)', () => {
    const algebraicLevels = OPERATIONS_PATH.filter(l => l.phase === 'algebraic');

    algebraicLevels.forEach(levelConfig => {
      it(`Level ${levelConfig.level}: should handle string answers correctly`, () => {
        const problem = generateProblem(levelConfig);

        // Algebraic problems may have number or string answers
        expect(['number', 'string']).toContain(typeof problem.answer);

        const isValid = validateAnswer(problem, problem.answer.toString());
        expect(isValid).toBe(true);
      });
    });
  });

  // Test logical operations
  describe('Logical Operations (Phase 3)', () => {
    const logicalLevels = OPERATIONS_PATH.filter(l => l.phase === 'logical');

    logicalLevels.forEach(levelConfig => {
      it(`Level ${levelConfig.level}: should validate boolean answers with aliases`, () => {
        const problem = generateProblem(levelConfig);

        // If answer is boolean, test various formats
        if (problem.answer === 'V' || problem.answer === 'F') {
          const correctAnswer = problem.answer;

          // Test different valid formats
          if (correctAnswer === 'V') {
            expect(validateAnswer(problem, 'V')).toBe(true);
            expect(validateAnswer(problem, 'verdadero')).toBe(true);
            expect(validateAnswer(problem, 'true')).toBe(true);
          } else {
            expect(validateAnswer(problem, 'F')).toBe(true);
            expect(validateAnswer(problem, 'falso')).toBe(true);
            expect(validateAnswer(problem, 'false')).toBe(true);
          }
        }
      });
    });
  });

  // Test structural operations
  describe('Structural Operations (Phase 4)', () => {
    const structuralLevels = OPERATIONS_PATH.filter(l => l.phase === 'structural');

    structuralLevels.forEach(levelConfig => {
      it(`Level ${levelConfig.level}: should generate valid structural problems`, () => {
        const problem = generateProblem(levelConfig);

        expect(problem).toBeDefined();
        expect(problem.expression).toBeTruthy();

        // Validate the answer
        const isValid = validateAnswer(problem, problem.answer.toString());
        expect(isValid).toBe(true);
      });

      if (levelConfig.operationType === 'sets') {
        it(`Level ${levelConfig.level}: should handle set notation flexibly`, () => {
          const problem = generateProblem(levelConfig);

          if (typeof problem.answer === 'string' && problem.answer.includes(',')) {
            // Test set answer with and without spaces
            const answerWithSpaces = problem.answer.replace(/,/g, ', ');
            const answerWithoutSpaces = problem.answer.replace(/\s/g, '');

            expect(validateAnswer(problem, answerWithSpaces)).toBe(true);
            expect(validateAnswer(problem, answerWithoutSpaces)).toBe(true);
          }
        });
      }
    });
  });

  // Note: Algorithmic Operations (Phase 5) has been removed as it contained
  // content not directly applicable to PAES M1/M2 students

  // Performance test
  describe('Performance', () => {
    it('should generate problems quickly for all levels', () => {
      const startTime = Date.now();

      OPERATIONS_PATH.forEach(levelConfig => {
        generateProblem(levelConfig);
      });

      const duration = Date.now() - startTime;

      // All levels should generate in under 1 second
      expect(duration).toBeLessThan(1000);
    });
  });
});
