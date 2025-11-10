# Architectural Vision - Ideal End State

This document describes the ideal architecture we're working toward. It represents the target state that guides our decisions and priorities.

## Core Philosophy

### Build a Math Learning Platform That:
1. **Empowers Students** - Personalized learning paths, instant feedback, clear progress tracking
2. **Supports Teachers** - Rich analytics, easy content management, minimal overhead
3. **Scales Gracefully** - From 10 to 10,000 users without architectural rewrites
4. **Maintains Quality** - Fast, reliable, secure, accessible
5. **Evolves Continuously** - Easy to extend, refactor, and improve

---

## Ideal System Architecture

### Backend (Express.js + TypeScript)

#### Layered Architecture
```
┌─────────────────────────────────────────┐
│          API Layer (Routes)             │  Route definitions, middleware composition
├─────────────────────────────────────────┤
│       Controller Layer                  │  HTTP concerns, request/response handling
├─────────────────────────────────────────┤
│        Service Layer                    │  Business logic, orchestration
├─────────────────────────────────────────┤
│      Data Access Layer                  │  Database queries, external APIs
├─────────────────────────────────────────┤
│         Database (PostgreSQL)           │  Data persistence
└─────────────────────────────────────────┘
```

**Characteristics:**
- Clear separation of concerns
- Each layer only talks to adjacent layers
- Business logic in services, not controllers
- Database queries abstracted in data access layer

#### Ideal Controller Pattern
```typescript
export const createResource = async (req: AuthRequest, res: Response): Promise<void> => {
  // 1. Authentication check (handled by middleware)
  const userId = req.user!.userId;

  // 2. Input extraction
  const input = createResourceSchema.parse(req.body);

  // 3. Service call (all business logic)
  const result = await resourceService.create(input, userId);

  // 4. Response
  res.status(201).json({ success: true, data: result });
};
```

**Why:**
- Controllers are thin (< 20 lines)
- Testable without HTTP mocking
- Business logic is reusable
- Type-safe end-to-end

#### Ideal Service Pattern
```typescript
export class ResourceService {
  constructor(
    private db: DatabaseClient,
    private cache: CacheClient,
    private logger: Logger
  ) {}

  async create(input: CreateResourceInput, userId: string): Promise<Resource> {
    // Validate business rules
    await this.validateBusinessRules(input);

    // Perform operation
    const resource = await this.db.resources.create({
      ...input,
      userId,
      createdAt: new Date()
    });

    // Side effects
    await this.notificationService.notifyResourceCreated(resource);
    await this.cache.invalidate(`user:${userId}:resources`);

    this.logger.info('Resource created', { resourceId: resource.id, userId });

    return resource;
  }

  private async validateBusinessRules(input: CreateResourceInput): Promise<void> {
    // Business validation logic
  }
}
```

**Why:**
- Dependency injection for testability
- Clear error boundaries
- Handles side effects
- Encapsulates business logic

---

### Frontend (Next.js + TypeScript + React)

#### Component Architecture
```
┌─────────────────────────────────────────┐
│         App/Page Components             │  Route-level components, data fetching
├─────────────────────────────────────────┤
│        Feature Components               │  Complex features (QuizInterface, SessionManager)
├─────────────────────────────────────────┤
│          UI Components                  │  Reusable components (Button, Card, Modal)
├─────────────────────────────────────────┤
│       Primitive Components              │  Base components (Typography, Layout, Icons)
└─────────────────────────────────────────┘
```

#### Ideal Component Pattern
```typescript
interface ResourceListProps {
  userId: string;
  filters?: ResourceFilters;
}

export function ResourceList({ userId, filters }: ResourceListProps) {
  // Data fetching with React Query
  const { data, isLoading, error } = useResources(userId, filters);

  // Local state
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Event handlers
  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  // Error state
  if (error) {
    return <ErrorState error={error} retry={refetch} />;
  }

  // Loading state
  if (isLoading) {
    return <Skeleton count={5} />;
  }

  // Main render
  return (
    <div className="resource-list">
      {data.map(resource => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          selected={resource.id === selectedId}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
```

**Why:**
- Type-safe props
- Clear data flow
- Proper loading and error states
- Accessible and maintainable

#### State Management
```
┌──────────────────────────────────────────────┐
│  Server State (React Query)                  │  API data, caching, revalidation
├──────────────────────────────────────────────┤
│  Global State (Context + Zustand)            │  Auth, theme, user preferences
├──────────────────────────────────────────────┤
│  Local State (useState, useReducer)          │  Component-specific state
└──────────────────────────────────────────────┘
```

