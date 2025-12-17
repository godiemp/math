/**
 * Teacher Portal Types
 *
 * Types for the teacher version of SimplePAES
 */

import { Level, Subject } from './core';

/**
 * Class/Course managed by a teacher
 */
export interface TeacherClass {
  id: string;
  name: string;
  description?: string;
  teacherId: string;
  inviteCode: string;
  inviteCodeActive: boolean;
  maxStudents: number;
  level: Level | 'both';
  schoolName?: string;
  createdAt: number;
  updatedAt: number;
  // Computed fields
  studentCount: number;
  avgAccuracy?: number;
  lastActivity?: number;
}

/**
 * Student in a teacher's class (with progress summary)
 */
export interface ClassStudent {
  id: string;
  displayName: string;
  email: string;
  joinedAt: number;
  status: 'active' | 'removed' | 'left';
  // Progress summary
  questionsAnswered: number;
  accuracy: number;
  lastActive?: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  // Subject breakdown
  subjectAccuracy: {
    números: number;
    álgebra: number;
    geometría: number;
    probabilidad: number;
  };
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

// ============================================================================
// MOCK DATA FOR PROTOTYPING
// ============================================================================

export const MOCK_CLASSES: TeacherClass[] = [
  {
    id: 'class-1',
    name: '8°A Matemáticas',
    description: 'Clase de matemáticas para 8° básico, sección A',
    teacherId: 'teacher-1',
    inviteCode: 'ABC123XY',
    inviteCodeActive: true,
    maxStudents: 45,
    level: 'M1',
    schoolName: 'Colegio San Patricio',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 60 * 60 * 1000,
    studentCount: 32,
    avgAccuracy: 0.72,
    lastActivity: Date.now() - 3 * 60 * 60 * 1000,
  },
  {
    id: 'class-2',
    name: '8°B Matemáticas',
    description: 'Clase de matemáticas para 8° básico, sección B',
    teacherId: 'teacher-1',
    inviteCode: 'DEF456ZZ',
    inviteCodeActive: true,
    maxStudents: 45,
    level: 'M1',
    schoolName: 'Colegio San Patricio',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 5 * 60 * 60 * 1000,
    studentCount: 28,
    avgAccuracy: 0.68,
    lastActivity: Date.now() - 24 * 60 * 60 * 1000,
  },
  {
    id: 'class-3',
    name: 'Preparación PAES - Tarde',
    description: 'Taller de preparación PAES para alumnos de 4° medio',
    teacherId: 'teacher-1',
    inviteCode: 'PAES2024',
    inviteCodeActive: true,
    maxStudents: 25,
    level: 'both',
    schoolName: 'Colegio San Patricio',
    createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 60 * 60 * 1000,
    studentCount: 18,
    avgAccuracy: 0.81,
    lastActivity: Date.now() - 30 * 60 * 1000,
  },
];

export const MOCK_STUDENTS: ClassStudent[] = [
  {
    id: 'student-1',
    displayName: 'María González',
    email: 'maria.g@email.com',
    joinedAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 156,
    accuracy: 0.82,
    lastActive: Date.now() - 2 * 60 * 60 * 1000,
    currentStreak: 7,
    longestStreak: 14,
    lessonsCompleted: 8,
    subjectAccuracy: {
      números: 0.85,
      álgebra: 0.78,
      geometría: 0.88,
      probabilidad: 0.75,
    },
  },
  {
    id: 'student-2',
    displayName: 'Juan Pérez',
    email: 'juan.p@email.com',
    joinedAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 89,
    accuracy: 0.65,
    lastActive: Date.now() - 48 * 60 * 60 * 1000,
    currentStreak: 0,
    longestStreak: 5,
    lessonsCompleted: 3,
    subjectAccuracy: {
      números: 0.70,
      álgebra: 0.55,
      geometría: 0.72,
      probabilidad: 0.62,
    },
  },
  {
    id: 'student-3',
    displayName: 'Camila Rodríguez',
    email: 'camila.r@email.com',
    joinedAt: Date.now() - 28 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 234,
    accuracy: 0.91,
    lastActive: Date.now() - 30 * 60 * 1000,
    currentStreak: 21,
    longestStreak: 21,
    lessonsCompleted: 12,
    subjectAccuracy: {
      números: 0.94,
      álgebra: 0.89,
      geometría: 0.92,
      probabilidad: 0.88,
    },
  },
  {
    id: 'student-4',
    displayName: 'Diego Muñoz',
    email: 'diego.m@email.com',
    joinedAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 45,
    accuracy: 0.58,
    lastActive: Date.now() - 5 * 24 * 60 * 60 * 1000,
    currentStreak: 0,
    longestStreak: 2,
    lessonsCompleted: 1,
    subjectAccuracy: {
      números: 0.62,
      álgebra: 0.48,
      geometría: 0.65,
      probabilidad: 0.55,
    },
  },
  {
    id: 'student-5',
    displayName: 'Valentina Silva',
    email: 'valentina.s@email.com',
    joinedAt: Date.now() - 22 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 178,
    accuracy: 0.76,
    lastActive: Date.now() - 6 * 60 * 60 * 1000,
    currentStreak: 4,
    longestStreak: 9,
    lessonsCompleted: 6,
    subjectAccuracy: {
      números: 0.80,
      álgebra: 0.72,
      geometría: 0.78,
      probabilidad: 0.74,
    },
  },
  {
    id: 'student-6',
    displayName: 'Sebastián Torres',
    email: 'sebastian.t@email.com',
    joinedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 67,
    accuracy: 0.71,
    lastActive: Date.now() - 12 * 60 * 60 * 1000,
    currentStreak: 3,
    longestStreak: 3,
    lessonsCompleted: 4,
    subjectAccuracy: {
      números: 0.75,
      álgebra: 0.68,
      geometría: 0.70,
      probabilidad: 0.72,
    },
  },
];

export const MOCK_CLASS_ANALYTICS: ClassAnalytics = {
  totalStudents: 32,
  activeThisWeek: 24,
  avgAccuracy: 0.72,
  avgQuestionsPerStudent: 87,
  lessonsCompletedTotal: 156,
  subjectBreakdown: [
    { subject: 'números', avgAccuracy: 0.75, questionsAnswered: 890 },
    { subject: 'álgebra', avgAccuracy: 0.68, questionsAnswered: 756 },
    { subject: 'geometría', avgAccuracy: 0.74, questionsAnswered: 623 },
    { subject: 'probabilidad', avgAccuracy: 0.71, questionsAnswered: 512 },
  ],
  weeklyActivity: [
    { day: 'Lun', students: 18, questions: 145 },
    { day: 'Mar', students: 22, questions: 189 },
    { day: 'Mié', students: 20, questions: 167 },
    { day: 'Jue', students: 24, questions: 201 },
    { day: 'Vie', students: 15, questions: 98 },
    { day: 'Sáb', students: 8, questions: 45 },
    { day: 'Dom', students: 5, questions: 23 },
  ],
  strugglingTopics: [
    { topic: 'Factorización', avgAccuracy: 0.52, studentsCount: 18 },
    { topic: 'Ecuaciones cuadráticas', avgAccuracy: 0.58, studentsCount: 15 },
    { topic: 'Probabilidad condicional', avgAccuracy: 0.61, studentsCount: 12 },
  ],
};
