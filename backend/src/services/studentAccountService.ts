import { pool } from '../config/database';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

export type GradeLevel = '1-medio' | '2-medio' | '3-medio' | '4-medio';

export interface CreateStudentAccountRequest {
  firstName: string;
  lastName: string;
  gradeLevel: GradeLevel;
}

export interface CreateStudentAccountResponse {
  success: boolean;
  student: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    gradeLevel: GradeLevel;
  };
  credentials: {
    username: string;
    password: string;
  };
}

export interface StudentAccount {
  id: string;
  username: string;
  email: string;
  displayName: string;
  gradeLevel: GradeLevel;
  createdAt: number;
  createdByTeacherId: string;
}

export class StudentAccountService {
  /**
   * Generate a username from first and last name
   * Examples: "María González" -> "maria.gonzalez"
   *           "José Luis Pérez" -> "jose.luis.perez"
   */
  static generateUsername(firstName: string, lastName: string): string {
    // Normalize: remove accents, lowercase, trim
    const normalize = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '.')
        .replace(/[^a-z0-9.]/g, '');

    const normalizedFirst = normalize(firstName);
    const normalizedLast = normalize(lastName);

    // Create base username
    const base = `${normalizedFirst}.${normalizedLast}`.replace(/\.+/g, '.');

    return base.substring(0, 30); // Limit length
  }

  /**
   * Ensure username is unique by appending number if needed
   */
  static async ensureUniqueUsername(baseUsername: string): Promise<string> {
    let username = baseUsername;
    let counter = 1;

    while (true) {
      const existing = await pool.query('SELECT id FROM users WHERE username = $1', [username]);

      if (existing.rows.length === 0) {
        return username;
      }

      username = `${baseUsername}-${counter}`;
      counter++;

      if (counter > 100) {
        throw new Error('Unable to generate unique username');
      }
    }
  }

  /**
   * Generate a memorable but secure password
   * Format: Word-Word-Number (e.g., "Luna-Sol-42")
   */
  static generatePassword(): string {
    const words = [
      'Sol',
      'Luna',
      'Mar',
      'Rio',
      'Roca',
      'Nube',
      'Flor',
      'Arbol',
      'Cielo',
      'Tierra',
      'Viento',
      'Agua',
      'Fuego',
      'Luz',
      'Estrella',
      'Monte',
      'Valle',
      'Lago',
      'Isla',
      'Bosque',
      'Playa',
      'Campo',
    ];

    const word1 = words[Math.floor(Math.random() * words.length)];
    const word2 = words[Math.floor(Math.random() * words.length)];
    const number = Math.floor(Math.random() * 90) + 10; // 10-99

    return `${word1}-${word2}-${number}`;
  }

  /**
   * Create a student account linked to a teacher
   */
  static async createStudentAccount(
    data: CreateStudentAccountRequest,
    teacherId: string
  ): Promise<CreateStudentAccountResponse> {
    const now = Date.now();

    // Generate credentials
    const baseUsername = this.generateUsername(data.firstName, data.lastName);
    const username = await this.ensureUniqueUsername(baseUsername);
    const password = this.generatePassword();
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate email (internal, non-functional)
    const email = `${username}@student.simplepaes.cl`;

    // Generate display name (capitalize first letters)
    const capitalize = (str: string) =>
      str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    const displayName = `${capitalize(data.firstName)} ${capitalize(data.lastName)}`;

    // Create user
    const userId = randomUUID();

    await pool.query(
      `INSERT INTO users (
        id, username, email, password_hash, display_name, role,
        grade_level, assigned_by_teacher_id,
        email_verified, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        userId,
        username,
        email,
        passwordHash,
        displayName,
        'student',
        data.gradeLevel,
        teacherId, // Link to teacher
        true, // Auto-verify teacher-created students
        now,
        now,
      ]
    );

    return {
      success: true,
      student: {
        id: userId,
        username,
        email,
        displayName,
        gradeLevel: data.gradeLevel,
      },
      credentials: {
        username,
        password, // Plain text for teacher to share
      },
    };
  }

  /**
   * Get all students created by a specific teacher
   */
  static async getStudentsByTeacher(teacherId: string): Promise<StudentAccount[]> {
    const result = await pool.query(
      `
      SELECT
        id, username, email, display_name, grade_level,
        created_at, assigned_by_teacher_id
      FROM users
      WHERE assigned_by_teacher_id = $1 AND role = 'student'
      ORDER BY created_at DESC
    `,
      [teacherId]
    );

    return result.rows.map((row) => ({
      id: row.id,
      username: row.username,
      email: row.email,
      displayName: row.display_name,
      gradeLevel: row.grade_level,
      createdAt: row.created_at,
      createdByTeacherId: row.assigned_by_teacher_id,
    }));
  }

  /**
   * Reset a student's password (teacher can reset their students' passwords)
   */
  static async resetStudentPassword(
    studentId: string,
    teacherId: string
  ): Promise<{ success: boolean; password?: string; error?: string }> {
    // Verify the student belongs to this teacher
    const student = await pool.query(
      'SELECT id FROM users WHERE id = $1 AND assigned_by_teacher_id = $2',
      [studentId, teacherId]
    );

    if (student.rows.length === 0) {
      return { success: false, error: 'Student not found or not assigned to this teacher' };
    }

    // Generate new password
    const password = this.generatePassword();
    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query('UPDATE users SET password_hash = $1, updated_at = $2 WHERE id = $3', [
      passwordHash,
      Date.now(),
      studentId,
    ]);

    return { success: true, password };
  }

  /**
   * Delete a student account (teacher can only delete their own students)
   */
  static async deleteStudentAccount(
    studentId: string,
    teacherId: string
  ): Promise<{ success: boolean; error?: string }> {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 AND assigned_by_teacher_id = $2 AND role = $3',
      [studentId, teacherId, 'student']
    );

    if (result.rowCount === 0) {
      return { success: false, error: 'Student not found or not assigned to this teacher' };
    }

    return { success: true };
  }
}
