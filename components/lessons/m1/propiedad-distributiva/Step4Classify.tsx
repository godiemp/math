'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Sparkles, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'matching' | 'simplify' | 'complete';

interface MatchingPair {
  id: string;
  expression: string;
  result: string;
  matched: boolean;
}

interface SimplifyProblem {
  expression: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

const MATCHING_PAIRS: MatchingPair[] = [
  { id: '1', expression: '2(x + 4)', result: '2x + 8', matched: false },
  { id: '2', expression: '-3(y - 2)', result: '-3y + 6', matched: false },
  { id: '3', expression: '5(2a + 3)', result: '10a + 15', matched: false },
  { id: '4', expression: '-1(x - 7)', result: '-x + 7', matched: false },
];

const SIMPLIFY_PROBLEMS: SimplifyProblem[] = [
  {
    expression: '4(x + 2)',
    options: ['4x + 8', '4x + 2', '8x', '4x + 6'],
    correctIndex: 0,
    hint: '4 multiplica a x → 4x, y 4 multiplica a 2 → 8',
  },
  {
    expression: '-2(y - 5)',
    options: ['-2y + 10', '-2y - 10', '-2y - 5', '2y - 10'],
    correctIndex: 0,
    hint: '(-2)×(-5) = +10 porque negativo por negativo es positivo',
  },
  {
    expression: '3(2x + 1)',
    options: ['6x + 3', '6x + 1', '5x + 3', '6x'],
    correctIndex: 0,
    hint: '3 × 2x = 6x, y 3 × 1 = 3',
  },
  {
    expression: '-(x + 4)',
    options: ['-x - 4', '-x + 4', 'x - 4', '-x - 1'],
    correctIndex: 0,
    hint: 'El signo negativo es como -1. Entonces -1×x = -x y -1×4 = -4',
  },
  {
    expression: '2(x + 3) + x',
    options: ['3x + 6', '2x + 6', '3x + 3', '2x + 3x'],
    correctIndex: 0,
    hint: 'Primero distribuye: 2x + 6, luego suma el x extra: 2x + x + 6 = 3x + 6',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('matching');

  // Matching phase state
  const [pairs, setPairs] = useState(MATCHING_PAIRS);
  const [selectedExpression, setSelectedExpression] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [matchFeedback, setMatchFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  // Simplify phase state
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const allMatched = pairs.every(p => p.matched);
  const simplifyProblem = SIMPLIFY_PROBLEMS[currentProblem];

  // Matching handlers
  const handleSelectExpression = (id: string) => {
    if (pairs.find(p => p.id === id)?.matched) return;
    setSelectedExpression(id);
    setMatchFeedback(null);

    if (selectedResult) {
      checkMatch(id, selectedResult);
    }
  };

  const handleSelectResult = (result: string) => {
    if (pairs.find(p => p.result === result)?.matched) return;
    setSelectedResult(result);
    setMatchFeedback(null);

    if (selectedExpression) {
      checkMatch(selectedExpression, result);
    }
  };

  const checkMatch = (expressionId: string, result: string) => {
    const pair = pairs.find(p => p.id === expressionId);
    if (pair && pair.result === result) {
      setPairs(prev => prev.map(p => p.id === expressionId ? { ...p, matched: true } : p));
      setMatchFeedback({ message: '¡Correcto!', isError: false });
    } else {
      setMatchFeedback({ message: 'Intenta de nuevo', isError: true });
    }
    setSelectedExpression(null);
    setSelectedResult(null);
  };

  // Simplify handlers
  const handleSelectOption = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentProblem < SIMPLIFY_PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setPhase('complete');
    }
  };

  const isCorrect = selectedAnswer === simplifyProblem?.correctIndex;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Distribuidor
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'matching' && 'Une cada expresión con su forma distribuida'}
          {phase === 'simplify' && 'Simplifica estas expresiones'}
          {phase === 'complete' && '¡Excelente trabajo!'}
        </p>
      </div>

      {phase === 'matching' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Instructions */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center">
            <p className="text-purple-800 dark:text-purple-200">
              Selecciona una expresión de la izquierda, luego su resultado a la derecha
            </p>
          </div>

          {/* Matching grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left column - expressions */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 text-center">Expresiones</p>
              {pairs.map(pair => (
                <button
                  key={pair.id}
                  onClick={() => handleSelectExpression(pair.id)}
                  disabled={pair.matched}
                  className={cn(
                    'w-full p-4 rounded-xl font-mono text-lg font-bold transition-all border-2',
                    pair.matched
                      ? 'bg-green-100 dark:bg-green-900/30 border-green-400 text-green-700 dark:text-green-300'
                      : selectedExpression === pair.id
                      ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-700 dark:text-purple-300'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-purple-400'
                  )}
                >
                  {pair.matched ? <Check className="inline mr-2" size={18} /> : null}
                  {pair.expression}
                </button>
              ))}
            </div>

            {/* Right column - results */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 text-center">Resultados</p>
              {/* Shuffle results for display */}
              {[...pairs].sort(() => 0.5 - Math.random()).map(pair => (
                <button
                  key={pair.result}
                  onClick={() => handleSelectResult(pair.result)}
                  disabled={pair.matched}
                  className={cn(
                    'w-full p-4 rounded-xl font-mono text-lg font-bold transition-all border-2',
                    pair.matched
                      ? 'bg-green-100 dark:bg-green-900/30 border-green-400 text-green-700 dark:text-green-300'
                      : selectedResult === pair.result
                      ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-700 dark:text-purple-300'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-purple-400'
                  )}
                >
                  {pair.matched ? <Check className="inline mr-2" size={18} /> : null}
                  {pair.result}
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="text-center text-gray-500 dark:text-gray-400">
            {pairs.filter(p => p.matched).length} / {pairs.length} parejas encontradas
          </div>

          {/* Feedback - shown at bottom to not interrupt flow */}
          {matchFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl text-center animate-fadeIn',
                matchFeedback.isError
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              )}
            >
              {matchFeedback.isError ? <X className="inline mr-2" size={20} /> : <Check className="inline mr-2" size={20} />}
              {matchFeedback.message}
            </div>
          )}

          {/* Continue button */}
          {allMatched && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('simplify')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Práctica de Simplificación</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'simplify' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {SIMPLIFY_PROBLEMS.length}
            </div>
            <div className="flex gap-1">
              {SIMPLIFY_PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                    i < currentProblem
                      ? 'bg-green-500 text-white'
                      : i === currentProblem
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < currentProblem ? '✓' : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-center">Simplifica:</p>
            <p className="text-3xl font-mono font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              {simplifyProblem.expression}
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {simplifyProblem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl font-mono font-bold text-lg transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === simplifyProblem.correctIndex
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : showFeedback && index === simplifyProblem.correctIndex
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Hint on wrong answer */}
            {showFeedback && !isCorrect && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    {simplifyProblem.hint}
                  </p>
                </div>
              </div>
            )}

            {/* Feedback on correct */}
            {showFeedback && isCorrect && (
              <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <p className="text-green-800 dark:text-green-200 font-medium">¡Correcto!</p>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
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
                <span>{currentProblem < SIMPLIFY_PROBLEMS.length - 1 ? 'Siguiente' : 'Completar'}</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Success message */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ¡Excelente! Dominas la distribución básica
              </h3>
            </div>

            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p><strong>Lo que practicaste:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Distribuir un factor positivo</li>
                <li>Distribuir un factor negativo</li>
                <li>Manejar signos dentro del paréntesis</li>
                <li>Combinar distribución con términos semejantes</li>
              </ul>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar al Desafío</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
