'use client';

import { ArrowRight, Lightbulb, Sparkles, Rocket } from 'lucide-react';
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
import { BlockMath, InlineMath, MathText } from '@/components/math/MathDisplay';

const OPTIONS = [
  '$t = 4$ segundos',
  '$t = 2 + \\sqrt{6}$ segundos',
  '$t = 2 - \\sqrt{6}$ segundos',
  '$t = 4 + \\sqrt{6}$ segundos',
];
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
          El Lanzamiento del Cohete
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Una ecuación cuadrática en el mundo real...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              En la feria de ciencias, un estudiante lanza un cohete de agua.
              La altura del cohete (en metros) está dada por la ecuación:
            </p>

            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Altura del cohete:
                </p>
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2"><Rocket className="w-10 h-10 mx-auto text-blue-500" /></div>
                    <div className="text-lg text-blue-600 dark:text-blue-400 font-bold">
                      <InlineMath latex="h(t) = -5t^2 + 20t + 10" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-gray-400 dark:text-gray-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  <strong>Pregunta:</strong> ¿Cuándo cae el cohete al suelo?
                  <br />
                  <span className="text-sm">(Es decir, ¿cuándo <InlineMath latex="h(t) = 0" />?)</span>
                </p>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 mb-4">
              <p className="text-center text-purple-700 dark:text-purple-300 font-medium">
                Necesitamos resolver: <InlineMath latex="-5t^2 + 20t + 10 = 0" />
              </p>
              <p className="text-center text-purple-600 dark:text-purple-400 text-sm mt-2">
                Dividiendo por -5: <InlineMath latex="t^2 - 4t - 2 = 0" />
              </p>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              Esta ecuación <strong>no se puede factorizar</strong> fácilmente...
            </p>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Ver las opciones
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Ya conocemos <span className="text-purple-600 dark:text-purple-400">&quot;Completar el Cuadrado&quot;</span>, pero hay una forma más rápida...
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <InlineMath latex="t^2 - 4t - 2 = 0" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Aquí: <InlineMath latex="a = 1" />, <InlineMath latex="b = -4" />, <InlineMath latex="c = -2" />
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-3 mt-3">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">Existe una fórmula mágica:</p>
                <div className="text-center text-purple-700 dark:text-purple-300">
                  <BlockMath latex="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              ¿Cuándo cae el cohete al suelo? (tiempo positivo)
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
              explanation={isCorrect ? '¡Exacto! Veamos cómo llegamos a esa respuesta...' : '¡Casi! Veamos cómo funciona la fórmula...'}
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Así funciona la Fórmula Cuadrática!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-3">
                  <div className="text-lg text-blue-600 dark:text-blue-400">
                    <InlineMath latex="t^2 - 4t - 2 = 0" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    <InlineMath latex="a = 1" />, <InlineMath latex="b = -4" />, <InlineMath latex="c = -2" />
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">↓ Aplicamos la fórmula</p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <InlineMath latex="t = \frac{-(-4) \pm \sqrt{(-4)^2 - 4 \cdot 1 \cdot (-2)}}{2 \cdot 1}" />
                  </div>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">↓ Simplificamos</p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <InlineMath latex="t = \frac{4 \pm \sqrt{16 + 8}}{2} = \frac{4 \pm \sqrt{24}}{2} = \frac{4 \pm 2\sqrt{6}}{2}" />
                  </div>
                  <div className="text-2xl text-green-600 dark:text-green-400 font-bold">
                    <InlineMath latex="t = 2 \pm \sqrt{6}" />
                  </div>
                </div>
              </div>
            </div>

            {/* Numerical values */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                Las soluciones son:
              </p>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <span className="text-lg text-green-600 dark:text-green-400 font-bold">
                    <InlineMath latex="t_1 = 2 + \sqrt{6}" />
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">≈ 4.45 segundos</p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">Cuando cae</p>
                </div>
                <div className="text-center">
                  <span className="text-lg text-gray-400 dark:text-gray-500">
                    <InlineMath latex="t_2 = 2 - \sqrt{6}" />
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">≈ -0.45 segundos</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">(No físico)</p>
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
                  La Fórmula Cuadrática
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-sm mb-2">
                      <MathText content="Para cualquier ecuación $ax^2 + bx + c = 0$:" />
                    </p>
                    <div className="text-xl text-purple-600 dark:text-purple-400">
                      <BlockMath latex="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
                    </div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                      <strong>¡Es directa!</strong> Solo identificamos a, b, c y sustituimos en la fórmula.
                      <br />
                      No necesitamos completar el cuadrado cada vez.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Explorar la fórmula
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
