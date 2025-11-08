/**
 * ============================================================================
 * AUTHORIZE MIDDLEWARE
 * ============================================================================
 *
 * Role-based access control middleware
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to require admin role
 */
export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }

  next();
}

/**
 * Middleware to require specific role
 */
export function requireRole(role: 'student' | 'admin') {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (req.user.role !== role) {
      res.status(403).json({ error: `${role} access required` });
      return;
    }

    next();
  };
}
