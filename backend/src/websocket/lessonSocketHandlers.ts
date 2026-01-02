/**
 * ============================================================================
 * LESSON SOCKET HANDLERS
 * ============================================================================
 *
 * Event handlers for real-time lesson synchronization
 */

import { Server, Socket } from 'socket.io';
import { AuthenticatedSocket } from './socketAuth';
import { lessonSessionManager } from './lessonSessionManager';

// Event types for type safety
export interface TeacherStartLessonPayload {
  lessonId: string;
  lessonTitle: string;
  totalSteps: number;
}

export interface TeacherSetStepPayload {
  lessonId: string;
  step: number;
}

export interface TeacherEndLessonPayload {
  lessonId: string;
}

export interface StudentJoinLessonPayload {
  teacherId: string;
  lessonId: string;
}

export interface StudentSubmitAnswerPayload {
  lessonId: string;
  stepNumber: number;
  isCorrect: boolean;
}

/**
 * Initialize lesson socket handlers
 */
export function initializeLessonHandlers(io: Server): void {
  io.on('connection', (socket: Socket) => {
    const authSocket = socket as AuthenticatedSocket;
    const user = authSocket.user;

    console.log(`🔌 User connected: ${user.username} (${user.role})`);

    // Track online status for students
    if (user.role === 'student') {
      lessonSessionManager.setStudentOnline(user.userId, socket.id);
    }

    // === TEACHER EVENTS ===

    /**
     * Teacher starts a lesson
     */
    socket.on('teacher:start_lesson', (payload: TeacherStartLessonPayload) => {
      if (user.role !== 'teacher') {
        socket.emit('error', { message: 'Solo los profesores pueden iniciar lecciones' });
        return;
      }

      const { lessonId, lessonTitle, totalSteps } = payload;
      const roomId = lessonSessionManager.getRoomId(user.userId, lessonId);

      // Start the lesson session
      const session = lessonSessionManager.startLesson(
        user.userId,
        user.username,
        lessonId,
        lessonTitle,
        totalSteps
      );

      // Teacher joins the room
      socket.join(roomId);

      // Notify subscribed students that a lesson started
      const subscribedStudents = lessonSessionManager.getOnlineSubscribedStudents(user.userId);
      for (const studentId of subscribedStudents) {
        const studentSocketId = lessonSessionManager.getStudentSocketId(studentId);
        if (studentSocketId) {
          io.to(studentSocketId).emit('lesson:available', {
            teacherId: user.userId,
            teacherUsername: user.username,
            lessonId,
            lessonTitle,
            roomId,
          });
        }
      }

      // Confirm to teacher
      socket.emit('lesson:started', {
        roomId,
        lessonId,
        lessonTitle,
        currentStep: 1,
        totalSteps,
      });

      console.log(`📚 Teacher ${user.username} started lesson: ${lessonTitle}`);
    });

    /**
     * Teacher sets lesson step
     */
    socket.on('teacher:set_step', (payload: TeacherSetStepPayload) => {
      if (user.role !== 'teacher') {
        socket.emit('error', { message: 'Solo los profesores pueden cambiar el paso' });
        return;
      }

      const { lessonId, step } = payload;
      const roomId = lessonSessionManager.getRoomId(user.userId, lessonId);

      const success = lessonSessionManager.setStep(user.userId, lessonId, step);

      if (!success) {
        socket.emit('error', { message: 'Lección no encontrada' });
        return;
      }

      // Broadcast to all students in the room
      io.to(roomId).emit('lesson:step_changed', {
        lessonId,
        step,
        changedAt: Date.now(),
      });

      console.log(`📚 Teacher ${user.username} set step ${step} for lesson ${lessonId}`);
    });

    /**
     * Teacher ends lesson
     */
    socket.on('teacher:end_lesson', (payload: TeacherEndLessonPayload) => {
      if (user.role !== 'teacher') {
        socket.emit('error', { message: 'Solo los profesores pueden terminar lecciones' });
        return;
      }

      const { lessonId } = payload;
      const roomId = lessonSessionManager.getRoomId(user.userId, lessonId);

      // Notify all students in the room
      io.to(roomId).emit('lesson:ended', {
        lessonId,
        endedAt: Date.now(),
      });

      // End the session
      lessonSessionManager.endLesson(user.userId, lessonId);

      // Leave the room
      socket.leave(roomId);

      socket.emit('lesson:end_confirmed', { lessonId });

      console.log(`📚 Teacher ${user.username} ended lesson ${lessonId}`);
    });

    // === STUDENT EVENTS ===

    /**
     * Student subscribes to a teacher's notifications
     */
    socket.on('student:subscribe', (payload: { teacherId: string }) => {
      if (user.role !== 'student') {
        socket.emit('error', { message: 'Solo los estudiantes pueden suscribirse' });
        return;
      }

      lessonSessionManager.subscribeStudent(user.userId, payload.teacherId);

      // Check if teacher has an active lesson
      const activeLesson = lessonSessionManager.getTeacherActiveLesson(payload.teacherId);

      socket.emit('subscription:confirmed', {
        teacherId: payload.teacherId,
        activeLesson: activeLesson
          ? {
              lessonId: activeLesson.lessonId,
              lessonTitle: activeLesson.lessonTitle,
              currentStep: activeLesson.currentStep,
              roomId: lessonSessionManager.getRoomId(payload.teacherId, activeLesson.lessonId),
            }
          : null,
      });

      console.log(`🔔 Student ${user.username} subscribed to teacher ${payload.teacherId}`);
    });

    /**
     * Student joins an active lesson
     */
    socket.on('student:join_lesson', (payload: StudentJoinLessonPayload) => {
      if (user.role !== 'student') {
        socket.emit('error', { message: 'Solo los estudiantes pueden unirse a lecciones' });
        return;
      }

      const { teacherId, lessonId } = payload;
      const roomId = lessonSessionManager.getRoomId(teacherId, lessonId);
      const session = lessonSessionManager.getSession(roomId);

      if (!session) {
        socket.emit('error', { message: 'La lección no está activa' });
        return;
      }

      // Add student to session
      const added = lessonSessionManager.addStudentToLesson(
        roomId,
        user.userId,
        user.username,
        user.username, // displayName (could be enhanced)
        socket.id
      );

      if (!added) {
        socket.emit('error', { message: 'No se pudo unir a la lección' });
        return;
      }

      // Join the Socket.io room
      socket.join(roomId);

      // Notify teacher
      io.to(roomId).emit('student:joined', {
        studentId: user.userId,
        studentName: user.username,
        totalStudents: session.students.size,
      });

      // Send current state to student
      socket.emit('lesson:state', {
        lessonId: session.lessonId,
        lessonTitle: session.lessonTitle,
        currentStep: session.currentStep,
        totalSteps: session.totalSteps,
        teacherUsername: session.teacherUsername,
      });

      console.log(`👤 Student ${user.username} joined lesson ${lessonId}`);
    });

    /**
     * Student submits an answer
     */
    socket.on('student:submit_answer', (payload: StudentSubmitAnswerPayload) => {
      if (user.role !== 'student') {
        socket.emit('error', { message: 'Solo los estudiantes pueden enviar respuestas' });
        return;
      }

      // Find which lesson the student is in
      // This could be optimized by tracking student->room mapping
      for (const session of lessonSessionManager.getAllSessions()) {
        if (session.students.has(user.userId)) {
          const roomId = lessonSessionManager.getRoomId(session.teacherId, session.lessonId);

          // Notify teacher about student progress
          io.to(roomId).emit('student:progress', {
            studentId: user.userId,
            studentName: user.username,
            stepNumber: payload.stepNumber,
            isCorrect: payload.isCorrect,
            timestamp: Date.now(),
          });

          socket.emit('answer:submitted', {
            stepNumber: payload.stepNumber,
            received: true,
          });

          console.log(
            `📝 Student ${user.username} submitted answer for step ${payload.stepNumber}: ${payload.isCorrect ? '✓' : '✗'}`
          );
          return;
        }
      }

      socket.emit('error', { message: 'No estás en una lección activa' });
    });

    /**
     * Student leaves lesson
     */
    socket.on('student:leave_lesson', (payload: { lessonId: string; teacherId: string }) => {
      const roomId = lessonSessionManager.getRoomId(payload.teacherId, payload.lessonId);

      lessonSessionManager.removeStudentFromLesson(roomId, user.userId);
      socket.leave(roomId);

      // Notify room
      const session = lessonSessionManager.getSession(roomId);
      if (session) {
        io.to(roomId).emit('student:left', {
          studentId: user.userId,
          studentName: user.username,
          totalStudents: session.students.size,
        });
      }

      socket.emit('lesson:left', { lessonId: payload.lessonId });
    });

    // === DISCONNECT ===

    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${user.username}`);

      // Clean up student state
      if (user.role === 'student') {
        lessonSessionManager.setStudentOffline(user.userId);
        lessonSessionManager.unsubscribeStudent(user.userId);

        // Remove from any active lessons
        for (const session of lessonSessionManager.getAllSessions()) {
          if (session.students.has(user.userId)) {
            const roomId = lessonSessionManager.getRoomId(session.teacherId, session.lessonId);
            lessonSessionManager.removeStudentFromLesson(roomId, user.userId);

            io.to(roomId).emit('student:left', {
              studentId: user.userId,
              studentName: user.username,
              totalStudents: session.students.size,
            });
          }
        }
      }

      // If teacher disconnects, end their sessions
      if (user.role === 'teacher') {
        const activeSession = lessonSessionManager.getTeacherActiveLesson(user.userId);
        if (activeSession) {
          const roomId = lessonSessionManager.getRoomId(user.userId, activeSession.lessonId);

          io.to(roomId).emit('lesson:ended', {
            lessonId: activeSession.lessonId,
            reason: 'teacher_disconnected',
            endedAt: Date.now(),
          });

          lessonSessionManager.endTeacherSession(user.userId);
        }
      }
    });
  });
}
