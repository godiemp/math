'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { MathText } from '@/components/MathDisplay';
import type { Level, Subject } from '@/lib/types/core';

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
  problem: any;
  situation: any;
  questions: any[];
}

function QGenAdminContent() {
  const router = useRouter();
  const [level, setLevel] = useState<Level>('M1');
  const [subject, setSubject] = useState<Subject>('números');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
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
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/qgen/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          targetSkills: selectedSkills,
          numberOfQuestions,
          level,
          subject,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        toast.success('¡Preguntas generadas exitosamente!');
      } else {
        toast.error(data.error || 'Error al generar preguntas');
      }
    } catch (error: any) {
      console.error('Error generating questions:', error);
      toast.error('Error al generar preguntas');
    } finally {
      setIsGenerating(false);
    }
  };

  const availableSkills = SKILLS_BY_SUBJECT[subject] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6" padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <Heading level={1} size="md" className="mb-2">
                QGen - Generador de Preguntas Progresivas
              </Heading>
              <Text variant="secondary">
                Genera secuencias progresivas de preguntas (n₁ → n₂ → n₃)
              </Text>
            </div>
            <Button variant="ghost" onClick={() => router.push('/admin')}>
              ← Volver al Admin
            </Button>
          </div>
        </Card>

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

              {/* Number of Questions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cantidad de Preguntas: {numberOfQuestions}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                  className="w-full"
                />
                <Text size="xs" variant="secondary">
                  n₁ hasta n₅
                </Text>
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
                {isGenerating ? 'Generando...' : '🎲 Generar Preguntas'}
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
                  Configura las opciones y haz clic en "Generar Preguntas" para ver el resultado
                </Text>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Problem Info */}
                <Card padding="md" className="bg-indigo-50 dark:bg-indigo-900/20">
                  <Heading level={3} size="xs" className="mb-2">
                    Problema
                  </Heading>
                  <Text size="xs" variant="secondary" className="font-mono mb-1">
                    {result.problem.id}
                  </Text>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="info" size="sm">
                      {result.problem.level}
                    </Badge>
                    <Badge variant="neutral" size="sm">
                      {result.problem.subject}
                    </Badge>
                  </div>
                  <Text size="xs" variant="secondary" className="mt-2">
                    Habilidades: {result.problem.skillIds.join(', ')}
                  </Text>
                </Card>

                {/* Situation */}
                <Card padding="md" className="bg-teal-50 dark:bg-teal-900/20">
                  <Heading level={3} size="xs" className="mb-2">
                    Situación / Contexto
                  </Heading>
                  <Text size="sm">{result.situation.contextText}</Text>
                </Card>

                {/* Progressive Questions */}
                <div>
                  <Heading level={3} size="xs" className="mb-3">
                    Preguntas Progresivas
                  </Heading>
                  <div className="space-y-3">
                    {result.questions.map((question, index) => (
                      <Card
                        key={question.id}
                        padding="md"
                        className={`border-l-4 ${
                          question.difficulty === 'easy'
                            ? 'border-green-500'
                            : question.difficulty === 'medium'
                            ? 'border-yellow-500'
                            : 'border-red-500'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="neutral" size="sm">
                            n₁{index + 1}
                          </Badge>
                          <Badge
                            variant={
                              question.difficulty === 'easy'
                                ? 'success'
                                : question.difficulty === 'medium'
                                ? 'warning'
                                : 'danger'
                            }
                            size="sm"
                          >
                            {question.difficulty}
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <MathText content={question.question} />
                        </div>
                        <Text size="xs" variant="secondary" className="mb-1">
                          Habilidades: {question.skillsTested.join(', ')}
                        </Text>
                        {question.buildsOn && (
                          <Text size="xs" variant="secondary">
                            ↳ Construye sobre: {question.buildsOn}
                          </Text>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function QGenAdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <QGenAdminContent />
    </ProtectedRoute>
  );
}
