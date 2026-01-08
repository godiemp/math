# Step Component Templates

Ready-to-use templates for each lesson step. Replace placeholders marked with `{PLACEHOLDER}`.

## Step 1: Hook Template

Uses primitives from `@/components/lessons/primitives` for consistent styling.

```typescript
'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import {
  ScenarioCard,
  QuestionPrompt,
  OptionGrid,
  OptionButton,
  ActionButton,
  FeedbackPanel,
  InsightCard,
} from '@/components/lessons/primitives';

type Phase = 'scenario' | 'question' | 'result';

const OPTIONS = [
  '{OPTION_A}',
  '{OPTION_B}',
  '{OPTION_C}',
  '{OPTION_D}',
];

const CORRECT_ANSWER = {CORRECT_INDEX}; // 0-indexed

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const isCorrect = selectedAnswer === CORRECT_ANSWER;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setTimeout(() => setPhase('result'), 1500);
  };

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
          <ScenarioCard variant="warm">  {/* or "cool" for blue/purple theme */}
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
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              {CONTINUE_BUTTON_TEXT}
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              {QUESTION_REMINDER}
            </p>
          </QuestionPrompt>

          <OptionGrid columns={2}>
            {OPTIONS.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={index === CORRECT_ANSWER}
                showFeedback={showFeedback}
                onClick={() => handleSelect(index)}
                isMono  {/* Use for math expressions */}
              />
            ))}
          </OptionGrid>

          {!showFeedback && (
            <div className="flex justify-center">
              <ActionButton onClick={handleCheck} disabled={selectedAnswer === null}>
                Verificar
              </ActionButton>
            </div>
          )}

          {showFeedback && (
            <FeedbackPanel
              isCorrect={isCorrect}
              title={isCorrect ? '¡Exacto!' : '¡Casi!'}
              explanation="Veamos cómo funciona..."
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              {RESULT_TITLE}
            </h3>

            {/* Step-by-step breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              {/* Add calculations/explanation here */}
            </div>
          </div>

          {/* Bridge to concept */}
          <InsightCard
            title="{CONCEPT_BRIDGE_TITLE}"
            icon={<Lightbulb className="w-8 h-8 text-yellow-500" />}
            variant="purple"
          >
            <div className="space-y-2">
              <p className="font-mono text-lg">{FORMULA}</p>
              <p className="text-sm">{FORMULA_EXPLANATION}</p>
            </div>
          </InsightCard>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} icon={<ArrowRight size={20} />}>
              Descubrir el patrón
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
```

**Canonical Example:** `components/lessons/m1/funcion-lineal-afin/Step1Hook.tsx`

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

> ⚠️ **CRITICAL REQUIREMENT**: Tips and Common Errors MUST be inside a dedicated "Tips" tab.
>
> **DO NOT** add a standalone amber "Tips y errores comunes" section outside the tabs.
> The correct pattern is:
> 1. Add `'tips'` to the `TabId` type
> 2. Add `amber` to `colorClasses`
> 3. Add the Tips tab button after formula tabs
> 4. Use conditional rendering: `{activeTab === 'tips' ? <TipsContent /> : <FormulaContent />}`
>
> See the template below for the correct implementation.

```typescript
'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { MathText } from '@/components/math/MathDisplay';  // LaTeX rendering

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

// IMPORTANT: Use LaTeX with $...$ delimiters for math content
// Double-escape backslashes in strings: '\\times' not '\times'
const FORMULAS: FormulaTab[] = [
  {
    id: 'tab1',
    title: '{TAB_1_TITLE}',
    shortTitle: '{TAB_1_SHORT}',
    description: '{TAB_1_DESCRIPTION}',
    formula: '$a^m \\times a^n = a^{m+n}$',  // LaTeX with $...$
    example: {
      input: '$4^3 \\times 4^2$',             // LaTeX
      steps: [
        'Misma base: 4',
        'Exponentes: 3 y 2',
        'Suma exponentes: $3 + 2 = 5$',       // Mix text and LaTeX
        '$= 4^5 = 1024$',
      ],
      result: '$4^5 = 1024$',                 // LaTeX
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

          {/* Main formula - USE MathText for LaTeX rendering */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
            <MathText
              content={currentFormula!.formula}
              className="text-center text-2xl text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Ejemplo:
            </h4>
            <div className="space-y-3">
              {/* MathText for LaTeX input */}
              <MathText
                content={currentFormula!.example.input}
                className="text-lg text-gray-800 dark:text-gray-200"
              />
              <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                {currentFormula!.example.steps.map((step, i) => (
                  <div key={i} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-1">
                    <span>{i === currentFormula!.example.steps.length - 1 ? '→ ' : '• '}</span>
                    {/* MathText for steps that may contain LaTeX */}
                    <MathText content={step} />
                  </div>
                ))}
              </div>
              <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                {/* MathText for result */}
                <MathText
                  content={`= ${currentFormula!.example.result}`}
                  className={cn('font-bold text-lg text-center', colors.text)}
                />
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

A guided practice step with multiple problems, streak tracking, and pass threshold.

```typescript
'use client';

