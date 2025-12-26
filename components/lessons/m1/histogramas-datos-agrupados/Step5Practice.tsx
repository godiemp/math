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
  context: string;
  question: string;
  histogram?: {
    intervals: string[];
    frequencies: number[];
    colors: string[];
  };
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'p1',
    context: 'Se midio el peso (en kg) de 40 estudiantes y se organizaron en un histograma.',
    question: 'Segun el histograma, ¿cuantos estudiantes pesan entre 60 y 70 kg?',
    histogram: {
      intervals: ['40-50', '50-60', '60-70', '70-80', '80-90'],
      frequencies: [5, 12, 15, 6, 2],
      colors: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'],
    },
    options: ['12', '15', '6', '40'],
    correctAnswer: 1,
    hint: 'Busca la barra correspondiente al intervalo [60, 70) y lee su altura.',
    explanation:
      'La barra del intervalo 60-70 tiene altura 15, lo que significa que 15 estudiantes pesan entre 60 y 70 kg.',
  },
  {
    id: 'p2',
    context: 'Los siguientes datos representan las edades de 30 personas en un evento:',
    question:
      'Si los intervalos son [15, 20), [20, 25), [25, 30), [30, 35), ¿cual es la amplitud de cada intervalo?',
    options: ['3', '4', '5', '10'],
    correctAnswer: 2,
    hint: 'Recuerda: Amplitud = limite superior - limite inferior.',
    explanation: 'Amplitud = 20 - 15 = 5. Todos los intervalos tienen la misma amplitud de 5 años.',
  },
  {
    id: 'p3',
    context:
      'Un histograma muestra las notas de un examen con los siguientes intervalos: [1, 2), [2, 3), [3, 4), [4, 5), [5, 6), [6, 7).',
    question: '¿Cual es la marca de clase del intervalo [4, 5)?',
    options: ['4', '4.5', '5', '9'],
    correctAnswer: 1,
    hint: 'Marca de clase = (limite inferior + limite superior) / 2',
    explanation: 'Marca de clase = (4 + 5) / 2 = 9 / 2 = 4.5',
  },
  {
    id: 'p4',
    context: 'Observa el siguiente histograma de tiempos de espera en una fila (en minutos):',
    question: '¿Cuantas personas esperaron menos de 10 minutos?',
    histogram: {
      intervals: ['0-5', '5-10', '10-15', '15-20'],
      frequencies: [8, 14, 10, 3],
      colors: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'],
    },
    options: ['8', '14', '22', '35'],
    correctAnswer: 2,
    hint: 'Suma las frecuencias de los intervalos [0, 5) y [5, 10).',
    explanation:
      'Los intervalos [0, 5) y [5, 10) representan tiempos menores a 10 min. Total = 8 + 14 = 22 personas.',
  },
  {
    id: 'p5',
    context:
      'En un histograma de estaturas, el intervalo [170, 175) tiene frecuencia 18 y es el mas alto.',
    question: '¿Que puedes concluir sobre la distribucion de estaturas?',
    options: [
      'Todos miden entre 170 y 175 cm',
      'El intervalo mas frecuente es [170, 175)',
      'Exactamente 18 personas participaron',
      'No se puede saber nada',
    ],
    correctAnswer: 1,
    hint: 'La barra mas alta indica el intervalo con mayor frecuencia, pero no necesariamente la mayoria.',
    explanation:
      'El intervalo [170, 175) es el mas frecuente (moda de los datos agrupados), pero eso no significa que sea la mayoria del total. Solo sabemos que es el intervalo donde se concentran mas datos.',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
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
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Practica Guiada</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica lo que aprendiste sobre histogramas
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Pregunta {mc.currentIndex + 1} de {QUESTIONS.length}
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
              size="sm"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{mc.currentItem.context}</p>

            {mc.currentItem.histogram && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="h-32 flex items-end justify-around gap-1 border-b-2 border-l-2 border-gray-300 dark:border-gray-600 p-2">
                  {mc.currentItem.histogram.intervals.map((_, idx) => {
                    const maxFreq = Math.max(...mc.currentItem.histogram!.frequencies);
                    const heightPercent = (mc.currentItem.histogram!.frequencies[idx] / maxFreq) * 100;
                    return (
                      <div key={idx} className="flex flex-col items-center flex-1 h-full">
                        <div className="flex-1 w-full flex flex-col justify-end">
                          <span className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1 text-center">
                            {mc.currentItem.histogram!.frequencies[idx]}
                          </span>
                          <div
                            className="w-full rounded-t transition-all"
                            style={{
                              height: `${heightPercent}%`,
                              backgroundColor: mc.currentItem.histogram!.colors[idx],
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-around gap-1 mt-2">
                  {mc.currentItem.histogram.intervals.map((interval) => (
                    <span
                      key={interval}
                      className="text-xs text-gray-500 dark:text-gray-400 text-center flex-1"
                    >
                      {interval}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {mc.currentItem.question}
            </h3>

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

            {!mc.showFeedback && !hint.showHint && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={hint.toggleHint}
                  className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                >
                  <Lightbulb size={16} />
                  <span>Ver pista</span>
                </button>
              </div>
            )}

            {hint.showHint && !mc.showFeedback && (
              <div className={`mt-4 p-3 rounded-lg border animate-fadeIn ${colors.hint.container}`}>
                <div className="flex items-start gap-2">
                  <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.hint.icon}`} />
                  <p className={`text-sm ${colors.hint.text}`}>{mc.currentItem.hint}</p>
                </div>
              </div>
            )}
          </div>

          {mc.showFeedback && (
            <FeedbackPanel
              isCorrect={mc.isCorrect}
              explanation={mc.currentItem.explanation}
            />
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? handleNext : mc.check}
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
          passThreshold={3}
          successMessage="¡Practica completada!"
          successSubtext="Estas listo para el checkpoint"
          failureSubtext={`Necesitas al menos 3 correctas para continuar.`}
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300">Pregunta {i + 1}</span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
          continueLabel="Continuar al Checkpoint"
        />
      )}
    </div>
  );
}
