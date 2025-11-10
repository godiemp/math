# Architecture Roadmap - Path to Ideal State

This roadmap outlines the prioritized path from our current implementation to the ideal architecture described in vision.md.

## Current State Assessment

### What's Working Well ✅
- **Basic functionality**: CRUD operations for core entities (users, sessions, questions, attempts)
- **Authentication**: JWT-based auth with role-based access control
- **Database**: PostgreSQL with migrations
- **Type safety**: TypeScript on both frontend and backend
- **Modern stack**: Next.js, Express, React Query

### Known Gaps 🔍
See `.claude/skills/code-patterns/gaps-and-opportunities.md` for detailed analysis.

**Summary of Critical Gaps:**
1. Inconsistent error response formats across endpoints
2. No centralized error handling middleware
3. No request validation library (manual validation everywhere)
4. Mixed authentication patterns (type casting vs. AuthRequest)
5. Heavy use of `any` types
6. No rate limiting
7. Inconsistent logging
8. No API documentation

---

## Roadmap Phases

### Phase 1: Foundation & Consistency (Current Priority)
**Goal:** Standardize existing patterns before building new features
**Duration:** Ongoing (incremental improvements)

#### 1.1 Response Format Standardization
**Status:** In Progress
**Priority:** 🔴 Critical

**Tasks:**
- [x] Document standard format in code-patterns skill
- [ ] Audit all endpoints for inconsistent formats
- [ ] Migrate high-traffic endpoints first
- [ ] Migrate remaining endpoints
- [ ] Add response type utilities

**Success Criteria:**
- All endpoints return `{ success: true, data: T }` or `{ success: false, error: string }`
- Frontend can reliably handle all API responses
- No mixed formats in any controller

**Impact:** High - Improves frontend reliability and user experience

---

#### 1.2 Authentication Pattern Consistency
**Status:** Partially Complete
**Priority:** 🟠 High

**Tasks:**
- [x] Create modular auth system (authenticate, authorize)
- [ ] Define AuthRequest type centrally
- [ ] Migrate controllers from type casting to AuthRequest
- [ ] Update all route imports to use new auth middleware
- [ ] Remove legacy auth middleware file

**Success Criteria:**
- Zero uses of `(req as any).user`
- All authenticated routes use AuthRequest type
- Auth middleware imported from new modular location

**Impact:** Medium - Improves type safety and code maintainability

---

#### 1.3 Input Validation Standardization
**Status:** Not Started
**Priority:** 🟠 High

**Current:** Manual validation in each controller (inconsistent)
**Target:** Consistent validation approach (prepare for Zod migration)

**Tasks:**
- [ ] Create validation helper utilities
- [ ] Standardize validation error messages
- [ ] Add validation to endpoints missing it
- [ ] Document validation patterns
- [ ] **Future:** Add Zod when 3+ endpoints need complex validation

**Success Criteria:**
- All endpoints validate required fields
- Consistent error messages
- Clear path to Zod migration

**Impact:** High - Improves security, UX, and API reliability

---

#### 1.4 Type Safety Improvements
**Status:** In Progress
**Priority:** 🟡 Medium

**Tasks:**
- [ ] Create centralized type definitions (`types/database.types.ts`, `types/api.types.ts`)
- [ ] Replace `any` types with proper types in controllers
- [ ] Add proper types to database query results
- [ ] Define specific types for visual data structures
- [ ] Enable stricter TypeScript checks incrementally

**Success Criteria:**
- < 10 uses of `any` in controllers
- All database query results properly typed
- TypeScript strict mode enabled

**Impact:** Medium - Catches bugs earlier, improves developer experience

---

### Phase 2: Infrastructure & Tooling
**Goal:** Add foundational tools and infrastructure for scale
**Duration:** 2-4 weeks (can be done in parallel with Phase 1)

#### 2.1 Error Handling Infrastructure
**Status:** Not Started
**Priority:** 🟠 High

**Tasks:**
- [ ] Create AppError class hierarchy
- [ ] Implement global error handling middleware
- [ ] Update controllers to throw AppError instead of returning errors
- [ ] Add error tracking service integration (Sentry)
- [ ] Test error propagation across all layers

**Success Criteria:**
- Centralized error handling for all endpoints
- Errors logged with proper context
- User-friendly error messages
- Internal errors don't leak to users

**Impact:** High - Improves debugging, monitoring, and user experience

**Depends On:** Phase 1.1 (response format standardization)

---

#### 2.2 Request Validation Library
**Status:** Not Started
**Priority:** 🟡 Medium

**When to Implement:** After 3+ endpoints need similar complex validation

**Tasks:**
- [ ] Evaluate Zod vs. express-validator
- [ ] Create validation middleware
- [ ] Define schemas for existing endpoints
- [ ] Migrate endpoints to use schemas
- [ ] Add schema-based API documentation generation

**Success Criteria:**
- Validation schemas co-located with routes
- Type inference from schemas to handlers
- Consistent validation error responses
- Reduced controller boilerplate

**Impact:** High - Reduces bugs, improves type safety, better API docs

**Depends On:** Phase 1.3 (validation standardization)

