import { pool } from '../config/database';
import { randomUUID } from 'crypto';

export type ClassLevel =
  | '1-medio'
  | '2-medio'
  | '3-medio'
  | '4-medio'
  | 'M1'
  | 'M2'
  | 'both';

export interface CreateClassData {
  name: string;
  description?: string;
  level: ClassLevel;
  schoolName?: string;
  maxStudents?: number;
}

export interface UpdateClassData {
  name?: string;
  description?: string;
  level?: ClassLevel;
  schoolName?: string;
  maxStudents?: number;
  isActive?: boolean;
}

export interface TeacherClass {
  id: string;
  name: string;
  description: string | null;
  teacherId: string;
  level: ClassLevel;
  schoolName: string | null;
  maxStudents: number;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
  // Computed fields
  studentCount: number;
  avgAccuracy: number | null;
  lastActivity: number | null;
}

export interface ClassStudent {
  id: string;
  displayName: string;
  email: string;
  enrolledAt: number;
  status: 'active' | 'removed';
  // Progress stats
  questionsAnswered: number;
  accuracy: number;
  lastActive: number | null;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
}

export interface ClassAnalytics {
  totalStudents: number;
  activeThisWeek: number;
  avgAccuracy: number;
  avgQuestionsPerStudent: number;
  subjectBreakdown: {
    subject: string;
    avgAccuracy: number;
    questionsAnswered: number;
  }[];
  weeklyActivity: {
    day: string;
    students: number;
    questions: number;
  }[];
  strugglingTopics: {
    topic: string;
    avgAccuracy: number;
    studentsCount: number;
  }[];
}

export class ClassService {
  /**
   * Create a new class
   */
  static async createClass(teacherId: string, data: CreateClassData): Promise<TeacherClass> {
    const now = Date.now();
    const classId = randomUUID();

    const result = await pool.query(
      `INSERT INTO classes (
        id, name, description, teacher_id, level, school_name,
        max_students, is_active, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        classId,
        data.name,
        data.description || null,
        teacherId,
        data.level,
        data.schoolName || null,
        data.maxStudents || 45,
        true,
        now,
        now,
      ]
    );

    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      teacherId: row.teacher_id,
      level: row.level,
      schoolName: row.school_name,
      maxStudents: row.max_students,
      isActive: row.is_active,
      createdAt: parseInt(row.created_at),
      updatedAt: parseInt(row.updated_at),
      studentCount: 0,
      avgAccuracy: null,
      lastActivity: null,
    };
  }

  /**
   * Get all classes for a teacher with computed stats
   */
  static async getTeacherClasses(teacherId: string): Promise<TeacherClass[]> {
    const result = await pool.query(
      `
      SELECT
        c.*,
        COALESCE(ce.student_count, 0) as student_count,
        stats.avg_accuracy,
        stats.last_activity
      FROM classes c
      LEFT JOIN (
        SELECT class_id, COUNT(*) as student_count
        FROM class_enrollments
        WHERE status = 'active'
        GROUP BY class_id
      ) ce ON c.id = ce.class_id
      LEFT JOIN (
        SELECT
          ce.class_id,
          AVG(CASE WHEN qa.is_correct THEN 1.0 ELSE 0.0 END) as avg_accuracy,
          MAX(qa.attempted_at) as last_activity
        FROM class_enrollments ce
        JOIN question_attempts qa ON ce.student_id = qa.user_id
        WHERE ce.status = 'active'
        GROUP BY ce.class_id
      ) stats ON c.id = stats.class_id
      WHERE c.teacher_id = $1 AND c.is_active = true
      ORDER BY c.updated_at DESC
      `,
      [teacherId]
    );

    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      teacherId: row.teacher_id,
      level: row.level,
      schoolName: row.school_name,
      maxStudents: row.max_students,
      isActive: row.is_active,
      createdAt: parseInt(row.created_at),
      updatedAt: parseInt(row.updated_at),
      studentCount: parseInt(row.student_count) || 0,
      avgAccuracy: row.avg_accuracy ? parseFloat(row.avg_accuracy) : null,
      lastActivity: row.last_activity ? parseInt(row.last_activity) : null,
    }));
  }

  /**
   * Get a single class by ID (must belong to teacher)
   */
  static async getClassById(
    classId: string,
    teacherId: string
  ): Promise<TeacherClass | null> {
    const result = await pool.query(
      `
      SELECT
        c.*,
        COALESCE(ce.student_count, 0) as student_count,
        stats.avg_accuracy,
        stats.last_activity
      FROM classes c
      LEFT JOIN (
        SELECT class_id, COUNT(*) as student_count
        FROM class_enrollments
        WHERE status = 'active'
        GROUP BY class_id
      ) ce ON c.id = ce.class_id
      LEFT JOIN (
        SELECT
          ce.class_id,
          AVG(CASE WHEN qa.is_correct THEN 1.0 ELSE 0.0 END) as avg_accuracy,
          MAX(qa.attempted_at) as last_activity
        FROM class_enrollments ce
        JOIN question_attempts qa ON ce.student_id = qa.user_id
        WHERE ce.status = 'active'
        GROUP BY ce.class_id
      ) stats ON c.id = stats.class_id
      WHERE c.id = $1 AND c.teacher_id = $2
      `,
      [classId, teacherId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      teacherId: row.teacher_id,
      level: row.level,
      schoolName: row.school_name,
      maxStudents: row.max_students,
      isActive: row.is_active,
      createdAt: parseInt(row.created_at),
      updatedAt: parseInt(row.updated_at),
      studentCount: parseInt(row.student_count) || 0,
      avgAccuracy: row.avg_accuracy ? parseFloat(row.avg_accuracy) : null,
      lastActivity: row.last_activity ? parseInt(row.last_activity) : null,
    };
  }

  /**
   * Update a class (must belong to teacher)
   */
  static async updateClass(
    classId: string,
    teacherId: string,
    data: UpdateClassData
  ): Promise<TeacherClass | null> {
    const now = Date.now();

    // Build dynamic update query
    const updates: string[] = ['updated_at = $3'];
    const values: (string | number | boolean | null)[] = [classId, teacherId, now];
    let paramIndex = 4;

    if (data.name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(data.name);
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(data.description);
    }
    if (data.level !== undefined) {
      updates.push(`level = $${paramIndex++}`);
      values.push(data.level);
    }
    if (data.schoolName !== undefined) {
      updates.push(`school_name = $${paramIndex++}`);
      values.push(data.schoolName);
    }
    if (data.maxStudents !== undefined) {
      updates.push(`max_students = $${paramIndex++}`);
      values.push(data.maxStudents);
    }
    if (data.isActive !== undefined) {
      updates.push(`is_active = $${paramIndex++}`);
      values.push(data.isActive);
    }

    const result = await pool.query(
      `UPDATE classes SET ${updates.join(', ')}
       WHERE id = $1 AND teacher_id = $2
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return null;
    }

    // Fetch full class with computed stats
    return this.getClassById(classId, teacherId);
  }

