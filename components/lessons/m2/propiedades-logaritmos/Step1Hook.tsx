'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { cn } from '@/lib/utils';

type Phase = 'scenario' | 'question' | 'result';

const OPTIONS = ['1.000.000', '10.000.000', '100.000.000', '1.000.000.000'];
const CORRECT_ANSWER = 1; // 1000 × 10000 = 10,000,000 = 10^7

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Wand2 className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              El Show de Matemáticas
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Truco del Mago Matemático
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cómo multiplica números enormes en segundos?
          </p>
        </div>

        {/* Magician scene */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
            En el show escolar, el <strong className="text-purple-600">&quot;Mago Matemático&quot;</strong> sorprende a todos:
          </p>

          {/* Magic trick visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4">
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl">🎩</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">El mago pide dos números:</p>
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl px-6 py-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">1.000</p>
                  <p className="text-xs text-gray-500">Primer número</p>
                </div>
                <span className="text-3xl text-gray-400">×</span>
                <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-xl px-6 py-4 text-center">
                  <p className="text-2xl font-bold text-indigo-600">10.000</p>
                  <p className="text-xs text-gray-500">Segundo número</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-center mt-2">
                <em>&quot;¡Doy la respuesta en 3 segundos!&quot;</em>
              </p>
            </div>
          </div>

          {/* The secret */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <p className="text-amber-800 dark:text-amber-200 text-center">
              <Sparkles className="inline w-4 h-4 mr-1" />
              <strong>El secreto:</strong> El mago usa <strong className="text-purple-600">propiedades de logaritmos</strong> para transformar multiplicaciones en sumas simples.
            </p>
          </div>
        </div>

        {/* How it works hint */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center mb-3 font-semibold">
            El truco del mago:
          </p>
          <div className="flex justify-center items-center gap-2 flex-wrap text-sm">
            <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 font-mono">
              log(1000) = 3
            </div>
            <span className="text-blue-600 font-bold">+</span>
            <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 font-mono">
              log(10000) = 4
            </div>
            <span className="text-blue-600 font-bold">=</span>
            <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 font-mono">
              7
            </div>
          </div>
          <p className="text-blue-700 dark:text-blue-300 text-center text-sm mt-2">
            ¡Solo suma 3 + 4 = 7, luego calcula 10⁷!
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Resolver el desafío</span>
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
            <span className="text-2xl">🔮</span>
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">
              El desafío
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Cuál es el resultado?
          </h2>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
          <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
            Si el mago sabe que:
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center mb-4 space-y-2">
            <p className="font-mono text-lg">log(1.000) = 3</p>
            <p className="font-mono text-lg">log(10.000) = 4</p>
            <p className="font-mono text-lg text-purple-600 font-bold">3 + 4 = 7</p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-center">
            ¿Cuánto es <span className="font-mono font-bold">1.000 × 10.000</span>?
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm mt-2">
            (Pista: 10⁷ = ?)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl border-2 font-medium transition-all text-sm',
                showFeedback
                  ? index === CORRECT_ANSWER
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-400'
                  : selectedAnswer === index
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
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
              {isCorrect ? '¡Exacto! 🎉' : '¡Casi! Veamos la magia...'}
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
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg'
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
          <Sparkles className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            ¡El secreto revelado!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Propiedades de los Logaritmos
        </h2>
      </div>

      {/* The magic explained */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
          El mago usó la <strong className="text-green-600">propiedad del producto</strong>:
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4">
          <div className="text-center space-y-4">
            <p className="font-mono text-xl text-purple-600 font-bold">
              log(a × b) = log(a) + log(b)
            </p>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-gray-600 dark:text-gray-400 mb-2">En el truco:</p>
              <p className="font-mono">
                log(1000 × 10000) = log(1000) + log(10000)
              </p>
              <p className="font-mono text-green-600">
                = 3 + 4 = 7
              </p>
              <p className="font-mono text-lg font-bold mt-2">
                Por lo tanto: 10⁷ = 10.000.000 ✓
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-center">
            <strong>¡Las propiedades de los logaritmos</strong> convierten multiplicaciones en sumas, divisiones en restas, y potencias en multiplicaciones simples!
          </p>
        </div>
      </div>

      {/* Preview of properties */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-center mb-3 font-semibold">
          Las 4 propiedades que aprenderás:
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
            <p className="font-mono text-blue-600">log(a·b) = log(a) + log(b)</p>
            <p className="text-xs text-gray-500">Producto</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
            <p className="font-mono text-purple-600">log(a/b) = log(a) - log(b)</p>
            <p className="text-xs text-gray-500">Cociente</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
            <p className="font-mono text-teal-600">log(aⁿ) = n·log(a)</p>
            <p className="text-xs text-gray-500">Potencia</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
            <p className="font-mono text-amber-600">log(1)=0, log(b)=1</p>
            <p className="text-xs text-gray-500">Casos especiales</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>¡Descubrir las propiedades!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
