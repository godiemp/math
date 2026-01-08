/**
 * ============================================================================
 * CLASS ROUTES
 * ============================================================================
 *
 * Route definitions for teacher class management endpoints
 */

import { Router } from 'express';
import { authenticate, requireTeacher } from '../auth/middleware';
import {
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
  getClassAnalytics,
} from '../controllers/classController';
import {
  getClassStudents,
  addStudentsToClass,
  removeStudentFromClass,
  searchAvailableStudents,
  createStudentAndEnroll,
  moveStudent,
} from '../controllers/classStudentsController';

const router = Router();

// All routes require authentication and teacher role
router.use(authenticate);
router.use(requireTeacher);

// ============================================================================
// CLASS CRUD ROUTES
// ============================================================================

/**
 * @route   GET /api/classes
 * @desc    Get all classes for the current teacher
 * @access  Private (Teacher)
 */
router.get('/', getClasses);

/**
 * @route   GET /api/classes/:classId
 * @desc    Get a single class by ID
 * @access  Private (Teacher)
 */
router.get('/:classId', getClass);

/**
 * @route   POST /api/classes
 * @desc    Create a new class
 * @body    { name: string, description?: string, level: ClassLevel, schoolName?: string, maxStudents?: number }
 * @access  Private (Teacher)
 */
router.post('/', createClass);

/**
 * @route   PUT /api/classes/:classId
 * @desc    Update a class
 * @body    { name?: string, description?: string, level?: ClassLevel, schoolName?: string, maxStudents?: number, isActive?: boolean }
 * @access  Private (Teacher)
 */
router.put('/:classId', updateClass);

/**
 * @route   DELETE /api/classes/:classId
 * @desc    Delete a class (soft delete)
 * @access  Private (Teacher)
 */
router.delete('/:classId', deleteClass);

// ============================================================================
// CLASS ANALYTICS ROUTE
// ============================================================================

/**
 * @route   GET /api/classes/:classId/analytics
 * @desc    Get analytics for a class
 * @access  Private (Teacher)
 */
router.get('/:classId/analytics', getClassAnalytics);

// ============================================================================
// CLASS STUDENT ROUTES
// ============================================================================

/**
 * @route   GET /api/classes/:classId/students
 * @desc    Get all students in a class with progress stats
 * @access  Private (Teacher)
 */
router.get('/:classId/students', getClassStudents);

/**
 * @route   POST /api/classes/:classId/students
 * @desc    Add students to a class
 * @body    { studentIds: string[] }
 * @access  Private (Teacher)
 */
router.post('/:classId/students', addStudentsToClass);

/**
 * @route   DELETE /api/classes/:classId/students/:studentId
 * @desc    Remove a student from a class
 * @access  Private (Teacher)
 */
router.delete('/:classId/students/:studentId', removeStudentFromClass);

/**
 * @route   GET /api/classes/:classId/students/search
 * @desc    Search for students available to add to a class
 * @query   query - Search term (min 2 characters)
 * @access  Private (Teacher)
 */
router.get('/:classId/students/search', searchAvailableStudents);

/**
 * @route   POST /api/classes/:classId/students/create
 * @desc    Create a new student and enroll them in the class
 * @body    { firstName: string, lastName: string }
 * @access  Private (Teacher)
 */
router.post('/:classId/students/create', createStudentAndEnroll);

/**
 * @route   POST /api/classes/:classId/students/:studentId/move
 * @desc    Move a student to another class
 * @body    { targetClassId: string }
 * @access  Private (Teacher)
 */
router.post('/:classId/students/:studentId/move', moveStudent);

export default router;
