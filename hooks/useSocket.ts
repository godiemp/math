'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/contexts/AuthContext';

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  error: string | null;
}

/**
 * Fetch the backend URL from server config
 * This ensures we get the correct PR-aware Railway URL
 */
async function fetchBackendUrl(): Promise<string> {
  try {
    const response = await fetch('/api/config');
    if (response.ok) {
      const data = await response.json();
      console.log('🔌 Socket: Backend URL from config:', data.backendUrl);
      return data.backendUrl;
    }
  } catch (error) {
    console.error('🔌 Socket: Error fetching backend URL:', error);
  }
  // Fallback to production
  return 'https://paes-math-backend-production.up.railway.app';
}

/**
 * Fetch socket authentication token from the backend
 * This token is needed because:
 * 1. REST API uses a proxy (/api/backend) - cookies are first-party to Vercel domain
 * 2. Socket.io connects directly to Railway - different domain, can't access Vercel cookies
 * 3. This endpoint provides the token so socket.io can use handshake auth
 */
async function fetchSocketToken(): Promise<string | null> {
  try {
    // Use the proxy endpoint to get the token (keeps cookies first-party)
    const response = await fetch('/api/backend/api/auth/socket-token', {
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('🔌 Socket: Failed to get token, status:', response.status);
      return null;
    }

    const data = await response.json();
    return data.token || null;
  } catch (error) {
    console.error('🔌 Socket: Error fetching token:', error);
    return null;
  }
}

/**
 * Hook for managing Socket.io connection with token-based authentication
 *
 * Fetches an auth token via the proxy and passes it in the socket handshake.
 * This works around the cross-origin cookie issue with Vercel + Railway.
 * Auto-connects when user is authenticated, disconnects on logout.
 */
export function useSocket(): UseSocketReturn {
  const { isAuthenticated, isLoading } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const connectingRef = useRef(false);

  useEffect(() => {
    // Don't connect until auth state is determined
    if (isLoading) return;

    // Disconnect if not authenticated
    if (!isAuthenticated) {
      if (socketRef.current) {
        console.log('🔌 Socket: Disconnecting (not authenticated)');
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
      return;
    }

    // Already connected or connecting
    if (socketRef.current?.connected || connectingRef.current) return;

    // Mark as connecting to prevent duplicate connections
    connectingRef.current = true;

    const connectSocket = async () => {
      try {
        // Fetch backend URL (PR-aware) and authentication token in parallel
        const [socketUrl, token] = await Promise.all([
          fetchBackendUrl(),
          fetchSocketToken(),
        ]);

        if (!token) {
          console.error('🔌 Socket: No token available, cannot connect');
          setError('Authentication token not available');
          connectingRef.current = false;
          return;
        }

        console.log('🔌 Socket: Connecting to', socketUrl, 'with token auth');

        const socket = io(socketUrl, {
          auth: { token }, // Pass token in handshake auth
          transports: ['websocket', 'polling'],
          autoConnect: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socket.on('connect', () => {
          console.log('🔌 Socket: Connected');
          setIsConnected(true);
          setError(null);
        });

        socket.on('disconnect', (reason) => {
          console.log('🔌 Socket: Disconnected -', reason);
          setIsConnected(false);
        });

        socket.on('connect_error', (err) => {
          console.error('🔌 Socket: Connection error -', err.message);
          setError(err.message);
          setIsConnected(false);
        });

        socket.on('error', (err) => {
          console.error('🔌 Socket: Error -', err);
          setError(typeof err === 'string' ? err : err.message || 'Socket error');
        });

        socketRef.current = socket;
      } catch (err) {
        console.error('🔌 Socket: Connection setup failed:', err);
        setError('Failed to set up socket connection');
      } finally {
        connectingRef.current = false;
      }
    };

    connectSocket();

    // Cleanup on unmount
    return () => {
      console.log('🔌 Socket: Cleaning up');
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      connectingRef.current = false;
    };
  }, [isAuthenticated, isLoading]);

  return {
    socket: socketRef.current,
    isConnected,
    error,
  };
}
