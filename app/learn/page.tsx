'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Card, Button, Heading, Text } from '@/components/ui';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import type { Question } from '@/lib/types/core';

// ============================================================================
// Types
// ============================================================================

interface AssessmentMessage {
  role: 'assistant' | 'user';
  content: string;
}

interface StudentAssessment {
  knownConcepts: string[];
  uncertainConcepts: string[];
  gaps: string[];
  confidenceLevel: 'low' | 'medium' | 'high';
  recommendedDifficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  recommendedSkills: string[];
}

interface GuidanceStep {
  number: number;
  description: string;
  guidance: string;
  correctAnswer: string;
  explanation: string;
}

interface VerificationResult {
  correct: boolean;
  feedback: string;
  correctAnswer?: string;
  canProceed: boolean;
}

interface StepData {
  stepNumber: number;
  stepDescription: string;
  stepGuidance: string;
  isComplete: boolean;
  finalAnswer?: string;
}

type GameMode = 'setup' | 'assessment' | 'loading' | 'choosing' | 'solving' | 'guided';

// ============================================================================
// Main Component
// ============================================================================

export default function LearnPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Setup state
  const [mode, setMode] = useState<GameMode>('setup');
  const [selectedLevel, setSelectedLevel] = useState<'M1' | 'M2'>('M1');
  const [selectedSubject, setSelectedSubject] = useState<'números' | 'álgebra' | 'geometría' | 'probabilidad'>('números');

  // Assessment state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AssessmentMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessment, setAssessment] = useState<StudentAssessment | null>(null);

  // Problem state
  const [loading, setLoading] = useState(false);
  const [problemId, setProblemId] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [steps, setSteps] = useState<GuidanceStep[]>([]);
  const [personalizedHint, setPersonalizedHint] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<StepData | null>(null);

  // Answer state
  const [userAnswer, setUserAnswer] = useState('');
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [guidedMode, setGuidedMode] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);

  // Session stats
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const [error, setError] = useState<string | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (mode === 'assessment' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, mode]);

  // Auto-focus input
  useEffect(() => {
    if (mode === 'solving' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode, verification]);

  // ============================================================================
  // Phase 1: Start Assessment
  // ============================================================================

  const startAssessment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/api/learn/start-assessment', {
        level: selectedLevel,
        subject: selectedSubject,
      });

      if (response.error) {
        setError(response.error.error);
        return;
      }

      setSessionId(response.data.sessionId);
      setMessages([{ role: 'assistant', content: response.data.message }]);
      setMode('assessment');
    } catch (err) {
      setError('Error al iniciar evaluación. Por favor intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // Phase 2: Continue Assessment Conversation
  // ============================================================================

  const sendMessage = async () => {
    if (!userInput.trim() || !sessionId) return;

    const newUserMessage: AssessmentMessage = {
      role: 'user',
      content: userInput.trim()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsAssessing(true);

    try {
      const response = await api.post('/api/learn/continue-assessment', {
        sessionId,
        userMessage: userInput.trim(),
      });

      if (response.error) {
        setError(response.error.error);
        return;
      }

      const newAssistantMessage: AssessmentMessage = {
        role: 'assistant',
        content: response.data.message
      };

      setMessages(prev => [...prev, newAssistantMessage]);

      // Check if assessment is complete
      if (response.data.isComplete && response.data.assessment) {
        setAssessment(response.data.assessment);
        // Wait a moment then select question
        setTimeout(() => {
          selectQuestionAndGenerateGuidance(response.data.assessment);
        }, 1500);
      }
    } catch (err) {
      setError('Error en la evaluación');
      console.error(err);
    } finally {
      setIsAssessing(false);
    }
  };

  // ============================================================================
  // Phase 3 & 4: Select Question and Generate Personalized Guidance
  // ============================================================================

  const selectQuestionAndGenerateGuidance = async (studentAssessment: StudentAssessment) => {
    setMode('loading');
    setError(null);

    try {
      // Step 1: Select question from lib/questions
      const selectionResponse = await api.post('/api/learn/select-question', {
        sessionId,
      });

      if (selectionResponse.error) {
        setError(selectionResponse.error.error);
        return;
      }

      const { problemId: newProblemId, question: selectedQuestion, rationale } = selectionResponse.data;

      // Step 2: Generate personalized guidance
      const guidanceResponse = await api.post('/api/learn/generate-guidance', {
        sessionId,
        problemId: newProblemId,
        question: selectedQuestion,
      });

      if (guidanceResponse.error) {
        setError(guidanceResponse.error.error);
        return;
      }

      const { steps: guidanceSteps, personalizedHint: hint } = guidanceResponse.data;

      // Step 3: Start learning session
      const sessionResponse = await api.post('/api/learn/start-session', {
        sessionId,
        problemId: newProblemId,
        question: selectedQuestion,
        steps: guidanceSteps,
        personalizedHint: hint,
      });

      if (sessionResponse.error) {
        setError(sessionResponse.error.error);
        return;
      }

      // Set all state
      setProblemId(newProblemId);
      setQuestion(selectedQuestion);
      setSteps(guidanceSteps);
      setPersonalizedHint(hint);
      setMode('choosing');
    } catch (err) {
      setError('Error al preparar el problema. Por favor intenta de nuevo.');
      console.error(err);
    }
  };

  // ============================================================================
  // Problem Solving
  // ============================================================================

  const handleTryAlone = () => {
    setGuidedMode(false);
    setMode('solving');
  };

  const handleGetHelp = async () => {
    if (!problemId) return;

    setGuidedMode(true);
    setMode('guided');
    await loadNextStep(problemId, 0);
  };

  const loadNextStep = async (pid: string, step: number) => {
    try {
      const response = await api.post<StepData>('/api/learn/next-step', {
        problemId: pid,
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
    if (!problemId || !userAnswer.trim()) return;

    setIsVerifying(true);
    setVerification(null);

    try {
      if (guidedMode && currentStep) {
        // Guided mode - verify step
        const response = await api.post<VerificationResult>('/api/learn/verify', {
          problemId,
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
        // Check if answer matches one of the multiple choice options
        const userAnswerNormalized = userAnswer.trim().toUpperCase();
        const correctOption = question?.options[question.correctAnswer];

        const isCorrect =
          userAnswerNormalized === correctOption ||
          ['A', 'B', 'C', 'D'][question?.correctAnswer || 0] === userAnswerNormalized;

        setQuestionsAnswered(q => q + 1);

        if (isCorrect) {
          // Correct answer
          const newStreak = streak + 1;
          const newCorrect = correctCount + 1;
          setStreak(newStreak);
          setCorrectCount(newCorrect);
          setXp(xp + 20);

          setVerification({
            correct: true,
            feedback: question?.explanationLatex || question?.explanation || '¡Correcto!',
            canProceed: true,
          });
        } else {
          // Wrong answer - start guided mode
          setStreak(0);
          setVerification({
            correct: false,
            feedback: 'Esa no es la respuesta correcta. Te voy a ayudar paso a paso.',
            correctAnswer: correctOption,
            canProceed: false,
          });

          // Auto-start guided mode
          setTimeout(async () => {
            setGuidedMode(true);
            setMode('guided');
            await loadNextStep(problemId, 0);
          }, 2000);
        }
      }
    } catch (err) {
      setError('Error al verificar respuesta');
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNextStep = async () => {
    if (!problemId || !currentStep) return;

    if (currentStep.isComplete) {
      // Problem complete in guided mode
      setQuestionsAnswered(q => q + 1);
      const newCorrect = correctCount + 1;
      setCorrectCount(newCorrect);
      setXp(xp + 15);
      handleNextProblem();
    } else {
      // Load next step
      await loadNextStep(problemId, currentStep.stepNumber);
    }
  };

  const handleNextProblem = () => {
    // Reset state and start new assessment
    setMode('setup');
    setMessages([]);
    setSessionId(null);
    setAssessment(null);
    setProblemId(null);
    setQuestion(null);
    setSteps([]);
    setPersonalizedHint('');
    setCurrentStep(null);
    setUserAnswer('');
    setVerification(null);
    setShowHint(false);
    setGuidedMode(false);
    setCompletedSteps(0);
  };

  // ============================================================================
  // UI Rendering
  // ============================================================================

  // Setup Screen
  if (mode === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-8">
        <Card className="max-w-2xl w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎓</div>
            <Heading level={1} className="text-4xl mb-2">
              Aprendizaje Personalizado
            </Heading>
            <Text variant="secondary" className="text-lg">
              Te haré algunas preguntas para entender tu nivel y elegir el problema perfecto
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
                    : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                }`}
              >
                <Text className="font-bold">Primero Medio</Text>
                <Text size="sm" variant="secondary">M1</Text>
              </button>
              <button
                onClick={() => setSelectedLevel('M2')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedLevel === 'M2'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                    : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                }`}
              >
                <Text className="font-bold">Segundo Medio</Text>
                <Text size="sm" variant="secondary">M2</Text>
              </button>
            </div>
          </div>

          {/* Subject Selection */}
          <div className="mb-8">
            <Text className="font-semibold mb-3">¿Qué tema quieres practicar?</Text>
            <div className="grid grid-cols-2 gap-3">
              {(['números', 'álgebra', 'geometría', 'probabilidad'] as const).map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedSubject === subject
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                      : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  <Text className="capitalize">{subject}</Text>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <Text className="text-red-700 dark:text-red-300">{error}</Text>
            </div>
          )}

          <Button
            onClick={startAssessment}
            fullWidth
            size="lg"
            disabled={loading}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
          >
            {loading ? 'Iniciando...' : 'Comenzar'}
          </Button>

          {/* Session Stats Display */}
          {questionsAnswered > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <Text size="sm" variant="secondary">Preguntas</Text>
                <Text className="text-2xl font-bold">{questionsAnswered}</Text>
              </div>
              <div className="text-center">
                <Text size="sm" variant="secondary">Correctas</Text>
                <Text className="text-2xl font-bold text-green-600">{correctCount}</Text>
              </div>
              <div className="text-center">
                <Text size="sm" variant="secondary">XP</Text>
                <Text className="text-2xl font-bold text-purple-600">{xp}</Text>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Assessment Chat Screen
  if (mode === 'assessment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl">
            <div className="mb-6">
              <Heading level={2}>Conversemos sobre tu nivel</Heading>
              <Text variant="secondary">
                Responde honestamente para que pueda elegir el mejor problema para ti
              </Text>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      msg.role === 'user'
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    <MarkdownViewer content={msg.content} />
                  </div>
                </div>
              ))}
              {isAssessing && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            {!assessment && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isAssessing && sendMessage()}
                  placeholder="Escribe tu respuesta aquí..."
                  disabled={isAssessing}
                  className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-teal-500 dark:bg-slate-800"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!userInput.trim() || isAssessing}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Enviar
                </Button>
              </div>
            )}

            {assessment && (
              <div className="text-center">
                <div className="animate-pulse text-teal-600 dark:text-teal-400">
                  <div className="text-4xl mb-2">🔍</div>
                  <Text className="font-semibold">Seleccionando el problema perfecto para ti...</Text>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (mode === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
        <Card className="text-center p-12">
          <div className="animate-pulse">
            <div className="text-6xl mb-4">🎯</div>
            <Heading level={2} className="mb-2">Preparando tu problema</Heading>
            <Text variant="secondary">Generando guía personalizada...</Text>
          </div>
        </Card>
      </div>
    );
  }

  // Choosing Mode - Show question and let student choose approach
  if (mode === 'choosing' && question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-cyan-600 px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="shadow-2xl">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white -mx-6 -mt-6 px-6 py-4 rounded-t-xl mb-6">
              <div className="flex items-center justify-between">
                <Heading level={2} className="text-white">
                  Aquí está tu problema
                </Heading>
                <Text size="sm" className="text-white/90">
                  {question.topic} • {question.difficulty}
                </Text>
              </div>
            </div>

            <div className="mb-6">
              <MarkdownViewer content={question.questionLatex || question.question} />
            </div>

            {/* Multiple choice options */}
            <div className="mb-6 space-y-2">
              <Text className="font-semibold mb-3">Opciones:</Text>
              {question.options.map((option, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Text>
                    <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][idx]})</span>
                    <MarkdownViewer content={question.optionsLatex?.[idx] || option} />
                  </Text>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 -mx-6 -mb-6">
              <Heading level={3} className="text-center mb-4">
                ¿Cómo quieres abordarlo?
              </Heading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Try Alone Button */}
                <button
                  onClick={handleTryAlone}
                  className="group p-6 rounded-xl border-2 border-teal-300 dark:border-teal-700 bg-white dark:bg-slate-900 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950 transition-all hover:shadow-lg hover:scale-105"
                >
                  <div className="text-4xl mb-3">🚀</div>
                  <Text className="font-bold text-lg mb-2">Puedo resolverlo</Text>
                  <Text size="sm" variant="secondary">
                    Intentaré por mi cuenta y obtendré más XP
                  </Text>
                </button>

                {/* Get Help Button */}
                <button
                  onClick={handleGetHelp}
                  className="group p-6 rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all hover:shadow-lg hover:scale-105"
                >
                  <div className="text-4xl mb-3">🤝</div>
                  <Text className="font-bold text-lg mb-2">Ayúdame paso a paso</Text>
                  <Text size="sm" variant="secondary">
                    Guíame a través de la solución
                  </Text>
                </button>
              </div>

              {/* Optional Hint */}
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  {showHint ? '🙈 Ocultar pista' : '💡 Ver una pista primero'}
                </button>
                {showHint && (
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-900 dark:text-yellow-100">
                    <MarkdownViewer content={personalizedHint} />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Session Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="text-center">
              <Text size="sm" variant="secondary">Preguntas</Text>
              <Text className="text-2xl font-bold">{questionsAnswered}</Text>
            </Card>
            <Card className="text-center">
              <Text size="sm" variant="secondary">Correctas</Text>
              <Text className="text-2xl font-bold text-green-600">{correctCount}</Text>
            </Card>
            <Card className="text-center">
              <Text size="sm" variant="secondary">Precisión</Text>
              <Text className="text-2xl font-bold">
                {questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0}%
              </Text>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Solving/Guided Mode
  if ((mode === 'solving' || mode === 'guided') && question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-cyan-600 px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="shadow-2xl">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white -mx-6 -mt-6 px-6 py-4 rounded-t-xl mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <Heading level={2} className="text-white">
                    {guidedMode ? '🤝 Modo Guiado' : '🚀 Modo Libre'}
                  </Heading>
                  {guidedMode && (
                    <Text size="xs" className="text-white/75">
                      Paso {completedSteps + 1} de {steps.length}
                    </Text>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <MarkdownViewer content={question.questionLatex || question.question} />
            </div>

            {/* Multiple choice options */}
            <div className="mb-6 space-y-2">
              <Text className="font-semibold mb-3">Opciones:</Text>
              {question.options.map((option, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Text>
                    <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][idx]})</span>
                    <MarkdownViewer content={question.optionsLatex?.[idx] || option} />
                  </Text>
                </div>
              ))}
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
                  <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-900 dark:text-yellow-100">
                    <MarkdownViewer content={personalizedHint} />
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
                    onKeyPress={(e) => e.key === 'Enter' && !isVerifying && handleSubmitAnswer()}
                    placeholder="Escribe tu respuesta (A, B, C, D o el valor)..."
                    className="w-full px-4 py-3 text-lg border-2 border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-teal-500 dark:bg-slate-800"
                    disabled={isVerifying}
                  />
                </div>
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim() || isVerifying}
                  fullWidth
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                >
                  {isVerifying ? 'Verificando...' : 'Verificar'}
                </Button>
              </div>
            )}

            {/* Verification Feedback */}
            {verification && (
              <div className="mt-6">
                <div
                  className={`p-4 rounded-xl border-2 ${
                    verification.correct
                      ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                      : 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
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
                      <div className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                        Respuesta correcta: <MarkdownViewer content={verification.correctAnswer} />
                      </div>
                    </div>
                  )}
                </div>

                {verification.correct && !guidedMode && (
                  <div className="space-y-3 mt-4">
                    {streak >= 2 && (
                      <div className="text-center p-3 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-950 dark:to-yellow-950 rounded-lg">
                        <Text className="font-bold text-orange-700 dark:text-orange-300">
                          🔥 +20 XP | Racha: {streak}
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
                    className="mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
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
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                <Text className="text-red-700 dark:text-red-300">{error}</Text>
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
              <Text className="text-2xl font-bold text-green-600">{correctCount}</Text>
            </Card>
            <Card className="text-center">
              <Text size="sm" variant="secondary">XP Total</Text>
              <Text className="text-2xl font-bold text-purple-600">{xp}</Text>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
