/**
 * Value Generator
 *
 * Generates values for template variables based on their definitions and constraints.
 */

import { VariableDefinition, TemplateConstraint, ValueGeneratorConfig } from '../types/core';

/**
 * Simple seeded random number generator (LCG algorithm)
 * This allows reproducible random generation
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number = Date.now()) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  nextFloat(min: number, max: number, decimals: number = 2): number {
    const value = this.next() * (max - min) + min;
    return parseFloat(value.toFixed(decimals));
  }

  choice<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)];
  }
}

/**
 * Value Generator class
 */
export class ValueGenerator {
  private random: SeededRandom;
  private config: ValueGeneratorConfig;
  private generatedValues: Map<string, any>;

  constructor(config: ValueGeneratorConfig = {}) {
    this.config = {
      seed: config.seed,
      avoidDuplicates: config.avoidDuplicates ?? true,
      preferSimpleValues: config.preferSimpleValues ?? true,
    };
    this.random = new SeededRandom(this.config.seed);
    this.generatedValues = new Map();
  }

  /**
   * Generate a value for a variable definition
   */
  generateValue(variable: VariableDefinition): any {
    switch (variable.type) {
      case 'integer':
        return this.generateInteger(variable);
      case 'decimal':
      case 'number':
        return this.generateDecimal(variable);
      case 'fraction':
        return this.generateFraction(variable);
      case 'name':
      case 'object':
      case 'unit':
        return this.generateCategorical(variable);
      default:
        throw new Error(`Unknown variable type: ${variable.type}`);
    }
  }

  /**
   * Generate values for multiple variables
   */
  generateValues(variables: VariableDefinition[]): Record<string, any> {
    const values: Record<string, any> = {};

    for (const variable of variables) {
      values[variable.name] = this.generateValue(variable);
      if (this.config.avoidDuplicates) {
        this.generatedValues.set(variable.name, values[variable.name]);
      }
    }

    return values;
  }

  /**
   * Generate values that satisfy constraints
   */
  generateValuesWithConstraints(
    variables: VariableDefinition[],
    constraints?: TemplateConstraint[]
  ): Record<string, any> {
    const maxAttempts = 100;
    let attempt = 0;

    while (attempt < maxAttempts) {
      const values = this.generateValues(variables);

      if (!constraints || this.satisfiesConstraints(values, constraints)) {
        return values;
      }

      attempt++;
    }

    // If we can't satisfy constraints, return values without constraints
    console.warn('Could not satisfy all constraints after', maxAttempts, 'attempts');
    return this.generateValues(variables);
  }

  /**
   * Check if values satisfy constraints
   */
  private satisfiesConstraints(
    values: Record<string, any>,
    constraints: TemplateConstraint[]
  ): boolean {
    for (const constraint of constraints) {
      const value = values[constraint.variable];

      switch (constraint.condition) {
        case 'equals':
          if (value !== constraint.value) return false;
          break;
        case 'not-equals':
          if (value === constraint.value) return false;
          break;
        case 'greater-than':
          if (typeof constraint.value === 'number' && !(value > constraint.value)) return false;
          break;
        case 'less-than':
          if (typeof constraint.value === 'number' && !(value < constraint.value)) return false;
          break;
        case 'divisible-by':
          if (typeof constraint.value === 'number' && value % constraint.value !== 0) return false;
          break;
        case 'prime':
          if (!this.isPrime(value)) return false;
          break;
      }
    }

    return true;
  }

  /**
   * Generate an integer value
   */
  private generateInteger(variable: VariableDefinition): number {
    const min = variable.min ?? 1;
    const max = variable.max ?? 100;
    const step = variable.step ?? 1;

    if (this.config.preferSimpleValues && step >= 5) {
      // Generate nice round numbers
      const steps = Math.floor((max - min) / step);
      const randomStep = this.random.nextInt(0, steps);
      return min + randomStep * step;
    }

    return this.random.nextInt(min, max);
  }

  /**
   * Generate a decimal value
   */
  private generateDecimal(variable: VariableDefinition): number {
    const min = variable.min ?? 1;
    const max = variable.max ?? 100;
    const step = variable.step ?? 0.1;

    if (step >= 1) {
      // Use step-based generation
      const steps = Math.floor((max - min) / step);
      const randomStep = this.random.nextInt(0, steps);
      return parseFloat((min + randomStep * step).toFixed(2));
    }

    // Generate random decimal
    return this.random.nextFloat(min, max, 2);
  }

  /**
   * Generate a fraction value
   */
  private generateFraction(variable: VariableDefinition): string {
    const numerators = [1, 2, 3, 4, 5, 1, 3, 1, 2];
    const denominators = [2, 3, 4, 5, 6, 3, 4, 4, 5];

    const index = this.random.nextInt(0, numerators.length - 1);
    return `${numerators[index]}/${denominators[index]}`;
  }

  /**
   * Generate a categorical value
   */
  private generateCategorical(variable: VariableDefinition): string {
    if (!variable.options || variable.options.length === 0) {
      throw new Error(`Variable ${variable.name} has no options defined`);
    }

    return this.random.choice(variable.options);
  }

  /**
   * Check if a number is prime
   */
  private isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
  }

  /**
   * Fill template string with values
   */
  fillTemplate(template: string, values: Record<string, any>): string {
    let result = template;

    for (const [key, value] of Object.entries(values)) {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(regex, String(value));
    }

    return result;
  }

  /**
   * Reset the generator (useful for testing)
   */
  reset(seed?: number): void {
    this.random = new SeededRandom(seed ?? this.config.seed);
    this.generatedValues.clear();
  }
}

/**
 * Helper function to create a value generator
 */
export function createValueGenerator(config?: ValueGeneratorConfig): ValueGenerator {
  return new ValueGenerator(config);
}

/**
 * Generate values for a template
 */
export function generateTemplateValues(
  variables: VariableDefinition[],
  constraints?: TemplateConstraint[],
  config?: ValueGeneratorConfig
): Record<string, any> {
  const generator = new ValueGenerator(config);
  return generator.generateValuesWithConstraints(variables, constraints);
}
