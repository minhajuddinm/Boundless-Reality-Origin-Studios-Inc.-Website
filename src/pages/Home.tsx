import { Suspense, lazy, useRef, useEffect } from 'react'
import { useMotion } from '../context/MotionContext'

// Static (reduced-motion) sections
import Hero from '../sections/Hero'
import Mission from '../sections/Mission'
import FlagshipGame from '../sections/FlagshipGame'
import Approach from '../sections/Approach'
import Founders from '../sections/Founders'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

// Immersive journey mode (lazy-loaded)
const JourneyScene = lazy(() => import('../three/JourneyScene'))
const JourneyHome  = lazy(() => import('./JourneyHome'))

// Simple dark fallback while R3F loads
function CanvasFallback() {
  return <div className="w-full h-full" style={{ background: '#04060A' }} />
}

export default function Home() {
  const { motionEnabled } = useMotion()
  const scrollRef = useRef<number>(0)

  // Track scroll progress [0–1] for the 3D camera rig
  useEffect(() => {
    if (!motionEnabled) return
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0) scrollRef.current = window.scrollY / max
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [motionEnabled])

  // ── Reduced-motion / no-3D mode ──────────────────────────────
  if (!motionEnabled) {
    return (
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Mission />
        <FlagshipGame />
        <Approach />
        <Founders />
        <Contact />
        <Footer />
      </main>
    )
  }

  // ── Immersive journey mode ────────────────────────────────────
  return (
    <main id="main-content" tabIndex={-1}>
      {/*
        The 3D canvas lives in a fixed layer behind everything.
        It is purely decorative; aria-hidden removes it from the AT tree.
        pointer-events: none lets all clicks/scroll pass through to the content.
      */}
      <div
        className="fixed inset-0 z-0"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={<CanvasFallback />}>
          <JourneyScene scrollRef={scrollRef} />
        </Suspense>
      </div>

      {/*
        Content scrolls on top of the canvas.
        Sections are transparent so the 3D world shows through;
        glass scrims behind text ensure WCAG AA contrast.
      */}
      <div className="relative z-10">
        <Suspense fallback={null}>
          <JourneyHome />
        </Suspense>
      </div>
    </main>
  )
}
