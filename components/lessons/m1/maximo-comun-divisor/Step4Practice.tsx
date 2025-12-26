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
  type: 'find-gcd' | 'identify-factors' | 'simplify-fraction' | 'context';
  question: string;
  numbers?: number[];
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    type: 'identify-factors',
    question: '¿Cuáles son los divisores de 15?',
    numbers: [15],
    options: ['1, 3, 5, 15', '1, 5, 15', '1, 3, 15', '3, 5, 15'],
    correctAnswer: 0,
    explanation: '15 = 3 × 5, entonces sus divisores son: 1, 3, 5 y 15.',
  },
  {
    id: 'q2',
    type: 'find-gcd',
    question: '¿Cuál es el M.C.D. de 8 y 12?',
    numbers: [8, 12],
    options: ['2', '4', '6', '8'],
    correctAnswer: 1,
    explanation: 'Divisores de 8: 1, 2, 4, 8. Divisores de 12: 1, 2, 3, 4, 6, 12. Comunes: 1, 2, 4. El mayor es 4.',
  },
  {
    id: 'q3',
    type: 'find-gcd',
    question: '¿Cuál es el M.C.D. de 18 y 24?',
    numbers: [18, 24],
    options: ['2', '3', '6', '12'],
    correctAnswer: 2,
    explanation: 'Divisores de 18: 1, 2, 3, 6, 9, 18. Divisores de 24: 1, 2, 3, 4, 6, 8, 12, 24. Comunes: 1, 2, 3, 6. El mayor es 6.',
  },
  {
    id: 'q4',
    type: 'simplify-fraction',
    question: 'Para simplificar 10/15, dividimos numerador y denominador por:',
    numbers: [10, 15],
    options: ['2', '3', '5', '10'],
    correctAnswer: 2,
    explanation: 'M.C.D.(10, 15) = 5. Dividiendo: 10÷5 = 2, 15÷5 = 3. Entonces 10/15 = 2/3.',
  },
  {
    id: 'q5',
    type: 'find-gcd',
    question: '¿Cuál es el M.C.D. de 20 y 30?',
    numbers: [20, 30],
    options: ['5', '10', '15', '20'],
    correctAnswer: 1,
    explanation: 'Divisores de 20: 1, 2, 4, 5, 10, 20. Divisores de 30: 1, 2, 3, 5, 6, 10, 15, 30. El mayor común es 10.',
  },
  {
    id: 'q6',
    type: 'context',
    question: 'María tiene 30 manzanas y 45 naranjas. ¿Cuántas bolsas idénticas puede hacer (máximo)?',
    numbers: [30, 45],
    options: ['5 bolsas', '10 bolsas', '15 bolsas', '30 bolsas'],
    correctAnswer: 2,
    explanation: 'M.C.D.(30, 45) = 15. Puede hacer 15 bolsas con 2 manzanas y 3 naranjas cada una.',
  },
  {
    id: 'q7',
    type: 'find-gcd',
    question: '¿Cuál es el M.C.D. de 14 y 21?',
    numbers: [14, 21],
    options: ['3', '7', '14', '21'],
    correctAnswer: 1,
    explanation: 'Divisores de 14: 1, 2, 7, 14. Divisores de 21: 1, 3, 7, 21. Comunes: 1, 7. El mayor es 7.',
  },
  {
    id: 'q8',
    type: 'find-gcd',
    question: 'Si M.C.D.(a, b) = 1, los números se llaman "coprimos". ¿Cuál par es coprimo?',
    options: ['(6, 9)', '(8, 15)', '(12, 18)', '(10, 25)'],
    correctAnswer: 1,
    explanation: 'M.C.D.(8, 15) = 1 porque no comparten divisores excepto 1. 8 = 2³ y 15 = 3×5, no tienen factores comunes.',
  },
];

const REQUIRED_CORRECT = 6;

// Question type label mapping
function getTypeLabel(type: PracticeQuestion['type']): string {
  const labels: Record<PracticeQuestion['type'], string> = {
    'find-gcd': 'Calcular M.C.D.',
    'identify-factors': 'Identificar divisores',
    'simplify-fraction': 'Simplificar fracción',
    'context': 'Problema contextual',
  };
  return labels[type];
}

// Question type color mapping
function getTypeColors(type: PracticeQuestion['type']): string {
  const colors: Record<PracticeQuestion['type'], string> = {
    'find-gcd': 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
    'identify-factors': 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
    'simplify-fraction': 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
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
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
              <p className="text-purple-800 dark:text-purple-200 text-sm text-center">
                <strong>Recuerda:</strong> Lista los divisores de cada número, encuentra los comunes
                y elige el mayor.
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
          successSubtext="Dominas el M.C.D."
          failureSubtext="Sigue practicando el M.C.D."
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
