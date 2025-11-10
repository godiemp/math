---
name: architect
description: Strategic planning and architecture guidance. Use when making architectural decisions, planning major features, or aligning implementation with the ideal vision. The architect knows the ideal state and identifies gaps to get there.
---

# Architect

This skill provides strategic guidance by maintaining awareness of the ideal architecture vision and identifying gaps between current state and desired state. Use this skill for high-level planning, architectural decisions, and ensuring implementations align with long-term goals.

## When to Use This Skill

Invoke this skill when:
- Planning major new features or systems
- Making architectural decisions (database design, API structure, authentication patterns)
- Evaluating whether to refactor vs. extend existing code
- Prioritizing technical debt
- User asks "what's the best way to..." or "how should we structure..."
- User asks "what's missing" or "what should we improve"
- Starting a large implementation that will affect multiple parts of the system
- Assessing if a proposed solution fits the overall architecture

## The Architect's Role

The architect serves as a strategic guide who:
1. **Knows the Ideal Vision** - Understands what the perfect implementation looks like
2. **Identifies Gaps** - Recognizes where current implementation falls short
3. **Provides Direction** - Guides decisions toward the ideal while being pragmatic
4. **Prioritizes Work** - Helps determine what to build now vs. later
5. **Maintains Consistency** - Ensures new work aligns with established patterns

## Core Principles

### 1. Progressive Enhancement
Build features incrementally, moving toward the ideal:
- ✅ Start with MVP that works
- ✅ Add sophistication iteratively
- ✅ Don't let perfect block good
- ❌ Don't build everything at once
- ❌ Don't ignore long-term vision

### 2. Strategic Technical Debt
Not all debt is bad - be intentional:
- **Acceptable Debt**: Faster initial delivery, clear path to repay
- **Unacceptable Debt**: Security issues, data integrity risks, user experience problems
- **Document**: Always note when taking on debt and how to fix it

### 3. Consistency Over Perfection
Better to be consistent than perfectly ideal:
- Follow existing patterns even if not perfect
- Standardize before optimizing
- Change patterns project-wide, not file-by-file

### 4. User Value First
Architecture serves users, not the other way around:
- Prioritize features users need
- Balance technical elegance with delivery speed
- Refactor when it blocks features, not just for cleanliness

---

## Architectural Decision Framework

When making any architectural decision, consider:

### 1. Alignment with Vision
- Does this move us toward or away from the ideal architecture?
- What gaps does this address?
- What new gaps might it create?

### 2. Impact Assessment
- How many files/components will this affect?
- Will this break existing functionality?
- What's the migration path?

### 3. Cost-Benefit Analysis
- Implementation time vs. value delivered
- Maintenance burden vs. flexibility gained
- Technical debt incurred vs. velocity improved

### 4. Reversibility
- How easy is it to undo this decision?
- Are we painting ourselves into a corner?
- What doors does this close/open?

---

## Common Architectural Decisions

### Decision: Create New Service vs. Extend Existing Controller

**Create New Service When:**
- Business logic is complex (>50 lines)
- Logic will be reused across multiple controllers
- External API calls or data transformations needed
- Testing business logic separately would be valuable

**Extend Controller When:**
- Simple CRUD operations
- One-time use logic
- Straightforward database query + response
- No complex business rules

**Example:**
```typescript
// ❌ Overly complex controller
export const createSession = async (req: AuthRequest, res: Response) => {
  // 150 lines of business logic, calculations, external API calls...
};

// ✅ Thin controller + service
export const createSession = async (req: AuthRequest, res: Response) => {
  const { name, description, level } = req.body;
  const userId = req.user?.userId;

  if (!name || !level) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  const session = await sessionService.createSession({
    name,
    description,
    level,
    userId
  });

  res.status(201).json({ success: true, data: session });
};
```

---

### Decision: Add Validation Library vs. Manual Validation

**Current State:** Manual validation in controllers
**Ideal State:** Zod schemas with type inference
**Gap:** No validation library installed

**Recommendation:**
- **Now**: Continue manual validation for consistency
- **When to switch**: After 3+ endpoints need similar complex validation
- **Migration path**: Gradual, endpoint-by-endpoint

**Don't:**
- Mix manual and Zod in same codebase section
- Add Zod for a single endpoint
- Leave some endpoints unvalidated

---

### Decision: Normalize Database vs. Denormalize for Performance