---

#### 2.3 Structured Logging
**Status:** Not Started
**Priority:** 🟡 Medium

**Tasks:**
- [ ] Decide: Winston vs. simple wrapper
- [ ] Implement logger utility
- [ ] Add log levels (debug, info, warn, error)
- [ ] Migrate console.log calls incrementally
- [ ] Add request logging middleware
- [ ] Configure log shipping for production

**Success Criteria:**
- Structured JSON logs
- Configurable log levels
- Consistent log format
- Query-able in production

**Impact:** Medium - Improves debugging and monitoring

---

#### 2.4 Rate Limiting
**Status:** Not Started
**Priority:** 🟠 High

**Tasks:**
- [ ] Add express-rate-limit dependency
- [ ] Configure general API rate limiter
- [ ] Configure strict auth endpoint limiter
- [ ] Apply to all routes
- [ ] Add rate limit headers
- [ ] Document rate limits in API docs

**Success Criteria:**
- All public endpoints rate-limited
- Auth endpoints have stricter limits
- Clear error messages when rate-limited

**Impact:** High - Prevents abuse, improves security

---

### Phase 3: Service Layer & Architecture
**Goal:** Improve separation of concerns and testability
**Duration:** 4-8 weeks (incremental)

#### 3.1 Service Layer Extraction
**Status:** Partially Complete (some services exist)
**Priority:** 🟡 Medium

**When to Extract:**
- Business logic > 50 lines
- Logic reused across controllers
- Complex external API interactions
- Need for isolated testing

**Tasks:**
- [ ] Identify complex controllers that need services
- [ ] Create service layer for quiz logic
- [ ] Create service layer for analytics
- [ ] Create service layer for session management
- [ ] Update controllers to use services
- [ ] Add service layer tests

**Success Criteria:**
- Controllers are thin (< 30 lines)
- Business logic testable without HTTP mocking
- Clear separation of concerns

**Impact:** Medium - Improves testability and maintainability

---

#### 3.2 Data Access Layer
**Status:** Not Started
**Priority:** 🔵 Low

**When to Implement:** When query duplication becomes painful

**Tasks:**
- [ ] Create repository pattern for core entities
- [ ] Abstract query building
- [ ] Implement query builder utility
- [ ] Migrate services to use repositories
- [ ] Add data layer tests

**Success Criteria:**
- Database queries isolated in data layer
- Services don't write SQL directly
- Queries are reusable and testable

**Impact:** Low (current) → High (at scale)

---

### Phase 4: Developer Experience
**Goal:** Make development faster and more reliable
**Duration:** 2-4 weeks

#### 4.1 API Documentation
**Status:** Not Started
**Priority:** 🟡 Medium

**Tasks:**
- [ ] Set up Swagger/OpenAPI
- [ ] Document existing endpoints with JSDoc
- [ ] Generate interactive API documentation
- [ ] Add request/response examples
- [ ] Set up auto-update on deploy

**Success Criteria:**
- All endpoints documented
- Interactive API explorer available
- Synced with actual implementation

**Impact:** Medium - Improves frontend development and onboarding

**Depends On:** Phase 2.2 (validation schemas can generate docs)

---

#### 4.2 Testing Infrastructure
**Status:** Minimal
**Priority:** 🟡 Medium

**Tasks:**
- [ ] Set up Jest for backend tests
- [ ] Set up React Testing Library for frontend
- [ ] Create test utilities and factories
- [ ] Add tests for critical flows
- [ ] Set up coverage reporting
- [ ] Add tests to CI/CD

**Success Criteria:**
- 60%+ coverage on services
- Critical user flows have integration tests
- Tests run in < 30 seconds

**Impact:** High - Prevents regressions, enables confident refactoring

---

#### 4.3 Development Tooling
**Status:** Partially Complete
**Priority:** 🔵 Low

**Tasks:**
- [ ] Improve database seeding (more realistic data)
- [ ] Add development utilities (reset DB, clear cache, etc.)
- [ ] Create debugging guides
- [ ] Add performance profiling tools
- [ ] Document common development workflows

**Success Criteria:**
- New developers productive in < 1 day
- Clear debugging processes
- Fast feedback loops

**Impact:** Low (small team) → High (growing team)

---

### Phase 5: Performance & Scale
**Goal:** Optimize for performance and prepare for scale
**Duration:** Ongoing
**When:** After core features are stable

#### 5.1 Caching Strategy
**Status:** Not Started
**Priority:** 🔵 Low (until needed)

**When to Implement:** When measurable performance issues exist

**Tasks:**
- [ ] Identify expensive queries
- [ ] Implement in-memory cache for frequent reads
- [ ] Add cache invalidation logic
- [ ] Consider Redis for distributed cache
- [ ] Add cache hit rate monitoring

**Success Criteria:**
- Response times < 100ms for cached endpoints
- Cache hit rate > 80% for cacheable data
- Correct cache invalidation

**Impact:** High (when needed) - Dramatically improves performance

---

#### 5.2 Database Optimization
**Status:** Basic indexes exist
**Priority:** 🔵 Low (until needed)

