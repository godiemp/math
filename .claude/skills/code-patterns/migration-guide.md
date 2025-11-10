# Migration Guide - Standardizing Existing Code

This guide helps migrate existing code to follow standardized patterns.

## Priority 1: Error Response Format

### Files That Need Updates

**High Priority - Different error formats:**
- `/backend/src/controllers/streakController.ts` - Simple error format
- `/backend/src/controllers/adminController.ts` - Mixed formats
- `/backend/src/controllers/userManagementController.ts` - Spanish messages
- `/backend/src/controllers/sessionController.ts` - Missing success field

### Migration Steps

**Before:**
```typescript
// Example from streakController.ts:79
res.status(500).json({ error: 'Internal server error' });

// Example from adminController.ts:108-111
res.status(500).json({
  error: 'Failed to process PDF',
  message: (error as Error).message,
});

// Example from analyticsController.ts:343-346
res.status(500).json({
  success: false,
  error: 'Failed to fetch analytics data',
});
```

**After:**
```typescript
// Standardized format
res.status(500).json({
  success: false,
  error: 'User-friendly error message',
  message: error instanceof Error ? error.message : 'Unknown error'
});
```

---

## Priority 2: Success Response Format

### Files That Need Updates

**Controllers returning raw data:**
- `/backend/src/controllers/authController.ts:50` - `res.json(result)`

### Migration Steps

**Before:**
```typescript
res.json(result);  // Direct data
res.json({ session });  // Partial wrapper
```

**After:**
```typescript
res.json({
  success: true,
  data: result  // or { session }
});
```

---

## Priority 3: Authentication Pattern

### Files Using Legacy Pattern

**Type casting (needs AuthRequest):**
- `/backend/src/controllers/adminController.ts:32`
- `/backend/src/controllers/sessionController.ts` (multiple locations)
- `/backend/src/controllers/streakController.ts`

### Migration Steps

**Step 1: Define AuthRequest type (if not exists)**
```typescript
// In backend/src/types/index.ts or create auth.types.ts
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}
```

**Step 2: Update controller signatures**

**Before:**
```typescript
import { Request, Response } from 'express';

export const myController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;  // ❌
  // ...
};
```

**After:**
```typescript
import { Response } from 'express';
import { AuthRequest } from '../types';

export const myController = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;  // ✅ Type-safe
  // ...
};
```

**Step 3: Update middleware imports**

**Before:**
```typescript
import { authenticate, requireAdmin } from '../middleware/auth';
```

**After:**
```typescript
import { authenticate } from '../auth/middleware/authenticate';
import { requireAdmin } from '../auth/middleware/authorize';
```

---

## Priority 4: TypeScript 'any' Removal

### Common Patterns to Fix

#### Pattern 1: Database Query Results

**Before:**
```typescript
const result = await pool.query(query, params);
const sessions = result.rows.map((row: any) => ({  // ❌
  id: row.id,
  name: row.name,
  // ...
}));
```

**After:**
```typescript
interface SessionRow {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const result = await pool.query<SessionRow>(query, params);
const sessions = result.rows.map((row) => ({  // ✅ Type-safe
  id: row.id,
  name: row.name,
  // ...
}));
```

#### Pattern 2: Query Parameters

**Before:**
```typescript
const params: any[] = [];  // ❌
params.push(userId);
params.push(status);
params.push(searchTerm);
```

**After:**
```typescript
const params: (string | number | boolean)[] = [];  // ✅
params.push(userId);
params.push(status);
params.push(searchTerm);
```

#### Pattern 3: Visual Data Types

**Before:**
```typescript
// In types/index.ts
visualData?: {
  type: 'graph' | 'geometry' | 'table' | 'diagram';
  data: any;  // ❌
};
```

**After:**
```typescript
interface GraphData {
  points: Array<{ x: number; y: number }>;
  lines?: Array<{ start: Point; end: Point }>;
}

interface GeometryData {
  shapes: Array<{
    type: 'circle' | 'rectangle' | 'triangle';
    properties: Record<string, number>;
  }>;
}

interface TableData {
  headers: string[];
  rows: Array<Array<string | number>>;
}

interface DiagramData {
  nodes: Array<{ id: string; label: string }>;
  edges: Array<{ from: string; to: string }>;
}

type VisualDataType = GraphData | GeometryData | TableData | DiagramData;

visualData?: {
  type: 'graph' | 'geometry' | 'table' | 'diagram';
  data: VisualDataType;  // ✅ Properly typed
};
```

---

## Priority 5: Input Validation Standardization

### Files with Inconsistent Validation

- `/backend/src/controllers/quizController.ts` - Multiple if statements
- `/backend/src/controllers/userManagementController.ts` - Mixed languages
- `/backend/src/controllers/sessionController.ts` - Minimal validation

### Migration Steps

**Pattern 1: Consolidate validation checks**

**Before:**
```typescript
if (!field1) {
  return res.status(400).json({ error: 'Field1 required' });
}
if (!field2) {
  return res.status(400).json({ error: 'Field2 required' });
}
if (!field3) {
  return res.status(400).json({ error: 'Field3 required' });
}
```

