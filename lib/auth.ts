import { User } from './types';
import { api, setTokens, clearTokens, getAccessToken } from './api-client';

const CURRENT_USER_KEY = 'paes-current-user';

// Store user data in localStorage (but auth is via JWT tokens)
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

function setCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

/**
 * Register a new user via backend API
 */
export async function registerUser(
  username: string,
  email: string,
  password: string,
  displayName: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  const response = await api.post<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }>('/api/auth/register', {
    username,
    email,
    password,
    displayName,
  });

  if (response.error) {
    return { success: false, error: response.error.error };
  }

  if (response.data) {
    // Store tokens
    setTokens(response.data.accessToken, response.data.refreshToken);

    // Store user data
    setCurrentUser(response.data.user);

    return { success: true, user: response.data.user };
  }

  return { success: false, error: 'Registration failed' };
}

/**
 * Login user via backend API
 */
export async function loginUser(
  usernameOrEmail: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  const response = await api.post<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }>('/api/auth/login', {
    usernameOrEmail,
    password,
  });

  if (response.error) {
    return { success: false, error: response.error.error };
  }

  if (response.data) {
    // Store tokens
    setTokens(response.data.accessToken, response.data.refreshToken);

    // Store user data
    setCurrentUser(response.data.user);

    return { success: true, user: response.data.user };
  }

  return { success: false, error: 'Login failed' };
}

/**
 * Logout user via backend API
 */
export async function logoutUser(): Promise<void> {
  const refreshToken = localStorage.getItem('paes-refresh-token');

  if (refreshToken) {
    // Call backend to revoke refresh token
    await api.post('/api/auth/logout', { refreshToken });
  }

  // Clear local storage
  clearTokens();
  setCurrentUser(null);
}

/**
 * Fetch current user from backend
 */
export async function fetchCurrentUser(): Promise<User | null> {
  if (!getAccessToken()) {
    return null;
  }

  const response = await api.get<User>('/api/auth/me');

  if (response.error) {
    // Token is invalid or expired
    clearTokens();
    setCurrentUser(null);
    return null;
  }

  if (response.data) {
    setCurrentUser(response.data);
    return response.data;
  }

  return null;
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null && getAccessToken() !== null;
}

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user !== null && user.role === 'admin';
}

export function requireAdmin(): User | null {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    return null;
  }
  return user;
}
