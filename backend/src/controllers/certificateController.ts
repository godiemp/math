/**
 * ============================================================================
 * CERTIFICATE CONTROLLER
 * ============================================================================
 *
 * Handles HTTP requests for certificate operations:
 * - Generate certificates for quiz sessions and live sessions
 * - Retrieve certificates by ID or code
 * - Get user's certificates
 * - Download certificate PDFs
 * - Verify certificates
 * - Admin: Get all certificates
 */

import { Request, Response } from 'express';
import {
  generateCertificate,
  getCertificateById,
  getCertificateByCode,
  getUserCertificates,
  getCertificateStats,
  getAllCertificates,
  deleteCertificate,
} from '../services/certificateService';
import { generateCertificatePdf } from '../services/certificatePdfService';
import { CertificateGenerationRequest } from '../lib/types/core';

/**
 * Generate a new certificate
 * POST /api/certificates/generate
 */
export const generateCertificateHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { certificateType, sessionId, quizSessionId, includePhoto } = req.body;

    if (!certificateType) {
      res.status(400).json({ error: 'certificateType is required' });
      return;
    }

    const request: CertificateGenerationRequest = {
      userId,
      certificateType,
      sessionId,
      quizSessionId,
      includePhoto,
    };

    const certificate = await generateCertificate(request);

    res.status(201).json({
      success: true,
      certificate,
    });
  } catch (error: any) {
    console.error('Error generating certificate:', error);
    res.status(500).json({
      error: 'Failed to generate certificate',
      message: error.message,
    });
  }
};

/**
 * Get certificate by ID
 * GET /api/certificates/:id
 */
export const getCertificateByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const certificate = await getCertificateById(id);

    if (!certificate) {
      res.status(404).json({ error: 'Certificate not found' });
      return;
    }

    // Check authorization - user can only view their own certificates unless admin
    if (certificate.userId !== userId && req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    res.json({
      success: true,
      certificate,
    });
  } catch (error: any) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({
      error: 'Failed to fetch certificate',
      message: error.message,
    });
  }
};

/**
 * Get certificate by verification code (public endpoint)
 * GET /api/certificates/verify/:code
 */
export const verifyCertificateHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.params;

    const certificate = await getCertificateByCode(code);

    if (!certificate) {
      res.status(404).json({ error: 'Certificate not found' });
      return;
    }

    res.json({
      success: true,
      certificate,
      verified: true,
    });
  } catch (error: any) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({
      error: 'Failed to verify certificate',
      message: error.message,
    });
  }
};

/**
 * Get all certificates for authenticated user
 * GET /api/certificates/me
 */
export const getMyCertificatesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const certificates = await getUserCertificates(userId);

    res.json({
      success: true,
      certificates,
      count: certificates.length,
    });
  } catch (error: any) {
    console.error('Error fetching user certificates:', error);
    res.status(500).json({
      error: 'Failed to fetch certificates',
      message: error.message,
    });
  }
};

/**
 * Get certificate statistics for authenticated user
 * GET /api/certificates/stats
 */
export const getCertificateStatsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const stats = await getCertificateStats(userId);

    res.json({
      success: true,
      stats,
    });
  } catch (error: any) {
    console.error('Error fetching certificate stats:', error);
    res.status(500).json({
      error: 'Failed to fetch certificate statistics',
      message: error.message,
    });
  }
};

/**
 * Download certificate PDF
 * GET /api/certificates/:id/download
 */
