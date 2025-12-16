import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { SWRProvider } from "@/lib/swr-config";
import { Toaster } from "sonner";
import CookieConsent from "@/components/shared/CookieConsent";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { IntercomProvider } from "@/components/providers/IntercomProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema, faqSchema } from "@/lib/seo/schemas";
import { SITE_URL, SITE_NAME, BRAND_COLOR } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Preparación PAES Matemática Chile 2025`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Plataforma de preparación para la PAES de Matemática en Chile. Practica con +600 ejercicios del temario oficial, feedback personalizado, y seguimiento de progreso. Prepárate para la Prueba de Acceso a la Educación Superior.",
  keywords: [
    "PAES",
    "PAES matemática",
    "preparación PAES",
    "PAES Chile",
    "PAES 2025",
    "ensayos PAES",
    "ejercicios PAES",
    "competencia matemática M1",
    "competencia matemática M2",
    "preuniversitario online",
    "preparación universidad Chile",
    "práctica PAES online",
    "DEMRE",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Preparación PAES Matemática Chile`,
    description:
      "Prepara la PAES de Matemática con +600 ejercicios del temario oficial, feedback personalizado y seguimiento de progreso.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Preparación PAES Matemática Chile`,
    description:
      "Prepara la PAES de Matemática con +600 ejercicios del temario oficial y feedback personalizado.",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-CL": SITE_URL,
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: BRAND_COLOR,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="es-CL">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={faqSchema} />
      </head>
      <body className="antialiased">
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
      </body>
    </html>
  );
}
