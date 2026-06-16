import { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const pillars = [
  {
    number: '01',
    title: 'Spatial Audio Design',
    description: 'We treat sound as primary geometry. Every environment is authored as an acoustic space first. Visuals are a second layer of expression, not a requirement.',
    accentGrad: 'from-bros-cyan/18 to-transparent',
    border: 'hover:border-bros-cyan/40',
    dot: 'bg-bros-cyan shadow-cyan-sm',
    iconColor: 'text-bros-cyan',
    glow: 'rgba(0,229,255,0.08)',
  },
  {
    number: '02',
    title: 'Cross-Modal Interaction',
    description: 'Gameplay mechanics translate across senses. If a puzzle solves visually, it must solve equally through audio and haptics. No modality is privileged.',
    accentGrad: 'from-violet-500/18 to-transparent',
    border: 'hover:border-violet-400/40',
    dot: 'bg-violet-400',
    iconColor: 'text-violet-400',
    glow: 'rgba(123,94,167,0.1)',
  },
  {
    number: '03',
    title: 'Universal Design',
    description: 'Accessible design is better design for everyone. Our games are richer because we refuse to segment our audience into "normal" and "accessible."',
    accentGrad: 'from-emerald-500/14 to-transparent',
    border: 'hover:border-emerald-400/40',
    dot: 'bg-emerald-400',
    iconColor: 'text-emerald-400',
    glow: 'rgba(52,211,153,0.08)',
  },
  {
    number: '04',
    title: 'Community-Driven Testing',
    description: 'Blind and Low Vision players are co-developers, not afterthoughts. We build feedback loops directly into production from day one.',
    accentGrad: 'from-orange-500/14 to-transparent',
    border: 'hover:border-orange-400/40',
    dot: 'bg-orange-400',
    iconColor: 'text-orange-400',
    glow: 'rgba(251,146,60,0.08)',
  },
]

function PillarCard({ pillar, index, should }: { pillar: typeof pillars[0]; index: number; should: boolean }) {
  const { motionEnabled } = useMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]),  { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]),  { stiffness: 300, damping: 30 })
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      className={`relative p-8 rounded-2xl border border-white/8 gaming-card overflow-hidden group cursor-default ${pillar.border}`}
      role="listitem"
      style={motionEnabled ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 } : {}}
      onMouseMove={(e) => {
        if (!motionEnabled || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width  - 0.5)
        y.set((e.clientY - r.top)  / r.height - 0.5)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      initial={motionEnabled ? { opacity: 0, y: 36, scale: 0.97 } : false}
      animate={should ? { opacity: 1, y: 0, scale: 1 } : motionEnabled ? {} : { opacity: 1 }}
      transition={{ duration: 0.65, delay: 0.12 * index + 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hover glow gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accentGrad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />

      {/* Corner light source */}
      <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse, ${pillar.glow} 0%, transparent 70%)` }} aria-hidden="true" />

      {/* HUD corners */}
      <span className="hud-corner hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      <span className="hud-corner hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span className="text-7xl font-black leading-none select-none" style={{ color: 'rgba(255,255,255,0.03)' }} aria-hidden="true">{pillar.number}</span>
          <div className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${pillar.dot} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-bros-white mb-3 leading-tight">{pillar.title}</h3>
        <p className="text-bros-muted leading-relaxed text-sm sm:text-base">{pillar.description}</p>
      </div>
    </motion.div>
  )
}

export default function Approach() {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const should = motionEnabled && inView

  return (
    <section
      id="approach"
      ref={ref}
      className="relative py-32 px-6 bg-bros-black overflow-hidden"
      aria-labelledby="approach-heading"
    >
      {/* Perspective grid floor */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(123,94,167,0.07) 0%, transparent 60%)' }} aria-hidden="true" />

      <div className="section-divider max-w-7xl mx-auto mb-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={motionEnabled ? { opacity: 0, y: 16 } : false}
              animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-5"
            >
              <span className="tag-pill">How We Build</span>
            </motion.div>
            <motion.h2
              id="approach-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-bros-white leading-[1.05]"
              initial={motionEnabled ? { opacity: 0, y: 24 } : false}
              animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Four pillars.{' '}
              <span className="glow-cyan text-bros-cyan">One standard.</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-bros-muted max-w-sm text-base leading-relaxed lg:text-right"
            initial={motionEnabled ? { opacity: 0, y: 16 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Every design decision at BROS Inc. is weighed against these principles.
            They are not guidelines. They are requirements.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5" role="list">
          {pillars.map((p, i) => (
            <PillarCard key={p.number} pillar={p} index={i} should={should} />
          ))}
        </div>
      </div>
    </section>
  )
}
