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
import MathDisplay from '@/components/math/MathDisplay';

interface Problem {
  id: string;
  question: string;
  context: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'En la figura con lineas paralelas L₁, L₂, L₃: Si AB = 4, BC = 6, y A\'B\' = 8, ¿cuanto es B\'C\'?',
    context: 'Usa la proporcion del Teorema de Tales: AB/BC = A\'B\'/B\'C\'',
    hint: '4/6 = 8/B\'C\' → B\'C\' = (6 × 8) / 4',
    options: ['10', '12', '14', '16'],
    correctAnswer: 1,
    explanation: 'Aplicando Tales: 4/6 = 8/x → x = (6 × 8) / 4 = 48/4 = 12.',
  },
  {
    id: 'p2',
    question: 'En un triangulo ABC, DE es paralelo a BC. Si AD = 3, DB = 5, y AE = 6, ¿cuanto es EC?',
    context: 'Los segmentos en lados paralelos son proporcionales',
    hint: 'AD/DB = AE/EC → 3/5 = 6/EC',
    options: ['8', '9', '10', '12'],
    correctAnswer: 2,
    explanation: 'Por Tales: 3/5 = 6/EC → EC = (5 × 6) / 3 = 30/3 = 10.',
  },
  {
    id: 'p3',
    question: 'Un poste de 2m proyecta una sombra de 3m. ¿Que altura tiene un arbol cuya sombra mide 12m?',
    context: 'Los rayos del sol son paralelos, formando triangulos semejantes',
    hint: 'altura_poste / sombra_poste = altura_arbol / sombra_arbol → 2/3 = x/12',
    options: ['6 m', '8 m', '9 m', '18 m'],
    correctAnswer: 1,
    explanation: 'Los rayos paralelos crean proporciones: 2/3 = x/12 → x = (2 × 12) / 3 = 24/3 = 8 metros.',
  },
  {
    id: 'p4',
    question: 'Si AB = 5, BC = 7, CD = 3, y A\'B\' = 10, encuentra B\'C\' + C\'D\'.',
    context: 'Tres lineas paralelas cortan dos transversales. Todos los segmentos se escalan por el mismo factor.',
    hint: 'Factor k = A\'B\'/AB = 10/5 = 2. Entonces B\'C\' = 7×2 y C\'D\' = 3×2.',
    options: ['14', '17', '20', '23'],
    correctAnswer: 2,
    explanation: 'Factor k = 10/5 = 2. Entonces B\'C\' = 7×2 = 14 y C\'D\' = 3×2 = 6. Total = 14 + 6 = 20.',
  },
  {
    id: 'p5',
    question: 'En un triangulo, una linea paralela a la base divide los otros dos lados. Si los segmentos superiores son 4 y 6, y un segmento inferior es 10, ¿cuanto es el otro segmento inferior?',
    context: 'Los segmentos correspondientes son proporcionales',
    hint: '4/10 = 6/x → x = (10 × 6) / 4',
    options: ['12', '15', '18', '24'],
    correctAnswer: 1,
    explanation: 'Por proporcionalidad: 4/10 = 6/x → x = (10 × 6) / 4 = 60/4 = 15.',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: PROBLEMS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 3,
  });

  const hint = useHintToggle();

  const handleNext = () => {
    hint.hideHint();
    mc.next();
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Practica Guiada</h2>
        <p className="text-gray-600 dark:text-gray-300">Aplica el Teorema de Tales</p>
      </div>

      {/* Progress */}
      <ProgressDots
        items={PROBLEMS}
        currentIndex={mc.currentIndex}
        getStatus={(item, index) => {
          if (mc.answers[index] === null) return 'pending';
          if (mc.answers[index] === item.correctAnswer) return 'correct';
          return 'incorrect';
        }}
        size="md"
      />

      {/* Main content or results */}
      {!mc.isComplete ? (
        <div className="space-y-6">
          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
            <div className="text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Problema {mc.currentIndex + 1} de {PROBLEMS.length}
              </span>
            </div>

            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center">
              {mc.currentItem.question}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400 text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              {mc.currentItem.context}
            </p>
          </div>

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
                isMono
              />
            ))}
          </div>

          {/* Hint toggle */}
          {!mc.showFeedback && (
            <div className="flex justify-center">
              <button
                onClick={hint.toggleHint}
                className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                <Lightbulb size={18} />
                {hint.showHint ? 'Ocultar pista' : 'Ver pista'}
              </button>
            </div>
          )}

          {/* Hint panel */}
          {hint.showHint && !mc.showFeedback && (
            <div className={colors.hint.container + ' rounded-lg p-4 animate-fadeIn'}>
              <p className="text-amber-800 dark:text-amber-200 text-sm font-mono">
                {mc.currentItem.hint}
              </p>
            </div>
          )}

          {/* Action buttons */}
          {!mc.showFeedback ? (
            <div className="flex justify-center">
              <ActionButton onClick={mc.check} disabled={mc.selectedAnswer === null}>
                Verificar
              </ActionButton>
            </div>
          ) : (
            <>
              <FeedbackPanel
                isCorrect={mc.isCorrect}
                title={mc.isCorrect ? '¡Correcto!' : '¡Casi!'}
                explanation={mc.currentItem.explanation}
              />

              <div className="flex justify-center">
                <ActionButton onClick={handleNext}>
                  {mc.currentIndex < PROBLEMS.length - 1 ? 'Siguiente problema' : 'Ver resultados'}
                </ActionButton>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Results summary */
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={PROBLEMS.length}
          passed={mc.passed}
          passThreshold={3}
          successMessage="¡Excelente! Has dominado el Teorema de Tales."
          failureMessage="¡Buen intento! Sigue practicando las proporciones."
          items={PROBLEMS}
          getIsCorrect={(item, index) => mc.answers[index] === item.correctAnswer}
          renderItem={(item, index, isCorrect) => (
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                Problema {index + 1}
              </span>
            </div>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
