'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: string;
  question: string;
  correctType: string;
  options: string[];
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'En una clase de 40 estudiantes, 15 usan lentes. ¿Qué porcentaje usa lentes?',
    correctType: 'Encontrar el porcentaje',
    options: ['Encontrar la parte', 'Encontrar el porcentaje', 'Encontrar el total', 'Aumento/Disminución'],
    explanation: 'Conocemos la parte (15) y el total (40). Debemos encontrar qué porcentaje representa: (15÷40)×100 = 37,5%',
  },
  {
    id: 'p2',
    question: 'Un celular cuesta $200.000 y tiene 15% de descuento. ¿Cuánto se ahorra?',
    correctType: 'Encontrar la parte',
    options: ['Encontrar la parte', 'Encontrar el porcentaje', 'Encontrar el total', 'Aumento/Disminución'],
    explanation: 'Conocemos el porcentaje (15%) y el total ($200.000). Debemos encontrar la parte: 15% de $200.000 = $30.000',
  },
  {
    id: 'p3',
    question: 'Después de un aumento de 20%, el sueldo es $600.000. ¿Cuál era el sueldo original?',
    correctType: 'Encontrar el total',
    options: ['Encontrar la parte', 'Encontrar el porcentaje', 'Encontrar el total', 'Aumento/Disminución'],
    explanation: 'Conocemos el resultado ($600.000) y el porcentaje de cambio (20%). Debemos encontrar el original: $600.000 ÷ 1,20 = $500.000',
  },
  {
    id: 'p4',
    question: 'Un producto de $80.000 sube primero 10% y luego baja 10%. ¿Cuánto queda?',
    correctType: 'Aumento/Disminución',
    options: ['Encontrar la parte', 'Encontrar el porcentaje', 'Encontrar el total', 'Aumento/Disminución'],
    explanation: 'Es un problema de cambios sucesivos. $80.000 × 1,10 × 0,90 = $79.200 (¡no vuelve al original!)',
  },
  {
    id: 'p5',
    question: '45 personas son el 30% de los votantes. ¿Cuántos votantes hay en total?',
    correctType: 'Encontrar el total',
    options: ['Encontrar la parte', 'Encontrar el porcentaje', 'Encontrar el total', 'Aumento/Disminución'],
    explanation: 'Conocemos la parte (45) y el porcentaje (30%). Debemos encontrar el total: (45 × 100) ÷ 30 = 150 votantes',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(PROBLEMS.length).fill(null));

  const isComplete = currentIndex >= PROBLEMS.length;
  const currentProblem = isComplete ? PROBLEMS[0] : PROBLEMS[currentIndex];
  const isCorrect = selectedType === currentProblem.correctType;

  const handleSelect = (type: string) => {
    if (showFeedback) return;
    setSelectedType(type);
  };

  const handleCheck = () => {
    if (selectedType === null) return;
    setShowFeedback(true);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedType;
    setAnswers(newAnswers);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedType(null);
    setCurrentIndex(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedType(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setAnswers(Array(PROBLEMS.length).fill(null));
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica el Problema
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica qué tipo de problema es cada uno
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentIndex + 1} de {PROBLEMS.length}
            </div>
            <div className="flex gap-1">
              {PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    answers[i] !== null
                      ? answers[i] === PROBLEMS[i].correctType
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentIndex
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (
                    answers[i] === PROBLEMS[i].correctType ? '✓' : '✗'
                  ) : (
                    i + 1
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Lee el problema:</p>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                &quot;{currentProblem.question}&quot;
              </p>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              ¿Qué tipo de problema es?
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentProblem.options.map((option) => {
                const isSelected = selectedType === option;
                const isCorrectAnswer = option === currentProblem.correctType;

                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    disabled={showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all text-left',
                      isSelected
                        ? showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                          : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                        : showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400 text-green-700'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {showFeedback && isCorrectAnswer && (
                        <Check size={18} className="text-green-600 flex-shrink-0" />
                      )}
                      {showFeedback && isSelected && !isCorrectAnswer && (
                        <X size={18} className="text-red-600 flex-shrink-0" />
                      )}
                      <span className="font-medium">{option}</span>
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
                      isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                    )}
                  >
                    {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {currentProblem.explanation}
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
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
              >
                <span>{currentIndex < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              correctCount >= 4
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            <div className="text-6xl mb-4">
              {correctCount >= 4 ? '🎯' : '💪'}
            </div>
            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                correctCount >= 4 ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {correctCount >= 4 ? '¡Excelente!' : '¡Buen intento!'}
            </h3>
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {PROBLEMS.length}
            </div>
            <p className={cn(correctCount >= 4 ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
              {correctCount >= 4
                ? 'Identificas muy bien los tipos de problemas'
                : 'Sigue practicando para mejorar'}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="space-y-2">
              {PROBLEMS.map((problem, i) => {
                const isCorrectAnswer = answers[i] === problem.correctType;
                return (
                  <div
                    key={problem.id}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg',
                      isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30'
                        : 'bg-red-50 dark:bg-red-900/30'
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {isCorrectAnswer ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {problem.question.substring(0, 50)}...
                      </span>
                    </div>
                    <span className="text-xs text-purple-600 font-medium ml-2 flex-shrink-0">
                      {problem.correctType}
                    </span>
                  </div>
                );
              })}
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
