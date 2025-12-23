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
