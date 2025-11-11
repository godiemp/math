import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { testConnection, initializeDatabase, closeDatabase, pool } from './config/database';
import { initImageStorage } from './services/imageStorageService';
import authRoutes from './auth/routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import userManagementRoutes from './routes/userManagementRoutes';
import streakRoutes from './routes/streakRoutes';
import sessionRoutes from './routes/sessionRoutes';
import aiRoutes from './routes/aiRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import aiAnalyticsRoutes from './routes/aiAnalyticsRoutes';
import quizRoutes from './routes/quizRoutes';
import qgenRoutes from './routes/qgenRoutes';
import abstractProblemsRoutes from './routes/abstractProblemsRoutes';
import contextProblemsRoutes from './routes/contextProblemsRoutes';
import studyBuddyRoutes from './routes/studyBuddyRoutes';
import paymentRoutes from './routes/paymentRoutes';
import { serveImage } from './controllers/adminController';

// Load environment variables
dotenv.config();
// Force Railway redeploy - includes admin routes

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for Vercel production and preview deployments
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) {
      console.log('✅ CORS: Allowing request with no origin');
      return callback(null, true);
    }

    console.log(`🔍 CORS: Checking origin: ${origin}`);

    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL, // Your production Vercel URL
    ].filter(Boolean); // Remove undefined values

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      console.log(`✅ CORS: Allowed origin from list: ${origin}`);
      return callback(null, true);
    }

    // Allow all Vercel preview deployments (*.vercel.app)
    if (origin.endsWith('.vercel.app')) {
      console.log(`✅ CORS: Allowed Vercel deployment: ${origin}`);
      return callback(null, true);
    }

    // Log rejected origins but still allow them in development
    console.log(`⚠️ CORS: Origin not in allowed list: ${origin}`);
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 CORS: Allowing in development mode');
      return callback(null, true);
    }

    // Reject by returning false, not throwing an error
    callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow embedding for Vercel preview
}));

// General API rate limiting - 100 requests per 15 minutes per IP
// Disabled in test environment to allow multiple requests in e2e tests
const apiLimiter = process.env.NODE_ENV === 'test'
  ? (req: Request, res: Response, next: NextFunction) => next() // No rate limiting in test
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: {
        error: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.',
      },
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });

// Strict rate limiting for authentication endpoints - 20 attempts per 15 minutes per IP
// Disabled in test environment to allow multiple logins in e2e tests
const authLimiter = process.env.NODE_ENV === 'test'
  ? (req: Request, res: Response, next: NextFunction) => next() // No rate limiting in test
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 20, // Limit each IP to 20 requests per windowMs
      message: {
        error: 'Demasiados intentos de inicio de sesión. Por favor, intenta de nuevo en 15 minutos.',
      },
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: false, // Count successful requests
    });

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser()); // SECURITY: Parse cookies for HttpOnly JWT tokens
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply general rate limiting to all API routes
app.use('/api/', apiLimiter);

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`\n🔵 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log(`   Origin: ${req.get('origin') || 'none'}`);
  console.log(`   Full URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes with stricter rate limiting for auth
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', userManagementRoutes); // User & subscription management
app.use('/api/streak', streakRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai-analytics', aiAnalyticsRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/qgen', qgenRoutes);
app.use('/api/abstract-problems', abstractProblemsRoutes);
app.use('/api/context-problems', contextProblemsRoutes);
app.use('/api/study-buddy', studyBuddyRoutes);
app.use('/api/payments', paymentRoutes);

// Public image serving route
app.get('/api/images/:filename', serveImage);

console.log('✅ Admin routes registered at /api/admin');
console.log('✅ Auth routes registered at /api/auth');
console.log('✅ Streak routes registered at /api/streak');
console.log('✅ Session routes registered at /api/sessions');
console.log('✅ AI routes registered at /api/ai');
console.log('✅ Analytics routes registered at /api/analytics');
console.log('✅ AI Analytics routes registered at /api/ai-analytics');
console.log('✅ Quiz routes registered at /api/quiz');
console.log('✅ QGen routes registered at /api/qgen');
console.log('✅ Abstract Problems routes registered at /api/abstract-problems');
console.log('✅ Context Problems routes registered at /api/context-problems');
console.log('✅ Study Buddy routes registered at /api/study-buddy');
console.log('✅ Payment routes registered at /api/payments');

