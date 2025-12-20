# Phase 1: Deep Thinking - Pedagogical Design

This document guides the mandatory pedagogical design phase. Complete this thinking BEFORE writing any code.

---

## 1.1 Learning Objective Analysis

Answer these questions in your extended thinking:

### A. CONCEPT IDENTIFICATION
- What specific mathematical concept will students master?
- What is the precise skill or understanding they will gain?
- How does this fit into the broader PAES curriculum?

### B. PREREQUISITE KNOWLEDGE
- What must students already know to succeed?
- What concepts from previous lessons does this build on?
- Are there any "hidden" prerequisites that might cause confusion?

### C. COMMON MISCONCEPTIONS
- What mistakes do students typically make with this concept?
- What alternative conceptions might they have?
- How will the lesson explicitly address these misconceptions?

### D. TRANSFER GOALS
- Where else will students use this knowledge?
- What real-world applications exist?
- How does this connect to other mathematical concepts?

---

## 1.2 Zone of Proximal Development (ZPD) Analysis

Design the scaffolding strategy using this template:

```
CURRENT ABILITY (What students can do independently):
→ [Identify specific skills they already have]

LEARNING EDGE (What is just beyond current ability):
→ [The new skill/concept this lesson teaches]

SCAFFOLDING STRATEGY:
→ Step 1 Hook: Activate prior knowledge with familiar context
→ Step 2 Explore: Guide discovery with interactive examples
→ Step 3 Explain: Formalize with explicit instruction
→ Step 4 Classify: Practice discrimination/identification
→ Step 5 Practice: Apply with decreasing support
→ Step 6 Verify: Demonstrate mastery independently

GRADUAL RELEASE PLAN:
→ How will you gradually remove scaffolds?
→ At what point do students work independently?
```

---

## 1.3 Lesson Narrative Arc

Design both the cognitive AND emotional journey:

| Step | Type | Cognitive Goal | Emotional Goal | Time |
|------|------|----------------|----------------|------|
| 1 | Hook | Activate curiosity, connect to prior knowledge | Intrigue, wonder, "I want to know!" | ~2 min |
| 2 | Explore | Discover patterns through interaction | "Aha!" moments, growing confidence | ~4 min |
| 3 | Explain | Formalize concepts, connect to symbols | Confidence, "Now I understand" | ~3 min |
| 4 | Classify | Discriminate between types/cases | Mastery feeling, "I can tell them apart" | ~3 min |
| 5 | Practice | Apply knowledge, build fluency | Growing confidence, productive struggle | ~3 min |
| 6 | Verify | Consolidate and demonstrate mastery | Achievement, pride, completion | ~2 min |

**Total: 12-17 minutes**

---

## 1.4 Real-World Hook Design

Your hook MUST meet these criteria:

### DO:
- Be culturally relevant to Chilean students
- Present a genuine puzzle or problem that feels interesting
- Have an answer that is surprising or satisfying
- Create a natural bridge to the mathematical concept
- Use concrete, tangible scenarios

### DON'T:
- Make it feel like "a math problem in disguise"
- Use abstract mathematical language in the scenario
- Start with formulas or definitions
- Use scenarios irrelevant to teenagers

---

### Exemplar Hooks (Study These)

#### 1. Términos Semejantes - "La Frutería Matemática"
- **Scenario**: Don Pedro counts fruit: 3 manzanas + 2 naranjas + 4 manzanas = ?
- **Discovery**: Students realize you can only add "like" things
- **Bridge**: Variables are like fruit types - only combine same ones
- **File**: `components/lessons/m1/terminos-semejantes/Step1Hook.tsx`

#### 2. Factor Común - "El Carpintero Eficiente"
- **Scenario**: A carpenter needs to cut multiple pieces efficiently
- **Discovery**: Grouping common elements saves time
- **Bridge**: Factorization as finding and extracting common elements
- **File**: `components/lessons/m1/factor-comun/Step1Hook.tsx`

