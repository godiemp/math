/**
 * Helper utilities for managing abstract problems
 * Useful for testing, debugging, and bulk operations
 */

import { pool } from '../config/database';
import dotenv from 'dotenv';
import { THEMATIC_UNITS, getUnitStats } from '../config/thematic-units';
import {
  listAbstractProblems,
  updateAbstractProblem,
  activateAbstractProblem,
} from '../services/abstractProblemService';
import { Level, Subject } from '../types/abstractProblems';

dotenv.config();

/**
 * Show statistics about generated problems
 */
async function showStats() {
  console.log('\n📊 Abstract Problems Statistics\n');
  console.log('='.repeat(60));

  // Total count
  const totalResult = await pool.query('SELECT COUNT(*) as count FROM abstract_problems');
  console.log(`\n✅ Total problems: ${totalResult.rows[0].count}`);

  // By status
  console.log('\n📋 By Status:');
  const statusResult = await pool.query(`
    SELECT status, COUNT(*) as count
    FROM abstract_problems
    GROUP BY status
    ORDER BY count DESC
  `);
  statusResult.rows.forEach(row => {
    console.log(`   ${row.status}: ${row.count}`);
  });

  // By level
  console.log('\n📚 By Level:');
  const levelResult = await pool.query(`
    SELECT level, COUNT(*) as count
    FROM abstract_problems
    GROUP BY level
    ORDER BY level
  `);
  levelResult.rows.forEach(row => {
    console.log(`   ${row.level}: ${row.count}`);
  });

  // By subject
  console.log('\n📖 By Subject:');
  const subjectResult = await pool.query(`
    SELECT subject, COUNT(*) as count
    FROM abstract_problems
    GROUP BY subject
    ORDER BY subject
  `);
  subjectResult.rows.forEach(row => {
    console.log(`   ${row.subject}: ${row.count}`);
  });

  // By difficulty
  console.log('\n⚡ By Difficulty:');
  const difficultyResult = await pool.query(`
    SELECT difficulty, COUNT(*) as count
    FROM abstract_problems
    GROUP BY difficulty
    ORDER BY
      CASE difficulty
        WHEN 'easy' THEN 1
        WHEN 'medium' THEN 2
        WHEN 'hard' THEN 3
        WHEN 'extreme' THEN 4
      END
  `);
  difficultyResult.rows.forEach(row => {
    console.log(`   ${row.difficulty}: ${row.count}`);
  });

  // By cognitive level
  console.log('\n🧠 By Cognitive Level:');
  const cognitiveResult = await pool.query(`
    SELECT cognitive_level, COUNT(*) as count
    FROM abstract_problems
    GROUP BY cognitive_level
    ORDER BY
      CASE cognitive_level
        WHEN 'remember' THEN 1
        WHEN 'understand' THEN 2
        WHEN 'apply' THEN 3
        WHEN 'analyze' THEN 4
        WHEN 'evaluate' THEN 5
        WHEN 'create' THEN 6
      END
  `);
  cognitiveResult.rows.forEach(row => {
    console.log(`   ${row.cognitive_level}: ${row.count}`);
  });

  // By level, subject, and difficulty
  console.log('\n📊 Detailed Breakdown (Level → Subject → Difficulty):');
  const detailedResult = await pool.query(`
    SELECT level, subject, difficulty, COUNT(*) as count
    FROM abstract_problems
    GROUP BY level, subject, difficulty
    ORDER BY level, subject,
      CASE difficulty
        WHEN 'easy' THEN 1
        WHEN 'medium' THEN 2
        WHEN 'hard' THEN 3
        WHEN 'extreme' THEN 4
      END
  `);

  let currentLevel = '';
  let currentSubject = '';
  detailedResult.rows.forEach(row => {
    if (row.level !== currentLevel) {
      currentLevel = row.level;
      console.log(`\n   ${currentLevel}:`);
    }
    if (row.subject !== currentSubject) {
      currentSubject = row.subject;
      console.log(`     ${currentSubject}:`);
    }
    console.log(`       ${row.difficulty}: ${row.count}`);
  });

  // Top 10 units by count
  console.log('\n🏆 Top 10 Units by Problem Count:');
  const topUnitsResult = await pool.query(`
    SELECT unit, COUNT(*) as count
    FROM abstract_problems
    GROUP BY unit
    ORDER BY count DESC
    LIMIT 10
  `);
  topUnitsResult.rows.forEach((row, i) => {
    console.log(`   ${i + 1}. ${row.unit}: ${row.count}`);
  });

  console.log('\n' + '='.repeat(60));
}

/**
 * Show sample problems
 */
async function showSamples(limit: number = 5) {
  console.log(`\n📝 Sample Problems (showing ${limit})\n`);
  console.log('='.repeat(60));

  const result = await pool.query(`
    SELECT id, essence, level, subject, unit, difficulty, cognitive_level, status
    FROM abstract_problems
    ORDER BY RANDOM()
    LIMIT $1
  `, [limit]);

  result.rows.forEach((problem, i) => {
    console.log(`\n${i + 1}. ${problem.essence}`);
    console.log(`   ID: ${problem.id}`);
    console.log(`   Level: ${problem.level} | Subject: ${problem.subject}`);
    console.log(`   Unit: ${problem.unit}`);
    console.log(`   Difficulty: ${problem.difficulty} | Cognitive: ${problem.cognitive_level}`);
    console.log(`   Status: ${problem.status}`);
  });

  console.log('\n' + '='.repeat(60));
}

/**
 * Activate all draft problems
 */
