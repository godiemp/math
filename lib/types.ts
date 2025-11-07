export interface Question {
  id: string;
  topic: string;
  level: 'M1' | 'M2';
  question: string;
  // LaTeX version of question (optional, if present will render as math)
  questionLatex?: string;
  options: string[];
  // LaTeX versions of options (optional)
  optionsLatex?: string[];
  correctAnswer: number;
  explanation: string;
  // LaTeX version of explanation (optional)
  explanationLatex?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  // Subject area for better categorization
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  // Additional rendering metadata
  visualData?: {
    type: 'graph' | 'geometry' | 'table' | 'diagram';
    data: any;
  };
}

export interface UserProgress {
  questionsAnswered: number;
  correctAnswers: number;
  topicProgress: Record<string, { total: number; correct: number }>;
}

export interface QuestionAttempt {
  questionId: string;
  question: string;
  topic: string;
  level: 'M1' | 'M2';
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  timestamp: number;
  options: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// User authentication types
export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: 'student' | 'admin';
  createdAt: number;
}

// Live practice session types
export interface LiveSession {
  id: string;
  name: string;
  description?: string;
  level: 'M1' | 'M2';
  hostId: string;
  hostName: string;
  questions: Question[];
  participants: SessionParticipant[];
  status: 'scheduled' | 'waiting' | 'active' | 'completed' | 'cancelled';
  currentQuestionIndex: number;
  createdAt: number;
  scheduledStartTime?: number; // Unix timestamp for scheduled sessions
  startedAt?: number;
  completedAt?: number;
  maxParticipants: number;
  isScheduled: boolean; // true for admin-scheduled sessions, false for instant sessions
}

export interface SessionParticipant {
  userId: string;
  username: string;
  displayName: string;
  answers: (number | null)[];
  score: number;
  joinedAt: number;
  isReady: boolean;
}

export interface LiveSessionAnswer {
  sessionId: string;
  userId: string;
  questionIndex: number;
  answer: number;
  timestamp: number;
}
