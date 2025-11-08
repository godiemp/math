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
  // Load all documentation content
  const allContent: { section: string; title: string; content: string }[] = [];

  for (const section of docsStructure.sections) {
    for (const item of section.items) {
      const content = await getMarkdownContent(item.slug);
      if (content) {
        allContent.push({
          section: section.title,
          title: item.title,
          content,
        });
      }
    }
  }

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
                {allContent.length} temas disponibles para exportar
              </p>
            </div>
            <DocsExportButton title="M1-Documentacion-Completa" />
          </div>

          {/* All content sections */}
          <div className="space-y-12">
            {allContent.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#121212] p-8 rounded-lg shadow-sm print:shadow-none print:break-after-page print:p-0 print:bg-white"
              >
                {/* Section header */}
                <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800 print:border-black">
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {item.section}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {item.title}
                  </h2>
                </div>

                {/* Content */}
                <AdaptiveMarkdownViewer content={item.content} />
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
