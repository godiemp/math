'use client';

import { useState, useRef, Suspense } from 'react';
import { ArrowRight, Lightbulb, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

type Phase = 'intro' | 'discover' | 'pattern';

interface CubePart {
  id: string;
  label: string;
  formula: string;
  count: number;
  color: string;
  bgColor: string;
}

const CUBE_PARTS: CubePart[] = [
  { id: 'a3', label: 'a³', formula: 'a × a × a', count: 1, color: '#3b82f6', bgColor: 'bg-blue-500' },
  { id: 'a2b', label: 'a²b', formula: 'a × a × b', count: 3, color: '#14b8a6', bgColor: 'bg-teal-500' },
  { id: 'ab2', label: 'ab²', formula: 'a × b × b', count: 3, color: '#a855f7', bgColor: 'bg-purple-500' },
  { id: 'b3', label: 'b³', formula: 'b × b × b', count: 1, color: '#ec4899', bgColor: 'bg-pink-500' },
];

// Cube positions in the 2x2x2 arrangement and their types
const CUBE_CONFIG = [
  // Front layer (z = 0.55)
  { position: [-0.55, 0.55, 0.55], type: 'a3', label: 'a³' },      // top-left
  { position: [0.55, 0.55, 0.55], type: 'a2b', label: 'a²b' },     // top-right
  { position: [-0.55, -0.55, 0.55], type: 'a2b', label: 'a²b' },   // bottom-left
  { position: [0.55, -0.55, 0.55], type: 'ab2', label: 'ab²' },    // bottom-right
  // Back layer (z = -0.55)
  { position: [-0.55, 0.55, -0.55], type: 'a2b', label: 'a²b' },   // top-left
  { position: [0.55, 0.55, -0.55], type: 'ab2', label: 'ab²' },    // top-right
  { position: [-0.55, -0.55, -0.55], type: 'ab2', label: 'ab²' },  // bottom-left
  { position: [0.55, -0.55, -0.55], type: 'b3', label: 'b³' },     // bottom-right
];

interface SingleCubeProps {
  position: [number, number, number];
  color: string;
  label: string;
  isSelected: boolean;
  isExploded: boolean;
  onClick: () => void;
}

function SingleCube({ position, color, label, isSelected, isExploded, onClick }: SingleCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Calculate exploded position
  const explodeFactor = isExploded ? 1.8 : 1;
  const explodedPosition: [number, number, number] = [
    position[0] * explodeFactor,
    position[1] * explodeFactor,
    position[2] * explodeFactor,
  ];

  // Animate scale on hover/select
  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered || isSelected ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={explodedPosition}>
      <RoundedBox
        ref={meshRef}
        args={[1, 1, 1]}
        radius={0.08}
        smoothness={4}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={isSelected ? 1 : 0.85}
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </RoundedBox>
      {/* Edge outline when selected */}
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.05, 1.05, 1.05)]} />
          <lineBasicMaterial color="#ffffff" linewidth={2} />
        </lineSegments>
      )}
      {/* Label */}
      <Text
        position={[0, 0, 0.52]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
}

interface CubeSceneProps {
  selectedPart: string | null;
  onPartClick: (partId: string) => void;
  isExploded: boolean;
}

