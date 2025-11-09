/**
 * ============================================================================
 * AUTH CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for authentication endpoints
 */

import { Request, Response } from 'express';
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
 * Register a new user
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body as RegisterRequest;
    const result = await registerUserService(data);
    res.status(201).json(result);
  } catch (error) {
    console.error('Register error:', error);
    const message = error instanceof Error ? error.message : 'Registration failed';

    // Determine status code based on error message
    if (message.includes('already exists')) {
      res.status(409).json({ error: message });
    } else if (message.includes('required') || message.includes('at least')) {
      res.status(400).json({ error: message });
    } else {
      res.status(500).json({ error: 'Registration failed' });
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
    res.json(result);
  } catch (error) {
    console.error('Login error:', error);
    const message = error instanceof Error ? error.message : 'Login failed';

    // Determine status code based on error message
    if (message.includes('Invalid credentials') || message.includes('required')) {
      res.status(401).json({ error: message });
    } else {
      res.status(500).json({ error: 'Login failed' });
    }
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken } = req.body as RefreshTokenRequest;
    const result = await refreshAccessToken(refreshToken);
    res.json(result);
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
}

/**
 * Logout user (revoke refresh token)
 */
export async function logout(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken } = req.body as RefreshTokenRequest;
    await logoutUserService(refreshToken);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    const message = error instanceof Error ? error.message : 'Logout failed';

    if (message.includes('required')) {
      res.status(400).json({ error: message });
    } else {
      res.status(500).json({ error: 'Logout failed' });
    }
  }
}

/**
 * Get current user info (with subscription status)
 */
export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const user = await getUserById(req.user.userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
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
    res.status(500).json({ error: 'Failed to get user info' });
  }
}
