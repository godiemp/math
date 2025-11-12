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
import { listAbstractProblems } from './abstractProblemService';

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        'OPENAI_API_KEY environment variable is required to use AI generation features. ' +
        'The abstract problems system will work without it, but AI generation will not be available.'
      );
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

// Using GPT-5 Chat Latest - Latest non-reasoning GPT-5 variant
// gpt-5-chat-latest is the non-reasoning version used in ChatGPT
// Supports: temperature, max_tokens, JSON mode
// Alternative options:
// - gpt-5-2025-08-07: Dated snapshot for strict reproducibility
// - gpt-5-mini: Smaller, more cost-effective
const MODEL = 'gpt-5-chat-latest';

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
    subsection,
    difficulty,
    cognitive_level,
    primary_skills,
    secondary_skills = [],
    count = 1,
  } = request;

  // Fetch existing problems to avoid duplicates
  const existingProblems = await listAbstractProblems({
    level,
    subject,
    unit,
    subsection,
  }, { limit: 1000 }); // Get up to 1000 existing problems

  const existingEssences = existingProblems.problems.map(p => p.essence);
  const hasExisting = existingEssences.length > 0;

  const prompt = `You are a PAES mathematics curriculum expert. Generate ${count} abstract mathematical problem(s) following these requirements:

**Requirements:**
- Level: ${level} (${level === 'M1' ? 'Basic/foundational' : 'Advanced for science/engineering careers'})
- Subject: ${subject}
- Unit: ${unit}
${subsection ? `- Subsection: ${subsection}` : ''}
- Difficulty: ${difficulty}
- Cognitive Level: ${cognitive_level}
- Primary Skills: ${primary_skills.join(', ')}
${secondary_skills.length > 0 ? `- Secondary Skills: ${secondary_skills.join(', ')}` : ''}

${hasExisting ? `**EXISTING PROBLEMS IN DATABASE (${existingEssences.length} total) - DO NOT REPEAT THESE:**

${existingEssences.slice(0, 50).map((e, i) => `${i + 1}. ${e}`).join('\n')}
${existingEssences.length > 50 ? `\n... and ${existingEssences.length - 50} more existing problems\n` : ''}

