---
name: blog
description: Analyze blog content gaps and create SEO-optimized posts for SimplePAES. Use when the user wants to identify what blog posts to write or create a new post.
---

# Blog Skill

## When to Use This Skill
- User wants to find blog content gaps
- User wants to create a new blog post
- User asks about content strategy or "what should we blog about"
- User wants to review/improve existing posts for SEO
- User asks about internal linking or content clusters

## Phase 1: Dynamic Gap Analysis

When analyzing gaps, read all posts in `/content/blog/` and evaluate coverage across these frameworks:

### Target Audiences

SimplePAES serves multiple audiences. Consider which audience each post targets:

| Audience | Context | Key Pain Points |
|----------|---------|-----------------|
| **Students (1°-4° Medio)** | Learning math throughout high school | Understanding concepts, passing tests, building foundations |
| **Students (PAES prep)** | Preparing for university entrance exam | Time pressure, high stakes, gap identification |
| **Parents** | Supporting their children's learning | Not knowing how to help, managing stress, tracking progress |
| **Teachers** | Teaching math in classroom settings | Diagnosing student gaps, differentiating instruction, saving time |
| **Schools/Coordinators** | Implementing math support programs | Scaling support, tracking outcomes, equity across students |

### Content Pillars (Matemáticas Educación Media)

These cover the Chilean curriculum from 1° to 4° Medio, including PAES preparation:

| Pillar | Topics | Grade Levels |
|--------|--------|--------------|
| Números | Integers, rationals, reals, operations, percentages, proportions, powers | 1°-4° Medio |
| Álgebra | Expressions, equations, inequalities, functions (linear, quadratic, exponential), sequences | 1°-4° Medio |
| Geometría | Shapes, measurement, area, volume, coordinates, transformations, trigonometry | 1°-4° Medio |
| Probabilidad y Estadística | Data analysis, graphs, probability, combinations, distributions | 1°-4° Medio |

### User Journey Stages

| Stage | Intent | Example Topics |
|-------|--------|----------------|
| **Awareness** | "What is this?" / "I have a problem" | Why math is hard, common struggles, what is PAES |
| **Consideration** | "How do I solve this?" | Study methods, practice strategies, how to improve |
| **Decision** | "Why this solution?" | Why SimplePAES, how AI tutoring helps, success stories |

### Content Types

- [ ] Strategy/tips posts (study techniques, time management, exam strategies)
- [ ] Concept explainers (topic tutorials, formulas explained, worked examples)
- [ ] Common mistakes posts (errors by topic, how to avoid them)
- [ ] Study planning guides (schedules, routines, resources)
- [ ] Success stories/testimonials (social proof)
- [ ] News/updates (PAES dates, curriculum changes, education news)
- [ ] Parent content (how to support students, managing stress)
- [ ] Teacher/school content (diagnosing gaps, differentiation, data-driven teaching)

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
- [ ] H2 headings include related keywords naturally (not generic like "Cómo elegir bien" → "Cómo elegir el apoyo correcto en matemáticas")
- [ ] Meta description under 160 characters, includes keyword, aligns with title
- [ ] Slug is descriptive, lowercase, hyphenated
- [ ] **Minimum 3 internal links** to related posts (see Internal Linking Strategy below)
- [ ] Alt text for any images
- [ ] Length is 800-1500 words (condense if longer—1800+ is too long)

### Internal Linking Strategy

**Why it matters:**
- Creates topic clusters that rank better together
- Distributes "link juice" across the site
- Increases time on site (users click to related content)
- Helps Google understand content relationships and index pages

**Rules:**
1. **Minimum 3 internal links per post** - Every post must link to at least 3 other posts
2. **Bidirectional linking within clusters** - If Post A links to Post B, Post B should link back to Post A
3. **Link contextually** - Place links where they add value, not just at the end
4. **Use descriptive anchor text** - "revisa [cómo manejar el tiempo en la PAES](/blog/...)" not "click here"

**Content Clusters (link within these groups):**

| Cluster | Posts |
|---------|-------|
| **Error posts** | errores-comunes-algebra-paes, errores-comunes-numeros-paes, errores-comunes-geometria-paes, errores-comunes-probabilidad-estadistica-paes |
| **Parent posts** | por-que-tu-hijo-no-quiere-ayuda-paes, como-hablar-paes-sin-conflicto, como-ayudar-hijo-matematicas-sin-saber, como-saber-si-tu-hijo-esta-preparado-paes, lagunas-matematicas-anos-anteriores, error-padres-elegir-apoyo-matematicas |
| **Teacher posts** | como-asignar-practica-paes-efectiva, diagnosticar-lagunas-matematicas-curso, diferenciar-instruccion-matematicas, mitad-curso-no-entiende |
| **PAES prep** | que-estudiar-paes-m1-temario-completo, manejar-tiempo-paes-matematica, guia-paes-invierno-2026 |
| **Learning/mindset** | por-que-no-entiendo-matematicas |

**Cross-cluster linking:**
- Error posts → link to from student/teacher posts when discussing common mistakes
- Parent posts → link to lagunas post (explains gaps concept for parents)
- Teacher posts → link to error posts (what errors to watch for)
- PAES prep posts → link to error posts and temario

### CTA Guidelines

**Principle:** CTAs should feel natural and helpful, not salesy or technical. Keep them simple.

**Common mistakes to avoid:**
- Too technical: "retroalimentación instantánea y un tutor con IA que responde sus dudas 24/7"
- Too long: Multiple sentences explaining features
- Forced: Adding CTA where it doesn't fit the content

