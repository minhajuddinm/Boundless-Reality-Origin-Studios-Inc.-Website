import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const pillars = [
  {
    number: '01',
    title: 'Spatial Audio Design',
    description: 'We treat sound as primary geometry. Every environment is authored as an acoustic space first. Visuals are a second layer of expression, not a requirement.',
    accent: 'from-bros-cyan/15 via-bros-cyan/5 to-transparent',
    border: 'group-hover:border-bros-cyan/40',
    dot: 'bg-bros-cyan',
  },
  {
    number: '02',
    title: 'Cross-Modal Interaction',
    description: 'Gameplay mechanics translate across senses. If a puzzle solves visually, it must solve equally through audio and haptics. No modality is privileged.',
    accent: 'from-violet-500/15 via-violet-500/5 to-transparent',
    border: 'group-hover:border-violet-400/40',
    dot: 'bg-violet-400',
  },
  {
    number: '03',
    title: 'Universal Design',
    description: 'We follow the principle that accessible design is better design for everyone. Our games are richer because we refuse to segment our audience.',
    accent: 'from-emerald-500/12 via-emerald-500/4 to-transparent',
    border: 'group-hover:border-emerald-400/40',
    dot: 'bg-emerald-400',
  },
  {
    number: '04',
    title: 'Community-Driven Testing',
    description: 'Blind and Low Vision players are co-developers, not afterthoughts. We build feedback loops directly into our production process from day one.',
    accent: 'from-orange-500/12 via-orange-500/4 to-transparent',
    border: 'group-hover:border-orange-400/40',
    dot: 'bg-orange-400',
  },
]

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
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 80% 50%, rgba(123,94,167,0.06) 0%, transparent 60%)' }} />

      <div className="section-divider max-w-7xl mx-auto mb-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
            They're not guidelines. They're requirements.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-5" role="list">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              className={`relative p-8 rounded-2xl border border-white/8 bg-bros-charcoal/30 overflow-hidden group
                         ${pillar.border} transition-all duration-300 cursor-default`}
              role="listitem"
              initial={motionEnabled ? { opacity: 0, y: 36, scale: 0.97 } : false}
              animate={should ? { opacity: 1, y: 0, scale: 1 } : motionEnabled ? {} : { opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.12 * i + 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={motionEnabled ? { y: -6, transition: { duration: 0.25 } } : undefined}
            >
              {/* Gradient bg on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
              <div className="absolute inset-0 bg-card-shine" aria-hidden="true" />

              <div className="relative z-10">
                {/* Number + dot */}
                <div className="flex items-start justify-between mb-6">
                  <span className="text-7xl font-black leading-none text-white/[0.04] select-none" aria-hidden="true">{pillar.number}</span>
                  <div className={`w-2.5 h-2.5 rounded-full mt-2 ${pillar.dot} opacity-60 group-hover:opacity-100 transition-opacity duration-300 shadow-cyan-sm`} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-bros-white mb-3 leading-tight">{pillar.title}</h3>
                <p className="text-bros-muted leading-relaxed text-sm sm:text-base">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
