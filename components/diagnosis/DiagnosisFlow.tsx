'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Card, Badge, Text, Heading } from '@/components/ui';
import { QuestionRenderer } from '@/components/quiz/QuestionRenderer';
import { FollowUpChat } from './FollowUpChat';
import { DiagnosisResults } from './DiagnosisResults';
import { api } from '@/lib/api-client';
import type { Question } from '@/lib/types';

// Types for the diagnosis flow
interface DiagnosisQuestion {
  id: string;
  skillId: string;
  skillName: string;
  question: string;
  questionLatex?: string;
  options: string[];
  optionsLatex?: string[];
  correctAnswer: number;
  difficulty: string;
  subject: string;
}

interface DetectedGap {
  skillId: string;
  skillName: string;
  severity: 'critical' | 'moderate' | 'minor';
  specificIssue: string;
  conceptMissing: string;
  evidenceQuestionId: string;
  userAnswer: number;
  correctAnswer: number;
  followUpExplanation?: string;
}

interface GapRecommendation {
  type: 'lesson' | 'practice' | 'prerequisite';
  skillId: string;
  skillName: string;
  reason: string;
  resourceId?: string;
  priority: number;
}

interface DiagnosisResult {
  sessionId: string;
  userId: string;
  level: 'M1' | 'M2';
  totalQuestions: number;
  correctAnswers: number;
  verifiedSkills: string[];
  unverifiedSkills: string[];
  gaps: DetectedGap[];
  recommendations: GapRecommendation[];
  completedAt: number;
}

interface DiagnosisFlowProps {
  skillsToVerify: string[];
  level: 'M1' | 'M2';
  onComplete: (result: DiagnosisResult) => void;
  onClose: () => void;
}

type FlowState = 'loading' | 'question' | 'follow-up' | 'analyzing' | 'results';

