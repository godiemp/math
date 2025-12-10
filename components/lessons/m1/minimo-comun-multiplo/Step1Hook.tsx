'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

// Calendar component showing visits
function Calendar({
  highlightedDays,
  catalinaColor = 'bg-blue-400',
  diegoColor = 'bg-green-400',
  showCatalina = true,
  showDiego = false,
  animate = false,
}: {
  highlightedDays?: number;
  catalinaColor?: string;
  diegoColor?: string;
  showCatalina?: boolean;
  showDiego?: boolean;
  animate?: boolean;
}) {
  const catalinaDays = [4, 8, 12, 16, 20, 24, 28]; // Every 4 days
  const diegoDays = [6, 12, 18, 24, 30]; // Every 6 days

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-3">
        <span className="font-bold text-gray-700 dark:text-gray-300">Marzo</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-500 dark:text-gray-400">
        <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
          const isCatalina = showCatalina && catalinaDays.includes(day);
          const isDiego = showDiego && diegoDays.includes(day);
          const isBoth = isCatalina && isDiego;
          const isHighlighted = highlightedDays ? day <= highlightedDays : true;

          return (
            <div
              key={day}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all',
                animate && 'transition-all duration-300',
                !isHighlighted && 'opacity-30',
                isBoth
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white ring-2 ring-yellow-600 scale-110'
                  : isCatalina
                    ? `${catalinaColor} text-white`
                    : isDiego
                      ? `${diegoColor} text-white`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
              )}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Character icon component
function Character({ name, color, className }: { name: string; color: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', color)}>
        <User className="w-6 h-6 text-white" />
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
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
            El Problema de los Encuentros
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Catalina y Diego tienen un problema de sincronización
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <div className="flex justify-center items-center gap-8 py-4">
              <Character name="Catalina" color="bg-blue-500" />
              <BookOpen className="w-12 h-12 text-amber-600" />
              <Character name="Diego" color="bg-green-500" />
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Catalina y Diego son amigos que viven en Santiago.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              <strong className="text-blue-600">Catalina</strong> va a la biblioteca cada{' '}
              <strong className="text-blue-600">4 días</strong>.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              <strong className="text-green-600">Diego</strong> va cada{' '}
              <strong className="text-green-600">6 días</strong>.
            </p>

            <div className="border-t border-cyan-200 dark:border-cyan-700 pt-4 mt-4">
              <p className="text-cyan-700 dark:text-cyan-300 font-medium">
                Hoy es <strong>día 1</strong> y ambos se encontraron en la biblioteca.
              </p>
              <p className="text-cyan-800 dark:text-cyan-200 font-bold mt-2">
                ¿Cuándo se volverán a encontrar?
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg"
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
      { label: 'Día 8', value: 0 },
      { label: 'Día 10', value: 1 },
      { label: 'Día 12', value: 2 },
      { label: 'Día 24', value: 3 },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Problema de los Encuentros
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿En qué día se volverán a encontrar?
          </p>
        </div>

        <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-xl p-4 border border-cyan-200 dark:border-cyan-700">
          <div className="text-center space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-blue-600">Catalina</strong>: cada 4 días |{' '}
              <strong className="text-green-600">Diego</strong>: cada 6 días
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ambos empiezan el día 1
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
                  ? 'bg-cyan-200 dark:bg-cyan-800 ring-4 ring-cyan-400 scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
              )}
            >
              <span
                className={cn(
                  selectedAnswer === option.value
                    ? 'text-cyan-800 dark:text-cyan-200'
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
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 shadow-lg'
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
            El Problema de los Encuentros
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Veamos el calendario!
          </p>
        </div>

        {/* Visual reveal */}
        <div className="bg-gradient-to-r from-cyan-50 to-green-50 dark:from-cyan-900/30 dark:to-green-900/30 rounded-xl p-6">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Catalina (cada 4 días)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Diego (cada 6 días)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-yellow-400 to-amber-500 ring-2 ring-yellow-600" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">¡Ambos!</span>
            </div>
          </div>

          <div className="flex justify-center">
            <Calendar showCatalina={true} showDiego={true} animate={true} />
          </div>

          <div className="text-center mt-4">
            <p className="text-lg font-bold text-green-700 dark:text-green-400">
              ¡Se encuentran el día 12!
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Múltiplos de 4: 4, 8, <strong className="text-yellow-600">12</strong>, 16, 20, <strong className="text-yellow-600">24</strong>...
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Múltiplos de 6: 6, <strong className="text-yellow-600">12</strong>, 18, <strong className="text-yellow-600">24</strong>...
            </p>
          </div>
        </div>

        {/* Insight box */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700 animate-fadeIn max-w-md mx-auto">
          <p className="text-blue-800 dark:text-blue-200 font-medium text-center">
            <strong>¿Por qué el día 12?</strong>
          </p>
          <p className="text-blue-700 dark:text-blue-300 mt-2 text-sm text-center">
            El número <strong>12</strong> es el menor número que es múltiplo
            de <strong>4</strong> y de <strong>6</strong> a la vez.
          </p>
          <p className="text-blue-800 dark:text-blue-200 font-bold mt-2 text-center">
            A esto le llamamos: M.C.M.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('result')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: RESULT ============
  const correctAnswer = 2; // Día 12
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Problema de los Encuentros
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
                ? 'El día 12 es el primer día donde ambos van a la biblioteca.'
                : 'El primer encuentro es el día 12. Es el menor número que es múltiplo de 4 y de 6.'}
            </p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 text-center text-lg">
          Mínimo Común Múltiplo (M.C.M.)
        </h4>
        <div className="space-y-3 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            El <strong className="text-blue-600 dark:text-blue-400">M.C.M.</strong> es el{' '}
            <strong>número más pequeño</strong> que es múltiplo de dos o más números.
          </p>
          <div className="flex items-center justify-center gap-3 text-xl font-bold">
            <span className="text-cyan-600 dark:text-cyan-400">M.C.M.(4, 6)</span>
            <span className="text-gray-400">=</span>
            <span className="text-green-600 dark:text-green-400">12</span>
          </div>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            12 es el menor número que es múltiplo de 4 y de 6 a la vez.
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
