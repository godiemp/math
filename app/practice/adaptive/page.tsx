'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { UnifiedLatexRenderer } from '@/components/math/MathDisplay';
import { useAdaptivePractice } from '@/hooks/useAdaptivePractice';
import { useChatInput } from '@/hooks/useChatInput';
import { SkillSelector } from '@/components/practice/SkillSelector';
import { ScaffoldingTimeline, ScaffoldingTimelineCompact } from '@/components/practice/ScaffoldingTimeline';
import { SubsectionSelector } from '@/components/practice/SubsectionSelector';
import type { Question, Subject } from '@/lib/types/core';

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

interface Feedback {
  correct: boolean;
  message: string;
  explanation?: string;
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
// Chat Markdown Renderer - for AI responses with LaTeX support
// ============================================================================

function ChatMarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm prose-invert max-w-none [&>p]:my-1 [&>p]:leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// ============================================================================
// Topic Card Component
// ============================================================================

function TopicCard({
  topic,
  onSelect,
  onShowSubsections,
}: {
  topic: { id: string; name: string };
  onSelect: (id: string) => void;
  onShowSubsections?: (id: string) => void;
}) {
  const emoji = TOPIC_EMOJIS[topic.id] || '📚';
  const gradient = TOPIC_COLORS[topic.id] || 'from-gray-500 to-gray-600';
  const showSubsectionButton = topic.id !== 'surprise' && onShowSubsections;

  return (
    <div
      data-testid={`topic-card-${topic.id}`}
      className={`
      relative overflow-hidden rounded-2xl
      bg-gradient-to-br ${gradient}
      text-white
      transition-all duration-300
      hover:shadow-2xl
    `}>
      <button
        data-testid={`topic-select-${topic.id}`}
        onClick={() => onSelect(topic.id)}
        className="w-full p-6 text-left transition-all hover:scale-[1.02] active:scale-95"
      >
        <div className="text-4xl mb-3">{emoji}</div>
        <h3 className="text-xl font-bold">{topic.name}</h3>
        <p className="text-sm text-white/70 mt-1">Practicar con AI</p>
      </button>

      {showSubsectionButton && (
        <button
          data-testid={`topic-subsections-${topic.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onShowSubsections(topic.id);
          }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/20 text-white/90 text-xs font-medium hover:bg-white/30 transition-colors"
        >
          Ver subsecciones
        </button>
      )}
    </div>
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
  const { input, setInput, handleSubmit, canSubmit } = useChatInput(onSendMessage, isLoading);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div data-testid="chat-panel" className="flex flex-col h-[500px] bg-white/10 rounded-xl border border-white/20">
      <div className="p-3 border-b border-white/20 flex-shrink-0">
        <h3 className="font-semibold text-white">Tutor AI</h3>
        <p className="text-xs text-white/60">Pregunta si necesitas ayuda</p>
      </div>

      <div data-testid="chat-messages" className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div data-testid="chat-empty-state" className="text-center text-white/50 text-sm py-4">
            Escribe tu pregunta o lo que has intentado
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            data-testid={`chat-message-${msg.role}`}
            className={`p-3 rounded-lg text-sm ${
              msg.role === 'user'
                ? 'bg-blue-500/30 ml-4'
                : 'bg-white/20 mr-4'
            }`}
          >
            <div className="text-white">
              {msg.role === 'user' ? (
                <span className="whitespace-pre-wrap">{msg.content}</span>
              ) : (
                <ChatMarkdownRenderer content={msg.content} />
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div data-testid="chat-loading" className="bg-white/20 mr-4 p-3 rounded-lg">
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
            data-testid="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40"
          />
          <button
            data-testid="chat-send"
            type="submit"
            disabled={!canSubmit}
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
// Scaffolding Banner Component
// ============================================================================

function ScaffoldingBanner({
  depth,
  maxDepth,
  currentSkill,
}: {
  depth: number;
  maxDepth: number;
  currentSkill?: { name: string; difficulty: string };
}) {
  return (
    <div className="mb-4 p-3 bg-amber-500/20 rounded-lg border border-amber-400/30">
      <div className="flex items-center gap-2">
        <span className="text-xl">💡</span>
        <span className="text-amber-200 font-medium">
          {currentSkill ? `Practicando: ${currentSkill.name}` : `Pregunta de refuerzo ${depth > 1 ? `(nivel ${depth} de ${maxDepth})` : ''}`}
        </span>
      </div>
      <p className="text-amber-200/70 text-sm mt-1">
        {currentSkill
          ? `Habilidad ${currentSkill.difficulty}`
          : depth === 1
            ? 'Esta pregunta te ayudara a consolidar conceptos base.'
            : depth === 2
              ? 'Vamos a un concepto mas fundamental.'
              : 'Practiquemos lo mas basico primero.'}
      </p>
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
  onProceedToScaffolding,
  feedback,
  showExplanation,
  isScaffolding,
  scaffoldingDepth,
  maxScaffoldingDepth,
  isGeneratingScaffolding,
  isDecomposingSkills,
  currentSkill,
}: {
  problem: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  onProceedToScaffolding: () => void;
  feedback: Feedback | null;
  showExplanation: boolean;
  isScaffolding: boolean;
  scaffoldingDepth: number;
  maxScaffoldingDepth: number;
  isGeneratingScaffolding: boolean;
  isDecomposingSkills: boolean;
  currentSkill?: { name: string; difficulty: string };
}) {
  const questionContent = problem.questionLatex;
  const options = problem.options;

  return (
    <div data-testid="problem-display" className={`bg-white/10 rounded-xl p-6 border ${isScaffolding ? 'border-amber-400/30' : 'border-white/20'}`}>
      {/* Scaffolding Banner */}
      {isScaffolding && (
        <ScaffoldingBanner depth={scaffoldingDepth} maxDepth={maxScaffoldingDepth} currentSkill={currentSkill} />
      )}

      {/* Question */}
      <div className="mb-6" data-testid="problem-question">
        <div className="text-lg text-white leading-relaxed">
          <UnifiedLatexRenderer content={questionContent} />
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6" data-testid="problem-options">
        {options.map((option, index) => {
          const letter = String.fromCharCode(65 + index);
          const isSelected = selectedAnswer === index;
          const isCorrect = feedback?.correct && isSelected;
          const isWrong = feedback && !feedback.correct && isSelected;

          return (
            <button
              key={index}
              data-testid={`option-${letter}`}
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
          data-testid="submit-answer"
          onClick={onSubmit}
          disabled={selectedAnswer === null}
          className="w-full py-3 rounded-xl bg-white/20 text-white font-bold hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Verificar Respuesta
        </button>
      ) : (
        <div data-testid="feedback-section">
          <div data-testid={feedback.correct ? 'feedback-correct' : 'feedback-incorrect'} className={`p-4 rounded-xl mb-4 ${feedback.correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <p className={`font-bold ${feedback.correct ? 'text-green-300' : 'text-red-300'}`}>
              {feedback.correct ? '¡Correcto!' : 'Incorrecto'}
            </p>
            <p className="text-white/80 text-sm mt-1">{feedback.message}</p>
            {showExplanation && feedback.explanation && (
              <div className="mt-3 pt-3 border-t border-white/20" data-testid="explanation">
                <p className="text-white/60 text-xs mb-1">Explicacion:</p>
                <div className="text-white/80 text-sm">
                  <UnifiedLatexRenderer content={feedback.explanation} />
                </div>
              </div>
            )}
          </div>

          {/* Scaffolding button - show when incorrect and not at max depth */}
          {!feedback.correct && scaffoldingDepth < maxScaffoldingDepth && (
            <button
              data-testid="need-help-button"
              onClick={onProceedToScaffolding}
              disabled={isGeneratingScaffolding || isDecomposingSkills}
              className="w-full py-3 rounded-xl bg-amber-500/20 text-amber-200 font-bold hover:bg-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mb-3"
            >
              {isDecomposingSkills ? (
                <>
                  <span className="w-4 h-4 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  <span>Analizando pregunta...</span>
                </>
              ) : isGeneratingScaffolding ? (
                <>
                  <span className="w-4 h-4 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  <span>Generando pregunta de refuerzo...</span>
                </>
              ) : (
                <>
                  <span>💡</span>
                  <span>Necesito ayuda con esta pregunta</span>
                </>
              )}
            </button>
          )}

          <button
            data-testid="next-problem"
            onClick={onNext}
            disabled={isGeneratingScaffolding || isDecomposingSkills}
            className="w-full py-3 rounded-xl bg-white/20 text-white font-bold hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isGeneratingScaffolding || isDecomposingSkills ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Procesando...</span>
              </span>
            ) : isScaffolding && feedback.correct ? (
              scaffoldingDepth === 1
                ? 'Volver a pregunta similar →'
                : 'Siguiente habilidad →'
            ) : (
              'Siguiente Problema →'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Analyzing Skills Loading Component
// ============================================================================

function AnalyzingSkillsLoader() {
  return (
    <div data-testid="analyzing-skills-loader" className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
      <div className="w-16 h-16 mx-auto mb-4 relative">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Analizando tu respuesta</h2>
      <p className="text-gray-600">
        Identificando las habilidades que necesitas practicar...
      </p>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

function AdaptivePracticeContent() {
  const practice = useAdaptivePractice();
  const [showSubsectionSelector, setShowSubsectionSelector] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleShowSubsections = (topicId: string) => {
    setSelectedSubject(topicId as Subject);
    setShowSubsectionSelector(true);
  };

  const handleSubsectionSelect = (subsectionCode: string, skills: string[]) => {
    setShowSubsectionSelector(false);
    setSelectedSubject(null);
    practice.startPractice({
      focus: selectedSubject!,
      subsectionCode,
      subsectionSkills: skills,
    });
  };

  const handleCancelSubsectionSelector = () => {
    setShowSubsectionSelector(false);
    setSelectedSubject(null);
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

  // Analyzing skills state
  if (practice.state === 'analyzing-skills') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-8 px-4 flex items-center justify-center">
        <AnalyzingSkillsLoader />
      </div>
    );
  }

  // Skill selection state
  if (practice.state === 'selecting-skills') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={practice.changeTopic}
              className="text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10 text-sm font-semibold"
            >
              ← Volver al inicio
            </button>
          </div>

          <SkillSelector
            skills={practice.decomposedSkills}
            onSelectSkills={practice.startSkillBasedScaffolding}
            onSkip={practice.skipSkillSelection}
            isLoading={practice.isGeneratingScaffolding}
          />
        </div>
      </div>
    );
  }

  // Topic selection
  if (practice.state === 'selecting') {
    // Show subsection selector if active
    if (showSubsectionSelector && selectedSubject) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <SubsectionSelector
              subject={selectedSubject}
              level="M1"
              onSelectSubsection={handleSubsectionSelect}
              onCancel={handleCancelSubsectionSelector}
            />
          </div>
        </div>
      );
    }

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
              <TopicCard
                key={topic.id}
                topic={topic}
                onSelect={practice.startPractice}
                onShowSubsections={handleShowSubsections}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Practice mode
  const isInSkillBasedMode = practice.scaffoldingMode === 'skill-based';
  const currentSkill = isInSkillBasedMode && practice.selectedSkills[practice.currentSkillIndex]
    ? {
        name: practice.selectedSkills[practice.currentSkillIndex].name,
        difficulty: practice.selectedSkills[practice.currentSkillIndex].difficulty,
      }
    : undefined;

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
            {practice.currentSubsectionCode && (
              <span className="text-white/60 text-sm ml-2">
                ({practice.currentSubsectionCode})
              </span>
            )}
          </div>
        </div>

        {/* Skill-based timeline (mobile - compact) */}
        {isInSkillBasedMode && (
          <div className="lg:hidden">
            <ScaffoldingTimelineCompact
              selectedSkills={practice.selectedSkills}
              currentSkillIndex={practice.currentSkillIndex}
            />
          </div>
        )}

        {/* Main content */}
        <div className={`grid gap-6 ${isInSkillBasedMode ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1 lg:grid-cols-3'}`}>
          {/* Timeline sidebar (desktop) - only in skill-based mode */}
          {isInSkillBasedMode && (
            <div className="hidden lg:block lg:col-span-1">
              <ScaffoldingTimeline
                history={practice.scaffoldingHistory}
                currentSkillIndex={practice.currentSkillIndex}
                selectedSkills={practice.selectedSkills}
                onReviewEntry={practice.setReviewingEntry}
              />
            </div>
          )}

          {/* Problem area */}
          <div className={isInSkillBasedMode ? 'lg:col-span-2' : 'lg:col-span-2'}>
            {practice.currentProblem && (
              <ProblemDisplay
                problem={practice.currentProblem}
                selectedAnswer={practice.selectedAnswer}
                onSelectAnswer={practice.setSelectedAnswer}
                onSubmit={practice.submitAnswer}
                onNext={practice.nextProblem}
                onProceedToScaffolding={practice.proceedToScaffolding}
                feedback={practice.feedback}
                showExplanation={!practice.feedback?.correct}
                isScaffolding={practice.scaffoldingMode !== 'none'}
                scaffoldingDepth={practice.scaffoldingDepth}
                maxScaffoldingDepth={practice.maxScaffoldingDepth}
                isGeneratingScaffolding={practice.isGeneratingScaffolding}
                isDecomposingSkills={practice.isDecomposingSkills}
                currentSkill={currentSkill}
              />
            )}
          </div>

          {/* Chat area */}
          <div className="lg:col-span-1">
            <ChatPanel
              messages={practice.tutorMessages}
              onSendMessage={practice.sendChatMessage}
              isLoading={practice.isTutorLoading}
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
