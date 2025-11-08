import { Question } from '../types';

export interface ExtractedQuestion {
  question: string;
  options: string[];
  correctAnswer?: number;
  explanation?: string;
}

export interface PDFExtractionResult {
  questions: ExtractedQuestion[];
  rawText: string;
  totalPages: number;
}

/**
 * Extract text from PDF buffer using pdfjs-dist
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<PDFExtractionResult> {
  try {
    // Dynamic import of pdfjs-dist (works in Node.js without canvas)
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
      useSystemFonts: true,
      standardFontDataUrl: 'node_modules/pdfjs-dist/standard_fonts/',
    });

    const pdfDocument = await loadingTask.promise;
    const totalPages = pdfDocument.numPages;

    // Extract text from all pages
    let fullText = '';

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Combine all text items with spaces
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');

      fullText += pageText + '\n\n';
    }

    const questions = parseQuestionsFromText(fullText);

    return {
      questions,
      rawText: fullText,
      totalPages,
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
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
