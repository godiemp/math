import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { AdaptiveMarkdownViewer } from '@/components/AdaptiveMarkdownViewer';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DocsExportButton } from '@/components/DocsExportButton';

// Define the docs structure - same as in the main docs page
const docsStructure = {
  title: 'M1 - Nivel Básico',
  sections: [
    {
      title: 'Números y Operaciones',
      path: 'numeros',
      items: [
        { title: 'Enteros y Racionales', slug: 'numeros/enteros-racionales' },
        { title: 'Porcentajes', slug: 'numeros/porcentaje' },
        { title: 'Potencias y Raíces', slug: 'numeros/potencias-raices' },
        { title: 'Proporcionalidad', slug: 'numeros/proporcionalidad' },
      ],
    },
    {
      title: 'Álgebra y Funciones',
      path: 'algebra',
      items: [
        { title: 'Expresiones Algebraicas', slug: 'algebra/expresiones-algebraicas' },
        { title: 'Ecuaciones e Inecuaciones', slug: 'algebra/ecuaciones-inecuaciones' },
        { title: 'Sistemas de Ecuaciones', slug: 'algebra/sistemas-ecuaciones' },
        { title: 'Función Lineal', slug: 'algebra/funciones-lineales' },
        { title: 'Función Cuadrática', slug: 'algebra/funciones-cuadraticas' },
      ],
    },
    {
      title: 'Geometría',
      path: 'geometria',
      items: [
        { title: 'Perímetro y Área', slug: 'geometria/perimetro-area' },
        { title: 'Teorema de Pitágoras', slug: 'geometria/teorema-pitagoras' },
        { title: 'Volumen', slug: 'geometria/volumen' },
        { title: 'Transformaciones Isométricas', slug: 'geometria/transformaciones' },
      ],
    },
    {
      title: 'Probabilidad y Estadística',
      path: 'probabilidad',
      items: [
        { title: 'Tablas y Gráficos', slug: 'probabilidad/tablas-graficos' },
        { title: 'Medidas de Tendencia Central', slug: 'probabilidad/tendencia-central' },
        { title: 'Medidas de Posición', slug: 'probabilidad/medidas-posicion' },
        { title: 'Reglas de Probabilidad', slug: 'probabilidad/reglas-probabilidad' },
      ],
    },
  ],
};

async function getMarkdownContent(slug: string): Promise<string | null> {
  try {
    const docsPath = path.join(process.cwd(), 'docs', 'curriculum', 'm1');
    const filePath = path.join(docsPath, ...slug.split('/')) + '.md';
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}

export default async function DocsExportAllPage() {
  // Load all documentation content organized by sections
  const sections: {
    title: string;
    items: { title: string; content: string }[];
  }[] = [];

  for (const section of docsStructure.sections) {
    const sectionContent: { title: string; content: string }[] = [];

    for (const item of section.items) {
      const content = await getMarkdownContent(item.slug);
      if (content) {
        sectionContent.push({
          title: item.title,
          content,
        });
      }
    }

    if (sectionContent.length > 0) {
      sections.push({
        title: section.title,
        items: sectionContent,
      });
    }
  }

  // Count total topics
  const totalTopics = sections.reduce((sum, section) => sum + section.items.length, 0);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] print:bg-white">
        {/* Navbar */}
        <nav className="sticky top-0 z-30 h-14 backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-b border-black/[0.12] dark:border-white/[0.16] print:hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/curriculum/m1/docs"
                className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
              >
                ← Volver a Documentación
              </Link>
              <h1 className="text-lg font-semibold text-[#0A84FF]">
                Exportar Todo - M1
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto p-8 lg:p-12">
          {/* Export Button */}
          <div className="flex justify-between items-center mb-8 print:hidden">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Documentación Completa M1
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {totalTopics} temas disponibles para exportar
              </p>
            </div>
            <DocsExportButton title="M1-Documentacion-Completa" />
          </div>

          {/* Cover page for print */}
          <div className="hidden print:block mb-12 text-center print:break-after-page">
            <h1 className="text-4xl font-bold mb-4">M1 - Nivel Básico</h1>
            <h2 className="text-2xl text-gray-600">Documentación Completa</h2>
            <p className="mt-8 text-gray-500">{totalTopics} temas</p>
          </div>

          {/* All content organized by sections */}
          <div className="bg-white dark:bg-[#121212] p-8 rounded-lg shadow-sm print:shadow-none print:p-0 print:bg-white">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className={sectionIndex > 0 ? 'print:break-before-page mt-12 print:mt-0' : ''}>
                {/* Section title */}
                <div className="mb-8 pb-4 border-b-2 border-indigo-600 dark:border-indigo-400 print:border-black">
                  <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 print:text-black uppercase tracking-wide">
                    {section.title}
                  </h1>
                </div>

                {/* Section items */}
                <div className="space-y-8">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <AdaptiveMarkdownViewer content={item.content} />
                      {/* Add spacing between topics within same section */}
                      {itemIndex < section.items.length - 1 && (
                        <div className="my-8 border-t border-gray-200 dark:border-gray-700 print:border-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer for print */}
          <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
            <p>M1 - Nivel Básico | Documentación Completa</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
