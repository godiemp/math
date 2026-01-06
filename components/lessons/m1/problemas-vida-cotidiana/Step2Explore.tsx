'use client';

import { useState } from 'react';
import { ArrowRight, Wallet, Thermometer, UtensilsCrossed, MapPin, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ProblemType {
  id: string;
  icon: React.ReactNode;
  name: string;
  emoji: string;
  color: string;
  darkColor: string;
  example: string;
  operations: string[];
}

const PROBLEM_TYPES: ProblemType[] = [
  {
    id: 'money',
    icon: <Wallet className="w-6 h-6" />,
    name: 'Dinero',
    emoji: '💰',
    color: 'bg-green-100 border-green-300 text-green-800',
    darkColor: 'dark:bg-green-900/30 dark:border-green-700 dark:text-green-200',
    example: 'Calcular vuelto, precios totales, ahorros',
    operations: ['Suma', 'Resta', 'Multiplicación'],
  },
  {
    id: 'temperature',
    icon: <Thermometer className="w-6 h-6" />,
    name: 'Temperatura',
    emoji: '🌡️',
    color: 'bg-blue-100 border-blue-300 text-blue-800',
    darkColor: 'dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200',
    example: 'Cambios de temperatura, diferencias, bajo cero',
    operations: ['Suma', 'Resta con negativos'],
  },
  {
    id: 'recipes',
    icon: <UtensilsCrossed className="w-6 h-6" />,
    name: 'Recetas',
    emoji: '🍳',
    color: 'bg-orange-100 border-orange-300 text-orange-800',
    darkColor: 'dark:bg-orange-900/30 dark:border-orange-700 dark:text-orange-200',
    example: 'Ajustar ingredientes, fracciones de porciones',
    operations: ['Fracciones', 'Multiplicación', 'División'],
  },
  {
    id: 'distance',
    icon: <MapPin className="w-6 h-6" />,
    name: 'Distancia y Tiempo',
    emoji: '🚗',
    color: 'bg-purple-100 border-purple-300 text-purple-800',
    darkColor: 'dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-200',
    example: 'Viajes, velocidad, tiempo de llegada',
    operations: ['División', 'Multiplicación', 'Suma'],
  },
];

interface Problem {
  id: string;
  text: string;
  correctType: string;
  hint: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    text: 'En la mañana había 8°C y en la noche bajó a -3°C. ¿Cuántos grados bajó la temperatura?',
    correctType: 'temperature',
    hint: 'Busca palabras como "grados", "temperatura", "bajo cero"',
  },
  {
    id: 'p2',
    text: 'Una receta para 4 personas necesita 2/3 de taza de harina. ¿Cuánta harina necesitas para 6 personas?',
    correctType: 'recipes',
    hint: 'Busca palabras como "receta", "porciones", "ingredientes"',
  },
  {
    id: 'p3',
    text: 'Juan tiene $15.000 y quiere comprar 3 cuadernos de $2.500 cada uno. ¿Cuánto le sobra?',
    correctType: 'money',
    hint: 'Busca símbolos de dinero ($) o palabras como "precio", "costo", "vuelto"',
  },
  {
    id: 'p4',
    text: 'Un auto viaja a 80 km/h. ¿Cuánto tardará en recorrer 200 km?',
    correctType: 'distance',
    hint: 'Busca palabras como "km", "velocidad", "distancia", "tiempo"',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const problem = PROBLEMS[currentProblem];
  const isCorrect = selectedType === problem?.correctType;
  const allCompleted = completedProblems.length === PROBLEMS.length;

  const handleSelect = (typeId: string) => {
    if (showFeedback) return;
    setSelectedType(typeId);
  };

  const handleCheck = () => {
    if (selectedType === null) return;
    setShowFeedback(true);

    if (isCorrect && !completedProblems.includes(problem.id)) {
      setCompletedProblems([...completedProblems, problem.id]);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedType(null);
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tipos de Problemas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aprende a identificar qué tipo de problema estás resolviendo
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {PROBLEMS.map((p, i) => (
          <div
            key={p.id}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all',
              completedProblems.includes(p.id)
                ? 'bg-green-500 text-white'
                : i === currentProblem
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            )}
          >
            {completedProblems.includes(p.id) ? <Check size={16} /> : i + 1}
          </div>
        ))}
      </div>

      {!allCompleted ? (
        <>
          {/* Problem Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              {problem.text}
            </p>
          </div>

          {/* Hint toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showHint ? 'Ocultar pista' : '¿Necesitas una pista?'}
            </button>
            {showHint && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                💡 {problem.hint}
              </p>
            )}
          </div>

          {/* Type options */}
          <div className="grid grid-cols-2 gap-3">
            {PROBLEM_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-left',
                  showFeedback && type.id === problem.correctType
                    ? 'bg-green-100 dark:bg-green-900/40 border-green-500 ring-2 ring-green-500'
                    : showFeedback && selectedType === type.id && !isCorrect
                    ? 'bg-red-100 dark:bg-red-900/40 border-red-500'
                    : selectedType === type.id
                    ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-500 scale-[1.02]'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{type.emoji}</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{type.name}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{type.example}</p>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl border-2 animate-fadeIn',
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
              )}
            >
              <p className={cn(
                'font-semibold',
                isCorrect ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'
              )}>
                {isCorrect ? '¡Correcto!' : '¡Casi!'}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {isCorrect
                  ? `Este es un problema de ${PROBLEM_TYPES.find(t => t.id === problem.correctType)?.name.toLowerCase()}.`
                  : `La respuesta correcta es ${PROBLEM_TYPES.find(t => t.id === problem.correctType)?.name}.`
                }
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Operaciones involucradas: {PROBLEM_TYPES.find(t => t.id === problem.correctType)?.operations.join(', ')}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedType === null}
                className={cn(
                  'px-6 py-3 rounded-xl font-semibold transition-all',
                  selectedType !== null
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 shadow-lg transition-all"
              >
                <span>Siguiente</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </>
      ) : (
        /* Completion screen */
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
              ¡Excelente trabajo!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Has identificado correctamente los 4 tipos de problemas.
            </p>
          </div>

          {/* Summary of types */}
          <div className="grid grid-cols-2 gap-3">
            {PROBLEM_TYPES.map((type) => (
              <div
                key={type.id}
                className={cn(
                  'p-4 rounded-xl border-2',
                  type.color,
                  type.darkColor
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{type.emoji}</span>
                  <span className="font-semibold">{type.name}</span>
                </div>
                <p className="text-xs opacity-80">{type.operations.join(' • ')}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
