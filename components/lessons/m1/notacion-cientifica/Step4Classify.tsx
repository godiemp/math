'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassifyItem {
  id: string;
  number: string;
  correctAnswer: 'valid' | 'invalid-coefficient' | 'invalid-format';
  explanation: string;
}

const ITEMS: ClassifyItem[] = [
  {
    id: '1',
    number: '3.5 × 10⁴',
    correctAnswer: 'valid',
    explanation: '¡Correcto! El coeficiente 3.5 está entre 1 y 10, y el exponente es un entero.',
  },
  {
    id: '2',
    number: '15 × 10³',
    correctAnswer: 'invalid-coefficient',
    explanation: 'El coeficiente 15 es mayor que 10. Debería ser 1.5 × 10⁴.',
  },
  {
    id: '3',
    number: '7.02 × 10⁻⁵',
    correctAnswer: 'valid',
    explanation: '¡Correcto! 7.02 está entre 1 y 10, y el exponente negativo es válido.',
  },
  {
    id: '4',
    number: '0.8 × 10⁶',
    correctAnswer: 'invalid-coefficient',
    explanation: 'El coeficiente 0.8 es menor que 1. Debería ser 8 × 10⁵.',
  },
  {
    id: '5',
    number: '9.99 × 10⁻²',
    correctAnswer: 'valid',
    explanation: '¡Correcto! 9.99 está entre 1 y 10 (justo en el límite pero válido).',
  },
];

const ANSWER_OPTIONS = [
  { id: 'valid', label: '✓ Válida', color: 'green' },
  { id: 'invalid-coefficient', label: '✗ Coeficiente incorrecto', color: 'red' },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentItem, setCurrentItem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const item = ITEMS[currentItem];
  const isCorrect = selectedAnswer === item?.correctAnswer;

  const handleSelect = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleCheck = () => {
    if (!selectedAnswer) return;
    setShowFeedback(true);
    if (selectedAnswer === item.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentItem < ITEMS.length - 1) {
      setCurrentItem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentItem(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setIsComplete(false);
  };

  const passed = correctCount >= 4;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica la Notación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Está correctamente escrita en notación científica?
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Ejercicio {currentItem + 1} de {ITEMS.length}
            </div>
            <div className="flex gap-1">
              {ITEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    i < currentItem
                      ? 'bg-green-500 text-white'
                      : i === currentItem
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < currentItem ? <Check size={14} /> : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Number display */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                ¿Esta expresión está en notación científica correcta?
              </p>
              <p className="text-4xl font-mono font-bold text-gray-900 dark:text-white">
                {item.number}
              </p>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {ANSWER_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={showFeedback}
                  className={cn(
                    'w-full p-4 rounded-xl text-left font-medium transition-all border-2',
                    selectedAnswer === option.id
                      ? showFeedback
                        ? option.id === item.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                        : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500'
                      : showFeedback && option.id === item.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      option.color === 'green'
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                    )}>
                      {option.color === 'green' ? <Check size={16} /> : <X size={16} />}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={cn(
                'mt-6 p-4 rounded-xl animate-fadeIn',
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                  : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
              )}>
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={cn(
                      'font-bold mb-1',
                      isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                    )}>
                      {isCorrect ? '¡Correcto!' : 'No exactamente'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reminder card */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 <strong>Recuerda:</strong> En notación científica válida, el coeficiente debe ser ≥ 1 y &lt; 10
            </p>
          </div>

          {/* Action button */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={!selectedAnswer}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>{currentItem < ITEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div className={cn(
            'rounded-2xl p-8 text-center',
            passed
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
              : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
          )}>
            <div className="text-6xl mb-4">{passed ? '🎉' : '💪'}</div>
            <h3 className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {passed ? '¡Excelente trabajo!' : '¡Casi lo logras!'}
            </h3>
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {ITEMS.length}
            </div>
            <p className={cn(
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? '¡Dominas la identificación de notación científica!'
                : 'Necesitas 4 respuestas correctas. ¡Inténtalo de nuevo!'}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            {!passed && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}
            {passed && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                <span>Continuar</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
