'use client';

// ============================================================================
// Constants
// ============================================================================

export const TOPIC_EMOJIS: Record<string, string> = {
  números: '🔢',
  álgebra: '📐',
  geometría: '📏',
  probabilidad: '🎲',
  surprise: '🎁',
};

export const TOPIC_COLORS: Record<string, string> = {
  números: 'from-blue-500 to-cyan-500',
  álgebra: 'from-purple-500 to-pink-500',
  geometría: 'from-green-500 to-teal-500',
  probabilidad: 'from-orange-500 to-yellow-500',
  surprise: 'from-gray-500 to-gray-600',
};

// ============================================================================
// Types
// ============================================================================

export interface Topic {
  id: string;
  name: string;
  type: 'subject' | 'unit';
}

export interface TopicCardProps {
  topic: { id: string; name: string };
  onSelect: (id: string) => void;
  onShowSubsections?: (id: string) => void;
}

// ============================================================================
// Component
// ============================================================================

export function TopicCard({
  topic,
  onSelect,
  onShowSubsections,
}: TopicCardProps) {
  const emoji = TOPIC_EMOJIS[topic.id] || '📚';
  const gradient = TOPIC_COLORS[topic.id] || 'from-gray-500 to-gray-600';
  const showSubsectionButton = topic.id !== 'surprise' && onShowSubsections;

  return (
    <div
      data-testid={`topic-card-${topic.id}`}
      className={`
      relative overflow-hidden rounded-2xl
      bg-gradient-to-br ${gradient}
      text-white
      transition-all duration-300
      hover:shadow-2xl
    `}
    >
      <button
        data-testid={`topic-select-${topic.id}`}
        onClick={() => onSelect(topic.id)}
        className="w-full p-6 text-left transition-all hover:scale-[1.02] active:scale-95"
      >
        <div className="text-4xl mb-3">{emoji}</div>
        <h3 className="text-xl font-bold">{topic.name}</h3>
        <p className="text-sm text-white/70 mt-1">Practicar con AI</p>
      </button>

      {showSubsectionButton && (
        <button
          data-testid={`topic-subsections-${topic.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onShowSubsections(topic.id);
          }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/20 text-white/90 text-xs font-medium hover:bg-white/30 transition-colors"
        >
          Ver subsecciones
        </button>
      )}
    </div>
  );
}

TopicCard.displayName = 'TopicCard';
