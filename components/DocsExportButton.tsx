'use client';

import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

interface DocsExportButtonProps {
  title?: string;
}

export function DocsExportButton({ title = 'documento' }: DocsExportButtonProps) {
  const handleExportPDF = () => {
    // Set the document title for the PDF filename
    const originalTitle = document.title;
    document.title = title;

    // Add a class to body for print-specific styling
    document.body.classList.add('printing-pdf');

    // Trigger browser's print dialog (user can save as PDF)
    window.print();

    // Cleanup: restore original title and remove class after print dialog
    setTimeout(() => {
      document.title = originalTitle;
      document.body.classList.remove('printing-pdf');
    }, 100);
  };

  return (
    <Button
      onClick={handleExportPDF}
      variant="ghost"
      size="sm"
      className="gap-2 print:hidden"
    >
      <Download className="h-4 w-4" />
      Exportar PDF
    </Button>
  );
}
