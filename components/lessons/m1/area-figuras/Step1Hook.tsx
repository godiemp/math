'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle, PaintBucket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingCalculation, setShowingCalculation] = useState(false);

  // Wall is 4m x 3m = 12 m², with a 1m x 2m window = 2 m², so paintable area = 10 m²
  const correctAnswer = 2; // Index for "10 m²" option

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Proyecto de Pintura
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un desafío del mundo real...
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Tu vecino necesita <strong>pintar una pared</strong> de su casa,
              pero tiene una ventana en medio.
            </p>

            {/* Wall visualization with window */}
            <div className="flex justify-center py-4">
              <svg viewBox="0 0 200 150" className="w-64 h-48">
                {/* Wall background */}
                <rect
                  x="10"
                  y="10"
                  width="180"
                  height="130"
                  fill="#fbbf24"
                  stroke="#92400e"
                  strokeWidth="3"
                  rx="4"
                />
                {/* Window */}
                <rect
                  x="70"
                  y="40"
                  width="60"
                  height="50"
                  fill="#7dd3fc"
                  stroke="#0369a1"
                  strokeWidth="2"
                  rx="2"
                />
                {/* Window panes */}
                <line x1="100" y1="40" x2="100" y2="90" stroke="#0369a1" strokeWidth="2" />
                <line x1="70" y1="65" x2="130" y2="65" stroke="#0369a1" strokeWidth="2" />
                {/* Dimensions */}
                <text x="100" y="148" textAnchor="middle" fontSize="12" fill="#1f2937">4 m</text>
                <text x="200" y="75" textAnchor="start" fontSize="12" fill="#1f2937">3 m</text>
                <text x="100" y="105" textAnchor="middle" fontSize="10" fill="#0369a1">1m × 2m</text>
              </svg>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Te pregunta:
            </p>

            <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <PaintBucket className="w-6 h-6 text-amber-700 dark:text-amber-300" />
              </div>
              <p className="text-amber-800 dark:text-amber-200 font-semibold text-lg">
                &ldquo;¿Cuántos metros cuadrados de pintura necesito comprar?&rdquo;
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Para responder, necesitas calcular el <strong>área</strong> de la pared. 🤔
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Vamos a calcularlo</span>
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
      setShowingCalculation(true);
      setTimeout(() => {
        setPhase('result');
      }, 1500);
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Proyecto de Pintura
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuánta área hay que pintar?
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-blue-800 dark:text-blue-200">
                La pared mide <strong>4 metros de ancho</strong> y <strong>3 metros de alto</strong>.
              </p>
              <p className="text-blue-800 dark:text-blue-200 mt-1">
                La ventana mide <strong>1 metro × 2 metros</strong> (y no se pinta).
              </p>
            </div>
          </div>
        </div>

        {/* Visual with highlighted areas */}
        <div className="flex justify-center py-2">
          <svg viewBox="0 0 200 150" className="w-64 h-48">
            {/* Wall background - paintable area highlighted */}
            <rect
              x="10"
              y="10"
              width="180"
              height="130"
              fill={showingCalculation ? '#86efac' : '#fbbf24'}
              stroke="#92400e"
              strokeWidth="3"
              rx="4"
              className="transition-all duration-500"
            />
            {/* Window */}
            <rect
              x="70"
              y="40"
              width="60"
              height="50"
              fill={showingCalculation ? '#fca5a5' : '#7dd3fc'}
              stroke="#0369a1"
              strokeWidth="2"
              rx="2"
              className="transition-all duration-500"
            />
            {/* Window panes */}
            <line x1="100" y1="40" x2="100" y2="90" stroke="#0369a1" strokeWidth="2" />
            <line x1="70" y1="65" x2="130" y2="65" stroke="#0369a1" strokeWidth="2" />
            {/* Labels */}
            <text x="100" y="148" textAnchor="middle" fontSize="12" fill="#1f2937">4 m</text>
            <text x="200" y="75" textAnchor="start" fontSize="12" fill="#1f2937">3 m</text>
            {showingCalculation && (
              <>
                <text x="35" y="75" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="bold">
                  PINTAR
                </text>
                <text x="100" y="70" textAnchor="middle" fontSize="10" fill="#991b1b" fontWeight="bold">
                  NO
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '12 m²', value: 0 },
            { label: '11 m²', value: 1 },
            { label: '10 m²', value: 2 },
            { label: '8 m²', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={showingCalculation}
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
            disabled={selectedAnswer === null || showingCalculation}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null && !showingCalculation
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            {showingCalculation ? 'Calculando...' : 'Verificar'}
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
          El Proyecto de Pintura
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¡Veamos la respuesta!
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
              El área a pintar es <strong>10 m²</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Calculation breakdown */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Así se calcula:
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">1</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">Área de la pared: </span>
              <span className="font-bold text-green-700 dark:text-green-400">4 × 3 = 12 m²</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold">2</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">Área de la ventana: </span>
              <span className="font-bold text-red-700 dark:text-red-400">1 × 2 = 2 m²</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">3</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">Área a pintar: </span>
              <span className="font-bold text-purple-700 dark:text-purple-400">12 − 2 = 10 m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Area concept insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
          Para resolver este problema usaste el concepto de <strong>área</strong>:
        </p>
        <div className="mt-3 text-center">
          <span className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            Área = base × altura
          </span>
        </div>
        <p className="text-purple-700 dark:text-purple-300 mt-3 text-sm text-center">
          En esta lección aprenderás las fórmulas de área para triángulos y cuadriláteros.
        </p>
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
