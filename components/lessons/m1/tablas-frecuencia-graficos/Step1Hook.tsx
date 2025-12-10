'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Receipt, HelpCircle, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'chaos' | 'guess' | 'reveal';

// Snack data with emojis
const SNACK_DATA = [
  { name: 'Pizza', emoji: '🍕', count: 12 },
  { name: 'Hamburguesa', emoji: '🍔', count: 8 },
  { name: 'Empanada', emoji: '🥟', count: 6 },
  { name: 'Completo', emoji: '🌭', count: 4 },
];

// Generate raw data stream (unorganized orders)
function generateOrderStream() {
  const orders: { name: string; emoji: string }[] = [];
  SNACK_DATA.forEach(({ name, emoji, count }) => {
    for (let i = 0; i < count; i++) {
      orders.push({ name, emoji });
    }
  });
  // Shuffle
  for (let i = orders.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [orders[i], orders[j]] = [orders[j], orders[i]];
  }
  return orders;
}

const ORDERS = generateOrderStream();

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('chaos');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [visibleOrders, setVisibleOrders] = useState<number>(0);

  // Animate the receipt tape in chaos phase
  useEffect(() => {
    if (phase === 'chaos' && isActive) {
      const interval = setInterval(() => {
        setVisibleOrders((prev) => {
          if (prev >= ORDERS.length) {
            return prev;
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [phase, isActive]);

  if (!isActive) return null;

  // ============ PHASE 1: CHAOS - Receipt tape animation ============
  if (phase === 'chaos') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <Receipt className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              El Kiosco del Colegio
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Encuesta Misteriosa
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Estos son los pedidos de ayer en el kiosco...
          </p>
        </div>

        {/* Receipt tape container */}
        <div className="bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
          <div className="h-48 overflow-hidden relative">
            {/* Scrolling receipt tape */}
            <div
              className="flex flex-wrap gap-1 justify-center transition-all duration-300"
              style={{
                transform: `translateY(${Math.max(0, visibleOrders - 20) * -8}px)`,
              }}
            >
              {ORDERS.slice(0, visibleOrders).map((order, index) => (
                <div
                  key={index}
                  className={cn(
                    'px-2 py-1 bg-white dark:bg-gray-800 rounded shadow-sm text-sm',
                    'animate-fadeIn border border-gray-100 dark:border-gray-700'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="mr-1">{order.emoji}</span>
                  <span className="text-gray-700 dark:text-gray-300">{order.name}</span>
                </div>
              ))}
            </div>

            {/* Fade overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-100 dark:from-amber-900/20 to-transparent pointer-events-none" />
          </div>

          {/* Counter */}
          <div className="text-center mt-2 text-amber-700 dark:text-amber-300">
            <span className="font-mono">{visibleOrders}</span> / {ORDERS.length} pedidos
          </div>
        </div>

        {/* Progress to next phase */}
        {visibleOrders >= ORDERS.length && (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Muchos pedidos... <strong>¿Pudiste contar cuál fue el más popular?</strong>
            </p>
            <button
              onClick={() => setPhase('guess')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Intentar adivinar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Speed up button */}
        {visibleOrders < ORDERS.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleOrders(ORDERS.length)}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
            >
              Ver todos los pedidos
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 2: GUESS - Multiple choice ============
  if (phase === 'guess') {
    const options = ['Hamburguesa', 'Pizza', 'Empanada', 'Completo'];
    const correctAnswer = 'Pizza';

    const handleGuess = (answer: string) => {
      setSelectedAnswer(answer);
      setShowResult(true);
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              ¿Puedes adivinarlo?
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Cuál fue el snack más popular?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Sin contar ordenadamente, intenta recordar...
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => {
            const snack = SNACK_DATA.find((s) => s.name === option)!;
            const isSelected = selectedAnswer === option;
            const isCorrect = option === correctAnswer;
            const showFeedback = showResult && isSelected;

            return (
              <button
                key={option}
                onClick={() => !showResult && handleGuess(option)}
                disabled={showResult}
                className={cn(
                  'flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all',
                  !showResult && 'hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-300',
                  isSelected && !showResult && 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
                  showFeedback && isCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                  showFeedback && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                  !isSelected && showResult && 'opacity-50',
                  !showResult && !isSelected && 'border-gray-200 dark:border-gray-700'
                )}
              >
                <span className="text-3xl">{snack.emoji}</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Result feedback */}
        {showResult && (
          <div
            className={cn(
              'p-4 rounded-xl animate-fadeIn',
              selectedAnswer === correctAnswer
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
            )}
          >
            <p className="text-center">
              {selectedAnswer === correctAnswer ? (
                <span className="text-green-700 dark:text-green-300">
                  <strong>¡Correcto!</strong> Pero fue difícil contarlo así, ¿verdad?
                </span>
              ) : (
                <span className="text-amber-700 dark:text-amber-300">
                  <strong>No exactamente.</strong> Era difícil saber sin organizar los datos.
                </span>
              )}
            </p>
          </div>
        )}

        {/* Continue button */}
        {showResult && (
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('reveal')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Ver la solución</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: REVEAL - Organized data ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            ¡La solución!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Organizando los Datos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Al agrupar y contar, todo queda claro
        </p>
      </div>

      {/* Organized data visualization */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
        <div className="space-y-3">
          {SNACK_DATA.sort((a, b) => b.count - a.count).map((snack, index) => (
            <div
              key={snack.name}
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span className="text-2xl">{snack.emoji}</span>
              <span className="flex-1 font-medium text-gray-700 dark:text-gray-300">
                {snack.name}
              </span>

              {/* Visual bar */}
              <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded transition-all duration-1000 ease-out',
                    index === 0 ? 'bg-green-500' : 'bg-blue-400'
                  )}
                  style={{
                    width: `${(snack.count / SNACK_DATA[0].count) * 100}%`,
                  }}
                />
              </div>

              <span
                className={cn(
                  'font-bold text-lg w-8 text-center',
                  index === 0 ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
                )}
              >
                {snack.count}
              </span>

              {index === 0 && (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-semibold rounded">
                  ¡Más popular!
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <div className="flex items-start gap-3">
          <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-800 dark:text-blue-200 font-semibold">
              Esto es una Tabla de Frecuencia
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
              Al <strong>organizar</strong> y <strong>contar</strong> los datos por categoría,
              podemos ver patrones claramente. ¡Vamos a aprender cómo construirla!
            </p>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>¡Aprender a construirla!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
