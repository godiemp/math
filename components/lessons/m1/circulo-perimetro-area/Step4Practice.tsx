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
  type: 'circumference' | 'area';
  givenValue: 'radius' | 'diameter';
  value: number;
  unit: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    scenario: 'Una pizza familiar',
    question: '¿Cual es el area de la pizza?',
    type: 'area',
    givenValue: 'diameter',
    value: 30,
    unit: 'cm',
    options: ['94.2 cm²', '706.5 cm²', '2826 cm²', '188.4 cm²'],
    correctAnswer: 1,
    explanation: 'Radio = 30÷2 = 15 cm. Area = π × 15² = 3.14 × 225 = 706.5 cm²',
  },
  {
    id: 'q2',
    scenario: 'Una rueda de bicicleta',
    question: '¿Cuanto recorre la rueda en una vuelta completa?',
    type: 'circumference',
    givenValue: 'radius',
    value: 35,
    unit: 'cm',
    options: ['109.9 cm', '219.8 cm', '3846.5 cm²', '70 cm'],
    correctAnswer: 1,
    explanation: 'Circunferencia = 2πr = 2 × 3.14 × 35 = 219.8 cm',
  },
  {
    id: 'q3',
    scenario: 'Una piscina circular',
    question: '¿Que area debe cubrir la lona?',
    type: 'area',
    givenValue: 'radius',
    value: 4,
    unit: 'm',
    options: ['25.12 m²', '50.24 m²', '12.56 m²', '100.48 m²'],
    correctAnswer: 1,
    explanation: 'Area = πr² = 3.14 × 4² = 3.14 × 16 = 50.24 m²',
  },
  {
    id: 'q4',
    scenario: 'Un reloj de pared',
    question: '¿Cual es la circunferencia del reloj?',
    type: 'circumference',
    givenValue: 'diameter',
    value: 24,
    unit: 'cm',
    options: ['452.16 cm²', '75.36 cm', '37.68 cm', '150.72 cm'],
    correctAnswer: 1,
    explanation: 'Circunferencia = πd = 3.14 × 24 = 75.36 cm',
  },
];

// Shape visualization component
function ShapeVisualization({ question }: { question: PracticeQuestion }) {
  const { type, givenValue, value, unit } = question;
  const isArea = type === 'area';

  return (
    <svg viewBox="0 0 160 140" className="w-44 h-36">
      {/* Main circle */}
      <circle
        cx="80"
        cy="70"
        r="50"
        fill={isArea ? '#5eead4' : 'none'}
        stroke="#0d9488"
        strokeWidth="3"
      />

      {/* Center point */}
      <circle cx="80" cy="70" r="3" fill="#0d9488" />

      {givenValue === 'radius' ? (
        <>
          {/* Radius line */}
          <line x1="80" y1="70" x2="130" y2="70" stroke="#dc2626" strokeWidth="2" />
          <text x="105" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
            r = {value} {unit}
          </text>
        </>
      ) : (
        <>
          {/* Diameter line */}
          <line x1="30" y1="70" x2="130" y2="70" stroke="#7c3aed" strokeWidth="2" />
          <text x="80" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">
            d = {value} {unit}
          </text>
        </>
      )}

      {/* Label for what we're finding */}
      <text x="80" y="135" textAnchor="middle" fontSize="11" fill="#6b7280">
        {isArea ? 'Encontrar: Area' : 'Encontrar: Circunferencia'}
      </text>
    </svg>
  );
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
          Practica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Calcula usando las formulas del circulo
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
          successSubtext="Dominas las fórmulas del círculo"
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
