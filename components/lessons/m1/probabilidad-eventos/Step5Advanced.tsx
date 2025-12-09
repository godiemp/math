'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Lightbulb, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'cards' | 'complement' | 'summary';

export default function Step5Advanced({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [cardAnswer, setCardAnswer] = useState<number | null>(null);
  const [showCardFeedback, setShowCardFeedback] = useState(false);
  const [complementAnswer, setComplementAnswer] = useState<number | null>(null);
  const [showComplementFeedback, setShowComplementFeedback] = useState(false);

  if (!isActive) return null;

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Más Allá del Dado
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Probabilidades con cartas y el evento complementario
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-purple-500" />
            <p className="text-lg text-gray-800 dark:text-gray-200">
              La probabilidad funciona igual con cualquier experimento aleatorio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <span className="text-4xl mb-2 block">🃏</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Cartas</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Un mazo tiene 52 cartas
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <span className="text-4xl mb-2 block">🔄</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Complemento</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                P(NO A) = 1 - P(A)
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('cards')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Empezar con cartas</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ CARDS ============
  if (phase === 'cards') {
    const correctCardAnswer = 2; // 4/52 = 1/13

    const handleCardCheck = () => {
      setShowCardFeedback(true);
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Probabilidad con Cartas
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un mazo estándar tiene 52 cartas
          </p>
        </div>

        {/* Card deck visualization */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-5">
          <div className="grid grid-cols-4 gap-3 text-center mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <span className="text-2xl text-red-500">♥</span>
              <p className="text-sm font-semibold">13 Corazones</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <span className="text-2xl text-red-500">♦</span>
              <p className="text-sm font-semibold">13 Diamantes</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <span className="text-2xl text-gray-900 dark:text-white">♠</span>
              <p className="text-sm font-semibold">13 Picas</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <span className="text-2xl text-gray-900 dark:text-white">♣</span>
              <p className="text-sm font-semibold">13 Tréboles</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Cada palo tiene: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K
          </p>
        </div>

        {/* Question */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 text-center">
            Si sacas una carta al azar, ¿cuál es la probabilidad de que sea un As?
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 text-center mt-2">
            Pista: ¿Cuántos Ases hay en el mazo?
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {['1/52', '4/13', '4/52', '13/52'].map((option, index) => (
            <button
              key={index}
              onClick={() => setCardAnswer(index)}
              disabled={showCardFeedback}
              className={cn(
                'p-4 rounded-xl font-semibold text-lg transition-all border-2',
                cardAnswer === index
                  ? showCardFeedback
                    ? index === correctCardAnswer
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                    : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500'
                  : showCardFeedback && index === correctCardAnswer
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300'
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showCardFeedback && (
          <div className={cn(
            'p-4 rounded-xl animate-fadeIn',
            cardAnswer === correctCardAnswer
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200'
          )}>
            <div className="flex items-start gap-3">
              {cardAnswer === correctCardAnswer ? (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
              )}
              <div>
                <p className={cn(
                  'font-bold',
                  cardAnswer === correctCardAnswer ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {cardAnswer === correctCardAnswer ? '¡Correcto!' : 'La respuesta correcta es 4/52'}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Hay 4 Ases (uno de cada palo) y 52 cartas en total.
                  <br />
                  P(As) = 4/52 = 1/13 ≈ 0.077 ≈ 7.7%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-center">
          {!showCardFeedback ? (
            <button
              onClick={handleCardCheck}
              disabled={cardAnswer === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                cardAnswer !== null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={() => setPhase('complement')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Aprender el complemento</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ COMPLEMENT ============
  if (phase === 'complement') {
    const correctComplementAnswer = 1; // 5/6

    const handleComplementCheck = () => {
      setShowComplementFeedback(true);
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Evento Complementario
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            A veces es más fácil calcular lo contrario
          </p>
        </div>

        {/* Concept explanation */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-amber-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Regla del complemento
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center mb-4">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              P(NO ocurre A) = 1 - P(A)
            </p>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4">
            <p className="text-amber-800 dark:text-amber-200 text-center">
              <strong>Ejemplo:</strong> Si P(lluvia) = 0.3, entonces P(NO lluvia) = 1 - 0.3 = <strong>0.7</strong>
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 text-center">
            Al lanzar un dado, ¿cuál es la probabilidad de <strong>NO</strong> sacar un 6?
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 text-center mt-2">
            Usa la regla del complemento: P(NO sacar 6) = 1 - P(sacar 6)
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {['1/6', '5/6', '4/6', '6/6'].map((option, index) => (
            <button
              key={index}
              onClick={() => setComplementAnswer(index)}
              disabled={showComplementFeedback}
              className={cn(
                'p-4 rounded-xl font-semibold text-lg transition-all border-2',
                complementAnswer === index
                  ? showComplementFeedback
                    ? index === correctComplementAnswer
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                    : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500'
                  : showComplementFeedback && index === correctComplementAnswer
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300'
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showComplementFeedback && (
          <div className={cn(
            'p-4 rounded-xl animate-fadeIn',
            complementAnswer === correctComplementAnswer
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200'
          )}>
            <div className="flex items-start gap-3">
              {complementAnswer === correctComplementAnswer ? (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
              )}
              <div>
                <p className={cn(
                  'font-bold',
                  complementAnswer === correctComplementAnswer ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {complementAnswer === correctComplementAnswer ? '¡Excelente!' : 'La respuesta correcta es 5/6'}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  P(sacar 6) = 1/6
                  <br />
                  P(NO sacar 6) = 1 - 1/6 = 5/6 ≈ 83.3%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-center">
          {!showComplementFeedback ? (
            <button
              onClick={handleComplementCheck}
              disabled={complementAnswer === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                complementAnswer !== null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={() => setPhase('summary')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Ver resumen</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resumen de Probabilidades
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Lo que aprendiste en esta sección
        </p>
      </div>

      <div className="space-y-4">
        {/* Formula card */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">📐</span>
            Fórmula Principal
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
              P(A) = Casos Favorables / Casos Posibles
            </p>
          </div>
        </div>

        {/* Complement card */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            Complemento
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
              P(NO A) = 1 - P(A)
            </p>
          </div>
        </div>

        {/* Properties card */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">✅</span>
            Recuerda
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              La probabilidad está entre 0 y 1
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              P = 0 significa imposible
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              P = 1 significa seguro
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              P = 0.5 significa 50% de probabilidad
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Ir al Checkpoint</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
