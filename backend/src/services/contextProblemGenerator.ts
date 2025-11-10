/**
 * Context Problem Generator Service
 * Uses OpenAI to generate contextual problems from abstract problems
 */

import OpenAI from 'openai';
import {
  AbstractProblem,
  ContextProblem,
  GenerateContextProblemRequest,
  GenerateContextProblemResponse,
  ContextType,
} from '../types/abstractProblems';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Use latest model
const MODEL = 'gpt-4-turbo-preview';

/**
 * Generate context problems from an abstract problem
 */
export async function generateContextProblems(
  abstractProblem: AbstractProblem,
  request: GenerateContextProblemRequest
): Promise<GenerateContextProblemResponse[]> {
  const { context_type, count = 1 } = request;

  const contextDescriptions: Record<ContextType, string> = {
    shopping:
      'compras, precios, descuentos, dinero, productos, tiendas, presupuestos, gastos',
    cooking:
      'recetas, ingredientes, cantidades, porciones, medidas, cocinar, hornear, preparar alimentos',
    geometry:
      'figuras geométricas, áreas, perímetros, volúmenes, construcciones, mediciones espaciales',
    sports:
      'deportes, competencias, puntajes, tiempos, distancias, velocidades, equipos, partidos',
    finance:
      'dinero, inversiones, ahorros, intereses, cuentas bancarias, deudas, préstamos, ganancias',
    travel:
      'viajes, distancias, velocidades, tiempos, rutas, transportes, destinos, itinerarios',
    construction:
      'construcción, materiales, medidas, planos, edificios, estructuras, proyectos',
    science:
      'experimentos, mediciones científicas, temperatura, masa, volumen, densidad, reacciones',
    abstract:
      'situaciones matemáticas abstractas con variables genéricas',
    other: 'situaciones cotidianas variadas',
  };

  const prompt = `You are a PAES mathematics problem designer. Create ${count} contextual problem(s) based on this abstract problem:

**Abstract Problem:**
- Essence: "${abstractProblem.essence}"
- Level: ${abstractProblem.level}
- Subject: ${abstractProblem.subject}
- Unit: ${abstractProblem.unit}
- Difficulty: ${abstractProblem.difficulty}
- Cognitive Level: ${abstractProblem.cognitive_level}
- Primary Skills: ${abstractProblem.primary_skills.join(', ')}
- Answer Type: ${abstractProblem.answer_type}
- Expected Steps: ${abstractProblem.expected_steps?.join(' → ') || 'N/A'}

**Context Type:** ${context_type}
**Context Description:** ${contextDescriptions[context_type]}

**IMPORTANT GUIDELINES:**

1. **Create a Realistic Story**: Transform the abstract problem into a real-world scenario using the specified context type.

2. **Maintain Mathematical Essence**: The core mathematical concept must remain the same, just wrapped in context.

3. **Chilean/Latin American Context**: Use names, currency (pesos chilenos), and situations familiar to Chilean students.

4. **Multiple Choice Format**:
   - Create 4 options (labeled A, B, C, D)
   - 1 correct answer
   - 3 plausible distractors based on common errors

5. **Clear Explanation**: Provide step-by-step solution explanation

6. **Variable Values**: Assign concrete values to variables used in the problem

**Example Transformation:**

Abstract: "Calcula: (-3) × 4"

Contextual (shopping): "María debe $3.000 a su amiga. Si ella tiene 4 deudas iguales con diferentes personas, ¿cuál es su saldo total considerando las deudas como números negativos?"

A) -$12.000 ✓ (correct)
B) $12.000 (forgot negative)
C) -$7.000 (added instead of multiplied)
D) $1.000 (divided instead of multiplied)

Explanation:
1. Cada deuda es -$3.000 (negativo porque es deuda)
2. Tiene 4 deudas: 4 × (-$3.000)
3. Aplicar regla de signos: positivo × negativo = negativo
4. 4 × 3.000 = 12.000
5. Resultado: -$12.000

**Output Format (JSON array):**
[
  {
    "context_description": "María tiene una deuda con su amiga...",
    "question": "¿Cuál es su saldo total considerando las deudas como números negativos?",
    "question_latex": null,
    "options": ["-$12.000", "$12.000", "-$7.000", "$1.000"],
    "options_latex": null,
    "correct_answer": 0,
    "explanation": "1. Cada deuda es -$3.000...",
    "explanation_latex": null,
    "step_by_step": [
      {
        "step_number": 1,
        "description": "Cada deuda es -$3.000 (negativo porque es deuda)",
        "formula": null,
        "result": null
      },
      {
        "step_number": 2,
        "description": "Tiene 4 deudas: 4 × (-$3.000)",
        "formula": "4 \\\\times (-3000)",
        "result": null
      },
      {
        "step_number": 3,
        "description": "Aplicar regla de signos: positivo × negativo = negativo",
        "formula": null,
        "result": null
      },
      {
        "step_number": 4,
        "description": "Multiplicar valores absolutos",
        "formula": "4 \\\\times 3000 = 12000",
        "result": "12000"
      },
      {
        "step_number": 5,
        "description": "Aplicar signo negativo",
        "formula": null,
        "result": "-12000"
      }
    ],
    "variable_values": {
      "deuda_individual": 3000,
      "numero_deudas": 4,
      "deuda_total": -12000
    }
  }
]

**Additional Requirements:**
- Use realistic numbers (avoid very large or very small numbers unless appropriate)
- Make distractors based on ${abstractProblem.common_errors?.join(', ') || 'common student errors'}
- Ensure the problem difficulty matches "${abstractProblem.difficulty}"
- Include LaTeX only if mathematical notation is needed (fractions, exponents, etc.)

Generate ${count} problem(s) now. Return ONLY the JSON object with a "problems" array, no additional text.`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are an expert at creating engaging, contextual math problems for Chilean PAES students. Return only valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.9, // Higher temperature for creative contexts
      max_tokens: 3000,
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

    // Handle both array and object with problems array
    const problems = Array.isArray(parsed) ? parsed : parsed.problems || [parsed];

    return problems.map((p: any) => ({
      context_description: p.context_description,
      question: p.question,
      question_latex: p.question_latex || null,
      options: p.options || [],
      options_latex: p.options_latex || null,
      correct_answer: p.correct_answer ?? 0,
      explanation: p.explanation,
      explanation_latex: p.explanation_latex || null,
      step_by_step: p.step_by_step || [],
      variable_values: p.variable_values || {},
    }));
  } catch (error: any) {
    console.error('Error generating context problems:', error);
    throw new Error(`OpenAI generation failed: ${error.message}`);
  }
}

