import { Question } from '../types';
import { createWorker } from 'tesseract.js';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface ExtractedQuestion {
  question: string;
  options: string[];
  correctAnswer?: number;
  explanation?: string;
}

export interface PDFExtractionResult {
  questions: ExtractedQuestion[];
  rawText: string;
  ocrText: string;
  totalPages: number;
  logs: string[];
}

/**
 * Extract text from PDF using OCR (Tesseract)
 * Converts PDF pages to high-quality images (captures all content including embedded images)
 */
async function extractTextWithOCR(buffer: Buffer, logs: string[]): Promise<string> {
  const log = (message: string) => {
    console.log(message);
    logs.push(message);
  };

  let tempFilePath: string | null = null;
  const imageFiles: string[] = [];

  try {
    log('🔍 Starting OCR extraction...');

    // Save PDF buffer to temporary file
    const tempDir = os.tmpdir();
    tempFilePath = path.join(tempDir, `pdf-ocr-${Date.now()}.pdf`);
    fs.writeFileSync(tempFilePath, buffer);
    log(`  Saved PDF to temp file`);

    // Convert PDF to high-resolution images (3x scale for better quality)
    log(`  Converting PDF to high-resolution images...`);

    // Dynamic import for ES Module
    const { pdf } = await import('pdf-to-img');
    const document = await pdf(tempFilePath, { scale: 3.0 });

    let pageNum = 0;
    let ocrText = '';

    // Create Tesseract worker
    log(`  Initializing Tesseract OCR (Spanish)...`);
    const worker = await createWorker('spa', 1, {
      logger: m => {
        if (m.status === 'recognizing text') {
          log(`    Page ${pageNum + 1} OCR progress: ${Math.round(m.progress * 100)}%`);
        }
      }
    });

    // Process each page image
    for await (const image of document) {
      pageNum++;
      log(`  Processing page ${pageNum}...`);

      // Save raw image to temp file
      const rawImagePath = path.join(tempDir, `pdf-page-raw-${Date.now()}-${pageNum}.png`);
      fs.writeFileSync(rawImagePath, image);
      imageFiles.push(rawImagePath);

      // Preprocess image for better OCR
      // - Convert to grayscale
      // - Increase contrast
      // - Sharpen the image
      // - Normalize lighting
      log(`    Enhancing image quality for OCR...`);
      const enhancedImagePath = path.join(tempDir, `pdf-page-enhanced-${Date.now()}-${pageNum}.png`);
      await sharp(rawImagePath)
        .grayscale()                    // Convert to grayscale
        .normalize()                    // Normalize histogram (improve contrast)
        .sharpen()                      // Sharpen edges
        .threshold(128)                 // Binary threshold for clearer text
        .toFile(enhancedImagePath);
      imageFiles.push(enhancedImagePath);

      // Run OCR on the enhanced image
      log(`    Running OCR on enhanced image...`);
      const { data: { text } } = await worker.recognize(enhancedImagePath);
      ocrText += `\n\n=== PAGE ${pageNum} ===\n\n${text}`;

      log(`  ✅ Page ${pageNum} complete (${text.length} characters)`);
    }

    await worker.terminate();
    log(`✅ OCR extraction complete - ${pageNum} pages, ${ocrText.length} total characters`);

    return ocrText;
  } catch (error) {
    const errorMsg = `❌ OCR error: ${error}`;
    log(errorMsg);
    console.error('OCR error details:', error);
    return `OCR failed: ${error}`;
  } finally {
    // Clean up temp files
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
        log(`  Cleaned up temp PDF file`);
      } catch (err) {
        log(`  Warning: Could not delete temp PDF: ${err}`);
      }
    }

    // Clean up image files
    for (const imageFile of imageFiles) {
      try {
        if (fs.existsSync(imageFile)) {
          fs.unlinkSync(imageFile);
        }
      } catch (err) {
        log(`  Warning: Could not delete temp image: ${err}`);
      }
    }
    if (imageFiles.length > 0) {
      log(`  Cleaned up ${imageFiles.length} temp image files`);
    }
  }
}

