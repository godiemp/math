'use client';

import { ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useStep1Phase } from '@/hooks/lessons';
import {
  ScenarioCard,
  QuestionPrompt,
  OptionGrid,
  OptionButton,
  ActionButton,
  FeedbackPanel,
} from '@/components/lessons/primitives';

const OPTIONS = ['(x + 5)(x - 5)', '(x + 5)²', '(x + 25)²', '(x - 5)²'];
const CORRECT_ANSWER = 1;

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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Inverso de los Productos Notables
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          A veces necesitamos ir hacia atrás...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              En la clase de matemáticas, la profesora presenta el siguiente desafío:
            </p>

            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  El desafío:
                </p>
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <span className="font-mono text-xl text-blue-600 font-bold">x² + 10x + 25</span>
                    <p className="text-xs text-gray-500 mt-2">¿De dónde viene este trinomio?</p>
                  </div>
                </div>
              </div>

              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  Martín levanta la mano: &ldquo;¡Eso es un <strong>cuadrado perfecto</strong>!&rdquo;
                  <br />
                  <span className="text-sm">La profe sonríe: &ldquo;Demuéstralo&rdquo;</span>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿A qué binomio elevado al cuadrado equivale?
            </p>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Intentar el desafío
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Factorizar: <span className="font-mono text-blue-600">x² + 10x + 25</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Qué expresión al cuadrado da este resultado?
            </p>
          </QuestionPrompt>

          <OptionGrid columns={1}>
            {OPTIONS.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={index === CORRECT_ANSWER}
                showFeedback={showFeedback}
                onClick={() => select(index)}
                isMono
              />
            ))}
          </OptionGrid>

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
              explanation={isCorrect ? '¡Exacto! Veamos por qué...' : '¡Casi! Veamos por qué...'}
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Es un Trinomio Cuadrático Perfecto!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600">x²</span> + <span className="text-green-600">10x</span> + <span className="text-purple-600">25</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ identificamos el patrón</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-blue-600">x²</span> = (<span className="text-blue-600">x</span>)²
                    <span className="mx-4">|</span>
                    <span className="text-purple-600">25</span> = (<span className="text-purple-600">5</span>)²
                  </p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">10x</span> = 2 · <span className="text-blue-600">x</span> · <span className="text-purple-600">5</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ coincide con (a + b)² = a² + 2ab + b²</p>
                  <p className="font-mono text-2xl text-green-600 font-bold">= (x + 5)²</p>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                Verificación rápida:
              </p>
              <div className="flex justify-center items-center gap-4">
                <div className="text-center font-mono">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    (x + 5)² = x² + 2(x)(5) + 5² = x² + 10x + 25 ✓
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bridge to perfect square trinomials */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  ¡Esto es Factorización de Trinomios Cuadráticos Perfectos!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-sm mb-2">Los trinomios cuadráticos perfectos se factorizan así:</p>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">
                        <span className="text-blue-600 font-bold">a²</span> + <span className="text-green-600 font-bold">2ab</span> + <span className="text-purple-600 font-bold">b²</span> = (<span className="text-blue-600 font-bold">a</span> + <span className="text-purple-600 font-bold">b</span>)²
                      </p>
                      <p className="font-mono text-lg">
                        <span className="text-blue-600 font-bold">a²</span> - <span className="text-green-600 font-bold">2ab</span> + <span className="text-purple-600 font-bold">b²</span> = (<span className="text-blue-600 font-bold">a</span> - <span className="text-purple-600 font-bold">b</span>)²
                      </p>
                    </div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                      Es el <strong>proceso inverso</strong> del producto notable del cuadrado de un binomio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
