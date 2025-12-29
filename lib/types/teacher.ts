/**
 * Teacher Portal Types
 *
 * Types for the teacher version of SimplePAES
 */

import { Subject } from './core';

/**
 * Class levels - supports both grade levels and PAES prep
 */
export type ClassLevel =
  | '1-medio' // 1° Medio
  | '2-medio' // 2° Medio
  | '3-medio' // 3° Medio
  | '4-medio' // 4° Medio
  | 'M1' // PAES M1 (básico)
  | 'M2' // PAES M2 (avanzado)
  | 'both'; // M1 + M2

export const CLASS_LEVEL_LABELS: Record<ClassLevel, string> = {
  '1-medio': '1° Medio',
  '2-medio': '2° Medio',
  '3-medio': '3° Medio',
  '4-medio': '4° Medio',
  M1: 'PAES M1',
  M2: 'PAES M2',
  both: 'PAES M1+M2',
};

export const CLASS_LEVEL_OPTIONS = [
  { value: '1-medio' as ClassLevel, label: '1° Medio', desc: 'Primer año' },
  { value: '2-medio' as ClassLevel, label: '2° Medio', desc: 'Segundo año' },
  { value: '3-medio' as ClassLevel, label: '3° Medio', desc: 'Tercer año' },
  { value: '4-medio' as ClassLevel, label: '4° Medio', desc: 'Cuarto año' },
  { value: 'M1' as ClassLevel, label: 'PAES M1', desc: 'Competencia Matemática 1' },
  { value: 'M2' as ClassLevel, label: 'PAES M2', desc: 'Competencia Matemática 2' },
  { value: 'both' as ClassLevel, label: 'PAES M1+M2', desc: 'Ambas competencias' },
];

/**
 * Class/Course managed by a teacher
 */
export interface TeacherClass {
  id: string;
  name: string;
  description?: string | null;
  teacherId: string;
  maxStudents: number;
  level: ClassLevel;
  schoolName?: string | null;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
  // Computed fields
  studentCount: number;
  avgAccuracy?: number | null;
  lastActivity?: number | null;
}

/**
 * Student in a teacher's class (with progress summary)
 */
export interface ClassStudent {
  id: string;
  displayName: string;
  email: string;
  enrolledAt: number;
  status: 'active' | 'removed';
  // Progress summary
  questionsAnswered: number;
  accuracy: number;
  lastActive?: number | null;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
}

/**
 * Lesson progress for a student
 */
export interface StudentLessonProgress {
  lessonId: string;
  lessonTitle: string;
  startedAt?: number;
  completedAt?: number;
  currentStep: number;
  totalSteps: number;
  verifyAttempts: number;
  verifyCorrect: number;
}

/**
 * Class-level analytics
 */
export interface ClassAnalytics {
  totalStudents: number;
  activeThisWeek: number;
  avgAccuracy: number;
  avgQuestionsPerStudent: number;
  lessonsCompletedTotal: number;
  subjectBreakdown: {
    subject: Subject;
    avgAccuracy: number;
    questionsAnswered: number;
  }[];
  weeklyActivity: {
    day: string;
    students: number;
    questions: number;
  }[];
  strugglingTopics: {
    topic: string;
    avgAccuracy: number;
    studentsCount: number;
  }[];
}

/**
 * AI-generated recommendation for a student
 */
export interface StudentAIRecommendation {
  studentId: string;
  analysis: string; // AI-generated analysis of student
  recommendation: string; // What the AI suggests
  suggestedContent: {
    id: string;
    title: string;
    type: 'mini-lesson' | 'practice';
  } | null;
  priority: 'high' | 'medium' | 'low'; // Visual indicator
  generatedAt: number;
}

