'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Lightbulb, Car, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 1; // "4 horas"

  const options = ['2 horas', '4 horas', '6 horas', '8 horas'];

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
          El Viaje en Auto
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Descubre las relaciones entre cantidades
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Dos amigos van a viajar a la playa en auto:
            </p>

            {/* Visual comparison */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
              {/* Pablo - slow */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex-1">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">Pablo</span>
                <div className="mt-2 text-center">
                  <span className="text-sm text-gray-500">Velocidad:</span>
                  <p className="text-xl font-bold text-blue-600">60 km/h</p>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm text-gray-500">Tiempo:</span>
                  <p className="text-xl font-bold text-green-600">2 horas</p>
                </div>
              </div>

              {/* Distance indicator */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl">🏖️</div>
                <span className="text-sm text-gray-500 mt-2">Misma distancia</span>
                <p className="text-lg font-bold text-amber-600">120 km</p>
              </div>

              {/* María - fast */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex-1">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-2">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">María</span>
                <div className="mt-2 text-center">
                  <span className="text-sm text-gray-500">Velocidad:</span>
                  <p className="text-xl font-bold text-pink-600">30 km/h</p>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm text-gray-500">Tiempo:</span>
                  <p className="text-xl font-bold text-gray-400">???</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              Si María viaja a la mitad de la velocidad de Pablo...
              <br />
              ¿Cuánto tiempo tardará María?
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Adivina la respuesta</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 text-center border border-purple-200 dark:border-purple-700">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              María viaja a 30 km/h para recorrer 120 km.
              <br />
              ¿Cuánto tiempo tardará?
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-center font-bold text-lg transition-all border-2',
                  selectedAnswer === index
                    ? showFeedback
                      ? index === correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                      : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                    : showFeedback && index === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Clock size={20} />
                  <span>{option}</span>
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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
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
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Veamos por qué...
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
              ¡Descubriste una proporción inversa!
            </h3>

            <div className="space-y-4">
              {/* Key insight */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-purple-600 dark:text-purple-400 mb-2">La relación:</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Pablo</p>
                    <p className="font-bold">60 km/h → 2 horas</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">María</p>
                    <p className="font-bold">30 km/h → 4 horas</p>
                  </div>
                </div>
              </div>

              {/* Pattern */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">El patrón:</p>
                <div className="text-center space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    Velocidad <span className="text-red-500 font-bold">÷ 2</span> → Tiempo <span className="text-green-500 font-bold">× 2</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Si una cantidad baja, la otra sube proporcionalmente
                  </p>
                </div>
              </div>

              {/* Verification */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Verificación:</p>
                <div className="font-mono text-center">
                  <p>60 × 2 = 120 km</p>
                  <p>30 × 4 = 120 km</p>
                  <p className="text-green-600 font-bold mt-2">¡Ambos recorren la misma distancia!</p>
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
                  Dos tipos de proporciones
                </h4>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Proporción directa:</strong> cuando una cantidad aumenta, la otra también aumenta.
                  </p>
                  <p>
                    <strong>Proporción inversa:</strong> cuando una cantidad aumenta, la otra disminuye.
                  </p>
                  <p className="text-sm mt-2">
                    Aprende a identificar y calcular ambos tipos de proporciones.
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
