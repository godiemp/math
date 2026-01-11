/**
 * Skill Decomposition Service
 * Analyzes failed questions and generates targeted skill-based practice
 */

import { v4 as uuidv4 } from 'uuid';
import {
  FailedQuestion,
  DecomposedSkill,
  SkillDecompositionResponse,
  GeneratedScaffoldingQuestion,
  GenerateScaffoldingResponse,
  getOpenAIClient,
} from './scaffoldingTypes';

/**
 * Decompose a failed question into basic skills the student needs to master
 * Returns skills ordered from most basic to most advanced
 */
export async function decomposeQuestionSkills(
  failedQuestion: FailedQuestion,
  userAnswer: number
): Promise<SkillDecompositionResponse> {
  const openai = getOpenAIClient();

  const systemPrompt = `Eres un experto pedagogo en matemáticas PAES (Chile). Tu tarea es analizar una pregunta que un estudiante falló y descomponerla en las habilidades básicas necesarias para resolverla.

OBJETIVO:
Identificar las habilidades matemáticas específicas que el estudiante necesita dominar, ordenadas desde la más básica hasta la más avanzada.

REGLAS:
1. Identifica 2-4 habilidades CONCRETAS y ESPECÍFICAS
2. Ordénalas de más básica a más avanzada (el estudiante debería dominar la primera antes de la segunda)
3. Cada habilidad debe ser evaluable con una pregunta simple
4. Usa nombres cortos y claros en español
5. La descripción debe explicar qué necesita saber el estudiante

FORMATO DE RESPUESTA - JSON válido únicamente:
{
  "skills": [
    {
      "id": "skill-identificador-unico",
      "name": "Nombre corto de la habilidad",
      "description": "Qué necesita entender el estudiante para dominar esta habilidad",
      "difficulty": "básico" | "intermedio" | "avanzado",
      "order": 1
    }
  ],
  "analysis": "Breve análisis de por qué el estudiante pudo haber fallado basado en su respuesta"
}`;

  const userPrompt = `## PREGUNTA QUE EL ESTUDIANTE FALLÓ:
${failedQuestion.questionLatex}

## OPCIONES:
${failedQuestion.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n')}

## RESPUESTA DEL ESTUDIANTE:
${String.fromCharCode(65 + userAnswer)}) ${failedQuestion.options[userAnswer]}

## RESPUESTA CORRECTA:
${String.fromCharCode(65 + failedQuestion.correctAnswer)}) ${failedQuestion.options[failedQuestion.correctAnswer]}

## TEMA: ${failedQuestion.subject}
## SKILLS ORIGINALES: ${failedQuestion.skills.join(', ')}

Analiza esta pregunta y descompónla en las habilidades básicas que el estudiante necesita dominar.
Considera la respuesta incorrecta del estudiante para inferir qué conceptos podría no entender.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('No response from AI');
    }

    const parsed = JSON.parse(responseContent);

    if (!Array.isArray(parsed.skills) || parsed.skills.length === 0) {
      throw new Error('Invalid skills array in response');
    }

    // Validate and transform skills
    const skills: DecomposedSkill[] = parsed.skills.map((skill: {
      id?: string;
      name: string;
      description: string;
      difficulty?: string;
      order?: number;
    }, index: number) => ({
      id: skill.id || `skill-${index + 1}`,
      name: skill.name,
      description: skill.description,
      difficulty: skill.difficulty || 'intermedio',
      order: skill.order || index + 1,
    }));

    // Sort by order
    skills.sort((a, b) => a.order - b.order);

    return {
      skills,
      originalQuestion: failedQuestion.questionLatex,
      recommendedPath: skills.map(s => s.id),
    };
  } catch (error) {
    console.error('Error decomposing question skills:', error);
    throw error;
  }
}

/**
 * Generate a scaffolding question targeting a specific skill
 */
export async function generateSkillQuestion(
  skill: DecomposedSkill,
  originalQuestion: FailedQuestion
): Promise<GenerateScaffoldingResponse> {
  const startTime = Date.now();
  const openai = getOpenAIClient();

  const difficultyScore = skill.difficulty === 'básico' ? 0.2 : skill.difficulty === 'intermedio' ? 0.4 : 0.6;

  const systemPrompt = `Eres un experto en matemáticas PAES (Chile). Tu tarea es crear una pregunta que evalúe UNA habilidad específica.

REGLAS IMPORTANTES:
1. La pregunta debe evaluar SOLO la habilidad indicada
2. Usa números simples y contexto claro
3. La pregunta debe ser más fácil que la original
4. Las 4 opciones deben ser plausibles pero solo una correcta
5. Los distractores deben basarse en errores comunes

FORMATO DE MATEMÁTICAS:
- TODO símbolo matemático DEBE ir entre $...$: $x^2$, $\\frac{1}{2}$, $\\pi$
- Potencias: $m^2$, fracciones: $\\frac{a}{b}$, raíces: $\\sqrt{x}$
- Las explicaciones TAMBIÉN deben usar LaTeX para símbolos matemáticos

FORMATO DE RESPUESTA - JSON válido únicamente:
{
  "questionLatex": "Texto de la pregunta con $matemáticas$",
  "options": ["Primera opción sin letra", "Segunda opción", "Tercera opción", "Cuarta opción"],
  "correctAnswer": 0,
  "explanation": "Explicación paso a paso. Por ejemplo: Para resolver esto, calculamos $x = \\frac{a}{b}$..."
}

IMPORTANTE: Las opciones NO deben incluir letras (A, B, C, D) al inicio. Solo el contenido.`;

  const userPrompt = `## HABILIDAD A EVALUAR:
Nombre: ${skill.name}
Descripción: ${skill.description}
Dificultad: ${skill.difficulty}

## CONTEXTO (pregunta original que el estudiante falló):
${originalQuestion.questionLatex}
Tema: ${originalQuestion.subject}

Genera una pregunta que evalúe ESPECÍFICAMENTE la habilidad "${skill.name}".
La pregunta debe ser independiente y más simple que la original.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('No response from AI');
    }

    const parsed = JSON.parse(responseContent);

    if (
      !parsed.questionLatex ||
      !Array.isArray(parsed.options) ||
      parsed.options.length !== 4 ||
      typeof parsed.correctAnswer !== 'number'
    ) {
      throw new Error('Invalid response structure from AI');
    }

    // Strip any leading letter prefixes (A), B), etc.) from options
    // The AI sometimes includes these even when instructed not to
    const cleanedOptions = parsed.options.map((opt: string) =>
      opt.replace(/^[A-Da-d]\)\s*/, '').trim()
    );
    parsed.options = cleanedOptions;

    const generatedQuestion: GeneratedScaffoldingQuestion = {
      id: `skill-q-${uuidv4()}`,
      questionLatex: parsed.questionLatex,
      options: parsed.options,
      correctAnswer: parsed.correctAnswer,
      explanation: parsed.explanation || '',
      targetSkills: [skill.id],
      difficulty: skill.difficulty === 'básico' ? 'easy' : 'medium',
      difficultyScore,
      subject: originalQuestion.subject,
      topic: originalQuestion.topic || originalQuestion.subject,
      isGenerated: true,
    };

    return {
      question: generatedQuestion,
      generationTimeMs: Date.now() - startTime,
    };
  } catch (error) {
    console.error('Error generating skill question:', error);
    throw error;
  }
}
