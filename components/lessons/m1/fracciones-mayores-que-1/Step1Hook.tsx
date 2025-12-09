'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

// Pizza component - shows a circular pizza divided into slices
function Pizza({
  slices,
  filledSlices,
  animate = false,
  label,
}: {
  slices: number;
  filledSlices: number;
  animate?: boolean;
  label?: string;
}) {
  const sliceAngle = 360 / slices;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        {/* Pizza base */}
        <div className="absolute inset-0 rounded-full bg-amber-200 dark:bg-amber-800/50 border-4 border-amber-600 dark:border-amber-500" />

        {/* Pizza slices */}
        {Array.from({ length: slices }).map((_, i) => {
          const isFilled = i < filledSlices;
          const rotation = i * sliceAngle - 90;

          return (
            <div
              key={i}
              className={cn(
                'absolute inset-0 transition-all duration-500',
                animate && 'opacity-0',
              )}
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((sliceAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((sliceAngle * Math.PI) / 180)}%)`,
                transform: `rotate(${rotation}deg)`,
                transitionDelay: animate ? `${i * 100}ms` : '0ms',
                opacity: animate ? 0 : 1,
              }}
            >
              <div
                className={cn(
                  'absolute inset-0 rounded-full transition-colors duration-300',
                  isFilled
                    ? 'bg-orange-500 dark:bg-orange-600'
                    : 'bg-amber-100 dark:bg-amber-900/30',
                )}
              />
            </div>
          );
        })}

        {/* Slice dividers */}
        {Array.from({ length: slices }).map((_, i) => {
          const rotation = i * sliceAngle;
          return (
            <div
              key={`line-${i}`}
              className="absolute top-1/2 left-1/2 w-[2px] h-1/2 bg-amber-700 dark:bg-amber-500 origin-top"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          );
        })}

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-amber-700 dark:bg-amber-500" />
      </div>
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
  animate = false,
}: {
  numerator: number;
  denominator: number;
  showLabel?: boolean;
  animate?: boolean;
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
            animate={animate}
            label={`Pizza ${i + 1}`}
          />
        ))}
        {/* Partial pizza if any */}
        {remainingSlices > 0 && (
          <Pizza
            slices={denominator}
            filledSlices={remainingSlices}
            animate={animate}
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
  const correctAnswer = 2; // "More than 2" option

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
            animate={showPizzas}
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