#### 3. Figuras Compuestas - "La Habitación en Forma de L"
- **Scenario**: Calculate floor area for an L-shaped room
- **Discovery**: Two strategies work - add rectangles OR subtract from larger
- **Bridge**: Decomposition of complex shapes into simpler ones
- **File**: `components/lessons/m1/figuras-compuestas/Step1Hook.tsx`

#### 4. Principio Multiplicativo - "El Armario de Combinaciones"
- **Scenario**: How many outfit combinations from shirts and pants?
- **Discovery**: Multiply choices at each stage
- **Bridge**: Counting principle for sequential choices
- **File**: `components/lessons/m1/principio-multiplicativo/Step1Hook.tsx`

#### 5. Fracciones - "Compartir Chocolate"
- **Scenario**: Split a chocolate bar fairly between friends
- **Discovery**: 1/2 is actually MORE than 1/4 (counterintuitive)
- **Bridge**: Fractions represent parts of a whole
- **File**: `components/lessons/m1/fracciones-concepto/Step1Hook.tsx`

#### 6. Porcentajes - "El Descuento de la Tienda"
- **Scenario**: Which store has the better deal: 20% off or $15 off?
- **Discovery**: It depends on the original price
- **Bridge**: Percentages are fractions of 100
- **File**: `components/lessons/m1/porcentaje-concepto/Step1Hook.tsx`

#### 7. Ecuaciones Lineales - "La Cuenta del Restaurante"
- **Scenario**: Three friends paid $45 total, one paid $5 extra for dessert
- **Discovery**: Detective framing to find the unknown
- **Bridge**: Variables represent unknown quantities
- **File**: `components/lessons/m1/ecuaciones-lineales/Step1Hook.tsx`

#### 8. Teorema de Pitágoras - "La Escalera del Bombero"
- **Scenario**: How tall a wall can a 5m ladder reach if placed 3m from base?
- **Discovery**: Practical measurement problem
- **Bridge**: Right triangle relationships
- **File**: `components/lessons/m1/teorema-pitagoras/Step1Hook.tsx`

---

### Weak Hooks (Avoid These Patterns)

```typescript
// ❌ TOO ABSTRACT - feels like math from the start
<p>Imagina que tienes la expresión 3x + 2x...</p>

// ❌ META/BORING - about math instead of using math
<p>Un estudiante está resolviendo un problema de álgebra...</p>

// ❌ TOO ACADEMIC - sounds like a textbook
<p>En matemáticas, a menudo necesitamos simplificar expresiones...</p>

// ❌ FORCED CONTEXT - math problem with thin disguise
<p>Juan tiene 3x manzanas y María tiene 2x manzanas...</p>
```

### Strong Hooks (Use These Patterns)

```typescript
// ✅ GENUINE PUZZLE - interesting before knowing it's math
<p>Don Pedro tiene una frutería y necesita contar su inventario:</p>
<div>{/* Visual with actual fruit icons */}</div>
<p>3 manzanas + 2 naranjas + 4 manzanas = ???</p>

// ✅ REAL PROBLEM - something a person would actually do
<p>Necesitas calcular cuánto piso comprar para esta habitación:</p>
<div>{/* L-shaped room diagram */}</div>

// ✅ SURPRISING RESULT - makes students curious
<p>¿Cuántos atuendos diferentes puedes crear con 4 camisas y 3 pantalones?</p>
<p>La respuesta te sorprenderá...</p>
```

---

## 1.5 Multiple Representations Planning

Plan how you will represent the concept through multiple modes:

### VISUAL (diagrams, animations, color-coding)
- What SVG diagrams will you create?
- How will color-coding reinforce meaning?
- What animations or transitions will reveal understanding?

### SYMBOLIC (mathematical notation)
- What formulas/symbols will you introduce?
- How will you connect symbols to visual representations?
- When is the right moment to introduce formal notation?

### VERBAL (explanations in Spanish)
- What are the key phrases and terminology?
- How will you explain concepts in accessible language?
- What metaphors or analogies will help understanding?

### KINESTHETIC (interactive elements)
- What will students click, drag, or manipulate?
- How does interaction reinforce the concept?
- What feedback will interactions provide?