import { useState } from 'react';
import { Check, X, RotateCcw, ArrowRight, Flame, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: string;
  expression: string;       // The problem to solve
  options: string[];        // 4 answer options
  correctIndex: number;     // 0-indexed correct answer
  hint: string;             // Shown after answering
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    expression: '{PROBLEM_1}',
    options: ['{OPT_A}', '{OPT_B}', '{OPT_C}', '{OPT_D}'],
    correctIndex: 0,
    hint: '{HINT_1}',
  },
  {
    id: 'p2',
    expression: '{PROBLEM_2}',
    options: ['{OPT_A}', '{OPT_B}', '{OPT_C}', '{OPT_D}'],
    correctIndex: 0,
    hint: '{HINT_2}',
  },
  // Add 8-10 problems total for variety
];

const REQUIRED_CORRECT = 7;  // Typically 70% of problems

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  const problem = PROBLEMS[currentProblem];
  const correctCount = answers.filter(a => a).length;
  const passed = correctCount >= REQUIRED_CORRECT;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === problem.correctIndex;
    setShowFeedback(true);
    setAnswers(prev => [...prev, isCorrect]);

    if (isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswers([]);
    setIsComplete(false);
    setStreak(0);
  };

  const isCorrect = selectedAnswer === problem?.correctIndex;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {PRACTICE_TITLE}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Necesitas {REQUIRED_CORRECT} de {PROBLEMS.length} correctas para avanzar
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress and streak */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {PROBLEMS.length}
            </div>
            {streak >= 3 && (
              <div className="flex items-center gap-1 text-orange-500 animate-pulse">
                <Flame size={20} />
                <span className="font-bold">{streak} racha</span>
              </div>
            )}
            <div className="flex gap-1">
              {PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    i < answers.length
                      ? answers[i]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentProblem
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-center">{PROBLEM_PROMPT}:</p>
            <p className="text-3xl font-mono font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              {problem.expression}
            </p>

            {/* Options - 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {problem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl font-mono font-bold text-lg transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === problem.correctIndex
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : showFeedback && index === problem.correctIndex
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={cn(
                  'mt-4 p-4 rounded-xl animate-fadeIn',
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
                )}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <p className={cn('font-bold', isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
                      {isCorrect ? '¡Correcto!' : '¡Casi!'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {problem.hint}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Check/Next button */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentProblem < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </>
      ) : (
        // Results screen
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              passed
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            {passed ? (
              <Check className="w-20 h-20 mx-auto text-green-500 mb-4" />
            ) : (
              <RotateCcw className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Felicitaciones!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {PROBLEMS.length}
            </div>

            <p
              className={cn(
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed
                ? '{SUCCESS_MESSAGE}'
                : `Necesitas ${REQUIRED_CORRECT} respuestas correctas. ¡Puedes intentarlo de nuevo!`}
            </p>
          </div>

          {/* Answer summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="grid grid-cols-5 gap-2">
              {PROBLEMS.map((p, i) => (
                <div
                  key={i}
                  className={cn(
                    'p-2 rounded-lg text-center text-xs',
                    answers[i]
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  )}
                >
                  <div className="font-mono font-bold truncate">{p.expression.split(' ')[0]}...</div>
                  {answers[i] ? <Check size={14} className="mx-auto" /> : <X size={14} className="mx-auto" />}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {!passed && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}

            {passed && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                <span>Continuar</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Key Features

1. **Streak tracking**: Shows fire icon after 3+ correct in a row
2. **Progress indicators**: Visual dots showing answered/current/upcoming
3. **Pass threshold**: Must get REQUIRED_CORRECT to advance
4. **Retry option**: Can restart if failed
5. **Answer summary**: Shows all problems with correct/incorrect at end

---

## Step 4: Matching Game Template (Alternative)

A two-phase classify step: first match items to categories, then solve problems.

```typescript
'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'matching' | 'solving' | 'complete';
type CategoryType = 'type1' | 'type2' | 'type3';

interface MatchItem {
  expression: string;
  type: CategoryType;
  matched: boolean;
}

interface Problem {
  expression: string;
  options: string[];
  correctIndex: number;
  type: CategoryType;
}

const MATCH_ITEMS: MatchItem[] = [
  { expression: '{EXPR_1}', type: 'type1', matched: false },
  { expression: '{EXPR_2}', type: 'type2', matched: false },
  { expression: '{EXPR_3}', type: 'type3', matched: false },
  { expression: '{EXPR_4}', type: 'type1', matched: false },
  { expression: '{EXPR_5}', type: 'type2', matched: false },
  { expression: '{EXPR_6}', type: 'type3', matched: false },
];

const PROBLEMS: Problem[] = [
  {
    expression: '{PROBLEM_1}',
    options: ['{OPT_A}', '{OPT_B}', '{OPT_C}', '{OPT_D}'],
    correctIndex: 0,
    type: 'type1',
  },
  // Add more problems
];

const TYPE_LABELS: Record<CategoryType, string> = {
  'type1': '{TYPE_1_LABEL}',
  'type2': '{TYPE_2_LABEL}',
  'type3': '{TYPE_3_LABEL}',
};

const TYPE_COLORS: Record<CategoryType, { bg: string; text: string; border: string }> = {
  'type1': {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    text: 'text-blue-800 dark:text-blue-200',
    border: 'border-blue-300 dark:border-blue-700',
  },
  'type2': {
    bg: 'bg-green-100 dark:bg-green-900/50',
    text: 'text-green-800 dark:text-green-200',
    border: 'border-green-300 dark:border-green-700',
  },
  'type3': {
    bg: 'bg-purple-100 dark:bg-purple-900/50',
    text: 'text-purple-800 dark:text-purple-200',
    border: 'border-purple-300 dark:border-purple-700',
  },
};

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('matching');
  const [matchItems, setMatchItems] = useState<MatchItem[]>(MATCH_ITEMS);
  const [selectedExpression, setSelectedExpression] = useState<number | null>(null);

  // Problem solving state
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const allMatched = matchItems.every(item => item.matched);
  const problem = PROBLEMS[currentProblem];

  const handleTypeSelect = (type: CategoryType) => {
    if (selectedExpression === null) return;

    const item = matchItems[selectedExpression];
    if (item.type === type) {
      // Correct match
      setMatchItems(prev => prev.map((m, i) =>
        i === selectedExpression ? { ...m, matched: true } : m
      ));
    }
    setSelectedExpression(null);
  };

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === problem.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
    } else {
      setPhase('complete');
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {CLASSIFY_TITLE}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'matching' && 'Clasifica cada expresión según su tipo'}
          {phase === 'solving' && 'Ahora resuelve usando el patrón correcto'}
          {phase === 'complete' && '¡Excelente trabajo!'}
        </p>
      </div>

      {/* PHASE 1: MATCHING */}
      {phase === 'matching' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Instructions */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700 text-center">
            <p className="text-purple-800 dark:text-purple-200">
              Selecciona una expresión y luego elige su categoría
            </p>
          </div>

          {/* Expressions grid - items to match */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {matchItems.map((item, index) => (
              <button
                key={index}
                onClick={() => !item.matched && setSelectedExpression(
                  selectedExpression === index ? null : index
                )}
                disabled={item.matched}
                className={cn(
                  'p-4 rounded-xl font-mono text-lg transition-all border-2',
                  item.matched
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-400 text-green-700 dark:text-green-300'
                    : selectedExpression === index
                    ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200 ring-4 ring-purple-300'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400'
                )}
              >
                {item.matched && <Check className="inline w-4 h-4 mr-2" />}
                {item.expression}
              </button>
            ))}
          </div>

          {/* Category buttons - shown when item selected */}
          {selectedExpression !== null && (
            <div className="space-y-3 animate-fadeIn">
              <p className="text-center text-gray-600 dark:text-gray-400 font-medium">
                ¿Qué tipo es?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {(Object.keys(TYPE_LABELS) as CategoryType[]).map((type) => {
                  const colors = TYPE_COLORS[type];
                  return (
                    <button
                      key={type}
                      onClick={() => handleTypeSelect(type)}
                      className={cn(
                        'px-6 py-3 rounded-xl font-medium transition-colors border-2',
                        colors.bg, colors.text, colors.border,
                        'hover:opacity-80'
                      )}
                    >
                      {TYPE_LABELS[type]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Continue to problems */}
          {allMatched && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('solving')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Ahora a resolver</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: SOLVING - Follow Step5Practice pattern */}
      {phase === 'solving' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Problem solving UI - same as Step5Practice */}
          {/* See Step5Practice template for full implementation */}
        </div>
      )}

      {/* PHASE 3: COMPLETE */}
      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-8 text-center border border-green-200 dark:border-green-800">
            <Sparkles className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Bien hecho!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Obtuviste {correctCount} de {PROBLEMS.length} correctas
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
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

### Key Features

1. **Two-phase structure**: First match, then solve
2. **Visual feedback**: Green checkmarks on matched items
3. **Selection highlighting**: Ring effect on selected item
4. **Progressive flow**: Can't continue until all matched
5. **Category buttons**: Appear only when item is selected

### When to Use

Use the matching game template when:
- Students need to classify items into categories
- Recognition before application is pedagogically valuable
- Multiple expression types are being compared

**Exemplar**: `components/lessons/m1/productos-notables/Step4Classify.tsx`

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
