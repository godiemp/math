'use client';

import type { Question, QuestionRendererProps } from '@/lib/types';
import { MathText, BlockMath, InlineMath, SmartLatexRenderer } from './MathDisplay';
import { GeometryCanvas, GeometryFigure } from './GeometryCanvas';

// Re-export for convenience
export type { QuestionRendererProps };

/**
 * Centralized component for rendering math problems with support for:
 * - LaTeX math rendering (question, options, explanations)
 * - Geometry visualizations
 * - Different display modes (question-only, with-options, with-explanation, full)
 * - Interactive answer selection
 * - Feedback display (correct/incorrect highlighting)
 */
export function QuestionRenderer({
  question,
  mode = 'with-options',
  selectedAnswer = null,
  showFeedback = false,
  onAnswerSelect,
  disabled = false,
  compact = false,
  quizMode = undefined,
  onRequestAIHelp,
}: QuestionRendererProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isZenMode = quizMode === 'zen';

  return (
    <div className={compact ? 'space-y-2' : 'space-y-4'}>
      {/* Question Text */}
      <div className={compact ? 'text-base' : 'text-xl font-semibold text-gray-900 dark:text-white'}>
        {question.questionLatex ? (
          <SmartLatexRenderer latex={question.questionLatex} displayMode={false} />
        ) : (
          <MathText content={question.question} />
        )}
      </div>

      {/* Visual Data (Geometry/Graphs) */}
      {question.visualData && question.visualData.type === 'geometry' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <GeometryCanvas
            figures={question.visualData.data as GeometryFigure[]}
            width={compact ? 300 : 400}
            height={compact ? 225 : 300}
          />
        </div>
      )}

      {/* Options */}
      {(mode === 'with-options' || mode === 'full') && (
        <div className={compact ? 'grid grid-cols-2 gap-2' : 'grid grid-cols-2 gap-3'}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctAnswer;

            let buttonClass = `w-full text-left ${compact ? 'p-2 text-sm' : 'p-4'} rounded-lg border-2 transition-all flex items-start gap-2 `;

            if (showFeedback) {
              if (isCorrectAnswer) {
                buttonClass += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100';
              } else if (isSelected && !isCorrectAnswer) {
                // Zen mode uses softer amber/orange colors instead of harsh red
                if (isZenMode) {
                  buttonClass += 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100';
                } else {
                  buttonClass += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100';
                }
              } else {
                buttonClass += 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300';
              }
            } else {
              if (isSelected) {
                buttonClass += 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100';
              } else {
                buttonClass += 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-gray-700 dark:text-gray-300';
              }
            }

            return (
              <button
                key={index}
                onClick={() => onAnswerSelect && onAnswerSelect(index)}
                disabled={disabled}
                className={buttonClass}
              >
                <span className="font-semibold shrink-0">{String.fromCharCode(65 + index)}.</span>
                <span className="flex-1 min-w-0 break-words">
                  {question.optionsLatex && question.optionsLatex[index] ? (
                    <SmartLatexRenderer latex={question.optionsLatex[index]} displayMode={false} />
                  ) : (
                    <MathText content={option} />
                  )}
                </span>
                {showFeedback && isCorrectAnswer && <span className="shrink-0 ml-auto">✓</span>}
                {showFeedback && isSelected && !isCorrectAnswer && <span className="shrink-0 ml-auto">✗</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Explanation (with feedback) */}
      {(mode === 'with-explanation' || mode === 'full') && showFeedback && (
        <div
          className={`border-l-4 ${compact ? 'p-2 text-sm' : 'p-4'} ${
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
              : isZenMode
              ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-400'
              : 'bg-red-50 dark:bg-red-900/20 border-red-500'
          }`}
        >
          <h4
            className={`font-semibold ${compact ? 'text-sm mb-1' : 'mb-2'} ${
              isCorrect
                ? 'text-green-900 dark:text-green-100'
                : isZenMode
                ? 'text-amber-900 dark:text-amber-100'
                : 'text-red-900 dark:text-red-100'
            }`}
          >
            {selectedAnswer === null
              ? (isZenMode ? 'Sin responder - tómate tu tiempo 🌱' : 'No respondida')
              : isCorrect
              ? (isZenMode ? '¡Excelente razonamiento! 🌸' : '¡Correcto!')
              : (isZenMode ? 'Cada error es aprendizaje 🌿' : 'Incorrecto')}
          </h4>
          <div
            className={`${
              isCorrect
                ? 'text-green-800 dark:text-green-200'
                : isZenMode
                ? 'text-amber-800 dark:text-amber-200'
                : 'text-red-800 dark:text-red-200'
            }`}
          >
            <p className={`font-semibold ${compact ? 'mb-0.5 text-xs' : 'mb-1'}`}>Explicación:</p>
            <MathText content={question.explanation} />
            {question.explanationLatex && (
              <div className={compact ? 'mt-1' : 'mt-2'}>
                <SmartLatexRenderer latex={question.explanationLatex} displayMode={false} />
              </div>
            )}
          </div>

          {/* AI Help Button - Always available in zen mode after quiz submission */}
          {isZenMode && showFeedback && onRequestAIHelp && (
            <div className="mt-4 pt-4 border-t border-teal-300 dark:border-teal-700">
              <button
                onClick={onRequestAIHelp}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>Conversar con tu tutor IA</span>
              </button>
              <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
                Pregunta lo que quieras sobre esta pregunta
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Compact question preview component for displaying questions in lists/tables
 */
export function QuestionPreview({ question, maxLength = 100 }: { question: Question; maxLength?: number }) {
  // Extract plain text from question for preview
  const getQuestionText = () => {
    if (question.questionLatex) {
      // For LaTeX, just show a truncated version
      return question.questionLatex.length > maxLength
        ? question.questionLatex.substring(0, maxLength) + '...'
        : question.questionLatex;
    }
    return question.question.length > maxLength
      ? question.question.substring(0, maxLength) + '...'
      : question.question;
  };

  return (
    <div className="text-sm text-gray-700 dark:text-gray-300">
      {question.questionLatex ? (
        <MathText content={getQuestionText()} />
      ) : (
        <span>{getQuestionText()}</span>
      )}
    </div>
  );
}
