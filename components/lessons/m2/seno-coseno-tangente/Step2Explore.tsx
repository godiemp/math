'use client';

import { useState } from 'react';
import { ArrowRight, Check, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { TriangleFigure } from '@/components/figures/TriangleFigure';

type Phase = 'intro' | 'experiment' | 'discovery' | 'summary';

interface TriangleData {
  id: string;
  angle: number;
  opposite: number;
  adjacent: number;
  hypotenuse: number;
  scale: string;
}

// All triangles have a 30° angle - the ratios should be the same!
const TRIANGLES: TriangleData[] = [
  { id: 't1', angle: 30, opposite: 3, adjacent: 5.2, hypotenuse: 6, scale: 'Pequeño' },
  { id: 't2', angle: 30, opposite: 6, adjacent: 10.4, hypotenuse: 12, scale: 'Mediano' },
  { id: 't3', angle: 30, opposite: 9, adjacent: 15.6, hypotenuse: 18, scale: 'Grande' },
];

// sin(30°) = 0.5, cos(30°) ≈ 0.866, tan(30°) ≈ 0.577
const SIN_30 = 0.5;
const COS_30 = 0.866;
const TAN_30 = 0.577;

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentTriangle, setCurrentTriangle] = useState(0);
  const [calculatedRatios, setCalculatedRatios] = useState<{
    sin: number[];
    cos: number[];
    tan: number[];
  }>({ sin: [], cos: [], tan: [] });
  const [showRatio, setShowRatio] = useState<'none' | 'sin' | 'cos' | 'tan'>('none');

  const triangle = TRIANGLES[currentTriangle];

  const calculateRatio = (type: 'sin' | 'cos' | 'tan') => {
    const t = TRIANGLES[currentTriangle];
    let value: number;

    switch (type) {
      case 'sin':
        value = t.opposite / t.hypotenuse;
        break;
      case 'cos':
        value = t.adjacent / t.hypotenuse;
        break;
      case 'tan':
        value = t.opposite / t.adjacent;
        break;
    }

    setShowRatio(type);
    setCalculatedRatios((prev) => ({
      ...prev,
      [type]: [...prev[type], value],
    }));
  };

  const handleNextTriangle = () => {
    if (currentTriangle < TRIANGLES.length - 1) {
      setCurrentTriangle((prev) => prev + 1);
      setShowRatio('none');
    } else {
      setPhase('discovery');
    }
  };

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Experimento de los Triángulos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubramos algo sorprendente...
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6">
          <div className="space-y-4">
            <p className="text-lg text-gray-800 dark:text-gray-200 text-center">
              Vamos a explorar <strong>tres triángulos rectángulos</strong> de diferentes tamaños,
              pero todos con el <strong>mismo ángulo de 30°</strong>.
            </p>

            {/* Three triangles preview */}
            <div className="flex justify-center items-end gap-4 py-4">
              <div className="flex flex-col items-center">
                <TriangleFigure
                  fromAngles={{ angles: [30, 60, 90], size: 60 }}
                  showRightAngleMarker
                  fill="rgba(191, 219, 254, 0.7)"
                  stroke="#1d4ed8"
                  angles={[{ showArc: true, label: '30°', color: '#dc2626', arcRadius: 15 }, {}, {}]}
                  showVertices={false}
                  padding={10}
                  className="w-20"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300 mt-1">Pequeño</span>
              </div>
              <div className="flex flex-col items-center">
                <TriangleFigure
                  fromAngles={{ angles: [30, 60, 90], size: 100 }}
                  showRightAngleMarker
                  fill="rgba(187, 247, 208, 0.7)"
                  stroke="#16a34a"
                  angles={[{ showArc: true, label: '30°', color: '#dc2626', arcRadius: 18 }, {}, {}]}
                  showVertices={false}
                  padding={10}
                  className="w-28"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300 mt-1">Mediano</span>
              </div>
              <div className="flex flex-col items-center">
                <TriangleFigure
                  fromAngles={{ angles: [30, 60, 90], size: 140 }}
                  showRightAngleMarker
                  fill="rgba(253, 230, 138, 0.7)"
                  stroke="#d97706"
                  angles={[{ showArc: true, label: '30°', color: '#dc2626', arcRadius: 22 }, {}, {}]}
                  showVertices={false}
                  padding={10}
                  className="w-36"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300 mt-1">Grande</span>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Pregunta clave:</strong> Si calculamos la razón entre los lados,
                  ¿obtendremos el mismo resultado en los tres triángulos?
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPhase('experiment')}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Comenzar el experimento</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: EXPERIMENT ============
  if (phase === 'experiment') {
    const colors = [
      { fill: 'rgba(191, 219, 254, 0.7)', stroke: '#1d4ed8' },
      { fill: 'rgba(187, 247, 208, 0.7)', stroke: '#16a34a' },
      { fill: 'rgba(253, 230, 138, 0.7)', stroke: '#d97706' },
    ];
    const color = colors[currentTriangle];

    // Triangle sizes for visualization
    const triangleSizes = [100, 140, 180];

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Triángulo {currentTriangle + 1} de 3: {triangle.scale}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ángulo: <strong className="text-red-600">30°</strong>
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-3">
          {TRIANGLES.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
                i < currentTriangle
                  ? 'bg-green-500 text-white'
                  : i === currentTriangle
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              )}
            >
              {i < currentTriangle ? <Check size={18} /> : i + 1}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          {/* Triangle visualization */}
          <div className="flex justify-center mb-6">
            <TriangleFigure
              fromAngles={{ angles: [30, 60, 90], size: triangleSizes[currentTriangle] }}
              showRightAngleMarker
              fill={color.fill}
              stroke={color.stroke}
              strokeWidth={3}
              padding={50}
              angles={[{ showArc: true, label: '30°', color: '#dc2626', arcRadius: 30 }, {}, {}]}
              sides={[
                { label: `Hip: ${triangle.hypotenuse}`, labelColor: '#7c3aed' },
                { label: `Op: ${triangle.opposite}`, labelColor: '#dc2626' },
                { label: `Ady: ${triangle.adjacent}`, labelColor: '#059669' },
              ]}
              className="w-72"
            />
          </div>

          {/* Ratio calculation buttons */}
          <div className="space-y-3">
            <p className="text-center text-gray-600 dark:text-gray-400 font-medium">
              Calcula las razones:
            </p>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => calculateRatio('sin')}
                disabled={calculatedRatios.sin.length > currentTriangle}
                className={cn(
                  'p-3 rounded-xl border-2 transition-all font-medium',
                  calculatedRatios.sin.length > currentTriangle
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                    : 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100'
                )}
              >
                <div className="text-xs mb-1">Op / Hip</div>
                <div className="font-mono text-lg">
                  {calculatedRatios.sin.length > currentTriangle
                    ? calculatedRatios.sin[currentTriangle].toFixed(3)
                    : 'seno'}
                </div>
              </button>

              <button
                onClick={() => calculateRatio('cos')}
                disabled={calculatedRatios.cos.length > currentTriangle}
                className={cn(
                  'p-3 rounded-xl border-2 transition-all font-medium',
                  calculatedRatios.cos.length > currentTriangle
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                    : 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100'
                )}
              >
                <div className="text-xs mb-1">Ady / Hip</div>
                <div className="font-mono text-lg">
                  {calculatedRatios.cos.length > currentTriangle
                    ? calculatedRatios.cos[currentTriangle].toFixed(3)
                    : 'coseno'}
                </div>
              </button>

              <button
                onClick={() => calculateRatio('tan')}
                disabled={calculatedRatios.tan.length > currentTriangle}
                className={cn(
                  'p-3 rounded-xl border-2 transition-all font-medium',
                  calculatedRatios.tan.length > currentTriangle
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                    : 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100'
                )}
              >
                <div className="text-xs mb-1">Op / Ady</div>
                <div className="font-mono text-lg">
                  {calculatedRatios.tan.length > currentTriangle
                    ? calculatedRatios.tan[currentTriangle].toFixed(3)
                    : 'tangente'}
                </div>
              </button>
            </div>
          </div>

          {/* Next button appears after all ratios calculated */}
          {calculatedRatios.sin.length > currentTriangle &&
            calculatedRatios.cos.length > currentTriangle &&
            calculatedRatios.tan.length > currentTriangle && (
              <button
                onClick={handleNextTriangle}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>
                  {currentTriangle < TRIANGLES.length - 1 ? 'Siguiente triángulo' : 'Ver descubrimiento'}
                </span>
                <ArrowRight size={20} />
              </button>
            )}
        </div>
      </div>
    );
  }

  // ============ PHASE 3: DISCOVERY ============
  if (phase === 'discovery') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Increíble Descubrimiento!
          </h2>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6">
          <p className="text-center text-lg text-gray-800 dark:text-gray-200 mb-6">
            Observa los resultados de los tres triángulos:
          </p>

          {/* Results table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-3 text-left text-gray-700 dark:text-gray-300">Triángulo</th>
                  <th className="p-3 text-center text-red-600">sin(30°)</th>
                  <th className="p-3 text-center text-green-600">cos(30°)</th>
                  <th className="p-3 text-center text-purple-600">tan(30°)</th>
                </tr>
              </thead>
              <tbody>
                {TRIANGLES.map((t, i) => (
                  <tr key={t.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">{t.scale}</td>
                    <td className="p-3 text-center font-mono text-red-600 dark:text-red-400">
                      {calculatedRatios.sin[i]?.toFixed(3) || '-'}
                    </td>
                    <td className="p-3 text-center font-mono text-green-600 dark:text-green-400">
                      {calculatedRatios.cos[i]?.toFixed(3) || '-'}
                    </td>
                    <td className="p-3 text-center font-mono text-purple-600 dark:text-purple-400">
                      {calculatedRatios.tan[i]?.toFixed(3) || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
            <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-3 text-center">
              🎯 ¡Las razones son SIEMPRE iguales!
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              No importa el tamaño del triángulo. Si el ángulo es el mismo,
              <br />
              <strong>las razones entre los lados son constantes.</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => setPhase('summary')}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Ver las definiciones</span>
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  // ============ PHASE 4: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Las Tres Razones Trigonométricas
        </h2>
      </div>

      <div className="space-y-4">
        {/* Sine */}
        <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-5 border border-red-200 dark:border-red-700">
          <div className="flex items-center gap-4">
            <div className="bg-red-500 text-white w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold">
              sin
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-800 dark:text-red-200 text-lg">SENO</h3>
              <p className="font-mono text-xl text-gray-800 dark:text-gray-200">
                sin(θ) = <span className="text-red-600">Opuesto</span> ÷{' '}
                <span className="text-purple-600">Hipotenusa</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                sin(30°) = 0,5 (siempre)
              </p>
            </div>
          </div>
        </div>

        {/* Cosine */}
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 text-white w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold">
              cos
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-800 dark:text-green-200 text-lg">COSENO</h3>
              <p className="font-mono text-xl text-gray-800 dark:text-gray-200">
                cos(θ) = <span className="text-green-600">Adyacente</span> ÷{' '}
                <span className="text-purple-600">Hipotenusa</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                cos(30°) ≈ 0,866 (siempre)
              </p>
            </div>
          </div>
        </div>

        {/* Tangent */}
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500 text-white w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold">
              tan
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-purple-800 dark:text-purple-200 text-lg">TANGENTE</h3>
              <p className="font-mono text-xl text-gray-800 dark:text-gray-200">
                tan(θ) = <span className="text-red-600">Opuesto</span> ÷{' '}
                <span className="text-green-600">Adyacente</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                tan(30°) ≈ 0,577 (siempre)
              </p>
            </div>
          </div>
        </div>

        {/* SOH-CAH-TOA mnemonic */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-200 text-lg mb-3 text-center">
            💡 Truco para recordar: SOH-CAH-TOA
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
              <span className="text-red-500 font-bold">S</span>in =
              <span className="text-red-500"> O</span>p /
              <span className="text-purple-500"> H</span>ip
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
              <span className="text-green-500 font-bold">C</span>os =
              <span className="text-green-500"> A</span>dy /
              <span className="text-purple-500"> H</span>ip
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
              <span className="text-purple-500 font-bold">T</span>an =
              <span className="text-red-500"> O</span>p /
              <span className="text-green-500"> A</span>dy
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onComplete}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <span>Continuar</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
