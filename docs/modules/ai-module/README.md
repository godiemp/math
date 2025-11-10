# AI Module

> **Related Documentation:**
> - 🧮 [Calculator Module](../calculator/README.md) - **Primary tool** that AI calls for math operations
> - 🎨 [Math Renderer Module](../math-renderer/README.md) - AI requests rendering of solutions
> - 📚 [PAES Curriculum Scope](../../content/paes-curriculum-scope.md) - Content the AI needs to teach
> - 🏗️ [Architecture Overview](../../architecture/overview.md) - System design

## Overview
The AI module is the intelligent tutoring system that provides personalized guidance, hints, explanations, and adaptive learning. It **orchestrates other modules** (especially the Calculator) as tools to solve problems and help students learn.

---

## Core Concept: AI as Orchestrator

```
┌─────────────────────────────────────────────────┐
│              AI Module (Brain)                  │
│                                                 │
│  "Student needs help with 2x + 3 = 7"          │
│         │                                       │
│         ├─→ Calls Calculator.solve()           │
│         │   Gets: x = 2 with steps             │
│         │                                       │
│         ├─→ Calls Renderer.display()           │
│         │   Shows: formatted solution          │
│         │                                       │
│         └─→ Generates personalized hint        │
│             "Try subtracting 3 from both sides" │
└─────────────────────────────────────────────────┘
```

**Key Principle**: AI doesn't do math itself - it calls the Calculator module and explains the results in a pedagogically sound way.

---

## Responsibilities

- Analyze student questions and problems
- Call Calculator module to solve problems
- Generate pedagogical hints and explanations
- Adapt difficulty based on student performance
- Provide multiple solution strategies
- Detect common misconceptions
- Generate practice problems
- Explain step-by-step reasoning
- Conversational tutoring interface

---

## Module Independence

This module is **partially independent**:
- Can work standalone with mock calculator responses
- Primarily depends on Calculator module for computation
- Optionally uses Renderer for displaying results
- Can be developed with stubbed interfaces initially
- LLM/AI logic is completely separate from math logic

---

## Technical Architecture

```
┌──────────────────────────────────────────────────────┐
│                   AI Module                          │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │         Conversation Handler               │    │
│  │  • Natural Language Understanding          │    │
│  │  • Intent Recognition                      │    │
│  │  • Context Management                      │    │
│  └────────────────────────────────────────────┘    │
│                       │                             │
│                       ▼                             │
│  ┌────────────────────────────────────────────┐    │
│  │         AI Agent / LLM Integration         │    │
│  │  • OpenAI GPT-4 / Claude                   │    │
│  │  • Function/Tool Calling                   │    │
│  │  • Prompt Engineering                      │    │
│  └────────────────────────────────────────────┘    │
│                       │                             │
│                       ▼                             │
│  ┌────────────────────────────────────────────┐    │
│  │         Tool Orchestration Layer           │    │
│  │                                            │    │
│  │  Available Tools:                          │    │
│  │  ├─ calculator.solve()                     │    │
│  │  ├─ calculator.validate()                  │    │
│  │  ├─ calculator.simplify()                  │    │
│  │  ├─ renderer.display()                     │    │
│  │  └─ content.getProblem()                   │    │
│  └────────────────────────────────────────────┘    │
│                       │                             │
│                       ▼                             │
│  ┌────────────────────────────────────────────┐    │
│  │      Pedagogical Intelligence              │    │
│  │  • Hint Generation                         │    │
│  │  • Misconception Detection                 │    │
│  │  • Adaptive Difficulty                     │    │
│  │  • Learning Path Optimization              │    │
│  └────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

---

## AI Tool Calling Architecture

### How It Works

```typescript
// The AI has access to calculator as a tool
const tools = [
  {
    name: "solve_equation",
    description: "Solve a mathematical equation step-by-step",
    parameters: {
      equation: "string",
      variable: "string"
    },
    function: calculator.solveWithSteps
  },
  {
    name: "validate_answer",
    description: "Check if a student's answer is correct",
    parameters: {
      studentAnswer: "string",
      correctAnswer: "string"
    },
    function: calculator.validateAnswer
  },
  {
    name: "simplify_expression",
    description: "Simplify a mathematical expression",
    parameters: {
      expression: "string"
    },
    function: calculator.simplify
  }
];

