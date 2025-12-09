'use client';

import { useState } from 'react';
import { Gift, Smartphone, Gamepad2, ArrowRight, Check, X, HelpCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

// Gift card types with their properties
const GIFT_CARDS = [
  { type: 'netflix', label: 'Netflix', count: 4, color: 'bg-red-500', icon: '🎬', canUseOnPhone: true },
  { type: 'spotify', label: 'Spotify', count: 3, color: 'bg-green-500', icon: '🎵', canUseOnPhone: true },
  { type: 'playstation', label: 'PlayStation', count: 2, color: 'bg-blue-600', icon: '🎮', canUseOnPhone: false },
];

const TOTAL_CARDS = GIFT_CARDS.reduce((sum, card) => sum + card.count, 0); // 9

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingCards, setShowingCards] = useState(false);

  // Correct answer: P(Netflix OR Spotify) = 4/9 + 3/9 = 7/9
  const correctAnswer = 2; // Index for "7/9" option

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Regalos para Sofía
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Una situación para analizar...
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <Gift className="w-16 h-16 text-pink-500" />
                <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Es el <strong>cumpleaños de Sofía</strong> y sus amigos le trajeron tarjetas de regalo.
            </p>

            {/* Gift cards display */}
            <div className="flex justify-center gap-4 py-4 flex-wrap">
              {GIFT_CARDS.map((card) => (
                <div
                  key={card.type}
                  className={cn(
                    'px-4 py-3 rounded-lg shadow-md text-white font-semibold flex flex-col items-center gap-1',
                    card.color
                  )}
                >
                  <span className="text-2xl">{card.icon}</span>
                  <span>{card.label}</span>
                  <span className="text-sm opacity-90">x{card.count}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              Todas las tarjetas están mezcladas en una bolsa.
              <br />
              <strong>Total: {TOTAL_CARDS} tarjetas</strong>
            </p>

            <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-amber-700 dark:text-amber-300" />
                <span className="text-amber-800 dark:text-amber-200 font-semibold">El detalle:</span>
              </div>
              <p className="text-amber-800 dark:text-amber-200">
                Sofía solo tiene su <strong>celular</strong> ahora mismo.
                <br />
                No tiene PlayStation en este momento.
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Qué probabilidad tiene de sacar una tarjeta que pueda usar? 🤔
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Pensemos juntos</span>
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
      setShowingCards(true);
      setTimeout(() => {
        setPhase('result');
      }, 1500);
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Regalos para Sofía
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Qué puede usar Sofía?
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                Sofía puede usar Netflix <strong>O</strong> Spotify en su celular.
              </p>
              <p className="text-blue-700 dark:text-blue-300 mt-2">
                ¿Cuál es la probabilidad de sacar una tarjeta que pueda usar?
              </p>
            </div>
          </div>
        </div>

        {/* Visual card representation */}
        <div className="flex justify-center gap-3 py-2 flex-wrap">
          {GIFT_CARDS.map((card) => (
            <div
              key={card.type}
              className={cn(
                'px-3 py-2 rounded-lg shadow-md text-white font-semibold flex items-center gap-2 transition-all',
                card.color,
                showingCards && card.canUseOnPhone && 'ring-2 ring-green-400 scale-105',
                showingCards && !card.canUseOnPhone && 'opacity-50'
              )}
            >
              <span>{card.icon}</span>
              <span>{card.count}</span>
              {showingCards && card.canUseOnPhone && (
                <Check className="w-4 h-4 text-green-200" />
              )}
              {showingCards && !card.canUseOnPhone && (
                <X className="w-4 h-4 text-red-200" />
              )}
            </div>
          ))}
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '4/9', value: 0 },
            { label: '3/9', value: 1 },
            { label: '7/9', value: 2 },
            { label: '12/9', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={showingCards}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2 text-lg',
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
            disabled={selectedAnswer === null || showingCards}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null && !showingCards
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            {showingCards ? 'Verificando...' : 'Verificar'}
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
          Regalos para Sofía
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
              {isCorrect ? '¡Excelente!' : '¡Casi!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              La respuesta correcta es <strong>7/9</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Visual demonstration */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <div className="flex justify-center gap-4 flex-wrap">
          {GIFT_CARDS.map((card) => (
            <div
              key={card.type}
              className={cn(
                'px-4 py-3 rounded-lg shadow-md text-white font-semibold flex flex-col items-center gap-1',
                card.color,
                card.canUseOnPhone ? 'ring-2 ring-green-400' : 'opacity-50'
              )}
            >
              <span className="text-2xl">{card.icon}</span>
              <span>{card.label}</span>
              <span className="text-sm">{card.count} tarjetas</span>
              {card.canUseOnPhone && (
                <span className="text-xs bg-green-400/30 px-2 py-0.5 rounded">✓ Puede usar</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 font-medium text-center mb-3">
          ¿Cómo calculamos esto?
        </p>
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-lg">
            <span className="bg-red-500 text-white px-2 py-1 rounded">Netflix: 4</span>
            <span className="text-purple-700 dark:text-purple-300 font-bold">+</span>
            <span className="bg-green-500 text-white px-2 py-1 rounded">Spotify: 3</span>
            <span className="text-purple-700 dark:text-purple-300 font-bold">=</span>
            <span className="bg-purple-600 text-white px-2 py-1 rounded font-bold">7</span>
          </div>
          <div className="mt-3 text-2xl font-bold text-purple-900 dark:text-purple-100">
            P(Netflix O Spotify) = 4/9 + 3/9 = 7/9
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
              💡 Observación importante:
            </p>
            <p className="text-blue-700 dark:text-blue-300">
              Como una tarjeta <strong>no puede ser Netflix Y Spotify al mismo tiempo</strong>,
              podemos simplemente <strong>SUMAR</strong> las probabilidades.
            </p>
            <p className="text-blue-600 dark:text-blue-400 mt-2 text-sm">
              Pero... ¿qué pasa cuando los eventos SÍ pueden ocurrir juntos? 🤔
              <br />
              ¡Eso es lo que exploraremos en esta lección!
            </p>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
