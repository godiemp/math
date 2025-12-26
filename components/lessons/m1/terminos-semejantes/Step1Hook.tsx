'use client';

import { ArrowRight } from 'lucide-react';
import { Apple, Cherry } from 'lucide-react';
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

const OPTIONS = ['9 frutas', '7 manzanas + 2 naranjas', '9 mannaranjas', '5 manzanas + 4 naranjas'];
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">La Frutería Matemática</h2>
        <p className="text-gray-600 dark:text-gray-300">Un vendedor de frutas tiene un problema...</p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="cool">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Don Pedro tiene una frutería y necesita contar su inventario del día:
            </p>

            {/* Fruit display */}
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {/* 3 apples */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <div className="flex gap-1 mb-2">
                  <Apple className="w-8 h-8 text-red-500" />
                  <Apple className="w-8 h-8 text-red-500" />
                  <Apple className="w-8 h-8 text-red-500" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">3 manzanas</span>
              </div>

              <div className="flex items-center text-2xl font-bold text-gray-400">+</div>

              {/* 2 oranges */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <div className="flex gap-1 mb-2">
                  <Cherry className="w-8 h-8 text-orange-500" />
                  <Cherry className="w-8 h-8 text-orange-500" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">2 naranjas</span>
              </div>

              <div className="flex items-center text-2xl font-bold text-gray-400">+</div>

              {/* 4 more apples */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <div className="flex gap-1 mb-2">
                  <Apple className="w-8 h-8 text-red-500" />
                  <Apple className="w-8 h-8 text-red-500" />
                  <Apple className="w-8 h-8 text-red-500" />
                  <Apple className="w-8 h-8 text-red-500" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">4 manzanas</span>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">= ???</p>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              ¿Cuál es el total?
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              ¿Cómo podemos escribir el total de frutas de Don Pedro?
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
              explanation={
                isCorrect
                  ? '¡Exacto! Solo podemos sumar frutas del mismo tipo...'
                  : '¡Casi! Solo podemos sumar frutas del mismo tipo...'
              }
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Paso a paso:</h3>

            <div className="space-y-4">
              {/* Step 1: Group apples */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">
                  <Apple className="w-6 h-6 text-red-500" />
                  <span className="font-mono font-bold">3</span>
                </div>
                <span className="text-xl font-bold text-gray-400">+</span>
                <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">
                  <Apple className="w-6 h-6 text-red-500" />
                  <span className="font-mono font-bold">4</span>
                </div>
                <span className="text-xl font-bold text-gray-400">=</span>
                <div className="flex items-center gap-2 bg-red-200 dark:bg-red-800/50 px-4 py-2 rounded-lg border-2 border-red-400">
                  <Apple className="w-6 h-6 text-red-500" />
                  <span className="font-mono font-bold">7</span>
                </div>
              </div>

              {/* Step 2: Oranges stay separate */}
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-lg">
                  <Cherry className="w-6 h-6 text-orange-500" />
                  <span className="font-mono font-bold">2</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">(se quedan separadas)</span>
              </div>

              {/* Final result */}
              <div className="text-center pt-4 border-t border-green-200 dark:border-green-700">
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Total: <span className="text-red-600">7 manzanas</span> +{' '}
                  <span className="text-orange-500">2 naranjas</span>
                </p>
              </div>
            </div>
          </div>

          <InsightCard title="¡En álgebra funciona igual!" variant="purple">
            <div className="space-y-2">
              <p>
                Si usamos <strong className="text-red-600">x</strong> para manzanas y{' '}
                <strong className="text-orange-500">y</strong> para naranjas:
              </p>
              <p className="font-mono text-lg bg-white dark:bg-gray-800 px-4 py-2 rounded-lg inline-block">
                3<span className="text-red-600">x</span> + 2<span className="text-orange-500">y</span> + 4
                <span className="text-red-600">x</span> = 7<span className="text-red-600">x</span> + 2
                <span className="text-orange-500">y</span>
              </p>
              <p className="text-sm mt-2">
                Solo podemos sumar <strong>términos semejantes</strong> (los que tienen la misma variable).
              </p>
            </div>
          </InsightCard>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Continuar
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
