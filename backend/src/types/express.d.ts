/**
 * Express type extensions
 * Extends Express Request type to include authenticated user information
 */

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: 'user' | 'admin';
        username?: string;
        displayName?: string;
      };
    }
  }
}

// This file needs to be a module to augment the global namespace
export {};
