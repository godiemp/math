/**
 * Mobile Auth Context
 * Manages authentication state, login, register, and logout
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { router } from 'expo-router';
import type { User, RegisterRequest, AuthResponse } from '@paes/shared';
import { AUTH_ENDPOINTS } from '@paes/shared';
import { api, secureTokenStorage, setAuthFailureCallback } from '../services';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<AuthResult>;
  register: (data: RegisterData) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  displayName: string;
  acceptedTerms: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Set up auth failure callback to redirect to login
  useEffect(() => {
    setAuthFailureCallback(() => {
      setUser(null);
      router.replace('/(auth)/login');
    });
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await secureTokenStorage.getAccessToken();
      if (token) {
        const response = await api.get<User>(AUTH_ENDPOINTS.ME);
        if (response.data) {
          setUser(response.data);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (usernameOrEmail: string, password: string): Promise<AuthResult> => {
    try {
      const response = await api.post<AuthResponse>(
        AUTH_ENDPOINTS.LOGIN,
        { usernameOrEmail, password },
        { skipRefresh: true }
      );

      if (response.error) {
        return { success: false, error: response.error.error };
      }

      if (response.data) {
        const { user: userData, accessToken, refreshToken } = response.data;

        // Store tokens if returned (mobile flow)
        if (accessToken && refreshToken) {
          await secureTokenStorage.setTokens(accessToken, refreshToken);
        }

        setUser(userData);
        return { success: true };
      }

      return { success: false, error: 'Error al iniciar sesión' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<AuthResult> => {
    try {
      const response = await api.post<AuthResponse>(
        AUTH_ENDPOINTS.REGISTER,
        data,
        { skipRefresh: true }
      );

      if (response.error) {
        return { success: false, error: response.error.error };
      }

      if (response.data) {
        const { user: userData, accessToken, refreshToken } = response.data;

        // Store tokens if returned (mobile flow)
        if (accessToken && refreshToken) {
          await secureTokenStorage.setTokens(accessToken, refreshToken);
        }

        setUser(userData);
        return { success: true };
      }

      return { success: false, error: 'Error al registrarse' };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call logout endpoint (best effort)
      await api.post(AUTH_ENDPOINTS.LOGOUT, {});
    } catch (error) {
      console.error('Logout API call failed:', error);
    }

    // Always clear local state
    await secureTokenStorage.clearTokens();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get<User>(AUTH_ENDPOINTS.ME);
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Refresh user failed:', error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
