import { useMachine } from '@xstate/react';
import { liveSessionMachine } from '../live-session-machine';
import type { LiveSession } from '../types';

/**
 * Hook to manage live session state with XState
 *
 * @param sessionId - The ID of the session to manage
 * @returns State, context, and actions for the live session
 *
 * @example
 * ```tsx
 * const { state, session, currentQuestion, selectAnswer, nextQuestion, exit } =
 *   useLiveSession(sessionId);
 *
 * if (state.matches('loading')) {
 *   return <LoadingSpinner />;
 * }
 *
 * if (state.matches('scheduled')) {
 *   return <ScheduledView session={session} onExit={exit} />;
 * }
 *
 * if (state.matches('active')) {
 *   return (
 *     <ActiveQuiz
 *       question={currentQuestion}
 *       onAnswer={selectAnswer}
 *       onNext={nextQuestion}
 *     />
 *   );
 * }
 * ```
 */
export function useLiveSession(sessionId: string) {
  const [state, send] = useMachine(liveSessionMachine, {
    input: { sessionId },
  });

  const { context } = state;

  // Derived state
  const isLoading = state.matches('loading');
  const isScheduled = state.matches('scheduled');
  const isLobby = state.matches('lobby');
  const isActive = state.matches('active');
  const isCompleted = state.matches('completed');
  const isError = state.matches('error');

  // Active substates
  const isNavigating = state.matches({ active: 'navigating' });
  const isSubmitting = state.matches({ active: 'submittingAnswer' });

  // Current question
  const currentQuestion = context.session?.questions[context.currentQuestionIndex];

  // Navigation helpers
  const canGoNext = context.session
    ? context.currentQuestionIndex < context.session.questions.length - 1
    : false;
  const canGoPrevious = context.currentQuestionIndex > 0;

  // Actions
  const actions = {
    selectAnswer: (answerIndex: number) => send({ type: 'SELECT_ANSWER', answerIndex }),
    nextQuestion: () => send({ type: 'NEXT_QUESTION' }),
    previousQuestion: () => send({ type: 'PREVIOUS_QUESTION' }),
    navigateToQuestion: (questionIndex: number) =>
      send({ type: 'NAVIGATE_TO_QUESTION', questionIndex }),
    retry: () => send({ type: 'RETRY' }),
    exit: () => send({ type: 'EXIT' }),
  };

  return {
    // State flags
    state,
    isLoading,
    isScheduled,
    isLobby,
    isActive,
    isCompleted,
    isError,
    isNavigating,
    isSubmitting,

    // Context data
    session: context.session,
    currentQuestion,
    currentQuestionIndex: context.currentQuestionIndex,
    selectedAnswer: context.selectedAnswer,
    myAnswers: context.myAnswers,
    error: context.error,

    // Navigation state
    canGoNext,
    canGoPrevious,

    // Actions
    ...actions,

    // Raw send for advanced use cases
    send,
  };
}

/**
 * Type-safe helper to get session status message
 */
export function getSessionStatusMessage(session: LiveSession | null): string {
  if (!session) return 'Cargando sesión...';

  switch (session.status) {
    case 'scheduled':
      return 'El lobby se abrirá pronto';
    case 'lobby':
      return '¡Bienvenido al Lobby!';
    case 'active':
      return 'Ensayo en progreso';
    case 'completed':
      return 'Resultados del Ensayo';
    case 'cancelled':
      return 'Ensayo cancelado';
    default:
      return 'Estado desconocido';
  }
}

/**
 * Helper to calculate minutes until session starts
 */
export function getMinutesUntilStart(session: LiveSession): number {
  const now = Date.now();
  return Math.max(0, Math.ceil((session.scheduledStartTime - now) / 60000));
}
