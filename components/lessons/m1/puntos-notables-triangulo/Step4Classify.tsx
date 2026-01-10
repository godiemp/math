'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import { TriangleFigure } from '@/components/figures/TriangleFigure';
import type { SpecialLineConfig, NotablePointConfig, TriangleCircleConfig, LabeledPoint } from '@/lib/types/triangle';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

type NotablePoint = 'circuncentro' | 'incentro' | 'baricentro' | 'ortocentro';

interface ClassifyQuestion {
  id: string;
  questionType: 'identify-lines' | 'identify-point' | 'identify-property';
  question: string;
  hint?: string;
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  specialLines?: SpecialLineConfig[];
  notablePoints?: NotablePointConfig[];
  circles?: TriangleCircleConfig[];
  correctAnswer: NotablePoint;
  explanation: string;
}

const OPTIONS: { id: NotablePoint; label: string; color: string }[] = [
  { id: 'circuncentro', label: 'Circuncentro', color: 'purple' },
  { id: 'incentro', label: 'Incentro', color: 'amber' },
  { id: 'baricentro', label: 'Baricentro', color: 'emerald' },
  { id: 'ortocentro', label: 'Ortocentro', color: 'red' },
];

// Different triangle shapes for variety
const TRIANGLE_ACUTE: [LabeledPoint, LabeledPoint, LabeledPoint] = [
  { x: 200, y: 50, label: 'A' },
  { x: 80, y: 250, label: 'B' },
  { x: 320, y: 250, label: 'C' },
];

const TRIANGLE_OBTUSE: [LabeledPoint, LabeledPoint, LabeledPoint] = [
  { x: 100, y: 60, label: 'A' },
  { x: 50, y: 250, label: 'B' },
  { x: 350, y: 220, label: 'C' },
];

const TRIANGLE_RIGHT: [LabeledPoint, LabeledPoint, LabeledPoint] = [
  { x: 100, y: 60, label: 'A' },
  { x: 100, y: 260, label: 'B' },
  { x: 300, y: 260, label: 'C' },
];

