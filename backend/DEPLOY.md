# 🚀 Deploy Backend to Railway - Step-by-Step Guide

Follow these steps on your **local machine** to deploy your backend to Railway.

## Prerequisites

- Node.js 18+ installed
- Git installed
- Railway account (free): https://railway.app/

---

## Step 1: Install Railway CLI

Open your terminal and run:

```bash
npm install -g @railway/cli
```

Verify installation:
```bash
railway --version
```

---

## Step 2: Clone Your Repository (if needed)

```bash
git clone https://github.com/godiemp/math.git
cd math
git checkout claude/add-backend-011CUtYhZvXKbYUkXPWRrCUG
```

---

## Step 3: Navigate to Backend Directory

```bash
cd backend
```

---

## Step 4: Login to Railway

```bash
railway login
```

This will open your browser. Sign in with:
- GitHub
- Google
- Or email

---

## Step 5: Initialize Railway Project

```bash
railway init
```

You'll be asked:
1. **Project name**: Enter `paes-math-backend` (or your preferred name)
2. **Select account**: Choose your personal account or team

✅ This creates a new Railway project

---

## Step 6: Add PostgreSQL Database

```bash
railway add -p postgresql
```

Or if that doesn't work:
```bash
railway add
# Then select "PostgreSQL" from the list
```

✅ This provisions a PostgreSQL database and automatically sets `DATABASE_URL`

---

## Step 7: Set Environment Variables

Generate secure secrets and set them:

```bash
# Generate JWT secrets (on macOS/Linux)
railway variables set JWT_SECRET="$(openssl rand -base64 32)"
railway variables set JWT_REFRESH_SECRET="$(openssl rand -base64 32)"

# Or set manually with random strings
railway variables set JWT_SECRET="your-super-secret-key-min-32-chars"
railway variables set JWT_REFRESH_SECRET="your-refresh-secret-key-min-32-chars"

# Set other variables
railway variables set NODE_ENV="production"
railway variables set FRONTEND_URL="http://localhost:3000"
railway variables set PORT="3001"
```

**Note**: You'll update `FRONTEND_URL` later when you deploy your Next.js frontend to Vercel.

Verify variables:
```bash
railway variables
```

---

## Step 8: Deploy! 🚀

```bash
railway up
```

This will:
1. Upload your code to Railway
2. Install dependencies
3. Build TypeScript (`npm run build`)
4. Start the server (`npm start`)

**Wait for deployment** (~2-3 minutes)

---

## Step 9: Get Your Deployment URL

```bash
railway domain
```

If no domain exists, create one:
```bash
railway domain --generate
```

You'll get a URL like:
```
https://paes-math-backend-production.up.railway.app
```

**Save this URL!** You'll need it for your frontend.

---

## Step 10: View Logs (Check if Everything Works)

```bash
railway logs
```

You should see:
```
✅ Database connected successfully at: [timestamp]
✅ Database tables initialized successfully

╔════════════════════════════════════════════════════════════╗
║   🚀 PAES Math Platform Backend Server                    ║
║   📍 Server running on: http://localhost:3001             ║
║   🌍 Environment: production                              ║
║   🗄️  Database: Connected                                 ║
╚════════════════════════════════════════════════════════════╝
```

---

## Step 11: Test Your Deployed Backend

### Test Health Check

```bash
curl https://YOUR-RAILWAY-URL.railway.app/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-07T...",
  "uptime": 123.456
}
```

### Test User Registration

```bash
curl -X POST https://YOUR-RAILWAY-URL.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "displayName": "Test User"
  }'
```

Expected response:
```json
{
  "user": {
    "id": "user-1730987654321-abc123",
    "username": "testuser",
    "email": "test@example.com",
    "displayName": "Test User",
    "role": "student",
    "createdAt": 1730987654321,
    "updatedAt": 1730987654321
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Test Login

```bash
curl -X POST https://YOUR-RAILWAY-URL.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "password123"
  }'
```

### Test Protected Endpoint

```bash
# Use the accessToken from register/login response
curl -X GET https://YOUR-RAILWAY-URL.railway.app/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

## ✅ Deployment Complete!

Your backend is now live at: `https://YOUR-RAILWAY-URL.railway.app`

---

## 🔧 Useful Railway Commands

### View Project Status
```bash
railway status
```

### Open Project Dashboard (in browser)
```bash
railway open
```

### View Environment Variables
```bash
railway variables
```

### Update Environment Variable
```bash
railway variables set VARIABLE_NAME="value"
```

### Redeploy (after code changes)
```bash
git add .
git commit -m "Update backend"
git push origin claude/add-backend-011CUtYhZvXKbYUkXPWRrCUG

# Then redeploy
cd backend
railway up
```

### View Database Connection String
```bash
railway variables | grep DATABASE_URL
```

### Connect to Database (with psql)
```bash
railway run psql $DATABASE_URL
```

### Restart Service
```bash
railway restart
```

### View Metrics
```bash
railway open
# Go to "Metrics" tab in the dashboard
```

---

## 🐛 Troubleshooting

### Issue: "Railway not found"
**Solution**: Make sure you're in the `backend/` directory where you ran `railway init`

### Issue: "DATABASE_URL not set"
**Solution**:
```bash
railway add -p postgresql
railway restart
```

### Issue: "Module not found" errors
**Solution**: Railway should auto-install dependencies. Check logs:
```bash
railway logs
```

### Issue: Port errors
**Solution**: Railway automatically sets the `PORT` environment variable. Your code uses `process.env.PORT || 3001`, which works correctly.

### Issue: CORS errors from frontend
**Solution**: Update `FRONTEND_URL` to your Vercel URL:
```bash
railway variables set FRONTEND_URL="https://your-app.vercel.app"
railway restart
```

---

## 🎯 Next Steps

1. **Update Frontend**: Point your Next.js app to use the Railway backend URL
2. **Set CORS**: Update `FRONTEND_URL` in Railway when you deploy frontend to Vercel
3. **Create Admin User**: Register your first admin user via API
4. **Add More Endpoints**: Build question management, live sessions, etc.

---

## 💰 Railway Pricing

- **Free Tier**: $5 credit per month (enough for development)
- **Hobby Plan**: $5/month (starter plan for small projects)
- **Pro Plan**: Usage-based pricing

Your backend will likely cost **$5-10/month** including database.

---

## 📚 Resources

- Railway Docs: https://docs.railway.app/
- Railway CLI Docs: https://docs.railway.app/develop/cli
- Railway Dashboard: https://railway.app/dashboard
- Support: https://help.railway.app/

---

## 🎉 Success Checklist

- [ ] Railway CLI installed
- [ ] Logged into Railway
- [ ] Project initialized
- [ ] PostgreSQL database added
- [ ] Environment variables set
- [ ] Backend deployed
- [ ] Domain generated
- [ ] Health check passes
- [ ] Registration endpoint works
- [ ] Login endpoint works
- [ ] Protected endpoint works (with JWT)

---

**Need Help?** Check Railway logs first:
```bash
railway logs --tail
```
