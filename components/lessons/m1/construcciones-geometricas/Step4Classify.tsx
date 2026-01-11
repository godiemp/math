'use client';

import { Check } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  OptionButton,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface Problem {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    scenario:
      'Un carpintero necesita encontrar el punto exacto donde se cruzan las diagonales de una tabla rectangular.',
    question: '¿Qué construcción le ayudaría a encontrar el centro de cada diagonal?',
    options: ['Mediatriz', 'Bisectriz', 'Perpendicular desde punto'],
    correctAnswer: 0,
    explanation:
      'La mediatriz encuentra el punto medio de un segmento. Al trazar la mediatriz de cada diagonal, encontramos su centro.',
  },
  {
    id: 'p2',
    scenario:
      'Un arquitecto diseña una esquina de 60° en un edificio y necesita dividirla exactamente por la mitad para colocar una columna.',
    question: '¿Qué construcción necesita usar?',
    options: ['Mediatriz', 'Bisectriz', 'Perpendicular desde punto'],
    correctAnswer: 1,
    explanation:
      'La bisectriz divide un ángulo en dos partes iguales. Un ángulo de 60° se divide en dos de 30°.',
  },
  {
    id: 'p3',
    scenario:
      'Un topógrafo necesita medir la distancia más corta desde un poste hasta una carretera recta.',
    question: '¿Qué construcción le permite encontrar ese punto?',
    options: ['Mediatriz', 'Bisectriz', 'Perpendicular desde punto'],
    correctAnswer: 2,
    explanation:
      'La perpendicular desde un punto a una recta es la distancia más corta entre ellos. El poste es el punto, la carretera es la recta.',
  },
  {
    id: 'p4',
    scenario:
      'Un jardinero tiene un sendero recto y quiere plantar un árbol a igual distancia de los dos extremos del sendero.',
    question: '¿Qué construcción le indica dónde plantar?',
    options: ['Mediatriz', 'Bisectriz', 'Perpendicular desde punto'],
    correctAnswer: 0,
    explanation:
      'La mediatriz de un segmento contiene todos los puntos equidistantes de sus extremos. Cualquier punto en la mediatriz del sendero está a igual distancia de ambos extremos.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: PROBLEMS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 3,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Qué Construcción?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica qué construcción se necesita en cada situación.
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          {/* Progress */}
          <ProgressDots
            items={PROBLEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === PROBLEMS[i].correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Problem Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
            {/* Scenario */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">{mc.currentItem.scenario}</p>
            </div>

            {/* Question */}
            <p className="text-lg font-medium text-gray-900 dark:text-white text-center">
              {mc.currentItem.question}
            </p>

            {/* Options */}
            <div className="space-y-3">
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

            {/* Feedback */}
            {mc.showFeedback && (
              <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
            )}

            {/* Action Button */}
            <div className="flex justify-center">
              <ActionButton
                onClick={mc.showFeedback ? mc.next : mc.check}
                disabled={!mc.showFeedback && mc.selectedAnswer === null}
              >
                {mc.showFeedback
                  ? mc.currentIndex < PROBLEMS.length - 1
                    ? 'Siguiente'
                    : 'Ver resultados'
                  : 'Verificar'}
              </ActionButton>
            </div>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={PROBLEMS.length}
          passed={mc.passed}
          passThreshold={3}
          successMessage="¡Perfecto!"
          successSubtext="Identificas muy bien las construcciones geométricas"
          failureSubtext="Sigue practicando para mejorar"
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctAnswer}
          renderItem={(problem, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <span className="w-5 h-5 text-red-600 flex-shrink-0">✗</span>
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                {problem.question.slice(0, 40)}...
              </span>
              <span className="text-sm text-purple-600 dark:text-purple-400 ml-auto">
                {problem.options[problem.correctAnswer]}
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
