'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { MathText } from '@/components/math/MathDisplay';

interface PracticeItem {
  id: string;
  type: 'to-scientific' | 'to-standard';
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const ITEMS: PracticeItem[] = [
  {
    id: '1',
    type: 'to-scientific',
    question: 'Convierte 7,200,000 a notación científica:',
    options: ['$7.2 \\times 10^5$', '$7.2 \\times 10^6$', '$72 \\times 10^5$', '$0.72 \\times 10^7$'],
    correctAnswer: 1,
    hint: 'Mueve la coma hasta que el número esté entre 1 y 10, luego cuenta las posiciones.',
    explanation: 'Movemos la coma 6 lugares a la izquierda: 7,200,000 → 7.2, por lo que es $7.2 \\times 10^6$.',
  },
  {
    id: '2',
    type: 'to-scientific',
    question: 'Convierte 0.00045 a notación científica:',
    options: ['$4.5 \\times 10^{-3}$', '$4.5 \\times 10^{-4}$', '$45 \\times 10^{-5}$', '$4.5 \\times 10^4$'],
    correctAnswer: 1,
    hint: 'Para números pequeños, el exponente será negativo. Cuenta cuántos lugares mueves la coma a la derecha.',
    explanation: 'Movemos la coma 4 lugares a la derecha: 0.00045 → 4.5, por lo que es $4.5 \\times 10^{-4}$.',
  },
  {
    id: '3',
    type: 'to-standard',
    question: 'Convierte $3.6 \\times 10^4$ a notación estándar:',
    options: ['360', '3,600', '36,000', '360,000'],
    correctAnswer: 2,
    hint: 'Exponente positivo +4 significa mover la coma 4 lugares a la derecha.',
    explanation: 'Movemos la coma 4 lugares a la derecha: 3.6 → 36000, es decir, 36,000.',
  },
  {
    id: '4',
    type: 'to-standard',
    question: 'Convierte $8.1 \\times 10^{-3}$ a notación estándar:',
    options: ['8,100', '0.81', '0.081', '0.0081'],
    correctAnswer: 3,
    hint: 'Exponente negativo -3 significa mover la coma 3 lugares a la izquierda.',
    explanation: 'Movemos la coma 3 lugares a la izquierda: 8.1 → 0.0081.',
  },
  {
    id: '5',
    type: 'to-scientific',
    question: 'Convierte 925,000,000 a notación científica:',
    options: ['$9.25 \\times 10^7$', '$9.25 \\times 10^8$', '$92.5 \\times 10^7$', '$9.25 \\times 10^9$'],
    correctAnswer: 1,
    hint: 'Cuenta cuidadosamente: el número tiene 9 dígitos en total.',
    explanation: 'Movemos la coma 8 lugares a la izquierda: 925,000,000 → 9.25, por lo que es $9.25 \\times 10^8$.',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentItem, setCurrentItem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const item = ITEMS[currentItem];
  const isCorrect = selectedAnswer === item?.correctAnswer;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === item.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentItem < ITEMS.length - 1) {
      setCurrentItem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowHint(false);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentItem(0);
    setSelectedAnswer(null);
    setShowHint(false);
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
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Convierte entre notación científica y estándar
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentItem + 1} de {ITEMS.length}
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

          {/* Type indicator */}
          <div className="flex justify-center">
            <span className={cn(
              'px-4 py-2 rounded-full font-semibold text-sm',
              item.type === 'to-scientific'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
            )}>
              {item.type === 'to-scientific' ? '📝 A Notación Científica' : '🔢 A Notación Estándar'}
            </span>
          </div>

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
              <MathText content={item.question} />
            </h3>

            {/* Options grid */}
            <div className="grid grid-cols-2 gap-3">
              {item.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl text-lg font-medium transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === item.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                      : showFeedback && index === item.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                  )}
                >
                  <MathText content={option} />
                </button>
              ))}
            </div>

            {/* Hint button */}
            {!showFeedback && !showHint && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-2 px-4 py-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-all"
                >
                  <Lightbulb size={18} />
                  <span className="text-sm font-medium">Ver pista</span>
                </button>
              </div>
            )}

            {/* Hint */}
            {showHint && !showFeedback && (
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-xl border border-amber-200 dark:border-amber-700 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">{item.hint}</p>
                </div>
              </div>
            )}

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
                      <MathText content={item.explanation} />
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
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
                <span>{currentItem < ITEMS.length - 1 ? 'Siguiente problema' : 'Ver resultados'}</span>
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
            <div className="text-6xl mb-4">{passed ? '🏆' : '📚'}</div>
            <h3 className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {passed ? '¡Excelente trabajo!' : '¡Sigue practicando!'}
            </h3>
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {ITEMS.length}
            </div>
            <p className={cn(
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? '¡Dominas las conversiones de notación científica!'
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
                <span>Continuar al checkpoint</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
