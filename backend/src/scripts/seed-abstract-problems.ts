/**
 * Seed script to generate ~1000 abstract problems for PAES M1 and M2
 * Organized by thematic units with proper distribution across difficulties
 */

import { pool } from '../config/database';
import dotenv from 'dotenv';
import { THEMATIC_UNITS, getUnitStats } from '../config/thematic-units';
import { generateAbstractProblems } from '../services/abstractProblemGenerator';
import { createAbstractProblem } from '../services/abstractProblemService';
import {
  Level,
  Subject,
  CognitiveLevel,
  DifficultyLevel,
  GenerateAbstractProblemRequest,
} from '../types/abstractProblems';

dotenv.config();

/**
 * Configuration for how many problems to generate per unit
 */
interface UnitGenerationConfig {
  unit_code: string;
  unit_name: string;
  level: Level;
  subject: Subject;
  total_problems: number;
  distribution: {
    difficulty: DifficultyLevel;
    cognitive_level: CognitiveLevel;
    count: number;
  }[];
}

/**
 * Generate distribution configurations for all units
 * Total target: ~1000 problems
 */
function generateUnitConfigs(): UnitGenerationConfig[] {
  const configs: UnitGenerationConfig[] = [];

  // Distribution strategy:
  // - M1 units (33 units): ~15 problems each = ~495 problems
  // - M2 units (13 units): ~15 problems each = ~195 problems
  // - Some key units get more problems (20-30)
  // Total: ~690 base + extra for important units = ~1000

  const standardDistribution = [
    { difficulty: 'easy' as DifficultyLevel, cognitive_level: 'understand' as CognitiveLevel, count: 3 },
    { difficulty: 'easy' as DifficultyLevel, cognitive_level: 'apply' as CognitiveLevel, count: 3 },
    { difficulty: 'medium' as DifficultyLevel, cognitive_level: 'apply' as CognitiveLevel, count: 3 },
    { difficulty: 'medium' as DifficultyLevel, cognitive_level: 'analyze' as CognitiveLevel, count: 3 },
    { difficulty: 'hard' as DifficultyLevel, cognitive_level: 'analyze' as CognitiveLevel, count: 2 },
    { difficulty: 'hard' as DifficultyLevel, cognitive_level: 'evaluate' as CognitiveLevel, count: 1 },
  ];

  const extendedDistribution = [
    { difficulty: 'easy' as DifficultyLevel, cognitive_level: 'remember' as CognitiveLevel, count: 2 },
    { difficulty: 'easy' as DifficultyLevel, cognitive_level: 'understand' as CognitiveLevel, count: 4 },
    { difficulty: 'easy' as DifficultyLevel, cognitive_level: 'apply' as CognitiveLevel, count: 4 },
    { difficulty: 'medium' as DifficultyLevel, cognitive_level: 'apply' as CognitiveLevel, count: 5 },
    { difficulty: 'medium' as DifficultyLevel, cognitive_level: 'analyze' as CognitiveLevel, count: 5 },
    { difficulty: 'hard' as DifficultyLevel, cognitive_level: 'analyze' as CognitiveLevel, count: 4 },
    { difficulty: 'hard' as DifficultyLevel, cognitive_level: 'evaluate' as CognitiveLevel, count: 3 },
    { difficulty: 'extreme' as DifficultyLevel, cognitive_level: 'evaluate' as CognitiveLevel, count: 2 },
    { difficulty: 'extreme' as DifficultyLevel, cognitive_level: 'create' as CognitiveLevel, count: 1 },
  ];

  // Key units that should have more problems (30 each)
  const keyUnits = [
    'M1-NUM-001', // Operaciones y orden en números enteros
    'M1-NUM-002', // Operaciones y comparación en racionales
    'M1-NUM-005', // Problemas de porcentajes
    'M1-ALG-006', // Ecuaciones e inecuaciones lineales
    'M1-ALG-011', // Ecuaciones de segundo grado
    'M1-GEO-002', // Áreas y perímetros
    'M1-PROB-002', // Medidas de tendencia central
    'M1-PROB-004', // Probabilidad de eventos
  ];

  for (const unit of THEMATIC_UNITS) {
    const isKeyUnit = keyUnits.includes(unit.code);

    configs.push({
      unit_code: unit.code,
      unit_name: unit.name,
      level: unit.level,
      subject: unit.subject,
      total_problems: isKeyUnit ? 30 : 15,
      distribution: isKeyUnit ? extendedDistribution : standardDistribution,
    });
  }

  return configs;
}

