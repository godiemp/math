'use client';

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useStep1Phase } from '@/hooks/lessons';
import { InlineMath } from '@/components/math/MathDisplay';
import {
  ScenarioCard,
  QuestionPrompt,
  ActionButton,
  FeedbackPanel,
  InsightCard,
} from '@/components/lessons/primitives';

const OPTIONS = [
  { text: 'canciones', latex: 'x = 10' },
  { text: 'canciones', latex: 'x = 12' },
  { text: 'canciones', latex: 'x \\leq 12' },
  { text: 'canciones', latex: 'x < 12' },
];
const CORRECT_ANSWER = 2;

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const { phase, setPhase, selectedAnswer, showFeedback, isCorrect, select, check } = useStep1Phase({
    phases: ['scenario', 'question', 'result'],
    correctAnswer: CORRECT_ANSWER,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">El Presupuesto del Celular</h2>
        <p className="text-gray-600 dark:text-gray-300">Una decisión financiera real...</p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Camila tiene <strong className="text-green-600">$10.000</strong> para gastar en aplicaciones este mes.
              Quiere suscribirse a <strong className="text-purple-600">Spotify</strong> que cuesta{' '}
              <strong className="text-purple-600">$3.990 mensuales</strong>.
            </p>

            {/* Visual representation */}
            <div className="flex flex-col items-center gap-6 mb-6">
              {/* Phone scene */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Presupuesto de Camila:
                </p>
                <div className="flex justify-center gap-6 items-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💰</div>
                    <span className="font-mono text-lg text-green-600 font-bold">$10.000</span>
                    <p className="text-xs text-gray-500">presupuesto total</p>
                  </div>
                  <div className="text-2xl text-gray-400">=</div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎵</div>
                    <span className="font-mono text-lg text-purple-600 font-bold">$3.990</span>
                    <p className="text-xs text-gray-500">Spotify</p>
                  </div>
                  <div className="text-2xl text-gray-400">+</div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎶</div>
                    <span className="font-mono text-lg text-blue-600 font-bold">$500 c/u</span>
                    <p className="text-xs text-gray-500">canciones</p>
                  </div>
                </div>
              </div>

              {/* Arrow down */}
              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Question */}
              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center text-lg">
                  Después de pagar Spotify, quiere comprar canciones a <strong>$500 cada una</strong>.
                  <br />
                  <span className="font-bold">¿Cuántas canciones puede comprar sin exceder su presupuesto?</span>
                </p>
              </div>
            </div>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Resolver el problema
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Si <InlineMath latex="x" /> es el número de canciones:
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-xl text-center">
              <InlineMath latex="3990 + 500x \leq 10000" />
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm text-center">
              ¿Cuál es la respuesta correcta?
            </p>
          </QuestionPrompt>

          <div className="grid grid-cols-2 gap-4">
            {OPTIONS.map((option, index) => (
              <button
                key={index}
                onClick={() => select(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl font-medium transition-all border-2 text-lg',
                  showFeedback
                    ? index === CORRECT_ANSWER
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : selectedAnswer === index
                      ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-400'
                    : selectedAnswer === index
                    ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/30'
                )}
              >
                <InlineMath latex={option.latex} /> <span className="text-sm text-gray-500">{option.text}</span>
              </button>
            ))}
          </div>

          {!showFeedback && (
            <div className="flex justify-center">
              <ActionButton
                onClick={check}
                disabled={selectedAnswer === null}
                variant={selectedAnswer !== null ? 'primary' : 'disabled'}
              >
                Verificar
              </ActionButton>
            </div>
          )}

          {showFeedback && (
            <FeedbackPanel
              isCorrect={isCorrect}
              explanation={isCorrect ? '¡Exacto! La respuesta NO es un número único...' : '¡Casi! Veamos por qué la respuesta es diferente...'}
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Resolvemos la inecuación paso a paso!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    <InlineMath latex="3990 + 500x \leq 10000" />
                  </p>
                  <p className="text-gray-400 text-sm">↓ restamos 3990 de ambos lados</p>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    <InlineMath latex="500x \leq 10000 - 3990" />
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    <InlineMath latex="500x \leq 6010" />
                  </p>
                  <p className="text-gray-400 text-sm">↓ dividimos ambos lados entre 500</p>
                  <p className="text-2xl text-green-600 font-bold">
                    <InlineMath latex="x \leq 12{,}02" />
                  </p>
                  <p className="text-gray-500 text-sm">
                    Como x debe ser entero: <InlineMath latex="x \leq 12" />
                  </p>
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                Camila puede comprar:
              </p>
              <div className="flex justify-center gap-2 flex-wrap mb-4">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                  <div
                    key={n}
                    className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-700 dark:text-green-300 font-bold text-sm"
                  >
                    {n}
                  </div>
                ))}
                <span className="text-gray-400 self-center">canciones</span>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                ¡Cualquier valor desde 0 hasta 12 es válido!
              </p>
            </div>
          </div>

          <InsightCard title="¡Esto es una INECUACIÓN!" variant="purple">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Ecuación</p>
                    <p className="text-lg">
                      <InlineMath latex="3x + 5 = 20" />
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Una sola solución: <InlineMath latex="x = 5" />
                    </p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg border-2 border-purple-300 dark:border-purple-600">
                    <p className="text-sm text-gray-500 mb-1">Inecuación</p>
                    <p className="text-lg">
                      <InlineMath latex="3x + 5 \leq 20" />
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-bold">¡Muchas soluciones!</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  Los símbolos <InlineMath latex="<" />, <InlineMath latex=">" />, <InlineMath latex="\leq" />,{' '}
                  <InlineMath latex="\geq" /> crean <strong>inecuaciones</strong> con múltiples soluciones.
                </p>
              </div>
            </div>
          </InsightCard>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Descubrir el patrón
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
