# Database Backup - Quick Reference

Quick reference guide for database backup operations. For comprehensive documentation, see [docs/DATABASE_BACKUP.md](../docs/DATABASE_BACKUP.md).

## Quick Commands

### Create Backup
```bash
npm run backup
```

### List Backups
```bash
npm run backup:list
```

### Restore from Latest
```bash
npm run restore -- --latest
```

### Verify Latest Backup
```bash
npm run verify-backup -- --latest
```

### Monitor Backup Health
```bash
npm run monitor-backups
```

## Common Operations

### Before Deployment
```bash
# Create backup before deploying
npm run backup

# Verify backup was created
npm run backup:list
```

### After Deployment Issue
```bash
# List available backups
npm run backup:list

# Restore from specific backup
npm run restore -- <backup-filename>
```

### Regular Maintenance
```bash
# Check backup health
npm run monitor-backups

# Verify all backups
npm run verify-backup -- --all
```

## Automated Backups

**Daily backups run automatically at 2:00 AM UTC via GitHub Actions**

Check status: GitHub Actions → Database Backup workflow

## Environment Variables

Required:
```bash
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

Optional:
```bash
BACKUP_DIR=/path/to/backups          # Default: backend/backups
TEST_DATABASE_URL=postgresql://...   # For verification testing
AWS_S3_BUCKET=bucket-name            # For cloud uploads
```

## File Locations

- **Backup scripts**: `backend/src/scripts/backup-*.ts`
- **Backup storage**: `backend/backups/`
- **Documentation**: `docs/DATABASE_BACKUP.md`
- **GitHub Actions**: `.github/workflows/database-backup.yml`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run backup` | Create a new backup |
| `npm run backup:upload` | Create backup and upload to cloud |
| `npm run backup:list` | List all available backups |
| `npm run restore` | Restore from backup |
| `npm run verify-backup` | Verify backup integrity |
| `npm run monitor-backups` | Check backup health |
| `npm run monitor-backups:json` | Health check with JSON output |
| `npm run monitor-backups:alert` | Health check with alerting |

## Safety Features

- ✅ **Automatic safety backup** before every restore
- ✅ **Checksum verification** for integrity
- ✅ **Rollback capability** if restore fails
- ✅ **Confirmation required** for production restores
- ✅ **Pre-flight checks** before operations

## Recovery Time

- **Backup creation**: ~1-5 minutes (depending on database size)
- **Restore time**: ~2-10 minutes (depending on database size)
- **Target RTO**: 30 minutes
- **Target RPO**: 24 hours

## Support

For issues or detailed information, see:
- 📖 [Full Documentation](../docs/DATABASE_BACKUP.md)
- 🐛 [Create an Issue](https://github.com/your-org/your-repo/issues)
- 💬 Contact development team

## Emergency Recovery

**If database is corrupted or lost:**

1. **Stay calm** - We have backups
2. **Check latest backup**: `npm run backup:list`
3. **Verify backup**: `npm run verify-backup -- --latest`
4. **Restore**: `npm run restore -- --latest --verify`
5. **Verify recovery**: Check critical tables and data
6. **Contact team** if issues persist

---

**Last Updated**: 2025-01-15
