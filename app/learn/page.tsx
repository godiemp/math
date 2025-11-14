'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Card, Button, Heading, Text } from '@/components/ui';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

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

export default function LearnPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [currentStep, setCurrentStep] = useState<StepData | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState(0);

  // Generate problem on mount
  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = async () => {
    setLoading(true);
    setError(null);
    setUserAnswer('');
    setVerification(null);
    setCompletedSteps(0);

    try {
      // Get user's progress data from localStorage to determine weak topics
      const progressData = localStorage.getItem('studentProgress');
      let weakTopics: string[] = [];

      if (progressData) {
        const progress = JSON.parse(progressData);
        // Find topics with low accuracy
        if (progress.topicAccuracy) {
          weakTopics = Object.entries(progress.topicAccuracy)
            .filter(([_, acc]: any) => acc < 0.7)
            .map(([topic]) => topic);
        }
      }

      const response = await api.post<ProblemData>('/api/learn/generate', {
        weakTopics: weakTopics.slice(0, 3), // Focus on top 3 weak topics
        level: 'M1',
        subject: 'Números',
      });

      if (response.error) {
        setError(response.error.error);
        return;
      }

      setProblem(response.data!);

      // Get first step
      await loadNextStep(response.data!.problemId, 0);
    } catch (err) {
      setError('Error al generar problema. Por favor intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
    if (!problem || !currentStep || !userAnswer.trim()) {
      return;
    }

    setIsVerifying(true);
    setVerification(null);

    try {
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

      // If correct, update completed steps
      if (response.data!.correct) {
        setCompletedSteps(currentStep.stepNumber);
      }
    } catch (err) {
      setError('Error al verificar respuesta');
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNextStep = () => {
    if (!problem || !currentStep) return;

    if (currentStep.isComplete) {
      // Problem is complete, generate a new one
      generateNewProblem();
    } else {
      // Load next step
      loadNextStep(problem.problemId, currentStep.stepNumber);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <Text className="mt-4 text-slate-600 dark:text-slate-400">Generando problema...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Heading level={1} className="text-3xl">
              Aprende Paso a Paso
            </Heading>
            <Text variant="secondary" className="mt-1">
              Practica con guía de IA personalizada
            </Text>
          </div>
          <Button
            onClick={() => router.push('/dashboard')}
            variant="ghost"
          >
            ← Volver
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl">
            <Text className="text-red-800 dark:text-red-200">{error}</Text>
          </div>
        )}

        {problem && (
          <>
            {/* Problem Card */}
            <Card className="mb-6 shadow-lg">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-xl -m-6 mb-6 p-6">
                <div className="flex items-center justify-between">
                  <Heading level={2} className="text-white">
                    Problema
                  </Heading>
                  <Text size="sm" className="text-white/90">
                    {problem.topic} • {problem.difficulty}
                  </Text>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {problem.questionLatex || problem.question}
                </ReactMarkdown>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <Text variant="secondary">Progreso</Text>
                  <Text variant="secondary">
                    {completedSteps} / {problem.totalSteps} pasos
                  </Text>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedSteps / problem.totalSteps) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Hint */}
              {completedSteps === 0 && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <Text className="text-blue-800 dark:text-blue-200">
                    <strong>💡 Pista inicial:</strong> {problem.hint}
                  </Text>
                </div>
              )}
            </Card>

            {/* Current Step Card */}
            {currentStep && (
              <Card className="mb-6 shadow-lg">
                <Heading level={3} className="mb-4">
                  {currentStep.isComplete ? (
                    <span className="text-green-600 dark:text-green-400">
                      ✨ ¡Felicidades! Problema Completado
                    </span>
                  ) : (
                    <span>
                      Paso {currentStep.stepNumber} de {problem.totalSteps}
                    </span>
                  )}
                </Heading>

                {currentStep.isComplete ? (
                  <>
                    <div className="prose dark:prose-invert max-w-none mb-6">
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {currentStep.stepGuidance}
                      </ReactMarkdown>
                    </div>
                    <Button
                      onClick={generateNewProblem}
                      fullWidth
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                    >
                      Siguiente Problema →
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Step Description */}
                    <div className="mb-4">
                      <Heading level={4} className="mb-2">
                        {currentStep.stepDescription}
                      </Heading>
                      <div className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {currentStep.stepGuidance}
                        </ReactMarkdown>
                      </div>
                    </div>

                    {/* Answer Input */}
                    {!verification?.correct && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            <Text>Tu respuesta:</Text>
                          </label>
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Escribe tu respuesta aquí..."
                            className="w-full px-4 py-3 rounded-xl border border-black/[0.12] dark:border-white/[0.16] bg-white/60 dark:bg-[#1C1C1C]/60 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !isVerifying) {
                                handleSubmitAnswer();
                              }
                            }}
                          />
                        </div>
                        <Button
                          onClick={handleSubmitAnswer}
                          disabled={!userAnswer.trim() || isVerifying}
                          fullWidth
                        >
                          {isVerifying ? 'Verificando...' : 'Verificar Respuesta'}
                        </Button>
                      </div>
                    )}

                    {/* Verification Result */}
                    {verification && (
                      <div className="mt-4">
                        <div
                          className={`p-4 rounded-xl border ${
                            verification.correct
                              ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                              : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                          }`}
                        >
                          <div className="space-y-2">
                            <Text
                              className={
                                verification.correct
                                  ? 'text-green-800 dark:text-green-200 font-semibold'
                                  : 'text-red-800 dark:text-red-200 font-semibold'
                              }
                            >
                              {verification.correct ? '✅ ¡Correcto!' : '❌ Intenta de nuevo'}
                            </Text>
                            <div className="prose dark:prose-invert max-w-none">
                              <ReactMarkdown
                                remarkPlugins={[remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                              >
                                {verification.feedback}
                              </ReactMarkdown>
                            </div>
                            {verification.correctAnswer && (
                              <Text size="sm" className="mt-2">
                                <strong>Respuesta correcta:</strong> {verification.correctAnswer}
                              </Text>
                            )}
                          </div>
                        </div>

                        {verification.correct && (
                          <Button
                            onClick={handleNextStep}
                            fullWidth
                            className="mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                          >
                            Siguiente Paso →
                          </Button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
