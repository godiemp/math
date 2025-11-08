import Anthropic from '@anthropic-ai/sdk';
import { PDFDocument } from 'pdf-lib';

export interface ClaudeExtractedQuestion {
  questionText: string;
  questionLatex: string;
  options: Array<{
    text: string;
    latex: string;
  }>;
  correctAnswer?: number;
  explanation?: string;
  explanationLatex?: string;
  hasImages: boolean;
  imageDescriptions?: string[];
}

export interface ClaudeExtractionResult {
  questions: ClaudeExtractedQuestion[];
  totalPages: number;
  logs: string[];
}

/**
 * Extract questions from PDF using Claude Vision API
 * Handles text, LaTeX, and image detection
 */
export async function extractQuestionsWithClaude(
  buffer: Buffer
): Promise<ClaudeExtractionResult> {
  const logs: string[] = [];

  const log = (message: string) => {
    console.log(message);
    logs.push(message);
  };

  try {
    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured in environment variables');
    }

    log('🤖 Initializing Claude Vision API...');

    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Load PDF
    const pdfDoc = await PDFDocument.load(buffer);
    const pages = pdfDoc.getPages();
    const totalPages = pages.length;

    log(`📄 PDF has ${totalPages} pages`);

    const allQuestions: ClaudeExtractedQuestion[] = [];

    // Process each page
    for (let pageNum = 0; pageNum < totalPages; pageNum++) {
      log(`  Processing page ${pageNum + 1}/${totalPages} with Claude Vision...`);

      // Create a single-page PDF
      const singlePagePdf = await PDFDocument.create();
      const [copiedPage] = await singlePagePdf.copyPages(pdfDoc, [pageNum]);
      singlePagePdf.addPage(copiedPage);

      // Convert to bytes
      const pdfBytes = await singlePagePdf.save();

      // Convert to base64
      const base64Pdf = Buffer.from(pdfBytes).toString('base64');

      // Call Claude Vision API
      // Using claude-3-5-sonnet-20240620 (more widely available)
      // Alternative: claude-sonnet-4-5 for newer model
      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'document',
                source: {
                  type: 'base64',
                  media_type: 'application/pdf',
                  data: base64Pdf,
                },
              },
              {
                type: 'text',
                text: `Extract all math questions from this exam page. For each question, provide:

1. Question text (plain text)
2. Question with LaTeX (use $ for inline math, $$ for display math)
3. All answer options with plain text and LaTeX versions
4. Indicate if there are diagrams/images (describe them)
5. If there's an answer key, identify the correct answer

Return as JSON array:
{
  "questions": [
    {
      "questionText": "plain text version",
      "questionLatex": "version with LaTeX like $\\\\frac{8}{5}$",
      "options": [
        {"text": "option A", "latex": "option A with $math$"},
        {"text": "option B", "latex": "option B"}
      ],
      "correctAnswer": 0,
      "hasImages": true,
      "imageDescriptions": ["number line from 0 to 1"]
    }
  ]
}

Important:
- Use proper LaTeX syntax: \\frac{}{}, \\sqrt{}, \\pi, etc.
- For fractions use \\frac{numerator}{denominator}
- Escape backslashes properly
- If you see diagrams, set hasImages:true and describe them`,
              },
            ],
          },
        ],
      });

      // Parse response
      const responseText =
        message.content[0].type === 'text' ? message.content[0].text : '';

      log(`  ✅ Claude processed page ${pageNum + 1}`);

      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.questions && Array.isArray(parsed.questions)) {
            allQuestions.push(...parsed.questions);
            log(`    Found ${parsed.questions.length} questions on page ${pageNum + 1}`);
          }
        } catch (parseError) {
          log(`    ⚠️  Failed to parse JSON from page ${pageNum + 1}: ${parseError}`);
        }
      }
    }

    log(`✅ Claude Vision extraction complete: ${allQuestions.length} total questions`);

    return {
      questions: allQuestions,
      totalPages,
      logs,
    };
  } catch (error: any) {
    const errorMsg = `❌ Claude Vision error: ${error.message}`;
    log(errorMsg);
    throw new Error(errorMsg);
  }
}
