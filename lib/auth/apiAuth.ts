/**
 * ============================================================================
 * NEXT.JS API ROUTE AUTHENTICATION
 * ============================================================================
 *
 * Authentication utilities for Next.js API routes
 * Verifies JWT tokens and extracts user information
 */

import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
  username: string;
  email: string;
  role: 'student' | 'admin';
}

/**
 * Extract JWT token from Authorization header
 */
function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}

/**
 * Verify JWT token and return payload
 * @throws Error if token is invalid or expired
 */
export function verifyToken(token: string): TokenPayload {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return payload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    }
    throw new Error('Invalid token');
  }
}

/**
 * Authenticate request and return user payload
 * Returns null if authentication fails
 */
export function authenticateRequest(request: NextRequest): TokenPayload | null {
  try {
    const token = extractToken(request);
    if (!token) {
      return null;
    }
    return verifyToken(token);
  } catch (error) {
    console.error('Authentication failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

/**
 * Require authentication - throws error with message if not authenticated
 * Use this for routes that must have authentication
 */
export function requireAuth(request: NextRequest): TokenPayload {
  const user = authenticateRequest(request);
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}
