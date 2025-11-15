import Anthropic from '@anthropic-ai/sdk';
import { saveImage, StoredImage } from './imageStorageService';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface ExtractedImage {
  id: string;
  url: string;
  description: string;
  type: 'diagram' | 'table' | 'graph' | 'formula' | 'other';
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ExtractedQuestionWithVision {
  question: string;
  questionLatex?: string;
  options: string[];
  optionsLatex?: string[];
  correctAnswer?: number;
  explanation?: string;
  explanationLatex?: string;
  images: ExtractedImage[];
  hasLatex: boolean;
}

export interface PDFVisionExtractionResult {
  questions: ExtractedQuestionWithVision[];
  totalPages: number;
  logs: string[];
  extractedImages: StoredImage[];
}

/**
 * Analyze PDF using Claude Vision API (native PDF support)
 */
async function analyzePDFWithClaude(
  pdfBuffer: Buffer,
  logs: string[]
): Promise<ExtractedQuestionWithVision[]> {
  const log = (message: string) => {
    console.log(message);
    logs.push(message);
  };

  try {
    log(`🔍 Analyzing PDF with Claude Vision API (native PDF support)...`);

    // Convert buffer to base64
    const base64PDF = pdfBuffer.toString('base64');

    // Call Claude Vision API with PDF document (using latest Sonnet 4.5 model)
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 16000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: base64PDF,
              },
            },
            {
              type: 'text',
              text: `Analyze this math exam PDF and extract all questions with their details.

For each question, provide:
1. Question text (convert mathematical notation to LaTeX when applicable)
2. Four options (A, B, C, D) - convert to LaTeX if they contain math
3. Correct answer (if visible or can be determined)
4. Explanation (if provided)
5. Any images, diagrams, tables, or illustrations present

IMPORTANT INSTRUCTIONS:
- Convert ALL mathematical formulas and expressions to LaTeX format
- For inline math, use $...$
- For display math, use $$...$$
- If there are diagrams, tables, or illustrations, describe them in detail
- Identify the type of visual content: diagram, table, graph, formula, or other
- Preserve exact mathematical notation and symbols
- Include the page number where each question appears

Return the data in this JSON format:
{
  "totalPages": <number of pages>,
  "questions": [
    {
      "question": "Question text here",
      "questionLatex": "Question with $LaTeX$ formulas",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "optionsLatex": ["Option A with $x^2$", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation text",
      "explanationLatex": "Explanation with $LaTeX$",
      "images": [
        {
          "description": "Triangle diagram showing sides a, b, c with angle theta",
          "type": "diagram"
        }
      ],
      "hasLatex": true,
      "pageNumber": 1
    }
  ]
}

If no questions are found, return {"totalPages": 1, "questions": []}`,
            },
          ],
        },
      ],
    });

    // Parse response
    const content = response.content[0];
    if (content.type === 'text') {
      const text = content.text;

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const questions: ExtractedQuestionWithVision[] = parsed.questions.map((q: any) => ({
          question: q.question || '',
          questionLatex: q.questionLatex,
          options: q.options || [],
          optionsLatex: q.optionsLatex,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          explanationLatex: q.explanationLatex,
          images: (q.images || []).map((img: any) => ({
            id: '',
            url: '',
            description: img.description || '',
            type: img.type || 'other',
          })),
          hasLatex: q.hasLatex || false,
        }));

        log(`✅ Found ${questions.length} questions across ${parsed.totalPages || 1} pages`);
        return questions;
      }
    }

    log(`⚠️ No questions found in PDF`);
    return [];
  } catch (error) {
    log(`❌ Error analyzing PDF: ${error}`);
    console.error('Vision API error:', error);
    throw error;
  }
}

/**
 * Extract images for questions that have descriptions
 * Since we can't extract actual images from the PDF easily in Node.js,
 * we create placeholder records for now
 */
async function createImagePlaceholders(
  questions: ExtractedQuestionWithVision[]
): Promise<void> {
  for (const question of questions) {
    if (question.images && question.images.length > 0) {
      // For now, we just create placeholder image entries
      // In a future enhancement, you could:
      // 1. Use external tools to extract images from PDF
      // 2. Ask users to upload images separately
      // 3. Use a PDF processing service
      for (const img of question.images) {
        img.id = `placeholder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        img.url = ''; // No actual image URL for now
      }
    }
  }
}

/**
 * Enhanced PDF extraction using Claude Vision API
 */
export async function extractQuestionsWithVision(
  buffer: Buffer
): Promise<PDFVisionExtractionResult> {
  const logs: string[] = [];
  const extractedImages: StoredImage[] = [];

  const log = (message: string) => {
    console.log(message);
    logs.push(message);
  };

  try {
    log('📄 Starting enhanced PDF extraction with Claude Vision API...');

    // Analyze PDF with Claude (native PDF support)
    const questions = await analyzePDFWithClaude(buffer, logs);

    // Create placeholder image entries
    await createImagePlaceholders(questions);

    log(`✅ Extraction complete: ${questions.length} total questions found`);

    return {
      questions,
      totalPages: 1, // Claude will tell us the actual page count
      logs,
      extractedImages,
    };
  } catch (error) {
    log(`❌ Fatal error during extraction: ${error}`);
    throw error;
  }
}

/**
 * Validate extracted question with vision data
 */
export function validateVisionQuestion(question: ExtractedQuestionWithVision): boolean {
  return (
    question.questionLatex.length > 0 &&
    question.options.length === 4 &&
    question.options.every((opt) => opt.length > 0)
  );
}
