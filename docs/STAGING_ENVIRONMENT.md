# Staging Environment Setup Guide

This guide explains how to set up and use the staging environment for the PAES Math application.

## Overview

The staging environment sits between development and production, providing:
- A stable testing ground for new features
- QA validation before production deployments
- A production-like environment for final verification
- Isolated database and services for safe testing

## Environment Architecture

```
Development (Local)
    ↓
Staging (Railway + Vercel)
    ↓
Production (Railway + Vercel)
```

| Component | Development | Staging | Production |
|-----------|-------------|---------|------------|
| Frontend | localhost:3000 | staging.paes-math.vercel.app | paes-math.vercel.app |
| Backend | localhost:3001 | paes-math-backend-staging.railway.app | paes-math-backend-production.railway.app |
| Database | Local PostgreSQL | Railway PostgreSQL (staging) | Railway PostgreSQL (production) |
| Branch | Any local branch | `staging` | `main` |

## Setup Instructions

### 1. Railway Backend Setup

1. **Create a new Railway service for staging:**
   ```bash
   # In Railway dashboard:
   # - Create a new service named "paes-math-backend-staging"
   # - Connect to your GitHub repository
   # - Set the root directory to "backend"
   ```

2. **Configure environment variables** in Railway:
   ```env
   PORT=3001
   NODE_ENV=staging
   DATABASE_URL=<your-staging-db-connection-string>
   JWT_SECRET=<staging-jwt-secret>
   JWT_REFRESH_SECRET=<staging-refresh-secret>
   JWT_EXPIRES_IN=1h
   JWT_REFRESH_EXPIRES_IN=7d
   FRONTEND_URL=https://staging.paes-math.vercel.app
   ANTHROPIC_API_KEY=<your-api-key>
   RESEND_API_KEY=<your-resend-key>
   RESEND_FROM=staging@paes.cl
   MERCADOPAGO_ACCESS_TOKEN=<test-token>
   SENTRY_DSN=<staging-sentry-dsn>
   ```

3. **Set up a staging database:**
   - Create a new PostgreSQL database in Railway
   - Name it "paes-staging-db"
   - Connect it to the staging backend service

4. **Configure deployment settings:**
   - Use the `railway.staging.json` configuration
   - Set start command: `npm run migrate:sync; npm run migrate; npm run seed:admin; npm run seed:plans; npm start`

### 2. Vercel Frontend Setup

1. **Create a staging deployment:**
   ```bash
   # Option A: Git branch-based
   # - Create a `staging` branch
   # - Configure Vercel to deploy staging branch to staging URL

   # Option B: Environment-based
   # - Set up a separate Vercel project for staging
   # - Or use Vercel preview deployments with custom domain
   ```

2. **Configure environment variables** in Vercel:
   ```env
   NEXT_PUBLIC_ENVIRONMENT=staging
   NEXT_PUBLIC_API_URL=https://paes-math-backend-staging.up.railway.app
   NEXT_PUBLIC_SENTRY_DSN=<staging-sentry-dsn>
   NEXT_PUBLIC_POSTHOG_KEY=<staging-posthog-key>
   NEXT_PUBLIC_ENABLE_EXPERIMENTAL_FEATURES=true
   NEXT_PUBLIC_DEBUG_MODE=true
   ```

3. **Set up custom domain:**
   ```bash
   # In Vercel dashboard:
   # - Add domain: staging.paes-math.vercel.app
   # - Or use your own staging subdomain
   ```

### 3. GitHub Actions Setup

1. **Add repository secrets:**
   ```
   RAILWAY_STAGING_TOKEN - Railway API token for staging
   RAILWAY_PRODUCTION_TOKEN - Railway API token for production
   VERCEL_TOKEN - Vercel API token
   ```

2. **Create staging branch:**
   ```bash
   git checkout -b staging
   git push -u origin staging
   ```

3. **Configure branch protection:**
   - Require PR reviews before merging to staging
   - Require status checks to pass
   - Optionally require linear history

## Deployment Workflows

### Automatic Deployment to Staging (on merge to master)

Merges to `main` or `master` branch automatically trigger staging deployment:
1. Run all tests (frontend + backend)
2. Deploy backend to Railway staging
3. Deploy frontend to Vercel staging
4. Verify health checks
5. Create deployment summary

```bash
# Merge feature branch to master (auto-deploys to staging)
git checkout master
git merge feature/my-feature
git push origin master
# → Automatically deploys to staging!
```

