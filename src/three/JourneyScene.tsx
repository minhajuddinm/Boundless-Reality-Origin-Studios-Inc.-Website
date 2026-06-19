import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

// --- Seeded pseudorandom so geometry is deterministic ---
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// --- Camera path: position and look-at waypoints ---
const CAM_POS = [
  new THREE.Vector3(0,   0,    12),   // 0: Hero
  new THREE.Vector3(1.5, 0.5,  5),    // 1: Mission
  new THREE.Vector3(0,   0,    -2),   // 2: EOTS approach
  new THREE.Vector3(-1.5, 0,   -12),  // 3: Approach pillars
  new THREE.Vector3(0,   1.5,  -20),  // 4: Founders
  new THREE.Vector3(2,   3,    -16),  // 5: Contact pull-back
]

const CAM_LOOK = [
  new THREE.Vector3(0,  0,   0),
  new THREE.Vector3(0,  0,   2),
  new THREE.Vector3(0,  0,  -9),
  new THREE.Vector3(0,  0,  -16),
  new THREE.Vector3(0,  0.5, -24),
  new THREE.Vector3(0,  1.5, -22),
]

// --- Geometry scattered along the path ---
const GEO: Array<{
  pos: [number, number, number]
  type: number
  color: string
  wire: boolean
  phase: number
  scale: number
}> = Array.from({ length: 50 }, (_, i) => ({
  pos: [
    (sr(i * 3)     - 0.5) * 16,
    (sr(i * 3 + 1) - 0.5) * 8,
    -(sr(i * 3 + 2) * 36 + 2),
  ],
  type: i % 5,
  color: i % 3 === 0 ? '#00E5FF' : i % 3 === 1 ? '#7B5EA7' : '#0099BB',
  wire: i % 4 === 0,
  phase: i * 0.71,
  scale: 0.12 + sr(i * 7) * 0.18,
}))

// --- Sonar pulse ring ---
function SonarRing({
  position, delay, speed, maxScale, color, rotX,
}: {
  position: [number, number, number]
  delay: number
  speed: number
  maxScale: number
  color: string
  rotX: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const t = useRef(delay)
  useFrame((_, dt) => {
    if (!ref.current) return
    t.current += dt
    const p = (t.current % speed) / speed
    ref.current.scale.setScalar(0.1 + p * maxScale)
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity =
      Math.pow(1 - p, 1.6) * 0.65
  })
  return (
    <mesh ref={ref} position={position} rotation={[rotX, 0, 0]}>
      <ringGeometry args={[0.47, 0.5, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.65}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// --- Ambient particles ---
function buildPos(count: number, spreadZ: number): Float32Array {
  const a = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    a[i * 3]     = (sr(i * 4)     - 0.5) * 28
    a[i * 3 + 1] = (sr(i * 4 + 1) - 0.5) * 14
    a[i * 3 + 2] = -(sr(i * 4 + 2) * spreadZ + 1)
  }
  return a
}

function ParticleField({ count, spreadZ, color, size, dir }: {
  count: number; spreadZ: number; color: string; size: number; dir: number
}) {
  const pos = useRef(buildPos(count, spreadZ)).current
  const ref = useRef<THREE.Points>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.015 * dir
  })
  return (
    <Points ref={ref} positions={pos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} opacity={0.38} />
    </Points>
  )
}

// --- Single floating geometry piece ---
function Piece({ pos, type, color, wire, phase, scale }: typeof GEO[0]) {
  const ref = useRef<THREE.Mesh>(null)
  const baseY = pos[1]
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = baseY + Math.sin(clock.elapsedTime * 0.28 + phase) * 0.3
    ref.current.rotation.y += 0.004
    ref.current.rotation.x += 0.002
  })
  return (
    <mesh ref={ref} position={pos} scale={scale}>
      {type === 0 && <octahedronGeometry args={[1, 0]} />}
      {type === 1 && <tetrahedronGeometry args={[1, 0]} />}
      {type === 2 && <icosahedronGeometry args={[1, 0]} />}
      {type === 3 && <dodecahedronGeometry args={[1, 0]} />}
      {type === 4 && <boxGeometry args={[1, 1, 1]} />}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={wire ? 1 : 0.6}
        wireframe={wire}
      />
    </mesh>
  )
}

