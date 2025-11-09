/**
 * Manages quiz navigation (previous, next, jump to question)
 */
export const useQuizNavigation = (
  currentQuestionIndex: number,
  setCurrentQuestionIndex: (index: number) => void,
  totalQuestions: number
) => {
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  return {
    handlePrevious,
    handleNext,
    navigateToQuestion,
    canGoPrevious: currentQuestionIndex > 0,
    canGoNext: currentQuestionIndex < totalQuestions - 1,
  };
};
