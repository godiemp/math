# QGen - Question Generation Algorithm

## Overview

QGen is a sophisticated algorithm for generating progressive mathematics questions based on atomic skills, real-world contexts, and question templates. It creates sequences of questions (n₁, n₂, n₃, ...) where each question builds upon the previous one, gradually increasing in complexity.

## Core Concepts

### 1. Atomic Skills
The fundamental building blocks of mathematical knowledge. Examples:
- `numeros-porcentajes` (Percentages)
- `algebra-funciones-lineales` (Linear Functions)
- `geometria-perimetro` (Perimeter)

Atomic skills are defined in `/lib/skillTaxonomy.ts`.

### 2. Contexts
Real-world situations that provide meaningful scenarios for questions. Each context:
- Has a category (shopping, cooking, travel, etc.)
- Defines available variables
- Is compatible with specific atomic skills

Example: `ctx-shopping-discount` - A store offering discounts on products

### 3. Templates
Question templates with placeholders (`{{variable}}`) that can be filled with values. Each template:
- Is linked to a specific goal (compute, compare, justify, etc.)
- Requires specific skills
- Is compatible with certain contexts
- Has a difficulty level

Example: "¿Cuánto es el {{descuento}}% de ${{precio_original}}?"

### 4. Goals
Types of reasoning or mathematical tasks:
- **Compute**: Perform calculations
- **Compare**: Compare values or expressions
- **Justify**: Explain or prove
- **Model**: Create mathematical models
- **Interpret**: Understand results
- **Analyze**: Break down complex problems

### 5. Progressive Questions
Questions ordered as n₁, n₂, n₃, ... where:
- n₁ uses the minimum number of skills (simplest)
- Each subsequent question adds complexity or skills
- Questions share the same context for coherence
- Each question builds on previous ones

## Algorithm Flow

```
┌─────────────────────────────────────┐
│  Input: Target Skills, Libraries    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  1. Choose Compatible Context       │
│     - Supports all target skills    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. Create Skill Progression        │
│     - Start with 1 skill            │
│     - Add skills progressively      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  3. Generate Questions (Loop)       │
│     For each skill level:           │
│     a. Find compatible goals        │
│     b. Find compatible templates    │
│     c. Generate values              │
│     d. Fill template                │
│     e. Create question              │
│     f. Link to previous question    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Output: Problem, Situation,        │
│          Progressive Questions      │
└─────────────────────────────────────┘
```

## Data Structure

```typescript
Problem {
  id: "prob-m1-números-123"
  skillIds: ["skill1", "skill2", "skill3"]
  contextId: "ctx-shopping-discount"
  ├── Situation {
  │     id: "sit-prob-m1-números-123-01"
  │     contextText: "Una tienda ofrece descuentos..."
  │     ├── ProgressiveQuestion (n₁) {
  │     │     questionIndex: 1
  │     │     skillsTested: ["skill1"]
  │     │     difficulty: "easy"
  │     │     buildsOn: null
  │     │   }
  │     ├── ProgressiveQuestion (n₂) {
  │     │     questionIndex: 2
  │     │     skillsTested: ["skill1", "skill2"]
  │     │     difficulty: "medium"
  │     │     buildsOn: "n₁"
  │     │   }
  │     └── ProgressiveQuestion (n₃) {
  │           questionIndex: 3
  │           skillsTested: ["skill1", "skill2", "skill3"]
  │           difficulty: "hard"
  │           buildsOn: "n₂"
  │         }
  │   }
}
```

## Usage Examples

### Basic Usage

```typescript
import { generateQuestions, contextLibrary, templateLibrary, goalSkillMappings } from './lib/qgen';

const result = generateQuestions({
  targetSkills: ['numeros-porcentajes', 'numeros-operaciones-basicas'],
  contextLibrary,
  templateLibrary,
  goalMap: goalSkillMappings,
  numberOfQuestions: 3,
  level: 'M1',
  subject: 'números',
});

console.log(result.problem);
console.log(result.situation);
console.log(result.questions); // [n₁, n₂, n₃]
```

