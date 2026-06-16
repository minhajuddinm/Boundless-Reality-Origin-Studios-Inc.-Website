import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const pillars = [
  {
    number: '01',
    title: 'Spatial Audio Design',
    description:
      'We treat sound as primary geometry. Every environment is authored as an acoustic space first — visuals are a second layer of expression, not a requirement.',
    accent: 'bg-gradient-to-br from-bros-cyan/20 to-transparent',
  },
  {
    number: '02',
    title: 'Cross-Modal Interaction',
    description:
      'Gameplay mechanics translate across senses. If a puzzle solves visually, it must solve equally through audio and haptics. No modality is privileged.',
    accent: 'bg-gradient-to-br from-indigo-500/10 to-transparent',
  },
  {
    number: '03',
    title: 'Universal Design',
    description:
      'We follow the principle that accessible design is better design for everyone. Our games are richer because we refuse to segment our audience.',
    accent: 'bg-gradient-to-br from-violet-500/10 to-transparent',
  },
  {
    number: '04',
    title: 'Community-Driven Testing',
    description:
      'Blind and Low Vision players are co-developers, not afterthoughts. We build feedback loops directly into our production process from day one.',
    accent: 'bg-gradient-to-br from-emerald-500/10 to-transparent',
  },
]

export default function Approach() {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldAnimate = motionEnabled && inView

  return (
    <section
      id="approach"
      ref={ref}
      className="relative py-32 px-6 bg-bros-black"
      aria-labelledby="approach-heading"
    >
      <div className="section-divider max-w-7xl mx-auto mb-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            className="text-bros-cyan text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            initial={motionEnabled ? { opacity: 0, y: 16 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            How We Build
          </motion.p>
          <motion.h2
            id="approach-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight text-bros-white max-w-2xl"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Four pillars.{' '}
            <span className="text-bros-cyan">One standard.</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6" role="list">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              className={`relative p-8 rounded-2xl border border-white/8 overflow-hidden
                         hover:border-bros-cyan/25 transition-all duration-300
                         focus-within:border-bros-cyan/40 group`}
              style={{ background: '#0D1117' }}
              role="listitem"
              initial={motionEnabled ? { opacity: 0, y: 32 } : false}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.12 * i + 0.2 }}
              whileHover={motionEnabled ? { y: -4 } : undefined}
            >
              {/* Accent background */}
              <div className={`absolute inset-0 ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />

              <div className="relative z-10">
                <span className="text-6xl font-black text-white/5 leading-none block mb-4 select-none" aria-hidden="true">
                  {pillar.number}
                </span>
                <h3 className="text-xl font-bold text-bros-white mb-3">{pillar.title}</h3>
                <p className="text-bros-muted leading-relaxed text-sm sm:text-base">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
