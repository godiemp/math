---
name: code-patterns
description: Enforce consistent implementation patterns across the codebase. Use when reviewing code, fixing inconsistencies, or implementing new features to ensure they follow established patterns.
---

# Code Patterns & Standards

This skill helps maintain consistency across the codebase by enforcing standardized patterns and identifying code that doesn't follow best practices.

## When to Use This Skill

Invoke this skill when:
- Implementing new features or endpoints
- Reviewing or refactoring existing code
- Encountering inconsistent patterns
- User asks to "standardize" or "make consistent"
- User asks about "best practices" or "how we do X here"

## Critical Patterns (MUST Follow)

### 1. Error Response Format

**STANDARD FORMAT - Use this everywhere:**
```typescript
// Error responses
{
  success: false,
  error: string,        // User-facing message
  message?: string,     // Technical details (optional, for debugging)
  statusCode?: number   // Optional
}

// Success responses
{
  success: true,
  data: T,             // The actual response data
  message?: string     // Optional success message
}
```

**❌ INCONSISTENT PATTERNS TO AVOID:**
```typescript
// Don't use these varying formats:
{ error: 'message' }                           // Missing success field
{ error: 'msg', message: 'other' }             // Confusing dual messages
{ message: 'Error al...', error: 'Unknown' }   // Mixed languages
res.json(data)                                  // No wrapper at all
```

**IMPLEMENTATION:**
```typescript
// In controllers
try {
  const result = await someService();
  return res.status(200).json({
    success: true,
    data: result
  });
} catch (error) {
  console.error('Error in operation:', error);
  return res.status(500).json({
    success: false,
    error: 'User-friendly error message',
    message: error instanceof Error ? error.message : 'Unknown error'
  });
}
```

---

### 2. Authentication Pattern

**STANDARD - Use AuthRequest type:**
```typescript
import { Request, Response } from 'express';

// Define AuthRequest type if not already defined
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

// In controllers
export const myController = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;  // ✅ Type-safe access

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }
  // ... rest of controller
};
```

**❌ AVOID:**
```typescript
// Don't use type casting
const userId = (req as any).user?.userId;  // ❌ Loses type safety
```

**MIDDLEWARE IMPORTS:**
```typescript
// Use the new modular auth system
import { authenticate } from '../auth/middleware/authenticate';
import { requireAdmin } from '../auth/middleware/authorize';

// ❌ Don't use legacy imports
import { authenticate, requireAdmin } from '../middleware/auth';
```

---

### 3. Input Validation

**STANDARD - Manual validation until Zod is implemented:**

```typescript
// At the start of controller functions
export const createResource = async (req: AuthRequest, res: Response) => {
  const { field1, field2, field3 } = req.body;

  // Validate required fields
  if (!field1 || !field2) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: field1, field2'
    });
  }

  // Validate enum values
  if (!['option1', 'option2'].includes(field1)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid field1. Must be option1 or option2'
    });
  }

  // Validate types/ranges
  if (typeof field3 !== 'number' || field3 < 1 || field3 > 100) {
    return res.status(400).json({
      success: false,
      error: 'field3 must be a number between 1 and 100'
    });
  }

  // Continue with logic...
};
```

**FUTURE - When adding Zod:**
```typescript
import { z } from 'zod';

const createResourceSchema = z.object({
  field1: z.enum(['option1', 'option2']),
  field2: z.string().min(1),
  field3: z.number().min(1).max(100)
});

// Use in middleware or at controller start
const validation = createResourceSchema.safeParse(req.body);
if (!validation.success) {
  return res.status(400).json({
    success: false,
    error: 'Validation failed',
    message: validation.error.message
  });
}
```

---

### 4. TypeScript Type Safety

**STANDARD - Avoid 'any', use proper types:**

```typescript
// ❌ AVOID
const params: any[] = [];
const data: any = result.rows[0];
visualData?: { type: string; data: any };

// ✅ USE PROPER TYPES
const params: (string | number | boolean)[] = [];

interface SessionRow {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: Date;
}

const data: SessionRow = result.rows[0];

interface VisualData {
  type: 'graph' | 'geometry' | 'table' | 'diagram';
  data: GraphData | GeometryData | TableData | DiagramData;
}
```

**FOR DATABASE QUERIES:**
```typescript
// Define interfaces for query results
interface QueryResult {
  rows: SessionRow[];
  rowCount: number;
}

const result: QueryResult = await pool.query<SessionRow>(query, params);
```

---

### 5. Async/Await Pattern

**STANDARD - Always use async/await:**

```typescript
// ✅ CORRECT
export const myController = async (req: AuthRequest, res: Response) => {
  try {
    const result = await service.doSomething();
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Operation failed'
    });
  }
};

// ❌ AVOID .then() chains
service.doSomething()
  .then(result => res.json(result))
  .catch(error => res.status(500).json({ error }));
```

