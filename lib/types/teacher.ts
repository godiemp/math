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
 * Subjects available for each class level
 * Based on Chilean National Curriculum (Currículum Nacional MINEDUC)
 * All levels teach all 4 subjects but with different topics
 */
export const SUBJECTS_BY_LEVEL: Record<ClassLevel, Subject[]> = {
  '1-medio': ['números', 'álgebra', 'geometría', 'probabilidad'], // All subjects
  '2-medio': ['números', 'álgebra', 'geometría', 'probabilidad'], // All subjects
  '3-medio': ['números', 'álgebra', 'geometría', 'probabilidad'], // All subjects
  '4-medio': ['números', 'álgebra', 'geometría', 'probabilidad'], // All subjects
  M1: ['números', 'álgebra', 'geometría', 'probabilidad'], // PAES M1 covers all
  M2: ['números', 'álgebra', 'geometría', 'probabilidad'], // PAES M2 covers all
  both: ['números', 'álgebra', 'geometría', 'probabilidad'], // Both levels cover all
};

/**
 * Curriculum topics by level and subject
 * Based on Chilean National Curriculum (Currículum Nacional MINEDUC 2024)
 */
export const CURRICULUM_TOPICS: Record<ClassLevel, Record<Subject, string[]>> = {
  '1-medio': {
    números: [
      'Operaciones con números racionales',
      'Potencias de base racional y exponente entero',
      'Aplicaciones a problemas de crecimiento/decrecimiento',
    ],
    álgebra: [
      'Productos notables',
      'Sistemas de ecuaciones lineales 2x2',
      'Relaciones lineales y gráficos',
    ],
    geometría: [
      'Área y perímetro de sectores circulares',
      'Volumen de conos',
      'Homotecia y teorema de Tales',
      'Modelos a escala',
    ],
    probabilidad: [
      'Distribuciones bivariadas (tablas doble entrada)',
      'Diagramas de dispersión',
      'Reglas aditiva y multiplicativa',
      'Análisis de comportamiento aleatorio',
    ],
  },
  '2-medio': {
    números: [
      'Operaciones con números reales',
      'Descomposición y propiedades de raíces',
      'Relación potencias, raíces y logaritmos',
    ],
    álgebra: [
      'Función cuadrática f(x) = ax² + bx + c',
      'Ecuaciones cuadráticas',
      'Funciones inversas',
      'Cambio exponencial e interés compuesto',
    ],
    geometría: [
      'Área y volumen de esferas',
      'Razones trigonométricas (seno, coseno, tangente)',
      'Composición y proyección de vectores',
    ],
    probabilidad: [
      'Variables aleatorias finitas',
      'Permutaciones y combinatoria',
      'Probabilidad en la toma de decisiones',
    ],
  },
  '3-medio': {
    números: ['Números complejos (C)', 'Operaciones con complejos'],
    álgebra: [
      'Funciones exponenciales',
      'Funciones logarítmicas',
      'Modelos de crecimiento y decrecimiento',
    ],
    geometría: [
      'Relaciones métricas en circunferencias',
      'Ángulos, arcos, cuerdas y secantes',
    ],
    probabilidad: [
      'Medidas de dispersión',
      'Probabilidad condicional',
      'Análisis de datos estadísticos para decisiones',
    ],
  },
  '4-medio': {
    números: ['Números complejos avanzados', 'Aplicaciones de complejos'],
    álgebra: [
      'Funciones trigonométricas',
      'Modelamiento matemático avanzado',
    ],
    geometría: [
      'Geometría analítica',
      'Vectores en el plano y espacio',
    ],
    probabilidad: [
      'Distribuciones de probabilidad',
      'Inferencia estadística básica',
      'Muestreo',
    ],
  },
  M1: {
    números: [
      'Números enteros y racionales',
      'Porcentajes',
      'Potencias y raíces',
    ],
    álgebra: [
      'Expresiones algebraicas',
      'Proporcionalidad',
      'Ecuaciones e inecuaciones',
      'Sistemas de ecuaciones',
      'Funciones lineales y cuadráticas',
    ],
    geometría: [
      'Teorema de Pitágoras',
      'Perímetros y áreas',
      'Volumen de prismas y cilindros',
      'Transformaciones geométricas',
    ],
    probabilidad: [
      'Tablas de frecuencia y gráficos',
      'Medidas de tendencia central',
      'Cuartiles y percentiles',
      'Reglas de probabilidad',
    ],
  },
  M2: {
    números: [
      'Números reales',
      'Logaritmos',
      'Problemas financieros',
    ],
    álgebra: [
      'Sistemas de ecuaciones avanzados',
      'Función potencia',
    ],
    geometría: [
      'Homotecia',
      'Trigonometría',
    ],
    probabilidad: [
      'Medidas de dispersión',
      'Probabilidad condicional',
      'Permutaciones y combinaciones',
      'Modelo binomial',
    ],
  },
  both: {
    números: [
      'Números enteros, racionales y reales',
      'Porcentajes',
      'Potencias, raíces y logaritmos',
      'Problemas financieros',
    ],
    álgebra: [
      'Expresiones algebraicas',
      'Proporcionalidad',
      'Ecuaciones, inecuaciones y sistemas',
      'Funciones lineales, cuadráticas y potencia',
    ],
    geometría: [
      'Teorema de Pitágoras',
      'Perímetros, áreas y volúmenes',
      'Transformaciones y homotecia',
      'Trigonometría',
    ],
    probabilidad: [
      'Estadística descriptiva completa',
      'Reglas de probabilidad',
      'Probabilidad condicional',
      'Técnicas de conteo',
    ],
  },
};

