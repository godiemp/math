import { Question } from '../types';

// Use require for pdf-parse due to CommonJS compatibility issues
const pdfParse = require('pdf-parse');

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
 * Extract text from PDF buffer
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<PDFExtractionResult> {
  try {
    const data = await pdfParse(buffer);

    const questions = parseQuestionsFromText(data.text);

    return {
      questions,
      rawText: data.text,
      totalPages: data.numpages,
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