**FOR PARALLEL OPERATIONS:**
```typescript
// ✅ Use Promise.all for parallel queries
const [users, attempts, sessions] = await Promise.all([
  pool.query('SELECT COUNT(*) FROM users'),
  pool.query('SELECT COUNT(*) FROM attempts'),
  pool.query('SELECT COUNT(*) FROM sessions')
]);
```

---

## Important Patterns (Highly Recommended)

### 6. Logging Standards

**CURRENT MIXED STATE:**
- Some files use emoji-rich logging: `console.log('🔐 Auth successful')`
- Some use simple logging: `console.error('Error:', error)`
- Some have minimal logging

**RECOMMENDATION - Use structured logging:**

```typescript
// For important operations
console.log('[Controller:createResource] Starting operation', {
  userId,
  resourceType,
  timestamp: new Date().toISOString()
});

// For errors - always include context
console.error('[Controller:createResource] Operation failed', {
  error: error instanceof Error ? error.message : 'Unknown',
  userId,
  stack: error instanceof Error ? error.stack : undefined
});

// For debugging (can be removed in production)
console.debug('[Service:processData] Processing', { dataSize, filters });
```

**AVOID:**
- Excessive emoji logging in production code (fine for scripts/seeds)
- Logging sensitive data (passwords, tokens)
- Empty catch blocks without logging

---

### 7. Controller Structure

**STANDARD PATTERN:**

```typescript
import { Response } from 'express';
import { AuthRequest } from '../types';  // Or define locally
import { serviceFunction } from '../services/myService';

/**
 * Controller description
 * @route POST /api/resource
 * @access Private
 */
export const createResource = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // 1. Extract and validate authentication
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return;
    }

    // 2. Extract request data
    const { field1, field2 } = req.body;
    const { queryParam } = req.query;

    // 3. Validate inputs
    if (!field1 || !field2) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: field1, field2'
      });
      return;
    }

    // 4. Call service layer (business logic)
    const result = await serviceFunction({
      field1,
      field2,
      userId
    });

    // 5. Return success response
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('[createResource] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create resource',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
```

**KEY PRINCIPLES:**
- Controllers handle HTTP concerns (request/response)
- Services handle business logic
- Always use try-catch
- Log errors with context
- Return consistent response format
- Validate inputs early
- Check authentication first

---

### 8. Service Layer Pattern

**WHEN TO CREATE A SERVICE:**
- Business logic is complex
- Logic is reused across multiple controllers
- External API calls
- Complex database operations
- Data transformations

**STRUCTURE:**
```typescript
// services/myService.ts
import { pool } from '../config/database';

interface CreateResourceInput {
  field1: string;
  field2: string;
  userId: string;
}

interface ResourceResult {
  id: string;
  field1: string;
  field2: string;
  createdAt: Date;
}

/**
 * Creates a new resource
 */
export async function createResource(
  input: CreateResourceInput
): Promise<ResourceResult> {
  const { field1, field2, userId } = input;

  // Business logic here
  const query = `
    INSERT INTO resources (field1, field2, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await pool.query<ResourceResult>(
    query,
    [field1, field2, userId]
  );

  return result.rows[0];
}

/**
 * Helper function for data transformation
 */
function transformData(raw: any): ResourceResult {
  return {
    id: raw.id,
    field1: raw.field1,
    field2: raw.field2,
    createdAt: new Date(raw.created_at)
  };
}
```

---

### 9. Database Query Building

**FOR DYNAMIC QUERIES:**

```typescript
// ✅ RECOMMENDED PATTERN
let query = 'SELECT * FROM resources WHERE 1=1';
const params: (string | number)[] = [];
let paramCount = 1;

if (userId) {
  query += ` AND user_id = $${paramCount}`;
  params.push(userId);
  paramCount++;
}

if (status) {
  query += ` AND status = $${paramCount}`;
  params.push(status);
  paramCount++;
}

if (search) {
  query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
  params.push(`%${search}%`);
  paramCount++;
}

query += ' ORDER BY created_at DESC';

const result = await pool.query(query, params);
```

**ALWAYS:**
- Use parameterized queries (prevent SQL injection)
- Type your params array
- Increment paramCount properly
- Add ORDER BY for predictable results

---

### 10. Route Registration Pattern

**IN index.ts:**

```typescript
// 1. Import at top with other routes
import resourceRoutes from './routes/resourceRoutes';

// 2. Register with other app.use calls
app.use('/api/resources', resourceRoutes);

// 3. Keep alphabetical order for easy scanning
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);  // New route
app.use('/api/sessions', sessionRoutes);
```

---

## Frontend Patterns

### 11. API Calls (Frontend Components)

**ALWAYS USE THE CENTRALIZED API CLIENT - NEVER use raw `fetch`:**

```typescript
// ✅ CORRECT - Use api from lib/api-client.ts
import { api } from '@/lib/api-client';

