/**
 * Class API Client
 * Provides functions to interact with the class management backend API
 */

import { api } from './api-client';

// Types for the class management system
export type ClassLevel =
  | '1-medio'
  | '2-medio'
  | '3-medio'
  | '4-medio'
  | 'M1'
  | 'M2'
  | 'both';

export interface TeacherClass {
  id: string;
  name: string;
  description: string | null;
  teacherId: string;
  level: ClassLevel;
  schoolName: string | null;
  maxStudents: number;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
  studentCount: number;
  avgAccuracy: number | null;
  lastActivity: number | null;
}

export interface ClassStudent {
  id: string;
  displayName: string;
  email: string;
  enrolledAt: number;
  status: 'active' | 'removed';
  questionsAnswered: number;
  accuracy: number;
  lastActive: number | null;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
}

export interface ClassAnalytics {
  totalStudents: number;
  activeThisWeek: number;
  avgAccuracy: number;
  avgQuestionsPerStudent: number;
  subjectBreakdown: {
    subject: string;
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

export interface CreateClassData {
  name: string;
  description?: string;
  level: ClassLevel;
  schoolName?: string;
  maxStudents?: number;
}

export interface UpdateClassData {
  name?: string;
  description?: string;
  level?: ClassLevel;
  schoolName?: string;
  maxStudents?: number;
  isActive?: boolean;
}

// Response types
interface ClassesResponse {
  classes: TeacherClass[];
}

interface ClassResponse {
  class: TeacherClass;
  success?: boolean;
}

interface StudentsResponse {
  students: ClassStudent[];
}

interface AnalyticsResponse {
  analytics: ClassAnalytics;
}

interface SearchStudentsResponse {
  students: { id: string; displayName: string; email: string }[];
}

interface AddStudentsResponse {
  success: boolean;
  added: number;
  errors: string[];
  message?: string;
}

interface MessageResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Get all classes for the current teacher
 */
export async function getClasses(): Promise<TeacherClass[]> {
  const response = await api.get<ClassesResponse>('/api/classes');

  if (response.error) {
    console.error('Failed to fetch classes:', response.error);
    return [];
  }

  return response.data?.classes || [];
}

/**
 * Get a single class by ID
 */
export async function getClass(classId: string): Promise<TeacherClass | null> {
  const response = await api.get<ClassResponse>(`/api/classes/${classId}`);

  if (response.error) {
    console.error('Failed to fetch class:', response.error);
    return null;
  }

  return response.data?.class || null;
}

/**
 * Create a new class
 */
export async function createClass(
  data: CreateClassData
): Promise<{ success: boolean; class?: TeacherClass; error?: string }> {
  const response = await api.post<ClassResponse>('/api/classes', data);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to create class',
    };
  }

  return {
    success: true,
    class: response.data?.class,
  };
}

/**
 * Update a class
 */
export async function updateClass(
  classId: string,
  data: UpdateClassData
): Promise<{ success: boolean; class?: TeacherClass; error?: string }> {
  const response = await api.put<ClassResponse>(`/api/classes/${classId}`, data);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to update class',
    };
  }

  return {
    success: true,
    class: response.data?.class,
  };
}

/**
 * Delete a class
 */
export async function deleteClass(
  classId: string
): Promise<{ success: boolean; error?: string }> {
  const response = await api.delete<MessageResponse>(`/api/classes/${classId}`);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to delete class',
    };
  }

  return { success: true };
}

/**
 * Get students in a class
 */
export async function getClassStudents(classId: string): Promise<ClassStudent[]> {
  const response = await api.get<StudentsResponse>(`/api/classes/${classId}/students`);

  if (response.error) {
    console.error('Failed to fetch class students:', response.error);
    return [];
  }

  return response.data?.students || [];
}

/**
 * Get class analytics
 */
export async function getClassAnalytics(classId: string): Promise<ClassAnalytics | null> {
  const response = await api.get<AnalyticsResponse>(`/api/classes/${classId}/analytics`);

  if (response.error) {
    console.error('Failed to fetch class analytics:', response.error);
    return null;
  }

  return response.data?.analytics || null;
}

/**
 * Add students to a class
 */
export async function addStudentsToClass(
  classId: string,
  studentIds: string[]
): Promise<{ success: boolean; added: number; errors: string[] }> {
  const response = await api.post<AddStudentsResponse>(
    `/api/classes/${classId}/students`,
    { studentIds }
  );

  if (response.error) {
    return {
      success: false,
      added: 0,
      errors: [response.error.error || 'Failed to add students'],
    };
  }

  return {
    success: response.data?.success || false,
    added: response.data?.added || 0,
    errors: response.data?.errors || [],
  };
}

/**
 * Remove a student from a class
 */
export async function removeStudentFromClass(
  classId: string,
  studentId: string
): Promise<{ success: boolean; error?: string }> {
  const response = await api.delete<MessageResponse>(
    `/api/classes/${classId}/students/${studentId}`
  );

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to remove student',
    };
  }

  return { success: true };
}

/**
 * Get all students available to add to a class
 */
export async function getAvailableStudents(
  classId: string
): Promise<{ id: string; displayName: string; email: string }[]> {
  const response = await api.get<SearchStudentsResponse>(
    `/api/classes/${classId}/students/available`
  );

  if (response.error) {
    console.error('Failed to get available students:', response.error);
    return [];
  }

  return response.data?.students || [];
}

// Response type for create student
interface CreateStudentResponse {
  success: boolean;
  student?: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    gradeLevel: string;
  };
  credentials?: {
    username: string;
    password: string;
  };
  error?: string;
  message?: string;
}

/**
 * Create a new student and enroll them in the class
 */
export async function createStudentInClass(
  classId: string,
  firstName: string,
  lastName: string
): Promise<CreateStudentResponse> {
  const response = await api.post<CreateStudentResponse>(
    `/api/classes/${classId}/students/create`,
    { firstName, lastName }
  );

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to create student',
    };
  }

  return {
    success: response.data?.success || false,
    student: response.data?.student,
    credentials: response.data?.credentials,
    message: response.data?.message,
  };
}

/**
 * Move a student from one class to another
 */
export async function moveStudentToClass(
  sourceClassId: string,
  studentId: string,
  targetClassId: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  const response = await api.post<MessageResponse>(
    `/api/classes/${sourceClassId}/students/${studentId}/move`,
    { targetClassId }
  );

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to move student',
    };
  }

  return {
    success: response.data?.success || false,
    message: response.data?.message,
  };
}
