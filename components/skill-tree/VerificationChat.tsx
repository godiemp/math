'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { X, Send, Loader2, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface VerificationChatProps {
  skillName: string;
  messages: Message[];
  isLoading: boolean;
  isVerified: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

export function VerificationChat({
  skillName,
  messages,
  isLoading,
  isVerified,
  onSendMessage,
  onClose,
}: VerificationChatProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !isVerified) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg h-[500px] flex flex-col" hover={false}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
          <div>
            <h2 className="font-semibold text-lg text-black dark:text-white">
              Verificando: {skillName}
            </h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              Demuestra que entiendes este concepto
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] px-4 py-2 rounded-2xl text-sm',
                  message.role === 'user'
                    ? 'bg-[#0A84FF] text-white rounded-br-md'
                    : 'bg-black/5 dark:bg-white/10 text-black dark:text-white rounded-bl-md'
                )}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-black/5 dark:bg-white/10 px-4 py-2 rounded-2xl rounded-bl-md">
                <Loader2 className="w-5 h-5 animate-spin text-black/40 dark:text-white/40" />
              </div>
            </div>
          )}

          {isVerified && (
            <div className="flex justify-center py-4">
              <div className="text-center">
                <PartyPopper className="w-12 h-12 text-[#30D158] mx-auto mb-2" />
                <p className="font-semibold text-[#30D158]">
                  Excelente trabajo!
                </p>
                <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                  Has demostrado que entiendes este concepto
                </p>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={onClose}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {!isVerified && (
          <form onSubmit={handleSubmit} className="pt-4 border-t border-black/10 dark:border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className={cn(
                  'flex-1 px-4 py-2 rounded-full text-sm',
                  'bg-black/5 dark:bg-white/10',
                  'border border-black/10 dark:border-white/10',
                  'focus:outline-none focus:ring-2 focus:ring-[#0A84FF]/50',
                  'text-black dark:text-white',
                  'placeholder:text-black/40 dark:placeholder:text-white/40'
                )}
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="primary"
                disabled={!input.trim() || isLoading}
                className="rounded-full px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
