import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

export default function Contact() {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldAnimate = motionEnabled && inView

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="contact-heading"
      style={{ background: 'linear-gradient(180deg, #080A0F 0%, #0A1018 100%)' }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          className="text-bros-cyan text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          initial={motionEnabled ? { opacity: 0, y: 16 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.p>

        <motion.h2
          id="contact-heading"
          className="text-4xl sm:text-5xl font-black tracking-tight text-bros-white mb-6"
          initial={motionEnabled ? { opacity: 0, y: 20 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Let's build the{' '}
          <span className="text-bros-cyan">future of play.</span>
        </motion.h2>

        <motion.p
          className="text-lg text-bros-muted max-w-xl mx-auto mb-12 text-balance"
          initial={motionEnabled ? { opacity: 0, y: 20 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Whether you're a publisher, accessibility researcher, player, or potential
          collaborator — we want to hear from you.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={motionEnabled ? { opacity: 0, y: 20 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* PLACEHOLDER: Replace with real studio email address */}
          <a
            href="mailto:hello@brosinc.studio"
            className="px-8 py-4 bg-bros-cyan text-bros-black font-bold text-sm tracking-wide rounded-md
                       hover:bg-white transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bros-black"
          >
            hello@brosinc.studio
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-12"
          initial={motionEnabled ? { opacity: 0 } : false}
          animate={shouldAnimate ? { opacity: 1 } : motionEnabled ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          role="list"
          aria-label="Social media links"
        >
          {/* PLACEHOLDER: Replace hrefs with real social URLs */}
          {[
            { label: 'Twitter / X', icon: '𝕏', href: 'https://x.com' },
            { label: 'LinkedIn', icon: 'in', href: 'https://linkedin.com' },
            { label: 'Instagram', icon: '◻', href: 'https://instagram.com' },
            { label: 'TikTok', icon: '◈', href: 'https://tiktok.com' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} (opens in new tab)`}
              role="listitem"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center
                         text-bros-muted hover:text-bros-white hover:border-bros-cyan/50
                         transition-all duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
            >
              <span className="text-sm font-bold" aria-hidden="true">{s.icon}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
