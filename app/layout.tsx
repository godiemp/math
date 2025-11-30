import type { Metadata } from "next";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { SWRProvider } from "@/lib/swr-config";
import { Toaster } from "sonner";
import CookieConsent from "@/components/shared/CookieConsent";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { IntercomProvider } from "@/components/providers/IntercomProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "SimplePAES - Preparación Matemática",
  description: "Plataforma de preparación para la Prueba de Acceso a la Educación Superior (PAES) de Chile - Competencia Matemática",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="es-CL" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <NextAuthProvider>
          <NextIntlClientProvider messages={messages}>
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
          </NextIntlClientProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
