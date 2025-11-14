/**
 * ============================================================================
 * CERTIFICATE PDF GENERATION SERVICE
 * ============================================================================
 *
 * Service for generating professional PDF certificates with:
 * - Modern, clean design inspired by Duolingo Test + Cambridge + Notion
 * - Student information with optional photo
 * - Test details and results
 * - Section scores and charts
 * - AI-generated personalized messages
 * - Badges and achievements
 * - QR code for verification
 * - Digital signature and seal
 */

import { PDFDocument, rgb, StandardFonts, PDFPage } from 'pdf-lib';
import { Certificate } from '../lib/types/core';
import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';

// Color palette (professional and modern)
const COLORS = {
  primary: rgb(0.102, 0.357, 0.839), // #1a5bd7 - Professional blue
  secondary: rgb(0.447, 0.533, 0.937), // #7288ef - Light blue
  success: rgb(0.063, 0.725, 0.506), // #10b981 - Green
  warning: rgb(0.965, 0.620, 0.051), // #f59e0b - Orange
  danger: rgb(0.937, 0.267, 0.267), // #ef4444 - Red
  text: rgb(0.118, 0.125, 0.157), // #1e2028 - Dark gray
  textLight: rgb(0.420, 0.451, 0.502), // #6b7280 - Medium gray
  background: rgb(1, 1, 1), // #ffffff - White
  border: rgb(0.902, 0.910, 0.925), // #e5e7eb - Light gray
};

/**
 * Generate QR code as data URL
 */
