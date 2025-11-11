#!/usr/bin/env node
/**
 * Backup Monitoring and Health Check Script
 *
 * Monitors backup health and sends alerts when issues are detected:
 * - Missing backups (no backup in expected timeframe)
 * - Failed verifications
 * - Corrupted backups
 * - Storage space issues
 * - Backup age warnings
 *
 * Usage:
 *   npm run monitor-backups              # Run health check
 *   npm run monitor-backups -- --json    # Output JSON for monitoring systems
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { DatabaseBackup, BackupMetadata } from './backup-database';
import { BackupVerifier, VerificationResult } from './verify-backup';

interface HealthCheckResult {
  status: 'healthy' | 'warning' | 'critical';
  timestamp: string;
  checks: {
    recentBackupExists: boolean;
    backupCount: number;
    oldestBackup: string | null;
    newestBackup: string | null;
    totalSize: number;
    failedBackups: number;
  };
  issues: Issue[];
  recommendations: string[];
}

interface Issue {
  severity: 'warning' | 'critical';
  message: string;
  type: 'missing_backup' | 'old_backup' | 'storage' | 'verification' | 'corruption';
}

class BackupMonitor {
  private backupDir: string;
  private maxBackupAge: number; // hours
  private minBackupCount: number;
  private maxStorageSize: number; // bytes

  constructor(config?: {
    backupDir?: string;
    maxBackupAge?: number;
    minBackupCount?: number;
    maxStorageSize?: number;
  }) {
    this.backupDir = config?.backupDir || process.env.BACKUP_DIR || path.join(__dirname, '../../backups');
    this.maxBackupAge = config?.maxBackupAge || 26; // Alert if no backup in 26 hours
    this.minBackupCount = config?.minBackupCount || 3; // Should have at least 3 backups
    this.maxStorageSize = config?.maxStorageSize || 10 * 1024 * 1024 * 1024; // 10 GB
  }

  /**
   * Run comprehensive health check
   */
  async runHealthCheck(): Promise<HealthCheckResult> {
    console.log('🏥 Running backup health check...\n');

    const result: HealthCheckResult = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        recentBackupExists: false,
        backupCount: 0,
        oldestBackup: null,
        newestBackup: null,
        totalSize: 0,
        failedBackups: 0,
      },
      issues: [],
      recommendations: [],
    };

    try {
      // Get all backups
      const backup = new DatabaseBackup({ backupDir: this.backupDir });
      const backups = await backup.listBackups();

      result.checks.backupCount = backups.length;

      if (backups.length === 0) {
        result.issues.push({
          severity: 'critical',
          message: 'No backups found!',
          type: 'missing_backup',
        });
        result.status = 'critical';
        console.log('❌ CRITICAL: No backups found!');
        return result;
      }

      // Check newest backup
      const newestBackup = backups[0];
      const newestBackupAge = this.getBackupAgeHours(newestBackup);
      result.checks.newestBackup = newestBackup.timestamp;

      console.log(`✅ Found ${backups.length} backup(s)`);
      console.log(`   Latest backup: ${new Date(newestBackup.timestamp).toLocaleString()}`);
      console.log(`   Backup age: ${newestBackupAge.toFixed(1)} hours\n`);

      // Check if recent backup exists
      if (newestBackupAge <= this.maxBackupAge) {
        result.checks.recentBackupExists = true;
        console.log('✅ Recent backup exists');
      } else {
        result.issues.push({
          severity: 'critical',
          message: `Latest backup is ${newestBackupAge.toFixed(1)} hours old (threshold: ${this.maxBackupAge} hours)`,
          type: 'old_backup',
        });
        result.status = 'critical';
        console.log(`❌ CRITICAL: Latest backup is too old (${newestBackupAge.toFixed(1)} hours)`);
      }

      // Check backup count
      if (backups.length < this.minBackupCount) {
        result.issues.push({
          severity: 'warning',
          message: `Only ${backups.length} backup(s) found (recommended: ${this.minBackupCount})`,
          type: 'missing_backup',
        });
        if (result.status === 'healthy') {
          result.status = 'warning';
        }
        console.log(`⚠️  WARNING: Low backup count (${backups.length}/${this.minBackupCount})`);
      } else {
        console.log(`✅ Sufficient backups (${backups.length})`);
      }

      // Check oldest backup
      const oldestBackup = backups[backups.length - 1];
      result.checks.oldestBackup = oldestBackup.timestamp;

      const oldestBackupAge = this.getBackupAgeDays(oldestBackup);
      console.log(`   Oldest backup: ${oldestBackupAge.toFixed(1)} days old\n`);

      // Calculate total storage
      let totalSize = 0;
      for (const b of backups) {
        totalSize += b.size;
      }
      result.checks.totalSize = totalSize;

      console.log(`📊 Storage: ${this.formatBytes(totalSize)}`);

      if (totalSize > this.maxStorageSize) {
        result.issues.push({
          severity: 'warning',
          message: `Backup storage (${this.formatBytes(totalSize)}) exceeds threshold (${this.formatBytes(this.maxStorageSize)})`,
          type: 'storage',
        });
        if (result.status === 'healthy') {
          result.status = 'warning';
        }
        console.log(`⚠️  WARNING: High storage usage`);
      } else {
        console.log('✅ Storage usage normal');
      }

      // Verify backup integrity
      console.log('\n🔍 Verifying backup integrity...\n');

      const verifier = new BackupVerifier(this.backupDir);
      const latestBackupPath = path.join(this.backupDir, newestBackup.filename);
      const verificationResult = await verifier.verifyBackup(latestBackupPath);

      if (!verificationResult.success) {
        result.issues.push({
          severity: 'critical',
          message: `Latest backup verification failed: ${verificationResult.errors.join(', ')}`,
          type: 'verification',
        });
        result.checks.failedBackups++;
        result.status = 'critical';
      }

      // Generate recommendations
      result.recommendations = this.generateRecommendations(result);

    } catch (error) {
      result.issues.push({
        severity: 'critical',
        message: `Health check failed: ${error}`,
        type: 'verification',
      });
      result.status = 'critical';
      console.error('❌ Health check error:', error);
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('HEALTH CHECK SUMMARY');
    console.log('='.repeat(60));

    const statusIcon = result.status === 'healthy' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
    console.log(`Status: ${statusIcon} ${result.status.toUpperCase()}`);

    if (result.issues.length > 0) {
      console.log('\nIssues:');
      result.issues.forEach(issue => {
        const icon = issue.severity === 'critical' ? '❌' : '⚠️';
        console.log(`  ${icon} ${issue.message}`);
      });
    }

    if (result.recommendations.length > 0) {
      console.log('\nRecommendations:');
      result.recommendations.forEach(rec => {
        console.log(`  💡 ${rec}`);
      });
    }

    return result;
  }

  /**
   * Generate recommendations based on health check results
   */
  private generateRecommendations(result: HealthCheckResult): string[] {
    const recommendations: string[] = [];

    if (!result.checks.recentBackupExists) {
      recommendations.push('Create a new backup immediately: npm run backup');
      recommendations.push('Check GitHub Actions workflow for backup failures');
    }

    if (result.checks.backupCount < this.minBackupCount) {
      recommendations.push('Increase backup frequency or retention period');
    }

    if (result.checks.totalSize > this.maxStorageSize * 0.8) {
      recommendations.push('Consider cleaning up old backups or increasing storage');
      recommendations.push('Review backup retention policy');
    }

    if (result.checks.failedBackups > 0) {
      recommendations.push('Investigate failed backup verifications');
      recommendations.push('Consider re-creating failed backups');
    }

    // Check backup frequency
    if (result.checks.backupCount > 0 && result.checks.newestBackup && result.checks.oldestBackup) {
      const newest = new Date(result.checks.newestBackup);
      const oldest = new Date(result.checks.oldestBackup);
      const days = (newest.getTime() - oldest.getTime()) / (1000 * 60 * 60 * 24);
      const avgFrequency = days / result.checks.backupCount;

      if (avgFrequency > 1.5) {
        recommendations.push('Consider increasing backup frequency to daily');
      }
    }

    return recommendations;
  }

  /**
   * Get backup age in hours
   */
  private getBackupAgeHours(backup: BackupMetadata): number {
    const now = new Date();
    const backupDate = new Date(backup.timestamp);
    return (now.getTime() - backupDate.getTime()) / (1000 * 60 * 60);
  }

  /**
   * Get backup age in days
   */
  private getBackupAgeDays(backup: BackupMetadata): number {
    return this.getBackupAgeHours(backup) / 24;
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
   * Send alert (placeholder for integration with monitoring services)
   */
  async sendAlert(result: HealthCheckResult): Promise<void> {
    if (result.status === 'healthy') {
      return;
    }

    console.log('\n🚨 ALERT: Backup health check failed!\n');

    // This is a placeholder for actual alerting integration
    // In production, you would integrate with:
    // - Slack webhook
    // - PagerDuty API
    // - Email service (SendGrid, AWS SES)
    // - Discord webhook
    // - Custom monitoring system

    // Example Slack webhook (if configured)
    if (process.env.SLACK_WEBHOOK_URL) {
      console.log('📤 Sending alert to Slack...');
      // await this.sendSlackAlert(result);
      console.log('   ⚠️  Slack integration not implemented yet');
    }

    // Example Email (if configured)
    if (process.env.ALERT_EMAIL) {
      console.log('📧 Sending email alert...');
      // await this.sendEmailAlert(result);
      console.log('   ⚠️  Email integration not implemented yet');
    }

    // Log to file for monitoring systems to pick up
    await this.logAlert(result);
  }

  /**
   * Log alert to file
   */
  private async logAlert(result: HealthCheckResult): Promise<void> {
    const logPath = path.join(this.backupDir, 'health-check.log');
    const logEntry = `[${result.timestamp}] ${result.status.toUpperCase()}: ${result.issues.map(i => i.message).join(', ')}\n`;

    try {
      await fs.appendFile(logPath, logEntry);
      console.log(`📝 Alert logged to: ${logPath}`);
    } catch (error) {
      console.error('Failed to write alert log:', error);
    }
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);
  const jsonOutput = args.includes('--json');
  const sendAlerts = args.includes('--alert');

  const monitor = new BackupMonitor();
  const result = await monitor.runHealthCheck();

  // JSON output for monitoring systems
  if (jsonOutput) {
    console.log('\n' + JSON.stringify(result, null, 2));
  }

  // Send alerts if requested
  if (sendAlerts) {
    await monitor.sendAlert(result);
  }

  // Exit with appropriate code for monitoring systems
  if (result.status === 'critical') {
    process.exit(2);
  } else if (result.status === 'warning') {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(3);
  });
}

export { BackupMonitor, HealthCheckResult, Issue };
