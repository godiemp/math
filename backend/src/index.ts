// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

// IMPORTANT: Import Sentry instrumentation at the top of your file
import './instrument';

// All other imports below
import * as Sentry from '@sentry/node';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { testConnection, initializeDatabase, closeDatabase, pool } from './config/database';
import { initImageStorage } from './services/imageStorageService';
import healthRoutes from './routes/healthRoutes';
import authRoutes from './auth/routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import userManagementRoutes from './routes/userManagementRoutes';
import userProfileRoutes from './routes/userProfileRoutes';
import streakRoutes from './routes/streakRoutes';
import sessionRoutes from './routes/sessionRoutes';
import aiRoutes from './routes/aiRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import aiAnalyticsRoutes from './routes/aiAnalyticsRoutes';
import quizRoutes from './routes/quizRoutes';
import qgenRoutes from './routes/qgenRoutes';
import abstractProblemsRoutes from './routes/abstractProblemsRoutes';
import contextProblemsRoutes from './routes/contextProblemsRoutes';
import thematicUnitsRoutes from './routes/thematicUnitsRoutes';
import studyBuddyRoutes from './routes/studyBuddyRoutes';
import learnRoutes from './routes/learnRoutes';
import paymentRoutes from './routes/paymentRoutes';
import predictionRoutes from './routes/predictionRoutes';
import operationsPracticeRoutes from './routes/operationsPracticeRoutes';
import certificateRoutes from './routes/certificateRoutes';
import { serveImage } from './controllers/adminController';

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy - required for Railway and other proxies to correctly identify client IP
// This allows Express to trust X-Forwarded-For headers from the proxy
app.set('trust proxy', true);

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
      // Safeguard: Ensure development mode is never accidentally used in production
      if (process.env.RAILWAY_ENVIRONMENT || process.env.VERCEL_ENV === 'production') {
        console.error('❌ FATAL: Development mode detected in production environment!');
        console.error('   NODE_ENV=development should never be used in production.');
        process.exit(1);
      }
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

// Strict rate limiting for payment operations - 10 attempts per 15 minutes per IP
// Prevents abuse of payment preference creation and payment enumeration attacks
const paymentLimiter = process.env.NODE_ENV === 'test'
  ? (req: Request, res: Response, next: NextFunction) => next() // No rate limiting in test
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10, // Limit each IP to 10 payment operations per windowMs
      message: {
        error: 'Demasiadas solicitudes de pago. Por favor, intenta de nuevo más tarde.',
      },
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: false,
    });

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser()); // SECURITY: Parse cookies for HttpOnly JWT tokens
// Add request body size limits to prevent DoS attacks
app.use(express.json({ limit: '10mb' })); // Max 10MB for JSON (mainly for PDF uploads)
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Note on CSRF Protection:
// This API now uses JWT tokens in HttpOnly cookies (migrated from Authorization headers).
// HttpOnly cookies provide better XSS protection but require CSRF protection:
//
// CSRF protections currently in place:
// - Strict CORS origin validation with credentials:true
// - SameSite=Strict cookie attribute (should be set in auth service)
// - Rate limiting on all state-changing operations
// - Request body size limits
//
// Additional CSRF protection (SameSite cookies) should be implemented in the auth service
// to ensure cookies are only sent in same-site requests.

// Apply general rate limiting to all API routes
app.use('/api/', apiLimiter);

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`\n🔵 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log(`   Origin: ${req.get('origin') || 'none'}`);
  console.log(`   Full URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
});

// Health check routes (no rate limiting for monitoring)
app.use('/', healthRoutes);

// API routes with stricter rate limiting for auth and payments
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/payments', paymentLimiter, paymentRoutes); // Apply payment rate limiter
app.use('/api/admin', adminRoutes);
app.use('/api/admin', userManagementRoutes); // User & subscription management
app.use('/api/user', userProfileRoutes); // User profile management
app.use('/api/streak', streakRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai-analytics', aiAnalyticsRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/qgen', qgenRoutes);
app.use('/api/abstract-problems', abstractProblemsRoutes);
app.use('/api/context-problems', contextProblemsRoutes);
app.use('/api/thematic-units', thematicUnitsRoutes);
app.use('/api/study-buddy', studyBuddyRoutes);
app.use('/api/learn', learnRoutes);
app.use('/api/prediction', predictionRoutes);
app.use('/api/operations-practice', operationsPracticeRoutes);
app.use('/api/certificates', certificateRoutes);

// Public image serving route
app.get('/api/images/:filename', serveImage);

console.log('✅ Health routes registered at /health');
console.log('✅ Admin routes registered at /api/admin');
console.log('✅ Auth routes registered at /api/auth');
console.log('✅ User Profile routes registered at /api/user');
console.log('✅ Streak routes registered at /api/streak');
console.log('✅ Session routes registered at /api/sessions');
console.log('✅ AI routes registered at /api/ai');
console.log('✅ Analytics routes registered at /api/analytics');
console.log('✅ AI Analytics routes registered at /api/ai-analytics');
console.log('✅ Quiz routes registered at /api/quiz');
console.log('✅ QGen routes registered at /api/qgen');
console.log('✅ Abstract Problems routes registered at /api/abstract-problems');
console.log('✅ Context Problems routes registered at /api/context-problems');
console.log('✅ Thematic Units routes registered at /api/thematic-units');
console.log('✅ Study Buddy routes registered at /api/study-buddy');
console.log('✅ Learn routes registered at /api/learn');
console.log('✅ Payment routes registered at /api/payments');
console.log('✅ Prediction routes registered at /api/prediction');
console.log('✅ Operations Practice routes registered at /api/operations-practice');
console.log('✅ Certificate routes registered at /api/certificates');

// 404 handler
app.use((req: Request, res: Response) => {
  console.log('\n⚠️  404 - Route not found');
  console.log(`   Method: ${req.method}`);
  console.log(`   URL: ${req.url}`);
  console.log(`   Path: ${req.path}`);
  console.log(`   Original URL: ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

// The Sentry error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // The error id is attached to `res.sentry` to be returned and optionally displayed to the user for support.
  const errorId = (res as any).sentry;
  console.error('Error:', err);
  console.error('Sentry Error ID:', errorId);

  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    errorId: errorId, // Include Sentry error ID for tracking
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

// Auto-seed admin data
const autoSeedAdminData = async () => {
  try {
    // Skip only if explicitly disabled
    if (process.env.DISABLE_AUTO_SEED === 'true') {
      console.log('⏭️  Auto-seed disabled via DISABLE_AUTO_SEED environment variable');
      return;
    }

    console.log('🌱 Auto-seeding admin data...');

    // Import and run seed functions dynamically
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    try {
      await execAsync('npx tsx src/scripts/seed-admin.ts', {
        cwd: __dirname + '/..',
        timeout: 30000 // 30 second timeout
      });
      console.log('✅ Admin data seeded successfully');
    } catch (error: any) {
      // Don't fail if seeding fails (might already be seeded)
      if (error.stdout?.includes('✅')) {
        console.log('✅ Admin data already seeded');
      } else {
        console.warn('⚠️  Auto-seed warning:', error.message);
      }
    }
  } catch (error) {
    console.warn('⚠️  Auto-seed failed (non-critical):', error);
  }
};

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Initialize database tables
    await initializeDatabase();

    // Auto-seed admin data
    await autoSeedAdminData();

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
║      GET  /health/ready            - Readiness check      ║
║      GET  /health/metrics          - Service metrics      ║
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
