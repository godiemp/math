/**
 * ============================================================================
 * TEACHER ROUTES
 * ============================================================================
 *
 * Route definitions for teacher-related endpoints (student management)
 */

import { Router } from 'express';
import { authenticate, requireTeacher } from '../auth/middleware';
import { getStudents, assignGradeLevel, getMyStudents } from '../controllers/teacherController';

const router = Router();

// All routes require authentication and teacher role
router.use(authenticate);
router.use(requireTeacher);

/**
 * @route   GET /api/teacher/students
 * @desc    Get all students (for assignment)
 * @query   gradeLevel - Filter by grade level ('1-medio', etc., 'unassigned', or 'all')
 * @query   search - Search by email or display name
 * @query   assignedOnly - If 'true', only show students assigned by this teacher
 * @access  Private (Teacher/Admin)
 */
router.get('/students', getStudents);

/**
 * @route   GET /api/teacher/my-students
 * @desc    Get students assigned to the current teacher
 * @access  Private (Teacher/Admin)
 */
router.get('/my-students', getMyStudents);

/**
 * @route   PUT /api/teacher/students/:studentId/grade
 * @desc    Assign a grade level to a student
 * @body    { gradeLevel: '1-medio' | '2-medio' | '3-medio' | '4-medio' | null }
 * @access  Private (Teacher/Admin)
 */
router.put('/students/:studentId/grade', assignGradeLevel);

export default router;
