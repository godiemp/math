#!/usr/bin/env tsx
/**
 * Script to remove the deprecated 'question' field from all question files
 * Run with: npx tsx scripts/remove-question-field.ts
 */

import * as fs from 'fs';
import * as path from 'path';

function removeQuestionField(content: string): string {
  // Match the question field which can span multiple lines
  // Pattern: question: '...' or question: "..."
  // The field ends with ',\n' and we want to remove the entire line

  // This regex matches:
  // - question: followed by a string (single or double quoted)
  // - The string can span multiple lines
  // - Ends with a comma and optional whitespace before newline
  const questionFieldRegex = /^(\s*)question:\s*['"].*?['"],?\s*\n/gm;

  return content.replace(questionFieldRegex, '');
}

function getAllTsFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts') && file !== 'index.ts') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function main() {
  console.log('🔍 Finding all question files...');

  // Find all TypeScript files in lib/questions
  const files = getAllTsFiles('lib/questions');

  console.log(`📝 Found ${files.length} question files`);
  console.log();

  let totalRemoved = 0;
  let filesModified = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const originalLines = content.split('\n').length;

    // Count question fields before removal
    const questionMatches = content.match(/^\s*question:\s*['"].*?['"],?\s*$/gm);
    const questionsInFile = questionMatches ? questionMatches.length : 0;

    if (questionsInFile === 0) {
      continue; // Skip files with no question fields
    }

    const newContent = removeQuestionField(content);
    const newLines = newContent.split('\n').length;
    const linesRemoved = originalLines - newLines;

    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf-8');
      filesModified++;
      totalRemoved += questionsInFile;
      console.log(`✅ ${file}`);
      console.log(`   Removed ${questionsInFile} question field(s), ${linesRemoved} lines`);
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log(`✨ COMPLETE!`);
  console.log(`   Files modified: ${filesModified}`);
  console.log(`   Question fields removed: ${totalRemoved}`);
  console.log('='.repeat(80));
}

main();
