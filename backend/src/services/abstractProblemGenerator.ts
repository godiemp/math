/**
 * Abstract Problem Generator Service
 * Uses OpenAI to generate abstract mathematical problems
 */

import OpenAI from 'openai';
import {
  AbstractProblem,
  GenerateAbstractProblemRequest,
  GenerateAbstractProblemResponse,
  CognitiveLevel,
  DifficultyLevel,
} from '../types/abstractProblems';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Use latest model (GPT-4 Turbo or GPT-4o)
const MODEL = 'gpt-4-turbo-preview';

/**
 * Calculate difficulty score based on multiple factors
 */
export function calculateDifficultyScore(
  cognitive_level: CognitiveLevel,
  primary_skills: string[],
  mathematical_complexity: number = 2, // 1-3
  historical_correctness?: number
): number {
  let score = 0;

  // 1. Number of skills (20 points)
  if (primary_skills.length === 1) score += 5;
  else if (primary_skills.length === 2) score += 10;
  else score += 20;

  // 2. Cognitive level (30 points)
  const cognitivePoints: Record<CognitiveLevel, number> = {
    remember: 5,
    understand: 10,
    apply: 15,
    analyze: 20,
    evaluate: 25,
    create: 30,
  };
  score += cognitivePoints[cognitive_level];

  // 3. Mathematical complexity (30 points)
  score += mathematical_complexity * 10;

  // 4. Historical performance (20 points)
  if (historical_correctness !== undefined) {
    if (historical_correctness > 80) score += 5;
    else if (historical_correctness >= 50) score += 10;
    else score += 20;
  } else {
    // Default to medium if no history
    score += 10;
  }

  // Ensure score is between 1 and 100
  return Math.max(1, Math.min(100, score));
}

/**
 * Map difficulty score to difficulty level
 */
export function scoreToDifficulty(score: number): DifficultyLevel {
  if (score <= 25) return 'easy';
  if (score <= 50) return 'medium';
  if (score <= 75) return 'hard';
  return 'extreme';
}

/**
 * Generate abstract problems using OpenAI
 */
export async function generateAbstractProblems(
  request: GenerateAbstractProblemRequest
): Promise<GenerateAbstractProblemResponse[]> {
  const {
    level,
    subject,
    unit,
    difficulty,
    cognitive_level,
    primary_skills,
    secondary_skills = [],
    count = 1,
  } = request;

  const prompt = `You are a PAES mathematics curriculum expert. Generate ${count} abstract mathematical problem(s) following these requirements:

**Requirements:**
- Level: ${level} (${level === 'M1' ? 'Basic/foundational' : 'Advanced for science/engineering careers'})
- Subject: ${subject}
- Unit: ${unit}
- Difficulty: ${difficulty}
- Cognitive Level: ${cognitive_level}
- Primary Skills: ${primary_skills.join(', ')}
${secondary_skills.length > 0 ? `- Secondary Skills: ${secondary_skills.join(', ')}` : ''}

**IMPORTANT GUIDELINES:**

1. **Abstract Nature**: Create problems that represent the PURE MATHEMATICAL ESSENCE, NOT a contextual story.
   - ✅ GOOD: "Ordena de menor a mayor: -5, 3, 0, -1, 2"
   - ✅ GOOD: "Calcula: (-3) × 4"
   - ✅ GOOD: "Resuelve: x - 5 = -2"
   - ❌ BAD: "María tiene -5 grados en el termómetro..." (This is contextual, not abstract!)

2. **Examples of Abstract Problems** (use these as inspiration):
   - "Compara: -7 __ -3" (orden y valor absoluto)
   - "Evalúa: |-6|, |3|, |-2|+|-5|" (valor absoluto)
   - "Determina: signo de (a×b×c) según el número de negativos" (multiplicación)
   - "Resuelve: (-4) × x = -16" (ecuaciones)
   - "Evalúa: 2+(-3)×(-4)" (jerarquía de operaciones)
   - "Si a<b<0, compara a+b con a-b" (razonamiento con desigualdades)

3. **Cognitive Levels**:
   - **remember**: Recall facts, definitions (e.g., "Define valor absoluto")
   - **understand**: Explain concepts (e.g., "Explica cuándo |a|<|b| implica a<b")
   - **apply**: Use procedures (e.g., "Calcula: (-12)÷3")
   - **analyze**: Break down, compare (e.g., "Compara (-a)×(-b) con a×b")
   - **evaluate**: Judge, verify (e.g., "Determina si a+b=c+d implica a+c=b+d")
   - **create**: Construct new solutions (e.g., "Encuentra dos enteros cuyo producto sea -24 y cuya suma sea -5")

4. **Difficulty Levels**:
   - **easy**: Direct recall or single-step operations
   - **medium**: Multi-step operations or basic reasoning
   - **hard**: Complex reasoning or multiple concepts combined
   - **extreme**: Advanced abstract reasoning or proof-like questions

5. **Answer Types**:
   - multiple_choice: Most common (4 options, 1 correct)
   - numeric: Direct numerical answer
   - algebraic: Algebraic expression answer
   - true_false: True/false statement

6. **Expected Steps**: List the solution steps a student should follow

7. **Common Errors**: Anticipate typical student mistakes

**Output Format (JSON array):**
[
  {
    "essence": "Calcula: (-3) × 4",
    "answer_type": "multiple_choice",
    "expected_steps": [
      "Identificar signos: negativo × positivo",
      "Multiplicar valores absolutos: 3 × 4 = 12",
      "Aplicar regla de signos: resultado es negativo",
      "Respuesta: -12"
    ],
    "common_errors": [
      "Olvidar cambiar el signo (responder 12 en lugar de -12)",
      "Aplicar incorrectamente la regla de signos (pensar que negativo × positivo = positivo)"
    ],
    "suggested_difficulty_score": 20
  }
]

Generate ${count} problem(s) now. Return ONLY the JSON array, no additional text.`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are an expert PAES mathematics curriculum designer. You generate high-quality abstract mathematical problems. Return only valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8, // Higher temperature for more variety
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse response
    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      throw new Error(`Failed to parse OpenAI response: ${content}`);
    }

    // Handle both array and object with array property
    const problems = Array.isArray(parsed) ? parsed : parsed.problems || [parsed];

    return problems.map((p: any) => ({
      essence: p.essence,
      answer_type: p.answer_type || 'multiple_choice',
      expected_steps: p.expected_steps || [],
      common_errors: p.common_errors || [],
      suggested_difficulty_score:
        p.suggested_difficulty_score ||
        calculateDifficultyScore(cognitive_level, primary_skills, 2),
    }));
  } catch (error: any) {
    console.error('Error generating abstract problems:', error);
    throw new Error(`OpenAI generation failed: ${error.message}`);
  }
}

