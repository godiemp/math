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
        <path d="M 20 20 L 140 20 L 140 70 L 80 70 L 80 130 L 20 130 Z" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="80" y="70" width="60" height="60" fill="#fecaca" fillOpacity="0.4" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,4" />
        <text x="110" y="105" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#dc2626">corte</text>
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
        <text x="90" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">12 m</text>
        <text x="165" y="42" textAnchor="start" fontSize="10" fontWeight="bold" fill="#1f2937">3 m</text>
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
        <path d="M 20 20 L 150 20 L 150 110 L 110 110 L 150 70 L 150 20 M 20 20 L 20 110 L 110 110 L 110 70 L 150 70 L 150 20" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
        <path d="M 20 20 L 150 20 L 150 110 L 20 110 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
        <polygon points="110,110 150,110 150,70" fill="#fecaca" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,4" />
        <text x="85" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">9 m</text>
        <text x="155" y="70" textAnchor="start" fontSize="10" fontWeight="bold" fill="#1f2937">7 m</text>
        <text x="130" y="125" textAnchor="middle" fontSize="9" fill="#dc2626">3 m</text>
        <text x="155" y="95" textAnchor="start" fontSize="9" fill="#dc2626">4 m</text>
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
        <path d="M 130 35 A 35 35 0 0 1 130 105" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
        <text x="75" y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">10 m</text>
        <text x="10" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937" transform="rotate(-90, 10, 75)">6 m</text>
        <line x1="130" y1="70" x2="162" y2="70" stroke="#166534" strokeWidth="2" />
        <circle cx="162" cy="70" r="2" fill="#166534" />
        <text x="146" y="63" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#166534">r = 3 m</text>
      </svg>
    ),
    hint: 'Rectángulo + semicírculo. Semicírculo = πr²/2 ≈ 3.14 × 9 / 2',
    options: ['60 m²', '74.13 m²', '88.26 m²', '102 m²'],
    correctAnswer: 1,
    explanation: 'Rectángulo: 10×6 = 60 m². Semicírculo: π×3²/2 ≈ 14.13 m². Total: 60 + 14.13 ≈ 74.13 m²',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 4,
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
          Calcula el área de cada figura
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {mc.currentIndex + 1} de {QUESTIONS.length}
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
            <p className="text-gray-700 dark:text-gray-300 text-center mb-4 text-sm">
              {mc.currentItem.description}
            </p>

            <div className="flex justify-center mb-4">
              <div className="w-56 h-40 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                {mc.currentItem.figure}
              </div>
            </div>

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
                  ? 'Siguiente problema'
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
          passThreshold={4}
          successMessage="¡Muy bien!"
          successSubtext="Dominas el cálculo de áreas compuestas"
          failureSubtext={`Necesitas 4 correctas. ¡Vuelve a intentarlo!`}
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                {q.description.substring(0, 30)}...
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
