# Study Buddy Tools Documentation

## Overview

The Study Buddy now has **tool calling capabilities** powered by the Anthropic SDK. This allows the AI to access real-time data and perform specific actions to provide more accurate and helpful responses to students.

## What Are Tools?

Tools (also called function calling) allow the AI to:
1. **Access real-time data** - Get current performance metrics, streak info, etc.
2. **Perform calculations** - Analyze progress, generate study plans
3. **Make decisions** - Provide personalized recommendations based on actual data

## How It Works

```
Student asks a question
    ↓
Claude decides if it needs a tool
    ↓
Backend executes the tool
    ↓
Claude receives the result
    ↓
Claude formulates final response with accurate data
```

## Available Tools

### 1. `get_skill_details`
**Purpose:** Get detailed performance data for specific math skills

**When to use:** Student asks about their performance in specific topics

**Parameters:**
- `skill_name` (string): Name of the skill (e.g., "Ecuaciones lineales", "Fracciones")

**Example:**
```
Student: "¿Cómo me va en fracciones?"
→ Tool returns: {skill: "Fracciones", attempts: 15, correct: 12, accuracy: "80.0%", status: "Excelente"}
```

### 2. `generate_study_plan`
**Purpose:** Generate a personalized study plan based on weaknesses and goals

**When to use:** Student asks for a study plan, schedule, or what to focus on

**Parameters:**
- `days` (number): Number of days for the plan (e.g., 7, 14, 30)
- `minutes_per_day` (number): Target minutes per day (e.g., 30, 60)
- `focus_areas` (array, optional): Specific topics to focus on

**Example:**
```
Student: "Necesito un plan de estudio de 2 semanas"
→ Tool returns: {duration: "14 días", daily_time: "30 minutos", focus_areas: [...], weekly_structure: {...}}
```

### 3. `get_practice_recommendations`
**Purpose:** Get specific practice recommendations based on current performance

**When to use:** Student asks what mode to practice in or what to work on next

**Parameters:**
- `goal` (enum): One of:
  - `improve_weak_areas` - Focus on weaknesses
  - `maintain_streak` - Quick practice to keep streak alive
  - `challenge_mode` - Push limits with harder content
  - `exam_simulation` - Simulate real exam conditions

**Example:**
```
Student: "¿Qué me recomiendas practicar hoy?"
→ Tool analyzes performance and returns: {mode: "Rapid Fire Medium", questions: 8, why: "Desafío según tu nivel actual"}
```

### 4. `analyze_topic_performance`
**Purpose:** Analyze performance in a specific topic area

**When to use:** Student asks about their performance in Números, Álgebra, Geometría, or Probabilidad

**Parameters:**
- `topic` (enum): "Números", "Álgebra", "Geometría", or "Probabilidad"

**Example:**
```
Student: "¿Cómo estoy en Geometría?"
→ Tool returns: {topic: "Geometría", total_questions: 50, accuracy: "75.0%", status: "📈 Bien", recommendation: "..."}
```

### 5. `calculate_improvement_metrics`
**Purpose:** Calculate detailed improvement metrics over time

**When to use:** Student asks about progress, improvement, or how they're doing compared to before

**Parameters:**
- `timeframe` (enum): "week", "month", or "all_time"

**Example:**
```
Student: "¿He mejorado esta semana?"
→ Tool returns: {timeframe: "Última semana", sessions_completed: 5, average_score: "78.5%", improvement: "+12.3% 📈"}
```

### 6. `get_streak_insights`
**Purpose:** Get detailed insights about study streak and consistency

**When to use:** Student asks about their streak, consistency, or daily practice habits

**Parameters:** None

**Example:**
```
Student: "¿Cómo va mi racha?"
→ Tool returns: {current_streak: 5, longest_streak: 12, status: "A 7 días de tu mejor racha", motivation: "..."}
```

## Technical Implementation

### Architecture

```typescript
// 1. Define tools
const STUDY_BUDDY_TOOLS: Anthropic.Tool[] = [...]

// 2. Create API call with tools
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  messages: [...],
  tools: STUDY_BUDDY_TOOLS,
})

// 3. Handle tool use
while (response.stop_reason === 'tool_use') {
  const toolResult = executeTool(toolName, toolInput, userData, progressData)
  // Continue conversation with tool result
}

// 4. Return final response
return response
```

### Key Files

- **`backend/src/services/studyBuddyService.ts`** - Main implementation
  - Lines 128-220: Tool definitions
  - Lines 225-421: Tool execution functions
  - Lines 426-465: Tool dispatcher
  - Lines 626-689: Tool handling in `generateGreeting`
  - Lines 795-869: Tool handling in `continueChat`

### Changes from Previous Implementation

