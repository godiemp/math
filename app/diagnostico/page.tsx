'use client';

import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DiagnosticCard } from '@/components/diagnostic';
import { Navbar, Heading, Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function DiagnosticoContent() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000]">
      <Navbar className="min-h-14">
        <div className="flex items-center gap-4 py-0 h-10">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </Link>
          <Heading level={1} size="xs" className="text-[#0A84FF]">
            Diagnóstico de Conocimiento
          </Heading>
        </div>
      </Navbar>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <DiagnosticCard />
      </main>
    </div>
  );
}

export default function DiagnosticoPage() {
  return (
    <ProtectedRoute>
      <DiagnosticoContent />
    </ProtectedRoute>
  );
}
