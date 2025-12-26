'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Home, ZoomIn, Target } from 'lucide-react';
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
  'La puerta queda en (4, 2) y la ventana en (8, 6)',
  'La puerta queda en (2, 1) y la ventana en (4, 3)',
  'La puerta queda en (2, 1) y la ventana en (6, 5)',
  'La puerta queda en (4, 2) y la ventana en (6, 4)',
];

const CORRECT_ANSWER = 2; // Door stays at (2,1), window goes from (4,3) to (6,5) with k=2 from center (2,1)

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
          El Arquitecto Digital
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Escalar planos manteniendo un punto fijo
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="cool">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Una arquitecta necesita escalar el plano de una casa al{' '}
              <span className="font-bold text-blue-600">doble de tamaño</span> (k = 2). El cliente
              pide que la{' '}
              <span className="font-bold text-red-500">puerta principal</span> quede en la{' '}
              <strong>misma posición</strong>.
            </p>

            {/* Visual: House blueprint */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
              <svg viewBox="0 0 200 150" className="w-full max-w-md mx-auto">
                {/* Grid */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={20 + i * 20}
                    y1={10}
                    x2={20 + i * 20}
                    y2={130}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="0.5"
                  />
                ))}
                {Array.from({ length: 7 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1={20}
                    y1={10 + i * 20}
                    x2={180}
                    y2={10 + i * 20}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Axes */}
                <line
                  x1={20}
                  y1={130}
                  x2={180}
                  y2={130}
                  className="stroke-gray-400 dark:stroke-gray-500"
                  strokeWidth="1.5"
                />
                <line
                  x1={20}
                  y1={130}
                  x2={20}
                  y2={10}
                  className="stroke-gray-400 dark:stroke-gray-500"
                  strokeWidth="1.5"
                />

                {/* Axis labels */}
                <text x={185} y={135} className="fill-gray-500 text-[8px]">
                  x
                </text>
                <text x={15} y={8} className="fill-gray-500 text-[8px]">
                  y
                </text>

                {/* Original house outline */}
                <rect
                  x={40}
                  y={70}
                  width={40}
                  height={50}
                  className="fill-blue-100 dark:fill-blue-900/50 stroke-blue-500"
                  strokeWidth="2"
                />
                {/* Roof */}
                <polygon
                  points="40,70 60,50 80,70"
                  className="fill-blue-200 dark:fill-blue-800/50 stroke-blue-500"
                  strokeWidth="2"
                />

                {/* Door (center of homothety) */}
                <rect
                  x={55}
                  y={100}
                  width={10}
                  height={20}
                  className="fill-red-400 dark:fill-red-600 stroke-red-600"
                  strokeWidth="2"
                />
                {/* Door label */}
                <circle cx={60} cy={110} r={8} className="fill-red-500" />
                <text
                  x={60}
                  y={114}
                  textAnchor="middle"
                  className="fill-white text-[8px] font-bold"
                >
                  C
                </text>

                {/* Window */}
                <rect
                  x={65}
                  y={80}
                  width={10}
                  height={10}
                  className="fill-cyan-200 dark:fill-cyan-700 stroke-cyan-500"
                  strokeWidth="1.5"
                />

                {/* Coordinate labels */}
                <text
                  x={60}
                  y={140}
                  textAnchor="middle"
                  className="fill-red-600 text-[7px] font-bold"
                >
                  Puerta (2, 1)
                </text>
                <text
                  x={100}
                  y={85}
                  className="fill-cyan-600 dark:fill-cyan-400 text-[7px]"
                >
                  Ventana (4, 3)
                </text>
              </svg>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-red-500" />
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  Centro de escalado:
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                La puerta en <span className="font-mono font-bold text-red-500">(2, 1)</span> debe
                quedar fija
              </p>
            </div>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Ver opciones de escalado
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Si escalamos al doble (k = 2) desde la puerta,
              <br />
              <span className="text-blue-600">¿dónde quedan la puerta y la ventana?</span>
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
              explanation="Veamos cómo funciona el escalado..."
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              El Centro se Mantiene Fijo
            </h3>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <svg viewBox="0 0 220 160" className="w-full max-w-lg mx-auto">
                {/* Grid */}
                {Array.from({ length: 11 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={20 + i * 20}
                    y1={10}
                    x2={20 + i * 20}
                    y2={150}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="0.5"
                  />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1={20}
                    y1={10 + i * 20}
                    x2={220}
                    y2={10 + i * 20}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Axes */}
                <line
                  x1={20}
                  y1={150}
                  x2={220}
                  y2={150}
                  className="stroke-gray-400"
                  strokeWidth="1.5"
                />
                <line x1={20} y1={150} x2={20} y2={10} className="stroke-gray-400" strokeWidth="1.5" />

                {/* Original house (faded) */}
                <rect
                  x={40}
                  y={110}
                  width={40}
                  height={30}
                  className="fill-blue-100/50 stroke-blue-300"
                  strokeWidth="1"
                  strokeDasharray="3"
                />
                <polygon
                  points="40,110 60,90 80,110"
                  className="fill-blue-100/50 stroke-blue-300"
                  strokeWidth="1"
                  strokeDasharray="3"
                />

                {/* Scaled house */}
                <rect
                  x={40}
                  y={50}
                  width={80}
                  height={60}
                  className="fill-green-100 dark:fill-green-900/50 stroke-green-500"
                  strokeWidth="2"
                />
                <polygon
                  points="40,50 80,10 120,50"
                  className="fill-green-200 dark:fill-green-800/50 stroke-green-500"
                  strokeWidth="2"
                />

                {/* Center (door) - stays fixed */}
                <circle cx={60} cy={130} r={6} className="fill-red-500" />
                <text x={60} y={133} textAnchor="middle" className="fill-white text-[6px] font-bold">
                  C
                </text>
                <text x={72} y={145} className="fill-red-600 text-[7px] font-bold">
                  (2, 1)
                </text>

                {/* Original window */}
                <circle cx={80} cy={110} r={4} className="fill-blue-400 stroke-blue-600" strokeWidth="1" />
                <text x={90} y={108} className="fill-blue-600 text-[6px]">
                  (4, 3)
                </text>

                {/* Scaled window */}
                <circle cx={120} cy={70} r={5} className="fill-green-500 stroke-green-700" strokeWidth="1" />
                <text x={130} y={68} className="fill-green-600 text-[6px] font-bold">
                  (6, 5)
                </text>

                {/* Arrow from original to scaled */}
                <line
                  x1={83}
                  y1={107}
                  x2={117}
                  y2={73}
                  className="stroke-purple-500"
                  strokeWidth="1.5"
                  strokeDasharray="4"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 3, 0 6" className="fill-purple-500" />
                  </marker>
                </defs>

                {/* Scale factor label */}
                <text x={105} y={95} className="fill-purple-600 text-[7px] font-bold">
                  k = 2
                </text>
              </svg>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>
                  <strong>Centro:</strong> La puerta (2, 1) no se mueve
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>
                  <strong>Ventana:</strong> Se aleja del centro al doble de distancia
                </span>
              </div>
            </div>
          </div>

          {/* Bridge to concept */}
          <InsightCard
            title="Esto es una Homotecia"
            icon={<ZoomIn className="w-8 h-8 text-purple-500" />}
            variant="purple"
          >
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                La <strong className="text-purple-600">homotecia</strong> es una transformación que
                escala figuras desde un punto fijo llamado <strong>centro</strong>.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
                  P&apos; = C + k · (P - C)
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  k = razón de homotecia, C = centro
                </p>
              </div>
            </div>
          </InsightCard>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} icon={<ArrowRight size={20} />}>
              Explorar la homotecia
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