### Example Output

```
Problem: prob-m1-números-1699999999999
Skills: ["numeros-porcentajes", "numeros-operaciones-basicas", "numeros-decimales"]

Situation: Una tienda ofrece descuentos en varios productos

Questions:

n₁ (easy):
  Question: ¿Cuánto es el 20% de $500?
  Skills: numeros-porcentajes
  Builds on: None (first question)

n₂ (medium):
  Question: Si una mochila cuesta $500 y tiene un descuento del 20%, ¿cuál es el precio final?
  Skills: numeros-porcentajes, numeros-operaciones-basicas
  Builds on: sit-prob-m1-números-1699999999999-01-n1

n₃ (hard):
  Question: Después de aplicar un descuento del 20%, una mochila cuesta $400. ¿Cuál era el precio original?
  Skills: numeros-porcentajes, numeros-operaciones-basicas, numeros-decimales
  Builds on: sit-prob-m1-números-1699999999999-01-n2
```

## Library Files

### `/lib/qgen/contextLibrary.ts`
Defines real-world contexts with variables and compatible skills.
- 10+ contexts across different categories
- Variables with types, ranges, and constraints
- Helper functions to find compatible contexts

### `/lib/qgen/goalLibrary.ts`
Defines reasoning types and cognitive levels.
- 20+ goals organized by type
- Bloom's taxonomy cognitive levels
- Helper functions to query goals

### `/lib/qgen/templateLibrary.ts`
Question templates with placeholders.
- 15+ templates across all subjects
- Difficulty levels
- Compatibility mappings

### `/lib/qgen/goalSkillMappings.ts`
Maps which goals work with which skill combinations.
- 25+ mappings
- Min/max skill constraints
- Helper functions for validation

### `/lib/qgen/valueGenerator.ts`
Generates values for template variables.
- Seeded random generation (reproducible)
- Constraint satisfaction
- Type-specific generators (integer, decimal, fraction, categorical)

### `/lib/qgen/qgenAlgorithm.ts`
Core algorithm implementation.
- Main generation logic
- Skill progression creation
- Question chaining

## Database Schema

The QGen system uses the following tables:

### Input Tables (Libraries)
- `contexts` - Real-world situations
- `goals` - Question goals/reasoning types
- `templates` - Question templates
- `goal_skill_mappings` - Goal-skill compatibility

### Output Tables (Generated Content)
- `problems` - Combines multiple skills
- `situations` - Specific instances with values
- `progressive_questions` - Individual questions (n₁, n₂, n₃, ...)

## Key Properties

### Sound
Every question only tests the skills it's supposed to test. No hidden prerequisites.

### Progressive
Questions increase in difficulty and reasoning depth:
- n₁: Basic skill application
- n₂: Combines skills
- n₃+: Advanced combinations and reasoning

### Consistent
All questions share the same real-world context, creating a coherent learning experience.

### Flexible
Easy to add new contexts, templates, or goals. The system automatically finds compatible combinations.

## Running Examples

```bash
# From project root
cd lib/qgen
ts-node -e "import('./examples').then(m => m.runAllExamples())"
```

Or in your TypeScript code:
```typescript
import { runAllExamples } from './lib/qgen/examples';
runAllExamples();
```

## Future Enhancements

1. **Answer Generation**: Automatically calculate correct answers based on template logic
2. **Distractor Generation**: Generate plausible incorrect options
3. **LaTeX Rendering**: Full LaTeX support for all templates
4. **Visual Data**: Automatic generation of diagrams and graphs
5. **AI Integration**: Use LLMs to enhance question variety
6. **Adaptive Difficulty**: Adjust progression based on student performance
7. **Multi-Situation Problems**: Generate multiple situations per problem

## Contributing

To add new content:

1. **New Context**: Add to `contextLibrary.ts`
2. **New Goal**: Add to `goalLibrary.ts`
3. **New Template**: Add to `templateLibrary.ts`
4. **New Mapping**: Add to `goalSkillMappings.ts`

All components are modular and independent.

## License

Part of the PAES Mathematics Practice System.
