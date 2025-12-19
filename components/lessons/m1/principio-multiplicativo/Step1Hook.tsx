'use client';

import { useState } from 'react';
import { Shirt, ArrowRight, Check, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

// Colors for visual representation
const SHIRT_COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];
const SHIRT_LABELS = ['Roja', 'Azul', 'Verde'];
const PANT_COLORS = ['bg-gray-800', 'bg-amber-700', 'bg-indigo-900', 'bg-stone-600'];
const PANT_LABELS = ['Negro', 'Café', 'Azul', 'Gris'];

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingCombinations, setShowingCombinations] = useState(false);

  // Correct answer: 3 shirts × 4 pants = 12 combinations
  const correctAnswer = 2; // Index for "12" option

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Dilema del Armario
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un problema cotidiano que esconde matemáticas...
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Imagina que tienes que elegir qué ponerte para salir.
            </p>

            {/* Visual closet display */}
            <div className="flex flex-col md:flex-row justify-center gap-6 py-4">
              {/* Shirts */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                  Camisas disponibles:
                </p>
                <div className="flex justify-center gap-3">
                  {SHIRT_COLORS.map((color, index) => (
                    <div
                      key={index}
                      className={cn(
                        'w-12 h-14 rounded-lg flex items-center justify-center',
                        color
                      )}
                    >
                      <Shirt className="w-8 h-8 text-white" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {SHIRT_LABELS.join(', ')}
                </p>
              </div>

              {/* Pants */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                  Pantalones disponibles:
                </p>
                <div className="flex justify-center gap-3">
                  {PANT_COLORS.map((color, index) => (
                    <div
                      key={index}
                      className={cn(
                        'w-10 h-14 rounded-lg',
                        color
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {PANT_LABELS.join(', ')}
                </p>
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-4 border-2 border-purple-300 dark:border-purple-600">
              <p className="text-purple-800 dark:text-purple-200 font-semibold text-lg">
                ¿De cuántas formas diferentes puedes vestirte?
              </p>
              <p className="text-purple-600 dark:text-purple-300 text-sm mt-1">
                (Combinando una camisa con un pantalón)
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Vamos a pensarlo</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    const handleSubmit = () => {
      if (selectedAnswer === null) return;
      setShowingCombinations(true);
      setTimeout(() => {
        setPhase('result');
      }, 1500);
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Dilema del Armario
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuántas combinaciones son posibles?
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <p className="text-blue-800 dark:text-blue-200">
              Tienes <strong>3 camisas</strong> y <strong>4 pantalones</strong>.
              <br />
              ¿Cuántos conjuntos diferentes puedes formar?
            </p>
          </div>
        </div>

        {/* Visual summary */}
        <div className="flex justify-center items-center gap-4 py-2">
          <div className="flex gap-1">
            {SHIRT_COLORS.map((color, i) => (
              <div key={i} className={cn('w-8 h-10 rounded', color)} />
            ))}
          </div>
          <span className="text-2xl font-bold text-gray-400">×</span>
          <div className="flex gap-1">
            {PANT_COLORS.map((color, i) => (
              <div key={i} className={cn('w-6 h-10 rounded', color)} />
            ))}
          </div>
          <span className="text-2xl font-bold text-gray-400">=</span>
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">?</span>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '7 combinaciones', value: 0 },
            { label: '9 combinaciones', value: 1 },
            { label: '12 combinaciones', value: 2 },
            { label: '16 combinaciones', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={showingCombinations}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2',
                selectedAnswer === option.value
                  ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null || showingCombinations}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null && !showingCombinations
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            {showingCombinations ? 'Calculando...' : 'Verificar'}
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: RESULT ============
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Dilema del Armario
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¡Veamos todas las combinaciones!
        </p>
      </div>

      {/* Answer feedback */}
      <div
        className={cn(
          'p-5 rounded-xl border-2',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
        )}
      >
        <div className="flex items-start gap-4">
          {isCorrect ? (
            <Check className="w-7 h-7 text-green-600 flex-shrink-0" />
          ) : (
            <X className="w-7 h-7 text-amber-600 flex-shrink-0" />
          )}
          <div>
            <h3 className={cn(
              'font-bold text-lg mb-1',
              isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {isCorrect ? '¡Correcto!' : '¡Casi!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Son exactamente <strong>12 combinaciones</strong>: cada camisa puede combinarse con cada pantalón.
            </p>
          </div>
        </div>
      </div>

      {/* Visual demonstration - Grid of combinations */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 overflow-x-auto">
        <div className="min-w-[300px]">
          <div className="grid grid-cols-5 gap-2 text-center">
            {/* Header row */}
            <div className="h-12" /> {/* Empty corner */}
            {PANT_COLORS.map((color, i) => (
              <div key={i} className="flex justify-center items-center">
                <div className={cn('w-8 h-12 rounded', color)} />
              </div>
            ))}

            {/* Combination rows */}
            {SHIRT_COLORS.map((shirtColor, si) => (
              <>
                <div key={`shirt-${si}`} className="flex justify-center items-center">
                  <div className={cn('w-10 h-12 rounded flex items-center justify-center', shirtColor)}>
                    <Shirt className="w-6 h-6 text-white" />
                  </div>
                </div>
                {PANT_COLORS.map((_, pi) => (
                  <div
                    key={`combo-${si}-${pi}`}
                    className="w-full h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-sm"
                  >
                    ✓
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
          3 filas × 4 columnas = <strong>12 combinaciones</strong>
        </p>
      </div>

      {/* Principle insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
          Este es el <strong>Principio Multiplicativo de Conteo</strong>:
        </p>
        <div className="mt-3 text-center">
          <span className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            3 × 4 = 12
          </span>
        </div>
        <p className="text-purple-700 dark:text-purple-300 mt-3 text-sm text-center">
          Cuando tienes varias decisiones independientes, multiplicas las opciones de cada una.
          <br />
          En esta lección aprenderás a usar esta poderosa herramienta.
        </p>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