// Example interaction:
// Student: "How do I solve 2x + 3 = 7?"
//
// AI thinks: "I need to solve this equation"
// AI calls: solve_equation("2x + 3 = 7", "x")
// Calculator returns: { answer: 2, steps: [...] }
//
// AI generates response:
// "Let's solve this together! First, we want to isolate x..."
// [Shows step-by-step with explanations]
```

---

## Public API

### Chat Interface

```typescript
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatResponse {
  message: string;
  mathContent?: {
    latex: string;
    steps?: Step[];
  };
  hints?: string[];
  confidence: number;
}

async function chat(
  message: string,
  context: ChatMessage[],
  userId: string
): Promise<ChatResponse>;

// Example:
const response = await ai.chat(
  "I don't understand how to solve 2x + 3 = 7",
  previousMessages,
  "user123"
);
```

### Hint Generation

```typescript
interface HintRequest {
  problem: string;
  studentAnswer?: string;
  previousHints?: string[];
  difficulty: 'gentle' | 'medium' | 'direct';
}

interface Hint {
  level: number;
  text: string;
  revealsSolution: boolean;
  mathExpression?: string;
}

async function generateHint(
  request: HintRequest
): Promise<Hint>;

// Example:
const hint = await ai.generateHint({
  problem: "2x + 3 = 7",
  difficulty: "gentle"
});
// Returns: "What operation would help you remove the +3 from the left side?"
```

### Problem Analysis

```typescript
interface ProblemAnalysis {
  topic: string;
  difficulty: number;
  requiredKnowledge: string[];
  commonMistakes: string[];
  solutionStrategies: string[];
}

async function analyzeProblem(
  problem: string
): Promise<ProblemAnalysis>;
```

### Adaptive Learning

```typescript
interface StudentProfile {
  userId: string;
  strengths: string[];
  weaknesses: string[];
  masteryLevels: Map<string, number>;
  learningStyle?: string;
}

async function getNextProblem(
  profile: StudentProfile,
  topic?: string
): Promise<Problem>;

async function updateProfile(
  userId: string,
  performance: PerformanceData
): Promise<StudentProfile>;
```

---

## Tool Definitions for AI

> **Important**: These tool definitions map directly to [Calculator Module functions](../calculator/README.md#public-api). Each tool calls a specific Calculator function. See [Calculator Module](../calculator/README.md) for implementation details.

### Calculator Tools

These tools allow the AI to call Calculator module functions:

```typescript
const calculatorTools = [
  {
    name: "solve_equation",
    description: "Solves mathematical equations step-by-step. Use this when the student asks to solve an equation or needs help solving one.",
    parameters: {
      type: "object",
      properties: {
        equation: {
          type: "string",
          description: "The equation to solve (e.g., '2x + 3 = 7')"
        },
        variable: {
          type: "string",
          description: "The variable to solve for (e.g., 'x')"
        }
      },
      required: ["equation"]
    }
  },
  {
    name: "evaluate_expression",
    description: "Evaluates a mathematical expression to get a numerical result",
    parameters: {
      type: "object",
      properties: {
        expression: {
          type: "string",
          description: "The expression to evaluate (e.g., '2 + 3 * 4')"
        }
      },
      required: ["expression"]
    }
  },
  {
    name: "validate_answer",
    description: "Checks if a student's answer is correct and provides feedback",
    parameters: {
      type: "object",
      properties: {
        studentAnswer: {
          type: "string",
          description: "The student's answer"
        },
        correctAnswer: {
          type: "string",
          description: "The correct answer"
        },
        checkEquivalence: {
          type: "boolean",
          description: "Whether to check algebraic equivalence"
        }
      },
      required: ["studentAnswer", "correctAnswer"]
    }
  },
  {
    name: "factor_polynomial",
    description: "Factors a polynomial expression",
    parameters: {
      type: "object",
      properties: {
        expression: {
          type: "string",
          description: "The polynomial to factor (e.g., 'x^2 - 4')"
        }
      },
      required: ["expression"]
    }
  },
  {
    name: "graph_function",
    description: "Generates data to graph a mathematical function",
    parameters: {
      type: "object",
      properties: {
        function: {
          type: "string",
          description: "The function to graph (e.g., 'y = x^2')"
        },
        xRange: {
          type: "array",
          description: "Range for x-axis [min, max]"
        }
      },
      required: ["function"]
    }
  }
];
```

---

## LLM Integration Options

### Option 1: OpenAI GPT-4 (Recommended)
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function chat(message: string, context: ChatMessage[]) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful PAES math tutor. Use the calculator tools to help students solve problems."
      },
      ...context,
      { role: "user", content: message }
    ],
    tools: calculatorTools,
    tool_choice: "auto"
  });

  // Handle tool calls
  if (response.choices[0].message.tool_calls) {
    const toolCall = response.choices[0].message.tool_calls[0];
    const result = await executeCalculatorTool(toolCall);

    // Send result back to GPT for natural language response
    const finalResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        ...context,
        response.choices[0].message,
        {
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result)
        }
      ]
    });

    return finalResponse.choices[0].message.content;
  }

  return response.choices[0].message.content;
}
```

