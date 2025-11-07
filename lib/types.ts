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
