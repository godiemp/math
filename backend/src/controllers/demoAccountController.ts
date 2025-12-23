/**
 * ============================================================================
 * DEMO ACCOUNT CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for creating and managing demo accounts for school free trials
 */

import { Request, Response } from 'express';
import {
  DemoAccountService,
  CreateDemoAccountRequest,
  GradeLevel,
} from '../services/demoAccountService';

const VALID_GRADE_LEVELS: GradeLevel[] = ['1-medio', '2-medio', '3-medio', '4-medio'];

/**
 * Create a demo account for a school
 * POST /api/admin/demo-accounts
 */
export async function createDemoAccount(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'No autenticado' });
      return;
    }

    const data: CreateDemoAccountRequest = req.body;

    // Validate required fields
    if (!data.schoolRbd || !data.schoolName || !data.gradeLevel) {
      res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: schoolRbd, schoolName, gradeLevel',
      });
      return;
    }

    // Validate grade level
    if (!VALID_GRADE_LEVELS.includes(data.gradeLevel)) {
      res.status(400).json({
        success: false,
        message: 'Nivel inválido. Debe ser: 1-medio, 2-medio, 3-medio, o 4-medio',
      });
      return;
    }

    // Validate trial duration (1-90 days)
    if (data.trialDurationDays && (data.trialDurationDays < 1 || data.trialDurationDays > 90)) {
      res.status(400).json({
        success: false,
        message: 'Duración del trial debe ser entre 1 y 90 días',
      });
      return;
    }

    const result = await DemoAccountService.createDemoAccount(data, req.user.userId);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating demo account:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear cuenta demo',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Get all demo accounts
 * GET /api/admin/demo-accounts
 */
export async function getDemoAccounts(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'No autenticado' });
      return;
    }

    const demoAccounts = await DemoAccountService.getDemoAccounts();

    res.json({
      success: true,
      demoAccounts,
      total: demoAccounts.length,
    });
  } catch (error) {
    console.error('Error fetching demo accounts:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener cuentas demo',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Delete a demo account
 * DELETE /api/admin/demo-accounts/:id
 */
export async function deleteDemoAccount(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'No autenticado' });
      return;
    }

    const { id } = req.params;
    const success = await DemoAccountService.deleteDemoAccount(id);

    if (!success) {
      res.status(404).json({
        success: false,
        message: 'Cuenta demo no encontrada',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Cuenta demo eliminada exitosamente',
    });
  } catch (error) {
    console.error('Error deleting demo account:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar cuenta demo',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
