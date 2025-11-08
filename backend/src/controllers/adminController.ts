import { Request, Response } from 'express';
import { pool } from '../config/database';
import { extractTextFromPDF, validateQuestion, convertToQuestionFormat } from '../services/pdfService';
import { extractQuestionsWithVision, validateVisionQuestion } from '../services/pdfVisionService';
import { getImage, getImageMimeType } from '../services/imageStorageService';
import { Question } from '../types';

/**
 * Timeout wrapper for promises
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorMessage: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    ),
  ]);
}

/**
 * Upload and process PDF to extract questions
 * @route   POST /api/admin/upload-pdf
 * @access  Private (Admin only)
 */
export const uploadPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { buffer, originalname, size } = req.file;

    console.log(`📤 Processing PDF upload: ${originalname} (${(size / 1024).toFixed(1)} KB)`);

    // Record upload in database
    const uploadResult = await pool.query(
      `INSERT INTO pdf_uploads (filename, file_size, uploaded_by, status, uploaded_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [originalname, size, userId, 'processing', Date.now()]
    );

    const uploadId = uploadResult.rows[0].id;
    console.log(`💾 Created upload record with ID: ${uploadId}`);

    try {
      const processingLogs: string[] = [];
      processingLogs.push(`📤 Processing PDF: ${originalname} (${(size / 1024).toFixed(1)} KB)`);
      processingLogs.push(`💾 Upload ID: ${uploadId}`);
      processingLogs.push(`🔄 Starting PDF text extraction...`);

      // Extract text from PDF with 30 second timeout
      const { questions, rawText, totalPages, logs } = await withTimeout(
        extractTextFromPDF(buffer),
        30000,
        'PDF processing timed out after 30 seconds. Please try a smaller file.'
      );
      processingLogs.push(...logs);

      // Filter valid questions
      const validQuestions = questions.filter(validateQuestion);
      const validationLog = `✅ Validation complete: ${validQuestions.length}/${questions.length} questions are valid`;
      console.log(validationLog);
      processingLogs.push(validationLog);

      // Update upload status
      await pool.query(
        `UPDATE pdf_uploads
         SET status = $1, questions_extracted = $2
         WHERE id = $3`,
        ['completed', validQuestions.length, uploadId]
      );

      const completeLog = `🎉 PDF processing complete! Returning ${validQuestions.length} questions to client`;
      console.log(completeLog);
      processingLogs.push(completeLog);

      res.json({
        success: true,
        uploadId,
        totalPages,
        questionsFound: questions.length,
        validQuestions: validQuestions.length,
        questions: validQuestions,
        rawText: rawText.substring(0, 500), // First 500 chars for preview
        logs: processingLogs,
      });
    } catch (error) {
      // Update upload status to failed
      await pool.query(
        `UPDATE pdf_uploads 
         SET status = $1, error_message = $2
         WHERE id = $3`,
        ['failed', (error as Error).message, uploadId]
      );

      throw error;
    }
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).json({
      error: 'Failed to process PDF',
      message: (error as Error).message,
    });
  }
};

/**
 * Upload and process PDF using Claude Vision API
 * @route   POST /api/admin/upload-pdf-vision
 * @access  Private (Admin only)
 */
export const uploadPDFWithVision = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { buffer, originalname, size } = req.file;

    console.log(`📤 Processing PDF with Vision API: ${originalname} (${(size / 1024).toFixed(1)} KB)`);

    // Record upload in database
    const uploadResult = await pool.query(
      `INSERT INTO pdf_uploads (filename, file_size, uploaded_by, status, uploaded_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [originalname, size, userId, 'processing', Date.now()]
    );

    const uploadId = uploadResult.rows[0].id;
    console.log(`💾 Created upload record with ID: ${uploadId}`);

    try {
      const processingLogs: string[] = [];
      processingLogs.push(`📤 Processing PDF with Vision: ${originalname} (${(size / 1024).toFixed(1)} KB)`);
      processingLogs.push(`💾 Upload ID: ${uploadId}`);
      processingLogs.push(`🔄 Starting Vision-based extraction...`);

      // Extract questions using Vision API with 120 second timeout
      const { questions, totalPages, logs, extractedImages } = await withTimeout(
        extractQuestionsWithVision(buffer),
        120000,
        'Vision API processing timed out after 120 seconds. Please try a smaller file.'
      );
      processingLogs.push(...logs);

      // Filter valid questions
      const validQuestions = questions.filter(validateVisionQuestion);
      const validationLog = `✅ Validation complete: ${validQuestions.length}/${questions.length} questions are valid`;
      console.log(validationLog);
      processingLogs.push(validationLog);

      // Update upload status
      await pool.query(
        `UPDATE pdf_uploads
         SET status = $1, questions_extracted = $2
         WHERE id = $3`,
        ['completed', validQuestions.length, uploadId]
      );

      const completeLog = `🎉 Vision processing complete! Found ${validQuestions.length} questions with ${extractedImages.length} images`;
      console.log(completeLog);
      processingLogs.push(completeLog);

      res.json({
        success: true,
        uploadId,
        totalPages,
        questionsFound: questions.length,
        validQuestions: validQuestions.length,
        extractedImages: extractedImages.length,
        questions: validQuestions,
        logs: processingLogs,
      });
    } catch (error) {
      // Update upload status to failed
      await pool.query(
        `UPDATE pdf_uploads
         SET status = $1, error_message = $2
         WHERE id = $3`,
        ['failed', (error as Error).message, uploadId]
      );

      throw error;
    }
  } catch (error) {
    console.error('Error uploading PDF with vision:', error);
    res.status(500).json({
      error: 'Failed to process PDF with vision',
      message: (error as Error).message,
    });
  }
};

