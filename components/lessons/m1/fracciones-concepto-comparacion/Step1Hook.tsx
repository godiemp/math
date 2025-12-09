'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

interface Friend {
  name: string;
  fraction: string;
  numerator: number;
  denominator: number;
  color: string;
  bgColor: string;
}

const FRIENDS: Friend[] = [
  { name: 'Ana', fraction: '1/2', numerator: 1, denominator: 2, color: 'text-pink-600', bgColor: 'bg-pink-100 dark:bg-pink-900/30' },
  { name: 'Bruno', fraction: '1/3', numerator: 1, denominator: 3, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'Carlos', fraction: '1/4', numerator: 1, denominator: 4, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
];

// Chocolate bar component
function ChocolateBar({
  denominator,
  numerator,
  showDivisions = true,
  highlight = false,
  animate = false,
  color = 'bg-amber-700'
}: {
  denominator: number;
  numerator: number;
  showDivisions?: boolean;
  highlight?: boolean;
  animate?: boolean;
  color?: string;
}) {
  return (
    <div className={cn(
      'relative w-full h-10 rounded-lg overflow-hidden border-2 border-amber-900 dark:border-amber-600',
      animate && 'transition-all duration-500'
    )}>
      {/* Chocolate segments */}
      <div className="flex h-full">
        {Array.from({ length: denominator }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-full transition-all duration-300',
              i < numerator
                ? highlight ? 'bg-amber-500' : 'bg-amber-700 dark:bg-amber-600'
                : 'bg-amber-200 dark:bg-amber-900/50',
              showDivisions && i > 0 && 'border-l-2 border-amber-900 dark:border-amber-500'
            )}
            style={{
              transitionDelay: animate ? `${i * 100}ms` : '0ms'
            }}
          />
        ))}
      </div>
      {/* Chocolate texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    </div>
  );
}

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [showBars, setShowBars] = useState(false);

  const correctAnswer = 'Ana'; // 1/2 is the biggest
  const isCorrect = selectedFriend === correctAnswer;

  if (!isActive) return null;

  // ============ PHASE 1: SCENARIO ============
  if (phase === 'scenario') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Chocolate Perfecto
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un problema delicioso para empezar...
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Tres amigos quieren compartir una barra de chocolate.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Cada uno pide una parte diferente:
            </p>

            {/* Friends and their requests */}
            <div className="flex justify-center gap-4 flex-wrap py-4">
              {FRIENDS.map((friend) => (
                <div
                  key={friend.name}
                  className={cn(
                    'px-4 py-3 rounded-xl',
                    friend.bgColor
                  )}
                >
                  <span className={cn('font-bold', friend.color)}>{friend.name}</span>
                  <span className="text-gray-700 dark:text-gray-300"> quiere </span>
                  <span className={cn('font-bold text-xl', friend.color)}>{friend.fraction}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-amber-200 dark:border-amber-700 pt-4 mt-4">
              <p className="text-amber-700 dark:text-amber-300 font-medium">
                Todos quieren la porción más grande posible...
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
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Chocolate Perfecto
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Quién recibirá más chocolate?
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
          <p className="text-lg font-semibold text-amber-800 dark:text-amber-200 text-center">
            Si la barra se divide de forma justa,<br/>
            <strong>¿quién se lleva la porción más grande?</strong>
          </p>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {FRIENDS.map((friend) => (
            <button
              key={friend.name}
              onClick={() => setSelectedFriend(friend.name)}
              className={cn(
                'flex flex-col items-center p-5 rounded-2xl transition-all min-w-[120px]',
                selectedFriend === friend.name
                  ? `${friend.bgColor} ring-4 ring-offset-2 scale-105`
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
                selectedFriend === friend.name && friend.name === 'Ana' && 'ring-pink-400',
                selectedFriend === friend.name && friend.name === 'Bruno' && 'ring-blue-400',
                selectedFriend === friend.name && friend.name === 'Carlos' && 'ring-green-400'
              )}
            >
              <span className={cn(
                'font-bold text-xl mb-1',
                selectedFriend === friend.name ? friend.color : 'text-gray-700 dark:text-gray-200'
              )}>
                {friend.name}
              </span>
              <span className={cn(
                'text-2xl font-bold',
                selectedFriend === friend.name ? friend.color : 'text-gray-500 dark:text-gray-400'
              )}>
                {friend.fraction}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setPhase('reveal');
              setTimeout(() => setShowBars(true), 300);
            }}
            disabled={!selectedFriend}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedFriend
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
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
            El Chocolate Perfecto
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Veamos cómo se divide el chocolate!
          </p>
        </div>

        {/* Animated chocolate bars */}
        <div className="space-y-4 max-w-md mx-auto">
          {FRIENDS.map((friend, index) => (
            <div
              key={friend.name}
              className={cn(
                'p-4 rounded-xl transition-all duration-500',
                showBars ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                friend.bgColor
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn('font-bold', friend.color)}>
                  {friend.name}: {friend.fraction}
                </span>
                {showBars && friend.name === 'Ana' && (
                  <span className="text-xs bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 px-2 py-1 rounded-full font-medium animate-pulse">
                    ¡Más grande!
                  </span>
                )}
              </div>
              <ChocolateBar
                denominator={friend.denominator}
                numerator={friend.numerator}
                highlight={true}
                animate={showBars}
              />
            </div>
          ))}
        </div>

        {/* Insight box */}
        {showBars && (
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700 animate-fadeIn max-w-md mx-auto">
            <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
              <strong>¡Sorpresa!</strong> Aunque 4 es mayor que 2,<br/>
              <span className="text-pink-600 dark:text-pink-400 font-bold">1/2</span> es mayor que{' '}
              <span className="text-green-600 dark:text-green-400 font-bold">1/4</span>
            </p>
            <p className="text-purple-700 dark:text-purple-300 mt-2 text-sm text-center">
              Mientras más partes divides algo, ¡más pequeña es cada parte!
            </p>
          </div>
        )}

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
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Chocolate Perfecto
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Qué aprendimos?
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
              {isCorrect ? '¡Excelente!' : '¡Buena intuición!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {isCorrect
                ? 'Sabías que 1/2 es la fracción más grande. ¡Bien pensado!'
                : 'Muchos piensan que un número más grande abajo significa una fracción más grande. ¡Pero es al revés!'}
            </p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-center text-lg">
          El Secreto de las Fracciones
        </h4>
        <div className="space-y-3 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            El número de <strong>abajo</strong> (denominador) indica en cuántas partes se divide el entero.
          </p>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <span className="text-pink-600">1/2</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-blue-600">1/3</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-green-600">1/4</span>
          </div>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            ¡Más divisiones = partes más pequeñas!
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
