'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Text, Badge } from '@/components/ui';
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
  const checkboxRef = useRef<HTMLInputElement>(null);
  const subsectionCode = `${unitCode}:${subsection.code}`;

  // Calculate checkbox state based on skills
  const { subsectionKnown, allSkillsKnown, someSkillsKnown } = useMemo(() => {
    const subsectionKnown = isKnown('subsection', subsectionCode);

    if (!subsection.primary_skills || subsection.primary_skills.length === 0) {
      return { subsectionKnown, allSkillsKnown: subsectionKnown, someSkillsKnown: subsectionKnown };
    }

    let knownCount = 0;
    for (const skill of subsection.primary_skills) {
      if (isKnown('skill', skill)) {
        knownCount++;
      }
    }

    const allSkillsKnown = knownCount === subsection.primary_skills.length;
    const someSkillsKnown = knownCount > 0;

    return { subsectionKnown, allSkillsKnown, someSkillsKnown };
  }, [subsection, subsectionCode, isKnown]);

  // Set indeterminate state
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = someSkillsKnown && !allSkillsKnown;
    }
  }, [someSkillsKnown, allSkillsKnown]);

  const handleSubsectionToggle = () => {
    const newKnowsState = !allSkillsKnown;
    setKnowledge('subsection', subsectionCode, newKnowsState, true); // cascade=true
  };

  const handleSkillToggle = (skill: string) => {
    const currentlyKnown = isKnown('skill', skill);
    setKnowledge('skill', skill, !currentlyKnown, false);
  };

  return (
    <div className="bg-white dark:bg-[#2C2C2E] rounded-lg p-3 border border-black/[0.04] dark:border-white/[0.06]">
      {/* Subsection header */}
      <div className="flex items-center gap-3 mb-2">
        {/* Checkbox */}
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={allSkillsKnown || subsectionKnown}
          onChange={handleSubsectionToggle}
          className="h-4 w-4 rounded border-2 border-black/[0.12] dark:border-white/[0.16]
                     text-[#0A84FF] bg-white dark:bg-[#3C3C3E]
                     focus:ring-2 focus:ring-[#0A84FF]/50 focus:ring-offset-0
                     transition-all duration-[180ms] cursor-pointer
                     checked:bg-[#0A84FF] checked:border-[#0A84FF]
                     indeterminate:bg-[#0A84FF]/50 indeterminate:border-[#0A84FF]"
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

      {/* Skills as chips */}
      {subsection.primary_skills && subsection.primary_skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 ml-7">
          {subsection.primary_skills.map((skill) => {
            const skillKnown = isKnown('skill', skill);
            // Format skill name for display
            const displayName = skill
              .replace(/-/g, ' ')
              .replace(/numeros|algebra|geometria|probabilidad/gi, '')
              .trim();

            return (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all duration-[180ms] border ${
                  skillKnown
                    ? 'bg-[#30D158] text-white border-[#30D158] hover:bg-[#28b84e]'
                    : 'bg-black/[0.02] dark:bg-white/[0.04] text-black/60 dark:text-white/60 border-black/[0.08] dark:border-white/[0.08] hover:border-[#0A84FF]/50 hover:bg-[#0A84FF]/5'
                }`}
                title={skill}
              >
                {skillKnown && (
                  <span className="mr-1">✓</span>
                )}
                {displayName || skill}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
