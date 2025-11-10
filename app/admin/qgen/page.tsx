'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { MathText } from '@/components/MathDisplay';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import type { Level, Subject } from '@/lib/types/core';
import AdminLayout from '@/components/AdminLayout';
import { api } from '@/lib/api-client';

// Available skills organized by subject
const SKILLS_BY_SUBJECT = {
  números: [
    { id: 'numeros-porcentajes', name: 'Porcentajes' },
    { id: 'numeros-operaciones-basicas', name: 'Operaciones Básicas' },
    { id: 'numeros-decimales', name: 'Decimales' },
    { id: 'numeros-fracciones', name: 'Fracciones' },
    { id: 'numeros-proporcionalidad', name: 'Proporcionalidad' },
    { id: 'numeros-potencias', name: 'Potencias' },
    { id: 'numeros-raices', name: 'Raíces' },
  ],
  álgebra: [
    { id: 'algebra-funciones-lineales', name: 'Funciones Lineales' },
    { id: 'algebra-expresiones-algebraicas', name: 'Expresiones Algebraicas' },
    { id: 'algebra-ecuaciones-lineales', name: 'Ecuaciones Lineales' },
    { id: 'algebra-sistemas-ecuaciones', name: 'Sistemas de Ecuaciones' },
    { id: 'algebra-inecuaciones', name: 'Inecuaciones' },
    { id: 'algebra-funciones-cuadraticas', name: 'Funciones Cuadráticas' },
  ],
  geometría: [
    { id: 'geometria-perimetro', name: 'Perímetro' },
    { id: 'geometria-area', name: 'Área' },
    { id: 'geometria-rectangulo', name: 'Rectángulos' },
    { id: 'geometria-triangulos', name: 'Triángulos' },
    { id: 'geometria-teorema-pitagoras', name: 'Teorema de Pitágoras' },
  ],
  probabilidad: [
    { id: 'probabilidad-media', name: 'Media' },
    { id: 'probabilidad-mediana', name: 'Mediana' },
    { id: 'probabilidad-moda', name: 'Moda' },
    { id: 'probabilidad-tablas-frecuencia', name: 'Tablas de Frecuencia' },
    { id: 'probabilidad-graficos', name: 'Gráficos' },
  ],
};

interface QGenResult {
  id: string;
  level: Level;
  subject: Subject;
  topic: string;
  question: string;
  questionLatex?: string;
  options: string[];
  optionsLatex?: string[];
  correctAnswer: number;
  explanation: string;
  explanationLatex?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  skills: string[];
  context: {
    id: string;
    description: string;
  };
  template: {
    id: string;
    name: string;
  };
  variables: Record<string, any>;
  createdAt: number;
}

