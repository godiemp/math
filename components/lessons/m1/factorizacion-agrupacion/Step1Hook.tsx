'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 2; // "(x + 2)(3 + y)"

  const options = [
    '3x + xy + 6 + 2y',
    '(x + 3)(y + 2)',
    '(x + 2)(3 + y)',
    'xy + 3x + 2y + 6',
  ];

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
          El Puzzle de los Equipos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          A veces organizar en grupos revela patrones ocultos...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              En un torneo, hay <strong className="text-blue-600">4 tipos de participantes</strong> que deben organizarse en equipos:
            </p>

            {/* Visual representation */}
            <div className="flex flex-col items-center gap-6 mb-6">
              {/* Products spread out */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Los participantes:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-center">
                    <div className="text-3xl mb-1">🏃</div>
                    <span className="font-mono text-lg text-blue-600 font-bold">3x</span>
                    <p className="text-xs text-gray-500">corredores experimentados</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 text-center">
                    <div className="text-3xl mb-1">🚴</div>
                    <span className="font-mono text-lg text-green-600 font-bold">xy</span>
                    <p className="text-xs text-gray-500">ciclistas expertos</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 text-center">
                    <div className="text-3xl mb-1">🏊</div>
                    <span className="font-mono text-lg text-purple-600 font-bold">6</span>
                    <p className="text-xs text-gray-500">nadadores novatos</p>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/30 rounded-lg p-3 text-center">
                    <div className="text-3xl mb-1">🎿</div>
                    <span className="font-mono text-lg text-pink-600 font-bold">2y</span>
                    <p className="text-xs text-gray-500">esquiadores</p>
                  </div>
                </div>
              </div>

              {/* Expression */}
              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-lg">
                <p className="text-gray-700 dark:text-gray-300 text-center mb-2">
                  La expresión algebraica de todos es:
                </p>
                <p className="font-mono text-2xl text-center font-bold text-gray-800 dark:text-gray-200">
                  3x + xy + 6 + 2y
                </p>
              </div>

              {/* Question */}
              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-lg">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  El organizador quiere formar <strong>2 grupos principales</strong> donde cada grupo
                  tenga un <strong>factor común</strong>. ¿Cómo puede escribirse la expresión final?
                </p>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <span>Resolver el problema</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question reminder */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 text-center border border-blue-200 dark:border-blue-700">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Expresión: <span className="font-mono text-purple-600">3x + xy + 6 + 2y</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Cómo podemos factorizarla agrupando términos?
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-left font-medium transition-all border-2',
                  selectedAnswer === index
                    ? showFeedback
                      ? index === correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                      : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                    : showFeedback && index === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      selectedAnswer === index
                        ? showFeedback
                          ? index === correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-amber-500 text-white'
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
                  <span className="text-gray-800 dark:text-gray-200 font-mono text-lg">{option}</span>
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
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
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
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Veamos cómo funciona...
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Organizamos por Agrupación!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600">3x</span> + <span className="text-green-600">xy</span> + <span className="text-purple-600">6</span> + <span className="text-pink-600">2y</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ agrupamos los primeros dos y los últimos dos</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    = (<span className="text-blue-600">3x</span> + <span className="text-green-600">xy</span>) + (<span className="text-purple-600">6</span> + <span className="text-pink-600">2y</span>)
                  </p>
                  <p className="text-gray-400 text-sm">↓ sacamos factor común de cada grupo</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    = <span className="text-amber-600">x</span>(3 + y) + <span className="text-amber-600">2</span>(3 + y)
                  </p>
                  <p className="text-gray-400 text-sm">↓ ahora (3 + y) es el factor común</p>
                  <p className="font-mono text-2xl text-green-600 font-bold">
                    (x + 2)(3 + y)
                  </p>
                </div>
              </div>
            </div>

            {/* Team visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                Los equipos finales:
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-700">
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">Equipo 1</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏃</span>
                    <span className="text-gray-400">+</span>
                    <span className="text-2xl">🏊</span>
                  </div>
                  <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-2 font-mono font-bold">(x + 2)</p>
                </div>
                <div className="text-2xl self-center text-gray-400">×</div>
                <div className="bg-teal-100 dark:bg-teal-900/50 rounded-lg p-4 border-2 border-teal-300 dark:border-teal-700">
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">Equipo 2</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚴</span>
                    <span className="text-gray-400">+</span>
                    <span className="text-2xl">🎿</span>
                  </div>
                  <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-2 font-mono font-bold">(3 + y)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bridge to factorization concept */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  ¡Esto es Factorización por Agrupación!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-sm mb-2">Cuando una expresión tiene 4 términos sin factor común directo:</p>
                    <p className="font-mono text-lg">
                      ab + ac + db + dc = <span className="text-amber-600 font-bold">(a + d)(b + c)</span>
                    </p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                      <strong>Agrupamos de a pares</strong>, sacamos factor común de cada par,
                      <br />
                      <span className="text-purple-600">y luego un segundo factor común aparece.</span>
                    </p>
                  </div>
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
              <span>Descubrir el patrón</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
