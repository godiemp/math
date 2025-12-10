#!/usr/bin/env node
/**
 * Script to add difficultyScore field to all questions
 *
 * Calculates score based on:
 * - Base score from difficulty level
 * - Adjustment based on number of skills
 *
 * Score ranges:
 * - easy: 0.20 - 0.35
 * - medium: 0.40 - 0.55
 * - hard: 0.60 - 0.75
 * - extreme: 0.80 - 0.95
 */

const fs = require('fs');
const path = require('path');

// Base scores for each difficulty level
const BASE_SCORES = {
  'easy': 0.25,
  'medium': 0.45,
  'hard': 0.65,
  'extreme': 0.85,
};

// Adjustment per skill (capped)
const SKILL_ADJUSTMENT = 0.03;
const MAX_SKILL_ADJUSTMENT = 0.10;

function calculateScore(difficulty, skillCount) {
  const base = BASE_SCORES[difficulty] || 0.45;
  const skillAdjust = Math.min(skillCount * SKILL_ADJUSTMENT, MAX_SKILL_ADJUSTMENT);
  const score = base + skillAdjust;
  // Round to 2 decimal places and clamp between 0 and 1
  return Math.min(Math.max(Math.round(score * 100) / 100, 0.10), 0.95);
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Skip index files and files that already have difficultyScore
  if (filePath.includes('index.ts') || content.includes('difficultyScore:')) {
    return { skipped: true, reason: filePath.includes('index.ts') ? 'index file' : 'already has difficultyScore' };
  }

  // Find all questions and add difficultyScore
  let modified = content;
  let count = 0;

  // Pattern to match difficulty line and capture the difficulty value
  // We'll insert difficultyScore right after the difficulty line
  const regex = /(\s+difficulty:\s*['"])(easy|medium|hard|extreme)(['"],?\s*\n)/g;

  // First, extract skill counts for each question
  // Match entire question objects to get skill counts
  const questionBlocks = content.split(/\n\s*\{[\s\n]+id:/);

  // Process the content by finding difficulty lines and inserting difficultyScore
  modified = content.replace(regex, (match, prefix, difficulty, suffix) => {
    // Try to find the skills array for this question
    // Look ahead in the content to find skills: [...]
    const matchStart = modified.indexOf(match);
    const nextQuestionStart = modified.indexOf('\n  {', matchStart + 1);
    const searchEnd = nextQuestionStart === -1 ? modified.length : nextQuestionStart;
    const questionBlock = modified.substring(matchStart, searchEnd);

    // Count skills - look for skills: [...] pattern
    const skillsMatch = questionBlock.match(/skills:\s*\[([\s\S]*?)\]/);
    let skillCount = 2; // default
    if (skillsMatch) {
      // Count quoted strings in the skills array
      const skillStrings = skillsMatch[1].match(/['"][^'"]+['"]/g);
      skillCount = skillStrings ? skillStrings.length : 2;
    }

    const score = calculateScore(difficulty, skillCount);
    count++;

    // Insert difficultyScore after difficulty line
    return `${prefix}${difficulty}${suffix.trimEnd()}\n    difficultyScore: ${score},\n`;
  });

  if (count > 0) {
    fs.writeFileSync(filePath, modified, 'utf-8');
    return { modified: true, count };
  }

  return { modified: false };
}

function findQuestionFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findQuestionFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.includes('index')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Main execution
const questionsDir = path.join(__dirname, '..', 'lib', 'questions');
console.log('Looking for question files in:', questionsDir);

const files = findQuestionFiles(questionsDir);
console.log(`Found ${files.length} question files\n`);

let totalModified = 0;
let totalQuestions = 0;

for (const file of files) {
  const relativePath = path.relative(questionsDir, file);
  const result = processFile(file);

  if (result.skipped) {
    console.log(`⏭️  Skipped: ${relativePath} (${result.reason})`);
  } else if (result.modified) {
    console.log(`✅ Modified: ${relativePath} (${result.count} questions)`);
    totalModified++;
    totalQuestions += result.count;
  } else {
    console.log(`⚪ No changes: ${relativePath}`);
  }
}

console.log(`\n✨ Done! Modified ${totalModified} files with ${totalQuestions} total questions.`);
