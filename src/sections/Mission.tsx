import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const stats = [
  { value: '2.2B',  label: 'People worldwide with a vision impairment',            color: 'from-bros-cyan/20 to-transparent' },
  { value: '97%',   label: 'AAA games ship with no meaningful blind accessibility', color: 'from-violet-500/20 to-transparent' },
  { value: 'Day 1', label: 'We design for Blind and Low Vision players from the start, not as a patch', color: 'from-emerald-500/15 to-transparent' },
]

function StatCard({ stat, index, shouldAnimate }: { stat: typeof stats[0]; index: number; shouldAnimate: boolean }) {
  const { motionEnabled } = useMotion()
  return (
    <motion.div
      className="relative p-6 rounded-2xl border border-white/8 bg-bros-charcoal/40 overflow-hidden group
                 hover:border-bros-cyan/30 transition-all duration-300 cursor-default"
      initial={motionEnabled ? { opacity: 0, x: 40 } : false}
      animate={shouldAnimate ? { opacity: 1, x: 0 } : motionEnabled ? {} : { opacity: 1 }}
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      whileHover={motionEnabled ? { y: -4, transition: { duration: 0.2 } } : undefined}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 60%)' }} aria-hidden="true" />
      <div className="relative z-10">
        <p className="text-5xl font-black text-bros-cyan glow-cyan mb-2 tracking-tight">{stat.value}</p>
        <div className="w-8 h-px bg-bros-cyan/40 mb-3" aria-hidden="true" />
        <p className="text-sm text-bros-muted leading-relaxed">{stat.label}</p>
      </div>
    </motion.div>
  )
}

export default function Mission() {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const should = motionEnabled && inView

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      id="mission"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="mission-heading"
    >
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={motionEnabled
          ? { y: bgY, background: 'radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)' }
          : {         background: 'radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-divider max-w-7xl mx-auto mb-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <span className="tag-pill">Our Mission</span>
          </motion.div>

          <motion.h2
            id="mission-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight text-bros-white leading-[1.05] mb-6"
            initial={motionEnabled ? { opacity: 0, y: 24 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Games built for{' '}
            <span className="glow-cyan text-bros-cyan">everyone</span>
            <br />from the start.
          </motion.h2>

          {[
            'The games industry has historically treated accessibility as a post-launch checkbox, a feature bolted on after the core experience is locked. We reject that.',
            'At BROS Inc., accessibility is the design constraint that drives every creative decision. When you design for Blind and Low Vision players first, you build richer spatial audio, more intuitive interaction models, and more expressive worlds for every player.',
            'This is not charity. It is better design.',
          ].map((text, i) => (
            <motion.p
              key={i}
              className={`text-base sm:text-lg leading-relaxed mb-4 ${i === 2 ? 'text-bros-cyan font-semibold' : 'text-bros-muted'}`}
              initial={motionEnabled ? { opacity: 0, y: 16 } : false}
              animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} shouldAnimate={should} />
          ))}
        </div>
      </div>
    </section>
  )
}
