/**
 * Migration runner - automatically runs pending migrations
 * Safe to run on every deployment - only runs migrations that haven't been executed yet
 */

import { pool } from '../config/database';
import fs from 'fs';
import path from 'path';

interface Migration {
  id: string;
  filename: string;
  path: string;
}

async function ensureMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      migration_name VARCHAR(255) NOT NULL UNIQUE,
      executed_at BIGINT NOT NULL
    )
  `);
}

async function getExecutedMigrations(): Promise<Set<string>> {
  const result = await pool.query('SELECT migration_name FROM schema_migrations');
  return new Set(result.rows.map(row => row.migration_name));
}

async function getMigrationFiles(): Promise<Migration[]> {
  const migrationsDir = path.join(__dirname, '../config/migrations');
  const files = fs.readdirSync(migrationsDir);

  return files
    .filter(file => file.endsWith('.sql'))
    .sort() // Ensure migrations run in order (001, 002, 003, etc.)
    .map(file => ({
      id: file.replace('.sql', ''),
      filename: file,
      path: path.join(migrationsDir, file)
    }));
}

async function runMigration(migration: Migration) {
  console.log(`🔄 Running migration: ${migration.id}...`);

  const sql = fs.readFileSync(migration.path, 'utf-8');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Run the migration
    await client.query(sql);

    // Record that it was executed
    await client.query(
      'INSERT INTO schema_migrations (migration_name, executed_at) VALUES ($1, $2)',
      [migration.id, Date.now()]
    );

    await client.query('COMMIT');
    console.log(`✅ Migration ${migration.id} completed successfully`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function runMigrations() {
  console.log('📊 Checking for pending migrations...');

  try {
    // Ensure migrations tracking table exists
    await ensureMigrationsTable();

    // Get all migration files
    const allMigrations = await getMigrationFiles();

    // Get migrations that have already been executed
    const executedMigrations = await getExecutedMigrations();

    // Filter to only pending migrations
    const pendingMigrations = allMigrations.filter(
      m => !executedMigrations.has(m.id)
    );

    if (pendingMigrations.length === 0) {
      console.log('✅ No pending migrations - database is up to date');
      return;
    }

    console.log(`📝 Found ${pendingMigrations.length} pending migration(s)`);

    // Run each pending migration in order
    for (const migration of pendingMigrations) {
      await runMigration(migration);
    }

    console.log(`✅ All migrations completed successfully`);
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  }
}

// Run migrations if this script is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { runMigrations };
