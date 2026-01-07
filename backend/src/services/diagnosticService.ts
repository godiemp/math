/**
 * Diagnostic Service
 * AI-powered knowledge diagnosis through natural conversation
 * Infers student knowledge and updates knowledge declarations progressively
 */

import Anthropic from '@anthropic-ai/sdk';
import { pool } from '../config/database';
import {
  THEMATIC_UNITS,
  getUnitsByLevelAndSubject,
  getUnitByCode,
  ThematicUnit,
} from '../config/thematic-units';

// Types
export type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';
export type DiagnosticStatus = 'active' | 'completed' | 'abandoned';

export interface DiagnosticSession {
  id: string;
  userId: string;
  subject: Subject;
  status: DiagnosticStatus;
  targetLevel: string;
  messages: ChatMessage[];
  inferences: KnowledgeInference[];
  unitsCovered: string[];
  startedAt: number;
  completedAt?: number;
  updatedAt: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface KnowledgeInference {
  unitCode: string;
  subsectionCode?: string;
  knows: boolean;
  confidence: number;
  reason: string;
  inferredAt: number;
  confirmed?: boolean;
}

export interface StartDiagnosticOptions {
  userId: string;
  subject: Subject;
  targetLevel: string;
}

export interface ContinueDiagnosticOptions {
  userId: string;
  sessionId: string;
  message: string;
}

export interface DiagnosticResponse {
  sessionId: string;
  message: string;
  inferences: KnowledgeInference[];
  isComplete: boolean;
  suggestedNextTopic?: Subject;
  success: boolean;
}

export interface DiagnosticStatusResponse {
  subjects: {
    subject: Subject;
    status: 'not_started' | 'in_progress' | 'completed';
    unitsDiagnosed: number;
    totalUnits: number;
    lastSessionId?: string;
  }[];
}

/**
 * Tool definitions for diagnostic AI
 */
const DIAGNOSTIC_TOOLS: Anthropic.Tool[] = [
  {
    name: 'get_unit_details',
    description: 'Obtiene detalles de una unidad temática incluyendo sus subsecciones y habilidades. Usa esto para saber qué preguntar sobre un tema específico.',
    input_schema: {
      type: 'object' as const,
      properties: {
        unitCode: {
          type: 'string',
          description: 'Código de unidad (ej: M1-NUM-001, M1-ALG-002)',
        },
      },
      required: ['unitCode'],
    },
  },
  {
    name: 'get_units_for_subject',
    description: 'Obtiene todas las unidades de un tema específico. Usa esto al inicio para saber qué unidades cubrir.',
    input_schema: {
      type: 'object' as const,
      properties: {
        subject: {
          type: 'string',
          enum: ['números', 'álgebra', 'geometría', 'probabilidad'],
          description: 'El tema del cual obtener unidades',
        },
        level: {
          type: 'string',
          enum: ['M1', 'M2', 'both'],
          description: 'Nivel (M1, M2, o both para ambos)',
        },
      },
      required: ['subject'],
    },
  },
  {
    name: 'infer_knowledge',
    description: 'Registra inferencias de conocimiento basadas en la conversación. Llama esto cuando tengas suficiente información para inferir si el estudiante conoce o no ciertas unidades/subsecciones. Solo registra inferencias con confidence >= 0.7.',
    input_schema: {
      type: 'object' as const,
      properties: {
        inferences: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              unitCode: {
                type: 'string',
                description: 'Código de la unidad (ej: M1-NUM-001)',
              },
              subsectionCode: {
                type: 'string',
                description: 'Código de subsección opcional (ej: A, B, C). Si es null, la inferencia aplica a toda la unidad.',
              },
              knows: {
                type: 'boolean',
                description: 'true si el estudiante parece dominar esto, false si necesita práctica',
              },
              confidence: {
                type: 'number',
                minimum: 0,
                maximum: 1,
                description: 'Nivel de confianza en la inferencia (0-1). Solo registra si >= 0.7',
              },
              reason: {
                type: 'string',
                description: 'Razón breve de por qué inferiste esto basándote en lo que dijo el estudiante',
              },
            },
            required: ['unitCode', 'knows', 'confidence', 'reason'],
          },
        },
      },
      required: ['inferences'],
    },
  },
  {
    name: 'get_current_declarations',
    description: 'Obtiene las declaraciones de conocimiento actuales del estudiante para este tema. Usa esto para evitar preguntar sobre lo que ya sabemos.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'complete_topic_diagnostic',
    description: 'Marca el diagnóstico del tema como completo. Llama esto cuando hayas cubierto suficientes unidades del tema o el estudiante quiera terminar.',
    input_schema: {
      type: 'object' as const,
      properties: {
        summary: {
          type: 'string',
          description: 'Resumen breve de lo diagnosticado (qué domina, qué necesita practicar)',
        },
        suggestedNextTopic: {
          type: 'string',
          enum: ['números', 'álgebra', 'geometría', 'probabilidad', 'none'],
          description: 'Siguiente tema sugerido para diagnosticar, o "none" si ya cubrimos suficiente',
        },
      },
      required: ['summary'],
    },
  },
];

