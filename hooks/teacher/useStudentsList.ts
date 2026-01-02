'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getStudents,
  assignStudentGrade,
  type StudentForTeacher,
  type GetStudentsParams,
} from '@/lib/api/teacher';
import type { StudentGradeLevel } from '@/lib/types';

export interface UseStudentsListReturn {
  /** List of students */
  students: StudentForTeacher[];
  /** Loading state */
  loading: boolean;
  /** Error message if any */
  error: string | null;
  /** Success message for feedback */
  successMessage: string | null;
  /** ID of student being updated */
  updatingStudentId: string | null;
  /** Current search query */
  searchQuery: string;
  /** Current grade filter */
  filterGrade: string;
  /** Update search query */
  setSearchQuery: (query: string) => void;
  /** Update grade filter */
  setFilterGrade: (grade: string) => void;
  /** Reload the students list */
  loadStudents: () => Promise<void>;
  /** Handle grade change for a student */
  handleGradeChange: (studentId: string, gradeLevel: StudentGradeLevel | null) => Promise<void>;
  /** Clear all filters */
  clearFilters: () => void;
  /** Set error message */
  setError: (error: string | null) => void;
}

export function useStudentsList(): UseStudentsListReturn {
  const [students, setStudents] = useState<StudentForTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [updatingStudentId, setUpdatingStudentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: GetStudentsParams = {};
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      if (filterGrade !== 'all') {
        params.gradeLevel = filterGrade as StudentGradeLevel | 'unassigned';
      }

      const response = await getStudents(params);
      if (response.error) {
        throw new Error(response.error.error);
      }
      setStudents(response.data?.students || []);
    } catch (err) {
      console.error('Error loading students:', err);
      setError('Error al cargar estudiantes. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filterGrade]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleGradeChange = useCallback(
    async (studentId: string, gradeLevel: StudentGradeLevel | null) => {
      try {
        setUpdatingStudentId(studentId);
        setError(null);

        const response = await assignStudentGrade(studentId, gradeLevel);

        if (response.error) {
          throw new Error(response.error.error);
        }

        setStudents((prev) =>
          prev.map((s) =>
            s.id === studentId
              ? { ...s, gradeLevel: response.data?.student.gradeLevel || null }
              : s
          )
        );

        setSuccessMessage(response.data?.message || 'Nivel asignado correctamente');
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        console.error('Error assigning grade:', err);
        setError('Error al asignar nivel. Por favor intenta de nuevo.');
      } finally {
        setUpdatingStudentId(null);
      }
    },
    []
  );

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setFilterGrade('all');
  }, []);

  return useMemo(
    () => ({
      students,
      loading,
      error,
      successMessage,
      updatingStudentId,
      searchQuery,
      filterGrade,
      setSearchQuery,
      setFilterGrade,
      loadStudents,
      handleGradeChange,
      clearFilters,
      setError,
    }),
    [
      students,
      loading,
      error,
      successMessage,
      updatingStudentId,
      searchQuery,
      filterGrade,
      loadStudents,
      handleGradeChange,
      clearFilters,
    ]
  );
}