### Option 2: Anthropic Claude
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function chat(message: string, context: ChatMessage[]) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 1024,
    tools: calculatorTools,
    messages: [
      ...context,
      { role: "user", content: message }
    ]
  });

  // Handle tool use
  if (response.content.some(block => block.type === 'tool_use')) {
    const toolUse = response.content.find(block => block.type === 'tool_use');
    const result = await executeCalculatorTool(toolUse);

    // Continue conversation with tool result
    const finalResponse = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      messages: [
        ...context,
        { role: "assistant", content: response.content },
        {
          role: "user",
          content: [{
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: JSON.stringify(result)
          }]
        }
      ]
    });

    return finalResponse.content[0].text;
  }

  return response.content[0].text;
}
```

### Option 3: Local Model (Ollama)
```typescript
import ollama from 'ollama';

async function chat(message: string, context: ChatMessage[]) {
  const response = await ollama.chat({
    model: 'llama3.1',
    messages: [
      {
        role: 'system',
        content: 'You are a PAES math tutor. Use function calling to solve problems.'
      },
      ...context,
      { role: 'user', content: message }
    ],
    tools: calculatorTools
  });

  // Handle tool calls similarly
  return response.message.content;
}
```

---

## Prompt Engineering

### System Prompt

```typescript
const SYSTEM_PROMPT = `
You are an expert PAES mathematics tutor for Chilean students. Your role is to:

1. Help students understand concepts, not just get answers
2. Use the calculator tools to solve problems step-by-step
3. Provide hints before revealing solutions
4. Encourage students to think critically
5. Relate math to PAES exam format

When a student asks for help:
- First, assess what they understand
- Use calculator tools to work through the problem
- Explain each step in simple language
- Check their understanding with follow-up questions

Available tools:
- solve_equation: Solve equations step-by-step
- validate_answer: Check student answers
- simplify_expression: Simplify expressions
- factor_polynomial: Factor polynomials
- graph_function: Generate graph data

Always explain your reasoning and the mathematics behind each step.
`;
```

### Hint Generation Prompts

```typescript
const HINT_PROMPTS = {
  gentle: `
    Generate a very gentle hint that guides thinking without revealing the answer.
    Ask a question that leads the student to the next step.
  `,
  medium: `
    Provide a more direct hint that suggests the operation or concept needed.
    Don't solve it, but point clearly in the right direction.
  `,
  direct: `
    Give a direct hint that shows exactly what to do next.
    Show the first step but let them complete it.
  `
};
```

---

## Development Phases

### Phase 1: Basic AI Integration (Week 1)
- [ ] Set up OpenAI/Claude API
- [ ] Implement basic chat interface
- [ ] Connect calculator as tool
- [ ] Test with simple problems

### Phase 2: Tool Orchestration (Week 2)
- [ ] Define all calculator tool schemas
- [ ] Implement tool execution layer
- [ ] Handle tool call errors gracefully
- [ ] Add logging and monitoring

### Phase 3: Pedagogical Intelligence (Week 3)
- [ ] Implement hint generation system
- [ ] Create misconception detection
- [ ] Build adaptive difficulty logic
- [ ] Add conversation memory

### Phase 4: Advanced Features (Week 4+)
- [ ] Multi-step problem solving
- [ ] Solution strategy comparison
- [ ] Learning analytics
- [ ] Personalized learning paths
- [ ] Integration with user profiles

---

## Example Interactions

### Example 1: Solving an Equation

```
Student: "Help me solve 2x + 3 = 7"

AI Internal Process:
1. Recognize this is a solving request
2. Call calculator.solveWithSteps("2x + 3 = 7", "x")
3. Receive: { answer: 2, steps: [...] }
4. Generate pedagogical response

AI Response:
"Great question! Let's solve this linear equation step by step.

First, we want to isolate x. What's currently 'attached' to x?
We have: 2x + 3 = 7

Step 1: Subtract 3 from both sides
2x + 3 - 3 = 7 - 3
2x = 4

Step 2: Divide both sides by 2
2x ÷ 2 = 4 ÷ 2
x = 2