/**
 * Generate system prompt for diagnostic conversation
 */
function generateDiagnosticSystemPrompt(
  subject: Subject,
  targetLevel: string,
  units: ThematicUnit[],
  existingInferences: KnowledgeInference[]
): string {
  const levelText = targetLevel === 'M1_ONLY' ? 'solo M1' : 'M1 y M2';
  const unitNames = units.map(u => `${u.code}: ${u.name}`).join('\n');

  const existingKnowledge = existingInferences.length > 0
    ? `\nCONOCIMIENTO YA INFERIDO:\n${existingInferences.map(i =>
        `- ${i.unitCode}${i.subsectionCode ? `:${i.subsectionCode}` : ''}: ${i.knows ? 'Domina' : 'Necesita práctica'} (${(i.confidence * 100).toFixed(0)}% confianza)`
      ).join('\n')}`
    : '';

  return `Eres un tutor experto en matemáticas PAES que realiza diagnósticos de conocimiento a través de conversación natural.

**Tu objetivo**: Determinar qué sabe el estudiante sobre ${subject} a través de una conversación amigable y natural. NO hagas preguntas de matemáticas directas (no es un quiz).

**Contexto del estudiante**:
- Nivel objetivo: ${levelText}
- Tema actual: ${subject}

**Unidades a diagnosticar**:
${unitNames}
${existingKnowledge}

**METODOLOGÍA DE DIAGNÓSTICO**:

1. **INICIO**: Empieza con una pregunta abierta y amigable:
   - "Cuéntame, ¿qué temas de ${subject} sientes que dominas bien?"
   - "¿Hay algún tema de ${subject} que te cueste más?"

2. **PROFUNDIZACIÓN**: Basándote en las respuestas:
   - Si mencionan un tema específico: "¿Qué tipo de ejercicios de [tema] te resultan más fáciles?"
   - Si son vagos: "Por ejemplo, en fracciones, ¿te sientes cómodo operando con fracciones mixtas?"
   - Pregunta sobre situaciones concretas: "Cuando te piden calcular porcentajes de descuento, ¿cómo te va?"

3. **SEÑALES A DETECTAR**:

   **Señales POSITIVAS** (knows: true):
   - "Eso lo domino", "Me va bien en..."
   - Describe procedimientos correctamente
   - Menciona detalles específicos
   - Muestra confianza genuina

   **Señales NEGATIVAS** (knows: false):
   - "Me cuesta", "No me acuerdo cómo..."
   - "Siempre me confundo con..."
   - Admite dificultad directamente
   - Evade el tema

4. **INFERIR CONOCIMIENTO**:
   - Cuando tengas información clara sobre 2-3 unidades, llama a \`infer_knowledge\`
   - Solo infiere con confidence >= 0.7
   - Si no estás seguro, sigue preguntando
   - Usa \`get_unit_details\` para ver las subsecciones de una unidad

5. **COMPLETAR DIAGNÓSTICO**:
   - Después de cubrir varias unidades, presenta un resumen
   - Pregunta si quiere ajustar algo
   - Llama a \`complete_topic_diagnostic\` cuando el estudiante confirme

**REGLAS IMPORTANTES**:
- NO hagas preguntas tipo quiz (ej: "¿cuánto es 3/4 + 1/2?")
- SÍ pregunta sobre confianza y experiencia
- Sé empático: si dice que algo le cuesta, está bien
- Celebra fortalezas sin exagerar
- Mantén un tono casual y amigable (estilo gen-z chileno)
- Usa emojis con moderación (🌸🌿✨🔍🎯)
- Respuestas concisas (2-4 oraciones máximo por turno)

**EJEMPLO DE CONVERSACIÓN**:

Tú: "¡Hola! 🌿 Vamos a descubrir en qué temas de ${subject} te sientes más seguro. Cuéntame, ¿qué cosas de ${subject} sientes que dominas?"

Estudiante: "Las fracciones me van bien, puedo sumar y multiplicar. Con porcentajes también me defiendo."

Tú: "Genial que te sientas cómodo con fracciones ✨ Y cuando son fracciones mixtas, tipo 2½ + 1¾, ¿también te fluye?"

Estudiante: "Sí, eso lo manejo. Lo que me cuesta son las potencias y raíces."

Tú: "Entiendo. Es súper común 🔍 ¿Qué parte de potencias te resulta más difícil? ¿Las reglas de exponentes o más las raíces cuadradas?"

[Después de suficiente información, el AI llama a infer_knowledge con las inferencias]`;
}

