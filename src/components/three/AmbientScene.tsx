"use client";

import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

/**
 * AmbientScene — a lightweight, decorative, **fully offline** 3D backdrop.
 *
 * IMPORTANT: This scene must NOT fetch any external assets. In particular it
 * must NOT use drei `<Environment preset="...">`, which downloads an HDRI
 * (e.g. potsdamer_platz_1k.hdr) from a CDN at runtime — that fails under
 * blocked/sanctioned networks and crashes the whole page. All lighting here is
 * provided by standard Three.js lights, so it works 100% offline / in a
 * Capacitor WebView.
 *
 * Performance: dpr capped at [1, 1.5], one mesh + one Sparkles system,
 * frameloop continuous. Wrap the lazy-loaded parent in `aria-hidden`.
 */

function FloatingCore() {
  const meshRef = useRef<Mesh>(null);

  // Standard request-frame hook: use the built-in clock via state.clock,
  // never a manually-created THREE.Clock that needs separate updating.
  useFrame((state) => {
    const m = meshRef.current;
    if (!m) return;
    const t = state.clock.getElapsedTime();
    m.rotation.x = t * 0.15;
    m.rotation.y = t * 0.2;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.6}
          distort={0.35}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

export function AmbientScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        {/* All-local lighting — no HDRI / Environment download. */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#2dd4bf" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#38bdf8" />

        <FloatingCore />

        {/* Floating sparkle field (pure geometry — no external textures). */}
        <Sparkles
          count={60}
          scale={[10, 6, 4]}
          size={3}
          speed={0.3}
          opacity={0.7}
          color="#e0f2fe"
        />
      </Suspense>
    </Canvas>
  );
}
