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
import { cn } from '@/lib/utils';

const OPTIONS = ['2 × 5 = 10', '5 × 5 = 25', '2 × 2 × 2 × 2 × 2 = 32', '2 + 2 + 2 + 2 + 2 = 10'];
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">La Leyenda del Tablero de Ajedrez</h2>
        <p className="text-gray-600 dark:text-gray-300">Un rey aprenderá el poder de multiplicar repetidamente...</p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Un sabio inventor presentó el ajedrez al rey. Como recompensa, el sabio pidió un pago especial:
              <strong className="text-amber-600"> 1 grano de arroz</strong> en la primera casilla,
              <strong className="text-blue-600"> el doble</strong> en cada casilla siguiente.
            </p>

            {/* Visual representation - Chessboard */}
            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Primeras casillas del tablero:
                </p>
                <div className="grid grid-cols-5 gap-2 justify-items-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3 text-center border-2 border-amber-300 dark:border-amber-700">
                      <div className="text-2xl mb-1">🌾</div>
                      <span className="font-mono text-sm text-amber-600 font-bold">1</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Casilla 1</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3 text-center border-2 border-amber-300 dark:border-amber-700">
                      <div className="text-2xl mb-1">🌾🌾</div>
                      <span className="font-mono text-sm text-amber-600 font-bold">2</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Casilla 2</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3 text-center border-2 border-amber-300 dark:border-amber-700">
                      <div className="text-2xl mb-1">🌾×4</div>
                      <span className="font-mono text-sm text-amber-600 font-bold">4</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Casilla 3</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3 text-center border-2 border-amber-300 dark:border-amber-700">
                      <div className="text-2xl mb-1">🌾×8</div>
                      <span className="font-mono text-sm text-amber-600 font-bold">8</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Casilla 4</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-3 text-center border-2 border-blue-400 dark:border-blue-600">
                      <div className="text-2xl mb-1">❓</div>
                      <span className="font-mono text-sm text-blue-600 font-bold">?</span>
                    </div>
                    <span className="text-xs text-blue-600 font-bold mt-1">Casilla 5</span>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  <strong>¿Cuántos granos habrá en la casilla 5?</strong>
                  <br />
                  <span className="text-sm">El patrón es: multiplicar por 2 cada vez</span>
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
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Casilla 5: El 2 se multiplica <span className="text-blue-600">5 veces</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
              Patrón: 1 → 2 → 4 → 8 → <span className="font-mono font-bold text-blue-600">?</span>
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
              ¡Descubriste las Potencias!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600">2</span> × <span className="text-blue-600">2</span> ×{' '}
                    <span className="text-blue-600">2</span> × <span className="text-blue-600">2</span> ×{' '}
                    <span className="text-blue-600">2</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ multiplicamos 2, cinco veces</p>
                  <p className="font-mono text-2xl text-green-600 font-bold">2⁵ = 32</p>
                </div>
              </div>
            </div>

            {/* Grains visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                El crecimiento exponencial:
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                {[
                  { casilla: 1, granos: 1, potencia: '2⁰' },
                  { casilla: 2, granos: 2, potencia: '2¹' },
                  { casilla: 3, granos: 4, potencia: '2²' },
                  { casilla: 4, granos: 8, potencia: '2³' },
                  { casilla: 5, granos: 16, potencia: '2⁴' },
                  { casilla: 6, granos: 32, potencia: '2⁵' },
                ].map((item) => (
                  <div
                    key={item.casilla}
                    className={cn(
                      'rounded-lg p-3 border-2 text-center min-w-[70px]',
                      item.casilla === 6
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-400 dark:border-green-600'
                        : 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700'
                    )}
                  >
                    <p className="text-xs text-gray-500">Casilla {item.casilla}</p>
                    <p className="font-mono font-bold text-lg">{item.granos}</p>
                    <p className="font-mono text-xs text-purple-600">{item.potencia}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <InsightCard title="¡Esto son las Potencias!" variant="purple">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                <p className="text-sm mb-2">Cuando multiplicamos un número por sí mismo varias veces:</p>
                <p className="font-mono text-lg">
                  <span className="text-blue-600 font-bold">a</span> × <span className="text-blue-600 font-bold">a</span>{' '}
                  × ... × <span className="text-blue-600 font-bold">a</span> ={' '}
                  <span className="text-purple-600 font-bold">aⁿ</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">(n veces)</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  <strong>La base</strong> es el número que se multiplica.
                  <br />
                  <strong>El exponente</strong> indica cuántas veces se multiplica.
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
