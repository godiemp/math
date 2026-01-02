import { BrowserContext, WebSocketRoute } from '@playwright/test';

/**
 * Engine.IO packet types
 * See: https://socket.io/docs/v4/engine-io-protocol/
 */
const ENGINE_IO_PACKET_TYPES = {
  OPEN: '0',
  CLOSE: '1',
  PING: '2',
  PONG: '3',
  MESSAGE: '4',
  UPGRADE: '5',
  NOOP: '6',
};

/**
 * Socket.io packet types (inside Engine.IO MESSAGE)
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
 * Parsed packet result
 */
interface ParsedPacket {
  engineType: string;
  socketType?: string;
  event?: string;
  data?: any;
  namespace?: string;
}

/**
 * Parse a Socket.io packet from WebSocket message.
 * Socket.io packets are wrapped in Engine.IO MESSAGE packets (type 4).
 * Format: <engine_type>[<socket_type>[namespace,][data]]
 *
 * Examples:
 * - "0{...}" - Engine.IO OPEN
 * - "2" - Engine.IO PING
 * - "3" - Engine.IO PONG
 * - "40" - Socket.io CONNECT to default namespace
 * - "40/admin" - Socket.io CONNECT to /admin namespace
 * - "42["event",data]" - Socket.io EVENT
 */
function parseSocketIOPacket(message: string): ParsedPacket {
  if (!message || message.length === 0) {
    return { engineType: 'unknown' };
  }

  const engineType = message[0];

  // Handle Engine.IO packets directly
  if (engineType !== ENGINE_IO_PACKET_TYPES.MESSAGE) {
    return { engineType };
  }

  // It's an Engine.IO MESSAGE containing a Socket.io packet
  const socketPart = message.slice(1);
  if (socketPart.length === 0) {
    return { engineType };
  }

  const socketType = socketPart[0];
  const rest = socketPart.slice(1);

  // Socket.io CONNECT (type 0)
  if (socketType === SOCKET_IO_PACKET_TYPES.CONNECT) {
    // Format: "0" or "0/namespace" or "0/namespace,{data}"
    if (rest.length === 0) {
      return { engineType, socketType, namespace: '/' };
    }
    const commaIndex = rest.indexOf(',');
    if (commaIndex === -1) {
      return { engineType, socketType, namespace: rest || '/' };
    }
    return {
      engineType,
      socketType,
      namespace: rest.slice(0, commaIndex) || '/',
      data: JSON.parse(rest.slice(commaIndex + 1)),
    };
  }

  // Socket.io EVENT (type 2)
  if (socketType === SOCKET_IO_PACKET_TYPES.EVENT) {
    try {
      const parsed = JSON.parse(rest);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { engineType, socketType, event: parsed[0], data: parsed[1] };
      }
    } catch {
      // Not a valid JSON packet
    }
  }

  return { engineType, socketType };
}

/**
 * Create a Socket.io EVENT packet (wrapped in Engine.IO MESSAGE)
 * Format: "42["event",data]"
 */
function createSocketIOPacket(event: string, data?: any): string {
  const payload = data !== undefined ? [event, data] : [event];
  return (
    ENGINE_IO_PACKET_TYPES.MESSAGE +
    SOCKET_IO_PACKET_TYPES.EVENT +
    JSON.stringify(payload)
  );
}

/**
 * Create a Socket.io CONNECT ACK packet (wrapped in Engine.IO MESSAGE)
 * Format: "40{"sid":"xxx"}"
 */
function createConnectAckPacket(sid: string): string {
  return (
    ENGINE_IO_PACKET_TYPES.MESSAGE +
    SOCKET_IO_PACKET_TYPES.CONNECT +
    JSON.stringify({ sid })
  );
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

  const mockSessionId = `mock-${Date.now()}`;

  // Route WebSocket connections to socket.io endpoint
  await context.routeWebSocket(/socket\.io/, (ws) => {
    activeWsRoute = ws;

    // Handle incoming messages from the client
    ws.onMessage((message) => {
      const messageStr = message.toString();
      const packet = parseSocketIOPacket(messageStr);

      // Handle Engine.IO PING with PONG
      if (packet.engineType === ENGINE_IO_PACKET_TYPES.PING) {
        ws.send(ENGINE_IO_PACKET_TYPES.PONG);
        return;
      }

      // Handle Socket.io CONNECT with CONNECT ACK
      if (
        packet.engineType === ENGINE_IO_PACKET_TYPES.MESSAGE &&
        packet.socketType === SOCKET_IO_PACKET_TYPES.CONNECT
      ) {
        ws.send(createConnectAckPacket(mockSessionId));
        return;
      }

      // Track emitted events (Socket.io EVENT type)
      if (
        packet.engineType === ENGINE_IO_PACKET_TYPES.MESSAGE &&
        packet.socketType === SOCKET_IO_PACKET_TYPES.EVENT &&
        packet.event
      ) {
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

    // Send Engine.IO OPEN (handshake) response immediately
    // This simulates the initial connection acknowledgment
    setTimeout(() => {
      ws.send(
        ENGINE_IO_PACKET_TYPES.OPEN +
          JSON.stringify({
            sid: mockSessionId,
            upgrades: [],
            pingInterval: 25000,
            pingTimeout: 20000,
          })
      );
    }, 10);
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
