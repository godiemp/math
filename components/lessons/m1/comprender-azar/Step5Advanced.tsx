'use client';

import { useState } from 'react';
import { ArrowRight, Check, Cloud, Factory, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Scenario = 'weather' | 'quality' | 'polling';

interface ScenarioData {
  id: Scenario;
  title: string;
  icon: React.ReactNode;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  visual: React.ReactNode;
}

const SCENARIOS: ScenarioData[] = [
  {
    id: 'weather',
    title: 'Pronostico del Tiempo',
    icon: <Cloud className="w-6 h-6" />,
    question: 'El pronostico dice "70% de probabilidad de lluvia". ¿Que significa esto?',
    options: [
      'Llovera en el 70% del area',
      'Llovera el 70% del dia',
      'En 100 dias con condiciones similares, llueve en ~70',
      'Es imposible saberlo',
    ],
    correctAnswer: 2,
    explanation: 'Un 70% de probabilidad significa que, historicamente, en condiciones similares, llueve aproximadamente 70 de cada 100 veces.',
    visual: (
      <div className="grid grid-cols-10 gap-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full',
              i < 70 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>
    ),
  },
  {
    id: 'quality',
    title: 'Control de Calidad',
    icon: <Factory className="w-6 h-6" />,
    question: 'Una fabrica produce 1% de productos defectuosos. Si revisas 10 productos y encuentras 0 defectuosos, ¿que puedes concluir?',
    options: [
      'La fabrica tiene 0% de defectos',
      'La muestra es muy pequena para concluir',
      'El 1% era incorrecto',
      'Todos los productos son perfectos',
    ],
    correctAnswer: 1,
    explanation: '¡La muestra es muy pequeña! Con 1% de defectos, necesitarias revisar cientos de productos para tener una estimacion confiable.',
    visual: (
      <div className="flex flex-col items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-green-600" />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          10 de 10 buenos... pero ¿y los otros 990?
        </p>
      </div>
    ),
  },
  {
    id: 'polling',
    title: 'Encuestas y Sondeos',
    icon: <BarChart3 className="w-6 h-6" />,
    question: 'Una encuesta a 1,000 personas muestra 52% de apoyo con margen de error ±3%. ¿Que significa?',
    options: [
      'El apoyo real es exactamente 52%',
      'El apoyo real esta probablemente entre 49% y 55%',
      'La encuesta es incorrecta',
      'Necesitan mas datos',
    ],
    correctAnswer: 1,
    explanation: 'El margen de error viene de la variabilidad del muestreo. Con 95% de confianza, el valor real esta en el rango 52% ± 3%.',
    visual: (
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="relative h-8 flex items-center">
          <div className="absolute left-0 right-0 h-2 bg-gray-200 dark:bg-gray-600 rounded-full" />
          <div
            className="absolute h-2 bg-blue-500 rounded-full"
            style={{ left: '46%', right: '42%' }}
          />
          <div
            className="absolute w-1 h-4 bg-blue-700 rounded"
            style={{ left: '51%' }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>49%</span>
          <span className="text-blue-600 font-bold">52%</span>
          <span>55%</span>
        </div>
      </div>
    ),
  },
];

export default function Step5Advanced({ onComplete, isActive }: LessonStepProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<Scenario[]>([]);

  if (!isActive) return null;

  const scenario = SCENARIOS[currentScenario];
  const isCorrect = selectedAnswer === scenario.correctAnswer;
  const allComplete = completedScenarios.length === SCENARIOS.length;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (!completedScenarios.includes(scenario.id)) {
      setCompletedScenarios([...completedScenarios, scenario.id]);
    }
  };

  const handleNext = () => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Azar en el Mundo Real
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplicaciones practicas de la probabilidad
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-3">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              if (completedScenarios.includes(s.id) || i === currentScenario) {
                setCurrentScenario(i);
                setSelectedAnswer(null);
                setShowFeedback(false);
              }
            }}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
              i === currentScenario
                ? 'bg-purple-500 text-white shadow-md'
                : completedScenarios.includes(s.id)
                ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
            )}
          >
            {s.icon}
            {completedScenarios.includes(s.id) && i !== currentScenario && (
              <Check size={16} className="text-green-500" />
            )}
          </button>
        ))}
      </div>

      {/* Scenario card */}
      <motion.div
        key={scenario.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
          <div className="flex items-center gap-3">
            {scenario.icon}
            <h3 className="text-xl font-bold">{scenario.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Visual */}
          <div className="flex justify-center">
            {scenario.visual}
          </div>

          {/* Question */}
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            {scenario.question}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {scenario.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && setSelectedAnswer(index)}
                disabled={showFeedback}
                className={cn(
                  'w-full p-4 rounded-xl font-medium transition-all text-left flex items-center gap-3',
                  showFeedback && index === scenario.correctAnswer
                    ? 'bg-green-100 dark:bg-green-900/50 border-2 border-green-500 text-green-800 dark:text-green-200'
                    : showFeedback && selectedAnswer === index && index !== scenario.correctAnswer
                    ? 'bg-red-100 dark:bg-red-900/50 border-2 border-red-500 text-red-800 dark:text-red-200'
                    : selectedAnswer === index
                    ? 'bg-purple-100 dark:bg-purple-900/50 border-2 border-purple-500 text-purple-800 dark:text-purple-200'
                    : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                )}
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 text-sm font-bold flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'p-4 rounded-xl',
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                  : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
              )}
            >
              <h4 className={cn(
                'font-bold mb-1',
                isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}>
                {isCorrect ? '¡Correcto!' : '¡Casi!'}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {scenario.explanation}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : currentScenario < SCENARIOS.length - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Siguiente escenario</span>
            <ArrowRight size={20} />
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg"
          >
            <span>Ir al checkpoint final</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>

      {/* Summary */}
      {allComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700"
        >
          <p className="text-blue-800 dark:text-blue-200 text-center">
            ¡Excelente! Has explorado como el azar y la probabilidad se aplican en <strong>pronosticos</strong>,
            {' '}<strong>control de calidad</strong> y <strong>encuestas</strong>.
          </p>
        </motion.div>
      )}
    </div>
  );
}
