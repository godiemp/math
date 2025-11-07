# Local Development Setup Guide

This guide will help you set up the PAES Math Platform for local development.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- npm or yarn package manager

## Quick Setup (5 minutes)

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Setup PostgreSQL Database

Start PostgreSQL service (if not already running):
```bash
service postgresql start
```

Create the database:
```bash
su - postgres -c "psql -c 'CREATE DATABASE paes_math;'"
```

Run the database schema:
```bash
su - postgres -c "psql -d paes_math -f /path/to/backend/src/config/schema.sql"
```

### 3. Configure Environment Variables

**Backend Configuration:**

Create `backend/.env` file:
```bash
cp backend/.env.example backend/.env
```

Update `backend/.env`:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://postgres@localhost:5432/paes_math

# JWT Configuration
JWT_SECRET=dev-jwt-secret-key-change-in-production
JWT_REFRESH_SECRET=dev-jwt-refresh-secret-key-change-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

**Frontend Configuration:**

Create `.env.local` file in the root directory:
```bash
cp .env.local.example .env.local
```

The default content should be:
```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Start Development Servers

You'll need TWO terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
✅ Database connected successfully
✅ Database tables initialized successfully
🚀 PAES Math Platform Backend Server
📍 Server running on: http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

You should see:
```
▲ Next.js 15.0.0
- Local:        http://localhost:3000
```

### 5. Verify Setup

Open your browser and navigate to:
- Frontend: http://localhost:3000
- Backend Health Check: http://localhost:3001/health

## Common Issues & Solutions

### Issue: "ERR_CONNECTION_REFUSED" when trying to login

**Cause:** Backend server is not running

**Solution:** Make sure the backend server is running on port 3001
```bash
cd backend
npm run dev
```

### Issue: Database connection failed

**Cause:** PostgreSQL is not running or database doesn't exist

**Solution:**
1. Start PostgreSQL: `service postgresql start`
2. Create database: `su - postgres -c "psql -c 'CREATE DATABASE paes_math;'"`
3. Run schema: `su - postgres -c "psql -d paes_math -f backend/src/config/schema.sql"`

### Issue: Permission denied accessing PostgreSQL

**Solution:** Update `pg_hba.conf` to allow trust authentication for localhost:

Edit `/etc/postgresql/16/main/pg_hba.conf` and change:
```
host    all             all             127.0.0.1/32            scram-sha-256
```
to:
```
host    all             all             127.0.0.1/32            trust
```

Then restart PostgreSQL:
```bash
service postgresql restart
```

### Issue: Frontend can't connect to backend API

**Cause:** Missing or incorrect `.env.local` configuration

**Solution:** Ensure `.env.local` exists in the root directory with:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Testing the Setup

### Test Backend API

Register a test user:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "displayName": "Test User"
  }'
```

Login:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "password123"
  }'
```

### Test Frontend

1. Open http://localhost:3000
2. Click "Register" and create an account
3. Login with your credentials
4. You should be redirected to the dashboard

## Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  Next.js        │  HTTP   │  Express.js     │   SQL   │  PostgreSQL     │
│  Frontend       ├────────>│  Backend        ├────────>│  Database       │
│  (port 3000)    │         │  (port 3001)    │         │  (port 5432)    │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

## Next Steps

- See [README.md](./README.md) for feature documentation
- See [backend/README.md](./backend/README.md) for API documentation
- See [CODEBASE_OVERVIEW.md](./CODEBASE_OVERVIEW.md) for architecture details

## Production Deployment

For production deployment to Railway and Vercel, see:
- [backend/DEPLOY.md](./backend/DEPLOY.md)
- [backend/QUICK_START.md](./backend/QUICK_START.md)
