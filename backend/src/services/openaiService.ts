/**
 * OpenAI Service - Optimized AI wrapper with model routing and streaming
 *
 * Features:
 * - Model routing (gpt-4o-mini for fast tasks, gpt-4o for complex reasoning)
 * - Streaming support for real-time responses
 * - JSON mode for structured outputs
 * - Conversation summarization to reduce token usage
 * - Aggressive max_tokens limits
 */

import OpenAI from 'openai';

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        'OPENAI_API_KEY environment variable is missing or empty. ' +
        'Please set it in your environment to use AI features.'
      );
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

// Model configuration
export const MODELS = {
  FAST: 'gpt-4o-mini', // Fast, cheap - for simple tasks
  SMART: 'gpt-4o',      // More capable - for complex reasoning
} as const;

// Task types for routing
export type TaskType =
  | 'step_verification'
  | 'follow_up_question'
  | 'json_parsing'
  | 'assessment_analysis'
  | 'guidance_generation'
  | 'socratic_response'
  | 'chat_response'
  | 'summarization';

// Model routing configuration
const TASK_MODEL_MAP: Record<TaskType, keyof typeof MODELS> = {
  step_verification: 'FAST',
  follow_up_question: 'FAST',
  json_parsing: 'FAST',
  assessment_analysis: 'SMART',
  guidance_generation: 'SMART',
  socratic_response: 'SMART',
  chat_response: 'SMART',
  summarization: 'FAST',
};

// Optimized max_tokens per task (50% reduction from original)
const TASK_MAX_TOKENS: Record<TaskType, number> = {
  step_verification: 256,
  follow_up_question: 128,
  json_parsing: 512,
  assessment_analysis: 512,
  guidance_generation: 1024,
  socratic_response: 400,
  chat_response: 800,
  summarization: 200,
};

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CompletionOptions {
  messages: ChatMessage[];
  taskType: TaskType;
  temperature?: number;
  jsonMode?: boolean;
  maxTokensOverride?: number;
}

export interface StreamCompletionOptions extends CompletionOptions {
  onToken?: (token: string) => void;
  onComplete?: (fullResponse: string) => void;
}

export interface CompletionResult {
  content: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  latencyMs: number;
}

/**
 * Get the appropriate model for a task type
 */
export function getModelForTask(taskType: TaskType): string {
  const modelKey = TASK_MODEL_MAP[taskType];
  return MODELS[modelKey];
}

/**
 * Get max tokens for a task type
 */
export function getMaxTokensForTask(taskType: TaskType): number {
  return TASK_MAX_TOKENS[taskType];
}

/**
 * Standard completion (non-streaming)
 */
export async function completion(options: CompletionOptions): Promise<CompletionResult> {
  const startTime = Date.now();
  const { messages, taskType, temperature = 0.7, jsonMode = false, maxTokensOverride } = options;

  const model = getModelForTask(taskType);
  const maxTokens = maxTokensOverride || getMaxTokensForTask(taskType);

  const requestBody: OpenAI.ChatCompletionCreateParamsNonStreaming = {
    model,
    messages,
    max_tokens: maxTokens,
    temperature,
  };

  // Enable JSON mode if requested
  if (jsonMode) {
    requestBody.response_format = { type: 'json_object' };
  }

  const response = await getOpenAIClient().chat.completions.create(requestBody);

  const content = response.choices[0]?.message?.content || '';
  const latencyMs = Date.now() - startTime;

  return {
    content,
    model,
    promptTokens: response.usage?.prompt_tokens || 0,
    completionTokens: response.usage?.completion_tokens || 0,
    totalTokens: response.usage?.total_tokens || 0,
    latencyMs,
  };
}

/**
 * Streaming completion with token-by-token delivery
 */
