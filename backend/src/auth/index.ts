/**
 * ============================================================================
 * AUTH MODULE
 * ============================================================================
 *
 * Centralized authentication module for backend
 *
 * Exports:
 * - Services: Business logic for auth operations
 * - Middleware: Authentication and authorization
 * - Controllers: HTTP request handlers
 * - Routes: Route definitions
 * - Types: Type definitions
 */

// Services
export * from './services/authService';
export * from './services/tokenService';

// Middleware
export * from './middleware';

// Types
export * from './types';

// Controllers
export * from './controllers/authController';

// Routes
export { default as authRoutes } from './routes/authRoutes';