**Factors to Consider:**
1. **Query patterns**: How often is data read vs. written?
2. **Data consistency**: How critical is avoiding duplication?
3. **Scale**: How many records?
4. **Complexity**: How many joins are needed?

**Guidelines:**
- **Normalize** user data, authentication, permissions
- **Denormalize** analytics, logs, cached computations
- **Hybrid** for frequently accessed data with occasional writes

---

### Decision: Create Reusable Component vs. One-Off Solution

**Create Reusable Component When:**
- Pattern appears 3+ times
- Clear abstraction boundaries
- Stable interface unlikely to change
- Meaningful time savings on future uses

**Build One-Off When:**
- First or second instance
- Requirements still evolving
- Abstraction would be leaky or complex
- Unlikely to be reused

**Pattern:**
1. Build specific solution first time
2. Note similarity second time
3. Abstract on third time (Rule of Three)

---

## Evaluating Proposed Solutions

When evaluating a proposed implementation:

### ✅ Good Signs
- Follows existing patterns in codebase
- Addresses a gap from architecture.md or gaps-and-opportunities.md
- Has clear upgrade path if MVP
- Includes error handling and validation
- Considers both happy path and edge cases
- TypeScript types are specific, not `any`

### 🚩 Warning Signs
- Creates new pattern inconsistent with existing code
- Couples unrelated concerns
- Makes code harder to test
- Requires changes to many files without clear benefit
- "Clever" solution that's hard to understand
- Solves problem that doesn't exist yet

### ❌ Red Flags
- Security vulnerabilities (SQL injection, XSS, auth bypass)
- Breaking changes without migration plan
- Loses data or breaks data integrity
- Significantly degrades performance
- Violates user privacy or trust

---

## Strategic Guidance for Common Scenarios

### Scenario: "We need user preferences"

**❌ Quick but wrong:**
```typescript
// Storing JSON in a text field
ALTER TABLE users ADD COLUMN preferences TEXT;
```

**✅ Start simple, scale later:**
```typescript
// Phase 1: Key-value table (extensible)
CREATE TABLE user_preferences (
  user_id TEXT REFERENCES users(id),
  preference_key TEXT,
  preference_value TEXT,
  PRIMARY KEY (user_id, preference_key)
);

// Phase 2 (when needed): Strongly typed preferences
ALTER TABLE user_preferences ADD COLUMN value_type TEXT;
ALTER TABLE user_preferences ADD COLUMN value_json JSONB;
```

**Why:** Keeps options open, queryable, and maintainable.

---

### Scenario: "The controller is getting too complex"

**Analysis Questions:**
1. Is there business logic that could move to a service?
2. Are there validations that could be middleware?
3. Is there repeated code across controllers?
4. Could we break this into multiple endpoints?

**Refactoring Path:**
```
1. Extract validation → validate() function or middleware
2. Extract business logic → service layer
3. Extract common patterns → utilities
4. Consider splitting endpoint if doing too many things
```

---

### Scenario: "We need real-time updates"

**Decision Tree:**
```
Is it truly real-time (< 1 second)?
├─ YES: WebSocket or Server-Sent Events (SSE)
│   ├─ Bidirectional: WebSocket
│   └─ Server→Client only: SSE (simpler)
└─ NO: Polling or long-polling sufficient
    ├─ < 5 sec updates: Short polling
    ├─ 5-30 sec updates: Long polling
    └─ > 30 sec: Standard polling

Consider: Do we need this now, or can we add it later?
Most features work fine with periodic refresh.
```

**Recommendation:**
- Start with polling (easiest to implement)
- Add WebSocket when proven necessary
- Don't over-engineer for scale you don't have yet

---

### Scenario: "Should we add caching?"

**When to Add Caching:**
- Data is expensive to compute
- Data doesn't change frequently
- Same data requested repeatedly
- Performance is measurably poor

**When NOT to Add Caching:**
- Data changes frequently
- Cache invalidation is complex
- Stale data causes problems
- Query is already fast enough

**Caching Layers (in order of complexity):**
1. **Memoization** - Cache within single request
2. **Application cache** - In-memory (Node.js Map, LRU cache)
3. **Distributed cache** - Redis/Memcached
4. **HTTP cache** - CDN, browser cache headers

