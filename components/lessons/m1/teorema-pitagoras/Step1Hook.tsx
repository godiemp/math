'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'yes' | 'no' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // The ladder is 5m, wall height is 4m, distance from wall is 3m
  // 3-4-5 triangle - the ladder EXACTLY reaches (5² = 3² + 4²)
  const ladderLength = 5;
  const wallHeight = 4;
  const distanceFromWall = 3;
  const correctAnswer: 'yes' | 'no' = 'yes';

  const handleSelect = (answer: 'yes' | 'no') => {
    if (hasAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowResult(true);
    setHasAnswered(true);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Problema de la Escalera
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Un desafío para empezar a pensar...
        </p>
      </div>

      {/* Visual: Ladder against wall */}
      <div className="flex justify-center">
        <div className="relative w-80 h-72">
          {/* SVG Scene */}
          <svg viewBox="0 0 320 260" className="w-full h-full">
            {/* Ground */}
            <line x1="0" y1="220" x2="320" y2="220" stroke="#9CA3AF" strokeWidth="3" />
            <pattern id="grass" patternUnits="userSpaceOnUse" width="20" height="10">
              <path d="M0,10 Q5,0 10,10 Q15,0 20,10" fill="none" stroke="#22C55E" strokeWidth="1.5" />
            </pattern>
            <rect x="0" y="220" width="320" height="20" fill="url(#grass)" opacity="0.5" />

            {/* Wall (building) */}
            <rect x="200" y="40" width="120" height="180" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
            <rect x="220" y="120" width="30" height="40" fill="#93C5FD" stroke="#60A5FA" strokeWidth="1" />
            <rect x="270" y="120" width="30" height="40" fill="#93C5FD" stroke="#60A5FA" strokeWidth="1" />

            {/* Target window - positioned where ladder reaches (y=60) */}
            <rect x="220" y="60" width="30" height="40" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
            <line x1="235" y1="60" x2="235" y2="100" stroke="#F59E0B" strokeWidth="1" />
            <line x1="220" y1="80" x2="250" y2="80" stroke="#F59E0B" strokeWidth="1" />

            {/* Window label */}
            <text x="235" y="55" textAnchor="middle" className="text-xs fill-amber-600 font-bold">
              Ventana
            </text>

            {/* Wall height measurement - from window (y=60) to ground (y=220) = 160px = 4m */}
            <line x1="195" y1="60" x2="195" y2="220" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,3" />
            <text x="175" y="145" textAnchor="middle" className="text-sm fill-purple-600 font-bold">
              {wallHeight}m
            </text>

            {/* Ground distance measurement */}
            <line x1="80" y1="235" x2="200" y2="235" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,3" />
            <text x="140" y="252" textAnchor="middle" className="text-sm fill-blue-600 font-bold">
              {distanceFromWall}m
            </text>

            {/* Ladder */}
            <line
              x1="80" y1="220"
              x2="200" y2="60"
              stroke="#92400E"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Ladder rungs */}
            {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
              const x1 = 80 + (200 - 80) * t;
              const y1 = 220 + (60 - 220) * t;
              const perpX = -8;
              const perpY = -6;
              return (
                <line
                  key={i}
                  x1={x1 - perpX}
                  y1={y1 - perpY}
                  x2={x1 + perpX}
                  y2={y1 + perpY}
                  stroke="#78350F"
                  strokeWidth="3"
                />
              );
            })}

            {/* Ladder length label */}
            <text x="110" y="130" textAnchor="middle" className="text-sm fill-amber-800 font-bold" transform="rotate(-53, 110, 130)">
              {ladderLength}m
            </text>

            {/* Person icon */}
            <circle cx="60" cy="200" r="12" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
            <line x1="60" y1="212" x2="60" y2="235" stroke="#F59E0B" strokeWidth="3" />
            <line x1="60" y1="220" x2="50" y2="230" stroke="#F59E0B" strokeWidth="3" />
            <line x1="60" y1="220" x2="70" y2="230" stroke="#F59E0B" strokeWidth="3" />
            <line x1="60" y1="235" x2="52" y2="250" stroke="#F59E0B" strokeWidth="3" />
            <line x1="60" y1="235" x2="68" y2="250" stroke="#F59E0B" strokeWidth="3" />

            {/* Question mark above person */}
            <text x="60" y="180" textAnchor="middle" className="text-2xl fill-purple-600 font-bold">
              ?
            </text>
          </svg>
        </div>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Una escalera de <strong>{ladderLength} metros</strong> está apoyada contra una pared.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              La base de la escalera está a <strong>{distanceFromWall} metros</strong> de la pared.
              La ventana está a <strong>{wallHeight} metros</strong> de altura.
            </p>
            <p className="text-lg font-bold text-green-700 dark:text-green-300 mt-4">
              ¿La escalera alcanza exactamente la ventana?
            </p>
          </div>
        </div>
      </div>

      {/* Answer options */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleSelect('yes')}
          disabled={hasAnswered}
          className={cn(
            'px-8 py-4 rounded-xl font-semibold text-lg transition-all',
            selectedAnswer === 'yes'
              ? 'bg-green-500 text-white ring-4 ring-green-300'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/30 border-2 border-gray-200 dark:border-gray-700',
            hasAnswered && 'cursor-default'
          )}
        >
          Sí, alcanza
        </button>
        <button
          onClick={() => handleSelect('no')}
          disabled={hasAnswered}
          className={cn(
            'px-8 py-4 rounded-xl font-semibold text-lg transition-all',
            selectedAnswer === 'no'
              ? 'bg-red-500 text-white ring-4 ring-red-300'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/30 border-2 border-gray-200 dark:border-gray-700',
            hasAnswered && 'cursor-default'
          )}
        >
          No alcanza
        </button>
      </div>

      {/* Submit button or result */}
      {!showResult ? (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Ver Respuesta
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {/* Result feedback */}
          <div
            className={cn(
              'p-6 rounded-xl border-2',
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
            )}
          >
            <div className="flex items-start gap-4">
              {isCorrect ? (
                <Check className="w-8 h-8 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-8 h-8 text-amber-600 flex-shrink-0" />
              )}
              <div>
                <h3 className={cn(
                  'font-bold text-lg mb-2',
                  isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {isCorrect ? '¡Correcto!' : '¡Casi!'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Sí, la escalera alcanza exactamente.</strong> Pero, ¿cómo lo sabemos sin medirlo físicamente?
                </p>
              </div>
            </div>
          </div>

          {/* Calculation reveal */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¿Cómo lo sabemos?
            </h4>
            <div className="space-y-3 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Hay una relación especial entre los tres lados:
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-4">
                <div className="space-y-2">
                  <MathDisplay latex={`${distanceFromWall}^2 + ${wallHeight}^2 = ${distanceFromWall * distanceFromWall} + ${wallHeight * wallHeight} = ${distanceFromWall * distanceFromWall + wallHeight * wallHeight}`} displayMode />
                  <MathDisplay latex={`${ladderLength}^2 = ${ladderLength * ladderLength}`} displayMode />
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-green-700 dark:text-green-300 font-bold">
                    ¡Son iguales! <MathDisplay latex={`${distanceFromWall * distanceFromWall + wallHeight * wallHeight} = ${ladderLength * ladderLength}`} />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <p className="text-purple-800 dark:text-purple-200 font-medium">
              Esta situación forma un <strong>triángulo rectángulo</strong> (tiene un ángulo de 90°).
              La relación que acabas de ver es el <strong>Teorema de Pitágoras</strong>.
            </p>
            <p className="text-purple-700 dark:text-purple-300 mt-2 text-sm">
              Vamos a descubrir por qué siempre funciona.
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Descubrir el Patrón</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