export const MyComponent = () => {
  const [data, setData] = useState<DataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // api.get returns ApiResponse<T> = { data?: T, error?: ApiError }
        const response = await api.get<DataType>('/api/endpoint');

        if (response.error) {
          setError(response.error.error);
        } else if (response.data) {
          setData(response.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // ... render logic
};
```

**POST/PUT/DELETE requests:**
```typescript
// POST with body
const response = await api.post<ResponseType>('/api/endpoint', {
  field1: value1,
  field2: value2,
});

// PUT with body
const response = await api.put<ResponseType>('/api/endpoint/:id', {
  field1: newValue1,
});

// DELETE
const response = await api.delete<ResponseType>('/api/endpoint/:id');
```

**❌ NEVER DO THIS:**
```typescript
// ❌ WRONG - Direct fetch calls
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/endpoint`, {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

// ❌ WRONG - Manual token management
const token = localStorage.getItem('token');
```

**WHY USE THE API CLIENT:**
- ✅ Automatic HttpOnly cookie authentication (secure)
- ✅ Automatic token refresh on 401 errors
- ✅ Consistent error handling with ApiResponse<T> type
- ✅ Backend URL management (dev/staging/production)
- ✅ Built-in retry logic
- ✅ TypeScript type safety

**REAL EXAMPLES FROM CODEBASE:**
- ✅ `components/Streak.tsx` - Uses `api.get<StreakData>`
- ✅ `components/StudyBuddy.tsx` - Uses `api.post<GreetingResponse>`
- ✅ `components/AdaptiveLearning.tsx` - Uses `api.get<RecommendationsData>`

---

### 12. Error Handling (Frontend)

**STANDARD PATTERN:**

```typescript
import { toast } from 'react-hot-toast';

const handleOperation = async () => {
  try {
    const response = await apiClient.post('/endpoint', data);

    if (response.success) {
      toast.success('Operation successful');
      // Update state...
    } else {
      toast.error(response.error || 'Operation failed');
    }
  } catch (error) {
    console.error('Operation error:', error);
    const message = error instanceof Error
      ? error.message
      : 'An unexpected error occurred';
    toast.error(message);
  } finally {
    setLoading(false);
  }
};
```

---

## Migration Priorities

When refactoring existing code, address in this order:

### High Priority (Fix First):
1. **Error Response Format** - Critical for frontend reliability
2. **Success Response Format** - Ensure all endpoints use `{ success, data }`
3. **Authentication Pattern** - Migrate to AuthRequest type
4. **Input Validation** - Add missing validations

### Medium Priority (Fix When Touching Code):
5. **TypeScript 'any'** - Replace with proper types
6. **Logging** - Add structured logging to new/modified code
7. **Auth Imports** - Use new modular auth imports

### Low Priority (Nice to Have):
8. **Form Validation** - Consider React Hook Form + Zod for complex forms
9. **Query Builder** - Consider library for complex dynamic queries

---

## Code Review Checklist

When reviewing or implementing code, check:

**Backend:**
- [ ] Error responses use `{ success: false, error: string }` format
- [ ] Success responses use `{ success: true, data: T }` format
- [ ] Controllers use `AuthRequest` type
- [ ] Auth imports from new modular system
- [ ] All required fields are validated
- [ ] No use of `any` type (use proper types)
- [ ] Uses async/await (not .then chains)
- [ ] Try-catch blocks around all async operations
- [ ] Errors are logged with context
- [ ] Parameterized queries (no SQL injection risk)
- [ ] Service layer for complex business logic

**Frontend:**
- [ ] API calls use `api.get/post/put/delete` from `@/lib/api-client` (NEVER raw fetch)
- [ ] Components handle ApiResponse<T> type correctly (`response.data` and `response.error`)
- [ ] Loading states managed properly
- [ ] Error messages user-friendly
- [ ] No manual token/auth management in components

---

## Examples of Pattern Violations

### Violation: Inconsistent Error Format
```typescript
// ❌ WRONG
res.status(500).json({ error: 'Failed' });

// ✅ CORRECT
res.status(500).json({
  success: false,
  error: 'Failed to process request'
});
```

### Violation: Type Casting
```typescript
// ❌ WRONG
const userId = (req as any).user?.userId;

// ✅ CORRECT
interface AuthRequest extends Request {
  user?: { userId: string };
}
const userId = req.user?.userId;
```

### Violation: Missing Validation
```typescript
// ❌ WRONG
export const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  await createResource(name);  // No validation!
  res.json({ success: true });
};

// ✅ CORRECT
export const create = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Name is required and must be a string'
    });
  }

  const result = await createResource(name);
  res.json({ success: true, data: result });
};
```

---

## Quick Reference

**New Controller Template:**
```typescript
import { Response } from 'express';
import { AuthRequest } from '../types';

export const myController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Auth required' });
    }

    const { field } = req.body;
    if (!field) {
      return res.status(400).json({ success: false, error: 'Missing field' });
    }

    const result = await service(field, userId);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('[myController] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Operation failed',
      message: error instanceof Error ? error.message : 'Unknown'
    });
  }
};
```

Use this skill proactively to catch inconsistencies and maintain code quality!
