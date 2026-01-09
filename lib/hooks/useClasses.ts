/**
 * Custom hooks for class data fetching with SWR caching
 *
 * Benefits:
 * - Instant data on page reload (from cache)
 * - Automatic revalidation in background
 * - Deduplicates simultaneous requests
 * - Revalidates on window focus
 */

import useSWR from 'swr';
import {
  getClasses,
  getClass,
  getClassStudents,
  getClassAnalytics,
  createClass,
  updateClass,
  deleteClass,
  addStudentsToClass,
  removeStudentFromClass,
  getAvailableStudents,
  type TeacherClass,
  type ClassStudent,
  type ClassAnalytics,
  type CreateClassData,
  type UpdateClassData,
} from '../classApi';

/**
 * Hook to fetch all classes for the current teacher
 */
export function useClasses() {
  const { data, error, isLoading, mutate } = useSWR<TeacherClass[]>(
    '/api/classes',
    getClasses,
    {
      dedupingInterval: 30000,
      revalidateOnFocus: true,
      keepPreviousData: true,
    }
  );

  return {
    classes: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}

/**
 * Hook to fetch a single class by ID
 */
export function useClass(classId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<TeacherClass | null>(
    classId ? `/api/classes/${classId}` : null,
    async () => {
      if (!classId) return null;
      return getClass(classId);
    },
    {
      dedupingInterval: 20000,
      revalidateOnFocus: true,
      keepPreviousData: true,
    }
  );

  return {
    classData: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

/**
 * Hook to fetch students in a class
 */
export function useClassStudents(classId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<ClassStudent[]>(
    classId ? `/api/classes/${classId}/students` : null,
    async () => {
      if (!classId) return [];
      return getClassStudents(classId);
    },
    {
      dedupingInterval: 20000,
      revalidateOnFocus: true,
      keepPreviousData: true,
    }
  );

  return {
    students: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}

/**
 * Hook to fetch class analytics
 */
export function useClassAnalytics(classId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<ClassAnalytics | null>(
    classId ? `/api/classes/${classId}/analytics` : null,
    async () => {
      if (!classId) return null;
      return getClassAnalytics(classId);
    },
    {
      dedupingInterval: 60000, // Cache analytics for 1 minute
      revalidateOnFocus: true,
      keepPreviousData: true,
    }
  );

  return {
    analytics: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

/**
 * Hook for class mutations (create, update, delete)
 */
export function useClassMutations() {
  const { mutate: refreshClasses } = useSWR('/api/classes');

  const createNewClass = async (data: CreateClassData) => {
    const result = await createClass(data);
    if (result.success) {
      // Refresh the classes list
      refreshClasses();
    }
    return result;
  };

  const updateExistingClass = async (classId: string, data: UpdateClassData) => {
    const result = await updateClass(classId, data);
    if (result.success) {
      // Refresh the classes list and specific class
      refreshClasses();
    }
    return result;
  };

  const deleteExistingClass = async (classId: string) => {
    const result = await deleteClass(classId);
    if (result.success) {
      // Refresh the classes list
      refreshClasses();
    }
    return result;
  };

  return {
    createClass: createNewClass,
    updateClass: updateExistingClass,
    deleteClass: deleteExistingClass,
  };
}

/**
 * Hook to fetch all available students for a class (students not already enrolled)
 */
export function useAvailableStudents(classId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<{ id: string; displayName: string; email: string }[]>(
    classId ? `/api/classes/${classId}/students/available` : null,
    async () => {
      if (!classId) return [];
      return getAvailableStudents(classId);
    },
    {
      dedupingInterval: 10000,
      revalidateOnFocus: false,
    }
  );

  return {
    students: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}

/**
 * Hook for student enrollment mutations
 */
export function useStudentEnrollmentMutations(classId: string | null) {
  const { mutate: refreshStudents } = useSWR(
    classId ? `/api/classes/${classId}/students` : null
  );
  const { mutate: refreshAvailable } = useSWR(
    classId ? `/api/classes/${classId}/students/available` : null
  );
  const { mutate: refreshClass } = useSWR(classId ? `/api/classes/${classId}` : null);
  const { mutate: refreshClasses } = useSWR('/api/classes');

  const addStudents = async (studentIds: string[]) => {
    if (!classId) return { success: false, added: 0, errors: ['No class ID'] };

    const result = await addStudentsToClass(classId, studentIds);
    if (result.success) {
      // Refresh all related data
      refreshStudents();
      refreshAvailable();
      refreshClass();
      refreshClasses();
    }
    return result;
  };

  const removeStudent = async (studentId: string) => {
    if (!classId) return { success: false, error: 'No class ID' };

    const result = await removeStudentFromClass(classId, studentId);
    if (result.success) {
      // Refresh all related data
      refreshStudents();
      refreshAvailable();
      refreshClass();
      refreshClasses();
    }
    return result;
  };

  return {
    addStudents,
    removeStudent,
  };
}

// Re-export types for convenience
export type {
  TeacherClass,
  ClassStudent,
  ClassAnalytics,
  CreateClassData,
  UpdateClassData,
  ClassLevel,
} from '../classApi';
