/**
 * Problem Template System
 *
 * This module provides a scalable system for generating thousands of unique
 * math problems from reusable templates. Each template can generate infinite
 * variations by randomizing values while maintaining problem structure.
 */

import { Question } from './types';

// ============================================================================
// CORE TYPES
// ============================================================================

/**
 * Variable generator function - produces random values for template placeholders
 */
export type VariableGenerator = () => any;

/**
 * Variables object maps placeholder names to their generated values
 */
export interface TemplateVariables {
  [key: string]: any;
}

/**
 * Template validator - ensures generated variables meet constraints
 */
export type TemplateValidator = (vars: TemplateVariables) => boolean;

/**
 * Option generator - creates multiple choice options including correct answer
 */
export type OptionGenerator = (vars: TemplateVariables, correctAnswer: any) => {
  options: string[];
  optionsLatex?: string[];
  correctIndex: number;
};

/**
 * Problem template - blueprint for generating question variations
 */
export interface ProblemTemplate {
  /** Unique identifier for this template */
  id: string;

  /** Human-readable name */
  name: string;

  /** Subject area */
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';

  /** Difficulty level */
  level: 'M1' | 'M2';

  /** Difficulty rating */
  difficulty: 'easy' | 'medium' | 'hard';

  /** Topic name */
  topic: string;

  /** Variable generators - define what values can be randomized */
  variables: {
    [key: string]: VariableGenerator;
  };

  /** Validator - ensures generated values are valid (optional) */
  validator?: TemplateValidator;

  /** Maximum retry attempts if validator fails */
  maxRetries?: number;

  /** Question text generator */
  questionGenerator: (vars: TemplateVariables) => {
    question: string;
    questionLatex?: string;
  };

  /** Correct answer calculator */
  answerCalculator: (vars: TemplateVariables) => any;

  /** Option generator - creates multiple choice options */
  optionGenerator: OptionGenerator;

  /** Explanation generator */
  explanationGenerator: (vars: TemplateVariables, answer: any) => {
    explanation: string;
    explanationLatex?: string;
  };

  /** Optional visual data generator for geometry problems */
  visualDataGenerator?: (vars: TemplateVariables) => {
    type: 'graph' | 'geometry' | 'table' | 'diagram';
    data: any;
  };

  /** Tags for categorization and search */
  tags?: string[];
}

// ============================================================================
// TEMPLATE REGISTRY
// ============================================================================

/**
 * Global registry of all problem templates
 */
export class TemplateRegistry {
  private templates: Map<string, ProblemTemplate> = new Map();

  /**
   * Register a new template
   */
  register(template: ProblemTemplate): void {
    if (this.templates.has(template.id)) {
      console.warn(`Template ${template.id} already registered, overwriting`);
    }
    this.templates.set(template.id, template);
  }

  /**
   * Register multiple templates
   */
  registerMany(templates: ProblemTemplate[]): void {
    templates.forEach(t => this.register(t));
  }

  /**
   * Get a template by ID
   */
  get(id: string): ProblemTemplate | undefined {
    return this.templates.get(id);
  }

  /**
   * Get all templates
   */
  getAll(): ProblemTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Filter templates by criteria
   */
  filter(criteria: {
    subject?: string;
    level?: 'M1' | 'M2';
    difficulty?: 'easy' | 'medium' | 'hard';
    tags?: string[];
  }): ProblemTemplate[] {
    return this.getAll().filter(template => {
      if (criteria.subject && template.subject !== criteria.subject) return false;
      if (criteria.level && template.level !== criteria.level) return false;
      if (criteria.difficulty && template.difficulty !== criteria.difficulty) return false;
      if (criteria.tags && !criteria.tags.some(tag => template.tags?.includes(tag))) return false;
      return true;
    });
  }
}

// Global registry instance
export const templateRegistry = new TemplateRegistry();

// ============================================================================
// PROBLEM GENERATOR
// ============================================================================

/**
 * Generates a unique question from a template
 */
