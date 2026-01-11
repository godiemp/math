'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useAuth } from '@/contexts/AuthContext';

export interface TeacherLesson {
  teacherId: string;
  teacherUsername: string;
  lessonId: string;
  lessonTitle: string;
  currentStep: number;
  totalSteps: number;
  roomId: string;
}

export interface UseStudentLessonSyncReturn {
  /** Socket connection status */
  isConnected: boolean;
  /** Active lesson from teacher (null if no lesson active) */
  activeLesson: TeacherLesson | null;
  /** Whether student is currently following the teacher */
  isFollowing: boolean;
  /** Whether student is subscribed to their teacher */
  isSubscribed: boolean;
  /** Join the active lesson */
  joinLesson: () => void;
  /** Leave the current lesson */
  leaveLesson: () => void;
  /** Submit an answer for the current step */
  submitAnswer: (stepNumber: number, isCorrect: boolean) => void;
}

/**
 * Hook for students to sync with their teacher's live lessons
 *
 * Automatically subscribes to the assigned teacher on mount.
 * Listens for lesson start/step changes/end events.
 */
export function useStudentLessonSync(): UseStudentLessonSyncReturn {
  const { socket, isConnected } = useSocket();
  const { user } = useAuth();
  const [activeLesson, setActiveLesson] = useState<TeacherLesson | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const teacherId = user?.assignedByTeacherId;

  // Subscribe to teacher on connect
  useEffect(() => {
    if (!socket || !isConnected || !teacherId) {
      setIsSubscribed(false);
      return;
    }

    console.log('🔔 Subscribing to teacher:', teacherId);
    socket.emit('student:subscribe', { teacherId });

    // Listen for subscription confirmation
    const handleSubscriptionConfirmed = (data: {
      teacherId: string;
      activeLesson: TeacherLesson | null;
    }) => {
      console.log('🔔 Subscription confirmed:', data);
      setIsSubscribed(true);
      if (data.activeLesson) {
        setActiveLesson(data.activeLesson);
      }
    };

    // Listen for lesson availability
    const handleLessonAvailable = (data: TeacherLesson) => {
      console.log('📚 Lesson available:', data.lessonTitle);
      setActiveLesson(data);
      setIsFollowing(false); // Reset following state for new lesson
    };

    // Listen for step changes
    const handleStepChanged = (data: { lessonId: string; step: number; changedAt: number }) => {
      console.log('📚 Step changed:', data.step);
      setActiveLesson((prev) => (prev ? { ...prev, currentStep: data.step } : null));
    };

    // Listen for lesson end
    const handleLessonEnded = (data: { lessonId: string; reason?: string; endedAt: number }) => {
      console.log('📚 Lesson ended:', data.reason || 'normal');
      setActiveLesson(null);
      setIsFollowing(false);
    };

    // Listen for lesson state (when joining mid-lesson)
    const handleLessonState = (data: TeacherLesson) => {
      console.log('📚 Lesson state:', data);
      setActiveLesson(data);
      setIsFollowing(true);
    };

    // Error handling
    const handleError = (data: { message: string }) => {
      console.error('🔴 Lesson sync error:', data.message);
    };

    socket.on('subscription:confirmed', handleSubscriptionConfirmed);
    socket.on('lesson:available', handleLessonAvailable);
    socket.on('lesson:step_changed', handleStepChanged);
    socket.on('lesson:ended', handleLessonEnded);
    socket.on('lesson:state', handleLessonState);
    socket.on('lesson:left', () => {
      setIsFollowing(false);
    });
    socket.on('error', handleError);

    return () => {
      socket.off('subscription:confirmed', handleSubscriptionConfirmed);
      socket.off('lesson:available', handleLessonAvailable);
      socket.off('lesson:step_changed', handleStepChanged);
      socket.off('lesson:ended', handleLessonEnded);
      socket.off('lesson:state', handleLessonState);
      socket.off('lesson:left');
      socket.off('error', handleError);
    };
  }, [socket, isConnected, teacherId]);

  // Join the active lesson
  const joinLesson = useCallback(() => {
    if (!socket || !activeLesson || !teacherId) return;

    console.log('📚 Joining lesson:', activeLesson.lessonTitle);
    socket.emit('student:join_lesson', {
      teacherId,
      lessonId: activeLesson.lessonId,
    });
    setIsFollowing(true);
  }, [socket, activeLesson, teacherId]);

  // Leave the current lesson
  const leaveLesson = useCallback(() => {
    if (!socket || !activeLesson || !teacherId) return;

    console.log('📚 Leaving lesson:', activeLesson.lessonTitle);
    socket.emit('student:leave_lesson', {
      teacherId,
      lessonId: activeLesson.lessonId,
    });
    setIsFollowing(false);
  }, [socket, activeLesson, teacherId]);

  // Submit an answer
  const submitAnswer = useCallback(
    (stepNumber: number, isCorrect: boolean) => {
      if (!socket || !activeLesson) return;

      console.log('📝 Submitting answer:', { stepNumber, isCorrect });
      socket.emit('student:submit_answer', {
        lessonId: activeLesson.lessonId,
        stepNumber,
        isCorrect,
      });
    },
    [socket, activeLesson]
  );

  return useMemo(
    () => ({
      isConnected,
      activeLesson,
      isFollowing,
      isSubscribed,
      joinLesson,
      leaveLesson,
      submitAnswer,
    }),
    [isConnected, activeLesson, isFollowing, isSubscribed, joinLesson, leaveLesson, submitAnswer]
  );
}