// Helper to create all 3 lines of a type with markers
function allLines(type: SpecialLineConfig['type'], showRightAngle = false, showEqual = false): SpecialLineConfig[] {
  return [
    { type, fromVertex: 0, showRightAngleMarker: showRightAngle, showEqualMarks: showEqual },
    { type, fromVertex: 1, showRightAngleMarker: showRightAngle, showEqualMarks: showEqual },
    { type, fromVertex: 2, showRightAngleMarker: showRightAngle, showEqualMarks: showEqual },
  ];
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 'q1',
    questionType: 'identify-lines',
    question: 'Estas líneas pasan por el punto medio de cada lado y son perpendiculares a él. ¿Qué punto forman?',
    hint: 'Observa los ángulos rectos (⊾) y las marcas de división igual en cada lado',
    vertices: TRIANGLE_ACUTE,
    specialLines: allLines('simetral', true, true),
    notablePoints: [{ type: 'circuncentro', animate: true }],
    correctAnswer: 'circuncentro',
    explanation: 'Las simetrales son perpendiculares que pasan por el punto medio de cada lado. Su intersección es el circuncentro.',
  },
  {
    id: 'q2',
    questionType: 'identify-lines',
    question: 'Estas líneas van desde cada vértice al punto medio del lado opuesto. ¿Qué punto forman?',
    hint: 'Las marcas de división indican que llegan exactamente al punto medio',
    vertices: TRIANGLE_ACUTE,
    specialLines: allLines('transversal', false, true),
    notablePoints: [{ type: 'baricentro', animate: true }],
    correctAnswer: 'baricentro',
    explanation: 'Las transversales de gravedad van desde cada vértice al punto medio del lado opuesto. Su intersección es el baricentro.',
  },
  {
    id: 'q3',
    questionType: 'identify-lines',
    question: 'Estas líneas dividen cada ángulo del triángulo en dos partes iguales. ¿Qué punto forman?',
    vertices: TRIANGLE_ACUTE,
    specialLines: allLines('bisectriz'),
    notablePoints: [{ type: 'incentro', animate: true }],
    correctAnswer: 'incentro',
    explanation: 'Las bisectrices dividen cada ángulo en dos partes iguales. Su intersección es el incentro.',
  },
  {
    id: 'q4',
    questionType: 'identify-lines',
    question: 'Estas líneas son perpendiculares desde cada vértice al lado opuesto. ¿Qué punto forman?',
    hint: 'Observa los ángulos rectos donde las líneas tocan los lados',
    vertices: TRIANGLE_ACUTE,
    specialLines: allLines('altura', true),
    notablePoints: [{ type: 'ortocentro', animate: true }],
    correctAnswer: 'ortocentro',
    explanation: 'Las alturas son perpendiculares desde cada vértice al lado opuesto. Su intersección es el ortocentro.',
  },
  {
    id: 'q5',
    questionType: 'identify-property',
    question: 'Este punto es el centro del círculo que pasa por los 3 vértices. ¿Cuál es?',
    vertices: TRIANGLE_ACUTE,
    notablePoints: [{ type: 'circuncentro', animate: true }],
    circles: [{ type: 'circumscribed' }],
    correctAnswer: 'circuncentro',
    explanation: 'El circuncentro es equidistante de los 3 vértices, por eso es el centro del círculo circunscrito.',
  },
  {
    id: 'q6',
    questionType: 'identify-property',
    question: 'Este punto es el centro del círculo que toca los 3 lados por dentro. ¿Cuál es?',
    vertices: TRIANGLE_ACUTE,
    notablePoints: [{ type: 'incentro', animate: true }],
    circles: [{ type: 'inscribed' }],
    correctAnswer: 'incentro',
    explanation: 'El incentro es equidistante de los 3 lados, por eso es el centro del círculo inscrito.',
  },
  {
    id: 'q7',
    questionType: 'identify-point',
    question: 'En este triángulo obtusángulo, ¿qué punto está FUERA del triángulo?',
    hint: 'Un ángulo es mayor a 90°',
    vertices: TRIANGLE_OBTUSE,
    specialLines: allLines('altura', true),
    notablePoints: [{ type: 'ortocentro', animate: true }],
    correctAnswer: 'ortocentro',
    explanation: 'En triángulos obtusángulos, el ortocentro está fuera del triángulo porque las alturas se encuentran fuera.',
  },
  {
    id: 'q8',
    questionType: 'identify-point',
    question: '¿Cuál es el ÚNICO punto que siempre está dentro del triángulo, sin importar su forma?',
    hint: 'Piensa en el centro de gravedad',
    vertices: TRIANGLE_OBTUSE,
    notablePoints: [
      { type: 'baricentro', animate: true },
    ],
    specialLines: allLines('transversal', false, true),
    correctAnswer: 'baricentro',
    explanation: 'El baricentro (centro de gravedad) siempre está dentro del triángulo, sin importar si es acutángulo, obtusángulo o rectángulo.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 6,
  });

  if (!isActive) return null;

  const getOptionStyles = (optionId: NotablePoint) => {
    const option = OPTIONS.find(o => o.id === optionId)!;
    const isSelected = mc.selectedAnswer === optionId;
    const isCorrectAnswer = mc.currentItem.correctAnswer === optionId;

    if (isSelected) {
      if (mc.showFeedback) {
        return isCorrectAnswer
          ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
          : 'bg-red-100 dark:bg-red-900/50 border-red-500';
      }
      return option.color === 'purple'
        ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500'
        : option.color === 'amber'
          ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-500'
          : option.color === 'emerald'
            ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-500'
            : 'bg-red-100 dark:bg-red-900/50 border-red-500';
    }

    if (mc.showFeedback && isCorrectAnswer) {
      return 'bg-green-50 dark:bg-green-900/30 border-green-400';
    }

    return 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500';
  };

  const getDotStyles = (optionId: NotablePoint) => {
    const option = OPTIONS.find(o => o.id === optionId)!;
    const isSelected = mc.selectedAnswer === optionId;
    const isCorrectAnswer = mc.currentItem.correctAnswer === optionId;

    if (isSelected && mc.showFeedback) {
      return isCorrectAnswer ? 'bg-green-500' : 'bg-red-500';
    }
    if (mc.showFeedback && isCorrectAnswer) {
      return 'bg-green-500';
    }

    return option.color === 'purple'
      ? 'bg-purple-500'
      : option.color === 'amber'
        ? 'bg-amber-500'
        : option.color === 'emerald'
          ? 'bg-emerald-500'
          : 'bg-red-500';
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Punto
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa las líneas y sus características
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
            <p className="text-gray-800 dark:text-gray-100 text-center mb-2 font-semibold text-lg">
              {mc.currentItem.question}
            </p>

            {mc.currentItem.hint && (
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-4 italic">
                💡 {mc.currentItem.hint}
              </p>
            )}

            <div className="flex justify-center mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 border border-gray-200 dark:border-gray-600">
                <TriangleFigure
                  vertices={mc.currentItem.vertices}
                  specialLines={mc.currentItem.specialLines}
                  notablePoints={mc.currentItem.notablePoints}
                  circles={mc.currentItem.circles}
                  showGrid={false}
                  className="max-w-xs mx-auto"
                  padding={50}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => mc.select(option.id)}
                  disabled={mc.showFeedback}
                  className={cn(
                    'p-3 rounded-xl transition-all border-2 flex items-center gap-3',
                    getOptionStyles(option.id)
                  )}
                >
                  <div className={cn('w-4 h-4 rounded-full flex-shrink-0', getDotStyles(option.id))} />
                  <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                    {option.label}
                  </span>
                </button>
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
              onClick={mc.showFeedback ? mc.next : mc.check}
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
          successMessage="¡Excelente!"
          successSubtext="Reconoces bien los puntos notables"
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
              <span className="text-gray-700 dark:text-gray-300">Pregunta {i + 1}</span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
