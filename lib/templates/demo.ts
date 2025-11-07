/**
 * Template System Demo
 *
 * This script demonstrates the power of the template system by generating
 * hundreds of unique questions from just a few templates.
 */

import {
  templateRegistry,
  generateQuestionFromTemplate,
  generateQuestionsByFilters,
  getTemplateStats,
} from './index';

// ============================================================================
// DEMO 1: Show Template Statistics
// ============================================================================

export function demoTemplateStats() {
  console.log('=== TEMPLATE SYSTEM STATISTICS ===\n');

  const stats = getTemplateStats();
  console.log(`Total Templates: ${stats.total}`);
  console.log(`\nBy Subject:`);
  console.log(`  Números: ${stats.bySubject.números} templates`);
  console.log(`  Álgebra: ${stats.bySubject.álgebra} templates`);
  console.log(`  Geometría: ${stats.bySubject.geometría} templates`);
  console.log(`  Probabilidad: ${stats.bySubject.probabilidad} templates`);
  console.log(`\nBy Level:`);
  console.log(`  M1: ${stats.byLevel.M1} templates`);
  console.log(`  M2: ${stats.byLevel.M2} templates`);
  console.log(`\nBy Difficulty:`);
  console.log(`  Easy: ${stats.byDifficulty.easy} templates`);
  console.log(`  Medium: ${stats.byDifficulty.medium} templates`);
  console.log(`  Hard: ${stats.byDifficulty.hard} templates`);

  // Calculate potential unique questions
  // Assuming each template can generate ~1000 unique variations conservatively
  const potentialQuestions = stats.total * 1000;
  console.log(`\n✨ Potential Unique Questions: ~${potentialQuestions.toLocaleString()}`);
  console.log('   (Each template can generate hundreds to thousands of variations)');
}

// ============================================================================
// DEMO 2: Generate Multiple Variations from One Template
// ============================================================================

export function demoTemplateVariations() {
  console.log('\n\n=== TEMPLATE VARIATIONS DEMO ===\n');
  console.log('Generating 5 variations from "Fraction Addition - Same Denominator" template:\n');

  const template = templateRegistry.get('frac-add-same-den');
  if (!template) {
    console.log('Template not found!');
    return;
  }

  for (let i = 1; i <= 5; i++) {
    const question = generateQuestionFromTemplate(template);
    console.log(`Variation ${i}:`);
    console.log(`  Question: ${question.question}`);
    console.log(`  Correct Answer: ${question.options[question.correctAnswer]}`);
    console.log(`  Explanation: ${question.explanation}`);
    console.log('');
  }
}

// ============================================================================
// DEMO 3: Generate a Complete M1 Practice Exam
// ============================================================================

export function demoGenerateM1Exam() {
  console.log('\n\n=== GENERATING M1 PRACTICE EXAM ===\n');
  console.log('Creating a 60-question exam following PAES M1 structure...\n');

  // Official PAES M1 distribution (approximate)
  const questions = [
    ...generateQuestionsByFilters(15, { subject: 'números', level: 'M1' }),
    ...generateQuestionsByFilters(20, { subject: 'álgebra', level: 'M1' }),
    ...generateQuestionsByFilters(15, { subject: 'geometría', level: 'M1' }),
    ...generateQuestionsByFilters(10, { subject: 'probabilidad', level: 'M1' }),
  ];

  console.log(`✅ Generated ${questions.length} questions`);
  console.log(`\nSample Questions:\n`);

  // Show first 3 questions
  questions.slice(0, 3).forEach((q, i) => {
    console.log(`${i + 1}. [${q.subject}] ${q.question}`);
    console.log(`   Options: ${q.options.join(', ')}`);
    console.log(`   Correct: ${q.options[q.correctAnswer]}\n`);
  });

  console.log('... and 57 more questions!');

  return questions;
}

// ============================================================================
// DEMO 4: Generate Questions by Difficulty
// ============================================================================

export function demoProgressiveDifficulty() {
  console.log('\n\n=== PROGRESSIVE DIFFICULTY DEMO ===\n');
  console.log('Generating a quiz that gets progressively harder:\n');

  const easyQuestions = generateQuestionsByFilters(2, {
    difficulty: 'easy',
    level: 'M1',
  });

  const mediumQuestions = generateQuestionsByFilters(2, {
    difficulty: 'medium',
    level: 'M1',
  });

  const hardQuestions = generateQuestionsByFilters(2, {
    difficulty: 'hard',
    level: 'M1',
  });

  console.log('WARM UP (Easy):');
  easyQuestions.forEach((q, i) => {
    console.log(`  ${i + 1}. ${q.question}`);
  });

  console.log('\nGETTING HARDER (Medium):');
  mediumQuestions.forEach((q, i) => {
    console.log(`  ${i + 1}. ${q.question}`);
  });

  console.log('\nCHALLENGE (Hard):');
  hardQuestions.forEach((q, i) => {
    console.log(`  ${i + 1}. ${q.question}`);
  });
}

// ============================================================================
// DEMO 5: Show Scalability
// ============================================================================

export function demoScalability() {
  console.log('\n\n=== SCALABILITY DEMO ===\n');

  const counts = [10, 50, 100, 500, 1000];

  counts.forEach(count => {
    const startTime = Date.now();
    const questions = generateQuestionsByFilters(count, { level: 'M1' });
    const endTime = Date.now();

    console.log(`Generated ${count} questions in ${endTime - startTime}ms`);
  });

  console.log('\n✨ The system can easily generate thousands of unique questions on demand!');
}

// ============================================================================
// DEMO 6: Show Template Details
// ============================================================================

export function demoTemplateDetails() {
  console.log('\n\n=== TEMPLATE DETAILS ===\n');

  const allTemplates = templateRegistry.getAll();

  console.log('All Available Templates:\n');

  allTemplates.forEach((template, i) => {
    console.log(`${i + 1}. ${template.name} (${template.id})`);
    console.log(`   Subject: ${template.subject} | Level: ${template.level} | Difficulty: ${template.difficulty}`);
    if (template.tags && template.tags.length > 0) {
      console.log(`   Tags: ${template.tags.join(', ')}`);
    }
    console.log('');
  });
}

// ============================================================================
// RUN ALL DEMOS
// ============================================================================

export function runAllDemos() {
  demoTemplateStats();
  demoTemplateVariations();
  demoGenerateM1Exam();
  demoProgressiveDifficulty();
  demoScalability();
  demoTemplateDetails();

  console.log('\n\n' + '='.repeat(60));
  console.log('🎉 DEMO COMPLETE!');
  console.log('='.repeat(60));
  console.log('\nYou now have a system that can generate THOUSANDS of unique');
  console.log('practice questions from just 29 templates!');
  console.log('\nTo add more templates:');
  console.log('  1. Create new template definitions in the appropriate file');
  console.log('  2. Export them in the index.ts file');
  console.log('  3. Instantly have access to thousands more variations!');
  console.log('='.repeat(60) + '\n');
}

// Run demos if executed directly
if (require.main === module) {
  runAllDemos();
}
