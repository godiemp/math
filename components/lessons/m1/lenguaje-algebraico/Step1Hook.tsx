'use client';

import { ArrowRight, MessageSquare, User } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useStep1Phase } from '@/hooks/lessons';
import { InlineMath } from '@/components/math/MathDisplay';
import {
  ScenarioCard,
  QuestionPrompt,
  OptionGrid,
  OptionButton,
  ActionButton,
  FeedbackPanel,
  InsightCard,
} from '@/components/lessons/primitives';

const OPTIONS = ['x + 5', '2x + 5', '2(x + 5)', 'x + 2 + 5'];
const CORRECT_ANSWER = 1;

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const { phase, setPhase, selectedAnswer, showFeedback, isCorrect, select, check } = useStep1Phase({
    phases: ['scenario', 'question', 'result'],
    correctAnswer: CORRECT_ANSWER,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">El Mensaje Secreto</h2>
        <p className="text-gray-600 dark:text-gray-300">Un profesor deja un acertijo matemático...</p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  El profesor de matemáticas dejó una nota para sus estudiantes:
                </p>
              </div>
            </div>

            {/* The riddle note */}
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Nota del profesor</span>
              </div>
              <p className="text-gray-800 dark:text-gray-200 text-lg italic font-medium">
                &quot;Mi edad es el doble de la edad de mi hija, más 5 años.&quot;
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Si la hija tiene <InlineMath latex="x" /> años,
                ¿cuántos años tiene el profesor?
              </p>
            </div>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              ¿Cuál es la expresión?
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Si la hija tiene <InlineMath latex="x" /> años,
              ¿cómo expresamos la edad del profesor?
            </p>
          </QuestionPrompt>

          <OptionGrid>
            {OPTIONS.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={index === CORRECT_ANSWER}
                showFeedback={showFeedback}
                onClick={() => select(index)}
              />
            ))}
          </OptionGrid>

          {!showFeedback && (
            <div className="flex justify-center">
              <ActionButton
                onClick={check}
                disabled={selectedAnswer === null}
                variant={selectedAnswer !== null ? 'primary' : 'disabled'}
              >
                Verificar
              </ActionButton>
            </div>
          )}

          {showFeedback && (
            <FeedbackPanel
              isCorrect={isCorrect}
              explanation={
                isCorrect
                  ? '¡Exacto! "El doble" significa multiplicar por 2, y "más 5" es sumar 5.'
                  : '¡Casi! "El doble de x" se escribe como $2x$, y luego sumamos 5.'
              }
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Step-by-step translation */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Traducción paso a paso:
            </h3>

            <div className="space-y-4">
              {/* Original phrase */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Frase original:</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium italic">
                  &quot;El doble de la edad de mi hija, más 5 años&quot;
                </p>
              </div>

              {/* Translation steps */}
              <div className="space-y-3 pl-4 border-l-4 border-green-400 dark:border-green-600">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    &quot;la edad de mi hija&quot; → <InlineMath latex="x" />
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    &quot;el doble de x&quot; → <InlineMath latex="2x" />
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    &quot;más 5 años&quot; → <InlineMath latex="+ 5" />
                  </p>
                </div>
              </div>

              {/* Final result */}
              <div className="text-center pt-4 border-t border-green-200 dark:border-green-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Expresión final:</p>
                <div className="text-3xl">
                  <InlineMath latex="2x + 5" />
                </div>
              </div>
            </div>
          </div>

          <InsightCard title="¡Acabas de hacer una traducción!" variant="purple">
            <div className="space-y-2">
              <p>
                Traducir del <strong>español</strong> al <strong>lenguaje algebraico</strong> es como aprender
                un nuevo idioma que usa símbolos en lugar de palabras.
              </p>
              <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg mt-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Por ejemplo:</p>
                <div className="flex items-center justify-center gap-3 text-lg">
                  <span className="text-gray-700 dark:text-gray-300">&quot;un número más tres&quot;</span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <InlineMath latex="x + 3" />
                </div>
              </div>
            </div>
          </InsightCard>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Aprender más traducciones
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
