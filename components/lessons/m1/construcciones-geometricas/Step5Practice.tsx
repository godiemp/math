'use client';

import { useState } from 'react';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { ProgressDots, FeedbackPanel, ActionButton, HintPanel } from '@/components/lessons/primitives';
import { useHintToggle } from '@/hooks/lessons';

interface StepOption {
  id: string;
  text: string;
  order: number;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  steps: StepOption[];
  hint: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'mediatriz',
    title: 'Construcción de la Mediatriz',
    description: 'Ordena los pasos para construir la mediatriz de un segmento AB.',
    steps: [
      { id: 'a', text: 'Trazar la línea que pasa por los puntos de intersección', order: 4 },
      { id: 'b', text: 'Abrir el compás más de la mitad de AB', order: 1 },
      { id: 'c', text: 'Trazar un arco desde B con el mismo radio', order: 3 },
      { id: 'd', text: 'Trazar un arco desde A', order: 2 },
    ],
    hint: 'Primero necesitas abrir el compás. Luego dibujas arcos desde ambos extremos. Finalmente unes los puntos.',
  },
  {
    id: 'bisectriz',
    title: 'Construcción de la Bisectriz',
    description: 'Ordena los pasos para construir la bisectriz de un ángulo.',
    steps: [
      { id: 'a', text: 'Trazar arcos desde P y Q hacia el interior', order: 3 },
      { id: 'b', text: 'Unir el vértice con el punto de intersección', order: 4 },
      { id: 'c', text: 'Marcar puntos P y Q en los lados del ángulo', order: 2 },
      { id: 'd', text: 'Trazar un arco desde el vértice que corte ambos lados', order: 1 },
    ],
    hint: 'El primer paso siempre es desde el vértice. Los arcos interiores vienen después de marcar los puntos.',
  },
  {
    id: 'perpendicular',
    title: 'Perpendicular desde un Punto',
    description: 'Ordena los pasos para trazar una perpendicular desde un punto P a una recta L.',
    steps: [
      { id: 'a', text: 'Unir P con el punto de intersección de los arcos', order: 4 },
      { id: 'b', text: 'Marcar los puntos A y B donde el arco corta la recta', order: 2 },
      { id: 'c', text: 'Trazar arcos desde A y B bajo la recta', order: 3 },
      { id: 'd', text: 'Desde P, trazar un arco que corte la recta en dos puntos', order: 1 },
    ],
    hint: 'Siempre empiezas desde el punto P. Los arcos bajo la recta se trazan desde los puntos en la recta.',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const { showHint, toggleHint, hideHint } = useHintToggle();

  const currentProblem = PROBLEMS[currentIndex];
  const isComplete = currentIndex >= PROBLEMS.length;

  const handleStepClick = (stepId: string) => {
    if (showFeedback) return;

    if (selectedOrder.includes(stepId)) {
      // Remove and all after it
      const index = selectedOrder.indexOf(stepId);
      setSelectedOrder(selectedOrder.slice(0, index));
    } else {
      setSelectedOrder([...selectedOrder, stepId]);
    }
  };

  const checkAnswer = () => {
    const correctOrder = [...currentProblem.steps]
      .sort((a, b) => a.order - b.order)
      .map((s) => s.id);

    const correct =
      selectedOrder.length === correctOrder.length &&
      selectedOrder.every((id, i) => id === correctOrder[i]);

    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setCorrectCount((c) => c + 1);
    }
  };

  const nextProblem = () => {
    setCurrentIndex((i) => i + 1);
    setSelectedOrder([]);
    setShowFeedback(false);
    hideHint();
  };

  const resetProblem = () => {
    setSelectedOrder([]);
    setShowFeedback(false);
  };

  if (!isActive) return null;

  if (isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Practica Paso a Paso
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {correctCount === PROBLEMS.length ? '¡Excelente!' : '¡Buen intento!'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Ordenaste correctamente {correctCount} de {PROBLEMS.length} construcciones.
          </p>
        </div>

        <button
          onClick={onComplete}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  // Get the correct order for feedback
  const correctOrder = [...currentProblem.steps].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Practica Paso a Paso
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ordena los pasos de cada construcción en el orden correcto.
        </p>
      </div>

      {/* Progress */}
      <ProgressDots
        items={PROBLEMS}
        currentIndex={currentIndex}
        getStatus={(_, i) => (i < currentIndex ? 'correct' : i === currentIndex ? 'current' : 'pending')}
      />

      {/* Problem Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{currentProblem.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{currentProblem.description}</p>

        {/* Selected order display */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 min-h-[60px]">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Tu orden:</p>
          <div className="flex flex-wrap gap-2">
            {selectedOrder.length === 0 ? (
              <span className="text-gray-400 dark:text-gray-500 text-sm">
                Haz clic en los pasos para ordenarlos...
              </span>
            ) : (
              selectedOrder.map((stepId, index) => {
                const step = currentProblem.steps.find((s) => s.id === stepId);
                return (
                  <div
                    key={stepId}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer',
                      showFeedback && step?.order === index + 1
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : showFeedback && step?.order !== index + 1
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    )}
                    onClick={() => !showFeedback && handleStepClick(stepId)}
                  >
                    {index + 1}. {step?.text.slice(0, 30)}...
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Available steps */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">Pasos disponibles:</p>
          {currentProblem.steps.map((step) => {
            const isSelected = selectedOrder.includes(step.id);
            const orderIndex = selectedOrder.indexOf(step.id);

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                disabled={showFeedback}
                className={cn(
                  'w-full p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3',
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 opacity-50'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600',
                  showFeedback && 'cursor-not-allowed'
                )}
              >
                <span
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0',
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  )}
                >
                  {isSelected ? orderIndex + 1 : '?'}
                </span>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{step.text}</span>
              </button>
            );
          })}
        </div>

        {/* Hint */}
        <HintPanel hint={currentProblem.hint} isVisible={showHint} onToggle={toggleHint} />

        {/* Feedback */}
        {showFeedback && (
          <FeedbackPanel
            isCorrect={isCorrect}
            explanation={
              isCorrect
                ? '¡Perfecto! Has ordenado los pasos correctamente.'
                : `El orden correcto es: ${correctOrder.map((s, i) => `${i + 1}. ${s.text.slice(0, 25)}...`).join(' → ')}`
            }
          />
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {!showFeedback && (
            <button
              onClick={resetProblem}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <RotateCcw size={16} />
              <span>Reiniciar</span>
            </button>
          )}

          {!showFeedback ? (
            <ActionButton
              onClick={checkAnswer}
              disabled={selectedOrder.length !== currentProblem.steps.length}
              className="flex-1"
            >
              Verificar orden
            </ActionButton>
          ) : (
            <ActionButton onClick={nextProblem} className="flex-1">
              {currentIndex < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
}
