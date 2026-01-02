'use client';

import { useState } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { cn } from '@/lib/utils';

type Phase = 'scenario' | 'question' | 'result';

const OPTIONS = ['2 veces', '10 veces', '100 veces', '1000 veces'];
const CORRECT_ANSWER = 2; // 20 dB difference = 10^2 = 100 times

const SOUND_LEVELS = [
  { name: 'Susurro', db: 20, emoji: '🤫', color: 'bg-green-100 dark:bg-green-900/30' },
  { name: 'Conversación', db: 60, emoji: '💬', color: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { name: 'Concierto', db: 120, emoji: '🎸', color: 'bg-red-100 dark:bg-red-900/30' },
];

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!isActive) return null;

  const handleCheck = () => {
    setShowFeedback(true);
    setTimeout(() => {
      setPhase('result');
    }, 1500);
  };

  const isCorrect = selectedAnswer === CORRECT_ANSWER;

  // ============ PHASE 1: SCENARIO ============
  if (phase === 'scenario') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Volume2 className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              El Laboratorio de Sonido
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Misterio de los Decibeles
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Por qué el volumen se mide de forma tan extraña?
          </p>
        </div>

        {/* Sound engineer scenario */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
            María es <strong className="text-blue-600">ingeniera de sonido</strong> en un estudio de grabación.
            Ella mide el volumen en <strong>decibeles (dB)</strong>.
          </p>

          {/* Sound level visualization */}
          <div className="space-y-3 mb-4">
            {SOUND_LEVELS.map((sound, i) => (
              <div
                key={i}
                className={cn('flex items-center gap-4 p-3 rounded-xl', sound.color)}
              >
                <div className="text-3xl">{sound.emoji}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{sound.name}</p>
                </div>
                <div className="text-center min-w-[60px]">
                  <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{sound.db}</p>
                  <p className="text-xs text-gray-500">dB</p>
                </div>
              </div>
            ))}
          </div>

          {/* The puzzle */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
            <p className="text-blue-800 dark:text-blue-200 text-center">
              <strong>Dato curioso:</strong> María nota que cada <strong>20 dB más</strong> no es simplemente &quot;el doble de fuerte&quot;...
            </p>
          </div>
        </div>

        {/* The question preview */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-center">
            <VolumeX className="inline w-4 h-4 mr-1" />
            <strong>La pregunta:</strong> Si un concierto (120 dB) tiene 20 dB más que una conversación fuerte (100 dB),
            ¿cuántas veces más <strong>intensa</strong> es la energía sonora?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Resolver el misterio</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <span className="text-2xl">🔊</span>
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">
              El desafío
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Cuántas veces más intenso?
          </h2>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
          <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
            La fórmula de los decibeles es:
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center mb-4">
            <p className="font-mono text-xl text-indigo-600 font-bold">
              dB = 10 · log₁₀(I/I₀)
            </p>
            <p className="text-gray-500 text-sm mt-2">I = intensidad del sonido</p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Si la diferencia es <span className="font-bold text-indigo-600">20 dB</span>, entonces:
          </p>
          <p className="font-mono text-center mt-2">
            20 = 10 · log₁₀(I₂/I₁)
          </p>
          <p className="font-mono text-center">
            2 = log₁₀(I₂/I₁)
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-center mt-2">
            ¿Cuánto es I₂/I₁?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl border-2 font-medium transition-all',
                showFeedback
                  ? index === CORRECT_ANSWER
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-400'
                  : selectedAnswer === index
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 text-gray-700 dark:text-gray-300'
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={cn(
            'p-4 rounded-xl text-center animate-fadeIn',
            isCorrect
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
          )}>
            <p className="font-semibold">
              {isCorrect ? '¡Exacto! 🎉' : '¡Casi! Veamos por qué...'}
            </p>
          </div>
        )}

        {!showFeedback && (
          <div className="flex justify-center">
            <button
              onClick={handleCheck}
              disabled={selectedAnswer === null}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all',
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: RESULT ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <span className="text-2xl">🔬</span>
          <span className="text-green-700 dark:text-green-300 font-medium">
            ¡El poder de los logaritmos!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Escalas Logarítmicas
        </h2>
      </div>

      {/* The explanation */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
          La respuesta es <strong className="text-green-600">100 veces</strong> porque:
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4">
          <div className="text-center space-y-3">
            <p className="font-mono">log₁₀(I₂/I₁) = 2</p>
            <p className="text-gray-600 dark:text-gray-400">Significa que:</p>
            <p className="font-mono text-xl text-green-600 font-bold">
              I₂/I₁ = 10² = 100
            </p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-center">
            <strong>¡Por eso usamos logaritmos!</strong> Comprimen rangos enormes (de 1 a 1.000.000.000.000) en escalas manejables (0 a 120 dB).
          </p>
        </div>
      </div>

      {/* Real-world applications preview */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-center mb-3 font-semibold">
          Otras escalas logarítmicas en la vida real:
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
            <p className="text-2xl mb-1">🌋</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300">Escala Richter</p>
            <p className="text-xs text-gray-500">Terremotos</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
            <p className="text-2xl mb-1">🧪</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300">Escala pH</p>
            <p className="text-xs text-gray-500">Acidez</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>¡Explorar las escalas!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
