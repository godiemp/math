/**
 * Teacher API Client Functions
 *
 * Functions for teacher-related operations (student management, grade assignment)
 */

import { api } from '../api-client';
import type { StudentGradeLevel } from '../types/core';

// Types for teacher API responses
export interface StudentForTeacher {
  id: string;
  username: string;
  email: string;
  displayName: string;
  gradeLevel: StudentGradeLevel | null;
  assignedByTeacherId: string | null;
  createdAt: number;
  lastPracticeDate: string | null;
}

export interface GetStudentsResponse {
  students: StudentForTeacher[];
}

export interface AssignGradeLevelResponse {
  success: boolean;
  message: string;
  student: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    gradeLevel: StudentGradeLevel | null;
    assignedByTeacherId: string | null;
  };
}

export interface GetStudentsParams {
  gradeLevel?: StudentGradeLevel | 'unassigned' | 'all';
  search?: string;
  assignedOnly?: boolean;
}

/**
 * Get all students (for teacher to assign grade levels)
 */
export async function getStudents(params?: GetStudentsParams) {
  const searchParams = new URLSearchParams();

  if (params?.gradeLevel) {
    searchParams.set('gradeLevel', params.gradeLevel);
  }
  if (params?.search) {
    searchParams.set('search', params.search);
  }
  if (params?.assignedOnly) {
    searchParams.set('assignedOnly', 'true');
  }

  const query = searchParams.toString();
  const url = query ? `/api/teacher/students?${query}` : '/api/teacher/students';

  return api.get<GetStudentsResponse>(url);
}

/**
 * Get students assigned to the current teacher
 */
export async function getMyStudents() {
  return api.get<GetStudentsResponse>('/api/teacher/my-students');
}

/**
 * Assign a grade level to a student
 */
export async function assignStudentGrade(
  studentId: string,
  gradeLevel: StudentGradeLevel | null
) {
  return api.put<AssignGradeLevelResponse>(
    `/api/teacher/students/${studentId}/grade`,
    { gradeLevel }
  );
}

// ============================================================================
// STUDENT ACCOUNT CREATION
// ============================================================================

export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  gradeLevel: StudentGradeLevel;
}

export interface CreateStudentResponse {
  success: boolean;
  student: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    gradeLevel: StudentGradeLevel;
  };
  credentials: {
    username: string;
    password: string;
  };
}

export interface ResetPasswordResponse {
  success: boolean;
  credentials: {
    password: string;
  };
}

export interface DeleteStudentResponse {
  success: boolean;
  message: string;
}

/**
 * Create a new student account linked to the current teacher
 */
export async function createStudent(data: CreateStudentRequest) {
  return api.post<CreateStudentResponse>('/api/teacher/students', data);
}

/**
 * Reset a student's password
 */
export async function resetStudentPassword(studentId: string) {
  return api.post<ResetPasswordResponse>(`/api/teacher/students/${studentId}/reset-password`, {});
}

/**
 * Delete a student account
 */
export async function deleteStudent(studentId: string) {
  return api.delete<DeleteStudentResponse>(`/api/teacher/students/${studentId}`);
}
