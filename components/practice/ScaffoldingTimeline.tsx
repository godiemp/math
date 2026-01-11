'use client';

import type { ScaffoldingHistoryEntry, DecomposedSkill } from '@/hooks/usePracticeSession';

interface ScaffoldingTimelineProps {
  history: ScaffoldingHistoryEntry[];
  currentSkillIndex: number;
  selectedSkills: DecomposedSkill[];
  onReviewEntry: (entry: ScaffoldingHistoryEntry) => void;
}

export function ScaffoldingTimeline({
  history,
  currentSkillIndex,
  selectedSkills,
  onReviewEntry,
}: ScaffoldingTimelineProps) {
  // If no skills selected and no history, don't render
  if (selectedSkills.length === 0 && history.length === 0) {
    return null;
  }

  return (
    <div
      data-testid="scaffolding-timeline"
      className="bg-white dark:bg-[#1C1C1C] rounded-xl border border-black/[0.08] dark:border-white/[0.08] p-4"
    >
      <h3
        data-testid="timeline-title"
        className="text-sm font-semibold text-black/70 dark:text-white/70 mb-3 flex items-center gap-2"
      >
        <svg
          className="w-4 h-4 text-[#0A84FF]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Ruta de aprendizaje
      </h3>

      {/* Timeline */}
      <div data-testid="timeline-nodes" className="relative">
        {/* Original question */}
        {history.length > 0 && (
          <TimelineNode
            testId="timeline-node-original"
            label="Pregunta original"
            isCompleted
            wasCorrect={false}
            onClick={() => onReviewEntry(history[0])}
            isFirst
          />
        )}

        {/* Skills */}
        {selectedSkills.map((skill, index) => {
          const historyEntry = history.find((h) => h.skill?.id === skill.id);
          const isCompleted = skill.completed === true;
          const isCurrent = index === currentSkillIndex;

          return (
            <TimelineNode
              key={skill.id}
              testId={`timeline-node-${index}`}
              label={skill.name}
              sublabel={skill.difficulty}
              isCompleted={isCompleted}
              wasCorrect={skill.wasCorrect}
              isCurrent={isCurrent}
              onClick={historyEntry ? () => onReviewEntry(historyEntry) : undefined}
              isLast={index === selectedSkills.length - 1}
            />
          );
        })}
      </div>

      {/* Progress indicator */}
      <div
        data-testid="timeline-progress"
        className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-black/60 dark:text-white/60">Progreso</span>
          <span
            data-testid="timeline-progress-count"
            className="font-medium text-black dark:text-white"
          >
            {selectedSkills.filter((s) => s.completed).length} / {selectedSkills.length}
          </span>
        </div>
        <div className="mt-2 h-2 bg-black/[0.06] dark:bg-white/[0.06] rounded-full overflow-hidden">
          <div
            data-testid="timeline-progress-bar"
            className="h-full bg-gradient-to-r from-[#0A84FF] to-[#34C759] transition-all duration-300"
            style={{
              width: `${
                selectedSkills.length > 0
                  ? (selectedSkills.filter((s) => s.completed).length / selectedSkills.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface TimelineNodeProps {
  testId?: string;
  label: string;
  sublabel?: string;
  isCompleted?: boolean;
  wasCorrect?: boolean;
  isCurrent?: boolean;
  onClick?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

function TimelineNode({
  testId,
  label,
  sublabel,
  isCompleted,
  wasCorrect,
  isCurrent,
  onClick,
  isLast,
}: TimelineNodeProps) {
  const getNodeStyle = () => {
    if (isCurrent) {
      return 'bg-[#FF9F0A] ring-4 ring-[#FF9F0A]/20 animate-pulse';
    }
    if (isCompleted) {
      return wasCorrect ? 'bg-[#34C759]' : 'bg-[#FF453A]';
    }
    return 'bg-black/20 dark:bg-white/20';
  };

  const getIcon = () => {
    if (isCurrent) {
      return <div className="w-2 h-2 bg-white rounded-full" />;
    }
    if (isCompleted) {
      return wasCorrect ? (
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div data-testid={testId} className="relative flex items-start gap-3 pb-4 last:pb-0">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-black/[0.08] dark:bg-white/[0.08]" />
      )}

      {/* Node circle */}
      <button
        data-testid={testId ? `${testId}-button` : undefined}
        onClick={onClick}
        disabled={!onClick}
        className={`relative z-10 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${getNodeStyle()} ${
          onClick ? 'cursor-pointer hover:ring-2 hover:ring-[#0A84FF]/30' : 'cursor-default'
        }`}
      >
        {getIcon()}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div
          className={`text-sm font-medium ${
            isCurrent
              ? 'text-[#FF9F0A]'
              : isCompleted
                ? wasCorrect
                  ? 'text-[#34C759]'
                  : 'text-[#FF453A]'
                : 'text-black/50 dark:text-white/50'
          }`}
        >
          {label}
        </div>
        {sublabel && (
          <div className="text-xs text-black/40 dark:text-white/40 capitalize">{sublabel}</div>
        )}
      </div>

      {/* Click indicator for completed entries */}
      {onClick && isCompleted && (
        <button
          onClick={onClick}
          className="flex-shrink-0 p-1 text-black/40 dark:text-white/40 hover:text-[#0A84FF] transition-colors"
          title="Ver detalles"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

// Compact horizontal version for mobile
export function ScaffoldingTimelineCompact({
  selectedSkills,
  currentSkillIndex,
}: {
  selectedSkills: DecomposedSkill[];
  currentSkillIndex: number;
}) {
  if (selectedSkills.length === 0) return null;

  return (
    <div
      data-testid="scaffolding-timeline-compact"
      className="bg-[#0A84FF]/5 dark:bg-[#0A84FF]/10 rounded-lg p-3 mb-4"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-black/60 dark:text-white/60">
          Ruta de aprendizaje
        </span>
        <span data-testid="timeline-compact-count" className="text-xs text-black/50 dark:text-white/50">
          {currentSkillIndex + 1} de {selectedSkills.length}
        </span>
      </div>

      {/* Horizontal progress dots */}
      <div data-testid="timeline-compact-dots" className="flex items-center gap-1.5">
        {selectedSkills.map((skill, index) => {
          const isCompleted = skill.completed === true;
          const isCurrent = index === currentSkillIndex;

          return (
            <div key={skill.id} className="flex items-center">
              <div
                data-testid={`timeline-compact-dot-${index}`}
                className={`w-3 h-3 rounded-full flex items-center justify-center ${
                  isCurrent
                    ? 'bg-[#FF9F0A] ring-2 ring-[#FF9F0A]/20'
                    : isCompleted
                      ? skill.wasCorrect
                        ? 'bg-[#34C759]'
                        : 'bg-[#FF453A]'
                      : 'bg-black/20 dark:bg-white/20'
                }`}
                title={skill.name}
              >
                {isCompleted && skill.wasCorrect && (
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              {index < selectedSkills.length - 1 && (
                <div
                  className={`w-4 h-0.5 ${
                    index < currentSkillIndex
                      ? 'bg-[#34C759]'
                      : 'bg-black/10 dark:bg-white/10'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current skill name */}
      {selectedSkills[currentSkillIndex] && (
        <div
          data-testid="timeline-compact-current-skill"
          className="mt-2 text-sm font-medium text-black/70 dark:text-white/70"
        >
          {selectedSkills[currentSkillIndex].name}
        </div>
      )}
    </div>
  );
}
