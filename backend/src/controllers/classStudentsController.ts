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
 * Search for students available to add to a class
 */
export async function searchAvailableStudents(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { classId } = req.params;
    const { query } = req.query;

    if (!classId) {
      res.status(400).json({ error: 'Class ID is required' });
      return;
    }

    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      res.status(400).json({ error: 'Search query must be at least 2 characters' });
      return;
    }

    const students = await ClassService.searchAvailableStudents(
      classId,
      req.user.userId,
      query.trim()
    );

    res.json({ students });
  } catch (error) {
    console.error('Search available students error:', error);
    res.status(500).json({ error: 'Failed to search students' });
  }
}
