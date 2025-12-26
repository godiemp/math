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

const OPTIONS = [
  '25² - 23² = 625 - 529 = 96 (calcular cada cuadrado)',
  '(25 - 23)² = 2² = 4',
  '(25 + 23)(25 - 23) = 48 × 2 = 96',
  '25 × 23 = 575',
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">El Truco del Calculista</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Un matemático puede calcular diferencias de cuadrados instantáneamente...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              En un concurso de matemáticas, el presentador le pregunta a Sofía:
            </p>

            {/* Visual representation */}
            <div className="flex flex-col items-center gap-6 mb-6">
              {/* Question card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">El desafío:</p>
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🧮</div>
                    <span className="font-mono text-xl text-blue-600 font-bold">25² - 23² = ?</span>
                    <p className="text-xs text-gray-500 mt-2">Calcular mentalmente</p>
                  </div>
                </div>
              </div>

              {/* Arrow down */}
              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Sofia's response */}
              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  Sofía responde <strong>instantáneamente</strong>: &ldquo;¡Es 96!&rdquo;
                  <br />
                  <span className="text-sm">Sin calculadora y sin hacer 625 - 529</span>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cómo lo hizo tan rápido?
            </p>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Descubrir el truco
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Calcular: <span className="font-mono text-blue-600">25² - 23²</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
              ¿Qué método usó Sofía para obtener 96 tan rápido?
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
              explanation={isCorrect ? '¡Exacto! Veamos el truco de Sofía...' : '¡Casi! Veamos el truco de Sofía...'}
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡El truco de Sofía!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600">25²</span> - <span className="text-purple-600">23²</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ usamos la fórmula a² - b² = (a+b)(a-b)</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    = (<span className="text-blue-600">25</span> + <span className="text-purple-600">23</span>)(
                    <span className="text-blue-600">25</span> - <span className="text-purple-600">23</span>)
                  </p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    = <span className="text-amber-600">48</span> × <span className="text-green-600">2</span>
                  </p>
                  <p className="font-mono text-2xl text-green-600 font-bold">= 96</p>
                </div>
              </div>
            </div>

            {/* Why it works */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                ¿Por qué funciona?
              </p>
              <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    En vez de calcular dos cuadrados grandes y restarlos,
                    <br />
                    Sofía multiplicó dos números simples: <strong>48 × 2</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <InsightCard title="¡Esto es la Diferencia de Cuadrados!" variant="purple">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                <p className="text-sm mb-2">La diferencia de dos cuadrados siempre se puede factorizar como:</p>
                <p className="font-mono text-lg">
                  <span className="text-blue-600 font-bold">a²</span> -{' '}
                  <span className="text-purple-600 font-bold">b²</span> = (
                  <span className="text-blue-600 font-bold">a</span> +{' '}
                  <span className="text-purple-600 font-bold">b</span>)(
                  <span className="text-blue-600 font-bold">a</span> -{' '}
                  <span className="text-purple-600 font-bold">b</span>)
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  Esto funciona tanto para <strong>números</strong> como para{' '}
                  <strong>expresiones algebraicas</strong>
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
