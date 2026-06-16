import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const SonarScene = lazy(() => import('../three/SonarScene'))

// Static fallback shown when motion/3D is disabled
function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      {/* Concentric sonar circles — CSS only */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-bros-cyan/20"
          style={{ width: `${i * 18}%`, height: `${i * 18}%` }}
        />
      ))}
      <div className="w-3 h-3 rounded-full bg-bros-cyan/60" />
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const { motionEnabled } = useMotion()

  const scrollToGame = () => {
    const el = document.getElementById('eyes-of-the-soul')
    if (el) el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bros-black"
      aria-label="Hero — Boundless Reality Origin Studios"
    >
      {/* 3D scene or static fallback */}
      {motionEnabled ? (
        <Suspense fallback={<StaticFallback />}>
          <SonarScene />
        </Suspense>
      ) : (
        <StaticFallback />
      )}

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(8,10,15,0.7) 70%, #080A0F 100%)',
        }}
        aria-hidden="true"
      />

      {/* Gradient from black at top (nav clearance) */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #080A0F 0%, transparent 100%)' }}
        aria-hidden="true"
      />
      {/* Gradient to black at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, #080A0F 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Studio type label */}
        {motionEnabled ? (
          <motion.p
            className="text-bros-cyan text-xs font-semibold tracking-[0.25em] uppercase mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            Accessibility-First Game Studio
          </motion.p>
        ) : (
          <p className="text-bros-cyan text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Accessibility-First Game Studio
          </p>
        )}

        {/* Main heading */}
        {motionEnabled ? (
          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.25}
          >
            <span className="text-bros-white">Boundless</span>
            <br />
            <span className="text-bros-white">Reality</span>{' '}
            <span className="glow-cyan text-bros-cyan">Origin</span>
            <br />
            <span className="text-bros-white">Studios</span>
          </motion.h1>
        ) : (
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
            <span className="text-bros-white">Boundless</span>
            <br />
            <span className="text-bros-white">Reality</span>{' '}
            <span className="glow-cyan text-bros-cyan">Origin</span>
            <br />
            <span className="text-bros-white">Studios</span>
          </h1>
        )}

        {/* Tagline */}
        {motionEnabled ? (
          <motion.p
            className="text-lg sm:text-xl text-bros-muted max-w-2xl mx-auto mb-10 text-balance"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            Building games everyone can play — designed from the ground up for
            Blind, Low Vision, and all players.
          </motion.p>
        ) : (
          <p className="text-lg sm:text-xl text-bros-muted max-w-2xl mx-auto mb-10 text-balance">
            Building games everyone can play — designed from the ground up for
            Blind, Low Vision, and all players.
          </p>
        )}

        {/* CTAs */}
        {motionEnabled ? (
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.55}
          >
            <HeroCTAs onPrimary={scrollToGame} />
          </motion.div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <HeroCTAs onPrimary={scrollToGame} />
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bros-muted/50"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-bros-muted/30 to-transparent" />
      </div>
    </section>
  )
}

function HeroCTAs({ onPrimary }: { onPrimary: () => void }) {
  return (
    <>
      <button
        onClick={onPrimary}
        className="px-8 py-4 bg-bros-cyan text-bros-black font-bold text-sm tracking-wide rounded-md
                   hover:bg-white transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bros-black"
      >
        Explore Eyes of the Soul
      </button>
      <a
        href="/founders"
        className="px-8 py-4 border border-white/20 text-bros-white font-semibold text-sm tracking-wide rounded-md
                   hover:border-bros-cyan/60 hover:text-bros-cyan transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
      >
        Meet the Team
      </a>
    </>
  )
}
