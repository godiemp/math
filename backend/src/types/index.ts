export interface Question {
  id: string;
  topic: string;
  level: 'M1' | 'M2';
  question: string;
  questionLatex?: string;
  options: string[];
  optionsLatex?: string[];
  correctAnswer: number;
  explanation: string;
  explanationLatex?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  skills: string[];
  visualData?: {
    type: 'graph' | 'geometry' | 'table' | 'diagram';
    data: any;
  };
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: 'student' | 'admin';
  createdAt: number;
  updatedAt: number;
}

export interface PDFUpload {
  id: number;
  filename: string;
  fileSize: number;
  uploadedBy: string;
  status: 'processing' | 'completed' | 'failed';
  questionsExtracted: number;
  errorMessage?: string;
  uploadedAt: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
