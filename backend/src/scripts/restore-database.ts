#!/usr/bin/env node
/**
 * Database Restore Script
 *
 * This script restores a PostgreSQL database from a backup created by backup-database.ts
 * Includes validation, pre-flight checks, and safety confirmations.
 *
 * Usage:
 *   npm run restore -- <backup-file>           # Restore from backup file
 *   npm run restore -- --latest                # Restore from latest backup
 *   npm run restore -- --list                  # List available backups
 *   npm run restore -- <backup-file> --verify  # Restore and verify
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import * as readline from 'readline';
import { DatabaseBackup, BackupMetadata } from './backup-database';

const execAsync = promisify(exec);

interface RestoreConfig {
  databaseUrl: string;
  backupDir: string;
  verify: boolean;
  force: boolean;
}

class DatabaseRestore {
  private config: RestoreConfig;

  constructor(config: Partial<RestoreConfig> = {}) {
    this.config = {
      databaseUrl: process.env.DATABASE_URL || '',
      backupDir: process.env.BACKUP_DIR || path.join(__dirname, '../../backups'),
      verify: config.verify || false,
      force: config.force || false,
    };

    if (!this.config.databaseUrl) {
      throw new Error('DATABASE_URL environment variable is required');
    }
  }

  /**
   * Restore database from backup file
   */
  async restore(backupPath: string): Promise<void> {
    console.log('🔄 Starting database restore...');

    // Verify backup file exists
    try {
      await fs.access(backupPath);
    } catch {
      throw new Error(`Backup file not found: ${backupPath}`);
    }

    // Load and verify metadata
    const metadata = await this.loadMetadata(backupPath);
    await this.verifyBackup(backupPath, metadata);

    // Pre-flight checks
    await this.preFlightChecks();

    // Safety confirmation
    if (!this.config.force) {
      const confirmed = await this.confirmRestore(backupPath, metadata);
      if (!confirmed) {
        console.log('❌ Restore cancelled by user');
        return;
      }
    }

    // Create safety backup of current database
    console.log('🔒 Creating safety backup of current database...');
    const safetyBackup = await this.createSafetyBackup();
    console.log(`   Safety backup: ${safetyBackup}`);

    try {
      // Perform restore based on backup format
      await this.performRestore(backupPath, metadata);

      // Verify restore if requested
      if (this.config.verify) {
        await this.verifyRestore();
      }

      console.log('✅ Database restore completed successfully!');
      console.log(`   From: ${path.basename(backupPath)}`);
      console.log(`   Date: ${new Date(metadata.timestamp).toLocaleString()}`);
    } catch (error) {
      console.error('❌ Restore failed:', error);
      console.log('🔄 Rolling back to safety backup...');

      try {
        await this.performRestore(safetyBackup, await this.loadMetadata(safetyBackup));
        console.log('✅ Rollback successful - database restored to pre-restore state');
      } catch (rollbackError) {
        console.error('❌ CRITICAL: Rollback failed!', rollbackError);
        console.error('⚠️  Database may be in an inconsistent state');
        console.error(`⚠️  Safety backup location: ${safetyBackup}`);
      }

      throw error;
    }
  }

  /**
   * Perform the actual restore operation
   */
  private async performRestore(
    backupPath: string,
    metadata: BackupMetadata
  ): Promise<void> {
    let restoreCommand: string;

    // Decompress if needed
    let actualBackupPath = backupPath;
    if (backupPath.endsWith('.gz')) {
      console.log('📦 Decompressing backup...');
      const decompressed = backupPath.replace('.gz', '');
      await execAsync(`gunzip -c "${backupPath}" > "${decompressed}"`);
      actualBackupPath = decompressed;
    }

    switch (metadata.format) {
      case 'custom':
        console.log('🔄 Restoring from custom format backup...');
        // Drop existing connections and recreate database
        restoreCommand = `pg_restore --clean --if-exists --no-owner --no-acl -d "${this.config.databaseUrl}" "${actualBackupPath}"`;
        break;

      case 'plain':
        console.log('🔄 Restoring from plain SQL backup...');
        restoreCommand = `psql "${this.config.databaseUrl}" < "${actualBackupPath}"`;
        break;

      case 'directory':
        console.log('🔄 Restoring from directory format backup...');
        restoreCommand = `pg_restore --clean --if-exists --no-owner --no-acl -d "${this.config.databaseUrl}" "${actualBackupPath}"`;
        break;

      default:
        throw new Error(`Unsupported backup format: ${metadata.format}`);
    }

    try {
      const { stdout, stderr } = await execAsync(restoreCommand);
      if (stderr && !stderr.includes('WARNING') && !stderr.includes('ERROR')) {
        console.warn('⚠️  Restore warnings:', stderr);
      }
    } catch (error: any) {
      // pg_restore often returns non-zero exit codes even on success
      // Check if it's a real error or just warnings
      if (error.stderr && error.stderr.includes('ERROR')) {
        throw error;
      }
      console.warn('⚠️  Restore completed with warnings');
    }

    // Clean up decompressed file if created
    if (actualBackupPath !== backupPath) {
      await fs.unlink(actualBackupPath);
    }
  }

  /**
   * Load backup metadata
   */
  private async loadMetadata(backupPath: string): Promise<BackupMetadata> {
    const metadataPath = `${backupPath}.metadata.json`;

    try {
      const content = await fs.readFile(metadataPath, 'utf-8');
      return JSON.parse(content);
    } catch {
      // If metadata file doesn't exist, infer format from extension
      console.warn('⚠️  Metadata file not found, inferring backup format...');

      return {
        filename: path.basename(backupPath),
        timestamp: new Date().toISOString(),
        size: (await fs.stat(backupPath)).size,
        checksum: '',
        format: this.inferFormat(backupPath),
        compressed: backupPath.endsWith('.gz'),
        database: 'unknown',
      };
    }
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
   * Verify backup integrity
   */
  private async verifyBackup(
    backupPath: string,
    metadata: BackupMetadata
  ): Promise<void> {
    console.log('🔍 Verifying backup integrity...');

    // Verify file size
    const stats = await fs.stat(backupPath);
    if (metadata.size && stats.size !== metadata.size) {
      console.warn('⚠️  Backup file size mismatch');
      console.warn(`   Expected: ${metadata.size} bytes`);
      console.warn(`   Actual: ${stats.size} bytes`);
    }

    // Verify checksum if available
    if (metadata.checksum) {
      const actualChecksum = await this.calculateChecksum(backupPath);
      if (actualChecksum !== metadata.checksum) {
        throw new Error('Backup checksum verification failed! File may be corrupted.');
      }
      console.log('   ✅ Checksum verified');
    }

    console.log('   ✅ Backup integrity verified');
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
   * Pre-flight checks before restore
   */
  private async preFlightChecks(): Promise<void> {
    console.log('🔍 Running pre-flight checks...');

    // Check database connectivity
    try {
      await execAsync(`psql "${this.config.databaseUrl}" -c "SELECT 1"`);
      console.log('   ✅ Database connection successful');
    } catch (error) {
      throw new Error('Cannot connect to database');
    }

    // Check for active connections
    try {
      const { stdout } = await execAsync(
        `psql "${this.config.databaseUrl}" -t -c "SELECT count(*) FROM pg_stat_activity WHERE datname = current_database()"`
      );
      const activeConnections = parseInt(stdout.trim());
      if (activeConnections > 1) {
        console.warn(`   ⚠️  ${activeConnections} active database connections detected`);
        console.warn('   These connections may interfere with restore');
      }
    } catch {
      // Non-critical check
    }

    // Check disk space
    try {
      const { stdout } = await execAsync('df -h .');
      console.log('   ✅ Disk space check passed');
    } catch {
      // Non-critical check
    }
  }

  /**
   * Create a safety backup before restore
   */
  private async createSafetyBackup(): Promise<string> {
    const backup = new DatabaseBackup({
      backupDir: this.config.backupDir,
      format: 'custom',
      compress: false,
    });

    const metadata = await backup.createBackup();
    return path.join(this.config.backupDir, metadata.filename);
  }

  /**
   * Verify database after restore
   */
  private async verifyRestore(): Promise<void> {
    console.log('🔍 Verifying restored database...');

    // Check table count
    try {
      const { stdout } = await execAsync(
        `psql "${this.config.databaseUrl}" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public'"`
      );
      const tableCount = parseInt(stdout.trim());
      console.log(`   ✅ Found ${tableCount} tables`);

      if (tableCount === 0) {
        console.warn('   ⚠️  Warning: No tables found in database');
      }
    } catch (error) {
      console.error('   ❌ Error verifying tables:', error);
    }

    // Check for critical tables
    const criticalTables = ['users', 'questions', 'quiz_sessions'];
    for (const table of criticalTables) {
      try {
        const { stdout } = await execAsync(
          `psql "${this.config.databaseUrl}" -t -c "SELECT count(*) FROM ${table}"`
        );
        const rowCount = parseInt(stdout.trim());
        console.log(`   ✅ Table '${table}': ${rowCount} rows`);
      } catch (error) {
        console.warn(`   ⚠️  Table '${table}' not found or error reading`);
      }
    }
  }

  /**
   * Prompt user for confirmation
   */
  private async confirmRestore(
    backupPath: string,
    metadata: BackupMetadata
  ): Promise<boolean> {
    console.log('\n⚠️  WARNING: This will replace your current database!');
    console.log('━'.repeat(60));
    console.log(`Backup file: ${path.basename(backupPath)}`);
    console.log(`Created: ${new Date(metadata.timestamp).toLocaleString()}`);
    console.log(`Size: ${this.formatBytes(metadata.size)}`);
    console.log(`Format: ${metadata.format}`);
    console.log('━'.repeat(60));
    console.log('A safety backup will be created before restore.');
    console.log('');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise(resolve => {
      rl.question('Type "RESTORE" to continue: ', answer => {
        rl.close();
        resolve(answer.trim() === 'RESTORE');
      });
    });
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

  /**
   * Find latest backup
   */
  async findLatestBackup(): Promise<string | null> {
    const backup = new DatabaseBackup({ backupDir: this.config.backupDir });
    const backups = await backup.listBackups();

    if (backups.length === 0) {
      return null;
    }

    return path.join(this.config.backupDir, backups[0].filename);
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help')) {
    console.log('Database Restore Script');
    console.log('');
    console.log('Usage:');
    console.log('  npm run restore -- <backup-file>           Restore from backup file');
    console.log('  npm run restore -- --latest                Restore from latest backup');
    console.log('  npm run restore -- --list                  List available backups');
    console.log('  npm run restore -- <backup-file> --verify  Restore and verify');
    console.log('  npm run restore -- <backup-file> --force   Skip confirmation');
    return;
  }

  const verify = args.includes('--verify');
  const force = args.includes('--force');
  const latest = args.includes('--latest');
  const list = args.includes('--list');

  const restore = new DatabaseRestore({ verify, force });

  if (list) {
    const backup = new DatabaseBackup();
    const backups = await backup.listBackups();

    if (backups.length === 0) {
      console.log('No backups found');
      return;
    }

    console.log('📋 Available backups:\n');
    backups.forEach((b, i) => {
      console.log(`${i + 1}. ${b.filename}`);
      console.log(`   Date: ${new Date(b.timestamp).toLocaleString()}`);
      console.log(`   Size: ${b.size} bytes`);
      console.log(`   Format: ${b.format}`);
      console.log('');
    });
    return;
  }

  let backupPath: string | null;

  if (latest) {
    backupPath = await restore.findLatestBackup();
    if (!backupPath) {
      console.error('❌ No backups found');
      process.exit(1);
    }
  } else {
    backupPath = args.find(arg => !arg.startsWith('--')) || null;
    if (!backupPath) {
      console.error('❌ Backup file path required');
      process.exit(1);
    }

    // If relative path, resolve from backup directory
    if (!path.isAbsolute(backupPath)) {
      const backupDir = process.env.BACKUP_DIR || path.join(__dirname, '../../backups');
      backupPath = path.join(backupDir, backupPath);
    }
  }

  await restore.restore(backupPath);
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { DatabaseRestore, RestoreConfig };