This ensures every merge to master is tested in staging first before going to production.

### Manual Staging Deployment

Use GitHub Actions workflow dispatch for staging:
1. Go to Actions → "Deploy to Staging"
2. Click "Run workflow"
3. Select options:
   - Deploy frontend: Yes/No
   - Deploy backend: Yes/No
   - Run migrations: Yes/No
4. Click "Run workflow"

### Deploy to Production (Manual Only)

Production deployments are **manual only** to ensure safety:
1. Go to Actions → "Deploy to Production"
2. Click "Run workflow"
3. Type "DEPLOY" to confirm
4. Select options:
   - Skip tests (not recommended)
   - Deploy frontend: Yes/No
   - Deploy backend: Yes/No
5. Click "Run workflow"

This will:
1. Validate staging is healthy (warning if not)
2. Run all tests (unless skipped)
3. Deploy to production
4. Create a release tag

## Local Development with Staging

### Connect to Staging Backend

```bash
# In .env.local
NEXT_PUBLIC_API_URL=https://paes-math-backend-staging.up.railway.app
```

### Use Staging Database Locally (Be Careful!)

```bash
# Only for debugging - DO NOT modify production/staging data
DATABASE_URL=<staging-db-connection-string>
```

## Monitoring Staging

### Health Checks

- Backend: `https://paes-math-backend-staging.up.railway.app/health`
- Frontend: `https://staging.paes-math.vercel.app/api/config`

### Logs

- **Railway**: View logs in Railway dashboard → Services → paes-math-backend-staging → Logs
- **Vercel**: View logs in Vercel dashboard → Deployments → Staging → Functions

### Error Tracking

- Configure separate Sentry projects for staging
- Use PostHog for staging analytics
- Monitor Railway metrics dashboard

## Best Practices

### 1. Feature Development Flow

```
1. Develop on feature branch
2. Open PR → Runs E2E tests with PR preview
3. Merge to master → Auto-deploys to staging
4. Test thoroughly on staging
5. Manual deploy to production (when ready)
```

### 2. Database Migrations

- Always test migrations on staging first
- Staging database should mirror production structure
- Use seed data that resembles production patterns

### 3. Environment Parity

- Keep staging as close to production as possible
- Use similar resource configurations
- Test with realistic data volumes

### 4. Security

- Use different secrets for each environment
- Never share production credentials with staging
- Rotate staging credentials regularly
- Use test/sandbox modes for payment processors

### 5. Data Management

- Never copy production user data to staging
- Use anonymized or synthetic test data
- Implement separate backup strategy for staging
- Clear staging data periodically

## Troubleshooting

### Staging Backend Not Accessible

1. Check Railway service status
2. Verify DATABASE_URL is correct
3. Check CORS settings for staging frontend URL
4. Review Railway logs for errors

### Frontend Not Connecting to Staging Backend

1. Verify `NEXT_PUBLIC_ENVIRONMENT=staging` is set
2. Check `NEXT_PUBLIC_API_URL` points to staging backend
3. Clear browser cache and local storage
4. Check browser console for CORS errors

### Database Migration Issues

1. SSH into Railway console
2. Run `npm run migrate:sync` to check status
3. Review migration files for errors
4. Check database connection string

### CI/CD Pipeline Failures

1. Check GitHub Actions logs
2. Verify all secrets are configured
3. Ensure test database is properly set up
4. Review test output for specific failures

## File Reference

- `backend/railway.staging.json` - Railway staging configuration
- `backend/.env.staging.example` - Backend environment template
- `.env.staging.example` - Frontend environment template
- `backend/src/config/database.config.js` - Database configuration (includes staging)
- `lib/api-client.ts` - API client with staging support
- `app/api/config/route.ts` - Server-side config endpoint
- `.github/workflows/deploy-staging.yml` - Staging deployment workflow (triggers on master merge)
- `.github/workflows/deploy-production.yml` - Production deployment workflow (manual only)

## Next Steps After Setup

1. ✅ Create Railway staging service and database
2. ✅ Configure Vercel staging deployment
3. ✅ Add GitHub Actions secrets
4. ✅ Create `staging` branch
5. ✅ Test the deployment pipeline
6. ✅ Set up monitoring and alerts
7. ✅ Configure team access to staging environment
8. ✅ Document team workflow for using staging