function QGenAdminContent() {
  const router = useRouter();
  const [level, setLevel] = useState<Level>('M1');
  const [subject, setSubject] = useState<Subject>('números');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [result, setResult] = useState<QGenResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((s) => s !== skillId)
        : [...prev, skillId]
    );
  };

  const handleGenerate = async () => {
    if (selectedSkills.length === 0) {
      toast.error('Selecciona al menos una habilidad');
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const response = await api.post<{ success: boolean; data: QGenResult; error?: string }>(
        '/api/qgen/generate-single',
        {
          targetSkills: selectedSkills,
          level,
          subject,
        }
      );

      if (response.error) {
        toast.error(response.error.error || 'Error al generar pregunta');
        return;
      }

      if (response.data?.success) {
        setResult(response.data.data);
        toast.success('¡Pregunta generada con AI exitosamente!');
      } else {
        toast.error(response.data?.error || 'Error al generar pregunta');
      }
    } catch (error: any) {
      console.error('Error generating question:', error);
      toast.error('Error al generar pregunta: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const availableSkills = SKILLS_BY_SUBJECT[subject] || [];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Heading level={1} size="md" className="mb-2">
            QGen - Generador de Preguntas con AI
          </Heading>
          <Text variant="secondary">
            Genera preguntas completas con Claude AI: respuestas, distractores y explicaciones
          </Text>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <Card padding="lg">
            <Heading level={2} size="sm" className="mb-4">
              Configuración
            </Heading>

            <div className="space-y-4">
              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nivel
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={level === 'M1' ? 'primary' : 'secondary'}
                    onClick={() => setLevel('M1')}
                    size="sm"
                  >
                    M1
                  </Button>
                  <Button
                    variant={level === 'M2' ? 'primary' : 'secondary'}
                    onClick={() => setLevel('M2')}
                    size="sm"
                  >
                    M2
                  </Button>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Asignatura
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['números', 'álgebra', 'geometría', 'probabilidad'] as Subject[]).map((subj) => (
                    <Button
                      key={subj}
                      variant={subject === subj ? 'primary' : 'secondary'}
                      onClick={() => {
                        setSubject(subj);
                        setSelectedSkills([]);
                      }}
                      size="sm"
                    >
                      {subj.charAt(0).toUpperCase() + subj.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Skills Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Habilidades Atómicas ({selectedSkills.length} seleccionadas)
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {availableSkills.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => handleSkillToggle(skill.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg border-2 transition-all ${
                        selectedSkills.includes(skill.id)
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Text size="sm">{skill.name}</Text>
                        {selectedSkills.includes(skill.id) && (
                          <Badge variant="info" size="sm">
                            {selectedSkills.indexOf(skill.id) + 1}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating || selectedSkills.length === 0}
                fullWidth
              >
                {isGenerating ? 'Generando con AI...' : '🤖 Generar Pregunta con AI'}
              </Button>
            </div>
          </Card>

          {/* Results Panel */}
          <Card padding="lg">
            <Heading level={2} size="sm" className="mb-4">
              Resultado
            </Heading>

            {!result ? (
              <div className="flex items-center justify-center h-64">
                <Text variant="secondary" className="text-center">
                  Selecciona habilidades y haz clic en "Generar Pregunta con AI"
                </Text>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Question Info */}
                <Card padding="md" className="bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="info" size="sm">
                      {result.level}
                    </Badge>
                    <Badge variant="neutral" size="sm">
                      {result.subject}
                    </Badge>
                    <Badge
                      variant={
                        result.difficulty === 'easy'
                          ? 'success'
                          : result.difficulty === 'medium'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {result.difficulty}
                    </Badge>
                  </div>
                  <Text size="xs" variant="secondary" className="mb-1">
                    ID: {result.id}
                  </Text>
                  <Text size="xs" variant="secondary">
                    Habilidades: {result.skills.join(', ')}
                  </Text>
                </Card>

                {/* Context */}
                <Card padding="md" className="bg-teal-50 dark:bg-teal-900/20">
                  <Heading level={3} size="xs" className="mb-2">
                    📚 Contexto
                  </Heading>
                  <Text size="sm">{result.context.description}</Text>
                  <Text size="xs" variant="secondary" className="mt-2">
                    Template: {result.template.name}
                  </Text>
                </Card>

                {/* Question */}
                <Card padding="md" className="border-l-4 border-indigo-500">
                  <Heading level={3} size="xs" className="mb-3">
                    ❓ Pregunta
                  </Heading>
                  <div className="mb-4 text-base">
                    <MathText content={result.question} />
                  </div>

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    {result.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 ${
                          index === result.correctAnswer
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <Badge
                            variant={index === result.correctAnswer ? 'success' : 'neutral'}
                            size="sm"
                          >
                            {String.fromCharCode(65 + index)}
                          </Badge>
                          <div className="flex-1">
                            <MathText
                              content={result.optionsLatex?.[index] || option}
                            />
                          </div>
                          {index === result.correctAnswer && (
                            <span className="text-green-600 dark:text-green-400">✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Heading level={4} size="xs" className="mb-2">
                      💡 Explicación
                    </Heading>
                    <div className="text-sm prose-sm">
                      <MarkdownViewer
                        content={result.explanationLatex || result.explanation}
                      />
                    </div>
                  </div>
                </Card>

                {/* Variables Used */}
                {result.variables && Object.keys(result.variables).length > 0 && (
                  <Card padding="md" className="bg-gray-50 dark:bg-gray-800/50">
                    <Heading level={3} size="xs" className="mb-2">
                      🔢 Variables Generadas
                    </Heading>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(result.variables).map(([key, value]) => (
                        <div key={key} className="text-xs">
                          <Text variant="secondary" className="inline">
                            {key}:{' '}
                          </Text>
                          <Text className="inline font-mono">{String(value)}</Text>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function QGenAdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <QGenAdminContent />
    </ProtectedRoute>
  );
}
