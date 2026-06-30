import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function NetworkSphere() {
  const ref = useRef<THREE.Points>(null)

  const [positions, connections] = useMemo(() => {
    const count = 800
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.2 + Math.random() * 0.3
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }

    const lineCount = 200
    const lines = new Float32Array(lineCount * 6)
    for (let i = 0; i < lineCount; i++) {
      const idx1 = Math.floor(Math.random() * count)
      const idx2 = Math.floor(Math.random() * count)
      lines[i * 6] = pos[idx1 * 3]
      lines[i * 6 + 1] = pos[idx1 * 3 + 1]
      lines[i * 6 + 2] = pos[idx1 * 3 + 2]
      lines[i * 6 + 3] = pos[idx2 * 3]
      lines[i * 6 + 4] = pos[idx2 * 3 + 1]
      lines[i * 6 + 5] = pos[idx2 * 3 + 2]
    }

    return [pos, lines]
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.08
      ref.current.rotation.x += delta * 0.03
    }
  })

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3B82F6"
          size={0.015}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.08} />
      </lineSegments>
    </group>
  )
}

function GlobeWireframe() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial
        color="#3B82F6"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <NetworkSphere />
      <GlobeWireframe />
    </>
  )
}

export function NetworkGlobe() {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
        <div className="w-64 h-64 rounded-full border border-primary/20 glow-blue animate-pulse" />
      </div>
    )
  }

  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
