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

const OPTIONS = ['x² + 7x + 12', 'x(x + 7 + 12)', '(x + 3)(x + 4)', '(x + 2)(x + 6)'];
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">El Jardín Rectangular</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Marcos quiere diseñar un jardín con dimensiones especiales...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Marcos es jardinero y quiere crear un jardín rectangular. Sabe que el
              <strong className="text-green-600"> área total</strong> debe ser{' '}
              <strong className="text-blue-600">x² + 7x + 12</strong> metros cuadrados.
            </p>

            {/* Visual representation */}
            <div className="flex flex-col items-center gap-6 mb-6">
              {/* Area formula */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Área del jardín:
                </p>
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌳</div>
                    <span className="font-mono text-lg text-blue-600 font-bold">x² + 7x + 12</span>
                    <p className="text-xs text-gray-500">metros²</p>
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
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  Marcos necesita saber las <strong>dimensiones</strong> (largo y ancho) del jardín. Recordemos que:{' '}
                  <strong>Área = largo × ancho</strong>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cuáles son las dimensiones del jardín?
            </p>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Encontrar las dimensiones
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Área: <span className="font-mono text-blue-600">x² + 7x + 12</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
              El área es igual a <strong>largo × ancho</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
              ¿Cómo podemos escribir el área como un producto de dos factores?
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
              ¡Marcos encontró las dimensiones!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600">x² + 7x + 12</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ buscamos dos números que...</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    sumen <span className="text-amber-600">7</span> y multipliquen{' '}
                    <span className="text-green-600">12</span>
                  </p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-purple-600">3 + 4 = 7</span> y{' '}
                    <span className="text-purple-600">3 × 4 = 12</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ factorizamos</p>
                  <p className="font-mono text-2xl text-green-600 font-bold">(x + 3)(x + 4)</p>
                </div>
              </div>
            </div>

            {/* Garden visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                El jardín de Marcos tiene dimensiones:
              </p>
              <div className="flex justify-center">
                <div className="relative">
                  {/* Rectangle representing garden */}
                  <div className="w-48 h-32 bg-gradient-to-br from-green-200 to-emerald-300 dark:from-green-800 dark:to-emerald-700 rounded-lg border-2 border-green-500 flex items-center justify-center">
                    <span className="font-mono text-lg text-green-800 dark:text-green-200">x² + 7x + 12</span>
                  </div>
                  {/* Width label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <span className="font-mono text-blue-600 font-bold bg-white dark:bg-gray-800 px-2 rounded">
                      x + 4
                    </span>
                  </div>
                  {/* Height label */}
                  <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                    <span className="font-mono text-blue-600 font-bold bg-white dark:bg-gray-800 px-2 rounded">
                      x + 3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InsightCard title="¡Esto es Factorización de Trinomios!" variant="purple">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                <p className="text-sm mb-2">Un trinomio de la forma x² + bx + c se factoriza como:</p>
                <p className="font-mono text-lg">
                  x² + <span className="text-amber-600 font-bold">b</span>x +{' '}
                  <span className="text-green-600 font-bold">c</span> = (x +{' '}
                  <span className="text-purple-600 font-bold">p</span>)(x +{' '}
                  <span className="text-purple-600 font-bold">q</span>)
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  Donde <strong>p + q = b</strong> (suman el coeficiente de x)
                  <br />y <strong>p × q = c</strong> (multiplican el término independiente)
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
