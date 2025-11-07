# Testing CORS Configuration on Railway

## Quick Test Commands

Replace `YOUR_RAILWAY_URL` with your actual Railway backend URL.

### Test 1: Health Check (Should Always Work)
```bash
curl https://YOUR_RAILWAY_URL/health
```

Expected response:
```json
{"status":"ok","timestamp":"...","uptime":...}
```

### Test 2: Test CORS Preflight (OPTIONS Request)
This simulates what the browser does before POST:

```bash
curl -X OPTIONS https://YOUR_RAILWAY_URL/api/auth/login \
  -H "Origin: https://math-two-eta.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

**What to look for:**
You should see these headers in the response:
```
< HTTP/2 204
< access-control-allow-origin: https://math-two-eta.vercel.app
< access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
< access-control-allow-headers: Content-Type, Authorization
< access-control-allow-credentials: true
< access-control-max-age: 86400
```

**If you DON'T see these headers**, the CORS fix hasn't deployed yet.

**If you DO see these headers but still get 405**, there's a different issue.

### Test 3: Test Actual POST Request
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/auth/login \
  -H "Origin: https://math-two-eta.vercel.app" \
  -H "Content-Type: application/json" \
  -d '{"usernameOrEmail":"test","password":"test"}' \
  -v
```

Expected: Should NOT return 405. Should return either:
- 200 with tokens (if user exists)
- 401 "Invalid credentials" (if user doesn't exist)
- But NOT 405

## Common Issues

### Issue 1: Old Code Still Deployed
**Symptom**: No CORS headers in OPTIONS response

**Solution**:
1. Check Railway Deployments tab
2. Verify latest commit has CORS fix (commit e73b749 or later)
3. If not, trigger manual redeploy

### Issue 2: Vercel App Using Wrong URL
**Symptom**: CORS works, but still errors

**Solution**:
1. Verify Vercel environment variable: `NEXT_PUBLIC_API_URL`
2. Should be set to Railway URL (not localhost:3001)
3. Redeploy Vercel after changing env var

### Issue 3: Browser Cache
**Symptom**: Old errors still showing

**Solution**:
1. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. Or open in incognito/private mode
3. Clear browser cache

### Issue 4: Railway Port Mismatch
**Symptom**: App runs but requests fail

**Check**: Railway should auto-set PORT env variable
- Your app uses: `process.env.PORT || 3001`
- Railway sets PORT to 8080 (or whatever they assign)
- This should work automatically

## What Information I Need

Please provide:

1. **Railway Backend URL**: `https://???.railway.app`
2. **Railway Deployment Info**:
   - Go to Railway → Deployments tab
   - What's the latest commit hash shown?
   - When was it deployed?

3. **Run this test** (replace YOUR_RAILWAY_URL):
```bash
curl -X OPTIONS https://YOUR_RAILWAY_URL/api/auth/login \
  -H "Origin: https://math-two-eta.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v 2>&1 | grep -i "access-control"
```

This will show ONLY the CORS headers, making it easy to verify.

## Expected Timeline

After configuring Railway to deploy from your branch:
- Railway detects push: ~30 seconds
- Build time: ~2-5 minutes
- Deploy time: ~1-2 minutes
- **Total**: ~3-8 minutes

If it's been longer than 10 minutes, check Railway logs for errors.
