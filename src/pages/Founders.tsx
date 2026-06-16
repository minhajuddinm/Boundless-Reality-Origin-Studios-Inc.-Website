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
    gradient: 'from-bros-cyan/20 via-bros-cyan/5 to-transparent',
    dotColor: 'bg-bros-cyan',
    glowColor: 'rgba(0,229,255,0.15)',
  },
  {
    name: 'Masir Javed',
    role: 'Co-Founder & CTO',
    bio: 'Leads the technical architecture of Eyes of the Soul, including the sonar pulse system and spatial audio engine. Brings deep expertise in XR platform development.',
    initials: 'MJ',
    gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
    dotColor: 'bg-violet-400',
    glowColor: 'rgba(123,94,167,0.18)',
  },
  {
    name: 'Tarang Rana',
    role: 'Co-Founder & Creative Director',
    bio: 'Shapes the noir aesthetic and world-building of Eyes of the Soul. Believes that constraint breeds creativity: designing accessibility-first has unlocked storytelling possibilities that conventional game design misses.',
    initials: 'TR',
    gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    dotColor: 'bg-emerald-400',
    glowColor: 'rgba(52,211,153,0.12)',
  },
  {
    name: 'Raafay Sheikh',
    role: 'Co-Founder & Audio Director',
    bio: 'Architect of the binaural spatial audio system at the heart of Eyes of the Soul. Trained in psychoacoustics with a background in interactive audio for immersive experiences.',
    initials: 'RS',
    gradient: 'from-orange-500/15 via-orange-500/5 to-transparent',
    dotColor: 'bg-orange-400',
    glowColor: 'rgba(251,146,60,0.12)',
  },
  {
    name: 'Rachit Ranabhat',
    role: 'Co-Founder & Head of UX',
    bio: 'Leads community-driven accessibility research and player testing. Ensures that BROS Inc.\'s products are designed with and for the communities they serve, not just designed for them.',
    initials: 'RR',
    gradient: 'from-pink-500/15 via-pink-500/5 to-transparent',
    dotColor: 'bg-pink-400',
    glowColor: 'rgba(244,114,182,0.12)',
  },
]

function FounderCard({ founder, index }: { founder: typeof founders[number]; index: number }) {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const should = motionEnabled && inView

  return (
    <motion.article
      ref={ref}
      className="group relative flex flex-col rounded-2xl border border-white/8 bg-bros-charcoal/40 overflow-hidden
                 hover:border-white/15 transition-all duration-300 focus-within:border-bros-cyan/30"
      aria-labelledby={`founder-${index}`}
      initial={motionEnabled ? { opacity: 0, y: 40, scale: 0.96 } : false}
      animate={should ? { opacity: 1, y: 0, scale: 1 } : motionEnabled ? {} : { opacity: 1 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={motionEnabled ? { y: -8, transition: { duration: 0.25 } } : undefined}
    >
      {/* Glow on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${founder.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-card-shine pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 p-6">
        {/* Avatar + name row */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-white/10 group-hover:border-white/25 transition-colors duration-300"
            style={{ background: `radial-gradient(ellipse at 40% 30%, ${founder.glowColor}, rgba(14,20,32,0.9))` }}
            aria-hidden="true"
          >
            <span className="text-bros-white font-black text-lg tracking-tight select-none">{founder.initials}</span>
          </div>
          <div>
            <h2 id={`founder-${index}`} className="text-lg font-bold text-bros-white leading-tight">
              {founder.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${founder.dotColor} flex-shrink-0`} aria-hidden="true" />
              <p className="text-[11px] font-semibold tracking-[0.1em] text-bros-muted uppercase">{founder.role}</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-bros-muted leading-relaxed flex-1">{founder.bio}</p>

        {/* Social links */}
        <div className="flex items-center gap-2 mt-5 pt-5 border-t border-white/[0.06]" role="list" aria-label={`${founder.name} links`}>
          <motion.a
            href="#"
            aria-label={`${founder.name} on LinkedIn`}
            role="listitem"
            className="w-8 h-8 rounded-lg border border-white/10 glass flex items-center justify-center
                       text-bros-muted hover:text-bros-white hover:border-bros-cyan/40
                       transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
            whileHover={motionEnabled ? { y: -2 } : undefined}
          >
            <span className="text-[11px] font-bold" aria-hidden="true">in</span>
          </motion.a>
          <motion.a
            href="mailto:boundlessrealityoriginstudio@gmail.com"
            aria-label={`Email ${founder.name}`}
            role="listitem"
            className="w-8 h-8 rounded-lg border border-white/10 glass flex items-center justify-center
                       text-bros-muted hover:text-bros-white hover:border-bros-cyan/40
                       transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
            whileHover={motionEnabled ? { y: -2 } : undefined}
          >
            <span className="text-[11px]" aria-hidden="true">@</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Founders() {
  const { motionEnabled } = useMotion()
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const should = motionEnabled && headerInView

  return (
    <>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-bros-black pt-24 pb-0">
        {/* Header */}
        <div
          ref={headerRef}
          className="relative px-6 pt-16 pb-20 text-center overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,229,255,0.09) 0%, rgba(123,94,167,0.05) 40%, transparent 70%)' }}
            aria-hidden="true"
          />

          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 16 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6 relative z-10"
          >
            <span className="tag-pill">The Team</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-bros-white mb-6 relative z-10 leading-[1.02]"
            initial={motionEnabled ? { opacity: 0, y: 28 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Meet the{' '}
            <span className="glow-cyan text-bros-cyan">Founders</span>
          </motion.h1>

          <motion.p
            className="text-lg text-bros-muted max-w-xl mx-auto leading-relaxed relative z-10"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Five co-founders united by a belief that the gaming industry needs to do better,
            and a plan to prove it.
          </motion.p>

          <motion.div
            className="mt-8 relative z-10"
            initial={motionEnabled ? { opacity: 0 } : false}
            animate={should ? { opacity: 1 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-bros-muted hover:text-bros-white
                         transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan rounded-md px-2 py-1"
            >
              <motion.span whileHover={motionEnabled ? { x: -3 } : undefined} aria-hidden="true">←</motion.span>
              Back to home
            </Link>
          </motion.div>
        </div>

        {/* Founders grid */}
        <section className="px-6 pb-28 max-w-7xl mx-auto" aria-label="Founder profiles">
          {/* 2-col then 3-col, last row centered for 5 cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {founders.map((f, i) => (
              <FounderCard key={f.name} founder={f} index={i} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
