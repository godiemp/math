'use client';

import { QuestionRenderer } from '@/components/quiz/QuestionRenderer';
import { ScaffoldingBanner } from './ScaffoldingBanner';
import type { Question } from '@/lib/types/core';

// ============================================================================
// Types
// ============================================================================

interface Feedback {
  correct: boolean;
  message: string;
  explanation?: string;
}

export interface AdaptiveProblemCardProps {
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
}

// ============================================================================
// Component
// ============================================================================

export function AdaptiveProblemCard({
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
}: AdaptiveProblemCardProps) {
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

      {/* Question + Options using shared QuestionRenderer */}
      <div data-testid="problem-question">
        <QuestionRenderer
          question={problem}
          mode={feedback ? 'with-explanation' : 'with-options'}
          selectedAnswer={selectedAnswer}
          showFeedback={!!feedback}
          onAnswerSelect={feedback ? undefined : onSelectAnswer}
          disabled={!!feedback}
          quizMode="adaptive"
        />
      </div>

      {/* Action Buttons */}
      <div className="mt-6">
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
            {/* Feedback message */}
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
    </div>
  );
}

AdaptiveProblemCard.displayName = 'AdaptiveProblemCard';
