'use client';

import { Text } from '@/components/ui';
import { Check, X, HelpCircle } from 'lucide-react';
import type { KnowledgeInference } from '@/hooks/useDiagnosticChat';

interface DiagnosticProgressProps {
  inferences: KnowledgeInference[];
  isComplete: boolean;
}

const CONFIDENCE_THRESHOLDS = {
  high: 0.8,
  medium: 0.6,
};

function getConfidenceLevel(confidence: number): 'high' | 'medium' | 'low' {
  if (confidence >= CONFIDENCE_THRESHOLDS.high) return 'high';
  if (confidence >= CONFIDENCE_THRESHOLDS.medium) return 'medium';
  return 'low';
}

function getConfidenceColor(level: 'high' | 'medium' | 'low'): string {
  switch (level) {
    case 'high':
      return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
    case 'medium':
      return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700';
    case 'low':
      return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600';
  }
}

function getKnowsIcon(knows: boolean, confidence: number) {
  const level = getConfidenceLevel(confidence);

  if (level === 'low') {
    return <HelpCircle className="w-4 h-4 text-gray-400" />;
  }

  if (knows) {
    return <Check className="w-4 h-4 text-green-600 dark:text-green-400" />;
  }

  return <X className="w-4 h-4 text-red-500 dark:text-red-400" />;
}

export function DiagnosticProgress({ inferences, isComplete }: DiagnosticProgressProps) {
  if (inferences.length === 0) {
    return null;
  }

  // Group inferences by unit
  const groupedInferences = inferences.reduce<Record<string, KnowledgeInference[]>>((acc, inference) => {
    const key = inference.unitCode;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(inference);
    return acc;
  }, {});

  const highConfidenceCount = inferences.filter(i => getConfidenceLevel(i.confidence) === 'high').length;
  const knowsCount = inferences.filter(i => i.knows && i.confidence >= CONFIDENCE_THRESHOLDS.medium).length;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <Text size="sm" className="font-medium">
            📊 Lo que entendí de la conversación
          </Text>
          <div className="flex items-center gap-3">
            <Text size="xs" variant="secondary">
              {highConfidenceCount} de {inferences.length} con alta confianza
            </Text>
            {knowsCount > 0 && (
              <Text size="xs" className="text-green-600 dark:text-green-400">
                ✓ {knowsCount} dominas
              </Text>
            )}
          </div>
        </div>
      </div>

      {/* Inferences list */}
      <div className="px-4 py-3 max-h-[200px] overflow-y-auto">
        <div className="space-y-2">
          {Object.entries(groupedInferences).map(([unitCode, unitInferences]) => (
            <div key={unitCode} className="space-y-1">
              {unitInferences.map((inference, idx) => {
                const level = getConfidenceLevel(inference.confidence);
                const label = inference.subsectionCode
                  ? `${inference.unitCode} → ${inference.subsectionCode}`
                  : inference.unitCode;

                return (
                  <div
                    key={`${inference.unitCode}-${inference.subsectionCode || 'unit'}-${idx}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${getConfidenceColor(level)} transition-all`}
                  >
                    {/* Status icon */}
                    <div className="flex-shrink-0">
                      {getKnowsIcon(inference.knows, inference.confidence)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Text size="sm" className="font-medium truncate">
                          {label}
                        </Text>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            inference.knows
                              ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                              : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                          }`}
                        >
                          {inference.knows ? 'Domina' : 'Practicar'}
                        </span>
                      </div>
                      {inference.reason && (
                        <Text size="xs" variant="secondary" className="truncate mt-0.5">
                          {inference.reason}
                        </Text>
                      )}
                    </div>

                    {/* Confidence indicator */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-1" title={`Confianza: ${Math.round(inference.confidence * 100)}%`}>
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map(bar => (
                            <div
                              key={bar}
                              className={`w-1 rounded-full ${
                                bar === 1
                                  ? 'h-2'
                                  : bar === 2
                                  ? 'h-3'
                                  : 'h-4'
                              } ${
                                (level === 'high' && bar <= 3) ||
                                (level === 'medium' && bar <= 2) ||
                                (level === 'low' && bar <= 1)
                                  ? inference.knows
                                    ? 'bg-green-500'
                                    : 'bg-red-400'
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer with guidance */}
      {isComplete && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800">
          <Text size="xs" variant="secondary" className="text-center">
            💡 Revisa las inferencias. Puedes ajustar manualmente después de confirmar.
          </Text>
        </div>
      )}
    </div>
  );
}
