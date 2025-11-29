'use client';

import { useState, useEffect } from 'react';
import { Card, Heading, Text } from '@/components/ui';
import { useKnowledgeDeclarations } from '@/lib/hooks/useKnowledgeDeclarations';
import { getGroupedUnits, type ThematicUnit } from '@/lib/services/thematicUnitsService';
import { UnitDeclarationRow } from './UnitDeclarationRow';
import type { Level, Subject } from '@/lib/types';

interface KnowledgeDeclarationPanelProps {
  initialLevel?: Level;
}

// Subject display configuration
const subjectConfig: Record<Subject, { displayName: string; icon: string; color: string; borderColor: string; textColor: string }> = {
  números: {
    displayName: 'Números',
    icon: '🔢',
    color: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-900 dark:text-blue-100',
  },
  álgebra: {
    displayName: 'Álgebra y Funciones',
    icon: '📐',
    color: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    textColor: 'text-purple-900 dark:text-purple-100',
  },
  geometría: {
    displayName: 'Geometría',
    icon: '📏',
    color: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-900 dark:text-green-100',
  },
  probabilidad: {
    displayName: 'Probabilidad y Estadística',
    icon: '📊',
    color: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-900 dark:text-orange-100',
  },
};

const subjectOrder: Subject[] = ['números', 'álgebra', 'geometría', 'probabilidad'];

export function KnowledgeDeclarationPanel({ initialLevel = 'M1' }: KnowledgeDeclarationPanelProps) {
  const [level, setLevel] = useState<Level>(initialLevel);
  const [units, setUnits] = useState<Record<Subject, ThematicUnit[]> | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());

  const { summary, isKnown, setKnowledge, isLoading: declarationsLoading } = useKnowledgeDeclarations(level);

  // Load units when level changes
  useEffect(() => {
    async function loadUnits() {
      setLoading(true);
      const response = await getGroupedUnits(level);
      if (response) {
        setUnits(response.grouped as Record<Subject, ThematicUnit[]>);
      }
      setLoading(false);
    }
    loadUnits();
  }, [level]);

  const toggleUnit = (unitCode: string) => {
    setExpandedUnits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(unitCode)) {
        newSet.delete(unitCode);
      } else {
        newSet.add(unitCode);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    if (!units) return;
    const allUnitCodes = new Set<string>();
    for (const subject of subjectOrder) {
      for (const unit of units[subject] || []) {
        allUnitCodes.add(unit.code);
      }
    }
    setExpandedUnits(allUnitCodes);
  };

  const collapseAll = () => {
    setExpandedUnits(new Set());
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A84FF]" />
        </div>
      </Card>
    );
  }

  if (!units) {
    return (
      <Card className="p-6">
        <Text variant="secondary" className="text-center">
          Error al cargar las unidades temáticas
        </Text>
      </Card>
    );
  }

  const knowledgePercentage = summary.totalUnits > 0
    ? Math.round((summary.knownUnits / summary.totalUnits) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header with level toggle and summary */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Heading level={3} size="sm" className="mb-1">
              Lo que sé
            </Heading>
            <Text size="sm" variant="secondary">
              Marca los temas que ya dominas para personalizar tu aprendizaje
            </Text>
          </div>

          {/* Level toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setLevel('M1')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-[180ms] ${
                level === 'M1'
                  ? 'bg-[#0A84FF] text-white'
                  : 'bg-white dark:bg-[#1C1C1E] text-black/60 dark:text-white/70 border border-black/[0.12] dark:border-white/[0.16] hover:border-[#0A84FF]/50'
              }`}
            >
              M1
            </button>
            <button
              onClick={() => setLevel('M2')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-[180ms] ${
                level === 'M2'
                  ? 'bg-[#0A84FF] text-white'
                  : 'bg-white dark:bg-[#1C1C1E] text-black/60 dark:text-white/70 border border-black/[0.12] dark:border-white/[0.16] hover:border-[#0A84FF]/50'
              }`}
            >
              M2
            </button>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04]">
            <div className="text-2xl font-bold text-[#0A84FF]">
              {summary.knownUnits}/{summary.totalUnits}
            </div>
            <Text size="xs" variant="secondary">Unidades</Text>
          </div>
          <div className="text-center p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04]">
            <div className="text-2xl font-bold text-[#0A84FF]">
              {summary.knownSubsections}/{summary.totalSubsections}
            </div>
            <Text size="xs" variant="secondary">Subsecciones</Text>
          </div>
          <div className="text-center p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04]">
            <div className="text-2xl font-bold text-[#0A84FF]">
              {summary.knownSkills}/{summary.totalSkills}
            </div>
            <Text size="xs" variant="secondary">Habilidades</Text>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <Text size="xs" variant="secondary">Progreso declarado</Text>
            <Text size="xs" variant="secondary" className="font-semibold">{knowledgePercentage}%</Text>
          </div>
          <div className="w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#30D158] h-2 rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{ width: `${knowledgePercentage}%` }}
            />
          </div>
        </div>

        {/* Expand/Collapse all */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={expandAll}
            className="text-xs text-[#0A84FF] hover:underline"
          >
            Expandir todo
          </button>
          <span className="text-xs text-black/30 dark:text-white/30">|</span>
          <button
            onClick={collapseAll}
            className="text-xs text-[#0A84FF] hover:underline"
          >
            Contraer todo
          </button>
        </div>
      </Card>

      {/* Units by subject */}
      {subjectOrder.map((subject) => {
        const subjectUnits = units[subject] || [];
        if (subjectUnits.length === 0) return null;

        const config = subjectConfig[subject];

        return (
          <Card key={subject} className={`p-4 ${config.color} border ${config.borderColor}`}>
            {/* Subject header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{config.icon}</span>
              <Heading level={4} size="xs" className={config.textColor}>
                {config.displayName}
              </Heading>
            </div>

            {/* Units list */}
            <div className="space-y-2">
              {subjectUnits.map((unit) => (
                <UnitDeclarationRow
                  key={unit.code}
                  unit={unit}
                  isExpanded={expandedUnits.has(unit.code)}
                  onToggleExpand={() => toggleUnit(unit.code)}
                  isKnown={isKnown}
                  setKnowledge={setKnowledge}
                />
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
