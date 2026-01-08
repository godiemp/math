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
import { InlineMath, BlockMath, MathText } from '@/components/math/MathDisplay';

type PropertyType = 'product' | 'quotient' | 'rootOfRoot' | 'invalid';

interface Expression {
  id: string;
  expression: string;
  correctType: PropertyType;
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: '\\sqrt{36 \\times 4}',
    correctType: 'product',
    explanation: 'Es un producto dentro de la raíz → Propiedad del Producto: $\\sqrt{36 \\times 4} = \\sqrt{36} \\times \\sqrt{4} = 6 \\times 2 = 12$',
  },
  {
    id: 'e2',
    expression: '\\sqrt[3]{\\dfrac{125}{8}}',
    correctType: 'quotient',
    explanation: 'Es un cociente dentro de la raíz → Propiedad del Cociente: $\\sqrt[3]{\\dfrac{125}{8}} = \\dfrac{\\sqrt[3]{125}}{\\sqrt[3]{8}} = \\dfrac{5}{2}$',
  },
  {
    id: 'e3',
    expression: '\\sqrt{\\sqrt[3]{8}}',
    correctType: 'rootOfRoot',
    explanation: 'Es una raíz dentro de otra raíz → Los índices se multiplican: $\\sqrt{\\sqrt[3]{8}} = \\sqrt[6]{8} = \\sqrt[6]{2^3} = 2^{3/6} = 2^{1/2} = \\sqrt{2}$',
  },
  {
    id: 'e4',
    expression: '\\sqrt{25 + 144}',
    correctType: 'invalid',
    explanation: '¡Cuidado! Es una SUMA dentro de la raíz. Las propiedades NO aplican a sumas. Hay que calcular: $\\sqrt{25+144} = \\sqrt{169} = 13$',
  },
  {
    id: 'e5',
    expression: '\\sqrt[4]{16 \\times 81}',
    correctType: 'product',
    explanation: 'Es un producto dentro de la raíz cuarta → Propiedad del Producto: $\\sqrt[4]{16 \\times 81} = \\sqrt[4]{16} \\times \\sqrt[4]{81} = 2 \\times 3 = 6$',
  },
];

const TYPE_OPTIONS: { id: PropertyType; label: string; color: string }[] = [
  { id: 'product', label: 'Producto', color: 'blue' },
  { id: 'quotient', label: 'Cociente', color: 'purple' },
  { id: 'rootOfRoot', label: 'Raíz de Raíz', color: 'teal' },
  { id: 'invalid', label: 'No aplica', color: 'red' },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/50', border: 'border-blue-500', text: 'text-blue-700 dark:text-blue-300' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/50', border: 'border-purple-500', text: 'text-purple-700 dark:text-purple-300' },
  teal: { bg: 'bg-teal-100 dark:bg-teal-900/50', border: 'border-teal-500', text: 'text-teal-700 dark:text-teal-300' },
  red: { bg: 'bg-red-100 dark:bg-red-900/50', border: 'border-red-500', text: 'text-red-700 dark:text-red-300' },
};

const answerToIndex = (answer: PropertyType): number => {
  return TYPE_OPTIONS.findIndex((opt) => opt.id === answer);
};

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: EXPRESSIONS,
    getCorrectAnswer: (item) => answerToIndex(item.correctType),
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica la Propiedad
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Qué propiedad se puede usar en cada expresión?
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={EXPRESSIONS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === answerToIndex(EXPRESSIONS[i].correctType)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Expression card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Qué propiedad aplica?</p>
              <div className="flex justify-center text-3xl font-bold text-gray-800 dark:text-gray-200">
                <BlockMath latex={mc.currentItem.expression} />
              </div>
            </div>

            {/* Type options */}
            <div className="grid grid-cols-2 gap-4">
              {TYPE_OPTIONS.map((option, index) => {
                const colors = colorClasses[option.color];
                const isSelected = mc.selectedAnswer === index;
                const isCorrectAnswer = index === answerToIndex(mc.currentItem.correctType);

                return (
                  <button
                    key={option.id}
                    onClick={() => mc.select(index)}
                    disabled={mc.showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all font-medium',
                      isSelected
                        ? mc.showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                          : `${colors.bg} ${colors.border}`
                        : mc.showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                    )}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {mc.showFeedback && isCorrectAnswer && <Check size={18} className="text-green-600" />}
                      {mc.showFeedback && isSelected && !isCorrectAnswer && <X size={18} className="text-red-600" />}
                      <span className={cn('font-semibold', isSelected && !mc.showFeedback ? colors.text : 'text-gray-700 dark:text-gray-300')}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {mc.showFeedback && (
            <FeedbackPanel isCorrect={mc.isCorrect} explanation={<MathText content={mc.currentItem.explanation} />} />
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < EXPRESSIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={EXPRESSIONS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente!"
          successSubtext="Identificas muy bien las propiedades de raíces"
          failureSubtext="Sigue practicando para mejorar"
          items={EXPRESSIONS}
          getIsCorrect={(_, i) => mc.answers[i] === answerToIndex(EXPRESSIONS[i].correctType)}
          renderItem={(expr, i, isCorrect) => {
            const correctOption = TYPE_OPTIONS.find(o => o.id === expr.correctType)!;
            const colors = colorClasses[correctOption.color];
            return (
              <>
                {isCorrect ? (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className="text-gray-700 dark:text-gray-300 flex items-center"><BlockMath latex={expr.expression} /></span>
                <span className={cn('text-sm font-medium px-2 py-1 rounded ml-auto', colors.bg, colors.text)}>
                  {correctOption.label}
                </span>
              </>
            );
          }}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