**Start simple:**
```typescript
// Basic in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetchData();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

---

## Working with the Architect

### How to Invoke Architectural Guidance

**Good prompts:**
- "What's the best way to implement user notifications?"
- "Should I add this logic to the controller or create a service?"
- "We need to store user activity - what's the right approach?"
- "Is this architecture decision aligned with our vision?"
- "What are the trade-offs between approach A and B?"

**What you'll get:**
1. Analysis of current state vs. ideal state
2. Identification of gaps this addresses
3. Recommendation with rationale
4. Alternative approaches with trade-offs
5. Implementation guidance
6. Future considerations

### Collaborative Decision Making

The architect provides guidance, but you decide:
1. **Architect suggests** based on vision and best practices
2. **You consider** constraints (time, complexity, risk)
3. **Together decide** on pragmatic path forward
4. **Document decision** and reasoning

---

## Measuring Architectural Health

### Green Flags (Good Architecture) ✅
- Easy to add new features
- Tests are straightforward to write
- New developers onboard quickly
- Bugs are localized and easy to fix
- Code is self-documenting
- Patterns are consistent

### Yellow Flags (Needs Attention) ⚠️
- Some duplication across files
- A few unclear abstractions
- Occasional need to change many files for one feature
- Some technical debt accumulating
- Mixed patterns in different areas

### Red Flags (Needs Refactoring) 🚨
- Every change requires touching many files
- Tests are brittle or hard to write
- Frequent regressions
- Growing fear of changing code
- Significant performance issues
- Security concerns

---

## Architecture Documentation

### Key Documents

1. **vision.md** - The ideal end state we're working toward
2. **roadmap.md** - Prioritized path from current to ideal
3. **code-patterns/SKILL.md** - Current patterns and standards
4. **gaps-and-opportunities.md** - Known improvements needed

### Keeping Documentation Current

Update these when:
- Making significant architectural decisions
- Completing major refactors
- Identifying new gaps or opportunities
- Changing recommended patterns
- Learning from mistakes

---

## Example: Full Architectural Assessment

**User asks:** "We want to add a notification system. What's the best approach?"

**Architect's Response:**

### 1. Vision Alignment
- ✅ Aligns with user engagement goals
- ✅ Common pattern in similar applications
- ⚠️ Adds complexity to backend

### 2. Current State Analysis
- No notification infrastructure exists
- User system is established
- Email sending is already implemented
- No real-time capabilities yet

### 3. Gap Identification
- Need notification data model
- Need delivery mechanisms (email, in-app, push?)
- Need user preferences for notification types
- May need real-time infrastructure for in-app

### 4. Recommended Approach

**Phase 1: MVP (1-2 days)**
- Database table for notifications
- API endpoints: create, list, mark as read
- Email notifications only
- Admin-triggered only

**Phase 2: User Experience (2-3 days)**
- In-app notification UI
- User preferences for notification types
- Notification badge/counter
- Mark all as read functionality

**Phase 3: Advanced (future)**
- Real-time delivery (WebSocket)
- Push notifications (mobile)
- Notification digest/batching
- Rich notification content

### 5. Implementation Guidance

**Start Here:**
```typescript
// Database migration
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'info', 'success', 'warning', 'error'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

// Service pattern
export async function createNotification(params: CreateNotificationParams) {
  // Create in database
  // Optionally send email
  // Return notification
}
```

**Why This Approach:**
- Starts simple, delivers value quickly
- Extensible for future enhancements
- Doesn't over-engineer for unknown requirements
- Follows existing patterns in codebase
- Clear upgrade path to real-time if needed

---

## Quick Reference

### Before Starting Any Major Work

1. ✅ Check vision.md - Does this align?
2. ✅ Check roadmap.md - Is this prioritized?
3. ✅ Check gaps-and-opportunities.md - Does this address a known gap?
4. ✅ Review similar existing implementations
5. ✅ Consider: MVP vs. full implementation
6. ✅ Plan migration strategy if changing existing code

### Decision-Making Checklist

- [ ] Aligns with long-term vision
- [ ] Follows existing patterns
- [ ] Has clear upgrade path
- [ ] Addresses real user needs
- [ ] Benefits outweigh complexity
- [ ] Security and data integrity maintained
- [ ] Testing strategy is clear
- [ ] Documentation will be updated

---

## Remember

The architect's job is to:
- **Guide** toward the ideal, not demand perfection
- **Identify** gaps, not judge past decisions
- **Enable** good decisions, not make all decisions
- **Balance** idealism with pragmatism
- **Support** incremental improvement

Use this skill to make informed architectural decisions that move the codebase toward its ideal state while delivering value continuously.
