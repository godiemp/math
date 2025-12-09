'use client';

import { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, ArrowRight, Check, Target, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'challenge1' | 'challenge2' | 'challenge3' | 'summary';

const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

interface Challenge {
  question: string;
  description: string;
  validFaces: number[]; // 1-indexed face values that satisfy the condition
  correctFraction: string;
}

const CHALLENGES: Challenge[] = [
  {
    question: '¿Cuántas caras muestran un número mayor que 4?',
    description: 'Selecciona las caras que cumplen la condición.',
    validFaces: [5, 6],
    correctFraction: '2/6',
  },
  {
    question: '¿Cuántas caras muestran un número menor que 3?',
    description: 'Selecciona las caras que cumplen la condición.',
    validFaces: [1, 2],
    correctFraction: '2/6',
  },
  {
    question: '¿Cuántas caras muestran un múltiplo de 3?',
    description: 'Recuerda: los múltiplos de 3 son 3, 6, 9...',
    validFaces: [3, 6],
    correctFraction: '2/6',
  },
];

export default function Step2ExploreDice({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedFaces, setSelectedFaces] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);

  const currentChallenge = CHALLENGES[challengeIndex];

  const toggleFace = (faceValue: number) => {
    if (showFeedback) return;
    setSelectedFaces(prev =>
      prev.includes(faceValue)
        ? prev.filter(f => f !== faceValue)
        : [...prev, faceValue]
    );
  };

  const checkAnswer = () => {
    setShowFeedback(true);
  };

  const nextChallenge = () => {
    setShowFeedback(false);
    setSelectedFaces([]);
    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex(prev => prev + 1);
      setPhase(`challenge${challengeIndex + 2}` as Phase);
    } else {
      setPhase('summary');
    }
  };

  const isCorrectSelection = () => {
    const sorted1 = [...selectedFaces].sort();
    const sorted2 = [...currentChallenge.validFaces].sort();
    return sorted1.length === sorted2.length && sorted1.every((val, idx) => val === sorted2[idx]);
  };

  if (!isActive) return null;

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Explorando Posibilidades
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubramos cómo contar los casos favorables
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-500" />
              <p className="text-lg text-gray-800 dark:text-gray-200">
                Para calcular una probabilidad, necesitamos identificar:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  Casos Favorables
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Los resultados que queremos (que cumplen nuestra condición)
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  Casos Posibles
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Todos los resultados que pueden ocurrir
                </p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mt-4">
              <p className="text-amber-800 dark:text-amber-200 text-center">
                En un dado de 6 caras, siempre hay <strong>6 casos posibles</strong>.
                <br />
                Lo que cambia es cuántos <strong>casos favorables</strong> hay según lo que buscamos.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('challenge1')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Practicar identificando casos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ CHALLENGES ============
  if (phase.startsWith('challenge')) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Desafío {challengeIndex + 1} de {CHALLENGES.length}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {currentChallenge.description}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {CHALLENGES.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                idx < challengeIndex
                  ? 'bg-green-500'
                  : idx === challengeIndex
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        {/* Question */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 text-center">
            {currentChallenge.question}
          </p>
        </div>

        {/* Interactive dice grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-6 gap-3">
            {DICE_ICONS.map((DiceIcon, index) => {
              const faceValue = index + 1;
              const isSelected = selectedFaces.includes(faceValue);
              const isCorrect = currentChallenge.validFaces.includes(faceValue);

              return (
                <button
                  key={faceValue}
                  onClick={() => toggleFace(faceValue)}
                  disabled={showFeedback}
                  className={cn(
                    'w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all border-2',
                    showFeedback
                      ? isCorrect
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                        : isSelected
                        ? 'bg-red-100 dark:bg-red-900/50 border-red-500'
                        : 'bg-gray-50 dark:bg-gray-800 border-transparent'
                      : isSelected
                      ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 scale-105'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  )}
                >
                  <DiceIcon className={cn(
                    'w-8 h-8',
                    showFeedback
                      ? isCorrect
                        ? 'text-green-600 dark:text-green-400'
                        : isSelected
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-400'
                      : isSelected
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500'
                  )} />
                  <span className={cn(
                    'text-xs font-bold mt-1',
                    showFeedback && isCorrect
                      ? 'text-green-600 dark:text-green-400'
                      : showFeedback && isSelected
                      ? 'text-red-600 dark:text-red-400'
                      : isSelected
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500'
                  )}>
                    {faceValue}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selection counter */}
        <div className="text-center text-gray-600 dark:text-gray-400">
          Seleccionados: <strong className="text-blue-600 dark:text-blue-400">{selectedFaces.length}</strong> de 6
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={cn(
            'p-4 rounded-xl animate-fadeIn',
            isCorrectSelection()
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
          )}>
            <div className="flex items-start gap-3">
              {isCorrectSelection() ? (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <Target className="w-6 h-6 text-amber-600 flex-shrink-0" />
              )}
              <div>
                <p className={cn(
                  'font-bold',
                  isCorrectSelection() ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {isCorrectSelection() ? '¡Correcto!' : 'Observa la respuesta correcta'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Los casos favorables son: {currentChallenge.validFaces.join(', ')}.
                  <br />
                  Entonces la probabilidad es <strong>{currentChallenge.correctFraction}</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-center">
          {!showFeedback ? (
            <button
              onClick={checkAnswer}
              disabled={selectedFaces.length === 0}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                selectedFaces.length > 0
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={nextChallenge}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>{challengeIndex < CHALLENGES.length - 1 ? 'Siguiente desafío' : 'Ver resumen'}</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Excelente trabajo!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Has identificado casos favorables en diferentes situaciones
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <span className="text-lg font-semibold text-green-800 dark:text-green-200">
            Lo que descubriste:
          </span>
        </div>

        <div className="space-y-3">
          {CHALLENGES.map((challenge, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {challenge.question.replace('¿', '').replace('?', '')}
                </p>
              </div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {challenge.correctFraction}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 text-center">
          <strong>Patrón importante:</strong>
          <br />
          La probabilidad siempre se expresa como una fracción:
        </p>
        <div className="mt-3 text-center">
          <div className="inline-block bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-sm">
            <div className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
              Casos Favorables
            </div>
            <div className="border-t-2 border-gray-300 dark:border-gray-600 my-1" />
            <div className="text-lg text-purple-600 dark:text-purple-400 font-semibold">
              Casos Posibles
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Aprender la fórmula</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
