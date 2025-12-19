'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassificationItem {
  id: string;
  scenario: string;
  useMultiplication: boolean;
  explanation: string;
  alternativeMethod?: string;
}

const ITEMS: ClassificationItem[] = [
  {
    id: '1',
    scenario: 'Tienes 5 camisas y 3 pantalones. ¿Cuántos conjuntos puedes formar?',
    useMultiplication: true,
    explanation: 'Sí, se multiplica: 5 × 3 = 15 conjuntos. Cada camisa puede combinarse con cada pantalón.',
  },
  {
    id: '2',
    scenario: 'Tienes 4 manzanas y 6 naranjas. ¿Cuántas frutas tienes en total?',
    useMultiplication: false,
    explanation: 'No, se suma: 4 + 6 = 10 frutas. Aquí cuentas elementos, no combinaciones.',
    alternativeMethod: 'Suma',
  },
  {
    id: '3',
    scenario: 'Un código tiene 2 letras seguidas de 3 números. ¿Cuántos códigos son posibles?',
    useMultiplication: true,
    explanation: 'Sí, se multiplica: 26 × 26 × 10 × 10 × 10 = 676,000 códigos. Cada posición es independiente.',
  },
  {
    id: '4',
    scenario: 'En una clase hay 12 niños y 15 niñas. ¿Cuántos estudiantes hay?',
    useMultiplication: false,
    explanation: 'No, se suma: 12 + 15 = 27 estudiantes. Cuentas el total de personas, no combinaciones.',
    alternativeMethod: 'Suma',
  },
  {
    id: '5',
    scenario: 'Una pizzería ofrece 3 tamaños, 4 masas y 8 ingredientes. ¿Cuántas pizzas diferentes puedes pedir?',
    useMultiplication: true,
    explanation: 'Sí, se multiplica: 3 × 4 × 8 = 96 pizzas. Cada elección es independiente de las otras.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(ITEMS.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentItem = ITEMS[currentIndex];
  const userAnswer = answers[currentIndex];
  const isCorrect = userAnswer === currentItem.useMultiplication;
  const correctCount = answers.filter((a, i) => a === ITEMS[i].useMultiplication).length;
  const passed = correctCount >= 4;

  const handleAnswer = (answer: boolean) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex < ITEMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers(Array(ITEMS.length).fill(null));
    setShowFeedback(false);
    setIsComplete(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Multiplicar o No?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica cuándo usar el principio multiplicativo
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex justify-center gap-2">
            {ITEMS.map((item, i) => (
              <div
                key={item.id}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  answers[i] !== null
                    ? answers[i] === ITEMS[i].useMultiplication
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : i === currentIndex
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {answers[i] !== null ? (
                  answers[i] === ITEMS[i].useMultiplication ? <Check size={18} /> : <X size={18} />
                ) : (
                  i + 1
                )}
              </div>
            ))}
          </div>

          {/* Scenario card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-3">¿Se resuelve multiplicando?</p>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {currentItem.scenario}
                </p>
              </div>
            </div>

            {/* Answer buttons */}
            {!showFeedback && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-8 py-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-all border-2 border-green-300 dark:border-green-700"
                >
                  <span className="text-2xl block mb-1">×</span>
                  Sí, multiplicar
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="px-8 py-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all border-2 border-blue-300 dark:border-blue-700"
                >
                  <span className="text-2xl block mb-1">+</span>
                  No, otro método
                </button>
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <div className="space-y-4 animate-fadeIn">
                <div
                  className={cn(
                    'p-4 rounded-xl text-center',
                    isCorrect
                      ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                      : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
                  )}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isCorrect ? (
                      <Check className="w-6 h-6 text-green-600" />
                    ) : (
                      <X className="w-6 h-6 text-red-600" />
                    )}
                    <p
                      className={cn(
                        'font-bold text-lg',
                        isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                      )}
                    >
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                  <p className="text-gray-700 dark:text-gray-300">
                    {currentItem.explanation}
                  </p>
                  {currentItem.alternativeMethod && (
                    <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                      <strong>Método correcto:</strong> {currentItem.alternativeMethod}
                    </p>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
                  >
                    <span>{currentIndex < ITEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Results */
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              passed
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            <div className="text-5xl mb-4">{passed ? '🎉' : '💪'}</div>
            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Excelente trabajo!' : '¡Sigue practicando!'}
            </h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {ITEMS.length}
            </div>
            <p className={cn(passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
              {passed
                ? 'Identificas correctamente cuándo usar el principio multiplicativo'
                : 'Necesitas 4 respuestas correctas para continuar'}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="space-y-2">
              {ITEMS.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg',
                    answers[i] === item.useMultiplication
                      ? 'bg-green-50 dark:bg-green-900/30'
                      : 'bg-red-50 dark:bg-red-900/30'
                  )}
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 pr-4">
                    {item.scenario.substring(0, 50)}...
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {item.useMultiplication ? '× Multiplicar' : '+ Sumar'}
                    </span>
                    {answers[i] === item.useMultiplication ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key takeaway */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
            <p className="text-purple-800 dark:text-purple-200 text-center font-medium">
              <strong>Recuerda:</strong> Multiplica cuando combinas opciones independientes.
              <br />
              Suma cuando cuentas elementos de un grupo.
            </p>
          </div>

          {/* Action buttons */}
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
