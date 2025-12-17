'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 1; // "(x + 3)(y + 2)"

  const options = [
    '(x + 2)(y + 3)',
    '(x + 3)(y + 2)',
    '(xy + 6)(2 + 3)',
    'xy + 2x + 3y + 6',
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
          El Terreno del Arquitecto
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Puedes encontrar unas posibles dimensiones de un terreno conociendo solo su área?
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Un arquitecto necesita <strong className="text-blue-600">cercar un terreno rectangular</strong>.
              Solo conoce el <strong className="text-purple-600">área total</strong>, que está dividida en 4 secciones:
            </p>

            {/* Area Model Visualization */}
            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  El terreno dividido en secciones:
                </p>

                {/* SVG Area Model */}
                <div className="flex justify-center">
                  <svg viewBox="0 0 280 220" className="w-full max-w-xs">
                    {/* Background rectangles */}
                    <rect x="40" y="40" width="100" height="70" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="4" />
                    <rect x="140" y="40" width="100" height="70" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="4" />
                    <rect x="40" y="110" width="100" height="70" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="4" />
                    <rect x="140" y="110" width="100" height="70" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="4" />

                    {/* Labels inside boxes */}
                    <text x="90" y="82" textAnchor="middle" className="text-lg font-bold fill-blue-700" style={{ fontSize: '18px', fontFamily: 'monospace' }}>xy</text>
                    <text x="190" y="82" textAnchor="middle" className="text-lg font-bold fill-green-700" style={{ fontSize: '18px', fontFamily: 'monospace' }}>2x</text>
                    <text x="90" y="152" textAnchor="middle" className="text-lg font-bold fill-amber-700" style={{ fontSize: '18px', fontFamily: 'monospace' }}>3y</text>
                    <text x="190" y="152" textAnchor="middle" className="text-lg font-bold fill-pink-700" style={{ fontSize: '18px', fontFamily: 'monospace' }}>6</text>

                    {/* Question marks for dimensions */}
                    <text x="20" y="115" textAnchor="middle" className="fill-gray-500" style={{ fontSize: '24px' }}>?</text>
                    <text x="140" y="25" textAnchor="middle" className="fill-gray-500" style={{ fontSize: '24px' }}>?</text>
                  </svg>
                </div>
              </div>

              {/* Total Area Expression */}
              <div className="bg-purple-100 dark:bg-purple-900/50 rounded-xl p-4 max-w-md">
                <p className="text-gray-700 dark:text-gray-300 text-center mb-2">
                  El área total del terreno es:
                </p>
                <p className="font-mono text-2xl text-center font-bold text-purple-700 dark:text-purple-300">
                  xy + 2x + 3y + 6 m²
                </p>
              </div>

              {/* Question */}
              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  El arquitecto necesita saber el <strong>largo</strong> y el <strong>ancho</strong> del terreno
                  para comprar la cantidad exacta de cerca. ¿Cuáles podrían ser las dimensiones?
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
              <span>Buscar las dimensiones</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question reminder with visual */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Mini area model */}
              <div className="flex-shrink-0">
                <svg viewBox="0 0 140 100" className="w-32">
                  <rect x="10" y="10" width="50" height="35" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" rx="2" />
                  <rect x="60" y="10" width="50" height="35" fill="#dcfce7" stroke="#22c55e" strokeWidth="1" rx="2" />
                  <rect x="10" y="45" width="50" height="35" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="2" />
                  <rect x="60" y="45" width="50" height="35" fill="#fce7f3" stroke="#ec4899" strokeWidth="1" rx="2" />
                  <text x="35" y="32" textAnchor="middle" style={{ fontSize: '10px', fontFamily: 'monospace' }} className="fill-blue-700">xy</text>
                  <text x="85" y="32" textAnchor="middle" style={{ fontSize: '10px', fontFamily: 'monospace' }} className="fill-green-700">2x</text>
                  <text x="35" y="67" textAnchor="middle" style={{ fontSize: '10px', fontFamily: 'monospace' }} className="fill-amber-700">3y</text>
                  <text x="85" y="67" textAnchor="middle" style={{ fontSize: '10px', fontFamily: 'monospace' }} className="fill-pink-700">6</text>
                </svg>
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Área total: <span className="font-mono text-purple-600">xy + 2x + 3y + 6</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Si Área = Largo × Ancho, ¿cuáles podrían ser las dimensiones?
                </p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-left font-medium transition-all border-2',
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
                  <span className="text-gray-800 dark:text-gray-200 font-mono text-lg">{option}</span>
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
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Veamos cómo encontrar las dimensiones...
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Encontramos unas posibles dimensiones!
            </h3>

            {/* Visual breakdown with labeled dimensions */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <svg viewBox="0 0 320 220" className="w-full max-w-sm">
                  {/* Top dimension label */}
                  <text x="160" y="15" textAnchor="middle" className="fill-purple-600 font-bold" style={{ fontSize: '16px', fontFamily: 'monospace' }}>y + 2</text>
                  <line x1="60" y1="25" x2="260" y2="25" stroke="#9333ea" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-start)" />

                  {/* Left dimension label */}
                  <text x="30" y="115" textAnchor="middle" className="fill-teal-600 font-bold" style={{ fontSize: '16px', fontFamily: 'monospace' }} transform="rotate(-90, 30, 115)">x + 3</text>
                  <line x1="45" y1="40" x2="45" y2="190" stroke="#14b8a6" strokeWidth="2" />

                  {/* Rectangles */}
                  <rect x="60" y="40" width="100" height="70" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="4" />
                  <rect x="160" y="40" width="100" height="70" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="4" />
                  <rect x="60" y="110" width="100" height="80" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="4" />
                  <rect x="160" y="110" width="100" height="80" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="4" />

                  {/* Labels inside boxes */}
                  <text x="110" y="80" textAnchor="middle" className="fill-blue-700 font-bold" style={{ fontSize: '18px', fontFamily: 'monospace' }}>xy</text>
                  <text x="210" y="80" textAnchor="middle" className="fill-green-700 font-bold" style={{ fontSize: '18px', fontFamily: 'monospace' }}>2x</text>
                  <text x="110" y="155" textAnchor="middle" className="fill-amber-700 font-bold" style={{ fontSize: '18px', fontFamily: 'monospace' }}>3y</text>
                  <text x="210" y="155" textAnchor="middle" className="fill-pink-700 font-bold" style={{ fontSize: '18px', fontFamily: 'monospace' }}>6</text>

                  {/* Row labels (factors) */}
                  <text x="280" y="80" textAnchor="start" className="fill-blue-600" style={{ fontSize: '12px', fontFamily: 'monospace' }}>×x</text>
                  <text x="280" y="155" textAnchor="start" className="fill-amber-600" style={{ fontSize: '12px', fontFamily: 'monospace' }}>×3</text>

                  {/* Column labels (factors) */}
                  <text x="110" y="205" textAnchor="middle" className="fill-blue-600" style={{ fontSize: '12px', fontFamily: 'monospace' }}>×y</text>
                  <text x="210" y="205" textAnchor="middle" className="fill-green-600" style={{ fontSize: '12px', fontFamily: 'monospace' }}>×2</text>
                </svg>
              </div>
            </div>

            {/* Step by step */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-500">Observa el patrón:</p>
                <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded font-mono">xy = x·y</span>
                  <span className="bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded font-mono">2x = x·2</span>
                  <span className="text-gray-400">← fila con factor x</span>
                </div>
                <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
                  <span className="bg-amber-100 dark:bg-amber-900/50 px-2 py-1 rounded font-mono">3y = 3·y</span>
                  <span className="bg-pink-100 dark:bg-pink-900/50 px-2 py-1 rounded font-mono">6 = 3·2</span>
                  <span className="text-gray-400">← fila con factor 3</span>
                </div>
                <p className="text-gray-400 text-sm">↓</p>
                <p className="font-mono text-xl text-green-600 font-bold">
                  Largo: (x + 3) · Ancho: (y + 2)
                </p>
              </div>
            </div>

            {/* Verification */}
            <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Verificación:</p>
              <p className="font-mono text-green-700 dark:text-green-300">
                (x + 3)(y + 2) = xy + 2x + 3y + 6 ✓
              </p>
            </div>
          </div>

          {/* Bridge to factorization concept */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  ¡Esto es Factorización por Agrupación!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-sm mb-2">Encontrar las dimensiones de un área es lo mismo que <strong>factorizar</strong>:</p>
                    <p className="font-mono text-lg">
                      xy + 2x + 3y + 6 = <span className="text-purple-600 font-bold">(x + 3)(y + 2)</span>
                    </p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                      <strong>El modelo de área</strong> nos ayuda a visualizar la factorización:
                      <br />
                      <span className="text-purple-600">cada sección del rectángulo es un término del polinomio.</span>
                    </p>
                  </div>
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
              <span>Descubrir el patrón</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
