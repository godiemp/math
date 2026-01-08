'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  scenario: string;
  question: string;
  polygonSides: number;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    scenario: 'Un hexágono regular',
    question: '¿Cuál es la medida de cada ángulo exterior?',
    polygonSides: 6,
    hint: 'Recuerda: Ángulo exterior = 360° ÷ n',
    options: ['45°', '60°', '90°', '120°'],
    correctAnswer: 1,
    explanation: 'Ángulo exterior = 360° ÷ 6 = 60°',
  },
  {
    id: 'q2',
    scenario: 'Un polígono regular tiene ángulos exteriores de 45°',
    question: '¿Cuántos lados tiene?',
    polygonSides: 8,
    hint: 'n = 360° ÷ (ángulo exterior)',
    options: ['6 lados', '8 lados', '10 lados', '12 lados'],
    correctAnswer: 1,
    explanation: 'n = 360° ÷ 45° = 8 lados (octágono)',
  },
  {
    id: 'q3',
    scenario: 'Un pentágono regular tiene ángulos interiores de 108°',
    question: '¿Cuál es el ángulo exterior?',
    polygonSides: 5,
    hint: 'Interior + Exterior = 180°',
    options: ['36°', '54°', '72°', '108°'],
    correctAnswer: 2,
    explanation: 'Exterior = 180° − 108° = 72° (o 360° ÷ 5 = 72°)',
  },
  {
    id: 'q4',
    scenario: 'Un decágono (10 lados) regular',
    question: '¿Cuál es la suma de TODOS sus ángulos exteriores?',
    polygonSides: 10,
    hint: 'La suma de ángulos exteriores es siempre...',
    options: ['180°', '360°', '1440°', '3600°'],
    correctAnswer: 1,
    explanation: 'La suma de ángulos exteriores es SIEMPRE 360°, sin importar el número de lados.',
  },
];

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const question = QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

  if (!isActive) return null;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    }
  };

  // Generate polygon points for visualization
  const generatePolygonPoints = (sides: number, radius: number, cx: number, cy: number): string => {
    const points: string[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Práctica Guiada</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Pregunta {currentQuestion + 1} de {QUESTIONS.length}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {QUESTIONS.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              idx < currentQuestion
                ? 'bg-green-500'
                : idx === currentQuestion
                  ? 'bg-blue-500 ring-2 ring-blue-300'
                  : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Question card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
        {/* Scenario */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 mb-4">
          <p className="text-gray-800 dark:text-gray-200 font-medium text-center">
            {question.scenario}
          </p>
        </div>

        {/* Polygon visualization */}
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 120 120" className="w-28 h-28">
            <polygon
              points={generatePolygonPoints(question.polygonSides, 45, 60, 60)}
              fill="rgba(59, 130, 246, 0.15)"
              stroke="#3b82f6"
              strokeWidth="2"
              className="dark:stroke-blue-400"
            />
            {/* Highlight one exterior angle for visual */}
            {question.id !== 'q4' && (
              <g>
                <line
                  x1="60"
                  y1="15"
                  x2="60"
                  y2="-5"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeDasharray="3,2"
                />
                <path
                  d="M 60 25 A 10 10 0 0 1 68 18"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
              </g>
            )}
            {/* For q4, show multiple arcs to indicate "all" */}
            {question.id === 'q4' && (
              <text
                x="60"
                y="65"
                textAnchor="middle"
                fontSize="10"
                fill="#ef4444"
                fontWeight="bold"
              >
                Σ = ?
              </text>
            )}
          </svg>
        </div>

        {/* Question */}
        <p className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
          {question.question}
        </p>

        {/* Hint toggle */}
        {!showResult && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 mx-auto text-sm text-blue-600 dark:text-blue-400 hover:underline mb-3"
          >
            <HelpCircle size={16} />
            {showHint ? 'Ocultar pista' : 'Ver pista'}
          </button>
        )}

        {showHint && !showResult && (
          <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-3 mb-4 text-center animate-fadeIn">
            <p className="text-blue-800 dark:text-blue-200 text-sm">{question.hint}</p>
          </div>
        )}
      </div>

      {/* Answer options */}
      {!showResult && (
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAnswer(idx)}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2 text-center',
                selectedAnswer === idx
                  ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Result feedback */}
      {showResult && (
        <div
          className={cn(
            'p-5 rounded-xl border-2 animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
          )}
        >
          <div className="flex items-start gap-4">
            {isCorrect ? (
              <Check className="w-7 h-7 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-7 h-7 text-amber-600 flex-shrink-0" />
            )}
            <div>
              <h3
                className={cn(
                  'font-bold text-lg mb-1',
                  isCorrect
                    ? 'text-green-800 dark:text-green-300'
                    : 'text-amber-800 dark:text-amber-300'
                )}
              >
                {isCorrect ? '¡Correcto!' : '¡Casi!'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-center">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>{isLastQuestion ? 'Ir al Checkpoint' : 'Siguiente'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>

      {/* Score indicator */}
      {showResult && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Correctas: {correctCount + (isCorrect ? 1 : 0)} de {currentQuestion + 1}
        </div>
      )}
    </div>
  );
}
