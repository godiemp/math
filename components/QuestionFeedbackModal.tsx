'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { analytics } from '@/lib/analytics';
import type { Question } from '@/lib/types';

interface QuestionFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  userAnswer?: number;
}

type FeedbackType =
  | 'wrong_answer'
  | 'wrong_explanation'
  | 'unclear_question'
  | 'typo'
  | 'other';

interface FeedbackOption {
  value: FeedbackType;
  label: string;
  description: string;
}

const feedbackOptions: FeedbackOption[] = [
  {
    value: 'wrong_answer',
    label: 'Respuesta incorrecta',
    description: 'La respuesta marcada como correcta es en realidad incorrecta',
  },
  {
    value: 'wrong_explanation',
    label: 'Explicación incorrecta',
    description: 'La explicación tiene errores o es engañosa',
  },
  {
    value: 'unclear_question',
    label: 'Pregunta confusa',
    description: 'El enunciado es difícil de entender o ambiguo',
  },
  {
    value: 'typo',
    label: 'Error de tipeo',
    description: 'Hay errores de escritura o formato',
  },
  {
    value: 'other',
    label: 'Otro problema',
    description: 'Otro tipo de error no listado arriba',
  },
];

export const QuestionFeedbackModal: React.FC<QuestionFeedbackModalProps> = ({
  isOpen,
  onClose,
  question,
  userAnswer,
}) => {
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedType) {
      toast.error('Por favor selecciona el tipo de problema');
      return;
    }

    if (description.length < 10) {
      toast.error('Por favor describe el problema con al menos 10 caracteres');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/api/question-feedback', {
        questionId: question.id,
        questionTopic: question.topic,
        questionLevel: question.level,
        questionDifficulty: question.difficulty,
        questionSubject: question.subject,
        feedbackType: selectedType,
        description: description.trim(),
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        questionLatex: question.questionLatex,
      });

      if (response.error) {
        toast.error(response.error.error || 'Error al enviar el reporte');
        return;
      }

      // Track analytics event
      analytics.track('question_feedback_submitted', {
        questionId: question.id,
        feedbackType: selectedType,
        questionLevel: question.level,
        questionSubject: question.subject,
        questionDifficulty: question.difficulty,
      });

      toast.success('Reporte enviado exitosamente');
      handleClose();
    } catch {
      toast.error('Error al enviar el reporte. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedType(null);
    setDescription('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Reportar problema"
      maxWidth="md"
    >
      <div className="space-y-6">
        <p className="text-black/70 dark:text-white/70 text-[15px]">
          Gracias por ayudarnos a mejorar. Selecciona el tipo de problema y describe lo que encontraste.
        </p>

        {/* Feedback type selection */}
        <div className="space-y-3">
          <label className="block text-[15px] font-medium text-black dark:text-white">
            Tipo de problema
          </label>
          <div className="space-y-2">
            {feedbackOptions.map((option) => (
              <label
                key={option.value}
                className={`
                  flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-[180ms]
                  ${
                    selectedType === option.value
                      ? 'bg-[#0A84FF]/10 dark:bg-[#0A84FF]/20 border-[#0A84FF] border-2'
                      : 'bg-black/[0.04] dark:bg-white/[0.06] border-transparent border-2 hover:bg-black/[0.08] dark:hover:bg-white/[0.12]'
                  }
                `}
              >
                <input
                  type="radio"
                  name="feedbackType"
                  value={option.value}
                  checked={selectedType === option.value}
                  onChange={() => setSelectedType(option.value)}
                  className="mt-1 w-4 h-4 text-[#0A84FF] focus:ring-[#0A84FF]"
                />
                <div>
                  <div className="font-medium text-black dark:text-white text-[15px]">
                    {option.label}
                  </div>
                  <div className="text-black/60 dark:text-white/60 text-[13px]">
                    {option.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Description textarea */}
        <div className="space-y-2">
          <label
            htmlFor="feedback-description"
            className="block text-[15px] font-medium text-black dark:text-white"
          >
            Describe el problema
          </label>
          <textarea
            id="feedback-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explica con detalle el problema que encontraste..."
            rows={4}
            maxLength={2000}
            className={`
              w-full px-4 py-3 rounded-xl
              bg-black/[0.04] dark:bg-white/[0.06]
              border border-black/[0.08] dark:border-white/[0.12]
              text-black dark:text-white
              placeholder:text-black/40 dark:placeholder:text-white/40
              focus:outline-none focus:ring-2 focus:ring-[#0A84FF]/50
              resize-none
              text-[15px]
            `}
          />
          <div className="text-right text-black/40 dark:text-white/40 text-[13px]">
            {description.length}/2000
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end pt-2">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedType || description.length < 10}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

QuestionFeedbackModal.displayName = 'QuestionFeedbackModal';
