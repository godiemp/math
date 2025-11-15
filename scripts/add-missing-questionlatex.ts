#!/usr/bin/env tsx
/**
 * Script to add questionLatex to questions that are missing it
 * Run with: npx tsx scripts/add-missing-questionlatex.ts
 */

import { questions } from '../lib/questions/index.js';

// Convert plain text question to LaTeX format
function convertToLatex(text: string): string {
  return text
    // Convert multiplication signs
    .replace(/×/g, '\\times')
    // Convert division signs
    .replace(/÷/g, '\\div')
    // Convert superscript 2 (²)
    .replace(/²/g, '^2')
    // Convert superscript 3 (³)
    .replace(/³/g, '^3')
    // Wrap entire text in \text{}
    .replace(/^(.+)$/, '\\text{$1}');
}

function main() {
  const missingLatex = questions.filter(q => !q.questionLatex);

  console.log('='.repeat(80));
  console.log(`Found ${missingLatex.length} questions missing questionLatex`);
  console.log('='.repeat(80));
  console.log();

  missingLatex.forEach(q => {
    const generatedLatex = convertToLatex(q.question);

    console.log(`ID: ${q.id}`);
    console.log(`File: Should be in lib/questions/m1/geometria/m1-geo-002.ts`);
    console.log(`Question: ${q.question.substring(0, 100)}...`);
    console.log(`Generated LaTeX: ${generatedLatex.substring(0, 100)}...`);
    console.log();
    console.log('Add this line after the question field:');
    console.log(`    questionLatex: '${generatedLatex}',`);
    console.log('-'.repeat(80));
    console.log();
  });
}

main();
