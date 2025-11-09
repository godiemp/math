/**
 * QGen Examples
 *
 * Example usages of the QGen algorithm
 */

import { QGenInput } from '../types/core';
import { contextLibrary } from './contextLibrary';
import { templateLibrary } from './templateLibrary';
import { goalSkillMappings } from './goalSkillMappings';
import { generateQuestions } from './qgenAlgorithm';

/**
 * Example 1: Generate percentage questions (simple)
 */
export function examplePercentageQuestions() {
  const input: QGenInput = {
    targetSkills: ['numeros-porcentajes', 'numeros-operaciones-basicas', 'numeros-decimales'],
    contextLibrary,
    templateLibrary,
    goalMap: goalSkillMappings,
    numberOfQuestions: 3,
    level: 'M1',
    subject: 'números',
  };

  const result = generateQuestions(input);

  console.log('='.repeat(80));
  console.log('EXAMPLE 1: Percentage Questions (Progressive)');
  console.log('='.repeat(80));
  console.log('\nProblem:', result.problem.id);
  console.log('Skills:', result.problem.skillIds);
  console.log('\nSituation:', result.situation.contextText);
  console.log('\nQuestions:');

  result.questions.forEach((q, index) => {
    console.log(`\nn₁${index + 1} (${q.difficulty}):`);
    console.log(`  Question: ${q.question}`);
    console.log(`  Skills: ${q.skillsTested.join(', ')}`);
    console.log(`  Builds on: ${q.buildsOn || 'None (first question)'}`);
  });

  return result;
}

/**
 * Example 2: Generate algebra questions (functions)
 */
export function exampleAlgebraQuestions() {
  const input: QGenInput = {
    targetSkills: [
      'algebra-funciones-lineales',
      'algebra-expresiones-algebraicas',
      'algebra-sistemas-ecuaciones',
    ],
    contextLibrary,
    templateLibrary,
    goalMap: goalSkillMappings,
    numberOfQuestions: 3,
    level: 'M1',
    subject: 'álgebra',
  };

  const result = generateQuestions(input);

  console.log('\n' + '='.repeat(80));
  console.log('EXAMPLE 2: Algebra Questions - Linear Functions (Progressive)');
  console.log('='.repeat(80));
  console.log('\nProblem:', result.problem.id);
  console.log('Skills:', result.problem.skillIds);
  console.log('\nSituation:', result.situation.contextText);
  console.log('\nQuestions:');

  result.questions.forEach((q, index) => {
    console.log(`\nn₁${index + 1} (${q.difficulty}):`);
    console.log(`  Question: ${q.question}`);
    console.log(`  Skills: ${q.skillsTested.join(', ')}`);
    console.log(`  Builds on: ${q.buildsOn || 'None (first question)'}`);
  });

  return result;
}

/**
 * Example 3: Generate geometry questions (perimeter and area)
 */
export function exampleGeometryQuestions() {
  const input: QGenInput = {
    targetSkills: ['geometria-perimetro', 'geometria-area', 'geometria-rectangulo'],
    contextLibrary,
    templateLibrary,
    goalMap: goalSkillMappings,
    numberOfQuestions: 2,
    level: 'M1',
    subject: 'geometría',
  };

  const result = generateQuestions(input);

  console.log('\n' + '='.repeat(80));
  console.log('EXAMPLE 3: Geometry Questions - Perimeter and Area (Progressive)');
  console.log('='.repeat(80));
  console.log('\nProblem:', result.problem.id);
  console.log('Skills:', result.problem.skillIds);
  console.log('\nSituation:', result.situation.contextText);
  console.log('\nQuestions:');

  result.questions.forEach((q, index) => {
    console.log(`\nn₁${index + 1} (${q.difficulty}):`);
    console.log(`  Question: ${q.question}`);
    console.log(`  Skills: ${q.skillsTested.join(', ')}`);
    console.log(`  Builds on: ${q.buildsOn || 'None (first question)'}`);
  });

  return result;
}

/**
 * Example 4: Generate proportionality questions
 */
export function exampleProportionalityQuestions() {
  const input: QGenInput = {
    targetSkills: ['numeros-proporcionalidad', 'numeros-fracciones'],
    contextLibrary,
    templateLibrary,
    goalMap: goalSkillMappings,
    numberOfQuestions: 2,
    level: 'M1',
    subject: 'números',
  };

  const result = generateQuestions(input);

  console.log('\n' + '='.repeat(80));
  console.log('EXAMPLE 4: Proportionality Questions (Progressive)');
  console.log('='.repeat(80));
  console.log('\nProblem:', result.problem.id);
  console.log('Skills:', result.problem.skillIds);
  console.log('\nSituation:', result.situation.contextText);
  console.log('\nQuestions:');

  result.questions.forEach((q, index) => {
    console.log(`\nn₁${index + 1} (${q.difficulty}):`);
    console.log(`  Question: ${q.question}`);
    console.log(`  Skills: ${q.skillsTested.join(', ')}`);
    console.log(`  Builds on: ${q.buildsOn || 'None (first question)'}`);
  });

  return result;
}

/**
 * Run all examples
 */
export function runAllExamples() {
  console.log('\n\n');
  console.log('╔' + '═'.repeat(78) + '╗');
  console.log('║' + ' '.repeat(20) + 'QGEN ALGORITHM EXAMPLES' + ' '.repeat(35) + '║');
  console.log('╚' + '═'.repeat(78) + '╝');

  examplePercentageQuestions();
  exampleAlgebraQuestions();
  exampleGeometryQuestions();
  exampleProportionalityQuestions();

  console.log('\n\n' + '='.repeat(80));
  console.log('All examples completed successfully!');
  console.log('='.repeat(80) + '\n');
}

// Export all examples
export const examples = {
  examplePercentageQuestions,
  exampleAlgebraQuestions,
  exampleGeometryQuestions,
  exampleProportionalityQuestions,
  runAllExamples,
};
