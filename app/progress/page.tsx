'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QuestionAttempt } from '@/lib/types';

interface Progress {
  correct: number;
  total: number;
}

export default function ProgressPage() {
  const [m1Progress, setM1Progress] = useState<Progress>({ correct: 0, total: 0 });
  const [m2Progress, setM2Progress] = useState<Progress>({ correct: 0, total: 0 });
  const [m1History, setM1History] = useState<QuestionAttempt[]>([]);
  const [m2History, setM2History] = useState<QuestionAttempt[]>([]);
  const [recentQuestionsCount, setRecentQuestionsCount] = useState<number>(10);
  const [selectedAttempt, setSelectedAttempt] = useState<QuestionAttempt | null>(null);

  useEffect(() => {
    // Load progress from localStorage
    const m1Data = localStorage.getItem('paes-progress-M1');
    const m2Data = localStorage.getItem('paes-progress-M2');

    if (m1Data) {
      setM1Progress(JSON.parse(m1Data));
    }
    if (m2Data) {
      setM2Progress(JSON.parse(m2Data));
    }

    // Load question history
    const m1HistoryData = localStorage.getItem('paes-history-M1');
    const m2HistoryData = localStorage.getItem('paes-history-M2');

    if (m1HistoryData) {
      setM1History(JSON.parse(m1HistoryData));
    }
    if (m2HistoryData) {
      setM2History(JSON.parse(m2HistoryData));
    }
  }, []);

  const calculatePercentage = (progress: Progress) => {
    if (progress.total === 0) return 0;
    return Math.round((progress.correct / progress.total) * 100);
  };

  const calculateRecentStats = (history: QuestionAttempt[], count: number) => {
    const recentAttempts = history.slice(0, count);
    const correct = recentAttempts.filter(a => a.isCorrect).length;
    const total = recentAttempts.length;
    return { correct, total };
  };

  const allHistory = [...m1History, ...m2History].sort((a, b) => b.timestamp - a.timestamp);
  const recentHistory = allHistory.slice(0, 50); // Show up to 50 recent questions in history

  // Calculate recent stats for each level based on selected count
  const m1RecentStats = calculateRecentStats(m1History, recentQuestionsCount);
  const m2RecentStats = calculateRecentStats(m2History, recentQuestionsCount);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Media';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            ← Volver al Inicio
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Mi Progreso
          </h1>
          <div className="flex items-center gap-3">
            <label htmlFor="recent-count" className="text-sm text-gray-600 dark:text-gray-400">
              Mostrar últimas:
            </label>
            <select
              id="recent-count"
              value={recentQuestionsCount}
              onChange={(e) => setRecentQuestionsCount(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value={5}>5 preguntas</option>
              <option value={10}>10 preguntas</option>
              <option value={20}>20 preguntas</option>
              <option value={50}>50 preguntas</option>
            </select>
          </div>
        </div>

        {/* Level Progress Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Competencia Matemática M1
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Últimas {recentQuestionsCount} preguntas</span>
                <span>{m1RecentStats.total > 0 ? calculatePercentage(m1RecentStats) : 0}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-indigo-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${m1RecentStats.total > 0 ? calculatePercentage(m1RecentStats) : 0}%` }}
                />
              </div>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p className="text-3xl font-bold text-center">
                {m1RecentStats.correct}/{m1RecentStats.total}
              </p>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Respuestas correctas en las últimas {m1RecentStats.total} preguntas
              </p>
            </div>
            <Link
              href="/practice/m1"
              className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Continuar Práctica
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Competencia Matemática M2
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Últimas {recentQuestionsCount} preguntas</span>
                <span>{m2RecentStats.total > 0 ? calculatePercentage(m2RecentStats) : 0}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-indigo-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${m2RecentStats.total > 0 ? calculatePercentage(m2RecentStats) : 0}%` }}
                />
              </div>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p className="text-3xl font-bold text-center">
                {m2RecentStats.correct}/{m2RecentStats.total}
              </p>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Respuestas correctas en las últimas {m2RecentStats.total} preguntas
              </p>
            </div>
            <Link
              href="/practice/m2"
              className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Continuar Práctica
            </Link>
          </div>
        </div>

        {/* Recent Questions History */}
        {recentHistory.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Historial de Preguntas Recientes
            </h2>
            <div className="space-y-3">
              {recentHistory.map((attempt, index) => (
                <div
                  key={`${attempt.questionId}-${attempt.timestamp}`}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    attempt.isCorrect
                      ? 'border-green-300 bg-green-50 dark:bg-green-900/20 hover:border-green-400'
                      : 'border-red-300 bg-red-50 dark:bg-red-900/20 hover:border-red-400'
                  }`}
                  onClick={() => setSelectedAttempt(attempt)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          attempt.level === 'M1'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}>
                          {attempt.level}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(attempt.difficulty)}`}>
                          {getDifficultyLabel(attempt.difficulty)}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {attempt.topic}
                        </span>
                      </div>
                      <p className="text-gray-900 dark:text-white font-medium mb-1">
                        {attempt.question}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(attempt.timestamp)}
                      </p>
                    </div>
                    <div className="ml-4">
                      {attempt.isCorrect ? (
                        <span className="text-2xl text-green-600">✓</span>
                      ) : (
                        <span className="text-2xl text-red-600">✗</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {allHistory.length === 0 && (
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-800 dark:text-yellow-200">
              Aún no has comenzado a practicar. ¡Empieza ahora con M1 o M2!
            </p>
          </div>
        )}

        {/* Review Modal */}
        {selectedAttempt && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedAttempt(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Revisar Pregunta
                </h3>
                <button
                  onClick={() => setSelectedAttempt(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4 flex gap-2">
                <span className={`px-3 py-1 rounded text-sm font-semibold ${
                  selectedAttempt.level === 'M1'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                }`}>
                  {selectedAttempt.level}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-semibold ${getDifficultyColor(selectedAttempt.difficulty)}`}>
                  {getDifficultyLabel(selectedAttempt.difficulty)}
                </span>
                <span className="px-3 py-1 rounded text-sm font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {selectedAttempt.topic}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {selectedAttempt.question}
                </h4>
                <div className="space-y-3">
                  {selectedAttempt.options.map((option, index) => {
                    const isUserAnswer = index === selectedAttempt.userAnswer;
                    const isCorrectAnswer = index === selectedAttempt.correctAnswer;

                    let className = 'p-4 rounded-lg border-2 ';
                    if (isCorrectAnswer) {
                      className += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100';
                    } else if (isUserAnswer && !isCorrectAnswer) {
                      className += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100';
                    } else {
                      className += 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300';
                    }

                    return (
                      <div key={index} className={className}>
                        <span className="font-semibold mr-2">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                        {isCorrectAnswer && <span className="float-right">✓ Correcta</span>}
                        {isUserAnswer && !isCorrectAnswer && <span className="float-right">✗ Tu respuesta</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Explicación:
                </h4>
                <p className="text-blue-800 dark:text-blue-200">
                  {selectedAttempt.explanation}
                </p>
              </div>

              <div className={`p-4 rounded-lg ${
                selectedAttempt.isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
              }`}>
                <p className="font-semibold text-center">
                  {selectedAttempt.isCorrect
                    ? '¡Respuesta Correcta! 🎉'
                    : 'Respuesta Incorrecta'}
                </p>
                <p className="text-sm text-center mt-1">
                  Respondida el {formatDate(selectedAttempt.timestamp)}
                </p>
              </div>

              <button
                onClick={() => setSelectedAttempt(null)}
                className="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
