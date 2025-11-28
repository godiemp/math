/**
 * NextAuth.js Configuration
 *
 * Uses Credentials provider to authenticate against the existing backend API.
 * The backend handles all auth logic (password hashing, token generation),
 * while NextAuth manages the frontend session and cookies.
 */
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { cookies } from "next/headers"
import type { User as BackendUser } from "@/lib/types"

// Get backend URL - same logic as api-client.ts
function getBackendUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (process.env.NEXT_PUBLIC_RAILWAY_URL) {
    return process.env.NEXT_PUBLIC_RAILWAY_URL;
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001';
  }
  return 'https://paes-math-backend-production.up.railway.app';
}

// Custom types for our app (used internally, not extending next-auth types)
interface CustomUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: "student" | "admin";
  subscription?: {
    status: "trial" | "active" | "expired" | "cancelled";
    expiresAt?: number;
    trialEndsAt?: number;
  };
  emailVerified?: boolean;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        usernameOrEmail: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.usernameOrEmail || !credentials?.password) {
          return null;
        }

        const backendUrl = getBackendUrl();

        try {
          // Call backend login endpoint
          const response = await fetch(`${backendUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              usernameOrEmail: credentials.usernameOrEmail,
              password: credentials.password,
            }),
            credentials: 'include',
          });

          if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('Login failed:', error);
            return null;
          }

          // Forward backend authentication cookies to the browser
          // The backend sets HttpOnly cookies (accessToken, refreshToken) that need
          // to be forwarded since this authorize() callback runs server-side
          const setCookieHeaders = response.headers.getSetCookie();
          if (setCookieHeaders.length > 0) {
            const cookieStore = await cookies();
            for (const cookieStr of setCookieHeaders) {
              // Parse cookie string: "name=value; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/"
              const parts = cookieStr.split(';');
              const [name, ...valueParts] = parts[0].split('=');
              const value = valueParts.join('='); // Handle values that contain '='

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const cookieOptions: any = {};
              for (let i = 1; i < parts.length; i++) {
                const [key, val] = parts[i].trim().split('=');
                const keyLower = key.toLowerCase();
                if (keyLower === 'httponly') cookieOptions.httpOnly = true;
                else if (keyLower === 'secure') cookieOptions.secure = true;
                else if (keyLower === 'samesite') cookieOptions.sameSite = val?.toLowerCase() as 'lax' | 'strict' | 'none';
                else if (keyLower === 'max-age') cookieOptions.maxAge = parseInt(val, 10);
                else if (keyLower === 'path') cookieOptions.path = val;
                else if (keyLower === 'domain') cookieOptions.domain = val;
              }

              cookieStore.set(name, value, cookieOptions);
            }
            console.log('[NextAuth] Forwarded backend cookies to browser:', setCookieHeaders.map(c => c.split('=')[0]));
          }

          const data = await response.json();

          if (!data.user) {
            return null;
          }

          const user: BackendUser = data.user;

          // Return user object that will be passed to JWT callback
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
            subscription: user.subscription ? {
              status: user.subscription.status,
              expiresAt: user.subscription.expiresAt,
              trialEndsAt: user.subscription.trialEndsAt,
            } : undefined,
            emailVerified: user.emailVerified,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    // Store user data in the JWT token
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as unknown as CustomUser;
        token.id = customUser.id;
        token.username = customUser.username;
        token.email = customUser.email;
        token.displayName = customUser.displayName;
        token.role = customUser.role;
        token.subscription = customUser.subscription;
        token.emailVerified = customUser.emailVerified;
      }
      return token;
    },
    // Expose user data in the session
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customToken = token as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).id = customToken.id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).username = customToken.username;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).displayName = customToken.displayName;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).role = customToken.role;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).subscription = customToken.subscription;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).emailVerified = customToken.emailVerified;
      return session;
    },
  },
  pages: {
    signIn: '/',  // Use home page for sign in
    error: '/',   // Redirect errors to home page
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  trustHost: true,
});
