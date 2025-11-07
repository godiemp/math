# ⚡ Railway Deployment - Quick Reference

Copy and paste these commands in your terminal:

## 🚀 One-Time Setup

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Navigate to backend
cd backend

# 3. Login to Railway (opens browser)
railway login

# 4. Initialize project
railway init
# Name: paes-math-backend

# 5. Add PostgreSQL
railway add -p postgresql

# 6. Set environment variables (use Railway Dashboard)
railway open
# In the dashboard:
# 1. Click on your service (backend)
# 2. Go to "Variables" tab
# 3. Click "Add Variable" and add these:
#    - JWT_SECRET: (generate with: openssl rand -base64 32)
#    - JWT_REFRESH_SECRET: (generate with: openssl rand -base64 32)
#    - NODE_ENV: production
#    - FRONTEND_URL: http://localhost:3000
# Or see "Alternative Method" below

# 7. Deploy
railway up

# 8. Generate domain
railway domain --generate

# 9. View logs
railway logs
```

---

## 🧪 Test Deployment

```bash
# Replace YOUR_URL with your Railway domain
export API_URL="https://YOUR_URL.railway.app"

# Health check
curl $API_URL/health

# Register user
curl -X POST $API_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123",
    "displayName": "Admin User"
  }'

# Login
curl -X POST $API_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "admin",
    "password": "admin123"
  }'
```

---

## 🔧 Alternative: Set Variables via Command Line

If you prefer command line, generate secrets first then add via dashboard:

```bash
# Generate JWT secrets
echo "JWT_SECRET=$(openssl rand -base64 32)"
echo "JWT_REFRESH_SECRET=$(openssl rand -base64 32)"

# Copy the output and paste into Railway dashboard
railway open
```

Or use Railway's service variable format:
```bash
# Link your service first
railway link

# Then use environment-specific commands (check Railway CLI docs)
railway variables
```

---

## 🔄 Redeploy After Changes

```bash
# Make changes, then:
git add .
git commit -m "Update backend"
git push

# Redeploy
cd backend
railway up
```

---

## 📊 Useful Commands

```bash
railway logs              # View logs
railway logs --tail       # Stream logs
railway status            # Check status
railway open              # Open dashboard
railway variables         # List env vars
railway restart           # Restart service
railway domain            # Show domain
```

---

## 🔗 Your URLs

After deployment, save these:

- **Backend API**: https://[YOUR-SUBDOMAIN].railway.app
- **Health Check**: https://[YOUR-SUBDOMAIN].railway.app/health
- **Auth API**: https://[YOUR-SUBDOMAIN].railway.app/api/auth
- **Railway Dashboard**: https://railway.app/project/[YOUR-PROJECT-ID]

---

## ⚠️ Important Notes

1. **JWT Secrets**: NEVER commit these to git (they're in `.env` which is gitignored)
2. **Frontend URL**: Update this when you deploy to Vercel:
   ```bash
   railway open
   # Variables tab → Edit FRONTEND_URL → https://your-app.vercel.app
   ```
3. **Database**: Railway automatically provides `DATABASE_URL`
4. **Port**: Railway automatically sets `PORT` (don't hardcode it)

---

## 💡 Tips

- Use `railway logs --tail` to watch logs in real-time
- Railway dashboard shows CPU/Memory usage
- Free tier: $5 credit per month (renews monthly)
- Database backups: Available in Railway dashboard

---

## 🆘 Quick Fixes

**Deployment failed?**
```bash
railway logs
# Check for errors, fix them, then:
railway up
```

**Need to reset database?**
```bash
railway open
# Go to PostgreSQL service → Delete → Add new one
```

**Can't connect to database?**
```bash
railway variables | grep DATABASE_URL
# Make sure it's set
```

---

**🎯 You should be deployed in < 10 minutes!**
