'use client';

import { useState } from 'react';
import { ArrowRight, ArrowUp, ArrowDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface MagnitudeAnalysis {
  id: string;
  name: string;
  from: string;
  to: string;
  direction: 'up' | 'down';
  effectOnResult: 'direct' | 'inverse';
  userAnswer: 'direct' | 'inverse' | null;
  isCorrect: boolean | null;
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [magnitudes, setMagnitudes] = useState<MagnitudeAnalysis[]>([
    {
      id: 'workers',
      name: 'Carpinteros',
      from: '8',
      to: '12',
      direction: 'up',
      effectOnResult: 'direct',
      userAnswer: null,
      isCorrect: null,
    },
    {
      id: 'hours',
      name: 'Horas/día',
      from: '6',
      to: '8',
      direction: 'up',
      effectOnResult: 'direct',
      userAnswer: null,
      isCorrect: null,
    },
    {
      id: 'days',
      name: 'Días',
      from: '5',
      to: '10',
      direction: 'up',
      effectOnResult: 'direct',
      userAnswer: null,
      isCorrect: null,
    },
  ]);
  const [showSolution, setShowSolution] = useState(false);

  if (!isActive) return null;

  const allAnswered = magnitudes.every((m) => m.userAnswer !== null);
  const allCorrect = magnitudes.every((m) => m.isCorrect === true);

  const handleSelectAnswer = (id: string, answer: 'direct' | 'inverse') => {
    setMagnitudes((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const isCorrect = answer === m.effectOnResult;
          return { ...m, userAnswer: answer, isCorrect };
        }
        return m;
      })
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Analiza cómo cada magnitud afecta al resultado
        </p>
      </div>

      {/* Context reminder */}
      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4">
        <p className="text-amber-800 dark:text-amber-200 text-sm">
          <strong>Recuerda:</strong> Queremos saber cuántas <strong>sillas</strong> se producirán.
          Para cada magnitud, pregúntate: si aumenta, ¿las sillas aumentan (directa) o disminuyen
          (inversa)?
        </p>
      </div>

      {/* Magnitude analysis */}
      <div className="space-y-4">
        {magnitudes.map((mag) => (
          <div
            key={mag.id}
            className={cn(
              'bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md transition-all',
              mag.isCorrect === true && 'ring-2 ring-green-500',
              mag.isCorrect === false && 'ring-2 ring-red-500'
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {mag.name}
                </span>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {mag.from}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 rounded text-purple-700 dark:text-purple-300">
                    {mag.to}
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold',
                  mag.direction === 'up'
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                    : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                )}
              >
                {mag.direction === 'up' ? (
                  <>
                    <ArrowUp className="w-4 h-4" />
                    <span>Aumenta</span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="w-4 h-4" />
                    <span>Disminuye</span>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
              Si {mag.name.toLowerCase()} aumenta, ¿qué pasa con las sillas producidas?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => handleSelectAnswer(mag.id, 'direct')}
                disabled={mag.userAnswer !== null}
                className={cn(
                  'flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2',
                  mag.userAnswer === 'direct'
                    ? mag.isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50',
                  mag.userAnswer !== null && 'cursor-not-allowed'
                )}
              >
                <ArrowUp className="w-4 h-4" />
                <span>Aumentan (Directa)</span>
                {mag.userAnswer === 'direct' && mag.isCorrect && <Check className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleSelectAnswer(mag.id, 'inverse')}
                disabled={mag.userAnswer !== null}
                className={cn(
                  'flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2',
                  mag.userAnswer === 'inverse'
                    ? mag.isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50',
                  mag.userAnswer !== null && 'cursor-not-allowed'
                )}
              >
                <ArrowDown className="w-4 h-4" />
                <span>Disminuyen (Inversa)</span>
                {mag.userAnswer === 'inverse' && mag.isCorrect && <Check className="w-4 h-4" />}
              </button>
            </div>

            {/* Feedback */}
            {mag.userAnswer !== null && (
              <div
                className={cn(
                  'mt-3 p-3 rounded-lg text-sm animate-fadeIn',
                  mag.isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                )}
              >
                {mag.isCorrect ? (
                  <p>
                    <strong>¡Correcto!</strong> Más {mag.name.toLowerCase()} = más producción.
                  </p>
                ) : (
                  <p>
                    <strong>Piénsalo así:</strong> Si hay más {mag.name.toLowerCase()}, ¿se pueden
                    hacer más sillas o menos? La respuesta es{' '}
                    <strong>{mag.effectOnResult === 'direct' ? 'más' : 'menos'}</strong>, por lo
                    tanto es <strong>{mag.effectOnResult === 'direct' ? 'directa' : 'inversa'}</strong>.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show solution button */}
      {allAnswered && !showSolution && (
        <div className="flex justify-center animate-fadeIn">
          <button
            onClick={() => setShowSolution(true)}
            className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-all"
          >
            Ver cómo se calcula
          </button>
        </div>
      )}

      {/* Solution */}
      {showSolution && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">
              Cálculo de la Proporcionalidad Compuesta
            </h3>

            <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 font-mono text-sm space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                Sillas = 120 × <span className="text-green-600">(12/8)</span> ×{' '}
                <span className="text-green-600">(8/6)</span> ×{' '}
                <span className="text-green-600">(10/5)</span>
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-green-600">↑directa</span>&nbsp;&nbsp;&nbsp;
                <span className="text-green-600">↑directa</span>&nbsp;&nbsp;&nbsp;
                <span className="text-green-600">↑directa</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Sillas = 120 × (3/2) × (4/3) × 2
              </p>
              <p className="text-gray-700 dark:text-gray-300">Sillas = 120 × 4 = <strong className="text-purple-600">480</strong></p>
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Clave:</strong> Cada magnitud <strong>directa</strong> pasa igual (12/8),
                cada magnitud <strong>inversa</strong> se invierte (se pondría 8/12).
              </p>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Aprender el método completo</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
