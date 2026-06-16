import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const features = [
  {
    icon: '◎',
    title: 'Sonar Pulse Navigation',
    description: 'A wave of perception radiates outward, momentarily illuminating the geometry of the world. Navigate by listening to what the pulse reveals.',
    gradient: 'from-bros-cyan/15 to-transparent',
  },
  {
    icon: '◈',
    title: 'Binaural Spatial Audio',
    description: 'Every footstep, drip, and whisper is precisely positioned in 3D space. The world speaks to you, if you know how to listen.',
    gradient: 'from-violet-500/15 to-transparent',
  },
  {
    icon: '◇',
    title: 'Blind-First Design',
    description: 'Fully playable without visual output. Every puzzle, clue, and narrative beat authored with non-visual play as the primary target.',
    gradient: 'from-emerald-500/10 to-transparent',
  },
  {
    icon: '◆',
    title: 'Meta Quest 3 Native',
    description: 'No PC required. The haptic feedback and spatial audio of Quest 3 become the core interaction language of the game.',
    gradient: 'from-orange-500/10 to-transparent',
  },
]

function GameScreenshot({ src, alt, motionEnabled }: { src: string; alt: string; motionEnabled: boolean }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden border border-white/8 aspect-video group hover:border-bros-cyan/30 transition-all duration-300"
      whileHover={motionEnabled ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-bros-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
    </motion.div>
  )
}

export default function FlagshipGame() {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const should = motionEnabled && inView

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])

  return (
    <section
      id="eyes-of-the-soul"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="eots-heading"
    >
      {/* Background glow sphere */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={motionEnabled ? { scale: bgScale, background: 'radial-gradient(ellipse, rgba(0,229,255,0.07) 0%, rgba(123,94,167,0.04) 40%, transparent 70%)' } : { background: 'radial-gradient(ellipse, rgba(0,229,255,0.07) 0%, rgba(123,94,167,0.04) 40%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Dark base */}
      <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(180deg, #04060A 0%, #080C14 50%, #04060A 100%)' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 16 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <span className="tag-pill">Flagship Title</span>
          </motion.div>

          <motion.h2
            id="eots-heading"
            className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-[-0.03em] text-bros-white mb-6"
            initial={motionEnabled ? { opacity: 0, y: 28 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Eyes of the{' '}
            <span className="glow-cyan text-bros-cyan">Soul</span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-bros-muted max-w-2xl mx-auto leading-relaxed"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A VR noir detective game where you see the world through sound.
            Built for <span className="text-bros-white font-semibold">Meta Quest 3</span>. Designed blind-first.
          </motion.p>
        </div>

        {/* Media grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-6"
          initial={motionEnabled ? { opacity: 0, y: 32 } : false}
          animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <GameScreenshot src="/gameplay.jfif" alt="Eyes of the Soul game environment" motionEnabled={motionEnabled} />

          {/* Trailer */}
          <div className="relative rounded-2xl overflow-hidden border border-bros-cyan/20 aspect-video">
            <iframe
              src="https://www.youtube.com/embed/7lND2KRSdrQ"
              title="Eyes of the Soul game trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <GameScreenshot src="/sonar.jfif" alt="Sonar pulse mechanic in Eyes of the Soul" motionEnabled={motionEnabled} />
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="relative p-6 rounded-2xl border border-white/8 bg-bros-charcoal/30 overflow-hidden group
                         hover:border-bros-cyan/25 transition-all duration-300"
              initial={motionEnabled ? { opacity: 0, y: 28, scale: 0.96 } : false}
              animate={should ? { opacity: 1, y: 0, scale: 1 } : motionEnabled ? {} : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={motionEnabled ? { y: -5, transition: { duration: 0.2 } } : undefined}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
              <div className="absolute inset-0 bg-card-shine" aria-hidden="true" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-bros-cyan/10 border border-bros-cyan/20 flex items-center justify-center mb-4
                               group-hover:bg-bros-cyan/20 group-hover:border-bros-cyan/40 transition-all duration-300" aria-hidden="true">
                  <span className="text-bros-cyan text-lg">{f.icon}</span>
                </div>
                <h3 className="font-bold text-bros-white text-base mb-2 leading-tight">{f.title}</h3>
                <p className="text-sm text-bros-muted leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status badge */}
        <motion.div
          className="flex justify-center mt-14"
          initial={motionEnabled ? { opacity: 0 } : false}
          animate={should ? { opacity: 1 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="w-2 h-2 rounded-full bg-bros-cyan animate-pulse-slow shadow-cyan-sm" aria-hidden="true" />
            <span className="text-xs font-medium text-bros-muted">Meta Quest 3</span>
            <span className="w-px h-3 bg-white/15" aria-hidden="true" />
            <span className="text-xs font-semibold text-bros-white">In Development</span>
            <span className="w-px h-3 bg-white/15" aria-hidden="true" />
            <span className="text-xs text-bros-muted">VR · Spatial Audio · Echolocation</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
