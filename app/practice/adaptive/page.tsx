'use client';

import { useState } from 'react';
import Link from 'next/link';
import 'katex/dist/katex.min.css';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { UnifiedLatexRenderer } from '@/components/math/MathDisplay';
import { useAdaptivePractice } from '@/hooks/useAdaptivePractice';
import { SkillSelector } from '@/components/practice/SkillSelector';
import { ScaffoldingTimeline } from '@/components/practice/ScaffoldingTimeline';
import { SubsectionSelector } from '@/components/practice/SubsectionSelector';
import { PracticeHeader } from '@/components/practice/PracticeHeader';
import { TutorDrawerContent } from '@/components/practice/TutorDrawerContent';
import { Drawer } from '@/components/ui';
import type { Question, Subject } from '@/lib/types/core';

// ============================================================================
// Types
// ============================================================================

interface Topic {
  id: string;
  name: string;
  type: 'subject' | 'unit';
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
  números: '🔢',
  álgebra: '📐',
  geometría: '📏',
  probabilidad: '🎲',
  surprise: '🎁',
};

const TOPIC_COLORS: Record<string, string> = {
  números: 'from-blue-500 to-cyan-500',
  álgebra: 'from-purple-500 to-pink-500',
  geometría: 'from-green-500 to-teal-500',
  probabilidad: 'from-orange-500 to-yellow-500',
  surprise: 'from-gray-500 to-gray-600',
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
    `}
    >
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
    <div className="mb-4 p-3 bg-[#FF9F0A]/10 rounded-xl border border-[#FF9F0A]/20">
      <div className="flex items-center gap-2">
        <span className="text-xl">💡</span>
        <span className="text-[#FF9F0A] font-medium">
          {currentSkill
            ? `Practicando: ${currentSkill.name}`
            : `Pregunta de refuerzo ${depth > 1 ? `(nivel ${depth} de ${maxDepth})` : ''}`}
        </span>
      </div>
      <p className="text-black/60 dark:text-white/60 text-sm mt-1">
        {currentSkill
          ? `Habilidad ${currentSkill.difficulty}`
          : depth === 1
            ? 'Esta pregunta te ayudará a consolidar conceptos base.'
            : depth === 2
              ? 'Vamos a un concepto más fundamental.'
              : 'Practiquemos lo más básico primero.'}
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
  scaffoldingMode,
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
  scaffoldingMode: 'none' | 'active' | 'skill-based';
}) {
  const questionContent = problem.questionLatex;
  const options = problem.options;

  return (
    <div
      data-testid="problem-display"
      className={`bg-white dark:bg-[#1C1C1C] rounded-2xl p-6 border ${
        isScaffolding
          ? 'border-[#FF9F0A]/30 ring-2 ring-[#FF9F0A]/10'
          : 'border-black/[0.08] dark:border-white/[0.08]'
      } shadow-[0_8px_24px_rgba(0,0,0,0.08)]`}
    >
      {/* Scaffolding Banner */}
      {isScaffolding && (
        <ScaffoldingBanner
          depth={scaffoldingDepth}
          maxDepth={maxScaffoldingDepth}
          currentSkill={currentSkill}
        />
      )}

      {/* Question */}
      <div className="mb-6" data-testid="problem-question">
        <div className="text-lg text-black dark:text-white leading-relaxed">
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
          const isCorrectAnswer = feedback && !feedback.correct && problem.correctAnswer === index;

          return (
            <button
              key={index}
              data-testid={`option-${letter}`}
              onClick={() => !feedback && onSelectAnswer(index)}
              disabled={!!feedback}
              className={`
                w-full p-4 rounded-xl text-left transition-all
                flex items-start gap-3
                ${isCorrect ? 'bg-[#34C759]/10 border-2 border-[#34C759]' : ''}
                ${isWrong ? 'bg-[#FF453A]/10 border-2 border-[#FF453A]' : ''}
                ${isCorrectAnswer ? 'bg-[#34C759]/10 border-2 border-[#34C759]' : ''}
                ${isSelected && !feedback ? 'bg-[#0A84FF]/10 border-2 border-[#0A84FF]' : ''}
                ${!isSelected && !feedback && !isCorrectAnswer ? 'bg-black/[0.02] dark:bg-white/[0.04] border-2 border-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:border-black/[0.08] dark:hover:border-white/[0.08]' : ''}
                ${feedback ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <span
                className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm
                ${isCorrect || isCorrectAnswer ? 'bg-[#34C759] text-white' : ''}
                ${isWrong ? 'bg-[#FF453A] text-white' : ''}
                ${isSelected && !feedback ? 'bg-[#0A84FF] text-white' : ''}
                ${!isSelected && !feedback && !isCorrect && !isWrong && !isCorrectAnswer ? 'bg-black/[0.06] dark:bg-white/[0.1] text-black/60 dark:text-white/60' : ''}
              `}
              >
                {letter}
              </span>
              <span className="text-black dark:text-white flex-1 pt-1">
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
          className="w-full py-3 rounded-xl bg-[#0A84FF] text-white font-semibold hover:bg-[#0A84FF]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Verificar Respuesta
        </button>
      ) : (
        <div data-testid="feedback-section">
          <div
            data-testid={feedback.correct ? 'feedback-correct' : 'feedback-incorrect'}
            className={`p-4 rounded-xl mb-4 ${
              feedback.correct ? 'bg-[#34C759]/10' : 'bg-[#FF453A]/10'
            }`}
          >
            <p
              className={`font-bold ${
                feedback.correct ? 'text-[#34C759]' : 'text-[#FF453A]'
              }`}
            >
              {feedback.correct ? '¡Correcto!' : 'Incorrecto'}
            </p>
            <p className="text-black/70 dark:text-white/70 text-sm mt-1">
              {feedback.message}
            </p>
            {showExplanation && feedback.explanation && (
              <div
                className="mt-3 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]"
                data-testid="explanation"
              >
                <p className="text-black/50 dark:text-white/50 text-xs mb-1">
                  Explicación:
                </p>
                <div className="text-black/80 dark:text-white/80 text-sm">
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
              className="w-full py-3 rounded-xl bg-[#FF9F0A]/10 text-[#FF9F0A] font-semibold hover:bg-[#FF9F0A]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mb-3 border border-[#FF9F0A]/20"
            >
              {isDecomposingSkills ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#FF9F0A]/30 border-t-[#FF9F0A] rounded-full animate-spin" />
                  <span>Analizando pregunta...</span>
                </>
              ) : isGeneratingScaffolding ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#FF9F0A]/30 border-t-[#FF9F0A] rounded-full animate-spin" />
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
            className="w-full py-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] text-black dark:text-white font-semibold hover:bg-black/[0.08] dark:hover:bg-white/[0.1] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isGeneratingScaffolding || isDecomposingSkills ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin" />
                <span>Procesando...</span>
              </span>
            ) : isScaffolding && feedback.correct ? (
              scaffoldingMode === 'skill-based'
                ? 'Siguiente pregunta →'
                : scaffoldingDepth === 1
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
    <div
      data-testid="analyzing-skills-loader"
      className="bg-white dark:bg-[#1C1C1C] rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center border border-black/[0.08] dark:border-white/[0.08]"
    >
      <div className="w-16 h-16 mx-auto mb-4 relative">
        <div className="absolute inset-0 border-4 border-[#0A84FF]/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-[#0A84FF] rounded-full border-t-transparent animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-black dark:text-white mb-2">
        Analizando tu respuesta
      </h2>
      <p className="text-black/60 dark:text-white/60">
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
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

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
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black/10 dark:border-white/10 border-t-[#0A84FF] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-black dark:text-white">Cargando problema...</p>
        </div>
      </div>
    );
  }

  // Analyzing skills state
  if (practice.state === 'analyzing-skills') {
    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-black py-8 px-4 flex items-center justify-center">
        <AnalyzingSkillsLoader />
      </div>
    );
  }

  // Skill selection state
  if (practice.state === 'selecting-skills') {
    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-black py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={practice.changeTopic}
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-sm font-semibold"
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
        <div className="min-h-screen bg-[#F7F7F7] dark:bg-black py-8 px-4">
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
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-black py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] inline-block text-sm font-semibold"
            >
              ← Volver al Inicio
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-3">
              Práctica Adaptativa
            </h1>
            <p className="text-black/60 dark:text-white/60">
              Elige un tema y practica con ayuda de un tutor AI
            </p>
          </div>

          {practice.error && (
            <div className="mb-6 p-4 bg-[#FF453A]/10 border border-[#FF453A]/30 rounded-xl text-[#FF453A] text-center">
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
  const currentSkill =
    isInSkillBasedMode && practice.selectedSkills[practice.currentSkillIndex]
      ? {
          name: practice.selectedSkills[practice.currentSkillIndex].name,
          difficulty: practice.selectedSkills[practice.currentSkillIndex].difficulty,
        }
      : undefined;

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-black">
      {/* Header */}
      <PracticeHeader
        selectedFocus={practice.selectedFocus}
        currentSubsectionCode={practice.currentSubsectionCode}
        onChangeTopic={practice.changeTopic}
        onOpenTutor={() => setIsTutorOpen(true)}
        onOpenTimeline={() => setIsTimelineOpen(true)}
        selectedSkills={practice.selectedSkills}
        currentSkillIndex={practice.currentSkillIndex}
        scaffoldingMode={practice.scaffoldingMode}
        tutorHasMessages={practice.tutorMessages.length > 0}
      />

      {/* Main content - centered */}
      <main className="max-w-3xl mx-auto px-4 py-6">
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
            scaffoldingMode={practice.scaffoldingMode}
          />
        )}
      </main>

      {/* Tutor AI Drawer (right) */}
      <Drawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        side="right"
        title="Tutor AI"
        width="md"
      >
        <TutorDrawerContent
          messages={practice.tutorMessages}
          onSendMessage={practice.sendChatMessage}
          isLoading={practice.isTutorLoading}
        />
      </Drawer>

      {/* Timeline Drawer (left) */}
      <Drawer
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
        side="left"
        title="Ruta de aprendizaje"
        width="sm"
      >
        <div className="p-4">
          <ScaffoldingTimeline
            history={practice.scaffoldingHistory}
            currentSkillIndex={practice.currentSkillIndex}
            selectedSkills={practice.selectedSkills}
            onReviewEntry={practice.setReviewingEntry}
          />
        </div>
      </Drawer>
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
