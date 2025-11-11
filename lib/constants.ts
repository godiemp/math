/**
 * Application Constants
 *
 * Centralized location for all magic numbers, strings, and configuration values.
 * This improves AI readability and makes the codebase easier to maintain.
 */

// ============================================================================
// QUIZ CONFIGURATION
// ============================================================================

/**
 * Default number of questions in a quiz
 */
export const DEFAULT_QUESTION_COUNT = 10;

/**
 * Time limits for rapidfire mode (in seconds) based on difficulty
 */
export const RAPIDFIRE_TIME_LIMITS = {
  easy: 25 * 60,      // 25 minutes = 1500 seconds
  medium: 18 * 60,    // 18 minutes = 1080 seconds
  hard: 12 * 60,      // 12 minutes = 720 seconds
  extreme: 10 * 60,   // 10 minutes = 600 seconds
} as const;

/**
 * Comprehensive configuration for each rapid fire difficulty level
 * Scoring system removed - focus on learning and accuracy
 */
export const RAPIDFIRE_CONFIG = {
  easy: {
    timeLimit: 10 * 60,           // 10 minutes
    questionCount: 5,              // 5 questions
    pauseAllowed: true,            // Can pause unlimited times
    livesSystem: false,            // No lives limit
    maxWrongAnswers: Infinity,     // Unlimited wrong answers
    passingPercentage: 60,         // 60% to pass
  },
  medium: {
    timeLimit: 10 * 60,           // 10 minutes
    questionCount: 8,              // 8 questions
    pauseAllowed: false,           // No pause
    livesSystem: false,            // No lives limit
    maxWrongAnswers: Infinity,     // Unlimited wrong answers
    passingPercentage: 70,         // 70% to pass
  },
  hard: {
    timeLimit: 10 * 60,           // 10 minutes
    questionCount: 10,             // 10 questions
    pauseAllowed: false,           // No pause
    livesSystem: true,             // Lives system enabled
    maxWrongAnswers: 2,            // 2 wrong answers allowed, 3rd ends quiz immediately
    passingPercentage: 75,         // 75% to pass
  },
  extreme: {
    timeLimit: 10 * 60,           // 10 minutes
    questionCount: 12,             // 12 questions
    pauseAllowed: false,           // No pause
    livesSystem: true,             // Lives system enabled
    maxWrongAnswers: 1,            // 1 wrong answer allowed, 2nd ends quiz immediately
    passingPercentage: 80,         // 80% to pass
    timeBackPerCorrect: 5,         // +5 seconds back per correct answer
  },
} as const;

/**
 * Default time limit for rapidfire mode (medium difficulty)
 */
export const DEFAULT_RAPIDFIRE_TIME_LIMIT = RAPIDFIRE_TIME_LIMITS.medium;

// ============================================================================
// ANIMATION TIMINGS (in milliseconds)
// ============================================================================

/**
 * Zen mode intro animation phase durations
 */
export const ZEN_INTRO_TIMINGS = {
  fadeIn: 1000,       // Fade-in phase duration
  breathe: 2500,      // Breathing animation phase duration
  fadeOut: 800,       // Fade-out phase duration
} as const;

/**
 * Rapidfire mode countdown timings
 */
export const RAPIDFIRE_COUNTDOWN = {
  initial: 3,         // Countdown starts at 3 seconds
  goDelay: 800,       // Show "GO!" for 800ms before starting
} as const;

// ============================================================================
// SKILL PROGRESS & MASTERY
// ============================================================================

/**
 * Accuracy threshold for mastered skill (percentage)
 */
export const MASTERY_THRESHOLD = 80;

/**
 * Accuracy threshold for learning skill (percentage)
 */
export const LEARNING_THRESHOLD = 60;

/**
 * Minimum number of attempts required to mark a skill as "mastered"
 */
export const MIN_ATTEMPTS_FOR_MASTERY = 3;

/**
 * Default number of recommended skills to show
 */
export const DEFAULT_RECOMMENDED_SKILLS_LIMIT = 5;

// ============================================================================
// SESSION CONFIGURATION
// ============================================================================

/**
 * Default maximum participants for a session
 * (Set high to effectively have no limit)
 */
