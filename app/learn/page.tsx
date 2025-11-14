'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Card, Button, Heading, Text } from '@/components/ui';
import { MarkdownViewer } from '@/components/MarkdownViewer';

interface ProblemData {
  problemId: string;
  question: string;
  questionLatex?: string;
  topic: string;
  difficulty: string;
  totalSteps: number;
  hint: string;
}

interface StepData {
  stepNumber: number;
  stepDescription: string;
  stepGuidance: string;
  isComplete: boolean;
  nextAction?: string;
}

interface VerificationResult {
  correct: boolean;
  feedback: string;
  correctAnswer?: string;
  canProceed: boolean;
}

type GameMode = 'setup' | 'solving' | 'guided' | 'feedback';
type DifficultyLevel = 'easy' | 'medium' | 'hard';

export default function LearnPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Game state
  const [mode, setMode] = useState<GameMode>('setup');
  const [selectedLevel, setSelectedLevel] = useState<'M1' | 'M2'>('M1');
  const [selectedTopic, setSelectedTopic] = useState<string>('auto');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');

  // Session stats
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Problem state
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [currentStep, setCurrentStep] = useState<StepData | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [guidedMode, setGuidedMode] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);

  // Auto-focus input when ready
  useEffect(() => {
    if (mode === 'solving' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode, verification]);

  const generateProblem = async () => {
    setLoading(true);
    setError(null);
    setUserAnswer('');
    setVerification(null);
    setShowHint(false);
    setGuidedMode(false);
    setCompletedSteps(0);

    try {
      // Get user's progress to determine weak topics
      const progressData = localStorage.getItem('studentProgress');
      let weakTopics: string[] = [];

      if (progressData) {
        const progress = JSON.parse(progressData);
        if (progress.topicAccuracy) {
          weakTopics = Object.entries(progress.topicAccuracy)
            .filter(([_, acc]: any) => acc < 0.7)
            .map(([topic]) => topic);
        }
      }

      const response = await api.post<ProblemData>('/api/learn/generate', {
        weakTopics: selectedTopic === 'auto' ? weakTopics.slice(0, 3) : [],
        level: selectedLevel,
        subject: selectedTopic === 'auto' ? 'Números' : selectedTopic,
        difficulty,
      });

      if (response.error) {
        setError(response.error.error);
        return;
      }

      setProblem(response.data!);
      setMode('solving');
    } catch (err) {
      setError('Error al generar problema. Por favor intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startLearning = () => {
    generateProblem();
  };

  const loadNextStep = async (problemId: string, step: number) => {
    try {
      const response = await api.post<StepData>('/api/learn/next-step', {
        problemId,
        currentStep: step,
      });

      if (response.error) {
        setError(response.error.error);
        return;
      }

      setCurrentStep(response.data!);
      setUserAnswer('');
      setVerification(null);
    } catch (err) {
      setError('Error al cargar siguiente paso');
      console.error(err);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!problem || !userAnswer.trim()) return;

    setIsVerifying(true);
    setVerification(null);

    try {
      if (guidedMode && currentStep) {
        // Guided mode - verify step
        const response = await api.post<VerificationResult>('/api/learn/verify', {
          problemId: problem.problemId,
          stepNumber: currentStep.stepNumber,
          userAnswer: userAnswer.trim(),
        });

        if (response.error) {
          setError(response.error.error);
          return;
        }

        setVerification(response.data!);
        if (response.data!.correct) {
          setCompletedSteps(currentStep.stepNumber);
        }
      } else {
        // Free solving mode - verify complete answer
        const response = await api.post<VerificationResult>('/api/learn/verify', {
          problemId: problem.problemId,
          stepNumber: 0, // Full solution
          userAnswer: userAnswer.trim(),
        });

        if (response.error) {
          setError(response.error.error);
          return;
        }

        setVerification(response.data!);
        setQuestionsAnswered(q => q + 1);

        if (response.data!.correct) {
          // Correct answer - update stats and difficulty
          const newStreak = streak + 1;
          const newCorrect = correctCount + 1;
          setStreak(newStreak);
          setCorrectCount(newCorrect);
          setXp(xp + (difficulty === 'hard' ? 30 : difficulty === 'medium' ? 20 : 10));

          // Adjust difficulty based on performance
          if (newStreak >= 3 && difficulty !== 'hard') {
            setDifficulty('hard');
          } else if (newStreak >= 2 && difficulty === 'easy') {
            setDifficulty('medium');
          }
        } else {
          // Wrong answer - automatically start guided mode to help
          setStreak(0);

          // Lower difficulty after multiple failures
          const accuracy = correctCount / Math.max(questionsAnswered, 1);
          if (accuracy < 0.5 && difficulty !== 'easy') {
            setDifficulty(difficulty === 'hard' ? 'medium' : 'easy');
          }

          // Auto-start guided mode after a brief moment
          setTimeout(async () => {
            setGuidedMode(true);
            setMode('guided');
            await loadNextStep(problem.problemId, 0);
          }, 2000); // Wait 2 seconds to let them read the feedback
        }
      }
    } catch (err) {
      setError('Error al verificar respuesta');
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRequestHelp = async () => {
    if (!problem) return;

    setGuidedMode(true);
    setMode('guided');
    await loadNextStep(problem.problemId, 0);
  };

  const handleNextStep = async () => {
    if (!problem || !currentStep) return;

    if (currentStep.isComplete) {
      // Problem complete in guided mode
      setQuestionsAnswered(q => q + 1);
      const newCorrect = correctCount + 1;
      setCorrectCount(newCorrect);
      setXp(xp + 15); // Less XP for guided completion
      generateProblem();
    } else {
      // Load next step
      await loadNextStep(problem.problemId, currentStep.stepNumber);
    }
  };

  const handleNextProblem = () => {
    generateProblem();
  };

  const getDifficultyMessage = () => {
    if (difficulty === 'hard') return '🔥 Nivel Difícil - ¡Vas muy bien!';
    if (difficulty === 'medium') return '💪 Nivel Intermedio';
    return '🌱 Nivel Básico - Construyendo fundamentos';
  };

  const getStreakMessage = () => {
    if (streak >= 5) return '🔥🔥🔥 ¡RACHA INCREÍBLE!';
    if (streak >= 3) return '🔥🔥 ¡Racha de fuego!';
    if (streak >= 2) return '🔥 ¡En racha!';
    return '';
  };

  // Setup Screen
  if (mode === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-8">
        <Card className="max-w-2xl w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎮</div>
            <Heading level={1} className="text-4xl mb-2">
              Aprende Jugando
            </Heading>
            <Text variant="secondary" className="text-lg">
              Práctica adaptativa con IA que se ajusta a tu nivel
            </Text>
          </div>

          {/* Level Selection */}
          <div className="mb-6">
            <Text className="font-semibold mb-3">¿Qué nivel quieres practicar?</Text>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedLevel('M1')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedLevel === 'M1'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                    : 'border-slate-200 dark:border-slate-700 hover:border-teal-300'
                }`}
              >
                <div className="text-2xl mb-2">📚</div>
                <Text className="font-semibold">Nivel M1</Text>
                <Text size="sm" variant="secondary">Fundamentos básicos</Text>
              </button>
              <button
                onClick={() => setSelectedLevel('M2')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedLevel === 'M2'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                    : 'border-slate-200 dark:border-slate-700 hover:border-teal-300'
                }`}
              >
                <div className="text-2xl mb-2">🚀</div>
                <Text className="font-semibold">Nivel M2</Text>
                <Text size="sm" variant="secondary">Nivel avanzado</Text>
              </button>
            </div>
          </div>

          {/* Topic Selection */}
          <div className="mb-8">
            <Text className="font-semibold mb-3">¿Qué quieres practicar?</Text>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedTopic('auto')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTopic === 'auto'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                }`}
              >
                <Text size="sm" className="font-medium">🎯 IA Elige (Recomendado)</Text>
              </button>
              <button
                onClick={() => setSelectedTopic('Números')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTopic === 'Números'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                }`}
              >
                <Text size="sm" className="font-medium">🔢 Números</Text>
              </button>
              <button
                onClick={() => setSelectedTopic('Álgebra')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTopic === 'Álgebra'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                }`}
              >
                <Text size="sm" className="font-medium">📐 Álgebra</Text>
              </button>
              <button
                onClick={() => setSelectedTopic('Geometría')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTopic === 'Geometría'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                }`}
              >
                <Text size="sm" className="font-medium">📏 Geometría</Text>
              </button>
            </div>
          </div>

          <Button
            onClick={startLearning}
            disabled={loading}
            fullWidth
            size="lg"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Preparando tu pregunta...</span>
              </div>
            ) : (
              '¡Empezar a Aprender! 🚀'
            )}
          </Button>

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full mt-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <Text size="sm">← Volver al dashboard</Text>
          </button>
        </Card>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <Text className="mt-4 text-slate-600 dark:text-slate-400">
            {questionsAnswered === 0 ? 'Preparando tu primera pregunta...' : 'Generando siguiente problema...'}
          </Text>
        </div>
      </div>
    );
  }

  // Main learning interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Stats Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setMode('setup')}
              variant="ghost"
              size="sm"
            >
              ← Cambiar tema
            </Button>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900">
                <Text size="sm" className="font-semibold">⭐ {xp} XP</Text>
              </div>
              {streak > 0 && (
                <div className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900 animate-pulse">
                  <Text size="sm" className="font-semibold">🔥 {streak}</Text>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <Text size="sm" variant="secondary">{getDifficultyMessage()}</Text>
            {getStreakMessage() && (
              <Text size="sm" className="font-bold text-orange-600 dark:text-orange-400">
                {getStreakMessage()}
              </Text>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl">
            <Text className="text-red-800 dark:text-red-200">{error}</Text>
          </div>
        )}

        {problem && (
          <>
            {/* Problem Card */}
            <Card className="mb-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-xl -m-6 mb-6 p-6">
                <div className="flex items-center justify-between">
                  <Heading level={2} className="text-white">
                    {guidedMode ? '📖 Modo Guiado' : '🎯 Resuelve el Problema'}
                  </Heading>
                  <div className="text-right">
                    <Text size="sm" className="text-white/90">{problem.topic}</Text>
                    {guidedMode && (
                      <Text size="xs" className="text-white/75">
                        Paso {completedSteps + 1} de {problem.totalSteps}
                      </Text>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <MarkdownViewer content={problem.questionLatex || problem.question} />
              </div>

              {/* Guided Mode Step */}
              {guidedMode && currentStep && !currentStep.isComplete && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <Heading level={4} className="mb-2 text-blue-900 dark:text-blue-100">
                    {currentStep.stepDescription}
                  </Heading>
                  <div className="text-sm">
                    <MarkdownViewer content={currentStep.stepGuidance} />
                  </div>
                </div>
              )}

              {/* Hint Button (only in free solving mode) */}
              {!guidedMode && !verification && (
                <div className="mb-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    {showHint ? '🙈 Ocultar pista' : '💡 ¿Necesitas una pista?'}
                  </button>
                  {showHint && (
                    <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <Text size="sm" className="text-yellow-900 dark:text-yellow-100">
                        {problem.hint}
                      </Text>
                    </div>
                  )}
                </div>
              )}

              {/* Answer Input */}
              {!verification?.correct && !currentStep?.isComplete && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Text>Tu respuesta:</Text>
                    </label>
                    <input
                      ref={inputRef}
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isVerifying) {
                          handleSubmitAnswer();
                        }
                      }}
                    />
                    <Text size="xs" variant="secondary" className="mt-1">
                      Presiona Enter para enviar
                    </Text>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={!userAnswer.trim() || isVerifying}
                      fullWidth
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                    >
                      {isVerifying ? '⏳ Verificando...' : '✓ Verificar'}
                    </Button>

                    {!guidedMode && (
                      <Button
                        onClick={handleRequestHelp}
                        variant="secondary"
                        className="whitespace-nowrap"
                      >
                        🆘 Ayúdame
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Verification Result */}
              {verification && (
                <div className="mt-4 space-y-4 animate-in fade-in duration-300">
                  <div
                    className={`p-4 rounded-xl border-2 transition-all ${
                      verification.correct
                        ? 'bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700'
                        : 'bg-orange-50 dark:bg-orange-950 border-orange-300 dark:border-orange-700'
                    }`}
                  >
                    <Text
                      className={`font-bold text-lg mb-2 ${
                        verification.correct
                          ? 'text-green-800 dark:text-green-200'
                          : 'text-orange-800 dark:text-orange-200'
                      }`}
                    >
                      {verification.correct ? '✅ ¡Excelente!' : '💡 Vamos a intentarlo de otra manera'}
                    </Text>
                    <div className="text-sm">
                      <MarkdownViewer content={verification.feedback} />
                    </div>
                    {verification.correctAnswer && (
                      <div className="mt-2 pt-2 border-t border-orange-200 dark:border-orange-800">
                        <Text size="sm" className="font-semibold text-orange-700 dark:text-orange-300">
                          Respuesta correcta: {verification.correctAnswer}
                        </Text>
                      </div>
                    )}
                  </div>

                  {verification.correct && !guidedMode && (
                    <div className="space-y-3">
                      {streak >= 2 && (
                        <div className="text-center p-3 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-950 dark:to-yellow-950 rounded-lg">
                          <Text className="font-bold text-orange-700 dark:text-orange-300">
                            🔥 +{difficulty === 'hard' ? 30 : difficulty === 'medium' ? 20 : 10} XP | Racha: {streak}
                          </Text>
                        </div>
                      )}
                      <Button
                        onClick={handleNextProblem}
                        fullWidth
                        size="lg"
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                      >
                        Siguiente Problema →
                      </Button>
                    </div>
                  )}

                  {verification.correct && guidedMode && (
                    <Button
                      onClick={handleNextStep}
                      fullWidth
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                    >
                      {currentStep?.isComplete ? 'Siguiente Problema →' : 'Siguiente Paso →'}
                    </Button>
                  )}

                  {!verification.correct && !guidedMode && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <Text className="font-semibold text-blue-800 dark:text-blue-200">
                          Te voy a ayudar paso a paso...
                        </Text>
                      </div>
                      <Text size="sm" className="text-blue-700 dark:text-blue-300">
                        Vamos a resolver esto juntos. Te guiaré en cada paso.
                      </Text>
                    </div>
                  )}

                  {!verification.correct && guidedMode && (
                    <Button
                      onClick={() => setVerification(null)}
                      variant="secondary"
                      fullWidth
                    >
                      🔄 Intentar de nuevo
                    </Button>
                  )}
                </div>
              )}

              {/* Guided Mode Completion */}
              {currentStep?.isComplete && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 border-2 border-green-300 dark:border-green-700 rounded-xl text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <Heading level={3} className="text-green-800 dark:text-green-200 mb-2">
                      ¡Problema Completado!
                    </Heading>
                    <div className="text-sm mb-4">
                      <MarkdownViewer content={currentStep.stepGuidance} />
                    </div>
                    <Text className="text-green-700 dark:text-green-300">
                      +15 XP por completar en modo guiado
                    </Text>
                  </div>
                  <Button
                    onClick={generateProblem}
                    fullWidth
                    size="lg"
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  >
                    Siguiente Problema →
                  </Button>
                </div>
              )}
            </Card>

            {/* Session Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center">
                <Text size="sm" variant="secondary">Preguntas</Text>
                <Text className="text-2xl font-bold">{questionsAnswered}</Text>
              </Card>
              <Card className="text-center">
                <Text size="sm" variant="secondary">Correctas</Text>
                <Text className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {correctCount}
                </Text>
              </Card>
              <Card className="text-center">
                <Text size="sm" variant="secondary">Precisión</Text>
                <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0}%
                </Text>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
