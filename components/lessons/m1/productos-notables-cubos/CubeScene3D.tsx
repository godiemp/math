'use client';

import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// Dimensions for the visualization
const A = 1.4;  // 'a' dimension (larger)
const B = 0.7;  // 'b' dimension (smaller)
const TOTAL = A + B;  // Total side length (a+b)
const GAP = 0.05;  // Small gap between pieces when not exploded
const EXPLODE_FACTOR = 1.5;

interface CubePart {
  id: string;
  color: string;
  label: string;
}

const CUBE_PARTS: CubePart[] = [
  { id: 'a3', color: '#3b82f6', label: 'a³' },
  { id: 'a2b', color: '#14b8a6', label: 'a²b' },
  { id: 'ab2', color: '#a855f7', label: 'ab²' },
  { id: 'b3', color: '#ec4899', label: 'b³' },
];

// Configuration for 8 pieces with proper positions and sizes
// Origin is at (0,0,0), cube extends from 0 to (A+B) in each dimension
const CUBE_CONFIG = [
  // a³ cube (A×A×A) - corner at origin
  {
    basePos: [A/2, A/2, A/2],
    size: [A, A, A] as [number, number, number],
    type: 'a3',
    explodeDir: [-1, -1, -1]
  },

  // 3× a²b prisms (different orientations)
  {
    basePos: [A/2, A/2, A + B/2],
    size: [A, A, B] as [number, number, number],
    type: 'a2b',
    explodeDir: [-1, -1, 1]
  },
  {
    basePos: [A/2, A + B/2, A/2],
    size: [A, B, A] as [number, number, number],
    type: 'a2b',
    explodeDir: [-1, 1, -1]
  },
  {
    basePos: [A + B/2, A/2, A/2],
    size: [B, A, A] as [number, number, number],
    type: 'a2b',
    explodeDir: [1, -1, -1]
  },

  // 3× ab² prisms (different orientations)
  {
    basePos: [A/2, A + B/2, A + B/2],
    size: [A, B, B] as [number, number, number],
    type: 'ab2',
    explodeDir: [-1, 1, 1]
  },
  {
    basePos: [A + B/2, A/2, A + B/2],
    size: [B, A, B] as [number, number, number],
    type: 'ab2',
    explodeDir: [1, -1, 1]
  },
  {
    basePos: [A + B/2, A + B/2, A/2],
    size: [B, B, A] as [number, number, number],
    type: 'ab2',
    explodeDir: [1, 1, -1]
  },

  // b³ cube (B×B×B) - opposite corner
  {
    basePos: [A + B/2, A + B/2, A + B/2],
    size: [B, B, B] as [number, number, number],
    type: 'b3',
    explodeDir: [1, 1, 1]
  },
];

interface SinglePieceProps {
  basePos: number[];
  size: [number, number, number];
  explodeDir: number[];
  color: string;
  label: string;
  isSelected: boolean;
  isExploded: boolean;
  onClick: () => void;
}

