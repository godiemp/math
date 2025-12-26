import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lesson Builder | SimplePAES',
  description: 'Crea lecciones interactivas de matemáticas con IA',
};

export default function BuildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}
