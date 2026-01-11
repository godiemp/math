import { pool } from '../config/database';

// Skill tree data (duplicated from lib for backend use)
interface SkillTreeNode {
  id: string;
  name: string;
  description: string;
  prerequisiteIds: string[];
  verificationPrompt: string;
}

const SKILL_TREE: SkillTreeNode[] = [
  {
    id: 'contar',
    name: 'Contar',
    description: 'Contar objetos y reconocer cantidades',
    prerequisiteIds: [],
    verificationPrompt:
      '¿Puedes contar cuántos objetos hay? ¿Qué número viene después del 7?',
  },
  {
    id: 'sumar',
    name: 'Sumar',
    description: 'Combinar cantidades para obtener un total',
    prerequisiteIds: ['contar'],
    verificationPrompt:
      'Si tienes 3 manzanas y te dan 2 más, ¿cuántas tienes en total?',
  },
  {
    id: 'restar',
    name: 'Restar',
    description: 'Quitar una cantidad de otra',
    prerequisiteIds: ['sumar'],
    verificationPrompt:
      'Si tienes 5 galletas y te comes 2, ¿cuántas te quedan?',
  },
];

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface VerificationSession {
  userId: string;
  skillId: string;
  skill: SkillTreeNode;
  conversationHistory: ChatMessage[];
  isComplete: boolean;
  createdAt: number;
}

// In-memory sessions (for MVP - production would use Redis)
const verificationSessions = new Map<string, VerificationSession>();

function getSkillById(id: string): SkillTreeNode | undefined {
  return SKILL_TREE.find((skill) => skill.id === id);
}

// Get user's verified skills from database
export async function getUserProgress(
  userId: string
): Promise<{ skillId: string; verifiedAt: number }[]> {
  const result = await pool.query(
    `SELECT skill_id, verified_at FROM skill_tree_progress
     WHERE user_id = $1 AND verified_at IS NOT NULL`,
    [userId]
  );
  return result.rows.map((row) => ({
    skillId: row.skill_id,
    verifiedAt: row.verified_at,
  }));
}

// Get all skills with their status for a user
export async function getSkillTreeWithStatus(userId: string): Promise<
  Array<{
    id: string;
    name: string;
    description: string;
    status: 'locked' | 'unlocked' | 'verified';
    prerequisiteIds: string[];
  }>
> {
  const progress = await getUserProgress(userId);
  const verifiedIds = progress.map((p) => p.skillId);

  return SKILL_TREE.map((skill) => {
    let status: 'locked' | 'unlocked' | 'verified';

    if (verifiedIds.includes(skill.id)) {
      status = 'verified';
    } else {
      const allPrereqsVerified = skill.prerequisiteIds.every((prereqId) =>
        verifiedIds.includes(prereqId)
      );
      status = allPrereqsVerified ? 'unlocked' : 'locked';
    }

    return {
      id: skill.id,
      name: skill.name,
      description: skill.description,
      status,
      prerequisiteIds: skill.prerequisiteIds,
    };
  });
}