### NUMERIC (concrete examples)
- What specific numbers will you use in examples?
- Are they "friendly" numbers that don't obscure the concept?
- Do examples progress from simple to complex?

---

## 1.6 Pedagogical Frameworks

Apply these evidence-based principles throughout your design:

### Framework 1: Constructivism
Students build knowledge; they don't receive it passively.

**Design Implications:**
- Step 2 (Explore) MUST have discovery BEFORE formulas
- Let students "figure it out" before explaining
- Use "¿Qué notas?" over "La regla es..."
- Questions guide discovery, not deliver answers

### Framework 2: Socratic Method
Ask questions rather than give answers.

**Design Implications:**
- Use guiding questions throughout
- Feedback should prompt thinking, not just confirm correctness
- "¿Qué patrón ves?" instead of "El patrón es..."
- Wrong answers are learning opportunities, not failures

### Framework 3: Cognitive Load Theory
Limit new information per screen.

**Design Implications:**
- Progressive reveal of complexity
- Consistent visual language across all lessons
- One concept at a time, don't overwhelm
- Remove extraneous information that doesn't serve learning

### Framework 4: Spaced Retrieval
Testing enhances memory more than re-studying.

**Design Implications:**
- Step 6 (Verify) tests concepts from ALL prior steps
- Include both "near transfer" (similar) and "far transfer" (new contexts)
- Questions should require application, not just recall
- Mix question types to strengthen varied retrieval paths

### Framework 5: Growth Mindset Language
Normalize productive struggle.

**Design Implications:**
- Use encouraging language for incorrect answers
- "¡Casi!" not "Incorrecto"
- "Veamos cómo funciona..." after mistakes
- Never shame wrong answers
- Celebrate effort and persistence

---

## Pre-Implementation Checklist

Before creating any files, confirm you have completed:

- [ ] Learning Objective Analysis (concept, prerequisites, misconceptions, transfer)
- [ ] ZPD Analysis (current ability, learning edge, scaffolding strategy)
- [ ] Lesson Narrative Arc (cognitive + emotional goals for all 6 steps)
- [ ] Real-World Hook Design (culturally relevant, genuinely puzzling)
- [ ] Multiple Representations (visual, symbolic, verbal, kinesthetic, numeric)
- [ ] Reviewed 2-3 exemplar lessons for patterns
- [ ] Identified 4+ checkpoint questions for Step 6
- [ ] Estimated duration (12-17 minutes total)

---

## Thinking Block Template

Use this template in your extended thinking:

```
LESSON: [Topic Name]
THEMATIC UNIT: [M1-XXX-000]

=== LEARNING OBJECTIVE ===
Concept: [What students will master]
Prerequisites: [What they already know]
Misconceptions: [Common mistakes to address]
Transfer: [Where they'll use this]

=== ZPD ANALYSIS ===
Current: [What they can do now]
Target: [What they'll be able to do]
Scaffold: [How to bridge the gap]

=== NARRATIVE ARC ===
Step 1 Hook: [Scenario] → Emotion: [curiosity]
Step 2 Explore: [Activity] → Emotion: [discovery]
Step 3 Explain: [Content] → Emotion: [confidence]
Step 4 Classify: [Exercise] → Emotion: [mastery]
Step 5 Practice: [Problems] → Emotion: [growth]
Step 6 Verify: [Questions] → Emotion: [achievement]

=== HOOK DESIGN ===
Scenario: [Real-world situation]
Puzzle: [What makes it interesting]
Bridge: [Connection to math concept]
Visual: [How to show it]

=== REPRESENTATIONS ===
Visual: [Diagrams/animations]
Symbolic: [Formulas to introduce]
Verbal: [Key phrases]
Interactive: [What students manipulate]
Numeric: [Concrete examples]

=== CHECKPOINT QUESTIONS ===
Q1: [Tests concept from Step 2]
Q2: [Tests concept from Step 3]
Q3: [Tests application from Step 5]
Q4: [Tests transfer to new context]
```
