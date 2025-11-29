'use client';

import { useState } from 'react';
import { Thermometer, Check, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'punta-arenas' | 'santiago' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const puntaArenasTemp = -5;
  const santiagoTemp = 25;
  const correctAnswer: 'punta-arenas' | 'santiago' = 'santiago'; // 25 is farther from 0 than -5

  const handleSelect = (city: 'punta-arenas' | 'santiago') => {
    if (hasAnswered) return;
    setSelectedAnswer(city);
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
          El Termómetro Loco
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Una pregunta para empezar a pensar...
        </p>
      </div>

      {/* Thermometer visualization */}
      <div className="flex justify-center gap-8 md:gap-16">
        {/* Punta Arenas */}
        <button
          onClick={() => handleSelect('punta-arenas')}
          disabled={hasAnswered}
          className={cn(
            'flex flex-col items-center p-4 rounded-2xl transition-all',
            selectedAnswer === 'punta-arenas'
              ? 'bg-blue-100 dark:bg-blue-900/50 ring-4 ring-blue-400'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800',
            hasAnswered && 'cursor-default'
          )}
        >
          <div className="relative mb-4">
            {/* Thermometer */}
            <div className="w-8 h-40 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
              {/* Mercury */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000"
                style={{ height: '20%' }}
              />
              {/* Bulb */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full" />
            </div>
            {/* Temperature label */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded-lg font-bold text-lg">
              {puntaArenasTemp}°C
            </div>
          </div>
          <span className="font-semibold text-gray-800 dark:text-gray-200">Punta Arenas</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Ayer</span>
        </button>

        {/* Santiago */}
        <button
          onClick={() => handleSelect('santiago')}
          disabled={hasAnswered}
          className={cn(
            'flex flex-col items-center p-4 rounded-2xl transition-all',
            selectedAnswer === 'santiago'
              ? 'bg-orange-100 dark:bg-orange-900/50 ring-4 ring-orange-400'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800',
            hasAnswered && 'cursor-default'
          )}
        >
          <div className="relative mb-4">
            {/* Thermometer */}
            <div className="w-8 h-40 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
              {/* Mercury */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600 to-orange-400 transition-all duration-1000"
                style={{ height: '75%' }}
              />
              {/* Bulb */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full" />
            </div>
            {/* Temperature label */}
            <div className="absolute -right-12 top-1/4 bg-orange-500 text-white px-2 py-1 rounded-lg font-bold text-lg">
              {santiagoTemp}°C
            </div>
          </div>
          <span className="font-semibold text-gray-800 dark:text-gray-200">Santiago</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Hoy</span>
        </button>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 text-center">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          ¿Cuál temperatura está más lejos de 0°C?
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Haz clic en la ciudad que crees que tiene la temperatura más alejada del cero
        </p>
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
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
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
                  <strong>Santiago (25°C)</strong> está más lejos de 0°C que Punta Arenas (-5°C).
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  25 unidades de distancia es más que 5 unidades de distancia.
                </p>
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <p className="text-purple-800 dark:text-purple-200 font-medium">
              Esta idea de &ldquo;distancia desde el cero&rdquo; es muy importante en matemáticas.
              Se llama <strong>valor absoluto</strong>, y vamos a explorarlo en esta lección.
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
      )}
    </div>
  );
}
