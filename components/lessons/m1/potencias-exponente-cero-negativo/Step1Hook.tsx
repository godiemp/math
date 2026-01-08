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
import { MathText } from '@/components/math/MathDisplay';

const OPTIONS = ['0', '1', '2', 'No existe'];
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
          El Misterio del Exponente Cero
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Qué pasa cuando el exponente llega a cero... o se vuelve negativo?
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              En una fábrica de galletas, una máquina duplica la producción cada hora. Al final del día
              producen <strong className="text-purple-600"><MathText content="$2^4 = 16$" /></strong> galletas. Pero... ¿cuántas tenían
              al <strong className="text-blue-600">inicio</strong>, antes de empezar a duplicar?
            </p>

            {/* Visual representation - Backwards pattern */}
            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Observa el patrón al retroceder:
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-3 text-center border-2 border-blue-400 dark:border-blue-600">
                      <span className="text-sm text-blue-600 font-bold"><MathText content="$2^4$" /></span>
                      <div className="text-lg font-bold">16</div>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">→</span>
                  <div className="flex flex-col items-center">
                    <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-3 text-center border-2 border-purple-400 dark:border-purple-600">
                      <span className="text-sm text-purple-600 font-bold"><MathText content="$2^3$" /></span>
                      <div className="text-lg font-bold">8</div>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">→</span>
                  <div className="flex flex-col items-center">
                    <div className="bg-pink-100 dark:bg-pink-900/50 rounded-lg p-3 text-center border-2 border-pink-400 dark:border-pink-600">
                      <span className="text-sm text-pink-600 font-bold"><MathText content="$2^2$" /></span>
                      <div className="text-lg font-bold">4</div>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">→</span>
                  <div className="flex flex-col items-center">
                    <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3 text-center border-2 border-amber-400 dark:border-amber-600">
                      <span className="text-sm text-amber-600 font-bold"><MathText content="$2^1$" /></span>
                      <div className="text-lg font-bold">2</div>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">→</span>
                  <div className="flex flex-col items-center">
                    <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-3 text-center border-2 border-green-500 dark:border-green-500">
                      <span className="text-sm text-green-600 font-bold"><MathText content="$2^0$" /></span>
                      <div className="text-lg font-bold">❓</div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
                  Cada paso dividimos por 2
                </p>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  <strong>¿Cuánto vale <MathText content="$2^0$" />?</strong>
                  <br />
                  <span className="text-sm">Sigue el patrón: cada vez dividimos por 2</span>
                </p>
              </div>
            </div>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Hacer mi predicción
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Patrón: 16 → 8 → 4 → 2 → <span className="font-mono font-bold text-green-600">?</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">(dividiendo por 2 cada vez)</p>
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
              ¡Descubriste el patrón!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <div className="text-center">
                      <p className="text-lg text-gray-700 dark:text-gray-300"><MathText content="$2^4 = 16$" /></p>
                    </div>
                    <span className="text-gray-400">÷2→</span>
                    <div className="text-center">
                      <p className="text-lg text-gray-700 dark:text-gray-300"><MathText content="$2^3 = 8$" /></p>
                    </div>
                    <span className="text-gray-400">÷2→</span>
                    <div className="text-center">
                      <p className="text-lg text-gray-700 dark:text-gray-300"><MathText content="$2^2 = 4$" /></p>
                    </div>
                    <span className="text-gray-400">÷2→</span>
                    <div className="text-center">
                      <p className="text-lg text-gray-700 dark:text-gray-300"><MathText content="$2^1 = 2$" /></p>
                    </div>
                    <span className="text-gray-400">÷2→</span>
                    <div className="text-center bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-lg">
                      <p className="text-lg text-green-600 font-bold"><MathText content="$2^0 = 1$" /></p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    2 ÷ 2 = 1, así que <strong><MathText content="$2^0 = 1$" /></strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Continue pattern to negatives */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                ¿Y si seguimos dividiendo?
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="text-center bg-green-100 dark:bg-green-900/50 px-3 py-2 rounded-lg">
                  <p className="text-sm text-green-600 font-bold"><MathText content="$2^0 = 1$" /></p>
                </div>
                <span className="text-gray-400">÷2→</span>
                <div className="text-center bg-blue-100 dark:bg-blue-900/50 px-3 py-2 rounded-lg">
                  <p className="text-sm text-blue-600 font-bold"><MathText content="$2^{-1} = \\frac{1}{2}$" /></p>
                </div>
                <span className="text-gray-400">÷2→</span>
                <div className="text-center bg-purple-100 dark:bg-purple-900/50 px-3 py-2 rounded-lg">
                  <p className="text-sm text-purple-600 font-bold"><MathText content="$2^{-2} = \\frac{1}{4}$" /></p>
                </div>
                <span className="text-gray-400">÷2→</span>
                <div className="text-center bg-pink-100 dark:bg-pink-900/50 px-3 py-2 rounded-lg">
                  <p className="text-sm text-pink-600 font-bold"><MathText content="$2^{-3} = \\frac{1}{8}$" /></p>
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
                  ¡Exponentes Cero y Negativos!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                      <p className="text-sm mb-2 text-gray-500">Exponente cero:</p>
                      <div className="text-xl text-blue-600 font-bold">
                        <MathText content="$a^0 = 1$" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">(cualquier número ≠ 0)</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                      <p className="text-sm mb-2 text-gray-500">Exponente negativo:</p>
                      <div className="text-xl text-purple-600 font-bold">
                        <MathText content="$a^{-n} = \\frac{1}{a^n}$" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">(es el recíproco)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Explorar más ejemplos
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
