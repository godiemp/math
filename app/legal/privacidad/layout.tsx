import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de SimplePAES. Cómo protegemos tus datos personales según la Ley 19.628 de Chile.",
  alternates: {
    canonical: `${SITE_URL}/legal/privacidad`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
