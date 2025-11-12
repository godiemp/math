import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SWRProvider } from "@/lib/swr-config";
import { Toaster } from "sonner";
import CookieConsent from "@/components/CookieConsent";
import { PostHogProvider } from "@/components/PostHogProvider";
import { IntercomProvider } from "@/components/IntercomProvider";

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
        <PostHogProvider>
          <SWRProvider>
            <AuthProvider>
              <IntercomProvider>
                {children}
              </IntercomProvider>
            </AuthProvider>
          </SWRProvider>
          <Toaster position="top-right" richColors />
          <CookieConsent />
        </PostHogProvider>
      </body>
    </html>
  );
}
