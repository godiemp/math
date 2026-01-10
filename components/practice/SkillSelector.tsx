'use client';

import { useState } from 'react';
import type { DecomposedSkill } from '@/hooks/usePracticeSession';

interface SkillSelectorProps {
  skills: DecomposedSkill[];
  onSelectSkills: (skills: DecomposedSkill[]) => void;
  onSkip: () => void;
  isLoading?: boolean;
}

const difficultyColors = {
  básico: 'bg-green-100 text-green-800 border-green-200',
  intermedio: 'bg-amber-100 text-amber-800 border-amber-200',
  avanzado: 'bg-red-100 text-red-800 border-red-200',
};

const difficultyLabels = {
  básico: 'Fundamental',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};

export function SkillSelector({ skills, onSelectSkills, onSkip, isLoading }: SkillSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(skills.map(s => s.id)));

  const toggleSkill = (skillId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(skillId)) {
        next.delete(skillId);
      } else {
        next.add(skillId);
      }
      return next;
    });
  };

  const handleStart = () => {
    const selectedSkills = skills.filter(s => selectedIds.has(s.id));
    // Sort by order to ensure correct progression
    selectedSkills.sort((a, b) => a.order - b.order);
    onSelectSkills(selectedSkills);
  };

  const selectAll = () => {
    setSelectedIds(new Set(skills.map(s => s.id)));
  };

  const selectNone = () => {
    setSelectedIds(new Set());
  };

  return (
    <div data-testid="skill-selector" className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-3">
          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Analicemos tu respuesta
        </h2>
        <p className="text-gray-600">
          Para resolver este problema necesitas dominar estas habilidades.
          Selecciona las que quieres practicar:
        </p>
      </div>

      <div data-testid="skill-list" className="space-y-3 mb-6">
        {skills.map((skill, index) => (
          <button
            key={skill.id}
            data-testid={`skill-item-${index}`}
            onClick={() => toggleSkill(skill.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedIds.has(skill.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                selectedIds.has(skill.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {selectedIds.has(skill.id) ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[skill.difficulty]}`}>
                    {difficultyLabels[skill.difficulty]}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{skill.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex gap-3">
          <button data-testid="select-all-skills" onClick={selectAll} className="hover:text-blue-600 underline">
            Seleccionar todas
          </button>
          <button data-testid="select-none-skills" onClick={selectNone} className="hover:text-blue-600 underline">
            Ninguna
          </button>
        </div>
        <span data-testid="skill-count">{selectedIds.size} de {skills.length} seleccionadas</span>
      </div>

      <div className="flex gap-3">
        <button
          data-testid="skip-skills"
          onClick={onSkip}
          className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Omitir
        </button>
        <button
          data-testid="start-learning-path"
          onClick={handleStart}
          disabled={selectedIds.size === 0 || isLoading}
          className="flex-1 py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Generando...</span>
            </>
          ) : (
            <>
              <span>Comenzar ruta de aprendizaje</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        Practicaremos cada habilidad en orden, de la más fundamental a la más avanzada.
      </p>
    </div>
  );
}