**Tasks:**
- [ ] Analyze slow queries
- [ ] Add missing indexes
- [ ] Optimize complex queries (reduce joins)
- [ ] Consider denormalization for analytics
- [ ] Set up query performance monitoring

**Success Criteria:**
- All queries < 100ms
- No N+1 query problems
- Efficient use of indexes

**Impact:** High (at scale) - Maintains performance as data grows

---

#### 5.3 Real-Time Features
**Status:** Not Started
**Priority:** 🔵 Low (feature-dependent)

**When to Implement:** When specific feature requires it (notifications, live updates)

**Tasks:**
- [ ] Evaluate WebSocket vs. SSE
- [ ] Implement real-time infrastructure
- [ ] Add live notifications
- [ ] Add real-time quiz feedback (if needed)
- [ ] Handle connection failures gracefully

**Success Criteria:**
- Sub-second update delivery
- Graceful degradation if real-time unavailable
- Scales to hundreds of concurrent connections

**Impact:** Medium - Improves user experience for specific features

---

### Phase 6: Advanced Features
**Goal:** Enhance platform capabilities
**Duration:** Ongoing
**When:** After core platform is stable and scalable

#### 6.1 Advanced Analytics
- User learning patterns
- Skill progression tracking
- Predictive difficulty adjustment
- Teacher dashboards

#### 6.2 Content Management
- Question editor UI
- Bulk import/export
- Question versioning
- Content review workflow

#### 6.3 Personalization
- Adaptive learning paths
- Skill-based recommendations
- Difficulty adjustment
- Learning style preferences

---

## Migration Strategy

### Incremental Improvement Approach

**Philosophy:** Improve continuously without stopping feature development

**Process:**
1. **Document Standards** - Define ideal patterns (✅ Done in code-patterns skill)
2. **Fix New Code** - All new code follows standards
3. **Fix on Touch** - Update files when you need to change them
4. **Dedicated Refactor** - Batch fixes when debt accumulates

**Priority Rules:**
- Security issues: Fix immediately
- User-facing bugs: Fix immediately
- Inconsistencies: Fix when touching the file
- Technical debt: Fix when it blocks features

---

## Decision Framework

### Should We Build This Now?

Ask these questions:
1. **User Value** - Does this directly improve user experience?
2. **Blocking** - Does technical debt block this feature?
3. **Foundation** - Is this needed for future features?
4. **Cost** - Implementation time vs. value delivered?

**Priority Matrix:**
```
High User Value + Low Effort = Do Now (Quick Wins)
High User Value + High Effort = Plan & Execute (Strategic)
Low User Value + Low Effort = Do When Convenient (Maintenance)
Low User Value + High Effort = Don't Do Yet (Future)
```

---

## Phase Priority Summary

### Do Now (0-4 weeks)
1. 🔴 Response format standardization (Phase 1.1)
2. 🟠 Authentication pattern consistency (Phase 1.2)
3. 🟠 Input validation standardization (Phase 1.3)
4. 🟠 Rate limiting (Phase 2.4)

### Do Next (1-3 months)
5. 🟠 Error handling infrastructure (Phase 2.1)
6. 🟡 Type safety improvements (Phase 1.4)
7. 🟡 Structured logging (Phase 2.3)
8. 🟡 Request validation library (Phase 2.2)
9. 🟡 API documentation (Phase 4.1)

### Do Later (3-6 months)
10. 🟡 Service layer extraction (Phase 3.1)
11. 🟡 Testing infrastructure (Phase 4.2)
12. 🔵 Development tooling (Phase 4.3)

### Do When Needed
13. 🔵 Data access layer (Phase 3.2) - When query duplication is painful
14. 🔵 Caching strategy (Phase 5.1) - When performance issues arise
15. 🔵 Database optimization (Phase 5.2) - When queries slow down
16. 🔵 Real-time features (Phase 5.3) - When specific features require it

---

## Tracking Progress

### Metrics to Watch

**Code Quality:**
- Number of `any` types (target: < 20)
- Inconsistent error responses (target: 0)
- Test coverage (target: 60%+)
- TypeScript errors (target: 0)

**Performance:**
- API response time p95 (target: < 500ms)
- Database query time (target: < 100ms)
- Frontend time to interactive (target: < 3s)

**Developer Experience:**
- Time to onboard new developer (target: < 1 day)
- Test run time (target: < 30s)
- Time to deploy (target: < 10 min)

---

## Updating This Roadmap

**Review triggers:**
- Completing a major phase
- Discovering new architectural issues
- Adding major new features
- Team feedback or pain points
- Every quarter (minimum)

**Update process:**
1. Assess current state
2. Evaluate priorities
3. Add/remove/reorder tasks
4. Update timelines
5. Communicate changes

---

## Remember

- **Vision** = Where we want to be (vision.md)
- **Roadmap** = How we get there (this document)
- **Patterns** = Standards we follow today (code-patterns/SKILL.md)
- **Gaps** = Known improvements needed (gaps-and-opportunities.md)

Use them together to make informed architectural decisions.

**Last Updated:** 2025-11-10
**Next Review:** When Phase 1 is substantially complete
