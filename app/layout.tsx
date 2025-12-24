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
    default: `${SITE_NAME} - Matemáticas Enseñanza Media + PAES Chile`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Domina matemáticas de enseñanza media con +900 ejercicios, mini-lecciones y Tutor AI 24/7. De 1° a 4° medio. Prepárate para la PAES con feedback personalizado.",
  keywords: [
    "matemáticas enseñanza media",
    "matemáticas 1 medio",
    "matemáticas 2 medio",
    "matemáticas 3 medio",
    "matemáticas 4 medio",
    "ejercicios matemáticas enseñanza media",
    "aprender matemáticas Chile",
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
    "prueba de acceso educación superior",
    "admisión universitaria Chile",
    "temario PAES matemática",
    "puntaje PAES",
    "matemáticas Chile",
    "PSU matemática",
    "ensayo PAES online",
    "ejercicios matemática Chile",
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
    title: `${SITE_NAME} - Matemáticas Enseñanza Media y PAES Chile`,
    description:
      "Domina matemáticas de 1° a 4° medio con +900 ejercicios y Tutor AI 24/7. Preparación PAES incluida.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@simplepaes",
    creator: "@simplepaes",
    title: `${SITE_NAME} - Matemáticas Enseñanza Media y PAES Chile`,
    description:
      "Domina matemáticas de 1° a 4° medio con +900 ejercicios y Tutor AI 24/7. Preparación PAES incluida.",
  },
  verification: {
    google: "qUpZQBRnFZsJlAUvhjXsEIqyvGOpKlJUq-nQNONxrXc",
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
        <link rel="manifest" href="/manifest.json" />
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
