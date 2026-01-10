'use client';

import { Lightbulb, Check, X } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice, useHintToggle } from '@/hooks/lessons';
import { colors } from '@/lib/lessons/styles';
import {
  ProgressDots,
  FeedbackPanel,
  OptionButton,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface PracticeQuestion {
  id: string;
  question: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué líneas se cruzan para formar el circuncentro?',
    hint: 'Piensa en líneas perpendiculares que pasan por el punto medio de cada lado.',
    options: ['Alturas', 'Medianas', 'Simetrales', 'Bisectrices'],
    correctAnswer: 2,
    explanation: 'Las simetrales (perpendiculares que pasan por el punto medio de cada lado) se cruzan en el circuncentro.',
  },
  {
    id: 'q2',
    question: '¿Qué punto notable es el centro del círculo inscrito?',
    hint: 'El círculo inscrito es tangente a los 3 lados, necesita estar a igual distancia de ellos.',
    options: ['Circuncentro', 'Incentro', 'Baricentro', 'Ortocentro'],
    correctAnswer: 1,
    explanation: 'El incentro es equidistante de los 3 lados, por eso es el centro del círculo inscrito.',
  },
  {
    id: 'q3',
    question: '¿Cuál es el único punto notable que SIEMPRE está dentro del triángulo?',
    hint: 'Es el centro de gravedad. Si el triángulo fuera de cartón, se equilibraría en este punto.',
    options: ['Circuncentro', 'Incentro', 'Baricentro', 'Ortocentro'],
    correctAnswer: 2,
    explanation: 'El baricentro (centro de gravedad) siempre está dentro del triángulo, sin importar su forma.',
  },
  {
    id: 'q4',
    question: '¿Qué líneas forman el baricentro?',
    hint: 'Son líneas que van desde cada vértice hasta el punto medio del lado opuesto.',
    options: ['Alturas', 'Medianas', 'Simetrales', 'Bisectrices'],
    correctAnswer: 1,
    explanation: 'Las medianas (líneas desde cada vértice al punto medio del lado opuesto) se cruzan en el baricentro.',
  },
  {
    id: 'q5',
    question: '¿En qué tipo de triángulo el ortocentro está FUERA del triángulo?',
    hint: 'Piensa en triángulos que tienen un ángulo mayor que 90°.',
    options: ['Acutángulo', 'Rectángulo', 'Obtusángulo', 'Equilátero'],
    correctAnswer: 2,
    explanation: 'En triángulos obtusángulos (con un ángulo mayor que 90°), el ortocentro está fuera del triángulo.',
  },
  {
    id: 'q6',
    question: '¿Qué punto notable es el centro del círculo circunscrito?',
    hint: 'El círculo circunscrito pasa por los 3 vértices. El centro debe estar a igual distancia de ellos.',
    options: ['Circuncentro', 'Incentro', 'Baricentro', 'Ortocentro'],
    correctAnswer: 0,
    explanation: 'El circuncentro es equidistante de los 3 vértices, por eso es el centro del círculo circunscrito.',
  },
  {
    id: 'q7',
    question: 'Las bisectrices dividen cada ángulo en dos partes iguales. ¿Qué punto forman?',
    hint: 'Este punto está a igual distancia de los 3 lados del triángulo.',
    options: ['Circuncentro', 'Incentro', 'Baricentro', 'Ortocentro'],
    correctAnswer: 1,
    explanation: 'Las bisectrices (que dividen cada ángulo en dos partes iguales) se cruzan en el incentro.',
  },
  {
    id: 'q8',
    question: 'Las alturas son perpendiculares desde cada vértice al lado opuesto. ¿Qué punto forman?',
    hint: 'Este punto puede estar dentro o fuera del triángulo.',
    options: ['Circuncentro', 'Incentro', 'Baricentro', 'Ortocentro'],
    correctAnswer: 3,
    explanation: 'Las alturas (perpendiculares desde cada vértice al lado opuesto) se cruzan en el ortocentro.',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 6,
  });

  const hint = useHintToggle();

  const handleNext = () => {
    hint.hideHint();
    mc.next();
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Responde las preguntas sobre puntos notables
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Pregunta {mc.currentIndex + 1} de {QUESTIONS.length}
            </div>
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
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-gray-800 dark:text-gray-100 text-center mb-6 font-medium text-lg">
              {mc.currentItem.question}
            </p>

            {!mc.showFeedback && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={hint.toggleHint}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all ${colors.hint.container}`}
                >
                  <Lightbulb size={16} className={colors.hint.icon} />
                  <span className={colors.hint.text}>
                    {hint.showHint ? 'Ocultar pista' : 'Ver pista'}
                  </span>
                </button>
              </div>
            )}

            {hint.showHint && !mc.showFeedback && (
              <div className={`rounded-lg p-3 mb-4 text-sm animate-fadeIn ${colors.hint.container}`}>
                <p className={colors.hint.text}>{mc.currentItem.hint}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {mc.currentItem.options.map((option, index) => (
                <OptionButton
                  key={index}
                  label={option}
                  index={index}
                  isSelected={mc.selectedAnswer === index}
                  isCorrect={index === mc.currentItem.correctAnswer}
                  showFeedback={mc.showFeedback}
                  onClick={() => mc.select(index)}
                  variant="grid"
                />
              ))}
            </div>

            {mc.showFeedback && (
              <FeedbackPanel
                isCorrect={mc.isCorrect}
                explanation={mc.currentItem.explanation}
                className="mt-6"
              />
            )}
          </div>

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? handleNext : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={6}
          successMessage="¡Muy bien!"
          successSubtext="Dominas los puntos notables"
          failureSubtext={`Necesitas 6 correctas. ¡Inténtalo de nuevo!`}
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(_, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Pregunta {i + 1}
              </span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
          continueLabel="Ir al checkpoint"
        />
      )}
    </div>
  );
}
