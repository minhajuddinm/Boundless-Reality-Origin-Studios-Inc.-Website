import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function SonarRing({ delay, speed = 3 }: { delay: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const t = useRef(delay)
  useFrame((_, delta) => {
    if (!ref.current) return
    t.current += delta
    const progress = (t.current % speed) / speed
    ref.current.scale.setScalar(0.5 + progress * 5)
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - progress) * 0.55
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.45, 0.5, 128]} />
      <meshBasicMaterial color="#00E5FF" transparent opacity={0.55} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function VerticalRing({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const t = useRef(delay)
  useFrame((_, delta) => {
    if (!ref.current) return
    t.current += delta
    const progress = (t.current % 4) / 4
    ref.current.scale.setScalar(0.3 + progress * 3)
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - progress) * 0.25
  })
  return (
    <mesh ref={ref}>
      <ringGeometry args={[0.48, 0.5, 64]} />
      <meshBasicMaterial color="#7B5EA7" transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function CentralOrb() {
  const ref = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.4
    if (innerRef.current) innerRef.current.rotation.y = -clock.elapsedTime * 0.7
  })
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial color="#00E5FF" emissive="#003355" emissiveIntensity={0.8} roughness={0.2} metalness={0.9} wireframe />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#7B5EA7" emissive="#3B1E6B" emissiveIntensity={1} roughness={0.1} metalness={1} />
      </mesh>
      <pointLight color="#00E5FF" intensity={3} distance={6} decay={2} />
    </group>
  )
}

function FloatingGeometry({ position, index }: { position: [number, number, number]; index: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const baseY = position[1]
  const speed = 0.25 + (index % 5) * 0.06
  const phase = index * 1.1

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = baseY + Math.sin(clock.elapsedTime * speed + phase) * 0.2
    ref.current.rotation.y += 0.005
    ref.current.rotation.x += 0.003
  })

  const isWire = index % 3 === 0
  const color = index % 2 === 0 ? '#00E5FF' : '#7B5EA7'
  const emissive = index % 2 === 0 ? '#002233' : '#2A1050'

  return (
    <mesh ref={ref} position={position}>
      {index % 4 === 0 ? <octahedronGeometry args={[0.14, 0]} />
      : index % 4 === 1 ? <tetrahedronGeometry args={[0.16, 0]} />
      : index % 4 === 2 ? <icosahedronGeometry args={[0.11, 0]} />
      :                   <dodecahedronGeometry args={[0.10, 0]} />}
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.9}
        transparent
        opacity={isWire ? 1 : 0.75}
        wireframe={isWire}
      />
    </mesh>
  )
}

function buildParticlePositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    arr[i * 3]     = (Math.random() - 0.5) * 22
    arr[i * 3 + 1] = (Math.random() - 0.5) * 12
    arr[i * 3 + 2] = (Math.random() - 0.5) * 22
  }
  return arr
}

function ParticleField() {
  const posArray = useRef<Float32Array>(buildParticlePositions(1200)).current
  const ref = useRef<THREE.Points>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.018
  })
  return (
    <Points ref={ref} positions={posArray} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00E5FF" size={0.022} sizeAttenuation depthWrite={false} opacity={0.45} />
    </Points>
  )
}

function VioletParticles() {
  const posArray = useRef<Float32Array>(buildParticlePositions(400)).current
  const ref = useRef<THREE.Points>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = -clock.elapsedTime * 0.012
  })
  return (
    <Points ref={ref} positions={posArray} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#7B5EA7" size={0.018} sizeAttenuation depthWrite={false} opacity={0.35} />
    </Points>
  )
}

function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.current.x * 2.5 - camera.position.x) * 0.025
    camera.position.y += (-mouse.current.y * 1.8 + 2 - camera.position.y) * 0.025
    camera.lookAt(0, 0, 0)
  })
  return null
}

function HexGrid() {
  return (
    <gridHelper args={[50, 50, '#001A2A', '#000F18']} position={[0, -2.5, 0]} />
  )
}

const geometryPositions: Array<[number, number, number]> = [
  [-3.5, 0.2, -2.5], [3.5, 0.5, -3], [-2.5, -0.4, -5.5], [4.5, 0.2, -6],
  [-4.5, 0.4, -4.5], [1.2, 0.1, -1.8], [-1.5, -0.2, -7], [3, 0.5, -1.2],
  [-5.5, 0.1, -3.5], [0.8, 0, -4.5], [-3.5, 0.6, -8], [5.5, -0.2, -5],
  [2, 0.3, -9], [-2, 0.1, -1.2], [6, 0.4, -2],
]

function SceneContent({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 6, 2]}  color="#00E5FF" intensity={4}   distance={18} decay={2} />
      <pointLight position={[6, 2, 6]}  color="#004466" intensity={1.5} distance={20} decay={2} />
      <pointLight position={[-6, 3, 4]} color="#3B1E6B" intensity={2}   distance={20} decay={2} />
      <fog attach="fog" args={['#04060A', 10, 28]} />

      <ParticleField />
      <VioletParticles />
      <HexGrid />
      <CentralOrb />

      <SonarRing delay={0}   speed={3} />
      <SonarRing delay={1}   speed={3} />
      <SonarRing delay={2}   speed={3} />
      <SonarRing delay={0.5} speed={4.5} />
      <VerticalRing delay={0} />
      <VerticalRing delay={2} />

      {geometryPositions.map((pos, i) => (
        <FloatingGeometry key={i} position={pos} index={i} />
      ))}

      <CameraRig mouse={mouse} />
    </>
  )
}

export default function SonarScene() {
  const mouse = useRef({ x: 0.5, y: 0.5 })

  return (
    <div
      className="absolute inset-0"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mouse.current.x = (e.clientX - r.left) / r.width
        mouse.current.y = (e.clientY - r.top)  / r.height
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 2.5, 9], fov: 52 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        tabIndex={-1}
      >
        <SceneContent mouse={mouse} />
      </Canvas>
    </div>
  )
}
