# Abstract Problems System - Architecture Design

## Overview

This document outlines the redesigned problems architecture that separates **abstract problems** (the mathematical essence) from **context problems** (concrete instances with real-world context).

## Core Concepts

### 1. Abstract Problem
The pure mathematical essence of a problem, independent of context.

**Example:**
```
Abstract: "Find the result of adding two rational numbers"
Skills: ["numeros-fracciones-sumar"]
Difficulty: easy
Cognitive Level: apply
```

### 2. Context Problem
A concrete instantiation of an abstract problem with real-world context.

**Example:**
```
Context: "María tiene 1/4 de pizza y Juan le da 2/3. ¿Cuánta pizza tiene María ahora?"
Abstract Problem ID: abc-123
Generated Values: {primera_fraccion: "1/4", segunda_fraccion: "2/3"}
```

## Database Schema

### abstract_problems table
```sql
CREATE TABLE abstract_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Core content
  essence TEXT NOT NULL,                    -- The mathematical concept in essence
  cognitive_level VARCHAR(20) NOT NULL,     -- remember, understand, apply, analyze, evaluate, create

  -- Classification
  level VARCHAR(10) NOT NULL,               -- M1, M2
  subject VARCHAR(50) NOT NULL,             -- números, álgebra, geometría, probabilidad
  unit VARCHAR(100) NOT NULL,               -- Specific unit within subject (e.g., "enteros-racionales")

  -- Difficulty
  difficulty VARCHAR(20) NOT NULL,          -- easy, medium, hard, extreme
  difficulty_score INTEGER NOT NULL,        -- 1-100 for fine-grained ordering

  -- Skills
  primary_skills TEXT[] NOT NULL,           -- Main skills tested
  secondary_skills TEXT[],                  -- Additional skills involved

  -- Generation metadata
  generation_method VARCHAR(20) NOT NULL,   -- openai, manual
  generated_by VARCHAR(100),                -- User ID or 'system'
  generation_prompt TEXT,                   -- Prompt used for AI generation

  -- Answer structure
  answer_type VARCHAR(20) NOT NULL,         -- multiple_choice, numeric, algebraic, etc.
  expected_steps JSONB,                     -- Expected solution steps
  common_errors JSONB,                      -- Common mistakes students make

  -- Status
  status VARCHAR(20) DEFAULT 'draft',       -- draft, reviewed, active, deprecated
  review_notes TEXT,

  -- Timestamps
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,

  -- Constraints
  CHECK (level IN ('M1', 'M2')),
  CHECK (subject IN ('números', 'álgebra', 'geometría', 'probabilidad')),
  CHECK (difficulty IN ('easy', 'medium', 'hard', 'extreme')),
  CHECK (cognitive_level IN ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create')),
  CHECK (difficulty_score >= 1 AND difficulty_score <= 100),
  CHECK (status IN ('draft', 'reviewed', 'active', 'deprecated'))
);

CREATE INDEX idx_abstract_problems_level ON abstract_problems(level);
CREATE INDEX idx_abstract_problems_subject ON abstract_problems(subject);
CREATE INDEX idx_abstract_problems_difficulty ON abstract_problems(difficulty);
CREATE INDEX idx_abstract_problems_difficulty_score ON abstract_problems(difficulty_score);
CREATE INDEX idx_abstract_problems_unit ON abstract_problems(unit);
CREATE INDEX idx_abstract_problems_status ON abstract_problems(status);
CREATE INDEX idx_abstract_problems_skills ON abstract_problems USING GIN(primary_skills);
```

