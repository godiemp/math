'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassifyProblem {
  id: string;
  situation: string;
  magnitudes: string;
  correctType: 'direct' | 'inverse';
  explanation: string;
  answered: boolean;
  isCorrect: boolean | null;
}

const CLASSIFY_PROBLEMS: ClassifyProblem[] = [
  {
    id: '1',
    situation: 'Comprar naranjas a $500 cada kilo',
    magnitudes: 'Kilos de naranjas vs Precio total',
    correctType: 'direct',
    explanation: 'Más kilos = más precio. Si compras el doble de kilos, pagas el doble.',
    answered: false,
    isCorrect: null,
  },
  {
    id: '2',
    situation: 'Repartir una pizza entre amigos',
    magnitudes: 'Número de amigos vs Pedazos por persona',
    correctType: 'inverse',
    explanation: 'Más amigos = menos pedazos cada uno. Si hay el doble de amigos, cada uno recibe la mitad.',
    answered: false,
    isCorrect: null,
  },
  {
    id: '3',
    situation: 'Un auto viaja a velocidad constante',
    magnitudes: 'Tiempo de viaje vs Distancia recorrida',
    correctType: 'direct',
    explanation: 'Más tiempo viajando = más distancia. Si viaja el doble de tiempo, recorre el doble.',
    answered: false,
    isCorrect: null,
  },
  {
    id: '4',
    situation: 'Llenar una piscina con mangueras',
    magnitudes: 'Número de mangueras vs Tiempo para llenar',
    correctType: 'inverse',
    explanation: 'Más mangueras = menos tiempo. Si usas el doble de mangueras, tardas la mitad.',
    answered: false,
    isCorrect: null,
  },
  {
    id: '5',
    situation: 'Trabajar horas extra con pago por hora',
    magnitudes: 'Horas trabajadas vs Sueldo total',
    correctType: 'direct',
    explanation: 'Más horas = más sueldo. Si trabajas el doble de horas, ganas el doble.',
    answered: false,
    isCorrect: null,
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [problems, setProblems] = useState(CLASSIFY_PROBLEMS);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const problem = problems[currentProblem];
  const correctCount = problems.filter(p => p.isCorrect).length;
  const allAnswered = problems.every(p => p.answered);

  const handleSelectType = (type: 'direct' | 'inverse') => {
    if (problem.answered) return;

    const isCorrect = type === problem.correctType;

    setProblems(prev => prev.map((p, i) =>
      i === currentProblem
        ? { ...p, answered: true, isCorrect }
        : p
    ));
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1);
    } else {
      setShowComplete(true);
    }
  };

  const handleReset = () => {
    setProblems(CLASSIFY_PROBLEMS);
    setCurrentProblem(0);
    setShowComplete(false);
  };

  const passed = correctCount >= 4;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica la Proporción
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
              Situación {currentProblem + 1} de {problems.length}
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
            {/* Situation */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 mb-4">
              <p className="text-lg text-gray-800 dark:text-gray-200 font-medium text-center">
                {problem.situation}
              </p>
            </div>

            {/* Magnitudes */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Magnitudes relacionadas:</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                {problem.magnitudes}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSelectType('direct')}
                disabled={problem.answered}
                className={cn(
                  'p-6 rounded-xl transition-all border-2 flex flex-col items-center gap-2',
                  problem.answered
                    ? problem.correctType === 'direct'
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
                    : 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 hover:border-green-500'
                )}
              >
                <TrendingUp className={cn(
                  'w-10 h-10',
                  problem.answered && problem.correctType === 'direct'
                    ? 'text-green-600'
                    : 'text-green-500'
                )} />
                <span className="font-bold text-green-700 dark:text-green-300">Directa</span>
                <span className="text-xs text-green-600 dark:text-green-400">
                  Ambas suben juntas
                </span>
              </button>

              <button
                onClick={() => handleSelectType('inverse')}
                disabled={problem.answered}
                className={cn(
                  'p-6 rounded-xl transition-all border-2 flex flex-col items-center gap-2',
                  problem.answered
                    ? problem.correctType === 'inverse'
                      ? 'bg-orange-100 dark:bg-orange-900/50 border-orange-500'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
                    : 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 hover:border-orange-500'
                )}
              >
                <TrendingDown className={cn(
                  'w-10 h-10',
                  problem.answered && problem.correctType === 'inverse'
                    ? 'text-orange-600'
                    : 'text-orange-500'
                )} />
                <span className="font-bold text-orange-700 dark:text-orange-300">Inversa</span>
                <span className="text-xs text-orange-600 dark:text-orange-400">
                  Una sube, otra baja
                </span>
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
                    <p className={cn('font-bold', problem.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
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
              <X className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Buen trabajo!' : '¡Casi lo logras!'}
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
                ? 'Has demostrado que puedes identificar tipos de proporciones'
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
                <X size={18} />
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
