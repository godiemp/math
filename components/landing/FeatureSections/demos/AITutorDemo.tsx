'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const CONVERSATION: Message[] = [
  { role: 'user', text: 'No entiendo esta pregunta' },
  { role: 'assistant', text: '¿Qué parte te confunde más?' },
  { role: 'user', text: 'El paso donde multiplican' },
  { role: 'assistant', text: 'Piensa: ¿qué números estás combinando?' },
];

const STEP_DURATION = 1500; // Time between messages
const TYPING_DURATION = 800; // Typing indicator duration
const RESET_DELAY = 2000; // Pause before reset

export function AITutorDemo() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (visibleMessages >= CONVERSATION.length) {
      // Reset after showing all messages
      const resetTimer = setTimeout(() => {
        setVisibleMessages(0);
      }, RESET_DELAY);
      return () => clearTimeout(resetTimer);
    }

    // Show typing indicator before assistant messages
    const nextMessage = CONVERSATION[visibleMessages];
    if (nextMessage?.role === 'assistant') {
      setShowTyping(true);
      const typingTimer = setTimeout(() => {
        setShowTyping(false);
        setVisibleMessages((v) => v + 1);
      }, TYPING_DURATION);
      return () => clearTimeout(typingTimer);
    } else {
      // Show user message immediately after delay
      const timer = setTimeout(() => {
        setVisibleMessages((v) => v + 1);
      }, STEP_DURATION);
      return () => clearTimeout(timer);
    }
  }, [visibleMessages]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Header */}
      <div
        className="px-4 py-3 border-b flex items-center gap-2"
        style={{ borderColor: 'var(--color-separator)' }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-tint)' }}
        >
          <Sparkles size={16} color="white" />
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: 'var(--color-label-primary)' }}>
            Tutor AI
          </div>
          <div className="text-xs" style={{ color: 'var(--color-label-secondary)' }}>
            Método Socrático
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 p-4 overflow-hidden min-h-[180px]">
        <div className="space-y-2">
          <AnimatePresence>
            {CONVERSATION.slice(0, visibleMessages).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-1.5 rounded-2xl text-xs ${
                    msg.role === 'user'
                      ? 'rounded-br-md'
                      : 'rounded-bl-md'
                  }`}
                  style={{
                    background: msg.role === 'user' ? 'var(--color-tint)' : 'var(--color-surface)',
                    color: msg.role === 'user' ? 'white' : 'var(--color-label-primary)',
                    boxShadow: msg.role === 'assistant' ? '0 1px 3px rgba(0,0,0,0.1)' : undefined,
                  }}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {showTyping && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div
                  className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1"
                  style={{ background: 'var(--color-surface)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                >
                  <TypingDot delay={0} />
                  <TypingDot delay={0.15} />
                  <TypingDot delay={0.3} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer hint */}
      <div
        className="px-4 py-2 text-center text-xs border-t"
        style={{
          color: 'var(--color-label-secondary)',
          borderColor: 'var(--color-separator)',
          background: 'var(--color-surface)',
        }}
      >
        Te guía sin darte la respuesta
      </div>
    </div>
  );
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{ background: 'var(--color-label-secondary)' }}
      animate={{
        y: [0, -4, 0],
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}
