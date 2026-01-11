/**
 * ============================================================================
 * LESSON SESSION MANAGER
 * ============================================================================
 *
 * In-memory state management for active lesson sessions
 * Handles room management, student tracking, and lesson state
 */

export interface LessonSession {
  teacherId: string;
  teacherUsername: string;
  lessonId: string;
  lessonTitle: string;
  currentStep: number;
  totalSteps: number;
  startedAt: number;
  students: Map<string, StudentInSession>;
}

export interface StudentInSession {
  id: string;
  username: string;
  displayName: string;
  joinedAt: number;
  currentStep: number;
  socketId: string;
}

export interface StudentProgress {
  studentId: string;
  lessonId: string;
  stepNumber: number;
  isCorrect: boolean;
  timestamp: number;
}

class LessonSessionManager {
  // Active lessons: roomId -> LessonSession
  private sessions: Map<string, LessonSession> = new Map();

  // Student subscriptions: studentId -> teacherId (who they follow)
  private studentSubscriptions: Map<string, string> = new Map();

  // Track which students are online (connected): studentId -> socketId
  private onlineStudents: Map<string, string> = new Map();

  /**
   * Generate room ID for a lesson
   */
  getRoomId(teacherId: string, lessonId: string): string {
    return `lesson:${teacherId}:${lessonId}`;
  }

  /**
   * Start a new lesson session
   */
  startLesson(
    teacherId: string,
    teacherUsername: string,
    lessonId: string,
    lessonTitle: string,
    totalSteps: number
  ): LessonSession {
    const roomId = this.getRoomId(teacherId, lessonId);

    // End any existing session for this teacher
    this.endTeacherSession(teacherId);

    const session: LessonSession = {
      teacherId,
      teacherUsername,
      lessonId,
      lessonTitle,
      currentStep: 1,
      totalSteps,
      startedAt: Date.now(),
      students: new Map(),
    };

    this.sessions.set(roomId, session);
    console.log(`📚 Lesson started: ${lessonTitle} by ${teacherUsername} (${roomId})`);

    return session;
  }

  /**
   * End a specific lesson
   */
  endLesson(teacherId: string, lessonId: string): void {
    const roomId = this.getRoomId(teacherId, lessonId);
    const session = this.sessions.get(roomId);

    if (session) {
      console.log(
        `📚 Lesson ended: ${session.lessonTitle} (${session.students.size} students participated)`
      );
      this.sessions.delete(roomId);
    }
  }

  /**
   * End all sessions for a teacher
   */
  endTeacherSession(teacherId: string): void {
    for (const [roomId, session] of this.sessions.entries()) {
      if (session.teacherId === teacherId) {
        console.log(`📚 Ending previous session for teacher: ${session.lessonTitle}`);
        this.sessions.delete(roomId);
      }
    }
  }

  /**
   * Get active lesson for a teacher
   */
  getTeacherActiveLesson(teacherId: string): LessonSession | null {
    for (const session of this.sessions.values()) {
      if (session.teacherId === teacherId) {
        return session;
      }
    }
    return null;
  }

  /**
   * Get lesson by room ID
   */
  getSession(roomId: string): LessonSession | undefined {
    return this.sessions.get(roomId);
  }

  /**
   * Update lesson step
   */
  setStep(teacherId: string, lessonId: string, step: number): boolean {
    const roomId = this.getRoomId(teacherId, lessonId);
    const session = this.sessions.get(roomId);

    if (!session) {
      return false;
    }

    session.currentStep = step;
    console.log(`📚 Step updated: ${session.lessonTitle} -> Step ${step}/${session.totalSteps}`);
    return true;
  }

  /**
   * Add student to lesson
   */
  addStudentToLesson(
    roomId: string,
    studentId: string,
    username: string,
    displayName: string,
    socketId: string
  ): boolean {
    const session = this.sessions.get(roomId);

    if (!session) {
      return false;
    }

    session.students.set(studentId, {
      id: studentId,
      username,
      displayName,
      joinedAt: Date.now(),
      currentStep: session.currentStep,
      socketId,
    });

    console.log(`👤 Student joined lesson: ${displayName} -> ${session.lessonTitle}`);
    return true;
  }

  /**
   * Remove student from lesson
   */
  removeStudentFromLesson(roomId: string, studentId: string): void {
    const session = this.sessions.get(roomId);

    if (session) {
      const student = session.students.get(studentId);
      if (student) {
        console.log(`👤 Student left lesson: ${student.displayName}`);
        session.students.delete(studentId);
      }
    }
  }

  /**
   * Subscribe student to teacher notifications
   */
  subscribeStudent(studentId: string, teacherId: string): void {
    this.studentSubscriptions.set(studentId, teacherId);
    console.log(`🔔 Student ${studentId} subscribed to teacher ${teacherId}`);
  }

  /**
   * Unsubscribe student from teacher
   */
  unsubscribeStudent(studentId: string): void {
    this.studentSubscriptions.delete(studentId);
  }

  /**
   * Get students subscribed to a teacher
   */
  getSubscribedStudents(teacherId: string): string[] {
    const students: string[] = [];
    for (const [studentId, tId] of this.studentSubscriptions.entries()) {
      if (tId === teacherId) {
        students.push(studentId);
      }
    }
    return students;
  }

  /**
   * Check if student is subscribed to a teacher
   */
  isStudentSubscribedTo(studentId: string, teacherId: string): boolean {
    return this.studentSubscriptions.get(studentId) === teacherId;
  }

  /**
   * Track student online status
   */
  setStudentOnline(studentId: string, socketId: string): void {
    this.onlineStudents.set(studentId, socketId);
  }

  /**
   * Remove student from online tracking
   */
  setStudentOffline(studentId: string): void {
    this.onlineStudents.delete(studentId);
  }

  /**
   * Get online students subscribed to a teacher
   */
  getOnlineSubscribedStudents(teacherId: string): string[] {
    const subscribedStudents = this.getSubscribedStudents(teacherId);
    return subscribedStudents.filter((studentId) => this.onlineStudents.has(studentId));
  }

  /**
   * Get socket ID for a student
   */
  getStudentSocketId(studentId: string): string | undefined {
    return this.onlineStudents.get(studentId);
  }

  /**
   * Get all active sessions (for admin/monitoring)
   */
  getAllSessions(): LessonSession[] {
    return Array.from(this.sessions.values());
  }

  /**
   * Get session stats
   */
  getStats(): {
    activeSessions: number;
    totalStudentsInLessons: number;
    onlineStudents: number;
    subscriptions: number;
  } {
    let totalStudents = 0;
    for (const session of this.sessions.values()) {
      totalStudents += session.students.size;
    }

    return {
      activeSessions: this.sessions.size,
      totalStudentsInLessons: totalStudents,
      onlineStudents: this.onlineStudents.size,
      subscriptions: this.studentSubscriptions.size,
    };
  }
}

// Singleton instance
export const lessonSessionManager = new LessonSessionManager();