export function generateQuestionFromTemplate(
  template: ProblemTemplate,
  customId?: string
): Question {
  const maxRetries = template.maxRetries || 100;
  let variables: TemplateVariables = {};
  let attempts = 0;

  // Generate variables until validator passes or max retries reached
  do {
    variables = {};
    for (const [key, generator] of Object.entries(template.variables)) {
      variables[key] = generator();
    }
    attempts++;

    if (attempts > maxRetries) {
      throw new Error(`Failed to generate valid variables for template ${template.id} after ${maxRetries} attempts`);
    }
  } while (template.validator && !template.validator(variables));

  // Generate question text
  const { question, questionLatex } = template.questionGenerator(variables);

  // Calculate correct answer
  const correctAnswer = template.answerCalculator(variables);

  // Generate options
  const { options, optionsLatex, correctIndex } = template.optionGenerator(variables, correctAnswer);

  // Generate explanation
  const { explanation, explanationLatex } = template.explanationGenerator(variables, correctAnswer);

  // Generate visual data if applicable
  const visualData = template.visualDataGenerator?.(variables);

  // Generate unique ID
  const id = customId || `${template.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return {
    id,
    topic: template.topic,
    level: template.level,
    question,
    questionLatex,
    options,
    optionsLatex,
    correctAnswer: correctIndex,
    explanation,
    explanationLatex,
    difficulty: template.difficulty,
    subject: template.subject,
    visualData,
  };
}

/**
 * Generate multiple unique questions from templates
 */
export function generateQuestions(
  templates: ProblemTemplate[],
  count: number,
  options?: {
    /** Ensure unique templates are used (no repeats) */
    uniqueTemplates?: boolean;
    /** Random seed for reproducibility */
    seed?: number;
  }
): Question[] {
  const questions: Question[] = [];
  const usedTemplateIds = new Set<string>();

  for (let i = 0; i < count; i++) {
    let template: ProblemTemplate;

    if (options?.uniqueTemplates) {
      // Filter out already used templates
      const availableTemplates = templates.filter(t => !usedTemplateIds.has(t.id));
      if (availableTemplates.length === 0) {
        console.warn('Not enough unique templates, reusing templates');
        usedTemplateIds.clear();
      }
      template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
      usedTemplateIds.add(template.id);
    } else {
      // Random template selection with possible repeats
      template = templates[Math.floor(Math.random() * templates.length)];
    }

    questions.push(generateQuestionFromTemplate(template));
  }

  return questions;
}

/**
 * Generate questions by filtering templates
 */
export function generateQuestionsByFilters(
  count: number,
  filters: {
    subject?: string;
    level?: 'M1' | 'M2';
    difficulty?: 'easy' | 'medium' | 'hard';
    tags?: string[];
  },
  options?: {
    uniqueTemplates?: boolean;
  }
): Question[] {
  const templates = templateRegistry.filter(filters);

  if (templates.length === 0) {
    throw new Error(`No templates found matching filters: ${JSON.stringify(filters)}`);
  }

  return generateQuestions(templates, count, options);
}

// ============================================================================
// UTILITY FUNCTIONS FOR TEMPLATE CREATION
// ============================================================================

/**
 * Random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Random element from array
 */
export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Random non-zero integer
 */
export function randomIntNonZero(min: number, max: number): number {
  let val = randomInt(min, max);
  return val === 0 ? randomIntNonZero(min, max) : val;
}

/**
 * Generate plausible wrong answers for multiple choice
 * Ensures wrong answers are distinct from correct answer
 */
export function generateWrongAnswers(
  correctAnswer: number,
  count: number,
  strategy: 'nearby' | 'arithmetic' | 'custom',
  customGenerator?: () => number
): number[] {
  const wrong: Set<number> = new Set();
  const maxAttempts = 1000;
  let attempts = 0;

  while (wrong.size < count && attempts < maxAttempts) {
    let candidate: number;

    switch (strategy) {
      case 'nearby':
        // Generate answers near the correct one
        const offset = randomInt(-10, 10);
        candidate = correctAnswer + (offset === 0 ? 1 : offset);
        break;

      case 'arithmetic':
        // Common arithmetic mistakes
        const operations = [
          () => correctAnswer + randomInt(1, 5),
          () => correctAnswer - randomInt(1, 5),
          () => correctAnswer * randomInt(2, 3),
          () => Math.floor(correctAnswer / randomInt(2, 3)),
          () => Math.floor(correctAnswer * 0.5),
          () => Math.floor(correctAnswer * 1.5),
        ];
        candidate = randomChoice(operations)();
        break;

      case 'custom':
        if (!customGenerator) throw new Error('Custom generator required for custom strategy');
        candidate = customGenerator();
        break;

      default:
        candidate = correctAnswer + randomInt(-5, 5);
    }

    // Ensure it's different from correct answer
    if (candidate !== correctAnswer) {
      wrong.add(candidate);
    }

    attempts++;
  }

  return Array.from(wrong);
}

/**
 * Shuffle array (Fisher-Yates)
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * GCD calculator
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Simplify fraction
 */
export function simplifyFraction(numerator: number, denominator: number): { num: number; den: number } {
  const divisor = gcd(numerator, denominator);
  return {
    num: numerator / divisor,
    den: denominator / divisor,
  };
}

/**
 * Format fraction as string
 */
export function formatFraction(num: number, den: number, latex = false): string {
  if (den === 1) return num.toString();
  if (latex) return `\\frac{${num}}{${den}}`;
  return `${num}/${den}`;
}