**Better approach:**
- Short and natural: "SimplePAES tiene un tutor disponible 24/7 que responde sin juicio."
- Context-appropriate: Match CTA to what the post discusses
- One clear action: Don't list multiple features

### CTA Templates

Use these naturally when relevant (not forced into every post). Match the CTA to the target audience:

#### For Students

**For practice features:**
> ¿Quieres practicar este tema? SimplePAES tiene ejercicios con retroalimentación instantánea que te muestran exactamente dónde te equivocas.

**For AI tutor:**
> Si te trabas en algún paso, nuestro tutor con IA te guía con preguntas—sin darte la respuesta directamente.

**For timed practice (PAES prep):**
> Practica bajo presión real con nuestro modo Rapid Fire, que simula las condiciones del examen.

**For Zen mode (learning/homework):**
> ¿Prefieres aprender sin presión? El modo Zen te deja practicar a tu ritmo, con ayuda disponible cuando la necesites.

**For live sessions:**
> Únete a sesiones en vivo donde practicas junto a otros estudiantes y ves cómo te comparas.

**Soft CTA (end of post - students):**
> ---
> *¿Listo para practicar? SimplePAES te ayuda a dominar [topic] con práctica inteligente y retroalimentación instantánea.*

#### For Teachers/Schools

**For class dashboard:**
> Con SimplePAES puedes crear tu clase, asignar práctica por tema, y ver desde tu panel qué estudiantes practicaron y dónde se están equivocando—todo sin corregir un solo ejercicio.

**For diagnosing gaps:**
> El diagnóstico de SimplePAES te muestra exactamente qué temas necesita reforzar cada estudiante, para que puedas diferenciar sin adivinar.

**For saving time:**
> Deja que SimplePAES corrija y dé retroalimentación automática. Tú enfócate en enseñar lo difícil.

**Soft CTA (end of post - teachers):**
> ---
> *Con SimplePAES puedes ver qué temas necesitan refuerzo en tu curso y asignar práctica personalizada—sin agregar horas a tu semana. [Conoce nuestros planes para colegios](https://simplepaes.cl/profesores).*

#### For Parents

**For supporting learning:**
> SimplePAES le da a tu hijo la ayuda que necesita, cuando la necesita, sin tener que pedirla. El tutor con IA responde sus dudas al instante—sin juicio, sin frustración.

**Soft CTA (end of post - parents):**
> ---
> *¿Quieres darle a tu hijo una herramienta que lo ayude a mejorar de forma independiente? SimplePAES ofrece práctica con retroalimentación instantánea y un tutor con IA disponible 24/7.*

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
- Common tags by category:
  - **General:** matemáticas, estudio, consejos, estrategia
  - **Topics:** álgebra, geometría, números, probabilidad, estadística
  - **Audiences:** PAES, profesores, padres, educación media
  - **Grade levels:** 1° medio, 2° medio, 3° medio, 4° medio (use when content is grade-specific)

## Reference: Existing Posts

Read these to match voice and style:
- `content/blog/manejar-tiempo-paes-matematica.md` - Strategy post example
- `content/blog/por-que-no-entiendo-matematicas.md` - Psychology/mindset post example

**Good examples of internal linking:**
- `content/blog/error-padres-elegir-apoyo-matematicas.md` - Parent post with 4 internal links
- `content/blog/errores-comunes-probabilidad-estadistica-paes.md` - Error post linking to all other error posts

**Good examples of content clusters:**
- Parent cluster (6 posts, all interconnected)
- Error posts (4 posts, all link to each other bidirectionally)

## Phase 3: Post Review & Improvement

When reviewing existing posts for SEO improvements:

### Review Checklist

For each post, check:

| Area | What to Look For | Action |
|------|------------------|--------|
| **Internal links** | Less than 3 links? | Add contextual links to related posts in same cluster |
| **Bidirectional links** | Post A links to B, but B doesn't link back? | Add reciprocal link |
| **H2 keywords** | Generic H2s like "Qué hacer" or "Cómo elegir bien" | Rewrite with target keywords: "Cómo elegir el apoyo correcto en matemáticas" |
| **Post length** | Over 1800 words? | Condense repetitive sections, link to detailed posts instead |
| **CTA** | Too long or technical? | Simplify to one short sentence |
| **Description** | Doesn't match title keywords? | Align description with title |

### Improvement Workflow

1. **Audit all posts** - Count internal links, identify "dead ends" (posts with 0 outgoing links)
2. **Prioritize fixes** - Start with posts that have 0 links (critical)
3. **Add links contextually** - Insert where they add value, not just appended at end
4. **Verify bidirectional** - Check that linked posts link back
5. **Test clusters** - Each cluster should have interconnected posts

### Common Issues We've Fixed

| Issue | Example | Solution |
|-------|---------|----------|
| Dead-end posts | Error álgebra had 0 outgoing links | Add links to other error posts |
| Asymmetric linking | Parent posts linked TO but not FROM original | Add links from original to new cluster |
| Generic H2s | "Cómo saber si este es el problema" | "Cómo saber si tu hijo tiene lagunas profundas" |
| Long sections | "Lo que NO debes hacer" with 4 verbose points | Condense to bullets with links |

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
4. Run through SEO checklist (including 3+ internal links)
5. Save to `/content/blog/[slug].md`
6. Update related posts to link back (bidirectional)

**To improve existing posts:**
1. Audit internal links across all posts
2. Identify dead-ends and asymmetric links
3. Add contextual links (minimum 3 per post)
4. Check H2s for keyword inclusion
5. Simplify CTAs if too technical
