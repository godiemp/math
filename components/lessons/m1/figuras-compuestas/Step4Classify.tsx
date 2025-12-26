'use client';

import { Plus, Minus, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface ClassifyQuestion {
  id: string;
  figure: React.ReactNode;
  description: string;
  shownStrategy: 'add' | 'subtract';
  explanation: string;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 'q1',
    description: '¿Qué estrategia se muestra?',
    figure: (
      <svg viewBox="0 0 100 90" className="w-full h-full">
        <rect x="10" y="10" width="50" height="25" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="10" y="35" width="30" height="45" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
        <text x="35" y="27" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">A</text>
        <text x="25" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5b21b6">B</text>
      </svg>
    ),
    shownStrategy: 'add',
    explanation: 'Se suman las áreas de los rectángulos A y B para obtener el área total.',
  },
  {
    id: 'q2',
    description: '¿Qué estrategia se muestra?',
    figure: (
      <svg viewBox="0 0 100 90" className="w-full h-full">
        <rect x="15" y="10" width="70" height="70" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
        <rect x="55" y="50" width="30" height="30" fill="#fecaca" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,4" />
        <text x="70" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">quitar</text>
      </svg>
    ),
    shownStrategy: 'subtract',
    explanation: 'Se resta el área de la esquina del rectángulo completo.',
  },
  {
    id: 'q3',
    description: '¿Qué estrategia se muestra?',
    figure: (
      <svg viewBox="0 0 100 90" className="w-full h-full">
        <rect x="15" y="10" width="70" height="25" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="35" y="35" width="30" height="50" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
        <text x="50" y="27" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">A</text>
        <text x="50" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5b21b6">B</text>
      </svg>
    ),
    shownStrategy: 'add',
    explanation: 'La T se divide en dos rectángulos (A y B) que se suman.',
  },
  {
    id: 'q4',
    description: '¿Qué estrategia se muestra?',
    figure: (
      <svg viewBox="0 0 100 90" className="w-full h-full">
        <rect x="15" y="10" width="70" height="70" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
        <rect x="28" y="23" width="44" height="44" fill="#fecaca" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,4" />
        <text x="50" y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">quitar</text>
      </svg>
    ),
    shownStrategy: 'subtract',
    explanation: 'El área del marco = rectángulo exterior − rectángulo interior (hueco).',
  },
  {
    id: 'q5',
    description: '¿Qué estrategia se muestra?',
    figure: (
      <svg viewBox="0 0 100 90" className="w-full h-full">
        <rect x="15" y="55" width="25" height="30" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="40" y="35" width="25" height="50" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
        <rect x="65" y="10" width="25" height="75" fill="#a5f3fc" stroke="#0891b2" strokeWidth="2" />
        <text x="27" y="73" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">A</text>
        <text x="52" y="63" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5b21b6">B</text>
        <text x="77" y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0e7490">C</text>
      </svg>
    ),
    shownStrategy: 'add',
    explanation: 'La escalera se divide en tres rectángulos (A, B, C) que se suman.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.shownStrategy,
    passThreshold: 4,
  });

  if (!isActive) return null;

  const getOptionStyles = (strategy: 'add' | 'subtract') => {
    const isAdd = strategy === 'add';
    const isSelected = mc.selectedAnswer === strategy;
    const isCorrectAnswer = mc.currentItem.shownStrategy === strategy;

    if (isSelected) {
      if (mc.showFeedback) {
        return isCorrectAnswer
          ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
          : 'bg-red-100 dark:bg-red-900/50 border-red-500';
      }
      return isAdd
        ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500'
        : 'bg-orange-100 dark:bg-orange-900/50 border-orange-500';
    }

    if (mc.showFeedback && isCorrectAnswer) {
      return 'bg-green-50 dark:bg-green-900/30 border-green-400';
    }

    return 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500';
  };

  const getIconStyles = (strategy: 'add' | 'subtract') => {
    const isAdd = strategy === 'add';
    const isSelected = mc.selectedAnswer === strategy;
    const isCorrectAnswer = mc.currentItem.shownStrategy === strategy;

    if (isSelected) {
      if (mc.showFeedback) {
        return isCorrectAnswer ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
      }
      return isAdd ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white';
    }

    return isAdd
      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600'
      : 'bg-orange-100 dark:bg-orange-900/50 text-orange-600';
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica la Estrategia
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Se están sumando o restando partes?
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Figura {mc.currentIndex + 1} de {QUESTIONS.length}
            </div>
            <ProgressDots
              items={QUESTIONS}
              currentIndex={mc.currentIndex}
              getStatus={(_, i) =>
                mc.answers[i] !== null
                  ? mc.answers[i] === QUESTIONS[i].shownStrategy
                    ? 'correct'
                    : 'incorrect'
                  : i === mc.currentIndex
                    ? 'current'
                    : 'pending'
              }
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-gray-700 dark:text-gray-300 text-center mb-4 font-medium">
              {mc.currentItem.description}
            </p>

            <div className="flex justify-center mb-6">
              <div className="w-56 h-40 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                {mc.currentItem.figure}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => mc.select('add')}
                disabled={mc.showFeedback}
                className={cn(
                  'p-4 rounded-xl transition-all border-2 flex flex-col items-center gap-2',
                  getOptionStyles('add')
                )}
              >
                <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', getIconStyles('add'))}>
                  <Plus size={24} />
                </div>
                <span className="font-semibold text-gray-800 dark:text-gray-200">Sumar partes</span>
              </button>

              <button
                onClick={() => mc.select('subtract')}
                disabled={mc.showFeedback}
                className={cn(
                  'p-4 rounded-xl transition-all border-2 flex flex-col items-center gap-2',
                  getOptionStyles('subtract')
                )}
              >
                <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', getIconStyles('subtract'))}>
                  <Minus size={24} />
                </div>
                <span className="font-semibold text-gray-800 dark:text-gray-200">Restar parte</span>
              </button>
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
          passThreshold={4}
          successMessage="¡Excelente!"
          successSubtext="Reconoces bien las estrategias"
          failureSubtext={`Necesitas 4 correctas. ¡Inténtalo de nuevo!`}
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].shownStrategy}
          renderItem={(_, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300">Figura {i + 1}</span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