/**
 * Extract text from PDF buffer using pdf2json
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<PDFExtractionResult> {
  const logs: string[] = [];

  const log = (message: string) => {
    console.log(message);
    logs.push(message);
  };

  // Extract text using pdf2json (faster, for text-based PDFs)
  const textResult = await new Promise<{ text: string; pages: number }>((resolve, reject) => {
    try {
      const PDFParser = require('pdf2json');
      const pdfParser = new PDFParser();

      pdfParser.on('pdfParser_dataError', (errData: any) => {
        const errorMsg = `PDF parsing error: ${errData.parserError}`;
        console.error(errorMsg);
        logs.push(`❌ ${errorMsg}`);
        reject(new Error('Failed to parse PDF file'));
      });

      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        try {
          // Extract text from all pages
          let fullText = '';
          const totalPages = pdfData.Pages.length;
          log(`📄 PDF has ${totalPages} pages, extracting text...`);

          for (let i = 0; i < pdfData.Pages.length; i++) {
            const page = pdfData.Pages[i];
            log(`  Processing page ${i + 1}/${totalPages}...`);

            // Extract text from each text block in the page
            for (const textBlock of page.Texts) {
              for (const textItem of textBlock.R) {
                // Decode URI-encoded text
                const decodedText = decodeURIComponent(textItem.T);
                fullText += decodedText + ' ';
              }
            }
            fullText += '\n\n';
          }

          log(`✅ Text extraction complete (${fullText.length} characters)`);

          resolve({ text: fullText, pages: totalPages });
        } catch (error) {
          const errorMsg = `Error processing PDF data: ${error}`;
          console.error(errorMsg);
          logs.push(`❌ ${errorMsg}`);
          reject(new Error('Failed to process PDF content'));
        }
      });

      // Parse the PDF buffer
      pdfParser.parseBuffer(buffer);
    } catch (error) {
      const errorMsg = `Error initializing PDF parser: ${error}`;
      console.error(errorMsg);
      reject(new Error('Failed to initialize PDF parser'));
    }
  });

  // Extract text using OCR (slower, for image-based content)
  const ocrText = await extractTextWithOCR(buffer, logs);

  log(`🔍 Parsing questions from extracted text...`);
  const questions = parseQuestionsFromText(textResult.text);
  log(`✅ Found ${questions.length} questions from text extraction`);

  return {
    questions,
    rawText: textResult.text,
    ocrText,
    totalPages: textResult.pages,
    logs,
  };
}

/**
 * Parse questions from extracted text
 * This is a basic implementation that looks for common patterns
 * You may need to customize this based on your PDF format
 */
function parseQuestionsFromText(text: string): ExtractedQuestion[] {
  const questions: ExtractedQuestion[] = [];

  // Split by question numbers (e.g., "1.", "2.", etc.)
  const questionPattern = /(?:^|\n)(\d+)\.\s*(.+?)(?=\n\d+\.|$)/gs;
  const matches = [...text.matchAll(questionPattern)];

  for (const match of matches) {
    const questionText = match[2].trim();

    // Extract options (A), B), C), D) or a), b), c), d)
    const optionPattern = /(?:[A-Da-d][\).])\s*(.+?)(?=[A-Da-d][\).]|$)/gs;
    const optionMatches = [...questionText.matchAll(optionPattern)];

    if (optionMatches.length >= 4) {
      const options = optionMatches.slice(0, 4).map(m => m[1].trim());

      // Extract the question text (before the options)
      const questionOnly = questionText.split(/[A-Da-d][\).]/)[0].trim();

      questions.push({
        question: questionOnly,
        options,
      });
    }
  }

  return questions;
}

/**
 * Validate and enrich extracted questions
 */
export function validateQuestion(question: ExtractedQuestion): boolean {
  return (
    question.question.length > 0 &&
    question.options.length === 4 &&
    question.options.every(opt => opt.length > 0)
  );
}

/**
 * Convert extracted question to database question format
 */
export function convertToQuestionFormat(
  extracted: ExtractedQuestion,
  metadata: {
    id: string;
    level: 'M1' | 'M2';
    topic: string;
    subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
    difficulty: 'easy' | 'medium' | 'hard';
    skills: string[];
    createdBy: string;
  }
): Question {
  const now = Date.now();

  return {
    id: metadata.id,
    level: metadata.level,
    topic: metadata.topic,
    subject: metadata.subject,
    question: extracted.question,
    questionLatex: extracted.question, // You may want to convert this
    options: extracted.options,
    optionsLatex: extracted.options,
    correctAnswer: extracted.correctAnswer ?? 0,
    explanation: extracted.explanation ?? 'No explanation provided.',
    explanationLatex: extracted.explanation ?? 'No explanation provided.',
    difficulty: metadata.difficulty,
    skills: metadata.skills,
    createdAt: now,
    updatedAt: now,
    createdBy: metadata.createdBy,
  };
}