/**
 * Execute diagnostic tool
 */
async function executeDiagnosticTool(
  toolName: string,
  toolInput: Record<string, unknown>,
  session: DiagnosticSession
): Promise<string> {
  try {
    switch (toolName) {
      case 'get_unit_details': {
        const unitCode = toolInput.unitCode as string;
        const unit = getUnitByCode(unitCode);
        if (!unit) {
          return JSON.stringify({ error: `Unidad ${unitCode} no encontrada` });
        }
        return JSON.stringify({
          code: unit.code,
          name: unit.name,
          level: unit.level,
          subject: unit.subject,
          subsections: unit.subsections?.map(s => ({
            code: s.code,
            name: s.name,
            skills: s.primary_skills,
          })) || [],
        });
      }

      case 'get_units_for_subject': {
        const subject = toolInput.subject as Subject;
        const level = (toolInput.level as string) || 'both';

        let units: ThematicUnit[] = [];
        if (level === 'both' || level === 'M1') {
          units = units.concat(getUnitsByLevelAndSubject('M1', subject));
        }
        if (level === 'both' || level === 'M2') {
          units = units.concat(getUnitsByLevelAndSubject('M2', subject));
        }

        return JSON.stringify(units.map(u => ({
          code: u.code,
          name: u.name,
          level: u.level,
          subsectionCount: u.subsections?.length || 0,
        })));
      }

      case 'infer_knowledge': {
        const inferences = toolInput.inferences as Array<{
          unitCode: string;
          subsectionCode?: string;
          knows: boolean;
          confidence: number;
          reason: string;
        }>;

        // Filter only high-confidence inferences
        const validInferences = inferences.filter(i => i.confidence >= 0.7);

        if (validInferences.length === 0) {
          return JSON.stringify({
            message: 'No hay inferencias con suficiente confianza (>= 0.7). Sigue conversando para obtener más información.'
          });
        }

        // Add inferences to session (will be saved later)
        const newInferences: KnowledgeInference[] = validInferences.map(i => ({
          unitCode: i.unitCode,
          subsectionCode: i.subsectionCode,
          knows: i.knows,
          confidence: i.confidence,
          reason: i.reason,
          inferredAt: Date.now(),
          confirmed: false,
        }));

        // Merge with existing, updating if same unit/subsection
        for (const newInf of newInferences) {
          const existingIndex = session.inferences.findIndex(
            e => e.unitCode === newInf.unitCode && e.subsectionCode === newInf.subsectionCode
          );
          if (existingIndex >= 0) {
            session.inferences[existingIndex] = newInf;
          } else {
            session.inferences.push(newInf);
          }
        }

        return JSON.stringify({
          message: `Registradas ${validInferences.length} inferencias`,
          inferences: validInferences.map(i => ({
            unit: i.unitCode,
            subsection: i.subsectionCode || 'toda la unidad',
            status: i.knows ? 'domina' : 'necesita práctica',
            confidence: `${(i.confidence * 100).toFixed(0)}%`,
          })),
        });
      }

      case 'get_current_declarations': {
        // Get existing declarations from database
        const result = await pool.query(
          `SELECT declaration_type, item_code, knows
           FROM user_knowledge_declarations
           WHERE user_id = $1 AND item_code LIKE $2`,
          [session.userId, `${session.subject === 'números' ? 'M%-NUM-%' :
                            session.subject === 'álgebra' ? 'M%-ALG-%' :
                            session.subject === 'geometría' ? 'M%-GEO-%' : 'M%-PRO-%'}`]
        );

        if (result.rows.length === 0) {
          return JSON.stringify({ message: 'No hay declaraciones previas para este tema' });
        }

        return JSON.stringify({
          declarations: result.rows.map(r => ({
            type: r.declaration_type,
            code: r.item_code,
            knows: r.knows,
          })),
        });
      }

      case 'complete_topic_diagnostic': {
        const summary = toolInput.summary as string;
        const suggestedNextTopic = toolInput.suggestedNextTopic as string | undefined;

        // Mark session as complete
        session.status = 'completed';
        session.completedAt = Date.now();

        return JSON.stringify({
          completed: true,
          summary,
          suggestedNextTopic: suggestedNextTopic || 'none',
          totalInferences: session.inferences.length,
        });
      }

      default:
        return JSON.stringify({ error: `Tool desconocido: ${toolName}` });
    }
  } catch (error) {
    console.error(`Error executing diagnostic tool ${toolName}:`, error);
    return JSON.stringify({
      error: `Error ejecutando herramienta: ${error instanceof Error ? error.message : 'Error desconocido'}`
    });
  }
}

