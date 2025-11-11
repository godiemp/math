#!/usr/bin/env node
/**
 * Database Backup Script
 *
 * This script creates a PostgreSQL backup using pg_dump and stores it locally
 * or uploads it to cloud storage. Supports multiple backup formats and compression.
 *
 * Usage:
 *   npm run backup              # Create local backup
 *   npm run backup -- --upload  # Create and upload to cloud storage
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import { createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import * as crypto from 'crypto';

const execAsync = promisify(exec);

interface BackupConfig {
  databaseUrl: string;
  backupDir: string;
  format: 'custom' | 'plain' | 'directory';
  compress: boolean;
  retention: number; // days
  upload?: boolean;
}

interface BackupMetadata {
  filename: string;
  timestamp: string;
  size: number;
  checksum: string;
  format: string;
  compressed: boolean;
  database: string;
}

class DatabaseBackup {
  private config: BackupConfig;

  constructor(config: Partial<BackupConfig> = {}) {
    this.config = {
      databaseUrl: process.env.DATABASE_URL || '',
      backupDir: process.env.BACKUP_DIR || path.join(__dirname, '../../backups'),
      format: (config.format as 'custom' | 'plain' | 'directory') || 'custom',
      compress: config.compress !== undefined ? config.compress : true,
      retention: config.retention || 30,
      upload: config.upload || false,
    };

    if (!this.config.databaseUrl) {
      throw new Error('DATABASE_URL environment variable is required');
    }
  }

  /**
   * Create a database backup
   */
  async createBackup(): Promise<BackupMetadata> {
    console.log('🔄 Starting database backup...');

    // Ensure backup directory exists
    await fs.mkdir(this.config.backupDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const dbName = this.getDatabaseName();
    const filename = `${dbName}_${timestamp}`;

    let backupPath: string;
    let pgDumpCommand: string;

    switch (this.config.format) {
      case 'custom':
        backupPath = path.join(this.config.backupDir, `${filename}.dump`);
        pgDumpCommand = `pg_dump -Fc "${this.config.databaseUrl}" -f "${backupPath}"`;
        break;

      case 'plain':
        backupPath = path.join(this.config.backupDir, `${filename}.sql`);
        pgDumpCommand = `pg_dump "${this.config.databaseUrl}" -f "${backupPath}"`;
        if (this.config.compress) {
          // Compress after creation
          pgDumpCommand += ` && gzip "${backupPath}"`;
          backupPath += '.gz';
        }
        break;

      case 'directory':
        backupPath = path.join(this.config.backupDir, filename);
        pgDumpCommand = `pg_dump -Fd "${this.config.databaseUrl}" -f "${backupPath}"`;
        break;

      default:
        throw new Error(`Unsupported backup format: ${this.config.format}`);
    }

    try {
      console.log(`📦 Creating backup: ${path.basename(backupPath)}`);
      console.log(`   Format: ${this.config.format}`);
      console.log(`   Compression: ${this.config.compress ? 'enabled' : 'disabled'}`);

      // Execute pg_dump
      const { stdout, stderr } = await execAsync(pgDumpCommand);
      if (stderr && !stderr.includes('WARNING')) {
        console.warn('⚠️  pg_dump warnings:', stderr);
      }

      // Calculate file size and checksum
      const stats = await fs.stat(backupPath);
      const checksum = await this.calculateChecksum(backupPath);

      const metadata: BackupMetadata = {
        filename: path.basename(backupPath),
        timestamp: new Date().toISOString(),
        size: stats.size,
        checksum,
        format: this.config.format,
        compressed: this.config.compress || this.config.format === 'custom',
        database: dbName,
      };

      // Save metadata
      await this.saveMetadata(metadata);

      console.log(`✅ Backup created successfully!`);
      console.log(`   Size: ${this.formatBytes(metadata.size)}`);
      console.log(`   Checksum: ${checksum}`);
      console.log(`   Location: ${backupPath}`);

      // Upload to cloud storage if requested
      if (this.config.upload) {
        await this.uploadBackup(backupPath, metadata);
      }

      // Clean up old backups
      await this.cleanupOldBackups();

      return metadata;
    } catch (error) {
      console.error('❌ Backup failed:', error);
      throw error;
    }
  }

  /**
   * Calculate SHA256 checksum of a file
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
   * Save backup metadata to JSON file
   */
  private async saveMetadata(metadata: BackupMetadata): Promise<void> {
    const metadataPath = path.join(
      this.config.backupDir,
      `${metadata.filename}.metadata.json`
    );
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
  }

  /**
   * Upload backup to cloud storage (placeholder for S3, GCS, etc.)
   */
  private async uploadBackup(
    backupPath: string,
    metadata: BackupMetadata
  ): Promise<void> {
    console.log('☁️  Uploading backup to cloud storage...');

    // This is a placeholder implementation
    // In production, you would integrate with:
    // - AWS S3 (using @aws-sdk/client-s3)
    // - Google Cloud Storage (using @google-cloud/storage)
    // - Azure Blob Storage (using @azure/storage-blob)
    // - Railway Volumes (using Railway CLI)

    if (process.env.AWS_S3_BUCKET && process.env.AWS_ACCESS_KEY_ID) {
      // Example S3 upload (requires @aws-sdk/client-s3)
      console.log('   Uploading to AWS S3...');
      // await this.uploadToS3(backupPath, metadata);
      console.log('   ⚠️  S3 upload not implemented yet');
    } else {
      console.log('   ⚠️  No cloud storage configured');
      console.log('   💡 Set AWS_S3_BUCKET and AWS_ACCESS_KEY_ID to enable S3 uploads');
    }
  }

  /**
   * Clean up backups older than retention period
   */
  private async cleanupOldBackups(): Promise<void> {
    console.log(`🧹 Cleaning up backups older than ${this.config.retention} days...`);

    const files = await fs.readdir(this.config.backupDir);
    const now = Date.now();
    const retentionMs = this.config.retention * 24 * 60 * 60 * 1000;

    let deletedCount = 0;

    for (const file of files) {
      if (file.endsWith('.metadata.json')) continue;

      const filePath = path.join(this.config.backupDir, file);
      const stats = await fs.stat(filePath);

      if (now - stats.mtimeMs > retentionMs) {
        await fs.unlink(filePath);

        // Also delete metadata file if exists
        const metadataPath = `${filePath}.metadata.json`;
        try {
          await fs.unlink(metadataPath);
        } catch {
          // Metadata file might not exist
        }

        deletedCount++;
        console.log(`   Deleted: ${file}`);
      }
    }

    if (deletedCount === 0) {
      console.log('   No old backups to delete');
    } else {
      console.log(`   Deleted ${deletedCount} old backup(s)`);
    }
  }

  /**
   * Extract database name from connection string
   */
  private getDatabaseName(): string {
    try {
      const url = new URL(this.config.databaseUrl);
      return url.pathname.slice(1) || 'database';
    } catch {
      return 'database';
    }
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
   * List all available backups
   */
  async listBackups(): Promise<BackupMetadata[]> {
    try {
      const files = await fs.readdir(this.config.backupDir);
      const metadataFiles = files.filter(f => f.endsWith('.metadata.json'));

      const backups: BackupMetadata[] = [];
      for (const file of metadataFiles) {
        const content = await fs.readFile(
          path.join(this.config.backupDir, file),
          'utf-8'
        );
        backups.push(JSON.parse(content));
      }

      return backups.sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (error) {
      console.error('Error listing backups:', error);
      return [];
    }
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);
  const upload = args.includes('--upload');
  const list = args.includes('--list');

  const backup = new DatabaseBackup({ upload });

  if (list) {
    console.log('📋 Available backups:\n');
    const backups = await backup.listBackups();

    if (backups.length === 0) {
      console.log('No backups found');
      return;
    }

    backups.forEach((b, i) => {
      console.log(`${i + 1}. ${b.filename}`);
      console.log(`   Date: ${new Date(b.timestamp).toLocaleString()}`);
      console.log(`   Size: ${b.size} bytes`);
      console.log(`   Format: ${b.format}`);
      console.log(`   Checksum: ${b.checksum.slice(0, 16)}...`);
      console.log('');
    });
  } else {
    await backup.createBackup();
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { DatabaseBackup, BackupConfig, BackupMetadata };
