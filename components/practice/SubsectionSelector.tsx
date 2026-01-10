'use client';

import { useState, useEffect } from 'react';
import { getGroupedUnits, type ThematicUnit, type UnitSubsection } from '@/lib/services/thematicUnitsService';
import { useKnowledgeDeclarations } from '@/lib/hooks/useKnowledgeDeclarations';
import type { Subject } from '@/lib/types';

interface SubsectionSelectorProps {
  subject: Subject;
  level?: 'M1' | 'M2';
  onSelectSubsection: (subsectionCode: string, skills: string[]) => void;
  onCancel: () => void;
}

const subjectLabels: Record<Subject, string> = {
  'números': 'Numeros',
  'álgebra': 'Algebra',
  'geometría': 'Geometria',
  'probabilidad': 'Probabilidad',
};

export function SubsectionSelector({
  subject,
  level = 'M1',
  onSelectSubsection,
  onCancel,
}: SubsectionSelectorProps) {
  const [units, setUnits] = useState<ThematicUnit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  const { isKnown, isLoading: declarationsLoading } = useKnowledgeDeclarations(level);

  useEffect(() => {
    async function loadUnits() {
      setIsLoading(true);
      setError(null);

      const response = await getGroupedUnits(level);

      if (response?.grouped) {
        const subjectUnits = response.grouped[subject] || [];
        setUnits(subjectUnits);
        // Auto-expand first unit if only one
        if (subjectUnits.length === 1) {
          setExpandedUnit(subjectUnits[0].code);
        }
      } else {
        setError('No se pudieron cargar las unidades');
      }

      setIsLoading(false);
    }

    loadUnits();
  }, [subject, level]);

  const handleSubsectionClick = (unit: ThematicUnit, subsection: UnitSubsection) => {
    const subsectionCode = `${unit.code}:${subsection.code}`;
    onSelectSubsection(subsectionCode, subsection.primary_skills);
  };

  const getSubsectionStatus = (unit: ThematicUnit, subsection: UnitSubsection) => {
    const subsectionCode = `${unit.code}:${subsection.code}`;
    return isKnown('subsection', subsectionCode);
  };

  const getUnitProgress = (unit: ThematicUnit) => {
    if (!unit.subsections) return { known: 0, total: 0 };

    const total = unit.subsections.length;
    const known = unit.subsections.filter(sub => {
      const subsectionCode = `${unit.code}:${sub.code}`;
      return isKnown('subsection', subsectionCode);
    }).length;

    return { known, total };
  };

  if (isLoading || declarationsLoading) {
    return (
      <div data-testid="subsection-selector-loading" className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-center py-8">
          <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="ml-3 text-gray-600">Cargando subsecciones...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="subsection-selector-error" className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <div className="text-center py-8">
          <div data-testid="subsection-error-message" className="text-red-500 mb-2">{error}</div>
          <button
            data-testid="subsection-error-back"
            onClick={onCancel}
            className="text-blue-600 hover:underline"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="subsection-selector" className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 data-testid="subsection-selector-title" className="text-xl font-bold text-gray-900">
            Subsecciones de {subjectLabels[subject]}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Selecciona una subseccion para practicar preguntas especificas
          </p>
        </div>
        <button
          data-testid="subsection-close"
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div data-testid="subsection-units-list" className="space-y-3">
        {units.length === 0 ? (
          <div data-testid="subsection-empty" className="text-center py-8 text-gray-500">
            No hay unidades disponibles para este tema
          </div>
        ) : (
          units.map((unit, unitIndex) => {
            const isExpanded = expandedUnit === unit.code;
            const progress = getUnitProgress(unit);

            return (
              <div
                key={unit.code}
                data-testid={`unit-${unitIndex}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Unit header */}
                <button
                  data-testid={`unit-header-${unitIndex}`}
                  onClick={() => setExpandedUnit(isExpanded ? null : unit.code)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400">{unit.code}</span>
                      <h3 className="font-semibold text-gray-900">{unit.name}</h3>
                    </div>
                    {unit.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{unit.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Progress indicator */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all"
                          style={{ width: `${progress.total > 0 ? (progress.known / progress.total) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{progress.known}/{progress.total}</span>
                    </div>

                    {/* Expand icon */}
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Subsections */}
                {isExpanded && unit.subsections && (
                  <div data-testid={`unit-subsections-${unitIndex}`} className="border-t border-gray-100 bg-gray-50 p-2">
                    <div className="space-y-1">
                      {unit.subsections.map((subsection, subIndex) => {
                        const isKnownSubsection = getSubsectionStatus(unit, subsection);

                        return (
                          <button
                            key={subsection.code}
                            data-testid={`subsection-${unitIndex}-${subIndex}`}
                            onClick={() => handleSubsectionClick(unit, subsection)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                              isKnownSubsection
                                ? 'bg-green-50 hover:bg-green-100 border border-green-200'
                                : 'bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            {/* Status indicator */}
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                              isKnownSubsection ? 'bg-green-500 text-white' : 'bg-amber-100 text-amber-600'
                            }`}>
                              {isKnownSubsection ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <span className="text-xs font-bold">{subsection.code}</span>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{subsection.name}</span>
                                {!isKnownSubsection && (
                                  <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">
                                    Para practicar
                                  </span>
                                )}
                              </div>
                              {subsection.description && (
                                <p className="text-sm text-gray-500 truncate">{subsection.description}</p>
                              )}
                              <div className="text-xs text-gray-400 mt-1">
                                {subsection.primary_skills.length} habilidad{subsection.primary_skills.length !== 1 ? 'es' : ''}
                              </div>
                            </div>

                            {/* Arrow */}
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button
          data-testid="subsection-back"
          onClick={onCancel}
          className="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Volver a temas
        </button>
      </div>
    </div>
  );
}
