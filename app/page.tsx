'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Auth from "@/components/Auth";

export default function Home() {
  const { isAuthenticated, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            PAES Chile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Plataforma de Preparación Matemática
          </p>
        </div>
        <Auth
          onSuccess={() => {
            setUser(require('@/lib/auth').getCurrentUser());
            router.push('/dashboard');
          }}
        />
      </div>
    </div>
  );
}
