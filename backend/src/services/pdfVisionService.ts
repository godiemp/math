import Anthropic from '@anthropic-ai/sdk';
import { PDFDocument } from 'pdf-lib';
import { saveImage, StoredImage } from './imageStorageService';
import { createCanvas } from 'canvas';

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
 * Convert PDF buffer to images (one per page)
 */
async function pdfToImages(buffer: Buffer): Promise<Buffer[]> {
  const images: Buffer[] = [];

  // Dynamically import pdfjs-dist (ESM module)
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

  // Load PDF
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;

  // Process each page
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality

    // Create canvas
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    // Render PDF page to canvas
    const renderContext = {
      canvasContext: context as any,
      viewport: viewport,
    };
    await page.render(renderContext as any).promise;

    // Convert canvas to buffer
    const imageBuffer = canvas.toBuffer('image/png');
    images.push(imageBuffer);
  }

  return images;
}

/**
 * Extract images embedded in PDF
 */
async function extractEmbeddedImages(buffer: Buffer): Promise<{ data: Buffer; type: string }[]> {
  const images: { data: Buffer; type: string }[] = [];

  try {
    const pdfDoc = await PDFDocument.load(buffer);
    const pages = pdfDoc.getPages();

    for (const page of pages) {
      // This is a simplified version - pdf-lib doesn't directly expose images
      // In a production environment, you might want to use a different library
      // or extract images from the rendered page using vision API
    }
  } catch (error) {
    console.error('Error extracting embedded images:', error);
  }

  return images;
}

/**
 * Analyze PDF page using Claude Vision API
 */
async function analyzePDFPage(
  imageBuffer: Buffer,
  pageNumber: number,
  logs: string[]
): Promise<ExtractedQuestionWithVision[]> {
  const log = (message: string) => {
    console.log(message);
    logs.push(message);
  };

  try {
    log(`🔍 Analyzing page ${pageNumber} with Claude Vision API...`);

    // Convert buffer to base64
    const base64Image = imageBuffer.toString('base64');

    // Call Claude Vision API with detailed prompt
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: `Analyze this math exam PDF page and extract all questions with their details.

For each question, provide:
1. Question text (convert mathematical notation to LaTeX when applicable)
2. Four options (A, B, C, D) - convert to LaTeX if they contain math
3. Correct answer (if visible)
4. Explanation (if provided)
5. Any images, diagrams, tables, or illustrations present

IMPORTANT INSTRUCTIONS:
- Convert ALL mathematical formulas and expressions to LaTeX format
- For inline math, use $...$
- For display math, use $$...$$
- If there are diagrams, tables, or illustrations, describe them in detail and indicate their position relative to the question
- Identify the type of visual content: diagram, table, graph, formula, or other
- Preserve exact mathematical notation and symbols

Return the data in this JSON format:
{
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
          "description": "Triangle diagram showing sides a, b, c",
          "type": "diagram",
          "position": "between question and options"
        }
      ],
      "hasLatex": true
    }
  ]
}

If no questions are found, return {"questions": []}`,
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

        log(`✅ Found ${questions.length} questions on page ${pageNumber}`);
        return questions;
      }
    }

    log(`⚠️ No questions found on page ${pageNumber}`);
    return [];
  } catch (error) {
    log(`❌ Error analyzing page ${pageNumber}: ${error}`);
    console.error('Vision API error:', error);
    return [];
  }
}

/**
 * Extract images that were described in the questions
 * This function would ideally use image segmentation or OCR to extract specific regions
 * For now, we'll save the full page image when a question has image descriptions
 */
async function extractQuestionImages(
  pageImage: Buffer,
  questions: ExtractedQuestionWithVision[],
  pageNumber: number
): Promise<void> {
  for (const question of questions) {
    if (question.images.length > 0) {
      // Save the page image for questions with visual content
      // In a production system, you might want to:
      // 1. Use image segmentation to extract specific regions
      // 2. Use OCR to find exact positions
      // 3. Crop the image to the specific diagram/table area

      const storedImage = await saveImage(
        pageImage,
        'image/png',
        `page${pageNumber}_q${questions.indexOf(question)}.png`
      );

      // Update all images in the question with the stored image URL
      for (const img of question.images) {
        img.id = storedImage.id;
        img.url = storedImage.url;
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
  const allQuestions: ExtractedQuestionWithVision[] = [];
  const extractedImages: StoredImage[] = [];

  const log = (message: string) => {
    console.log(message);
    logs.push(message);
  };

  try {
    log('📄 Starting enhanced PDF extraction with vision...');

    // Convert PDF to images
    log('🖼️ Converting PDF pages to images...');
    const pageImages = await pdfToImages(buffer);
    log(`✅ Converted ${pageImages.length} pages to images`);

    // Analyze each page with Claude Vision
    for (let i = 0; i < pageImages.length; i++) {
      const pageNumber = i + 1;
      const questions = await analyzePDFPage(pageImages[i], pageNumber, logs);

      // Extract and save images for questions
      await extractQuestionImages(pageImages[i], questions, pageNumber);

      allQuestions.push(...questions);
    }

    log(`✅ Extraction complete: ${allQuestions.length} total questions found`);

    return {
      questions: allQuestions,
      totalPages: pageImages.length,
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
    question.question.length > 0 &&
    question.options.length === 4 &&
    question.options.every((opt) => opt.length > 0)
  );
}