/**
 * Start a new diagnostic session
 */
export async function startDiagnostic(options: StartDiagnosticOptions): Promise<DiagnosticResponse> {
  const { userId, subject, targetLevel } = options;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  // Check for existing active session
  const existingSession = await pool.query(
    `SELECT id FROM diagnostic_sessions
     WHERE user_id = $1 AND subject = $2 AND status = 'active'`,
    [userId, subject]
  );

  if (existingSession.rows.length > 0) {
    // Return existing session
    return {
      sessionId: existingSession.rows[0].id,
      message: 'Ya tienes una sesión de diagnóstico activa para este tema. ¿Continuamos donde lo dejamos?',
      inferences: [],
      isComplete: false,
      success: true,
    };
  }

  // Get units for this subject and level
  const levels = targetLevel === 'M1_ONLY' ? ['M1'] : ['M1', 'M2'];
  const units: ThematicUnit[] = levels.flatMap(level =>
    getUnitsByLevelAndSubject(level as 'M1' | 'M2', subject)
  );

  // Create session
  const sessionId = `diag-${userId}-${subject}-${Date.now()}`;
  const now = Date.now();

  await pool.query(
    `INSERT INTO diagnostic_sessions
     (id, user_id, subject, status, target_level, messages, inferences, units_covered, started_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [sessionId, userId, subject, 'active', targetLevel, '[]', '[]', '{}', now, now]
  );

  // Generate initial greeting
  const anthropic = new Anthropic({ apiKey });
  const systemPrompt = generateDiagnosticSystemPrompt(subject, targetLevel, units, []);

  const subjectEmoji = {
    'números': '🔢',
    'álgebra': '📐',
    'geometría': '📏',
    'probabilidad': '📊',
  };

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 500,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `El estudiante acaba de iniciar el diagnóstico de ${subject}. Genera tu mensaje de bienvenida (pregunta abierta inicial).`,
      },
    ],
  });

  const textBlock = response.content.find(block => block.type === 'text') as Anthropic.TextBlock;
  const greeting = textBlock?.text || `¡Hola! ${subjectEmoji[subject]} Vamos a descubrir qué sabes de ${subject}. Cuéntame, ¿qué temas sientes que dominas?`;

  // Save initial message
  const messages: ChatMessage[] = [
    { role: 'assistant', content: greeting, timestamp: now },
  ];

  await pool.query(
    `UPDATE diagnostic_sessions SET messages = $1, updated_at = $2 WHERE id = $3`,
    [JSON.stringify(messages), now, sessionId]
  );

  return {
    sessionId,
    message: greeting,
    inferences: [],
    isComplete: false,
    success: true,
  };
}

/**
 * Continue diagnostic conversation
 */
export async function continueDiagnostic(options: ContinueDiagnosticOptions): Promise<DiagnosticResponse> {
  const { userId, sessionId, message } = options;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  // Load session
  const sessionResult = await pool.query(
    `SELECT * FROM diagnostic_sessions WHERE id = $1 AND user_id = $2`,
    [sessionId, userId]
  );

  if (sessionResult.rows.length === 0) {
    throw new Error('Sesión de diagnóstico no encontrada');
  }

  const row = sessionResult.rows[0];
  const session: DiagnosticSession = {
    id: row.id,
    userId: row.user_id,
    subject: row.subject,
    status: row.status,
    targetLevel: row.target_level,
    messages: row.messages || [],
    inferences: row.inferences || [],
    unitsCovered: row.units_covered || [],
    startedAt: parseInt(row.started_at),
    completedAt: row.completed_at ? parseInt(row.completed_at) : undefined,
    updatedAt: parseInt(row.updated_at),
  };

  if (session.status === 'completed') {
    return {
      sessionId,
      message: 'Este diagnóstico ya está completado. ¿Quieres iniciar uno nuevo para otro tema?',
      inferences: session.inferences,
      isComplete: true,
      success: true,
    };
  }

  // Add user message
  const now = Date.now();
  session.messages.push({ role: 'user', content: message, timestamp: now });

  // Get units for context
  const levels = session.targetLevel === 'M1_ONLY' ? ['M1'] : ['M1', 'M2'];
  const units: ThematicUnit[] = levels.flatMap(level =>
    getUnitsByLevelAndSubject(level as 'M1' | 'M2', session.subject)
  );

  // Generate AI response
  const anthropic = new Anthropic({ apiKey });
  const systemPrompt = generateDiagnosticSystemPrompt(
    session.subject,
    session.targetLevel,
    units,
    session.inferences
  );

  // Build messages for Claude
  const claudeMessages: Anthropic.MessageParam[] = session.messages.map(m => ({
    role: m.role,
    content: m.content,
  }));

  let response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1000,
    system: systemPrompt,
    messages: claudeMessages,
    tools: DIAGNOSTIC_TOOLS,
  });

  // Handle tool use loop
  let isComplete = false;
  let suggestedNextTopic: Subject | undefined;

  while (response.stop_reason === 'tool_use') {
    const toolUseBlock = response.content.find(block => block.type === 'tool_use') as Anthropic.ToolUseBlock;
    if (!toolUseBlock) break;

    // Execute tool
    const toolResult = await executeDiagnosticTool(
      toolUseBlock.name,
      toolUseBlock.input as Record<string, unknown>,
      session
    );

    // Check if diagnostic was completed
    if (toolUseBlock.name === 'complete_topic_diagnostic') {
      isComplete = true;
      const result = JSON.parse(toolResult);
      if (result.suggestedNextTopic && result.suggestedNextTopic !== 'none') {
        suggestedNextTopic = result.suggestedNextTopic as Subject;
      }
    }

    // Continue conversation with tool result
    response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        ...claudeMessages,
        {
          role: 'assistant',
          content: response.content,
        },
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: toolUseBlock.id,
              content: toolResult,
            },
          ],
        },
      ],
      tools: DIAGNOSTIC_TOOLS,
    });
  }

  // Extract final text response
  const textBlock = response.content.find(block => block.type === 'text') as Anthropic.TextBlock;
  const aiResponse = textBlock?.text || 'Continúa contándome sobre tus conocimientos.';

  // Add AI response to messages
  session.messages.push({ role: 'assistant', content: aiResponse, timestamp: Date.now() });

  // Save session
  await pool.query(
    `UPDATE diagnostic_sessions
     SET messages = $1, inferences = $2, status = $3, completed_at = $4, updated_at = $5
     WHERE id = $6`,
    [
      JSON.stringify(session.messages),
      JSON.stringify(session.inferences),
      session.status,
      session.completedAt || null,
      Date.now(),
      sessionId,
    ]
  );

  return {
    sessionId,
    message: aiResponse,
    inferences: session.inferences,
    isComplete,
    suggestedNextTopic,
    success: true,
  };
}

/**
 * Confirm inferences and write to knowledge declarations
 */
export async function confirmInferences(
  userId: string,
  sessionId: string,
  adjustments?: { unitCode: string; subsectionCode?: string; knows: boolean }[]
): Promise<{ success: boolean; declarationsUpdated: number }> {
  // Load session
  const sessionResult = await pool.query(
    `SELECT * FROM diagnostic_sessions WHERE id = $1 AND user_id = $2`,
    [sessionId, userId]
  );

  if (sessionResult.rows.length === 0) {
    throw new Error('Sesión no encontrada');
  }

  const row = sessionResult.rows[0];
  let inferences: KnowledgeInference[] = row.inferences || [];

  // Apply adjustments if provided
  if (adjustments) {
    for (const adj of adjustments) {
      const idx = inferences.findIndex(
        i => i.unitCode === adj.unitCode && i.subsectionCode === adj.subsectionCode
      );
      if (idx >= 0) {
        inferences[idx].knows = adj.knows;
        inferences[idx].confirmed = true;
      }
    }
  }

  // Mark all as confirmed
  inferences = inferences.map(i => ({ ...i, confirmed: true }));

  // Write to knowledge declarations
  const client = await pool.connect();
  let declarationsUpdated = 0;

  try {
    await client.query('BEGIN');
    const now = Date.now();

    for (const inference of inferences) {
      // Determine level from unit code
      const level = inference.unitCode.startsWith('M1') ? 'M1' : 'M2';

      // Determine declaration type and item code
      let declarationType: string;
      let itemCode: string;

      if (inference.subsectionCode) {
        declarationType = 'subsection';
        itemCode = `${inference.unitCode}:${inference.subsectionCode}`;
      } else {
        declarationType = 'unit';
        itemCode = inference.unitCode;
      }

      // Upsert declaration
      await client.query(
        `INSERT INTO user_knowledge_declarations
         (user_id, level, declaration_type, item_code, knows, declared_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $6)
         ON CONFLICT (user_id, declaration_type, item_code)
         DO UPDATE SET knows = $5, updated_at = $6`,
        [userId, level, declarationType, itemCode, inference.knows, now]
      );
      declarationsUpdated++;

      // If marking a unit as known with high confidence, also mark its subsections
      if (declarationType === 'unit' && inference.knows && inference.confidence >= 0.8) {
        const unit = getUnitByCode(inference.unitCode);
        if (unit?.subsections) {
          for (const subsection of unit.subsections) {
            const subItemCode = `${inference.unitCode}:${subsection.code}`;
            await client.query(
              `INSERT INTO user_knowledge_declarations
               (user_id, level, declaration_type, item_code, knows, declared_at, updated_at)
               VALUES ($1, $2, 'subsection', $3, $4, $5, $5)
               ON CONFLICT (user_id, declaration_type, item_code)
               DO UPDATE SET knows = $4, updated_at = $5`,
              [userId, level, subItemCode, inference.knows, now]
            );
            declarationsUpdated++;
          }
        }
      }
    }

    // Update session with confirmed inferences
    await client.query(
      `UPDATE diagnostic_sessions SET inferences = $1, updated_at = $2 WHERE id = $3`,
      [JSON.stringify(inferences), now, sessionId]
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }

  return { success: true, declarationsUpdated };
}

/**
 * Get diagnostic status for all subjects
 */
export async function getDiagnosticStatus(
  userId: string,
  targetLevel: string
): Promise<DiagnosticStatusResponse> {
  const subjects: Subject[] = ['números', 'álgebra', 'geometría', 'probabilidad'];
  const levels = targetLevel === 'M1_ONLY' ? ['M1'] : ['M1', 'M2'];

  const result: DiagnosticStatusResponse = { subjects: [] };

  for (const subject of subjects) {
    // Get total units for this subject
    const units = levels.flatMap(level =>
      getUnitsByLevelAndSubject(level as 'M1' | 'M2', subject)
    );
    const totalUnits = units.length;

    // Get session status
    const sessionResult = await pool.query(
      `SELECT id, status, inferences FROM diagnostic_sessions
       WHERE user_id = $1 AND subject = $2
       ORDER BY updated_at DESC LIMIT 1`,
      [userId, subject]
    );

    let status: 'not_started' | 'in_progress' | 'completed' = 'not_started';
    let unitsDiagnosed = 0;
    let lastSessionId: string | undefined;

    if (sessionResult.rows.length > 0) {
      const session = sessionResult.rows[0];
      lastSessionId = session.id;

      if (session.status === 'completed') {
        status = 'completed';
      } else if (session.status === 'active') {
        status = 'in_progress';
      }

      // Count unique units diagnosed
      const inferences: KnowledgeInference[] = session.inferences || [];
      const diagnosedUnits = new Set(inferences.map(i => i.unitCode));
      unitsDiagnosed = diagnosedUnits.size;
    }

    result.subjects.push({
      subject,
      status,
      unitsDiagnosed,
      totalUnits,
      lastSessionId,
    });
  }

  return result;
}
