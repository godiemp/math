import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../config/database';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiration,
} from '../utils/jwt';
import { RegisterRequest, LoginRequest, RefreshTokenRequest } from '../types';

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, displayName } = req.body as RegisterRequest;

    // Validation
    if (!username || !email || !password || !displayName) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters' });
      return;
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      res.status(409).json({ error: 'Username or email already exists' });
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate user ID
    const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const now = Date.now();

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, username, email, display_name, role, created_at, updated_at, current_streak, longest_streak, last_practice_date`,
      [userId, username, email, passwordHash, displayName, 'student', now, now]
    );

    const user = result.rows[0];

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Store refresh token
    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES ($1, $2, $3, $4)',
      [user.id, refreshToken, getRefreshTokenExpiration(), now]
    );

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.display_name,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        currentStreak: user.current_streak,
        longestStreak: user.longest_streak,
        lastPracticeDate: user.last_practice_date,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

/**
 * Login user
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { usernameOrEmail, password } = req.body as LoginRequest;

    if (!usernameOrEmail || !password) {
      res.status(400).json({ error: 'Username/email and password are required' });
      return;
    }

    // Find user by username or email
    const result = await pool.query(
      `SELECT id, username, email, password_hash, display_name, role, created_at, updated_at,
              current_streak, longest_streak, last_practice_date
       FROM users
       WHERE username = $1 OR email = $1`,
      [usernameOrEmail]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Store refresh token
    const now = Date.now();
    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES ($1, $2, $3, $4)',
      [user.id, refreshToken, getRefreshTokenExpiration(), now]
    );

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.display_name,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        currentStreak: user.current_streak,
        longestStreak: user.longest_streak,
        lastPracticeDate: user.last_practice_date,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

/**
 * Refresh access token using refresh token
 */
export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body as RefreshTokenRequest;

    if (!refreshToken) {
      res.status(400).json({ error: 'Refresh token is required' });
      return;
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);

    // Check if token exists and is not revoked
    const tokenResult = await pool.query(
      'SELECT * FROM refresh_tokens WHERE token = $1 AND revoked = FALSE',
      [refreshToken]
    );

    if (tokenResult.rows.length === 0) {
      res.status(401).json({ error: 'Invalid refresh token' });
      return;
    }

    const storedToken = tokenResult.rows[0];

    // Check if token is expired
    if (storedToken.expires_at < Date.now()) {
      res.status(401).json({ error: 'Refresh token expired' });
      return;
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    });

    res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

/**
 * Logout user (revoke refresh token)
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body as RefreshTokenRequest;

    if (!refreshToken) {
      res.status(400).json({ error: 'Refresh token is required' });
      return;
    }

    // Revoke the refresh token
    await pool.query(
      'UPDATE refresh_tokens SET revoked = TRUE WHERE token = $1',
      [refreshToken]
    );

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
};

/**
 * Get current user info
 */
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // Fetch fresh user data from database
    const result = await pool.query(
      `SELECT id, username, email, display_name, role, created_at, updated_at,
              current_streak, longest_streak, last_practice_date
       FROM users
       WHERE id = $1`,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = result.rows[0];

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.display_name,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      currentStreak: user.current_streak,
      longestStreak: user.longest_streak,
      lastPracticeDate: user.last_practice_date,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
};
