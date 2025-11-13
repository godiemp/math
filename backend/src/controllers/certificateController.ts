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
 */
export const generateTestCertificateHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Get the user's most recent quiz session or live session
    const { type } = req.body;

    if (!type || (type !== 'quiz_session' && type !== 'live_session')) {
      res.status(400).json({
        error: 'Invalid type. Must be "quiz_session" or "live_session"',
      });
      return;
    }

    // Try to find a recent session
    let request: CertificateGenerationRequest;

    if (type === 'quiz_session') {
      // Find most recent quiz session
      const { pool } = require('../config/database');
      const result = await pool.query(
        `SELECT DISTINCT quiz_session_id
         FROM quiz_attempts
         WHERE user_id = $1 AND quiz_session_id IS NOT NULL
         ORDER BY MAX(attempted_at) DESC
         LIMIT 1`,
        [userId]
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          error: 'No quiz sessions found for this user. Complete a quiz first.',
        });
        return;
      }

      request = {
        userId,
        certificateType: 'quiz_session',
        quizSessionId: result.rows[0].quiz_session_id,
      };
    } else {
      // Find most recent live session
      const { pool } = require('../config/database');
      const result = await pool.query(
        `SELECT session_id
         FROM session_participants
         WHERE user_id = $1
         ORDER BY joined_at DESC
         LIMIT 1`,
        [userId]
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          error: 'No live sessions found for this user. Join a session first.',
        });
        return;
      }

      request = {
        userId,
        certificateType: 'live_session',
        sessionId: result.rows[0].session_id,
      };
    }

    const certificate = await generateCertificate(request);

    res.status(201).json({
      success: true,
      certificate,
      message: 'Test certificate generated successfully',
    });
  } catch (error: any) {
    console.error('Error generating test certificate:', error);
    res.status(500).json({
      error: 'Failed to generate test certificate',
      message: error.message,
    });
  }
};
