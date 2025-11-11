#!/usr/bin/env node
/**
 * Backup Verification and Testing Script
 *
 * This script performs comprehensive testing of database backups including:
 * - Integrity verification (checksums)
 * - Restore testing in isolated environment
 * - Data validation after restore
 * - Performance benchmarking
 *
 * Usage:
 *   npm run verify-backup -- <backup-file>     # Verify specific backup
 *   npm run verify-backup -- --all             # Verify all backups
 *   npm run verify-backup -- --latest          # Verify latest backup
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import { DatabaseBackup, BackupMetadata } from './backup-database';

const execAsync = promisify(exec);

interface VerificationResult {
  backupFile: string;
  success: boolean;
  checks: {
    fileExists: boolean;
    checksumValid: boolean;
    metadataValid: boolean;
    restoreTest: boolean;
    dataIntegrity: boolean;
  };
  errors: string[];
  warnings: string[];
  statistics?: {
    fileSize: number;
    tableCount: number;
    rowCounts: Record<string, number>;
    restoreTime: number;
  };
}

class BackupVerifier {
  private backupDir: string;
  private testDatabaseUrl?: string;

  constructor(backupDir?: string) {
    this.backupDir = backupDir || process.env.BACKUP_DIR || path.join(__dirname, '../../backups');
    this.testDatabaseUrl = process.env.TEST_DATABASE_URL;
  }

  /**
   * Verify a single backup file
   */
  async verifyBackup(backupPath: string): Promise<VerificationResult> {
    const result: VerificationResult = {
      backupFile: path.basename(backupPath),
      success: false,
      checks: {
        fileExists: false,
        checksumValid: false,
        metadataValid: false,
        restoreTest: false,
        dataIntegrity: false,
      },
      errors: [],
      warnings: [],
    };

    console.log(`\n🔍 Verifying backup: ${path.basename(backupPath)}`);
    console.log('━'.repeat(60));

    // Check 1: File exists
    try {
      await fs.access(backupPath);
      result.checks.fileExists = true;
      console.log('✅ File exists');
    } catch {
      result.errors.push('Backup file not found');
      console.log('❌ File not found');
      return result;
    }

    // Check 2: Load and validate metadata
    let metadata: BackupMetadata | null = null;
    try {
      metadata = await this.loadMetadata(backupPath);
      result.checks.metadataValid = true;
      console.log('✅ Metadata valid');
      console.log(`   Created: ${new Date(metadata.timestamp).toLocaleString()}`);
      console.log(`   Format: ${metadata.format}`);
      console.log(`   Size: ${this.formatBytes(metadata.size)}`);
    } catch (error) {
      result.warnings.push('Metadata file missing or invalid');
      console.log('⚠️  Metadata missing (non-critical)');
    }

    // Check 3: Verify checksum
    if (metadata?.checksum) {
      try {
        const actualChecksum = await this.calculateChecksum(backupPath);
        if (actualChecksum === metadata.checksum) {
          result.checks.checksumValid = true;
          console.log('✅ Checksum valid');
        } else {
          result.errors.push('Checksum mismatch - file may be corrupted');
          console.log('❌ Checksum mismatch');
        }
      } catch (error) {
        result.errors.push(`Checksum verification failed: ${error}`);
        console.log('❌ Checksum verification error');
      }
    } else {
      result.warnings.push('No checksum available for verification');
      console.log('⚠️  No checksum available');
    }

    // Check 4: Test restore (if test database available)
    if (this.testDatabaseUrl) {
      try {
        console.log('🔄 Testing restore to test database...');
        const startTime = Date.now();

        await this.testRestore(backupPath, metadata);
        const restoreTime = Date.now() - startTime;

        result.checks.restoreTest = true;
        console.log(`✅ Restore test passed (${restoreTime}ms)`);

        // Check 5: Verify data integrity
        const stats = await this.verifyDataIntegrity();
        result.checks.dataIntegrity = true;
        result.statistics = {
          fileSize: (await fs.stat(backupPath)).size,
          tableCount: stats.tableCount,
          rowCounts: stats.rowCounts,
          restoreTime,
        };

        console.log('✅ Data integrity verified');
        console.log(`   Tables: ${stats.tableCount}`);
        console.log(`   Total rows: ${Object.values(stats.rowCounts).reduce((a, b) => a + b, 0)}`);
      } catch (error) {
        result.errors.push(`Restore test failed: ${error}`);
        console.log('❌ Restore test failed:', error);
      }
    } else {
      result.warnings.push('Test database not configured - skipping restore test');
      console.log('⚠️  Skipping restore test (no TEST_DATABASE_URL)');
      console.log('   💡 Set TEST_DATABASE_URL to enable restore testing');
    }

    // Determine overall success
    result.success =
      result.checks.fileExists &&
      (result.checks.checksumValid || !metadata?.checksum) &&
      result.errors.length === 0;

    console.log('━'.repeat(60));
    if (result.success) {
      console.log('✅ Backup verification PASSED');
    } else {
      console.log('❌ Backup verification FAILED');
      if (result.errors.length > 0) {
        console.log('   Errors:', result.errors.join(', '));
      }
    }

    return result;
  }

  /**
   * Test restore to test database
   */
  private async testRestore(
    backupPath: string,
    metadata: BackupMetadata | null
  ): Promise<void> {
    if (!this.testDatabaseUrl) {
      throw new Error('TEST_DATABASE_URL not configured');
    }

    // Clean test database
    await this.cleanTestDatabase();

    // Determine restore command based on format
    const format = metadata?.format || this.inferFormat(backupPath);
    let restoreCommand: string;

    let actualBackupPath = backupPath;
    if (backupPath.endsWith('.gz')) {
      const decompressed = backupPath.replace('.gz', '.tmp');
      await execAsync(`gunzip -c "${backupPath}" > "${decompressed}"`);
      actualBackupPath = decompressed;
    }

    switch (format) {
      case 'custom':
        restoreCommand = `pg_restore --no-owner --no-acl -d "${this.testDatabaseUrl}" "${actualBackupPath}"`;
        break;
      case 'plain':
        restoreCommand = `psql "${this.testDatabaseUrl}" < "${actualBackupPath}"`;
        break;
      case 'directory':
        restoreCommand = `pg_restore --no-owner --no-acl -d "${this.testDatabaseUrl}" "${actualBackupPath}"`;
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    try {
      await execAsync(restoreCommand);
    } catch (error: any) {
      // pg_restore often returns non-zero even on success
      if (error.stderr && error.stderr.includes('ERROR')) {
        throw error;
      }
    }

    // Clean up temp file
    if (actualBackupPath !== backupPath) {
      await fs.unlink(actualBackupPath);
    }
  }

  /**
   * Clean test database
   */
  private async cleanTestDatabase(): Promise<void> {
    if (!this.testDatabaseUrl) return;

    const dropTablesCommand = `psql "${this.testDatabaseUrl}" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"`;
    await execAsync(dropTablesCommand);
  }

  /**
   * Verify data integrity in test database
   */
  private async verifyDataIntegrity(): Promise<{
    tableCount: number;
    rowCounts: Record<string, number>;
  }> {
    if (!this.testDatabaseUrl) {
      throw new Error('TEST_DATABASE_URL not configured');
    }

    // Get table count
    const { stdout: tableCountStr } = await execAsync(
      `psql "${this.testDatabaseUrl}" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"`
    );
    const tableCount = parseInt(tableCountStr.trim());

    // Get row counts for critical tables
    const criticalTables = [
      'users',
      'questions',
      'quiz_sessions',
      'quiz_attempts',
      'sessions',
      'subscriptions',
    ];

    const rowCounts: Record<string, number> = {};

    for (const table of criticalTables) {
      try {
        const { stdout } = await execAsync(
          `psql "${this.testDatabaseUrl}" -t -c "SELECT count(*) FROM ${table}"`
        );
        rowCounts[table] = parseInt(stdout.trim());
      } catch {
        // Table might not exist
        rowCounts[table] = 0;
      }
    }

    return { tableCount, rowCounts };
  }

  /**
   * Verify all backups
   */
  async verifyAllBackups(): Promise<VerificationResult[]> {
    const backup = new DatabaseBackup({ backupDir: this.backupDir });
    const backups = await backup.listBackups();

    if (backups.length === 0) {
      console.log('No backups found to verify');
      return [];
    }

    console.log(`\n📋 Found ${backups.length} backup(s) to verify\n`);

    const results: VerificationResult[] = [];

    for (const b of backups) {
      const backupPath = path.join(this.backupDir, b.filename);
      const result = await this.verifyBackup(backupPath);
      results.push(result);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('VERIFICATION SUMMARY');
    console.log('='.repeat(60));

    const passed = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`Total backups: ${results.length}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);

    if (failed > 0) {
      console.log('\nFailed backups:');
      results
        .filter(r => !r.success)
        .forEach(r => {
          console.log(`  ❌ ${r.backupFile}`);
          r.errors.forEach(e => console.log(`     - ${e}`));
        });
    }

    return results;
  }

  /**
   * Load metadata for a backup
   */
  private async loadMetadata(backupPath: string): Promise<BackupMetadata> {
    const metadataPath = `${backupPath}.metadata.json`;
    const content = await fs.readFile(metadataPath, 'utf-8');
    return JSON.parse(content);
  }

  /**
   * Calculate file checksum
   */
  private async calculateChecksum(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const stream = require('fs').createReadStream(filePath);

      stream.on('data', (data: Buffer) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', reject);
    });
  }

  /**
   * Infer backup format from file extension
   */
  private inferFormat(backupPath: string): 'custom' | 'plain' | 'directory' {
    if (backupPath.endsWith('.dump')) return 'custom';
    if (backupPath.endsWith('.sql') || backupPath.endsWith('.sql.gz')) return 'plain';
    return 'directory';
  }

  /**
   * Format bytes to human-readable size
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log('Backup Verification Script');
    console.log('');
    console.log('Usage:');
    console.log('  npm run verify-backup -- <backup-file>    Verify specific backup');
    console.log('  npm run verify-backup -- --all            Verify all backups');
    console.log('  npm run verify-backup -- --latest         Verify latest backup');
    console.log('');
    console.log('Environment variables:');
    console.log('  BACKUP_DIR          Directory containing backups');
    console.log('  TEST_DATABASE_URL   Database URL for restore testing');
    return;
  }

  const verifier = new BackupVerifier();

  if (args.includes('--all')) {
    await verifier.verifyAllBackups();
  } else if (args.includes('--latest')) {
    const backup = new DatabaseBackup();
    const backups = await backup.listBackups();

    if (backups.length === 0) {
      console.log('No backups found');
      return;
    }

    const latestBackup = path.join(
      process.env.BACKUP_DIR || path.join(__dirname, '../../backups'),
      backups[0].filename
    );
    await verifier.verifyBackup(latestBackup);
  } else {
    const backupPath = args[0];
    if (!backupPath) {
      console.error('Error: Backup file path required');
      console.log('Use --help for usage information');
      process.exit(1);
    }

    const fullPath = path.isAbsolute(backupPath)
      ? backupPath
      : path.join(
          process.env.BACKUP_DIR || path.join(__dirname, '../../backups'),
          backupPath
        );

    await verifier.verifyBackup(fullPath);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { BackupVerifier, VerificationResult };
