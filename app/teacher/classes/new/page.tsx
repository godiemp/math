'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { CLASS_LEVEL_OPTIONS } from '@/lib/types/teacher';
import { useClassMutations, type ClassLevel } from '@/lib/hooks/useClasses';
import { toast } from 'sonner';

export default function CreateClassPage() {
  const router = useRouter();
  const { createClass } = useClassMutations();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: '2-medio' as ClassLevel,
    schoolName: '',
    maxStudents: 45,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);

    const result = await createClass({
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      level: formData.level,
      schoolName: formData.schoolName.trim() || undefined,
      maxStudents: formData.maxStudents,
    });

    setIsCreating(false);

    if (result.success && result.class) {
      toast.success('Clase creada exitosamente');
      router.push(`/teacher/classes/${result.class.id}`);
    } else {
      setError(result.error || 'Error al crear la clase');
      toast.error(result.error || 'Error al crear la clase');
    }
  };

  return (
    <TeacherLayout>
      <div className="max-w-2xl mx-auto">
        {/* Back Button & Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/teacher/classes')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <Heading level={1} size="lg">
              Crear Nueva Clase
            </Heading>
            <Text variant="secondary">
              Configura los detalles de tu nueva clase
            </Text>
          </div>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <Text className="text-red-600 dark:text-red-400">{error}</Text>
              </div>
            )}

            {/* Class Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de la clase *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: 2°A Matemáticas"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción (opcional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ej: Clase de matemáticas para preparación PAES"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nivel
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CLASS_LEVEL_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, level: option.value as ClassLevel })}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      formData.level === option.value
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="font-bold text-sm text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* School Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre del colegio (opcional)
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                placeholder="Ej: Colegio San Patricio"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Max Students */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Máximo de estudiantes
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={formData.maxStudents}
                onChange={(e) =>
                  setFormData({ ...formData, maxStudents: parseInt(e.target.value) || 45 })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <Text size="xs" variant="secondary" className="mt-1">
                Puedes agregar hasta 100 estudiantes por clase
              </Text>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.push('/teacher/classes')}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!formData.name.trim() || isCreating}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
              >
                {isCreating ? 'Creando...' : 'Crear Clase'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </TeacherLayout>
  );
}