  /**
   * Soft delete a class (set is_active = false)
   */
  static async deleteClass(classId: string, teacherId: string): Promise<boolean> {
    const result = await pool.query(
      `UPDATE classes SET is_active = false, updated_at = $3
       WHERE id = $1 AND teacher_id = $2`,
      [classId, teacherId, Date.now()]
    );

    return (result.rowCount ?? 0) > 0;
  }

  /**
   * Add students to a class
   */
  static async addStudentsToClass(
    classId: string,
    teacherId: string,
    studentIds: string[]
  ): Promise<{ added: number; errors: string[] }> {
    // Verify class belongs to teacher
    const classCheck = await pool.query(
      'SELECT id FROM classes WHERE id = $1 AND teacher_id = $2 AND is_active = true',
      [classId, teacherId]
    );

    if (classCheck.rows.length === 0) {
      return { added: 0, errors: ['Class not found or not owned by teacher'] };
    }

    const now = Date.now();
    let added = 0;
    const errors: string[] = [];

    for (const studentId of studentIds) {
      try {
        // Verify student exists and is a student
        const studentCheck = await pool.query(
          "SELECT id FROM users WHERE id = $1 AND role = 'student'",
          [studentId]
        );

        if (studentCheck.rows.length === 0) {
          errors.push(`Student ${studentId} not found`);
          continue;
        }

        // Insert or update enrollment (upsert)
        await pool.query(
          `INSERT INTO class_enrollments (class_id, student_id, enrolled_at, enrolled_by, status)
           VALUES ($1, $2, $3, $4, 'active')
           ON CONFLICT (class_id, student_id)
           DO UPDATE SET status = 'active', enrolled_at = $3, enrolled_by = $4`,
          [classId, studentId, now, teacherId]
        );

        added++;
      } catch (error) {
        errors.push(`Error adding student ${studentId}: ${(error as Error).message}`);
      }
    }

    return { added, errors };
  }

