'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'matching' | 'solving' | 'complete';

interface MatchItem {
  expression: string;
  type: 'cuadrado' | 'suma-diferencia' | 'termino-comun';
  matched: boolean;
}

interface Problem {
  expression: string;
  options: string[];
  correctIndex: number;
  type: 'cuadrado' | 'suma-diferencia' | 'termino-comun';
}

const MATCH_ITEMS: MatchItem[] = [
  { expression: '(m + 4)²', type: 'cuadrado', matched: false },
  { expression: '(a - 3)(a + 3)', type: 'suma-diferencia', matched: false },
  { expression: '(x + 1)(x + 6)', type: 'termino-comun', matched: false },
  { expression: '(2y - 5)²', type: 'cuadrado', matched: false },
  { expression: '(p + 7)(p - 7)', type: 'suma-diferencia', matched: false },
  { expression: '(n - 2)(n - 8)', type: 'termino-comun', matched: false },
];

const PROBLEMS: Problem[] = [
  {
    expression: '(x + 5)²',
    options: ['x² + 25', 'x² + 5x + 25', 'x² + 10x + 25', '2x + 10'],
    correctIndex: 2,
    type: 'cuadrado',
  },
  {
    expression: '(y - 4)(y + 4)',
    options: ['y² - 16', 'y² + 16', 'y² - 8y - 16', 'y² + 8y + 16'],
    correctIndex: 0,
    type: 'suma-diferencia',
  },
  {
    expression: '(x + 3)(x + 7)',
    options: ['x² + 21', 'x² + 10x + 21', 'x² + 10x + 10', 'x² + 21x + 10'],
    correctIndex: 1,
    type: 'termino-comun',
  },
  {
    expression: '(2a - 1)²',
    options: ['4a² - 4a + 1', '2a² - 2a + 1', '4a² - 1', '4a² + 1'],
    correctIndex: 0,
    type: 'cuadrado',
  },
  {
    expression: '(3x + 2)(3x - 2)',
    options: ['9x² + 4', '9x² - 4', '6x² - 4', '9x² - 12x - 4'],
    correctIndex: 1,
    type: 'suma-diferencia',
  },
];

const TYPE_LABELS = {
  'cuadrado': 'Cuadrado de binomio',
  'suma-diferencia': 'Suma por diferencia',
  'termino-comun': 'Término común',
};

const TYPE_COLORS = {
  'cuadrado': 'blue',
  'suma-diferencia': 'green',
  'termino-comun': 'purple',
};

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('matching');
  const [matchItems, setMatchItems] = useState<MatchItem[]>(MATCH_ITEMS);
  const [selectedExpression, setSelectedExpression] = useState<number | null>(null);

  // Problem solving state
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const allMatched = matchItems.every(item => item.matched);
  const problem = PROBLEMS[currentProblem];

  const handleTypeSelect = (type: 'cuadrado' | 'suma-diferencia' | 'termino-comun') => {
    if (selectedExpression === null) return;

    const item = matchItems[selectedExpression];
    if (item.type === type) {
      setMatchItems(prev => prev.map((m, i) =>
        i === selectedExpression ? { ...m, matched: true } : m
      ));
    }
    setSelectedExpression(null);
  };

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === problem.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
    } else {
      setPhase('complete');
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'matching' && 'Clasifica cada expresión según su tipo'}
          {phase === 'solving' && 'Simplifica usando el producto notable correcto'}
          {phase === 'complete' && '¡Excelente trabajo!'}
        </p>
      </div>

      {/* PHASE 1: Matching */}
      {phase === 'matching' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Instructions */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700 text-center">
            <p className="text-purple-800 dark:text-purple-200">
              Selecciona una expresión y luego elige su tipo de producto notable
            </p>
          </div>

          {/* Expressions grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {matchItems.map((item, index) => (
              <button
                key={index}
                onClick={() => !item.matched && setSelectedExpression(selectedExpression === index ? null : index)}
                disabled={item.matched}
                className={cn(
                  'p-4 rounded-xl font-mono text-lg transition-all border-2',
                  item.matched
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-400 text-green-700 dark:text-green-300'
                    : selectedExpression === index
                    ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200 ring-4 ring-purple-300'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400'
                )}
              >
                {item.matched && <Check className="inline w-4 h-4 mr-2" />}
                {item.expression}
              </button>
            ))}
          </div>

          {/* Type buttons */}
          {selectedExpression !== null && (
            <div className="space-y-3 animate-fadeIn">
              <p className="text-center text-gray-600 dark:text-gray-400 font-medium">
                ¿Qué tipo de producto notable es?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handleTypeSelect('cuadrado')}
                  className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-xl font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors border-2 border-blue-300 dark:border-blue-700"
                >
                  Cuadrado de binomio
                </button>
                <button
                  onClick={() => handleTypeSelect('suma-diferencia')}
                  className="px-6 py-3 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-xl font-medium hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors border-2 border-green-300 dark:border-green-700"
                >
                  Suma por diferencia
                </button>
                <button
                  onClick={() => handleTypeSelect('termino-comun')}
                  className="px-6 py-3 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-xl font-medium hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors border-2 border-purple-300 dark:border-purple-700"
                >
                  Término común
                </button>
              </div>
            </div>
          )}

          {/* Continue button */}
          {allMatched && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('solving')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Ahora a simplificar</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: Solving */}
      {phase === 'solving' && (
        <div className="space-y-6 animate-fadeIn">
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Simplifica:</p>
              <p className="font-mono text-3xl text-gray-900 dark:text-white">
                {problem.expression}
              </p>
              <span className={cn(
                'inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium',
                problem.type === 'cuadrado' && 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
                problem.type === 'suma-diferencia' && 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
                problem.type === 'termino-comun' && 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
              )}>
                {TYPE_LABELS[problem.type]}
              </span>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {problem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl text-left font-mono text-lg transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === problem.correctIndex
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : showFeedback && index === problem.correctIndex
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                        selectedAnswer === index
                          ? showFeedback
                            ? index === problem.correctIndex
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-purple-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      )}
                    >
                      {showFeedback && index === problem.correctIndex ? (
                        <Check size={16} />
                      ) : showFeedback && selectedAnswer === index && index !== problem.correctIndex ? (
                        <X size={16} />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">{option}</span>
                  </div>
                </button>
              ))}
            </div>
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
                <span>{currentProblem < PROBLEMS.length - 1 ? 'Siguiente' : 'Continuar'}</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* PHASE 3: Complete */}
      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-8 text-center border border-green-200 dark:border-green-800">
            <Sparkles className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Bien hecho!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Obtuviste {correctCount} de {PROBLEMS.length} correctas en la práctica
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Continuar a práctica</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
