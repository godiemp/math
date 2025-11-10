'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';

interface GenerateAbstractModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const UNITS_BY_SUBJECT: Record<string, string[]> = {
  números: ['enteros-racionales', 'porcentaje', 'potencias-raices', 'proporcionalidad'],
  álgebra: ['expresiones-algebraicas', 'ecuaciones-lineales', 'sistemas-ecuaciones', 'funciones-basicas'],
  geometría: ['perimetro-area', 'volumen', 'angulos', 'transformaciones'],
  probabilidad: ['probabilidad-basica', 'estadistica-descriptiva', 'media-mediana-moda'],
};

const SKILLS_BY_SUBJECT: Record<string, string[]> = {
  números: [
    'numeros-enteros-sumar-restar',
    'numeros-enteros-multiplicar-dividir',
    'numeros-enteros-valor-absoluto',
    'numeros-enteros-orden',
    'numeros-racionales-sumar-restar',
    'numeros-racionales-multiplicar-dividir',
    'numeros-racionales-orden',
  ],
  álgebra: [
    'algebra-expresiones-simplificar',
    'algebra-ecuaciones-lineales',
    'algebra-ecuaciones-resolver',
    'algebra-funciones-evaluar',
  ],
  geometría: [
    'geometria-perimetro-calcular',
    'geometria-area-calcular',
    'geometria-volumen-calcular',
    'geometria-angulos-identificar',
  ],
  probabilidad: [
    'probabilidad-eventos-calcular',
    'estadistica-media-calcular',
    'estadistica-mediana-calcular',
  ],
};

export default function GenerateAbstractModal({ onClose, onSuccess }: GenerateAbstractModalProps) {
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    level: 'M1',
    subject: 'números',
    unit: 'enteros-racionales',
    difficulty: 'easy',
    cognitive_level: 'apply',
    primary_skills: [] as string[],
    count: 10,
  });

  const handleGenerate = async () => {
    if (formData.primary_skills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }

    setGenerating(true);
    try {
      const res = await api.post('/api/abstract-problems/generate', {
        ...formData,
        save_to_db: true,
      });

      if (res.data?.success) {
        toast.success(`Generated ${res.data.count} abstract problems!`);
        onSuccess();
      } else {
        toast.error(res.error?.error || 'Failed to generate problems');
      }
    } catch (error) {
      console.error('Error generating:', error);
      toast.error('Failed to generate problems');
    } finally {
      setGenerating(false);
    }
  };

  const availableUnits = UNITS_BY_SUBJECT[formData.subject] || [];
  const availableSkills = SKILLS_BY_SUBJECT[formData.subject] || [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Generate Abstract Problems
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Level
            </label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="M1">M1</option>
              <option value="M2">M2</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subject: e.target.value,
                  unit: UNITS_BY_SUBJECT[e.target.value]?.[0] || '',
                  primary_skills: [],
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="números">números</option>
              <option value="álgebra">álgebra</option>
              <option value="geometría">geometría</option>
              <option value="probabilidad">probabilidad</option>
            </select>
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Unit
            </label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              {availableUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="extreme">Extreme</option>
            </select>
          </div>

          {/* Cognitive Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cognitive Level
            </label>
            <select
              value={formData.cognitive_level}
              onChange={(e) => setFormData({ ...formData, cognitive_level: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="remember">Remember</option>
              <option value="understand">Understand</option>
              <option value="apply">Apply</option>
              <option value="analyze">Analyze</option>
              <option value="evaluate">Evaluate</option>
              <option value="create">Create</option>
            </select>
          </div>

          {/* Primary Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Skills
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              {availableSkills.map((skill) => (
                <label key={skill} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.primary_skills.includes(skill)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          primary_skills: [...formData.primary_skills, skill],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          primary_skills: formData.primary_skills.filter((s) => s !== skill),
                        });
                      }
                    }}
                    className="rounded text-blue-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How many problems?
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={formData.count}
              onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) || 10 })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            disabled={generating}
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating || formData.primary_skills.length === 0}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {generating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
}
