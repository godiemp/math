'use client';

import { Check, X, BarChart2, PieChart as PieChartIcon, Table } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import { BarChart, PieChart, FrequencyTable } from '@/components/lessons/shared';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface Question {
  id: string;
  type: 'bar-reading' | 'comparison' | 'relative-calc' | 'pie-interpret' | 'table-match';
  question: string;
  visual: 'bar' | 'pie' | 'table';
  visualData: {
    categories: string[];
    values: number[];
    colors: string[];
    total?: number;
  };
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'bar-reading',
    question: 'Segun el grafico, ¿cuantos estudiantes prefieren Futbol?',
    visual: 'bar',
    visualData: {
      categories: ['Futbol', 'Basket', 'Tenis', 'Natacion'],
      values: [15, 10, 8, 7],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    },
    options: ['10', '15', '8', '7'],
    correctIndex: 1,
    explanation: 'La barra de Futbol tiene altura 15, lo que significa que 15 estudiantes lo prefieren.',
  },
  {
    id: 'q2',
    type: 'comparison',
    question: '¿Cual categoria tiene la MENOR frecuencia?',
    visual: 'bar',
    visualData: {
      categories: ['Rojo', 'Azul', 'Verde', 'Amarillo'],
      values: [12, 8, 15, 5],
      colors: ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'],
    },
    options: ['Rojo', 'Azul', 'Verde', 'Amarillo'],
    correctIndex: 3,
    explanation: 'Amarillo tiene la barra mas baja con frecuencia 5.',
  },
  {
    id: 'q3',
    type: 'relative-calc',
    question: 'Si hay 40 estudiantes en total y 10 prefieren pizza, ¿cual es la frecuencia relativa?',
    visual: 'table',
    visualData: {
      categories: ['Pizza', 'Tacos', 'Sushi', 'Otros'],
      values: [10, 12, 8, 10],
      colors: ['#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'],
      total: 40,
    },
    options: ['10', '0.25', '40%', '4'],
    correctIndex: 1,
    explanation: 'Frecuencia relativa = fi/n = 10/40 = 0.25 (o 25%)',
  },
  {
    id: 'q4',
    type: 'pie-interpret',
    question: 'Si hay 100 personas y el sector "Cine" ocupa 35% del circulo, ¿cuantas personas eligieron Cine?',
    visual: 'pie',
    visualData: {
      categories: ['Cine', 'Teatro', 'Concierto', 'Museo'],
      values: [35, 25, 25, 15],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
      total: 100,
    },
    options: ['35', '0.35', '65', '3.5'],
    correctIndex: 0,
    explanation: '35% de 100 personas = 35 personas eligieron Cine.',
  },
  {
    id: 'q5',
    type: 'table-match',
    question: '¿Cual grafico de barras corresponde a esta tabla?',
    visual: 'table',
    visualData: {
      categories: ['A', 'B', 'C'],
      values: [4, 8, 6],
      colors: ['#3B82F6', '#10B981', '#F59E0B'],
    },
    options: ['A > B > C', 'B > C > A', 'C > B > A', 'B > A > C'],
    correctIndex: 1,
    explanation: 'La tabla muestra A=4, B=8, C=6. Ordenando de mayor a menor: B(8) > C(6) > A(4).',
  },
];

const typeIcons: Record<string, typeof BarChart2> = {
  'bar-reading': BarChart2,
  'comparison': BarChart2,
  'relative-calc': Table,
  'pie-interpret': PieChartIcon,
  'table-match': Table,
};

const typeLabels: Record<string, string> = {
  'bar-reading': 'Lectura',
  'comparison': 'Comparacion',
  'relative-calc': 'Calculo',
  'pie-interpret': 'Interpretacion',
  'table-match': 'Correspondencia',
};

const REQUIRED_CORRECT = 3;

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctIndex,
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  const TypeIcon = typeIcons[mc.currentItem.type];

  // Prepare visual data
  const chartData = mc.currentItem.visualData.categories.map((cat, i) => ({
    category: cat,
    value: mc.currentItem.visualData.values[i],
    color: mc.currentItem.visualData.colors[i],
  }));

  const tableData = mc.currentItem.visualData.categories.map((cat, i) => ({
    category: cat,
    frequency: mc.currentItem.visualData.values[i],
    color: mc.currentItem.visualData.colors[i],
  }));

  const pieData = mc.currentItem.visualData.categories.map((cat, i) => ({
    category: cat,
    value: mc.currentItem.visualData.values[i],
    color: mc.currentItem.visualData.colors[i],
  }));

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Practica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Necesitas {REQUIRED_CORRECT} de {QUESTIONS.length} correctas
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={QUESTIONS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === QUESTIONS[i].correctIndex
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Question type badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <TypeIcon className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {typeLabels[mc.currentItem.type]}
              </span>
            </div>
          </div>

          {/* Visual */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            {mc.currentItem.visual === 'bar' && (
              <BarChart data={chartData} height="md" animated />
            )}
            {mc.currentItem.visual === 'pie' && (
              <PieChart data={pieData} showPercentages size="md" />
            )}
            {mc.currentItem.visual === 'table' && (
              <FrequencyTable
                data={tableData}
                total={mc.currentItem.visualData.total}
                showRelative={mc.currentItem.type === 'relative-calc'}
              />
            )}
          </div>

          {/* Question */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center">
              {mc.currentItem.question}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {mc.currentItem.options.map((option, index) => {
              const isSelected = mc.selectedAnswer === index;
              const isCorrectOption = index === mc.currentItem.correctIndex;

              return (
                <button
                  key={index}
                  onClick={() => mc.select(index)}
                  disabled={mc.showFeedback}
                  className={cn(
                    'p-4 rounded-xl border-2 font-medium transition-all',
                    !mc.showFeedback && 'hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-300',
                    !mc.showFeedback && !isSelected && 'border-gray-200 dark:border-gray-700',
                    isSelected && !mc.showFeedback && 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
                    mc.showFeedback && isSelected && isCorrectOption && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                    mc.showFeedback && isSelected && !isCorrectOption && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                    mc.showFeedback && !isSelected && isCorrectOption && 'border-green-500 bg-green-50/50 dark:bg-green-900/20',
                    mc.showFeedback && !isSelected && !isCorrectOption && 'opacity-50'
                  )}
                >
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  {mc.showFeedback && isSelected && (
                    <span className="ml-2">
                      {isCorrectOption ? (
                        <Check className="w-5 h-5 text-green-600 inline" />
                      ) : (
                        <X className="w-5 h-5 text-red-600 inline" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {mc.showFeedback && (
            <FeedbackPanel
              isCorrect={mc.isCorrect}
              explanation={mc.currentItem.explanation}
            />
          )}

          {/* Actions */}
          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente trabajo!"
          successSubtext="Sabes interpretar tablas y gráficos"
          failureSubtext={`Necesitas ${REQUIRED_CORRECT} respuestas correctas. ¡Puedes intentarlo de nuevo!`}
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctIndex}
          renderItem={(item, _, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.question}</span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
