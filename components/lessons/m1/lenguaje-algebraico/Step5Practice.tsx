'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { InlineMath } from '@/components/math/MathDisplay';
import { ActionButton, ProgressDots, FeedbackPanel, HintPanel } from '@/components/lessons/primitives';

interface PracticeQuestion {
  id: string;
  context: string;
  phrase: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'p1',
    context: 'En una tienda, el precio de un artículo se describe así:',
    phrase: 'El precio original menos el 20% de descuento',
    options: ['x - 20', 'x - 0.2x', '0.2x', 'x + 0.2'],
    correctIndex: 1,
    hint: 'El 20% de x se escribe como 0.2x (o 20/100 · x)',
    explanation: 'El 20% del precio es 0.2x, y restarlo del original da: x - 0.2x',
  },
  {
    id: 'p2',
    context: 'Un estudiante describe su edad:',
    phrase: 'Mi edad actual es 3 años más que el doble de mi edad hace 5 años',
    options: ['2x + 3', '2(x - 5) + 3', '2x - 5 + 3', '3 + 2 \\cdot 5'],
    correctIndex: 1,
    hint: 'Si tu edad actual es x, hace 5 años tenías (x - 5). El doble de eso es 2(x - 5).',
    explanation: 'La edad hace 5 años es (x - 5), el doble es 2(x - 5), y más 3 da: 2(x - 5) + 3',
  },
  {
    id: 'p3',
    context: 'Un rectángulo tiene estas dimensiones:',
    phrase: 'El largo es el triple del ancho, menos 2 metros',
    options: ['3x - 2', 'x - 2 \\cdot 3', '3(x - 2)', '\\frac{3x}{2}'],
    correctIndex: 0,
    hint: 'Si el ancho es x, "el triple del ancho" es 3x',
    explanation: 'El triple del ancho es 3x, y "menos 2" significa restar 2: 3x - 2',
  },
  {
    id: 'p4',
    context: 'En un concurso de matemáticas:',
    phrase: 'La puntuación es el doble de las respuestas correctas, menos las incorrectas',
    options: ['2x - y', 'x - 2y', '2(x - y)', '\\frac{2x}{y}'],
    correctIndex: 0,
    hint: 'Usa x para correctas e y para incorrectas. "El doble de correctas" es 2x.',
    explanation: 'Doble de correctas (2x) menos incorrectas (y): 2x - y',
  },
  {
    id: 'p5',
    context: 'Una receta de cocina indica:',
    phrase: 'La cantidad de harina es la mitad del azúcar, más 100 gramos',
    options: ['\\frac{x}{2} + 100', '\\frac{x + 100}{2}', '2x + 100', '100 - \\frac{x}{2}'],
    correctIndex: 0,
    hint: 'Si el azúcar es x, "la mitad del azúcar" es x/2',
    explanation: 'La mitad del azúcar es x/2, más 100 gramos: x/2 + 100',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null));

  if (!isActive) return null;

  const currentQuestion = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Práctica Completada!</h2>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {correctCount} de {QUESTIONS.length} correctas
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Has practicado la traducción en contextos de la vida real.
          </p>
        </div>

        <div className="flex justify-center">
          <ActionButton onClick={onComplete} icon={<ArrowRight size={20} />}>
            Ir al Checkpoint
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Practica la Traducción</h2>
        <p className="text-gray-600 dark:text-gray-300">Problemas con contexto de la vida real</p>
      </div>

      {/* Progress */}
      <ProgressDots
        items={QUESTIONS}
        currentIndex={currentIndex}
        getStatus={(_, i) =>
          answers[i] !== null
            ? answers[i] === QUESTIONS[i].correctIndex
              ? 'correct'
              : 'incorrect'
            : i === currentIndex
              ? 'current'
              : 'pending'
        }
        size="sm"
        className="gap-4"
      />

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Context */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-4 border border-blue-200 dark:border-blue-800">
          <p className="text-blue-700 dark:text-blue-300 text-sm">{currentQuestion.context}</p>
        </div>

        {/* Phrase to translate */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Traduce esta expresión:</p>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200 italic">
            &quot;{currentQuestion.phrase}&quot;
          </p>
        </div>

        {/* Hint Panel */}
        {!showFeedback && (
          <div className="mb-4">
            <HintPanel
              hint={currentQuestion.hint}
              isVisible={showHint}
              onToggle={() => setShowHint(!showHint)}
            />
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isOptionCorrect = index === currentQuestion.correctIndex;

            let buttonClasses = 'p-4 rounded-xl border-2 transition-all text-center ';

            if (showFeedback) {
              if (isOptionCorrect) {
                buttonClasses += 'bg-green-100 dark:bg-green-900/40 border-green-500 dark:border-green-600';
              } else if (isSelected && !isOptionCorrect) {
                buttonClasses += 'bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-600';
              } else {
                buttonClasses += 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 opacity-50';
              }
            } else {
              if (isSelected) {
                buttonClasses += 'bg-purple-100 dark:bg-purple-900/40 border-purple-500 dark:border-purple-600';
              } else {
                buttonClasses +=
                  'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={buttonClasses}
              >
                <span className="text-xl">
                  <InlineMath latex={option} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <FeedbackPanel isCorrect={isCorrect} explanation={currentQuestion.explanation} />
      )}

      {/* Actions */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <ActionButton
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            variant={selectedAnswer !== null ? 'primary' : 'disabled'}
          >
            Verificar
          </ActionButton>
        ) : (
          <ActionButton onClick={handleNext} icon={<ArrowRight size={20} />}>
            {currentIndex < QUESTIONS.length - 1 ? 'Siguiente' : 'Ver resultados'}
          </ActionButton>
        )}
      </div>
    </div>
  );
}
