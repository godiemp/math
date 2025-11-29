'use client';

import { Text } from '@/components/ui';
import type { UnitSubsection } from '@/lib/services/thematicUnitsService';

interface SubsectionDeclarationRowProps {
  unitCode: string;
  subsection: UnitSubsection;
  isKnown: (type: 'unit' | 'subsection' | 'skill', itemCode: string) => boolean;
  setKnowledge: (type: 'unit' | 'subsection' | 'skill', itemCode: string, knows: boolean, cascade?: boolean) => void;
}

export function SubsectionDeclarationRow({
  unitCode,
  subsection,
  isKnown,
  setKnowledge,
}: SubsectionDeclarationRowProps) {
  const subsectionCode = `${unitCode}:${subsection.code}`;
  const subsectionKnown = isKnown('subsection', subsectionCode);

  const handleSubsectionToggle = () => {
    setKnowledge('subsection', subsectionCode, !subsectionKnown, false);
  };

  return (
    <div className="flex items-center gap-3 py-1.5">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={subsectionKnown}
        onChange={handleSubsectionToggle}
        className="h-4 w-4 rounded border-2 border-black/[0.12] dark:border-white/[0.16]
                   text-[#0A84FF] bg-white dark:bg-[#3C3C3E]
                   focus:ring-2 focus:ring-[#0A84FF]/50 focus:ring-offset-0
                   transition-all duration-[180ms] cursor-pointer
                   checked:bg-[#0A84FF] checked:border-[#0A84FF]"
      />

      {/* Subsection info */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-xs font-semibold text-black/40 dark:text-white/40 flex-shrink-0">
          {subsection.code}.
        </span>
        <Text size="sm" className="truncate">
          {subsection.name}
        </Text>
      </div>
    </div>
  );
}
