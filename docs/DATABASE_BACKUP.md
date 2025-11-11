# Database Backup & Recovery Strategy

Complete guide for backing up and restoring the PostgreSQL database.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Backup Strategy](#backup-strategy)
- [Creating Backups](#creating-backups)
- [Restoring Backups](#restoring-backups)
- [Verification](#verification)
- [Automated Backups](#automated-backups)
- [Monitoring](#monitoring)
- [Disaster Recovery](#disaster-recovery)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

This project uses a comprehensive database backup strategy with:

- **Automated daily backups** via GitHub Actions
- **Multiple backup formats** (custom, plain SQL, directory)
- **Integrity verification** with checksums
- **Tested restore procedures** with safety mechanisms
- **30-day retention** for backup artifacts
- **Optional cloud storage** integration (S3, GCS, Azure)

### Database Details

- **Database**: PostgreSQL 15
- **Hosting**: Railway (production)
- **Tables**: 30+ tables including users, questions, sessions, subscriptions
- **Critical Data**: User accounts, quiz history, session registrations, AI interactions

## Quick Start

### Create a Backup

```bash
cd backend
npm run backup
```

### List Available Backups

```bash
npm run backup:list
```

### Restore from Latest Backup

```bash
npm run restore -- --latest
```

### Verify a Backup

```bash
npm run verify-backup -- --latest
```

## Backup Strategy

### Backup Schedule

1. **Daily Automated Backups**
   - Time: 2:00 AM UTC
   - Platform: GitHub Actions
   - Retention: 30 days
   - Verification: Automatic checksum validation

2. **Manual Backups**
   - Before major deployments
   - Before database migrations
   - Before bulk data operations
   - Before schema changes

3. **Pre-Restore Safety Backups**
   - Automatic before any restore operation
   - Allows rollback if restore fails

### Backup Formats

| Format | Size | Speed | Use Case |
|--------|------|-------|----------|
| `custom` | Small (compressed) | Fast restore | **Recommended** - Default format |
| `plain` | Medium | Universal | Sharing, version control |
| `directory` | Large | Parallel restore | Very large databases |

## Creating Backups

### Basic Backup

```bash
cd backend
npm run backup
```

This creates a backup in `backend/backups/` with format:
```
database_2025-01-15T14-30-00-000Z.dump
database_2025-01-15T14-30-00-000Z.dump.metadata.json
```

### Backup with Cloud Upload

```bash
npm run backup:upload
```

Requires environment variables:
```bash
export AWS_S3_BUCKET=your-bucket-name
export AWS_ACCESS_KEY_ID=your-access-key
export AWS_SECRET_ACCESS_KEY=your-secret-key
```

### Custom Backup Configuration

Create a backup with specific settings:

```typescript
import { DatabaseBackup } from './src/scripts/backup-database';

const backup = new DatabaseBackup({
  format: 'custom',      // or 'plain', 'directory'
  compress: true,        // Enable compression
  retention: 30,         // Days to keep backups
  upload: false,         // Upload to cloud storage
});

await backup.createBackup();
```

### Environment Variables

```bash
# Required
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Optional
BACKUP_DIR=/path/to/backups    # Default: backend/backups
RETENTION_DAYS=30               # Default: 30
AWS_S3_BUCKET=your-bucket       # For cloud uploads
```

## Restoring Backups

### ⚠️ IMPORTANT SAFETY WARNINGS

1. **Restore replaces ALL current data**
2. **A safety backup is created automatically before restore**
3. **Test restores in a staging environment first**
4. **Ensure no active users during production restore**

### Restore from Specific Backup

```bash
npm run restore -- database_2025-01-15T14-30-00-000Z.dump
```

### Restore from Latest Backup

```bash
npm run restore -- --latest
```

### Restore with Verification

```bash
npm run restore -- --latest --verify
```

### Skip Confirmation (Automated Restore)

```bash
npm run restore -- --latest --force
```

### Interactive Restore Process

1. **Pre-flight checks**
   - Database connectivity
   - Active connections warning
   - Disk space check

2. **Backup verification**
   - File integrity
   - Checksum validation
   - Metadata verification

3. **Safety confirmation**
   - User must type "RESTORE" to proceed
   - Display backup details and warnings

4. **Safety backup**
   - Current database backed up automatically
   - Allows rollback if restore fails

5. **Restore operation**
   - Database cleaned (DROP CASCADE)
   - Backup restored
   - Schema recreated

6. **Verification** (if --verify flag used)
   - Table count validation
   - Critical table checks
   - Row count verification

7. **Rollback** (on failure)
   - Automatic rollback to safety backup
   - Database restored to pre-restore state

## Verification

### Verify Latest Backup

```bash
npm run verify-backup -- --latest
```

### Verify Specific Backup

```bash
npm run verify-backup -- database_2025-01-15T14-30-00-000Z.dump
```

### Verify All Backups

```bash
npm run verify-backup -- --all
```

### Verification Checks

1. ✅ **File exists** - Backup file is accessible
2. ✅ **Metadata valid** - Metadata file is present and valid
3. ✅ **Checksum valid** - File integrity verified
4. ✅ **Restore test** - Backup can be restored to test database
5. ✅ **Data integrity** - Tables and rows verified after restore

### Test Database Setup

For full verification including restore testing, set up a test database:

```bash
export TEST_DATABASE_URL=postgresql://user:pass@localhost:5432/test_db
```

## Automated Backups

### GitHub Actions Workflow

Located at `.github/workflows/database-backup.yml`

**Daily Backups:**
- Runs at 2:00 AM UTC
- Creates backup
- Verifies integrity
- Uploads to GitHub Actions artifacts (30-day retention)
- Creates GitHub issue on failure

**Weekly Verification:**
- Runs Sundays at 3:00 AM UTC
- Downloads recent backups
- Verifies all backups
- Creates verification report

### Manual Trigger

1. Go to GitHub Actions
2. Select "Database Backup" workflow
3. Click "Run workflow"
4. Optional: Enable cloud upload

### Railway Configuration

Railway provides backup features in their dashboard:

1. Navigate to Railway project
2. Select PostgreSQL database
3. Go to "Backups" tab
4. Configure automated backups
5. Set retention policy

**Recommended Railway Settings:**
- Backup frequency: Daily
- Retention: 14 days
- Point-in-time recovery: Enabled

## Monitoring

### Backup Monitoring Checklist

- [ ] Daily backup completes successfully
- [ ] Backup artifacts uploaded to GitHub Actions
- [ ] Weekly verification passes
- [ ] No GitHub issues created for backup failures
- [ ] Backup file sizes are consistent
- [ ] Cloud storage sync (if configured)

### Health Checks

```bash
# Check latest backup
npm run backup:list

# Verify latest backup
npm run verify-backup -- --latest

# Check backup directory size
du -sh backend/backups

# Check GitHub Actions backup artifacts
# Visit: https://github.com/YOUR_ORG/YOUR_REPO/actions
```

### Alerting

**GitHub Actions Notifications:**
- Automatically creates GitHub issues on backup failure
- Email notifications (configure in GitHub settings)

**Custom Alerting (Optional):**

Set up monitoring with:
- **Slack**: Use GitHub Actions Slack integration
- **PagerDuty**: Configure webhook notifications
- **Email**: Use GitHub Actions email notifications
- **Discord**: Use webhook for Discord notifications

Example Slack notification:

```yaml
- name: Notify Slack on failure
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "🚨 Database backup failed!",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Database backup workflow failed.\n<${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View workflow run>"
            }
          }
        ]
      }
```

## Disaster Recovery

### Recovery Time Objective (RTO)

**Target**: Database restored within **30 minutes**

### Recovery Point Objective (RPO)

**Target**: Maximum data loss of **24 hours** (daily backups)

### Disaster Recovery Procedure

#### 1. Assess the Situation

```bash
# Check database connectivity
psql "$DATABASE_URL" -c "SELECT 1"

# Check database size
psql "$DATABASE_URL" -c "SELECT pg_size_pretty(pg_database_size(current_database()))"

# Check table count
psql "$DATABASE_URL" -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public'"
```

#### 2. Download Latest Backup

From GitHub Actions:
1. Go to Actions → Database Backup workflow
2. Find latest successful run
3. Download backup artifact
4. Extract backup files

From Railway (if configured):
1. Railway dashboard → Database → Backups
2. Download latest backup
3. Extract if needed

#### 3. Prepare for Restore

```bash
# Set environment variables
export DATABASE_URL=your_production_database_url

# Verify backup integrity
npm run verify-backup -- downloaded-backup.dump
```

#### 4. Execute Restore

```bash
# Production restore (with safety backup)
npm run restore -- downloaded-backup.dump --verify

# Or restore from latest
npm run restore -- --latest --verify
```

#### 5. Verify Recovery

```bash
# Check critical tables
psql "$DATABASE_URL" -c "SELECT count(*) FROM users"
psql "$DATABASE_URL" -c "SELECT count(*) FROM questions"
psql "$DATABASE_URL" -c "SELECT count(*) FROM quiz_sessions"

# Check latest data
psql "$DATABASE_URL" -c "SELECT max(created_at) FROM quiz_sessions"
```

#### 6. Resume Service

```bash
# Restart backend service (Railway)
# Railway dashboard → Backend → Deploy

# Monitor logs
railway logs --service backend

# Verify application health
curl https://your-backend.up.railway.app/health
```

### Emergency Contacts

- **Database Owner**: [Add contact]
- **DevOps Lead**: [Add contact]
- **Railway Support**: https://railway.app/help

## Best Practices

### Before Major Operations

Always create a backup before:

1. **Database migrations**
   ```bash
   npm run backup
   npm run db:migrate
   ```

2. **Schema changes**
   ```bash
   npm run backup
   # Make schema changes
   ```

3. **Bulk data operations**
   ```bash
   npm run backup
   # Perform bulk operations
   ```

4. **Production deployments**
   ```bash
   npm run backup
   # Deploy
   ```

### Regular Maintenance

**Daily:**
- ✅ Verify automated backup completed
- ✅ Check GitHub Actions workflow status

**Weekly:**
- ✅ Review backup verification report
- ✅ Check backup storage usage
- ✅ Verify backup retention policy

**Monthly:**
- ✅ Test restore procedure in staging
- ✅ Review disaster recovery plan
- ✅ Update documentation if needed
- ✅ Clean up old backups beyond retention

**Quarterly:**
- ✅ Perform full disaster recovery drill
- ✅ Review and update RTO/RPO targets
- ✅ Audit backup access permissions
- ✅ Review cloud storage costs

### Security

1. **Encrypt backups** (for cloud storage)
   ```bash
   # Encrypt before upload
   gpg --symmetric --cipher-algo AES256 backup.dump
   ```

2. **Secure backup storage**
   - Use private S3 buckets
   - Enable versioning
   - Set up access logging
   - Use IAM roles with least privilege

3. **Rotate credentials**
   - Rotate database passwords quarterly
   - Update backup scripts with new credentials
   - Use secrets management (GitHub Secrets, Railway Variables)

4. **Access control**
   - Limit who can trigger backups
   - Limit who can download backups
   - Audit backup access logs

## Troubleshooting

### Backup Fails

**Error: "DATABASE_URL not set"**
```bash
export DATABASE_URL=postgresql://...
npm run backup
```

**Error: "pg_dump: command not found"**
```bash
# Install PostgreSQL client tools
# Ubuntu/Debian:
sudo apt-get install postgresql-client

# macOS:
brew install postgresql
```

**Error: "Permission denied"**
```bash
# Create backup directory
mkdir -p backend/backups
chmod 755 backend/backups
```

### Restore Fails

**Error: "Backup file corrupted"**
```bash
# Verify checksum
npm run verify-backup -- backup.dump

# Try another backup
npm run backup:list
npm run restore -- previous-backup.dump
```

**Error: "Active connections blocking restore"**
```bash
# Terminate active connections
psql "$DATABASE_URL" -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid()"

# Retry restore
npm run restore -- backup.dump
```

**Error: "Insufficient disk space"**
```bash
# Check disk space
df -h

# Clean up old backups
npm run backup:list
# Manually delete old backups
```

### Verification Fails

**Error: "Checksum mismatch"**
```bash
# Backup file is corrupted
# Try downloading again or use a different backup
npm run backup:list
```

**Error: "TEST_DATABASE_URL not set"**
```bash
# Set up test database for full verification
export TEST_DATABASE_URL=postgresql://...
npm run verify-backup -- --latest
```

### GitHub Actions Fails

**Check workflow logs:**
1. Go to GitHub Actions
2. Select failed workflow run
3. Review error logs

**Common issues:**
- DATABASE_URL secret not set
- Insufficient disk space in runner
- Network timeout to database

**Fix:**
1. Update GitHub secrets
2. Increase workflow timeout
3. Check Railway database accessibility

## Additional Resources

- [PostgreSQL Backup Documentation](https://www.postgresql.org/docs/current/backup.html)
- [Railway Backup Guide](https://docs.railway.app/databases/backups)
- [GitHub Actions Artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)
- [AWS S3 Backup Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/backup-practices.html)

## Support

For issues or questions:
1. Check this documentation
2. Review GitHub Actions logs
3. Check Railway database logs
4. Create an issue in the repository
5. Contact the development team

---

**Last Updated**: 2025-01-15
**Version**: 1.0.0
**Maintained by**: Development Team
