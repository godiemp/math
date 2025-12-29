import { BrowserContext, WebSocketRoute } from '@playwright/test';

/**
 * Socket.io packet types (Engine.IO layer)
 * See: https://socket.io/docs/v4/socket-io-protocol/
 */
const SOCKET_IO_PACKET_TYPES = {
  CONNECT: '0',
  DISCONNECT: '1',
  EVENT: '2',
  ACK: '3',
  CONNECT_ERROR: '4',
  BINARY_EVENT: '5',
  BINARY_ACK: '6',
};

/**
 * Parse a Socket.io packet from WebSocket message
 */
function parseSocketIOPacket(message: string): { type: string; event?: string; data?: any } {
  if (!message || message.length === 0) {
    return { type: 'unknown' };
  }

  const type = message[0];

  if (type === SOCKET_IO_PACKET_TYPES.EVENT) {
    try {
      const jsonPart = message.slice(1);
      const parsed = JSON.parse(jsonPart);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { type, event: parsed[0], data: parsed[1] };
      }
    } catch {
      // Not a valid JSON packet
    }
  }

  return { type };
}

/**
 * Create a Socket.io EVENT packet
 */
function createSocketIOPacket(event: string, data?: any): string {
  const payload = data !== undefined ? [event, data] : [event];
  return SOCKET_IO_PACKET_TYPES.EVENT + JSON.stringify(payload);
}

/**
 * Event handler type for mock
 */
type EventHandler = (event: string, data: any) => string | null;

/**
 * Emitted event record
 */
interface EmittedEvent {
  event: string;
  data: any;
  timestamp: number;
}

/**
 * Socket mock return type
 */
interface SocketMock {
  getEmittedEvents: () => EmittedEvent[];
  clearEvents: () => void;
  sendEvent: (event: string, data?: any) => void;
}

/**
 * Setup Socket.io mocking for a browser context.
 * Must be called BEFORE page navigation.
 *
 * Uses Playwright's native routeWebSocket() to intercept WebSocket connections.
 *
 * @param context - The browser context to set up mocking for
 * @param options.onEvent - Optional handler to auto-respond to events
 * @returns Mock controller with methods to send events and inspect emitted events
 */
export async function setupSocketMock(
  context: BrowserContext,
  options?: {
    onEvent?: EventHandler;
  }
): Promise<SocketMock> {
  const emittedEvents: EmittedEvent[] = [];
  let activeWsRoute: WebSocketRoute | null = null;

  // Route WebSocket connections to socket.io endpoint
  await context.routeWebSocket(/socket\.io/, (ws) => {
    activeWsRoute = ws;

    // Handle incoming messages from the client
    ws.onMessage((message) => {
      const messageStr = message.toString();
      const packet = parseSocketIOPacket(messageStr);

      // Track emitted events (Socket.io EVENT type)
      if (packet.type === SOCKET_IO_PACKET_TYPES.EVENT && packet.event) {
        emittedEvents.push({
          event: packet.event,
          data: packet.data,
          timestamp: Date.now(),
        });

        // Auto-respond if handler provided
        if (options?.onEvent) {
          const response = options.onEvent(packet.event, packet.data);
          if (response) {
            ws.send(response);
          }
        }
      }
    });

    // Send Engine.IO handshake response
    // This simulates the initial connection acknowledgment
    setTimeout(() => {
      ws.send('0{"sid":"mock-session-id","upgrades":[],"pingInterval":25000,"pingTimeout":20000}');
    }, 50);
  });

  return {
    /**
     * Get all events emitted by the client
     */
    getEmittedEvents: () => [...emittedEvents],

    /**
     * Clear the emitted events list
     */
    clearEvents: () => {
      emittedEvents.length = 0;
    },

    /**
     * Send a Socket.io event to the client (simulating server push)
     */
    sendEvent: (event: string, data?: any) => {
      if (activeWsRoute) {
        activeWsRoute.send(createSocketIOPacket(event, data));
      }
    },
  };
}

/**
 * Create auto-responding mock handler for teacher scenarios.
 *
 * Automatically responds to:
 * - teacher:start_lesson -> lesson:started
 * - teacher:end_lesson -> lesson:end_confirmed
 * - teacher:set_step -> lesson:step_changed
 */
export function createTeacherMockHandler(): EventHandler {
  return (event: string, data: any): string | null => {
    switch (event) {
      case 'teacher:start_lesson':
        return createSocketIOPacket('lesson:started', {
          roomId: `mock_${data?.lessonId || 'lesson'}`,
          lessonId: data?.lessonId,
          lessonTitle: data?.lessonTitle,
          currentStep: 1,
          totalSteps: data?.totalSteps || 6,
        });

      case 'teacher:end_lesson':
        return createSocketIOPacket('lesson:end_confirmed', {});

      case 'teacher:set_step':
        return createSocketIOPacket('lesson:step_changed', {
          lessonId: data?.lessonId,
          step: data?.step,
          changedAt: Date.now(),
        });

      default:
        return null;
    }
  };
}

/**
 * Create auto-responding mock handler for student scenarios.
 *
 * Automatically responds to:
 * - student:subscribe -> subscription:confirmed
 * - student:join_lesson -> lesson:state
 * - student:leave_lesson -> lesson:left
 */
export function createStudentMockHandler(teacherId: string): EventHandler {
  return (event: string, data: any): string | null => {
    switch (event) {
      case 'student:subscribe':
        return createSocketIOPacket('subscription:confirmed', {
          teacherId,
          activeLesson: null, // No active lesson initially
        });

      case 'student:join_lesson':
        return createSocketIOPacket('lesson:state', {
          teacherId,
          lessonId: data?.lessonId,
          lessonTitle: data?.lessonTitle || 'Test Lesson',
          currentStep: 1,
          totalSteps: 6,
          roomId: `${teacherId}_${data?.lessonId}`,
        });

      case 'student:leave_lesson':
        return createSocketIOPacket('lesson:left', {});

      default:
        return null;
    }
  };
}

// Export packet helper for tests that need custom packets
export { createSocketIOPacket, parseSocketIOPacket };
