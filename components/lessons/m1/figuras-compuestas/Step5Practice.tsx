'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Lightbulb, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  figure: React.ReactNode;
  description: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    description: 'Figura en L: dimensiones externas 10m × 8m, corte de 5m × 4m',
    figure: (
      <svg viewBox="0 0 180 150" className="w-full h-full">
        {/* L-shape */}
        <path
          d="M 20 20 L 140 20 L 140 70 L 80 70 L 80 130 L 20 130 Z"
          fill="#bfdbfe"
          stroke="#1d4ed8"
          strokeWidth="2"
        />
        {/* Cut area shown with dashed lines */}
        <rect
          x="80"
          y="70"
          width="60"
          height="60"
          fill="#fecaca"
          fillOpacity="0.4"
          stroke="#dc2626"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
        <text x="110" y="105" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#dc2626">corte</text>
        {/* Dimensions */}
        <text x="80" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">10 m</text>
        <text x="155" y="48" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">4 m</text>
        <text x="110" y="140" textAnchor="middle" fontSize="9" fill="#dc2626">5 m</text>
        <text x="148" y="105" textAnchor="start" fontSize="9" fill="#dc2626">4 m</text>
        <text x="50" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">5 m</text>
        <text x="10" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937" transform="rotate(-90, 10, 80)">8 m</text>
      </svg>
    ),
    hint: 'Método suma: (5×8) + (5×4) = 40 + 20. O método resta: (10×8) - (5×4)',
    options: ['52 m²', '60 m²', '68 m²', '80 m²'],
    correctAnswer: 1,
    explanation: 'Suma: rectángulo izquierdo (5×8=40) + rectángulo superior derecho (5×4=20) = 60 m². O resta: (10×8) - (5×4) = 80 - 20 = 60 m²',
  },
  {
    id: 'q2',
    description: 'Figura en T: barra horizontal 12m × 3m, barra vertical 4m × 6m',
    figure: (
      <svg viewBox="0 0 180 150" className="w-full h-full">
        <rect x="20" y="20" width="140" height="35" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
        <rect x="70" y="55" width="45" height="75" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2" />
        {/* Dimensions */}
        <text x="90" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">12 m</text>
        <text x="170" y="42" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">3 m</text>
        <text x="92" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">4 m</text>
        <text x="55" y="95" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937" transform="rotate(-90, 55, 95)">6 m</text>
      </svg>
    ),
    hint: 'Barra horizontal: 12×3 = 36 m². Barra vertical: 4×6 = 24 m²',
    options: ['48 m²', '54 m²', '60 m²', '72 m²'],
    correctAnswer: 2,
    explanation: 'Suma de dos rectángulos: (12×3) + (4×6) = 36 + 24 = 60 m²',
  },
  {
    id: 'q3',
    description: 'Rectángulo 9m × 7m con esquina triangular cortada (base 3m, altura 4m)',
    figure: (
      <svg viewBox="0 0 180 140" className="w-full h-full">
        <path
          d="M 20 20 L 150 20 L 150 110 L 110 110 L 150 70 L 150 20 M 20 20 L 20 110 L 110 110 L 110 70 L 150 70 L 150 20"
          fill="#fed7aa"
          stroke="#ea580c"
          strokeWidth="2"
        />
        <path
          d="M 20 20 L 150 20 L 150 110 L 20 110 Z"
          fill="#fed7aa"
          stroke="#ea580c"
          strokeWidth="2"
        />
        <polygon
          points="110,110 150,110 150,70"
          fill="#fecaca"
          stroke="#dc2626"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
        {/* Dimensions */}
        <text x="85" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">9 m</text>
        <text x="165" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">7 m</text>
        <text x="130" y="125" textAnchor="middle" fontSize="9" fill="#dc2626">3 m</text>
        <text x="158" y="95" textAnchor="middle" fontSize="9" fill="#dc2626">4 m</text>
      </svg>
    ),
    hint: 'Rectángulo completo menos triángulo: (9×7) - (3×4)/2',
    options: ['57 m²', '59 m²', '63 m²', '69 m²'],
    correctAnswer: 0,
    explanation: 'Rectángulo completo: 9×7 = 63 m². Triángulo: (3×4)/2 = 6 m². Total: 63 - 6 = 57 m²',
  },
  {
    id: 'q4',
    description: 'Marco: rectángulo externo 8m × 6m, hueco interno 4m × 2m',
    figure: (
      <svg viewBox="0 0 180 140" className="w-full h-full">
        <rect x="30" y="20" width="120" height="100" fill="#a5f3fc" stroke="#0891b2" strokeWidth="2" />
        <rect x="60" y="45" width="60" height="50" fill="white" stroke="#0891b2" strokeWidth="2" strokeDasharray="4,4" />
        {/* Dimensions */}
        <text x="90" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">8 m</text>
        <text x="165" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">6 m</text>
        <text x="90" y="38" textAnchor="middle" fontSize="9" fill="#6b7280">4 m</text>
        <text x="130" y="75" textAnchor="middle" fontSize="9" fill="#6b7280">2 m</text>
      </svg>
    ),
    hint: 'Área del marco = área externa - área del hueco',
    options: ['32 m²', '40 m²', '48 m²', '56 m²'],
    correctAnswer: 1,
    explanation: 'Área externa: 8×6 = 48 m². Hueco: 4×2 = 8 m². Marco: 48 - 8 = 40 m²',
  },
  {
    id: 'q5',
    description: 'Patio con semicírculo: rectángulo 10m × 6m más semicírculo de radio 3m',
    figure: (
      <svg viewBox="0 0 180 140" className="w-full h-full">
        <rect x="20" y="35" width="110" height="70" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
        <path
          d="M 130 35 A 35 35 0 0 1 130 105"
          fill="#86efac"
          stroke="#16a34a"
          strokeWidth="2"
        />
        {/* Dimensions */}
        <text x="75" y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">10 m</text>
        <text x="10" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937" transform="rotate(-90, 10, 75)">6 m</text>
        <text x="155" y="75" textAnchor="middle" fontSize="9" fill="#16a34a">r = 3 m</text>
        <line x1="130" y1="70" x2="165" y2="70" stroke="#16a34a" strokeWidth="1" strokeDasharray="3,3" />
      </svg>
    ),
    hint: 'Rectángulo + semicírculo. Semicírculo = πr²/2 ≈ 3.14 × 9 / 2',
    options: ['60 m²', '74.13 m²', '88.26 m²', '102 m²'],
    correctAnswer: 1,
    explanation: 'Rectángulo: 10×6 = 60 m². Semicírculo: π×3²/2 ≈ 14.13 m². Total: 60 + 14.13 ≈ 74.13 m²',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!isActive) return null;

  const currentQuestion = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const requiredCorrect = 4;
  const passed = correctCount >= requiredCorrect;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setCorrectCount(0);
    setCompleted(false);
  };

  // ============ COMPLETED STATE ============
  if (completed) {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Práctica Completada
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cálculo de áreas de figuras compuestas
          </p>
        </div>

        <div className={cn(
          'rounded-2xl p-8 text-center',
          passed
            ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
            : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
        )}>
          {passed ? (
            <Check className="w-16 h-16 mx-auto text-green-500 mb-4" />
          ) : (
            <RotateCcw className="w-16 h-16 mx-auto text-amber-500 mb-4" />
          )}

          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {correctCount} / {QUESTIONS.length}
          </div>

          <p className={cn(
            'text-lg',
            passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
          )}>
            {passed
              ? '¡Muy bien! Dominas el cálculo de áreas compuestas.'
              : `Necesitas ${requiredCorrect} correctas. ¡Vuelve a intentarlo!`}
          </p>
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
          <div className="space-y-2">
            {QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                className={cn(
                  'flex items-center gap-3 p-2 rounded-lg text-sm',
                  i < currentIndex
                    ? correctCount > i - (currentIndex - correctCount)
                      ? 'bg-green-50 dark:bg-green-900/30'
                      : 'bg-red-50 dark:bg-red-900/30'
                    : 'bg-gray-50 dark:bg-gray-700'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                  i < currentIndex ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-gray-500'
                )}>
                  {i + 1}
                </div>
                <span className="text-gray-700 dark:text-gray-300 truncate flex-1">
                  {q.description.substring(0, 40)}...
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {!passed && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <RotateCcw size={18} />
              <span>Intentar de nuevo</span>
            </button>
          )}
          {passed && (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Ir al checkpoint</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ QUESTION STATE ============
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

      {/* Progress */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Problema {currentIndex + 1} de {QUESTIONS.length}
        </div>
        <div className="flex gap-1">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                i < currentIndex
                  ? 'bg-green-500 text-white'
                  : i === currentIndex
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              )}
            >
              {i < currentIndex ? '✓' : i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4 text-sm">
          {currentQuestion.description}
        </p>

        {/* Figure */}
        <div className="flex justify-center mb-4">
          <div className="w-56 h-40 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
            {currentQuestion.figure}
          </div>
        </div>

        {/* Hint toggle */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all"
          >
            {showHint ? <EyeOff size={16} /> : <Eye size={16} />}
            <Lightbulb size={16} />
            <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
          </button>
        </div>

        {showHint && (
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 mb-4 text-sm text-amber-800 dark:text-amber-200 animate-fadeIn">
            {currentQuestion.hint}
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2',
                selectedAnswer === index
                  ? showFeedback
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                  : showFeedback && index === currentQuestion.correctAnswer
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={cn(
            'mt-6 p-4 rounded-xl animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
          )}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className={cn(
                  'font-bold mb-1',
                  isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <button
            onClick={handleCheck}
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
            <span>{currentIndex < QUESTIONS.length - 1 ? 'Siguiente problema' : 'Ver resultados'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
