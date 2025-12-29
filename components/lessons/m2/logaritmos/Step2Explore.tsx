'use client';

import { useState } from 'react';
import { ArrowRight, Check, Lightbulb, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface Example {
  id: string;
  base: number;
  result: number;
  answer: number;
  hint: string;
}

const EXAMPLES: Example[] = [
  { id: 'e1', base: 10, result: 100, answer: 2, hint: '10 × 10 = 100, entonces 10² = 100' },
  { id: 'e2', base: 2, result: 8, answer: 3, hint: '2 × 2 × 2 = 8, entonces 2³ = 8' },
  { id: 'e3', base: 5, result: 125, answer: 3, hint: '5 × 5 × 5 = 125, entonces 5³ = 125' },
  { id: 'e4', base: 10, result: 1000, answer: 3, hint: '1000 tiene 3 ceros, entonces 10³ = 1000' },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentExample, setCurrentExample] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedExamples, setCompletedExamples] = useState<string[]>([]);

  if (!isActive) return null;

  const example = EXAMPLES[currentExample];
  const isCorrect = userAnswer === example?.answer;

  const handleCheck = () => {
    setShowFeedback(true);
    if (isCorrect) {
      setTimeout(() => {
        setCompletedExamples([...completedExamples, example.id]);
        if (currentExample < EXAMPLES.length - 1) {
          setCurrentExample(currentExample + 1);
          setUserAnswer(null);
          setShowFeedback(false);
          setShowHint(false);
        } else {
          setPhase('pattern');
        }
      }, 1200);
    }
  };

  const handleRetry = () => {
    setUserAnswer(null);
    setShowFeedback(false);
    setShowHint(true);
  };

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubre el Exponente
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Vamos a encontrar el exponente oculto
          </p>
        </div>

        {/* Triangle diagram */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
          <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
            Las <strong>potencias</strong>, <strong>raíces</strong> y <strong>logaritmos</strong> están conectados:
          </p>

          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Triangle visualization */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Potencia</p>
                  <p className="font-mono text-lg text-blue-600">base<sup>exp</sup> = resultado</p>
                  <p className="text-xs text-gray-400 mt-2">Dado: base y exp</p>
                  <p className="text-xs text-gray-400">Encuentra: resultado</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/40 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Raíz</p>
                  <p className="font-mono text-lg text-purple-600"><sup>n</sup>√resultado = base</p>
                  <p className="text-xs text-gray-400 mt-2">Dado: resultado y exp</p>
                  <p className="text-xs text-gray-400">Encuentra: base</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/40 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Logaritmo</p>
                  <p className="font-mono text-lg text-green-600">log<sub>base</sub>(res) = exp</p>
                  <p className="text-xs text-gray-400 mt-2">Dado: base y resultado</p>
                  <p className="text-xs text-gray-400">Encuentra: exponente</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              El <strong className="text-green-600">logaritmo</strong> responde:
              <br />
              <span className="font-mono text-lg">&quot;¿A qué exponente elevo la base para obtener el resultado?&quot;</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('discover')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>¡Practicar!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: DISCOVER ============
  if (phase === 'discover') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Encuentra el Exponente
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ejemplo {currentExample + 1} de {EXAMPLES.length}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {EXAMPLES.map((ex, i) => (
            <div
              key={ex.id}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                completedExamples.includes(ex.id)
                  ? 'bg-green-500'
                  : i === currentExample
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        {/* Question */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
          <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
            {example.base} elevado a <strong className="text-green-600">¿qué?</strong> da {example.result}
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center mb-4">
            <p className="font-mono text-2xl text-gray-800 dark:text-gray-200">
              {example.base}<sup className="text-green-600 text-xl">?</sup> = {example.result}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Es decir: log<sub>{example.base}</sub>({example.result}) = <span className="text-green-600">?</span>
            </p>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => !showFeedback && setUserAnswer(num)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl border-2 font-bold text-lg transition-all',
                  showFeedback
                    ? num === example.answer
                      ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-600'
                      : num === userAnswer
                      ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-600'
                      : 'border-gray-200 dark:border-gray-700 text-gray-400'
                    : userAnswer === num
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-600'
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                )}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Hint */}
        {showHint && !showFeedback && (
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700 animate-fadeIn">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                <strong>Pista:</strong> {example.hint}
              </p>
            </div>
          </div>
        )}

        {!showHint && !showFeedback && (
          <button
            onClick={() => setShowHint(true)}
            className="mx-auto flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <HelpCircle size={16} />
            <span>Mostrar pista</span>
          </button>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={cn(
            'p-4 rounded-xl text-center animate-fadeIn',
            isCorrect
              ? 'bg-green-100 dark:bg-green-900/30'
              : 'bg-red-100 dark:bg-red-900/30'
          )}>
            {isCorrect ? (
              <div className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-green-700 dark:text-green-300">
                  ¡Correcto! {example.base}<sup>{example.answer}</sup> = {example.result}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  No exactamente. Intenta de nuevo.
                </p>
                <button
                  onClick={handleRetry}
                  className="text-sm text-red-600 hover:text-red-700 underline"
                >
                  Reintentar
                </button>
              </div>
            )}
          </div>
        )}

        {/* Check button */}
        {!showFeedback && (
          <div className="flex justify-center">
            <button
              onClick={handleCheck}
              disabled={userAnswer === null}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all',
                userAnswer !== null
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg'
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

  // ============ PHASE 3: PATTERN ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            ¡Excelente trabajo!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Patrón del Logaritmo
        </h2>
      </div>

      {/* Summary of discoveries */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
        <p className="text-center text-gray-700 dark:text-gray-300 mb-4 font-semibold">
          Descubriste estos logaritmos:
        </p>

        <div className="grid grid-cols-2 gap-3">
          {EXAMPLES.map((ex) => (
            <div key={ex.id} className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center">
              <p className="text-sm text-gray-500 mb-1">
                {ex.base}<sup>{ex.answer}</sup> = {ex.result}
              </p>
              <p className="font-mono text-green-600 font-bold">
                log<sub>{ex.base}</sub>({ex.result}) = {ex.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-purple-800 dark:text-purple-200 font-semibold mb-2">
              La clave del logaritmo:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="font-mono text-lg text-gray-800 dark:text-gray-200 mb-2">
                log<sub>b</sub>(x) = y
              </p>
              <p className="text-gray-600 dark:text-gray-400">significa lo mismo que</p>
              <p className="font-mono text-lg text-purple-600 mt-2">
                b<sup>y</sup> = x
              </p>
            </div>
            <p className="text-purple-700 dark:text-purple-300 text-sm mt-3">
              El logaritmo es la <strong>operación inversa</strong> de la potencia.
              Así como la resta deshace la suma, el logaritmo deshace la potencia.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
        >
          <span>Ver la teoría completa</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