/**
 * Generate multiple context variations for a single abstract problem
 */
export async function generateMultipleContexts(
  abstractProblem: AbstractProblem,
  contextTypes: ContextType[],
  problemsPerContext: number = 2
): Promise<Array<{ context_type: ContextType; problems: GenerateContextProblemResponse[] }>> {
  const results = [];

  for (const context_type of contextTypes) {
    try {
      const problems = await generateContextProblems(abstractProblem, {
        abstract_problem_id: abstractProblem.id,
        context_type,
        count: problemsPerContext,
      });

      results.push({ context_type, problems });

      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to generate for context ${context_type}:`, error);
      // Continue with other contexts
    }
  }

  return results;
}

/**
 * Suggest appropriate context types based on abstract problem characteristics
 */
export function suggestContextTypes(abstractProblem: AbstractProblem): ContextType[] {
  const { subject, unit, difficulty } = abstractProblem;

  // Define context preferences by subject/unit
  const contextMap: Record<string, ContextType[]> = {
    'números-enteros': ['finance', 'sports', 'travel', 'shopping'],
    'números-racionales': ['cooking', 'shopping', 'construction', 'science'],
    'números-porcentaje': ['shopping', 'finance', 'sports'],
    'números-potencias-raices': ['science', 'geometry', 'construction'],
    'números-proporcionalidad': ['cooking', 'travel', 'shopping', 'construction'],
    'álgebra-expresiones': ['abstract', 'geometry', 'science'],
    'álgebra-ecuaciones': ['finance', 'travel', 'abstract', 'shopping'],
    'álgebra-funciones': ['science', 'finance', 'travel'],
    'geometría-perimetro-area': ['construction', 'geometry', 'shopping'],
    'geometría-volumen': ['construction', 'cooking', 'science'],
    'geometría-angulos': ['construction', 'geometry', 'science'],
    'probabilidad-basica': ['sports', 'abstract', 'other'],
    'probabilidad-estadistica': ['science', 'sports', 'other'],
  };

  // Find matching key
  const key = Object.keys(contextMap).find((k) => unit.includes(k.split('-')[1]));
  if (key) {
    return contextMap[key];
  }

  // Default contexts
  if (subject === 'números') return ['shopping', 'finance', 'cooking', 'sports'];
  if (subject === 'álgebra') return ['abstract', 'finance', 'science'];
  if (subject === 'geometría') return ['geometry', 'construction', 'science'];
  if (subject === 'probabilidad') return ['sports', 'abstract', 'science'];

  return ['abstract', 'other'];
}
