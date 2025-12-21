'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { UnifiedLatexRenderer } from '@/components/math/MathDisplay';
import { usePracticeSession } from '@/hooks/usePracticeSession';
import { useAITutor } from '@/hooks/useAITutor';
import type { Question } from '@/lib/types/core';

// ============================================================================
// Types
// ============================================================================

interface Topic {
  id: string;
  name: string;
  type: 'subject' | 'unit';
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ============================================================================
// Constants
// ============================================================================

const TOPIC_EMOJIS: Record<string, string> = {
  'números': '🔢',
  'álgebra': '📐',
  'geometría': '📏',
  'probabilidad': '🎲',
  'surprise': '🎁',
};

const TOPIC_COLORS: Record<string, string> = {
  'números': 'from-blue-500 to-cyan-500',
  'álgebra': 'from-purple-500 to-pink-500',
  'geometría': 'from-green-500 to-teal-500',
  'probabilidad': 'from-orange-500 to-yellow-500',
  'surprise': 'from-gray-500 to-gray-600',
};

const DEFAULT_TOPICS: Topic[] = [
  { id: 'números', name: 'Números', type: 'subject' },
  { id: 'álgebra', name: 'Álgebra y Funciones', type: 'subject' },
  { id: 'geometría', name: 'Geometría', type: 'subject' },
  { id: 'probabilidad', name: 'Probabilidades y Estadística', type: 'subject' },
  { id: 'surprise', name: 'Sorpréndeme', type: 'subject' },
];

// ============================================================================
// Topic Card Component
// ============================================================================

function TopicCard({
  topic,
  onSelect,
}: {
  topic: { id: string; name: string };
  onSelect: (id: string) => void;
}) {
  const emoji = TOPIC_EMOJIS[topic.id] || '📚';
  const gradient = TOPIC_COLORS[topic.id] || 'from-gray-500 to-gray-600';

  return (
    <button
      onClick={() => onSelect(topic.id)}
      className={`
        relative overflow-hidden p-6 rounded-2xl
        bg-gradient-to-br ${gradient}
        text-white text-left
        transition-all duration-300
        hover:scale-105 hover:shadow-2xl
        active:scale-95
      `}
    >
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-xl font-bold">{topic.name}</h3>
      <p className="text-sm text-white/70 mt-1">Practicar con AI</p>
    </button>
  );
}

// ============================================================================
// Chat Component
// ============================================================================

function ChatPanel({
  messages,
  onSendMessage,
  isLoading,
}: {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white/10 rounded-xl border border-white/20">
      <div className="p-3 border-b border-white/20 flex-shrink-0">
        <h3 className="font-semibold text-white">Tutor AI</h3>
        <p className="text-xs text-white/60">Pregunta si necesitas ayuda</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-white/50 text-sm py-4">
            Escribe tu pregunta o lo que has intentado
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg text-sm ${
              msg.role === 'user'
                ? 'bg-blue-500/30 ml-4'
                : 'bg-white/20 mr-4'
            }`}
          >
            <div className="text-white">
              <UnifiedLatexRenderer content={msg.content} />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="bg-white/20 mr-4 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-white/20 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 rounded-lg bg-white/20 text-white font-medium hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// Problem Display Component
// ============================================================================

function ProblemDisplay({
  problem,
  selectedAnswer,
  onSelectAnswer,
  onSubmit,
  onNext,
  feedback,
  showExplanation,
}: {
  problem: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  feedback: { correct: boolean; message: string; explanation?: string } | null;
  showExplanation: boolean;
}) {
  const questionContent = problem.questionLatex;
  const options = problem.options;

  return (
    <div className="bg-white/10 rounded-xl p-6 border border-white/20">
      {/* Question */}
      <div className="mb-6">
        <div className="text-lg text-white leading-relaxed">
          <UnifiedLatexRenderer content={questionContent} />
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option, index) => {
          const letter = String.fromCharCode(65 + index);
          const isSelected = selectedAnswer === index;
          const isCorrect = feedback?.correct && isSelected;
          const isWrong = feedback && !feedback.correct && isSelected;

          return (
            <button
              key={index}
              onClick={() => !feedback && onSelectAnswer(index)}
              disabled={!!feedback}
              className={`
                w-full p-4 rounded-xl text-left transition-all
                flex items-start gap-3
                ${isCorrect ? 'bg-green-500/30 border-2 border-green-400' : ''}
                ${isWrong ? 'bg-red-500/30 border-2 border-red-400' : ''}
                ${isSelected && !feedback ? 'bg-white/30 border-2 border-white/60' : ''}
                ${!isSelected && !feedback ? 'bg-white/10 border-2 border-transparent hover:bg-white/20 hover:border-white/30' : ''}
                ${feedback ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <span className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold
                ${isSelected ? 'bg-white text-gray-900' : 'bg-white/20 text-white'}
              `}>
                {letter}
              </span>
              <span className="text-white flex-1 pt-1">
                <UnifiedLatexRenderer content={option} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Submit / Feedback */}
      {!feedback ? (
        <button
          onClick={onSubmit}
          disabled={selectedAnswer === null}
          className="w-full py-3 rounded-xl bg-white/20 text-white font-bold hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Verificar Respuesta
        </button>
      ) : (
        <div>
          <div className={`p-4 rounded-xl mb-4 ${feedback.correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <p className={`font-bold ${feedback.correct ? 'text-green-300' : 'text-red-300'}`}>
              {feedback.correct ? '¡Correcto!' : 'Incorrecto'}
            </p>
            <p className="text-white/80 text-sm mt-1">{feedback.message}</p>
            {showExplanation && feedback.explanation && (
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-white/60 text-xs mb-1">Explicación:</p>
                <div className="text-white/80 text-sm">
                  <UnifiedLatexRenderer content={feedback.explanation} />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onNext}
            className="w-full py-3 rounded-xl bg-white/20 text-white font-bold hover:bg-white/30 transition-all"
          >
            Siguiente Problema →
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

function AdaptivePracticeContent() {
  const practice = usePracticeSession();
  const tutor = useAITutor();

  const handleStartPractice = (focus: string) => {
    tutor.clearMessages();
    practice.startPractice(focus);
  };

  const handleSubmitAnswer = () => {
    practice.submitAnswer(tutor.hasMessages);
  };

  const handleNextProblem = () => {
    tutor.clearMessages();
    practice.nextProblem();
  };

  const handleSendChatMessage = (message: string) => {
    if (practice.currentProblem) {
      tutor.sendMessage(message, practice.currentProblem);
    }
  };

  // Loading state
  if (practice.state === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg">Cargando problema...</p>
        </div>
      </div>
    );
  }

  // Topic selection
  if (practice.state === 'selecting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10 inline-block text-sm font-semibold"
            >
              ← Volver al Inicio
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-3">Práctica Adaptativa</h1>
            <p className="text-white/70">
              Elige un tema y practica con ayuda de un tutor AI
            </p>
          </div>

          {practice.error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl text-red-200 text-center">
              {practice.error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEFAULT_TOPICS.map((topic) => (
              <TopicCard key={topic.id} topic={topic} onSelect={handleStartPractice} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Practice mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={practice.changeTopic}
            className="text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10 text-sm font-semibold"
          >
            ← Cambiar tema
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{TOPIC_EMOJIS[practice.selectedFocus] || '📚'}</span>
            <span className="text-white font-medium capitalize">
              {practice.selectedFocus === 'surprise' ? 'Sorpresa' : practice.selectedFocus}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problem area - 2 columns */}
          <div className="lg:col-span-2">
            {practice.currentProblem && (
              <ProblemDisplay
                problem={practice.currentProblem}
                selectedAnswer={practice.selectedAnswer}
                onSelectAnswer={practice.setSelectedAnswer}
                onSubmit={handleSubmitAnswer}
                onNext={handleNextProblem}
                feedback={practice.feedback}
                showExplanation={!practice.feedback?.correct}
              />
            )}
          </div>

          {/* Chat area - 1 column */}
          <div className="lg:col-span-1">
            <ChatPanel
              messages={tutor.messages}
              onSendMessage={handleSendChatMessage}
              isLoading={tutor.isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdaptivePracticePage() {
  return (
    <ProtectedRoute>
      <AdaptivePracticeContent />
    </ProtectedRoute>
  );
}
