'use client';

import { useState } from 'react';
import { ArrowRight, Check, Plus, Minus, X, Divide } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: string;
  text: string;
  keyword: string;
  correctOp: 'sum' | 'sub' | 'mul' | 'div';
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    text: '¿Cuánto VUELTO recibió después de pagar?',
    keyword: 'VUELTO',
    correctOp: 'sub',
  },
  {
    id: 'p2',
    text: 'Si compra 5 entradas de $2.000 CADA UNA, ¿cuánto paga?',
    keyword: 'CADA UNA',
    correctOp: 'mul',
  },
  {
    id: 'p3',
    text: '¿Cuántos kilómetros recorrieron ENTRE los dos hermanos?',
    keyword: 'ENTRE',
    correctOp: 'sum',
  },
  {
    id: 'p4',
    text: '¿A cuánto le toca si se REPARTE en partes iguales?',
    keyword: 'REPARTE',
    correctOp: 'div',
  },
  {
    id: 'p5',
    text: '¿Cuál es la DIFERENCIA de temperatura entre ambos días?',
    keyword: 'DIFERENCIA',
    correctOp: 'sub',
  },
];

const OPERATIONS = [
  { id: 'sum', name: 'Suma', icon: <Plus className="w-5 h-5" />, color: 'green' },
  { id: 'sub', name: 'Resta', icon: <Minus className="w-5 h-5" />, color: 'red' },
  { id: 'mul', name: 'Multiplicación', icon: <X className="w-5 h-5" />, color: 'blue' },
  { id: 'div', name: 'División', icon: <Divide className="w-5 h-5" />, color: 'amber' },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedOp, setSelectedOp] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);

  const problem = PROBLEMS[currentProblem];
  const isCorrect = selectedOp === problem?.correctOp;
  const allCompleted = completedProblems.length === PROBLEMS.length;

  const handleSelect = (opId: string) => {
    if (showFeedback) return;
    setSelectedOp(opId);
  };

  const handleCheck = () => {
    if (selectedOp === null) return;
    setShowFeedback(true);

    if (isCorrect && !completedProblems.includes(problem.id)) {
      setCompletedProblems([...completedProblems, problem.id]);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedOp(null);
      setShowFeedback(false);
    } else {
      // Last problem - mark as completed if correct
      if (isCorrect && !completedProblems.includes(problem.id)) {
        setCompletedProblems([...completedProblems, problem.id]);
      }
    }
  };

  const getOpColor = (opId: string, isSelected: boolean, isAnswer: boolean) => {
    const op = OPERATIONS.find((o) => o.id === opId);
    if (!op) return '';

    if (showFeedback) {
      if (isAnswer) {
        return `bg-${op.color}-100 dark:bg-${op.color}-900/40 border-${op.color}-500 ring-2 ring-${op.color}-500`;
      }
      if (isSelected && !isAnswer) {
        return 'bg-red-100 dark:bg-red-900/40 border-red-500';
      }
    }

    if (isSelected) {
      return `bg-${op.color}-100 dark:bg-${op.color}-900/40 border-${op.color}-500 scale-[1.02]`;
    }

    return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600';
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica la Operación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica qué operación necesitas según la palabra clave
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-1.5">
        {PROBLEMS.map((p, i) => (
          <div
            key={p.id}
            className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all',
              completedProblems.includes(p.id)
                ? 'bg-green-500 text-white'
                : i === currentProblem
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            )}
          >
            {completedProblems.includes(p.id) ? <Check size={12} /> : i + 1}
          </div>
        ))}
      </div>

      {!allCompleted ? (
        <>
          {/* Problem Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              {problem.text.split(problem.keyword).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded font-semibold">
                      {problem.keyword}
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Operation options */}
          <div className="grid grid-cols-2 gap-3">
            {OPERATIONS.map((op) => {
              const isSelected = selectedOp === op.id;
              const isAnswer = op.id === problem.correctOp;

              return (
                <button
                  key={op.id}
                  onClick={() => handleSelect(op.id)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all flex items-center gap-3',
                    showFeedback && isAnswer
                      ? op.color === 'green'
                        ? 'bg-green-100 dark:bg-green-900/40 border-green-500 ring-2 ring-green-500'
                        : op.color === 'red'
                        ? 'bg-red-100 dark:bg-red-900/40 border-red-500 ring-2 ring-red-500'
                        : op.color === 'blue'
                        ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-500 ring-2 ring-blue-500'
                        : 'bg-amber-100 dark:bg-amber-900/40 border-amber-500 ring-2 ring-amber-500'
                      : showFeedback && isSelected && !isAnswer
                      ? 'bg-gray-100 dark:bg-gray-700 border-gray-400'
                      : isSelected
                      ? op.color === 'green'
                        ? 'bg-green-100 dark:bg-green-900/40 border-green-500 scale-[1.02]'
                        : op.color === 'red'
                        ? 'bg-red-100 dark:bg-red-900/40 border-red-500 scale-[1.02]'
                        : op.color === 'blue'
                        ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-500 scale-[1.02]'
                        : 'bg-amber-100 dark:bg-amber-900/40 border-amber-500 scale-[1.02]'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      op.color === 'green'
                        ? 'bg-green-500 text-white'
                        : op.color === 'red'
                        ? 'bg-red-500 text-white'
                        : op.color === 'blue'
                        ? 'bg-blue-500 text-white'
                        : 'bg-amber-500 text-white'
                    )}
                  >
                    {op.icon}
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{op.name}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl border-2 animate-fadeIn',
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
              )}
            >
              <p className={cn(
                'font-semibold',
                isCorrect ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'
              )}>
                {isCorrect ? '¡Correcto!' : '¡Casi!'}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                La palabra &quot;<strong>{problem.keyword}</strong>&quot; indica{' '}
                <strong>{OPERATIONS.find((o) => o.id === problem.correctOp)?.name}</strong>.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedOp === null}
                className={cn(
                  'px-6 py-3 rounded-xl font-semibold transition-all',
                  selectedOp !== null
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 shadow-lg transition-all"
              >
                <span>Siguiente</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </>
      ) : (
        /* Completion screen */
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
              ¡Excelente trabajo!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Ya sabes identificar qué operación usar según las palabras clave.
            </p>
          </div>

          {/* Quick reference */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Palabras clave:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">total, juntos, entre</span>
              </div>
              <div className="flex items-center gap-2">
                <Minus className="w-4 h-4 text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">vuelto, diferencia, sobra</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">cada uno, doble, veces</span>
              </div>
              <div className="flex items-center gap-2">
                <Divide className="w-4 h-4 text-amber-500" />
                <span className="text-gray-600 dark:text-gray-400">repartir, por partes</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
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
