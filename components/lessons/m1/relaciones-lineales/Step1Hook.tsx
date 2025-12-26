'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, ShoppingBasket } from 'lucide-react';
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
  '5 panes y 2 medialunas',
  '3 panes y 2 medialunas',
  '4 panes y 1 medialuna',
  '2 panes y 3 medialunas',
];

const CORRECT_ANSWER = 1; // 3 panes ($6) + 2 medialunas ($6) = $12

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
          La Panaderia de Don Carlos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Descubre las combinaciones posibles
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Don Carlos va a la panaderia con exactamente{' '}
              <span className="font-bold text-green-600">$12</span>. Quiere comprar panes y
              medialunas para su familia.
            </p>

            {/* Visual comparison */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
              {/* Pan */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex-1">
                <div className="text-5xl mb-2">🍞</div>
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400">Pan</span>
                <div className="mt-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400">
                    <span className="font-bold text-2xl">$2</span>
                    <span className="text-sm text-gray-500">c/u</span>
                  </div>
                </div>
              </div>

              {/* Medialuna */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex-1">
                <div className="text-5xl mb-2">🥐</div>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  Medialuna
                </span>
                <div className="mt-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400">
                    <span className="font-bold text-2xl">$3</span>
                    <span className="text-sm text-gray-500">c/u</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900/40 rounded-lg p-4 text-center">
              <ShoppingBasket className="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
              <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                Presupuesto: <span className="font-bold text-green-600">$12 exactos</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Debe gastar todo, sin que sobre ni falte
              </p>
            </div>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Encontrar combinaciones
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              ¿Cual combinacion suma exactamente $12?
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
              explanation="Veamos por que..."
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Hay multiples combinaciones validas!
            </h3>

            <div className="space-y-3">
              {/* Valid combinations */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-green-600 dark:text-green-400 mb-3">
                  Combinaciones que suman $12:
                </p>
                <div className="space-y-2 font-mono text-gray-700 dark:text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>
                      🍞×<span className="text-amber-600 font-bold">6</span> + 🥐×
                      <span className="text-purple-600 font-bold">0</span>
                    </span>
                    <span>
                      = $<span className="text-amber-600">12</span> + $
                      <span className="text-purple-600">0</span> ={' '}
                      <span className="text-green-600 font-bold">$12</span> ✓
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>
                      🍞×<span className="text-amber-600 font-bold">3</span> + 🥐×
                      <span className="text-purple-600 font-bold">2</span>
                    </span>
                    <span>
                      = $<span className="text-amber-600">6</span> + $
                      <span className="text-purple-600">6</span> ={' '}
                      <span className="text-green-600 font-bold">$12</span> ✓
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>
                      🍞×<span className="text-amber-600 font-bold">0</span> + 🥐×
                      <span className="text-purple-600 font-bold">4</span>
                    </span>
                    <span>
                      = $<span className="text-amber-600">0</span> + $
                      <span className="text-purple-600">12</span> ={' '}
                      <span className="text-green-600 font-bold">$12</span> ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* Pattern */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  El patron matematico:
                </p>
                <div className="text-center">
                  <p className="font-mono text-xl text-gray-700 dark:text-gray-300">
                    <span className="text-amber-600 font-bold">2</span>x +{' '}
                    <span className="text-purple-600 font-bold">3</span>y ={' '}
                    <span className="text-green-600 font-bold">12</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    donde x = panes, y = medialunas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bridge to lesson */}
          <InsightCard
            title="Esto es una Relacion Lineal"
            icon={<Lightbulb className="w-8 h-8 text-yellow-500" />}
            variant="purple"
          >
            <div className="space-y-2">
              <p className="font-mono text-lg">
                <span className="text-amber-600 font-bold">a</span>x +{' '}
                <span className="text-purple-600 font-bold">b</span>y ={' '}
                <span className="text-green-600 font-bold">c</span>
              </p>
              <p className="text-sm">
                Esta ecuacion describe <strong>todos los puntos</strong> (x, y) que satisfacen la
                relacion. En un grafico, estos puntos forman una{' '}
                <strong className="text-blue-600">linea recta</strong>.
              </p>
            </div>
          </InsightCard>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} icon={<ArrowRight size={20} />}>
              Explorar la relacion
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
