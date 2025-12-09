'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeftRight, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'to-mixed' | 'to-improper' | 'key-points';

// Simple fraction bar for visualization
function FractionBar({
  numerator,
  denominator,
  color = 'blue',
}: {
  numerator: number;
  denominator: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}) {
  const colorClasses = {
    blue: {
      filled: 'bg-blue-500 dark:bg-blue-600',
      empty: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-700 dark:border-blue-400',
    },
    green: {
      filled: 'bg-green-500 dark:bg-green-600',
      empty: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-700 dark:border-green-400',
    },
    purple: {
      filled: 'bg-purple-500 dark:bg-purple-600',
      empty: 'bg-purple-100 dark:bg-purple-900/30',
      border: 'border-purple-700 dark:border-purple-400',
    },
    orange: {
      filled: 'bg-orange-500 dark:bg-orange-600',
      empty: 'bg-orange-100 dark:bg-orange-900/30',
      border: 'border-orange-700 dark:border-orange-400',
    },
  };

  const colors = colorClasses[color];
  const wholeBars = Math.ceil(numerator / denominator);
  let remainingToFill = numerator;

  return (
    <div className="space-y-1">
      {Array.from({ length: wholeBars }).map((_, barIndex) => {
        const segmentsToFill = Math.min(remainingToFill, denominator);
        remainingToFill -= segmentsToFill;

        return (
          <div
            key={barIndex}
            className={cn(
              'relative h-6 rounded overflow-hidden border',
              colors.border,
            )}
          >
            <div className="flex h-full">
              {Array.from({ length: denominator }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex-1 h-full',
                    i < segmentsToFill ? colors.filled : colors.empty,
                    i > 0 && 'border-l',
                    colors.border,
                  )}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [showConversion, setShowConversion] = useState(false);

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Dos Formas, Un Número
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Fracciones impropias y números mixtos
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Las fracciones mayores que 1 se pueden escribir de{' '}
              <strong>dos formas diferentes</strong>:
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-6">
            {/* Improper fraction */}
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Fracción impropia
              </div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                7/4
              </div>
            </div>

            <ArrowLeftRight className="w-8 h-8 text-gray-400 rotate-0 md:rotate-0" />

            {/* Mixed number */}
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Número mixto
              </div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                1 <sup className="text-2xl">3</sup>/<sub className="text-2xl">4</sub>
              </div>
            </div>
          </div>

          <div className="w-48 mx-auto">
            <FractionBar numerator={7} denominator={4} color="purple" />
          </div>

          <p className="text-center text-purple-700 dark:text-purple-300 mt-4 text-sm">
            Ambas representan exactamente la <strong>misma cantidad</strong>
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('to-mixed')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>¿Cómo convertir?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: TO MIXED ============
  if (phase === 'to-mixed') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            De Impropia a Mixto
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Convertir 7/4 a número mixto
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
          {/* Step by step */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  Divide el numerador entre el denominador
                </p>
                <div className="mt-2 text-lg">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">
                    7
                  </span>{' '}
                  ÷{' '}
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    4
                  </span>{' '}
                  ={' '}
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    1
                  </span>{' '}
                  con resto{' '}
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    3
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  El cociente es la parte entera
                </p>
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg font-bold text-lg">
                    1 entero
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  El resto es el nuevo numerador (mismo denominador)
                </p>
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg font-bold text-lg">
                    3/4
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-4 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-2">Resultado:</p>
            <div className="text-3xl font-bold">
              <span className="text-orange-600 dark:text-orange-400">7/4</span>
              <span className="text-gray-400 mx-3">=</span>
              <span className="text-green-600 dark:text-green-400">
                1 <sup className="text-xl">3</sup>/<sub className="text-xl">4</sub>
              </span>
            </div>
          </div>
        </div>

        {/* Memory aid */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
            <strong>Recuerda:</strong> Divide → el cociente es el entero, el resto es el numerador
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setPhase('to-improper');
              setShowConversion(false);
            }}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Ahora al revés</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: TO IMPROPER ============
  if (phase === 'to-improper') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            De Mixto a Impropia
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Convertir 2 1/3 a fracción impropia
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
          {/* Step by step */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  Multiplica el entero por el denominador
                </p>
                <div className="mt-2 text-lg">
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    2
                  </span>{' '}
                  ×{' '}
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    3
                  </span>{' '}
                  ={' '}
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    6
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  Suma el numerador original
                </p>
                <div className="mt-2 text-lg">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    6
                  </span>{' '}
                  +{' '}
                  <span className="text-orange-600 dark:text-orange-400 font-bold">
                    1
                  </span>{' '}
                  ={' '}
                  <span className="text-red-600 dark:text-red-400 font-bold">
                    7
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  El denominador se mantiene igual
                </p>
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-bold text-lg">
                    /3
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-r from-purple-50 to-orange-50 dark:from-purple-900/30 dark:to-orange-900/30 rounded-xl p-4 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-2">Resultado:</p>
            <div className="text-3xl font-bold">
              <span className="text-green-600 dark:text-green-400">
                2 <sup className="text-xl">1</sup>/<sub className="text-xl">3</sub>
              </span>
              <span className="text-gray-400 mx-3">=</span>
              <span className="text-orange-600 dark:text-orange-400">7/3</span>
            </div>
          </div>
        </div>

        {/* Memory aid */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
            <strong>Fórmula:</strong> (entero × denominador) + numerador = nuevo numerador
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('key-points')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: KEY POINTS ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Dos Formas, Un Número
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Resumen de conversiones</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 space-y-6">
        {/* Improper to Mixed */}
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
          <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-2">
            Impropia → Mixto
          </h4>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-bold text-lg text-orange-600 dark:text-orange-400">
              7/4
            </span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-700 dark:text-gray-300">
              7 ÷ 4 = 1 resto 3
            </span>
            <span className="text-gray-400">→</span>
            <span className="font-bold text-lg text-green-600 dark:text-green-400">
              1 3/4
            </span>
          </div>
        </div>

        {/* Mixed to Improper */}
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
          <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">
            Mixto → Impropia
          </h4>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-bold text-lg text-green-600 dark:text-green-400">
              2 1/3
            </span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-700 dark:text-gray-300">
              (2×3) + 1 = 7
            </span>
            <span className="text-gray-400">→</span>
            <span className="font-bold text-lg text-orange-600 dark:text-orange-400">
              7/3
            </span>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
              ¿Cuándo usar cada forma?
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>
                • <strong>Números mixtos</strong>: más fáciles de visualizar y comparar con enteros
              </li>
              <li>
                • <strong>Fracciones impropias</strong>: más fáciles para hacer operaciones matemáticas
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
