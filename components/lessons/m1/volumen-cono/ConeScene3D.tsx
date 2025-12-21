'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// Dimensions
const RADIUS = 1;
const HEIGHT = 2;
const CONE_SPACING = 1.8;

interface ConeScene3DProps {
  phase: 0 | 1 | 2 | 3 | 4;
  waterLevel: number; // 0 to 1
}

// Glass-like cylinder (container)
function GlassCylinder({ waterLevel }: { waterLevel: number }) {
  const cylinderRef = useRef<THREE.Group>(null);

  // Water inside cylinder
  const waterHeight = HEIGHT * waterLevel;
  const waterY = -HEIGHT / 2 + waterHeight / 2;

  return (
    <group ref={cylinderRef} position={[-2, 0, 0]}>
      {/* Transparent cylinder shell */}
      <mesh>
        <cylinderGeometry args={[RADIUS, RADIUS, HEIGHT, 32, 1, true]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Cylinder edges - top */}
      <mesh position={[0, HEIGHT / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS, 0.02, 8, 32]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* Cylinder edges - bottom */}
      <mesh position={[0, -HEIGHT / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS, 0.02, 8, 32]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* Bottom cap */}
      <mesh position={[0, -HEIGHT / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[RADIUS, 32]} />
        <meshStandardMaterial
          color="#e2e8f0"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Water fill */}
      {waterLevel > 0 && (
        <mesh position={[0, waterY, 0]}>
          <cylinderGeometry args={[RADIUS * 0.98, RADIUS * 0.98, waterHeight, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.7}
          />
        </mesh>
      )}

      {/* Water surface */}
      {waterLevel > 0 && waterLevel < 1 && (
        <mesh position={[0, -HEIGHT / 2 + waterHeight, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[RADIUS * 0.98, 32]} />
          <meshStandardMaterial
            color="#7dd3fc"
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Height label */}
      <Line
        points={[[RADIUS + 0.2, -HEIGHT / 2, 0], [RADIUS + 0.2, HEIGHT / 2, 0]]}
        color="#3b82f6"
        lineWidth={2}
      />
      <Html position={[RADIUS + 0.5, 0, 0]} center>
        <div className="font-mono font-bold text-blue-400 text-sm bg-gray-900/80 px-2 py-0.5 rounded">
          h
        </div>
      </Html>

      {/* Radius label */}
      <Line
        points={[[0, -HEIGHT / 2 - 0.2, 0], [RADIUS, -HEIGHT / 2 - 0.2, 0]]}
        color="#ef4444"
        lineWidth={2}
      />
      <Html position={[RADIUS / 2, -HEIGHT / 2 - 0.4, 0]} center>
        <div className="font-mono font-bold text-red-400 text-sm bg-gray-900/80 px-2 py-0.5 rounded">
          r
        </div>
      </Html>

      {/* Label */}
      <Html position={[0, HEIGHT / 2 + 0.4, 0]} center>
        <div className="font-mono font-bold text-white text-sm bg-slate-700/90 px-3 py-1 rounded-lg">
          Cilindro
        </div>
      </Html>
    </group>
  );
}

// Colored cone (with optional tipping animation)
interface ConeProps {
  index: number;
  phase: number;
  position: [number, number, number];
}

function Cone({ index, phase, position }: ConeProps) {
  const coneRef = useRef<THREE.Group>(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  // Cone colors
  const colors = ['#14b8a6', '#06b6d4', '#0ea5e9'];
  const color = colors[index];

  // Determine if this cone has "poured"
  const hasPoured = phase > index;
  const isPouring = phase === index + 1;

  // Target rotation based on state
  if (hasPoured) {
    targetRotation.current = Math.PI; // Upside down (poured)
  } else if (isPouring) {
    targetRotation.current = Math.PI * 0.7; // Tilting
  } else {
    targetRotation.current = 0; // Upright
  }

  useFrame((_, delta) => {
    if (coneRef.current) {
      // Smooth rotation
      currentRotation.current = THREE.MathUtils.lerp(
        currentRotation.current,
        targetRotation.current,
        delta * 3
      );
      coneRef.current.rotation.z = currentRotation.current;

      // Move up when poured
      const targetY = hasPoured ? 0.5 : 0;
      coneRef.current.position.y = THREE.MathUtils.lerp(
        coneRef.current.position.y,
        targetY,
        delta * 3
      );
    }
  });

  // Opacity based on pour state
  const opacity = hasPoured ? 0.4 : 0.9;

  return (
    <group ref={coneRef} position={position}>
      {/* Cone mesh - tip pointing down */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[RADIUS, HEIGHT, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Cone edge */}
      <mesh position={[0, HEIGHT / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS, 0.015, 8, 32]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Water inside cone (only when not poured) */}
      {!hasPoured && (
        <mesh rotation={[Math.PI, 0, 0]} position={[0, 0.05, 0]}>
          <coneGeometry args={[RADIUS * 0.9, HEIGHT * 0.9, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Label */}
      <Html position={[0, -HEIGHT / 2 - 0.3, 0]} center>
        <div
          className="font-mono font-bold text-white text-xs px-2 py-0.5 rounded whitespace-nowrap"
          style={{
            backgroundColor: hasPoured ? 'rgba(100, 116, 139, 0.9)' : `${color}dd`,
            textDecoration: hasPoured ? 'line-through' : 'none',
          }}
        >
          Cono {index + 1}
        </div>
      </Html>
    </group>
  );
}

// Formula reveal (phase 4)
function FormulaReveal({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <Html position={[0, -2, 0]} center>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl shadow-xl animate-fadeIn">
        <p className="text-center text-lg font-bold">
          V<sub>cono</sub> = <sup>1</sup>&frasl;<sub>3</sub> &times; V<sub>cilindro</sub>
        </p>
        <p className="text-center text-xl font-bold mt-1">
          V = <sup>1</sup>&frasl;<sub>3</sub> &times; &pi; &times; r&sup2; &times; h
        </p>
      </div>
    </Html>
  );
}

// Progress indicator
function ProgressIndicator({ waterLevel }: { waterLevel: number }) {
  const percentage = Math.round(waterLevel * 100);
  const fractionText = waterLevel === 0 ? '0' :
                       waterLevel <= 0.34 ? '1/3' :
                       waterLevel <= 0.67 ? '2/3' : '3/3';

  return (
    <Html position={[-2, -HEIGHT / 2 - 0.8, 0]} center>
      <div className="bg-gray-800/90 px-4 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-24 h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-white font-mono text-sm font-bold min-w-[40px]">
            {fractionText}
          </span>
        </div>
      </div>
    </Html>
  );
}

// Main scene content
function SceneContent({ phase, waterLevel }: ConeScene3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow auto-rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Cone positions
  const conePositions: [number, number, number][] = useMemo(() => [
    [1.5, 0, -CONE_SPACING * 0.8],
    [1.5, 0, 0],
    [1.5, 0, CONE_SPACING * 0.8],
  ], []);

  return (
    <group ref={groupRef}>
      <GlassCylinder waterLevel={waterLevel} />

      {conePositions.map((pos, index) => (
        <Cone
          key={index}
          index={index}
          phase={phase}
          position={pos}
        />
      ))}

      <ProgressIndicator waterLevel={waterLevel} />
      <FormulaReveal visible={phase >= 4} />
    </group>
  );
}

export default function ConeScene3D({ phase, waterLevel }: ConeScene3DProps) {
  return (
    <div className="w-full h-[350px] rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      <Canvas
        camera={{ position: [6, 3, 6], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -5, -10]} intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        <SceneContent phase={phase} waterLevel={waterLevel} />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
