# Testing Patterns & Standards

This guide establishes testing standards for the codebase to ensure reliability, maintainability, and consistent quality.

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Test Structure](#test-structure)
3. [Unit Testing Patterns](#unit-testing-patterns)
4. [Integration Testing Patterns](#integration-testing-patterns)
5. [Database Testing](#database-testing)
6. [API Testing](#api-testing)
7. [Mocking & Stubbing](#mocking--stubbing)
8. [Test Coverage](#test-coverage)
9. [Testing Checklist](#testing-checklist)

---

## Testing Philosophy

### Core Principles

1. **Tests should be fast** - Unit tests < 10ms, Integration tests < 100ms
2. **Tests should be isolated** - No dependencies between tests
3. **Tests should be deterministic** - Same input = same output, always
4. **Tests should be readable** - Clear intent, easy to understand
5. **Tests should be maintainable** - Easy to update when code changes

### What to Test

**DO Test:**
- ✅ Business logic and core functionality
- ✅ Edge cases and error conditions
- ✅ Input validation
- ✅ Authentication and authorization
- ✅ Database operations (with test DB)
- ✅ API endpoints (integration tests)

**DON'T Test:**
- ❌ Third-party libraries (trust they work)
- ❌ Framework internals (trust Express, React, etc.)
- ❌ Simple getters/setters without logic
- ❌ Configuration files

---

## Test Structure

### File Organization

```
backend/
├── src/
│   ├── controllers/
│   │   └── userController.ts
│   ├── services/
│   │   └── userService.ts
│   └── utils/
│       └── validation.ts
└── tests/
    ├── unit/
    │   ├── services/
    │   │   └── userService.test.ts
    │   └── utils/
    │       └── validation.test.ts
    ├── integration/
    │   └── controllers/
    │       └── userController.test.ts
    └── setup/
        ├── testDb.ts
        └── testHelpers.ts
```

### Naming Conventions

**Files:**
- `*.test.ts` for all test files
- Mirror the source file structure
- Place in `tests/unit/` or `tests/integration/`

**Test Suites:**
- `describe('ComponentName', () => { ... })`
- Nested `describe` for methods/functions

**Test Cases:**
- `it('should do something when condition', () => { ... })`
- Or `test('does something when condition', () => { ... })`

---

## Unit Testing Patterns

### Standard Test Structure (AAA Pattern)

```typescript
import { functionToTest } from '../path/to/module';

describe('FunctionName', () => {
  describe('methodName', () => {
    it('should return expected result when given valid input', () => {
      // Arrange - Set up test data and dependencies
      const input = { name: 'John', age: 30 };
      const expected = { id: '1', name: 'John', age: 30 };

      // Act - Execute the function under test
      const result = functionToTest(input);

      // Assert - Verify the result
      expect(result).toEqual(expected);
    });

    it('should throw error when input is invalid', () => {
      // Arrange
      const invalidInput = null;

      // Act & Assert
      expect(() => functionToTest(invalidInput)).toThrow('Invalid input');
    });
  });
});
```

### Testing Pure Functions

```typescript
// utils/calculation.ts
export function calculateDiscount(price: number, percentage: number): number {
  if (price < 0 || percentage < 0 || percentage > 100) {
    throw new Error('Invalid input');
  }
  return price * (percentage / 100);
}

// tests/unit/utils/calculation.test.ts
describe('calculateDiscount', () => {
  it('should calculate correct discount for valid inputs', () => {
    expect(calculateDiscount(100, 10)).toBe(10);
    expect(calculateDiscount(50, 20)).toBe(10);
  });

  it('should handle zero percentage', () => {
    expect(calculateDiscount(100, 0)).toBe(0);
  });

  it('should throw error for negative price', () => {
    expect(() => calculateDiscount(-100, 10)).toThrow('Invalid input');
  });

  it('should throw error for invalid percentage', () => {
    expect(() => calculateDiscount(100, -10)).toThrow('Invalid input');
    expect(() => calculateDiscount(100, 101)).toThrow('Invalid input');
  });
});
```

### Testing Service Functions

```typescript
// services/userService.ts
import { pool } from '../config/database';

export async function getUserById(userId: string) {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  return result.rows[0];
}

// tests/unit/services/userService.test.ts
import { getUserById } from '../../../src/services/userService';
import { pool } from '../../../src/config/database';

// Mock the database
jest.mock('../../../src/config/database', () => ({
  pool: {
    query: jest.fn()
  }
}));

describe('UserService', () => {
  describe('getUserById', () => {
    beforeEach(() => {
      // Clear mock history before each test
      jest.clearAllMocks();
    });

    it('should return user when user exists', async () => {
      // Arrange
      const mockUser = { id: '1', name: 'John', email: 'john@example.com' };
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [mockUser],
        rowCount: 1
      });

      // Act
      const result = await getUserById('1');

      // Assert
      expect(result).toEqual(mockUser);
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE id = $1',
        ['1']
      );
      expect(pool.query).toHaveBeenCalledTimes(1);
    });

    it('should throw error when user does not exist', async () => {
      // Arrange
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [],
        rowCount: 0
      });

      // Act & Assert
      await expect(getUserById('999')).rejects.toThrow('User not found');
    });

    it('should handle database errors', async () => {
      // Arrange
      (pool.query as jest.Mock).mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(getUserById('1')).rejects.toThrow('Database error');
    });
  });
});
```

---

## Integration Testing Patterns

### API Endpoint Testing

```typescript
// tests/integration/controllers/authController.test.ts
import request from 'supertest';
import app from '../../../src/index';
import { pool } from '../../../src/config/database';
import { cleanupTestDb, seedTestUser } from '../../setup/testDb';

describe('Auth API', () => {
  // Setup and teardown
  beforeAll(async () => {
    // Setup test database
    await cleanupTestDb();
  });

  afterAll(async () => {
    // Cleanup
    await cleanupTestDb();
    await pool.end();
  });

  beforeEach(async () => {
    // Reset data before each test
    await cleanupTestDb();
  });

  describe('POST /api/auth/register', () => {
    it('should register new user with valid data', async () => {
      // Arrange
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!'
      };

      // Act
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(201);

      // Assert
      expect(response.body).toMatchObject({
        success: true,
        data: {
          user: {
            username: 'testuser',
            email: 'test@example.com'
          }
        }
      });
      expect(response.body.data.user.password).toBeUndefined(); // Don't return password
      expect(response.body.data.token).toBeDefined();
    });

    it('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ username: 'test', password: 'Pass123!' })
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.stringContaining('email')
      });
    });

    it('should return 409 when email already exists', async () => {
      // Arrange - seed existing user
      await seedTestUser({
        email: 'existing@example.com',
        username: 'existing'
      });

      // Act
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'existing@example.com',
          password: 'Pass123!'
        })
        .expect(409);

      // Assert
      expect(response.body).toMatchObject({
        success: false,
        error: expect.stringContaining('already exists')
      });
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Seed test user before login tests
      await seedTestUser({
        email: 'login@example.com',
        password: 'Password123!'
      });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'Password123!'
        })
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: {
          token: expect.any(String),
          user: {
            email: 'login@example.com'
          }
        }
      });
    });

    it('should return 401 with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'WrongPassword'
        })
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.stringContaining('Invalid')
      });
    });
  });
});
```

### Testing Protected Routes

```typescript
describe('Protected Endpoints', () => {
  let authToken: string;
  let testUserId: string;

  beforeAll(async () => {
    // Create test user and get token
    const user = await seedTestUser({ role: 'student' });
    testUserId = user.id;
    authToken = generateTestToken(user);
  });

  describe('GET /api/sessions', () => {
    it('should return sessions for authenticated user', async () => {
      const response = await request(app)
        .get('/api/sessions')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: expect.any(Array)
      });
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/sessions')
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.stringContaining('Authentication required')
      });
    });

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get('/api/sessions')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
```

---

## Database Testing

### Test Database Setup

```typescript
// tests/setup/testDb.ts
import { pool } from '../../src/config/database';
import bcrypt from 'bcrypt';

/**
 * Cleans up test database - removes all test data
 */
export async function cleanupTestDb(): Promise<void> {
  await pool.query('DELETE FROM quiz_attempts');
  await pool.query('DELETE FROM sessions');
  await pool.query('DELETE FROM users');
}

/**
 * Seeds a test user
 */
export async function seedTestUser(data?: {
  email?: string;
  username?: string;
  password?: string;
  role?: string;
}) {
  const hashedPassword = await bcrypt.hash(
    data?.password || 'TestPassword123!',
    10
  );

  const result = await pool.query(
    `INSERT INTO users (username, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username, email, role`,
    [
      data?.username || 'testuser',
      data?.email || 'test@example.com',
      hashedPassword,
      data?.role || 'student'
    ]
  );

  return result.rows[0];
}

/**
 * Generates test JWT token
 */
export function generateTestToken(user: { id: string; email: string; role: string }): string {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
}
```

### Testing Database Operations

```typescript
describe('Database Operations', () => {
  beforeEach(async () => {
    await cleanupTestDb();
  });

  afterAll(async () => {
    await cleanupTestDb();
    await pool.end();
  });

  it('should create user in database', async () => {
    // Arrange
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password_hash: 'hashed'
    };

    // Act
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [userData.username, userData.email, userData.password_hash]
    );

    // Assert
    expect(result.rows[0]).toMatchObject({
      id: expect.any(String),
      username: 'testuser',
      email: 'test@example.com'
    });

    // Verify in database
    const verifyResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      ['test@example.com']
    );
    expect(verifyResult.rows).toHaveLength(1);
  });
});
```

---

## Mocking & Stubbing

### Mocking External Dependencies

```typescript
// Mocking external API calls
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('External API Integration', () => {
  it('should fetch data from external API', async () => {
    // Arrange
    const mockResponse = { data: { result: 'success' } };
    mockedAxios.get.mockResolvedValue(mockResponse);

    // Act
    const result = await fetchExternalData();

    // Assert
    expect(result).toEqual('success');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.example.com/data');
  });
});
```

### Mocking Database Pool

```typescript
jest.mock('../../../src/config/database', () => ({
  pool: {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
  }
}));
```

### Partial Mocking

```typescript
// Mock only specific functions
jest.mock('../../../src/services/userService', () => ({
  ...jest.requireActual('../../../src/services/userService'),
  sendEmail: jest.fn() // Only mock sendEmail, keep others real
}));
```

---

## Test Coverage

### Coverage Goals

- **Overall**: 80% minimum
- **Critical paths** (auth, payments, data processing): 95% minimum
- **Utilities**: 90% minimum
- **Controllers**: 80% minimum (integration tests)

### Running Coverage

```bash
# Run all tests with coverage
npm test -- --coverage

# Run specific test file
npm test userService.test.ts

# Run tests in watch mode
npm test -- --watch

# Run only integration tests
npm test tests/integration
```

### Coverage Reports

```bash
# Generate HTML coverage report
npm test -- --coverage --coverageReporters=html

# View report
open coverage/index.html
```

---

## Testing Checklist

When writing tests for new features:

### Controller Tests
- [ ] Test successful response (200/201)
- [ ] Test validation errors (400)
- [ ] Test authentication required (401)
- [ ] Test authorization/permission denied (403)
- [ ] Test resource not found (404)
- [ ] Test internal errors (500)
- [ ] Test with valid JWT token
- [ ] Test with invalid/expired token
- [ ] Test with missing token

### Service Tests
- [ ] Test happy path with valid inputs
- [ ] Test with invalid inputs
- [ ] Test edge cases (empty, null, undefined)
- [ ] Test database errors
- [ ] Test business logic errors
- [ ] Verify database queries are called correctly
- [ ] Verify return values match expected types

### Utility Tests
- [ ] Test all valid input combinations
- [ ] Test boundary conditions
- [ ] Test error cases
- [ ] Test type coercion if applicable

### General
- [ ] Tests are isolated (no dependencies)
- [ ] Tests clean up after themselves
- [ ] Tests are deterministic (no randomness)
- [ ] Tests have clear, descriptive names
- [ ] Mocks are properly reset between tests
- [ ] No hardcoded values (use constants/fixtures)

---

## Best Practices

1. **Keep tests simple** - One assertion per test when possible
2. **Use descriptive names** - Test name should describe the scenario
3. **Don't test implementation details** - Test behavior, not internals
4. **Use test fixtures** - Reusable test data
5. **Avoid test interdependence** - Each test should run independently
6. **Mock external dependencies** - Don't call real APIs in tests
7. **Test error cases** - Don't just test happy paths
8. **Keep tests fast** - Slow tests won't be run
9. **Use beforeEach/afterEach** - Clean setup and teardown
10. **Review test coverage** - Ensure critical paths are covered

---

## Common Patterns

### Testing Async Functions

```typescript
it('should handle async operations', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});
```

### Testing Promises

```typescript
it('should reject with error', async () => {
  await expect(promiseFunction()).rejects.toThrow('Error message');
});
```

### Testing Callbacks

```typescript
it('should call callback with result', (done) => {
  callbackFunction((result) => {
    expect(result).toBe('expected');
    done();
  });
});
```

### Snapshot Testing (Use Sparingly)

```typescript
it('should match snapshot', () => {
  const result = generateComplexObject();
  expect(result).toMatchSnapshot();
});
```

---

## Resources

- Jest Documentation: https://jestjs.io/docs/getting-started
- Supertest Documentation: https://github.com/visionmedia/supertest
- Testing Best Practices: https://testingjavascript.com/

---

**Remember:** Good tests are an investment. They save time in debugging, prevent regressions, and serve as living documentation of how your code should behave.
