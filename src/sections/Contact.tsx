import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const socials = [
  { label: 'Facebook',  symbol: 'f'  },
  { label: 'Twitter / X', symbol: '𝕏' },
  { label: 'Instagram', symbol: '◻' },
  { label: 'LinkedIn',  symbol: 'in' },
]

export default function Contact() {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const should = motionEnabled && inView

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-36 px-6 overflow-hidden"
      aria-labelledby="contact-heading"
      style={{ background: 'linear-gradient(180deg, #04060A 0%, #080C14 50%, #04060A 100%)' }}
    >
      {/* Multi-layer glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(0,229,255,0.09) 0%, rgba(123,94,167,0.06) 40%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(123,94,167,0.06) 0%, transparent 70%)' }} aria-hidden="true" />

      <div className="section-divider max-w-7xl mx-auto mb-20" aria-hidden="true" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 16 } : false}
          animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="tag-pill">Get in Touch</span>
        </motion.div>

        <motion.h2
          id="contact-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-bros-white mb-6 leading-[1.05]"
          initial={motionEnabled ? { opacity: 0, y: 24 } : false}
          animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Let's build the{' '}
          <span className="glow-cyan text-bros-cyan">future of play.</span>
        </motion.h2>

        <motion.p
          className="text-lg text-bros-muted max-w-xl mx-auto mb-12 leading-relaxed"
          initial={motionEnabled ? { opacity: 0, y: 20 } : false}
          animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Whether you're a publisher, accessibility researcher, player, or potential collaborator, we want to hear from you.
        </motion.p>

        {/* Email CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={motionEnabled ? { opacity: 0, y: 20 } : false}
          animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* PLACEHOLDER: Replace href with real studio email */}
          <motion.a
            href="mailto:boundlessrealityoriginstudio@gmail.com"
            className="group relative px-8 py-4 rounded-xl bg-bros-cyan text-bros-black font-bold text-sm tracking-wide overflow-hidden
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bros-black"
            whileHover={motionEnabled ? { scale: 1.04, boxShadow: '0 0 40px rgba(0,229,255,0.5)' } : undefined}
            whileTap={motionEnabled  ? { scale: 0.97 } : undefined}
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700" aria-hidden="true" />
            <span className="relative">boundlessrealityoriginstudio@gmail.com</span>
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="section-divider max-w-xs mx-auto mb-12"
          initial={motionEnabled ? { opacity: 0, scaleX: 0 } : false}
          animate={should ? { opacity: 1, scaleX: 1 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          aria-hidden="true"
        />

        {/* Socials */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={motionEnabled ? { opacity: 0, y: 12 } : false}
          animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          role="list"
          aria-label="Social media links"
        >
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href="#" // PLACEHOLDER: Replace with real URL
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} — placeholder link`}
              role="listitem"
              className="w-11 h-11 rounded-xl border border-white/12 glass flex items-center justify-center
                         text-bros-muted hover:text-bros-white hover:border-bros-cyan/50
                         transition-all duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
              whileHover={motionEnabled ? { y: -3, boxShadow: '0 0 12px rgba(0,229,255,0.2)' } : undefined}
              whileTap={motionEnabled  ? { scale: 0.93 } : undefined}
            >
              <span className="text-xs font-bold" aria-hidden="true">{s.symbol}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
