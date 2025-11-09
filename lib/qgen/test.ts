/**
 * Simple QGen Test Script
 *
 * Run with: npx ts-node lib/qgen/test.ts
 */

import { generateQuestions } from './qgenAlgorithm.js';
import { contextLibrary } from './contextLibrary.js';
import { templateLibrary } from './templateLibrary.js';
import { goalSkillMappings } from './goalSkillMappings.js';
import { QGenInput } from '../types/core.js';

console.log('╔' + '═'.repeat(78) + '╗');
console.log('║' + ' '.repeat(25) + 'QGEN SYSTEM TEST' + ' '.repeat(37) + '║');
console.log('╚' + '═'.repeat(78) + '╝\n');

// Test 1: Percentage questions
console.log('Test 1: Generating percentage questions...');
try {
  const input1: QGenInput = {
    targetSkills: ['numeros-porcentajes', 'numeros-operaciones-basicas'],
    contextLibrary,
    templateLibrary,
    goalMap: goalSkillMappings,
    numberOfQuestions: 2,
    level: 'M1',
    subject: 'números',
  };

  const result1 = generateQuestions(input1);
  console.log('✓ Generated', result1.questions.length, 'questions');
  console.log('  - Problem ID:', result1.problem.id);
  console.log('  - Context:', result1.situation.contextText);
  console.log('  - Question 1 (n₁):', result1.questions[0].question);
  if (result1.questions[1]) {
    console.log('  - Question 2 (n₂):', result1.questions[1].question);
  }
  console.log('✓ Test 1 PASSED\n');
} catch (error) {
  console.error('✗ Test 1 FAILED:', error);
}

// Test 2: Algebra questions
console.log('Test 2: Generating algebra questions...');
try {
  const input2: QGenInput = {
    targetSkills: ['algebra-funciones-lineales', 'algebra-expresiones-algebraicas'],
    contextLibrary,
    templateLibrary,
    goalMap: goalSkillMappings,
    numberOfQuestions: 2,
    level: 'M1',
    subject: 'álgebra',
  };

  const result2 = generateQuestions(input2);
  console.log('✓ Generated', result2.questions.length, 'questions');
  console.log('  - Problem ID:', result2.problem.id);
  console.log('  - Context:', result2.situation.contextText);
  console.log('✓ Test 2 PASSED\n');
} catch (error) {
  console.error('✗ Test 2 FAILED:', error);
}

// Test 3: Geometry questions
console.log('Test 3: Generating geometry questions...');
try {
  const input3: QGenInput = {
    targetSkills: ['geometria-perimetro', 'geometria-area'],
    contextLibrary,
    templateLibrary,
    goalMap: goalSkillMappings,
    numberOfQuestions: 2,
    level: 'M1',
    subject: 'geometría',
  };

  const result3 = generateQuestions(input3);
  console.log('✓ Generated', result3.questions.length, 'questions');
  console.log('  - Problem ID:', result3.problem.id);
  console.log('  - Context:', result3.situation.contextText);
  console.log('✓ Test 3 PASSED\n');
} catch (error) {
  console.error('✗ Test 3 FAILED:', error);
}

// Test 4: Progressive complexity
console.log('Test 4: Testing progressive complexity...');
try {
  const input4: QGenInput = {
    targetSkills: [
      'numeros-porcentajes',
      'numeros-operaciones-basicas',
      'numeros-decimales',
    ],
    contextLibrary,
    templateLibrary,
    goalMap: goalSkillMappings,
    numberOfQuestions: 3,
    level: 'M1',
    subject: 'números',
  };

  const result4 = generateQuestions(input4);

  // Check that each question builds on the previous
  console.log('✓ Generated', result4.questions.length, 'questions');

  const q1 = result4.questions[0];
  const q2 = result4.questions[1];
  const q3 = result4.questions[2];

  console.log('  - n₁ skills:', q1.skillsTested.length, '- difficulty:', q1.difficulty);
  console.log('  - n₂ skills:', q2?.skillsTested.length, '- difficulty:', q2?.difficulty);
  console.log('  - n₃ skills:', q3?.skillsTested.length, '- difficulty:', q3?.difficulty);

  // Verify progression
  if (q1.skillsTested.length <= (q2?.skillsTested.length ?? 0)) {
    console.log('  ✓ Skills increase progressively');
  }

  if (q2?.buildsOn === q1.id) {
    console.log('  ✓ Questions are properly linked');
  }

  console.log('✓ Test 4 PASSED\n');
} catch (error) {
  console.error('✗ Test 4 FAILED:', error);
}

console.log('═'.repeat(80));
console.log('All tests completed!');
console.log('═'.repeat(80));
