/**
 * ============================================================================
 * CLASS CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for teacher class management endpoints
 */

import { Request, Response } from 'express';
import {
  ClassService,
  type ClassLevel,
  type CreateClassData,
  type UpdateClassData,
} from '../services/classService';

const VALID_CLASS_LEVELS: ClassLevel[] = [
  '1-medio',
  '2-medio',
  '3-medio',
  '4-medio',
  'M1',
  'M2',
  'both',
];

/**
 * Get all classes for the current teacher
 */
export async function getClasses(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const classes = await ClassService.getTeacherClasses(req.user.userId);
    res.json({ classes });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
}

/**
 * Get a single class by ID
 */
export async function getClass(req: Request, res: Response): Promise<void> {
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

    const classData = await ClassService.getClassById(classId, req.user.userId);

    if (!classData) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }

    res.json({ class: classData });
  } catch (error) {
    console.error('Get class error:', error);
    res.status(500).json({ error: 'Failed to fetch class' });
  }
}

/**
 * Create a new class
 */
export async function createClass(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { name, description, level, schoolName, maxStudents } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      res.status(400).json({ error: 'Class name is required' });
      return;
    }

    if (!level || !VALID_CLASS_LEVELS.includes(level)) {
      res.status(400).json({
        error: `Level is required. Must be one of: ${VALID_CLASS_LEVELS.join(', ')}`,
      });
      return;
    }

    // Validate optional fields
    if (maxStudents !== undefined) {
      const max = parseInt(maxStudents);
      if (isNaN(max) || max < 1 || max > 100) {
        res.status(400).json({ error: 'Max students must be between 1 and 100' });
        return;
      }
    }

    const createData: CreateClassData = {
      name: name.trim(),
      description: description?.trim() || undefined,
      level,
      schoolName: schoolName?.trim() || undefined,
      maxStudents: maxStudents ? parseInt(maxStudents) : undefined,
    };

    const newClass = await ClassService.createClass(req.user.userId, createData);

    res.status(201).json({
      success: true,
      class: newClass,
    });
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({ error: 'Failed to create class' });
  }
}

/**
 * Update a class
 */
export async function updateClass(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { classId } = req.params;
    const { name, description, level, schoolName, maxStudents, isActive } = req.body;

    if (!classId) {
      res.status(400).json({ error: 'Class ID is required' });
      return;
    }

    // Validate level if provided
    if (level !== undefined && !VALID_CLASS_LEVELS.includes(level)) {
      res.status(400).json({
        error: `Invalid level. Must be one of: ${VALID_CLASS_LEVELS.join(', ')}`,
      });
      return;
    }

    // Validate maxStudents if provided
    if (maxStudents !== undefined) {
      const max = parseInt(maxStudents);
      if (isNaN(max) || max < 1 || max > 100) {
        res.status(400).json({ error: 'Max students must be between 1 and 100' });
        return;
      }
    }

    const updateData: UpdateClassData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (level !== undefined) updateData.level = level;
    if (schoolName !== undefined) updateData.schoolName = schoolName?.trim() || null;
    if (maxStudents !== undefined) updateData.maxStudents = parseInt(maxStudents);
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedClass = await ClassService.updateClass(classId, req.user.userId, updateData);

    if (!updatedClass) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }

    res.json({
      success: true,
      class: updatedClass,
    });
  } catch (error) {
    console.error('Update class error:', error);
    res.status(500).json({ error: 'Failed to update class' });
  }
}

/**
 * Delete a class (soft delete)
 */
export async function deleteClass(req: Request, res: Response): Promise<void> {
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

    const deleted = await ClassService.deleteClass(classId, req.user.userId);

    if (!deleted) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }

    res.json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Delete class error:', error);
    res.status(500).json({ error: 'Failed to delete class' });
  }
}

/**
 * Get class analytics
 */
export async function getClassAnalytics(req: Request, res: Response): Promise<void> {
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

    const analytics = await ClassService.getClassAnalytics(classId, req.user.userId);

    if (!analytics) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }

    res.json({ analytics });
  } catch (error) {
    console.error('Get class analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch class analytics' });
  }
}

/**
 * Get failed questions for a class
 * Returns questions where students have the highest failure rate
 */
export async function getClassFailedQuestions(req: Request, res: Response): Promise<void> {
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

    const result = await ClassService.getClassFailedQuestions(classId, req.user.userId);

    if (!result) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }

    res.json(result);
  } catch (error) {
    console.error('Get class failed questions error:', error);
    res.status(500).json({ error: 'Failed to fetch failed questions' });
  }
}
