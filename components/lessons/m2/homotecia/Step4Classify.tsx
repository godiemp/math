'use client';

import { ArrowRight, ZoomIn, ZoomOut, RotateCcw, Check, X } from 'lucide-react';
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

interface ClassifyItem {
  id: string;
  kValue: string;
  description: string;
  correctAnswer: number; // 0=Ampliación, 1=Reducción, 2=Inv+Red, 3=Inv+Amp
  explanation: string;
  svgContent: React.ReactNode;
}

const OPTIONS = ['Ampliación', 'Reducción', 'Inversión + reducción', 'Inversión + ampliación'];
const OPTION_ICONS = [
  <ZoomIn key="amp" size={18} />,
  <ZoomOut key="red" size={18} />,
  <RotateCcw key="inv-red" size={18} />,
  <RotateCcw key="inv-amp" size={18} />,
];

const ITEMS: ClassifyItem[] = [
  {
    id: 'q1',
    kValue: 'k = 2',
    description: 'La figura imagen es más grande y está del mismo lado del centro.',
    correctAnswer: 0,
    explanation: 'k = 2 > 1, por lo tanto es una ampliación. La imagen es el doble de grande.',
    svgContent: (
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Rays from center through each vertex pair */}
        <line x1="30" y1="60" x2="90" y2="40" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="30" y1="60" x2="130" y2="40" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="30" y1="60" x2="110" y2="10" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        {/* Center */}
        <circle cx="30" cy="60" r="5" fill="#dc2626" />
        <text x="20" y="50" fontSize="10" fill="#dc2626" fontWeight="bold">O</text>
        {/* Original triangle */}
        <polygon points="60,50 80,50 70,35" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1.5" />
        {/* Transformed triangle */}
        <polygon points="90,40 130,40 110,10" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
        {/* Vertex markers */}
        <circle cx="60" cy="50" r="3" fill="#1d4ed8" />
        <circle cx="80" cy="50" r="3" fill="#1d4ed8" />
        <circle cx="70" cy="35" r="3" fill="#1d4ed8" />
        <circle cx="90" cy="40" r="3" fill="#16a34a" />
        <circle cx="130" cy="40" r="3" fill="#16a34a" />
        <circle cx="110" cy="10" r="3" fill="#16a34a" />
        <text x="100" y="110" textAnchor="middle" fontSize="11" fill="#6b7280">k = 2</text>
      </svg>
    ),
  },
  {
    id: 'q2',
    kValue: 'k = 0.5',
    description: 'La figura imagen es más pequeña y está del mismo lado del centro.',
    correctAnswer: 1,
    explanation: 'k = 0.5, es decir 0 < k < 1, por lo tanto es una reducción. La imagen es la mitad.',
    svgContent: (
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Rays from center through each vertex pair */}
        <line x1="30" y1="60" x2="140" y2="40" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="30" y1="60" x2="80" y2="40" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="30" y1="60" x2="110" y2="10" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        {/* Center */}
        <circle cx="30" cy="60" r="5" fill="#dc2626" />
        <text x="20" y="50" fontSize="10" fill="#dc2626" fontWeight="bold">O</text>
        {/* Original triangle (larger) */}
        <polygon points="80,40 140,40 110,10" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1.5" />
        {/* Transformed triangle (smaller - reduction) */}
        <polygon points="55,50 85,50 70,35" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
        {/* Vertex markers - original */}
        <circle cx="80" cy="40" r="3" fill="#1d4ed8" />
        <circle cx="140" cy="40" r="3" fill="#1d4ed8" />
        <circle cx="110" cy="10" r="3" fill="#1d4ed8" />
        {/* Vertex markers - image */}
        <circle cx="55" cy="50" r="3" fill="#ea580c" />
        <circle cx="85" cy="50" r="3" fill="#ea580c" />
        <circle cx="70" cy="35" r="3" fill="#ea580c" />
        <text x="100" y="110" textAnchor="middle" fontSize="11" fill="#6b7280">k = 0.5</text>
      </svg>
    ),
  },
  {
    id: 'q3',
    kValue: 'k = -0.5',
    description: 'La figura imagen es más pequeña y está al lado opuesto del centro.',
    correctAnswer: 2,
    explanation: 'k = -0.5: Como -1 < k < 0, es INVERSIÓN + REDUCCIÓN. La imagen es la mitad del tamaño y está al lado opuesto.',
    svgContent: (
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Rays through center connecting vertex pairs */}
        <line x1="130" y1="50" x2="85" y2="65" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="170" y1="50" x2="65" y2="65" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="150" y1="25" x2="75" y2="82" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        {/* Center */}
        <circle cx="100" cy="60" r="5" fill="#dc2626" />
        <text x="100" y="50" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">O</text>
        {/* Original triangle (larger) */}
        <polygon points="130,50 170,50 150,25" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1.5" />
        {/* Inverted + reduced triangle (smaller, opposite side) */}
        <polygon points="85,65 65,65 75,82" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.5" />
        {/* Vertex markers - original */}
        <circle cx="130" cy="50" r="3" fill="#1d4ed8" />
        <circle cx="170" cy="50" r="3" fill="#1d4ed8" />
        <circle cx="150" cy="25" r="3" fill="#1d4ed8" />
        {/* Vertex markers - image */}
        <circle cx="85" cy="65" r="3" fill="#7c3aed" />
        <circle cx="65" cy="65" r="3" fill="#7c3aed" />
        <circle cx="75" cy="82" r="3" fill="#7c3aed" />
        <text x="100" y="110" textAnchor="middle" fontSize="11" fill="#6b7280">k = -0.5</text>
      </svg>
    ),
  },
  {
    id: 'q4',
    kValue: 'k = 3',
    description: 'Las distancias desde el centro se triplican.',
    correctAnswer: 0,
    explanation: 'k = 3 > 1, es una ampliación. Todas las distancias se multiplican por 3.',
    svgContent: (
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Rays from center through corners */}
        <line x1="20" y1="80" x2="80" y2="20" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="20" y1="80" x2="155" y2="20" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="20" y1="80" x2="155" y2="80" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="20" y1="80" x2="80" y2="80" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        {/* Center */}
        <circle cx="20" cy="80" r="5" fill="#dc2626" />
        <text x="10" y="70" fontSize="10" fill="#dc2626" fontWeight="bold">O</text>
        {/* Original rectangle */}
        <rect x="40" y="60" width="25" height="20" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1.5" />
        {/* Transformed rectangle */}
        <rect x="80" y="20" width="75" height="60" fill="#bbf7d0" fillOpacity="0.6" stroke="#16a34a" strokeWidth="1.5" />
        {/* Vertex markers - original */}
        <circle cx="40" cy="60" r="3" fill="#1d4ed8" />
        <circle cx="65" cy="60" r="3" fill="#1d4ed8" />
        <circle cx="40" cy="80" r="3" fill="#1d4ed8" />
        <circle cx="65" cy="80" r="3" fill="#1d4ed8" />
        {/* Vertex markers - image */}
        <circle cx="80" cy="20" r="3" fill="#16a34a" />
        <circle cx="155" cy="20" r="3" fill="#16a34a" />
        <circle cx="80" cy="80" r="3" fill="#16a34a" />
        <circle cx="155" cy="80" r="3" fill="#16a34a" />
        <text x="100" y="110" textAnchor="middle" fontSize="11" fill="#6b7280">k = 3</text>
      </svg>
    ),
  },
  {
    id: 'q5',
    kValue: 'k = -1.5',
    description: 'La imagen es más grande y está al lado opuesto del centro.',
    correctAnswer: 3,
    explanation: 'k = -1.5: Como k < -1, es INVERSIÓN + AMPLIACIÓN. La imagen es 1.5 veces más grande y está al lado opuesto del centro.',
    svgContent: (
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Rays through center connecting vertex pairs */}
        <line x1="130" y1="55" x2="55" y2="67" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="150" y1="55" x2="25" y2="67" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="140" y1="40" x2="40" y2="90" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        {/* Center */}
        <circle cx="100" cy="60" r="5" fill="#dc2626" />
        <text x="100" y="50" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">O</text>
        {/* Original triangle (smaller) */}
        <polygon points="130,55 150,55 140,40" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1.5" />
        {/* Inverted + larger triangle */}
        <polygon points="55,67 25,67 40,90" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.5" />
        {/* Vertex markers - original */}
        <circle cx="130" cy="55" r="3" fill="#1d4ed8" />
        <circle cx="150" cy="55" r="3" fill="#1d4ed8" />
        <circle cx="140" cy="40" r="3" fill="#1d4ed8" />
        {/* Vertex markers - image */}
        <circle cx="55" cy="67" r="3" fill="#7c3aed" />
        <circle cx="25" cy="67" r="3" fill="#7c3aed" />
        <circle cx="40" cy="90" r="3" fill="#7c3aed" />
        <text x="100" y="110" textAnchor="middle" fontSize="11" fill="#6b7280">k = -1.5</text>
      </svg>
    ),
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: ITEMS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 4,
  });

  if (!isActive) return null;

  // Show results
  if (mc.isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={ITEMS.length}
          passed={mc.passed}
          passThreshold={4}
          onContinue={onComplete}
          onRetry={mc.reset}
          successMessage="¡Excelente! Has dominado la clasificación de homotecias."
          failureSubtext="Sigue practicando para mejorar tu clasificación."
          items={ITEMS}
          getIsCorrect={(_, i) => mc.answers[i] === ITEMS[i].correctAnswer}
          renderItem={(item, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm flex-1">
                {item.kValue}
              </span>
              <span className="font-medium text-purple-600 dark:text-purple-400">
                {OPTIONS[item.correctAnswer]}
              </span>
            </>
          )}
        />
      </div>
    );
  }

  const currentItem = mc.currentItem;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Tipo de Homotecia
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa la figura y clasifica la transformación
        </p>
      </div>

      <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-xl p-6">
        {/* Progress */}
        <div className="mb-6">
          <ProgressDots
            items={ITEMS}
            currentIndex={mc.currentIndex}
            getStatus={(item, index) =>
              mc.answers[index] !== null
                ? mc.answers[index] === item.correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : index === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />
        </div>

        {/* Question card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
          {/* SVG visualization */}
          <div className="mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            {currentItem.svgContent}
          </div>

          {/* K value badge */}
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-mono font-bold rounded-full">
              {currentItem.kValue}
            </span>
          </div>

          {/* Description */}
          <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
            {currentItem.description}
          </p>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {OPTIONS.map((option, index) => (
              <button
                key={index}
                onClick={() => !mc.showFeedback && mc.select(index)}
                disabled={mc.showFeedback}
                className={cn(
                  'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all font-medium text-sm',
                  mc.showFeedback
                    ? index === currentItem.correctAnswer
                      ? 'border-green-500 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                      : mc.selectedAnswer === index
                        ? 'border-red-500 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                    : mc.selectedAnswer === index
                      ? 'border-cyan-500 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
                  !mc.showFeedback && 'cursor-pointer'
                )}
              >
                {OPTION_ICONS[index]}
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {mc.showFeedback && (
          <div className="mb-6">
            <FeedbackPanel
              isCorrect={mc.isCorrect}
              explanation={currentItem.explanation}
            />
          </div>
        )}

        {/* Action button */}
        {!mc.showFeedback ? (
          <button
            onClick={mc.check}
            disabled={mc.selectedAnswer === null}
            className={cn(
              'w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all',
              mc.selectedAnswer !== null
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={mc.next}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-all"
          >
            <span>{mc.currentIndex < ITEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
