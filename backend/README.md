# PAES Math Platform - Backend API

Express.js backend with PostgreSQL for the PAES Math Learning Platform.

## Features

- ✅ JWT Authentication (Access + Refresh tokens)
- ✅ User Registration & Login
- ✅ PostgreSQL database with connection pooling
- ✅ TypeScript for type safety
- ✅ CORS configured for frontend
- ✅ Railway deployment ready

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Auth**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Database Client**: node-postgres (pg)

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/refresh` | Refresh access token | No |
| POST | `/api/auth/logout` | Logout (revoke token) | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

## Local Development

### Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Database created: `paes_math`

### Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your local database:
```env
DATABASE_URL=postgresql://localhost:5432/paes_math
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
```

4. Run development server:
```bash
npm run dev
```

Server will start at `http://localhost:3001`

## Deployment to Railway

### One-time Setup

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Initialize project:
```bash
railway init
```

4. Add PostgreSQL:
```bash
railway add --plugin postgresql
```

5. Set environment variables in Railway:
```bash
railway variables set JWT_SECRET=your-production-secret
railway variables set JWT_REFRESH_SECRET=your-production-refresh-secret
railway variables set FRONTEND_URL=https://your-frontend.vercel.app
```

### Deploy

```bash
railway up
```

### View Logs

```bash
railway logs
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | Secret for access tokens | - |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | - |
| `JWT_EXPIRES_IN` | Access token expiry | 1h |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts       # PostgreSQL connection
│   │   └── schema.sql        # Database schema
│   ├── controllers/
│   │   └── authController.ts # Auth logic
│   ├── middleware/
│   │   └── auth.ts           # JWT verification
│   ├── routes/
│   │   └── authRoutes.ts     # Auth endpoints
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   ├── utils/
│   │   └── jwt.ts            # JWT utilities
│   └── index.ts              # Express app
├── .env                      # Environment variables
├── .env.example             # Example env file
├── tsconfig.json            # TypeScript config
├── railway.json             # Railway config
└── package.json             # Dependencies
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'student',
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);
```

### Refresh Tokens Table

```sql
CREATE TABLE refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) REFERENCES users(id),
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at BIGINT NOT NULL,
  created_at BIGINT NOT NULL,
  revoked BOOLEAN DEFAULT FALSE
);
```

## Testing with cURL

### Register User

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

### Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "password123"
  }'
```

### Get Current User

```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## License

MIT
