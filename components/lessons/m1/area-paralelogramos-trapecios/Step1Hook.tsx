'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle, TreeDeciduous } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingCalculation, setShowingCalculation] = useState(false);

  // Garden with parallelogram (6m x 4m) and trapezoid ((8+5)/2 x 4) = 26 m² total
  // Parallelogram: 6 x 4 = 24 m², Trapezoid: 0.5 x (8+5) x 4 = 26 m²
  // Total: 24 + 26 = 50 m²
  const correctAnswer = 2; // Index for "50 m²" option

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Jardín Irregular
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un desafío con figuras especiales...
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Tu vecino tiene un <strong>jardín con formas irregulares</strong>.
              Quiere sembrar césped y necesita saber cuánto comprar.
            </p>

            {/* Garden visualization */}
            <div className="flex justify-center py-4">
              <svg viewBox="0 0 300 200" className="w-80 h-56">
                {/* Background */}
                <rect x="0" y="0" width="300" height="200" fill="#f0fdf4" rx="8" />

                {/* Parallelogram section */}
                <polygon
                  points="30,160 50,60 150,60 130,160"
                  fill="#86efac"
                  stroke="#166534"
                  strokeWidth="2"
                />
                {/* Height line for parallelogram */}
                <line x1="50" y1="60" x2="50" y2="160" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />

                {/* Trapezoid section */}
                <polygon
                  points="150,160 160,60 240,60 270,160"
                  fill="#fde68a"
                  stroke="#b45309"
                  strokeWidth="2"
                />
                {/* Height line for trapezoid */}
                <line x1="200" y1="60" x2="200" y2="160" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />

                {/* Labels */}
                <text x="90" y="120" textAnchor="middle" fontSize="12" fill="#166534" fontWeight="bold">
                  Zona A
                </text>
                <text x="210" y="120" textAnchor="middle" fontSize="12" fill="#b45309" fontWeight="bold">
                  Zona B
                </text>

                {/* Dimension labels */}
                <text x="90" y="180" textAnchor="middle" fontSize="11" fill="#1f2937" fontWeight="bold">6 m</text>
                <text x="12" y="115" textAnchor="middle" fontSize="11" fill="#1f2937" fontWeight="bold" transform="rotate(-90, 12, 115)">4 m</text>
                <text x="200" y="52" textAnchor="middle" fontSize="10" fill="#1f2937" fontWeight="bold">5 m</text>
                <text x="210" y="180" textAnchor="middle" fontSize="10" fill="#1f2937" fontWeight="bold">8 m</text>
                <text x="288" y="115" textAnchor="middle" fontSize="11" fill="#1f2937" fontWeight="bold" transform="rotate(90, 288, 115)">4 m</text>
              </svg>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Te pregunta:
            </p>

            <div className="bg-green-100 dark:bg-green-900/40 rounded-lg p-4 border-2 border-green-300 dark:border-green-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TreeDeciduous className="w-6 h-6 text-green-700 dark:text-green-300" />
              </div>
              <p className="text-green-800 dark:text-green-200 font-semibold text-lg">
                &ldquo;¿Cuántos metros cuadrados de césped necesito?&rdquo;
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Para responder, necesitas calcular el <strong>área</strong> de cada sección.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
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
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Jardín Irregular
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuánta área total tiene el jardín?
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Zona A (Paralelogramo):</strong> base 6 m, altura 4 m
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Zona B (Trapecio):</strong> bases 8 m y 5 m, altura 4 m
              </p>
            </div>
          </div>
        </div>

        {/* Visual with highlighted areas */}
        <div className="flex justify-center py-2">
          <svg viewBox="0 0 300 180" className="w-80 h-52">
            {/* Parallelogram section */}
            <polygon
              points="30,150 50,50 150,50 130,150"
              fill={showingCalculation ? '#86efac' : '#c4b5fd'}
              stroke="#7c3aed"
              strokeWidth="2"
              className="transition-all duration-500"
            />
            <line x1="50" y1="50" x2="50" y2="150" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />

            {/* Trapezoid section */}
            <polygon
              points="150,150 160,50 240,50 270,150"
              fill={showingCalculation ? '#fde68a' : '#fca5a5'}
              stroke="#b45309"
              strokeWidth="2"
              className="transition-all duration-500"
            />
            <line x1="200" y1="50" x2="200" y2="150" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />

            {/* Labels */}
            {showingCalculation && (
              <>
                <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#166534" fontWeight="bold">
                  24 m²
                </text>
                <text x="210" y="105" textAnchor="middle" fontSize="12" fill="#b45309" fontWeight="bold">
                  26 m²
                </text>
              </>
            )}

            {/* Dimension labels */}
            <text x="90" y="165" textAnchor="middle" fontSize="11" fill="#1f2937" fontWeight="bold">6 m</text>
            <text x="200" y="42" textAnchor="middle" fontSize="10" fill="#1f2937" fontWeight="bold">5 m</text>
            <text x="210" y="165" textAnchor="middle" fontSize="10" fill="#1f2937" fontWeight="bold">8 m</text>
          </svg>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '40 m²', value: 0 },
            { label: '44 m²', value: 1 },
            { label: '50 m²', value: 2 },
            { label: '64 m²', value: 3 },
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
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg'
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
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Jardín Irregular
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
              El área total del jardín es <strong>50 m²</strong>.
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
          <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">1</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">Paralelogramo: </span>
              <span className="font-bold text-purple-700 dark:text-purple-400">b × h = 6 × 4 = 24 m²</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold">2</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">Trapecio: </span>
              <span className="font-bold text-orange-700 dark:text-orange-400">½ × (8+5) × 4 = 26 m²</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">3</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">Total: </span>
              <span className="font-bold text-green-700 dark:text-green-400">24 + 26 = 50 m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Area concept insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
          Para resolver este problema usaste fórmulas de <strong>área</strong> especiales:
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
            <span className="text-lg font-bold text-purple-900 dark:text-purple-100">
              A = b × h
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400">Paralelogramo</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
            <span className="text-lg font-bold text-orange-900 dark:text-orange-100">
              A = ½(B+b)×h
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400">Trapecio</p>
          </div>
        </div>
        <p className="text-purple-700 dark:text-purple-300 mt-3 text-sm text-center">
          En esta lección aprenderás cómo funcionan estas fórmulas.
        </p>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
