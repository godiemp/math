'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSocket } from '@/hooks/useSocket';
import type { Lesson } from '@/lib/lessons/types';

export interface ActiveLesson {
  lessonId: string;
  lessonTitle: string;
  currentStep: number;
  totalSteps: number;
  roomId: string;
}

export interface ConnectedStudent {
  studentId: string;
  studentName: string;
  joinedAt: number;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  stepNumber: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface UseLessonControlReturn {
  /** Socket connection status */
  isConnected: boolean;
  /** Current active lesson (null if no lesson active) */
  activeLesson: ActiveLesson | null;
  /** List of connected students */
  students: ConnectedStudent[];
  /** Recent student progress events */
  studentProgress: StudentProgress[];
  /** Start a new lesson */
  startLesson: (lesson: Lesson) => void;
  /** Set current step (1-indexed) */
  setStep: (step: number) => void;
  /** Go to next step */
  nextStep: () => void;
  /** Go to previous step */
  prevStep: () => void;
  /** End the current lesson */
  endLesson: () => void;
}

/**
 * Hook for teachers to control live lessons
 *
 * Manages lesson state, student connections, and step navigation.
 * Uses WebSocket for real-time updates.
 */
export function useLessonControl(): UseLessonControlReturn {
  const { socket, isConnected } = useSocket();
  const [activeLesson, setActiveLesson] = useState<ActiveLesson | null>(null);
  const [students, setStudents] = useState<ConnectedStudent[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);

  // Listen for socket events
  useEffect(() => {
    if (!socket) return;

    // Lesson started confirmation
    const handleLessonStarted = (data: ActiveLesson) => {
      console.log('📚 Lesson started:', data);
      setActiveLesson(data);
      setStudents([]);
      setStudentProgress([]);
    };

    // Student joined
    const handleStudentJoined = (data: { studentId: string; studentName: string; totalStudents: number }) => {
      console.log('👤 Student joined:', data.studentName);
      setStudents((prev) => {
        // Avoid duplicates
        if (prev.some((s) => s.studentId === data.studentId)) {
          return prev;
        }
        return [
          ...prev,
          {
            studentId: data.studentId,
            studentName: data.studentName,
            joinedAt: Date.now(),
          },
        ];
      });
    };

    // Student left
    const handleStudentLeft = (data: { studentId: string; studentName: string; totalStudents: number }) => {
      console.log('👤 Student left:', data.studentName);
      setStudents((prev) => prev.filter((s) => s.studentId !== data.studentId));
    };

    // Student progress
    const handleStudentProgress = (data: StudentProgress) => {
      console.log('📝 Student progress:', data);
      setStudentProgress((prev) => {
        // Keep last 50 progress events
        const updated = [data, ...prev].slice(0, 50);
        return updated;
      });
    };

    // Lesson ended (e.g., from another tab or on disconnect)
    const handleLessonEnded = () => {
      console.log('📚 Lesson ended');
      setActiveLesson(null);
      setStudents([]);
    };

    // Error handling
    const handleError = (data: { message: string }) => {
      console.error('🔴 Lesson error:', data.message);
    };

    socket.on('lesson:started', handleLessonStarted);
    socket.on('student:joined', handleStudentJoined);
    socket.on('student:left', handleStudentLeft);
    socket.on('student:progress', handleStudentProgress);
    socket.on('lesson:ended', handleLessonEnded);
    socket.on('lesson:end_confirmed', handleLessonEnded);
    socket.on('error', handleError);

    return () => {
      socket.off('lesson:started', handleLessonStarted);
      socket.off('student:joined', handleStudentJoined);
      socket.off('student:left', handleStudentLeft);
      socket.off('student:progress', handleStudentProgress);
      socket.off('lesson:ended', handleLessonEnded);
      socket.off('lesson:end_confirmed', handleLessonEnded);
      socket.off('error', handleError);
    };
  }, [socket]);

  // Start a lesson
  const startLesson = useCallback(
    (lesson: Lesson) => {
      if (!socket || !isConnected) {
        console.error('Cannot start lesson: socket not connected');
        return;
      }

      console.log('📚 Starting lesson:', lesson.title);
      socket.emit('teacher:start_lesson', {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        totalSteps: lesson.steps.length,
      });
    },
    [socket, isConnected]
  );

  // Set step (1-indexed)
  const setStep = useCallback(
    (step: number) => {
      if (!socket || !activeLesson) return;

      console.log('📚 Setting step:', step);
      socket.emit('teacher:set_step', {
        lessonId: activeLesson.lessonId,
        step,
      });

      // Update local state optimistically
      setActiveLesson((prev) => (prev ? { ...prev, currentStep: step } : null));
    },
    [socket, activeLesson]
  );

  // Next step
  const nextStep = useCallback(() => {
    if (!activeLesson) return;
    const next = Math.min(activeLesson.currentStep + 1, activeLesson.totalSteps);
    setStep(next);
  }, [activeLesson, setStep]);

  // Previous step
  const prevStep = useCallback(() => {
    if (!activeLesson) return;
    const prev = Math.max(activeLesson.currentStep - 1, 1);
    setStep(prev);
  }, [activeLesson, setStep]);

  // End lesson
  const endLesson = useCallback(() => {
    if (!socket || !activeLesson) return;

    console.log('📚 Ending lesson:', activeLesson.lessonTitle);
    socket.emit('teacher:end_lesson', {
      lessonId: activeLesson.lessonId,
    });
  }, [socket, activeLesson]);

  return useMemo(
    () => ({
      isConnected,
      activeLesson,
      students,
      studentProgress,
      startLesson,
      setStep,
      nextStep,
      prevStep,
      endLesson,
    }),
    [isConnected, activeLesson, students, studentProgress, startLesson, setStep, nextStep, prevStep, endLesson]
  );
}
