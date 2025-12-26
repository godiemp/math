'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, RefreshCw, Divide, X, Check, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
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

type Phase = 'intro' | 'reciprocal' | 'rule' | 'practice' | 'summary';

interface Problem {
  id: string;
  fraction1: { num: number; den: number };
  fraction2: { num: number; den: number };
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'd1',
    fraction1: { num: 1, den: 2 },
    fraction2: { num: 3, den: 4 },
    options: ['1/6', '3/8', '2/3', '6/1'],
    correctAnswer: 2,
    hint: 'Multiplica 1/2 por el recíproco de 3/4 (que es 4/3)',
    explanation: '1/2 ÷ 3/4 = 1/2 × 4/3 = 4/6 = 2/3',
  },
  {
    id: 'd2',
    fraction1: { num: 3, den: 4 },
    fraction2: { num: 1, den: 2 },
    options: ['3/8', '3/2', '2/3', '4/3'],
    correctAnswer: 1,
    hint: 'Multiplica 3/4 por el recíproco de 1/2 (que es 2/1)',
    explanation: '3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2',
  },
  {
    id: 'd3',
    fraction1: { num: 2, den: 3 },
    fraction2: { num: 4, den: 5 },
    options: ['8/15', '5/6', '6/5', '3/4'],
    correctAnswer: 1,
    hint: 'Multiplica 2/3 por el recíproco de 4/5 (que es 5/4)',
    explanation: '2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6',
  },
  {
    id: 'd4',
    fraction1: { num: 5, den: 6 },
    fraction2: { num: 2, den: 3 },
    options: ['5/4', '6/5', '5/9', '4/5'],
    correctAnswer: 0,
    hint: 'Multiplica 5/6 por el recíproco de 2/3 (que es 3/2)',
    explanation: '5/6 ÷ 2/3 = 5/6 × 3/2 = 15/12 = 5/4',
  },
];

