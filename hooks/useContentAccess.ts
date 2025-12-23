import { useAuth } from '@/contexts/AuthContext';
import type { StudentGradeLevel } from '@/lib/types';

/**
 * Hook to determine content access based on user's grade level assignment
 *
 * When a student is assigned to a grade level (e.g., '1-medio') by a teacher,
 * they should only see grade-specific content and not M1/M2 PAES content.
 */
export function useContentAccess() {
  const { user } = useAuth();

  // Student is a grade-level student if they have a gradeLevel assigned
  const isGradeLevelStudent = !!user?.gradeLevel;

  // The assigned grade (null for PAES students)
  const assignedGrade = user?.gradeLevel as StudentGradeLevel | undefined;

  // PAES students can access M1/M2 content
  const canAccessPAES = !isGradeLevelStudent;

  // Check if a specific grade can be accessed
  const canAccessGrade = (grade: string): boolean => {
    // PAES students can access all grades
    if (!isGradeLevelStudent) return true;
    // Grade-level students can only access their assigned grade
    return user?.gradeLevel === grade;
  };

  // Check if user is a teacher
  const isTeacher = user?.role === 'teacher' || user?.role === 'admin';

  return {
    isGradeLevelStudent,
    assignedGrade,
    canAccessPAES,
    canAccessGrade,
    isTeacher,
  };
}