/**
 * Generate problems for a single unit configuration
 */
async function generateProblemsForUnit(
  config: UnitGenerationConfig,
  dryRun: boolean = false
): Promise<{ success: number; failed: number }> {
  console.log(`\n📚 Generating problems for: ${config.unit_name}`);
  console.log(`   Unit Code: ${config.unit_code}`);
  console.log(`   Level: ${config.level} | Subject: ${config.subject}`);
  console.log(`   Target: ${config.total_problems} problems\n`);

  let successCount = 0;
  let failedCount = 0;

  for (const dist of config.distribution) {
    console.log(`   → ${dist.count} problems: ${dist.difficulty} / ${dist.cognitive_level}`);

    try {
      // Generate problems using OpenAI
      const request: GenerateAbstractProblemRequest = {
        level: config.level,
        subject: config.subject,
        unit: config.unit_name,
        difficulty: dist.difficulty,
        cognitive_level: dist.cognitive_level,
        primary_skills: [config.unit_code.toLowerCase()], // Use unit code as primary skill
        count: dist.count,
      };

      if (dryRun) {
        console.log(`     [DRY RUN] Would generate ${dist.count} problems`);
        successCount += dist.count;
      } else {
        const generated = await generateAbstractProblems(request);

        // Save each generated problem to database
        for (const problem of generated) {
          try {
            await createAbstractProblem({
              essence: problem.essence,
              cognitive_level: dist.cognitive_level,
              level: config.level,
              subject: config.subject,
              unit: config.unit_name,
              difficulty: dist.difficulty,
              difficulty_score: problem.suggested_difficulty_score,
              primary_skills: [config.unit_code.toLowerCase()],
              secondary_skills: [],
              generation_method: 'openai',
              generated_by: 'seed-script',
              generation_prompt: `Unit: ${config.unit_name}`,
              answer_type: problem.answer_type,
              expected_steps: problem.expected_steps,
              common_errors: problem.common_errors,
              status: 'draft', // Start as draft, can be reviewed later
            });

            successCount++;
          } catch (dbError: any) {
            console.error(`     ❌ Failed to save problem: ${dbError.message}`);
            failedCount++;
          }
        }

        console.log(`     ✅ Generated and saved ${generated.length} problems`);

        // Rate limiting: wait 1 second between API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error: any) {
      console.error(`     ❌ Failed to generate: ${error.message}`);
      failedCount += dist.count;
    }
  }

  console.log(`   ✅ Unit complete: ${successCount} success, ${failedCount} failed`);
  return { success: successCount, failed: failedCount };
}

/**
 * Main seeding function
 */
async function seedAbstractProblems(options: {
  dryRun?: boolean;
  limit?: number;
  levelFilter?: Level;
  subjectFilter?: Subject;
}) {
  const { dryRun = false, limit, levelFilter, subjectFilter } = options;

  console.log('\n🌱 Starting Abstract Problems Seeding');
  console.log('=' .repeat(60));

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No problems will be generated or saved\n');
  }

  // Get configuration
  let configs = generateUnitConfigs();

  // Apply filters
  if (levelFilter) {
    configs = configs.filter(c => c.level === levelFilter);
    console.log(`🔍 Filtering by level: ${levelFilter}`);
  }

  if (subjectFilter) {
    configs = configs.filter(c => c.subject === subjectFilter);
    console.log(`🔍 Filtering by subject: ${subjectFilter}`);
  }

  if (limit) {
    configs = configs.slice(0, limit);
    console.log(`🔍 Limiting to first ${limit} units`);
  }

  const totalProblems = configs.reduce((sum, c) => sum + c.total_problems, 0);

  console.log(`\n📊 Generation Plan:`);
  console.log(`   Units: ${configs.length}`);
  console.log(`   Total problems: ${totalProblems}`);
  console.log(`   M1 problems: ${configs.filter(c => c.level === 'M1').reduce((sum, c) => sum + c.total_problems, 0)}`);
  console.log(`   M2 problems: ${configs.filter(c => c.level === 'M2').reduce((sum, c) => sum + c.total_problems, 0)}`);

  const bySubject = {
    números: configs.filter(c => c.subject === 'números').reduce((sum, c) => sum + c.total_problems, 0),
    álgebra: configs.filter(c => c.subject === 'álgebra').reduce((sum, c) => sum + c.total_problems, 0),
    geometría: configs.filter(c => c.subject === 'geometría').reduce((sum, c) => sum + c.total_problems, 0),
    probabilidad: configs.filter(c => c.subject === 'probabilidad').reduce((sum, c) => sum + c.total_problems, 0),
  };

  console.log(`\n   By Subject:`);
  console.log(`     Números: ${bySubject.números}`);
  console.log(`     Álgebra: ${bySubject.álgebra}`);
  console.log(`     Geometría: ${bySubject.geometría}`);
  console.log(`     Probabilidad: ${bySubject.probabilidad}`);

  if (!dryRun && !process.env.OPENAI_API_KEY) {
    console.error('\n❌ OPENAI_API_KEY is not set. Cannot generate problems.');
    console.log('   Set OPENAI_API_KEY in your .env file to enable generation.');
    process.exit(1);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Starting generation...\n');

  let totalSuccess = 0;
  let totalFailed = 0;
  let unitsProcessed = 0;

  const startTime = Date.now();

  for (const config of configs) {
    const result = await generateProblemsForUnit(config, dryRun);
    totalSuccess += result.success;
    totalFailed += result.failed;
    unitsProcessed++;

    // Progress update
    const progress = ((unitsProcessed / configs.length) * 100).toFixed(1);
    console.log(`\n   📊 Progress: ${unitsProcessed}/${configs.length} units (${progress}%)`);
    console.log(`   ✅ Total success: ${totalSuccess} | ❌ Total failed: ${totalFailed}`);
  }

  const endTime = Date.now();
  const durationMinutes = ((endTime - startTime) / 1000 / 60).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('✅ Seeding Complete!\n');
  console.log(`📊 Final Statistics:`);
  console.log(`   Units processed: ${unitsProcessed}`);
  console.log(`   Problems created: ${totalSuccess}`);
  console.log(`   Problems failed: ${totalFailed}`);
  console.log(`   Success rate: ${((totalSuccess / (totalSuccess + totalFailed)) * 100).toFixed(1)}%`);
  console.log(`   Duration: ${durationMinutes} minutes`);

  if (!dryRun) {
    // Show database stats
    console.log('\n📊 Database Summary:');
    const stats = await pool.query(`
      SELECT
        level,
        subject,
        difficulty,
        COUNT(*) as count
      FROM abstract_problems
      GROUP BY level, subject, difficulty
      ORDER BY level, subject, difficulty
    `);

    console.log('\n   Problems by Level, Subject, and Difficulty:');
    stats.rows.forEach(row => {
      console.log(`   ${row.level} | ${row.subject} | ${row.difficulty}: ${row.count}`);
    });
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options: any = {
  dryRun: args.includes('--dry-run'),
};

// Parse --limit=N
const limitArg = args.find(arg => arg.startsWith('--limit='));
if (limitArg) {
  options.limit = parseInt(limitArg.split('=')[1]);
}

// Parse --level=M1 or --level=M2
const levelArg = args.find(arg => arg.startsWith('--level='));
if (levelArg) {
  options.levelFilter = levelArg.split('=')[1] as Level;
}

// Parse --subject=números, etc.
const subjectArg = args.find(arg => arg.startsWith('--subject='));
if (subjectArg) {
  options.subjectFilter = subjectArg.split('=')[1] as Subject;
}

// Show help
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: npm run seed:abstract-problems [options]

Options:
  --dry-run              Run without actually generating or saving problems
  --limit=N              Only process first N units
  --level=M1|M2          Only process units for specific level
  --subject=SUBJECT      Only process units for specific subject
                         (números, álgebra, geometría, probabilidad)
  --help, -h             Show this help message

Examples:
  npm run seed:abstract-problems --dry-run
  npm run seed:abstract-problems --limit=5
  npm run seed:abstract-problems --level=M1
  npm run seed:abstract-problems --subject=números
  npm run seed:abstract-problems --level=M1 --subject=álgebra --limit=3
  `);
  process.exit(0);
}

// Run the seeder
seedAbstractProblems(options)
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });
