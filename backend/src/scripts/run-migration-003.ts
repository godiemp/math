/**
 * Run migration 003: Add pedagogical fields
 */

import { pool } from '../config/database';
import fs from 'fs';
import path from 'path';

async function runMigration() {
  console.log('🔄 Running migration 003: Add pedagogical fields...');

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '../config/migrations/003_add_pedagogical_fields.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    // Execute the migration
    await pool.query(migrationSQL);

    console.log('✅ Migration 003 completed successfully!');
    console.log('   Added columns:');
    console.log('   - sequence_order');
    console.log('   - pedagogy_notes');
    console.log('   - prerequisite_sequence');
    console.log('   - generation_rules');

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigration();
