/**
 * ============================================================================
 * CERTIFICATE ROUTES
 * ============================================================================
 *
 * Routes for certificate operations
 */

import { Router } from 'express';
import {
  generateCertificateHandler,
  getCertificateByIdHandler,
  verifyCertificateHandler,
  getMyCertificatesHandler,
  getCertificateStatsHandler,
  downloadCertificatePdfHandler,
  previewCertificatePdfHandler,
  getAllCertificatesHandler,
  deleteCertificateHandler,
  generateTestCertificateHandler,
} from '../controllers/certificateController';
import { authenticate, requireAdmin } from '../auth/middleware';

const router = Router();

// ============================================================================
// PUBLIC ROUTES
// ============================================================================

/**
 * Verify certificate by code (public)
 * GET /api/certificates/verify/:code
 */
router.get('/verify/:code', verifyCertificateHandler);

// ============================================================================
// AUTHENTICATED ROUTES
// ============================================================================

/**
 * Generate a new certificate
 * POST /api/certificates/generate
 */
router.post('/generate', authenticate, generateCertificateHandler);

/**
 * Get all certificates for current user
 * GET /api/certificates/me
 */
router.get('/me', authenticate, getMyCertificatesHandler);

/**
 * Get certificate statistics for current user
 * GET /api/certificates/stats
 */
router.get('/stats', authenticate, getCertificateStatsHandler);

/**
 * Get certificate by ID
 * GET /api/certificates/:id
 */
router.get('/:id', authenticate, getCertificateByIdHandler);

/**
 * Download certificate PDF
 * GET /api/certificates/:id/download
 */
router.get('/:id/download', authenticate, downloadCertificatePdfHandler);

/**
 * Preview certificate PDF
 * GET /api/certificates/:id/preview
 */
router.get('/:id/preview', authenticate, previewCertificatePdfHandler);

// ============================================================================
// ADMIN ROUTES
// ============================================================================

/**
 * Get all certificates (admin)
 * GET /api/admin/certificates
 */
router.get('/admin/all', authenticate, requireAdmin, getAllCertificatesHandler);

/**
 * Generate test certificate (admin)
 * POST /api/admin/certificates/test
 */
router.post('/admin/test', authenticate, requireAdmin, generateTestCertificateHandler);

/**
 * Delete certificate (admin)
 * DELETE /api/admin/certificates/:id
 */
router.delete('/admin/:id', authenticate, requireAdmin, deleteCertificateHandler);

export default router;
