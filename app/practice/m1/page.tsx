'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { getQuestionsByLevel, getQuestionsByIds } from '@/lib/questions';
import { Question } from '@/lib/types';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text } from '@/components/ui';
import { getLastConfigKey } from '@/lib/constants';
import { api } from '@/lib/api-client';

type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';
type QuizMode = 'zen' | 'rapidfire';
type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';

interface LastConfig {
  subject: Subject | null;
  mode: QuizMode;
  difficulty?: Difficulty;
}

function M1PracticeContent() {
  const searchParams = useSearchParams();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null | undefined>(undefined);
  const [quizMode, setQuizMode] = useState<QuizMode | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [replayQuestions, setReplayQuestions] = useState<Question[] | undefined>(undefined);
  const [lastConfig, setLastConfig] = useState<LastConfig | null>(null);
  const questions = getQuestionsByLevel('M1');

  // Load last config from backend (with localStorage fallback)
  useEffect(() => {
    const loadLastConfig = async () => {
      try {
        // Try to fetch from backend first
        const response = await api.get<{ config: LastConfig }>('/api/quiz/last-config?level=M1');

        if (response.data?.config) {
          setLastConfig(response.data.config);
          // Update localStorage for offline access
          localStorage.setItem(getLastConfigKey('M1'), JSON.stringify(response.data.config));
        } else {
          // Backend has no config, try localStorage
          const savedConfig = localStorage.getItem(getLastConfigKey('M1'));
          if (savedConfig) {
            setLastConfig(JSON.parse(savedConfig));
          }
        }
      } catch (error) {
        // If backend fails, fall back to localStorage
        console.error('Failed to load last config from backend, using localStorage:', error);
        try {
          const savedConfig = localStorage.getItem(getLastConfigKey('M1'));
          if (savedConfig) {
            setLastConfig(JSON.parse(savedConfig));
          }
        } catch (localError) {
          console.error('Failed to load last config from localStorage:', localError);
        }
      }
    };

    loadLastConfig();
  }, []);

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

  const difficulties: { value: Difficulty; label: string; emoji: string; time: number; description: string; details: string; features: string[] }[] = [
    {
      value: 'easy',
      label: 'Fácil',
      emoji: '🟢',
      time: 25,
      description: '10 preguntas - 2:30 por pregunta',
      details: 'Modo de práctica relajado con ayudas',
      features: ['✓ Ves si acertaste inmediatamente', '🔒 Las respuestas se bloquean', '💡 Pistas disponibles (-10% puntos)', '⏸️ Puedes pausar 1 vez (30s)', '🎯 60% para aprobar']
    },
    {
      value: 'medium',
      label: 'Normal',
      emoji: '🟡',
      time: 18,
      description: '10 preguntas - 1:48 por pregunta',
      details: 'Ritmo moderado con respuestas finales',
      features: ['✓ Ves si acertaste inmediatamente', '🔒 Las respuestas se bloquean', '🔥 Bonus por rachas (3+)', '🎯 70% para aprobar']
    },
    {
      value: 'hard',
      label: 'Difícil',
      emoji: '🟠',
      time: 12,
      description: '12 preguntas - 1:12 por pregunta',
      details: 'Sistema de vidas: 2 errores permitidos',
      features: ['💀 2 vidas (3er error = Game Over)', '✓ Ves si acertaste inmediatamente', '🔒 Las respuestas se bloquean', '🔥 Bonus por rachas (5+)', '🎯 75% para aprobar']
    },
    {
      value: 'extreme',
      label: 'Extremo',
      emoji: '🔴',
      time: 10,
      description: '15 preguntas - 40s por pregunta',
      details: 'Máximo desafío: 1 vida + tiempo extra por acierto',
      features: ['💀 1 vida (2do error = Game Over)', '✓ Ves si acertaste inmediatamente', '🔒 Las respuestas se bloquean', '⏱️ +5s por respuesta correcta', '🎯 80% para aprobar']
    }
  ];

  const handleStartQuiz = async () => {
    if (quizMode === 'zen' || (quizMode === 'rapidfire' && difficulty)) {
      // Save config to backend and localStorage
      const config: LastConfig = {
        subject: selectedSubject === undefined ? null : selectedSubject,
        mode: quizMode,
        difficulty: difficulty || undefined,
      };

      try {
        // Save to localStorage immediately for quick access
        localStorage.setItem(getLastConfigKey('M1'), JSON.stringify(config));
        setLastConfig(config);

        // Save to backend for cross-device sync (async, don't block quiz start)
        api.post('/api/quiz/last-config', {
          level: 'M1',
          subject: config.subject,
          mode: config.mode,
          difficulty: config.difficulty,
        }).catch(error => {
          console.error('Failed to save last config to backend:', error);
        });
      } catch (error) {
        console.error('Failed to save last config:', error);
      }

      setQuizStarted(true);
    }
  };

  const handleRepeatLastQuiz = () => {
    if (lastConfig) {
      setSelectedSubject(lastConfig.subject);
      setQuizMode(lastConfig.mode);
      setDifficulty(lastConfig.difficulty || null);
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

  const getConfigDisplayText = (config: LastConfig) => {
    const subjectLabel = config.subject
      ? subjects.find(s => s.value === config.subject)?.label
      : 'Todas las Materias';
    const modeLabel = modes.find(m => m.value === config.mode)?.label;
    const difficultyLabel = config.difficulty
      ? difficulties.find(d => d.value === config.difficulty)?.label
      : null;

    if (difficultyLabel) {
      return `${subjectLabel} • ${modeLabel} • ${difficultyLabel}`;
    }
    return `${subjectLabel} • ${modeLabel}`;
  };

  // Get theme colors based on selected mode
  const getThemeColors = () => {
    if (quizMode === 'zen') {
      return {
        background: 'bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 dark:from-teal-800 dark:via-cyan-900 dark:to-blue-900',
        selectedBorder: 'border-teal-500 dark:border-teal-400',
        selectedBg: 'bg-teal-500/10 dark:bg-teal-500/20',
        selectedShadow: 'shadow-[0_0_30px_rgba(20,184,166,0.3)]',
        hoverBorder: 'hover:border-teal-400/70 dark:hover:border-teal-400',
        checkmark: 'text-teal-500 dark:text-teal-400',
        gradient: 'from-teal-500 via-cyan-500 to-blue-500',
      };
    } else if (quizMode === 'rapidfire') {
      return {
        background: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900',
        selectedBorder: 'border-purple-500 dark:border-purple-400',
        selectedBg: 'bg-purple-500/10 dark:bg-purple-500/20',
        selectedShadow: 'shadow-[0_0_30px_rgba(168,85,247,0.4)]',
        hoverBorder: 'hover:border-purple-400/70 dark:hover:border-purple-400',
        checkmark: 'text-purple-500 dark:text-purple-400',
        gradient: 'from-indigo-600 via-purple-600 to-pink-600',
      };
    }
    // Default neutral theme
    return {
      background: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800',
      selectedBorder: 'border-[#0A84FF]',
      selectedBg: 'bg-[#0A84FF]/[0.06] dark:bg-[#0A84FF]/[0.12]',
      selectedShadow: 'shadow-[0_14px_36px_-4px_rgba(0,0,0,0.22)]',
      hoverBorder: 'hover:border-[#0A84FF]/50 dark:hover:border-[#0A84FF]',
      checkmark: 'text-[#0A84FF]',
      gradient: 'from-blue-500 to-indigo-500',
    };
  };

  const themeColors = getThemeColors();

  // Repeat Last Quiz Card
  const renderRepeatLastQuiz = () => {
    if (!lastConfig) return null;

    return (
      <div className="mb-6 p-6 rounded-2xl bg-black/20 dark:bg-white/10 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">🔄</span>
              <h2 className="text-xl font-bold text-white">
                Repetir Última Configuración
              </h2>
            </div>
            <p className="text-white/80 text-base">
              {getConfigDisplayText(lastConfig)}
            </p>
          </div>
          <button
            onClick={handleRepeatLastQuiz}
            className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold transition-all hover:scale-105 shadow-lg whitespace-nowrap"
          >
            Comenzar →
          </button>
        </div>
      </div>
    );
  };

  // Step 1: Subject Selection
  const renderSubjectSelection = () => (
    <div className="mb-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Paso 1: Selecciona una materia
        </h2>
        <p className="text-white/70 text-base">
          Elige el área que quieres practicar
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.label}
            onClick={() => {
              setSelectedSubject(subject.value);
              setQuizMode(null);
              setDifficulty(null);
            }}
            className={`p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
              selectedSubject === subject.value
                ? 'border-white/60 bg-white/25 shadow-[0_0_40px_rgba(255,255,255,0.3)] transform scale-105'
                : 'border-white/20 bg-black/20 hover:bg-white/10 hover:border-white/40 hover:shadow-xl hover:scale-102'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-5xl">{subject.emoji}</div>
              <div className="flex-1">
                <p className="text-lg font-bold text-white mb-1">
                  {subject.label}
                </p>
                <p className="text-sm text-white/70">
                  {subject.description}
                </p>
              </div>
              {selectedSubject === subject.value && (
                <div className="text-white text-3xl">✓</div>
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
      <div className="mb-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Paso 2: Selecciona el modo de práctica
          </h2>
          <p className="text-white/70 text-base">
            Elige cómo quieres practicar
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modes.map((mode) => {
            const isZen = mode.value === 'zen';
            const modeGradient = isZen
              ? 'from-teal-400 via-cyan-500 to-blue-500'
              : 'from-indigo-600 via-purple-600 to-pink-600';
            const isSelected = quizMode === mode.value;

            return (
              <button
                key={mode.value}
                onClick={() => {
                  setQuizMode(mode.value);
                  setDifficulty(null);
                }}
                className={`relative overflow-hidden p-6 rounded-2xl border-2 transition-all duration-500 text-left ${
                  isSelected
                    ? 'border-white/60 shadow-[0_0_50px_rgba(255,255,255,0.4)] transform scale-105'
                    : 'border-white/20 bg-black/20 hover:bg-white/10 hover:border-white/40 hover:shadow-2xl hover:scale-102'
                }`}
              >
                {/* Gradient background - always visible but stronger when selected */}
                <div className={`absolute inset-0 bg-gradient-to-br ${modeGradient} transition-opacity duration-500 ${isSelected ? 'opacity-30' : 'opacity-10'}`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-7xl drop-shadow-2xl">{mode.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {mode.label}
                      </h3>
                      <p className="text-base font-semibold text-white/90 mb-2">
                        {mode.description}
                      </p>
                      <p className="text-sm text-white/70">
                        {mode.details}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="text-white text-4xl drop-shadow-lg">✓</div>
                    )}
                  </div>

                  {/* Color preview bar */}
                  <div className={`h-2 rounded-full bg-gradient-to-r ${modeGradient} shadow-lg`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Step 3: Difficulty Selection (only for Rapid Fire)
  const renderDifficultySelection = () => {
    if (quizMode !== 'rapidfire') return null;

    return (
      <div className="mb-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Paso 3: Selecciona la dificultad
          </h2>
          <p className="text-white/70 text-base">
            Cada dificultad tiene mecánicas únicas
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {difficulties.map((diff) => {
            const isSelected = difficulty === diff.value;
            return (
              <button
                key={diff.value}
                onClick={() => setDifficulty(diff.value)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-white/60 bg-white/25 shadow-[0_0_40px_rgba(255,255,255,0.3)] transform scale-105'
                    : 'border-white/20 bg-black/20 hover:bg-white/10 hover:border-white/40 hover:shadow-xl hover:scale-102'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-5xl">{diff.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white">
                        {diff.label}
                      </h3>
                      <span className="text-sm font-bold text-white/90 bg-white/20 px-2 py-1 rounded-lg">
                        {diff.time} min
                      </span>
                    </div>
                    <p className="text-sm text-white/70 mb-1">
                      {diff.description}
                    </p>
                    <p className="text-sm font-medium text-white/80 mb-2">
                      {diff.details}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pl-1">
                  {diff.features.map((feature, idx) => (
                    <p key={idx} className="text-xs text-white/70 leading-relaxed">
                      {feature}
                    </p>
                  ))}
                </div>

                {isSelected && (
                  <div className="text-white text-2xl mt-3 text-center font-bold">✓ Seleccionado</div>
                )}
              </button>
            );
          })}
        </div>

        {difficulty && (
          <div className="flex gap-4">
            <button
              onClick={handleResetSelection}
              className="px-6 py-3 rounded-xl bg-black/30 hover:bg-black/40 border border-white/30 text-white font-semibold transition-all"
            >
              ← Cambiar Selección
            </button>
            <button
              onClick={handleStartQuiz}
              className="flex-1 px-6 py-4 rounded-xl bg-white/25 hover:bg-white/35 border-2 border-white/50 text-white font-bold text-lg transition-all hover:scale-105 shadow-2xl"
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
      <div className="mb-6">
        <div className="flex gap-4">
          <button
            onClick={handleResetSelection}
            className="px-6 py-3 rounded-xl bg-black/30 hover:bg-black/40 border border-white/30 text-white font-semibold transition-all"
          >
            ← Cambiar Selección
          </button>
          <button
            onClick={handleStartQuiz}
            className="flex-1 px-6 py-4 rounded-xl bg-white/25 hover:bg-white/35 border-2 border-white/50 text-white font-bold text-lg transition-all hover:scale-105 shadow-2xl"
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
      <div className={`min-h-screen ${themeColors.background} py-8 px-4 transition-all duration-700`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={handleResetSelection}
              className="text-white/90 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10 font-semibold"
            >
              ← Nueva Práctica
            </button>
            <Link
              href="/curriculum/m1"
              className="text-white/90 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10 inline-block font-semibold"
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
    <div className={`min-h-screen ${themeColors.background} py-8 px-4 transition-all duration-700`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex justify-between items-start mb-6">
            <Link
              href="/dashboard"
              className="text-white/90 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10 inline-block font-semibold"
            >
              ← Volver al Inicio
            </Link>
            <Link
              href="/curriculum/m1"
              className="text-white/90 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10 inline-block font-semibold"
            >
              📚 Ver Curriculum M1
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
              Práctica PAES - Competencia Matemática M1
            </h1>
            <p className="text-lg text-white/80">
              Contenidos básicos de matemática para todos los estudiantes
            </p>
          </div>
        </div>

        {renderRepeatLastQuiz()}
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
