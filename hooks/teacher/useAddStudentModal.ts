'use client';

import { useState, useCallback, useMemo } from 'react';
import { createStudent, type CreateStudentResponse } from '@/lib/api/teacher';
import type { StudentGradeLevel } from '@/lib/types';

export interface StudentCredentials {
  displayName: string;
  username: string;
  password: string;
}

export interface UseAddStudentModalOptions {
  /** Callback when student is successfully created */
  onSuccess?: (credentials: StudentCredentials) => void;
  /** Callback when an error occurs */
  onError?: (error: string) => void;
}

export interface UseAddStudentModalReturn {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Whether a student is being created */
  isSubmitting: boolean;
  /** First name input value */
  firstName: string;
  /** Last name input value */
  lastName: string;
  /** Selected grade level */
  gradeLevel: StudentGradeLevel;
  /** Update first name */
  setFirstName: (name: string) => void;
  /** Update last name */
  setLastName: (name: string) => void;
  /** Update grade level */
  setGradeLevel: (level: StudentGradeLevel) => void;
  /** Open the modal */
  open: () => void;
  /** Close the modal */
  close: () => void;
  /** Reset the form to initial state */
  reset: () => void;
  /** Submit the form to create a student */
  submit: () => Promise<StudentCredentials | null>;
}

export function useAddStudentModal(
  options: UseAddStudentModalOptions = {}
): UseAddStudentModalReturn {
  const { onSuccess, onError } = options;

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gradeLevel, setGradeLevel] = useState<StudentGradeLevel>('1-medio');

  const reset = useCallback(() => {
    setFirstName('');
    setLastName('');
    setGradeLevel('1-medio');
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const submit = useCallback(async (): Promise<StudentCredentials | null> => {
    if (!firstName.trim() || !lastName.trim()) {
      onError?.('Por favor completa nombre y apellido');
      return null;
    }

    try {
      setIsSubmitting(true);

      const response = await createStudent({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        gradeLevel,
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      const credentials: StudentCredentials = {
        displayName: response.data?.student.displayName || '',
        username: response.data?.credentials.username || '',
        password: response.data?.credentials.password || '',
      };

      reset();
      close();
      onSuccess?.(credentials);

      return credentials;
    } catch (err) {
      console.error('Error creating student:', err);
      onError?.('Error al crear estudiante. Por favor intenta de nuevo.');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [firstName, lastName, gradeLevel, onSuccess, onError, reset, close]);

  return useMemo(
    () => ({
      isOpen,
      isSubmitting,
      firstName,
      lastName,
      gradeLevel,
      setFirstName,
      setLastName,
      setGradeLevel,
      open,
      close,
      reset,
      submit,
    }),
    [
      isOpen,
      isSubmitting,
      firstName,
      lastName,
      gradeLevel,
      open,
      close,
      reset,
      submit,
    ]
  );
}