**Principle:** State lives at the right level
- Server data → React Query
- Global app state → Context or Zustand
- Component state → Local hooks
- Form state → React Hook Form

---

## Ideal Data Flow

### User Creates a Session

```
1. User clicks "Create Session"
   └─> UI validates input (React Hook Form + Zod)

2. Form submits
   └─> API client makes POST /api/sessions

3. Backend Route
   └─> Middleware: authenticate, validate(createSessionSchema)
   └─> Controller: sessionController.createSession

4. Controller
   └─> Extracts data from validated request
   └─> Calls sessionService.create()

5. Service Layer
   └─> Business validation (e.g., user session limit)
   └─> Calls database layer
   └─> Triggers side effects (analytics, notifications)
   └─> Returns created session

6. Controller
   └─> Returns { success: true, data: session }

7. Frontend
   └─> React Query updates cache
   └─> UI shows success toast
   └─> Navigates to new session
```

**Characteristics:**
- Validation at every layer (defense in depth)
- Clear error propagation
- Type-safety end-to-end
- Automatic cache invalidation

---

## Ideal Database Design

### Principles
1. **Normalized for Integrity** - Core data (users, sessions, questions) fully normalized
2. **Denormalized for Speed** - Analytics, reports, caches appropriately denormalized
3. **Typed and Constrained** - Strong types, foreign keys, check constraints
4. **Versioned and Migrated** - All changes through migrations, rollback-safe

### Example: Sessions Table (Ideal)
```sql
CREATE TABLE sessions (
  -- Identity
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Ownership
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Attributes
  name TEXT NOT NULL CHECK (length(name) >= 1 AND length(name) <= 200),
  description TEXT,
  level level_enum NOT NULL, -- Defined enum type
  status session_status NOT NULL DEFAULT 'active',

  -- Computed/Cached (with triggers to maintain)
  total_attempts INTEGER NOT NULL DEFAULT 0,
  correct_attempts INTEGER NOT NULL DEFAULT 0,
  accuracy_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN total_attempts > 0
      THEN (correct_attempts::DECIMAL / total_attempts * 100)
      ELSE 0
    END
  ) STORED,

  -- Metadata
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  archived_at TIMESTAMP,

  -- Constraints
  CONSTRAINT accuracy_valid CHECK (correct_attempts <= total_attempts)
);

-- Indexes for common queries
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_status ON sessions(status) WHERE status = 'active';
CREATE INDEX idx_sessions_created ON sessions(created_at DESC);

-- Trigger to maintain updated_at
CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Why:**
- Data integrity enforced at database level
- Performance optimized with appropriate indexes
- Self-documenting with constraints
- Maintains consistency with triggers

---

## Ideal Error Handling

### Frontend
```typescript
// In component
const { mutate: createSession, isLoading } = useCreateSession({
  onSuccess: (data) => {
    toast.success('Session created successfully');
    router.push(`/sessions/${data.id}`);
  },
  onError: (error) => {
    if (error.statusCode === 400) {
      // Validation error - show field-specific messages
      toast.error(error.error);
    } else if (error.statusCode === 401) {
      // Auth error - redirect to login
      router.push('/login');
    } else {
      // Unknown error - show generic message + report
      toast.error('Something went wrong. Please try again.');
      errorReporter.captureException(error);
    }
  }
});
```

### Backend
```typescript
// Custom error classes
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public fields?: Record<string, string>) {
    super(400, message, 'VALIDATION_ERROR');
  }
}

