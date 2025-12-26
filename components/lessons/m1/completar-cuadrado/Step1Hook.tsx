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

const OPTIONS = ['x = -3 ± √4', 'x = 3 ± √5', 'x = -3 ± √5', 'x = -6 ± √5'];
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Arquitecto y el Jardín
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Una ecuación cuadrática que no se puede factorizar fácilmente...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Un arquitecto diseña un jardín cuadrado. El área del jardín está dada por la expresión{' '}
              <strong className="text-blue-600 font-mono">x² + 6x + 4</strong> metros cuadrados.
              Para calcular las dimensiones exactas, necesita resolver:
            </p>

            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Ecuación a resolver:
                </p>
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏗️</div>
                    <span className="font-mono text-lg text-blue-600 font-bold">
                      x² + 6x + 4 = 0
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  <strong>Problema:</strong> Esta ecuación <strong>no se puede factorizar</strong> fácilmente
                  porque no hay dos enteros que sumen 6 y multipliquen 4.
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cómo podemos encontrar las soluciones?
            </p>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Descubrir la técnica
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Hay una técnica llamada <span className="text-purple-600">&quot;Completar el Cuadrado&quot;</span>
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-2">
                x² + 6x + 4 = 0
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">↓ Completamos el cuadrado</p>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mt-2">
                (x + 3)² - 5 = 0
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">↓ Despejamos</p>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mt-2">
                (x + 3)² = 5
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              ¿Cuál es la solución de la ecuación?
            </p>
          </QuestionPrompt>

          <OptionGrid>
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
              explanation={isCorrect ? '¡Exacto! Veamos cómo funciona...' : '¡Casi! Veamos cómo funciona...'}
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Así funciona Completar el Cuadrado!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-3">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600">x² + 6x + 4 = 0</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ sumamos y restamos (6/2)² = 9</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    x² + 6x + <span className="text-green-600">9</span> - <span className="text-red-600">9</span> + 4 = 0
                  </p>
                  <p className="text-gray-400 text-sm">↓ agrupamos el trinomio cuadrado perfecto</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-purple-600">(x + 3)²</span> - 5 = 0
                  </p>
                  <p className="text-gray-400 text-sm">↓ despejamos</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    (x + 3)² = 5
                  </p>
                  <p className="text-gray-400 text-sm">↓ sacamos raíz cuadrada</p>
                  <p className="font-mono text-2xl text-green-600 font-bold">x = -3 ± √5</p>
                </div>
              </div>
            </div>

            {/* Numerical values */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                Las soluciones aproximadas son:
              </p>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <span className="font-mono text-lg text-blue-600 font-bold">x₁ ≈ -0.76</span>
                  <p className="text-xs text-gray-500">(-3 + √5)</p>
                </div>
                <div className="text-center">
                  <span className="font-mono text-lg text-blue-600 font-bold">x₂ ≈ -5.24</span>
                  <p className="text-xs text-gray-500">(-3 - √5)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bridge to concept */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  ¿Por qué &quot;Completar el Cuadrado&quot;?
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-sm mb-2">Transformamos cualquier ecuación cuadrática en:</p>
                    <p className="font-mono text-lg">
                      <span className="text-purple-600 font-bold">(x + h)²</span> = k
                    </p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                      Esta forma es fácil de resolver: <strong>x + h = ±√k</strong>
                      <br />
                      por lo tanto <strong>x = -h ± √k</strong>
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
