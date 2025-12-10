'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: number;
  expression: string;
  answer: string;
  type: 'cuadrado' | 'suma-diferencia' | 'termino-comun';
  hint: string;
}

const PROBLEMS: Problem[] = [
  { id: 1, expression: '(x + 2)²', answer: 'x² + 4x + 4', type: 'cuadrado', hint: 'Usa (a+b)² = a² + 2ab + b². Aquí a=x, b=2' },
  { id: 2, expression: '(a - 3)(a + 3)', answer: 'a² - 9', type: 'suma-diferencia', hint: 'Suma por diferencia: (a+b)(a-b) = a² - b²' },
  { id: 3, expression: '(x + 4)(x + 5)', answer: 'x² + 9x + 20', type: 'termino-comun', hint: 'Término común: x² + (4+5)x + (4×5)' },
  { id: 4, expression: '(y - 6)²', answer: 'y² - 12y + 36', type: 'cuadrado', hint: 'Usa (a-b)² = a² - 2ab + b². El término medio es negativo' },
  { id: 5, expression: '(m + 8)(m - 8)', answer: 'm² - 64', type: 'suma-diferencia', hint: 'Suma por diferencia = diferencia de cuadrados, sin término medio' },
  { id: 6, expression: '(x - 3)(x + 9)', answer: 'x² + 6x - 27', type: 'termino-comun', hint: 'Suma: -3+9=6. Producto: (-3)(9)=-27' },
  { id: 7, expression: '(3x + 1)²', answer: '9x² + 6x + 1', type: 'cuadrado', hint: '(3x)² = 9x², 2(3x)(1) = 6x, 1² = 1' },
  { id: 8, expression: '(2y - 5)(2y + 5)', answer: '4y² - 25', type: 'suma-diferencia', hint: '(2y)² = 4y², 5² = 25' },
  { id: 9, expression: '(x - 4)(x - 7)', answer: 'x² - 11x + 28', type: 'termino-comun', hint: 'Suma: -4+(-7)=-11. Producto: (-4)(-7)=28' },
  { id: 10, expression: '(4a + 3)²', answer: '16a² + 24a + 9', type: 'cuadrado', hint: '(4a)² = 16a², 2(4a)(3) = 24a, 3² = 9' },
];

const REQUIRED_CORRECT = 7;

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const problem = PROBLEMS[currentProblem];
  const correctCount = results.filter(r => r).length;
  const passed = correctCount >= REQUIRED_CORRECT;

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/\^2/g, '²')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/−/g, '-')
      .replace(/–/g, '-');
  };

  const checkAnswer = () => {
    const normalized = normalizeAnswer(userAnswer);
    const correct = normalizeAnswer(problem.answer);

    // Check various equivalent forms
    const isAnswerCorrect = normalized === correct ||
      normalized === correct.replace(/²/g, '^2') ||
      normalized === correct.replace(/²/g, '2');

    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    setResults(prev => [...prev, isAnswerCorrect]);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setShowHint(false);
    setUserAnswer('');

    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentProblem(0);
    setUserAnswer('');
    setShowFeedback(false);
    setShowHint(false);
    setResults([]);
    setIsComplete(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resuelve los productos notables. Necesitas {REQUIRED_CORRECT} de {PROBLEMS.length} correctas.
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {PROBLEMS.length}
            </div>
            <div className="flex gap-1">
              {PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    i < results.length
                      ? results[i]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentProblem
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < results.length ? (results[i] ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <span className={cn(
                'inline-block px-3 py-1 rounded-full text-xs font-medium mb-3',
                problem.type === 'cuadrado' && 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
                problem.type === 'suma-diferencia' && 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
                problem.type === 'termino-comun' && 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
              )}>
                {problem.type === 'cuadrado' && 'Cuadrado de binomio'}
                {problem.type === 'suma-diferencia' && 'Suma por diferencia'}
                {problem.type === 'termino-comun' && 'Término común'}
              </span>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Simplifica:</p>
              <p className="font-mono text-3xl text-gray-900 dark:text-white">
                {problem.expression}
              </p>
            </div>

            {/* Answer input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tu respuesta:
                </label>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showFeedback}
                  placeholder="Ejemplo: x² + 4x + 4"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border-2 font-mono text-lg transition-all',
                    showFeedback
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  )}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !showFeedback && userAnswer.trim()) {
                      checkAnswer();
                    }
                  }}
                />
              </div>

              {/* Hint button */}
              {!showFeedback && !showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  ¿Necesitas una pista?
                </button>
              )}

              {/* Hint */}
              {showHint && !showFeedback && (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3 border border-yellow-200 dark:border-yellow-700 animate-fadeIn">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    💡 {problem.hint}
                  </p>
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div
                  className={cn(
                    'p-4 rounded-xl animate-fadeIn',
                    isCorrect
                      ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
                  )}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <X className="w-6 h-6 text-red-600 flex-shrink-0" />
                    )}
                    <div>
                      <p className={cn('font-bold', isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300')}>
                        {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                      </p>
                      {!isCorrect && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          La respuesta correcta es: <span className="font-mono font-bold">{problem.answer}</span>
                        </p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {problem.hint}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  userAnswer.trim()
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
                <span>{currentProblem < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
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
              <Sparkles className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            ) : (
              <RotateCcw className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Excelente!' : '¡Sigue practicando!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {PROBLEMS.length}
            </div>

            <p className={cn(passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
              {passed
                ? 'Has dominado los productos notables'
                : `Necesitas ${REQUIRED_CORRECT} respuestas correctas. ¡Puedes intentarlo de nuevo!`}
            </p>
          </div>

          {/* Results summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="grid grid-cols-2 gap-2">
              {PROBLEMS.map((p, i) => (
                <div
                  key={p.id}
                  className={cn(
                    'flex items-center gap-2 p-2 rounded-lg text-sm',
                    results[i]
                      ? 'bg-green-50 dark:bg-green-900/30'
                      : 'bg-red-50 dark:bg-red-900/30'
                  )}
                >
                  {results[i] ? (
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                  )}
                  <span className="font-mono text-gray-700 dark:text-gray-300 truncate">
                    {p.expression}
                  </span>
                </div>
              ))}
            </div>
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