**CRITICAL: Generate COMPLETELY DIFFERENT problems from the ones listed above. Explore new variations, different number combinations, different operations, or different conceptual approaches.**
` : ''}

**IMPORTANT GUIDELINES:**

1. **Maximum Abstraction**: Create problems as GENERAL MATHEMATICAL TEMPLATES with placeholders {like_this}.
   - Use {placeholders} for values that can vary in context generation
   - Focus on the MATHEMATICAL STRUCTURE, not specific numbers
   - ✅ GOOD: "Ordena de {criterio} $n$ números enteros dados"
   - ✅ GOOD: "Calcula: $(a) \\{op\\} (b)$ donde {condiciones_signos}"
   - ✅ GOOD: "Si {condición}, compara {expresión_1} con {expresión_2}"
   - ❌ BAD: "Ordena de menor a mayor: $-5, 3, 0, -1, 2$" (too specific, should use placeholders)

2. **LaTeX Format**: ALL mathematical expressions MUST use proper LaTeX notation.
   - Use $...$ for inline math
   - Use $$...$$ for display math (standalone equations)
   - Common LaTeX symbols: \\times, \\div, \\frac{a}{b}, x^2, \\sqrt{x}, \\leq, \\geq, |x|, \\{set\\}
   - Variables and placeholders: Use $a, b, c, n, x$ for mathematical variables
   - Placeholders for variation: Use {criterio}, {op}, {condición} outside of $ $

3. **Pedagogical Examples** (sequence 1-12 for "A. Orden y valor absoluto"):

   SEQUENCE 1 (easy/apply):
   {
     "essence": "Ordena de {criterio} $n$ números enteros dados",
     "generation_rules": {
       "criterio": ["menor a mayor", "mayor a menor"],
       "n": [3, 4, 5],
       "value_range": [-10, 10]
     },
     "pedagogy_notes": "Concepto base: ordenamiento de enteros"
   }

   SEQUENCE 2 (easy/apply):
   {
     "essence": "Compara usando $<$, $>$ o $=$: $a$ __ $b$ donde $a, b \\in \\mathbb{Z}$",
     "generation_rules": {
       "value_range": [-10, 10],
       "sign_combinations": ["ambos_negativos", "ambos_positivos", "signos_diferentes"]
     },
     "pedagogy_notes": "Comparación directa sin valor absoluto"
   }

   SEQUENCE 4 (easy/apply):
   {
     "essence": "Calcula: $|a|$ donde $a \\in \\mathbb{Z}$",
     "generation_rules": {
       "value_range": [-10, 10],
       "prefer_negatives": true
     },
     "pedagogy_notes": "Introducción al concepto de valor absoluto"
   }

   SEQUENCE 6 (medium/apply):
   {
     "essence": "Compara: $|a|$ __ $|b|$",
     "generation_rules": {
       "value_range": [-10, 10],
       "sign_combinations": ["ambos_negativos", "ambos_positivos", "signos_diferentes"]
     },
     "pedagogy_notes": "Combina valor absoluto con comparación",
     "prerequisite_sequence": [2, 4]
   }

   SEQUENCE 9 (medium/apply):
   {
     "essence": "Resuelve: $|x| = n$ donde $n \\in \\mathbb{Z}^+$",
     "generation_rules": {
       "n_range": [1, 10]
     },
     "pedagogy_notes": "Ecuaciones simples con valor absoluto (dos soluciones)"
   }

   SEQUENCE 10 (hard/apply):
   {
     "essence": "Resuelve: $|x| {comparador} n$ donde $n \\in \\mathbb{Z}^+$, $x \\in \\mathbb{Z}$",
     "generation_rules": {
       "comparador": ["<", ">", "\\leq", "\\geq"],
       "n_range": [1, 5]
     },
     "pedagogy_notes": "Inecuaciones con valor absoluto",
     "prerequisite_sequence": [9]
   }

   SEQUENCE 12 (extreme/create):
   {
     "essence": "Minimiza: $|x - a| + |x - b|$ donde $x \\in \\mathbb{Z}$",
     "generation_rules": {
       "a_range": [-10, 10],
       "b_range": [-10, 10],
       "distance_between": [3, 15]
     },
     "pedagogy_notes": "Optimización: suma de distancias (mediana)",
     "prerequisite_sequence": [11]
   }

4. **Key Placeholder Types**:
   - {criterio}, {criterio_orden}: "menor a mayor", "mayor a menor"
   - {comparador}: "<", ">", "\\leq", "\\geq"
   - {op}: "\\times", "\\div", "+", "-"
   - {condición}, {condiciones_signos}: "$a < 0, b > 0$", "$a < b < 0$"
   - {expresión_1}, {expresión_2}: "$a + b$", "$|a|$", "$-a$"

5. **Cognitive Levels** (Bloom's Taxonomy):
   - **remember**: Recall facts (e.g., "Define {concepto}")
   - **understand**: Explain (e.g., "Explica cuándo {condición} implica {resultado}")
   - **apply**: Use procedures (e.g., "Calcula: {operación}")
   - **analyze**: Compare (e.g., "Si {condición}, compara {expr_1} con {expr_2}")
   - **evaluate**: Judge (e.g., "Determina si {proposición} es válida")
   - **create**: Construct (e.g., "Encuentra valores que cumplan {restricciones}")

6. **Difficulty Levels**:
   - **easy**: Direct recall or single-step operations
   - **medium**: Multi-step operations or basic reasoning
   - **hard**: Complex reasoning or multiple concepts combined
   - **extreme**: Advanced abstract reasoning or proof-like questions

7. **Answer Types**:
   - multiple_choice: Most common (4 options, 1 correct)
   - numeric: Direct numerical answer
   - algebraic: Algebraic expression answer
   - true_false: True/false statement

**Output Format (JSON object with problems array):**
{
  "problems": [
    {
      "essence": "Ordena de {criterio} $n$ números enteros dados",
      "answer_type": "multiple_choice",
      "expected_steps": [
        "Identificar el criterio de ordenamiento",
        "Comparar los números según su valor",
        "Ordenar de acuerdo al criterio solicitado"
      ],
      "common_errors": [
        "Confundir menor con mayor",
        "No considerar los signos negativos correctamente"
      ],
      "suggested_difficulty_score": 15,
      "generation_rules": {
        "criterio": ["menor a mayor", "mayor a menor"],
        "n": [3, 4, 5],
        "value_range": [-10, 10],
        "ensure_distinct": true
      },
      "sequence_order": 1,
      "pedagogy_notes": "Concepto base: ordenamiento de enteros",
      "prerequisite_sequence": []
    }
  ]
}

**CRITICAL REQUIREMENTS:**
- The "essence" field MUST use {placeholders} for maximum abstraction
- MUST include "generation_rules" object with ALL placeholder values and constraints
- MUST include "sequence_order" (pedagogical order within subsection)
- MUST include "pedagogy_notes" (why this problem comes at this sequence)
- MUST include "prerequisite_sequence" (array of prior sequence numbers needed, or empty [])
- ALL mathematical expressions MUST use LaTeX with $ $ delimiters

You MUST generate exactly ${count} problem(s). The "problems" array MUST contain ${count} items. Return ONLY valid JSON, no additional text.`;

  try {
    const openai = getOpenAIClient();
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
      generation_rules: p.generation_rules || null,
      sequence_order: p.sequence_order || null,
      pedagogy_notes: p.pedagogy_notes || null,
      prerequisite_sequence: p.prerequisite_sequence || [],
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

/**
 * Generate problems for a specific subsection within a unit
 */
export async function generateSubsectionProblems(
  level: 'M1' | 'M2',
  subject: string,
  unit: string,
  subsectionCode: string,
  subsectionName: string,
  skills: string[],
  problemCounts: {
    easy?: number;
    medium?: number;
    hard?: number;
    extreme?: number;
  } = { easy: 3, medium: 3, hard: 2 }
): Promise<{ subsection: string; problems: GenerateAbstractProblemResponse[] }> {
  const allProblems: GenerateAbstractProblemResponse[] = [];
  const subsectionLabel = `${subsectionCode}. ${subsectionName}`;

  // Generate easy problems
  if (problemCounts.easy && problemCounts.easy > 0) {
    const easyProblems = await generateAbstractProblems({
      level,
      subject: subject as any,
      unit,
      subsection: subsectionLabel,
      difficulty: 'easy',
      cognitive_level: 'understand',
      primary_skills: skills,
      count: problemCounts.easy,
    });
    allProblems.push(...easyProblems);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Generate medium problems
  if (problemCounts.medium && problemCounts.medium > 0) {
    const mediumProblems = await generateAbstractProblems({
      level,
      subject: subject as any,
      unit,
      subsection: subsectionLabel,
      difficulty: 'medium',
      cognitive_level: 'apply',
      primary_skills: skills,
      count: problemCounts.medium,
    });
    allProblems.push(...mediumProblems);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Generate hard problems
  if (problemCounts.hard && problemCounts.hard > 0) {
    const hardProblems = await generateAbstractProblems({
      level,
      subject: subject as any,
      unit,
      subsection: subsectionLabel,
      difficulty: 'hard',
      cognitive_level: 'analyze',
      primary_skills: skills,
      count: problemCounts.hard,
    });
    allProblems.push(...hardProblems);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Generate extreme problems
  if (problemCounts.extreme && problemCounts.extreme > 0) {
    const extremeProblems = await generateAbstractProblems({
      level,
      subject: subject as any,
      unit,
      subsection: subsectionLabel,
      difficulty: 'extreme',
      cognitive_level: 'evaluate',
      primary_skills: skills,
      count: problemCounts.extreme,
    });
    allProblems.push(...extremeProblems);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return {
    subsection: subsectionLabel,
    problems: allProblems,
  };
}