// --- Camera rig: scroll-driven + idle drift ---
function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const smoothPos  = useRef(new THREE.Vector3(0, 0, 12))
  const smoothLook = useRef(new THREE.Vector3(0, 0, 0))
  const tPos  = useMemo(() => new THREE.Vector3(), [])
  const tLook = useMemo(() => new THREE.Vector3(), [])
  const camCurve  = useMemo(() => new THREE.CatmullRomCurve3(CAM_POS), [])
  const lookCurve = useMemo(() => new THREE.CatmullRomCurve3(CAM_LOOK), [])

  useFrame(({ clock }, dt) => {
    const t = Math.min(Math.max(scrollRef.current, 0), 0.999)
    camCurve.getPoint(t,  tPos)
    lookCurve.getPoint(t, tLook)

    const α = 1 - Math.exp(-4 * dt)
    smoothPos.current.lerp(tPos,   α)
    smoothLook.current.lerp(tLook, α)

    camera.position.copy(smoothPos.current)
    // Idle drift layered on top
    camera.position.x += Math.sin(clock.elapsedTime * 0.35) * 0.08
    camera.position.y += Math.cos(clock.elapsedTime * 0.27) * 0.04
    camera.lookAt(smoothLook.current)
  })
  return null
}

// --- Post-processing ---
function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.4}
        luminanceThreshold={0.25}
        luminanceSmoothing={0.7}
        mipmapBlur
      />
      <Vignette offset={0.35} darkness={0.75} />
    </EffectComposer>
  )
}

// --- Lights spaced along the path ---
function Lights() {
  return (
    <>
      <ambientLight intensity={0.07} />
      <pointLight position={[0, 4,   8]}  color="#00E5FF" intensity={3}   distance={22} decay={2} />
      <pointLight position={[3, 2,   0]}  color="#004466" intensity={1.5} distance={18} decay={2} />
      <pointLight position={[0, 3,  -10]} color="#00E5FF" intensity={2.5} distance={22} decay={2} />
      <pointLight position={[0, 3,  -20]} color="#7B5EA7" intensity={3}   distance={22} decay={2} />
      <pointLight position={[0, 4,  -30]} color="#00E5FF" intensity={2}   distance={22} decay={2} />
    </>
  )
}

// --- Full scene graph ---
function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <>
      <fog attach="fog" args={['#04060A', 6, 45]} />
      <Lights />

      {/* Particles - fewer on mobile */}
      <ParticleField count={isMobile ? 400 : 900}  spreadZ={42} color="#00E5FF" size={0.024} dir={1}  />
      <ParticleField count={isMobile ? 150 : 350}  spreadZ={40} color="#7B5EA7" size={0.018} dir={-1} />

      {/* Sonar pulses: horizontal rings along camera path z-axis */}
      {([0, -5, -10, -15, -20, -25, -30] as number[]).map((z, i) => (
        <SonarRing
          key={`h${i}`}
          position={[0, -0.5, z]}
          delay={i * 0.85}
          speed={4.5 + i * 0.35}
          maxScale={10 + i * 1.2}
          color="#00E5FF"
          rotX={-Math.PI / 2}
        />
      ))}

      {/* Vertical accent rings */}
      {([-8, -16, -24] as number[]).map((z, i) => (
        <SonarRing
          key={`v${i}`}
          position={[0, 0, z]}
          delay={i * 1.6}
          speed={4}
          maxScale={7}
          color="#7B5EA7"
          rotX={0}
        />
      ))}

      {/* Floating geometry along the path - skip half on mobile */}
      {GEO.filter((_, i) => !isMobile || i % 2 === 0).map((g, i) => (
        <Piece key={i} {...g} />
      ))}

      <CameraRig scrollRef={scrollRef} />

      {!isMobile && <Effects />}
    </>
  )
}

// --- Exported canvas component ---
export default function JourneyScene({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      style={{ background: '#04060A' }}
      tabIndex={-1}
    >
      <Scene scrollRef={scrollRef} />
    </Canvas>
  )
}
