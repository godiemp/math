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
  console.log('\n====================================');
  console.log('🛡️  REQUIRE ADMIN MIDDLEWARE CALLED');
  console.log(`   Method: ${req.method}`);
  console.log(`   URL: ${req.url}`);
  console.log(`   User attached: ${req.user ? 'Yes' : 'No'}`);
  if (req.user) {
    console.log(`   User ID: ${req.user.userId}`);
    console.log(`   User Role: ${req.user.role}`);
  }
  console.log('====================================\n');

  // Skip for OPTIONS requests (CORS preflight)
  if (req.method === 'OPTIONS') {
    console.log('✅ Skipping admin check for OPTIONS request (CORS preflight)');
    return next();
  }

  if (!req.user) {
    console.log('❌ Admin check failed: No user attached');
    console.log('   Sending 401 response...');
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  if (req.user.role !== 'admin') {
    console.log('❌ Admin check failed: User is not admin, role:', req.user.role);
    console.log('   Sending 403 response...');
    res.status(403).json({ error: 'Admin access required' });
    return;
  }

  console.log('✅ Admin check passed');
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
