'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Button } from '@/components/ui';
import { ArrowLeft, Copy, Check } from 'lucide-react';

export default function CreateClassPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: 'M1' as 'M1' | 'M2' | 'both',
    schoolName: '',
    maxStudents: 45,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [createdClass, setCreatedClass] = useState<{
    id: string;
    inviteCode: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const generateInviteCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock created class
    setCreatedClass({
      id: 'new-class-' + Date.now(),
      inviteCode: generateInviteCode(),
    });

    setIsCreating(false);
  };

  const copyInviteCode = () => {
    if (createdClass) {
      navigator.clipboard.writeText(createdClass.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Success state
  if (createdClass) {
    return (
      <TeacherLayout>
        <div className="max-w-lg mx-auto">
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎉</span>
            </div>

            <Heading level={2} size="md" className="mb-2">
              ¡Clase Creada!
            </Heading>
            <Text variant="secondary" className="mb-6">
              Tu clase "{formData.name}" ha sido creada exitosamente.
            </Text>

            {/* Invite Code */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 mb-6">
              <Text size="sm" variant="secondary" className="mb-2">
                Código de invitación para estudiantes
              </Text>
              <div className="flex items-center justify-center gap-3">
                <code className="text-3xl font-mono font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                  {createdClass.inviteCode}
                </code>
                <button
                  onClick={copyInviteCode}
                  className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                  title="Copiar código"
                >
                  {copied ? (
                    <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              </div>
            </div>

            <Text size="sm" variant="secondary" className="mb-6">
              Comparte este código con tus estudiantes para que se unan a la clase.
            </Text>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => router.push('/teacher/classes')}
                className="flex-1"
              >
                Ver todas las clases
              </Button>
              <Button
                onClick={() => router.push(`/teacher/classes/${createdClass.id}`)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                Ir a la clase
              </Button>
            </div>
          </Card>
        </div>
      </TeacherLayout>
    );
  }

  // Form state
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
                placeholder="Ej: 8°A Matemáticas"
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
                placeholder="Ej: Clase de matemáticas para 8° básico, sección A"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nivel PAES
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'M1', label: 'M1', desc: 'Básico' },
                  { value: 'M2', label: 'M2', desc: 'Avanzado' },
                  { value: 'both', label: 'Ambos', desc: 'M1 + M2' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, level: option.value as 'M1' | 'M2' | 'both' })
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.level === option.value
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="font-bold text-lg text-gray-900 dark:text-white">
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
                Tu plan actual permite hasta 50 estudiantes por clase
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
                disabled={!formData.name || isCreating}
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
