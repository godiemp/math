'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Smartphone } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import {
  ScenarioCard,
  QuestionPrompt,
  OptionGrid,
  OptionButton,
  ActionButton,
  FeedbackPanel,
  InsightCard,
} from '@/components/lessons/primitives';

type Phase = 'scenario' | 'question' | 'result';

const OPTIONS = [
  'Plan Entel: $13.000',
  'Plan Movistar: $15.000',
  'Cuestan lo mismo',
  'Plan Entel: $15.000',
];

const CORRECT_ANSWER = 0; // "Plan Entel: $13.000"

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const isCorrect = selectedAnswer === CORRECT_ANSWER;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setTimeout(() => setPhase('result'), 1500);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Plan de Datos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Descubre el patrón detrás de los costos
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="cool">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Tu familia quiere cambiar de plan de celular. Hay dos opciones:
            </p>

            {/* Visual comparison */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
              {/* Plan Entel */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex-1">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  Plan Entel
                </span>
                <div className="mt-3 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400">
                    <span className="font-bold">$5.000</span>
                    <span className="text-sm text-gray-500">base</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">+</p>
                  <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400">
                    <span className="font-bold">$2.000</span>
                    <span className="text-sm text-gray-500">por GB</span>
                  </div>
                </div>
              </div>

              {/* VS indicator */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-gray-400">VS</div>
              </div>

              {/* Plan Movistar */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex-1">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  Plan Movistar
                </span>
                <div className="mt-3 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400">
                    <span className="font-bold">$3.000</span>
                    <span className="text-sm text-gray-500">base</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">+</p>
                  <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400">
                    <span className="font-bold">$3.000</span>
                    <span className="text-sm text-gray-500">por GB</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              Si usas <span className="font-bold text-green-600">4 GB</span> adicionales...
              <br />
              ¿Cuál plan conviene más?
            </p>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Calcula y adivina
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Con 4 GB adicionales, ¿cuál plan es más barato?
            </p>
          </QuestionPrompt>

          <OptionGrid columns={2}>
            {OPTIONS.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={index === CORRECT_ANSWER}
                showFeedback={showFeedback}
                onClick={() => handleSelect(index)}
                isMono
              />
            ))}
          </OptionGrid>

          {!showFeedback && (
            <div className="flex justify-center">
              <ActionButton onClick={handleCheck} disabled={selectedAnswer === null}>
                Verificar
              </ActionButton>
            </div>
          )}

          {showFeedback && (
            <FeedbackPanel
              isCorrect={isCorrect}
              title={isCorrect ? '¡Exacto!' : '¡Casi!'}
              explanation="Veamos por qué..."
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Descubriste un patrón!
            </h3>

            <div className="space-y-4">
              {/* Calculations */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Plan Entel:</p>
                <div className="font-mono text-center text-gray-700 dark:text-gray-300">
                  <span className="text-amber-600">$5.000</span> +{' '}
                  <span className="text-blue-600">$2.000</span> × 4 ={' '}
                  <span className="font-bold text-green-600">$13.000</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  Plan Movistar:
                </p>
                <div className="font-mono text-center text-gray-700 dark:text-gray-300">
                  <span className="text-amber-600">$3.000</span> +{' '}
                  <span className="text-purple-600">$3.000</span> × 4 ={' '}
                  <span className="font-bold text-red-600">$15.000</span>
                </div>
              </div>

              {/* Pattern */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-green-600 dark:text-green-400 mb-2">El patrón:</p>
                <div className="text-center space-y-2">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    Costo = <span className="text-amber-600 font-bold">base</span> +{' '}
                    <span className="text-blue-600 font-bold">precio por GB</span> ×{' '}
                    <span className="text-green-600 font-bold">GB</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bridge to lesson */}
          <InsightCard
            title="Esto es una Función Afín"
            icon={<Lightbulb className="w-8 h-8 text-yellow-500" />}
            variant="purple"
          >
            <div className="space-y-2">
              <p className="font-mono text-lg">
                <span className="text-purple-600 font-bold">y</span> ={' '}
                <span className="text-blue-600 font-bold">m</span>x +{' '}
                <span className="text-amber-600 font-bold">b</span>
              </p>
              <p className="text-sm">
                Donde <span className="text-blue-600 font-bold">m</span> es la{' '}
                <strong>pendiente</strong> (cuánto aumenta por cada unidad) y{' '}
                <span className="text-amber-600 font-bold">b</span> es el{' '}
                <strong>coeficiente de posición</strong> (el valor inicial).
              </p>
            </div>
          </InsightCard>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} icon={<ArrowRight size={20} />}>
              Descubrir el patrón
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
