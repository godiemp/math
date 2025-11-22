'use client';

import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

interface QuickNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  myAnswers: (number | null)[];
  onNavigate: (questionIndex: number) => void;
}

type TabType = 'jump' | 'overview' | 'progress';

export default function QuickNavigation({
  currentQuestion,
  totalQuestions,
  myAnswers,
  onNavigate,
}: QuickNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('jump');
  const [jumpValue, setJumpValue] = useState('');

  const answeredCount = myAnswers.filter(a => a !== null).length;
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const questionNum = parseInt(jumpValue);
    if (questionNum >= 1 && questionNum <= totalQuestions) {
      onNavigate(questionNum - 1);
      setJumpValue('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 group"
      >
        <span className="text-sm font-medium">
          P {currentQuestion + 1}/{totalQuestions}
        </span>
        <span className="text-xs opacity-80">
          {answeredCount} ✓
        </span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Navegación Rápida
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          <button
            onClick={() => setActiveTab('jump')}
            className={`px-4 py-3 text-sm font-medium transition-colors outline-none relative ${
              activeTab === 'jump'
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Saltar
            {activeTab === 'jump' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium transition-colors outline-none relative ${
              activeTab === 'overview'
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Vista General
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-3 text-sm font-medium transition-colors outline-none relative ${
              activeTab === 'progress'
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Progreso
            {activeTab === 'progress' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Jump Tab */}
          {activeTab === 'jump' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ingresa el número de pregunta a la que deseas ir:
              </p>
              <form onSubmit={handleJump} className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max={totalQuestions}
                  value={jumpValue}
                  onChange={(e) => setJumpValue(e.target.value)}
                  placeholder={`1 - ${totalQuestions}`}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Ir
                </button>
              </form>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Pregunta actual:</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {currentQuestion + 1}
                </span>
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Haz clic en cualquier pregunta para navegar:
              </p>
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 max-h-96 overflow-y-auto">
                {Array.from({ length: totalQuestions }, (_, i) => {
                  const isAnswered = myAnswers[i] !== null;
                  const isCurrent = i === currentQuestion;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        onNavigate(i);
                        setIsOpen(false);
                      }}
                      className={`
                        aspect-square rounded-lg text-sm font-medium transition-all
                        ${isCurrent
                          ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800'
                          : ''
                        }
                        ${isAnswered
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }
                      `}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded bg-indigo-600"></div>
                  <span className="text-gray-600 dark:text-gray-400">Respondida</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <span className="text-gray-600 dark:text-gray-400">Sin responder</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded bg-gray-400 ring-2 ring-indigo-500"></div>
                  <span className="text-gray-600 dark:text-gray-400">Actual</span>
                </div>
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Progreso general
                  </span>
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {answeredCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Respondidas
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                    {totalQuestions - answeredCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Sin responder
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                    Total de preguntas
                  </span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {totalQuestions}
                  </span>
                </div>
              </div>

              {totalQuestions - answeredCount > 0 && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Nota:</strong> Asegúrate de responder todas las preguntas antes de
                    finalizar la sesión.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
