/**
 * ============================================================================
 * AUTHENTICATE MIDDLEWARE
 * ============================================================================
 *
 * JWT token verification middleware
 */

import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/tokenService';
import { TokenPayload } from '../types';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

/**
 * Middleware to verify JWT access token
 */
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log('\n====================================');
  console.log('🔐 AUTHENTICATE MIDDLEWARE CALLED');
  console.log(`   Method: ${req.method}`);
  console.log(`   URL: ${req.url}`);
  console.log(`   Path: ${req.path}`);
  console.log(`   Original URL: ${req.originalUrl}`);
  console.log('====================================\n');

  // Skip authentication for OPTIONS requests (CORS preflight)
  if (req.method === 'OPTIONS') {
    console.log('✅ Skipping auth for OPTIONS request (CORS preflight)');
    return next();
  }

  try {
    const authHeader = req.headers.authorization;

    console.log('🔐 Auth middleware - Authorization header:', authHeader ? 'present' : 'missing');
    console.log('🔐 Auth middleware - Full headers:', JSON.stringify(req.headers, null, 2));

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ Auth failed: No token provided');
      console.log('   Sending 401 response...');
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    console.log('🔑 Token extracted, length:', token.length);

    const payload = verifyAccessToken(token);

    console.log('✅ Auth successful for user:', payload.userId, 'role:', payload.role);
    req.user = payload;
    next();
  } catch (error) {
    console.log('❌ Auth failed: Invalid or expired token', error);
    console.log('   Sending 401 response...');
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