**After:**
```typescript
// Group required field checks
const requiredFields = { field1, field2, field3 };
const missingFields = Object.entries(requiredFields)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingFields.length > 0) {
  return res.status(400).json({
    success: false,
    error: `Missing required fields: ${missingFields.join(', ')}`
  });
}
```

**Pattern 2: Enum validation**

**Before:**
```typescript
if (level !== 'M1' && level !== 'M2') {
  return res.status(400).json({ error: 'Invalid level' });
}
```

**After:**
```typescript
const VALID_LEVELS = ['M1', 'M2'] as const;
type Level = typeof VALID_LEVELS[number];

if (!VALID_LEVELS.includes(level as Level)) {
  return res.status(400).json({
    success: false,
    error: `Invalid level. Must be one of: ${VALID_LEVELS.join(', ')}`
  });
}
```

---

## Priority 6: Logging Standardization

### Migration Strategy

**Phase 1: Add logging to controllers without it**

```typescript
// Add at start of try block
console.log('[ControllerName:functionName] Operation started', {
  userId,
  importantParam,
});

// Add in catch block
console.error('[ControllerName:functionName] Operation failed', {
  error: error instanceof Error ? error.message : 'Unknown',
  userId,
  context: { /* relevant data */ }
});
```

**Phase 2: Reduce emoji usage in production code**

**Before:**
```typescript
console.log(`🔐 Auth middleware - Authorization header:`, authHeader ? 'present' : 'missing');
console.log(`✅ Auth successful for user:`, payload.userId);
```

**After:**
```typescript
console.log('[Auth:authenticate] Authorization header:', authHeader ? 'present' : 'missing');
console.log('[Auth:authenticate] Auth successful for user:', payload.userId);
```

**Keep emojis in:**
- Seed scripts
- Development utilities
- One-time setup scripts

---

## Step-by-Step Migration Example

### Example: Migrating sessionController.ts

**File:** `/backend/src/controllers/sessionController.ts`

#### Step 1: Update imports
```typescript
// Before
import { Request, Response } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';

// After
import { Response } from 'express';
import { AuthRequest } from '../types';
import { authenticate } from '../auth/middleware/authenticate';
import { requireAdmin } from '../auth/middleware/authorize';
```

#### Step 2: Update function signatures
```typescript
// Before
export const getSessions = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;

// After
export const getSessions = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
```

#### Step 3: Standardize error responses
```typescript
// Before
res.status(500).json({ error: 'Failed to fetch sessions' });

// After
res.status(500).json({
  success: false,
  error: 'Failed to fetch sessions',
  message: error instanceof Error ? error.message : 'Unknown error'
});
```

#### Step 4: Standardize success responses
```typescript
// Before
res.json(sessions);

// After
res.json({
  success: true,
  data: sessions
});
```

#### Step 5: Add proper types
```typescript
// Before
const params: any[] = [];

// After
interface SessionQueryParams {
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

const params: (string | number)[] = [];
```

#### Step 6: Add logging
```typescript
// At start of function
console.log('[SessionController:getSessions] Fetching sessions', {
  userId,
  filters: { status, search }
});

// In catch block
console.error('[SessionController:getSessions] Failed to fetch sessions', {
  error: error instanceof Error ? error.message : 'Unknown',
  userId
});
```

---

## Testing After Migration

After migrating a controller, test:

1. **Success cases:**
   - Response has `{ success: true, data: ... }` format
   - Status code is appropriate (200, 201, etc.)

2. **Error cases:**
   - Response has `{ success: false, error: ... }` format
   - Status code is appropriate (400, 401, 500, etc.)
   - Error messages are user-friendly

3. **Type safety:**
   - No TypeScript errors
   - IntelliSense works properly
   - No `any` types remain

4. **Validation:**
   - Missing required fields return 400
   - Invalid values return 400
   - Error messages are clear

---

## Automated Migration Tools (Future)

Consider creating scripts for:

1. **Response format converter** - Automatically wrap responses
2. **Type annotation adder** - Find and replace `any` types
3. **Import updater** - Update auth middleware imports
4. **Validation generator** - Generate validation code from types

---

## Migration Checklist

For each file being migrated:

- [ ] Update imports (auth middleware)
- [ ] Change Request to AuthRequest
- [ ] Remove type casting `(req as any)`
- [ ] Standardize error responses
- [ ] Standardize success responses
- [ ] Replace `any` types with proper types
- [ ] Add input validation
- [ ] Add structured logging
- [ ] Add JSDoc comments
- [ ] Test all endpoints
- [ ] Update any affected tests

---

## Common Pitfalls

1. **Breaking existing API contracts** - Check frontend expectations
2. **Forgetting to update routes** - Update middleware imports in route files too
3. **Inconsistent validation messages** - Keep error messages consistent
4. **Over-engineering** - Don't create types for simple cases
5. **Removing too much logging** - Keep error logging comprehensive

---

## Getting Help

When migrating complex files:
- Ask "How should I migrate this controller to follow code patterns?"
- Reference this guide and SKILL.md
- Test thoroughly after changes
- Migrate one controller at a time
