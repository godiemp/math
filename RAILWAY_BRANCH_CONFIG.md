# Railway Branch Configuration Guide

## Current Situation

- **Default branch**: `master`
- **Feature branch**: `claude/fix-login-issue-011CUuMmAWwsziAgiUeXUnQ2`
- **Railway**: Needs to be configured to deploy from the correct branch

## Option 1: Deploy from Master Branch (Recommended for Production)

This is the standard approach - merge your feature branch to master, then Railway deploys from master.

### Step 1: Merge Feature Branch to Master

```bash
# Fetch latest changes
git fetch origin

# Checkout master branch
git checkout master

# Pull latest master
git pull origin master

# Merge your feature branch
git merge claude/fix-login-issue-011CUuMmAWwsziAgiUeXUnQ2

# Push to master
git push origin master
```

### Step 2: Configure Railway to Deploy from Master

1. Go to **Railway Dashboard**: https://railway.app/dashboard
2. Open your **backend project**
3. Click on your **backend service**
4. Go to **Settings** tab
5. Scroll to **Source** section
6. Look for **Branch** or **Deploy Branch** setting
7. Select **`master`** from the dropdown
8. Railway will automatically redeploy from master

## Option 2: Deploy from Feature Branch (For Testing)

If you want Railway to deploy directly from your feature branch without merging to master:

### Configure Railway Branch

1. Go to **Railway Dashboard**: https://railway.app/dashboard
2. Open your **backend project**
3. Click on your **backend service**
4. Go to **Settings** tab
5. Scroll to **Source** section
6. Under **Branch**, click the dropdown
7. Select **`claude/fix-login-issue-011CUuMmAWwsziAgiUeXUnQ2`**
8. Save changes
9. Railway will trigger a new deployment from this branch

## Verify Railway Configuration

### Check Current Branch in Railway

1. Go to Railway Dashboard → Your Project
2. Click on backend service
3. Go to **Deployments** tab
4. Look at the latest deployment
5. You should see the branch name and commit hash

### Check via Railway CLI (if installed)

```bash
cd backend

# Login to Railway
railway login

# Link to your project
railway link

# Check current configuration
railway status

# This will show:
# - Connected service
# - Current branch being deployed
# - Latest deployment info
```

## Railway Environment Variables Required

Make sure these are set in Railway (Settings → Variables):

```env
# Database (auto-set by Railway if you have PostgreSQL plugin)
DATABASE_URL=postgresql://...

# JWT Configuration
JWT_SECRET=your-production-secret-key
JWT_REFRESH_SECRET=your-production-refresh-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Server Config
NODE_ENV=production
PORT=3001

# CORS Configuration (optional - *.vercel.app is auto-allowed)
FRONTEND_URL=https://math-two-eta.vercel.app
```

## Which Option Should You Choose?

### Choose Option 1 (Master Branch) if:
- ✅ You want production-ready code
- ✅ You want to follow standard deployment practices
- ✅ The fix is ready and tested
- ✅ Multiple people work on the project

### Choose Option 2 (Feature Branch) if:
- ✅ You want to test the fix in production before merging
- ✅ You're working solo and want quick iterations
- ✅ You want to preview changes before merging to master

## Recommended Workflow

For this fix, I recommend **Option 1** (merge to master):

```bash
# 1. Checkout master
git checkout master

# 2. Merge your fix
git merge claude/fix-login-issue-011CUuMmAWwsziAgiUeXUnQ2

# 3. Push to master
git push origin master

# 4. Railway will auto-deploy from master (if configured)
```

## Verify Deployment

After Railway deploys, verify:

```bash
# Check health endpoint
curl https://your-backend.railway.app/health

# Test CORS headers
curl -X OPTIONS https://your-backend.railway.app/api/auth/login \
  -H "Origin: https://math-two-eta.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

You should see CORS headers in the response:
```
< access-control-allow-origin: https://math-two-eta.vercel.app
< access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
< access-control-allow-headers: Content-Type, Authorization
```

## Troubleshooting

### Railway not deploying?

1. **Check GitHub integration**:
   - Railway → Settings → Source
   - Verify GitHub repo is connected
   - Verify auto-deploy is enabled

2. **Trigger manual deploy**:
   - Railway → Deployments
   - Click "Deploy" → "Deploy Latest Commit"

3. **Check deployment logs**:
   ```bash
   railway logs --tail
   ```

### How to check which branch is deployed?

1. **Railway Dashboard**:
   - Go to Deployments tab
   - Look at "Source" column - shows branch + commit

2. **Railway CLI**:
   ```bash
   railway status
   ```

3. **Check via API**:
   ```bash
   # Add a /version endpoint to your backend (optional)
   curl https://your-backend.railway.app/version
   ```

## Summary

**Quick Setup (Recommended):**

1. ✅ Merge feature branch to `master`
2. ✅ Configure Railway to deploy from `master` branch
3. ✅ Set Railway environment variables
4. ✅ Wait for auto-deployment (~5 minutes)
5. ✅ Test Vercel app at https://math-two-eta.vercel.app/

Your Vercel app will connect to Railway backend → Login will work!
