import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ─── Sonar ring ───────────────────────────────────────────────────────────────
function SonarRing({ radius, delay }: { radius: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const timeRef = useRef(delay)

  useFrame((_, delta) => {
    if (!ref.current) return
    timeRef.current += delta
    const t = (timeRef.current % 3) / 3 // 0→1 over 3 seconds
    const scale = 1 + t * 4
    ref.current.scale.set(scale, scale, scale)
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = (1 - t) * 0.6
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.03, radius, 96]} />
      <meshBasicMaterial color="#00D4FF" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  )
}

// ─── Floating geometry that reacts to sonar ───────────────────────────────────
function FloatingGeometry({ position, index }: { position: [number, number, number]; index: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const baseY = position[1]
  const speed = 0.3 + (index % 5) * 0.07
  const phase = index * 0.8

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = baseY + Math.sin(clock.elapsedTime * speed + phase) * 0.15
    ref.current.rotation.y += 0.004
    ref.current.rotation.x += 0.002
  })

  return (
    <mesh ref={ref} position={position}>
      {index % 3 === 0 ? (
        <octahedronGeometry args={[0.12, 0]} />
      ) : index % 3 === 1 ? (
        <tetrahedronGeometry args={[0.14, 0]} />
      ) : (
        <icosahedronGeometry args={[0.1, 0]} />
      )}
      <meshStandardMaterial
        color="#00D4FF"
        emissive="#003344"
        roughness={0.4}
        metalness={0.8}
        transparent
        opacity={0.7}
        wireframe={index % 4 === 0}
      />
    </mesh>
  )
}

// ─── Particle field ──────────────────────────────────────────────────────────
function buildParticlePositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 20
    arr[i * 3 + 1] = (Math.random() - 0.5) * 10
    arr[i * 3 + 2] = (Math.random() - 0.5) * 20
  }
  return arr
}

function ParticleField() {
  const count = 800
  const posArray = useRef<Float32Array>(buildParticlePositions(count)).current

  const ref = useRef<THREE.Points>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={ref} positions={posArray} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00D4FF"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  )
}

// ─── Mouse-reactive camera rig ───────────────────────────────────────────────
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.03
    camera.position.y += (-mouse.current.y * 1.5 - camera.position.y + 2) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ─── Ground grid ─────────────────────────────────────────────────────────────
function GroundGrid() {
  return (
    <gridHelper
      args={[40, 40, '#003344', '#001A22']}
      position={[0, -2, 0]}
    />
  )
}

// ─── Full scene ──────────────────────────────────────────────────────────────
const geometryPositions: Array<[number, number, number]> = [
  [-3, 0, -2], [3, 0.5, -3], [-2, -0.5, -5], [4, 0, -6],
  [-4, 0.3, -4], [1, 0, -1.5], [-1, -0.2, -7], [2.5, 0.4, -1],
  [-5, 0, -3], [0.5, 0, -4], [-3, 0.5, -8], [5, -0.3, -5],
]

function SceneContent({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 0]} color="#00D4FF" intensity={2} distance={15} decay={2} />
      <pointLight position={[5, 2, 5]} color="#004466" intensity={1} distance={20} decay={2} />
      <fog attach="fog" args={['#080A0F', 8, 25]} />

      <ParticleField />
      <GroundGrid />

      {/* Sonar rings — 3 staggered */}
      <SonarRing radius={0.5} delay={0} />
      <SonarRing radius={0.5} delay={1} />
      <SonarRing radius={0.5} delay={2} />

      {/* Floating geometry */}
      {geometryPositions.map((pos, i) => (
        <FloatingGeometry key={i} position={pos} index={i} />
      ))}

      <CameraRig mouse={mouse} />
    </>
  )
}

// ─── Exported component ───────────────────────────────────────────────────────
export default function SonarScene() {
  const mouse = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouse.current.x = (e.clientX - rect.left) / rect.width
    mouse.current.y = (e.clientY - rect.top) / rect.height
  }

  return (
    <div
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
      aria-hidden="true" // decorative — text alternatives are in the Hero section
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        tabIndex={-1} // prevents canvas from capturing keyboard focus
      >
        <SceneContent mouse={mouse} />
      </Canvas>
    </div>
  )
}
