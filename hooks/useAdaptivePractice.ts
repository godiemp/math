import { useCallback } from 'react';
import { usePracticeSession } from './usePracticeSession';
import { useAITutor } from './useAITutor';

/**
 * Coordinator hook that combines practice session and AI tutor state
 * Extracts coordination logic from the page component
 */
export function useAdaptivePractice() {
  const practice = usePracticeSession();
  const tutor = useAITutor();

  /**
   * Start practice with a focus topic
   * Clears tutor messages when starting fresh
   */
  const handleStartPractice = useCallback((focus: string) => {
    tutor.clearMessages();
    practice.startPractice(focus);
  }, [tutor, practice]);

  /**
   * Submit the current answer
   * Tracks whether hints were used for analytics
   */
  const handleSubmitAnswer = useCallback(() => {
    practice.submitAnswer(tutor.hasMessages);
  }, [practice, tutor.hasMessages]);

  /**
   * Proceed to the next problem
   * Clears tutor messages for fresh conversation
   */
  const handleNextProblem = useCallback(() => {
    tutor.clearMessages();
    practice.nextProblem();
  }, [tutor, practice]);

  /**
   * Proceed to scaffolding question
   * Clears tutor messages for fresh conversation on new problem
   */
  const handleProceedToScaffolding = useCallback(() => {
    tutor.clearMessages();
    practice.proceedToScaffolding();
  }, [tutor, practice]);

  /**
   * Send a chat message to the AI tutor
   */
  const handleSendChatMessage = useCallback((message: string) => {
    if (practice.currentProblem) {
      tutor.sendMessage(message, practice.currentProblem);
    }
  }, [tutor, practice.currentProblem]);

  /**
   * Change topic and reset everything
   */
  const handleChangeTopic = useCallback(() => {
    tutor.clearMessages();
    practice.changeTopic();
  }, [tutor, practice]);

  return {
    // Practice state
    state: practice.state,
    selectedFocus: practice.selectedFocus,
    currentProblem: practice.currentProblem,
    selectedAnswer: practice.selectedAnswer,
    feedback: practice.feedback,
    error: practice.error,

    // Scaffolding state
    scaffoldingMode: practice.scaffoldingMode,
    scaffoldingQuestion: practice.scaffoldingQuestion,
    scaffoldingDepth: practice.scaffoldingDepth,
    isGeneratingScaffolding: practice.isGeneratingScaffolding,
    maxScaffoldingDepth: practice.maxScaffoldingDepth,

    // Tutor state
    tutorMessages: tutor.messages,
    isTutorLoading: tutor.isLoading,

    // Actions
    startPractice: handleStartPractice,
    setSelectedAnswer: practice.setSelectedAnswer,
    submitAnswer: handleSubmitAnswer,
    nextProblem: handleNextProblem,
    changeTopic: handleChangeTopic,
    proceedToScaffolding: handleProceedToScaffolding,
    sendChatMessage: handleSendChatMessage,
  };
}
