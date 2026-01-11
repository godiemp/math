'use client';

import type { Question, QuestionRendererProps } from '@/lib/types';
import { MathText, BlockMath, InlineMath, SmartLatexRenderer, UnifiedLatexRenderer } from '@/components/math/MathDisplay';
import { GeometryCanvas, GeometryFigure } from '@/components/math/GeometryCanvas';
import BarChart from '@/components/lessons/shared/BarChart';
import PieChart from '@/components/lessons/shared/PieChart';
import Histogram from '@/components/lessons/shared/Histogram';
import LineChart from '@/components/lessons/shared/LineChart';
import ScatterPlot from '@/components/lessons/shared/ScatterPlot';
import FrequencyTable from '@/components/lessons/shared/FrequencyTable';
import VennDiagram from '@/components/lessons/shared/VennDiagram';

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
  const isAdaptiveMode = quizMode === 'adaptive';

  return (
    <div className={compact ? 'space-y-2' : 'space-y-4'}>
      {/* Question Text */}
      <div className={compact ? 'text-base' : `text-xl font-semibold ${isAdaptiveMode ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        <SmartLatexRenderer latex={question.questionLatex} displayMode={false} />
      </div>

      {/* Visual Data (Geometry/Graphs/Tables/Diagrams) */}
      {question.visualData && question.visualData.type === 'geometry' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <GeometryCanvas
            figures={question.visualData.data as GeometryFigure[]}
            width={compact ? 300 : 400}
            height={compact ? 225 : 300}
          />
        </div>
      )}

      {/* Bar Chart */}
      {question.visualData?.type === 'graph' && question.visualData.data?.chartType === 'bar' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <BarChart
            data={question.visualData.data.items}
            showValues={question.visualData.data.showValues ?? true}
            showLabels={question.visualData.data.showLabels ?? true}
            height={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Pie Chart */}
      {question.visualData?.type === 'graph' && question.visualData.data?.chartType === 'pie' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <PieChart
            data={question.visualData.data.items}
            showLegend={question.visualData.data.showLegend ?? true}
            showValues={question.visualData.data.showValues ?? false}
            showPercentages={question.visualData.data.showPercentages ?? true}
            size={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Histogram */}
      {question.visualData?.type === 'graph' && question.visualData.data?.chartType === 'histogram' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <Histogram
            data={question.visualData.data.items}
            showFrequencies={question.visualData.data.showFrequencies ?? true}
            showIntervals={question.visualData.data.showIntervals ?? true}
            height={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Line Chart */}
      {question.visualData?.type === 'graph' && question.visualData.data?.chartType === 'line' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <LineChart
            data={question.visualData.data.items}
            showValues={question.visualData.data.showValues ?? false}
            showLabels={question.visualData.data.showLabels ?? true}
            showYAxis={question.visualData.data.showYAxis ?? true}
            height={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Scatter Plot */}
      {question.visualData?.type === 'graph' && question.visualData.data?.chartType === 'scatter' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <ScatterPlot
            data={question.visualData.data.series ?? question.visualData.data.points}
            xLabel={question.visualData.data.xLabel}
            yLabel={question.visualData.data.yLabel}
            showGrid={question.visualData.data.showGrid ?? true}
            showTrendLine={question.visualData.data.showTrendLine ?? false}
            correlationType={question.visualData.data.correlationType}
            height={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Frequency Table */}
      {question.visualData?.type === 'table' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <FrequencyTable
            data={question.visualData.data.items}
            showTally={question.visualData.data.showTally ?? true}
            showRelative={question.visualData.data.showRelative ?? false}
            showPercentage={question.visualData.data.showPercentage ?? false}
          />
        </div>
      )}

      {/* Venn Diagram */}
      {question.visualData?.type === 'diagram' && question.visualData.data?.diagramType === 'venn' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <VennDiagram
            mode={question.visualData.data.mode ?? 'overlapping'}
            labelA={question.visualData.data.labelA}
            labelB={question.visualData.data.labelB}
            countA={question.visualData.data.countA}
            countB={question.visualData.data.countB}
            countBoth={question.visualData.data.countBoth}
            showCounts={question.visualData.data.showCounts ?? true}
            size={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Options */}
      {(mode === 'with-options' || mode === 'full') && (
        <div className={compact ? 'space-y-2' : 'space-y-3'}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctAnswer;

            let buttonClass = `w-full text-left ${compact ? 'p-2 text-sm' : 'p-4'} rounded-lg border-2 transition-all flex items-start gap-2 `;

            if (isAdaptiveMode) {
              // Adaptive mode uses semi-transparent white backgrounds for dark gradient bg
              if (showFeedback) {
                if (isCorrectAnswer) {
                  buttonClass += 'bg-green-500/30 border-green-400 text-white';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += 'bg-red-500/30 border-red-400 text-white';
                } else {
                  buttonClass += 'bg-white/10 border-transparent text-white/70';
                }
              } else {
                if (isSelected) {
                  buttonClass += 'bg-white/30 border-white/60 text-white';
                } else {
                  buttonClass += 'bg-white/10 border-transparent text-white hover:bg-white/20 hover:border-white/30';
                }
              }
            } else if (showFeedback) {
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
                  <UnifiedLatexRenderer content={option} displayMode={false} />
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
            isAdaptiveMode
              ? isCorrect
                ? 'bg-green-500/20 border-green-400'
                : 'bg-red-500/20 border-red-400'
              : isCorrect
                ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                : isZenMode
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-400'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-500'
          }`}
        >
          <h4
            className={`font-semibold ${compact ? 'text-sm mb-1' : 'mb-2'} ${
              isAdaptiveMode
                ? isCorrect
                  ? 'text-green-200'
                  : 'text-red-200'
                : isCorrect
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
              isAdaptiveMode
                ? isCorrect
                  ? 'text-green-200'
                  : 'text-red-200'
                : isCorrect
                  ? 'text-green-800 dark:text-green-200'
                  : isZenMode
                    ? 'text-amber-800 dark:text-amber-200'
                    : 'text-red-800 dark:text-red-200'
            }`}
          >
            <p className={`font-semibold ${compact ? 'mb-0.5 text-xs' : 'mb-1'}`}>Explicación:</p>
            <SmartLatexRenderer latex={question.explanation} displayMode={false} />
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
    return question.questionLatex.length > maxLength
      ? question.questionLatex.substring(0, maxLength) + '...'
      : question.questionLatex;
  };

  return (
    <div className="text-sm text-gray-700 dark:text-gray-300">
      <MathText content={getQuestionText()} />
    </div>
  );
}

