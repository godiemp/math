/**
 * Mark existing migrations as already executed
 * Run this ONCE before switching to Sequelize migrations
 */

import { pool } from '../config/database';

/**
 * Retry helper for database connection with exponential backoff
 */
async function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries = 5, initialDelayMs = 2000): Promise<T> {
  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxRetries) {
        throw error;
      }
      const delayMs = initialDelayMs * Math.pow(2, attempt - 1);
      console.log(`⏳ Connection attempt ${attempt} failed, retrying in ${delayMs / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  throw lastError;
}

async function markMigrationsAsExecuted() {
  console.log('🔄 Marking existing migrations as executed...');

  try {
    console.log('🔗 Connecting to database...');
    // Create SequelizeMeta table if it doesn't exist with retry logic
    await retryWithBackoff(() => pool.query(`
      CREATE TABLE IF NOT EXISTS "SequelizeMeta" (
        name VARCHAR(255) NOT NULL PRIMARY KEY
      )
    `));

    // Check which migrations have already been applied by checking if tables/columns exist
    const checks = [
      {
        name: '20251101000000-abstract-problems.js',
        checkQuery: `SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_name = 'abstract_problems'
        )`,
        description: 'abstract_problems table'
      },
      {
        name: '20251102000000-add-subsection.js',
        checkQuery: `SELECT EXISTS (
          SELECT FROM information_schema.columns
          WHERE table_name = 'abstract_problems' AND column_name = 'subsection'
        )`,
        description: 'subsection column'
      },
      {
        name: '20251103000000-add-pedagogical-fields.js',
        checkQuery: `SELECT EXISTS (
          SELECT FROM information_schema.columns
          WHERE table_name = 'abstract_problems' AND column_name = 'sequence_order'
        )`,
        description: 'pedagogical fields'
      },
      {
        name: '20251104000000-paes-predictions.js',
        checkQuery: `SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_name = 'paes_predictions'
        )`,
        description: 'paes_predictions table'
      }
    ];

    for (const check of checks) {
      const result = await pool.query(check.checkQuery);
      const exists = result.rows[0].exists;

      if (exists) {
        // Migration has been applied, mark it as executed
        await pool.query(
          `INSERT INTO "SequelizeMeta" (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`,
          [check.name]
        );
        console.log(`✅ Marked ${check.name} as executed (${check.description} exists)`);
      } else {
        console.log(`⏭️  Skipped ${check.name} (${check.description} does not exist - will run migration)`);
      }
    }

    console.log('\n✅ Migration status synchronized!');
    console.log('You can now run: npm run migrate');

  } catch (error: any) {
    console.error('❌ Failed to mark migrations:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

markMigrationsAsExecuted()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
