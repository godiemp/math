'use client';

import { useState } from 'react';
import Quiz from '@/components/Quiz';
import { getQuestionsByLevel } from '@/lib/questions';
import Link from 'next/link';

type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';

export default function M1Practice() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | undefined>(undefined);
  const [timerMode, setTimerMode] = useState<'timed' | 'untimed' | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const questions = getQuestionsByLevel('M1');

  const subjects: { value: Subject | undefined; label: string; emoji: string; description: string }[] = [
    { value: undefined, label: 'Todas las Materias', emoji: '📚', description: 'Practica con todas las materias mezcladas' },
    { value: 'números', label: 'Números', emoji: '🔢', description: 'Números y Proporcionalidad' },
    { value: 'álgebra', label: 'Álgebra', emoji: '📐', description: 'Álgebra y Funciones' },
    { value: 'geometría', label: 'Geometría', emoji: '📏', description: 'Geometría' },
    { value: 'probabilidad', label: 'Probabilidad', emoji: '🎲', description: 'Probabilidad y Estadística' },
  ];

  const handleStartQuiz = () => {
    if (timerMode) {
      setQuizStarted(true);
    }
  };

  const handleResetSelection = () => {
    setQuizStarted(false);
    setSelectedSubject(undefined);
    setTimerMode(null);
  };

  // Step 1: Subject Selection
  const renderSubjectSelection = () => (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Paso 1: Selecciona una materia
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Elige el área que quieres practicar
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.label}
            onClick={() => {
              setSelectedSubject(subject.value);
              setTimerMode(null); // Reset timer mode when changing subject
            }}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              selectedSubject === subject.value
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg transform scale-105'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{subject.emoji}</div>
              <div className="flex-1">
                <div className={`font-bold text-lg mb-1 ${
                  selectedSubject === subject.value
                    ? 'text-indigo-900 dark:text-indigo-100'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {subject.label}
                </div>
                <div className={`text-sm ${
                  selectedSubject === subject.value
                    ? 'text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {subject.description}
                </div>
              </div>
              {selectedSubject === subject.value && (
                <div className="text-indigo-600 dark:text-indigo-400 text-2xl">✓</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Step 2: Timer Mode Selection
  const renderTimerSelection = () => {
    if (selectedSubject === undefined && timerMode === null) return null;

    return (
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Paso 2: Selecciona el modo de práctica
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          ¿Quieres practicar con o sin tiempo?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setTimerMode('untimed')}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              timerMode === 'untimed'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg transform scale-105'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎯</div>
              <div className="flex-1">
                <div className={`font-bold text-lg mb-1 ${
                  timerMode === 'untimed'
                    ? 'text-indigo-900 dark:text-indigo-100'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  Sin Tiempo
                </div>
                <div className={`text-sm ${
                  timerMode === 'untimed'
                    ? 'text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  Practica a tu propio ritmo, sin presión de tiempo
                </div>
              </div>
              {timerMode === 'untimed' && (
                <div className="text-indigo-600 dark:text-indigo-400 text-2xl">✓</div>
              )}
            </div>
          </button>

          <button
            onClick={() => setTimerMode('timed')}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              timerMode === 'timed'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg transform scale-105'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">⏱️</div>
              <div className="flex-1">
                <div className={`font-bold text-lg mb-1 ${
                  timerMode === 'timed'
                    ? 'text-indigo-900 dark:text-indigo-100'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  Con Tiempo
                </div>
                <div className={`text-sm ${
                  timerMode === 'timed'
                    ? 'text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  Simula el examen real con tiempo limitado (2 minutos por pregunta)
                </div>
              </div>
              {timerMode === 'timed' && (
                <div className="text-indigo-600 dark:text-indigo-400 text-2xl">✓</div>
              )}
            </div>
          </button>
        </div>

        {timerMode && (
          <div className="flex gap-4">
            <button
              onClick={handleResetSelection}
              className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← Cambiar Selección
            </button>
            <button
              onClick={handleStartQuiz}
              className="flex-1 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Comenzar Quiz →
            </button>
          </div>
        )}
      </div>
    );
  };

  // Quiz View
  if (quizStarted && timerMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={handleResetSelection}
              className="text-indigo-600 dark:text-indigo-400 hover:underline inline-block font-semibold"
            >
              ← Nueva Práctica
            </button>
            <Link
              href="/curriculum/m1"
              className="text-indigo-600 dark:text-indigo-400 hover:underline inline-block"
            >
              📚 Ver Curriculum M1
            </Link>
          </div>

          <Quiz
            questions={questions}
            level="M1"
            subject={selectedSubject}
            timerMode={timerMode}
          />
        </div>
      </div>
    );
  }

  // Selection View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <Link
              href="/"
              className="text-indigo-600 dark:text-indigo-400 hover:underline inline-block"
            >
              ← Volver al Inicio
            </Link>
            <Link
              href="/curriculum/m1"
              className="text-indigo-600 dark:text-indigo-400 hover:underline inline-block"
            >
              📚 Ver Curriculum M1
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Práctica PAES - Competencia Matemática M1
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Contenidos básicos de matemática para todos los estudiantes
          </p>
        </div>

        {renderSubjectSelection()}
        {renderTimerSelection()}
      </div>
    </div>
  );
}