function CubeScene({ selectedPart, onPartClick, isExploded }: CubeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow auto-rotation when not interacting
  useFrame((state, delta) => {
    if (groupRef.current && !state.controls) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const getColor = (type: string) => {
    const part = CUBE_PARTS.find(p => p.id === type);
    return part?.color || '#888888';
  };

  return (
    <group ref={groupRef}>
      {CUBE_CONFIG.map((cube, index) => (
        <SingleCube
          key={index}
          position={cube.position as [number, number, number]}
          color={getColor(cube.type)}
          label={cube.label}
          isSelected={selectedPart === cube.type}
          isExploded={isExploded}
          onClick={() => onPartClick(cube.type)}
        />
      ))}
    </group>
  );
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [exploded, setExploded] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [discoveredParts, setDiscoveredParts] = useState<string[]>([]);

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId);
    if (!discoveredParts.includes(partId)) {
      setDiscoveredParts([...discoveredParts, partId]);
    }
  };

  const allPartsDiscovered = discoveredParts.length === CUBE_PARTS.length;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Exploremos cómo se forma el cubo de un binomio
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-4">
              Cuando expandimos <span className="font-mono font-bold text-purple-600">(a + b)³</span>, el resultado se puede visualizar como un cubo grande dividido en <strong>8 partes</strong>.
            </p>

            {/* Explode toggle */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setExploded(!exploded)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                {exploded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                {exploded ? 'Vista compacta' : 'Vista expandida'}
              </button>
            </div>

            {/* Three.js 3D Cube Visualization */}
            <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center text-white">
                  Cargando visualización 3D...
                </div>
              }>
                <Canvas
                  camera={{ position: [4, 3, 4], fov: 45 }}
                  gl={{ antialias: true }}
                >
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <CubeScene
                    selectedPart={selectedPart}
                    onPartClick={handlePartClick}
                    isExploded={exploded}
                  />
                  <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={10}
                    autoRotate={!selectedPart}
                    autoRotateSpeed={1}
                  />
                </Canvas>
              </Suspense>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-center text-sm mt-2">
              Arrastra para rotar • Scroll para zoom • Clic en los cubos para explorar
            </p>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 mt-4 mb-4">
              {CUBE_PARTS.map((part) => (
                <div
                  key={part.id}
                  onClick={() => handlePartClick(part.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                    selectedPart === part.id
                      ? "bg-white dark:bg-gray-800 shadow-lg ring-2 ring-offset-2"
                      : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                  )}
                  style={{
                    '--tw-ring-color': selectedPart === part.id ? part.color : undefined
                  } as React.CSSProperties}
                >
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: part.color }}
                  />
                  <span className="font-mono font-bold text-gray-700 dark:text-gray-300">
                    {part.label}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ×{part.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Selected part info */}
            {selectedPart && (
              <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 animate-fadeIn">
                {(() => {
                  const part = CUBE_PARTS.find(p => p.id === selectedPart);
                  if (!part) return null;
                  return (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Hay <span className="font-bold text-2xl" style={{ color: part.color }}>{part.count}</span> {part.count === 1 ? 'pieza' : 'piezas'} de tipo <span className="font-mono" style={{ color: part.color }}>{part.label}</span>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Cada una tiene dimensiones: <span className="font-mono">{part.formula}</span>
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('discover')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Explorar el patrón</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'discover' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
              Haz clic en cada tipo de pieza para descubrir cuántas hay:
            </p>

            {/* Interactive parts grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {CUBE_PARTS.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handlePartClick(part.id)}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all transform hover:scale-105',
                    selectedPart === part.id
                      ? 'ring-2 ring-offset-2 ring-blue-500'
                      : '',
                    discoveredParts.includes(part.id)
                      ? `${part.bgColor} border-transparent text-white`
                      : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  )}
                >
                  <div className="text-center">
                    <p className="font-mono text-2xl font-bold">{part.label}</p>
                    {discoveredParts.includes(part.id) && (
                      <div className="mt-2 animate-fadeIn">
                        <p className="text-sm opacity-90">× {part.count}</p>
                        <p className="text-xs opacity-75 mt-1">{part.formula}</p>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Discovery progress */}
            <div className="flex justify-center gap-2">
              {CUBE_PARTS.map((part) => (
                <div
                  key={part.id}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all',
                    discoveredParts.includes(part.id)
                      ? part.bgColor
                      : 'bg-gray-300 dark:bg-gray-600'
                  )}
                />
              ))}
            </div>

            {/* Selected part info */}
            {selectedPart && (
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 animate-fadeIn">
                {(() => {
                  const part = CUBE_PARTS.find(p => p.id === selectedPart);
                  if (!part) return null;
                  return (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Hay <span className="font-bold text-2xl" style={{ color: part.color }}>{part.count}</span> piezas de tipo <span className="font-mono">{part.label}</span>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Cada una tiene dimensiones: <span className="font-mono">{part.formula}</span>
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {allPartsDiscovered && (
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700 animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <p className="font-semibold text-green-800 dark:text-green-200">
                  ¡Has descubierto todas las partes!
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                El cubo se divide en: <span className="font-mono font-bold">1</span> × a³ + <span className="font-mono font-bold">3</span> × a²b + <span className="font-mono font-bold">3</span> × ab² + <span className="font-mono font-bold">1</span> × b³
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-center mt-2 text-sm">
                Nota los coeficientes: <span className="font-bold">1 - 3 - 3 - 1</span>
              </p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('pattern')}
              disabled={!allPartsDiscovered}
              className={cn(
                'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
                allPartsDiscovered
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              <span>Ver el patrón completo</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'pattern' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              El Patrón del Cubo de un Binomio
            </h3>

            {/* Formula breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              <div className="text-center space-y-4">
                <p className="font-mono text-xl">
                  (<span className="text-blue-600">a</span> + <span className="text-pink-600">b</span>)³ =
                </p>
                <div className="flex flex-wrap justify-center gap-2 items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-3 py-2 rounded-lg font-mono text-blue-700 dark:text-blue-300">1×a³</span>
                  <span className="text-gray-400">+</span>
                  <span className="bg-teal-100 dark:bg-teal-900/50 px-3 py-2 rounded-lg font-mono text-teal-700 dark:text-teal-300">3×a²b</span>
                  <span className="text-gray-400">+</span>
                  <span className="bg-purple-100 dark:bg-purple-900/50 px-3 py-2 rounded-lg font-mono text-purple-700 dark:text-purple-300">3×ab²</span>
                  <span className="text-gray-400">+</span>
                  <span className="bg-pink-100 dark:bg-pink-900/50 px-3 py-2 rounded-lg font-mono text-pink-700 dark:text-pink-300">1×b³</span>
                </div>
                <p className="text-gray-400">↓</p>
                <p className="font-mono text-2xl font-bold text-gray-800 dark:text-gray-200">
                  <span className="text-blue-600">a³</span> + <span className="text-teal-600">3a²b</span> + <span className="text-purple-600">3ab²</span> + <span className="text-pink-600">b³</span>
                </p>
              </div>
            </div>

            {/* Pascal's triangle connection */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 text-center">
                Los coeficientes vienen del Triángulo de Pascal:
              </h4>
              <div className="flex flex-col items-center gap-2 font-mono">
                <div className="flex gap-4 text-gray-400 text-sm">
                  <span>n=0:</span>
                  <span className="text-gray-600 dark:text-gray-400">1</span>
                </div>
                <div className="flex gap-4 text-gray-400 text-sm">
                  <span>n=1:</span>
                  <span className="text-gray-600 dark:text-gray-400">1 &nbsp; 1</span>
                </div>
                <div className="flex gap-4 text-gray-400 text-sm">
                  <span>n=2:</span>
                  <span className="text-gray-600 dark:text-gray-400">1 &nbsp; 2 &nbsp; 1</span>
                </div>
                <div className="flex gap-4 text-amber-700 dark:text-amber-300 font-bold">
                  <span>n=3:</span>
                  <span className="bg-amber-200 dark:bg-amber-800 px-3 py-1 rounded">1 &nbsp; 3 &nbsp; 3 &nbsp; 1</span>
                </div>
              </div>
            </div>

            {/* Subtraction variant */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
                ¿Y si es resta?
              </h4>
              <p className="text-center font-mono text-lg">
                (<span className="text-blue-600">a</span> - <span className="text-pink-600">b</span>)³ = <span className="text-blue-600">a³</span> <span className="text-red-500">-</span> 3a²b <span className="text-green-500">+</span> 3ab² <span className="text-red-500">-</span> <span className="text-pink-600">b³</span>
              </p>
              <p className="text-center text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Los signos <strong>alternan</strong>: + - + -
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
