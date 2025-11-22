import { setup, assign, fromPromise } from 'xstate';
import type { LiveSession, SessionParticipant } from '@/lib/types';
import {
  getSession,
  getMyParticipationAPI,
  submitAnswerAPI,
  updateCurrentQuestionAPI
} from '@/lib/sessionApi';

/**
 * ============================================================================
 * CONTEXT & EVENTS
 * ============================================================================
 */

export interface LiveSessionContext {
  // Core data
  sessionId: string;
  session: LiveSession | null;

  // Navigation state
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  myAnswers: (number | null)[];

  // User state
  myParticipation: SessionParticipant | null;

  // Error handling
  error: string | null;

  // Flags
  hasPersistedInitialIndex: boolean; // Track if we've loaded initial index

  // Preview mode
  previewMode: boolean; // When true, allows forcing session state
  previewState: 'scheduled' | 'lobby' | 'active' | 'completed' | null; // Forced state in preview mode
}

export type LiveSessionEvent =
  // Session lifecycle
  | { type: 'SESSION_LOADED'; session: LiveSession; myAnswers: (number | null)[]; currentQuestionIndex?: number }
  | { type: 'SESSION_UPDATED'; session: LiveSession; myAnswers: (number | null)[] }
  | { type: 'POLL' }
  | { type: 'EXIT' }

  // Navigation
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'NAVIGATE_TO_QUESTION'; questionIndex: number }

  // Answer submission
  | { type: 'SELECT_ANSWER'; answerIndex: number }
  | { type: 'ANSWER_SUBMITTED'; success: boolean; updatedAnswers?: (number | null)[] }

  // Error handling
  | { type: 'RETRY' }
  | { type: 'ERROR'; error: string };

/**
 * ============================================================================
 * ACTORS (Async operations)
 * ============================================================================
 */

const loadSessionActor = fromPromise(async ({ input }: { input: { sessionId: string } }) => {
  const session = await getSession(input.sessionId);
  if (!session) {
    throw new Error('Session not found');
  }

  let myAnswers: (number | null)[] = [];
  let currentQuestionIndex = 0;

  // Fetch participation data if session is active or completed
  if (session.status === 'active' || session.status === 'completed') {
    const participationResult = await getMyParticipationAPI(input.sessionId);
    if (participationResult.success && participationResult.data) {
      myAnswers = participationResult.data.answers;
      currentQuestionIndex = participationResult.data.currentQuestionIndex ?? 0;
    }
  }

  return { session, myAnswers, currentQuestionIndex };
});

const submitAnswerActor = fromPromise(async ({
  input
}: {
  input: { sessionId: string; questionIndex: number; answerIndex: number; currentAnswers: (number | null)[] }
}) => {
  const result = await submitAnswerAPI(input.sessionId, input.questionIndex, input.answerIndex);

  if (!result.success) {
    throw new Error(result.error || 'Failed to submit answer');
  }

  // Update local answers array
  const updatedAnswers = [...input.currentAnswers];
  updatedAnswers[input.questionIndex] = input.answerIndex;

  return { updatedAnswers };
});

const updateQuestionIndexActor = fromPromise(async ({
  input
}: {
  input: { sessionId: string; questionIndex: number }
}) => {
  const result = await updateCurrentQuestionAPI(input.sessionId, input.questionIndex);

  if (!result.success) {
    throw new Error(result.error || 'Failed to update question index');
  }

  return { questionIndex: input.questionIndex };
});

/**
 * ============================================================================
 * STATE MACHINE
 * ============================================================================
 */

