'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle, Sparkles, CloudRain, Umbrella } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingResult, setShowingResult] = useState(false);

  // Correct answer: P(lluvia | nubes) = 6/8 = 3/4 = 75%
  const correctAnswer = 2; // Index for "75%" option

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Pronóstico del Tiempo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Una situación para analizar...
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <div className="flex justify-center gap-4">
              <div className="relative">
                <CloudRain className="w-16 h-16 text-blue-500" />
              </div>
              <div className="relative">
                <Umbrella className="w-14 h-14 text-cyan-500" />
              </div>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Estás revisando los datos meteorológicos del último mes (30 días).
            </p>

            {/* Weather data display */}
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-gray-600 dark:text-gray-400">Días con nubes</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">8 días</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-3">
                  <p className="text-gray-600 dark:text-gray-400">Días con lluvia</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">6 días</p>
                </div>
              </div>
              <div className="bg-cyan-100 dark:bg-cyan-900/50 rounded-lg p-3">
                <p className="text-gray-600 dark:text-gray-400">Días con nubes Y lluvia</p>
                <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">6 días</p>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-600">
              <p className="text-amber-800 dark:text-amber-200">
                <strong>Hoy hay nubes.</strong>
                <br />
                ¿Deberías llevar paraguas? 🤔
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
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
      setShowingResult(true);
      setTimeout(() => {
        setPhase('result');
      }, 1500);
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Pronóstico del Tiempo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Dado que hoy hay nubes...
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                <strong>Sabiendo que hoy hay nubes</strong>, ¿cuál es la probabilidad de que llueva?
              </p>
              <p className="text-blue-700 dark:text-blue-300 mt-2 text-sm">
                Recuerda: De los 8 días con nubes, 6 tuvieron lluvia.
              </p>
            </div>
          </div>
        </div>

        {/* Visual reminder */}
        <div className="flex justify-center gap-4 py-2">
          <div className={cn(
            'px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all',
            'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
            showingResult && 'ring-2 ring-blue-400'
          )}>
            <CloudRain className="w-5 h-5" />
            <span>8 días nubes</span>
          </div>
          <div className={cn(
            'px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all',
            'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300',
            showingResult && 'ring-2 ring-green-400'
          )}>
            <Umbrella className="w-5 h-5" />
            <span>6 con lluvia</span>
          </div>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '20%', value: 0, detail: '6/30' },
            { label: '27%', value: 1, detail: '8/30' },
            { label: '75%', value: 2, detail: '6/8' },
            { label: '100%', value: 3, detail: '6/6' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={showingResult}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2 text-lg',
                selectedAnswer === option.value
                  ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              <div>{option.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{option.detail}</div>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null || showingResult}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null && !showingResult
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            {showingResult ? 'Verificando...' : 'Verificar'}
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: RESULT ============
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Pronóstico del Tiempo
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
              La respuesta correcta es <strong>75%</strong> (6/8).
            </p>
          </div>
        </div>
      </div>

      {/* Visual explanation */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <div className="text-center space-y-3">
          <p className="text-gray-600 dark:text-gray-400">De los 30 días totales...</p>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg px-3 py-2">
              <span className="font-bold text-gray-800 dark:text-gray-200">8 días</span>
              <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">con nubes</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div className="bg-blue-200 dark:bg-blue-800 rounded-lg px-3 py-2">
              <span className="font-bold text-blue-800 dark:text-blue-200">6 días</span>
              <span className="text-blue-600 dark:text-blue-400 text-sm ml-1">llovió</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-xl p-5 border border-cyan-200 dark:border-cyan-700">
        <p className="text-cyan-800 dark:text-cyan-200 font-medium text-center mb-3">
          ¿Por qué NO es 6/30 = 20%?
        </p>
        <div className="space-y-2 text-center text-gray-700 dark:text-gray-300">
          <p>
            Porque ya <strong>sabemos</strong> que hoy hay nubes.
          </p>
          <p>
            No estamos preguntando por cualquier día aleatorio del mes.
          </p>
          <p className="font-semibold text-cyan-700 dark:text-cyan-300">
            Solo nos interesan los 8 días que tuvieron nubes.
          </p>
          <div className="mt-3 text-2xl font-bold text-cyan-900 dark:text-cyan-100">
            P(lluvia | nubes) = 6/8 = 75%
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-purple-800 dark:text-purple-200 font-semibold mb-2">
              Observación importante:
            </p>
            <p className="text-purple-700 dark:text-purple-300">
              Cuando tenemos <strong>información adicional</strong> (como &ldquo;hay nubes&rdquo;),
              la probabilidad cambia. Esto se llama <strong>probabilidad condicional</strong>.
            </p>
            <p className="text-purple-600 dark:text-purple-400 mt-2 text-sm">
              ¡Eso es exactamente lo que exploraremos en esta lección! 🎯
            </p>
          </div>
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
