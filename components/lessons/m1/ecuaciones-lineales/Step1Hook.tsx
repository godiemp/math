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

const OPTIONS = ['x = 10', 'x = 12', 'x = 15', 'x = 20'];
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">La Cuenta del Restaurante</h2>
        <p className="text-gray-600 dark:text-gray-300">Un misterio matemático en la mesa...</p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Tres amigos fueron a almorzar. Cada uno pidió el{' '}
              <strong className="text-amber-600">mismo plato del día</strong> y compartieron una{' '}
              <strong className="text-blue-600">bebida de $5.000</strong>.
            </p>

            {/* Visual representation */}
            <div className="flex flex-col items-center gap-6 mb-6">
              {/* Restaurant scene */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">En la mesa:</p>
                <div className="flex justify-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🍽️🍽️🍽️</div>
                    <span className="font-mono text-lg text-amber-600 font-bold">3 platos</span>
                    <p className="text-xs text-gray-500">precio: x cada uno</p>
                  </div>
                  <div className="text-2xl text-gray-400 self-center">+</div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🥤</div>
                    <span className="font-mono text-lg text-blue-600 font-bold">$5.000</span>
                    <p className="text-xs text-gray-500">bebida compartida</p>
                  </div>
                </div>
              </div>

              {/* Arrow down */}
              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Total */}
              <div className="bg-green-100 dark:bg-green-900/50 rounded-xl p-4 max-w-md">
                <p className="text-green-800 dark:text-green-200 text-center text-lg">
                  <strong>Total de la cuenta:</strong> <span className="font-mono text-2xl">$50.000</span>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cuánto cuesta cada plato del día?
            </p>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Resolver el misterio
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Si <span className="font-mono text-amber-600">x</span> es el precio de cada plato:
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 font-mono text-xl text-center">3x + 5.000 = 50.000</p>
            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm text-center">
              ¿Cuál es el valor de x (en miles)?
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
              ¡Resolvemos la ecuación paso a paso!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-amber-600">3x</span> + <span className="text-blue-600">5.000</span> ={' '}
                    <span className="text-green-600">50.000</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ restamos 5.000 de ambos lados</p>
                  <p className="font-mono text-lg text-gray-600 dark:text-gray-400">
                    <span className="text-amber-600">3x</span> = <span className="text-green-600">50.000</span> -{' '}
                    <span className="text-blue-600">5.000</span>
                  </p>
                  <p className="font-mono text-lg text-gray-600 dark:text-gray-400">
                    <span className="text-amber-600">3x</span> = <span className="text-green-600">45.000</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ dividimos ambos lados entre 3</p>
                  <p className="font-mono text-2xl text-green-600 font-bold">x = 15.000</p>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                Verificación: <strong className="text-green-600">3(15.000) + 5.000 = 50.000</strong> ✓
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-700 text-center">
                  <div className="text-3xl mb-2">🍽️</div>
                  <p className="font-mono font-bold text-amber-700 dark:text-amber-300">$15.000</p>
                  <p className="text-xs text-gray-500">cada plato</p>
                </div>
              </div>
            </div>
          </div>

          <InsightCard title="¡Esto es resolver una Ecuación Lineal!" variant="purple">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                <p className="text-sm mb-2">Una ecuación lineal tiene la forma:</p>
                <p className="font-mono text-lg">
                  <span className="text-amber-600 font-bold">a</span>x +{' '}
                  <span className="text-blue-600 font-bold">b</span> ={' '}
                  <span className="text-green-600 font-bold">c</span>
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  <strong>El objetivo:</strong> despejar la variable <span className="font-mono">x</span> usando
                  operaciones inversas.
                  <br />
                  <span className="text-purple-600">Lo que sumas → lo restas. Lo que multiplicas → lo divides.</span>
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
