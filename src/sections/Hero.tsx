import { Suspense, lazy, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const SonarScene = lazy(() => import('../three/SonarScene'))

function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-grid" aria-hidden="true">
      {[120, 240, 360, 480, 600].map((size) => (
        <div
          key={size}
          className="absolute rounded-full border border-bros-cyan/[0.07]"
          style={{ width: size, height: size }}
        />
      ))}
      <div className="absolute w-3 h-3 rounded-full bg-bros-cyan/80 shadow-cyan-md" />
    </div>
  )
}

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.3 } } },
  item: {
    hidden:  { opacity: 0, y: 36, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)',  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
  },
}

export default function Hero() {
  const { motionEnabled } = useMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY   = useTransform(scrollYProgress, [0, 1], ['0%',  '20%'])
  const contentOp  = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' })
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bros-black pt-24"
      aria-label="Hero section, Boundless Reality Origin Studios"
    >
      {/* 3D or static */}
      {motionEnabled
        ? <Suspense fallback={<StaticFallback />}><SonarScene /></Suspense>
        : <StaticFallback />
      }

      {/* Depth overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 10%, rgba(4,6,10,0.55) 60%, rgba(4,6,10,0.97) 100%)' }} aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(0,229,255,0.08) 0%, transparent 55%)' }} aria-hidden="true" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-bros-black to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-bros-black to-transparent pointer-events-none" aria-hidden="true" />

      {/* Animated scan line */}
      {motionEnabled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-bros-cyan/18 to-transparent"
            animate={{ y: ['-5vh', '105vh'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
          />
        </div>
      )}

      {/* HUD corner brackets on the whole hero */}
      <div className="absolute inset-8 pointer-events-none hidden lg:block" aria-hidden="true">
        <span className="hud-corner hud-corner-tl" />
        <span className="hud-corner hud-corner-tr" />
        <span className="hud-corner hud-corner-bl" />
        <span className="hud-corner hud-corner-br" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={motionEnabled ? { y: contentY, opacity: contentOp } : {}}
      >
        {motionEnabled ? (
          <motion.div variants={stagger.container} initial="hidden" animate="visible">

            {/* Logo */}
            <motion.div variants={stagger.item} className="flex justify-center mb-6">
              <img
                src="/logo.png"
                alt="Boundless Reality Origin Studios"
                className="h-14 sm:h-16 w-auto"
                style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(165deg) drop-shadow(0 0 14px rgba(0,229,255,0.55))' }}
              />
            </motion.div>

            {/* Tag */}
            <motion.div variants={stagger.item} className="flex justify-center mb-8">
              <span className="tag-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-bros-cyan animate-pulse-slow" aria-hidden="true" />
                Accessibility-First Game Studio
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={stagger.item}
              className="text-[clamp(3rem,9vw,7rem)] font-black tracking-[-0.04em] leading-[0.92] mb-8"
            >
              <span className="block text-bros-white">Boundless</span>
              <span className="block">
                <span className="text-bros-white">Reality </span>
                <span className="glow-cyan text-bros-cyan">Origin</span>
              </span>
              <span className="block text-bros-white">Studios</span>
            </motion.h1>

            {/* Cyan divider */}
            <motion.div variants={stagger.item} className="flex justify-center mb-7" aria-hidden="true">
              <div className="w-28 h-px bg-gradient-to-r from-transparent via-bros-cyan/70 to-transparent" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={stagger.item}
              className="text-lg sm:text-xl text-bros-muted max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Building games everyone can play, designed from the ground up for{' '}
              <span className="text-bros-cyan-pale font-semibold">Blind, Low Vision, and all players.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div variants={stagger.item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <motion.button
                onClick={() => scrollTo('eyes-of-the-soul')}
                className="group relative px-8 py-4 rounded-xl bg-bros-cyan text-bros-black font-bold text-sm tracking-wide overflow-hidden
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bros-black"
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,229,255,0.55)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-600" aria-hidden="true" />
                <span className="relative">Explore Eyes of the Soul</span>
              </motion.button>

              <motion.button
                onClick={() => scrollTo('founders')}
                className="px-8 py-4 rounded-xl border border-white/15 text-bros-white font-semibold text-sm tracking-wide
                           hover:border-bros-cyan/50 hover:bg-bros-cyan/5 transition-all duration-300
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Meet the Founders
              </motion.button>
            </motion.div>

            {/* Platform strip */}
            <motion.div variants={stagger.item} className="flex justify-center">
              <div className="flex items-center gap-4 px-5 py-2.5 rounded-full border border-white/8 bg-white/[0.025] glass">
                <span className="text-xs text-bros-muted font-medium">Built for</span>
                <div className="w-px h-3 bg-white/15" aria-hidden="true" />
                <span className="text-xs font-bold text-bros-white">Meta Quest 3</span>
                <div className="w-px h-3 bg-white/15" aria-hidden="true" />
                <span className="text-xs text-bros-muted">VR · Spatial Audio · Echolocation</span>
              </div>
            </motion.div>

          </motion.div>
        ) : (
          /* Static no-motion version */
          <div>
            <div className="flex justify-center mb-6">
              <img
                src="/logo.png"
                alt="Boundless Reality Origin Studios"
                className="h-14 sm:h-16 w-auto"
                style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(165deg) drop-shadow(0 0 14px rgba(0,229,255,0.5))' }}
              />
            </div>
            <div className="flex justify-center mb-8">
              <span className="tag-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-bros-cyan" aria-hidden="true" />
                Accessibility-First Game Studio
              </span>
            </div>
            <h1 className="text-[clamp(3rem,9vw,7rem)] font-black tracking-[-0.04em] leading-[0.92] mb-8">
              <span className="block text-bros-white">Boundless</span>
              <span className="block"><span className="text-bros-white">Reality </span><span className="glow-cyan text-bros-cyan">Origin</span></span>
              <span className="block text-bros-white">Studios</span>
            </h1>
            <p className="text-lg sm:text-xl text-bros-muted max-w-xl mx-auto mb-10">
              Building games everyone can play, designed from the ground up for{' '}
              <span className="text-bros-cyan-pale font-semibold">Blind, Low Vision, and all players.</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => scrollTo('eyes-of-the-soul')} className="px-8 py-4 rounded-xl bg-bros-cyan text-bros-black font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Explore Eyes of the Soul
              </button>
              <button onClick={() => scrollTo('founders')} className="px-8 py-4 rounded-xl border border-white/15 text-bros-white font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan">
                Meet the Founders
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Scroll cue */}
      {motionEnabled && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          aria-hidden="true"
        >
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-bros-cyan/70"
              animate={{ y: [0, 9, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-[10px] tracking-[0.22em] text-bros-muted/50 uppercase">scroll</span>
        </motion.div>
      )}
    </section>
  )
}
