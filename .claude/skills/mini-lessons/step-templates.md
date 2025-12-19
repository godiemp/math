# Step Component Templates

Ready-to-use templates for each lesson step. Replace placeholders marked with `{PLACEHOLDER}`.

## Step 1: Hook Template

```typescript
'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = {CORRECT_INDEX}; // 0-indexed

  const options = [
    '{OPTION_A}',
    '{OPTION_B}',
    '{OPTION_C}',
    '{OPTION_D}',
  ];

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setTimeout(() => setPhase('result'), 1500);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {HOOK_TITLE}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {HOOK_SUBTITLE}
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              {SCENARIO_TEXT}
            </p>

            {/* Visual representation - customize as needed */}
            <div className="flex justify-center mb-6">
              {/* Add SVG, emoji visualization, or image here */}
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              {SCENARIO_QUESTION}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <span>{CONTINUE_BUTTON_TEXT}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 text-center border border-blue-200 dark:border-blue-700">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {QUESTION_REMINDER}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-left font-medium transition-all border-2',
                  selectedAnswer === index
                    ? showFeedback
                      ? index === correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                      : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500'
                    : showFeedback && index === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-400'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      selectedAnswer === index
                        ? showFeedback
                          ? index === correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-amber-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    )}
                  >
                    {showFeedback && index === correctAnswer ? (
                      <Check size={16} />
                    ) : showFeedback && selectedAnswer === index && index !== correctAnswer ? (
                      <X size={16} />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-mono text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {!showFeedback && (
            <div className="flex justify-center">
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            </div>
          )}

          {showFeedback && (
            <div className={cn(
              'p-4 rounded-xl animate-fadeIn text-center',
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                : 'bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700'
            )}>
              <p className={cn('font-semibold', isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Veamos cómo funciona...
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              {RESULT_TITLE}
            </h3>

            {/* Explanation visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              {/* Add step-by-step breakdown here */}
            </div>
          </div>

          {/* Bridge to concept */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  {CONCEPT_BRIDGE_TITLE}
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  {/* Explain the connection to the math concept */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Descubrir el patrón</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Step 2: Explore Template

```typescript
'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface Example {
  id: string;
  expression: string;       // What to show
  result: string;           // The answer/pattern
  hint: string;             // Help text
}

