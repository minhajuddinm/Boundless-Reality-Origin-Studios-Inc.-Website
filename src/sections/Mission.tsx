import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const stats = [
  { value: '2.2B', label: 'People worldwide live with a vision impairment' },
  { value: '97%', label: 'Of AAA games launch with no meaningful blind accessibility' },
  { value: '1st', label: 'Studio building VR games designed blind-first from day one' },
]

export default function Mission() {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const shouldAnimate = motionEnabled && inView

  return (
    <section
      id="mission"
      ref={ref}
      className="relative py-32 px-6 bg-bros-black"
      aria-labelledby="mission-heading"
    >
      {/* Section divider */}
      <div className="section-divider max-w-7xl mx-auto mb-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <div>
          <motion.p
            className="text-bros-cyan text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            initial={motionEnabled ? { opacity: 0, y: 16 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our Mission
          </motion.p>

          <motion.h2
            id="mission-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight text-bros-white leading-tight mb-6"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Games built for{' '}
            <span className="text-bros-cyan">everyone</span>
            {' '}from the start.
          </motion.h2>

          <motion.p
            className="text-brothers-muted text-base sm:text-lg text-bros-muted leading-relaxed mb-6"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The games industry has historically treated accessibility as a post-launch
            checkbox — a feature bolted on after the core experience is locked. We reject that.
          </motion.p>

          <motion.p
            className="text-base sm:text-lg text-bros-muted leading-relaxed mb-6"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            At BROS Inc., accessibility is the design constraint that drives every
            creative decision. When you design for Blind and Low Vision players first,
            you build richer spatial audio, more intuitive interaction models, and
            more expressive worlds for every player.
          </motion.p>

          <motion.p
            className="text-base sm:text-lg text-bros-muted leading-relaxed"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            This isn't charity. It's better design.
          </motion.p>
        </div>

        {/* Right: stats */}
        <div className="flex flex-col gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="p-6 rounded-xl border border-white/8 bg-bros-charcoal/40
                         hover:border-bros-cyan/30 transition-colors duration-300"
              initial={motionEnabled ? { opacity: 0, x: 24 } : false}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : motionEnabled ? {} : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 * i + 0.2 }}
            >
              <p className="text-4xl font-black text-bros-cyan glow-cyan mb-2">{stat.value}</p>
              <p className="text-sm text-bros-muted leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
