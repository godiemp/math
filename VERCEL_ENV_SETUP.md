# 🔧 Fix 405 Error - Vercel Environment Setup

## Problem
The frontend is making API calls to `https://math-two-eta.vercel.app/api/auth/login` instead of the Railway backend, resulting in a **405 Method Not Allowed** error.

## Root Cause
The `NEXT_PUBLIC_API_URL` environment variable is not configured in Vercel, so the app tries to call its own (non-existent) API routes.

## Solution

### Step 1: Get Your Railway Backend URL

1. Open terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Get your Railway deployment URL:
   ```bash
   railway domain
   ```

   You should see something like:
   ```
   https://paes-math-backend-production.up.railway.app
   ```

   **Don't have Railway CLI?** Check your [Railway Dashboard](https://railway.app/dashboard):
   - Open your project
   - Click on your backend service
   - Copy the domain from the "Settings" tab

### Step 2: Set Environment Variable in Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project `math-two-eta` (or your project name)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add the following:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://YOUR-RAILWAY-URL.railway.app` (use your actual Railway URL)
   - **Environment**: Select **Production**, **Preview**, and **Development**
6. Click **Save**

#### Option B: Vercel CLI

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Set the environment variable
vercel env add NEXT_PUBLIC_API_URL production
# When prompted, enter your Railway URL: https://YOUR-RAILWAY-URL.railway.app

# Also set for preview and development
vercel env add NEXT_PUBLIC_API_URL preview
vercel env add NEXT_PUBLIC_API_URL development
```

### Step 3: Redeploy

After setting the environment variable, you need to trigger a new deployment:

#### Option A: Via Vercel Dashboard
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** button

#### Option B: Via Git Push
```bash
# Make a small change to trigger redeployment
git commit --allow-empty -m "Trigger redeployment with NEXT_PUBLIC_API_URL"
git push origin main
```

#### Option C: Via Vercel CLI
```bash
vercel --prod
```

### Step 4: Verify the Fix

1. Wait for the deployment to complete (2-3 minutes)
2. Open your app: `https://math-two-eta.vercel.app`
3. Try to login
4. Check browser console - the POST request should now go to:
   ```
   https://YOUR-RAILWAY-URL.railway.app/api/auth/login
   ```
   Instead of:
   ```
   https://math-two-eta.vercel.app/api/auth/login  ❌ (405 error)
   ```

## Quick Test

You can test if your Railway backend is working:

```bash
# Replace with your actual Railway URL
curl https://YOUR-RAILWAY-URL.railway.app/health

# Expected response:
# {"status":"ok","timestamp":"...","uptime":...}
```

## Important Notes

⚠️ **Environment Variable Naming**: Must be `NEXT_PUBLIC_API_URL` (not `API_URL` or `NEXT_PUBLIC_API_BASE_URL`)
   - Next.js only exposes env vars to the browser if they start with `NEXT_PUBLIC_`

⚠️ **Rebuild Required**: Changing environment variables requires a new build/deployment

⚠️ **No Trailing Slash**: Don't add a trailing slash to the URL
   - ✅ `https://paes-math-backend-production.up.railway.app`
   - ❌ `https://paes-math-backend-production.up.railway.app/`

## Troubleshooting

### Still getting 405 error?

1. **Check if the env var is actually set:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Confirm `NEXT_PUBLIC_API_URL` is listed

2. **Check if the deployment used the new env var:**
   - Go to your latest deployment in Vercel
   - Check the deployment logs for the env var

3. **Hard refresh your browser:**
   - Press `Ctrl + Shift + R` (Windows/Linux)
   - Press `Cmd + Shift + R` (Mac)

4. **Check Railway backend is running:**
   ```bash
   curl https://YOUR-RAILWAY-URL.railway.app/health
   ```

### Getting CORS errors instead?

If you now get CORS errors, that's actually progress! It means the request is reaching the backend. The CORS configuration should already be set up, but if needed:

1. Check Railway environment variables include:
   - `FRONTEND_URL=https://math-two-eta.vercel.app`

2. Vercel preview deployments are automatically allowed

## Reference

- Frontend Code: `lib/api-client.ts:5`
- Backend CORS Config: `backend/src/index.ts`
- Environment Example: `.env.local.example`
