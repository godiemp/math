/**
 * ============================================================================
 * CLASS STUDENTS CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for managing students within classes
 */

import { Request, Response } from 'express';
import { ClassService } from '../services/classService';

/**
 * Get all students in a class with their progress stats
 */
export async function getClassStudents(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { classId } = req.params;

    if (!classId) {
      res.status(400).json({ error: 'Class ID is required' });
      return;
    }

    const students = await ClassService.getClassStudentsWithProgress(classId, req.user.userId);

    res.json({ students });
  } catch (error) {
    console.error('Get class students error:', error);
    res.status(500).json({ error: 'Failed to fetch class students' });
  }
}

/**
 * Add students to a class
 */
export async function addStudentsToClass(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { classId } = req.params;
    const { studentIds } = req.body;

    if (!classId) {
      res.status(400).json({ error: 'Class ID is required' });
      return;
    }

    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      res.status(400).json({ error: 'Student IDs array is required' });
      return;
    }

    // Validate all IDs are strings
    if (!studentIds.every((id) => typeof id === 'string')) {
      res.status(400).json({ error: 'All student IDs must be strings' });
      return;
    }

    const result = await ClassService.addStudentsToClass(classId, req.user.userId, studentIds);

    if (result.added === 0 && result.errors.length > 0) {
      res.status(400).json({
        success: false,
        added: 0,
        errors: result.errors,
      });
      return;
    }

    res.json({
      success: true,
      added: result.added,
      errors: result.errors,
      message: `Successfully added ${result.added} student(s) to the class`,
    });
  } catch (error) {
    console.error('Add students to class error:', error);
    res.status(500).json({ error: 'Failed to add students to class' });
  }
}

/**
 * Remove a student from a class
 */
export async function removeStudentFromClass(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { classId, studentId } = req.params;

    if (!classId) {
      res.status(400).json({ error: 'Class ID is required' });
      return;
    }

    if (!studentId) {
      res.status(400).json({ error: 'Student ID is required' });
      return;
    }

    const removed = await ClassService.removeStudentFromClass(classId, req.user.userId, studentId);

    if (!removed) {
      res.status(404).json({ error: 'Student not found in class or class not owned by teacher' });
      return;
    }

    res.json({
      success: true,
      message: 'Student removed from class successfully',
    });
  } catch (error) {
    console.error('Remove student from class error:', error);
    res.status(500).json({ error: 'Failed to remove student from class' });
  }
}

/**
 * Get all students available to add to a class
 */
export async function getAvailableStudents(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { classId } = req.params;

    if (!classId) {
      res.status(400).json({ error: 'Class ID is required' });
      return;
    }

    const students = await ClassService.getAvailableStudents(classId, req.user.userId);

    res.json({ students });
  } catch (error) {
    console.error('Get available students error:', error);
    res.status(500).json({ error: 'Failed to get available students' });
  }
}

/**
 * Create a new student and enroll them in the class in one step
 */
export async function createStudentAndEnroll(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { classId } = req.params;
    const { firstName, lastName } = req.body;

    if (!classId) {
      res.status(400).json({ error: 'Class ID is required' });
      return;
    }

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
      res.status(400).json({ error: 'First name is required' });
      return;
    }

    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
      res.status(400).json({ error: 'Last name is required' });
      return;
    }

    const result = await ClassService.createStudentAndEnroll(classId, req.user.userId, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    if (!result.success) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.status(201).json({
      success: true,
      student: result.student,
      credentials: result.credentials,
      message: 'Student created and enrolled successfully',
    });
  } catch (error) {
    console.error('Create student and enroll error:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
}

/**
 * Move a student from current class to another class
 */
export async function moveStudent(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { classId, studentId } = req.params;
    const { targetClassId } = req.body;

    if (!classId) {
      res.status(400).json({ error: 'Source class ID is required' });
      return;
    }

    if (!studentId) {
      res.status(400).json({ error: 'Student ID is required' });
      return;
    }

    if (!targetClassId || typeof targetClassId !== 'string') {
      res.status(400).json({ error: 'Target class ID is required' });
      return;
    }

    if (classId === targetClassId) {
      res.status(400).json({ error: 'Target class must be different from source class' });
      return;
    }

    const result = await ClassService.moveStudentToClass(
      classId,
      targetClassId,
      studentId,
      req.user.userId
    );

    if (!result.success) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error('Move student error:', error);
    res.status(500).json({ error: 'Failed to move student' });
  }
}
