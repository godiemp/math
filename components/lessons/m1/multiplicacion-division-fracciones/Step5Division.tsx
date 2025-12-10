'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, RefreshCw, Divide, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'reciprocal' | 'rule' | 'practice' | 'summary';

export default function Step5Division({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [practiceAnswer, setPracticeAnswer] = useState<number | null>(null);
  const [showPracticeFeedback, setShowPracticeFeedback] = useState(false);

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Secreto de la Division
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Como dividir fracciones?
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="text-center mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Imagina que tienes <strong>3/4</strong> de una pizza y quieres dividirla en porciones de <strong>1/2</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              ¿Cuantas porciones de <strong>1/2</strong> caben en <strong>3/4</strong>?
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <div className="text-center text-2xl font-bold mb-4">
              <span className="text-orange-600 dark:text-orange-400">3/4</span>
              <span className="text-gray-400 mx-3">÷</span>
              <span className="text-blue-600 dark:text-blue-400">1/2</span>
              <span className="text-gray-400 mx-3">=</span>
              <span className="text-purple-600 dark:text-purple-400">?</span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                <strong>Pista:</strong> Dividir es lo mismo que preguntar &quot;¿cuantas veces cabe?&quot;
                En 3/4 de pizza caben <strong>1.5</strong> porciones de 1/2.
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Pero... ¿como lo calculamos sin dibujar pizzas?
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('reciprocal')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Descubrir el secreto</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: RECIPROCAL ============
  if (phase === 'reciprocal') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Secreto de la Division
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El reciproco (o inverso)
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-center font-bold text-amber-700 dark:text-amber-300 mb-4">
              ¿Que es el reciproco?
            </h3>

            <div className="flex items-center justify-center gap-4 mb-4">
              <RefreshCw className="w-6 h-6 text-amber-500" />
              <p className="text-gray-700 dark:text-gray-300">
                Es la fraccion <strong>&quot;al reves&quot;</strong> - intercambias el numerador y denominador.
              </p>
            </div>

            {/* Examples of reciprocals */}
            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-center gap-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <div className="text-xl font-bold">
                  <span className="text-orange-600 dark:text-orange-400">1/2</span>
                </div>
                <RefreshCw className="w-5 h-5 text-gray-400" />
                <div className="text-xl font-bold">
                  <span className="text-blue-600 dark:text-blue-400">2/1</span>
                  <span className="text-gray-500 text-sm ml-1">= 2</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <div className="text-xl font-bold">
                  <span className="text-orange-600 dark:text-orange-400">3/4</span>
                </div>
                <RefreshCw className="w-5 h-5 text-gray-400" />
                <div className="text-xl font-bold">
                  <span className="text-blue-600 dark:text-blue-400">4/3</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <div className="text-xl font-bold">
                  <span className="text-orange-600 dark:text-orange-400">5</span>
                  <span className="text-gray-500 text-sm ml-1">= 5/1</span>
                </div>
                <RefreshCw className="w-5 h-5 text-gray-400" />
                <div className="text-xl font-bold">
                  <span className="text-blue-600 dark:text-blue-400">1/5</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/50 rounded-lg border border-green-300 dark:border-green-700">
              <p className="text-green-800 dark:text-green-200 text-sm text-center">
                <strong>Dato curioso:</strong> Una fraccion multiplicada por su reciproco siempre da 1.
                <br />
                <span className="text-xs">Por ejemplo: 3/4 × 4/3 = 12/12 = 1</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('rule')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Ver la regla</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: THE RULE ============
  if (phase === 'rule') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Secreto de la Division
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡La regla de oro!
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <h3 className="font-bold text-green-700 dark:text-green-300 mb-4 text-lg">
              Division de Fracciones
            </h3>

            <div className="text-xl md:text-2xl font-bold mb-4">
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-2">÷</span>
              <span className="text-blue-600 dark:text-blue-400">c/d</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-2">×</span>
              <span className="text-green-600 dark:text-green-400">d/c</span>
            </div>

            <div className="flex items-center justify-center gap-3 p-4 bg-green-100 dark:bg-green-900/50 rounded-xl">
              <Divide className="w-6 h-6 text-red-500" />
              <span className="text-gray-500">se convierte en</span>
              <X className="w-6 h-6 text-green-500" />
              <span className="text-gray-500">con el</span>
              <RefreshCw className="w-6 h-6 text-blue-500" />
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              <strong>Dividir</strong> entre una fraccion = <strong>Multiplicar</strong> por su <strong>reciproco</strong>
            </p>
          </div>

          {/* Example */}
          <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-3 text-sm">
              Ejemplo: 3/4 ÷ 1/2
            </p>
            <div className="space-y-2 text-center">
              <div className="text-lg">
                <span className="text-orange-600 dark:text-orange-400 font-bold">3/4</span>
                <span className="text-gray-400 mx-2">÷</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">1/2</span>
              </div>
              <div className="text-gray-400">=</div>
              <div className="text-lg">
                <span className="text-orange-600 dark:text-orange-400 font-bold">3/4</span>
                <span className="text-gray-400 mx-2">×</span>
                <span className="text-green-600 dark:text-green-400 font-bold">2/1</span>
                <span className="text-gray-500 text-sm ml-1">(reciproco de 1/2)</span>
              </div>
              <div className="text-gray-400">=</div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                6/4 = 3/2 = 1.5
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('practice')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Probar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: PRACTICE ============
  if (phase === 'practice') {
    const options = ['1/6', '3/2', '2/3', '6/1'];
    const correctIndex = 2;

    const handlePracticeCheck = () => {
      setShowPracticeFeedback(true);
    };

    const handlePracticeNext = () => {
      setPhase('summary');
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Secreto de la Division
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tu turno
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Resuelve:</p>
            <div className="text-3xl font-bold">
              <span className="text-orange-600 dark:text-orange-400">1/2</span>
              <span className="text-gray-400 mx-3">÷</span>
              <span className="text-blue-600 dark:text-blue-400">3/4</span>
              <span className="text-gray-400 mx-3">=</span>
              <span className="text-purple-600 dark:text-purple-400">?</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Pista: Multiplica 1/2 por el reciproco de 3/4
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showPracticeFeedback && setPracticeAnswer(index)}
                disabled={showPracticeFeedback}
                className={cn(
                  'p-4 rounded-xl transition-all text-center font-medium text-lg border-2',
                  practiceAnswer === index
                    ? showPracticeFeedback
                      ? index === correctIndex
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-400'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-400'
                      : 'bg-purple-100 dark:bg-purple-900/50 border-purple-400'
                    : showPracticeFeedback && index === correctIndex
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-400'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {showPracticeFeedback && (
          <div
            className={cn(
              'p-4 rounded-xl border-2 animate-fadeIn',
              practiceAnswer === correctIndex
                ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                : 'bg-red-50 dark:bg-red-900/30 border-red-400',
            )}
          >
            <p className="font-bold mb-2">
              {practiceAnswer === correctIndex ? '¡Correcto!' : 'Incorrecto'}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              1/2 ÷ 3/4 = 1/2 × <strong>4/3</strong> = (1×4)/(2×3) = 4/6 = <strong>2/3</strong>
            </p>
          </div>
        )}

        <div className="flex justify-center">
          {!showPracticeFeedback ? (
            <button
              onClick={handlePracticeCheck}
              disabled={practiceAnswer === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                practiceAnswer !== null
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
              )}
            >
              Comprobar
            </button>
          ) : (
            <button
              onClick={handlePracticeNext}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Ver resumen</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ PHASE 5: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Secreto de la Division
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resumen completo
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl p-6">
        {/* Both formulas */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Multiplication */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-3 text-center">
              Multiplicacion
            </h4>
            <div className="text-center text-lg font-bold">
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-1">×</span>
              <span className="text-blue-600 dark:text-blue-400">c/d</span>
              <span className="text-gray-400 mx-1">=</span>
              <span className="text-green-600 dark:text-green-400">(a×c)/(b×d)</span>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-2">
              Numerador × Numerador / Denominador × Denominador
            </p>
          </div>

          {/* Division */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3 text-center">
              Division
            </h4>
            <div className="text-center text-lg font-bold">
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-1">÷</span>
              <span className="text-blue-600 dark:text-blue-400">c/d</span>
              <span className="text-gray-400 mx-1">=</span>
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-1">×</span>
              <span className="text-green-600 dark:text-green-400">d/c</span>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-2">
              Multiplica por el reciproco
            </p>
          </div>
        </div>

        {/* Key points */}
        <div className="mt-4 space-y-2">
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Multiplicar</strong>: directo, arriba × arriba, abajo × abajo
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Dividir</strong>: convierte en multiplicacion por el reciproco
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Reciproco</strong>: intercambia numerador y denominador
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Simplifica</strong>: siempre al final (o antes si puedes)
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
        >
          <span>Continuar al checkpoint</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
