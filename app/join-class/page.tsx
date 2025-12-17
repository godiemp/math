'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading, Text, Button } from '@/components/ui';
import { ArrowLeft, Users, Check, AlertCircle } from 'lucide-react';
import { MOCK_CLASSES } from '@/lib/types/teacher';

type JoinState = 'input' | 'preview' | 'success' | 'error';

export default function JoinClassPage() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('');
  const [joinState, setJoinState] = useState<JoinState>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [foundClass, setFoundClass] = useState<typeof MOCK_CLASSES[0] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCodeChange = (value: string) => {
    // Only allow alphanumeric, auto-uppercase
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
    setInviteCode(cleaned);
    setJoinState('input');
    setErrorMessage('');
  };

  const handleLookup = async () => {
    if (inviteCode.length < 6) {
      setErrorMessage('El código debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    // Simulate API lookup delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock: Check if code matches any class
    const matchedClass = MOCK_CLASSES.find(
      (c) => c.inviteCode.toUpperCase() === inviteCode.toUpperCase()
    );

    if (matchedClass) {
      if (!matchedClass.inviteCodeActive) {
        setErrorMessage('Este código ya no está activo');
        setJoinState('error');
      } else if (matchedClass.studentCount >= matchedClass.maxStudents) {
        setErrorMessage('Esta clase está llena');
        setJoinState('error');
      } else {
        setFoundClass(matchedClass);
        setJoinState('preview');
      }
    } else {
      setErrorMessage('Código no encontrado. Verifica que esté correcto.');
      setJoinState('error');
    }

    setIsLoading(false);
  };

  const handleJoin = async () => {
    setIsLoading(true);

    // Simulate API join delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setJoinState('success');
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inviteCode.length >= 6 && joinState === 'input') {
      handleLookup();
    }
  };

  // Success state
  if (joinState === 'success' && foundClass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card padding="lg" className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>

          <Heading level={2} size="md" className="mb-2">
            ¡Te uniste a la clase!
          </Heading>

          <Text variant="secondary" className="mb-6">
            Ahora eres parte de <strong>{foundClass.name}</strong>
          </Text>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-6 text-left">
            <Text size="sm" className="font-medium mb-1">
              {foundClass.name}
            </Text>
            <Text size="xs" variant="secondary">
              {foundClass.schoolName} • {foundClass.studentCount + 1} estudiantes
            </Text>
          </div>

          <Text size="sm" variant="secondary" className="mb-6">
            Tu profesor podrá ver tu progreso en las prácticas y mini-lecciones.
            ¡Comienza a practicar para mejorar!
          </Text>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="flex-1"
            >
              Ir al inicio
            </Button>
            <Button
              onClick={() => router.push('/practice')}
              className="flex-1"
            >
              Comenzar a practicar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card padding="lg" className="max-w-md w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <Heading level={2} size="md">
              Unirse a una clase
            </Heading>
            <Text size="sm" variant="secondary">
              Ingresa el código que te dio tu profesor
            </Text>
          </div>
        </div>

        {/* Code Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Código de invitación
          </label>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ej: ABC123XY"
            maxLength={8}
            className={`w-full px-4 py-4 text-center text-2xl font-mono font-bold tracking-widest rounded-xl border-2 transition-all ${
              joinState === 'error'
                ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                : joinState === 'preview'
                ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-500'
            } text-gray-900 dark:text-white focus:outline-none`}
            autoFocus
          />
          <Text size="xs" variant="secondary" className="mt-2 text-center">
            {inviteCode.length}/8 caracteres
          </Text>
        </div>

        {/* Error Message */}
        {joinState === 'error' && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <Text size="sm" className="font-medium">
                {errorMessage}
              </Text>
            </div>
          </div>
        )}

        {/* Class Preview */}
        {joinState === 'preview' && foundClass && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <Text className="font-semibold text-gray-900 dark:text-white">
                  {foundClass.name}
                </Text>
                <Text size="sm" variant="secondary">
                  {foundClass.schoolName}
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                <Text className="font-bold text-gray-900 dark:text-white">
                  {foundClass.studentCount}
                </Text>
                <Text size="xs" variant="secondary">
                  estudiantes
                </Text>
              </div>
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                <Text className="font-bold text-gray-900 dark:text-white">
                  {foundClass.level === 'both' ? 'M1+M2' : foundClass.level}
                </Text>
                <Text size="xs" variant="secondary">
                  nivel
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {joinState === 'input' || joinState === 'error' ? (
          <Button
            onClick={handleLookup}
            disabled={inviteCode.length < 6 || isLoading}
            fullWidth
            className="disabled:opacity-50"
          >
            {isLoading ? 'Buscando...' : 'Buscar clase'}
          </Button>
        ) : joinState === 'preview' ? (
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                setInviteCode('');
                setJoinState('input');
                setFoundClass(null);
              }}
              className="flex-1"
            >
              Cambiar código
            </Button>
            <Button
              onClick={handleJoin}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Uniéndote...' : 'Unirme a la clase'}
            </Button>
          </div>
        ) : null}

        {/* Help Text */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Text size="sm" variant="secondary" className="text-center">
            ¿No tienes un código? Pídele a tu profesor que te comparta el código
            de invitación de la clase.
          </Text>
        </div>
      </Card>
    </div>
  );
}
