'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface CubePart {
  id: string;
  color: string;
}

const CUBE_PARTS: CubePart[] = [
  { id: 'a3', color: '#3b82f6' },
  { id: 'a2b', color: '#14b8a6' },
  { id: 'ab2', color: '#a855f7' },
  { id: 'b3', color: '#ec4899' },
];

// Cube positions in the 2x2x2 arrangement and their types
const CUBE_CONFIG = [
  // Front layer (z = 0.55)
  { position: [-0.55, 0.55, 0.55], type: 'a3', label: 'a³' },
  { position: [0.55, 0.55, 0.55], type: 'a2b', label: 'a²b' },
  { position: [-0.55, -0.55, 0.55], type: 'a2b', label: 'a²b' },
  { position: [0.55, -0.55, 0.55], type: 'ab2', label: 'ab²' },
  // Back layer (z = -0.55)
  { position: [-0.55, 0.55, -0.55], type: 'a2b', label: 'a²b' },
  { position: [0.55, 0.55, -0.55], type: 'ab2', label: 'ab²' },
  { position: [-0.55, -0.55, -0.55], type: 'ab2', label: 'ab²' },
  { position: [0.55, -0.55, -0.55], type: 'b3', label: 'b³' },
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
      {/* Label as a simple plane with text texture would be complex, using color coding instead */}
      {/* Front face indicator */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[0.6, 0.3]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
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

  // Slow auto-rotation when not interacting
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
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

export interface CubeScene3DProps {
  selectedPart: string | null;
  onPartClick: (partId: string) => void;
  isExploded: boolean;
}

export default function CubeScene3D({ selectedPart, onPartClick, isExploded }: CubeScene3DProps) {
  return (
    <Canvas
      camera={{ position: [4, 3, 4], fov: 45 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <CubeGroup
        selectedPart={selectedPart}
        onPartClick={onPartClick}
        isExploded={isExploded}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
      />
    </Canvas>
  );
}
