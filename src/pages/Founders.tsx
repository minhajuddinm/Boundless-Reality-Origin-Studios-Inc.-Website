import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useMotion } from '../context/MotionContext'
import Footer from '../sections/Footer'

const founders = [
  {
    name: 'Muhammad Minhajuddin',
    role: 'Co-Founder & CEO',
    bio: 'Visionary behind BROS Inc.\'s accessibility-first mission. Passionate about redefining what VR gaming can mean for players who have been historically excluded from the medium.',
    initials: 'MM',
  },
  {
    name: 'Masir Javed',
    role: 'Co-Founder & CTO',
    bio: 'Leads the technical architecture of Eyes of the Soul, including the sonar pulse system and spatial audio engine. Brings deep expertise in XR platform development.',
    initials: 'MJ',
  },
  {
    name: 'Tarang Rana',
    role: 'Co-Founder & Creative Director',
    bio: 'Shapes the noir aesthetic and world-building of Eyes of the Soul. Believes that constraint breeds creativity — designing blind-first has unlocked storytelling possibilities that conventional game design misses.',
    initials: 'TR',
  },
  {
    name: 'Raafay Sheikh',
    role: 'Co-Founder & Audio Director',
    bio: 'Architect of the binaural spatial audio system at the heart of Eyes of the Soul. Trained in psychoacoustics with a background in interactive audio for immersive experiences.',
    initials: 'RS',
  },
  {
    name: 'Rachit Ranabhat',
    role: 'Co-Founder & Head of UX',
    bio: 'Leads community-driven accessibility research and player testing. Ensures that BROS Inc.\'s products are designed with and for the communities they serve, not just designed for them.',
    initials: 'RR',
  },
]

function FounderCard({ founder, index }: { founder: typeof founders[number]; index: number }) {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldAnimate = motionEnabled && inView

  return (
    <motion.article
      ref={ref}
      className="group relative flex flex-col rounded-2xl border border-white/8 bg-bros-charcoal/40 overflow-hidden
                 hover:border-bros-cyan/30 transition-all duration-300
                 focus-within:border-bros-cyan/40"
      aria-labelledby={`founder-name-${index}`}
      initial={motionEnabled ? { opacity: 0, y: 32 } : false}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      whileHover={motionEnabled ? { y: -6 } : undefined}
    >
      {/* Headshot area */}
      {/* PLACEHOLDER: Replace this div with an <img> of the founder's headshot photo */}
      <div
        className="relative h-52 bg-gradient-to-br from-bros-surface to-bros-charcoal flex items-center justify-center overflow-hidden"
        role="img"
        aria-label={`${founder.name} — headshot placeholder`}
      >
        {/* Decorative background rings */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          {[60, 100, 140].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-bros-cyan/10"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        {/* Initials avatar */}
        <div
          className="relative z-10 w-20 h-20 rounded-full bg-bros-cyan/10 border-2 border-bros-cyan/30
                     flex items-center justify-center
                     group-hover:bg-bros-cyan/20 group-hover:border-bros-cyan/60
                     transition-all duration-300"
          aria-hidden="true"
        >
          <span className="text-bros-cyan font-black text-xl">{founder.initials}</span>
        </div>

        {/* Placeholder label */}
        <span
          className="absolute top-3 right-3 text-[10px] font-mono text-bros-cyan/30 border border-bros-cyan/20 px-2 py-0.5 rounded"
          aria-hidden="true"
        >
          photo
        </span>

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-bros-charcoal/80 to-transparent
                     opacity-60 group-hover:opacity-80 transition-opacity duration-300"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h2 id={`founder-name-${index}`} className="text-lg font-bold text-bros-white mb-1">
          {founder.name}
        </h2>
        <p className="text-xs font-semibold text-bros-cyan tracking-wide uppercase mb-3">
          {founder.role}
        </p>
        <p className="text-sm text-bros-muted leading-relaxed flex-1">{founder.bio}</p>

        {/* Social links */}
        {/* PLACEHOLDER: Replace href="#" with real LinkedIn and email URLs */}
        <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/8" role="list" aria-label={`${founder.name} social links`}>
          <a
            href="#"
            aria-label={`${founder.name} on LinkedIn (placeholder)`}
            role="listitem"
            className="w-8 h-8 rounded-lg border border-white/15 flex items-center justify-center
                       text-bros-muted hover:text-bros-white hover:border-bros-cyan/50
                       transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
          >
            <span className="text-xs font-bold" aria-hidden="true">in</span>
          </a>
          <a
            href="mailto:hello@brosinc.studio"
            aria-label={`Email ${founder.name} (placeholder)`}
            role="listitem"
            className="w-8 h-8 rounded-lg border border-white/15 flex items-center justify-center
                       text-bros-muted hover:text-bros-white hover:border-bros-cyan/50
                       transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
          >
            <span className="text-xs" aria-hidden="true">@</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Founders() {
  const { motionEnabled } = useMotion()
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-bros-black pt-24 pb-0">
        {/* Header */}
        <div
          ref={headerRef}
          className="relative px-6 py-20 text-center overflow-hidden"
        >
          {/* Background glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <motion.p
            className="text-bros-cyan text-xs font-semibold tracking-[0.25em] uppercase mb-4 relative z-10"
            initial={motionEnabled ? { opacity: 0, y: 16 } : false}
            animate={motionEnabled && headerInView ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            The Team
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-6xl font-black tracking-tight text-bros-white mb-6 relative z-10"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={motionEnabled && headerInView ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Meet the{' '}
            <span className="glow-cyan text-bros-cyan">Founders</span>
          </motion.h1>

          <motion.p
            className="text-lg text-bros-muted max-w-xl mx-auto text-balance relative z-10"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={motionEnabled && headerInView ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Five co-founders united by a belief that the gaming industry needs to
            do better — and a plan to prove it.
          </motion.p>

          {/* Back link */}
          <motion.div
            className="mt-8 relative z-10"
            initial={motionEnabled ? { opacity: 0 } : false}
            animate={motionEnabled && headerInView ? { opacity: 1 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-bros-muted hover:text-bros-white transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan rounded-md px-2 py-1"
            >
              <span aria-hidden="true">←</span> Back to home
            </Link>
          </motion.div>
        </div>

        {/* Founders grid */}
        <section
          className="px-6 pb-24 max-w-7xl mx-auto"
          aria-label="Founder profiles"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {founders.map((founder, i) => (
              <FounderCard key={founder.name} founder={founder} index={i} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
