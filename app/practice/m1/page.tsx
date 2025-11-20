'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { getQuestionsByLevel, getQuestionsByIds } from '@/lib/questions';
import { Question } from '@/lib/types';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ModuleAccessGuard } from '@/components/ModuleAccessGuard';
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

  // Auto-start quiz from URL parameters (for debug mode)
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    const difficultyParam = searchParams.get('difficulty');
    const autostartParam = searchParams.get('autostart');
    const subjectParam = searchParams.get('subject');

    if (autostartParam === 'true' && modeParam) {
      // Set mode
      if (modeParam === 'zen' || modeParam === 'rapidfire') {
        setQuizMode(modeParam as QuizMode);
      }

      // Set subject (default to all subjects if not specified)
      if (subjectParam && ['números', 'álgebra', 'geometría', 'probabilidad'].includes(subjectParam)) {
        setSelectedSubject(subjectParam as Subject);
      } else {
        setSelectedSubject(null);
      }

      // Set difficulty for rapidfire
      if (modeParam === 'rapidfire' && difficultyParam) {
        if (['easy', 'medium', 'hard', 'extreme'].includes(difficultyParam)) {
          setDifficulty(difficultyParam as Difficulty);
        }
      }

      // Auto-start the quiz
      setTimeout(() => {
        setQuizStarted(true);
      }, 100);
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
      time: 10,
      description: '5 preguntas - 2 min por pregunta',
      details: 'Modo tranquilo para principiantes',
      features: ['✓ Feedback inmediato', '🎯 60% para aprobar']
    },
    {
      value: 'medium',
      label: 'Normal',
      emoji: '🟡',
      time: 10,
      description: '8 preguntas - 1:15 por pregunta',
      details: 'Ritmo moderado sin presión',
      features: ['✓ Feedback inmediato', '🎯 70% para aprobar']
    },
    {
      value: 'hard',
      label: 'Difícil',
      emoji: '🟠',
      time: 10,
      description: '10 preguntas - 1 min por pregunta',
      details: 'Sistema de vidas: 2 errores permitidos',
      features: ['❤️ 2 vidas (3er error = Game Over)', '✓ Feedback inmediato', '🎯 75% para aprobar']
    },
    {
      value: 'extreme',
      label: 'Extremo',
      emoji: '🔴',
      time: 10,
      description: '12 preguntas - 50s por pregunta',
      details: 'Máximo desafío con sistema de 1 vida',
      features: ['❤️ 1 vida (2do error = Game Over)', '✓ Feedback inmediato', '🎯 80% para aprobar']
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
    if (selectedSubject === undefined) return false; // Must select subject
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
      background: 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-700 dark:via-amber-700 dark:to-yellow-600',
      selectedBorder: 'border-white/60',
      selectedBg: 'bg-white/20',
      selectedShadow: 'shadow-[0_0_40px_rgba(255,255,255,0.3)]',
      hoverBorder: 'hover:border-white/40',
      checkmark: 'text-white',
      gradient: 'from-orange-500 to-yellow-500',
    };
  };

  const themeColors = getThemeColors();

  // Repeat Last Quiz Card
  const renderRepeatLastQuiz = () => {
    if (!lastConfig) return null;

    return (
      <div className="mb-4 p-4 rounded-xl bg-black/20 dark:bg-white/10 border border-white/20 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0">🔄</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-white">
                Repetir Última Configuración
              </h2>
              <p className="text-white/80 text-sm break-words">
                {getConfigDisplayText(lastConfig)}
              </p>
            </div>
          </div>
          <button
            data-testid="repeat-last-quiz-button"
            onClick={handleRepeatLastQuiz}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-sm transition-all hover:scale-105 shadow-lg whitespace-nowrap flex-shrink-0"
          >
            Comenzar →
          </button>
        </div>
      </div>
    );
  };

  // Step 2: Subject Selection
  const renderSubjectSelection = () => {
    if (!quizMode) return null;

    return (
      <div className="mb-5">
        <div className="mb-3 text-center">
          <h2 className="text-xl font-bold text-white mb-1">
            Paso 2: Selecciona una materia
          </h2>
          <p className="text-white/70 text-sm">
            Elige el área que quieres practicar
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-2">
        {subjects.map((subject) => (
          <button
            key={subject.label}
            data-testid={`subject-${subject.value === null ? 'all' : subject.value}`}
            onClick={() => {
              setSelectedSubject(subject.value);
              setDifficulty(null);
            }}
            className={`p-3 rounded-xl border-2 transition-all duration-300 text-left overflow-hidden ${
              selectedSubject === subject.value
                ? 'border-white/60 bg-white/25 shadow-[0_0_40px_rgba(255,255,255,0.3)]'
                : 'border-white/20 bg-black/20 hover:bg-white/10 hover:border-white/40 hover:shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="text-3xl flex-shrink-0">{subject.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-white mb-0.5 truncate">
                  {subject.label}
                </p>
                <p className="text-xs text-white/70 line-clamp-2">
                  {subject.description}
                </p>
              </div>
              {selectedSubject === subject.value && (
                <div className="text-white text-xl flex-shrink-0">✓</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
    );
  };

  // Step 1: Mode Selection
  const renderModeSelection = () => (
    <div className="mb-5">
      <div className="mb-3 text-center">
        <h2 className="text-xl font-bold text-white mb-1">
          Paso 1: Selecciona el modo de práctica
        </h2>
        <p className="text-white/70 text-sm">
          Elige cómo quieres practicar
        </p>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-2">
          {modes.map((mode) => {
            const isZen = mode.value === 'zen';
            const modeGradient = isZen
              ? 'from-teal-400 via-cyan-500 to-blue-500'
              : 'from-indigo-600 via-purple-600 to-pink-600';
            const isSelected = quizMode === mode.value;

            return (
              <button
                key={mode.value}
                data-testid={`mode-${mode.value}`}
                onClick={() => {
                  setQuizMode(mode.value);
                  setSelectedSubject(undefined);
                  setDifficulty(null);
                }}
                className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-500 text-left ${
                  isSelected
                    ? 'border-white/60 shadow-[0_0_50px_rgba(255,255,255,0.4)]'
                    : 'border-white/20 bg-black/20 hover:bg-white/10 hover:border-white/40 hover:shadow-2xl'
                }`}
              >
                {/* Gradient background - always visible but stronger when selected */}
                <div className={`absolute inset-0 bg-gradient-to-br ${modeGradient} transition-opacity duration-500 ${isSelected ? 'opacity-30' : 'opacity-10'}`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="text-5xl drop-shadow-2xl flex-shrink-0">{mode.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-1 truncate">
                        {mode.label}
                      </h3>
                      <p className="text-sm font-semibold text-white/90 mb-1 line-clamp-2">
                        {mode.description}
                      </p>
                      <p className="text-xs text-white/70 line-clamp-2">
                        {mode.details}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="text-white text-2xl drop-shadow-lg flex-shrink-0">✓</div>
                    )}
                  </div>

                  {/* Color preview bar */}
                  <div className={`h-1.5 rounded-full bg-gradient-to-r ${modeGradient} shadow-lg mt-3`} />
                </div>
              </button>
            );
          })}
        </div>
    </div>
  );

  // Step 3: Difficulty Selection (only for Rapid Fire)
  const renderDifficultySelection = () => {
    if (quizMode !== 'rapidfire') return null;

    return (
      <div className="mb-5">
        <div className="mb-3 text-center">
          <h2 className="text-xl font-bold text-white mb-1">
            Paso 3: Selecciona la dificultad
          </h2>
          <p className="text-white/70 text-sm">
            Cada dificultad tiene mecánicas únicas
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 px-2">
          {difficulties.map((diff) => {
            const isSelected = difficulty === diff.value;
            return (
              <button
                key={diff.value}
                data-testid={`difficulty-${diff.value}`}
                onClick={() => setDifficulty(diff.value)}
                className={`p-3.5 rounded-xl border-2 transition-all duration-300 text-left overflow-hidden ${
                  isSelected
                    ? 'border-white/60 bg-white/25 shadow-[0_0_40px_rgba(255,255,255,0.3)]'
                    : 'border-white/20 bg-black/20 hover:bg-white/10 hover:border-white/40 hover:shadow-xl'
                }`}
              >
                <div className="flex items-start gap-2.5 mb-2">
                  <div className="text-3xl flex-shrink-0">{diff.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="text-base font-bold text-white truncate">
                        {diff.label}
                      </h3>
                      <span className="text-xs font-bold text-white/90 bg-white/20 px-1.5 py-0.5 rounded whitespace-nowrap">
                        {diff.time} min
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mb-0.5 line-clamp-2">
                      {diff.description}
                    </p>
                    <p className="text-xs font-medium text-white/80 line-clamp-2">
                      {diff.details}
                    </p>
                  </div>
                </div>

                <div className="space-y-0.5 pl-0.5">
                  {diff.features.map((feature, idx) => (
                    <p key={idx} className="text-[11px] text-white/65 leading-relaxed truncate">
                      {feature}
                    </p>
                  ))}
                </div>

                {isSelected && (
                  <div className="text-white text-lg mt-2 text-center font-bold">✓ Seleccionado</div>
                )}
              </button>
            );
          })}
        </div>

        {difficulty && (
          <div className="flex flex-wrap gap-3">
            <button
              data-testid="reset-selection-button"
              onClick={handleResetSelection}
              className="px-4 py-2 rounded-lg bg-black/30 hover:bg-black/40 border border-white/30 text-white text-sm font-semibold transition-all whitespace-nowrap"
            >
              ← Cambiar
            </button>
            <button
              data-testid="start-quiz-button"
              onClick={handleStartQuiz}
              className="flex-1 min-w-[180px] px-5 py-2.5 rounded-lg bg-white/25 hover:bg-white/35 border-2 border-white/50 text-white font-bold transition-all hover:scale-105 shadow-xl"
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
      <div className="mb-4">
        <div className="flex flex-wrap gap-3">
          <button
            data-testid="reset-selection-button"
            onClick={handleResetSelection}
            className="px-4 py-2 rounded-lg bg-black/30 hover:bg-black/40 border border-white/30 text-white text-sm font-semibold transition-all whitespace-nowrap"
          >
            ← Cambiar
          </button>
          <button
            data-testid="start-quiz-button"
            onClick={handleStartQuiz}
            className="flex-1 min-w-[180px] px-5 py-2.5 rounded-lg bg-white/25 hover:bg-white/35 border-2 border-white/50 text-white font-bold transition-all hover:scale-105 shadow-xl"
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
    <div className={`min-h-screen ${themeColors.background} py-6 px-4 transition-all duration-700`}>
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <Link
              href="/dashboard"
              className="text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10 inline-block text-sm font-semibold"
            >
              ← Volver al Inicio
            </Link>
            <Link
              href="/curriculum/m1"
              className="text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10 inline-block text-sm font-semibold"
            >
              📚 Ver Curriculum M1
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Práctica PAES - Competencia Matemática M1
            </h1>
            <p className="text-sm text-white/70">
              Contenidos básicos de matemática para todos los estudiantes
            </p>
          </div>
        </div>

        {renderRepeatLastQuiz()}
        {renderModeSelection()}
        {renderSubjectSelection()}
        {renderDifficultySelection()}
        {renderStartButton()}
      </div>
    </div>
  );
}

export default function M1Practice() {
  return (
    <ProtectedRoute>
      <ModuleAccessGuard moduleName="Ejercicios M1">
        <M1PracticeContent />
      </ModuleAccessGuard>
    </ProtectedRoute>
  );
}
