import OpenAI from 'openai';

interface SubjectTutorMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface SubjectTutorChatOptions {
  subject: string;
  topic: string;
  level?: string;
  goal?: string;
  language?: 'es' | 'en';
  messages: SubjectTutorMessage[];
  userMessage: string;
}

interface SubjectTutorChatStep {
  title: string;
  content: string;
}

interface SubjectTutorChatResult {
  success: boolean;
  response: string;
  steps: SubjectTutorChatStep[];
  followUpQuestion: string;
}

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY environment variable is required to run the learn subject tutor. '
      );
    }
    openaiClient = new OpenAI({ apiKey });
  }

  return openaiClient;
}

const MODEL = 'gpt-5-chat-latest';

export async function subjectTutorChat(options: SubjectTutorChatOptions): Promise<SubjectTutorChatResult> {
  const openai = getOpenAIClient();
  const {
    subject,
    topic,
    level,
    goal,
    language = 'es',
    messages,
    userMessage,
  } = options;

  if (!subject || !topic) {
    throw new Error('Subject and topic are required');
  }

  const cleanedSubject = subject.trim();
  const cleanedTopic = topic.trim();
  const cleanedLevel = level?.trim();
  const cleanedGoal = goal?.trim();

  if (!cleanedSubject || !cleanedTopic) {
    throw new Error('Subject and topic are required');
  }

  if (!userMessage) {
    throw new Error('User message is required');
  }

  const cleanedUserMessage = userMessage.trim();

  if (!cleanedUserMessage) {
    throw new Error('User message is required');
  }

  const systemPrompt = `Eres un tutor experto y paciente que guía a estudiantes chilenos que se preparan para la PAES.

Contexto de la lección:
- Materia principal: ${cleanedSubject}
- Tema específico: ${cleanedTopic}
- Nivel del estudiante: ${cleanedLevel || 'no indicado, asume nivel medio de enseñanza media'}
- Objetivo: ${cleanedGoal || 'ayudar al estudiante a dominar los fundamentos y aplicarlos en problemas reales'}

Tu misión es enseñar paso a paso usando la metodología socrática:
1. Entrega una explicación breve en 2-3 pasos numerados.
2. Cada paso debe enfocarse en una idea clave o micro-habilidad, con lenguaje cercano.
3. Termina SIEMPRE con una pregunta de seguimiento que valide la comprensión o haga que el estudiante piense.
4. Usa ejemplos simples y conecta con situaciones chilenas cuando ayude.
5. Mantén un tono motivador, cálido y juvenil.

Formato de respuesta (JSON obligatorio):
{
  "explanationSteps": [
    { "title": "Paso 1", "content": "Explicación en 1-3 oraciones" }
  ],
  "followUpQuestion": "Pregunta abierta o de opción múltiple"
}

Habla en ${language === 'es' ? 'español chileno informal' : 'english'}.
No incluyas ningún texto fuera del JSON.`;

  const sanitizedHistory = messages
    .filter(message => message.role === 'user' || message.role === 'assistant')
    .slice(-8);

  const conversation = sanitizedHistory.map(({ role, content }) => ({ role, content }));
  conversation.push({ role: 'user', content: cleanedUserMessage });

  const response = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.6,
    max_tokens: 800,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      ...conversation,
    ],
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No se recibió respuesta del modelo');
  }

  let parsed: { explanationSteps?: SubjectTutorChatStep[]; followUpQuestion?: string };

  try {
    parsed = JSON.parse(content);
  } catch (error) {
    console.error('Error parsing tutor response JSON:', error);
    throw new Error('La respuesta del tutor no tuvo el formato esperado');
  }

  if (!parsed.explanationSteps || parsed.explanationSteps.length === 0 || !parsed.followUpQuestion) {
    throw new Error('Respuesta incompleta del tutor');
  }

  const formattedResponse = `${parsed.explanationSteps
    .map((step, index) => `**Paso ${index + 1}: ${step.title}**\n${step.content}`)
    .join('\n\n')}\n\n${parsed.followUpQuestion}`;

  return {
    success: true,
    response: formattedResponse,
    steps: parsed.explanationSteps,
    followUpQuestion: parsed.followUpQuestion,
  };
}