### context_problems table
```sql
CREATE TABLE context_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  abstract_problem_id UUID NOT NULL REFERENCES abstract_problems(id) ON DELETE CASCADE,

  -- Context
  context_type VARCHAR(50) NOT NULL,        -- shopping, cooking, geometry, sports, etc.
  context_description TEXT NOT NULL,        -- The story/scenario

  -- Question
  question TEXT NOT NULL,
  question_latex TEXT,

  -- Options (for multiple choice)
  options JSONB,                            -- Array of options
  options_latex JSONB,
  correct_answer INTEGER,                   -- Index of correct option

  -- Explanation
  explanation TEXT NOT NULL,
  explanation_latex TEXT,
  step_by_step JSONB,                       -- Detailed solution steps

  -- Variable values
  variable_values JSONB,                    -- Concrete values used in generation

  -- Visual data
  images JSONB,                             -- Array of image URLs/data
  visual_data JSONB,                        -- For graphs, charts, etc.

  -- Generation metadata
  generation_method VARCHAR(20) NOT NULL,   -- openai, template, manual
  template_id VARCHAR(100),                 -- If generated from template
  generation_params JSONB,                  -- Parameters used for generation

  -- Quality
  quality_score INTEGER,                    -- 1-10 rating
  verified BOOLEAN DEFAULT FALSE,
  verification_notes TEXT,

  -- Usage statistics
  times_used INTEGER DEFAULT 0,
  avg_correctness DECIMAL(5,2),             -- Average % of users getting it right
  avg_time_seconds INTEGER,                 -- Average time to complete

  -- Status
  status VARCHAR(20) DEFAULT 'active',      -- active, deprecated

  -- Timestamps
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,

  -- Constraints
  CHECK (context_type IN ('shopping', 'cooking', 'geometry', 'sports', 'finance',
                          'travel', 'construction', 'science', 'abstract', 'other')),
  CHECK (quality_score >= 1 AND quality_score <= 10),
  CHECK (status IN ('active', 'deprecated'))
);

CREATE INDEX idx_context_problems_abstract_id ON context_problems(abstract_problem_id);
CREATE INDEX idx_context_problems_context_type ON context_problems(context_type);
CREATE INDEX idx_context_problems_status ON context_problems(status);
CREATE INDEX idx_context_problems_quality ON context_problems(quality_score);
```

### question_attempts table (enhanced)
```sql
CREATE TABLE question_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Question reference
  context_problem_id UUID REFERENCES context_problems(id) ON DELETE SET NULL,
  abstract_problem_id UUID REFERENCES abstract_problems(id) ON DELETE SET NULL,

  -- Attempt data
  user_answer INTEGER NOT NULL,
  correct_answer INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER,

  -- Context
  quiz_session_id UUID,
  difficulty VARCHAR(20) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  skills_tested TEXT[],

  -- Timestamps
  attempted_at BIGINT NOT NULL,

  CHECK (difficulty IN ('easy', 'medium', 'hard', 'extreme')),
  CHECK (subject IN ('números', 'álgebra', 'geometría', 'probabilidad'))
);

CREATE INDEX idx_question_attempts_user ON question_attempts(user_id);
CREATE INDEX idx_question_attempts_context_problem ON question_attempts(context_problem_id);
CREATE INDEX idx_question_attempts_abstract_problem ON question_attempts(abstract_problem_id);
CREATE INDEX idx_question_attempts_quiz_session ON question_attempts(quiz_session_id);
CREATE INDEX idx_question_attempts_attempted_at ON question_attempts(attempted_at);
```

## Units of Examination

Based on PAES curriculum structure:

### M1 Units:
**Números:**
- enteros-racionales
- porcentaje
- potencias-raices
- proporcionalidad

**Álgebra:**
- expresiones-algebraicas
- ecuaciones-lineales
- sistemas-ecuaciones
- funciones-basicas

**Geometría:**
- perimetro-area
- volumen
- angulos
- transformaciones

**Probabilidad:**
- probabilidad-basica
- estadistica-descriptiva
- media-mediana-moda

### M2 Units:
(Similar structure, more advanced topics)

## Difficulty Scoring Algorithm

Abstract problems will have a `difficulty_score` (1-100) calculated based on:

1. **Number of skills** (20 points)
   - 1 skill: 5 points
   - 2 skills: 10 points
   - 3+ skills: 20 points

2. **Cognitive level** (30 points)
   - remember: 5 points
   - understand: 10 points
   - apply: 15 points
   - analyze: 20 points
   - evaluate: 25 points
   - create: 30 points

3. **Mathematical complexity** (30 points)
   - Simple operations: 10 points
   - Multi-step operations: 20 points
   - Abstract reasoning: 30 points

4. **Historical performance** (20 points)
   - Based on avg_correctness from attempts
   - High correctness (>80%): 5 points
   - Medium correctness (50-80%): 10 points
   - Low correctness (<50%): 20 points

**Difficulty mapping:**
- 1-25: easy
- 26-50: medium
- 51-75: hard
- 76-100: extreme

## Generation Workflow

### Phase 1: Generate Abstract Problems