async function generateQRCode(data: string): Promise<string> {
  try {
    return await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 150,
      margin: 1,
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

/**
 * Draw a rounded rectangle (approximation using lines and arcs)
 */
function drawRoundedRect(
  page: PDFPage,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: ReturnType<typeof rgb>
) {
  // Top line
  page.drawLine({
    start: { x: x + radius, y: y + height },
    end: { x: x + width - radius, y: y + height },
    color,
    thickness: 1,
  });
  // Right line
  page.drawLine({
    start: { x: x + width, y: y + height - radius },
    end: { x: x + width, y: y + radius },
    color,
    thickness: 1,
  });
  // Bottom line
  page.drawLine({
    start: { x: x + width - radius, y },
    end: { x: x + radius, y },
    color,
    thickness: 1,
  });
  // Left line
  page.drawLine({
    start: { x, y: y + radius },
    end: { x, y: y + height - radius },
    color,
    thickness: 1,
  });
}

/**
 * Draw a filled rounded rectangle
 */
function drawFilledRoundedRect(
  page: PDFPage,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: ReturnType<typeof rgb>
) {
  // Main rectangle
  page.drawRectangle({
    x: x + radius,
    y,
    width: width - 2 * radius,
    height,
    color,
  });

  // Left rectangle
  page.drawRectangle({
    x,
    y: y + radius,
    width: radius,
    height: height - 2 * radius,
    color,
  });

  // Right rectangle
  page.drawRectangle({
    x: x + width - radius,
    y: y + radius,
    width: radius,
    height: height - 2 * radius,
    color,
  });

  // Draw border
  drawRoundedRect(page, x, y, width, height, radius, color);
}

/**
 * Remove emojis and other non-WinAnsi characters from text
 * WinAnsi encoding can only handle Latin-1 characters (U+0000 to U+00FF)
 */
function stripUnicodeForPdf(text: string): string {
  // Remove emojis and other Unicode characters that can't be encoded in WinAnsi
  // Keep only ASCII and Latin-1 characters
  return text.replace(/[^\u0000-\u00FF]/g, '').trim();
}

/**
 * Draw a simple badge/medal icon
 */
function drawBadgeIcon(
  page: PDFPage,
  x: number,
  y: number,
  size: number,
  emoji: string
) {
  // Just draw a circle background for now
  page.drawCircle({
    x: x + size / 2,
    y: y + size / 2,
    size: size / 2,
    color: rgb(0.95, 0.95, 0.95),
    borderColor: COLORS.border,
    borderWidth: 1,
  });
}

/**
 * Generate professional PDF certificate
 */
export async function generateCertificatePdf(certificate: Certificate): Promise<Buffer> {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // A4 size in points (595.28 x 841.89)
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Load fonts
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Margins
    const margin = 50;
    const contentWidth = pageWidth - 2 * margin;
    let currentY = pageHeight; // Start at the very top

    // ========================================================================
    // HEADER SECTION
    // ========================================================================

    // Draw header background at the very top
    page.drawRectangle({
      x: 0,
      y: currentY - 80,
      width: pageWidth,
      height: 80,
      color: COLORS.primary,
    });

    // App logo/title
    page.drawText('PAES Matemáticas', {
      x: margin,
      y: currentY - 30,
      size: 24,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });

    page.drawText('CERTIFICADO DE LOGRO', {
      x: margin,
      y: currentY - 55,
      size: 14,
      font: helvetica,
      color: rgb(0.9, 0.9, 0.9),
    });

    // Certificate code (top right)
    const codeText = certificate.certificateCode;
    const codeWidth = helvetica.widthOfTextAtSize(codeText, 10);
    page.drawText(codeText, {
      x: pageWidth - margin - codeWidth,
      y: currentY - 40,
      size: 10,
      font: helvetica,
      color: rgb(0.9, 0.9, 0.9),
    });

    currentY -= 100;

    // ========================================================================
    // STUDENT INFORMATION SECTION
    // ========================================================================

    page.drawText('ESTUDIANTE', {
      x: margin,
      y: currentY,
      size: 10,
      font: helveticaBold,
      color: COLORS.textLight,
    });

    currentY -= 25;

    page.drawText(stripUnicodeForPdf(certificate.studentName), {
      x: margin,
      y: currentY,
      size: 18,
      font: helveticaBold,
      color: COLORS.text,
    });

    currentY -= 35;

    // Divider line
    page.drawLine({
      start: { x: margin, y: currentY },
      end: { x: pageWidth - margin, y: currentY },
      color: COLORS.border,
      thickness: 1,
    });

    currentY -= 25;

    // ========================================================================
    // TEST INFORMATION SECTION
    // ========================================================================

    page.drawText('INFORMACIÓN DEL ENSAYO', {
      x: margin,
      y: currentY,
      size: 10,
      font: helveticaBold,
      color: COLORS.textLight,
    });

    currentY -= 20;

    const testDate = new Date(certificate.testDate);
    const formattedDate = testDate.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formattedTime = testDate.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const infoItems = [
      { label: 'Ensayo:', value: stripUnicodeForPdf(certificate.testName) },
      { label: 'Fecha:', value: `${formattedDate} a las ${formattedTime}` },
      { label: 'Duración:', value: `${certificate.testDurationMinutes} minutos` },
      { label: 'Total de preguntas:', value: `${certificate.totalQuestions}` },
    ];

    for (const item of infoItems) {
      page.drawText(item.label, {
        x: margin,
        y: currentY,
        size: 10,
        font: helveticaBold,
        color: COLORS.text,
      });

      page.drawText(stripUnicodeForPdf(item.value), {
        x: margin + 150,
        y: currentY,
        size: 10,
        font: helvetica,
        color: COLORS.text,
      });

      currentY -= 18;
    }

    currentY -= 10;

    // Divider line
    page.drawLine({
      start: { x: margin, y: currentY },
      end: { x: pageWidth - margin, y: currentY },
      color: COLORS.border,
      thickness: 1,
    });

    currentY -= 25;

    // ========================================================================
    // RESULTS SECTION - HIGHLIGHTED BOX
    // ========================================================================

    const resultsBoxHeight = 100;
    const resultsBoxY = currentY - resultsBoxHeight;

    // Draw results background box
    drawFilledRoundedRect(
      page,
      margin,
      resultsBoxY,
      contentWidth,
      resultsBoxHeight,
      8,
      rgb(0.97, 0.98, 1)
    );

    // Main score (large)
    const scoreText = `${certificate.totalScore}/${certificate.maxScore}`;
    page.drawText(scoreText, {
      x: margin + 20,
      y: resultsBoxY + 55,
      size: 32,
      font: helveticaBold,
      color: COLORS.primary,
    });

    page.drawText('PUNTAJE TOTAL', {
      x: margin + 20,
      y: resultsBoxY + 35,
      size: 10,
      font: helvetica,
      color: COLORS.textLight,
    });

    // Percentage
    const percentageText = `${certificate.percentage.toFixed(1)}%`;
    page.drawText(percentageText, {
      x: margin + 200,
      y: resultsBoxY + 55,
      size: 28,
      font: helveticaBold,
      color: COLORS.success,
    });

    page.drawText('PORCENTAJE DE LOGRO', {
      x: margin + 200,
      y: resultsBoxY + 35,
      size: 10,
      font: helvetica,
      color: COLORS.textLight,
    });

    // Percentile (if available)
    if (certificate.percentile !== undefined) {
      const percentileText = `${certificate.percentile}°`;
      page.drawText(percentileText, {
        x: margin + 380,
        y: resultsBoxY + 55,
        size: 28,
        font: helveticaBold,
        color: COLORS.secondary,
      });

      page.drawText('PERCENTIL NACIONAL', {
        x: margin + 380,
        y: resultsBoxY + 35,
        size: 10,
        font: helvetica,
        color: COLORS.textLight,
      });
    }

    // Question breakdown
    const breakdownY = resultsBoxY + 15;
    page.drawText(`Correctas: ${certificate.correctCount}`, {
      x: margin + 20,
      y: breakdownY,
      size: 9,
      font: helvetica,
      color: COLORS.success,
    });

    page.drawText(`Incorrectas: ${certificate.incorrectCount}`, {
      x: margin + 150,
      y: breakdownY,
      size: 9,
      font: helvetica,
      color: COLORS.danger,
    });

    if (certificate.omittedCount > 0) {
      page.drawText(`Omitidas: ${certificate.omittedCount}`, {
        x: margin + 280,
        y: breakdownY,
        size: 9,
        font: helvetica,
        color: COLORS.textLight,
      });
    }

    currentY = resultsBoxY - 25;

    // ========================================================================
    // SECTION SCORES (if available)
    // ========================================================================

    if (certificate.sectionScores && certificate.sectionScores.length > 0) {
      page.drawText('DESEMPEÑO POR SECCIÓN', {
        x: margin,
        y: currentY,
        size: 10,
        font: helveticaBold,
        color: COLORS.textLight,
      });

      currentY -= 20;

      for (const section of certificate.sectionScores) {
        // Section name
        page.drawText(stripUnicodeForPdf(section.sectionName), {
          x: margin,
          y: currentY,
          size: 10,
          font: helveticaBold,
          color: COLORS.text,
        });

        // Progress bar background
        const barWidth = 200;
        const barHeight = 8;
        const barX = margin + 150;

        page.drawRectangle({
          x: barX,
          y: currentY - 2,
          width: barWidth,
          height: barHeight,
          color: rgb(0.95, 0.95, 0.95),
        });

        // Progress bar fill
        const fillWidth = (section.percentage / 100) * barWidth;
        const fillColor =
          section.percentage >= 80 ? COLORS.success :
          section.percentage >= 60 ? COLORS.warning :
          COLORS.danger;

        page.drawRectangle({
          x: barX,
          y: currentY - 2,
          width: fillWidth,
          height: barHeight,
          color: fillColor,
        });

        // Percentage text
        page.drawText(`${section.percentage.toFixed(1)}%`, {
          x: barX + barWidth + 10,
          y: currentY,
          size: 9,
          font: helvetica,
          color: COLORS.text,
        });

        // Score text
        page.drawText(`(${section.score}/${section.maxScore})`, {
          x: barX + barWidth + 60,
          y: currentY,
          size: 9,
          font: helvetica,
          color: COLORS.textLight,
        });

        currentY -= 20;
      }

      currentY -= 10;
    }

    // ========================================================================
    // BADGES/ACHIEVEMENTS SECTION
    // ========================================================================

    if (certificate.badges && certificate.badges.length > 0) {
      page.drawText('LOGROS Y MEDALLAS', {
        x: margin,
        y: currentY,
        size: 10,
        font: helveticaBold,
        color: COLORS.textLight,
      });

      currentY -= 20;

      const badgesPerRow = 3;
      const badgeWidth = (contentWidth - 40) / badgesPerRow;

      for (let i = 0; i < certificate.badges.length; i++) {
        const badge = certificate.badges[i];
        const col = i % badgesPerRow;
        const row = Math.floor(i / badgesPerRow);

        const badgeX = margin + col * badgeWidth;
        const badgeY = currentY - row * 35;

        // Draw badge bullet point (standard fonts can't render emojis)
        page.drawText('•', {
          x: badgeX,
          y: badgeY,
          size: 12,
          font: helveticaBold,
          color: COLORS.primary,
        });

        // Draw badge name (strip emojis since standard fonts can't encode them)
        const badgeName = stripUnicodeForPdf(badge.name);
        page.drawText(badgeName, {
          x: badgeX + 15,
          y: badgeY + 3,
          size: 9,
          font: helveticaBold,
          color: COLORS.text,
        });
      }

      const badgeRows = Math.ceil(certificate.badges.length / badgesPerRow);
      currentY -= badgeRows * 35 + 10;
    }

    // ========================================================================
    // PERSONALIZED MESSAGE SECTION
    // ========================================================================

    if (certificate.personalizedMessage) {
      // Divider line
      page.drawLine({
        start: { x: margin, y: currentY },
        end: { x: pageWidth - margin, y: currentY },
        color: COLORS.border,
        thickness: 1,
      });

      currentY -= 25;

      page.drawText('MENSAJE PERSONALIZADO', {
        x: margin,
        y: currentY,
        size: 10,
        font: helveticaBold,
        color: COLORS.textLight,
      });

      currentY -= 20;

      // Draw message box
      const messageBoxHeight = 80;
      const messageBoxY = currentY - messageBoxHeight;

      drawFilledRoundedRect(
        page,
        margin,
        messageBoxY,
        contentWidth,
        messageBoxHeight,
        8,
        rgb(0.98, 0.99, 1)
      );

      // Wrap text and draw (strip Unicode characters for PDF compatibility)
      const safeMessage = stripUnicodeForPdf(certificate.personalizedMessage);
      const maxCharsPerLine = 85;
      const words = safeMessage.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      for (const word of words) {
        if ((currentLine + word).length <= maxCharsPerLine) {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) {
        lines.push(currentLine);
      }

      let messageY = messageBoxY + messageBoxHeight - 15;
      for (const line of lines.slice(0, 4)) { // Max 4 lines
        page.drawText(line, {
          x: margin + 15,
          y: messageY,
          size: 9,
          font: helvetica,
          color: COLORS.text,
        });
        messageY -= 14;
      }

      currentY = messageBoxY - 25;
    }

    // ========================================================================
    // FOOTER - SIGNATURE
    // ========================================================================

    const footerY = 100;

    // Digital signature (centered)
    const signatureX = (pageWidth - 200) / 2;
    page.drawLine({
      start: { x: signatureX, y: footerY + 20 },
      end: { x: signatureX + 150, y: footerY + 20 },
      color: COLORS.text,
      thickness: 1,
    });

    page.drawText('En representacion de simplePAES', {
      x: signatureX,
      y: footerY + 5,
      size: 10,
      font: helvetica,
      color: COLORS.text,
    });

    // Issued date
    const issuedDate = new Date(certificate.issuedAt);
    const issuedDateText = `Emitido el ${issuedDate.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;

    const issuedDateWidth = helvetica.widthOfTextAtSize(issuedDateText, 8);
    page.drawText(issuedDateText, {
      x: (pageWidth - issuedDateWidth) / 2,
      y: 30,
      size: 8,
      font: helvetica,
      color: COLORS.textLight,
    });

    // ========================================================================
    // GENERATE PDF BUFFER
    // ========================================================================

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('Error generating certificate PDF:', error);
    throw error;
  }
}

/**
 * Save certificate PDF to file system
 */
export async function saveCertificatePdf(
  certificate: Certificate,
  outputDir: string
): Promise<string> {
  const pdfBuffer = await generateCertificatePdf(certificate);
  const filename = `certificate_${certificate.certificateCode}.pdf`;
  const filepath = path.join(outputDir, filename);

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(filepath, pdfBuffer);

  return filepath;
}
