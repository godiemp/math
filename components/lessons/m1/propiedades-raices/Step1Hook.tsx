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

const OPTIONS = ['3', '5', '6', '12'];
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
          La Fábrica de Chocolate
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Descubre las propiedades de las raíces
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Un chocolatero tiene <strong className="text-amber-600">36 bombones</strong> ordenados
              en una caja cuadrada de <strong className="text-blue-600">6×6</strong>.
            </p>

            {/* Visual representation - 6x6 chocolate grid */}
            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  La caja de bombones (6×6 = 36):
                </p>
                <div className="grid grid-cols-6 gap-1 max-w-[240px] mx-auto">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-sm flex items-center justify-center text-xs"
                    >
                      <span className="text-amber-200">🍫</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <span className="font-mono text-lg text-gray-600 dark:text-gray-400">
                    √36 = 6 (lado de la caja)
                  </span>
                </div>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  <strong>Pregunta:</strong> Si sabemos que 36 = 4 × 9,
                  <br />
                  ¿será que √36 = √4 × √9?
                </p>
              </div>
            </div>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Comprobar
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Si √36 = √(4 × 9), entonces √4 × √9 = <span className="text-blue-600">?</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Calcula √4 y √9 por separado, luego multiplica.
            </p>
          </QuestionPrompt>

          {/* Visual breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">√4 =</p>
                <p className="font-mono text-2xl text-blue-600">2</p>
                <p className="text-xs text-gray-400">porque 2² = 4</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">√9 =</p>
                <p className="font-mono text-2xl text-purple-600">3</p>
                <p className="text-xs text-gray-400">porque 3² = 9</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                √4 × √9 = 2 × 3 = <span className="text-green-600 font-bold">?</span>
              </p>
            </div>
          </div>

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
              explanation={isCorrect ? '¡Exacto! Veamos por qué funciona...' : '¡Casi! Veamos por qué...'}
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Descubriste una Propiedad de las Raíces!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    √<span className="text-green-600">36</span> = √(<span className="text-blue-600">4</span> × <span className="text-purple-600">9</span>)
                  </p>
                  <p className="text-gray-400 text-sm">↓ separamos la raíz</p>
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    = √<span className="text-blue-600">4</span> × √<span className="text-purple-600">9</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ calculamos cada raíz</p>
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    = <span className="text-blue-600">2</span> × <span className="text-purple-600">3</span> = <span className="text-green-600 font-bold">6</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                <strong>¡La Propiedad del Producto!</strong>
              </p>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
                <p className="font-mono text-2xl font-bold text-green-600">
                  ⁿ√(a × b) = ⁿ√a × ⁿ√b
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  La raíz de un producto es el producto de las raíces
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to more properties */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  ¡Hay más propiedades!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="text-sm">
                    Además del producto, las raíces tienen propiedades para:
                  </p>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                    <div className="grid grid-cols-1 gap-2 text-center">
                      <p className="font-mono text-sm">
                        <span className="text-blue-600">Producto:</span> ⁿ√(a·b) = ⁿ√a · ⁿ√b
                      </p>
                      <p className="font-mono text-sm">
                        <span className="text-purple-600">Cociente:</span> ⁿ√(a/b) = ⁿ√a / ⁿ√b
                      </p>
                      <p className="font-mono text-sm">
                        <span className="text-green-600">Raíz de raíz:</span> ᵐ√(ⁿ√a) = ᵐˣⁿ√a
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Descubrir las propiedades
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
