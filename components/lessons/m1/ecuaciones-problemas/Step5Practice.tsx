'use client';

import { useState } from 'react';
import { Check, X, RotateCcw, ArrowRight, Flame, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  problem: string;
  equation: string;
  options: string[];
  correctIndex: number;
  hint: string;
  solution: string;
}

const PROBLEMS: Problem[] = [
  {
    problem: 'Ana tiene el doble de edad que su hermano. La suma de sus edades es 24 años. ¿Cuántos años tiene Ana?',
    equation: 'x + 2x = 24',
    options: ['8 años', '12 años', '16 años', '18 años'],
    correctIndex: 2,
    hint: 'Si el hermano tiene x años, Ana tiene 2x años. Juntos: x + 2x = 24.',
    solution: 'x + 2x = 24 → 3x = 24 → x = 8 (hermano). Ana = 2(8) = 16 años.',
  },
  {
    problem: 'Un rectángulo tiene perímetro de 40 cm. El largo es 4 cm más que el ancho. ¿Cuál es el ancho?',
    equation: '2x + 2(x + 4) = 40',
    options: ['6 cm', '8 cm', '10 cm', '12 cm'],
    correctIndex: 1,
    hint: 'Si ancho = x, largo = x + 4. Perimetro = 2(ancho) + 2(largo).',
    solution: '2x + 2(x+4) = 40 → 2x + 2x + 8 = 40 → 4x = 32 → x = 8 cm.',
  },
  {
    problem: 'En una tienda, 3 lápices y 1 borrador cuestan $10. Si cada borrador cuesta $1, ¿cuánto cuesta cada lápiz?',
    equation: '3x + 1 = 10',
    options: ['$2', '$3', '$4', '$5'],
    correctIndex: 1,
    hint: '3 lápices a $x cada uno + 1 borrador a $1 = $10 total.',
    solution: '3x + 1 = 10 → 3x = 9 → x = 3. Cada lápiz cuesta $3.',
  },
  {
    problem: 'El triple de un número disminuido en 5 es igual a 16. ¿Cuál es el número?',
    equation: '3x - 5 = 16',
    options: ['5', '7', '9', '11'],
    correctIndex: 1,
    hint: '"El triple de un número" es 3x, "disminuido en 5" significa restar 5.',
    solution: '3x - 5 = 16 → 3x = 21 → x = 7.',
  },
  {
    problem: 'María gastó la mitad de su dinero en un libro. Si le quedaron $15, ¿cuánto tenía inicialmente?',
    equation: 'x - x/2 = 15',
    options: ['$25', '$30', '$35', '$40'],
    correctIndex: 1,
    hint: 'Tenía x, gastó x/2, le quedó x - x/2 = 15.',
    solution: 'x - x/2 = 15 → x/2 = 15 → x = 30. Tenía $30.',
  },
  {
    problem: 'Dos números consecutivos suman 47. ¿Cuál es el número menor?',
    equation: 'x + (x + 1) = 47',
    options: ['22', '23', '24', '25'],
    correctIndex: 1,
    hint: 'Si el menor es x, el siguiente consecutivo es x + 1.',
    solution: 'x + (x+1) = 47 → 2x + 1 = 47 → 2x = 46 → x = 23.',
  },
];

const REQUIRED_CORRECT = 4;

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  const problem = PROBLEMS[currentProblem];
  const correctCount = answers.filter(a => a).length;
  const passed = correctCount >= REQUIRED_CORRECT;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === problem.correctIndex;
    setShowFeedback(true);
    setAnswers(prev => [...prev, isCorrect]);

    if (isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setAnswers([]);
    setIsComplete(false);
    setStreak(0);
  };

  const isCorrect = selectedAnswer === problem?.correctIndex;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Necesitas {REQUIRED_CORRECT} de {PROBLEMS.length} correctas para avanzar
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress and streak */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {PROBLEMS.length}
            </div>
            {streak >= 3 && (
              <div className="flex items-center gap-1 text-orange-500 animate-pulse">
                <Flame size={20} />
                <span className="font-bold">{streak} racha</span>
              </div>
            )}
            <div className="flex gap-1">
              {PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    i < answers.length
                      ? answers[i]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentProblem
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Problem text */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-4">
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
                {problem.problem}
              </p>
            </div>

            {/* Equation hint */}
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Ecuación: </span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                {problem.equation}
              </span>
            </div>

            {/* Hint button */}
            {!showFeedback && !showHint && (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-2 mx-auto mb-4 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800/30 transition-colors"
              >
                <Lightbulb size={16} />
                <span>Ver pista</span>
              </button>
            )}

            {/* Hint */}
            {showHint && !showFeedback && (
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mb-4 animate-fadeIn">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <Lightbulb className="inline mr-2" size={16} />
                  {problem.hint}
                </p>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {problem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl font-bold text-lg transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === problem.correctIndex
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : showFeedback && index === problem.correctIndex
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={cn(
                  'mt-4 p-4 rounded-xl animate-fadeIn',
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
                )}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <p className={cn('font-bold', isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {problem.solution}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Check/Next button */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentProblem < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
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
              passed
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            {passed ? (
              <Check className="w-20 h-20 mx-auto text-green-500 mb-4" />
            ) : (
              <RotateCcw className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Felicitaciones!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {PROBLEMS.length}
            </div>

            <p
              className={cn(
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed
                ? 'Has demostrado que puedes resolver problemas algebraicos'
                : `Necesitas ${REQUIRED_CORRECT} respuestas correctas. ¡Puedes intentarlo de nuevo!`}
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
