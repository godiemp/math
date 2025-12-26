'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, ZoomIn, ZoomOut, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type HomothecyType = 'amplificacion' | 'reduccion' | 'inversion';

interface Expression {
  id: string;
  k: string;
  kValue: number;
  correctType: HomothecyType;
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    k: 'k = 3',
    kValue: 3,
    correctType: 'amplificacion',
    explanation: 'Como k = 3 > 1, es una amplificación. La figura se agranda 3 veces.',
  },
  {
    id: 'e2',
    k: 'k = 0.5',
    kValue: 0.5,
    correctType: 'reduccion',
    explanation: 'Como 0 < k = 0.5 < 1, es una reducción. La figura se reduce a la mitad.',
  },
  {
    id: 'e3',
    k: 'k = -2',
    kValue: -2,
    correctType: 'inversion',
    explanation: 'Como k = -2 < 0, es una inversión. La figura pasa al lado opuesto y se agranda.',
  },
  {
    id: 'e4',
    k: 'k = ¾',
    kValue: 0.75,
    correctType: 'reduccion',
    explanation: 'Como 0 < k = 0.75 < 1, es una reducción. La figura se reduce a ¾ del tamaño.',
  },
  {
    id: 'e5',
    k: 'k = -0.5',
    kValue: -0.5,
    correctType: 'inversion',
    explanation: 'Como k = -0.5 < 0, es una inversión. La figura se invierte y reduce a la mitad.',
  },
  {
    id: 'e6',
    k: 'k = 1.5',
    kValue: 1.5,
    correctType: 'amplificacion',
    explanation: 'Como k = 1.5 > 1, es una amplificación. La figura se agranda 1.5 veces.',
  },
];

const TYPE_OPTIONS: { id: HomothecyType; label: string; color: string; icon: LucideIcon }[] = [
  { id: 'amplificacion', label: 'Amplificación (k > 1)', color: 'green', icon: ZoomIn },
  { id: 'reduccion', label: 'Reducción (0 < k < 1)', color: 'amber', icon: ZoomOut },
  { id: 'inversion', label: 'Inversión (k < 0)', color: 'red', icon: RotateCcw },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  green: {
    bg: 'bg-green-100 dark:bg-green-900/50',
    border: 'border-green-500',
    text: 'text-green-700 dark:text-green-300',
  },
  amber: {
    bg: 'bg-amber-100 dark:bg-amber-900/50',
    border: 'border-amber-500',
    text: 'text-amber-700 dark:text-amber-300',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/50',
    border: 'border-red-500',
    text: 'text-red-700 dark:text-red-300',
  },
};

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<HomothecyType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(HomothecyType | null)[]>(Array(EXPRESSIONS.length).fill(null));

  const isComplete = currentIndex >= EXPRESSIONS.length;
  const currentExpression = isComplete ? EXPRESSIONS[0] : EXPRESSIONS[currentIndex];
  const isCorrect = selectedType === currentExpression.correctType;

  const handleSelect = (type: HomothecyType) => {
    if (showFeedback) return;
    setSelectedType(type);
  };

  const handleCheck = () => {
    if (selectedType === null) return;
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedType;
    setAnswers(newAnswers);
    if (isCorrect) setCorrectCount((prev) => prev + 1);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedType(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedType(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setAnswers(Array(EXPRESSIONS.length).fill(null));
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica la Homotecia
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica el tipo según el valor de k
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress indicators */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Caso {currentIndex + 1} de {EXPRESSIONS.length}
            </div>
            <div className="flex gap-1">
              {EXPRESSIONS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    answers[i] !== null
                      ? answers[i] === EXPRESSIONS[i].correctType
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentIndex
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (
                    answers[i] === EXPRESSIONS[i].correctType ? (
                      '✓'
                    ) : (
                      '✗'
                    )
                  ) : (
                    i + 1
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Expression card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Qué tipo de homotecia es?</p>
              <p className="font-mono text-4xl font-bold text-purple-600 dark:text-purple-400">
                {currentExpression.k}
              </p>
            </div>

            {/* Type options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TYPE_OPTIONS.map((option) => {
                const colors = colorClasses[option.color];
                const isSelected = selectedType === option.id;
                const isCorrectAnswer = option.id === currentExpression.correctType;
                const IconComponent = option.icon;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    disabled={showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all font-medium',
                      isSelected
                        ? showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                          : `${colors.bg} ${colors.border}`
                        : showFeedback && isCorrectAnswer
                          ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-purple-400'
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <IconComponent
                        size={24}
                        className={cn(
                          isSelected && !showFeedback
                            ? colors.text
                            : 'text-gray-600 dark:text-gray-400'
                        )}
                      />
                      {showFeedback && isCorrectAnswer && (
                        <Check size={18} className="text-green-600" />
                      )}
                      {showFeedback && isSelected && !isCorrectAnswer && (
                        <X size={18} className="text-red-600" />
                      )}
                      <span
                        className={cn(
                          'text-sm font-semibold',
                          isSelected && !showFeedback
                            ? colors.text
                            : 'text-gray-700 dark:text-gray-300'
                        )}
                      >
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl animate-fadeIn',
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                  : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
              )}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4
                    className={cn(
                      'font-bold mb-1',
                      isCorrect
                        ? 'text-green-800 dark:text-green-300'
                        : 'text-amber-800 dark:text-amber-300'
                    )}
                  >
                    {isCorrect ? '¡Correcto!' : '¡Casi!'}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {currentExpression.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedType === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedType !== null
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                {currentIndex < EXPRESSIONS.length - 1 ? 'Siguiente' : 'Ver Resultados'}
              </button>
            )}
          </div>
        </>
      ) : (
        /* Results screen */
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              correctCount >= 4
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            {correctCount >= 4 ? (
              <Check className="w-16 h-16 mx-auto text-green-500 mb-4" />
            ) : (
              <RotateCcw className="w-16 h-16 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                correctCount >= 4
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {correctCount >= 4 ? '¡Excelente!' : '¡Buen intento!'}
            </h3>

            <p className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
              {correctCount} / {EXPRESSIONS.length}
            </p>

            <p
              className={cn(
                correctCount >= 4
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {correctCount >= 4
                ? '¡Dominas la clasificación de homotecias!'
                : 'Necesitas 4 respuestas correctas. ¡Puedes intentarlo de nuevo!'}
            </p>
          </div>

          {/* Answer summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="grid grid-cols-3 gap-2">
              {EXPRESSIONS.map((expr, i) => (
                <div
                  key={i}
                  className={cn(
                    'p-2 rounded-lg text-center',
                    answers[i] === expr.correctType
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                  )}
                >
                  <p className="font-mono text-sm font-bold text-gray-700 dark:text-gray-300">
                    {expr.k}
                  </p>
                  {answers[i] === expr.correctType ? (
                    <Check size={16} className="mx-auto text-green-600" />
                  ) : (
                    <X size={16} className="mx-auto text-red-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {correctCount < 4 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
