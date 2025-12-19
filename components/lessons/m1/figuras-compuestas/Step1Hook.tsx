'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingCalculation, setShowingCalculation] = useState(false);

  // L-shaped room: 8x6 rectangle minus 3x4 corner = 48 - 12 = 36 m²
  // Or: 8x2 + 5x4 = 16 + 20 = 36 m²
  const correctAnswer = 1; // Index for "36 m²"

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Habitación en Forma de L
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un desafío de pisos y figuras...
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Tu amigo quiere poner <strong>piso nuevo en su habitación</strong>,
              pero tiene una forma irregular.
            </p>

            {/* L-shaped room visualization */}
            <div className="flex justify-center py-4">
              <svg viewBox="0 0 280 200" className="w-72 h-52">
                {/* Background */}
                <rect x="0" y="0" width="280" height="200" fill="#f0f9ff" rx="8" />

                {/* L-shaped room: 8m x 6m external, 3m x 4m corner cut */}
                <path
                  d="M 40 30 L 200 30 L 200 70 L 140 70 L 140 150 L 40 150 Z"
                  fill="#bfdbfe"
                  stroke="#1d4ed8"
                  strokeWidth="3"
                />

                {/* Grid pattern inside */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#93c5fd" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <path
                  d="M 40 30 L 200 30 L 200 70 L 140 70 L 140 150 L 40 150 Z"
                  fill="url(#grid)"
                />

                {/* Dimension labels */}
                {/* Top width: 8m */}
                <line x1="40" y1="20" x2="200" y2="20" stroke="#1f2937" strokeWidth="1" />
                <line x1="40" y1="15" x2="40" y2="25" stroke="#1f2937" strokeWidth="1" />
                <line x1="200" y1="15" x2="200" y2="25" stroke="#1f2937" strokeWidth="1" />
                <text x="120" y="14" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">8 m</text>

                {/* Right height (top part): 2m */}
                <line x1="210" y1="30" x2="210" y2="70" stroke="#1f2937" strokeWidth="1" />
                <line x1="205" y1="30" x2="215" y2="30" stroke="#1f2937" strokeWidth="1" />
                <line x1="205" y1="70" x2="215" y2="70" stroke="#1f2937" strokeWidth="1" />
                <text x="230" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">2 m</text>

                {/* Bottom width: 5m */}
                <line x1="40" y1="160" x2="140" y2="160" stroke="#1f2937" strokeWidth="1" />
                <line x1="40" y1="155" x2="40" y2="165" stroke="#1f2937" strokeWidth="1" />
                <line x1="140" y1="155" x2="140" y2="165" stroke="#1f2937" strokeWidth="1" />
                <text x="90" y="175" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">5 m</text>

                {/* Left height: 6m */}
                <line x1="30" y1="30" x2="30" y2="150" stroke="#1f2937" strokeWidth="1" />
                <line x1="25" y1="30" x2="35" y2="30" stroke="#1f2937" strokeWidth="1" />
                <line x1="25" y1="150" x2="35" y2="150" stroke="#1f2937" strokeWidth="1" />
                <text x="18" y="95" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937" transform="rotate(-90, 18, 95)">6 m</text>

                {/* Inner step dimensions: 3m x 4m */}
                <text x="170" y="85" textAnchor="middle" fontSize="11" fill="#6b7280">3 m</text>
                <text x="155" y="115" textAnchor="middle" fontSize="11" fill="#6b7280" transform="rotate(-90, 155, 115)">4 m</text>
              </svg>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Te pregunta:
            </p>

            <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 border-2 border-blue-300 dark:border-blue-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Home className="w-6 h-6 text-blue-700 dark:text-blue-300" />
              </div>
              <p className="text-blue-800 dark:text-blue-200 font-semibold text-lg">
                &ldquo;¿Cuántos metros cuadrados de piso necesito comprar?&rdquo;
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Para responder, necesitas calcular el <strong>área</strong> de esta figura irregular.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Vamos a calcularlo</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    const handleSubmit = () => {
      if (selectedAnswer === null) return;
      setShowingCalculation(true);
      setTimeout(() => {
        setPhase('result');
      }, 1500);
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Habitación en Forma de L
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuánta área tiene la habitación?
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Pista:</strong> Puedes dividir la figura en partes más simples
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                O restar la esquina que falta de un rectángulo completo
              </p>
            </div>
          </div>
        </div>

        {/* Visual with decomposition hints */}
        <div className="flex justify-center py-2">
          <svg viewBox="0 0 280 180" className="w-72 h-48">
            {/* L-shaped room: 8m x 6m external, 3m x 4m corner cut */}
            <path
              d="M 40 20 L 200 20 L 200 60 L 140 60 L 140 140 L 40 140 Z"
              fill={showingCalculation ? '#86efac' : '#bfdbfe'}
              stroke="#1d4ed8"
              strokeWidth="3"
              className="transition-all duration-500"
            />

            {/* Show decomposition when calculating */}
            {showingCalculation && (
              <>
                {/* Horizontal dividing line */}
                <line
                  x1="40"
                  y1="60"
                  x2="200"
                  y2="60"
                  stroke="#dc2626"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                {/* Labels for two rectangles */}
                <text x="120" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
                  8×2 = 16
                </text>
                <text x="90" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
                  5×4 = 20
                </text>
              </>
            )}

            {/* Dimension labels */}
            <text x="120" y="12" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1f2937">8 m</text>
            <text x="220" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1f2937">2 m</text>
            <text x="90" y="158" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1f2937">5 m</text>
            <text x="25" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1f2937" transform="rotate(-90, 25, 85)">6 m</text>
            {/* Inner notch dimensions */}
            <text x="170" y="75" textAnchor="middle" fontSize="10" fill="#6b7280">3 m</text>
            <text x="155" y="105" textAnchor="middle" fontSize="10" fill="#6b7280" transform="rotate(-90, 155, 105)">4 m</text>
          </svg>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '32 m²', value: 0 },
            { label: '36 m²', value: 1 },
            { label: '48 m²', value: 2 },
            { label: '64 m²', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={showingCalculation}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2',
                selectedAnswer === option.value
                  ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null || showingCalculation}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null && !showingCalculation
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            {showingCalculation ? 'Calculando...' : 'Verificar'}
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: RESULT ============
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Habitación en Forma de L
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¡Veamos la respuesta!
        </p>
      </div>

      {/* Answer feedback */}
      <div
        className={cn(
          'p-5 rounded-xl border-2',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
        )}
      >
        <div className="flex items-start gap-4">
          {isCorrect ? (
            <Check className="w-7 h-7 text-green-600 flex-shrink-0" />
          ) : (
            <X className="w-7 h-7 text-amber-600 flex-shrink-0" />
          )}
          <div>
            <h3 className={cn(
              'font-bold text-lg mb-1',
              isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {isCorrect ? '¡Correcto!' : '¡Casi!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              El área de la habitación es <strong>36 m²</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Calculation breakdown - Two methods */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Dos formas de calcularlo:
        </h4>

        {/* Method 1: Add rectangles */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Método 1: Sumar rectángulos</p>
          <div className="flex justify-center mb-2">
            <svg viewBox="0 0 200 115" className="w-52 h-32">
              {/* Rectangle A (top strip): 8m x 2m */}
              <rect x="20" y="15" width="120" height="30" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
              <text x="80" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">A</text>
              {/* A dimensions */}
              <text x="80" y="10" textAnchor="middle" fontSize="9" fill="#1e40af">8 m</text>
              <text x="145" y="33" textAnchor="start" fontSize="9" fill="#1e40af">2 m</text>

              {/* Rectangle B (bottom left): 5m x 4m */}
              <rect x="20" y="45" width="75" height="55" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
              <text x="57" y="77" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5b21b6">B</text>
              {/* B dimensions */}
              <text x="57" y="108" textAnchor="middle" fontSize="9" fill="#5b21b6">5 m</text>
              <text x="10" y="77" textAnchor="middle" fontSize="9" fill="#5b21b6" transform="rotate(-90, 10, 77)">4 m</text>

              {/* Plus sign */}
              <text x="165" y="55" fontSize="20" fill="#1f2937">+</text>
            </svg>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="text-blue-600 font-semibold">A:</span> 8 × 2 = 16 m²
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="text-purple-600 font-semibold">B:</span> 5 × 4 = 20 m²
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-bold">
              Total: 16 + 20 = <span className="text-green-600">36 m²</span>
            </p>
          </div>
        </div>

        {/* Method 2: Subtract */}
        <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
          <p className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Método 2: Restar la esquina</p>
          <div className="flex justify-center mb-2">
            <svg viewBox="0 0 200 115" className="w-52 h-32">
              {/* Full rectangle 8x6 */}
              <rect x="20" y="15" width="120" height="75" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
              {/* Full rectangle dimensions */}
              <text x="80" y="10" textAnchor="middle" fontSize="9" fill="#ea580c">8 m</text>
              <text x="10" y="55" textAnchor="middle" fontSize="9" fill="#ea580c" transform="rotate(-90, 10, 55)">6 m</text>

              {/* Corner to subtract 3x4 */}
              <rect x="95" y="40" width="45" height="50" fill="#fecaca" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,4" />
              <text x="117" y="70" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">quitar</text>
              {/* Corner dimensions */}
              <text x="117" y="100" textAnchor="middle" fontSize="9" fill="#dc2626">3 m</text>
              <text x="145" y="67" textAnchor="start" fontSize="9" fill="#dc2626">4 m</text>

              {/* Minus sign */}
              <text x="165" y="55" fontSize="20" fill="#1f2937">−</text>
            </svg>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="text-orange-600 font-semibold">Rectángulo completo:</span> 8 × 6 = 48 m²
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="text-red-600 font-semibold">Esquina:</span> 3 × 4 = 12 m²
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-bold">
              Total: 48 − 12 = <span className="text-green-600">36 m²</span>
            </p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
          <strong>Figuras compuestas:</strong> Puedes descomponerlas en figuras simples
        </p>
        <p className="text-purple-700 dark:text-purple-300 mt-2 text-sm text-center">
          En esta lección aprenderás estrategias para calcular áreas de cualquier figura irregular.
        </p>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
