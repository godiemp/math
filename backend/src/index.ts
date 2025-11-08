import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection, initializeDatabase, closeDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import streakRoutes from './routes/streakRoutes';
import sessionRoutes from './routes/sessionRoutes';

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
      return callback(null, true);
    }

    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL, // Your production Vercel URL
    ].filter(Boolean); // Remove undefined values

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow all Vercel preview deployments (*.vercel.app)
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    // Reject other origins
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/streak', streakRoutes);
app.use('/api/sessions', sessionRoutes);

console.log('✅ Admin routes registered at /api/admin');
console.log('✅ Auth routes registered at /api/auth');
console.log('✅ Streak routes registered at /api/streak');
console.log('✅ Session routes registered at /api/sessions');

// 404 handler
app.use((req: Request, res: Response) => {
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

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Initialize database tables
    await initializeDatabase();

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
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
});

// Start the server
startServer();