/**
 * Get subjects for a given class level
 */
export function getSubjectsForLevel(level: ClassLevel): Subject[] {
  return SUBJECTS_BY_LEVEL[level];
}

/**
 * Get curriculum topics for a given class level and subject
 */
export function getCurriculumTopics(level: ClassLevel, subject: Subject): string[] {
  return CURRICULUM_TOPICS[level]?.[subject] ?? [];
}

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
  level: ClassLevel;
  schoolName?: string;
  createdAt: number;
  updatedAt: number;
  // Computed fields
  studentCount: number;
  avgAccuracy?: number;
  lastActivity?: number;
}

/**
 * Subject accuracy breakdown - partial record to support levels with limited subjects
 */
export type SubjectAccuracy = Partial<Record<Subject, number>>;

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
  // Subject breakdown - partial to support levels with limited subjects (e.g., 1° Medio)
  subjectAccuracy: SubjectAccuracy;
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

// ============================================================================
// MOCK DATA FOR PROTOTYPING
// ============================================================================

export const MOCK_CLASSES: TeacherClass[] = [
  {
    id: 'class-1',
    name: '2°A Matemáticas',
    description: 'Clase de matemáticas para 2° medio, sección A',
    teacherId: 'teacher-1',
    inviteCode: 'ABC123XY',
    inviteCodeActive: true,
    maxStudents: 45,
    level: '2-medio',
    schoolName: 'Liceo de Aplicación',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 60 * 60 * 1000,
    studentCount: 32,
    avgAccuracy: 0.72,
    lastActivity: Date.now() - 3 * 60 * 60 * 1000,
  },
  {
    id: 'class-2',
    name: '4°B Matemáticas',
    description: 'Clase de matemáticas para 4° medio, sección B',
    teacherId: 'teacher-1',
    inviteCode: 'DEF456ZZ',
    inviteCodeActive: true,
    maxStudents: 45,
    level: '4-medio',
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
    schoolName: 'Liceo de Aplicación',
    createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 60 * 60 * 1000,
    studentCount: 18,
    avgAccuracy: 0.81,
    lastActivity: Date.now() - 30 * 60 * 1000,
  },
  {
    id: 'class-4',
    name: '1°C Matemáticas',
    description: 'Clase de matemáticas para 1° medio, sección C - Enfoque en números y álgebra',
    teacherId: 'teacher-1',
    inviteCode: 'PRIM1MED',
    inviteCodeActive: true,
    maxStudents: 40,
    level: '1-medio',
    schoolName: 'Colegio Santa María',
    createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 4 * 60 * 60 * 1000,
    studentCount: 35,
    avgAccuracy: 0.69,
    lastActivity: Date.now() - 5 * 60 * 60 * 1000,
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

/**
 * Mock students for 1° Medio class (class-4)
 * Based on Chilean National Curriculum - all 4 subjects taught at this level
 * Topics include: números racionales, productos notables, sectores circulares, distribuciones bivariadas
 */
export const MOCK_STUDENTS_1_MEDIO: ClassStudent[] = [
  {
    id: 'student-1m-1',
    displayName: 'Fernanda Núñez',
    email: 'fernanda.n@email.com',
    joinedAt: Date.now() - 40 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 98,
    accuracy: 0.74,
    lastActive: Date.now() - 1 * 60 * 60 * 1000,
    currentStreak: 12,
    longestStreak: 12,
    lessonsCompleted: 5,
    subjectAccuracy: {
      números: 0.78,
      álgebra: 0.70,
      geometría: 0.76,
      probabilidad: 0.72,
    },
  },
  {
    id: 'student-1m-2',
    displayName: 'Tomás Vargas',
    email: 'tomas.v@email.com',
    joinedAt: Date.now() - 38 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 67,
    accuracy: 0.62,
    lastActive: Date.now() - 3 * 60 * 60 * 1000,
    currentStreak: 2,
    longestStreak: 8,
    lessonsCompleted: 3,
    subjectAccuracy: {
      números: 0.68,
      álgebra: 0.55,
      geometría: 0.64,
      probabilidad: 0.60,
    },
  },
  {
    id: 'student-1m-3',
    displayName: 'Isidora Campos',
    email: 'isidora.c@email.com',
    joinedAt: Date.now() - 42 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 145,
    accuracy: 0.85,
    lastActive: Date.now() - 30 * 60 * 1000,
    currentStreak: 18,
    longestStreak: 18,
    lessonsCompleted: 8,
    subjectAccuracy: {
      números: 0.88,
      álgebra: 0.82,
      geometría: 0.86,
      probabilidad: 0.84,
    },
  },
  {
    id: 'student-1m-4',
    displayName: 'Matías Herrera',
    email: 'matias.h@email.com',
    joinedAt: Date.now() - 35 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 42,
    accuracy: 0.55,
    lastActive: Date.now() - 4 * 24 * 60 * 60 * 1000,
    currentStreak: 0,
    longestStreak: 3,
    lessonsCompleted: 2,
    subjectAccuracy: {
      números: 0.58,
      álgebra: 0.52,
      geometría: 0.54,
      probabilidad: 0.56,
    },
  },
  {
    id: 'student-1m-5',
    displayName: 'Catalina Reyes',
    email: 'catalina.r@email.com',
    joinedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    status: 'active',
    questionsAnswered: 112,
    accuracy: 0.79,
    lastActive: Date.now() - 2 * 60 * 60 * 1000,
    currentStreak: 9,
    longestStreak: 15,
    lessonsCompleted: 6,
    subjectAccuracy: {
      números: 0.82,
      álgebra: 0.76,
      geometría: 0.80,
      probabilidad: 0.78,
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

/**
 * Mock analytics for 1° Medio class (class-4)
 * Based on Chilean National Curriculum - all 4 subjects included
 * Topics: números racionales, productos notables, sectores circulares, distribuciones bivariadas
 */
export const MOCK_CLASS_ANALYTICS_1_MEDIO: ClassAnalytics = {
  totalStudents: 35,
  activeThisWeek: 28,
  avgAccuracy: 0.69,
  avgQuestionsPerStudent: 93,
  lessonsCompletedTotal: 124,
  subjectBreakdown: [
    { subject: 'números', avgAccuracy: 0.75, questionsAnswered: 1120 },
    { subject: 'álgebra', avgAccuracy: 0.63, questionsAnswered: 980 },
    { subject: 'geometría', avgAccuracy: 0.71, questionsAnswered: 720 },
    { subject: 'probabilidad', avgAccuracy: 0.68, questionsAnswered: 430 },
  ],
  weeklyActivity: [
    { day: 'Lun', students: 25, questions: 178 },
    { day: 'Mar', students: 28, questions: 210 },
    { day: 'Mié', students: 26, questions: 195 },
    { day: 'Jue', students: 30, questions: 245 },
    { day: 'Vie', students: 22, questions: 156 },
    { day: 'Sáb', students: 12, questions: 78 },
    { day: 'Dom', students: 8, questions: 45 },
  ],
  strugglingTopics: [
    // 1° Medio specific topics from Chilean curriculum
    { topic: 'Productos notables', avgAccuracy: 0.48, studentsCount: 22 },
    { topic: 'Sistemas de ecuaciones 2x2', avgAccuracy: 0.52, studentsCount: 19 },
    { topic: 'Homotecia y teorema de Tales', avgAccuracy: 0.56, studentsCount: 16 },
    { topic: 'Reglas de probabilidad', avgAccuracy: 0.59, studentsCount: 14 },
  ],
};

export const MOCK_AI_RECOMMENDATIONS: StudentAIRecommendation[] = [
  {
    studentId: 'student-1', // María González
    analysis:
      'María muestra un dominio sólido en todas las materias (82% general). Su punto más fuerte es geometría (88%) y su área de oportunidad es probabilidad (75%). Mantiene una racha activa de 7 días.',
    recommendation:
      'Continuar con el ritmo actual. Sugerimos profundizar en probabilidad condicional para alcanzar el nivel de sus otras materias.',
    suggestedContent: {
      id: 'ml-prob',
      title: 'Probabilidad Condicional',
      type: 'mini-lesson',
    },
    priority: 'low',
    generatedAt: Date.now(),
  },
  {
    studentId: 'student-2', // Juan Pérez
    analysis:
      'Juan ha estado inactivo por 2 días. Antes de eso, mostraba progreso en álgebra (mejoró de 45% a 55%). Su principal dificultad está en álgebra (55%), específicamente en ecuaciones con variables.',
    recommendation:
      'Práctica adicional de ecuaciones lineales antes de avanzar. Considerar contactar para re-engagement antes de que la brecha aumente.',
    suggestedContent: {
      id: 'pr-alg',
      title: 'Práctica: Ecuaciones Lineales',
      type: 'practice',
    },
    priority: 'high',
    generatedAt: Date.now(),
  },
  {
    studentId: 'student-3', // Camila Rodríguez
    analysis:
      'Camila domina todo el contenido con excelencia (91% general). Mantiene una racha impresionante de 21 días consecutivos. Su velocidad de respuesta está en el percentil 95 de la clase.',
    recommendation:
      'Lista para contenido avanzado. Sugerimos comenzar con material de preparación PAES M2 para mantener el desafío y evitar aburrimiento.',
    suggestedContent: {
      id: 'ml-func',
      title: 'Introducción a Funciones (M2)',
      type: 'mini-lesson',
    },
    priority: 'low',
    generatedAt: Date.now(),
  },
  {
    studentId: 'student-4', // Diego Muñoz
    analysis:
      'Diego necesita atención urgente. Su precisión general es 58% y ha estado inactivo por 5 días. Su mayor dificultad es álgebra (48%), donde confunde operaciones con variables.',
    recommendation:
      'Completar la mini-lección "Variables y Expresiones" antes de continuar. Es fundamental cerrar esta brecha para el currículum de este nivel.',
    suggestedContent: {
      id: 'ml-var',
      title: 'Variables y Expresiones',
      type: 'mini-lesson',
    },
    priority: 'high',
    generatedAt: Date.now(),
  },
  {
    studentId: 'student-5', // Valentina Silva
    analysis:
      'Valentina muestra un progreso consistente (76% general) con actividad regular. Sus materias están balanceadas, con geometría ligeramente más fuerte (78%).',
    recommendation:
      'Mantener el ritmo actual. Sugerimos práctica adicional en álgebra para consolidar antes del próximo tema.',
    suggestedContent: {
      id: 'pr-alg-2',
      title: 'Práctica: Factorización',
      type: 'practice',
    },
    priority: 'medium',
    generatedAt: Date.now(),
  },
  {
    studentId: 'student-6', // Sebastián Torres
    analysis:
      'Sebastián es nuevo en la clase (10 días) pero muestra buen progreso inicial (71% general). Mantiene una racha de 3 días y está desarrollando buenos hábitos de estudio.',
    recommendation:
      'Continuar con el ritmo actual. Monitorear su progreso en las próximas 2 semanas para confirmar la tendencia positiva.',
    suggestedContent: null,
    priority: 'medium',
    generatedAt: Date.now(),
  },
];

/**
 * Mock AI recommendations for 1° Medio students
 * Based on Chilean National Curriculum - recommendations cover all 4 subjects
 * 1° Medio topics: números racionales, productos notables, sectores circulares, distribuciones bivariadas
 */
export const MOCK_AI_RECOMMENDATIONS_1_MEDIO: StudentAIRecommendation[] = [
  {
    studentId: 'student-1m-1', // Fernanda Núñez
    analysis:
      'Fernanda muestra un buen desempeño en todas las materias (74% general). Sus fortalezas están en números (78%) y geometría (76%). Álgebra (70%) es su área de oportunidad, especialmente en productos notables.',
    recommendation:
      'Continuar con el ritmo actual. Sugerimos reforzar productos notables antes de pasar a sistemas de ecuaciones 2x2.',
    suggestedContent: {
      id: 'ml-prod-not',
      title: 'Productos Notables',
      type: 'mini-lesson',
    },
    priority: 'low',
    generatedAt: Date.now(),
  },
  {
    studentId: 'student-1m-2', // Tomás Vargas
    analysis:
      'Tomás tiene dificultades en álgebra (55%) y probabilidad (60%). En geometría (64%) muestra mejor comprensión del teorema de Tales, pero necesita refuerzo en sectores circulares.',
    recommendation:
      'Completar práctica de operaciones con racionales antes de avanzar con sistemas de ecuaciones. La base numérica es fundamental.',
    suggestedContent: {
      id: 'pr-num-rac',
      title: 'Práctica: Números Racionales',
      type: 'practice',
    },
    priority: 'high',
    generatedAt: Date.now(),
  },
  {
    studentId: 'student-1m-3', // Isidora Campos
    analysis:
      'Isidora domina todas las materias con excelencia (85% general). Destaca en números (88%) y geometría (86%). En probabilidad (84%) maneja bien las reglas aditiva y multiplicativa.',
    recommendation:
      'Lista para contenido desafiante. Sugerimos introducir problemas de modelamiento con gráficos lineales para preparar bases de 2° Medio.',
    suggestedContent: {
      id: 'ml-graf-lin',
      title: 'Gráficos y Relaciones Lineales',
      type: 'mini-lesson',
    },
    priority: 'low',
    generatedAt: Date.now(),
  },
  {
    studentId: 'student-1m-4', // Matías Herrera
    analysis:
      'Matías necesita atención urgente. Su precisión es baja en todas las materias (55% general). Álgebra (52%) y geometría (54%) son las áreas más críticas. Ha estado inactivo por 4 días.',
    recommendation:
      'Contactar al estudiante. Priorizar mini-lección de repaso de potencias con exponente entero antes de avanzar con productos notables.',
    suggestedContent: {
      id: 'ml-pot-exp',
      title: 'Potencias con Exponente Entero',
      type: 'mini-lesson',
    },
    priority: 'high',
    generatedAt: Date.now(),
  },
  {
    studentId: 'student-1m-5', // Catalina Reyes
    analysis:
      'Catalina muestra progreso consistente (79% general). Buen balance entre todas las materias: números (82%), geometría (80%), probabilidad (78%) y álgebra (76%). Su racha de 9 días indica buen compromiso.',
    recommendation:
      'Mantener el ritmo actual. Sugerimos práctica de sistemas de ecuaciones 2x2 para consolidar álgebra antes de avanzar.',
    suggestedContent: {
      id: 'pr-sist-ec',
      title: 'Práctica: Sistemas de Ecuaciones 2x2',
      type: 'practice',
    },
    priority: 'medium',
    generatedAt: Date.now(),
  },
];