export default function Step5Division({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');

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

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Secreto de la Division
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Como dividir fracciones?
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="text-center mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Imagina que tienes <strong>3/4</strong> de una pizza y quieres dividirla en porciones de <strong>1/2</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              ¿Cuantas porciones de <strong>1/2</strong> caben en <strong>3/4</strong>?
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <div className="text-center text-2xl font-bold mb-4">
              <span className="text-orange-600 dark:text-orange-400">3/4</span>
              <span className="text-gray-400 mx-3">÷</span>
              <span className="text-blue-600 dark:text-blue-400">1/2</span>
              <span className="text-gray-400 mx-3">=</span>
              <span className="text-purple-600 dark:text-purple-400">?</span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                <strong>Pista:</strong> Dividir es lo mismo que preguntar &quot;¿cuantas veces cabe?&quot;
                En 3/4 de pizza caben <strong>1.5</strong> porciones de 1/2.
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Pero... ¿como lo calculamos sin dibujar pizzas?
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <ActionButton onClick={() => setPhase('reciprocal')}>
            Descubrir el secreto
          </ActionButton>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: RECIPROCAL ============
  if (phase === 'reciprocal') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Secreto de la Division
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El reciproco (o inverso)
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-center font-bold text-amber-700 dark:text-amber-300 mb-4">
              ¿Que es el reciproco?
            </h3>

            <div className="flex items-center justify-center gap-4 mb-4">
              <RefreshCw className="w-6 h-6 text-amber-500" />
              <p className="text-gray-700 dark:text-gray-300">
                Es la fraccion <strong>&quot;al reves&quot;</strong> - intercambias el numerador y denominador.
              </p>
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-center gap-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <div className="text-xl font-bold">
                  <span className="text-orange-600 dark:text-orange-400">1/2</span>
                </div>
                <RefreshCw className="w-5 h-5 text-gray-400" />
                <div className="text-xl font-bold">
                  <span className="text-blue-600 dark:text-blue-400">2/1</span>
                  <span className="text-gray-500 text-sm ml-1">= 2</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <div className="text-xl font-bold">
                  <span className="text-orange-600 dark:text-orange-400">3/4</span>
                </div>
                <RefreshCw className="w-5 h-5 text-gray-400" />
                <div className="text-xl font-bold">
                  <span className="text-blue-600 dark:text-blue-400">4/3</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <div className="text-xl font-bold">
                  <span className="text-orange-600 dark:text-orange-400">5</span>
                  <span className="text-gray-500 text-sm ml-1">= 5/1</span>
                </div>
                <RefreshCw className="w-5 h-5 text-gray-400" />
                <div className="text-xl font-bold">
                  <span className="text-blue-600 dark:text-blue-400">1/5</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/50 rounded-lg border border-green-300 dark:border-green-700">
              <p className="text-green-800 dark:text-green-200 text-sm text-center">
                <strong>Dato curioso:</strong> Una fraccion multiplicada por su reciproco siempre da 1.
                <br />
                <span className="text-xs">Por ejemplo: 3/4 × 4/3 = 12/12 = 1</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ActionButton onClick={() => setPhase('rule')}>
            Ver la regla
          </ActionButton>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: THE RULE ============
  if (phase === 'rule') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Secreto de la Division
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡La regla de oro!
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <h3 className="font-bold text-green-700 dark:text-green-300 mb-4 text-lg">
              Division de Fracciones
            </h3>

            <div className="text-xl md:text-2xl font-bold mb-4">
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-2">÷</span>
              <span className="text-blue-600 dark:text-blue-400">c/d</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-2">×</span>
              <span className="text-green-600 dark:text-green-400">d/c</span>
            </div>

            <div className="flex items-center justify-center gap-3 p-4 bg-green-100 dark:bg-green-900/50 rounded-xl">
              <Divide className="w-6 h-6 text-red-500" />
              <span className="text-gray-500">se convierte en</span>
              <X className="w-6 h-6 text-green-500" />
              <span className="text-gray-500">con el</span>
              <RefreshCw className="w-6 h-6 text-blue-500" />
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              <strong>Dividir</strong> entre una fraccion = <strong>Multiplicar</strong> por su <strong>reciproco</strong>
            </p>
          </div>

          <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-3 text-sm">
              Ejemplo: 3/4 ÷ 1/2
            </p>
            <div className="space-y-2 text-center">
              <div className="text-lg">
                <span className="text-orange-600 dark:text-orange-400 font-bold">3/4</span>
                <span className="text-gray-400 mx-2">÷</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">1/2</span>
              </div>
              <div className="text-gray-400">=</div>
              <div className="text-lg">
                <span className="text-orange-600 dark:text-orange-400 font-bold">3/4</span>
                <span className="text-gray-400 mx-2">×</span>
                <span className="text-green-600 dark:text-green-400 font-bold">2/1</span>
                <span className="text-gray-500 text-sm ml-1">(reciproco de 1/2)</span>
              </div>
              <div className="text-gray-400">=</div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                6/4 = 3/2 = 1.5
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ActionButton onClick={() => setPhase('practice')} variant="success">
            Probar
          </ActionButton>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: PRACTICE ============
  if (phase === 'practice') {
    if (mc.isComplete) {
      const percentage = Math.round((mc.correctCount / PROBLEMS.length) * 100);

      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Practica: Division
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              ¡Resultados!
            </p>
          </div>

          <ResultsSummary
            correctCount={mc.correctCount}
            totalCount={PROBLEMS.length}
            passed={mc.passed}
            passThreshold={3}
            successMessage={percentage === 100 ? '¡Perfecto!' : '¡Muy bien!'}
            successSubtext={percentage === 100 ? 'Dominas la division de fracciones' : 'Ya casi lo dominas'}
            failureMessage="Sigue practicando"
            failureSubtext="Repasa la regla y vuelve a intentarlo"
            items={PROBLEMS}
            getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctAnswer}
            renderItem={(p, i, isCorrect) => (
              <>
                {isCorrect ? (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className="font-mono text-gray-700 dark:text-gray-300">
                  {p.fraction1.num}/{p.fraction1.den} ÷ {p.fraction2.num}/{p.fraction2.den}
                </span>
              </>
            )}
            onRetry={mc.reset}
            onContinue={() => setPhase('summary')}
            continueLabel="Ver resumen"
          />

          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
            <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3">
              Recuerda:
            </h4>
            <div className="text-center text-lg font-bold mb-2">
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-2">÷</span>
              <span className="text-blue-600 dark:text-blue-400">c/d</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-2">×</span>
              <span className="text-green-600 dark:text-green-400">d/c</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
              Dividir = Multiplicar por el reciproco
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Practica: Division
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Problema {mc.currentIndex + 1} de {PROBLEMS.length}
          </p>
        </div>

        <div className="flex justify-center">
          <ProgressDots
            items={PROBLEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === PROBLEMS[i].correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
            size="sm"
          />
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Resuelve y simplifica:</p>
            <div className="text-3xl md:text-4xl font-bold">
              <span className="text-orange-600 dark:text-orange-400">
                {mc.currentItem.fraction1.num}/{mc.currentItem.fraction1.den}
              </span>
              <span className="text-gray-400 mx-3">÷</span>
              <span className="text-blue-600 dark:text-blue-400">
                {mc.currentItem.fraction2.num}/{mc.currentItem.fraction2.den}
              </span>
              <span className="text-gray-400 mx-3">=</span>
              <span className="text-purple-600 dark:text-purple-400">?</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
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
                isMono
              />
            ))}
          </div>

          {!mc.showFeedback && !hint.showHint && (
            <div className="flex justify-center mt-4">
              <button
                onClick={hint.toggleHint}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <HelpCircle size={16} />
                <span>Ver pista</span>
              </button>
            </div>
          )}

          {hint.showHint && !mc.showFeedback && (
            <div className={`mt-4 p-3 rounded-lg border animate-fadeIn ${colors.hint.container}`}>
              <p className={`text-sm text-center ${colors.hint.text}`}>
                <strong>Pista:</strong> {mc.currentItem.hint}
              </p>
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
              ? mc.currentIndex < PROBLEMS.length - 1
                ? 'Siguiente'
                : 'Ver resultados'
              : 'Comprobar'}
          </ActionButton>
        </div>
      </div>
    );
  }

  // ============ PHASE 5: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Secreto de la Division
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resumen completo
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-3 text-center">
              Multiplicacion
            </h4>
            <div className="text-center text-lg font-bold">
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-1">×</span>
              <span className="text-blue-600 dark:text-blue-400">c/d</span>
              <span className="text-gray-400 mx-1">=</span>
              <span className="text-green-600 dark:text-green-400">(a×c)/(b×d)</span>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-2">
              Numerador × Numerador / Denominador × Denominador
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3 text-center">
              Division
            </h4>
            <div className="text-center text-lg font-bold">
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-1">÷</span>
              <span className="text-blue-600 dark:text-blue-400">c/d</span>
              <span className="text-gray-400 mx-1">=</span>
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-1">×</span>
              <span className="text-green-600 dark:text-green-400">d/c</span>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-2">
              Multiplica por el reciproco
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Multiplicar</strong>: directo, arriba × arriba, abajo × abajo
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Dividir</strong>: convierte en multiplicacion por el reciproco
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Reciproco</strong>: intercambia numerador y denominador
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Simplifica</strong>: siempre al final (o antes si puedes)
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <ActionButton onClick={onComplete} variant="success">
          Continuar al checkpoint
        </ActionButton>
      </div>
    </div>
  );
}