const EXAMPLES: Example[] = [
  { id: 'e1', expression: '{EXAMPLE_1}', result: '{RESULT_1}', hint: '{HINT_1}' },
  { id: 'e2', expression: '{EXAMPLE_2}', result: '{RESULT_2}', hint: '{HINT_2}' },
  { id: 'e3', expression: '{EXAMPLE_3}', result: '{RESULT_3}', hint: '{HINT_3}' },
  { id: 'e4', expression: '{EXAMPLE_4}', result: '{RESULT_4}', hint: '{HINT_4}' },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentExample, setCurrentExample] = useState(0);
  const [discoveredExamples, setDiscoveredExamples] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const example = EXAMPLES[currentExample];
  const allDiscovered = discoveredExamples.length === EXAMPLES.length;

  const handleDiscoverExample = () => {
    if (!discoveredExamples.includes(example.id)) {
      setDiscoveredExamples([...discoveredExamples, example.id]);
    }
    setShowResult(true);
  };

  const handleNextExample = () => {
    if (currentExample < EXAMPLES.length - 1) {
      setCurrentExample(currentExample + 1);
      setShowHint(false);
      setShowResult(false);
    } else {
      setPhase('pattern');
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {EXPLORE_SUBTITLE}
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              {INTRO_TEXT}
            </p>

            {/* Types/categories overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Add category cards here */}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('discover')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Practicar con ejemplos</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'discover' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress */}
          <div className="flex justify-center gap-2">
            {EXAMPLES.map((ex, i) => (
              <div
                key={ex.id}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  discoveredExamples.includes(ex.id)
                    ? 'bg-green-500 text-white'
                    : i === currentExample
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {discoveredExamples.includes(ex.id) ? <Check size={18} /> : i + 1}
              </div>
            ))}
          </div>

          {/* Example card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">{EXAMPLE_PROMPT}:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {example.expression}
              </p>
            </div>

            {/* Hint button */}
            {!showResult && (
              <div className="text-center mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 mx-auto text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400"
                >
                  <Lightbulb size={16} />
                  <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
                </button>
              </div>
            )}

            {showHint && !showResult && (
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mb-4 animate-fadeIn border border-amber-200 dark:border-amber-700">
                <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                  {example.hint}
                </p>
              </div>
            )}

            {!showResult && (
              <div className="flex justify-center">
                <button
                  onClick={handleDiscoverExample}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                >
                  Ver resultado
                </button>
              </div>
            )}

            {showResult && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      <span className="font-mono text-xl text-gray-700 dark:text-gray-300">{example.expression}</span>
                      <span className="text-gray-400">=</span>
                      <span className="font-mono text-2xl font-bold text-green-600">{example.result}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleNextExample}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
                  >
                    <span>{currentExample < EXAMPLES.length - 1 ? 'Siguiente ejemplo' : 'Ver resumen'}</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {phase === 'pattern' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              {PATTERN_SUMMARY_TITLE}
            </h3>

            {/* Steps summary */}
            <div className="space-y-4 mb-6">
              {/* Add numbered steps here */}
            </div>

            {/* Examples summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">Ejemplos trabajados:</h4>
              <div className="space-y-2">
                {EXAMPLES.map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <span className="font-mono text-gray-700 dark:text-gray-300">{ex.expression}</span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono font-bold text-green-600">{ex.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Step 3: Explain Template

**IMPORTANT**: Tips section should be in a tab, not as a standalone section.

```typescript
'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

// NOTE: Always include 'tips' in TabId for the Tips tab
type TabId = 'tab1' | 'tab2' | 'tab3' | 'tab4' | 'tips';

interface FormulaTab {
  id: Exclude<TabId, 'tips'>;  // Tips is handled separately
  title: string;
  shortTitle: string;
  description: string;
  formula: string;
  example: {
    input: string;
    steps: string[];
    result: string;
  };
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'tab1',
    title: '{TAB_1_TITLE}',
    shortTitle: '{TAB_1_SHORT}',
    description: '{TAB_1_DESCRIPTION}',
    formula: '{TAB_1_FORMULA}',
    example: {
      input: '{TAB_1_EXAMPLE_INPUT}',
      steps: ['{STEP_1}', '{STEP_2}', '{STEP_3}'],
      result: '{TAB_1_EXAMPLE_RESULT}',
    },
    color: 'blue',
  },
  // Add more formula tabs...
];

// NOTE: Always include 'amber' for the Tips tab
const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
    tab: 'bg-blue-500 text-white',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
    tab: 'bg-purple-500 text-white',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-700',
    tab: 'bg-teal-500 text-white',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-900/30',
    text: 'text-pink-700 dark:text-pink-300',
    border: 'border-pink-200 dark:border-pink-700',
    tab: 'bg-pink-500 text-white',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('tab1');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['tab1']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find(f => f.id === activeTab);
  // Use amber colors for Tips tab, otherwise use formula's color
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentFormula!.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {EXPLAIN_TITLE}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {EXPLAIN_SUBTITLE}
        </p>
      </div>

      {/* Tabs - includes formula tabs + Tips tab */}
      <div className="flex flex-wrap justify-center gap-2">
        {FORMULAS.map((formula) => {
          const tabColors = colorClasses[formula.color];
          const isVisited = visitedTabs.includes(formula.id);
          return (
            <button
              key={formula.id}
              onClick={() => handleTabChange(formula.id)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all text-sm',
                activeTab === formula.id
                  ? tabColors.tab
                  : isVisited
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <span>{formula.shortTitle}</span>
              {isVisited && activeTab !== formula.id && (
                <span className="ml-1 text-green-500">✓</span>
              )}
            </button>
          );
        })}
        {/* Tips tab - always add this after formula tabs */}
        <button
          onClick={() => handleTabChange('tips')}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all text-sm',
            activeTab === 'tips'
              ? colorClasses.amber.tab
              : visitedTabs.includes('tips')
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
          )}
        >
          <span>Tips</span>
          {visitedTabs.includes('tips') && activeTab !== 'tips' && (
            <span className="ml-1 text-green-500">✓</span>
          )}
        </button>
      </div>

      {/* Conditional content: Tips tab vs Formula tabs */}
      {activeTab === 'tips' ? (
        /* Tips content */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>Tips y errores comunes</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• {TIP_1}</li>
                <li>• {TIP_2}</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• {ERROR_1}</li>
                <li>• {ERROR_2}</li>
              </ul>
            </div>
          </div>

          {/* Optional: Key insight section */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              {KEY_INSIGHT_TITLE}
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              {KEY_INSIGHT_TEXT}
            </p>
          </div>
        </div>
      ) : (
        /* Formula content */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>
              {currentFormula!.title}
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {currentFormula!.description}
          </p>

          {/* Main formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
            <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200">
              {currentFormula!.formula}
            </p>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Ejemplo:
            </h4>
            <div className="space-y-3">
              <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
                {currentFormula!.example.input}
              </p>
              <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                {currentFormula!.example.steps.map((step, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                    {i === currentFormula!.example.steps.length - 1 ? '→ ' : '• '}
                    {step}
                  </p>
                ))}
              </div>
              <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
                  = {currentFormula!.example.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optional: Summary cards (outside tabs, always visible) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FORMULAS.map((formula) => {
          const cardColors = colorClasses[formula.color];
          return (
            <div
              key={formula.id}
              className={cn(
                'p-3 rounded-lg border text-center',
                cardColors.bg,
                cardColors.border
              )}
            >
              <p className={cn('font-mono text-sm font-bold', cardColors.text)}>
                {formula.shortTitle}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
```

---

## Step 4: Classify Template

```typescript
'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type CategoryType = 'type1' | 'type2' | 'type3' | 'type4';

interface Expression {
  id: string;
  expression: string;
  correctType: CategoryType;
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  { id: 'e1', expression: '{EXPR_1}', correctType: 'type1', explanation: '{EXPL_1}' },
  { id: 'e2', expression: '{EXPR_2}', correctType: 'type2', explanation: '{EXPL_2}' },
  { id: 'e3', expression: '{EXPR_3}', correctType: 'type3', explanation: '{EXPL_3}' },
  { id: 'e4', expression: '{EXPR_4}', correctType: 'type4', explanation: '{EXPL_4}' },
  { id: 'e5', expression: '{EXPR_5}', correctType: 'type1', explanation: '{EXPL_5}' },
];

const TYPE_OPTIONS: { id: CategoryType; label: string; color: string }[] = [
  { id: 'type1', label: '{TYPE_1_LABEL}', color: 'blue' },
  { id: 'type2', label: '{TYPE_2_LABEL}', color: 'purple' },
  { id: 'type3', label: '{TYPE_3_LABEL}', color: 'teal' },
  { id: 'type4', label: '{TYPE_4_LABEL}', color: 'pink' },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/50', border: 'border-blue-500', text: 'text-blue-700 dark:text-blue-300' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/50', border: 'border-purple-500', text: 'text-purple-700 dark:text-purple-300' },
  teal: { bg: 'bg-teal-100 dark:bg-teal-900/50', border: 'border-teal-500', text: 'text-teal-700 dark:text-teal-300' },
  pink: { bg: 'bg-pink-100 dark:bg-pink-900/50', border: 'border-pink-500', text: 'text-pink-700 dark:text-pink-300' },
};

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<CategoryType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(CategoryType | null)[]>(Array(EXPRESSIONS.length).fill(null));

  const isComplete = currentIndex >= EXPRESSIONS.length;
  const currentExpression = isComplete ? EXPRESSIONS[0] : EXPRESSIONS[currentIndex];
  const isCorrect = selectedType === currentExpression.correctType;

  const handleSelect = (type: CategoryType) => {
    if (showFeedback) return;
    setSelectedType(type);
  };

  const handleCheck = () => {
    if (selectedType === null) return;
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedType;
    setAnswers(newAnswers);
    if (isCorrect) setCorrectCount(prev => prev + 1);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedType(null);
    setCurrentIndex(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedType(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setAnswers(Array(EXPRESSIONS.length).fill(null));
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {CLASSIFY_TITLE}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {CLASSIFY_SUBTITLE}
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress indicators */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Expresión {currentIndex + 1} de {EXPRESSIONS.length}
            </div>
            <div className="flex gap-1">
              {EXPRESSIONS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    answers[i] !== null
                      ? answers[i] === EXPRESSIONS[i].correctType
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentIndex
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (answers[i] === EXPRESSIONS[i].correctType ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Expression card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <p className="text-gray-500 dark:text-gray-400 mb-2">{CLASSIFY_PROMPT}</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {currentExpression.expression}
              </p>
            </div>

            {/* Type options */}
            <div className="grid grid-cols-2 gap-4">
              {TYPE_OPTIONS.map((option) => {
                const colors = colorClasses[option.color];
                const isSelected = selectedType === option.id;
                const isCorrectAnswer = option.id === currentExpression.correctType;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    disabled={showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all font-medium',
                      isSelected
                        ? showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                          : `${colors.bg} ${colors.border}`
                        : showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                    )}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {showFeedback && isCorrectAnswer && <Check size={18} className="text-green-600" />}
                      {showFeedback && isSelected && !isCorrectAnswer && <X size={18} className="text-red-600" />}
                      <span className={cn('font-semibold', isSelected && !showFeedback ? colors.text : 'text-gray-700 dark:text-gray-300')}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={cn(
              'p-4 rounded-xl animate-fadeIn',
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
            )}>
              <div className="flex items-start gap-3">
                {isCorrect ? <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" /> : <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />}
                <div>
                  <h4 className={cn('font-bold mb-1', isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300')}>
                    {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{currentExpression.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedType === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedType !== null
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                {currentIndex < EXPRESSIONS.length - 1 ? 'Siguiente' : 'Ver Resultados'}
              </button>
            )}
          </div>
        </>
      ) : (
        /* Results screen - same pattern as other steps */
        <div className="space-y-6 animate-fadeIn">
          {/* Results card and summary - follow existing pattern */}
          <div className="flex justify-center gap-4">
            {correctCount < 4 && (
              <button onClick={handleReset} className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold">
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}
            <button onClick={onComplete} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold">
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Step 5: Practice Template

Similar structure to Step 4 Classify, but with:
- Problems instead of classifications
- Optional hints for each problem
- Multiple-choice answers

```typescript
// Follow Step 4 pattern with these differences:
interface Problem {
  id: string;
  question: string;
  hint: string;
  options: string[];
  correctAnswer: number;  // 0-indexed
  explanation: string;
}
```

---

## Step 6: Verify Template

**ALWAYS use the shared CheckpointQuiz component:**

```typescript
'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '{QUESTION_1}',
    options: ['{OPT_A}', '{OPT_B}', '{OPT_C}', '{OPT_D}'],
    correctAnswer: {CORRECT_INDEX},
    explanation: '{EXPLANATION_1}',
  },
  {
    id: 'q2',
    question: '{QUESTION_2}',
    options: ['{OPT_A}', '{OPT_B}', '{OPT_C}', '{OPT_D}'],
    correctAnswer: {CORRECT_INDEX},
    explanation: '{EXPLANATION_2}',
  },
  {
    id: 'q3',
    question: '{QUESTION_3}',
    options: ['{OPT_A}', '{OPT_B}', '{OPT_C}', '{OPT_D}'],
    correctAnswer: {CORRECT_INDEX},
    explanation: '{EXPLANATION_3}',
  },
  {
    id: 'q4',
    question: '{QUESTION_4}',
    options: ['{OPT_A}', '{OPT_B}', '{OPT_C}', '{OPT_D}'],
    correctAnswer: {CORRECT_INDEX},
    explanation: '{EXPLANATION_4}',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="{SUCCESS_MESSAGE}"
    />
  );
}
```

---

## Index Export Template

```typescript
// components/lessons/m1/{lesson-slug}/index.ts
export { default as Step1Hook } from './Step1Hook';
export { default as Step2Explore } from './Step2Explore';
export { default as Step3Explain } from './Step3Explain';
export { default as Step4Classify } from './Step4Classify';
export { default as Step5Practice } from './Step5Practice';
export { default as Step6Verify } from './Step6Verify';
```
