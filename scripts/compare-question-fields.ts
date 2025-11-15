#!/usr/bin/env ts-node
/**
 * Script to compare question vs questionLatex fields
 * Run with: npx ts-node scripts/compare-question-fields.ts
 */

import { questions } from '../lib/questions/index.js';

interface DifferenceReport {
  id: string;
  level: string;
  topic: string;
  subject: string;
  hasQuestionLatex: boolean;
  question: string;
  questionLatex?: string;
  isDifferent: boolean;
  questionLength: number;
  questionLatexLength: number;
}

function normalizeForComparison(text: string): string {
  // Remove LaTeX markup for comparison
  return text
    .replace(/\\text\{([^}]+)\}/g, '$1')  // Remove \text{}
    .replace(/\\{/g, '{')                  // Remove escaped braces
    .replace(/\\}/g, '}')
    .replace(/\\\\/g, '')                  // Remove LaTeX line breaks
    .replace(/\s+/g, ' ')                  // Normalize whitespace
    .trim();
}

function analyzeQuestions() {
  const reports: DifferenceReport[] = [];
  let totalQuestions = 0;
  let questionsWithLatex = 0;
  let questionsWithDifferences = 0;
  let questionsMissingLatex = 0;

  for (const question of questions) {
    totalQuestions++;

    const hasLatex = !!question.questionLatex;
    if (hasLatex) {
      questionsWithLatex++;
    } else {
      questionsMissingLatex++;
    }

    const normalizedQuestion = normalizeForComparison(question.question);
    const normalizedLatex = question.questionLatex
      ? normalizeForComparison(question.questionLatex)
      : '';

    const isDifferent = hasLatex && normalizedQuestion !== normalizedLatex;

    if (isDifferent) {
      questionsWithDifferences++;
    }

    reports.push({
      id: question.id,
      level: question.level,
      topic: question.topic,
      subject: question.subject,
      hasQuestionLatex: hasLatex,
      question: question.question,
      questionLatex: question.questionLatex,
      isDifferent,
      questionLength: question.question.length,
      questionLatexLength: question.questionLatex?.length || 0,
    });
  }

  return {
    reports,
    stats: {
      totalQuestions,
      questionsWithLatex,
      questionsMissingLatex,
      questionsWithDifferences,
      percentWithLatex: ((questionsWithLatex / totalQuestions) * 100).toFixed(2),
      percentWithDifferences: ((questionsWithDifferences / totalQuestions) * 100).toFixed(2),
    }
  };
}

function main() {
  console.log('='.repeat(80));
  console.log('QUESTION vs QUESTIONLATEX COMPARISON REPORT');
  console.log('='.repeat(80));
  console.log();

  const { reports, stats } = analyzeQuestions();

  // Print Statistics
  console.log('📊 STATISTICS');
  console.log('-'.repeat(80));
  console.log(`Total Questions: ${stats.totalQuestions}`);
  console.log(`Questions with questionLatex: ${stats.questionsWithLatex} (${stats.percentWithLatex}%)`);
  console.log(`Questions missing questionLatex: ${stats.questionsMissingLatex}`);
  console.log(`Questions with differences: ${stats.questionsWithDifferences} (${stats.percentWithDifferences}%)`);
  console.log();

  // Questions missing questionLatex
  console.log('❌ QUESTIONS MISSING QUESTIONLATEX');
  console.log('-'.repeat(80));
  const missingLatex = reports.filter(r => !r.hasQuestionLatex);
  if (missingLatex.length > 0) {
    missingLatex.forEach(r => {
      console.log(`[${r.id}] ${r.level} - ${r.subject}`);
      console.log(`  Question: ${r.question.substring(0, 100)}...`);
      console.log();
    });
  } else {
    console.log('✅ All questions have questionLatex defined!');
  }
  console.log();

  // Questions with significant differences
  console.log('⚠️  QUESTIONS WITH DIFFERENCES');
  console.log('-'.repeat(80));
  const withDifferences = reports.filter(r => r.isDifferent);
  if (withDifferences.length > 0) {
    withDifferences.slice(0, 10).forEach(r => {  // Show first 10
      console.log(`[${r.id}] ${r.level} - ${r.subject}`);
      console.log(`  Question:      ${r.question.substring(0, 80)}${r.question.length > 80 ? '...' : ''}`);
      console.log(`  QuestionLatex: ${r.questionLatex?.substring(0, 80)}${(r.questionLatex?.length || 0) > 80 ? '...' : ''}`);
      console.log();
    });

    if (withDifferences.length > 10) {
      console.log(`... and ${withDifferences.length - 10} more`);
      console.log();
    }
  } else {
    console.log('✅ No significant differences found!');
  }
  console.log();

  // Group by subject
  console.log('📚 BREAKDOWN BY SUBJECT');
  console.log('-'.repeat(80));
  const bySubject: Record<string, { total: number; withLatex: number; withDiff: number }> = {};

  reports.forEach(r => {
    if (!bySubject[r.subject]) {
      bySubject[r.subject] = { total: 0, withLatex: 0, withDiff: 0 };
    }
    bySubject[r.subject].total++;
    if (r.hasQuestionLatex) bySubject[r.subject].withLatex++;
    if (r.isDifferent) bySubject[r.subject].withDiff++;
  });

  Object.entries(bySubject).sort().forEach(([subject, counts]) => {
    console.log(`${subject}:`);
    console.log(`  Total: ${counts.total}`);
    console.log(`  With LaTeX: ${counts.withLatex} (${((counts.withLatex / counts.total) * 100).toFixed(1)}%)`);
    console.log(`  With Differences: ${counts.withDiff} (${((counts.withDiff / counts.total) * 100).toFixed(1)}%)`);
    console.log();
  });

  // Export detailed report to JSON
  const reportPath = './scripts/question-comparison-report.json';
  const fs = eval("require('fs')");
  fs.writeFileSync(reportPath, JSON.stringify({ stats, reports }, null, 2));
  console.log(`📝 Detailed report saved to: ${reportPath}`);
  console.log();
  console.log('='.repeat(80));
}

main();