export const DEFAULT_MAX_PARTICIPANTS = 1000000;

/**
 * How many minutes before scheduled start time the lobby opens
 */
export const LOBBY_OPEN_MINUTES_BEFORE_START = 15;

/**
 * Time threshold for considering a session "upcoming" (in milliseconds)
 * Used to adjust polling frequency
 */
export const UPCOMING_SESSION_THRESHOLD = 5 * 60 * 1000; // 5 minutes

// ============================================================================
// DATA FETCHING & POLLING (in milliseconds)
// ============================================================================

/**
 * SWR cache deduplication intervals
 */
export const SWR_DEDUPING_INTERVALS = {
  sessions: 30000,        // 30 seconds for session lists
  singleSession: 20000,   // 20 seconds for individual session
} as const;

/**
 * Polling intervals based on session state
 */
export const POLLING_INTERVALS = {
  noSessions: 30000,      // 30 seconds when no sessions exist
  activeSessions: 10000,  // 10 seconds when sessions are active/lobby
  upcomingSessions: 15000, // 15 seconds when sessions starting soon
  scheduled: 30000,       // 30 seconds for far-future scheduled sessions
  activeSession: 5000,    // 5 seconds for viewing a single active session
  lobbySession: 10000,    // 10 seconds for viewing a session in lobby
} as const;

// ============================================================================
// DATABASE CONFIGURATION
// ============================================================================

/**
 * PostgreSQL connection pool settings
 */
export const DB_POOL_CONFIG = {
  max: 20,              // Maximum number of connections in pool
  idleTimeout: 30000,   // Idle connection timeout (30 seconds)
} as const;

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

/**
 * LocalStorage key prefixes and complete keys
 */
export const STORAGE_KEYS = {
  // Progress tracking
  progressPrefix: 'simplepaes-progress-',      // Suffix: M1 or M2
  historyPrefix: 'simplepaes-history-',        // Suffix: M1 or M2
  lastConfigPrefix: 'simplepaes-last-config-', // Suffix: M1 or M2

  // Quiz preferences
  showTimer: 'quiz-show-timer',

  // Authentication
  accessToken: 'simplepaes-access-token',
  refreshToken: 'simplepaes-refresh-token',
  currentUser: 'simplepaes-current-user',

  // SWR cache
  swrCache: 'app-cache',
} as const;

/**
 * Helper functions to generate storage keys
 */
export const getProgressKey = (level: 'M1' | 'M2') => `${STORAGE_KEYS.progressPrefix}${level}`;
export const getHistoryKey = (level: 'M1' | 'M2') => `${STORAGE_KEYS.historyPrefix}${level}`;
export const getLastConfigKey = (level: 'M1' | 'M2') => `${STORAGE_KEYS.lastConfigPrefix}${level}`;

// ============================================================================
// API ENDPOINTS
// ============================================================================

/**
 * Backend API endpoint paths
 */
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    me: '/api/auth/me',
  },

  // Sessions
  sessions: {
    list: '/api/sessions',
    create: '/api/sessions',
    get: (id: string) => `/api/sessions/${id}`,
    update: (id: string) => `/api/sessions/${id}`,
    delete: (id: string) => `/api/sessions/${id}`,
    cancel: (id: string) => `/api/sessions/${id}/cancel`,
    register: (id: string) => `/api/sessions/${id}/register`,
    unregister: (id: string) => `/api/sessions/${id}/unregister`,
    updateStatuses: '/api/sessions/update-statuses',
  },

  // Streak tracking
  streak: {
    update: '/api/streak/update',
  },

  // Configuration
  config: '/api/config',
} as const;

// ============================================================================
// TIME FORMATTING
// ============================================================================

/**
 * Countdown timer display settings
 */
export const TIMER_COLOR_THRESHOLDS = {
  good: 50,      // >50% time remaining = green
  warning: 25,   // >25% time remaining = yellow
  // <25% time remaining = red
} as const;

// ============================================================================
// QUESTION DEFAULTS
// ============================================================================

/**
 * Default number of questions to fetch for official PAES quiz
 */
export const OFFICIAL_PAES_QUESTION_COUNT = 65;
