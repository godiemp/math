import { User } from './types';

const USERS_STORAGE_KEY = 'paes-users';
const CURRENT_USER_KEY = 'paes-current-user';

export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
}

function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function registerUser(username: string, email: string, displayName: string, role: 'student' | 'admin' = 'student'): { success: boolean; error?: string; user?: User } {
  const users = getAllUsers();

  // Check if username already exists
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, error: 'El nombre de usuario ya está en uso' };
  }

  // Check if email already exists
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'El correo electrónico ya está registrado' };
  }

  // Create new user
  const newUser: User = {
    id: generateUserId(),
    username,
    email,
    displayName,
    role,
    createdAt: Date.now(),
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function loginUser(usernameOrEmail: string): { success: boolean; error?: string; user?: User } {
  const users = getAllUsers();

  const user = users.find(u =>
    u.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
    u.email.toLowerCase() === usernameOrEmail.toLowerCase()
  );

  if (!user) {
    return { success: false, error: 'Usuario no encontrado. Por favor, regístrate primero.' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

export function logoutUser(): void {
  setCurrentUser(null);
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user !== null && user.role === 'admin';
}

export function requireAdmin(): User | null {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    return null;
  }
  return user;
}

// Create a default admin user if none exists
export function ensureAdminExists(): void {
  const users = getAllUsers();

  // Check if any admin exists
  const hasAdmin = users.some(u => u.role === 'admin');

  if (!hasAdmin) {
    // Create default admin user
    const adminUser: User = {
      id: generateUserId(),
      username: 'admin',
      email: 'admin@paes.cl',
      displayName: 'Administrador',
      role: 'admin',
      createdAt: Date.now(),
    };

    users.push(adminUser);
    saveUsers(users);
  }
}

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
