import { Suspense, lazy, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Lazy load the Canvas component
const Canvas = lazy(() => 
  import("@react-three/fiber").then(module => ({ default: module.Canvas }))
);

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#7C3AED"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function InnerGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshBasicMaterial color="#8B5CF6" transparent opacity={0.6} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7C3AED" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
      <AnimatedSphere />
      <InnerGlow />
    </>
  );
}

// Fallback for loading/mobile
function Fallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl animate-pulse" />
    </div>
  );
}

// Check if device is likely mobile/tablet for performance
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      // Check for touch device and screen size
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

  // Delay 3D rendering to prioritize LCP
  useEffect(() => {
    if (isDesktop) {
      const timer = setTimeout(() => setShouldRender(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isDesktop]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Static fallback for mobile and initial load */}
      {!shouldRender && <Fallback />}
      
      {/* 3D Canvas for desktop only */}
      {shouldRender && isDesktop && (
        <Suspense fallback={<Fallback />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
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
