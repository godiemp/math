'use client';

import { useState } from 'react';
import { Button, Card, Text, Heading } from '@/components/ui';
import { SmartLatexRenderer } from '@/components/math/MathDisplay';

interface FollowUpChatProps {
  question: string;
  selectedOption: string;
  onSubmit: (explanation: string) => void;
  onSkip: () => void;
}

export function FollowUpChat({
  question,
  selectedOption,
  onSubmit,
  onSkip,
}: FollowUpChatProps) {
  const [explanation, setExplanation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!explanation.trim()) return;

    setIsSubmitting(true);
    await onSubmit(explanation);
    setIsSubmitting(false);
  }

  return (
    <div className="space-y-6">
      {/* AI Message */}
      <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
            <span className="text-amber-600 dark:text-amber-300">?</span>
          </div>
          <div className="flex-1">
            <Text className="text-amber-900 dark:text-amber-100 font-medium mb-2">
              Casi... pero no es la respuesta correcta.
            </Text>
            <Text className="text-amber-800 dark:text-amber-200 text-sm">
              Para ayudarte mejor, cuéntame: ¿cómo llegaste a tu respuesta?
              ¿Qué pasos seguiste para resolver el problema?
            </Text>
          </div>
        </div>
      </Card>

      {/* Question Context */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <Text size="sm" className="text-gray-600 dark:text-gray-400 mb-2">
          La pregunta era:
        </Text>
        <div className="text-gray-900 dark:text-white">
          <SmartLatexRenderer latex={question} displayMode={false} />
        </div>
        <Text size="sm" className="text-gray-600 dark:text-gray-400 mt-2">
          Tu respuesta: <span className="font-medium">{selectedOption}</span>
        </Text>
      </div>

      {/* Input Area */}
      <div>
        <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Explica tu razonamiento
        </label>
        <textarea
          id="explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Por ejemplo: 'Primero sumé los dos números, luego dividí por...' o 'Pensé que la fórmula era...'"
          className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          disabled={isSubmitting}
        />
        <Text size="sm" className="text-gray-500 dark:text-gray-400 mt-1">
          No te preocupes si no estás seguro - cualquier explicación nos ayuda a entender cómo piensas.
        </Text>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={onSkip} disabled={isSubmitting}>
          Omitir
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!explanation.trim() || isSubmitting}
        >
          {isSubmitting ? 'Analizando...' : 'Enviar explicación'}
        </Button>
      </div>
    </div>
  );
}
