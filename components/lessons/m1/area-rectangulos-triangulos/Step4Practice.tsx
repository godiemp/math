'use client';

import { Check, X } from 'lucide-react';
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
  scenario: string;
  question: string;
  shape: 'rectangle' | 'triangle' | 'square';
  dimensions: {
    base?: number;
    height: number;
    side?: number;
  };
  unit: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    scenario: 'Un jardín rectangular',
    question: '¿Cuál es el área del jardín?',
    shape: 'rectangle',
    dimensions: { base: 6, height: 4 },
    unit: 'm',
    options: ['10 m²', '20 m²', '24 m²', '12 m²'],
    correctAnswer: 2,
    explanation: 'Área del rectángulo = base × altura = 6 × 4 = 24 m²',
  },
  {
    id: 'q2',
    scenario: 'Una vela triangular',
    question: '¿Cuál es el área de la vela?',
    shape: 'triangle',
    dimensions: { base: 10, height: 8 },
    unit: 'cm',
    options: ['80 cm²', '40 cm²', '18 cm²', '20 cm²'],
    correctAnswer: 1,
    explanation: 'Área del triángulo = ½ × base × altura = ½ × 10 × 8 = 40 cm²',
  },
  {
    id: 'q3',
    scenario: 'Una baldosa cuadrada',
    question: '¿Cuál es el área de la baldosa?',
    shape: 'square',
    dimensions: { side: 8, height: 8 },
    unit: 'cm',
    options: ['32 cm²', '16 cm²', '64 cm²', '24 cm²'],
    correctAnswer: 2,
    explanation: 'Área del cuadrado = lado × lado = 8 × 8 = 64 cm²',
  },
  {
    id: 'q4',
    scenario: 'Un cartel triangular',
    question: '¿Cuál es el área del cartel?',
    shape: 'triangle',
    dimensions: { base: 12, height: 5 },
    unit: 'm',
    options: ['60 m²', '17 m²', '30 m²', '35 m²'],
    correctAnswer: 2,
    explanation: 'Área del triángulo = ½ × base × altura = ½ × 12 × 5 = 30 m²',
  },
];

// Shape visualization component
function ShapeVisualization({ question }: { question: PracticeQuestion }) {
  const { shape, dimensions, unit } = question;

  if (shape === 'rectangle') {
    return (
      <svg viewBox="0 0 160 120" className="w-40 h-32">
        <rect x="20" y="20" width="120" height="80" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
        <text x="80" y="115" textAnchor="middle" fontSize="12" fill="#1f2937">{dimensions.base} {unit}</text>
        <text x="150" y="65" textAnchor="start" fontSize="12" fill="#1f2937">{dimensions.height} {unit}</text>
      </svg>
    );
  }

  if (shape === 'triangle') {
    return (
      <svg viewBox="0 0 160 120" className="w-40 h-32">
        <polygon points="80,15 20,100 140,100" fill="#86efac" stroke="#166534" strokeWidth="2" />
        <line x1="80" y1="15" x2="80" y2="100" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
        <text x="80" y="115" textAnchor="middle" fontSize="12" fill="#1f2937">{dimensions.base} {unit}</text>
        <text x="90" y="60" textAnchor="start" fontSize="12" fill="#1f2937">{dimensions.height} {unit}</text>
      </svg>
    );
  }

  if (shape === 'square') {
    return (
      <svg viewBox="0 0 160 120" className="w-40 h-32">
        <rect x="40" y="20" width="80" height="80" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
        <text x="80" y="115" textAnchor="middle" fontSize="12" fill="#1f2937">{dimensions.side} {unit}</text>
      </svg>
    );
  }

  return null;
}

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 3,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Calcula el área de cada figura
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

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Scenario */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
                {mc.currentItem.scenario}
              </p>
              <div className="flex justify-center mt-3">
                <ShapeVisualization question={mc.currentItem} />
              </div>
            </div>

            {/* Question */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              {mc.currentItem.question}
            </h3>

            {/* Options */}
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
                />
              ))}
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
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Continuar'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={3}
          successMessage="¡Excelente!"
          successSubtext="Calculas muy bien las áreas"
          failureSubtext="Sigue practicando para mejorar"
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300">{q.scenario}</span>
              <span className="text-sm text-purple-600 ml-auto">
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