export const liveSessionMachine = setup({
  types: {
    context: {} as LiveSessionContext,
    events: {} as LiveSessionEvent,
    input: {} as {
      sessionId: string;
      previewMode?: boolean;
      previewState?: 'scheduled' | 'lobby' | 'active' | 'completed';
    },
  },

  actors: {
    loadSession: loadSessionActor,
    submitAnswer: submitAnswerActor,
    updateQuestionIndex: updateQuestionIndexActor,
  },

  actions: {
    /**
     * Set session data from initial load
     */
    setSessionData: assign(({ context, event }) => {
      if (event.type !== 'SESSION_LOADED') return {};

      return {
        session: event.session,
        myAnswers: event.myAnswers,
        currentQuestionIndex: event.currentQuestionIndex ?? 0,
        selectedAnswer: event.myAnswers[event.currentQuestionIndex ?? 0] ?? null,
        hasPersistedInitialIndex: true,
        error: null,
      };
    }),

    /**
     * Update session data from polling
     */
    updateSessionData: assign(({ context, event }) => {
      if (event.type !== 'SESSION_UPDATED') return {};

      // Preserve current question index during polling to avoid disrupting user navigation
      // Only sync answers
      return {
        session: event.session,
        myAnswers: event.myAnswers,
        selectedAnswer: event.myAnswers[context.currentQuestionIndex] ?? null,
        error: null,
      };
    }),

    /**
     * Navigate to next question
     */
    goToNextQuestion: assign(({ context }) => {
      if (!context.session) return {};

      const nextIndex = Math.min(
        context.currentQuestionIndex + 1,
        context.session.questions.length - 1
      );

      return {
        currentQuestionIndex: nextIndex,
        selectedAnswer: context.myAnswers[nextIndex] ?? null,
      };
    }),

    /**
     * Navigate to previous question
     */
    goToPreviousQuestion: assign(({ context }) => {
      const prevIndex = Math.max(context.currentQuestionIndex - 1, 0);

      return {
        currentQuestionIndex: prevIndex,
        selectedAnswer: context.myAnswers[prevIndex] ?? null,
      };
    }),

    /**
     * Navigate to specific question
     */
    goToQuestion: assign(({ context, event }) => {
      if (event.type !== 'NAVIGATE_TO_QUESTION') return {};

      return {
        currentQuestionIndex: event.questionIndex,
        selectedAnswer: context.myAnswers[event.questionIndex] ?? null,
      };
    }),

    /**
     * Set selected answer (optimistic update)
     */
    setSelectedAnswer: assign(({ event }) => {
      if (event.type !== 'SELECT_ANSWER') return {};

      return {
        selectedAnswer: event.answerIndex,
      };
    }),

    /**
     * Update answers array after successful submission
     */
    updateAnswers: assign(({ event }) => {
      if (event.type !== 'ANSWER_SUBMITTED') return {};

      return {
        myAnswers: event.updatedAnswers ?? [],
      };
    }),

    /**
     * Set error state
     */
    setError: assign(({ event }) => {
      if (event.type !== 'ERROR') return {};

      return {
        error: event.error,
      };
    }),

    /**
     * Clear error state
     */
    clearError: assign(() => ({
      error: null,
    })),
  },

  guards: {
    /**
     * Check if session is in scheduled state
     */
    isScheduled: ({ context }) => {
      if (context.previewMode && context.previewState !== null) {
        return context.previewState === 'scheduled';
      }
      return context.session?.status === 'scheduled';
    },

    /**
     * Check if session is in lobby state
     */
    isLobby: ({ context }) => {
      if (context.previewMode && context.previewState !== null) {
        return context.previewState === 'lobby';
      }
      return context.session?.status === 'lobby';
    },

    /**
     * Check if session is active
     */
    isActive: ({ context }) => {
      if (context.previewMode && context.previewState !== null) {
        return context.previewState === 'active';
      }
      return context.session?.status === 'active';
    },

    /**
     * Check if session is completed
     */
    isCompleted: ({ context }) => {
      if (context.previewMode && context.previewState !== null) {
        return context.previewState === 'completed';
      }
      return context.session?.status === 'completed';
    },

    /**
     * Check if can go to next question
     */
    canGoNext: ({ context }) => {
      if (!context.session) return false;
      return context.currentQuestionIndex < context.session.questions.length - 1;
    },

    /**
     * Check if can go to previous question
     */
    canGoPrevious: ({ context }) => {
      return context.currentQuestionIndex > 0;
    },

    /**
     * Check if session is loaded
     */
    hasSession: ({ context }) => context.session !== null,
  },

  delays: {
    pollingInterval: 2000, // Poll every 2 seconds
  },
}).createMachine({
  id: 'liveSession',

  initial: 'loading',

  context: ({ input }) => ({
    sessionId: input.sessionId,
    session: null,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    myAnswers: [],
    myParticipation: null,
    error: null,
    hasPersistedInitialIndex: false,
    previewMode: input.previewMode || false,
    previewState: input.previewState || null,
  }),

  states: {
    /**
     * ========================================================================
     * LOADING - Initial session fetch
     * ========================================================================
     */
    loading: {
      invoke: {
        src: 'loadSession',
        input: ({ context }) => ({ sessionId: context.sessionId }),
        onDone: {
          target: 'determineState',
          actions: assign(({ event }) => ({
            session: event.output.session,
            myAnswers: event.output.myAnswers,
            currentQuestionIndex: event.output.currentQuestionIndex,
            selectedAnswer: event.output.myAnswers[event.output.currentQuestionIndex] ?? null,
            hasPersistedInitialIndex: true,
            error: null,
          })),
        },
        onError: {
          target: 'error',
          actions: assign(({ event }) => ({
            error: event.error instanceof Error ? event.error.message : 'Failed to load session',
          })),
        },
      },
    },

    /**
     * ========================================================================
     * DETERMINE STATE - Route to appropriate state based on session status
     * ========================================================================
     */
    determineState: {
      always: [
        { target: 'scheduled', guard: 'isScheduled' },
        { target: 'lobby', guard: 'isLobby' },
        { target: 'active', guard: 'isActive' },
        { target: 'completed', guard: 'isCompleted' },
        { target: 'error' }, // Fallback if status is unknown
      ],
    },

    /**
     * ========================================================================
     * SCHEDULED - Waiting for lobby to open
     * ========================================================================
     */
    scheduled: {
      invoke: {
        src: 'loadSession',
        input: ({ context }) => ({ sessionId: context.sessionId }),
      },

      after: {
        pollingInterval: {
          target: 'scheduled',
          actions: 'updateSessionData',
          reenter: true,
          guard: ({ context }) => !context.previewMode, // Disable polling in preview mode
        },
      },

      on: {
        SESSION_UPDATED: {
          target: 'determineState',
          actions: 'updateSessionData',
        },
        EXIT: {
          target: 'exited',
        },
      },
    },

    /**
     * ========================================================================
     * LOBBY - Waiting for session to start
     * ========================================================================
     */
    lobby: {
      invoke: {
        src: 'loadSession',
        input: ({ context }) => ({ sessionId: context.sessionId }),
      },

      after: {
        pollingInterval: {
          target: 'lobby',
          actions: 'updateSessionData',
          reenter: true,
          guard: ({ context }) => !context.previewMode, // Disable polling in preview mode
        },
      },

      on: {
        SESSION_UPDATED: {
          target: 'determineState',
          actions: 'updateSessionData',
        },
        EXIT: {
          target: 'exited',
        },
      },
    },

    /**
     * ========================================================================
     * ACTIVE - Quiz in progress
     * ========================================================================
     */
    active: {
      initial: 'idle',

      // Background polling for session updates
      invoke: {
        src: 'loadSession',
        input: ({ context }) => ({ sessionId: context.sessionId }),
      },

      after: {
        pollingInterval: {
          target: 'active',
          actions: 'updateSessionData',
          reenter: true,
          guard: ({ context }) => !context.previewMode, // Disable polling in preview mode
        },
      },

      on: {
        SESSION_UPDATED: [
          {
            target: 'determineState',
            guard: ({ event }) => event.session.status !== 'active',
            actions: 'updateSessionData',
          },
          {
            actions: 'updateSessionData',
          },
        ],
        EXIT: {
          target: 'exited',
        },
      },

      states: {
        /**
         * Idle - Ready for user interaction
         */
        idle: {
          on: {
            NEXT_QUESTION: {
              target: 'navigating',
              guard: 'canGoNext',
              actions: 'goToNextQuestion',
            },
            PREVIOUS_QUESTION: {
              target: 'navigating',
              guard: 'canGoPrevious',
              actions: 'goToPreviousQuestion',
            },
            NAVIGATE_TO_QUESTION: {
              target: 'navigating',
              actions: 'goToQuestion',
            },
            SELECT_ANSWER: {
              target: 'submittingAnswer',
              actions: 'setSelectedAnswer',
            },
          },
        },

        /**
         * Navigating - Persisting question index to server
         */
        navigating: {
          invoke: {
            src: 'updateQuestionIndex',
            input: ({ context }) => ({
              sessionId: context.sessionId,
              questionIndex: context.currentQuestionIndex,
            }),
            onDone: {
              target: 'idle',
            },
            onError: {
              // Silently fail navigation persistence, don't block UX
              target: 'idle',
              actions: ({ event }) => {
                console.error('Failed to persist question index:', event.error);
              },
            },
          },
        },

        /**
         * Submitting answer to server
         */
        submittingAnswer: {
          invoke: {
            src: 'submitAnswer',
            input: ({ context }) => ({
              sessionId: context.sessionId,
              questionIndex: context.currentQuestionIndex,
              answerIndex: context.selectedAnswer!,
              currentAnswers: context.myAnswers,
            }),
            onDone: {
              target: 'idle',
              actions: assign(({ event }) => ({
                myAnswers: event.output.updatedAnswers,
              })),
            },
            onError: {
              target: 'idle',
              actions: ({ event }) => {
                console.error('Failed to submit answer:', event.error);
                // Optionally: Show error toast to user
              },
            },
          },
        },
      },
    },

    /**
     * ========================================================================
     * COMPLETED - Session finished, showing results
     * ========================================================================
     */
    completed: {
      // Still poll in case admin modifies session or results update
      invoke: {
        src: 'loadSession',
        input: ({ context }) => ({ sessionId: context.sessionId }),
      },

      after: {
        pollingInterval: {
          target: 'completed',
          actions: 'updateSessionData',
          reenter: true,
          guard: ({ context }) => !context.previewMode, // Disable polling in preview mode
        },
      },

      on: {
        SESSION_UPDATED: {
          actions: 'updateSessionData',
        },
        EXIT: {
          target: 'exited',
        },
      },
    },

    /**
     * ========================================================================
     * ERROR - Error state with retry capability
     * ========================================================================
     */
    error: {
      on: {
        RETRY: {
          target: 'loading',
          actions: 'clearError',
        },
        EXIT: {
          target: 'exited',
        },
      },
    },

    /**
     * ========================================================================
     * EXITED - Final state when user exits
     * ========================================================================
     */
    exited: {
      type: 'final',
    },
  },
});
