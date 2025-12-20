'use client';

import { useState } from 'react';
import { Users, Check, X, ArrowRight, Lightbulb, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 1; // 15 days

  const options = ['10 días', '15 días', '20 días', '30 días'];

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
          El Proyecto de Construcción
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Descubre cómo las cantidades se relacionan en la vida real
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Una constructora está trabajando en un proyecto:
            </p>

            {/* Construction display */}
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {/* Workers */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-12 bg-blue-500 rounded-t-full flex items-center justify-center"
                    >
                      <Users className="w-5 h-5 text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  4 trabajadores
                </span>
                <span className="text-sm text-gray-500">equipo actual</span>
              </div>

              <div className="flex items-center text-2xl font-bold text-gray-400">→</div>

              {/* Time */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border-2 border-green-400">
                <Clock className="w-12 h-12 text-green-500 mb-2" />
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  30 días
                </span>
                <span className="text-sm text-gray-500">para terminar</span>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 text-center">
              <p className="text-amber-800 dark:text-amber-200 font-medium">
                El cliente quiere acelerar el proyecto y decide{' '}
                <strong className="text-orange-600 dark:text-orange-400">duplicar</strong> el número
                de trabajadores.
              </p>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
            >
              <span>¿En cuántos días terminará ahora?</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 text-center border border-purple-200 dark:border-purple-700">
            <div className="flex justify-center gap-4 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-10 bg-blue-500 rounded-t-full flex items-center justify-center"
                  >
                    <Users className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Con <strong>8 trabajadores</strong>, ¿en cuántos días terminará el proyecto?
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
                <div className="flex items-center justify-center gap-3">
                  <span
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      selectedAnswer === index
                        ? showFeedback
                          ? index === correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-purple-500 text-white'
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
              <p
                className={cn(
                  'font-semibold',
                  isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
                )}
              >
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
              La clave está en la relación:
            </h3>

            <div className="space-y-4">
              {/* Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-2">Situación Original</p>
                  <p className="font-bold text-blue-600 dark:text-blue-400">4 trabajadores</p>
                  <p className="text-2xl font-mono font-bold">30 días</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-2">Situación Nueva</p>
                  <p className="font-bold text-blue-600 dark:text-blue-400">8 trabajadores</p>
                  <p className="text-2xl font-mono font-bold text-green-600">15 días</p>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  ¿Qué pasó?
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    • Trabajadores: <span className="font-mono">4 → 8</span> (se{' '}
                    <strong className="text-green-600">duplicaron</strong>)
                  </p>
                  <p>
                    • Días: <span className="font-mono">30 → 15</span> (se{' '}
                    <strong className="text-red-600">redujeron a la mitad</strong>)
                  </p>
                </div>
              </div>

              {/* Key insight */}
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                <p className="text-amber-800 dark:text-amber-200 font-medium text-center">
                  <strong>Más trabajadores = Menos tiempo</strong>
                  <br />
                  <span className="text-sm">
                    Cuando una cantidad aumenta y la otra disminuye proporcionalmente, se llama{' '}
                    <strong>proporcionalidad inversa</strong>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to lesson */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
                  En esta lección aprenderás
                </h4>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    A resolver problemas con <strong>proporcionalidad directa</strong> (cuando ambas
                    cantidades van en la misma dirección) y <strong>proporcionalidad inversa</strong>{' '}
                    (cuando van en direcciones opuestas).
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
