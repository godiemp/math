/**
 * ============================================================================
 * TEACHER CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for teacher-related endpoints (student management, grade assignment)
 */

import { Request, Response } from 'express';
import { pool } from '../config/database';

type StudentGradeLevel = '1-medio' | '2-medio' | '3-medio' | '4-medio';

const VALID_GRADE_LEVELS: StudentGradeLevel[] = ['1-medio', '2-medio', '3-medio', '4-medio'];

interface StudentForTeacher {
  id: string;
  username: string;
  email: string;
  displayName: string;
  gradeLevel: StudentGradeLevel | null;
  assignedByTeacherId: string | null;
  createdAt: number;
  lastPracticeDate: string | null;
}

/**
 * Get all students (for teacher to assign grade levels)
 * Supports filtering by gradeLevel and search by email/name
 */
export async function getStudents(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { gradeLevel, search, assignedOnly } = req.query;

    let query = `
      SELECT
        id,
        username,
        email,
        display_name,
        grade_level,
        assigned_by_teacher_id,
        created_at,
        last_practice_date
      FROM users
      WHERE role = 'student'
    `;
    const params: (string | boolean)[] = [];
    let paramIndex = 1;

    // Filter by grade level
    if (gradeLevel && gradeLevel !== 'all') {
      if (gradeLevel === 'unassigned') {
        query += ` AND grade_level IS NULL`;
      } else {
        query += ` AND grade_level = $${paramIndex++}`;
        params.push(gradeLevel as string);
      }
    }

    // Filter by assigned to this teacher only
    if (assignedOnly === 'true') {
      query += ` AND assigned_by_teacher_id = $${paramIndex++}`;
      params.push(req.user.userId);
    }

    // Search by email or display name
    if (search && typeof search === 'string' && search.trim()) {
      query += ` AND (email ILIKE $${paramIndex} OR display_name ILIKE $${paramIndex})`;
      params.push(`%${search.trim()}%`);
      paramIndex++;
    }

    query += ` ORDER BY display_name ASC LIMIT 100`;

    const result = await pool.query(query, params);

    const students: StudentForTeacher[] = result.rows.map(row => ({
      id: row.id,
      username: row.username,
      email: row.email,
      displayName: row.display_name,
      gradeLevel: row.grade_level,
      assignedByTeacherId: row.assigned_by_teacher_id,
      createdAt: row.created_at,
      lastPracticeDate: row.last_practice_date,
    }));

    res.json({ students });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
}

/**
 * Assign a grade level to a student
 */
export async function assignGradeLevel(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { studentId } = req.params;
    const { gradeLevel } = req.body;

    if (!studentId) {
      res.status(400).json({ error: 'Student ID is required' });
      return;
    }

    // Validate grade level (null/empty to unassign, or valid grade)
    const normalizedGradeLevel = gradeLevel === '' || gradeLevel === null ? null : gradeLevel;

    if (normalizedGradeLevel !== null && !VALID_GRADE_LEVELS.includes(normalizedGradeLevel)) {
      res.status(400).json({
        error: `Invalid grade level. Must be one of: ${VALID_GRADE_LEVELS.join(', ')} or null to unassign`
      });
      return;
    }

    // Verify the student exists and is a student role
    const studentCheck = await pool.query(
      'SELECT id, role FROM users WHERE id = $1',
      [studentId]
    );

    if (studentCheck.rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }

    if (studentCheck.rows[0].role !== 'student') {
      res.status(400).json({ error: 'Can only assign grade levels to students' });
      return;
    }

    // Update the student's grade level
    const result = await pool.query(
      `UPDATE users
       SET grade_level = $1,
           assigned_by_teacher_id = $2,
           updated_at = $3
       WHERE id = $4
       RETURNING id, username, email, display_name, grade_level, assigned_by_teacher_id`,
      [normalizedGradeLevel, normalizedGradeLevel ? req.user.userId : null, Date.now(), studentId]
    );

    const updatedStudent = result.rows[0];

    res.json({
      success: true,
      message: normalizedGradeLevel
        ? `Student assigned to ${normalizedGradeLevel}`
        : 'Student grade level removed',
      student: {
        id: updatedStudent.id,
        username: updatedStudent.username,
        email: updatedStudent.email,
        displayName: updatedStudent.display_name,
        gradeLevel: updatedStudent.grade_level,
        assignedByTeacherId: updatedStudent.assigned_by_teacher_id,
      },
    });
  } catch (error) {
    console.error('Assign grade level error:', error);
    res.status(500).json({ error: 'Failed to assign grade level' });
  }
}

/**
 * Get students assigned to the current teacher
 */
export async function getMyStudents(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const result = await pool.query(
      `SELECT
        id,
        username,
        email,
        display_name,
        grade_level,
        assigned_by_teacher_id,
        created_at,
        last_practice_date
      FROM users
      WHERE role = 'student' AND assigned_by_teacher_id = $1
      ORDER BY grade_level ASC NULLS LAST, display_name ASC`,
      [req.user.userId]
    );

    const students: StudentForTeacher[] = result.rows.map(row => ({
      id: row.id,
      username: row.username,
      email: row.email,
      displayName: row.display_name,
      gradeLevel: row.grade_level,
      assignedByTeacherId: row.assigned_by_teacher_id,
      createdAt: row.created_at,
      lastPracticeDate: row.last_practice_date,
    }));

    res.json({ students });
  } catch (error) {
    console.error('Get my students error:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
}
