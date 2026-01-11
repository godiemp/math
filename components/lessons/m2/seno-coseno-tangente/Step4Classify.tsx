'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { TriangleFigure } from '@/components/figures/TriangleFigure';

type RatioType = 'sin' | 'cos' | 'tan';

interface Problem {
  id: string;
  description: string;
  knownSides: string;
  unknownSide: string;
  correctRatio: RatioType;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    description: 'Conoces el ángulo y la hipotenusa. Quieres encontrar el lado OPUESTO.',
    knownSides: 'θ, Hipotenusa',
    unknownSide: 'Opuesto',
    correctRatio: 'sin',
    explanation: 'sin(θ) = Opuesto/Hipotenusa → Opuesto = sin(θ) × Hipotenusa',
  },
  {
    id: 'p2',
    description: 'Conoces el ángulo y el lado adyacente. Quieres encontrar el lado OPUESTO.',
    knownSides: 'θ, Adyacente',
    unknownSide: 'Opuesto',
    correctRatio: 'tan',
    explanation: 'tan(θ) = Opuesto/Adyacente → Opuesto = tan(θ) × Adyacente',
  },
  {
    id: 'p3',
    description: 'Conoces el ángulo y la hipotenusa. Quieres encontrar el lado ADYACENTE.',
    knownSides: 'θ, Hipotenusa',
    unknownSide: 'Adyacente',
    correctRatio: 'cos',
    explanation: 'cos(θ) = Adyacente/Hipotenusa → Adyacente = cos(θ) × Hipotenusa',
  },
  {
    id: 'p4',
    description: 'Conoces el opuesto y el adyacente. Quieres encontrar el ÁNGULO.',
    knownSides: 'Opuesto, Adyacente',
    unknownSide: 'θ',
    correctRatio: 'tan',
    explanation: 'tan(θ) = Opuesto/Adyacente → θ = arctan(Opuesto/Adyacente)',
  },
  {
    id: 'p5',
    description: 'Conoces el ángulo y el lado opuesto. Quieres encontrar la HIPOTENUSA.',
    knownSides: 'θ, Opuesto',
    unknownSide: 'Hipotenusa',
    correctRatio: 'sin',
    explanation: 'sin(θ) = Opuesto/Hipotenusa → Hipotenusa = Opuesto/sin(θ)',
  },
];

