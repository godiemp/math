'use client';

import { ArrowRight } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useStep1Phase } from '@/hooks/lessons';
import {
  ScenarioCard,
  QuestionPrompt,
  OptionGrid,
  OptionButton,
  ActionButton,
  FeedbackPanel,
  InsightCard,
} from '@/components/lessons/primitives';

const OPTIONS = ['5x + 15', 'x(5 + 15)', '5(x + 3)', '15(x + 1)'];
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">El Organizador de Cajas</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ana necesita organizar productos en cajas de forma eficiente...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Ana trabaja en una tienda y debe organizar <strong className="text-amber-600">productos</strong> en cajas.
              Tiene <strong className="text-blue-600">5x manzanas</strong> y{' '}
              <strong className="text-green-600">15 naranjas</strong>.
            </p>

            {/* Products visualization */}
            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Productos sin organizar:
                </p>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🍎</div>
                    <span className="font-mono text-lg text-blue-600 font-bold">5x</span>
                    <p className="text-xs text-gray-500">manzanas</p>
                  </div>
                  <div className="text-2xl text-gray-400 self-center">+</div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🍊</div>
                    <span className="font-mono text-lg text-green-600 font-bold">15</span>
                    <p className="text-xs text-gray-500">naranjas</p>
                  </div>
                </div>
              </div>

              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>

              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  Ana quiere usar <strong>la menor cantidad de cajas posible</strong>, pero cada caja debe tener la{' '}
                  <strong>misma cantidad total de productos</strong>.
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cuántas cajas necesita y qué hay en cada una?
            </p>
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
          <QuestionPrompt>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Productos: <span className="font-mono text-blue-600">5x</span> manzanas +{' '}
              <span className="font-mono text-green-600">15</span> naranjas
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
              La expresión algebraica es: <span className="font-mono font-bold">5x + 15</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
              ¿Cómo podemos escribir esto usando cajas (paréntesis)?
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
          {/* Visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Ana encontró el Factor Común!
            </h3>

            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600">5x</span> + <span className="text-green-600">15</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ ambos son divisibles por 5</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    = <span className="text-amber-600">5</span> · <span className="text-blue-600">x</span> +{' '}
                    <span className="text-amber-600">5</span> · <span className="text-green-600">3</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ extraemos el 5</p>
                  <p className="font-mono text-2xl text-green-600 font-bold">5(x + 3)</p>
                </div>
              </div>
            </div>

            {/* Box visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                Ana usa <strong className="text-amber-600">5 cajas</strong>, cada una con:
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {[1, 2, 3, 4, 5].map((box) => (
                  <div
                    key={box}
                    className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-700"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🍎</span>
                      <span className="text-gray-400">+</span>
                      <span className="text-2xl">🍊🍊🍊</span>
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-1 font-mono">x + 3</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bridge to concept */}
          <InsightCard title="¡Esto es Factorización por Factor Común!" variant="purple">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                <p className="text-sm mb-2">Cuando todos los términos comparten un factor:</p>
                <p className="font-mono text-lg">
                  <span className="text-amber-600 font-bold">a</span>x +{' '}
                  <span className="text-amber-600 font-bold">a</span>y ={' '}
                  <span className="text-amber-600 font-bold">a</span>(x + y)
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  <strong>El factor común</strong> es el número o variable que se repite en TODOS los términos.
                  <br />
                  <span className="text-purple-600">Lo &quot;sacamos&quot; y dejamos el resto entre paréntesis.</span>
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