function SinglePiece({ basePos, size, explodeDir, color, label, isSelected, isExploded, onClick }: SinglePieceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Center the cube group around origin
  const offset = TOTAL / 2;

  // Calculate position with explosion offset
  const position = useMemo(() => {
    const explodeOffset = isExploded ? 0.4 : 0;
    return [
      basePos[0] - offset + explodeDir[0] * explodeOffset,
      basePos[1] - offset + explodeDir[1] * explodeOffset,
      basePos[2] - offset + explodeDir[2] * explodeOffset,
    ] as [number, number, number];
  }, [basePos, explodeDir, isExploded, offset]);

  // Animate scale on hover/select
  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered || isSelected ? 1.05 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
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
        <boxGeometry args={[size[0] - GAP, size[1] - GAP, size[2] - GAP]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={isSelected ? 1 : 0.85}
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>

      {/* Wireframe edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(size[0] - GAP, size[1] - GAP, size[2] - GAP)]} />
        <lineBasicMaterial color={isSelected ? '#ffffff' : '#000000'} transparent opacity={isSelected ? 1 : 0.3} />
      </lineSegments>

      {/* Label */}
      <Html
        position={[0, 0, size[2] / 2 + 0.1]}
        center
        distanceFactor={5}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          className="font-mono font-bold text-white text-xs px-1.5 py-0.5 rounded bg-black/60 whitespace-nowrap"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

// Axis labels component
function AxisLabels({ isExploded }: { isExploded: boolean }) {
  const offset = TOTAL / 2;
  const explodeOffset = isExploded ? 0.5 : 0;

  return (
    <group>
      {/* X-axis labels */}
      <Html position={[A/2 - offset - explodeOffset, -offset - 0.3, -offset - 0.3]} center>
        <div className="font-mono font-bold text-blue-400 text-sm bg-gray-900/80 px-2 py-0.5 rounded">a</div>
      </Html>
      <Html position={[A + B/2 - offset + explodeOffset, -offset - 0.3, -offset - 0.3]} center>
        <div className="font-mono font-bold text-pink-400 text-sm bg-gray-900/80 px-2 py-0.5 rounded">b</div>
      </Html>

      {/* Y-axis labels */}
      <Html position={[-offset - 0.3, A/2 - offset - explodeOffset, -offset - 0.3]} center>
        <div className="font-mono font-bold text-blue-400 text-sm bg-gray-900/80 px-2 py-0.5 rounded">a</div>
      </Html>
      <Html position={[-offset - 0.3, A + B/2 - offset + explodeOffset, -offset - 0.3]} center>
        <div className="font-mono font-bold text-pink-400 text-sm bg-gray-900/80 px-2 py-0.5 rounded">b</div>
      </Html>

      {/* Z-axis labels */}
      <Html position={[-offset - 0.3, -offset - 0.3, A/2 - offset - explodeOffset]} center>
        <div className="font-mono font-bold text-blue-400 text-sm bg-gray-900/80 px-2 py-0.5 rounded">a</div>
      </Html>
      <Html position={[-offset - 0.3, -offset - 0.3, A + B/2 - offset + explodeOffset]} center>
        <div className="font-mono font-bold text-pink-400 text-sm bg-gray-900/80 px-2 py-0.5 rounded">b</div>
      </Html>

      {/* Total dimension label */}
      <Html position={[0, offset + 0.5, 0]} center>
        <div className="font-mono font-bold text-white text-base bg-purple-600/90 px-3 py-1 rounded-lg whitespace-nowrap">
          (a+b)³
        </div>
      </Html>
    </group>
  );
}

// Grid lines showing a/b division
function GridLines({ isExploded }: { isExploded: boolean }) {
  const offset = TOTAL / 2;
  const lineColor = '#ffffff';
  const lineOpacity = 0.3;

  if (isExploded) return null;

  // Lines at the a/b boundary
  const aPos = A - offset;

  return (
    <group>
      {/* Vertical lines on front face */}
      <Line
        points={[[aPos, -offset, offset], [aPos, offset, offset]]}
        color={lineColor}
        lineWidth={1}
        transparent
        opacity={lineOpacity}
        dashed
        dashSize={0.1}
        gapSize={0.05}
      />
      <Line
        points={[[-offset, aPos, offset], [offset, aPos, offset]]}
        color={lineColor}
        lineWidth={1}
        transparent
        opacity={lineOpacity}
        dashed
        dashSize={0.1}
        gapSize={0.05}
      />

      {/* Lines on side face */}
      <Line
        points={[[offset, -offset, aPos], [offset, offset, aPos]]}
        color={lineColor}
        lineWidth={1}
        transparent
        opacity={lineOpacity}
        dashed
        dashSize={0.1}
        gapSize={0.05}
      />
      <Line
        points={[[offset, aPos, -offset], [offset, aPos, offset]]}
        color={lineColor}
        lineWidth={1}
        transparent
        opacity={lineOpacity}
        dashed
        dashSize={0.1}
        gapSize={0.05}
      />

      {/* Lines on top face */}
      <Line
        points={[[aPos, offset, -offset], [aPos, offset, offset]]}
        color={lineColor}
        lineWidth={1}
        transparent
        opacity={lineOpacity}
        dashed
        dashSize={0.1}
        gapSize={0.05}
      />
      <Line
        points={[[-offset, offset, aPos], [offset, offset, aPos]]}
        color={lineColor}
        lineWidth={1}
        transparent
        opacity={lineOpacity}
        dashed
        dashSize={0.1}
        gapSize={0.05}
      />
    </group>
  );
}

interface CubeGroupProps {
  selectedPart: string | null;
  onPartClick: (partId: string) => void;
  isExploded: boolean;
}

function CubeGroup({ selectedPart, onPartClick, isExploded }: CubeGroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow auto-rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const getPartInfo = (type: string) => {
    return CUBE_PARTS.find(p => p.id === type) || { color: '#888888', label: '?' };
  };

  return (
    <group ref={groupRef}>
      {CUBE_CONFIG.map((config, index) => {
        const partInfo = getPartInfo(config.type);
        return (
          <SinglePiece
            key={index}
            basePos={config.basePos}
            size={config.size}
            explodeDir={config.explodeDir}
            color={partInfo.color}
            label={partInfo.label}
            isSelected={selectedPart === config.type}
            isExploded={isExploded}
            onClick={() => onPartClick(config.type)}
          />
        );
      })}
      <AxisLabels isExploded={isExploded} />
      <GridLines isExploded={isExploded} />
    </group>
  );
}

export interface CubeScene3DProps {
  selectedPart: string | null;
  onPartClick: (partId: string) => void;
  isExploded: boolean;
}

export default function CubeScene3D({ selectedPart, onPartClick, isExploded }: CubeScene3DProps) {
  return (
    <Canvas
      camera={{ position: [3.5, 2.5, 3.5], fov: 50 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} />
      <CubeGroup
        selectedPart={selectedPart}
        onPartClick={onPartClick}
        isExploded={isExploded}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={12}
      />
    </Canvas>
  );
}
