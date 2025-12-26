import { Router } from 'express';
import multer from 'multer';
import { uploadPDF, uploadPDFWithVision, saveQuestions, getQuestions, getUploads, serveImage } from '../controllers/adminController';
import {
  captureHandler,
  listFilesHandler,
  serveFileHandler,
  deleteFileHandler,
  getConfigHandler,
} from '../controllers/marketingController';
import { authenticate, requireAdmin } from '../auth/middleware';

const router = Router();

// Configure multer for memory storage (files stored in memory as Buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit to prevent server blocking
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

/**
 * @route   POST /api/admin/upload-pdf
 * @desc    Upload and extract questions from PDF (text-based)
 * @access  Private (Admin only)
 */
router.post('/upload-pdf', authenticate, requireAdmin, upload.single('pdf'), uploadPDF);

/**
 * @route   POST /api/admin/upload-pdf-vision
 * @desc    Upload and extract questions from PDF using Claude Vision API
 * @access  Private (Admin only)
 */
router.post('/upload-pdf-vision', authenticate, requireAdmin, upload.single('pdf'), uploadPDFWithVision);

/**
 * @route   POST /api/admin/save-questions
 * @desc    Save extracted questions to database
 * @access  Private (Admin only)
 */
router.post('/save-questions', authenticate, requireAdmin, saveQuestions);

/**
 * @route   GET /api/admin/questions
 * @desc    Get all questions from database
 * @access  Private (Admin only)
 */
router.get('/questions', authenticate, requireAdmin, getQuestions);

/**
 * @route   GET /api/admin/uploads
 * @desc    Get PDF upload history
 * @access  Private (Admin only)
 */
router.get('/uploads', authenticate, requireAdmin, getUploads);

// ============================================================================
// MARKETING CONTENT GENERATION ROUTES
// ============================================================================

/**
 * @route   GET /api/admin/marketing/config
 * @desc    Get available presets and capture types
 * @access  Private (Admin only)
 */
router.get('/marketing/config', authenticate, requireAdmin, getConfigHandler);

/**
 * @route   POST /api/admin/marketing/capture
 * @desc    Capture marketing content (screenshot, GIF, or video)
 * @access  Private (Admin only)
 */
router.post('/marketing/capture', authenticate, requireAdmin, captureHandler);

/**
 * @route   GET /api/admin/marketing/files
 * @desc    List all captured marketing files
 * @access  Private (Admin only)
 */
router.get('/marketing/files', authenticate, requireAdmin, listFilesHandler);

/**
 * @route   GET /api/admin/marketing/files/:filename
 * @desc    Serve a captured file for viewing/download
 * @access  Private (Admin only)
 */
router.get('/marketing/files/:filename', authenticate, requireAdmin, serveFileHandler);

/**
 * @route   DELETE /api/admin/marketing/files/:filename
 * @desc    Delete a captured file
 * @access  Private (Admin only)
 */
router.delete('/marketing/files/:filename', authenticate, requireAdmin, deleteFileHandler);

export default router;