| Before | After |
|--------|-------|
| `fetch()` to Anthropic API | Anthropic SDK (`@anthropic-ai/sdk`) |
| No tool support | 6 tools available |
| Static responses | Dynamic, data-driven responses |
| Temperature: 0.8 (greeting), 0.7 (chat) | Same temperatures maintained |
| Max tokens: 1000 (greeting), 500 (chat) | Max tokens: 1000 (greeting), 1500 (chat) |

## Usage Examples

### Example 1: Personalized Study Plan
```
Student: "Necesito un plan de estudio de una semana, tengo 30 minutos al día"

Claude uses tool: generate_study_plan
Parameters: {days: 7, minutes_per_day: 30}

Tool returns: {
  duration: "7 días",
  daily_time: "30 minutos",
  focus_areas: ["Álgebra", "Geometría"],
  weekly_structure: {...},
  daily_goal: "1 sesión de práctica enfocada"
}

Claude responds: "¡Perfecto! Te armé un plan de 7 días con 30 minutos diarios.
Días 1-3: Enfócate en Álgebra en Zen Mode (sin presión, con AI Tutor)
Días 4-5: Practica Geometría con Rapid Fire Medium para ganar velocidad
Día 6: Desafíate con Rapid Fire Hard
Día 7: Repaso general en Zen Mode
¿Te parece bien empezar mañana con Álgebra? 💪"
```

### Example 2: Performance Analysis
```
Student: "¿He mejorado?"

Claude uses tool: calculate_improvement_metrics
Parameters: {timeframe: "week"}

Tool returns: {
  timeframe: "Última semana",
  sessions_completed: 8,
  total_questions: 65,
  average_score: "82.3%",
  improvement: "+8.5% 📈",
  trend: "Mejorando consistentemente 🔥"
}

Claude responds: "¡Sí! Has mejorado un 8.5% esta semana 📈
Completaste 8 sesiones con 65 preguntas. Tu promedio subió a 82.3%.
Estás mejorando consistentemente. Sigue así y pronto llegarás a 85%+ para Rapid Fire Extreme 🔥"
```

### Example 3: Topic-Specific Help
```
Student: "¿Cómo estoy en Probabilidad?"

Claude uses tool: analyze_topic_performance
Parameters: {topic: "Probabilidad"}

Tool returns: {
  topic: "Probabilidad",
  total_questions: 30,
  correct_answers: 18,
  accuracy: "60.0%",
  status: "⚠️ Necesita mejora",
  recommendation: "Practica 10 preguntas de Probabilidad en Zen Mode con AI Tutor"
}

Claude responds: "En Probabilidad tienes 60% de precisión (18/30 correctas).
Está bien, pero puedes mejorar ⚠️
Te recomiendo: 10 preguntas de Probabilidad en Zen Mode.
El AI Tutor te guía paso a paso sin presión.
¿Practicamos ahora? 🎯"
```

## Benefits

1. **Accuracy** - Real data instead of assumptions
2. **Personalization** - Recommendations based on actual performance
3. **Proactivity** - Can suggest actions without being asked
4. **Context** - Understands student's full situation
5. **Actionability** - Provides specific, achievable next steps

## Future Tool Ideas

Consider adding these tools in the future:
- `get_upcoming_live_sessions` - Show scheduled Live Sessions
- `get_curriculum_resources` - Link to relevant LaTeX curriculum
- `compare_with_peers` - Anonymous performance comparison
- `suggest_skill_sequence` - Optimal order to learn skills
- `get_ai_tutor_history` - Review previous AI Tutor sessions
- `estimate_exam_readiness` - Predict PAES performance

## Testing

To test the tools manually:

1. Start the backend: `cd backend && npm run dev`
2. Open the Study Buddy in the app
3. Ask questions that trigger tools:
   - "¿Cómo me va en Álgebra?" → `analyze_topic_performance`
   - "Dame un plan de estudio" → `generate_study_plan`
   - "¿Qué debería practicar?" → `get_practice_recommendations`
   - "¿Cómo va mi racha?" → `get_streak_insights`

Check backend logs to see which tools are being called.

## Maintenance

When adding new tools:

1. Add tool definition to `STUDY_BUDDY_TOOLS` array
2. Create execution function (e.g., `executeMyNewTool`)
3. Add case to `executeTool` switch statement
4. Update this documentation
5. Test thoroughly with various inputs

## API Costs

Tool calling increases token usage:
- **Without tools**: ~500-1000 tokens per response
- **With tools**: ~800-2000 tokens per response (depends on tool complexity)

Monitor usage at: https://console.anthropic.com/

## Troubleshooting

### Tool not being called
- Check tool description - make it clearer when to use it
- Verify student's question matches the use case
- Add examples to system prompt

### Wrong parameters
- Improve parameter descriptions in tool schema
- Add validation in execution function
- Return clear error messages

### Slow responses
- Reduce max_tokens if responses are cut off
- Consider caching frequent tool results
- Use parallel tool calls when possible (future enhancement)

---

**Last updated:** 2025-11-10
**Implementation:** Study Buddy Service v2.0 with Tool Calling
