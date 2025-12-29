'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'Calcula: log₁₀(10000)',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    hint: 'Cuenta los ceros: 10000 tiene 4 ceros',
    explanation: '10⁴ = 10000, entonces log₁₀(10000) = 4',
  },
  {
    id: 'p2',
    question: 'Calcula: log₂(16)',
    options: ['2', '3', '4', '8'],
    correctAnswer: 2,
    hint: '2 × 2 × 2 × 2 = ?',
    explanation: '2⁴ = 16, entonces log₂(16) = 4',
  },
  {
    id: 'p3',
    question: 'Convierte 4³ = 64 a forma logarítmica',
    options: ['log₄(64) = 3', 'log₃(64) = 4', 'log₆₄(4) = 3', 'log₄(3) = 64'],
    correctAnswer: 0,
    hint: 'La base del logaritmo es la base de la potencia',
    explanation: 'En 4³ = 64, la base es 4, el exponente es 3, el resultado es 64',
  },
  {
    id: 'p4',
    question: 'Si log₅(x) = 2, ¿cuál es x?',
    options: ['10', '25', '32', '125'],
    correctAnswer: 1,
    hint: 'log₅(x) = 2 significa que 5² = x',
    explanation: '5² = 25, entonces x = 25',
  },
  {
    id: 'p5',
    question: 'Calcula: log₃(81)',
    options: ['2', '3', '4', '27'],
    correctAnswer: 2,
    hint: '3 × 3 × 3 × 3 = ?',
    explanation: '3⁴ = 81, entonces log₃(81) = 4',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<{ id: string; correct: boolean }[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  if (!isActive) return null;

  const problem = PROBLEMS[currentProblem];
  const isCorrect = selectedAnswer === problem?.correctAnswer;

  const handleCheck = () => {
    setShowFeedback(true);
    const newResults = [...results, { id: problem.id, correct: isCorrect }];
    setResults(newResults);

    setTimeout(() => {
      if (currentProblem < PROBLEMS.length - 1) {
        setCurrentProblem(currentProblem + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowHint(false);
      } else {
        setIsComplete(true);
      }
    }, 2000);
  };

  const correctCount = results.filter(r => r.correct).length;

  // ============ COMPLETION SCREEN ============
  if (isComplete) {
    const finalCorrect = results.filter(r => r.correct).length;
    const passed = finalCorrect >= 4;

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
            passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
          )}>
            {passed ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 dark:text-green-300 font-medium">
                  ¡Excelente dominio!
                </span>
              </>
            ) : (
              <span className="text-amber-700 dark:text-amber-300 font-medium">
                ¡Sigue practicando!
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Práctica Completada
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Acertaste {finalCorrect} de {PROBLEMS.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className={cn(
              'h-full transition-all rounded-full',
              passed ? 'bg-green-500' : 'bg-amber-500'
            )}
            style={{ width: `${(finalCorrect / PROBLEMS.length) * 100}%` }}
          />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-5 gap-2">
          {PROBLEMS.map((p, i) => {
            const result = results.find(r => r.id === p.id);
            return (
              <div
                key={p.id}
                className={cn(
                  'p-3 rounded-lg text-center',
                  result?.correct
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-red-100 dark:bg-red-900/30'
                )}
              >
                {result?.correct ? (
                  <Check className="w-5 h-5 text-green-600 mx-auto" />
                ) : (
                  <X className="w-5 h-5 text-red-600 mx-auto" />
                )}
                <p className="text-xs text-gray-500 mt-1">P{i + 1}</p>
              </div>
            );
          })}
        </div>

        {/* Key formulas */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-center text-blue-800 dark:text-blue-200 font-semibold mb-2">
            Recuerda siempre:
          </p>
          <p className="text-center font-mono text-gray-700 dark:text-gray-300">
            log<sub>b</sub>(x) = y ⟺ b<sup>y</sup> = x
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Ir al checkpoint final</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PRACTICE SCREEN ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Calcula y Convierte
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Problema {currentProblem + 1} de {PROBLEMS.length}
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {PROBLEMS.map((p, i) => (
          <div
            key={p.id}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i < currentProblem
                ? results[i]?.correct ? 'bg-green-500' : 'bg-red-500'
                : i === currentProblem
                ? 'bg-purple-500 scale-125'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Question */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
        <p className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          {problem.question}
        </p>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {problem.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl border-2 font-mono text-lg transition-all',
                showFeedback
                  ? index === problem.correctAnswer
                    ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-700'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-700'
                    : 'border-gray-200 dark:border-gray-700 text-gray-400'
                  : selectedAnswer === index
                  ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-700'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 text-gray-700 dark:text-gray-300'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Hint */}
      {showHint && !showFeedback && (
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700 animate-fadeIn">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              <strong>Pista:</strong> {problem.hint}
            </p>
          </div>
        </div>
      )}

      {!showHint && !showFeedback && (
        <button
          onClick={() => setShowHint(true)}
          className="mx-auto flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <HelpCircle size={16} />
          <span>Mostrar pista</span>
        </button>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div className={cn(
          'p-4 rounded-xl animate-fadeIn',
          isCorrect
            ? 'bg-green-100 dark:bg-green-900/30'
            : 'bg-red-100 dark:bg-red-900/30'
        )}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={cn(
                'font-semibold',
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              )}>
                {isCorrect ? '¡Correcto!' : 'No exactamente'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {problem.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Check button */}
      {!showFeedback && (
        <div className="flex justify-center">
          <button
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all',
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
  );
}