export function DiagnosisFlow({
  skillsToVerify,
  level,
  onComplete,
  onClose,
}: DiagnosisFlowProps) {
  const [flowState, setFlowState] = useState<FlowState>('loading');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<DiagnosisQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestionResult, setCurrentQuestionResult] = useState<{
    isCorrect: boolean;
    correctAnswer: number;
  } | null>(null);
  const [gaps, setGaps] = useState<DetectedGap[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  // Load questions on mount
  useEffect(() => {
    loadQuestions();
  }, [skillsToVerify, level]);

  async function loadQuestions() {
    try {
      setFlowState('loading');
      setError(null);

      console.log('[DiagnosisFlow] loadQuestions called');
      console.log('[DiagnosisFlow] skillsToVerify:', skillsToVerify);
      console.log('[DiagnosisFlow] level:', level);

      // Check if we have skills to verify
      if (skillsToVerify.length === 0) {
        console.log('[DiagnosisFlow] No skills to verify - showing error');
        setError('No hay habilidades para evaluar en este tema.');
        return;
      }

      const url = `/api/diagnosis/questions?skills=${skillsToVerify.join(',')}&level=${level}&limit=5`;
      console.log('[DiagnosisFlow] Fetching:', url);

      const response = await api.get<{
        success: boolean;
        data: { sessionId: string; questions: DiagnosisQuestion[] };
      }>(url);

      console.log('[DiagnosisFlow] Response:', response);

      if (response.data?.data && response.data.data.questions.length > 0) {
        console.log('[DiagnosisFlow] Got', response.data.data.questions.length, 'questions');
        setSessionId(response.data.data.sessionId);
        setQuestions(response.data.data.questions);
        setFlowState('question');
      } else {
        console.log('[DiagnosisFlow] No questions in response - throwing error');
        throw new Error('No questions available');
      }
    } catch (err: unknown) {
      console.error('[DiagnosisFlow] Failed to load questions:', err);
      // Check for specific error messages
      const errorMessage =
        err instanceof Error && err.message.includes('No questions')
          ? 'No hay preguntas disponibles para estas habilidades. Intenta con otro tema.'
          : 'No pudimos cargar las preguntas. Por favor intenta de nuevo.';
      console.log('[DiagnosisFlow] Setting error message:', errorMessage);
      setError(errorMessage);
      setFlowState('loading');
    }
  }

  async function handleAnswerSelect(answerIndex: number) {
    if (!sessionId || !currentQuestion) return;

    setSelectedAnswer(answerIndex);

    try {
      const response = await api.post<{
        success: boolean;
        data: { isCorrect: boolean; correctAnswer: number; requiresFollowUp: boolean };
      }>('/api/diagnosis/answer', {
        sessionId,
        questionId: currentQuestion.id,
        userAnswer: answerIndex,
      });

      if (response.data?.data) {
        const { isCorrect, correctAnswer, requiresFollowUp } = response.data.data;
        setCurrentQuestionResult({ isCorrect, correctAnswer });

        // Wait a moment to show feedback
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (requiresFollowUp) {
          setFlowState('follow-up');
        } else {
          // Move to next question
          moveToNextQuestion();
        }
      }
    } catch (err) {
      console.error('Failed to submit answer:', err);
      setError('Error al enviar respuesta');
    }
  }

  async function handleFollowUpSubmit(explanation: string) {
    if (!sessionId || !currentQuestion || selectedAnswer === null) return;

    setFlowState('analyzing');

    try {
      const response = await api.post<{
        success: boolean;
        data: { gap: DetectedGap };
      }>('/api/diagnosis/analyze-error', {
        sessionId,
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        questionLatex: currentQuestion.questionLatex,
        options: currentQuestion.options,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        followUpExplanation: explanation,
        skillId: currentQuestion.skillId,
        skillName: currentQuestion.skillName,
      });

      if (response.data?.data?.gap) {
        setGaps([...gaps, response.data.data.gap]);
      }

      moveToNextQuestion();
    } catch (err) {
      console.error('Failed to analyze error:', err);
      // Continue anyway
      moveToNextQuestion();
    }
  }

  function moveToNextQuestion() {
    setSelectedAnswer(null);
    setCurrentQuestionResult(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlowState('question');
    } else {
      // All questions answered, complete diagnosis
      completeDiagnosis();
    }
  }

  async function completeDiagnosis() {
    if (!sessionId) return;

    setFlowState('analyzing');

    try {
      const response = await api.post<{
        success: boolean;
        data: { result: DiagnosisResult };
      }>('/api/diagnosis/complete', { sessionId });

      if (response.data?.data?.result) {
        setResult(response.data.data.result);
        setFlowState('results');
        onComplete(response.data.data.result);
      }
    } catch (err) {
      console.error('Failed to complete diagnosis:', err);
      setError('Error al completar diagnóstico');
    }
  }

  // Convert to Question type for QuestionRenderer
  function toQuestionType(q: DiagnosisQuestion): Question {
    return {
      id: q.id,
      topic: q.skillName,
      level: level,
      questionLatex: q.questionLatex || q.question,
      options: q.optionsLatex || q.options,
      correctAnswer: q.correctAnswer,
      explanation: '',
      difficulty: q.difficulty as 'easy' | 'medium' | 'hard',
      difficultyScore: 0.5,
      subject: q.subject as 'números' | 'álgebra' | 'geometría' | 'probabilidad',
      skills: [q.skillId],
    };
  }

  return (
    <Modal isOpen={true} onClose={onClose} maxWidth="lg">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Heading level={3}>Verificar conocimiento</Heading>
            <Badge variant="info">{level}</Badge>
          </div>

          {flowState !== 'results' && questions.length > 0 && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Loading State */}
        {flowState === 'loading' && !error && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
            <Text>Preparando preguntas diagnósticas...</Text>
            <Text size="sm" className="text-gray-500 dark:text-gray-400 mt-2">
              Esto puede tomar unos segundos
            </Text>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <Text className="text-red-600 dark:text-red-400 mb-4">{error}</Text>
            <Button onClick={loadQuestions}>Reintentar</Button>
          </div>
        )}

        {/* Question State */}
        {flowState === 'question' && currentQuestion && (
          <div>
            <div className="mb-4">
              <Badge variant="neutral" className="mb-2">
                Pregunta {currentIndex + 1} de {questions.length}
              </Badge>
              <Text size="sm" className="text-gray-600 dark:text-gray-400">
                Evaluando: {currentQuestion.skillName}
              </Text>
            </div>

            <QuestionRenderer
              question={toQuestionType(currentQuestion)}
              mode="with-options"
              selectedAnswer={selectedAnswer}
              showFeedback={currentQuestionResult !== null}
              onAnswerSelect={handleAnswerSelect}
              disabled={selectedAnswer !== null}
            />
          </div>
        )}

        {/* Follow-up State */}
        {flowState === 'follow-up' && currentQuestion && (
          <FollowUpChat
            question={currentQuestion.questionLatex || currentQuestion.question}
            selectedOption={
              currentQuestion.options[selectedAnswer!] ||
              String.fromCharCode(65 + (selectedAnswer || 0))
            }
            onSubmit={handleFollowUpSubmit}
            onSkip={() => moveToNextQuestion()}
          />
        )}

        {/* Analyzing State */}
        {flowState === 'analyzing' && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
            <Text>Analizando tu respuesta...</Text>
          </div>
        )}

        {/* Results State */}
        {flowState === 'results' && result && (
          <DiagnosisResults result={result} onClose={onClose} />
        )}
      </div>
    </Modal>
  );
}
