/**
 * ============================================================================
 * OPTIONAL AUTH MIDDLEWARE
 * ============================================================================
 *
 * Optional authentication - doesn't block if no token
 */

import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/tokenService';

/**
 * Optional authentication middleware
 * Attaches user to request if valid token is provided, but doesn't block otherwise
 */
export function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
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
}
