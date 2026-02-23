import { Suspense, lazy, useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Wireframe } from "@react-three/drei";
import * as THREE from "three";

const Canvas = lazy(() => 
  import("@react-three/fiber").then(module => ({ default: module.Canvas }))
);

/* ── Core shape: distorted icosahedron with glass-like depth ── */
function CoreShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <icosahedronGeometry args={[1, 3]} />
      <MeshDistortMaterial
        color="#B8B0A8"
        attach="material"
        distort={0.35}
        speed={1.5}
        roughness={0.12}
        metalness={0.92}
        emissive="#A09890"
        emissiveIntensity={0.04}
      />
    </mesh>
  );
}

/* ── Wireframe shell: slightly larger, gives structural depth ── */
function WireframeShell() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.15}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial transparent opacity={0} />
      <Wireframe
        simplify
        stroke="#FFFFFF"
        backfaceStroke="#FFFFFF"
        thickness={0.003}
        fillOpacity={0}
        fillMix={0}
        squeeze
      />
    </mesh>
  );
}

/* ── Orbiting rings for architectural feel ── */
function OrbitalRing({ radius, tilt, speed, opacity }: { radius: number; tilt: [number, number, number]; speed: number; opacity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={meshRef} rotation={tilt}>
      <torusGeometry args={[radius, 0.008, 16, 128]} />
      <meshBasicMaterial color="#FFFFFF" transparent opacity={opacity} />
    </mesh>
  );
}

/* ── Floating particles around the object ── */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, count } = useMemo(() => {
    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions, count };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FFFFFF"
        size={0.015}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[-6, -6, -8]} intensity={0.5} color="#D8D0C8" />
      <pointLight position={[0, 6, 5]} intensity={0.4} color="#FFFFFF" />
      <pointLight position={[-4, 3, -6]} intensity={0.25} color="#C8C0B8" />

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <CoreShape />
        <WireframeShell />
        <OrbitalRing radius={2.8} tilt={[0.5, 0.3, 0]} speed={0.06} opacity={0.15} />
        <OrbitalRing radius={3.2} tilt={[-0.8, 0.6, 0.2]} speed={-0.04} opacity={0.08} />
        <Particles />
      </Float>
    </>
  );
}

function Fallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-foreground/5 blur-3xl animate-pulse" />
    </div>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isLargeScreen = window.innerWidth >= 768;
      const hasGoodGPU = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      setIsDesktop(isLargeScreen && !isTouchDevice && hasGoodGPU);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return isDesktop;
}

export function Scene3D() {
  const isDesktop = useIsDesktop();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      const timer = setTimeout(() => setShouldRender(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isDesktop]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Soft ambient glow behind 3D object */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.10] blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(25 8% 85% / 0.5), hsl(0 0% 100% / 0.12), transparent 70%)' }}
      />

      {!shouldRender && <Fallback />}
      
      {shouldRender && isDesktop && (
        <Suspense fallback={<Fallback />}>
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 42 }}
            dpr={[1, 1.5]}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
            performance={{ min: 0.5 }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
