'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/contexts/AuthContext';

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  error: string | null;
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

  // Get the backend URL for socket.io (direct connection, not through proxy)
  const getSocketUrl = useCallback(() => {
    // In production, use the API URL
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }

    // Development: connect directly to backend
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3001';
    }

    // Default production URL
    return 'https://paes-math-backend-production.up.railway.app';
  }, []);

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
        // Fetch authentication token
        const token = await fetchSocketToken();

        if (!token) {
          console.error('🔌 Socket: No token available, cannot connect');
          setError('Authentication token not available');
          connectingRef.current = false;
          return;
        }

        const socketUrl = getSocketUrl();
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
  }, [isAuthenticated, isLoading, getSocketUrl]);

  return {
    socket: socketRef.current,
    isConnected,
    error,
  };
}
