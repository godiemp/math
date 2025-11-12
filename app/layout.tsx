import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SWRProvider } from "@/lib/swr-config";
import { Toaster } from "sonner";
import CookieConsent from "@/components/CookieConsent";
import { PostHogProvider } from "@/components/PostHogProvider";
import { IntercomProvider } from "@/components/IntercomProvider";
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
    <html lang="es-CL">
      <body className="antialiased">
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
      </body>
    </html>
  );
}