// 404 handler
app.use((req: Request, res: Response) => {
  console.log('\n⚠️  404 - Route not found');
  console.log(`   Method: ${req.method}`);
  console.log(`   URL: ${req.url}`);
  console.log(`   Path: ${req.path}`);
  console.log(`   Original URL: ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Auto-update session statuses
let statusUpdateInterval: NodeJS.Timeout | null = null;

async function autoUpdateSessionStatuses() {
  try {
    const now = Date.now();

    // Open lobbies
    await pool.query(
      `UPDATE sessions
       SET status = 'lobby'
       WHERE status = 'scheduled' AND lobby_open_time <= $1`,
      [now]
    );

    // Start sessions
    await pool.query(
      `UPDATE sessions
       SET status = 'active', started_at = $1
       WHERE status = 'lobby' AND scheduled_start_time <= $1`,
      [now]
    );

    // Complete sessions
    await pool.query(
      `UPDATE sessions
       SET status = 'completed', completed_at = $1
       WHERE status = 'active' AND scheduled_end_time <= $1`,
      [now]
    );

    console.log(`✅ Session statuses auto-updated at ${new Date().toISOString()}`);
  } catch (error) {
    console.error('❌ Error auto-updating session statuses:', error);
  }
}

function startSessionStatusUpdater() {
  // Run immediately on startup
  autoUpdateSessionStatuses();

  // Then run every 30 seconds
  statusUpdateInterval = setInterval(autoUpdateSessionStatuses, 30000);
  console.log('🔄 Session status auto-updater started (runs every 30 seconds)');
}

function stopSessionStatusUpdater() {
  if (statusUpdateInterval) {
    clearInterval(statusUpdateInterval);
    statusUpdateInterval = null;
    console.log('🛑 Session status auto-updater stopped');
  }
}

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Initialize database tables
    await initializeDatabase();

    // Initialize image storage directory
    initImageStorage();

    // Start session status auto-updater
    startSessionStatusUpdater();

    // Start listening
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 PAES Math Platform Backend Server                    ║
║                                                            ║
║   📍 Server running on: http://localhost:${PORT}           ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}                              ║
║   🗄️  Database: Connected                                  ║
║                                                            ║
║   📚 API Endpoints:                                        ║
║      POST /api/auth/register       - Register new user    ║
║      POST /api/auth/login          - Login user           ║
║      POST /api/auth/refresh        - Refresh token        ║
║      POST /api/auth/logout         - Logout user          ║
║      GET  /api/auth/me             - Get current user     ║
║      POST /api/admin/upload-pdf    - Upload PDF (Admin)   ║
║      POST /api/admin/save-questions - Save questions      ║
║      GET  /api/admin/questions     - Get questions        ║
║      GET  /api/admin/uploads       - Get upload history   ║
║      GET  /api/streak              - Get user streak data ║
║      POST /api/streak/update       - Update daily streak  ║
║      GET  /api/sessions            - Get all sessions     ║
║      POST /api/sessions            - Create session (Admin)║
║      GET  /api/sessions/:id        - Get session details  ║
║      POST /api/sessions/:id/register - Register for session║
║      POST /api/ai/summarize        - Summarize content    ║
║      POST /api/ai/practice         - Generate practice    ║
║      GET  /api/analytics/dashboard - Get analytics (Admin)║
║      GET  /api/analytics/trends    - Get trends (Admin)   ║
║      POST /api/quiz/attempt        - Save quiz attempt    ║
║      POST /api/quiz/attempts       - Save quiz attempts   ║
║      GET  /api/quiz/history        - Get quiz history     ║
║      GET  /api/quiz/stats          - Get quiz statistics  ║
║      GET  /health                  - Health check         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  stopSessionStatusUpdater();
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  stopSessionStatusUpdater();
  await closeDatabase();
  process.exit(0);
});

// Start the server
startServer();