export async function streamCompletion(options: StreamCompletionOptions): Promise<CompletionResult> {
  const startTime = Date.now();
  const { messages, taskType, temperature = 0.7, jsonMode = false, maxTokensOverride, onToken, onComplete } = options;

  const model = getModelForTask(taskType);
  const maxTokens = maxTokensOverride || getMaxTokensForTask(taskType);

  const requestBody: OpenAI.ChatCompletionCreateParamsStreaming = {
    model,
    messages,
    max_tokens: maxTokens,
    temperature,
    stream: true,
    stream_options: { include_usage: true },
  };

  // Enable JSON mode if requested
  if (jsonMode) {
    requestBody.response_format = { type: 'json_object' };
  }

  const stream = await getOpenAIClient().chat.completions.create(requestBody);

  let fullContent = '';
  let promptTokens = 0;
  let completionTokens = 0;

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      fullContent += content;
      if (onToken) {
        onToken(content);
      }
    }

    // Capture usage from final chunk
    if (chunk.usage) {
      promptTokens = chunk.usage.prompt_tokens;
      completionTokens = chunk.usage.completion_tokens;
    }
  }

  if (onComplete) {
    onComplete(fullContent);
  }

  const latencyMs = Date.now() - startTime;

  return {
    content: fullContent,
    model,
    promptTokens,
    completionTokens,
    totalTokens: promptTokens + completionTokens,
    latencyMs,
  };
}

/**
 * Summarize conversation history to reduce tokens
 * Called when conversation exceeds threshold
 */
export async function summarizeConversation(messages: ChatMessage[]): Promise<string> {
  if (messages.length <= 3) {
    return '';
  }

  const conversationText = messages
    .map(m => `${m.role}: ${m.content}`)
    .join('\n');

  const result = await completion({
    messages: [
      {
        role: 'system',
        content: 'Summarize this conversation in 2-3 sentences. Focus on key points discussed and student understanding. Be very concise. Respond in Spanish.',
      },
      {
        role: 'user',
        content: conversationText,
      },
    ],
    taskType: 'summarization',
    temperature: 0.3,
  });

  return result.content;
}

/**
 * Manage conversation history with automatic summarization
 * Returns optimized messages array with summary if needed
 */
export async function optimizeConversationHistory(
  systemPrompt: string,
  messages: ChatMessage[],
  maxMessages: number = 5,
  maxTokenEstimate: number = 2000
): Promise<ChatMessage[]> {
  // If within limits, return as-is
  if (messages.length <= maxMessages) {
    return [{ role: 'system', content: systemPrompt }, ...messages];
  }

  // Estimate tokens (rough: 4 chars = 1 token)
  const totalChars = messages.reduce((sum, m) => sum + m.content.length, 0);
  const estimatedTokens = totalChars / 4;

  if (estimatedTokens < maxTokenEstimate && messages.length <= maxMessages * 2) {
    return [{ role: 'system', content: systemPrompt }, ...messages];
  }

  // Summarize older messages, keep recent ones
  const olderMessages = messages.slice(0, -3);
  const recentMessages = messages.slice(-3);

  const summary = await summarizeConversation(olderMessages);

  const optimizedSystemPrompt = summary
    ? `${systemPrompt}\n\n**Conversation Context:**\n${summary}`
    : systemPrompt;

  return [{ role: 'system', content: optimizedSystemPrompt }, ...recentMessages];
}

/**
 * Quick JSON extraction helper - uses fast model
 */
export async function extractJSON<T>(text: string, schema: string): Promise<T> {
  const result = await completion({
    messages: [
      {
        role: 'system',
        content: `Extract and return valid JSON matching this schema: ${schema}. Only return the JSON object, nothing else.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
    taskType: 'json_parsing',
    jsonMode: true,
    temperature: 0,
  });

  return JSON.parse(result.content);
}

/**
 * Health check - verify API key and connection
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const result = await completion({
      messages: [{ role: 'user', content: 'Say "ok"' }],
      taskType: 'json_parsing',
      maxTokensOverride: 10,
    });
    return result.content.toLowerCase().includes('ok');
  } catch {
    return false;
  }
}

// Export OpenAI client for advanced use cases
export { openai };
