'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Dimensions
const RADIUS = 1;
const HEIGHT = 2;

interface ConeScene3DProps {
  phase: 0 | 1 | 2 | 3 | 4;
}

// Create a cylinder segment (1/3 of a cylinder) geometry
function createCylinderSegment(radius: number, height: number, thetaStart: number, thetaLength: number) {
  const shape = new THREE.Shape();
  const segments = 32;

  // Create pie slice shape
  shape.moveTo(0, 0);
  for (let i = 0; i <= segments; i++) {
    const theta = thetaStart + (i / segments) * thetaLength;
    shape.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
  }
  shape.lineTo(0, 0);

  const extrudeSettings = {
    depth: height,
    bevelEnabled: false,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

// Glass-like cylinder (target container)
function TargetCylinder() {
  return (
    <group position={[0, 0, 0]}>
      {/* Transparent cylinder shell */}
      <mesh>
        <cylinderGeometry args={[RADIUS, RADIUS, HEIGHT, 32, 1, true]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
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
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Label */}
      <Html position={[0, HEIGHT / 2 + 0.4, 0]} center>
        <div className="font-mono font-bold text-white text-sm bg-slate-700/90 px-3 py-1 rounded-lg whitespace-nowrap">
          Cilindro
        </div>
      </Html>
    </group>
  );
}

// Animated cone that transforms into a cylinder segment
interface TransformingConeProps {
  index: number;
  phase: number;
  startPosition: [number, number, number];
  color: string;
  thetaStart: number;
}

function TransformingCone({ index, phase, startPosition, color, thetaStart }: TransformingConeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coneRef = useRef<THREE.Mesh>(null);
  const segmentRef = useRef<THREE.Mesh>(null);

  // Animation states
  const animProgress = useRef(0);
  const morphProgress = useRef(0);

  // This cone activates at its specific phase (1, 2, or 3)
  const activationPhase = index + 1;
  const isActivated = phase >= activationPhase;
  const isTransforming = phase === activationPhase;
  const hasCompleted = phase > activationPhase;

  // Create cylinder segment geometry
  const segmentGeometry = useMemo(() => {
    const geo = createCylinderSegment(RADIUS * 0.98, HEIGHT, thetaStart, Math.PI * 2 / 3);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -HEIGHT / 2, 0);
    return geo;
  }, [thetaStart]);

  useFrame((_, delta) => {
    if (!groupRef.current || !coneRef.current || !segmentRef.current) return;

    const speed = 1.5;

    if (isTransforming) {
      // Phase 1: Morphing (cone fades, segment appears)
      if (morphProgress.current < 1) {
        morphProgress.current = Math.min(1, morphProgress.current + delta * speed);
      } else {
        // Phase 2: Moving to cylinder
        animProgress.current = Math.min(1, animProgress.current + delta * speed * 0.8);
      }
    } else if (hasCompleted) {
      morphProgress.current = 1;
      animProgress.current = 1;
    }

    // Update cone opacity (fade out during morph)
    const coneMaterial = coneRef.current.material as THREE.MeshStandardMaterial;
    coneMaterial.opacity = Math.max(0, 0.9 - morphProgress.current);

    // Update segment opacity (fade in during morph)
    const segmentMaterial = segmentRef.current.material as THREE.MeshStandardMaterial;
    segmentMaterial.opacity = morphProgress.current * 0.85;

    // Interpolate position from start to center (cylinder)
    const targetX = 0;
    const targetY = 0;
    const targetZ = 0;

    groupRef.current.position.x = THREE.MathUtils.lerp(startPosition[0], targetX, animProgress.current);
    groupRef.current.position.y = THREE.MathUtils.lerp(startPosition[1], targetY, animProgress.current);
    groupRef.current.position.z = THREE.MathUtils.lerp(startPosition[2], targetZ, animProgress.current);

    // Scale down cone during morph
    const coneScale = 1 - morphProgress.current * 0.3;
    coneRef.current.scale.setScalar(coneScale);
  });

  // Don't render if not yet activated
  if (!isActivated && phase < activationPhase) {
    return (
      <group position={startPosition}>
        {/* Original cone (waiting) */}
        <mesh rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[RADIUS, HEIGHT, 32]} />
          <meshStandardMaterial color={color} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, HEIGHT / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[RADIUS, 0.015, 8, 32]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <Html position={[0, -HEIGHT / 2 - 0.4, 0]} center>
          <div
            className="font-mono font-bold text-white text-xs px-2 py-0.5 rounded whitespace-nowrap"
            style={{ backgroundColor: `${color}dd` }}
          >
            Cono {index + 1}
          </div>
        </Html>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={startPosition}>
      {/* Original cone (fades out) */}
      <mesh ref={coneRef} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[RADIUS, HEIGHT, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Cone edge */}
      {morphProgress.current < 1 && (
        <mesh position={[0, HEIGHT / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[RADIUS, 0.015, 8, 32]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={1 - morphProgress.current} />
        </mesh>
      )}

      {/* Cylinder segment (fades in and moves) */}
      <mesh ref={segmentRef} geometry={segmentGeometry}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Label */}
      {!hasCompleted && (
        <Html position={[0, -HEIGHT / 2 - 0.4, 0]} center>
          <div
            className="font-mono font-bold text-white text-xs px-2 py-0.5 rounded whitespace-nowrap transition-all"
            style={{ backgroundColor: `${color}dd` }}
          >
            {morphProgress.current < 0.5 ? `Cono ${index + 1}` : `1/3 cilindro`}
          </div>
        </Html>
      )}
    </group>
  );
}

// Filled segments inside the cylinder (appear after animation completes)
interface FilledSegmentProps {
  index: number;
  phase: number;
  color: string;
  thetaStart: number;
}

function FilledSegment({ index, phase, color, thetaStart }: FilledSegmentProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const opacityRef = useRef(0);

  const activationPhase = index + 1;
  const shouldShow = phase > activationPhase;

  const segmentGeometry = useMemo(() => {
    const geo = createCylinderSegment(RADIUS * 0.97, HEIGHT * 0.99, thetaStart, Math.PI * 2 / 3 - 0.02);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -HEIGHT / 2, 0);
    return geo;
  }, [thetaStart]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const targetOpacity = shouldShow ? 0.75 : 0;
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, delta * 3);

    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.opacity = opacityRef.current;
  });

  return (
    <mesh ref={meshRef} geometry={segmentGeometry}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Formula reveal (phase 4)
function FormulaReveal({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <Html position={[0, -2, 0]} center style={{ pointerEvents: 'none' }}>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
        <p className="text-center text-sm font-bold">
          V<sub>cono</sub> = <span className="text-yellow-300">⅓</span> &times; &pi; &times; r&sup2; &times; h
        </p>
      </div>
    </Html>
  );
}

// Progress indicator
function ProgressIndicator({ phase }: { phase: number }) {
  const filledCount = Math.min(phase, 3);
  const fractionText = filledCount === 0 ? '0/3' :
                       filledCount === 1 ? '1/3' :
                       filledCount === 2 ? '2/3' : '3/3';

  return (
    <Html position={[0, -HEIGHT / 2 - 0.9, 0]} center>
      <div className="bg-gray-800/90 px-4 py-2 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-6 h-4 rounded transition-all duration-500 ${
                  i < filledCount
                    ? i === 0 ? 'bg-teal-500' : i === 1 ? 'bg-cyan-500' : 'bg-blue-500'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-white font-mono text-sm font-bold">
            {fractionText}
          </span>
        </div>
      </div>
    </Html>
  );
}

// Main scene content
function SceneContent({ phase }: ConeScene3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow auto-rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  // Cone colors and positions
  const cones = useMemo(() => [
    { color: '#14b8a6', position: [-2.5, 0, 0] as [number, number, number], thetaStart: 0 },
    { color: '#06b6d4', position: [-2.5, 0, 2] as [number, number, number], thetaStart: Math.PI * 2 / 3 },
    { color: '#3b82f6', position: [-2.5, 0, -2] as [number, number, number], thetaStart: Math.PI * 4 / 3 },
  ], []);

  return (
    <group ref={groupRef}>
      {/* Target cylinder */}
      <TargetCylinder />

      {/* Filled segments (appear after each cone transforms) */}
      {cones.map((cone, index) => (
        <FilledSegment
          key={`segment-${index}`}
          index={index}
          phase={phase}
          color={cone.color}
          thetaStart={cone.thetaStart}
        />
      ))}

      {/* Transforming cones */}
      {cones.map((cone, index) => (
        <TransformingCone
          key={`cone-${index}`}
          index={index}
          phase={phase}
          startPosition={cone.position}
          color={cone.color}
          thetaStart={cone.thetaStart}
        />
      ))}

      <ProgressIndicator phase={phase} />
      <FormulaReveal visible={phase >= 4} />
    </group>
  );
}

export default function ConeScene3D({ phase }: ConeScene3DProps) {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      <Canvas
        camera={{ position: [5, 4, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -5, -10]} intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        <SceneContent phase={phase} />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={15}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  );
}