So x = 2! Would you like to verify this answer?"
```

### Example 2: Checking Work

```
Student: "I got x = 3 for the equation 2x + 3 = 7. Is that right?"

AI Internal Process:
1. Call calculator.validateAnswer("3", "2")
2. Receive: { isCorrect: false, ... }
3. Call calculator.solveWithSteps("2x + 3 = 7", "x")
4. Identify where student went wrong

AI Response:
"I see you got x = 3, but let's check that together.

If we plug x = 3 back into the original equation:
2(3) + 3 = 6 + 3 = 9

But we need to equal 7, not 9. So something went wrong!

Let me show you: when we subtract 3 from both sides, we get:
2x = 4

Did you maybe forget to subtract the 3? Try it again from there!"
```

### Example 3: Requesting a Hint

```
Student: "I'm stuck on x^2 - 5x + 6 = 0. Can you give me a hint?"

AI Response:
"Sure! This is a quadratic equation. There are a few ways to solve it:

1. Factoring
2. Using the quadratic formula
3. Completing the square

For this particular equation, factoring might be the easiest approach.

Hint: What two numbers multiply to give you 6 AND add up to give you -5?

Think about it and let me know what you come up with!"
```

---

## Testing Strategy

### Unit Tests

```typescript
describe('AI Module', () => {
  test('calls calculator tool for equation', async () => {
    const mockCalculator = jest.fn().mockReturnValue({
      answer: 2,
      steps: []
    });

    const response = await ai.chat(
      "Solve 2x + 3 = 7",
      [],
      "user123"
    );

    expect(mockCalculator).toHaveBeenCalledWith("2x + 3 = 7", "x");
  });

  test('generates appropriate hints', async () => {
    const hint = await ai.generateHint({
      problem: "2x + 3 = 7",
      difficulty: "gentle"
    });

    expect(hint.text).not.toContain("x = 2"); // Shouldn't reveal answer
    expect(hint.revealsSolution).toBe(false);
  });
});
```

### Integration Tests

```typescript
describe('AI with Calculator Integration', () => {
  test('solves problem end-to-end', async () => {
    const response = await ai.chat(
      "What is the solution to 2x + 3 = 7?",
      [],
      "user123"
    );

    expect(response.message).toContain("2");
    expect(response.mathContent).toBeDefined();
  });
});
```

---

## Cost Optimization

### Token Usage
- Cache system prompts
- Summarize long conversations
- Use cheaper models for simple tasks
- Implement rate limiting

### Smart Caching
```typescript
// Cache calculator results
const cache = new Map();

function cachedCalculate(operation: string, params: any) {
  const key = `${operation}:${JSON.stringify(params)}`;
  if (cache.has(key)) {
    return cache.get(key);
  }
  const result = calculator[operation](params);
  cache.set(key, result);
  return result;
}
```

---

## Dependencies

```json
{
  "openai": "^4.20.0",
  "@anthropic-ai/sdk": "^0.12.0",
  "ollama": "^0.5.0",
  "@paes-math/calculator": "workspace:*",
  "langchain": "^0.1.0" // Optional: for advanced orchestration
}
```

---

## File Structure

```
ai-module/
├── src/
│   ├── core/
│   │   ├── chat.ts
│   │   ├── agent.ts
│   │   └── context.ts
│   ├── tools/
│   │   ├── calculator-tools.ts
│   │   ├── tool-executor.ts
│   │   └── tool-definitions.ts
│   ├── prompts/
│   │   ├── system-prompts.ts
│   │   ├── hint-templates.ts
│   │   └── tutor-persona.ts
│   ├── pedagogy/
│   │   ├── hint-generator.ts
│   │   ├── misconception-detector.ts
│   │   └── adaptive-engine.ts
│   ├── integrations/
│   │   ├── openai.ts
│   │   ├── claude.ts
│   │   └── ollama.ts
│   └── index.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── package.json
└── README.md
```

---

## Security & Privacy

- **API Key Management**: Use environment variables
- **Rate Limiting**: Prevent abuse
- **Content Filtering**: Ensure appropriate responses
- **Data Privacy**: Don't log sensitive student data
- **Cost Controls**: Set spending limits

---

## Next Steps for This Module

1. Choose LLM provider (OpenAI GPT-4 recommended)
2. Set up API access and authentication
3. Define calculator tool schemas
4. Implement tool execution layer
5. Create comprehensive prompts for PAES tutoring
6. Test with real PAES problems
7. Build feedback loop for improvement
