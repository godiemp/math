/**
 * ============================================================================
 * AUTH CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for authentication endpoints
 */

import { Request, Response, CookieOptions } from 'express';
import {
  registerUser as registerUserService,
  loginUser as loginUserService,
  refreshAccessToken,
  logoutUser as logoutUserService,
  getUserById,
} from '../services/authService';
import { RegisterRequest, LoginRequest, RefreshTokenRequest } from '../types';
import { SubscriptionService } from '../../services/subscriptionService';

/**
 * Check if request is from a mobile client
 * Mobile clients send X-Client-Type: mobile header
 */
function isMobileClient(req: Request): boolean {
  return req.headers['x-client-type'] === 'mobile';
}

/**
 * SECURITY: Cookie options for JWT tokens
 * - httpOnly: Prevents JavaScript access (XSS protection)
 * - secure: Only sent over HTTPS in production
 * - sameSite: CSRF protection
 * - path: Cookie scope
 */
const getAccessTokenCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-site in production
  maxAge: 60 * 60 * 1000, // 1 hour
  path: '/',
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-site in production
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
});

/**
 * Register a new user
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body as RegisterRequest;
    const result = await registerUserService(data);

    // Mobile clients receive tokens in response body
    if (isMobileClient(req)) {
      res.status(201).json({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        message: 'Registration successful',
      });
      return;
    }

    // SECURITY: Set tokens as HttpOnly cookies for web clients
    res.cookie('accessToken', result.accessToken, getAccessTokenCookieOptions());
    res.cookie('refreshToken', result.refreshToken, getRefreshTokenCookieOptions());

    // Return user data without tokens (tokens are in cookies now)
    res.status(201).json({
      user: result.user,
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Register error:', error);
    const message = error instanceof Error ? error.message : 'Registration failed';

    // Determine status code based on error message
    if (message.includes('ya está registrado') || message.includes('already exists')) {
      res.status(409).json({ error: message });
    } else if (message.includes('completa todos') || message.includes('required') || message.includes('al menos') || message.includes('at least')) {
      res.status(400).json({ error: message });
    } else {
      res.status(500).json({ error: 'Error al registrarse' });
    }
  }
}

/**
 * Login user
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body as LoginRequest;
    const result = await loginUserService(data);

    // Fetch subscription status for non-admin users
    const subscription = result.user.role !== 'admin'
      ? await SubscriptionService.getUserSubscription(result.user.id)
      : null;

    const userWithSubscription = {
      ...result.user,
      subscription,
    };

    // Mobile clients receive tokens in response body
    if (isMobileClient(req)) {
      res.json({
        user: userWithSubscription,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        message: 'Login successful',
      });
      return;
    }

    // SECURITY: Set tokens as HttpOnly cookies for web clients
    res.cookie('accessToken', result.accessToken, getAccessTokenCookieOptions());
    res.cookie('refreshToken', result.refreshToken, getRefreshTokenCookieOptions());

    // Return user data without tokens (tokens are in cookies now)
    res.json({
      user: userWithSubscription,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    const message = error instanceof Error ? error.message : 'Login failed';

    // Determine status code based on error message
    // Use 400 (not 401) for invalid credentials to avoid triggering token refresh logic in api-client
    if (
      message.includes('no encontrado') ||
      message.includes('incorrecta') ||
      message.includes('Invalid credentials') ||
      message.includes('ingresa tu usuario')
    ) {
      res.status(400).json({ error: message });
    } else {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    // Mobile clients send refresh token in body, web clients use cookies
    const refreshToken = isMobileClient(req)
      ? req.body.refreshToken
      : req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ error: 'Sesión no encontrada' });
      return;
    }

    const result = await refreshAccessToken(refreshToken);

    // Mobile clients receive new tokens in response body
    if (isMobileClient(req)) {
      res.json({
        accessToken: result.accessToken,
        message: 'Token refreshed successfully',
      });
      return;
    }

    // SECURITY: Set new access token as HttpOnly cookie for web clients
    res.cookie('accessToken', result.accessToken, getAccessTokenCookieOptions());

    res.json({ message: 'Token refreshed successfully' });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ error: 'Sesión inválida. Por favor inicia sesión nuevamente' });
  }
}

/**
 * Logout user (revoke refresh token)
 */
export async function logout(req: Request, res: Response): Promise<void> {
  try {
    // SECURITY: Get refresh token from cookie instead of request body
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await logoutUserService(refreshToken);
    }

    // SECURITY: Clear authentication cookies
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);

    // Still clear cookies even if logout fails
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });

    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
}

/**
 * Get socket authentication token
 * Returns the access token for WebSocket connections
 *
 * This is needed because:
 * 1. REST API uses a proxy (/api/backend) - cookies are first-party to Vercel domain
 * 2. Socket.io connects directly to Railway - different domain, no access to Vercel cookies
 * 3. This endpoint provides the token so socket.io can use handshake auth
 */
export async function getSocketToken(req: Request, res: Response): Promise<void> {
  try {
    // Token is already validated by authenticate middleware
    // Return it for socket.io authentication
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      res.status(401).json({ error: 'No authentication token found' });
      return;
    }

    res.json({ token: accessToken });
  } catch (error) {
    console.error('Get socket token error:', error);
    res.status(500).json({ error: 'Error al obtener token de socket' });
  }
}

/**
 * Get current user info (with subscription status)
 */
export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'No autenticado' });
      return;
    }

    const user = await getUserById(req.user.userId);

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    // Fetch subscription status for non-admin users
    // Admins always have full access regardless of subscription
    const subscription = user.role !== 'admin'
      ? await SubscriptionService.getUserSubscription(req.user.userId)
      : null;

    res.json({
      ...user,
      subscription,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Error al obtener información del usuario' });
  }
}
