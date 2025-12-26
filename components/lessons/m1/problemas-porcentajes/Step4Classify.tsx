'use client';

import { Check, X } from 'lucide-react';
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
  question: string;
  correctType: string;
  options: string[];
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'En una clase de 40 estudiantes, 15 usan lentes. ¿Qué porcentaje usa lentes?',
    correctType: 'Encontrar el porcentaje',
    options: ['Encontrar la parte', 'Encontrar el porcentaje', 'Encontrar el total', 'Aumento/Disminución'],
    explanation: 'Conocemos la parte (15) y el total (40). Debemos encontrar qué porcentaje representa: (15÷40)×100 = 37,5%',
  },
  {
    id: 'p2',
    question: 'Un celular cuesta $200.000 y tiene 15% de descuento. ¿Cuánto se ahorra?',
    correctType: 'Encontrar la parte',
    options: ['Encontrar la parte', 'Encontrar el porcentaje', 'Encontrar el total', 'Aumento/Disminución'],
    explanation: 'Conocemos el porcentaje (15%) y el total ($200.000). Debemos encontrar la parte: 15% de $200.000 = $30.000',
  },
  {
    id: 'p3',
    question: 'Después de un aumento de 20%, el sueldo es $600.000. ¿Cuál era el sueldo original?',
    correctType: 'Encontrar el total',
    options: ['Encontrar la parte', 'Encontrar el porcentaje', 'Encontrar el total', 'Aumento/Disminución'],
    explanation: 'Conocemos el resultado ($600.000) y el porcentaje de cambio (20%). Debemos encontrar el original: $600.000 ÷ 1,20 = $500.000',
  },
  {
    id: 'p4',
    question: 'Un producto de $80.000 sube primero 10% y luego baja 10%. ¿Cuánto queda?',
    correctType: 'Aumento/Disminución',
    options: ['Encontrar la parte', 'Encontrar el porcentaje', 'Encontrar el total', 'Aumento/Disminución'],
    explanation: 'Es un problema de cambios sucesivos. $80.000 × 1,10 × 0,90 = $79.200 (¡no vuelve al original!)',
  },
  {
    id: 'p5',
    question: '45 personas son el 30% de los votantes. ¿Cuántos votantes hay en total?',
    correctType: 'Encontrar el total',
    options: ['Encontrar la parte', 'Encontrar el porcentaje', 'Encontrar el total', 'Aumento/Disminución'],
    explanation: 'Conocemos la parte (45) y el porcentaje (30%). Debemos encontrar el total: (45 × 100) ÷ 30 = 150 votantes',
  },
];

// Map string answer to index
const answerToIndex = (problem: Problem): number => {
  return problem.options.indexOf(problem.correctType);
};

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: PROBLEMS,
    getCorrectAnswer: (item) => answerToIndex(item),
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica el Problema
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica qué tipo de problema es cada uno
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={PROBLEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === answerToIndex(PROBLEMS[i])
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Problem card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Lee el problema:</p>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                &quot;{mc.currentItem.question}&quot;
              </p>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              ¿Qué tipo de problema es?
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mc.currentItem.options.map((option, index) => {
                const isSelected = mc.selectedAnswer === index;
                const isCorrectAnswer = index === answerToIndex(mc.currentItem);

                return (
                  <button
                    key={option}
                    onClick={() => mc.select(index)}
                    disabled={mc.showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all text-left',
                      isSelected
                        ? mc.showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                          : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                        : mc.showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400 text-green-700'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {mc.showFeedback && isCorrectAnswer && (
                        <Check size={18} className="text-green-600 flex-shrink-0" />
                      )}
                      {mc.showFeedback && isSelected && !isCorrectAnswer && (
                        <X size={18} className="text-red-600 flex-shrink-0" />
                      )}
                      <span className="font-medium">{option}</span>
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
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={PROBLEMS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente!"
          successSubtext="Identificas muy bien los tipos de problemas"
          failureSubtext="Sigue practicando para mejorar"
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === answerToIndex(PROBLEMS[i])}
          renderItem={(problem, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">
                {problem.question.substring(0, 50)}...
              </span>
              <span className="text-xs text-purple-600 font-medium ml-2 flex-shrink-0">
                {problem.correctType}
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