/**
 * Generate a batch of abstract problems for an entire unit
 */
export async function generateUnitProblems(
  level: 'M1' | 'M2',
  subject: string,
  unit: string,
  skillGroups: { skills: string[]; cognitive_level: CognitiveLevel; difficulty: DifficultyLevel }[],
  problemsPerGroup: number = 5
): Promise<GenerateAbstractProblemResponse[]> {
  const allProblems: GenerateAbstractProblemResponse[] = [];

  for (const group of skillGroups) {
    try {
      const problems = await generateAbstractProblems({
        level,
        subject: subject as any,
        unit,
        difficulty: group.difficulty,
        cognitive_level: group.cognitive_level,
        primary_skills: group.skills,
        count: problemsPerGroup,
      });

      allProblems.push(...problems);

      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to generate for group ${group.skills.join(', ')}:`, error);
      // Continue with other groups
    }
  }

  return allProblems;
}

/**
 * Generate abstract problems for the entire "números" M1 curriculum
 */
export async function generateNumerosM1Problems(): Promise<GenerateAbstractProblemResponse[]> {
  const skillGroups = [
    // Enteros-racionales: easy level
    {
      skills: ['numeros-enteros-orden'],
      cognitive_level: 'understand' as CognitiveLevel,
      difficulty: 'easy' as DifficultyLevel,
    },
    {
      skills: ['numeros-enteros-sumar-restar'],
      cognitive_level: 'apply' as CognitiveLevel,
      difficulty: 'easy' as DifficultyLevel,
    },
    {
      skills: ['numeros-enteros-multiplicar-dividir'],
      cognitive_level: 'apply' as CognitiveLevel,
      difficulty: 'medium' as DifficultyLevel,
    },
    {
      skills: ['numeros-enteros-valor-absoluto'],
      cognitive_level: 'apply' as CognitiveLevel,
      difficulty: 'medium' as DifficultyLevel,
    },
    {
      skills: ['numeros-racionales-orden'],
      cognitive_level: 'understand' as CognitiveLevel,
      difficulty: 'medium' as DifficultyLevel,
    },
    {
      skills: ['numeros-racionales-sumar-restar'],
      cognitive_level: 'apply' as CognitiveLevel,
      difficulty: 'medium' as DifficultyLevel,
    },
    {
      skills: ['numeros-racionales-multiplicar-dividir'],
      cognitive_level: 'apply' as CognitiveLevel,
      difficulty: 'medium' as DifficultyLevel,
    },

    // Combined skills: harder problems
    {
      skills: ['numeros-enteros-sumar-restar', 'numeros-enteros-multiplicar-dividir'],
      cognitive_level: 'analyze' as CognitiveLevel,
      difficulty: 'hard' as DifficultyLevel,
    },
    {
      skills: ['numeros-enteros-valor-absoluto', 'numeros-enteros-orden'],
      cognitive_level: 'analyze' as CognitiveLevel,
      difficulty: 'hard' as DifficultyLevel,
    },
    {
      skills: ['numeros-racionales-sumar-restar', 'numeros-racionales-multiplicar-dividir'],
      cognitive_level: 'evaluate' as CognitiveLevel,
      difficulty: 'hard' as DifficultyLevel,
    },
  ];

  return generateUnitProblems('M1', 'números', 'enteros-racionales', skillGroups, 10);
}
