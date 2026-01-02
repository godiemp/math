/**
 * ============================================================================
 * WEBSOCKET MODULE
 * ============================================================================
 *
 * Initializes Socket.io server with authentication and handlers
 */

import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { socketAuthMiddleware } from './socketAuth';
import { initializeLessonHandlers } from './lessonSocketHandlers';
import { lessonSessionManager } from './lessonSessionManager';

let io: SocketIOServer | null = null;

/**
 * Initialize WebSocket server
 */
export function initializeWebSocket(httpServer: HttpServer, corsOptions: object): SocketIOServer {
  io = new SocketIOServer(httpServer, {
    cors: corsOptions,
    // Ping timeout and interval for connection health
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Apply authentication middleware
  io.use(socketAuthMiddleware);

  // Initialize event handlers
  initializeLessonHandlers(io);

  console.log('✅ WebSocket server initialized');

  return io;
}

/**
 * Get the Socket.io server instance
 */
export function getIO(): SocketIOServer {
  if (!io) {
    throw new Error('WebSocket server not initialized');
  }
  return io;
}

/**
 * Cleanup WebSocket on shutdown
 */
export async function closeWebSocket(): Promise<void> {
  if (io) {
    // End all active sessions
    for (const session of lessonSessionManager.getAllSessions()) {
      const roomId = lessonSessionManager.getRoomId(session.teacherId, session.lessonId);
      io.to(roomId).emit('lesson:ended', {
        lessonId: session.lessonId,
        reason: 'server_shutdown',
        endedAt: Date.now(),
      });
    }

    // Close all connections
    io.close();
    io = null;
    console.log('🔌 WebSocket server closed');
  }
}

// Export session manager for external use
export { lessonSessionManager };
