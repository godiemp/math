'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  OptionButton,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface PracticeQuestion {
  id: string;
  type: 'find-lcm' | 'identify-multiples' | 'find-denominator' | 'context' | 'formula';
  question: string;
  numbers?: number[];
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    type: 'identify-multiples',
    question: '¿Cuáles son los primeros 5 múltiplos de 8?',
    numbers: [8],
    options: ['8, 16, 24, 32, 40', '1, 2, 4, 8, 16', '8, 18, 28, 38, 48', '8, 16, 32, 64, 128'],
    correctAnswer: 0,
    explanation: 'Los múltiplos de 8 son: 8×1=8, 8×2=16, 8×3=24, 8×4=32, 8×5=40.',
  },
  {
    id: 'q2',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 3 y 4?',
    numbers: [3, 4],
    options: ['7', '12', '1', '24'],
    correctAnswer: 1,
    explanation: 'Múltiplos de 3: 3, 6, 9, 12... Múltiplos de 4: 4, 8, 12... El primero común es 12.',
  },
  {
    id: 'q3',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 5 y 15?',
    numbers: [5, 15],
    options: ['5', '15', '30', '75'],
    correctAnswer: 1,
    explanation: 'Como 5 divide a 15, el M.C.M. es simplemente 15. Cuando un número divide al otro, el M.C.M. es el mayor.',
  },
  {
    id: 'q4',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 7 y 11?',
    numbers: [7, 11],
    options: ['18', '77', '1', '44'],
    correctAnswer: 1,
    explanation: '7 y 11 son primos (coprimos). Como no comparten factores, M.C.M. = 7 × 11 = 77.',
  },
  {
    id: 'q5',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 6 y 9?',
    numbers: [6, 9],
    options: ['18', '54', '3', '15'],
    correctAnswer: 0,
    explanation: '6 = 2×3, 9 = 3². M.C.M. = 2×3² = 18. También: Múltiplos de 6: 6, 12, 18... Múltiplos de 9: 9, 18...',
  },
  {
    id: 'q6',
    type: 'context',
    question: 'Un autobús pasa cada 12 minutos y otro cada 15 minutos. Si ambos pasan ahora, ¿en cuántos minutos volverán a coincidir?',
    numbers: [12, 15],
    options: ['27 min', '30 min', '60 min', '180 min'],
    correctAnswer: 2,
    explanation: 'M.C.M.(12, 15) = 60. Ambos buses coinciden cada 60 minutos.',
  },
  {
    id: 'q7',
    type: 'formula',
    question: 'Si M.C.D.(24, 36) = 12, ¿cuál es M.C.M.(24, 36)?',
    numbers: [24, 36],
    options: ['12', '72', '864', '6'],
    correctAnswer: 1,
    explanation: 'Usando M.C.M. = (a × b) ÷ M.C.D. = (24 × 36) ÷ 12 = 864 ÷ 12 = 72.',
  },
  {
    id: 'q8',
    type: 'find-denominator',
    question: 'Para sumar 1/6 + 1/8, necesitas un denominador común. ¿Cuál es el menor denominador común?',
    numbers: [6, 8],
    options: ['14', '24', '48', '2'],
    correctAnswer: 1,
    explanation: 'El mínimo común denominador es el M.C.M.(6, 8) = 24.',
  },
  {
    id: 'q9',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 15 y 20?',
    numbers: [15, 20],
    options: ['30', '60', '300', '5'],
    correctAnswer: 1,
    explanation: '15 = 3×5, 20 = 2²×5. M.C.M. = 2²×3×5 = 4×3×5 = 60.',
  },
  {
    id: 'q10',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 4, 6 y 10?',
    numbers: [4, 6, 10],
    options: ['60', '120', '20', '240'],
    correctAnswer: 0,
    explanation: '4 = 2², 6 = 2×3, 10 = 2×5. M.C.M. = 2²×3×5 = 4×3×5 = 60.',
  },
];

const REQUIRED_CORRECT = 8;

// Question type label mapping
function getTypeLabel(type: PracticeQuestion['type']): string {
  const labels: Record<PracticeQuestion['type'], string> = {
    'find-lcm': 'Calcular M.C.M.',
    'identify-multiples': 'Identificar múltiplos',
    'find-denominator': 'Denominador común',
    'formula': 'Usar fórmula',
    'context': 'Problema contextual',
  };
  return labels[type];
}

// Question type color mapping
function getTypeColors(type: PracticeQuestion['type']): string {
  const colors: Record<PracticeQuestion['type'], string> = {
    'find-lcm': 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300',
    'identify-multiples': 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
    'find-denominator': 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
    'formula': 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
    'context': 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
  };
  return colors[type];
}

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Pregunta {mc.currentIndex + 1} de {QUESTIONS.length}
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={QUESTIONS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === QUESTIONS[i].correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Question type indicator */}
          <div className="flex justify-center">
            <span className={cn('px-4 py-1 rounded-full text-sm font-medium', getTypeColors(mc.currentItem.type))}>
              {getTypeLabel(mc.currentItem.type)}
            </span>
          </div>

          {/* Question */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              {mc.currentItem.question}
            </h3>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {mc.currentItem.options.map((option, index) => (
                <OptionButton
                  key={index}
                  label={option}
                  index={index}
                  isSelected={mc.selectedAnswer === index}
                  isCorrect={index === mc.currentItem.correctAnswer}
                  showFeedback={mc.showFeedback}
                  onClick={() => mc.select(index)}
                />
              ))}
            </div>
          </div>

          {/* Strategy hint */}
          {!mc.showFeedback && (
            <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-lg p-3 border border-cyan-200 dark:border-cyan-700">
              <p className="text-cyan-800 dark:text-cyan-200 text-sm text-center">
                <strong>Recuerda:</strong> Lista los múltiplos de cada número, encuentra los comunes
                y elige el menor. O usa factorización con exponentes máximos.
              </p>
            </div>
          )}

          {mc.showFeedback && (
            <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver resultados'
                : 'Comprobar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente!"
          successSubtext="Dominas el M.C.M."
          failureSubtext="Sigue practicando el M.C.M."
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm truncate flex-1">
                {q.question.slice(0, 30)}...
              </span>
              <span className="font-mono text-sm text-purple-600 ml-auto">
                {q.options[q.correctAnswer]}
              </span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
