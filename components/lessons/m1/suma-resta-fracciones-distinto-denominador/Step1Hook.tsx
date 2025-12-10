'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

// Pizza component - shows a circular pizza divided into slices using SVG
function Pizza({
  slices,
  filledSlices,
  fillColor = 'orange',
  label,
  size = 96,
}: {
  slices: number;
  filledSlices: number;
  fillColor?: 'orange' | 'blue' | 'green' | 'purple';
  label?: string;
  size?: number;
}) {
  const center = size / 2;
  const radius = size / 2 - 4;
  const sliceAngle = (2 * Math.PI) / slices;

  const colorClasses = {
    orange: 'fill-orange-500 dark:fill-orange-600',
    blue: 'fill-blue-500 dark:fill-blue-600',
    green: 'fill-green-500 dark:fill-green-600',
    purple: 'fill-purple-500 dark:fill-purple-600',
  };

  // Generate path for a slice
  const getSlicePath = (index: number) => {
    const startAngle = index * sliceAngle - Math.PI / 2;
    const endAngle = startAngle + sliceAngle;
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    const largeArc = sliceAngle > Math.PI ? 1 : 0;
    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="drop-shadow-md">
        {/* Pizza base circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          className="fill-amber-200 dark:fill-amber-800/50 stroke-amber-600 dark:stroke-amber-500"
          strokeWidth="3"
        />

        {/* Pizza slices */}
        {Array.from({ length: slices }).map((_, i) => {
          const isFilled = i < filledSlices;
          return (
            <path
              key={i}
              d={getSlicePath(i)}
              className={cn(
                isFilled
                  ? colorClasses[fillColor]
                  : 'fill-amber-200 dark:fill-amber-300/30',
              )}
            />
          );
        })}

        {/* Slice divider lines */}
        {Array.from({ length: slices }).map((_, i) => {
          const angle = i * sliceAngle - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={`line-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              className="stroke-amber-700 dark:stroke-amber-500"
              strokeWidth="2"
            />
          );
        })}

        {/* Center dot */}
        <circle
          cx={center}
          cy={center}
          r={5}
          className="fill-amber-700 dark:fill-amber-500"
        />

        {/* Outer border */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className="stroke-amber-600 dark:stroke-amber-500"
          strokeWidth="3"
        />
      </svg>
      {label && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </span>
      )}
    </div>
  );
}

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (!isActive) return null;

  // ============ PHASE 1: SCENARIO ============
  if (phase === 'scenario') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pizzas Diferentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un problema interesante...
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              En la mesa hay dos pizzas, pero <strong>cortadas diferente</strong>.
            </p>

            <div className="flex justify-center items-center gap-8 py-4">
              <div className="text-center">
                <Pizza slices={2} filledSlices={1} fillColor="orange" size={100} />
                <p className="mt-2 font-medium text-orange-600 dark:text-orange-400">
                  Pizza A: <span className="text-xl">1/2</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  (cortada en 2)
                </p>
              </div>
              <div className="text-3xl font-bold text-gray-400">+</div>
              <div className="text-center">
                <Pizza slices={3} filledSlices={1} fillColor="blue" size={100} />
                <p className="mt-2 font-medium text-blue-600 dark:text-blue-400">
                  Pizza B: <span className="text-xl">1/3</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  (cortada en 3)
                </p>
              </div>
            </div>

            <div className="border-t border-orange-200 dark:border-orange-700 pt-4 mt-4">
              <p className="text-orange-700 dark:text-orange-300 font-medium">
                Si juntamos ambas porciones...
              </p>
              <p className="text-orange-700 dark:text-orange-300">
                ¿Cuánta pizza tenemos en total?
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    const options = [
      { label: '2/5', value: 0 },
      { label: '1/5', value: 1 },
      { label: '5/6', value: 2 },
      { label: '2/6', value: 3 },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pizzas Diferentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuál es el resultado de 1/2 + 1/3?
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex justify-center items-center gap-4 text-3xl font-bold">
            <span className="text-orange-600 dark:text-orange-400">1/2</span>
            <span className="text-gray-400">+</span>
            <span className="text-blue-600 dark:text-blue-400">1/3</span>
            <span className="text-gray-400">=</span>
            <span className="text-purple-600 dark:text-purple-400">?</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option.value)}
              className={cn(
                'p-4 rounded-xl transition-all text-center font-medium text-lg',
                selectedAnswer === option.value
                  ? 'bg-orange-200 dark:bg-orange-800 ring-4 ring-orange-400 scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
              )}
            >
              <span
                className={cn(
                  selectedAnswer === option.value
                    ? 'text-orange-800 dark:text-orange-200'
                    : 'text-gray-700 dark:text-gray-200',
                )}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('reveal')}
            disabled={selectedAnswer === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
            )}
          >
            Ver la respuesta
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: REVEAL ============
  if (phase === 'reveal') {
    const wrongAnswer = selectedAnswer === 0; // 2/5 is the common mistake

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pizzas Diferentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Veamos la respuesta!
          </p>
        </div>

        {/* Warning about common mistake */}
        {wrongAnswer && (
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-300 dark:border-amber-700 animate-fadeIn">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-800 dark:text-amber-200">
                  ¡Cuidado con ese error!
                </p>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  Muchos piensan que 1/2 + 1/3 = 2/5 (sumando numeradores y denominadores).
                  Pero eso <strong>no funciona</strong> con fracciones.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Visual reveal */}
        <div className="bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-900/30 dark:to-green-900/30 rounded-xl p-6">
          <div className="text-center mb-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Para sumar estas fracciones, necesitamos <strong>el mismo tamaño de rebanada</strong>.
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 py-4 flex-wrap">
            <div className="text-center">
              <Pizza slices={6} filledSlices={3} fillColor="orange" size={80} />
              <p className="mt-2 font-medium text-orange-600 dark:text-orange-400">
                1/2 = <span className="text-lg">3/6</span>
              </p>
            </div>
            <div className="text-2xl font-bold text-gray-400">+</div>
            <div className="text-center">
              <Pizza slices={6} filledSlices={2} fillColor="blue" size={80} />
              <p className="mt-2 font-medium text-blue-600 dark:text-blue-400">
                1/3 = <span className="text-lg">2/6</span>
              </p>
            </div>
            <div className="text-2xl font-bold text-gray-400">=</div>
            <div className="text-center">
              <Pizza slices={6} filledSlices={5} fillColor="green" size={80} />
              <p className="mt-2 font-bold text-green-600 dark:text-green-400 text-xl">
                5/6
              </p>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="text-orange-600 dark:text-orange-400 font-bold">3 rebanadas</span>
              {' + '}
              <span className="text-blue-600 dark:text-blue-400 font-bold">2 rebanadas</span>
              {' = '}
              <span className="text-green-600 dark:text-green-400 font-bold">5 rebanadas</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              (Ahora sí, ambas cortadas en 6)
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('result')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: RESULT ============
  const correctAnswer = 2; // 5/6
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Pizzas Diferentes
        </h2>
        <p className="text-gray-600 dark:text-gray-300">¿Qué descubrimos?</p>
      </div>

      {/* Answer feedback */}
      <div
        className={cn(
          'p-5 rounded-xl border-2',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400',
        )}
      >
        <div className="flex items-start gap-4">
          {isCorrect ? (
            <Check className="w-7 h-7 text-green-600 flex-shrink-0" />
          ) : (
            <X className="w-7 h-7 text-amber-600 flex-shrink-0" />
          )}
          <div>
            <h3
              className={cn(
                'font-bold text-lg mb-1',
                isCorrect
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-amber-800 dark:text-amber-300',
              )}
            >
              {isCorrect ? '¡Excelente!' : '¡Casi!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {isCorrect
                ? '¡Correcto! 1/2 + 1/3 = 5/6. Convertiste las fracciones al mismo denominador.'
                : '1/2 + 1/3 = 5/6. El truco es convertir ambas fracciones para que tengan el mismo denominador.'}
            </p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-center text-lg">
          El Secreto para Sumar Fracciones con Distinto Denominador
        </h4>
        <div className="space-y-3 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Cuando los <strong className="text-purple-600 dark:text-purple-400">denominadores son diferentes</strong>:
          </p>
          <ol className="text-left max-w-xs mx-auto space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="font-bold text-purple-600 dark:text-purple-400">1.</span>
              Busca un <strong>denominador común</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-purple-600 dark:text-purple-400">2.</span>
              <strong>Convierte</strong> cada fracción
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-purple-600 dark:text-purple-400">3.</span>
              <strong>Suma</strong> los numeradores
            </li>
          </ol>
        </div>
      </div>

      {/* Continue button */}
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
