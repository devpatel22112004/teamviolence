import { Suspense, useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Wireframe terrain — an animated hex grid that morphs and reacts to mouse.
 * Cheap on GPU; uses instanced geometry.
 */
function Terrain({ mouseX, mouseY }) {
  const groupRef = useRef()
  const positions = useMemo(() => {
    const arr = []
    const count = 22
    const spacing = 1.2
    for (let x = -count / 2; x < count / 2; x++) {
      for (let z = -count / 2; z < count / 2; z++) {
        arr.push([x * spacing, 0, z * spacing])
      }
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    const children = groupRef.current.children
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      const [x, , z] = positions[i]
      const dist = Math.hypot(x + mouseX.get() * 6, z + mouseY.get() * 6)
      const target = Math.max(-1.5, -dist * 0.18 + Math.sin(t * 0.4 + x * 0.3 + z * 0.3) * 0.4)
      c.position.y += (target - c.position.y) * 0.06
      const s = 0.92 + Math.sin(t * 0.6 + i * 0.02) * 0.04
      c.scale.set(s, s, s)
    }
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1 + mouseX.get() * 0.15
  })

  return (
    <group ref={groupRef} position={[0, -2, 0]} rotation={[-Math.PI / 3.2, 0, 0]}>
      {positions.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <torusGeometry args={[0.45, 0.018, 8, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#a855f7' : '#ec4899'}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Drifting particles — 200 instanced points that flow upward.
 */
function Particles({ count = 200 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.02
      pos[i * 3]     += Math.sin(t * 0.5 + i) * 0.003
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#22d3ee" size={0.05} sizeAttenuation transparent opacity={0.7} />
    </points>
  )
}

/**
 * Mouse tracker — writes mouse position into refs so child components can read it.
 */
function MouseTracker({ mouseX, mouseY }) {
  const { size, viewport } = useThree()
  useEffect(() => {
    const onMove = (e) => {
      mouseX.set((e.clientX / size.width) * 2 - 1)
      mouseY.set(-(e.clientY / size.height) * 2 + 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [size, viewport, mouseX, mouseY])
  return null
}

/**
 * HeroScene — R3F canvas with the wireframe terrain + particles.
 * Falls back to a static CSS gradient if WebGL is unavailable.
 */
export default function HeroScene({ className = '' }) {
  const [supported, setSupported] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const mouseX = useRef(new THREE.Vector2(0, 0)).current
  const mouseY = useRef(new THREE.Vector2(0, 0)).current

  useEffect(() => {
    // Check WebGL + reduced motion
    if (typeof window === 'undefined') return
    try {
      const c = document.createElement('canvas')
      const gl = c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl')
      if (!gl) setSupported(false)
    } catch { setSupported(false) }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setReducedMotion(true)
  }, [])

  if (!supported || reducedMotion) {
    return (
      <div className={['absolute inset-0 aurora-bg pointer-events-none', className].join(' ')} aria-hidden="true" />
    )
  }

  return (
    <div className={['absolute inset-0 pointer-events-none', className].join(' ')} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2.5, 7], fov: 50 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <ambientLight intensity={0.6} />
        <Suspense fallback={null}>
          <MouseTracker mouseX={mouseX} mouseY={mouseY} />
          <Terrain mouseX={mouseX} mouseY={mouseY} />
          <Particles count={180} />
        </Suspense>
      </Canvas>
    </div>
  )
}
