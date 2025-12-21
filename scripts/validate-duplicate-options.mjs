/**
 * Validate questions for duplicate/equivalent answer options
 *
 * Run: node scripts/validate-duplicate-options.mjs
 */

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const BASE = './lib/questions';

// Normalize LaTeX for comparison
function normalizeLatex(s) {
  return s
    // Remove \text{} wrapper
    .replace(/\\text\{([^}]*)\}/g, '$1')
    // Normalize spaces
    .replace(/\s+/g, ' ')
    .trim()
    // Normalize fractions to decimal (simple cases)
    .replace(/\\frac\{(\d+)\}\{(\d+)\}/g, (_, n, d) => {
      const result = Number(n) / Number(d);
      return result.toString();
    })
    // Remove $ delimiters if present
    .replace(/^\$|\$$/g, '')
    .toLowerCase();
}

// Try to evaluate simple numeric expressions (only pure numbers, no variables)
function tryEvaluateNumeric(s) {
  const normalized = normalizeLatex(s);

  // Skip if contains variables (letters other than common units)
  if (/[a-wyzA-WYZ]/.test(normalized)) {
    return null;
  }

  // Handle LaTeX fractions like \frac{1}{3}
  const latexFracMatch = normalized.match(/^(\d+\.?\d*)$/);
  if (latexFracMatch) {
    return Number(latexFracMatch[1]);
  }

  // Handle simple fractions like "1/3" or "4/12"
  const fractionMatch = normalized.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    return Number(fractionMatch[1]) / Number(fractionMatch[2]);
  }

  // Handle plain numbers - but skip if comma is used as thousands separator
  // Chilean format uses . for thousands and , for decimals
  // Skip numbers with thousands separators (e.g., "350,000" or "1.000")
  if (/^\d{1,3}([.,]\d{3})+$/.test(normalized)) {
    return null; // Likely a formatted number with thousands separator
  }

  const cleanNum = normalized.replace(',', '.');
  const num = parseFloat(cleanNum);
  if (!isNaN(num) && /^-?\d+\.?\d*$/.test(cleanNum)) {
    return num;
  }

  return null;
}

function findDuplicateOptions(options) {
  const duplicates = [];

  for (let i = 0; i < options.length; i++) {
    for (let j = i + 1; j < options.length; j++) {
      const optA = options[i];
      const optB = options[j];

      // 1. Exact match
      if (optA === optB) {
        duplicates.push({
          indexA: i,
          indexB: j,
          optionA: optA,
          optionB: optB,
          type: 'exact'
        });
        continue;
      }

      // 2. Normalized LaTeX match
      const normA = normalizeLatex(optA);
      const normB = normalizeLatex(optB);
      if (normA === normB) {
        duplicates.push({
          indexA: i,
          indexB: j,
          optionA: optA,
          optionB: optB,
          type: 'normalized'
        });
        continue;
      }

      // 3. Numeric equivalence
      const numA = tryEvaluateNumeric(optA);
      const numB = tryEvaluateNumeric(optB);
      if (numA !== null && numB !== null && Math.abs(numA - numB) < 0.0001) {
        duplicates.push({
          indexA: i,
          indexB: j,
          optionA: optA,
          optionB: optB,
          type: 'numeric'
        });
      }
    }
  }

  return duplicates;
}

function indexToLetter(index) {
  return String.fromCharCode(65 + index); // A, B, C, D
}