const RATIO_OPTIONS: { id: RatioType; label: string; formula: string; color: string }[] = [
  { id: 'sin', label: 'Seno', formula: 'Op/Hip', color: 'red' },
  { id: 'cos', label: 'Coseno', formula: 'Ady/Hip', color: 'green' },
  { id: 'tan', label: 'Tangente', formula: 'Op/Ady', color: 'purple' },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  red: {
    bg: 'bg-red-100 dark:bg-red-900/50',
    border: 'border-red-500',
    text: 'text-red-700 dark:text-red-300',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/50',
    border: 'border-green-500',
    text: 'text-green-700 dark:text-green-300',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/50',
    border: 'border-purple-500',
    text: 'text-purple-700 dark:text-purple-300',
  },
};

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRatio, setSelectedRatio] = useState<RatioType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(RatioType | null)[]>(Array(PROBLEMS.length).fill(null));

  const isComplete = currentIndex >= PROBLEMS.length;
  const currentProblem = isComplete ? PROBLEMS[0] : PROBLEMS[currentIndex];
  const isCorrect = selectedRatio === currentProblem.correctRatio;

  const handleSelect = (ratio: RatioType) => {
    if (showFeedback) return;
    setSelectedRatio(ratio);
  };

  const handleCheck = () => {
    if (selectedRatio === null) return;
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedRatio;
    setAnswers(newAnswers);
    if (isCorrect) setCorrectCount((prev) => prev + 1);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedRatio(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedRatio(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setAnswers(Array(PROBLEMS.length).fill(null));
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Qué razón usar?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica la razón correcta para cada situación
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress indicators */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentIndex + 1} de {PROBLEMS.length}
            </div>
            <div className="flex gap-1">
              {PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    answers[i] !== null
                      ? answers[i] === PROBLEMS[i].correctRatio
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentIndex
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null
                    ? answers[i] === PROBLEMS[i].correctRatio
                      ? '✓'
                      : '✗'
                    : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
                {currentProblem.description}
              </p>

              {/* Visual representation */}
              <div className="flex flex-col items-center mb-4">
                <div className="text-sm font-bold text-amber-500 mb-2">
                  ¿{currentProblem.unknownSide}?
                </div>
                <TriangleFigure
                  fromAngles={{ angles: [30, 60, 90], size: 140 }}
                  showRightAngleMarker
                  fill="rgba(224, 231, 255, 0.5)"
                  stroke="#4f46e5"
                  angles={[
                    { showArc: true, label: 'θ', color: '#dc2626' },
                    {},
                    {},
                  ]}
                  sides={[
                    {
                      label: 'Hip',
                      labelColor: currentProblem.knownSides.includes('Hipotenusa')
                        ? '#7c3aed'
                        : '#9ca3af',
                    },
                    {
                      label: 'Op',
                      labelColor: currentProblem.knownSides.includes('Opuesto')
                        ? '#dc2626'
                        : '#9ca3af',
                    },
                    {
                      label: 'Ady',
                      labelColor: currentProblem.knownSides.includes('Adyacente')
                        ? '#059669'
                        : '#9ca3af',
                    },
                  ]}
                  showVertices={false}
                  className="w-56"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 inline-block">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Conoces:</strong> {currentProblem.knownSides}
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>Buscas:</strong> {currentProblem.unknownSide}
                </p>
              </div>
            </div>

            {/* Ratio options */}
            <div className="grid grid-cols-3 gap-3">
              {RATIO_OPTIONS.map((option) => {
                const colors = colorClasses[option.color];
                const isSelected = selectedRatio === option.id;
                const isCorrectAnswer = option.id === currentProblem.correctRatio;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    disabled={showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all',
                      isSelected
                        ? showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                          : `${colors.bg} ${colors.border}`
                        : showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                    )}
                  >
                    <div className="text-center">
                      {showFeedback && isCorrectAnswer && (
                        <Check size={18} className="text-green-600 mx-auto mb-1" />
                      )}
                      {showFeedback && isSelected && !isCorrectAnswer && (
                        <X size={18} className="text-red-600 mx-auto mb-1" />
                      )}
                      <span
                        className={cn(
                          'font-bold text-lg block',
                          isSelected && !showFeedback ? colors.text : 'text-gray-700 dark:text-gray-300'
                        )}
                      >
                        {option.label}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {option.formula}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl animate-fadeIn',
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                  : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
              )}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4
                    className={cn(
                      'font-bold mb-1',
                      isCorrect
                        ? 'text-green-800 dark:text-green-300'
                        : 'text-amber-800 dark:text-amber-300'
                    )}
                  >
                    {isCorrect ? '¡Correcto!' : '¡Casi!'}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {currentProblem.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedRatio === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedRatio !== null
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                {currentIndex < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver Resultados'}
              </button>
            )}
          </div>
        </>
      ) : (
        /* Results screen */
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              correctCount >= 4
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            {correctCount >= 4 ? (
              <Check className="w-20 h-20 mx-auto text-green-500 mb-4" />
            ) : (
              <RotateCcw className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                correctCount >= 4
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {correctCount >= 4 ? '¡Excelente!' : '¡Sigue practicando!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {PROBLEMS.length}
            </div>

            <p
              className={cn(
                correctCount >= 4
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {correctCount >= 4
                ? 'Dominas la selección de razones trigonométricas.'
                : 'Recuerda: SOH-CAH-TOA te ayuda a elegir la razón correcta.'}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            {correctCount < 4 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
