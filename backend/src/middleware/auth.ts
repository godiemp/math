import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt';

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
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    console.log('🔐 Auth middleware - Authorization header:', authHeader ? 'present' : 'missing');
    console.log('🔐 Auth middleware - Headers:', JSON.stringify(req.headers, null, 2));

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ Auth failed: No token provided');
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const payload = verifyAccessToken(token);

    console.log('✅ Auth successful for user:', payload.userId, 'role:', payload.role);
    req.user = payload;
    next();
  } catch (error) {
    console.log('❌ Auth failed: Invalid or expired token', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Middleware to require admin role
 */
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }

  next();
};

/**
 * Optional authentication - doesn't block if no token
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      req.user = verifyAccessToken(token);
    }

    next();
  } catch (error) {
    // Ignore errors for optional auth
    next();
  }
};
