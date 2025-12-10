'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

// Chocolate bar component - shows a rectangular bar divided into pieces
function ChocolateBar({
  cols,
  filledCols,
  size = 'normal',
}: {
  cols: number;
  filledCols: number;
  size?: 'small' | 'normal' | 'large';
}) {
  const sizeClasses = {
    small: { cell: 'w-6 h-6', gap: 'gap-0.5' },
    normal: { cell: 'w-8 h-8', gap: 'gap-1' },
    large: { cell: 'w-10 h-10', gap: 'gap-1' },
  };

  const s = sizeClasses[size];

  return (
    <div className={cn('inline-flex', s.gap)}>
      {Array.from({ length: cols }).map((_, i) => (
        <div
          key={i}
          className={cn(
            s.cell,
            'rounded-sm border border-amber-800 dark:border-amber-600 transition-all',
            i < filledCols
              ? 'bg-amber-600 dark:bg-amber-700'
              : 'bg-amber-200/50 dark:bg-amber-900/30',
          )}
        />
      ))}
    </div>
  );
}

// Special component to show chocolate bar being cut in half
function ChocolateBarWithCut({
  cols,
  filledCols,
  showCutLine = false,
  showOnlyTop = false,
  showOnlyBottom = false,
}: {
  cols: number;
  filledCols: number;
  showCutLine?: boolean;
  showOnlyTop?: boolean;
  showOnlyBottom?: boolean;
}) {
  return (
    <div className="inline-flex flex-col">
      {/* Top half */}
      <div className={cn('inline-flex gap-1', showOnlyBottom && 'opacity-30')}>
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={`top-${i}`}
            className={cn(
              'w-10 h-5 rounded-t-sm border border-amber-800 dark:border-amber-600 transition-all',
              showCutLine && 'border-b-0',
              i < filledCols
                ? showOnlyTop
                  ? 'bg-green-500 dark:bg-green-600'
                  : 'bg-amber-600 dark:bg-amber-700'
                : 'bg-amber-200/50 dark:bg-amber-900/30',
            )}
          />
        ))}
      </div>

      {/* Cut line */}
      {showCutLine && (
        <div className="inline-flex gap-1">
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={`line-${i}`}
              className={cn(
                'w-10 border-t-2 border-dashed',
                i < filledCols
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-gray-400 dark:border-gray-500',
              )}
            />
          ))}
        </div>
      )}

      {/* Bottom half */}
      <div className={cn('inline-flex gap-1', showOnlyTop && 'opacity-30')}>
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={`bottom-${i}`}
            className={cn(
              'w-10 h-5 rounded-b-sm border border-amber-800 dark:border-amber-600 transition-all',
              showCutLine && 'border-t-0',
              i < filledCols
                ? showOnlyBottom
                  ? 'bg-green-500 dark:bg-green-600'
                  : 'bg-amber-600 dark:bg-amber-700'
                : 'bg-amber-200/50 dark:bg-amber-900/30',
            )}
          />
        ))}
      </div>
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
            El Chocolate Compartido
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Una situacion deliciosa...
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Tienes <strong className="text-amber-600 dark:text-amber-400">3/4</strong> de una barra de chocolate.
            </p>

            <div className="flex justify-center py-4">
              <div className="text-center">
                <ChocolateBar rows={1} cols={4} filledRows={1} filledCols={3} size="large" />
                <p className="mt-2 font-medium text-amber-700 dark:text-amber-400">
                  Tu chocolate: <span className="text-xl">3/4</span>
                </p>
              </div>
            </div>

            <div className="border-t border-amber-200 dark:border-amber-700 pt-4 mt-4">
              <p className="text-amber-700 dark:text-amber-300 font-medium">
                Decides dar <strong>la mitad</strong> de lo que tienes a tu amigo.
              </p>
              <p className="text-amber-700 dark:text-amber-300 mt-2">
                ¿Cuánto chocolate le diste?
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
      { label: '3/2', value: 0 },
      { label: '1/4', value: 1 },
      { label: '3/8', value: 2 },
      { label: '2/4', value: 3 },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Chocolate Compartido
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuanto es la mitad de 3/4?
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
          <div className="flex justify-center items-center gap-4 text-3xl font-bold flex-wrap">
            <span className="text-blue-600 dark:text-blue-400">1/2</span>
            <span className="text-gray-400">de</span>
            <span className="text-amber-600 dark:text-amber-400">3/4</span>
            <span className="text-gray-400">=</span>
            <span className="text-purple-600 dark:text-purple-400">?</span>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2">
            (o sea: 1/2 × 3/4)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
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
    const wrongAddition = selectedAnswer === 0; // 3/2 - added instead of multiplied

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Chocolate Compartido
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Veamos la respuesta!
          </p>
        </div>

        {/* Warning about common mistake */}
        {wrongAddition && (
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-300 dark:border-amber-700 animate-fadeIn">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-800 dark:text-amber-200">
                  ¡Cuidado!
                </p>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  Parece que sumaste en vez de multiplicar.
                  Cuando dices &quot;la mitad de algo&quot;, eso es <strong>multiplicar</strong> por 1/2.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Visual reveal */}
        <div className="bg-gradient-to-r from-amber-50 to-green-50 dark:from-amber-900/30 dark:to-green-900/30 rounded-xl p-6">
          <div className="text-center mb-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Veamos esto <strong>visualmente</strong>:
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1: Show 3/4 */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Empezamos con 3/4 del chocolate:
              </p>
              <div className="flex justify-center">
                <ChocolateBar cols={4} filledCols={3} size="large" />
              </div>
            </div>

            {/* Step 2: Show the cut line */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Cortamos por la mitad <span className="text-red-500">(linea roja)</span>:
              </p>
              <div className="flex justify-center">
                <ChocolateBarWithCut cols={4} filledCols={3} showCutLine={true} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Cada pedazo ahora tiene 2 mitades
              </p>
            </div>

            {/* Step 3: Take half */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Tomamos solo una mitad <span className="text-green-500">(verde)</span>:
              </p>
              <div className="flex justify-center">
                <ChocolateBarWithCut cols={4} filledCols={3} showCutLine={true} showOnlyTop={true} />
              </div>
              <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
                ¡3 mitades de 8 mitades = 3/8!
              </p>
            </div>
          </div>
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
  const correctAnswer = 2; // 3/8
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Chocolate Compartido
        </h2>
        <p className="text-gray-600 dark:text-gray-300">¿Que descubrimos?</p>
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
                ? '¡Correcto! 1/2 × 3/4 = 3/8. Multiplicaste los numeradores y los denominadores.'
                : '1/2 × 3/4 = 3/8. El truco es multiplicar arriba por arriba y abajo por abajo.'}
            </p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-center text-lg">
          El Secreto de la Multiplicacion de Fracciones
        </h4>
        <div className="space-y-3 text-center">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
            <p className="text-xl font-bold">
              <span className="text-blue-600 dark:text-blue-400">1</span>
              <span className="text-gray-400">/</span>
              <span className="text-blue-600 dark:text-blue-400">2</span>
              <span className="text-gray-400 mx-2">×</span>
              <span className="text-amber-600 dark:text-amber-400">3</span>
              <span className="text-gray-400">/</span>
              <span className="text-amber-600 dark:text-amber-400">4</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-green-600 dark:text-green-400">1×3</span>
              <span className="text-gray-400">/</span>
              <span className="text-green-600 dark:text-green-400">2×4</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-purple-600 dark:text-purple-400">3/8</span>
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            <strong className="text-purple-600 dark:text-purple-400">¡Es mas facil que sumar!</strong>
            {' '}Solo multiplica numerador × numerador y denominador × denominador.
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
