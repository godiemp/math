# Quick Pattern Reference Guide

> Quick reference for common coding patterns in SimplePAES

## Error Responses

```typescript
// ❌ OLD WAY
res.status(404).json({ error: 'Not found' });

// ✅ NEW WAY
import { error, success } from '../types/result';

res.status(404).json(error('Not found', 'RESOURCE_NOT_FOUND'));
res.status(200).json(success(data));
```

## Validation

```typescript
// ❌ OLD WAY
if (!name || !email) {
  return res.status(400).json({ error: 'Missing fields' });
}

// ✅ NEW WAY
import { z } from 'zod';
import { validate } from '../middleware/validate';

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

// In route
router.post('/endpoint', validate(schema), controller);
```

## Authentication

```typescript
// ❌ OLD WAY
const userId = (req as any).user?.userId;

// ✅ NEW WAY
// types/express.d.ts already extends Request
const userId = req.user?.userId; // Fully typed!
```

## Database Queries

```typescript
// ❌ OLD WAY (in controller)
const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

// ✅ NEW WAY (use repository)
const user = await userRepository.findById(userId);
```

## Service Pattern

```typescript
// ✅ CORRECT STRUCTURE
export class SessionService {
  constructor(
    private sessionRepo: SessionRepository,
    private userRepo: UserRepository
  ) {}

  async createSession(dto: CreateSessionDto, userId: string): Promise<Session> {
    // 1. Validate business rules
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');

    // 2. Perform operation
    const session = await this.sessionRepo.create(dto);

    // 3. Emit events (if using event-driven)
    this.events.emit({ type: 'session.created', data: { sessionId: session.id } });

    return session;
  }
}
```

## Controller Pattern

```typescript
// ✅ CORRECT STRUCTURE
import { Request, Response } from 'express';
import { success, error } from '../types/result';

export const getResource = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Check auth
    if (!req.user?.userId) {
      return res.status(401).json(error('Unauthorized', 'AUTH_REQUIRED'));
    }

    // 2. Extract & validate params (Zod validates body automatically)
    const { id } = req.params;

    // 3. Call service
    const resource = await resourceService.getById(id, req.user.userId);

    // 4. Return success
    return res.status(200).json(success(resource));
  } catch (err) {
    // 5. Handle errors
    logger.error({ err }, 'Failed to get resource');
    return res.status(500).json(error('Failed to get resource', 'INTERNAL_ERROR'));
  }
};
```

## Logging

```typescript
// ❌ OLD WAY
console.log('Creating session...');
console.error('Error:', error);

// ✅ NEW WAY
import { createLogger } from '../config/logger';

const log = createLogger('SessionService');

log.info({ sessionId, userId }, 'Creating session');
log.error({ err: error, context: { sessionId } }, 'Failed to create session');
```

## Type Safety

```typescript
// ❌ AVOID
const params: any[] = [userId, name];
const data: any = result.rows[0];

// ✅ USE PROPER TYPES
const params: (string | number)[] = [userId, name];

interface UserRow {
  id: string;
  username: string;
  email: string;
}

const result = await pool.query<UserRow>('SELECT * FROM users WHERE id = $1', [userId]);
const user: UserRow = result.rows[0];
```

## Async/Await

```typescript
// ❌ AVOID
service.getData()
  .then(data => res.json(data))
  .catch(err => res.status(500).json({ error: err }));

// ✅ USE ASYNC/AWAIT
try {
  const data = await service.getData();
  return res.json(success(data));
} catch (err) {
  return res.status(500).json(error('Operation failed'));
}
```

## Parallel Operations

```typescript
// ✅ CORRECT
const [users, sessions, attempts] = await Promise.all([
  userRepo.findAll(),
  sessionRepo.findAll(),
  attemptRepo.count(),
]);
```

## Frontend API Calls

```typescript
// ✅ USE CENTRALIZED CLIENT
import { apiClient } from '@/lib/api-client';

const fetchData = async () => {
  try {
    const response = await apiClient.get('/api/v1/sessions');
    if (response.success) {
      setData(response.data);
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    console.error('Failed to fetch:', error);
    toast.error('An unexpected error occurred');
  }
};
```

## SWR Hooks

```typescript
// ✅ STANDARDIZED PATTERN
import useSWR from 'swr';

export function useSessions() {
  const { data, error, mutate } = useSWR('/api/v1/sessions', async (url) => {
    const response = await apiClient.get(url);
    return response.success ? response.data : [];
  });

  return {
    sessions: data,
    isLoading: !error && !data,
    isError: error,
    refresh: mutate,
  };
}
```

---

## Common Mistakes to Avoid

1. ❌ **Inconsistent error formats** - Always use `{ success, error/data }` pattern
2. ❌ **Type casting with `any`** - Use proper type definitions
3. ❌ **Manual validation** - Use Zod schemas
4. ❌ **DB queries in controllers** - Use repository pattern
5. ❌ **Missing error logging** - Always log errors with context
6. ❌ **Mixing languages** - Keep error messages in one language
7. ❌ **Promise chains** - Use async/await
8. ❌ **Hardcoded dependencies** - Use dependency injection

---

## Code Review Checklist

- [ ] Uses `{ success, data/error }` response format
- [ ] Proper TypeScript types (no `any`)
- [ ] Zod validation for inputs
- [ ] Repository pattern for data access
- [ ] Service layer for business logic
- [ ] Structured logging with context
- [ ] Error handling with try-catch
- [ ] Async/await (not promise chains)
- [ ] Authentication checked first
- [ ] Consistent language in messages

---

See [SOFTWARE_PATTERNS_RECOMMENDATIONS.md](./SOFTWARE_PATTERNS_RECOMMENDATIONS.md) for detailed patterns and implementation guide.
