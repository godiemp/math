'use client';

import { BookOpen, Check, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface Problem {
  id: string;
  context: string;
  emoji: string;
  question: string;
  data: number[];
  dataLabel: string;
  measure: 'q1' | 'q2' | 'q3' | 'iqr' | 'outlier' | 'percentile';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'notas',
    context: 'Notas del curso',
    emoji: '📊',
    question: '¿Cual es Q₁ (primer cuartil)?',
    data: [40, 50, 55, 60, 65, 70, 75, 80, 90],
    dataLabel: 'Notas ordenadas (n=9, impar)',
    measure: 'q1',
    options: ['50', '52.5', '55', '60'],
    correctAnswer: 1,
    explanation: 'Con 9 datos (impar), Q₂=65 (5to valor). Mitad inferior SIN el 65: [40, 50, 55, 60]. Como son 4 datos (par), Q₁ = (50+55)/2 = 52.5',
  },
  {
    id: 'edades-par',
    context: 'Edades en una fiesta',
    emoji: '🎂',
    question: 'Con 8 datos (par), ¿cual es Q₂ (mediana)?',
    data: [12, 15, 18, 20, 25, 30, 35, 40],
    dataLabel: 'Edades ordenadas (n=8, par)',
    measure: 'q2',
    options: ['20', '22.5', '25', '27.5'],
    correctAnswer: 1,
    explanation: 'Con 8 datos (par), Q₂ es el promedio de los 2 valores centrales: (20+25)/2 = 22.5. No hay un valor "del medio" exacto.',
  },
  {
    id: 'salarios',
    context: 'Salarios de empleados',
    emoji: '💰',
    question: '¿Cual es Q₃ (tercer cuartil)?',
    data: [800, 900, 950, 1000, 1100, 1200, 1500],
    dataLabel: 'Salarios (miles) (n=7, impar)',
    measure: 'q3',
    options: ['1000', '1100', '1200', '1350'],
    correctAnswer: 2,
    explanation: 'Con 7 datos (impar), Q₂=1000 (4to valor). Mitad superior SIN el 1000: [1100, 1200, 1500]. Q₃ = 1200 (el del medio)',
  },
  {
    id: 'tiempos',
    context: 'Tiempos de carrera',
    emoji: '🏃',
    question: '¿Cual es el IQR (rango intercuartilico)?',
    data: [10, 12, 14, 15, 16, 18, 20, 22, 25],
    dataLabel: 'Minutos',
    measure: 'iqr',
    options: ['6', '8', '10', '15'],
    correctAnswer: 1,
    explanation: 'Q₁ = (12+14)/2 = 13, Q₃ = (20+22)/2 = 21. IQR = Q₃ - Q₁ = 21 - 13 = 8',
  },
  {
    id: 'ventas',
    context: 'Ventas mensuales',
    emoji: '📈',
    question: '¿El valor 500 es un outlier (valor atipico)?',
    data: [80, 90, 100, 110, 120, 130, 140, 500],
    dataLabel: 'Ventas (unidades)',
    measure: 'outlier',
    options: ['No, esta dentro del rango', 'Si, es un outlier', 'No se puede determinar', 'Depende del contexto'],
    correctAnswer: 1,
    explanation: 'Q₁=95, Q₃=135, IQR=40. Limite superior: 135 + 1.5(40) = 195. Como 500 > 195, es un OUTLIER.',
  },
];

const measureColors: Record<string, string> = {
  q1: 'blue',
  q2: 'green',
  q3: 'purple',
  iqr: 'orange',
  outlier: 'red',
  percentile: 'indigo',
};

const bgColors: Record<string, string> = {
  blue: 'rgb(239 246 255)',
  green: 'rgb(240 253 244)',
  purple: 'rgb(250 245 255)',
  orange: 'rgb(255 247 237)',
  red: 'rgb(254 242 242)',
  indigo: 'rgb(238 242 255)',
};

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: PROBLEMS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 4,
  });

  if (!isActive) return null;

  const color = measureColors[mc.currentItem.measure];

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span className="text-indigo-700 dark:text-indigo-300 font-medium">
            Problema {mc.currentIndex + 1} de {PROBLEMS.length}
          </span>
        </div>
      </div>

      {!mc.isComplete ? (
        <>
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

          {/* Problem card */}
          <div
            className="rounded-xl p-5 border border-gray-200 dark:border-gray-700"
            style={{ backgroundColor: bgColors[color] }}
          >
            {/* Context */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{mc.currentItem.emoji}</span>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{mc.currentItem.context}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{mc.currentItem.dataLabel}</p>
              </div>
            </div>

            {/* Data visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {mc.currentItem.data.map((val, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm',
                      mc.currentItem.measure === 'outlier' && val === 500
                        ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-2 border-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>

            {/* Question */}
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle size={20} className="text-gray-500" />
              <p className="font-semibold text-gray-800 dark:text-gray-200">{mc.currentItem.question}</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {mc.currentItem.options.map((option, index) => {
                const isSelected = mc.selectedAnswer === index;
                const isThisCorrect = index === mc.currentItem.correctAnswer;

                return (
                  <button
                    key={index}
                    onClick={() => mc.select(index)}
                    disabled={mc.showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all text-left',
                      !mc.showFeedback && 'hover:border-gray-400',
                      !mc.showFeedback && !isSelected && 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800',
                      mc.showFeedback && isThisCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                      mc.showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                      !mc.showFeedback && isSelected && 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30',
                      mc.showFeedback && !isSelected && !isThisCorrect && 'opacity-50 bg-white dark:bg-gray-800'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{option}</span>
                      {mc.showFeedback && isThisCorrect && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                      {mc.showFeedback && isSelected && !isThisCorrect && (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {mc.showFeedback && (
            <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < PROBLEMS.length - 1
                  ? 'Siguiente problema'
                  : 'Continuar al boxplot'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={PROBLEMS.length}
          passed={mc.passed}
          passThreshold={4}
          successMessage="¡Excelente!"
          successSubtext="Dominas los cuartiles y percentiles"
          failureSubtext="Sigue practicando para mejorar"
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctAnswer}
          renderItem={(problem, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300">{problem.context}</span>
              <span className="text-sm text-purple-600 ml-auto">
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
