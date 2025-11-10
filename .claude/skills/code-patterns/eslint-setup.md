# ESLint Setup for Code Pattern Enforcement

This guide explains how to set up ESLint to automatically enforce the code patterns defined in this skill.

## Installation

### 1. Install ESLint and TypeScript Support

```bash
cd backend
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 2. Install Additional Plugins (Optional but Recommended)

```bash
npm install --save-dev eslint-plugin-import eslint-plugin-promise
```

## Configuration

### ESLint Configuration File

A sample `.eslintrc.json` has been provided in this directory. Copy it to your backend root:

```bash
cp .claude/skills/code-patterns/.eslintrc.json backend/.eslintrc.json
```

Or create `backend/.eslintrc.json` manually with the following content:

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
    "no-console": "off",
    "prefer-const": "error",
    "no-var": "error"
  },
  "env": {
    "node": true,
    "es2022": true
  },
  "ignorePatterns": ["dist", "node_modules", "*.js"]
}
```

## NPM Scripts

Add these scripts to your `backend/package.json`:

```json
{
  "scripts": {
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix"
  }
}
```

## Usage

### Run Linter

```bash
# Check for issues
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

### IDE Integration

#### VS Code

1. Install the ESLint extension
2. Add to `.vscode/settings.json`:

```json
{
  "eslint.validate": ["typescript"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Rules Explained

### Critical Rules (Enforce Code Patterns)

#### 1. `@typescript-eslint/no-explicit-any`: "error"

**Why:** Enforces TypeScript type safety (Pattern #4 from SKILL.md)

**Catches:**
```typescript
// ❌ Will error
const data: any = result.rows[0];
const params: any[] = [];

// ✅ Will pass
const data: UserRow = result.rows[0];
const params: (string | number)[] = [];
```

#### 2. `@typescript-eslint/explicit-function-return-type`: "warn"

**Why:** Encourages explicit return types for better type safety

**Catches:**
```typescript
// ⚠️ Will warn
export const getUser = async (id: string) => {
  return await getUserById(id);
}

// ✅ Will pass
export const getUser = async (id: string): Promise<User> => {
  return await getUserById(id);
}
```

#### 3. `@typescript-eslint/no-unused-vars`: "error"

**Why:** Catches unused variables and imports

**Allows:** Variables/params starting with `_` (useful for required but unused params)

```typescript
// ❌ Will error
const unusedVar = 'test';

// ✅ Will pass
const _unusedVar = 'test'; // Intentionally unused
```

#### 4. `prefer-const`: "error"

**Why:** Enforces immutability when possible

```typescript
// ❌ Will error
let name = 'John';
console.log(name); // Never reassigned

// ✅ Will pass
const name = 'John';
console.log(name);
```

#### 5. `no-var`: "error"

**Why:** Enforces modern JavaScript (let/const over var)

```typescript
// ❌ Will error
var count = 0;

// ✅ Will pass
let count = 0;
const MAX = 100;
```

## Custom Rules for Future Consideration

Once ESLint is set up, consider adding these custom rules:

### Response Format Enforcement (Future)

Would require a custom ESLint plugin to enforce:
- All `res.json()` calls use `success` field
- All error responses use `{ success: false, error: string }`

### Import Order (Plugin: eslint-plugin-import)

```json
{
  "rules": {
    "import/order": [
      "warn",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc"
        }
      }
    ]
  }
}
```

Enforces:
```typescript
// External imports
import express from 'express';
import { pool } from 'pg';

// Internal imports
import { AuthRequest } from '../types';
import { authenticate } from '../middleware/auth';
```

## Pre-commit Hooks (Optional)

Install `husky` and `lint-staged` to run linting before commits:

```bash
npm install --save-dev husky lint-staged
npx husky init
```

Add to `package.json`:
```json
{
  "lint-staged": {
    "*.ts": ["eslint --fix", "git add"]
  }
}
```

Create `.husky/pre-commit`:
```bash
#!/bin/sh
npx lint-staged
```

## Migration Strategy

### Phase 1: Warning Mode
1. Install ESLint with all rules as "warn"
2. Fix issues gradually
3. Don't block development

### Phase 2: Error Mode
1. Change critical rules to "error"
2. Fix remaining issues
3. Enforce in CI/CD

### Phase 3: Strict Mode
1. Enable all recommended rules
2. Add custom rules
3. Add pre-commit hooks

## Ignoring Files

Create `backend/.eslintignore`:

```
dist
node_modules
coverage
*.js
*.config.js
scripts/*.js
```

## CI/CD Integration

Add to your CI pipeline (e.g., GitHub Actions):

```yaml
- name: Run ESLint
  run: |
    cd backend
    npm run lint
```

## Common Issues & Solutions

### Issue: "Parsing error: Cannot find module 'typescript'"

**Solution:** Install TypeScript as dev dependency
```bash
npm install --save-dev typescript
```

### Issue: "Rule '@typescript-eslint/no-explicit-any' requires type information"

**Solution:** Ensure `parserOptions.project` points to your `tsconfig.json`

### Issue: Too many errors after initial setup

**Solution:**
1. Start with warnings only
2. Fix files incrementally
3. Use `--fix` for auto-fixable issues
4. Use `// eslint-disable-next-line` for intentional exceptions

## Disabling Rules (When Necessary)

### For a single line:
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = legacyFunction();
```

### For an entire file:
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
// Legacy code file
```

### For a block:
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
const data: any = something;
/* eslint-enable @typescript-eslint/no-explicit-any */
```

**Note:** Use sparingly! If you're frequently disabling rules, consider if the rule is appropriate or if the code needs refactoring.

## Next Steps

1. Install ESLint dependencies
2. Copy/create `.eslintrc.json`
3. Run `npm run lint` to see current issues
4. Fix auto-fixable issues with `npm run lint:fix`
5. Fix remaining issues manually
6. Add ESLint to CI/CD pipeline
7. Configure IDE integration

## Resources

- ESLint Documentation: https://eslint.org/docs/latest/
- TypeScript ESLint: https://typescript-eslint.io/
- ESLint Rules: https://eslint.org/docs/latest/rules/
