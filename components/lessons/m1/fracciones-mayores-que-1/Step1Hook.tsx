'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

// Pizza component - shows a circular pizza divided into slices using SVG
function Pizza({
  slices,
  filledSlices,
  label,
}: {
  slices: number;
  filledSlices: number;
  label?: string;
}) {
  const size = 96;
  const center = size / 2;
  const radius = size / 2 - 4;
  const sliceAngle = (2 * Math.PI) / slices;

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
                  ? 'fill-orange-500 dark:fill-orange-600'
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

// Multiple pizzas display component
function PizzaDisplay({
  numerator,
  denominator,
  showLabel = true,
}: {
  numerator: number;
  denominator: number;
  showLabel?: boolean;
}) {
  const wholePizzas = Math.floor(numerator / denominator);
  const remainingSlices = numerator % denominator;
  const totalPizzas = wholePizzas + (remainingSlices > 0 ? 1 : 0);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-4">
        {/* Full pizzas */}
        {Array.from({ length: wholePizzas }).map((_, i) => (
          <Pizza
            key={`full-${i}`}
            slices={denominator}
            filledSlices={denominator}
            label={`Pizza ${i + 1}`}
          />
        ))}
        {/* Partial pizza if any */}
        {remainingSlices > 0 && (
          <Pizza
            slices={denominator}
            filledSlices={remainingSlices}
            label={`Pizza ${totalPizzas}`}
          />
        )}
      </div>
      {showLabel && (
        <div className="text-center">
          <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {numerator}/{denominator}
          </span>
          <span className="text-gray-600 dark:text-gray-300 ml-2">
            = {wholePizzas} {wholePizzas === 1 ? 'pizza' : 'pizzas'}
            {remainingSlices > 0 && ` y ${remainingSlices}/${denominator}`}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showPizzas, setShowPizzas] = useState(false);

  // 9 slices eaten out of 4-slice pizzas = 9/4 = 2 and 1/4 pizzas
  const numerator = 9;
  const denominator = 4;
  const correctAnswer = 3; // "Más de 2 pizzas" is at index 3

  if (!isActive) return null;

  // ============ PHASE 1: SCENARIO ============
  if (phase === 'scenario') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Fiesta de Pizza
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un problema delicioso para empezar...
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              En una fiesta, cada pizza se corta en <strong>4 rebanadas</strong>.
            </p>

            <div className="py-4">
              <Pizza slices={4} filledSlices={4} />
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Los invitados comieron un total de <strong className="text-orange-600 dark:text-orange-400">9 rebanadas</strong>.
            </p>

            <div className="border-t border-orange-200 dark:border-orange-700 pt-4 mt-4">
              <p className="text-orange-700 dark:text-orange-300 font-medium">
                Pero espera... si cada pizza tiene solo 4 rebanadas...
              </p>
              <p className="text-orange-700 dark:text-orange-300">
                ¿Cómo pueden haber comido 9?
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
      { label: 'Menos de 1 pizza', value: 0 },
      { label: 'Exactamente 1 pizza', value: 1 },
      { label: 'Exactamente 2 pizzas', value: 2 },
      { label: 'Más de 2 pizzas', value: 3 },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Fiesta de Pizza
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuántas pizzas comieron en total?
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <p className="text-lg font-semibold text-orange-800 dark:text-orange-200 text-center">
            Si comieron <span className="text-2xl">9/4</span> de pizza,<br />
            <strong>¿cuántas pizzas enteras comieron?</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option.value)}
              className={cn(
                'p-4 rounded-xl transition-all text-center font-medium',
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
            onClick={() => {
              setPhase('reveal');
              setTimeout(() => setShowPizzas(true), 300);
            }}
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
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Fiesta de Pizza
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Veamos cuánta pizza comieron!
          </p>
        </div>

        {/* Visual reveal */}
        <div
          className={cn(
            'bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl p-6 transition-all duration-500',
            showPizzas ? 'opacity-100' : 'opacity-0',
          )}
        >
          <PizzaDisplay
            numerator={numerator}
            denominator={denominator}
          />
        </div>

        {/* Insight box */}
        {showPizzas && (
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700 animate-fadeIn max-w-md mx-auto">
            <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
              <strong>¡9/4 es más que un entero!</strong>
            </p>
            <p className="text-purple-700 dark:text-purple-300 mt-2 text-sm text-center">
              Cuando el numerador es <strong>mayor</strong> que el denominador,
              <br />
              ¡la fracción vale más que 1!
            </p>
          </div>
        )}

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
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Fiesta de Pizza
        </h2>
        <p className="text-gray-600 dark:text-gray-300">¿Qué aprendimos?</p>
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
                ? '¡Correcto! 9/4 = 2 pizzas completas y 1/4 de otra. ¡Más de 2 pizzas!'
                : '9/4 significa 9 rebanadas de pizzas que tienen 4 rebanadas cada una. Eso es 2 pizzas completas y 1/4 más.'}
            </p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-center text-lg">
          El Secreto de las Fracciones Mayores que 1
        </h4>
        <div className="space-y-3 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Cuando el <strong className="text-blue-600 dark:text-blue-400">numerador</strong> es{' '}
            <strong>mayor</strong> que el{' '}
            <strong className="text-purple-600 dark:text-purple-400">denominador</strong>:
          </p>
          <div className="flex items-center justify-center gap-3 text-2xl font-bold">
            <span className="text-orange-600 dark:text-orange-400">9/4</span>
            <span className="text-gray-400">=</span>
            <span className="text-green-600 dark:text-green-400">2 + 1/4</span>
          </div>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            ¡La fracción vale <strong>más de un entero</strong>!
          </p>
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
