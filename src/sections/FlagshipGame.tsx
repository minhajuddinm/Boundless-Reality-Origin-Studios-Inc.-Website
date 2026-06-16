import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const features = [
  {
    icon: '◎',
    title: 'Sonar Pulse Navigation',
    description:
      'A wave of perception radiates outward from the player, momentarily illuminating the geometry of the world. Navigate by listening to what the pulse reveals.',
  },
  {
    icon: '◈',
    title: 'Binaural Spatial Audio',
    description:
      'Every footstep, drip, and whisper is precisely positioned in 3D space. The world speaks to you — if you know how to listen.',
  },
  {
    icon: '◇',
    title: 'Blind-First Design',
    description:
      'The game is fully playable without visual output. Every puzzle, clue, and narrative beat is authored with non-visual play as the primary target.',
  },
  {
    icon: '◆',
    title: 'Meta Quest 3 Native',
    description:
      'Built for standalone VR. No PC required. The haptic feedback and spatial audio of Quest 3 become the core interaction language.',
  },
]

// Placeholder screenshot slot
function ScreenshotPlaceholder({ label, index }: { label: string; index: number }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-white/10 bg-bros-charcoal/60 aspect-video
                 flex flex-col items-center justify-center gap-3 group
                 hover:border-bros-cyan/40 transition-colors duration-300"
      role="img"
      aria-label={`${label} — placeholder for game screenshot ${index + 1}`}
    >
      <div className="w-12 h-12 rounded-full border-2 border-dashed border-bros-cyan/30 flex items-center justify-center" aria-hidden="true">
        <span className="text-bros-cyan/50 text-xl">◎</span>
      </div>
      <p className="text-xs text-bros-muted text-center px-4">
        {/* PLACEHOLDER: Replace with actual game screenshot */}
        {label}
      </p>
      <span className="absolute top-3 right-3 text-[10px] font-mono text-bros-cyan/30 border border-bros-cyan/20 px-2 py-0.5 rounded">
        placeholder
      </span>
    </div>
  )
}

export default function FlagshipGame() {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldAnimate = motionEnabled && inView

  return (
    <section
      id="eyes-of-the-soul"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="eots-heading"
      style={{ background: 'linear-gradient(180deg, #080A0F 0%, #0A1018 50%, #080A0F 100%)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            className="text-bros-cyan text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            initial={motionEnabled ? { opacity: 0, y: 16 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Flagship Title
          </motion.p>

          <motion.h2
            id="eots-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-bros-white mb-6"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Eyes of the{' '}
            <span className="glow-cyan text-bros-cyan">Soul</span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-bros-muted max-w-2xl mx-auto text-balance"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A VR noir detective game where you see the world through sound.
            Built for Meta Quest 3. Designed blind-first.
          </motion.p>
        </div>

        {/* Media row */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-20"
          initial={motionEnabled ? { opacity: 0, y: 32 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <ScreenshotPlaceholder label="Game environment screenshot" index={0} />
          {/* Trailer placeholder — center, larger */}
          <div
            className="relative rounded-xl overflow-hidden border border-bros-cyan/20 bg-bros-charcoal/60 aspect-video
                       flex flex-col items-center justify-center gap-3 col-span-full md:col-span-1
                       hover:border-bros-cyan/50 transition-colors duration-300 cursor-pointer group"
            role="img"
            aria-label="Eyes of the Soul — game trailer placeholder. Replace with embedded trailer video."
          >
            <div
              className="w-16 h-16 rounded-full border-2 border-bros-cyan/50 flex items-center justify-center
                         group-hover:bg-bros-cyan/10 transition-colors duration-200"
              aria-hidden="true"
            >
              <span className="text-bros-cyan text-2xl ml-1">▶</span>
            </div>
            <p className="text-sm text-bros-muted">Watch Trailer</p>
            {/* PLACEHOLDER: Replace with <iframe> or <video> trailer embed */}
            <span className="absolute top-3 right-3 text-[10px] font-mono text-bros-cyan/30 border border-bros-cyan/20 px-2 py-0.5 rounded">
              trailer placeholder
            </span>
          </div>
          <ScreenshotPlaceholder label="Sonar pulse mechanic screenshot" index={1} />
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="p-6 rounded-xl border border-white/8 bg-bros-charcoal/30
                         hover:border-bros-cyan/30 hover:bg-bros-charcoal/50
                         transition-all duration-300 group"
              initial={motionEnabled ? { opacity: 0, y: 24 } : false}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.4 }}
            >
              <div
                className="w-10 h-10 rounded-lg bg-bros-cyan/10 border border-bros-cyan/20 flex items-center justify-center mb-4
                           group-hover:bg-bros-cyan/20 transition-colors duration-200"
                aria-hidden="true"
              >
                <span className="text-bros-cyan text-lg">{f.icon}</span>
              </div>
              <h3 className="font-bold text-bros-white text-base mb-2">{f.title}</h3>
              <p className="text-sm text-bros-muted leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Platform badge */}
        <motion.div
          className="flex items-center justify-center mt-16 gap-3"
          initial={motionEnabled ? { opacity: 0 } : false}
          animate={shouldAnimate ? { opacity: 1 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="px-4 py-2 rounded-full border border-white/15 bg-bros-charcoal/40 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bros-cyan animate-pulse-slow" aria-hidden="true" />
            <span className="text-xs text-bros-muted font-medium">Meta Quest 3 · In Development</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