```
1. For each unit in M1:
   a. Identify skill combinations
   b. Generate prompt for OpenAI
   c. Call OpenAI API (gpt-4-turbo)
   d. Parse response into abstract_problems schema
   e. Calculate difficulty_score
   f. Save to database with status='draft'

2. Review and activate:
   a. Admin reviews generated problems
   b. Updates status to 'active'
```

### Phase 2: Generate Context Problems

```
1. For each active abstract problem:
   a. Select appropriate context_type
   b. Generate prompt combining abstract essence + context
   c. Call OpenAI API
   d. Generate variable values
   e. Create complete question with options
   f. Generate step-by-step explanation
   g. Save to context_problems table
```

### Phase 3: Ordering

```
SELECT * FROM abstract_problems
WHERE level = 'M1'
  AND subject = 'números'
  AND unit = 'enteros-racionales'
  AND status = 'active'
ORDER BY difficulty_score ASC;
```

## Implementation Phases

### Goal 1: Some Abstract Problems ✓
- Generate 5-10 abstract problems per unit for M1
- Focus on one subject first (números)
- Get them into database
- Status: draft

### Goal 2: Abstract Problems for Every Unit ✓
- Complete all M1 units
- Generate 10-20 abstract problems per unit
- Review and activate

### Goal 3: Some Context Problems ✓
- Generate 2-3 context variations per abstract problem
- Focus on popular context types first
- Test with users

### Goal 4: Context Problems for Every Unit ✓
- Complete all M1 units
- Generate 3-5 contexts per abstract problem
- Ensure diversity in context types

## API Endpoints

### Abstract Problems
```
POST   /api/abstract-problems/generate       - Generate using AI
GET    /api/abstract-problems                - List with filters
GET    /api/abstract-problems/:id            - Get single
PUT    /api/abstract-problems/:id            - Update
DELETE /api/abstract-problems/:id            - Delete
POST   /api/abstract-problems/:id/activate   - Change status to active
```

### Context Problems
```
POST   /api/context-problems/generate        - Generate from abstract
GET    /api/context-problems                 - List with filters
GET    /api/context-problems/:id             - Get single
PUT    /api/context-problems/:id             - Update
DELETE /api/context-problems/:id             - Delete
GET    /api/context-problems/by-abstract/:id - Get all contexts for abstract
```

## Migration Strategy

### Phase 1: Parallel System
- New abstract/context tables alongside old questions
- Old system continues working
- Gradual generation of new problems

### Phase 2: Feature Flag
- Add flag to switch between old/new system
- Test new system with subset of users

### Phase 3: Full Migration
- Archive old questions to separate table
- Switch all users to new system
- Remove old TypeScript question files

### Phase 4: Cleanup
- Remove old code references
- Update all components to use new schema

## OpenAI Integration

### Model Selection
Use **gpt-4-turbo** or **gpt-4o** (latest available model)

### Prompt Structure for Abstract Problems

```
You are a PAES mathematics curriculum expert. Generate an abstract problem following these requirements:

Level: M1
Subject: números
Unit: enteros-racionales
Difficulty: medium
Cognitive Level: apply
Skills: ["numeros-enteros-sumar-restar", "numeros-racionales-comparar"]

Generate a JSON object describing the ESSENCE of a problem (not a concrete question) that tests these skills.

Output format:
{
  "essence": "Compare the result of adding two integers with a rational number",
  "answer_type": "multiple_choice",
  "expected_steps": ["identify integers", "add integers", "compare with rational", "select correct option"],
  "common_errors": ["forgetting to simplify", "incorrect sign handling"]
}
```

### Prompt Structure for Context Problems

```
You are creating a concrete math problem for PAES students.

Abstract Problem Essence: "Compare the result of adding two integers with a rational number"
Context Type: shopping
Skills: ["numeros-enteros-sumar-restar", "numeros-racionales-comparar"]

Generate a complete multiple-choice question with:
1. A realistic shopping scenario
2. 4 answer options (1 correct, 3 plausible distractors)
3. Step-by-step explanation
4. LaTeX formatting where appropriate

Output as JSON with fields: question, options, correct_answer, explanation, variable_values
```

## Success Metrics

1. **Coverage**: All M1 units have at least 10 abstract problems
2. **Diversity**: Each abstract problem has 3+ context variations
3. **Quality**: Average quality_score >= 7
4. **Performance**: avg_correctness similar to old questions
5. **Difficulty Distribution**: 25% easy, 40% medium, 25% hard, 10% extreme
