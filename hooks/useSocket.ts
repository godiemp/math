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
 * Hook for managing Socket.io connection with cookie-based authentication
 *
 * Uses HttpOnly cookies (same as REST API) for authentication.
 * Auto-connects when user is authenticated, disconnects on logout.
 */
export function useSocket(): UseSocketReturn {
  const { isAuthenticated, isLoading } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Get the backend URL (same logic as api-client)
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

    // Already connected
    if (socketRef.current?.connected) return;

    const socketUrl = getSocketUrl();
    console.log('🔌 Socket: Connecting to', socketUrl);

    const socket = io(socketUrl, {
      withCredentials: true, // Send cookies for authentication
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

    // Cleanup on unmount
    return () => {
      console.log('🔌 Socket: Cleaning up');
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, isLoading, getSocketUrl]);

  return {
    socket: socketRef.current,
    isConnected,
    error,
  };
}