// Parse question from file content
function parseQuestions(content, filePath) {
  const questions = [];

  // Find all question objects in the file
  // Match id, options, and correctAnswer fields
  const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
  const optionsMatches = [...content.matchAll(/options:\s*\[([\s\S]*?)\]/g)];
  const correctMatches = [...content.matchAll(/correctAnswer:\s*(\d+)/g)];
  const subjectMatches = [...content.matchAll(/subject:\s*['"]([^'"]+)['"]/g)];
  const levelMatches = [...content.matchAll(/level:\s*['"]([^'"]+)['"]/g)];
  const topicMatches = [...content.matchAll(/topic:\s*['"]([^'"]+)['"]/g)];
  const questionLatexMatches = [...content.matchAll(/questionLatex:\s*['"`]([\s\S]*?)['"`]\s*,?\s*(?=options:|$)/g)];

  for (let i = 0; i < idMatches.length; i++) {
    if (i < optionsMatches.length) {
      // Parse options array
      const optionsStr = optionsMatches[i][1];
      const options = [];

      // Match strings inside the options array (handles multi-line and escaped quotes)
      const optionStrings = optionsStr.matchAll(/['"`]((?:[^'"`\\]|\\.)*)['"`]/g);
      for (const match of optionStrings) {
        options.push(match[1].replace(/\\'/g, "'").replace(/\\"/g, '"'));
      }

      if (options.length >= 2) {
        questions.push({
          id: idMatches[i][1],
          options,
          correctAnswer: correctMatches[i] ? parseInt(correctMatches[i][1]) : 0,
          subject: subjectMatches[i] ? subjectMatches[i][1] : 'unknown',
          level: levelMatches[i] ? levelMatches[i][1] : 'unknown',
          topic: topicMatches[i] ? topicMatches[i][1] : 'unknown',
          questionLatex: questionLatexMatches[i] ? questionLatexMatches[i][1].substring(0, 100) : '',
          filePath
        });
      }
    }
  }

  return questions;
}

// Get all questions from curriculum files
function getAllQuestions() {
  const allQuestions = [];
  const dirs = [
    'm1/algebra', 'm1/numeros', 'm1/geometria', 'm1/probabilidad',
    'm2/algebra', 'm2/numeros', 'm2/geometria', 'm2/probabilidad'
  ];

  for (const dir of dirs) {
    const fullPath = join(BASE, dir);
    let files;
    try {
      files = readdirSync(fullPath).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    } catch {
      continue;
    }

    for (const file of files) {
      const filePath = join(dir, file);
      const content = readFileSync(join(BASE, dir, file), 'utf-8');
      const questions = parseQuestions(content, filePath);
      allQuestions.push(...questions);
    }
  }

  return allQuestions;
}

// Main validation
function validateQuestions() {
  const questions = getAllQuestions();
  console.log(`\nValidating ${questions.length} questions for duplicate options...\n`);

  const issues = [];

  for (const question of questions) {
    const duplicates = findDuplicateOptions(question.options);
    if (duplicates.length > 0) {
      issues.push({ question, duplicates });
    }
  }

  if (issues.length === 0) {
    console.log('✅ No duplicate options found!\n');
    return;
  }

  console.log(`⚠️  Found ${issues.length} question(s) with duplicate options:\n`);

  for (const issue of issues) {
    const { question, duplicates } = issue;
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`Question: ${question.id} (${question.subject}, ${question.level})`);
    console.log(`File: lib/questions/${question.filePath}`);
    console.log(`Topic: ${question.topic}`);
    console.log(`Question: ${question.questionLatex}...`);
    console.log('');

    for (const dup of duplicates) {
      const letterA = indexToLetter(dup.indexA);
      const letterB = indexToLetter(dup.indexB);
      console.log(`  🔴 Options ${letterA} and ${letterB} are ${dup.type} duplicates:`);
      console.log(`     ${letterA}: "${dup.optionA}"`);
      console.log(`     ${letterB}: "${dup.optionB}"`);
    }

    console.log('');
    console.log(`  All options:`);
    question.options.forEach((opt, i) => {
      const letter = indexToLetter(i);
      const isCorrect = i === question.correctAnswer ? ' ✓' : '';
      console.log(`     ${letter}: ${opt}${isCorrect}`);
    });
    console.log('');
  }

  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`\nSummary: ${issues.length} question(s) with duplicate options out of ${questions.length} total.\n`);
}

validateQuestions();
