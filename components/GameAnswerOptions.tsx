import { Check, X } from 'lucide-react';

interface GameAnswerOptionsProps {
  options: (string | number)[];
  selectedAnswer: string | number | null;
  correctAnswer: string | number;
  showFeedback: boolean;
  isCorrect: boolean;
  onAnswer: (answer: string | number) => void;
  themeColor?: 'orange' | 'cyan' | 'emerald' | 'purple' | 'indigo';
  disabled?: boolean;
  gridCols?: 2 | 3;
}

/**
 * Shared answer options component for geometry games
 * Provides consistent styling and behavior across all games
 */
export default function GameAnswerOptions({
  options,
  selectedAnswer,
  correctAnswer,
  showFeedback,
  isCorrect,
  onAnswer,
  themeColor = 'purple',
  disabled = false,
  gridCols,
}: GameAnswerOptionsProps) {
  // Auto-detect grid columns if not specified
  const cols = gridCols || (options.length === 3 ? 3 : 2);

  // Theme color mappings
  const themeColors = {
    orange: {
      hover: 'hover:border-orange-400 dark:hover:border-orange-500',
      selected: 'bg-orange-100 dark:bg-orange-900/50 text-orange-900 dark:text-orange-300 border-orange-500',
    },
    cyan: {
      hover: 'hover:border-cyan-400 dark:hover:border-cyan-500',
      selected: 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-900 dark:text-cyan-300 border-cyan-500',
    },
    emerald: {
      hover: 'hover:border-emerald-400 dark:hover:border-emerald-500',
      selected: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300 border-emerald-500',
    },
    purple: {
      hover: 'hover:border-purple-400 dark:hover:border-purple-500',
      selected: 'bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-300 border-purple-500',
    },
    indigo: {
      hover: 'hover:border-indigo-400 dark:hover:border-indigo-500',
      selected: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-300 border-indigo-500',
    },
  };

  const theme = themeColors[themeColor];

  return (
    <div className={`grid gap-3 sm:gap-4 mb-6 grid-cols-${cols}`}>
      {options.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const isCorrectOption = option === correctAnswer;
        const showCorrect = showFeedback && isCorrectOption;
        const showIncorrect = showFeedback && isSelected && !isCorrect;

        let buttonClass = `bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${theme.hover}`;

        if (showCorrect) {
          buttonClass = 'bg-green-100 dark:bg-green-900/50 text-green-900 dark:text-green-300 border-green-500';
        } else if (showIncorrect) {
          buttonClass = 'bg-red-100 dark:bg-red-900/50 text-red-900 dark:text-red-300 border-red-500';
        } else if (isSelected && !showFeedback) {
          buttonClass = `${theme.selected}`;
        }

        return (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={disabled || showFeedback}
            className={`relative py-4 sm:py-5 px-4 text-base sm:text-lg font-semibold rounded-xl border-2 transition-all transform hover:scale-105 ${buttonClass} disabled:transform-none disabled:opacity-90`}
          >
            {/* Number indicator */}
            <span className="absolute top-2 left-2 text-xs text-gray-400 dark:text-gray-500">
              {index + 1}
            </span>

            {/* Answer text */}
            <div className="text-center">
              {typeof option === 'number' ? option : option}
            </div>

            {/* Check/X icons */}
            {showCorrect && (
              <Check size={20} className="absolute top-2 right-2 text-green-600 dark:text-green-400" />
            )}
            {showIncorrect && (
              <X size={20} className="absolute top-2 right-2 text-red-600 dark:text-red-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
