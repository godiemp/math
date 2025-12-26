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

const OPTIONS = ['3 metros', '4 metros', '5 metros', '6 metros'];
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
          El Jardín Cuadrado
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Descubre la operación inversa de las potencias
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Un jardinero quiere construir un jardín <strong className="text-green-600">cuadrado</strong> con
              un área de exactamente <strong className="text-blue-600">25 metros cuadrados</strong>.
            </p>

            {/* Visual representation */}
            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  El jardín cuadrado:
                </p>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-300 to-green-500 dark:from-green-600 dark:to-green-800 rounded-lg border-4 border-green-600 dark:border-green-400 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">25 m²</span>
                    </div>
                    <div className="absolute -bottom-8 left-0 right-0 text-center">
                      <span className="font-mono text-lg text-gray-600 dark:text-gray-400">lado = ?</span>
                    </div>
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2">
                      <span className="font-mono text-lg text-gray-600 dark:text-gray-400">?</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 dark:bg-green-900/50 rounded-xl p-4 max-w-lg">
                <p className="text-green-800 dark:text-green-200 text-center">
                  <strong>¿Cuánto debe medir cada lado del jardín?</strong>
                  <br />
                  <span className="text-sm">Recuerda: Área = lado × lado = lado²</span>
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
              Si lado² = 25, entonces lado = <span className="text-blue-600">?</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Qué número multiplicado por sí mismo da 25?
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
              ¡Encontraste una Raíz Cuadrada!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    Si <span className="text-blue-600">lado²</span> = <span className="text-green-600">25</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ buscamos el número que al cuadrado da 25</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-blue-600">5</span> × <span className="text-blue-600">5</span> = <span className="text-green-600">25</span> ✓
                  </p>
                  <p className="text-gray-400 text-sm">↓ entonces</p>
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    lado = <span className="text-green-600 font-bold">5 metros</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                <strong>¡El símbolo de la raíz!</strong> Para escribir &quot;el número que al cuadrado da 25&quot;:
              </p>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
                <p className="font-mono text-2xl font-bold text-green-600">
                  √25 = 5
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Se lee: &quot;raíz cuadrada de 25 es igual a 5&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to nth roots */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  ¡Las Raíces Enésimas!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="text-sm">
                    Así como la raíz cuadrada deshace el &quot;elevar al cuadrado&quot;,
                    existen raíces para deshacer cualquier potencia:
                  </p>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                    <div className="grid grid-cols-1 gap-2 text-center">
                      <p className="font-mono text-sm">
                        <span className="text-blue-600">Raíz cuadrada:</span> √a deshace a²
                      </p>
                      <p className="font-mono text-sm">
                        <span className="text-purple-600">Raíz cúbica:</span> ∛a deshace a³
                      </p>
                      <p className="font-mono text-sm">
                        <span className="text-green-600">Raíz n-ésima:</span> ⁿ√a deshace aⁿ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Descubrir las raíces enésimas
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
