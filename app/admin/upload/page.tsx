'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { api } from '@/lib/api-client';
import { createWorker } from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';

interface ExtractedQuestion {
  question: string;
  options: string[];
  correctAnswer?: number;
  explanation?: string;
}

interface QuestionToSave {
  id: string;
  level: 'M1' | 'M2';
  topic: string;
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  question: string;
  questionLatex?: string;
  options: string[];
  optionsLatex?: string[];
  correctAnswer: number;
  explanation: string;
  explanationLatex?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  skills: string[];
}

export default function UploadPDFPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [processingLogs, setProcessingLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [rawText, setRawText] = useState('');
  const [showRawText, setShowRawText] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [showOcrText, setShowOcrText] = useState(false);
  const [extractedQuestions, setExtractedQuestions] = useState<ExtractedQuestion[]>([]);
  const [enrichedQuestions, setEnrichedQuestions] = useState<QuestionToSave[]>([]);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [useClaude, setUseClaude] = useState(true); // Default to Claude Vision

  // Configure PDF.js worker
  useEffect(() => {
    // Use local worker file from public directory (more reliable than CDN)
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSizeMB = 5;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      if (selectedFile.type !== 'application/pdf') {
        setError('Por favor, selecciona un archivo PDF válido');
        setFile(null);
        return;
      }

      if (selectedFile.size > maxSizeBytes) {
        setError(`El archivo es demasiado grande. Tamaño máximo: ${maxSizeMB}MB`);
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError('');
    }
  };

  const runOCROnPDF = async (pdfFile: File) => {
    try {
      setUploadProgress('Cargando PDF...');

      // Load PDF
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      setUploadProgress(`Inicializando OCR...`);

      // Create Tesseract worker
      const worker = await createWorker('spa', 1, {
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            // Progress updates are handled per page below
          }
        }
      });

      let allText = '';

      // Process each page
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        setUploadProgress(`Procesando página ${pageNum} de ${numPages}...`);

        // Get page
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.0 });

        // Create canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render page to canvas
        await page.render({
          canvasContext: context!,
          viewport: viewport,
          canvas: canvas,
        } as any).promise;

        // Convert canvas to image data URL
        const imageDataUrl = canvas.toDataURL('image/png');

        // Run OCR on the image
        setUploadProgress(`OCR en página ${pageNum} de ${numPages}...`);
        const { data: { text } } = await worker.recognize(imageDataUrl);

        allText += `\n\n=== PÁGINA ${pageNum} ===\n\n${text}`;
      }

      await worker.terminate();

      setUploadProgress('');
      return allText;
    } catch (error) {
      console.error('OCR error:', error);
      return `OCR failed: ${error}`;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecciona un archivo PDF');
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress('Subiendo archivo PDF...');

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      // Choose endpoint based on extraction method
      const endpoint = useClaude ? '/api/admin/upload-pdf-claude' : '/api/admin/upload-pdf';
      setUploadProgress(useClaude ? 'Procesando con Claude Vision API...' : 'Extrayendo texto del PDF (backend)...');

      const response = await api.post<any>(endpoint, formData);

      if (response.error) {
        setError(response.error.error || 'Error al procesar el PDF');
        setUploadProgress('');
        return;
      }

      if (!response.data) {
        setError('No se recibió respuesta del servidor');
        setUploadProgress('');
        return;
      }

      setUploadProgress('Analizando preguntas extraídas...');
      setUploadResult(response.data);
      setExtractedQuestions(response.data.questions || []);

      // Store raw text for debugging (only available from basic extraction)
      if (response.data.rawText) {
        setRawText(response.data.rawText);
        setShowRawText(true);
      }

      // Store processing logs
      if (response.data.logs) {
        setProcessingLogs(response.data.logs);
      }

      // Run browser OCR only if NOT using Claude
      if (!useClaude) {
        setUploadProgress('Ejecutando OCR en el navegador...');
        const ocrResult = await runOCROnPDF(file);
        setOcrText(ocrResult);
        setShowOcrText(true);
      }

      // Map questions to enriched format
      const enriched = (response.data.questions || []).map((q: any, index: number) => ({
        id: 'uploaded-' + new Date().getTime() + '-' + index,
        level: 'M1' as const,
        topic: 'Tema por definir',
        subject: 'números' as const,
        question: q.questionText || q.question,
        questionLatex: q.questionLatex || q.question,
        options: q.options?.map((opt: any) => opt.text || opt) || [],
        optionsLatex: q.options?.map((opt: any) => opt.latex || opt.text || opt) || [],
        correctAnswer: q.correctAnswer ?? 0,
        explanation: q.explanation || 'Sin explicación',
        explanationLatex: q.explanationLatex || q.explanation || 'Sin explicación',
        difficulty: 'medium' as const,
        skills: [],
      }));

      setEnrichedQuestions(enriched);
      setUploadProgress('');
    } catch (err: any) {
      setError(err.message || 'Error al procesar el PDF');
      console.error('Upload error:', err);
      setUploadProgress('');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveQuestions = async () => {
    if (enrichedQuestions.length === 0) {
      setError('No hay preguntas para guardar');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await api.post<any>('/api/admin/save-questions', {
        questions: enrichedQuestions,
      });

      if (response.error) {
        setError(response.error.error || 'Error al guardar las preguntas');
        return;
      }

      if (!response.data) {
        setError('No se recibió respuesta del servidor');
        return;
      }

      alert('✅ ' + response.data.saved + ' preguntas guardadas exitosamente');

      setFile(null);
      setExtractedQuestions([]);
      setEnrichedQuestions([]);
      setUploadResult(null);
    } catch (err: any) {
      setError(err.message || 'Error al guardar las preguntas');
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    setEnrichedQuestions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="secondary"
              onClick={() => router.push('/admin')}
            >
              ← Volver al Admin
            </Button>
          </div>

          <Heading level={1} size="lg" className="mb-8">
            Cargar Preguntas desde PDF
          </Heading>

          <Card padding="lg" className="mb-8">
            <Heading level={2} size="md" className="mb-4">
              1. Seleccionar y Procesar PDF
            </Heading>
            <Text variant="secondary" size="sm" className="mb-4">
              Tamaño máximo: 5MB. Para PDFs grandes, divídelos en archivos más pequeños.
            </Text>

            <div className="space-y-4">
              {/* Extraction Method Selector */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Text className="font-medium mb-3">Método de extracción:</Text>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={useClaude}
                      onChange={() => setUseClaude(true)}
                      className="w-4 h-4 text-blue-600"
                      disabled={uploading}
                    />
                    <div>
                      <Text className="font-medium">🤖 Claude Vision AI</Text>
                      <Text variant="secondary" size="sm">Extrae texto, LaTeX y detecta imágenes automáticamente</Text>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!useClaude}
                      onChange={() => setUseClaude(false)}
                      className="w-4 h-4 text-blue-600"
                      disabled={uploading}
                    />
                    <div>
                      <Text className="font-medium">📄 Básico (pdf2json + OCR)</Text>
                      <Text variant="secondary" size="sm">Extracción simple sin LaTeX automático</Text>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                  disabled={uploading}
                />
              </div>

              {file && (
                <div className="flex items-center gap-2">
                  <Badge variant="info">{file.name}</Badge>
                  <Text variant="secondary" size="sm">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </Text>
                </div>
              )}

              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={!file || uploading}
              >
                {uploading ? 'Procesando...' : useClaude ? '🤖 Extraer con Claude AI' : '📄 Extraer con Método Básico'}
              </Button>

              {uploadProgress && (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-800"></div>
                    <div>
                      <p className="font-medium">{uploadProgress}</p>
                      <p className="text-sm text-blue-600 mt-1">
                        Esto puede tomar varios segundos para PDFs grandes...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
                  {error}
                </div>
              )}

              {uploadResult && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
                  <p>✅ PDF procesado exitosamente</p>
                  <p className="text-sm mt-1">
                    Páginas: {uploadResult.totalPages} |
                    Preguntas encontradas: {uploadResult.questionsFound} |
                    Preguntas válidas: {uploadResult.validQuestions}
                  </p>

                  {processingLogs.length > 0 && (
                    <div className="mt-3">
                      <button
                        onClick={() => setShowLogs(!showLogs)}
                        className="text-sm font-medium text-green-700 hover:text-green-900 underline"
                      >
                        {showLogs ? '▼ Ocultar logs del servidor' : '▶ Ver logs del servidor'}
                      </button>

                      {showLogs && (
                        <div className="mt-2 bg-gray-900 text-gray-100 rounded p-3 text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto">
                          {processingLogs.map((log, index) => (
                            <div key={index} className="py-1">
                              {log}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {rawText && (
                    <div className="mt-3">
                      <button
                        onClick={() => setShowRawText(!showRawText)}
                        className="text-sm font-medium text-green-700 hover:text-green-900 underline"
                      >
                        {showRawText ? '▼ Ocultar texto extraído del PDF (pdf2json)' : '▶ Ver texto extraído del PDF (pdf2json)'}
                      </button>

                      {showRawText && (
                        <div className="mt-2 bg-gray-900 text-gray-100 rounded p-3 text-xs font-mono overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap">
                          {rawText}
                        </div>
                      )}
                    </div>
                  )}

                  {ocrText && (
                    <div className="mt-3">
                      <button
                        onClick={() => setShowOcrText(!showOcrText)}
                        className="text-sm font-medium text-green-700 hover:text-green-900 underline"
                      >
                        {showOcrText ? '▼ Ocultar texto OCR (Tesseract)' : '▶ Ver texto OCR (Tesseract)'}
                      </button>

                      {showOcrText && (
                        <div className="mt-2 bg-gray-900 text-gray-100 rounded p-3 text-xs font-mono overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap">
                          {ocrText}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          {extractedQuestions.length > 0 && (
            <>
              <Card padding="lg" className="mb-8">
                <Heading level={2} size="md" className="mb-4">
                  2. Revisar y Enriquecer Preguntas
                </Heading>
                <Text variant="secondary" className="mb-4">
                  Revisa las preguntas extraídas y completa los metadatos necesarios antes de guardar.
                </Text>

                <div className="space-y-6">
                  {enrichedQuestions.map((q, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="info">Pregunta {index + 1}</Badge>
                      </div>

                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ID *
                        </label>
                        <input
                          type="text"
                          value={q.id}
                          onChange={(e) => updateQuestion(index, 'id', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="ej: m1-100"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pregunta *
                        </label>
                        <textarea
                          value={q.question}
                          onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows={3}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Opciones *
                        </label>
                        {q.options.map((opt, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium w-8">{String.fromCharCode(65 + optIndex)})</span>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newOptions = [...q.options];
                                newOptions[optIndex] = e.target.value;
                                updateQuestion(index, 'options', newOptions);
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nivel *
                          </label>
                          <select
                            value={q.level}
                            onChange={(e) => updateQuestion(index, 'level', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="M1">M1</option>
                            <option value="M2">M2</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Asignatura *
                          </label>
                          <select
                            value={q.subject}
                            onChange={(e) => updateQuestion(index, 'subject', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="números">Números</option>
                            <option value="álgebra">Álgebra</option>
                            <option value="geometría">Geometría</option>
                            <option value="probabilidad">Probabilidad</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dificultad *
                          </label>
                          <select
                            value={q.difficulty}
                            onChange={(e) => updateQuestion(index, 'difficulty', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="easy">Fácil</option>
                            <option value="medium">Media</option>
                            <option value="hard">Difícil</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tema *
                          </label>
                          <input
                            type="text"
                            value={q.topic}
                            onChange={(e) => updateQuestion(index, 'topic', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="ej: Números y Operaciones"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Respuesta Correcta *
                          </label>
                          <select
                            value={q.correctAnswer}
                            onChange={(e) => updateQuestion(index, 'correctAnswer', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value={0}>A</option>
                            <option value={1}>B</option>
                            <option value={2}>C</option>
                            <option value={3}>D</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Explicación
                        </label>
                        <textarea
                          value={q.explanation}
                          onChange={(e) => updateQuestion(index, 'explanation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows={2}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Habilidades (separadas por coma)
                        </label>
                        <input
                          type="text"
                          value={q.skills.join(', ')}
                          onChange={(e) => updateQuestion(index, 'skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="ej: numeros-operaciones-basicas, numeros-fracciones"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card padding="lg">
                <Heading level={2} size="md" className="mb-4">
                  3. Guardar Preguntas en la Base de Datos
                </Heading>
                <Button
                  variant="primary"
                  onClick={handleSaveQuestions}
                  disabled={saving}
                  className="w-full md:w-auto"
                >
                  {saving ? 'Guardando...' : 'Guardar ' + enrichedQuestions.length + ' Preguntas'}
                </Button>
              </Card>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
