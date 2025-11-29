'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Text, Badge } from '@/components/ui';
import { SubsectionDeclarationRow } from './SubsectionDeclarationRow';
import type { ThematicUnit } from '@/lib/services/thematicUnitsService';

interface UnitDeclarationRowProps {
  unit: ThematicUnit;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isKnown: (type: 'unit' | 'subsection' | 'skill', itemCode: string) => boolean;
  setKnowledge: (type: 'unit' | 'subsection' | 'skill', itemCode: string, knows: boolean, cascade?: boolean) => void;
}

export function UnitDeclarationRow({
  unit,
  isExpanded,
  onToggleExpand,
  isKnown,
  setKnowledge,
}: UnitDeclarationRowProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Calculate checkbox state based on subsections
  const { unitKnown, allSubsectionsKnown, someSubsectionsKnown } = useMemo(() => {
    const unitKnown = isKnown('unit', unit.code);

    if (!unit.subsections || unit.subsections.length === 0) {
      return { unitKnown, allSubsectionsKnown: unitKnown, someSubsectionsKnown: unitKnown };
    }

    let knownCount = 0;
    for (const subsection of unit.subsections) {
      const subsectionCode = `${unit.code}:${subsection.code}`;
      if (isKnown('subsection', subsectionCode)) {
        knownCount++;
      }
    }

    const allSubsectionsKnown = knownCount === unit.subsections.length;
    const someSubsectionsKnown = knownCount > 0;

    return { unitKnown, allSubsectionsKnown, someSubsectionsKnown };
  }, [unit, isKnown]);

  // Set indeterminate state
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = someSubsectionsKnown && !allSubsectionsKnown;
    }
  }, [someSubsectionsKnown, allSubsectionsKnown]);

  const handleUnitToggle = () => {
    // If currently all known, mark as unknown; otherwise mark all as known
    const newKnowsState = !allSubsectionsKnown;
    setKnowledge('unit', unit.code, newKnowsState, true); // cascade=true
  };

  const subsectionCount = unit.subsections?.length || 0;

  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08]">
      {/* Unit header row */}
      <div className="flex items-center gap-3 p-3">
        {/* Checkbox */}
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={allSubsectionsKnown || unitKnown}
          onChange={handleUnitToggle}
          className="h-5 w-5 rounded border-2 border-black/[0.12] dark:border-white/[0.16]
                     text-[#0A84FF] bg-white dark:bg-[#2C2C2E]
                     focus:ring-2 focus:ring-[#0A84FF]/50 focus:ring-offset-0
                     transition-all duration-[180ms] cursor-pointer
                     checked:bg-[#0A84FF] checked:border-[#0A84FF]
                     indeterminate:bg-[#0A84FF]/50 indeterminate:border-[#0A84FF]"
        />

        {/* Unit info */}
        <div className="flex-1 min-w-0" onClick={onToggleExpand}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Badge variant="secondary" size="sm" className="flex-shrink-0">
              {unit.code}
            </Badge>
            <Text size="sm" className="font-medium truncate">
              {unit.name}
            </Text>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Text size="xs" variant="secondary">
              {subsectionCount} {subsectionCount === 1 ? 'subsección' : 'subsecciones'}
            </Text>
          </div>
        </div>

        {/* Expand/collapse button */}
        {subsectionCount > 0 && (
          <button
            onClick={onToggleExpand}
            className="p-2 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
            aria-label={isExpanded ? 'Contraer' : 'Expandir'}
          >
            <svg
              className={`w-4 h-4 text-black/40 dark:text-white/40 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Expanded subsections */}
      {isExpanded && unit.subsections && unit.subsections.length > 0 && (
        <div className="border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.02]">
          <div className="p-3 space-y-2">
            {unit.subsections.map((subsection) => (
              <SubsectionDeclarationRow
                key={`${unit.code}:${subsection.code}`}
                unitCode={unit.code}
                subsection={subsection}
                isKnown={isKnown}
                setKnowledge={setKnowledge}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
