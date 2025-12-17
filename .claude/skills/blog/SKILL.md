---
name: blog
description: Analyze blog content gaps and create SEO-optimized posts for SimplePAES. Use when the user wants to identify what blog posts to write or create a new post.
---

# Blog Skill

## When to Use This Skill
- User wants to find blog content gaps
- User wants to create a new blog post
- User asks about content strategy or "what should we blog about"

## Phase 1: Dynamic Gap Analysis

When analyzing gaps, read all posts in `/content/blog/` and evaluate coverage across these frameworks:

### Content Pillars (PAES M1 Curriculum)

| Pillar | Topics | Status |
|--------|--------|--------|
| Números | Integers, rationals, operations, order, absolute value | |
| Álgebra | Expressions, equations, inequalities, functions, sequences | |
| Geometría | Shapes, measurement, area, volume, coordinates, transformations | |
| Probabilidad y Estadística | Data analysis, graphs, probability, combinations | |

### Student Journey Stages

| Stage | Intent | Example Topics |
|-------|--------|----------------|
| **Awareness** | "What is this?" | What is PAES, how hard is it, what's on the exam |
| **Consideration** | "How do I prepare?" | Study methods, time management, practice strategies |
| **Decision** | "Why this solution?" | Why SimplePAES, how AI tutoring helps, success stories |

### Content Types

- [ ] Strategy/tips posts (exam techniques, time management)
- [ ] Concept explainers (topic tutorials, formulas explained)
- [ ] Common mistakes posts (errors by topic, how to avoid them)
- [ ] Study planning guides (schedules, routines, resources)
- [ ] Success stories/testimonials (social proof)
- [ ] News/updates (PAES dates, curriculum changes, scores)
- [ ] Parent/teacher content (how to support students)

### Gap Prioritization Matrix

Score each potential topic 1-5 on:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| SEO Potential | 30% | Search volume, keyword difficulty, ranking opportunity |
| Conversion Potential | 30% | Likelihood to drive signups, proximity to decision |
| Authority Building | 25% | Establishes SimplePAES as expert, differentiates from competitors |
| Effort | 15% | Inverse of time/research required (higher = easier) |

**Priority Score** = (SEO × 0.3) + (Conversion × 0.3) + (Authority × 0.25) + (Effort × 0.15)

Recommend the gap with highest priority score.

### Current Coverage Analysis

Before recommending topics, analyze existing posts:

1. Read all `.md` files in `/content/blog/`
2. Extract: title, tags, main topics covered, journey stage, content type
3. Map to frameworks above
4. Identify uncovered areas

## Phase 2: Post Creation

### Step 1: Gather Requirements

Ask the user:
1. Which topic/gap to address (or recommend highest-priority gap)
2. Target word count (recommend 800-1500 words for SEO)
3. Any specific points, keywords, or angles to cover
4. Target keyword (for SEO optimization)

### Step 2: Generate Outline

Create a structured outline:
- **Hook**: Opening paragraph that captures attention, addresses pain point
- **3-5 H2 sections**: Each with clear, actionable content
- **Supporting elements**: Statistics, examples, tips where relevant
- **CTA**: Natural mention of SimplePAES feature that relates to topic

### Step 3: Write the Post

**Frontmatter format:**
```yaml
---
title: "Engaging Title with Target Keyword"
description: "Meta description 150-160 chars for SEO snippet"
date: "YYYY-MM-DD"
author: "SimplePAES"
tags: ["tag1", "tag2", "tag3"]
published: true
---
```

**Writing Guidelines:**

| Aspect | Guideline |
|--------|-----------|
| Tone | Helpful, direct, encouraging—never salesy or condescending |
| Language | Spanish (Chilean context, local references when relevant) |
| Voice | Use "tú" (informal you), speak like a supportive mentor |
| Evidence | Include statistics, research, or data when available |
| Structure | Short paragraphs, headers, bullets, bold for scanning |
| Length | 800-1500 words for SEO, longer for comprehensive guides |

**Content Principles:**

1. **Lead with value** - The reader should learn something useful even if they never sign up
2. **Be specific** - "Practice 10 problems daily" beats "practice regularly"
3. **Address objections** - Acknowledge why students struggle, then provide solutions
4. **Show, don't tell** - Examples and scenarios over abstract advice
5. **End with action** - What should the reader do next?

### SEO Checklist

Before publishing, verify:

- [ ] Target keyword appears in title
- [ ] Target keyword in first 100 words
- [ ] H2 headings include related keywords naturally
- [ ] Meta description under 160 characters, includes keyword
- [ ] Slug is descriptive, lowercase, hyphenated
- [ ] Internal links to related posts (if any exist)
- [ ] Alt text for any images
- [ ] Reading time is reasonable (5-10 min sweet spot)

### CTA Templates

Use these naturally when relevant (not forced into every post):

**For practice features:**
> ¿Quieres practicar este tema? SimplePAES tiene ejercicios con retroalimentación instantánea que te muestran exactamente dónde te equivocas.

**For AI tutor:**
> Si te trabas en algún paso, nuestro tutor con IA te guía con preguntas—sin darte la respuesta directamente.

**For timed practice:**
> Practica bajo presión real con nuestro modo Rapid Fire, que simula las condiciones del examen.

**For Zen mode:**
> ¿Prefieres aprender sin presión? El modo Zen te deja practicar a tu ritmo, con ayuda disponible cuando la necesites.

**For live sessions:**
> Únete a sesiones en vivo donde practicas junto a otros estudiantes y ves cómo te comparas.

**Soft CTA (end of post):**
> ---
> *¿Listo para practicar? SimplePAES te ayuda a dominar [topic] con práctica inteligente y retroalimentación instantánea.*

## File Conventions

**Location:** `/content/blog/[slug].md`

**Slug rules:**
- Lowercase only
- Hyphens to separate words
- No special characters or accents
- Descriptive but concise (3-6 words)
- Example: `errores-comunes-algebra-paes.md`

**Tags guidelines:**
- 3-5 tags per post
- Reuse existing tags when applicable
- Common tags: PAES, matemáticas, estrategia, álgebra, geometría, estudio, consejos

## Reference: Existing Posts

Read these to match voice and style:
- `content/blog/manejar-tiempo-paes-matematica.md` - Strategy post example
- `content/blog/por-que-no-entiendo-matematicas.md` - Psychology/mindset post example

## Quick Reference

**To analyze gaps:**
1. Read `/content/blog/*.md`
2. Map to Content Pillars, Journey Stages, Content Types
3. Score uncovered areas using Priority Matrix
4. Present top 3 recommendations with rationale

**To create a post:**
1. Confirm topic and target keyword
2. Generate outline for approval
3. Write draft following guidelines
4. Run through SEO checklist
5. Save to `/content/blog/[slug].md`