// ============================================================================
// Composable Question Components
// ============================================================================

interface QuestionTextProps {
  question: Question;
  className?: string;
  size?: 'sm' | 'base' | 'lg';
}

/**
 * Renders the question text (enunciado) with LaTeX support
 */
export function QuestionText({ question, className = '', size = 'base' }: QuestionTextProps) {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg font-semibold',
  };

  return (
    <div className={`${sizeClasses[size]} text-gray-900 dark:text-white ${className}`}>
      <SmartLatexRenderer latex={question.questionLatex} displayMode={false} />
    </div>
  );
}

interface QuestionOptionsProps {
  question: Question;
  layout?: 'grid' | 'list';
  size?: 'sm' | 'base';
  showLabels?: boolean;
  highlightCorrect?: boolean;
  className?: string;
}

/**
 * Renders question options/alternatives with LaTeX support
 */
export function QuestionOptions({
  question,
  layout = 'list',
  size = 'base',
  showLabels = true,
  highlightCorrect = false,
  className = '',
}: QuestionOptionsProps) {
  const containerClass = layout === 'grid'
    ? 'grid grid-cols-2 gap-2'
    : 'space-y-2';

  const sizeClasses = {
    sm: 'text-sm p-2',
    base: 'text-base p-3',
  };

  return (
    <div className={`${containerClass} ${className}`}>
      {question.options.map((option, index) => {
        const isCorrectAnswer = index === question.correctAnswer;
        const optionClass = highlightCorrect && isCorrectAnswer
          ? 'bg-green-50 dark:bg-green-900/30 border-green-500'
          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';

        return (
          <div
            key={index}
            className={`${sizeClasses[size]} rounded border ${optionClass}`}
          >
            {showLabels && (
              <span className="font-semibold mr-1">
                {String.fromCharCode(65 + index)})
              </span>
            )}
            <UnifiedLatexRenderer
              content={option}
              displayMode={false}
            />
            {highlightCorrect && isCorrectAnswer && (
              <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">✓</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface QuestionOptionsWithFeedbackProps {
  question: Question;
  userAnswer: number | null;
  size?: 'sm' | 'base';
  className?: string;
}

/**
 * Renders question options with user answer and correct answer highlighting
 * Used in contexts like AI chat modal where we need to show what the user selected
 */
export function QuestionOptionsWithFeedback({
  question,
  userAnswer,
  size = 'sm',
  className = '',
}: QuestionOptionsWithFeedbackProps) {
  const sizeClasses = {
    sm: 'text-xs p-2',
    base: 'text-sm p-3',
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {question.options.map((option, index) => {
        const isUserAnswer = userAnswer === index;
        const isCorrectAnswer = index === question.correctAnswer;

        const optionClass = isCorrectAnswer
          ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-900 dark:text-green-100'
          : isUserAnswer
          ? 'bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-500 text-amber-900 dark:text-amber-100'
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300';

        return (
          <div
            key={index}
            className={`${sizeClasses[size]} rounded-lg flex items-start gap-2 ${optionClass}`}
          >
            <span className="font-bold shrink-0">{String.fromCharCode(65 + index)}.</span>
            <span className="flex-1">
              <UnifiedLatexRenderer
                content={option}
                displayMode={false}
              />
            </span>
            {isCorrectAnswer && <span className="shrink-0 font-bold">✓ Correcta</span>}
            {isUserAnswer && !isCorrectAnswer && <span className="shrink-0 font-bold">Tu respuesta</span>}
          </div>
        );
      })}
    </div>
  );
}

interface QuestionExplanationProps {
  question: Question;
  variant?: 'neutral' | 'success' | 'error';
  compact?: boolean;
  className?: string;
}

/**
 * Renders the question explanation/solution with LaTeX support
 */
export function QuestionExplanation({
  question,
  variant = 'neutral',
  compact = false,
  className = '',
}: QuestionExplanationProps) {
  const variantClasses = {
    neutral: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-900 dark:text-blue-100',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-900 dark:text-green-100',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-900 dark:text-red-100',
  };

  return (
    <div
      className={`border-l-4 ${compact ? 'p-2 text-sm' : 'p-4'} ${variantClasses[variant]} ${className}`}
    >
      <p className={`font-semibold ${compact ? 'mb-0.5 text-xs' : 'mb-1'}`}>
        Explicación:
      </p>
      <div className={variant === 'success' ? 'text-green-800 dark:text-green-200' : variant === 'error' ? 'text-red-800 dark:text-red-200' : 'text-blue-800 dark:text-blue-200'}>
        <UnifiedLatexRenderer content={question.explanation} displayMode={false} />
      </div>
    </div>
  );
}

interface QuestionDisplayProps {
  question: Question;
  showOptions?: boolean;
  showExplanation?: boolean;
  optionsLayout?: 'grid' | 'list';
  highlightCorrectAnswer?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * Complete question display component that combines:
 * - Question text (enunciado)
 * - Options/alternatives
 * - Explanation/solution
 *
 * Use this for read-only question display. For interactive quizzes, use QuestionRenderer.
 */
export function QuestionDisplay({
  question,
  showOptions = true,
  showExplanation = false,
  optionsLayout = 'grid',
  highlightCorrectAnswer = false,
  compact = false,
  className = '',
}: QuestionDisplayProps) {
  return (
    <div className={`${compact ? 'space-y-2' : 'space-y-4'} ${className}`}>
      {/* Question Text */}
      <QuestionText
        question={question}
        size={compact ? 'sm' : 'base'}
      />

      {/* Visual Data (Geometry/Graphs/Tables/Diagrams) */}
      {question.visualData && question.visualData.type === 'geometry' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <GeometryCanvas
            figures={question.visualData.data as GeometryFigure[]}
            width={compact ? 300 : 400}
            height={compact ? 225 : 300}
          />
        </div>
      )}

      {/* Bar Chart */}
      {question.visualData?.type === 'graph' && question.visualData.data?.chartType === 'bar' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <BarChart
            data={question.visualData.data.items}
            showValues={question.visualData.data.showValues ?? true}
            showLabels={question.visualData.data.showLabels ?? true}
            height={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Pie Chart */}
      {question.visualData?.type === 'graph' && question.visualData.data?.chartType === 'pie' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <PieChart
            data={question.visualData.data.items}
            showLegend={question.visualData.data.showLegend ?? true}
            showValues={question.visualData.data.showValues ?? false}
            showPercentages={question.visualData.data.showPercentages ?? true}
            size={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Histogram */}
      {question.visualData?.type === 'graph' && question.visualData.data?.chartType === 'histogram' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <Histogram
            data={question.visualData.data.items}
            showFrequencies={question.visualData.data.showFrequencies ?? true}
            showIntervals={question.visualData.data.showIntervals ?? true}
            height={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Line Chart */}
      {question.visualData?.type === 'graph' && question.visualData.data?.chartType === 'line' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <LineChart
            data={question.visualData.data.items}
            showValues={question.visualData.data.showValues ?? false}
            showLabels={question.visualData.data.showLabels ?? true}
            showYAxis={question.visualData.data.showYAxis ?? true}
            height={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Scatter Plot */}
      {question.visualData?.type === 'graph' && question.visualData.data?.chartType === 'scatter' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <ScatterPlot
            data={question.visualData.data.series ?? question.visualData.data.points}
            xLabel={question.visualData.data.xLabel}
            yLabel={question.visualData.data.yLabel}
            showGrid={question.visualData.data.showGrid ?? true}
            showTrendLine={question.visualData.data.showTrendLine ?? false}
            correlationType={question.visualData.data.correlationType}
            height={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Frequency Table */}
      {question.visualData?.type === 'table' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <FrequencyTable
            data={question.visualData.data.items}
            showTally={question.visualData.data.showTally ?? true}
            showRelative={question.visualData.data.showRelative ?? false}
            showPercentage={question.visualData.data.showPercentage ?? false}
          />
        </div>
      )}

      {/* Venn Diagram */}
      {question.visualData?.type === 'diagram' && question.visualData.data?.diagramType === 'venn' && (
        <div className={compact ? 'my-2' : 'my-4'}>
          <VennDiagram
            mode={question.visualData.data.mode ?? 'overlapping'}
            labelA={question.visualData.data.labelA}
            labelB={question.visualData.data.labelB}
            countA={question.visualData.data.countA}
            countB={question.visualData.data.countB}
            countBoth={question.visualData.data.countBoth}
            showCounts={question.visualData.data.showCounts ?? true}
            size={compact ? 'sm' : 'md'}
          />
        </div>
      )}

      {/* Options */}
      {showOptions && (
        <QuestionOptions
          question={question}
          layout={optionsLayout}
          size={compact ? 'sm' : 'base'}
          highlightCorrect={highlightCorrectAnswer}
        />
      )}

      {/* Explanation */}
      {showExplanation && (
        <QuestionExplanation
          question={question}
          variant="neutral"
          compact={compact}
        />
      )}
    </div>
  );
}
