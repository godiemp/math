'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'matching' | 'simplify' | 'complete';

interface SimplifyProblem {
  expression: string;
  answer: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

const SIMPLIFY_PROBLEMS: SimplifyProblem[] = [
  {
    expression: '3x + 2x',
    answer: '5x',
    options: ['5x', '5x²', '6x', '5'],
    correctIndex: 0,
    hint: '3 + 2 = 5, mantiene la x',
  },
  {
    expression: '5y - 2y',
    answer: '3y',
    options: ['3y', '7y', '3', '-3y'],
    correctIndex: 0,
    hint: '5 - 2 = 3',
  },
  {
    expression: '4m + 3m - 2m',
    answer: '5m',
    options: ['5m', '9m', '5m²', '1m'],
    correctIndex: 0,
    hint: '4 + 3 - 2 = 5',
  },
  {
    expression: '2x + 3y + 5x',
    answer: '7x + 3y',
    options: ['7x + 3y', '10xy', '5x + 5y', '10x'],
    correctIndex: 0,
    hint: 'Agrupa: (2x + 5x) + 3y = 7x + 3y',
  },
  {
    expression: '3x² + 2x + x²',
    answer: '4x² + 2x',
    options: ['4x² + 2x', '6x³', '5x² + x', '4x² + 2x²'],
    correctIndex: 0,
    hint: 'x² y x son diferentes: (3x² + x²) + 2x',
  },
];

// Grid of terms for matching game - 4 pairs (shuffled for challenge)
const MATCHING_TERMS = [
  { id: '1', term: '3x²', group: 'A' },
  { id: '2', term: '4y', group: 'B' },
  { id: '3', term: '-5y²', group: 'D' },
  { id: '4', term: '5x', group: 'C' },
  { id: '5', term: '-7y', group: 'B' },
  { id: '6', term: '-x', group: 'C' },
  { id: '7', term: '2y²', group: 'D' },
  { id: '8', term: 'x²', group: 'A' },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('matching');

  // Matching game state
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [matchFeedback, setMatchFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  // Simplify state
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const problem = SIMPLIFY_PROBLEMS[currentProblem];

  // Matching game handlers
  const handleSelectTerm = (termId: string) => {
    if (matchedPairs.has(termId)) return;

    const newSelected = [...selectedTerms];

    if (newSelected.includes(termId)) {
      // Deselect
      setSelectedTerms(newSelected.filter(id => id !== termId));
      setMatchFeedback(null);
      return;
    }

    if (newSelected.length >= 2) {
      // Already have 2 selected, reset
      newSelected.length = 0;
    }

    newSelected.push(termId);
    setSelectedTerms(newSelected);

    if (newSelected.length === 2) {
      // Check if they match
      const term1 = MATCHING_TERMS.find(t => t.id === newSelected[0]);
      const term2 = MATCHING_TERMS.find(t => t.id === newSelected[1]);

      if (term1 && term2 && term1.group === term2.group) {
        // Match!
        setMatchedPairs(prev => new Set([...prev, newSelected[0], newSelected[1]]));
        setMatchFeedback({ message: '¡Correcto! Son términos semejantes.', isError: false });
        setSelectedTerms([]);
      } else {
        // No match
        setMatchFeedback({ message: 'No son semejantes. Fíjate en la variable y exponente.', isError: true });
        setTimeout(() => {
          setSelectedTerms([]);
          setMatchFeedback(null);
        }, 1500);
      }
    }
  };

  const allMatched = matchedPairs.size === MATCHING_TERMS.length;

  // Simplify handlers
  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);

    if (selectedAnswer === problem.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentProblem < SIMPLIFY_PROBLEMS.length - 1) {
        setCurrentProblem(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setPhase('complete');
      }
    }, 2000);
  };

  const isCorrect = selectedAnswer === problem?.correctIndex;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Clasificador
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'matching' && 'Encuentra pares de términos semejantes'}
          {phase === 'simplify' && 'Simplifica las expresiones'}
          {phase === 'complete' && '¡Excelente trabajo!'}
        </p>
      </div>

      {phase === 'matching' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Feedback */}
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

          {/* Instructions */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center">
            <p className="text-purple-700 dark:text-purple-300">
              Selecciona <strong>dos términos semejantes</strong> para hacer un par
            </p>
          </div>

          {/* Grid of terms */}
          <div className="grid grid-cols-4 gap-3">
            {MATCHING_TERMS.map(term => (
              <button
                key={term.id}
                onClick={() => handleSelectTerm(term.id)}
                disabled={matchedPairs.has(term.id)}
                className={cn(
                  'p-4 rounded-xl font-mono font-bold text-lg transition-all',
                  matchedPairs.has(term.id)
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-2 border-green-400'
                    : selectedTerms.includes(term.id)
                    ? 'bg-purple-500 text-white ring-4 ring-purple-300 dark:ring-purple-700'
                    : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 text-gray-800 dark:text-gray-200'
                )}
              >
                {matchedPairs.has(term.id) ? <Check className="mx-auto" /> : term.term}
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="text-center text-gray-500 dark:text-gray-400">
            {matchedPairs.size / 2} / {MATCHING_TERMS.length / 2} pares encontrados
          </div>

          {/* Continue button */}
          {allMatched && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('simplify')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Ahora a Simplificar</span>
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
            <p className="text-gray-600 dark:text-gray-400 mb-2">Simplifica:</p>
            <p className="text-3xl font-mono font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              {problem.expression}
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {problem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl font-mono font-bold text-lg transition-all border-2',
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
                      {problem.hint}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Check button */}
          {!showFeedback && (
            <div className="flex justify-center">
              <button
                onClick={handleCheckAnswer}
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
            </div>
          )}
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Results */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-8 text-center border border-green-200 dark:border-green-800">
            <Sparkles className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              ¡Buen trabajo!
            </h3>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {correctCount} / {SIMPLIFY_PROBLEMS.length}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              ejercicios correctos
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
