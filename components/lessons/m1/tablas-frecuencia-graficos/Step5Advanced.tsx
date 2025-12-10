'use client';

import { useState } from 'react';
import { ArrowRight, RefreshCw, BarChart2, PieChart as PieChartIcon, Check, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { BarChart, PieChart } from '@/components/lessons/shared';

type Phase = 'transform' | 'interactive' | 'quiz';
type GraphType = 'bar' | 'pie';

const SAMPLE_DATA = [
  { category: 'Matematica', value: 30, color: '#3B82F6' },
  { category: 'Lenguaje', value: 25, color: '#10B981' },
  { category: 'Ciencias', value: 20, color: '#F59E0B' },
  { category: 'Historia', value: 15, color: '#EF4444' },
  { category: 'Artes', value: 10, color: '#8B5CF6' },
];

const QUIZ_QUESTIONS = [
  {
    question: 'Para COMPARAR cantidades entre categorias, ¿que grafico es mejor?',
    options: ['Grafico de Barras', 'Grafico Circular'],
    correctIndex: 0,
    explanation: 'El grafico de barras facilita comparar alturas/cantidades directamente.',
  },
  {
    question: 'Para mostrar PARTES DE UN TODO, ¿que grafico es mejor?',
    options: ['Grafico de Barras', 'Grafico Circular'],
    correctIndex: 1,
    explanation: 'El grafico circular muestra claramente como las partes suman el 100%.',
  },
];

export default function Step5Advanced({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('transform');
  const [graphType, setGraphType] = useState<GraphType>('bar');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  if (!isActive) return null;

  // ============ PHASE 1: TRANSFORM ============
  if (phase === 'transform') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Del Grafico de Barras al Circular
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Los mismos datos pueden representarse de diferentes formas
          </p>
        </div>

        {/* Toggle buttons */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setGraphType('bar')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
              graphType === 'bar'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <BarChart2 className="w-5 h-5" />
            <span>Barras</span>
          </button>
          <button
            onClick={() => setGraphType('pie')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
              graphType === 'pie'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <PieChartIcon className="w-5 h-5" />
            <span>Circular</span>
          </button>
        </div>

        {/* Chart display with animation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm min-h-64 flex items-center justify-center">
          <div className={cn('transition-all duration-500', graphType === 'bar' ? 'w-full' : 'w-auto')}>
            {graphType === 'bar' ? (
              <BarChart data={SAMPLE_DATA} height="lg" animated />
            ) : (
              <PieChart data={SAMPLE_DATA} showPercentages showLegend size="lg" />
            )}
          </div>
        </div>

        {/* Explanation */}
        <div
          className={cn(
            'rounded-xl p-4 border transition-all',
            graphType === 'bar'
              ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
              : 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700'
          )}
        >
          <div className="flex items-start gap-3">
            <Lightbulb
              className={cn(
                'w-5 h-5 flex-shrink-0 mt-0.5',
                graphType === 'bar' ? 'text-blue-600' : 'text-purple-600'
              )}
            />
            <div>
              {graphType === 'bar' ? (
                <>
                  <p className="text-blue-800 dark:text-blue-200 font-semibold">Grafico de Barras</p>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Facil de <strong>comparar</strong> las alturas. ¿Cual asignatura es la favorita?
                    Se ve claramente que Matematica es la mas alta.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-purple-800 dark:text-purple-200 font-semibold">Grafico Circular</p>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    Muestra como las <strong>partes forman el todo</strong>. Matematica es 30% del total,
                    y todos los sectores suman exactamente 100%.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <button
            onClick={() => setPhase('interactive')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Explorar mas</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: INTERACTIVE - Sum to 100% discovery ============
  if (phase === 'interactive') {
    const total = SAMPLE_DATA.reduce((sum, d) => sum + d.value, 0);

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Las Partes Suman el Todo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            En un grafico circular, todos los sectores suman 100%
          </p>
        </div>

        {/* Pie chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <PieChart data={SAMPLE_DATA} showPercentages showLegend size="lg" />
        </div>

        {/* Sum visualization */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 text-center">
            Verificacion: ¿Suman 100%?
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-2 text-lg">
            {SAMPLE_DATA.map((item, index) => (
              <div key={item.category} className="flex items-center gap-1">
                <span
                  className="font-mono font-semibold px-2 py-1 rounded"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  {Math.round((item.value / total) * 100)}%
                </span>
                {index < SAMPLE_DATA.length - 1 && (
                  <span className="text-gray-400">+</span>
                )}
              </div>
            ))}
            <span className="text-gray-400 mx-2">=</span>
            <span className="font-bold text-2xl text-green-600 dark:text-green-400">
              100%
            </span>
            <Check className="w-6 h-6 text-green-600" />
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>Clave:</strong> Si tienes un grafico circular donde las partes NO suman 100%,
              hay un error en los datos o en el calculo.
            </p>
          </div>
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <button
            onClick={() => setPhase('quiz')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Mini-Quiz</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: QUIZ ============
  const currentQuiz = QUIZ_QUESTIONS[quizIndex];
  const isLastQuiz = quizIndex === QUIZ_QUESTIONS.length - 1;
  const isCorrect = selectedAnswer === currentQuiz.correctIndex;

  const handleQuizAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === currentQuiz.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleQuizNext = () => {
    if (isLastQuiz) {
      onComplete();
    } else {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Cuándo usar cada grafico?
        </h2>
        <div className="flex items-center justify-center gap-2">
          {QUIZ_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                i === quizIndex
                  ? 'bg-blue-500 scale-125'
                  : i < quizIndex
                    ? 'bg-green-500'
                    : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center">
          {currentQuiz.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuiz.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === currentQuiz.correctIndex;
          const showResult = showFeedback && isSelected;
          const Icon = index === 0 ? BarChart2 : PieChartIcon;
          const colors = index === 0
            ? { bg: 'bg-blue-50 dark:bg-blue-900/30', border: 'border-blue-300', text: 'text-blue-700' }
            : { bg: 'bg-purple-50 dark:bg-purple-900/30', border: 'border-purple-300', text: 'text-purple-700' };

          return (
            <button
              key={index}
              onClick={() => handleQuizAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3',
                !showFeedback && `hover:${colors.bg} hover:${colors.border}`,
                !showFeedback && !isSelected && 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
                isSelected && !showFeedback && `${colors.border} ${colors.bg}`,
                showResult && isCorrectOption && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                showResult && !isCorrectOption && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                showFeedback && !isSelected && isCorrectOption && 'border-green-500 bg-green-50/50',
                showFeedback && !isSelected && !isCorrectOption && 'opacity-50'
              )}
            >
              <Icon className={cn('w-10 h-10', colors.text)} />
              <span className={cn('font-semibold', colors.text)}>{option}</span>
              {showFeedback && isSelected && (
                isCorrectOption ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <RefreshCw className="w-6 h-6 text-red-600" />
                )
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
          )}
        >
          <p
            className={cn(
              'font-semibold mb-1',
              isCorrect ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'
            )}
          >
            {isCorrect ? '¡Exacto!' : 'No del todo'}
          </p>
          <p
            className={cn(
              'text-sm',
              isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}
          >
            {currentQuiz.explanation}
          </p>
        </div>
      )}

      {/* Continue button */}
      {showFeedback && (
        <div className="flex justify-center">
          <button
            onClick={handleQuizNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>{isLastQuiz ? 'Continuar al Checkpoint' : 'Siguiente'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