export const downloadCertificatePdfHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const certificate = await getCertificateById(id);

    if (!certificate) {
      res.status(404).json({ error: 'Certificate not found' });
      return;
    }

    // Check authorization
    if (certificate.userId !== userId && req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    // Generate PDF
    const pdfBuffer = await generateCertificatePdf(certificate);

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="certificado_${certificate.certificateCode}.pdf"`
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    res.send(pdfBuffer);
  } catch (error: any) {
    console.error('Error downloading certificate PDF:', error);
    res.status(500).json({
      error: 'Failed to generate certificate PDF',
      message: error.message,
    });
  }
};

/**
 * Preview certificate PDF (view in browser)
 * GET /api/certificates/:id/preview
 */
export const previewCertificatePdfHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const certificate = await getCertificateById(id);

    if (!certificate) {
      res.status(404).json({ error: 'Certificate not found' });
      return;
    }

    // Check authorization
    if (certificate.userId !== userId && req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    // Generate PDF
    const pdfBuffer = await generateCertificatePdf(certificate);

    // Set headers for PDF viewing in browser
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    res.setHeader('Content-Length', pdfBuffer.length);

    res.send(pdfBuffer);
  } catch (error: any) {
    console.error('Error previewing certificate PDF:', error);
    res.status(500).json({
      error: 'Failed to generate certificate PDF',
      message: error.message,
    });
  }
};

/**
 * Get all certificates (admin only)
 * GET /api/admin/certificates
 */
export const getAllCertificatesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const certificates = await getAllCertificates(limit, offset);

    res.json({
      success: true,
      certificates,
      count: certificates.length,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Error fetching all certificates:', error);
    res.status(500).json({
      error: 'Failed to fetch certificates',
      message: error.message,
    });
  }
};

/**
 * Delete a certificate (admin only)
 * DELETE /api/admin/certificates/:id
 */
export const deleteCertificateHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await deleteCertificate(id);

    if (!deleted) {
      res.status(404).json({ error: 'Certificate not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Certificate deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({
      error: 'Failed to delete certificate',
      message: error.message,
    });
  }
};

/**
 * Generate a test certificate for demo purposes (admin only)
 * POST /api/admin/certificates/test
 *
 * This endpoint looks for ANY completed live session in the system and
 * generates a certificate for testing purposes. If none exist, it returns
 * a helpful error message.
 */
export const generateTestCertificateHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { type } = req.body;

    if (!type || type !== 'live_session') {
      res.status(400).json({
        error: 'Invalid type. Must be "live_session"',
      });
      return;
    }

    // Find ANY completed live session with participants (for admin testing)
    const { pool } = require('../config/database');

    // First, try to find a session the admin participated in
    let result = await pool.query(
      `SELECT sp.session_id, sp.user_id, s.status, s.name
       FROM session_participants sp
       JOIN sessions s ON sp.session_id = s.id
       WHERE sp.user_id = $1 AND s.status = 'completed'
       ORDER BY sp.joined_at DESC
       LIMIT 1`,
      [userId]
    );

    // If admin hasn't participated in any sessions, find any completed session
    if (result.rows.length === 0) {
      result = await pool.query(
        `SELECT sp.session_id, sp.user_id, s.status, s.name
         FROM session_participants sp
         JOIN sessions s ON sp.session_id = s.id
         WHERE s.status = 'completed'
         ORDER BY s.completed_at DESC
         LIMIT 1`
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          error: 'No hay ensayos completados en el sistema',
          message: 'Para generar un certificado de prueba, primero debe haber al menos un ensayo en vivo completado en el sistema. Puedes crear y completar un ensayo desde la sección de Live Sessions.',
        });
        return;
      }

      // Use the first participant from that session
      console.log(`⚠️ Admin hasn't participated in any sessions. Using session: ${result.rows[0].name} with user: ${result.rows[0].user_id}`);
    }

    const sessionId = result.rows[0].session_id;
    const targetUserId = result.rows[0].user_id;

    const request: CertificateGenerationRequest = {
      userId: targetUserId, // Use the target user (could be admin or another user)
      certificateType: 'live_session',
      sessionId: sessionId,
    };

    const certificate = await generateCertificate(request);

    res.status(201).json({
      success: true,
      certificate,
      message: targetUserId === userId
        ? 'Certificado generado desde tu sesión completada'
        : 'Certificado de prueba generado desde una sesión de ejemplo',
      isOwnSession: targetUserId === userId,
    });
  } catch (error: any) {
    console.error('Error generating test certificate:', error);
    res.status(500).json({
      error: 'Failed to generate test certificate',
      message: error.message,
    });
  }
};
