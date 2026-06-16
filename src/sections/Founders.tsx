import { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const founders = [
  {
    name: 'Muhammad Minhajuddin',
    role: 'Co-Founder & CEO',
    bio: 'Visionary behind BROS Inc. accessibility-first mission. Passionate about redefining what VR gaming can mean for players who have been historically left out of the medium.',
    initials: 'MM',
    gradient: 'from-bros-cyan/20 via-bros-cyan/5 to-transparent',
    dotColor: 'bg-bros-cyan',
    glowColor: 'rgba(0,229,255,0.18)',
    borderHover: 'hover:border-bros-cyan/40',
  },
  {
    name: 'Masir Javed',
    role: 'Co-Founder & CTO',
    bio: 'Leads the technical architecture of Eyes of the Soul, including the sonar pulse system and spatial audio engine. Brings deep expertise in XR platform development.',
    initials: 'MJ',
    gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
    dotColor: 'bg-violet-400',
    glowColor: 'rgba(123,94,167,0.20)',
    borderHover: 'hover:border-violet-400/40',
  },
  {
    name: 'Tarang Rana',
    role: 'Co-Founder & Creative Director',
    bio: 'Shapes the noir aesthetic and world-building of Eyes of the Soul. Designing accessibility-first has unlocked storytelling possibilities that conventional game design misses.',
    initials: 'TR',
    gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    dotColor: 'bg-emerald-400',
    glowColor: 'rgba(52,211,153,0.15)',
    borderHover: 'hover:border-emerald-400/40',
  },
  {
    name: 'Raafay Sheikh',
    role: 'Co-Founder & Audio Director',
    bio: 'Architect of the binaural spatial audio system at the heart of Eyes of the Soul. Trained in psychoacoustics with a background in interactive audio for immersive experiences.',
    initials: 'RS',
    gradient: 'from-orange-500/15 via-orange-500/5 to-transparent',
    dotColor: 'bg-orange-400',
    glowColor: 'rgba(251,146,60,0.15)',
    borderHover: 'hover:border-orange-400/40',
  },
  {
    name: 'Rachit Ranabhat',
    role: 'Co-Founder & Head of UX',
    bio: 'Leads community-driven accessibility research and player testing. Ensures BROS Inc. products are designed with and for the communities they serve, not just designed for them.',
    initials: 'RR',
    gradient: 'from-pink-500/15 via-pink-500/5 to-transparent',
    dotColor: 'bg-pink-400',
    glowColor: 'rgba(244,114,182,0.15)',
    borderHover: 'hover:border-pink-400/40',
  },
]

function TiltCard({ founder, index }: { founder: typeof founders[number]; index: number }) {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const should = motionEnabled && inView

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]),  { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]),  { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!motionEnabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.article
      ref={ref}
      className={`group relative flex flex-col rounded-2xl border border-white/8 bg-bros-charcoal/40 overflow-hidden
                 ${founder.borderHover} transition-border duration-300 focus-within:border-bros-cyan/30`}
      aria-labelledby={`founder-name-${index}`}
      style={motionEnabled ? { rotateX, rotateY, perspective: 800, transformStyle: 'preserve-3d' } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={motionEnabled ? { opacity: 0, y: 40, scale: 0.95 } : false}
      animate={should ? { opacity: 1, y: 0, scale: 1 } : motionEnabled ? {} : { opacity: 1 }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${founder.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} aria-hidden="true" />
      {/* Card shine */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 60%)' }} aria-hidden="true" />
      {/* HUD corners */}
      <span className="hud-corner hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-sm" aria-hidden="true" />
      <span className="hud-corner hud-corner-tr opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-sm" aria-hidden="true" />
      <span className="hud-corner hud-corner-bl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-sm" aria-hidden="true" />
      <span className="hud-corner hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-sm" aria-hidden="true" />

      {/* Card content */}
      <div className="relative z-10 flex flex-col flex-1 p-6">
        {/* Avatar + name row */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className="relative w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center border border-white/12 group-hover:border-white/25 transition-colors duration-300 overflow-hidden"
            style={{ background: `radial-gradient(ellipse at 40% 30%, ${founder.glowColor}, rgba(14,20,32,0.95))` }}
            aria-hidden="true"
          >
            <span className="text-bros-white font-black text-lg tracking-tight select-none">{founder.initials}</span>
            {/* Shimmer sweep on hover */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out" aria-hidden="true" />
          </div>
          <div>
            <h3 id={`founder-name-${index}`} className="text-base font-bold text-bros-white leading-tight">
              {founder.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${founder.dotColor}`} aria-hidden="true" />
              <p className="text-[10px] font-semibold tracking-[0.12em] text-bros-muted uppercase">{founder.role}</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-bros-muted leading-relaxed flex-1">{founder.bio}</p>

        {/* Social links */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.06]" role="list" aria-label={`${founder.name} links`}>
          {/* PLACEHOLDER: Replace href="#" with real LinkedIn URLs */}
          <a
            href="#"
            aria-label={`${founder.name} on LinkedIn`}
            role="listitem"
            className="w-8 h-8 rounded-lg border border-white/10 glass flex items-center justify-center
                       text-bros-muted hover:text-bros-white hover:border-bros-cyan/40
                       transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
          >
            <span className="text-[11px] font-bold" aria-hidden="true">in</span>
          </a>
          {/* PLACEHOLDER: Replace href with individual email */}
          <a
            href="mailto:boundlessrealityoriginstudio@gmail.com"
            aria-label={`Email ${founder.name}`}
            role="listitem"
            className="w-8 h-8 rounded-lg border border-white/10 glass flex items-center justify-center
                       text-bros-muted hover:text-bros-white hover:border-bros-cyan/40
                       transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
          >
            <span className="text-[11px]" aria-hidden="true">@</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Founders() {
  const { motionEnabled } = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const should = motionEnabled && inView

  return (
    <section
      id="founders"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="founders-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,94,167,0.07) 0%, transparent 65%)' }} aria-hidden="true" />

      <div className="section-divider max-w-7xl mx-auto mb-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 16 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <span className="tag-pill">The Team</span>
          </motion.div>

          <motion.h2
            id="founders-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-bros-white mb-5 leading-[1.05]"
            initial={motionEnabled ? { opacity: 0, y: 24 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Meet the{' '}
            <span className="glow-cyan text-bros-cyan">Founders</span>
          </motion.h2>

          <motion.p
            className="text-lg text-bros-muted max-w-xl mx-auto leading-relaxed"
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={should ? { opacity: 1, y: 0 } : motionEnabled ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Five co-founders united by a belief that the gaming industry needs to do better, and a plan to prove it.
          </motion.p>
        </div>

        {/* Grid: 3 across, then 2 centered */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {founders.map((f, i) => (
            <TiltCard key={f.name} founder={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