async function activateAllDrafts() {
  console.log('\n🚀 Activating all draft problems...\n');

  const result = await pool.query(`
    UPDATE abstract_problems
    SET status = 'active', updated_at = $1
    WHERE status = 'draft'
    RETURNING id
  `, [Date.now()]);

  console.log(`✅ Activated ${result.rowCount} problems`);
}

/**
 * Check coverage - which units have problems
 */
async function checkCoverage() {
  console.log('\n🎯 Unit Coverage Report\n');
  console.log('='.repeat(60));

  // Get all units from taxonomy
  const taxonomyUnits = THEMATIC_UNITS.map(u => u.name);

  // Get units from database
  const dbResult = await pool.query(`
    SELECT DISTINCT unit, COUNT(*) as count
    FROM abstract_problems
    GROUP BY unit
    ORDER BY unit
  `);

  const dbUnits = new Set(dbResult.rows.map(r => r.unit));

  // Show coverage
  console.log(`\n📚 Total units in taxonomy: ${taxonomyUnits.length}`);
  console.log(`✅ Units with problems: ${dbUnits.size}`);
  console.log(`❌ Units without problems: ${taxonomyUnits.length - dbUnits.size}`);

  // Show units with problems
  console.log('\n✅ Units with problems:');
  dbResult.rows.forEach(row => {
    console.log(`   ${row.unit}: ${row.count} problems`);
  });

  // Show units without problems
  const missingUnits = taxonomyUnits.filter(u => !dbUnits.has(u));
  if (missingUnits.length > 0) {
    console.log('\n❌ Units without problems:');
    missingUnits.forEach(unit => {
      console.log(`   ${unit}`);
    });
  }

  console.log('\n' + '='.repeat(60));
}

/**
 * Export problems to JSON file
 */
async function exportToJson(outputPath: string = './abstract-problems-export.json') {
  console.log(`\n📤 Exporting problems to ${outputPath}...\n`);

  const result = await pool.query(`
    SELECT * FROM abstract_problems
    ORDER BY level, subject, unit, difficulty_score
  `);

  const fs = require('fs');
  fs.writeFileSync(outputPath, JSON.stringify(result.rows, null, 2));

  console.log(`✅ Exported ${result.rows.length} problems to ${outputPath}`);
}

/**
 * Delete all problems (use with caution!)
 */
async function deleteAll() {
  console.log('\n⚠️  WARNING: This will delete ALL abstract problems!\n');

  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Type "DELETE ALL" to confirm: ', async (answer: string) => {
    if (answer === 'DELETE ALL') {
      const result = await pool.query('DELETE FROM abstract_problems');
      console.log(`\n✅ Deleted ${result.rowCount} problems`);
    } else {
      console.log('\n❌ Deletion cancelled');
    }
    rl.close();
    await pool.end();
    process.exit(0);
  });
}

/**
 * Show taxonomy info
 */
function showTaxonomy() {
  console.log('\n📚 Thematic Units Taxonomy\n');
  console.log('='.repeat(60));

  const stats = getUnitStats();

  console.log(`\n📊 Summary:`);
  console.log(`   Total units: ${stats.total}`);
  console.log(`   M1 units: ${stats.m1}`);
  console.log(`   M2 units: ${stats.m2}`);

  console.log(`\n   By Subject:`);
  console.log(`     Números: ${stats.bySubject.números}`);
  console.log(`     Álgebra: ${stats.bySubject.álgebra}`);
  console.log(`     Geometría: ${stats.bySubject.geometría}`);
  console.log(`     Probabilidad: ${stats.bySubject.probabilidad}`);

  console.log('\n📋 All Units:');

  let currentLevel = '';
  let currentSubject = '';

  THEMATIC_UNITS.forEach((unit, i) => {
    if (unit.level !== currentLevel) {
      currentLevel = unit.level;
      console.log(`\n   ${currentLevel}:`);
    }
    if (unit.subject !== currentSubject) {
      currentSubject = unit.subject;
      console.log(`     ${currentSubject}:`);
    }
    console.log(`       ${unit.code}: ${unit.name}`);
  });

  console.log('\n' + '='.repeat(60));
}

// Main CLI
const command = process.argv[2];

async function main() {
  switch (command) {
    case 'stats':
      await showStats();
      break;

    case 'samples':
      const limit = parseInt(process.argv[3] || '5');
      await showSamples(limit);
      break;

    case 'activate':
      await activateAllDrafts();
      break;

    case 'coverage':
      await checkCoverage();
      break;

    case 'export':
      const outputPath = process.argv[3] || './abstract-problems-export.json';
      await exportToJson(outputPath);
      break;

    case 'delete':
      await deleteAll();
      return; // Don't close pool, deleteAll handles it

    case 'taxonomy':
      showTaxonomy();
      break;

    case 'help':
    default:
      console.log(`
📚 Abstract Problems Helper Utilities

Usage: npm run helpers:abstract-problems <command> [options]

Commands:
  stats              Show statistics about generated problems
  samples [N]        Show N random sample problems (default: 5)
  activate           Activate all draft problems (change status to 'active')
  coverage           Check which units have problems and which don't
  export [path]      Export all problems to JSON file
  delete             Delete all problems (requires confirmation)
  taxonomy           Show the complete thematic units taxonomy
  help               Show this help message

Examples:
  npm run helpers:abstract-problems stats
  npm run helpers:abstract-problems samples 10
  npm run helpers:abstract-problems activate
  npm run helpers:abstract-problems coverage
  npm run helpers:abstract-problems export ./my-export.json
  npm run helpers:abstract-problems taxonomy
      `);
      break;
  }

  await pool.end();
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Error:', error);
  pool.end();
  process.exit(1);
});
