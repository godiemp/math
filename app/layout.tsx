import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SWRProvider } from "@/lib/swr-config";
import { Toaster } from "sonner";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "SimplePAES - Preparación Matemática",
  description: "Plataforma de preparación para la Prueba de Acceso a la Educación Superior (PAES) de Chile - Competencia Matemática",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <SWRProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SWRProvider>
        <Toaster position="top-right" richColors />
        <CookieConsent />
      </body>
    </html>
  );
}
