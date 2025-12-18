'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, Plus, Minus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'addition' | 'subtraction' | 'practice' | 'summary';
type Strategy = 'add' | 'subtract' | null;

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy>(null);
  const [showResult, setShowResult] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState<number | null>(null);
  const [showPracticeFeedback, setShowPracticeFeedback] = useState(false);

  if (!isActive) return null;

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Dos Estrategias Poderosas
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubre cómo descomponer figuras complejas
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Cuando una figura no es simple, tienes dos opciones:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strategy 1: Addition */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-blue-300 dark:border-blue-600">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-blue-800 dark:text-blue-200">Sumar Partes</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Divide la figura en rectángulos o triángulos más pequeños y suma sus áreas.
              </p>
              <div className="flex justify-center mt-3">
                <svg viewBox="0 0 100 60" className="w-24 h-16">
                  <rect x="5" y="5" width="40" height="50" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
                  <rect x="45" y="5" width="30" height="30" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
                  <text x="80" y="25" fontSize="16" fill="#1f2937">+</text>
                </svg>
              </div>
            </div>

            {/* Strategy 2: Subtraction */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-orange-300 dark:border-orange-600">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Minus className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-orange-800 dark:text-orange-200">Restar Partes</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Imagina la figura completa y resta las partes que faltan.
              </p>
              <div className="flex justify-center mt-3">
                <svg viewBox="0 0 100 60" className="w-24 h-16">
                  <rect x="5" y="5" width="60" height="50" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
                  <rect x="45" y="35" width="20" height="20" fill="#fecaca" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
                  <text x="80" y="30" fontSize="16" fill="#1f2937">−</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('addition')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Explorar la estrategia de suma</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ ADDITION STRATEGY ============
  if (phase === 'addition') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Estrategia 1: Sumar Rectángulos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Divide y conquista
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
            Observa cómo esta figura en T se divide en dos rectángulos:
          </p>

          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 280 180" className="w-72 h-48">
              {/* T-shaped figure */}
              <rect x="40" y="20" width="200" height="50" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="3" />
              <rect x="100" y="70" width="80" height="90" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="3" />

              {/* Dimensions */}
              <text x="140" y="12" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">10 m</text>
              <text x="255" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">2.5 m</text>
              <text x="85" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">4 m</text>
              <text x="140" y="175" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">4.5 m</text>

              {/* Labels */}
              <text x="140" y="50" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">A</text>
              <text x="140" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#5b21b6">B</text>
            </svg>
          </div>

          <div className="space-y-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">A</div>
              <span className="text-gray-700 dark:text-gray-300">
                10 m × 2.5 m = <strong className="text-blue-600">25 m²</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">B</div>
              <span className="text-gray-700 dark:text-gray-300">
                4 m × 4.5 m = <strong className="text-purple-600">18 m²</strong>
              </span>
            </div>
            <div className="border-t border-blue-200 dark:border-blue-700 pt-3 mt-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                  Total: 25 + 18 = <strong className="text-green-600 text-lg">43 m²</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-center">
            <strong>Tip:</strong> Busca líneas horizontales o verticales que dividan la figura en rectángulos.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('subtraction')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
          >
            <span>Ahora la estrategia de resta</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ SUBTRACTION STRATEGY ============
  if (phase === 'subtraction') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Estrategia 2: Restar la Parte que Falta
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Imagina la figura completa
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
            Esta figura en L es un rectángulo al que le falta una esquina:
          </p>

          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 280 180" className="w-72 h-48">
              {/* Full rectangle (faded) */}
              <rect x="40" y="20" width="180" height="140" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />

              {/* L-shape */}
              <path
                d="M 40 20 L 220 20 L 220 90 L 130 90 L 130 160 L 40 160 Z"
                fill="#fed7aa"
                stroke="#ea580c"
                strokeWidth="3"
              />

              {/* Missing corner */}
              <rect x="130" y="90" width="90" height="70" fill="#fecaca" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,4" opacity="0.7" />

              {/* Dimensions */}
              <text x="130" y="12" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">9 m</text>
              <text x="30" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937" transform="rotate(-90, 30, 90)">7 m</text>
              <text x="175" y="135" textAnchor="middle" fontSize="11" fill="#dc2626" fontWeight="bold">4.5 × 3.5</text>

              {/* Labels */}
              <text x="90" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ea580c">Área L</text>
            </svg>
          </div>

          <div className="space-y-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-white font-bold text-sm">□</div>
              <span className="text-gray-700 dark:text-gray-300">
                Rectángulo completo: 9 m × 7 m = <strong className="text-amber-600">63 m²</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-sm">−</div>
              <span className="text-gray-700 dark:text-gray-300">
                Esquina que falta: 4.5 m × 3.5 m = <strong className="text-red-600">15.75 m²</strong>
              </span>
            </div>
            <div className="border-t border-orange-200 dark:border-orange-700 pt-3 mt-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                  Área L: 63 − 15.75 = <strong className="text-green-600 text-lg">47.25 m²</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-center">
            <strong>Tip:</strong> Esta estrategia es ideal cuando la figura &ldquo;casi&rdquo; es un rectángulo o cuadrado.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('practice')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>¡Tu turno!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PRACTICE ============
  if (phase === 'practice') {
    const handleCheckAnswer = () => {
      setShowPracticeFeedback(true);
    };

    // Correct answer: Method 1 (add): 5×3 + 3×4 = 15 + 12 = 27 m²
    // OR Method 2 (subtract): 5×7 - 2×4 = 35 - 8 = 27 m²
    const correctAnswer = 2; // 27 m²

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Tu Turno!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Elige la estrategia que prefieras
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
            Calcula el área de esta figura:
          </p>

          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 260 200" className="w-64 h-52">
              {/* Stepped figure */}
              <path
                d="M 40 30 L 140 30 L 140 100 L 180 100 L 180 170 L 40 170 Z"
                fill="#e0e7ff"
                stroke="#4f46e5"
                strokeWidth="3"
              />

              {/* Dimensions */}
              <text x="90" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">5 m</text>
              <text x="155" y="22" textAnchor="middle" fontSize="11" fill="#6b7280">2 m</text>
              <text x="200" y="65" textAnchor="middle" fontSize="11" fill="#6b7280">3.5 m</text>
              <text x="200" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">3.5 m</text>
              <text x="110" y="188" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">7 m</text>
              <text x="25" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937" transform="rotate(-90, 25, 105)">7 m</text>
            </svg>
          </div>

          {/* Strategy selector */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">
              ¿Qué estrategia usarías?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setSelectedStrategy('add')}
                disabled={showPracticeFeedback}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all border-2',
                  selectedStrategy === 'add'
                    ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300'
                )}
              >
                <Plus size={18} />
                <span>Sumar</span>
              </button>
              <button
                onClick={() => setSelectedStrategy('subtract')}
                disabled={showPracticeFeedback}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all border-2',
                  selectedStrategy === 'subtract'
                    ? 'bg-orange-100 dark:bg-orange-900/50 border-orange-500 text-orange-700 dark:text-orange-300'
                    : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300'
                )}
              >
                <Minus size={18} />
                <span>Restar</span>
              </button>
            </div>
          </div>

          {/* Show decomposition hint based on strategy */}
          {selectedStrategy && !showPracticeFeedback && (
            <div className={cn(
              'p-3 rounded-lg mb-4 text-sm',
              selectedStrategy === 'add'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                : 'bg-orange-50 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
            )}>
              {selectedStrategy === 'add' ? (
                <p>
                  <strong>Sumar:</strong> Divide en un rectángulo superior (5×3.5) y uno inferior (7×3.5)
                </p>
              ) : (
                <p>
                  <strong>Restar:</strong> Rectángulo completo (7×7) menos la esquina (2×3.5)
                </p>
              )}
            </div>
          )}

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '24.5 m²', value: 0 },
              { label: '35 m²', value: 1 },
              { label: '42 m²', value: 2 },
              { label: '49 m²', value: 3 },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPracticeAnswer(option.value)}
                disabled={showPracticeFeedback}
                className={cn(
                  'p-3 rounded-xl font-semibold transition-all border-2',
                  practiceAnswer === option.value
                    ? showPracticeFeedback
                      ? option.value === correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                      : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500'
                    : showPracticeFeedback && option.value === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {showPracticeFeedback && (
          <div className={cn(
            'p-4 rounded-xl animate-fadeIn',
            practiceAnswer === correctAnswer
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
          )}>
            <div className="flex items-start gap-3">
              <Check className={cn(
                'w-6 h-6 flex-shrink-0',
                practiceAnswer === correctAnswer ? 'text-green-600' : 'text-amber-600'
              )} />
              <div>
                <p className={cn(
                  'font-bold mb-1',
                  practiceAnswer === correctAnswer ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {practiceAnswer === correctAnswer ? '¡Correcto!' : 'La respuesta es 42 m²'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Método suma:</strong> (5 × 3.5) + (7 × 3.5) = 17.5 + 24.5 = 42 m²
                  <br />
                  <strong>Método resta:</strong> (7 × 7) − (2 × 3.5) = 49 − 7 = 42 m²
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {!showPracticeFeedback ? (
            <button
              onClick={handleCheckAnswer}
              disabled={practiceAnswer === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                practiceAnswer !== null
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={() => setPhase('summary')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Ver resumen</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Dos Estrategias Dominadas!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resumen de lo que descubriste
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Las dos estrategias:
          </span>
        </div>

        <div className="space-y-4">
          {/* Strategy 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Sumar Partes</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Divide la figura en rectángulos simples y suma sus áreas
              </p>
            </div>
          </div>

          {/* Strategy 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center flex-shrink-0">
              <Minus className="w-8 h-8 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Restar la Parte que Falta</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Calcula la figura completa y resta lo que falta
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
        <p className="text-green-800 dark:text-green-200 text-center">
          <strong>Ambas estrategias dan el mismo resultado.</strong>
          <br />
          <span className="text-sm">Elige la que te parezca más fácil para cada figura.</span>
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar a las fórmulas</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
