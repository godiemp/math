'use client';

import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Send } from 'lucide-react';
import { useChatInput } from '@/hooks/useChatInput';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface TutorDrawerContentProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

function ChatMarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert [&>p]:my-1 [&>p]:leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function TutorDrawerContent({
  messages,
  onSendMessage,
  isLoading,
}: TutorDrawerContentProps) {
  const { input, setInput, handleSubmit, canSubmit } = useChatInput(onSendMessage, isLoading);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Header info */}
      <div className="p-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <p className="text-sm text-black/60 dark:text-white/60">
          Pregunta si necesitas ayuda con esta pregunta
        </p>
      </div>

      {/* Messages */}
      <div
        data-testid="chat-messages"
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 && (
          <div
            data-testid="chat-empty-state"
            className="text-center text-black/40 dark:text-white/40 text-sm py-8"
          >
            <div className="text-4xl mb-3">🤖</div>
            <p>Escribe tu pregunta o lo que has intentado</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            data-testid={`chat-message-${msg.role}`}
            className={`p-3 rounded-2xl text-sm ${
              msg.role === 'user'
                ? 'bg-[#0A84FF] text-white ml-8'
                : 'bg-black/[0.04] dark:bg-white/[0.06] mr-8'
            }`}
          >
            {msg.role === 'user' ? (
              <span className="whitespace-pre-wrap">{msg.content}</span>
            ) : (
              <ChatMarkdownRenderer content={msg.content} />
            )}
          </div>
        ))}
        {isLoading && (
          <div
            data-testid="chat-loading"
            className="bg-black/[0.04] dark:bg-white/[0.06] mr-8 p-3 rounded-2xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#0A84FF] rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-[#0A84FF] rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              />
              <div
                className="w-2 h-2 bg-[#0A84FF] rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-black/[0.08] dark:border-white/[0.08]"
      >
        <div className="flex gap-2">
          <input
            data-testid="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 text-sm focus:outline-none focus:border-[#0A84FF] transition-colors"
          />
          <button
            data-testid="chat-send"
            type="submit"
            disabled={!canSubmit}
            className="p-3 rounded-xl bg-[#0A84FF] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-[#0A84FF]/90"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

TutorDrawerContent.displayName = 'TutorDrawerContent';
