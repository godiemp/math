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

const OPTIONS = ['$10.000', '$15.000', '$20.000', '$25.000'];
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Las Ofertas del Centro Comercial</h2>
        <p className="text-gray-600 dark:text-gray-300">Descubre el poder de los porcentajes en la vida real</p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Camila encuentra una polera que le encanta. El precio original es
              <strong className="text-amber-600"> $50.000</strong>, pero tiene un cartel que dice
              <strong className="text-green-600"> &quot;30% de descuento&quot;</strong>.
            </p>

            {/* Visual representation - Store scene */}
            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">En la tienda:</p>
                <div className="flex flex-col items-center gap-4">
                  {/* T-shirt representation */}
                  <div className="relative">
                    <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-8 text-center border-2 border-blue-300 dark:border-blue-700">
                      <div className="text-5xl mb-2">👕</div>
                      <span className="font-mono text-lg text-gray-600 dark:text-gray-400 line-through">$50.000</span>
                    </div>
                    {/* Discount tag */}
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-12">
                      -30%
                    </div>
                  </div>

                  {/* Arrow and question */}
                  <div className="text-3xl">⬇️</div>

                  <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-4 text-center border-2 border-green-400 dark:border-green-600">
                    <span className="text-sm text-gray-500">¿Cuánto ahorra?</span>
                    <div className="text-2xl font-bold text-green-600">❓</div>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  <strong>¿Cuánto dinero ahorra Camila con el descuento?</strong>
                  <br />
                  <span className="text-sm">El 30% de $50.000 es...</span>
                </p>
              </div>
            </div>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Calcular el descuento
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              El <span className="text-green-600">30%</span> de <span className="text-amber-600">$50.000</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
              30 de cada 100 pesos van como descuento
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
              explanation={
                isCorrect ? '¡Exacto! Veamos cómo calcular porcentajes...' : '¡Casi! Veamos cómo calcular porcentajes...'
              }
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Descubriste los Porcentajes!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-green-600">30%</span> de <span className="text-amber-600">$50.000</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ significa: 30 de cada 100</p>
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-green-600">30</span> ÷ <span className="text-purple-600">100</span> ×{' '}
                    <span className="text-amber-600">50.000</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓</p>
                  <p className="font-mono text-2xl text-green-600 font-bold">= $15.000</p>
                </div>
              </div>
            </div>

            {/* Visual bar representation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">Visualiza el 30%:</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 w-16">$50.000</span>
                  <div className="flex-1 h-8 bg-amber-200 dark:bg-amber-800 rounded-lg overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-500 w-[30%] flex items-center justify-center">
                      <span className="text-xs text-white font-bold">30%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16"></span>
                  <div className="flex-1 flex text-xs">
                    <span className="text-gray-500">$0</span>
                    <span className="w-[30%] text-right pr-1 text-green-600 font-bold">$15.000</span>
                    <span className="flex-1 text-right text-gray-500">$50.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InsightCard title="¡Esto son los Porcentajes!" variant="purple">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                <p className="text-sm mb-2">El porcentaje significa &quot;por cada 100&quot;:</p>
                <p className="font-mono text-lg">
                  <span className="text-green-600 font-bold">x%</span> ={' '}
                  <span className="text-green-600 font-bold">x</span> de cada{' '}
                  <span className="text-purple-600 font-bold">100</span>
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  <strong>30%</strong> significa: tomar <strong>30</strong> de cada <strong>100</strong>
                  <br />
                  Camila paga: $50.000 - $15.000 = <strong>$35.000</strong>
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
