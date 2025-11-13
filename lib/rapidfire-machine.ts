import { setup, assign } from 'xstate';
import type { Question } from '@/lib/types';

export interface RapidFireContext {
  quizQuestions: Question[];
  userAnswers: (number | null)[];
  currentQuestionIndex: number;
  wrongAnswerCount: number;
  timeRemaining: number;
  totalTimeElapsed: number;
  maxWrongAnswers: number;
  livesSystem: boolean;
  timePerQuestion: number[];
  hintsUsed: number[];
  pausesUsed: number;
  currentStreak: number;
  longestStreak: number;
  quizSessionId: string;
  config: {
    questionCount: number;
    timeLimit: number;
    passingPercentage: number;
    livesSystem: boolean;
    maxWrongAnswers: number;
    pauseAllowed: boolean;
  };
}

export type RapidFireEvent =
  | { type: 'START' }
  | { type: 'ANSWER'; answerIndex: number }
  | { type: 'FEEDBACK_COMPLETE' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'LAST_QUESTION_ANSWERED' }
  | { type: 'LIVES_EXHAUSTED' }
  | { type: 'TIME_UP' }
  | { type: 'PAUSE' }
  | { type: 'UNPAUSE' }
  | { type: 'SUBMIT' }
  | { type: 'REVIEW' }
  | { type: 'VIEW_SUMMARY' }
  | { type: 'RESTART'; questions: Question[] }
  | { type: 'TICK' }
  | { type: 'GAME_OVER_DELAY_COMPLETE' }
  | { type: 'NAVIGATE_TO_QUESTION'; questionIndex: number };

export const rapidFireMachine = setup({
  types: {
    context: {} as RapidFireContext,
    events: {} as RapidFireEvent,
    input: {} as RapidFireContext,
  },
  actions: {
    recordAnswer: assign(({ context, event }) => {
      if (event.type !== 'ANSWER') return {};

      const newAnswers = [...context.userAnswers];
      newAnswers[context.currentQuestionIndex] = event.answerIndex;

      const isCorrect = event.answerIndex === context.quizQuestions[context.currentQuestionIndex].correctAnswer;
      const newWrongAnswerCount = isCorrect ? context.wrongAnswerCount : context.wrongAnswerCount + 1;

      return {
        userAnswers: newAnswers,
        wrongAnswerCount: newWrongAnswerCount,
        currentStreak: isCorrect ? context.currentStreak + 1 : 0,
        longestStreak: isCorrect
          ? Math.max(context.longestStreak, context.currentStreak + 1)
          : context.longestStreak,
      };
    }),

    advanceQuestion: assign(({ context }) => ({
      currentQuestionIndex: context.currentQuestionIndex + 1,
    })),

    decrementTimer: assign(({ context }) => {
      const newTimeRemaining = Math.max(0, context.timeRemaining - 1);
      const newTimePerQuestion = [...context.timePerQuestion];
      newTimePerQuestion[context.currentQuestionIndex] =
        (newTimePerQuestion[context.currentQuestionIndex] || 0) + 1;

      return {
        timeRemaining: newTimeRemaining,
        totalTimeElapsed: context.totalTimeElapsed + 1,
        timePerQuestion: newTimePerQuestion,
      };
    }),

    resetQuiz: assign(({ context, event }) => {
      if (event.type !== 'RESTART') return {};

      return {
        quizQuestions: event.questions,
        userAnswers: new Array(event.questions.length).fill(null),
        currentQuestionIndex: 0,
        wrongAnswerCount: 0,
        timeRemaining: context.config.timeLimit,
        totalTimeElapsed: 0,
        timePerQuestion: new Array(event.questions.length).fill(0),
        hintsUsed: [],
        pausesUsed: 0,
        currentStreak: 0,
        longestStreak: 0,
      };
    }),

    goToFirstAnsweredQuestion: assign(({ context }) => {
      const firstAnswered = context.quizQuestions.findIndex(
        (_, index) => context.userAnswers[index] !== null
      );
      return {
        currentQuestionIndex: firstAnswered >= 0 ? firstAnswered : 0,
      };
    }),

    goToSummary: assign(({ context }) => ({
      currentQuestionIndex: context.quizQuestions.length,
    })),

    incrementPauses: assign(({ context }) => ({
      pausesUsed: context.pausesUsed + 1,
    })),

    navigateToQuestion: assign(({ context, event }) => {
      if (event.type !== 'NAVIGATE_TO_QUESTION') return {};
      return {
        currentQuestionIndex: event.questionIndex,
      };
    }),
  },
  guards: {
    isLastQuestion: ({ context }) =>
      context.currentQuestionIndex >= context.quizQuestions.length - 1,

    hasLivesRemaining: ({ context }) =>
      !context.config.livesSystem || context.wrongAnswerCount < context.config.maxWrongAnswers,

    livesExhausted: ({ context }) =>
      context.config.livesSystem && context.wrongAnswerCount >= context.config.maxWrongAnswers,

    timerExpired: ({ context }) =>
      context.timeRemaining <= 0,
  },
  delays: {
    feedbackDelay: 1500,
    gameOverDelay: 2000,
  },
}).createMachine({
  id: 'rapidFire',
  initial: 'countdown',
  context: ({ input }) => input,

  states: {
    countdown: {
      on: {
        START: {
          target: 'playing',
        },
      },
    },

    playing: {
      entry: [],
      on: {
        ANSWER: {
          target: 'answerFeedback',
          actions: 'recordAnswer',
        },
        PAUSE: {
          target: 'paused',
          actions: 'incrementPauses',
        },
        TIME_UP: {
          target: 'quizComplete',
        },
        TICK: {
          actions: 'decrementTimer',
          guard: ({ context }) => context.timeRemaining > 0,
        },
      },
      always: [
        {
          target: 'quizComplete',
          guard: 'timerExpired',
        },
      ],
    },

    answerFeedback: {
      after: {
        feedbackDelay: [
          {
            target: 'gameOver',
            guard: 'livesExhausted',
          },
          {
            target: 'quizComplete',
            guard: 'isLastQuestion',
          },
          {
            target: 'playing',
            actions: 'advanceQuestion',
          },
        ],
      },
      on: {
        TICK: {
          actions: 'decrementTimer',
          guard: ({ context }) => context.timeRemaining > 0,
        },
      },
    },

    paused: {
      on: {
        UNPAUSE: {
          target: 'playing',
        },
      },
    },

    gameOver: {
      after: {
        gameOverDelay: {
          target: 'quizComplete',
        },
      },
    },

    quizComplete: {
      entry: 'goToFirstAnsweredQuestion',
      on: {
        REVIEW: {
          target: 'reviewMode',
        },
        VIEW_SUMMARY: {
          target: 'summary',
          actions: 'goToSummary',
        },
      },
      // Auto-transition to review mode
      after: {
        0: 'reviewMode',
      },
    },

    reviewMode: {
      on: {
        VIEW_SUMMARY: {
          target: 'summary',
          actions: 'goToSummary',
        },
        NAVIGATE_TO_QUESTION: {
          actions: 'navigateToQuestion',
        },
      },
    },

    summary: {
      on: {
        RESTART: {
          target: 'countdown',
          actions: 'resetQuiz',
        },
        REVIEW: {
          target: 'reviewMode',
          actions: 'goToFirstAnsweredQuestion',
        },
      },
    },
  },
});
