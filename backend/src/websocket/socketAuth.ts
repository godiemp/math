/**
 * ============================================================================
 * SOCKET AUTHENTICATION MIDDLEWARE
 * ============================================================================
 *
 * JWT authentication middleware for Socket.io connections
 * Supports tokens from:
 * 1. Handshake auth object (socket.io-client auth option)
 * 2. Query params (fallback)
 * 3. HttpOnly cookies (for cookie-based auth)
 */

import { Socket } from 'socket.io';
import { verifyAccessToken } from '../auth/services/tokenService';
import { TokenPayload } from '../auth/types';

export interface AuthenticatedSocket extends Socket {
  user: TokenPayload;
}

/**
 * Parse cookies from handshake headers
 */
function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split(';').reduce(
    (cookies, cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
      return cookies;
    },
    {} as Record<string, string>
  );
}

/**
 * Socket.io authentication middleware
 * Verifies JWT token from handshake auth, query params, or cookies
 */
export function socketAuthMiddleware(
  socket: Socket,
  next: (err?: Error) => void
): void {
  try {
    // Get token from multiple sources (priority order):
    // 1. Handshake auth object (explicit auth)
    // 2. Query params (URL-based auth)
    // 3. Cookies (HttpOnly cookie auth - same as REST API)
    let token =
      socket.handshake.auth?.token ||
      socket.handshake.query?.token;

    // Try cookies if no token in auth/query
    if (!token || typeof token !== 'string') {
      const cookies = parseCookies(socket.handshake.headers.cookie);
      token = cookies['accessToken'];
    }

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
