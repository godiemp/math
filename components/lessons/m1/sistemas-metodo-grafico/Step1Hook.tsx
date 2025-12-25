'use client';

import { useState } from 'react';
import { MapPin, Check, X, ArrowRight, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 1; // Point B (3, 2)

  const options = [
    'Punto A: (2, 3)',
    'Punto B: (3, 2)',
    'Punto C: (4, 1)',
    'Punto D: (1, 4)',
  ];

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setTimeout(() => {
      setPhase('result');
    }, 1500);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Mapa del Tesoro
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Dos caminos, un punto de encuentro
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Dos exploradores buscan un tesoro siguiendo diferentes pistas:
            </p>

            {/* Map visualization */}
            <div className="flex justify-center mb-6">
              <svg width="280" height="220" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                {/* Grid */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <g key={i}>
                    <line x1={40 + i * 40} y1={20} x2={40 + i * 40} y2={200} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
                    <line x1={40} y1={20 + i * 36} x2={240} y2={20 + i * 36} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
                    <text x={40 + i * 40} y={215} textAnchor="middle" className="text-xs fill-gray-500">{i}</text>
                    {i <= 5 && <text x={30} y={200 - i * 36 + 4} textAnchor="middle" className="text-xs fill-gray-500">{i}</text>}
                  </g>
                ))}

                {/* Line 1: y = -x + 5 (from Explorer A) */}
                <line x1={40} y1={20} x2={240} y2={200} stroke="#3B82F6" strokeWidth="3" />
                <text x={60} y={50} className="text-xs font-bold fill-blue-600">Pista A</text>

                {/* Line 2: y = x - 1 (from Explorer B) */}
                <line x1={80} y1={200} x2={240} y2={56} stroke="#10B981" strokeWidth="3" />
                <text x={200} y={85} className="text-xs font-bold fill-green-600">Pista B</text>

                {/* Treasure point (3, 2) */}
                <circle cx={160} cy={128} r="10" fill="#EF4444" className="animate-pulse" />
                <text x={175} y={125} className="text-sm font-bold fill-red-600">💎</text>
              </svg>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Explorador A:</strong> &quot;El tesoro está donde x + y = 5&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Explorador B:</strong> &quot;El tesoro está donde y = x - 1&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <span>¿Dónde está el tesoro?</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 text-center border border-amber-200 dark:border-amber-700">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Si ambas pistas son correctas, ¿en qué coordenadas está el tesoro?
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-left font-medium text-lg transition-all border-2',
                  selectedAnswer === index
                    ? showFeedback
                      ? index === correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                      : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                    : showFeedback && index === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      selectedAnswer === index
                        ? showFeedback
                          ? index === correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-amber-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    )}
                  >
                    {showFeedback && index === correctAnswer ? (
                      <Check size={16} />
                    ) : showFeedback && selectedAnswer === index && index !== correctAnswer ? (
                      <X size={16} />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Check button */}
          {!showFeedback && (
            <div className="flex justify-center">
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl animate-fadeIn text-center',
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                  : 'bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700'
              )}
            >
              <p className={cn('font-semibold', isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
                {isCorrect ? '¡Encontraste el tesoro!' : '¡Casi!'} Veamos por qué...
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              El secreto del mapa:
            </h3>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Cada pista es una recta</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Las ecuaciones <span className="font-mono bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">x + y = 5</span> y <span className="font-mono bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">y = x - 1</span> representan rectas en el plano.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-green-600 dark:text-green-400 mb-2">El tesoro está donde se cruzan</p>
                <p className="text-gray-700 dark:text-gray-300">
                  El punto <span className="font-mono bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded">(3, 2)</span> es el único que satisface AMBAS ecuaciones:
                </p>
                <div className="mt-2 space-y-1 font-mono text-center">
                  <p>3 + 2 = 5 ✓</p>
                  <p>2 = 3 - 1 ✓</p>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-green-200 dark:border-green-700">
                <div className="flex items-center justify-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                  <MapPin className="text-red-500" />
                  <span>El tesoro está en (3, 2)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bridge to lesson */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
                  El Método Gráfico
                </h4>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    Resolver un <strong>sistema de ecuaciones</strong> gráficamente significa encontrar el <strong>punto de intersección</strong> de las rectas.
                  </p>
                  <p className="text-sm mt-2">
                    Aprende a graficar rectas y encontrar soluciones visualmente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
