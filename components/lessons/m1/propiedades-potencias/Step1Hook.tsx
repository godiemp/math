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

const OPTIONS = ['2⁴ (= 16)', '2⁷ (= 128)', '2¹² (= 4096)', '2³ + 2⁴ = 24'];
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
          El Secreto del Científico
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Descubre el atajo que usan los expertos con las potencias
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Un científico necesita calcular cuántas bacterias habrá después de dos fases de crecimiento.
              En la <strong className="text-blue-600">primera fase</strong>, una bacteria se divide{' '}
              <strong>2³ = 8 veces</strong>. En la <strong className="text-purple-600">segunda fase</strong>,
              cada una se divide <strong>2⁴ = 16 veces más</strong>.
            </p>

            {/* Visual representation */}
            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Crecimiento bacteriano:
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-4 text-center border-2 border-blue-300 dark:border-blue-700">
                      <div className="text-3xl mb-2">🦠</div>
                      <span className="font-mono text-lg text-blue-600 font-bold">2³</span>
                      <p className="text-xs text-gray-500 mt-1">Fase 1</p>
                    </div>
                  </div>
                  <div className="text-3xl text-gray-400">×</div>
                  <div className="flex flex-col items-center">
                    <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-4 text-center border-2 border-purple-300 dark:border-purple-700">
                      <div className="text-3xl mb-2">🦠🦠</div>
                      <span className="font-mono text-lg text-purple-600 font-bold">2⁴</span>
                      <p className="text-xs text-gray-500 mt-1">Fase 2</p>
                    </div>
                  </div>
                  <div className="text-3xl text-gray-400">=</div>
                  <div className="flex flex-col items-center">
                    <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-4 text-center border-2 border-green-400 dark:border-green-600">
                      <div className="text-3xl mb-2">❓</div>
                      <span className="font-mono text-lg text-green-600 font-bold">?</span>
                      <p className="text-xs text-gray-500 mt-1">Total</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-lg">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  <strong>¿Cuál es el total de bacterias?</strong>
                  <br />
                  <span className="text-sm">¿Hay un atajo para calcular 2³ × 2⁴?</span>
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
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              2³ × 2⁴ = <span className="text-blue-600">?</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <span className="font-mono">8 × 16 = 128</span>, pero... ¿cómo se escribe como potencia de 2?
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
              explanation={isCorrect ? '¡Exacto! Veamos el patrón...' : '¡Casi! Veamos el patrón...'}
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Descubriste una Propiedad de las Potencias!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600">2³</span> × <span className="text-purple-600">2⁴</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ expandimos</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    (<span className="text-blue-600">2 × 2 × 2</span>) × (<span className="text-purple-600">2 × 2 × 2 × 2</span>)
                  </p>
                  <p className="text-gray-400 text-sm">↓ contamos los doses</p>
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    2 × 2 × 2 × 2 × 2 × 2 × 2 = <span className="text-green-600 font-bold">2⁷</span>
                  </p>
                  <p className="text-gray-400 text-sm">3 + 4 = 7 veces</p>
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                <strong>¡El atajo!</strong> Cuando multiplicas potencias con la <span className="text-blue-600">misma base</span>:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
                <p className="font-mono text-xl font-bold text-blue-600">
                  aᵐ × aⁿ = aᵐ⁺ⁿ
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  ¡Solo sumas los exponentes!
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to powers properties */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  ¡Las Propiedades de las Potencias!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="text-sm">
                    Existen varias reglas que simplifican el trabajo con potencias.
                    ¡No siempre necesitas calcular todo!
                  </p>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                    <div className="grid grid-cols-1 gap-2 text-center">
                      <p className="font-mono text-sm">
                        <span className="text-blue-600">Multiplicación:</span> aᵐ × aⁿ = aᵐ⁺ⁿ
                      </p>
                      <p className="font-mono text-sm">
                        <span className="text-purple-600">División:</span> aᵐ ÷ aⁿ = aᵐ⁻ⁿ
                      </p>
                      <p className="font-mono text-sm">
                        <span className="text-green-600">Potencia de potencia:</span> (aᵐ)ⁿ = aᵐˣⁿ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Descubrir todas las propiedades
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