/**
 * Save extracted questions to database
 * @route   POST /api/admin/save-questions
 * @access  Private (Admin only)
 */
export const saveQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      res.status(400).json({ error: 'No questions provided' });
      return;
    }

    const savedQuestions: Question[] = [];

    for (const question of questions) {
      try {
        // Validate required fields
        if (!question.id || !question.level || !question.subject || !question.question ||
            !question.options || !question.difficulty || !question.skills) {
          console.warn('Skipping invalid question:', question);
          continue;
        }

        const result = await pool.query(
          `INSERT INTO questions (
            id, level, topic, subject, question, question_latex,
            options, options_latex, correct_answer, explanation, explanation_latex,
            difficulty, skills, images, visual_data, created_at, updated_at, created_by
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
          ON CONFLICT (id) DO UPDATE SET
            level = EXCLUDED.level,
            topic = EXCLUDED.topic,
            subject = EXCLUDED.subject,
            question = EXCLUDED.question,
            question_latex = EXCLUDED.question_latex,
            options = EXCLUDED.options,
            options_latex = EXCLUDED.options_latex,
            correct_answer = EXCLUDED.correct_answer,
            explanation = EXCLUDED.explanation,
            explanation_latex = EXCLUDED.explanation_latex,
            difficulty = EXCLUDED.difficulty,
            skills = EXCLUDED.skills,
            images = EXCLUDED.images,
            visual_data = EXCLUDED.visual_data,
            updated_at = EXCLUDED.updated_at
          RETURNING *`,
          [
            question.id,
            question.level,
            question.topic,
            question.subject,
            question.question,
            question.questionLatex || question.question,
            JSON.stringify(question.options),
            JSON.stringify(question.optionsLatex || question.options),
            question.correctAnswer,
            question.explanation,
            question.explanationLatex || question.explanation,
            question.difficulty,
            JSON.stringify(question.skills),
            question.images ? JSON.stringify(question.images) : null,
            question.visualData ? JSON.stringify(question.visualData) : null,
            Date.now(),
            Date.now(),
            userId,
          ]
        );

        savedQuestions.push(result.rows[0]);
      } catch (error) {
        console.error('Error saving question:', question.id, error);
      }
    }

    res.json({
      success: true,
      saved: savedQuestions.length,
      questions: savedQuestions,
    });
  } catch (error) {
    console.error('Error saving questions:', error);
    res.status(500).json({
      error: 'Failed to save questions',
      message: (error as Error).message,
    });
  }
};

/**
 * Get all questions from database
 * @route   GET /api/admin/questions
 * @access  Private (Admin only)
 */
export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { level, subject, difficulty } = req.query;

    let query = 'SELECT * FROM questions WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    if (level) {
      query += ` AND level = $${paramCount}`;
      params.push(level);
      paramCount++;
    }

    if (subject) {
      query += ` AND subject = $${paramCount}`;
      params.push(subject);
      paramCount++;
    }

    if (difficulty) {
      query += ` AND difficulty = $${paramCount}`;
      params.push(difficulty);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);

    // Parse JSON fields
    const questions = result.rows.map(row => ({
      ...row,
      options: JSON.parse(row.options),
      optionsLatex: row.options_latex ? JSON.parse(row.options_latex) : null,
      skills: JSON.parse(row.skills),
      images: row.images ? JSON.parse(row.images) : null,
      visualData: row.visual_data ? JSON.parse(row.visual_data) : null,
    }));

    res.json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      error: 'Failed to fetch questions',
      message: (error as Error).message,
    });
  }
};

/**
 * Get upload history
 * @route   GET /api/admin/uploads
 * @access  Private (Admin only)
 */
export const getUploads = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT 
        u.id, u.filename, u.file_size, u.status, 
        u.questions_extracted, u.error_message, u.uploaded_at,
        users.username, users.display_name
       FROM pdf_uploads u
       LEFT JOIN users ON u.uploaded_by = users.id
       ORDER BY u.uploaded_at DESC
       LIMIT 50`
    );

    res.json({
      success: true,
      uploads: result.rows,
    });
  } catch (error) {
    console.error('Error fetching uploads:', error);
    res.status(500).json({
      error: 'Failed to fetch uploads',
      message: (error as Error).message,
    });
  }
};

/**
 * Serve uploaded images
 * @route   GET /api/images/:filename
 * @access  Public (images are public once uploaded)
 */
export const serveImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename } = req.params;

    const imageBuffer = await getImage(filename);

    if (!imageBuffer) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    const mimeType = getImageMimeType(filename);
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({
      error: 'Failed to serve image',
      message: (error as Error).message,
    });
  }
};
