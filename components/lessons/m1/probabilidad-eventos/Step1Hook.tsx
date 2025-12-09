'use client';

import { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, ArrowRight, Check, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingDice, setShowingDice] = useState(false);

  // Correct answer: 3 out of 6 faces are even (2, 4, 6)
  const correctAnswer = 1; // Index for "3 de 6" option

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Juego de Dados
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un desafío para comenzar...
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Imagina que tienes un <strong>dado común de 6 caras</strong>.
            </p>

            {/* Animated dice display */}
            <div className="flex justify-center gap-3 py-4">
              {DICE_ICONS.map((DiceIcon, index) => (
                <div
                  key={index}
                  className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center transform hover:scale-110 transition-transform"
                >
                  <DiceIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Tu amigo te propone una apuesta:
            </p>

            <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-600">
              <p className="text-amber-800 dark:text-amber-200 font-semibold text-lg">
                &ldquo;Si sale un número <strong>PAR</strong>, tú ganas.
                <br />
                Si sale <strong>IMPAR</strong>, yo gano.&rdquo;
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Es una apuesta justa? 🤔
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
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
      setShowingDice(true);
      setTimeout(() => {
        setPhase('result');
      }, 1500);
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Juego de Dados
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuántas caras te favorecen?
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <p className="text-blue-800 dark:text-blue-200">
              De las 6 caras del dado, <strong>¿cuántas muestran un número PAR?</strong>
            </p>
          </div>
        </div>

        {/* Visual dice representation */}
        <div className="flex justify-center gap-3 py-2">
          {DICE_ICONS.map((DiceIcon, index) => {
            const value = index + 1;
            const isPar = value % 2 === 0;
            return (
              <div
                key={index}
                className={cn(
                  'w-14 h-14 rounded-lg shadow-md flex flex-col items-center justify-center transition-all',
                  showingDice && isPar
                    ? 'bg-green-100 dark:bg-green-900/50 ring-2 ring-green-500 scale-110'
                    : 'bg-white dark:bg-gray-800'
                )}
              >
                <DiceIcon className={cn(
                  'w-8 h-8',
                  showingDice && isPar
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400'
                )} />
                <span className={cn(
                  'text-xs font-bold mt-1',
                  showingDice && isPar
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500'
                )}>
                  {value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '2 de 6', value: 0 },
            { label: '3 de 6', value: 1 },
            { label: '4 de 6', value: 2 },
            { label: '1 de 6', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={showingDice}
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
            disabled={selectedAnswer === null || showingDice}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null && !showingDice
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            {showingDice ? 'Verificando...' : 'Verificar'}
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
          El Juego de Dados
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
              Hay exactamente <strong>3 caras pares</strong>: el 2, el 4 y el 6.
            </p>
          </div>
        </div>
      </div>

      {/* Visual demonstration */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <div className="flex justify-center gap-4">
          {DICE_ICONS.map((DiceIcon, index) => {
            const value = index + 1;
            const isPar = value % 2 === 0;
            return (
              <div
                key={index}
                className={cn(
                  'w-14 h-14 rounded-lg shadow-md flex flex-col items-center justify-center',
                  isPar
                    ? 'bg-green-100 dark:bg-green-900/50 ring-2 ring-green-500'
                    : 'bg-gray-100 dark:bg-gray-700'
                )}
              >
                <DiceIcon className={cn(
                  'w-8 h-8',
                  isPar
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-400 dark:text-gray-500'
                )} />
                <span className={cn(
                  'text-xs font-bold mt-1',
                  isPar ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                )}>
                  {isPar ? 'PAR' : 'impar'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Probability insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
          Esto significa que la <strong>probabilidad</strong> de sacar un número par es:
        </p>
        <div className="mt-3 text-center">
          <span className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            3 de 6 = ½ = 50%
          </span>
        </div>
        <p className="text-purple-700 dark:text-purple-300 mt-3 text-sm text-center">
          ¡La apuesta era justa! Ambos tienen la misma probabilidad de ganar.
          <br />
          En esta lección aprenderás a calcular probabilidades como esta.
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
