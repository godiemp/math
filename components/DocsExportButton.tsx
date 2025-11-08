'use client';

import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

interface DocsExportButtonProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  title?: string;
}

export function DocsExportButton({ contentRef, title = 'documento' }: DocsExportButtonProps) {
  const handleExportPDF = async () => {
    if (!contentRef.current) {
      console.error('Content ref is not available');
      return;
    }

    try {
      // Show loading state
      const button = document.getElementById('export-pdf-button');
      if (button) {
        button.textContent = 'Generando PDF...';
      }

      // Configure html2canvas to handle KaTeX and math content better
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: contentRef.current.scrollWidth,
        windowHeight: contentRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Calculate dimensions to fit A4
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename from title
      const filename = `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      pdf.save(filename);

      // Reset button text
      if (button) {
        button.textContent = 'Exportar PDF';
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta nuevamente.');

      // Reset button text
      const button = document.getElementById('export-pdf-button');
      if (button) {
        button.textContent = 'Exportar PDF';
      }
    }
  };

  return (
    <Button
      id="export-pdf-button"
      onClick={handleExportPDF}
      variant="ghost"
      size="sm"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Exportar PDF
    </Button>
  );
}
