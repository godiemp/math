'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  num1: number;
  denom1: number;
  num2: number;
  denom2: number;
}

// GCD and LCM helper functions
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function simplifyFraction(num: number, denom: number): [number, number] {
  const g = gcd(num, denom);
  return [num / g, denom / g];
}

// Interactive addition problem component
function AdditionProblem({
  problem,
  onSolve,
}: {
  problem: Problem;
  onSolve: () => void;
}) {
  const [step, setStep] = useState<'lcd' | 'convert' | 'add' | 'result'>('lcd');
  const [userLCD, setUserLCD] = useState<number | null>(null);
  const [userNum1, setUserNum1] = useState<number | null>(null);
  const [userNum2, setUserNum2] = useState<number | null>(null);
  const [userSum, setUserSum] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  const { num1, denom1, num2, denom2 } = problem;
  const correctLCD = lcm(denom1, denom2);
  const factor1 = correctLCD / denom1;
  const factor2 = correctLCD / denom2;
  const convertedNum1 = num1 * factor1;
  const convertedNum2 = num2 * factor2;
  const sumNum = convertedNum1 + convertedNum2;
  const [simplifiedNum, simplifiedDenom] = simplifyFraction(sumNum, correctLCD);

  const handleLCDSubmit = () => {
    if (userLCD === correctLCD) {
      setStep('convert');
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handleConvertSubmit = () => {
    if (userNum1 === convertedNum1 && userNum2 === convertedNum2) {
      setStep('add');
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handleAddSubmit = () => {
    if (userSum === sumNum) {
      setStep('result');
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  // Generate LCD options
  const lcdOptions = [
    correctLCD,
    denom1 * denom2,
    denom1 + denom2,
    Math.max(denom1, denom2),
  ].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);

  return (
    <div className="space-y-4">
      {/* Problem display */}
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900/30 dark:to-blue-900/30 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold">
          <span className="text-orange-600 dark:text-orange-400">{num1}/{denom1}</span>
          <span className="text-gray-400 mx-3">+</span>
          <span className="text-blue-600 dark:text-blue-400">{num2}/{denom2}</span>
        </div>
      </div>

      {/* Step 1: Find LCD */}
      {step === 'lcd' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-3 animate-fadeIn">
          <p className="text-center text-gray-700 dark:text-gray-300">
            <strong>Paso 1:</strong> ¿Cuál es el MCM de {denom1} y {denom2}?
          </p>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {lcdOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => { setUserLCD(opt); setShowError(false); }}
                className={cn(
                  'p-3 rounded-lg font-bold transition-all',
                  userLCD === opt
                    ? 'bg-purple-500 text-white scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600',
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          {showError && (
            <p className="text-red-500 text-sm text-center">
              Intenta de nuevo. Busca el primer múltiplo común.
            </p>
          )}
          <div className="flex justify-center">
            <button
              onClick={handleLCDSubmit}
              disabled={userLCD === null}
              className={cn(
                'px-6 py-2 rounded-lg font-semibold transition-all',
                userLCD !== null
                  ? 'bg-purple-500 text-white hover:bg-purple-600'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
              )}
            >
              Verificar
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Convert fractions */}
      {step === 'convert' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-green-600 dark:text-green-400 font-medium">
              MCM = {correctLCD}
            </p>
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300">
            <strong>Paso 2:</strong> Convierte las fracciones a /{correctLCD}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First fraction */}
            <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {num1}/{denom1} × ({correctLCD}/{denom1}) =
              </p>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="number"
                  value={userNum1 ?? ''}
                  onChange={(e) => { setUserNum1(parseInt(e.target.value) || null); setShowError(false); }}
                  className="w-16 h-10 text-center text-lg font-bold border-2 border-orange-300 dark:border-orange-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="?"
                />
                <span className="text-lg font-bold text-gray-600 dark:text-gray-400">/{correctLCD}</span>
              </div>
            </div>

            {/* Second fraction */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {num2}/{denom2} × ({correctLCD}/{denom2}) =
              </p>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="number"
                  value={userNum2 ?? ''}
                  onChange={(e) => { setUserNum2(parseInt(e.target.value) || null); setShowError(false); }}
                  className="w-16 h-10 text-center text-lg font-bold border-2 border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="?"
                />
                <span className="text-lg font-bold text-gray-600 dark:text-gray-400">/{correctLCD}</span>
              </div>
            </div>
          </div>

          {showError && (
            <p className="text-red-500 text-sm text-center">
              Revisa tus cálculos. Multiplica el numerador por el factor.
            </p>
          )}
          <div className="flex justify-center">
            <button
              onClick={handleConvertSubmit}
              disabled={userNum1 === null || userNum2 === null}
              className={cn(
                'px-6 py-2 rounded-lg font-semibold transition-all',
                userNum1 !== null && userNum2 !== null
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
              )}
            >
              Verificar
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Add numerators */}
      {step === 'add' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-green-600 dark:text-green-400 font-medium">
              {convertedNum1}/{correctLCD} + {convertedNum2}/{correctLCD}
            </p>
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300">
            <strong>Paso 3:</strong> Suma los numeradores
          </p>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xl font-bold">
              <span className="text-orange-600 dark:text-orange-400">{convertedNum1}</span>
              <span className="text-gray-400">+</span>
              <span className="text-blue-600 dark:text-blue-400">{convertedNum2}</span>
              <span className="text-gray-400">=</span>
              <input
                type="number"
                value={userSum ?? ''}
                onChange={(e) => { setUserSum(parseInt(e.target.value) || null); setShowError(false); }}
                className="w-16 h-10 text-center text-lg font-bold border-2 border-green-300 dark:border-green-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="?"
              />
            </div>
          </div>

          {showError && (
            <p className="text-red-500 text-sm text-center">
              Suma {convertedNum1} + {convertedNum2}
            </p>
          )}
          <div className="flex justify-center">
            <button
              onClick={handleAddSubmit}
              disabled={userSum === null}
              className={cn(
                'px-6 py-2 rounded-lg font-semibold transition-all',
                userSum !== null
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
              )}
            >
              Verificar
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Result */}
      {step === 'result' && (
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 space-y-3 animate-fadeIn border-2 border-green-400">
          <div className="flex items-center justify-center gap-2">
            <Check className="w-6 h-6 text-green-500" />
            <p className="text-green-700 dark:text-green-300 font-bold text-lg">
              ¡Correcto!
            </p>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold">
              <span className="text-orange-600 dark:text-orange-400">{num1}/{denom1}</span>
              <span className="text-gray-400 mx-2">+</span>
              <span className="text-blue-600 dark:text-blue-400">{num2}/{denom2}</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-green-600 dark:text-green-400">{sumNum}/{correctLCD}</span>
              {simplifiedNum !== sumNum && (
                <>
                  <span className="text-gray-400 mx-2">=</span>
                  <span className="text-purple-600 dark:text-purple-400">{simplifiedNum}/{simplifiedDenom}</span>
                </>
              )}
            </div>
            {simplifiedNum !== sumNum && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                (Simplificado)
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={onSolve}
              className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
            >
              <span>Siguiente</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);

  const problems: Problem[] = [
    { num1: 1, denom1: 2, num2: 1, denom2: 4 }, // Easy: one divides the other
    { num1: 1, denom1: 3, num2: 1, denom2: 4 }, // Medium: MCM = 12
    { num1: 2, denom1: 3, num2: 3, denom2: 4 }, // Harder: larger numerators
  ];

  if (!isActive) return null;

  if (currentProblem >= problems.length) {
    // Completion screen
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Práctica: Suma
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Completaste la práctica!
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Check className="w-8 h-8 text-green-500" />
            <p className="text-xl font-bold text-green-700 dark:text-green-300">
              ¡Excelente trabajo!
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Ya dominas la suma de fracciones con distinto denominador.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-center">
            Recuerda el proceso:
          </h4>
          <ol className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
            <li>1. Encuentra el MCM de los denominadores</li>
            <li>2. Convierte cada fracción al denominador común</li>
            <li>3. Suma los numeradores</li>
            <li>4. Simplifica si es posible</li>
          </ol>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica: Suma
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Problema {currentProblem + 1} de {problems.length}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {problems.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i < currentProblem
                ? 'bg-green-500'
                : i === currentProblem
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600',
            )}
          />
        ))}
      </div>

      <AdditionProblem
        key={currentProblem}
        problem={problems[currentProblem]}
        onSolve={() => setCurrentProblem(prev => prev + 1)}
      />

      {/* Hint */}
      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 border border-amber-200 dark:border-amber-700">
        <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
          <strong>Pista:</strong> Sigue los pasos en orden. ¡No te apresures!
        </p>
      </div>
    </div>
  );
}
