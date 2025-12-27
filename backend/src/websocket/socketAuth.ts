/**
 * ============================================================================
 * SOCKET AUTHENTICATION MIDDLEWARE
 * ============================================================================
 *
 * JWT authentication middleware for Socket.io connections
 */

import { Socket } from 'socket.io';
import { verifyAccessToken } from '../auth/services/tokenService';
import { TokenPayload } from '../auth/types';

export interface AuthenticatedSocket extends Socket {
  user: TokenPayload;
}

/**
 * Socket.io authentication middleware
 * Verifies JWT token from handshake auth or query params
 */
export function socketAuthMiddleware(
  socket: Socket,
  next: (err?: Error) => void
): void {
  try {
    // Get token from auth object (preferred) or query params (fallback)
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.query?.token;

    if (!token || typeof token !== 'string') {
      console.log('❌ Socket auth failed: No token provided');
      return next(new Error('Authentication required'));
    }

    // Verify the token
    const payload = verifyAccessToken(token);

    // Attach user data to socket for later use
    (socket as AuthenticatedSocket).user = payload;

    console.log(`✅ Socket authenticated: ${payload.username} (${payload.role})`);
    next();
  } catch (error) {
    console.error('❌ Socket auth error:', error);
    next(new Error('Invalid or expired token'));
  }
}
