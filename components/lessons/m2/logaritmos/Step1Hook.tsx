'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { cn } from '@/lib/utils';

type Phase = 'scenario' | 'question' | 'result';

const OPTIONS = ['Magnitud 4', 'Magnitud 5', 'Magnitud 6', 'Magnitud 7'];
const CORRECT_ANSWER = 2; // Magnitud 6, because 10^6 = 1,000,000

// Famous Chilean earthquakes
const EARTHQUAKES = [
  { name: 'Valdivia 1960', magnitude: 9.5, energy: '10^{9.5}', description: 'El más potente registrado en la historia' },
  { name: 'Maule 2010', magnitude: 8.8, energy: '10^{8.8}', description: 'Uno de los más fuertes del siglo XXI' },
  { name: 'Temblor común', magnitude: 4.0, energy: '10^4', description: 'Se siente, pero sin daños' },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <span className="text-2xl">🌋</span>
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              La Escala de Richter
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Terremoto de Chile
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cómo miden los científicos la fuerza de un terremoto?
          </p>
        </div>

        {/* Earthquake visualization */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Chile es uno de los países con más terremotos del mundo. Los científicos usan la
            <strong className="text-orange-600"> escala de Richter</strong> para medir su magnitud.
          </p>

          <div className="space-y-3 mb-4">
            {EARTHQUAKES.map((eq, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-4 p-3 rounded-xl',
                  i === 0 ? 'bg-red-100 dark:bg-red-900/30' :
                  i === 1 ? 'bg-orange-100 dark:bg-orange-900/30' :
                  'bg-yellow-100 dark:bg-yellow-900/30'
                )}
              >
                <div className="text-center min-w-[80px]">
                  <p className={cn(
                    'text-2xl font-bold',
                    i === 0 ? 'text-red-600' :
                    i === 1 ? 'text-orange-600' :
                    'text-yellow-600'
                  )}>
                    {eq.magnitude}
                  </p>
                  <p className="text-xs text-gray-500">Magnitud</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{eq.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{eq.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-orange-200 dark:border-orange-700">
            <p className="text-orange-800 dark:text-orange-200 text-center">
              <strong>El secreto de la escala:</strong> Cada aumento de 1 en magnitud significa que el terremoto libera
              <strong className="text-red-600"> 10 veces más energía</strong>.
            </p>
          </div>
        </div>

        {/* Energy visualization */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center mb-3">
            <strong>La energía sigue este patrón:</strong>
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {[
              { mag: 1, energy: '10¹' },
              { mag: 2, energy: '10²' },
              { mag: 3, energy: '10³' },
              { mag: 4, energy: '10⁴' },
              { mag: 5, energy: '10⁵' },
              { mag: '?', energy: '10⁶' },
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-lg p-2 border text-center min-w-[60px]',
                  i === 5
                    ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-400 dark:border-purple-600'
                    : 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700'
                )}
              >
                <p className="text-xs text-gray-500">Mag {item.mag}</p>
                <p className={cn(
                  'font-mono font-bold',
                  i === 5 ? 'text-purple-600' : 'text-blue-600'
                )}>
                  {item.energy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <span className="text-2xl">🔍</span>
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              El desafío
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Qué magnitud tiene?
          </h2>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
            Se detecta un terremoto que libera exactamente
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center mb-4">
            <p className="font-mono text-3xl text-purple-600 font-bold">
              1.000.000
            </p>
            <p className="text-gray-500 text-sm">unidades de energía</p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Si <span className="font-mono">10⁶ = 1.000.000</span>, ¿cuál es su magnitud?
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
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
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
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
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
          <span className="text-2xl">✨</span>
          <span className="text-green-700 dark:text-green-300 font-medium">
            ¡Descubriste los logaritmos!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Logaritmos: La Operación Inversa
        </h2>
      </div>

      {/* Explanation */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
          Acabas de resolver un <strong className="text-green-600">logaritmo</strong>:
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
          <div className="text-center space-y-3">
            <p className="text-gray-600 dark:text-gray-400">
              Preguntaste: &quot;10 elevado a <strong className="text-purple-600">¿qué?</strong> da 1.000.000&quot;
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="text-center">
                <p className="font-mono text-lg">10<sup>?</sup> = 1.000.000</p>
              </div>
              <span className="text-2xl">⟺</span>
              <div className="text-center">
                <p className="font-mono text-lg text-green-600 font-bold">
                  log₁₀(1.000.000) = 6
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              La respuesta es <strong className="text-green-600">6</strong>, porque 10⁶ = 1.000.000
            </p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-center">
            <strong>El logaritmo</strong> responde la pregunta:
            <br />
            <span className="text-lg">&quot;¿A qué exponente debo elevar la base para obtener este número?&quot;</span>
          </p>
        </div>
      </div>

      {/* Triangle relationship */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-center mb-3 font-semibold">
          Las tres operaciones relacionadas:
        </p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Potencia</p>
            <p className="font-mono text-blue-600">10² = 100</p>
            <p className="text-xs text-gray-400">base y exp → resultado</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Raíz</p>
            <p className="font-mono text-purple-600">√100 = 10</p>
            <p className="text-xs text-gray-400">resultado y exp → base</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Logaritmo</p>
            <p className="font-mono text-green-600">log₁₀(100) = 2</p>
            <p className="text-xs text-gray-400">base y resultado → exp</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>¡Descubrir más!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
