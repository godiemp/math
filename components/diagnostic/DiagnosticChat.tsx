'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Text, Heading } from '@/components/ui';
import { X, Send, Loader2, Check, AlertCircle } from 'lucide-react';
import { MarkdownViewer } from '@/components/content/MarkdownViewer';
import { useDiagnosticChat, Subject, KnowledgeInference } from '@/hooks/useDiagnosticChat';
import { DiagnosticProgress } from './DiagnosticProgress';

interface DiagnosticChatProps {
  subject: Subject;
  onClose: () => void;
}

const SUBJECT_EMOJI: Record<Subject, string> = {
  'números': '🔢',
  'álgebra': '📐',
  'geometría': '📏',
  'probabilidad': '📊',
};

const SUBJECT_COLOR: Record<Subject, string> = {
  'números': 'from-blue-500 to-blue-600',
  'álgebra': 'from-purple-500 to-purple-600',
  'geometría': 'from-green-500 to-green-600',
  'probabilidad': 'from-orange-500 to-orange-600',
};

export function DiagnosticChat({ subject, onClose }: DiagnosticChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    inferences,
    isLoading,
    isComplete,
    suggestedNextTopic,
    error,
    sendMessage,
    confirmInferences,
    resetSession,
    startDiagnostic,
  } = useDiagnosticChat();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Start diagnostic if not already started
  useEffect(() => {
    if (messages.length === 0) {
      startDiagnostic(subject);
    }
  }, [subject, messages.length, startDiagnostic]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleConfirm = async () => {
    const success = await confirmInferences();
    if (success) {
      setShowConfirmation(true);
      setTimeout(() => {
        if (suggestedNextTopic && suggestedNextTopic !== subject) {
          // Could prompt to continue with next topic
        }
        onClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    resetSession();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${SUBJECT_COLOR[subject]} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{SUBJECT_EMOJI[subject]}</span>
              <div>
                <Heading level={3} size="xs" className="text-white capitalize">
                  Diagnóstico: {subject}
                </Heading>
                <Text size="xs" className="text-white/80">
                  Cuéntame qué sabes de este tema
                </Text>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
                }`}
              >
                {message.role === 'assistant' ? (
                  <MarkdownViewer content={message.content} />
                ) : (
                  <Text size="sm">{message.content}</Text>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  <Text size="sm" variant="secondary">Pensando...</Text>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl px-4 py-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <Text size="sm">{error}</Text>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Inferences Panel */}
        {inferences.length > 0 && (
          <DiagnosticProgress
            inferences={inferences}
            isComplete={isComplete}
          />
        )}

        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 border-t border-green-200 dark:border-green-800">
            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
              <Check className="w-5 h-5" />
              <Text size="sm" className="font-medium">
                ¡Conocimiento actualizado! Tu perfil de aprendizaje ha sido guardado.
              </Text>
            </div>
          </div>
        )}

        {/* Input Area */}
        {!isComplete && !showConfirmation && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Cuéntame qué temas dominas..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="p-3 rounded-xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Complete Actions */}
        {isComplete && !showConfirmation && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-col gap-3">
              <Text size="sm" variant="secondary" className="text-center">
                Revisa las inferencias arriba y confirma para guardar tu perfil de conocimiento.
              </Text>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="secondary"
                  onClick={() => {
                    resetSession();
                    startDiagnostic(subject);
                  }}
                >
                  Reiniciar
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  Confirmar y Guardar
                </Button>
              </div>
              {suggestedNextTopic && suggestedNextTopic !== subject && (
                <Text size="xs" variant="secondary" className="text-center">
                  Siguiente sugerencia: {SUBJECT_EMOJI[suggestedNextTopic]} {suggestedNextTopic}
                </Text>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
