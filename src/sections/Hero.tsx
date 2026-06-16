import { Suspense, lazy, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const SonarScene = lazy(() => import('../three/SonarScene'))

function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      {[120, 240, 360, 480, 600].map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full border border-bros-cyan/[0.08]"
          style={{ width: size, height: size, animationDelay: `${i * 0.5}s` }}
        />
      ))}
      <div className="absolute w-3 h-3 rounded-full bg-bros-cyan/80 shadow-cyan-md" />
    </div>
  )
}

const stagger = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  },
  item: {
    hidden:  { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
}

export default function Hero() {
  const { motionEnabled } = useMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const scrollToGame = () => {
    const el = document.getElementById('eyes-of-the-soul')
    if (el) el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' })
  }
  const scrollToFounders = () => {
    window.location.href = '/founders'
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bros-black"
      aria-label="Hero — Boundless Reality Origin Studios"
    >
      {/* 3D scene */}
      {motionEnabled ? (
        <Suspense fallback={<StaticFallback />}>
          <SonarScene />
        </Suspense>
      ) : (
        <StaticFallback />
      )}

      {/* Layered gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 10%, rgba(4,6,10,0.55) 60%, rgba(4,6,10,0.95) 100%)' }} />
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-bros-black to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-bros-black to-transparent pointer-events-none" aria-hidden="true" />

      {/* Scan line effect */}
      {motionEnabled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-bros-cyan/20 to-transparent"
            animate={{ y: ['-5vh', '105vh'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />
        </div>
      )}

      {/* Main content with parallax */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pb-20"
        style={motionEnabled ? { y: contentY, opacity: contentOpacity } : {}}
      >
        {motionEnabled ? (
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="visible"
          >
            {/* Tag pill */}
            <motion.div variants={stagger.item} className="flex justify-center mb-8">
              <span className="tag-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-bros-cyan animate-pulse-slow" aria-hidden="true" />
                Accessibility-First Game Studio
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={stagger.item}
              className="text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-black tracking-[-0.03em] leading-[0.95] mb-7"
            >
              <span className="block text-bros-white">Boundless</span>
              <span className="block">
                <span className="text-bros-white">Reality </span>
                <span className="glow-cyan text-bros-cyan">Origin</span>
              </span>
              <span className="block text-bros-white">Studios</span>
            </motion.h1>

            {/* Divider line */}
            <motion.div variants={stagger.item} className="flex justify-center mb-7" aria-hidden="true">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-bros-cyan/60 to-transparent" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={stagger.item}
              className="text-lg sm:text-xl text-bros-muted max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Building games everyone can play, designed for{' '}
              <span className="text-bros-cyan-pale font-medium">
                every kind of player from the ground up.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div variants={stagger.item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={scrollToGame}
                className="group relative px-8 py-4 rounded-xl bg-bros-cyan text-bros-black font-bold text-sm tracking-wide overflow-hidden
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bros-black"
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0,229,255,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer on hover */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" aria-hidden="true" />
                <span className="relative">Explore Eyes of the Soul →</span>
              </motion.button>

              <motion.button
                onClick={scrollToFounders}
                className="px-8 py-4 rounded-xl border border-white/15 text-bros-white font-semibold text-sm tracking-wide
                           hover:border-bros-cyan/50 hover:bg-bros-cyan/5 transition-all duration-300
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Meet the Founders
              </motion.button>
            </motion.div>

            {/* Platform badge */}
            <motion.div variants={stagger.item} className="flex justify-center mt-10">
              <div className="flex items-center gap-4 px-4 py-2 rounded-full border border-white/8 bg-white/[0.03]">
                <span className="text-xs text-bros-muted">Built for</span>
                <div className="w-px h-3 bg-white/15" aria-hidden="true" />
                <span className="text-xs font-semibold text-bros-white">Meta Quest 3</span>
                <div className="w-px h-3 bg-white/15" aria-hidden="true" />
                <span className="text-xs text-bros-muted">VR · Spatial Audio · Echolocation</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Static (no-motion) version */
          <div>
            <div className="flex justify-center mb-8">
              <span className="tag-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-bros-cyan" aria-hidden="true" />
                Accessibility-First Game Studio
              </span>
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-[6.5rem] font-black tracking-[-0.03em] leading-[0.93] mb-7">
              <span className="block text-bros-white">Boundless</span>
              <span className="block">
                <span className="text-bros-white">Reality </span>
                <span className="glow-cyan text-bros-cyan">Origin</span>
              </span>
              <span className="block text-bros-white">Studios</span>
            </h1>
            <p className="text-lg sm:text-xl text-bros-muted max-w-xl mx-auto mb-10">
              Building games everyone can play, designed for{' '}
              <span className="text-bros-cyan-pale font-medium">every kind of player from the ground up.</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={scrollToGame} className="px-8 py-4 rounded-xl bg-bros-cyan text-bros-black font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Explore Eyes of the Soul →
              </button>
              <button onClick={scrollToFounders} className="px-8 py-4 rounded-xl border border-white/15 text-bros-white font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan">
                Meet the Founders
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Scroll cue */}
      {motionEnabled && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          aria-hidden="true"
        >
          <motion.div
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-bros-cyan/70"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="text-[10px] tracking-[0.2em] text-bros-muted/50 uppercase">scroll</span>
        </motion.div>
      )}
    </section>
  )
}
