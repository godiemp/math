'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, ArrowUp, ArrowDown, Sparkles, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassifyProblem {
  id: string;
  problem: string;
  var1: string;
  var2: string;
  correctType: 'direct' | 'inverse';
  explanation: string;
  answered: boolean;
  isCorrect: boolean | null;
}

const CLASSIFY_PROBLEMS: ClassifyProblem[] = [
  {
    id: '1',
    problem: 'Una fábrica produce piezas. Cuantas más máquinas trabajan, más piezas se producen en el mismo tiempo.',
    var1: 'Máquinas',
    var2: 'Piezas producidas',
    correctType: 'direct',
    explanation: 'Más máquinas = Más piezas. Ambas cantidades aumentan juntas → Directa',
    answered: false,
    isCorrect: null,
  },
  {
    id: '2',
    problem: 'Un camión debe recorrer 200 km. Cuanto más rápido vaya, menos tiempo tardará en llegar.',
    var1: 'Velocidad',
    var2: 'Tiempo',
    correctType: 'inverse',
    explanation: 'Más velocidad = Menos tiempo. Una aumenta y la otra disminuye → Inversa',
    answered: false,
    isCorrect: null,
  },
  {
    id: '3',
    problem: 'En una tienda, cuantos más productos compras, más pagas (el precio por unidad es fijo).',
    var1: 'Productos',
    var2: 'Precio total',
    correctType: 'direct',
    explanation: 'Más productos = Más costo. Ambas cantidades aumentan juntas → Directa',
    answered: false,
    isCorrect: null,
  },
  {
    id: '4',
    problem: 'Un grifo llena una piscina. Si abren más grifos iguales, la piscina se llena en menos tiempo.',
    var1: 'Grifos',
    var2: 'Tiempo de llenado',
    correctType: 'inverse',
    explanation: 'Más grifos = Menos tiempo. Una aumenta y la otra disminuye → Inversa',
    answered: false,
    isCorrect: null,
  },
  {
    id: '5',
    problem: 'Un conductor paga peaje según los kilómetros recorridos en la autopista.',
    var1: 'Kilómetros',
    var2: 'Costo del peaje',
    correctType: 'direct',
    explanation: 'Más kilómetros = Más costo. Ambas cantidades aumentan juntas → Directa',
    answered: false,
    isCorrect: null,
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [problems, setProblems] = useState(CLASSIFY_PROBLEMS);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const problem = problems[currentProblem];
  const correctCount = problems.filter((p) => p.isCorrect).length;
  const passed = correctCount >= 4;

  const handleSelectType = (type: 'direct' | 'inverse') => {
    if (problem.answered) return;

    const isCorrect = type === problem.correctType;

    setProblems((prev) =>
      prev.map((p, i) => (i === currentProblem ? { ...p, answered: true, isCorrect } : p))
    );
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem((prev) => prev + 1);
    } else {
      setShowComplete(true);
    }
  };

  const handleReset = () => {
    setProblems(CLASSIFY_PROBLEMS);
    setCurrentProblem(0);
    setShowComplete(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica el Tipo de Proporcionalidad
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {!showComplete
            ? `Necesitas 4 de ${problems.length} correctas para avanzar`
            : '¡Resultados!'}
        </p>
      </div>

      {!showComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {problems.length}
            </div>
            <div className="flex gap-1">
              {problems.map((p, i) => (
                <div
                  key={p.id}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    p.answered
                      ? p.isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentProblem
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {p.answered ? (p.isCorrect ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 text-center">
              {problem.problem}
            </p>

            {/* Variables */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
                <span className="text-blue-700 dark:text-blue-300 font-semibold">{problem.var1}</span>
              </div>
              <span className="text-gray-400 text-2xl">↔</span>
              <div className="bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-lg">
                <span className="text-purple-700 dark:text-purple-300 font-semibold">
                  {problem.var2}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
              ¿Qué tipo de proporcionalidad es?
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSelectType('direct')}
                disabled={problem.answered}
                className={cn(
                  'p-4 rounded-xl font-bold text-lg transition-all border-2',
                  problem.answered
                    ? problem.correctType === 'direct'
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400'
                    : 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 hover:border-green-500 text-green-700 dark:text-green-300'
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-5 h-5" />
                    <ArrowUp className="w-5 h-5" />
                  </div>
                  <span>Directa</span>
                </div>
              </button>

              <button
                onClick={() => handleSelectType('inverse')}
                disabled={problem.answered}
                className={cn(
                  'p-4 rounded-xl font-bold text-lg transition-all border-2',
                  problem.answered
                    ? problem.correctType === 'inverse'
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400'
                    : 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 hover:border-orange-500 text-orange-700 dark:text-orange-300'
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-5 h-5" />
                    <ArrowDown className="w-5 h-5" />
                  </div>
                  <span>Inversa</span>
                </div>
              </button>
            </div>

            {/* Feedback */}
            {problem.answered && (
              <div
                className={cn(
                  'mt-4 p-4 rounded-xl animate-fadeIn',
                  problem.isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
                )}
              >
                <div className="flex items-start gap-3">
                  {problem.isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <p
                      className={cn(
                        'font-bold',
                        problem.isCorrect
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-amber-700 dark:text-amber-300'
                      )}
                    >
                      {problem.isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {problem.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Next button */}
          {problem.answered && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentProblem < problems.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
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
              {passed ? '¡Excelente!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {problems.length}
            </div>

            <p
              className={cn(
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed
                ? 'Has demostrado que puedes identificar el tipo de proporcionalidad'
                : `Necesitas 4 respuestas correctas. ¡Puedes intentarlo de nuevo!`}
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
