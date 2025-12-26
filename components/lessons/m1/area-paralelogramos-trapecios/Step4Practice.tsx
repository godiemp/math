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
  shape: 'parallelogram' | 'trapezoid';
  dimensions: {
    base?: number;
    height: number;
    baseMayor?: number;
    baseMenor?: number;
  };
  unit: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    scenario: 'Una ventana con forma de paralelogramo',
    question: '¿Cuál es el área del vidrio?',
    shape: 'parallelogram',
    dimensions: { base: 5, height: 3 },
    unit: 'm',
    options: ['8 m²', '15 m²', '7.5 m²', '16 m²'],
    correctAnswer: 1,
    explanation: 'Área del paralelogramo = base × altura = 5 × 3 = 15 m²',
  },
  {
    id: 'q2',
    scenario: 'Un terreno en forma de trapecio',
    question: '¿Cuál es el área del terreno?',
    shape: 'trapezoid',
    dimensions: { baseMayor: 10, baseMenor: 6, height: 4 },
    unit: 'm',
    options: ['24 m²', '32 m²', '40 m²', '16 m²'],
    correctAnswer: 1,
    explanation: 'Área del trapecio = ½ × (B + b) × h = ½ × (10 + 6) × 4 = ½ × 16 × 4 = 32 m²',
  },
  {
    id: 'q3',
    scenario: 'Un mosaico con forma de paralelogramo',
    question: '¿Cuál es el área del mosaico?',
    shape: 'parallelogram',
    dimensions: { base: 8, height: 6 },
    unit: 'cm',
    options: ['48 cm²', '14 cm²', '24 cm²', '56 cm²'],
    correctAnswer: 0,
    explanation: 'Área del paralelogramo = base × altura = 8 × 6 = 48 cm²',
  },
  {
    id: 'q4',
    scenario: 'Una mesa con forma de trapecio',
    question: '¿Cuál es el área de la superficie?',
    shape: 'trapezoid',
    dimensions: { baseMayor: 12, baseMenor: 8, height: 5 },
    unit: 'cm',
    options: ['100 cm²', '40 cm²', '50 cm²', '60 cm²'],
    correctAnswer: 2,
    explanation: 'Área del trapecio = ½ × (B + b) × h = ½ × (12 + 8) × 5 = ½ × 20 × 5 = 50 cm²',
  },
];

// Shape visualization component
function ShapeVisualization({ question }: { question: PracticeQuestion }) {
  const { shape, dimensions, unit } = question;

  if (shape === 'parallelogram') {
    return (
      <svg viewBox="0 0 160 120" className="w-40 h-32">
        <polygon points="40,100 60,20 140,20 120,100" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
        <line x1="60" y1="20" x2="60" y2="100" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
        <text x="90" y="115" textAnchor="middle" fontSize="12" fill="#1f2937">{dimensions.base} {unit}</text>
        <text x="48" y="65" textAnchor="end" fontSize="12" fill="#1f2937">{dimensions.height} {unit}</text>
      </svg>
    );
  }

  if (shape === 'trapezoid') {
    return (
      <svg viewBox="0 0 160 120" className="w-40 h-32">
        <polygon points="30,100 50,20 110,20 130,100" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
        <line x1="80" y1="20" x2="80" y2="100" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
        <text x="80" y="14" textAnchor="middle" fontSize="10" fill="#1f2937">{dimensions.baseMenor} {unit}</text>
        <text x="80" y="115" textAnchor="middle" fontSize="10" fill="#1f2937">{dimensions.baseMayor} {unit}</text>
        <text x="90" y="65" textAnchor="start" fontSize="12" fill="#1f2937">{dimensions.height} {unit}</text>
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