  /**
   * Remove a student from a class (soft delete)
   */
  static async removeStudentFromClass(
    classId: string,
    teacherId: string,
    studentId: string
  ): Promise<boolean> {
    // Verify class belongs to teacher
    const classCheck = await pool.query(
      'SELECT id FROM classes WHERE id = $1 AND teacher_id = $2',
      [classId, teacherId]
    );

    if (classCheck.rows.length === 0) {
      return false;
    }

    const result = await pool.query(
      `UPDATE class_enrollments SET status = 'removed'
       WHERE class_id = $1 AND student_id = $2`,
      [classId, studentId]
    );

    return (result.rowCount ?? 0) > 0;
  }

  /**
   * Get students in a class with their progress stats
   */
  static async getClassStudentsWithProgress(
    classId: string,
    teacherId: string
  ): Promise<ClassStudent[]> {
    // Verify class belongs to teacher
    const classCheck = await pool.query(
      'SELECT id FROM classes WHERE id = $1 AND teacher_id = $2',
      [classId, teacherId]
    );

    if (classCheck.rows.length === 0) {
      return [];
    }

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.display_name,
        u.email,
        u.current_streak,
        u.longest_streak,
        ce.enrolled_at,
        ce.status,
        COALESCE(stats.questions_answered, 0) as questions_answered,
        COALESCE(stats.accuracy, 0) as accuracy,
        stats.last_active,
        COALESCE(lessons.completed, 0) as lessons_completed
      FROM class_enrollments ce
      JOIN users u ON ce.student_id = u.id
      LEFT JOIN (
        SELECT
          user_id,
          COUNT(*) as questions_answered,
          AVG(CASE WHEN is_correct THEN 1.0 ELSE 0.0 END) as accuracy,
          MAX(attempted_at) as last_active
        FROM question_attempts
        GROUP BY user_id
      ) stats ON u.id = stats.user_id
      LEFT JOIN (
        SELECT user_id, COUNT(*) as completed
        FROM (
          SELECT DISTINCT user_id, quiz_session_id
          FROM quiz_attempts
          WHERE quiz_session_id IS NOT NULL
          GROUP BY user_id, quiz_session_id
          HAVING COUNT(*) >= 5
        ) completed_sessions
        GROUP BY user_id
      ) lessons ON u.id = lessons.user_id
      WHERE ce.class_id = $1 AND ce.status = 'active'
      ORDER BY u.display_name ASC
      `,
      [classId]
    );

    return result.rows.map((row) => ({
      id: row.id,
      displayName: row.display_name,
      email: row.email,
      enrolledAt: parseInt(row.enrolled_at),
      status: row.status,
      questionsAnswered: parseInt(row.questions_answered) || 0,
      accuracy: parseFloat(row.accuracy) || 0,
      lastActive: row.last_active ? parseInt(row.last_active) : null,
      currentStreak: row.current_streak || 0,
      longestStreak: row.longest_streak || 0,
      lessonsCompleted: parseInt(row.lessons_completed) || 0,
    }));
  }

  /**
   * Get analytics for a class
   */
  static async getClassAnalytics(
    classId: string,
    teacherId: string
  ): Promise<ClassAnalytics | null> {
    // Verify class belongs to teacher
    const classCheck = await pool.query(
      'SELECT id FROM classes WHERE id = $1 AND teacher_id = $2',
      [classId, teacherId]
    );

    if (classCheck.rows.length === 0) {
      return null;
    }

    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    // Get total students
    const studentsResult = await pool.query(
      `SELECT COUNT(*) as count FROM class_enrollments
       WHERE class_id = $1 AND status = 'active'`,
      [classId]
    );
    const totalStudents = parseInt(studentsResult.rows[0].count);

    // Get active this week
    const activeResult = await pool.query(
      `SELECT COUNT(DISTINCT ce.student_id) as count
       FROM class_enrollments ce
       JOIN question_attempts qa ON ce.student_id = qa.user_id
       WHERE ce.class_id = $1 AND ce.status = 'active' AND qa.attempted_at >= $2`,
      [classId, oneWeekAgo]
    );
    const activeThisWeek = parseInt(activeResult.rows[0].count);

    // Get overall accuracy and questions
    const overallResult = await pool.query(
      `SELECT
         AVG(CASE WHEN qa.is_correct THEN 1.0 ELSE 0.0 END) as avg_accuracy,
         COUNT(*) as total_questions
       FROM class_enrollments ce
       JOIN question_attempts qa ON ce.student_id = qa.user_id
       WHERE ce.class_id = $1 AND ce.status = 'active'`,
      [classId]
    );
    const avgAccuracy = parseFloat(overallResult.rows[0].avg_accuracy) || 0;
    const totalQuestions = parseInt(overallResult.rows[0].total_questions) || 0;

    // Get subject breakdown
    const subjectResult = await pool.query(
      `SELECT
         qa.subject,
         AVG(CASE WHEN qa.is_correct THEN 1.0 ELSE 0.0 END) as avg_accuracy,
         COUNT(*) as questions_answered
       FROM class_enrollments ce
       JOIN question_attempts qa ON ce.student_id = qa.user_id
       WHERE ce.class_id = $1 AND ce.status = 'active'
       GROUP BY qa.subject
       ORDER BY qa.subject`,
      [classId]
    );
    const subjectBreakdown = subjectResult.rows.map((row) => ({
      subject: row.subject,
      avgAccuracy: parseFloat(row.avg_accuracy) || 0,
      questionsAnswered: parseInt(row.questions_answered) || 0,
    }));

    // Get weekly activity (last 7 days)
    const weeklyResult = await pool.query(
      `SELECT
         TO_CHAR(TO_TIMESTAMP(qa.attempted_at / 1000), 'Dy') as day,
         COUNT(DISTINCT ce.student_id) as students,
         COUNT(*) as questions
       FROM class_enrollments ce
       JOIN question_attempts qa ON ce.student_id = qa.user_id
       WHERE ce.class_id = $1 AND ce.status = 'active' AND qa.attempted_at >= $2
       GROUP BY day, DATE_TRUNC('day', TO_TIMESTAMP(qa.attempted_at / 1000))
       ORDER BY DATE_TRUNC('day', TO_TIMESTAMP(qa.attempted_at / 1000))`,
      [classId, oneWeekAgo]
    );
    const weeklyActivity = weeklyResult.rows.map((row) => ({
      day: row.day,
      students: parseInt(row.students) || 0,
      questions: parseInt(row.questions) || 0,
    }));

    // Get struggling topics (accuracy < 70%)
    const strugglingResult = await pool.query(
      `SELECT
         q.topic,
         AVG(CASE WHEN qa.is_correct THEN 1.0 ELSE 0.0 END) as avg_accuracy,
         COUNT(DISTINCT ce.student_id) as students_count
       FROM class_enrollments ce
       JOIN question_attempts qa ON ce.student_id = qa.user_id
       JOIN questions q ON qa.question_id = q.id
       WHERE ce.class_id = $1 AND ce.status = 'active'
       GROUP BY q.topic
       HAVING AVG(CASE WHEN qa.is_correct THEN 1.0 ELSE 0.0 END) < 0.7
       ORDER BY avg_accuracy ASC
       LIMIT 5`,
      [classId]
    );
    const strugglingTopics = strugglingResult.rows.map((row) => ({
      topic: row.topic,
      avgAccuracy: parseFloat(row.avg_accuracy) || 0,
      studentsCount: parseInt(row.students_count) || 0,
    }));

    return {
      totalStudents,
      activeThisWeek,
      avgAccuracy,
      avgQuestionsPerStudent: totalStudents > 0 ? Math.round(totalQuestions / totalStudents) : 0,
      subjectBreakdown,
      weeklyActivity,
      strugglingTopics,
    };
  }

  /**
   * Search students available to add to a class
   * Returns students who are not already in the class
   */
  static async searchAvailableStudents(
    classId: string,
    teacherId: string,
    query: string
  ): Promise<{ id: string; displayName: string; email: string }[]> {
    // Verify class belongs to teacher
    const classCheck = await pool.query(
      'SELECT id FROM classes WHERE id = $1 AND teacher_id = $2',
      [classId, teacherId]
    );

    if (classCheck.rows.length === 0) {
      return [];
    }

    const searchTerm = `%${query}%`;

    const result = await pool.query(
      `SELECT u.id, u.display_name, u.email
       FROM users u
       WHERE u.role = 'student'
         AND u.email_verified = true
         AND (
           u.display_name ILIKE $1
           OR u.email ILIKE $1
           OR u.username ILIKE $1
         )
         AND u.id NOT IN (
           SELECT student_id FROM class_enrollments
           WHERE class_id = $2 AND status = 'active'
         )
       ORDER BY u.display_name ASC
       LIMIT 20`,
      [searchTerm, classId]
    );

    return result.rows.map((row) => ({
      id: row.id,
      displayName: row.display_name,
      email: row.email,
    }));
  }
}
