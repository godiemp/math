'use client';

import { useState, useCallback, useMemo } from 'react';
import { resetStudentPassword, deleteStudent } from '@/lib/api/teacher';

export interface UseStudentActionsOptions {
  /** Callback when password is reset successfully */
  onPasswordReset?: (studentName: string, password: string) => void;
  /** Callback when student is deleted successfully */
  onStudentDeleted?: () => void;
  /** Callback when an error occurs */
  onError?: (error: string) => void;
}

export interface UseStudentActionsReturn {
  /** ID of student being processed */
  processingStudentId: string | null;
  /** Reset a student's password */
  resetPassword: (studentId: string, studentName: string) => Promise<void>;
  /** Delete a student */
  deleteStudentAccount: (studentId: string) => Promise<void>;
}

export function useStudentActions(
  options: UseStudentActionsOptions = {}
): UseStudentActionsReturn {
  const { onPasswordReset, onStudentDeleted, onError } = options;

  const [processingStudentId, setProcessingStudentId] = useState<string | null>(null);

  const resetPassword = useCallback(
    async (studentId: string, studentName: string) => {
      try {
        setProcessingStudentId(studentId);

        const response = await resetStudentPassword(studentId);

        if (response.error) {
          throw new Error(response.error.error);
        }

        const newPassword = response.data?.credentials.password;
        if (newPassword) {
          onPasswordReset?.(studentName, newPassword);
        }
      } catch (err) {
        console.error('Error resetting password:', err);
        onError?.('Error al resetear contraseña. Por favor intenta de nuevo.');
      } finally {
        setProcessingStudentId(null);
      }
    },
    [onPasswordReset, onError]
  );

  const deleteStudentAccount = useCallback(
    async (studentId: string) => {
      try {
        setProcessingStudentId(studentId);

        const response = await deleteStudent(studentId);

        if (response.error) {
          throw new Error(response.error.error);
        }

        onStudentDeleted?.();
      } catch (err) {
        console.error('Error deleting student:', err);
        onError?.('Error al eliminar estudiante. Por favor intenta de nuevo.');
      } finally {
        setProcessingStudentId(null);
      }
    },
    [onStudentDeleted, onError]
  );

  return useMemo(
    () => ({
      processingStudentId,
      resetPassword,
      deleteStudentAccount,
    }),
    [processingStudentId, resetPassword, deleteStudentAccount]
  );
}