// Global error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // Log all errors
  logger.error('Request error', {
    error: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    userId: req.user?.userId
  });

  // Send appropriate response
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
      code: error.code
    });
  }

  // Unknown error - don't leak details
  return res.status(500).json({
    success: false,
    error: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR'
  });
});
```

**Why:**
- User-friendly messages
- Detailed logging for debugging
- Security (no leak of internal details)
- Actionable error codes
- Consistent structure

---

## Ideal Testing Strategy

### Backend Tests
```typescript
describe('SessionService', () => {
  describe('create', () => {
    it('creates session with valid input', async () => {
      const input = { name: 'Test', level: 'M1', userId: 'user-1' };
      const session = await sessionService.create(input);

      expect(session).toMatchObject({
        name: 'Test',
        level: 'M1',
        userId: 'user-1'
      });
      expect(session.id).toBeDefined();
    });

    it('throws ValidationError for invalid input', async () => {
      const input = { name: '', level: 'M1', userId: 'user-1' };

      await expect(sessionService.create(input))
        .rejects.toThrow(ValidationError);
    });

    it('enforces business rules (max sessions)', async () => {
      // User already has 10 sessions
      await createMultipleSessions('user-1', 10);

      const input = { name: 'Test', level: 'M1', userId: 'user-1' };

      await expect(sessionService.create(input))
        .rejects.toThrow('Maximum session limit reached');
    });
  });
});
```

### Frontend Tests
```typescript
describe('SessionList', () => {
  it('renders loading state', () => {
    render(<SessionList userId="user-1" />, {
      wrapper: createQueryWrapper()
    });

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders sessions after loading', async () => {
    const sessions = [
      { id: '1', name: 'Session 1', level: 'M1' },
      { id: '2', name: 'Session 2', level: 'M2' }
    ];

    mockApiClient.getSessions.mockResolvedValue({ success: true, data: sessions });

    render(<SessionList userId="user-1" />, {
      wrapper: createQueryWrapper()
    });

    await waitFor(() => {
      expect(screen.getByText('Session 1')).toBeInTheDocument();
      expect(screen.getByText('Session 2')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    mockApiClient.getSessions.mockRejectedValue(new Error('Network error'));

    render(<SessionList userId="user-1" />, {
      wrapper: createQueryWrapper()
    });

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });
  });
});
```

**Coverage Goals:**
- Unit tests: 80%+ for services and utilities
- Integration tests: Critical user flows
- E2E tests: Happy paths for main features

---

## Ideal Performance Characteristics

### Backend
- API response time: p50 < 100ms, p95 < 500ms
- Database queries: < 50ms for simple, < 200ms for complex
- No N+1 queries (use joins or dataloader)
- Efficient pagination for large datasets
- Caching for expensive computations

### Frontend
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Largest Contentful Paint: < 2.5s
- Route transitions: < 200ms
- Smooth 60fps animations
- Images optimized and lazy-loaded

### Database
- Proper indexes on all foreign keys
- Indexes on commonly filtered/sorted columns
- Partitioning for large tables (> 1M rows)
- Regular VACUUM and ANALYZE

---

## Ideal Security Posture

### Authentication & Authorization
- JWT tokens with refresh mechanism
- Secure password hashing (bcrypt, cost factor 12+)
- Role-based access control (RBAC)
- Session management with timeout
- 2FA support (future)

### Data Security
- Input validation on all endpoints (defense in depth)
- Parameterized queries (no SQL injection)
- Output encoding (no XSS)
- CORS properly configured
- Rate limiting on all public endpoints
- File upload scanning

### Infrastructure
- HTTPS only (no plain HTTP)
- Security headers (CSP, HSTS, etc.)
- Dependency scanning
- Secret management (environment variables, not code)
- Regular security audits

---

## Ideal Developer Experience

### Onboarding
- README with clear setup instructions
- One-command setup: `npm run setup`
- Seeded database with test data
- TypeScript IntelliSense works everywhere
- Clear architecture documentation

### Daily Development
- Fast feedback loops:
  - Hot reload: < 2s
  - Tests run: < 30s
  - Type check: < 10s
- Clear error messages
- Consistent patterns (no surprises)
- Good logging for debugging

### Code Quality
- ESLint + Prettier enforced
- Pre-commit hooks (lint, format, test)
- TypeScript strict mode
- No `any` types (or explicitly justified)
- Consistent naming conventions

---

## Ideal Monitoring & Observability

### Application Monitoring
- Error tracking (Sentry, LogRocket)
- Performance monitoring (response times, throughput)
- User analytics (feature usage, conversion funnels)
- Structured logging (query-able, filterable)

### Infrastructure Monitoring
- Server health (CPU, memory, disk)
- Database performance (slow queries, connections)
- API uptime and latency
- Alert on anomalies

### User Monitoring
- Session recordings for debugging
- User feedback collection
- Feature flags for gradual rollouts
- A/B testing capability

---

## Getting to the Vision

This vision represents our **target state**, not necessarily our current state. Use it to:

1. **Guide decisions**: When choosing between options, which moves us closer to this vision?
2. **Prioritize work**: What gaps are most important to address?
3. **Evaluate proposals**: Does this align with our ideal architecture?
4. **Set standards**: New code should match this vision

See **roadmap.md** for the prioritized path from current state to this ideal state.

---

## Vision Evolution

This vision should evolve as we:
- Learn from building the system
- Get user feedback
- Discover new patterns and tools
- Scale to new requirements

Update this document when:
- Architectural decisions change direction
- New ideal patterns emerge
- Technology landscape shifts
- Team consensus evolves

**Last Updated:** 2025-11-10
**Next Review:** When major architectural decision is needed
