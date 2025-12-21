/**
 * Types for the Knowledge Gap Diagnosis System
 *
 * This system verifies student self-assessments (knowledge declarations)
 * by presenting questions and using AI to analyze errors and detect
 * specific knowledge gaps.
 */

// ========================================
// Core Types
// ========================================

export type GapSeverity = 'critical' | 'moderate' | 'minor';

export type DiagnosisStatus = 'in_progress' | 'completed' | 'abandoned';

// ========================================
// Detected Gap Types
// ========================================

export interface DetectedGap {
  skillId: string;
  skillName: string;
  severity: GapSeverity;
  specificIssue: string;        // e.g., "Confundes el signo al mover términos"
  conceptMissing: string;       // e.g., "Propiedades de igualdad con signos"
  evidenceQuestionId: string;   // The question that revealed this gap
  userAnswer: number;
  correctAnswer: number;
  followUpExplanation?: string; // What the student said when asked to explain
}

export interface GapRecommendation {
  type: 'lesson' | 'practice' | 'prerequisite';
  skillId: string;
  skillName: string;
  reason: string;
  resourceId?: string;          // Lesson ID or practice session config
  priority: number;             // Higher = more urgent
}

// ========================================
// Diagnosis Session Types
// ========================================

export interface DiagnosisQuestion {
  questionId: string;
  skillId: string;
  skillName: string;
  userAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean | null;
  answeredAt: number | null;
  followUpResponse: string | null;
  detectedGap: DetectedGap | null;
}

export interface DiagnosisSession {
  id: string;
  userId: string;
  level: 'M1' | 'M2';
  skillsToVerify: string[];
  questions: DiagnosisQuestion[];
  status: DiagnosisStatus;
  startedAt: number;
  completedAt: number | null;
}

export interface DiagnosisResult {
  sessionId: string;
  userId: string;
  level: 'M1' | 'M2';

  // Summary
  totalQuestions: number;
  correctAnswers: number;

  // Skills verification
  verifiedSkills: string[];     // Skills the student demonstrated
  unverifiedSkills: string[];   // Skills with errors

  // Detected gaps (from AI analysis)
  gaps: DetectedGap[];

  // Recommendations
  recommendations: GapRecommendation[];

  // Timestamps
  completedAt: number;
}

// ========================================
// API Request/Response Types
// ========================================

export interface GetDiagnosisQuestionsRequest {
  skills: string[];
  level: 'M1' | 'M2';
  limit?: number;               // Default 5
}

export interface GetDiagnosisQuestionsResponse {
  sessionId: string;
  questions: Array<{
    id: string;
    skillId: string;
    skillName: string;
    question: string;
    questionLatex?: string;
    options: string[];
    optionsLatex?: string[];
    difficulty: string;
    subject: string;
  }>;
}

export interface SubmitAnswerRequest {
  sessionId: string;
  questionId: string;
  userAnswer: number;
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  correctAnswer: number;
  requiresFollowUp: boolean;    // True if wrong and we want explanation
}

export interface AnalyzeErrorRequest {
  sessionId: string;
  questionId: string;
  question: string;
  questionLatex?: string;
  options: string[];
  userAnswer: number;
  correctAnswer: number;
  followUpExplanation: string;
  skillId: string;
  skillName: string;
}

export interface AnalyzeErrorResponse {
  gap: DetectedGap;
}

export interface CompleteDiagnosisRequest {
  sessionId: string;
}

export interface CompleteDiagnosisResponse {
  result: DiagnosisResult;
}

// ========================================
// Database Types
// ========================================

export interface SkillDiagnosisRecord {
  id: number;
  userId: string;
  skillCode: string;
  declaredKnows: boolean;
  verifiedKnows: boolean;
  specificGap: string | null;
  diagnosedAt: number;
}

export interface DiagnosisSessionRecord {
  id: string;
  userId: string;
  level: 'M1' | 'M2';
  skillsToVerify: string[];
  questionsData: DiagnosisQuestion[];
  status: DiagnosisStatus;
  startedAt: number;
  completedAt: number | null;
}

// ========================================
// AI Prompt Types
// ========================================

export interface AIErrorAnalysisInput {
  question: string;
  questionLatex?: string;
  options: string[];
  userAnswer: number;
  correctAnswer: number;
  followUpExplanation: string;
  skillId: string;
  skillName: string;
}

export interface AIErrorAnalysisOutput {
  specificIssue: string;
  conceptMissing: string;
  severity: GapSeverity;
}
