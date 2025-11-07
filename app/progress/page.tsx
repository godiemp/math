'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Progress {
  correct: number;
  total: number;
}

export default function ProgressPage() {
  const [m1Progress, setM1Progress] = useState<Progress>({ correct: 0, total: 0 });
  const [m2Progress, setM2Progress] = useState<Progress>({ correct: 0, total: 0 });

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
  }, []);

  const calculatePercentage = (progress: Progress) => {
    if (progress.total === 0) return 0;
    return Math.round((progress.correct / progress.total) * 100);
  };

  const totalProgress = {
    correct: m1Progress.correct + m2Progress.correct,
    total: m1Progress.total + m2Progress.total
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Mi Progreso
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Resumen General
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {totalProgress.total}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Preguntas Respondidas
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {totalProgress.correct}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Respuestas Correctas
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {calculatePercentage(totalProgress)}%
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Tasa de Acierto
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Competencia Matemática M1
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Progreso</span>
                <span>{calculatePercentage(m1Progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-indigo-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${calculatePercentage(m1Progress)}%` }}
                />
              </div>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>Preguntas respondidas: {m1Progress.total}</p>
              <p>Respuestas correctas: {m1Progress.correct}</p>
              <p>Respuestas incorrectas: {m1Progress.total - m1Progress.correct}</p>
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
                <span>Progreso</span>
                <span>{calculatePercentage(m2Progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-indigo-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${calculatePercentage(m2Progress)}%` }}
                />
              </div>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>Preguntas respondidas: {m2Progress.total}</p>
              <p>Respuestas correctas: {m2Progress.correct}</p>
              <p>Respuestas incorrectas: {m2Progress.total - m2Progress.correct}</p>
            </div>
            <Link
              href="/practice/m2"
              className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Continuar Práctica
            </Link>
          </div>
        </div>

        {totalProgress.total === 0 && (
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-800 dark:text-yellow-200">
              Aún no has comenzado a practicar. ¡Empieza ahora con M1 o M2!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
