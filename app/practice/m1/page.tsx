'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { getQuestionsByLevel, getQuestionsByIds } from '@/lib/questions';
import { Question } from '@/lib/types';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text } from '@/components/ui';

type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';
type QuizMode = 'zen' | 'rapidfire';
type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';

function M1PracticeContent() {
  const searchParams = useSearchParams();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null | undefined>(undefined);
  const [quizMode, setQuizMode] = useState<QuizMode | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [replayQuestions, setReplayQuestions] = useState<Question[] | undefined>(undefined);
  const questions = getQuestionsByLevel('M1');

  // Check for replay parameter and load questions
  useEffect(() => {
    const isReplay = searchParams.get('replay') === 'true';
    if (isReplay) {
      try {
        const replayData = localStorage.getItem('replay-quiz');
        if (replayData) {
          const { questionIds, level } = JSON.parse(replayData);
          if (level === 'M1') {
            const questionsToReplay = getQuestionsByIds(questionIds);
            setReplayQuestions(questionsToReplay);
            // Auto-start the quiz in zen mode
            setSelectedSubject(null);
            setQuizMode('zen');
            setQuizStarted(true);
            // Clear the replay data
            localStorage.removeItem('replay-quiz');
          }
        }
      } catch (error) {
        console.error('Failed to load replay quiz:', error);
      }
    }
  }, [searchParams]);

  // Pre-select subject from URL parameter
  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam && ['números', 'álgebra', 'geometría', 'probabilidad'].includes(subjectParam)) {
      setSelectedSubject(subjectParam as Subject);
    }
  }, [searchParams]);

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
    <Card className="mb-6" padding="lg">
      <Heading level={2} size="sm" className="mb-1">
        Paso 1: Selecciona una materia
      </Heading>
      <Text variant="secondary" className="mb-6">
        Elige el área que quieres practicar
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.label}
            onClick={() => {
              setSelectedSubject(subject.value);
              setQuizMode(null);
              setDifficulty(null);
            }}
            className={`p-4 rounded-xl border transition-all duration-[180ms] text-left ${
              selectedSubject === subject.value
                ? 'border-[#0A84FF] bg-[#0A84FF]/[0.06] dark:bg-[#0A84FF]/[0.12] shadow-[0_14px_36px_-4px_rgba(0,0,0,0.22)] transform scale-105'
                : 'border-black/[0.12] dark:border-white/[0.16] hover:border-[#0A84FF]/50 dark:hover:border-[#0A84FF] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:scale-[1.02]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-4xl">{subject.emoji}</div>
              <div className="flex-1">
                <Text size="md" className="font-semibold mb-0.5">
                  {subject.label}
                </Text>
                <Text size="xs" variant="secondary">
                  {subject.description}
                </Text>
              </div>
              {selectedSubject === subject.value && (
                <div className="text-[#0A84FF] text-2xl">✓</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </Card>
  );

  // Step 2: Mode Selection
  const renderModeSelection = () => {
    if (selectedSubject === undefined) return null;

    return (
      <Card className="mb-6" padding="lg">
        <Heading level={2} size="sm" className="mb-1">
          Paso 2: Selecciona el modo de práctica
        </Heading>
        <Text variant="secondary" className="mb-6">
          Elige cómo quieres practicar
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => {
                setQuizMode(mode.value);
                setDifficulty(null);
              }}
              className={`p-4 rounded-xl border transition-all duration-[180ms] text-left ${
                quizMode === mode.value
                  ? 'border-[#0A84FF] bg-[#0A84FF]/[0.06] dark:bg-[#0A84FF]/[0.12] shadow-[0_14px_36px_-4px_rgba(0,0,0,0.22)] transform scale-105'
                  : 'border-black/[0.12] dark:border-white/[0.16] hover:border-[#0A84FF]/50 dark:hover:border-[#0A84FF] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:scale-[1.02]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-5xl">{mode.emoji}</div>
                <div className="flex-1">
                  <Text size="lg" className="font-semibold mb-1">
                    {mode.label}
                  </Text>
                  <Text size="sm" className="font-medium mb-2">
                    {mode.description}
                  </Text>
                  <Text size="xs" variant="secondary">
                    {mode.details}
                  </Text>
                </div>
                {quizMode === mode.value && (
                  <div className="text-[#0A84FF] text-2xl">✓</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </Card>
    );
  };

  // Step 3: Difficulty Selection (only for Rapid Fire)
  const renderDifficultySelection = () => {
    if (quizMode !== 'rapidfire') return null;

    return (
      <Card className="mb-6" padding="lg">
        <Heading level={2} size="sm" className="mb-1">
          Paso 3: Selecciona la dificultad
        </Heading>
        <Text variant="secondary" className="mb-6">
          ¿Cuánto tiempo necesitas para completar 10 preguntas?
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {difficulties.map((diff) => (
            <button
              key={diff.value}
              onClick={() => setDifficulty(diff.value)}
              className={`p-4 rounded-xl border transition-all duration-[180ms] text-center ${
                difficulty === diff.value
                  ? 'border-[#0A84FF] bg-[#0A84FF]/[0.06] dark:bg-[#0A84FF]/[0.12] shadow-[0_14px_36px_-4px_rgba(0,0,0,0.22)] transform scale-105'
                  : 'border-black/[0.12] dark:border-white/[0.16] hover:border-[#0A84FF]/50 dark:hover:border-[#0A84FF] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:scale-[1.02]'
              }`}
            >
              <div className="text-5xl mb-3">{diff.emoji}</div>
              <Text size="lg" className="font-semibold mb-2">
                {diff.label}
              </Text>
              <Text size="md" className="font-medium mb-1">
                {diff.time} minutos
              </Text>
              <Text size="xs" variant="secondary">
                {diff.description}
              </Text>
              {difficulty === diff.value && (
                <div className="text-[#0A84FF] text-2xl mt-2">✓</div>
              )}
            </button>
          ))}
        </div>

        {difficulty && (
          <div className="flex gap-4">
            <Button variant="ghost" onClick={handleResetSelection}>
              ← Cambiar Selección
            </Button>
            <Button variant="primary" onClick={handleStartQuiz} fullWidth>
              Comenzar Quiz →
            </Button>
          </div>
        )}
      </Card>
    );
  };

  // Start button for Zen mode (no difficulty needed)
  const renderStartButton = () => {
    if (quizMode !== 'zen') return null;

    return (
      <Card className="mb-6" padding="lg">
        <div className="flex gap-4">
          <Button variant="ghost" onClick={handleResetSelection}>
            ← Cambiar Selección
          </Button>
          <Button variant="primary" onClick={handleStartQuiz} fullWidth>
            Comenzar Quiz →
          </Button>
        </div>
      </Card>
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
              className="text-[#0A84FF] dark:text-[#66B2FF] hover:opacity-80 font-semibold transition-opacity px-3 py-2 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            >
              ← Nueva Práctica
            </button>
            <Link
              href="/curriculum/m1"
              className="text-[#0A84FF] dark:text-[#66B2FF] hover:opacity-80 transition-opacity px-3 py-2 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] inline-block"
            >
              📚 Ver Curriculum M1
            </Link>
          </div>

          <Quiz
            questions={questions}
            level="M1"
            subject={selectedSubject === null ? undefined : selectedSubject}
            quizMode={quizMode || 'zen'}
            difficulty={difficulty || undefined}
            replayQuestions={replayQuestions}
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
              href="/dashboard"
              className="text-[#0A84FF] dark:text-[#66B2FF] hover:opacity-80 transition-opacity px-3 py-2 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] inline-block"
            >
              ← Volver al Inicio
            </Link>
            <Link
              href="/curriculum/m1"
              className="text-[#0A84FF] dark:text-[#66B2FF] hover:opacity-80 transition-opacity px-3 py-2 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] inline-block"
            >
              📚 Ver Curriculum M1
            </Link>
          </div>
          <Heading level={1} size="lg" className="mb-2">
            Práctica PAES - Competencia Matemática M1
          </Heading>
          <Text variant="secondary" size="md">
            Contenidos básicos de matemática para todos los estudiantes
          </Text>
        </div>

        {renderSubjectSelection()}
        {renderModeSelection()}
        {renderDifficultySelection()}
        {renderStartButton()}
      </div>
    </div>
  );
}

export default function M1Practice() {
  return (
    <ProtectedRoute>
      <M1PracticeContent />
    </ProtectedRoute>
  );
}
