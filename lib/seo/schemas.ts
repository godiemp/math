import { SITE_URL, SITE_NAME } from "@/lib/constants";

// Organization Schema (site-wide)
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
  },
  description:
    "Plataforma de preparación PAES Matemática con mini-lecciones que explican el por qué y Tutor AI Socrático disponible 24/7.",
  areaServed: {
    "@type": "Country",
    name: "Chile",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
    addressLocality: "Santiago",
    addressRegion: "Región Metropolitana",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+56-9-3133-8020",
    email: "soporte@paes-math.cl",
    availableLanguage: "Spanish",
  },
  foundingDate: "2024",
};

// WebSite Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: "Preparación PAES Matemática Chile - Mini-lecciones + Tutor AI Socrático",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "es-CL",
};

// Course Schema for the product
export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/#course`,
  name: "Preparación PAES Matemática",
  description:
    "Preparación PAES Matemática con mini-lecciones que explican el por qué (no solo el cómo), Tutor AI Socrático 24/7, y más de 900 ejercicios del temario oficial.",
  provider: { "@id": `${SITE_URL}/#organization` },
  educationalLevel: "Educación Media / Preparación Universitaria",
  inLanguage: "es-CL",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT10H/W",
  },
  offers: {
    "@type": "Offer",
    price: "8000",
    priceCurrency: "CLP",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/pricing`,
  },
};

// FAQPage Schema
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es SimplePAES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SimplePAES es una plataforma de preparación para la PAES de Matemática en Chile. Ofrece más de 900 ejercicios, mini-lecciones interactivas que te explican el por qué (no solo el cómo), un Tutor AI Socrático que te guía sin darte las respuestas, y seguimiento de progreso por habilidad.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta SimplePAES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SimplePAES tiene un plan premium de $8.000 CLP mensuales. Puedes probar gratis por 7 días antes de decidir. No hay permanencia mínima y puedes cancelar cuando quieras.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué incluye la suscripción premium?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La suscripción premium incluye acceso a más de 900 ejercicios PAES, mini-lecciones que te explican el por qué, Tutor AI Socrático ilimitado, ensayos en vivo con otros estudiantes, y análisis de 500+ habilidades.",
      },
    },
    {
      "@type": "Question",
      name: "¿SimplePAES sirve para M1 y M2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, SimplePAES cubre tanto Competencia Matemática 1 (M1) como Competencia Matemática 2 (M2). Puedes elegir tu nivel al registrarte y cambiar cuando quieras.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es la PAES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La PAES (Prueba de Acceso a la Educación Superior) es el examen estandarizado de admisión universitaria en Chile, administrado por DEMRE. Reemplazó a la PSU en 2023. La prueba de Matemática evalúa competencias M1 (obligatoria) y M2 (optativa para carreras científicas).",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo pedir reembolso?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, de acuerdo con la Ley del Consumidor de Chile, tienes derecho a retracto dentro de los 10 días corridos siguientes a la contratación con reembolso del 100% del monto pagado.",
      },
    },
  ],
};

// HowTo Schema for /como-funciona
export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo prepararse para la PAES de Matemática con SimplePAES",
  description:
    "Guía paso a paso para usar SimplePAES y mejorar tu puntaje en la PAES de Matemática",
  totalTime: "P1M",
  tool: [{ "@type": "HowToTool", name: "Computador o celular con internet" }],
  step: [
    {
      "@type": "HowToStep",
      name: "Crea tu cuenta",
      text: "Regístrate gratis en SimplePAES con tu email. Selecciona tu nivel (M1 o M2).",
      url: SITE_URL,
    },
    {
      "@type": "HowToStep",
      name: "Aprende con mini-lecciones",
      text: "Las mini-lecciones te explican el por qué de cada concepto, no solo el procedimiento.",
      url: `${SITE_URL}/como-funciona`,
    },
    {
      "@type": "HowToStep",
      name: "Usa el Tutor AI cuando te trabas",
      text: "El Tutor AI Socrático te hace preguntas que te guían a entender —sin darte la respuesta directa.",
      url: `${SITE_URL}/como-funciona`,
    },
    {
      "@type": "HowToStep",
      name: "Sigue tu progreso",
      text: "Ve tus estadísticas, identifica temas débiles y enfoca tu estudio donde más importa.",
      url: `${SITE_URL}/como-funciona`,
    },
  ],
};

// ContactPage Schema for /contacto
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contacto#webpage`,
  name: "Contacto SimplePAES",
  description:
    "Contacta al equipo de SimplePAES para soporte y ayuda con tu preparación PAES.",
  url: `${SITE_URL}/contacto`,
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    telephone: "+56-9-3133-8020",
    email: "soporte@paes-math.cl",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+56-9-3133-8020",
      email: "soporte@paes-math.cl",
      availableLanguage: "Spanish",
      areaServed: "CL",
    },
  },
};

// BreadcrumbList Schema generator
export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