// Start a verification session
export async function startVerification(
  userId: string,
  skillId: string
): Promise<{ sessionId: string; initialMessage: string }> {
  const skill = getSkillById(skillId);
  if (!skill) {
    throw new Error('Skill not found');
  }

  // Check if skill is unlocked
  const progress = await getUserProgress(userId);
  const verifiedIds = progress.map((p) => p.skillId);

  if (verifiedIds.includes(skillId)) {
    throw new Error('Skill already verified');
  }

  const allPrereqsVerified = skill.prerequisiteIds.every((prereqId) =>
    verifiedIds.includes(prereqId)
  );
  if (!allPrereqsVerified) {
    throw new Error('Prerequisites not completed');
  }

  const sessionId = `skill_${userId}_${skillId}_${Date.now()}`;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const systemPrompt = `Eres un tutor de matemáticas amigable que evalúa si un estudiante entiende conceptos básicos.

Tu tarea es verificar que el estudiante entiende: "${skill.name}" - ${skill.description}

REGLAS:
1. Haz 2-3 preguntas simples para verificar comprensión
2. Usa ejemplos concretos y cotidianos (manzanas, galletas, dedos, etc.)
3. Sé alentador y paciente
4. Si responde correctamente, marca isVerified como true
5. Si se equivoca, dale una pista y otra oportunidad
6. Respuestas cortas: 1-2 oraciones + pregunta
7. Para niños pequeños: usa lenguaje simple`;

  const userPrompt = `Inicia la verificación del concepto "${skill.name}".
Pregunta inicial sugerida: ${skill.verificationPrompt}

Saluda brevemente y haz tu primera pregunta para verificar si el estudiante entiende este concepto.

Responde con JSON:
{
  "message": "Tu saludo y primera pregunta",
  "isVerified": false
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 512,
        temperature: 0.7,
        messages: [{ role: 'user', content: userPrompt }],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error('AI verification start failed');
    }

    const data = (await response.json()) as { content: Array<{ text: string }> };
    const responseText = data.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const result = JSON.parse(jsonMatch[0]);

    // Store session
    verificationSessions.set(sessionId, {
      userId,
      skillId,
      skill,
      conversationHistory: [{ role: 'assistant', content: result.message }],
      isComplete: false,
      createdAt: Date.now(),
    });

    return {
      sessionId,
      initialMessage: result.message,
    };
  } catch (error) {
    console.error('Error starting skill verification:', error);
    throw error;
  }
}

// Continue a verification session
export async function continueVerification(
  sessionId: string,
  userMessage: string
): Promise<{ message: string; isVerified: boolean }> {
  const session = verificationSessions.get(sessionId);
  if (!session) {
    throw new Error('Session not found or expired');
  }

  if (session.isComplete) {
    throw new Error('Verification already complete');
  }

  // Add user message to history
  session.conversationHistory.push({
    role: 'user',
    content: userMessage,
  });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const systemPrompt = `Eres un tutor de matemáticas amigable evaluando si un estudiante entiende: "${session.skill.name}".

REGLAS:
1. Evalúa si la respuesta demuestra comprensión
2. Si entiende, marca isVerified como true y felicítalo
3. Si no entiende, da una pista y pregunta de nuevo
4. Máximo 3-4 intercambios antes de decidir
5. Sé alentador incluso si no pasa

CONCEPTO A VERIFICAR: ${session.skill.description}`;

  const userPrompt = `Conversación hasta ahora:
${session.conversationHistory.map((m) => `${m.role === 'user' ? 'Estudiante' : 'Tutor'}: ${m.content}`).join('\n\n')}

Evalúa la última respuesta del estudiante y continúa.

Responde con JSON:
{
  "message": "Tu respuesta (felicitación si pasa, pista si no)",
  "isVerified": true/false (true solo si claramente demuestra comprensión)
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 512,
        temperature: 0.7,
        messages: [{ role: 'user', content: userPrompt }],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error('AI verification continue failed');
    }

    const data = (await response.json()) as { content: Array<{ text: string }> };
    const responseText = data.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const result = JSON.parse(jsonMatch[0]);

    // Add assistant message to history
    session.conversationHistory.push({
      role: 'assistant',
      content: result.message,
    });

    // If verified, save to database
    if (result.isVerified) {
      session.isComplete = true;
      await saveProgress(
        session.userId,
        session.skillId,
        session.conversationHistory
      );
    }

    return {
      message: result.message,
      isVerified: result.isVerified,
    };
  } catch (error) {
    console.error('Error continuing skill verification:', error);
    throw error;
  }
}

// Save verified skill to database
async function saveProgress(
  userId: string,
  skillId: string,
  conversationHistory: ChatMessage[]
): Promise<void> {
  const now = Date.now();
  await pool.query(
    `INSERT INTO skill_tree_progress (user_id, skill_id, verified_at, conversation_history, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $5)
     ON CONFLICT (user_id, skill_id)
     DO UPDATE SET verified_at = $3, conversation_history = $4, updated_at = $5`,
    [userId, skillId, now, JSON.stringify(conversationHistory), now]
  );
}
