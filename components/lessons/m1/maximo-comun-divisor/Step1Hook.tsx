'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

// Tortilla component - shows a stack of tortillas
function TortillaStack({ count, highlight = false }: { count: number; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        {Array.from({ length: Math.min(count, 6) }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-12 h-3 rounded-full border-2 transition-all',
              highlight
                ? 'bg-yellow-300 border-yellow-500'
                : 'bg-amber-100 border-amber-400',
            )}
            style={{ marginTop: i > 0 ? '-4px' : '0' }}
          />
        ))}
        {count > 6 && (
          <div className="absolute -bottom-1 right-0 text-xs font-bold text-amber-600">
            +{count - 6}
          </div>
        )}
      </div>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {count} tortillas
      </span>
    </div>
  );
}

// Meat component - shows pieces of carne asada
function MeatPile({ count, highlight = false }: { count: number; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid grid-cols-3 gap-0.5">
        {Array.from({ length: Math.min(count, 9) }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-4 h-3 rounded-sm transition-all',
              highlight
                ? 'bg-red-400 border border-red-600'
                : 'bg-red-700 border border-red-900',
            )}
          />
        ))}
      </div>
      {count > 9 && (
        <span className="text-xs font-bold text-red-600">+{count - 9}</span>
      )}
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {count} carnes
      </span>
    </div>
  );
}

// Taco Station component (now called "Mesa" for clarity)
function TacoMesa({
  tortillas,
  meats,
  mesaNumber,
}: {
  tortillas: number;
  meats: number;
  mesaNumber: number;
}) {
  return (
    <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-300 dark:border-amber-600 shadow-sm">
      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">
        Mesa {mesaNumber}
      </span>
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-center">
          {Array.from({ length: tortillas }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-2 bg-amber-200 border border-amber-400 rounded-full"
              style={{ marginTop: i > 0 ? '-2px' : '0' }}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-0.5">
          {Array.from({ length: meats }).map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2 bg-red-600 rounded-sm"
            />
          ))}
        </div>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {tortillas}T + {meats}C
      </span>
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
            El Problema del Reparto
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Don Pancho tiene un desafío en su taquería
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Don Pancho quiere preparar <strong>mesas de tacos idénticas</strong> para un evento.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Tiene estos ingredientes:
            </p>

            <div className="flex justify-center items-center gap-12 py-6">
              <div className="text-center">
                <div className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-xl mb-2">
                  <div className="grid grid-cols-6 gap-1 justify-center">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-2 bg-amber-300 border border-amber-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                <p className="font-bold text-amber-700 dark:text-amber-400 text-xl">
                  24 tortillas
                </p>
              </div>

              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900/50 p-4 rounded-xl mb-2">
                  <div className="grid grid-cols-6 gap-1 justify-center">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-4 bg-red-600 border border-red-800 rounded-sm"
                      />
                    ))}
                  </div>
                </div>
                <p className="font-bold text-red-700 dark:text-red-400 text-xl">
                  18 piezas de carne
                </p>
              </div>
            </div>

            <div className="border-t border-amber-200 dark:border-amber-700 pt-4 mt-4">
              <p className="text-amber-700 dark:text-amber-300 font-medium">
                Cada mesa debe tener <strong>la misma cantidad</strong> de tortillas
              </p>
              <p className="text-amber-700 dark:text-amber-300 font-medium">
                Y <strong>la misma cantidad</strong> de piezas de carne.
              </p>
              <p className="text-amber-800 dark:text-amber-200 font-bold mt-2">
                ¡Sin que sobre NADA!
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
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
      { label: '2 mesas', value: 0 },
      { label: '3 mesas', value: 1 },
      { label: '6 mesas', value: 2 },
      { label: '8 mesas', value: 3 },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Problema del Reparto
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuál es el <strong>máximo</strong> número de mesas idénticas?
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
          <div className="text-center space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-amber-600">24 tortillas</strong> y{' '}
              <strong className="text-red-600">18 piezas de carne</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Dividir en mesas idénticas sin que sobre nada
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              className={cn(
                'p-4 rounded-xl transition-all text-center font-medium text-lg',
                selectedAnswer === option.value
                  ? 'bg-amber-200 dark:bg-amber-800 ring-4 ring-amber-400 scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
              )}
            >
              <span
                className={cn(
                  selectedAnswer === option.value
                    ? 'text-amber-800 dark:text-amber-200'
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
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
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
            El Problema del Reparto
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Veamos cómo se reparten los ingredientes!
          </p>
        </div>

        {/* Visual reveal */}
        <div className="bg-gradient-to-r from-amber-50 to-green-50 dark:from-amber-900/30 dark:to-green-900/30 rounded-xl p-6">
          <div className="text-center mb-4">
            <p className="text-lg font-bold text-green-700 dark:text-green-400">
              ¡6 mesas idénticas!
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              24 ÷ 6 = 4 tortillas por mesa | 18 ÷ 6 = 3 carnes por mesa
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <TacoMesa
                key={i}
                tortillas={4}
                meats={3}
                mesaNumber={i + 1}
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="text-amber-600 font-bold">24 tortillas</span>
              {' = 6 × 4 | '}
              <span className="text-red-600 font-bold">18 carnes</span>
              {' = 6 × 3'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-medium mt-1">
              ¡Sin sobras!
            </p>
          </div>
        </div>

        {/* Insight box */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700 animate-fadeIn max-w-md mx-auto">
          <p className="text-blue-800 dark:text-blue-200 font-medium text-center">
            <strong>¿Por qué 6?</strong>
          </p>
          <p className="text-blue-700 dark:text-blue-300 mt-2 text-sm text-center">
            El número <strong>6</strong> es el mayor número que divide exactamente
            a <strong>24</strong> y a <strong>18</strong>.
          </p>
          <p className="text-blue-800 dark:text-blue-200 font-bold mt-2 text-center">
            A esto le llamamos: M.C.D.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('result')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: RESULT ============
  const correctAnswer = 2; // 6 mesas
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Problema del Reparto
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
                ? 'El máximo número de mesas es 6. Cada una con 4 tortillas y 3 carnes.'
                : 'El máximo es 6 mesas. Tanto 2, 3 como 6 dividen a 24 y 18, pero 6 es el mayor.'}
            </p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 text-center text-lg">
          Máximo Común Divisor (M.C.D.)
        </h4>
        <div className="space-y-3 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            El <strong className="text-blue-600 dark:text-blue-400">M.C.D.</strong> es el{' '}
            <strong>número más grande</strong> que divide exactamente a dos o más números.
          </p>
          <div className="flex items-center justify-center gap-3 text-xl font-bold">
            <span className="text-amber-600 dark:text-amber-400">M.C.D.(24, 18)</span>
            <span className="text-gray-400">=</span>
            <span className="text-green-600 dark:text-green-400">6</span>
          </div>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            6 es el mayor número que divide a 24 y a 18 sin dejar residuo.
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
