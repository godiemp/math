'use client';

import { useState } from 'react';
import Quiz from '@/components/Quiz';
import { getQuestionsByLevel } from '@/lib/questions';
import Link from 'next/link';

type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';
type QuizMode = 'zen' | 'rapidfire';
type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';

export default function M2Practice() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null | undefined>(undefined);
  const [quizMode, setQuizMode] = useState<QuizMode | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const questions = getQuestionsByLevel('M2');

  const subjects: { value: Subject | null; label: string; emoji: string; description: string }[] = [
    { value: null, label: 'Todas las Materias', emoji: '📚', description: 'Practica con todas las materias mezcladas' },
    { value: 'números', label: 'Números', emoji: '🔢', description: 'Números y Proporcionalidad' },
    { value: 'álgebra', label: 'Álgebra', emoji: '📐', description: 'Álgebra y Funciones' },
    { value: 'geometría', label: 'Geometría', emoji: '📏', description: 'Geometría' },
    { value: 'probabilidad', label: 'Probabilidad', emoji: '🎲', description: 'Probabilidad y Estadística' },
  ];

  const modes: { value: QuizMode; label: string; emoji: string; description: string; details: string }[] = [
    {
      value: 'zen',
      label: 'Modo Zen',
      emoji: '🧘',
      description: 'Práctica sin presión de tiempo',
      details: 'Tómate todo el tiempo que necesites para pensar y aprender'
    },
    {
      value: 'rapidfire',
      label: 'Rapid Fire',
      emoji: '⚡',
      description: 'Desafío contra el reloj',
      details: 'Completa 10 preguntas contra el tiempo - elige tu dificultad'
    }
  ];

  const difficulties: { value: Difficulty; label: string; emoji: string; time: number; description: string }[] = [
    {
      value: 'easy',
      label: 'Fácil',
      emoji: '🟢',
      time: 25,
      description: '25 minutos - 2:30 por pregunta'
    },
    {
      value: 'medium',
      label: 'Normal',
      emoji: '🟡',
      time: 20,
      description: '20 minutos - 2:00 por pregunta'
    },
    {
      value: 'hard',
      label: 'Difícil',
      emoji: '🔴',
      time: 15,
      description: '15 minutos - 1:30 por pregunta'
    },
    {
      value: 'extreme',
      label: 'Extremo',
      emoji: '🟣',
      time: 10,
      description: '10 minutos - 1:00 por pregunta'
    }
  ];

  const handleStartQuiz = () => {
    if (quizMode === 'zen' || (quizMode === 'rapidfire' && difficulty)) {
      setQuizStarted(true);
    }
  };

  const handleResetSelection = () => {
    setQuizStarted(false);
    setSelectedSubject(undefined);
    setQuizMode(null);
    setDifficulty(null);
  };

  const canStartQuiz = () => {
    if (quizMode === 'zen') return true;
    if (quizMode === 'rapidfire' && difficulty) return true;
    return false;
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
              setQuizMode(null);
              setDifficulty(null);
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

  // Step 2: Mode Selection
  const renderModeSelection = () => {
    if (selectedSubject === undefined) return null;

    return (
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Paso 2: Selecciona el modo de práctica
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Elige cómo quieres practicar
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => {
                setQuizMode(mode.value);
                setDifficulty(null);
              }}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                quizMode === mode.value
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg transform scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{mode.emoji}</div>
                <div className="flex-1">
                  <div className={`font-bold text-xl mb-1 ${
                    quizMode === mode.value
                      ? 'text-indigo-900 dark:text-indigo-100'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {mode.label}
                  </div>
                  <div className={`text-sm font-medium mb-2 ${
                    quizMode === mode.value
                      ? 'text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {mode.description}
                  </div>
                  <div className={`text-xs ${
                    quizMode === mode.value
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {mode.details}
                  </div>
                </div>
                {quizMode === mode.value && (
                  <div className="text-indigo-600 dark:text-indigo-400 text-2xl">✓</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Step 3: Difficulty Selection (only for Rapid Fire)
  const renderDifficultySelection = () => {
    if (quizMode !== 'rapidfire') return null;

    return (
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Paso 3: Selecciona la dificultad
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          ¿Cuánto tiempo necesitas para completar 10 preguntas?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {difficulties.map((diff) => (
            <button
              key={diff.value}
              onClick={() => setDifficulty(diff.value)}
              className={`p-6 rounded-lg border-2 transition-all text-center ${
                difficulty === diff.value
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg transform scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md'
              }`}
            >
              <div className="text-5xl mb-3">{diff.emoji}</div>
              <div className={`font-bold text-xl mb-2 ${
                difficulty === diff.value
                  ? 'text-indigo-900 dark:text-indigo-100'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {diff.label}
              </div>
              <div className={`text-lg font-semibold mb-1 ${
                difficulty === diff.value
                  ? 'text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {diff.time} minutos
              </div>
              <div className={`text-xs ${
                difficulty === diff.value
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-500'
              }`}>
                {diff.description}
              </div>
              {difficulty === diff.value && (
                <div className="text-indigo-600 dark:text-indigo-400 text-2xl mt-2">✓</div>
              )}
            </button>
          ))}
        </div>

        {difficulty && (
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

  // Start button for Zen mode (no difficulty needed)
  const renderStartButton = () => {
    if (quizMode !== 'zen') return null;

    return (
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
      </div>
    );
  };

  // Quiz View
  if (quizStarted && canStartQuiz()) {
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
              href="/curriculum/m2"
              className="text-indigo-600 dark:text-indigo-400 hover:underline inline-block"
            >
              📚 Ver Curriculum M2
            </Link>
          </div>

          <Quiz
            questions={questions}
            level="M2"
            subject={selectedSubject === null ? undefined : selectedSubject}
            quizMode={quizMode || 'zen'}
            difficulty={difficulty || undefined}
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
              href="/curriculum/m2"
              className="text-indigo-600 dark:text-indigo-400 hover:underline inline-block"
            >
              📚 Ver Curriculum M2
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Práctica PAES - Competencia Matemática M2
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Contenidos avanzados para carreras científicas y de ingeniería
          </p>
        </div>

        {renderSubjectSelection()}
        {renderModeSelection()}
        {renderDifficultySelection()}
        {renderStartButton()}
      </div>
    </div>
  );
}
