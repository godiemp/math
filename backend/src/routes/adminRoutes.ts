import { Router } from 'express';
import multer from 'multer';
import { uploadPDF, uploadPDFWithVision, saveQuestions, getQuestions, getUploads, serveImage } from '../controllers/adminController';
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

export default router;
