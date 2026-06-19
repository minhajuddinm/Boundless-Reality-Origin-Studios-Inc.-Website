import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Footer from '../sections/Footer'

// ---- shared animation variants ----
const fadeUp = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = { visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }

// ---- glass scrim behind text panels ----
function Scrim({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: 'rgba(4,6,10,0.62)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,0.07)' }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ================================================================
// STATION 0 - HERO
// ================================================================
function HeroStation() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-16"
      aria-label="Hero | Boundless Reality Origin Studios"
    >
      {/* Depth radial overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 10%, rgba(4,6,10,0.5) 65%, rgba(4,6,10,0.92) 100%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(0,229,255,0.09) 0%, transparent 55%)' }}
        aria-hidden="true"
      />
      {/* top / bottom fade to black */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-bros-black to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-bros-black to-transparent pointer-events-none" aria-hidden="true" />

      {/* HUD corners */}
      <div className="absolute inset-8 pointer-events-none hidden lg:block" aria-hidden="true">
        <span className="hud-corner hud-corner-tl" />
        <span className="hud-corner hud-corner-tr" />
        <span className="hud-corner hud-corner-bl" />
        <span className="hud-corner hud-corner-br" />
      </div>

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-bros-cyan/18 to-transparent"
          animate={{ y: ['-5vh', '105vh'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <span className="tag-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-bros-cyan animate-pulse-slow" aria-hidden="true" />
            Accessibility-First Game Studio
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-[clamp(2.8rem,9vw,7rem)] font-black tracking-[-0.04em] leading-[0.92] mb-8"
        >
          <span className="block text-bros-white">Boundless</span>
          <span className="block">
            <span className="text-bros-white">Reality </span>
            <span className="glow-cyan text-bros-cyan">Origin</span>
          </span>
          <span className="block text-bros-white">Studios</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="flex justify-center mb-7" aria-hidden="true">
          <div className="w-28 h-px bg-gradient-to-r from-transparent via-bros-cyan/70 to-transparent" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-bros-muted max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Building games everyone can play, designed from the ground up for{' '}
          <span className="text-bros-cyan-pale font-semibold">Blind, Low Vision, and all players.</span>
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <motion.button
            onClick={() => scrollTo('eyes-of-the-soul')}
            className="group relative px-8 py-4 rounded-xl bg-bros-cyan text-bros-black font-bold text-sm tracking-wide overflow-hidden
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bros-black"
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,229,255,0.6)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-600" aria-hidden="true" />
            <span className="relative">Explore Eyes of the Soul</span>
          </motion.button>
          <motion.button
            onClick={() => scrollTo('founders')}
            className="px-8 py-4 rounded-xl border border-white/15 text-bros-white font-semibold text-sm tracking-wide
                       hover:border-bros-cyan/50 hover:bg-bros-cyan/5 transition-all duration-300
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Meet the Founders
          </motion.button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex justify-center">
          <div className="flex items-center gap-4 px-5 py-2.5 rounded-full border border-white/8 bg-white/[0.025] glass">
            <span className="text-xs text-bros-muted font-medium">Built for</span>
            <div className="w-px h-3 bg-white/15" aria-hidden="true" />
            <span className="text-xs font-bold text-bros-white">Meta Quest 3</span>
            <div className="w-px h-3 bg-white/15" aria-hidden="true" />
            <span className="text-xs text-bros-muted">VR · Spatial Audio · Echolocation</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        aria-hidden="true"
      >
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-bros-cyan/70"
            animate={{ y: [0, 9, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-[10px] tracking-[0.22em] text-bros-muted/50 uppercase">scroll</span>
      </motion.div>
    </section>
  )
}

// ================================================================
// STATION 1 - MISSION
// ================================================================
const stats = [
  { value: '2.2B',  label: 'People worldwide with a vision impairment',                               color: 'text-bros-cyan' },
  { value: '97%',   label: 'AAA games ship with no meaningful blind accessibility',                    color: 'text-violet-400' },
  { value: 'Day 1', label: 'We design for Blind and Low Vision players from the start, not as a patch', color: 'text-emerald-400' },
]

function MissionStation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="mission"
      ref={ref}
      className="relative min-h-screen flex items-center py-20 px-6"
      aria-labelledby="mission-heading"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 w-full items-start">
        {/* Text */}
        <Scrim className="p-10 lg:p-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="mb-5"
          >
            <span className="tag-pill">Our Mission</span>
          </motion.div>
          <motion.h2
            id="mission-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight text-bros-white leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
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
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              {text}
            </motion.p>
          ))}
        </Scrim>

        {/* Stats */}
        <div className="flex flex-col gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              className="rounded-2xl p-6 border border-white/8"
              style={{ background: 'rgba(4,6,10,0.55)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
              initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 * i + 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <p className={`text-5xl font-black mb-2 tracking-tight ${s.color} ${s.color === 'text-bros-cyan' ? 'glow-cyan' : ''}`}>
                {s.value}
              </p>
              <div className="w-8 h-px bg-white/20 mb-3" aria-hidden="true" />
              <p className="text-sm text-bros-muted leading-relaxed">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================================================================
// STATION 2 - EYES OF THE SOUL
// ================================================================
const features = [
  { icon: '◎', title: 'Sonar Pulse Navigation',  description: 'A wave of perception radiates outward, momentarily illuminating the geometry of the world. Navigate by listening to what the pulse reveals.', color: 'border-bros-cyan/20 hover:border-bros-cyan/50' },
  { icon: '◈', title: 'Binaural Spatial Audio',  description: 'Every footstep, drip, and whisper is precisely positioned in 3D space. The world speaks to you, if you know how to listen.',                  color: 'border-violet-400/20 hover:border-violet-400/50' },
  { icon: '◇', title: 'Blind-First Design',       description: 'Fully playable without visual output. Every puzzle, clue, and narrative beat authored with non-visual play as the primary target.',         color: 'border-emerald-400/20 hover:border-emerald-400/50' },
  { icon: '◆', title: 'Meta Quest 3 Native',      description: 'No PC required. The haptic feedback and spatial audio of Quest 3 become the core interaction language of the game.',                        color: 'border-orange-400/20 hover:border-orange-400/50' },
]

function EotsStation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="eyes-of-the-soul"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-6"
      aria-labelledby="eots-heading"
    >
      {/* Stronger cyan bloom backdrop for EOTS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="flex justify-center mb-6"
          >
            <span className="tag-pill">Flagship Title</span>
          </motion.div>
          <motion.h2
            id="eots-heading"
            className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-[-0.03em] text-bros-white mb-4"
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ textShadow: '0 0 80px rgba(4,6,10,0.9), 0 2px 4px rgba(4,6,10,1)' }}
          >
            Eyes of the{' '}
            <span className="glow-cyan text-bros-cyan">Soul</span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-bros-muted max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ textShadow: '0 1px 8px rgba(4,6,10,0.8)' }}
          >
            A VR noir detective game where you see the world through sound.
            Built for <span className="text-bros-white font-semibold">Meta Quest 3</span>. Designed blind-first.
          </motion.p>
        </div>

        {/* Media grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/8 aspect-video">
            <img src="/gameplay.jfif" alt="Eyes of the Soul - game environment" className="w-full h-full object-cover" />
            <div className="absolute inset-0 border border-bros-cyan/10 rounded-2xl pointer-events-none" aria-hidden="true" />
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-bros-cyan/25 aspect-video">
            <iframe
              src="https://www.youtube.com/embed/7lND2KRSdrQ"
              title="Eyes of the Soul game trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/8 aspect-video">
            <img src="/sonar.jfif" alt="Sonar pulse mechanic in Eyes of the Soul" className="w-full h-full object-cover" />
            <div className="absolute inset-0 border border-bros-cyan/10 rounded-2xl pointer-events-none" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={`relative p-6 rounded-2xl border transition-all duration-300 ${f.color}`}
              style={{ background: 'rgba(4,6,10,0.55)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
              initial={{ opacity: 0, y: 28, scale: 0.96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-10 h-10 rounded-xl bg-bros-cyan/10 border border-bros-cyan/20 flex items-center justify-center mb-4" aria-hidden="true">
                <span className="text-bros-cyan text-lg">{f.icon}</span>
              </div>
              <h3 className="font-bold text-bros-white text-base mb-2 leading-tight">{f.title}</h3>
              <p className="text-sm text-bros-muted leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Status */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-white/10">
            <span className="w-2 h-2 rounded-full bg-bros-cyan animate-pulse-slow shadow-cyan-sm" aria-hidden="true" />
            <span className="text-xs font-medium text-bros-muted">Meta Quest 3</span>
            <span className="w-px h-3 bg-white/15" aria-hidden="true" />
            <span className="text-xs font-semibold text-bros-white">In Development</span>
            <span className="w-px h-3 bg-white/15" aria-hidden="true" />
            <span className="text-xs text-bros-muted">VR · Spatial Audio · Echolocation</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// STATION 3 - APPROACH
// ================================================================
const pillars = [
  { number: '01', title: 'Spatial Audio Design',      description: 'We treat sound as primary geometry. Every environment is authored as an acoustic space first. Visuals are a second layer of expression, not a requirement.',                     accent: 'border-bros-cyan/20 hover:border-bros-cyan/40',    num: 'text-bros-cyan' },
  { number: '02', title: 'Cross-Modal Interaction',   description: 'Gameplay mechanics translate across senses. If a puzzle solves visually, it must solve equally through audio and haptics. No modality is privileged.',                            accent: 'border-violet-400/20 hover:border-violet-400/40',  num: 'text-violet-400' },
  { number: '03', title: 'Universal Design',          description: 'Accessible design is better design for everyone. Our games are richer because we refuse to segment our audience into "normal" and "accessible."',                                   accent: 'border-emerald-400/20 hover:border-emerald-400/40', num: 'text-emerald-400' },
  { number: '04', title: 'Community-Driven Testing',  description: 'Blind and Low Vision players are co-developers, not afterthoughts. We build feedback loops directly into production from day one.',                                               accent: 'border-orange-400/20 hover:border-orange-400/40',  num: 'text-orange-400' },
]

function ApproachStation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="approach"
      ref={ref}
      className="relative min-h-screen flex items-center py-20 px-6"
      aria-labelledby="approach-heading"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <Scrim className="p-8 lg:p-10 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }} className="mb-4"
            >
              <span className="tag-pill">How We Build</span>
            </motion.div>
            <motion.h2
              id="approach-heading"
              className="text-4xl sm:text-5xl font-black tracking-tight text-bros-white leading-[1.05] mb-4"
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Four pillars.{' '}
              <span className="glow-cyan text-bros-cyan">One standard.</span>
            </motion.h2>
            <motion.p
              className="text-bros-muted text-base leading-relaxed"
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Every design decision at BROS Inc. is weighed against these principles. They are not guidelines. They are requirements.
            </motion.p>
          </Scrim>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              className={`p-8 rounded-2xl border transition-all duration-300 ${p.accent}`}
              style={{ background: 'rgba(4,6,10,0.55)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
              initial={{ opacity: 0, y: 36, scale: 0.97 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.12 * i + 0.25, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start justify-between mb-5">
                <span className={`text-6xl font-black leading-none select-none ${p.num} opacity-20`} aria-hidden="true">
                  {p.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-bros-white mb-3 leading-tight">{p.title}</h3>
              <p className="text-bros-muted leading-relaxed text-sm sm:text-base">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================================================================
// STATION 4 - FOUNDERS
// ================================================================
const founders = [
  { name: 'Muhammad Minhajuddin', role: 'Co-Founder & CEO',              initials: 'MM', bio: 'Visionary behind BROS Inc. accessibility-first mission. Passionate about redefining what VR gaming can mean for players who have been historically left out of the medium.',                                                        glow: 'rgba(0,229,255,0.18)',   border: 'hover:border-bros-cyan/40',   dot: 'bg-bros-cyan' },
  { name: 'Masir Javed',          role: 'Co-Founder & CTO',              initials: 'MJ', bio: 'Leads the technical architecture of Eyes of the Soul, including the sonar pulse system and spatial audio engine. Brings deep expertise in XR platform development.',                                                                 glow: 'rgba(123,94,167,0.20)', border: 'hover:border-violet-400/40',  dot: 'bg-violet-400' },
  { name: 'Tarang Rana',          role: 'Co-Founder & Creative Director', initials: 'TR', bio: 'Shapes the noir aesthetic and world-building of Eyes of the Soul. Designing accessibility-first has unlocked storytelling possibilities that conventional game design misses.',                                                     glow: 'rgba(52,211,153,0.15)', border: 'hover:border-emerald-400/40', dot: 'bg-emerald-400' },
  { name: 'Raafay Sheikh',        role: 'Co-Founder & Audio Director',   initials: 'RS', bio: 'Architect of the binaural spatial audio system at the heart of Eyes of the Soul. Trained in psychoacoustics with a background in interactive audio for immersive experiences.',                                                    glow: 'rgba(251,146,60,0.15)', border: 'hover:border-orange-400/40',  dot: 'bg-orange-400' },
  { name: 'Rachit Ranabhat',      role: 'Co-Founder & Head of UX',       initials: 'RR', bio: 'Leads community-driven accessibility research and player testing. Ensures BROS Inc. products are designed with and for the communities they serve, not just designed for them.',                                                    glow: 'rgba(244,114,182,0.15)', border: 'hover:border-pink-400/40',    dot: 'bg-pink-400' },
]

function FoundersStation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="founders"
      ref={ref}
      className="relative min-h-screen flex items-center py-20 px-6"
      aria-labelledby="founders-heading"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="flex justify-center mb-6"
          >
            <span className="tag-pill">The Team</span>
          </motion.div>
          <motion.h2
            id="founders-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-bros-white mb-4 leading-[1.05]"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ textShadow: '0 0 60px rgba(4,6,10,0.9)' }}
          >
            Meet the <span className="glow-cyan text-bros-cyan">Founders</span>
          </motion.h2>
          <motion.p
            className="text-lg text-bros-muted max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ textShadow: '0 1px 8px rgba(4,6,10,0.7)' }}
          >
            Five co-founders united by a belief that the gaming industry needs to do better, and a plan to prove it.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {founders.map((f, i) => (
            <motion.article
              key={f.name}
              className={`relative rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 ${f.border} focus-within:border-bros-cyan/30`}
              style={{ background: 'rgba(4,6,10,0.60)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
              aria-labelledby={`journey-founder-${i}`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center border border-white/12"
                    style={{ background: `radial-gradient(ellipse at 40% 30%, ${f.glow}, rgba(14,20,32,0.95))` }}
                    aria-hidden="true"
                  >
                    <span className="text-bros-white font-black text-lg tracking-tight select-none">{f.initials}</span>
                  </div>
                  <div>
                    <h3 id={`journey-founder-${i}`} className="text-base font-bold text-bros-white leading-tight">{f.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.dot}`} aria-hidden="true" />
                      <p className="text-[10px] font-semibold tracking-[0.12em] text-bros-muted uppercase">{f.role}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-bros-muted leading-relaxed">{f.bio}</p>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.06]">
                  <a
                    href="#"
                    aria-label={`${f.name} on LinkedIn`}
                    className="w-8 h-8 rounded-lg border border-white/10 glass flex items-center justify-center text-bros-muted hover:text-bros-white hover:border-bros-cyan/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
                  >
                    <span className="text-[11px] font-bold" aria-hidden="true">in</span>
                  </a>
                  <a
                    href="mailto:boundlessrealityoriginstudio@gmail.com"
                    aria-label={`Email ${f.name}`}
                    className="w-8 h-8 rounded-lg border border-white/10 glass flex items-center justify-center text-bros-muted hover:text-bros-white hover:border-bros-cyan/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
                  >
                    <span className="text-[11px]" aria-hidden="true">@</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================================================================
// STATION 5 - CONTACT
// ================================================================
const socials = [
  { label: 'Facebook',     symbol: 'f'  },
  { label: 'Twitter / X',  symbol: '𝕏' },
  { label: 'Instagram',    symbol: '◻' },
  { label: 'LinkedIn',     symbol: 'in' },
]

function ContactStation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-6"
      aria-labelledby="contact-heading"
    >
      {/* Final wide pulse overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 80%, rgba(0,229,255,0.06) 0%, rgba(123,94,167,0.04) 40%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex justify-center mb-6"
        >
          <span className="tag-pill">Get in Touch</span>
        </motion.div>

        <motion.h2
          id="contact-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-bros-white mb-6 leading-[1.05]"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ textShadow: '0 0 80px rgba(4,6,10,0.9)' }}
        >
          Let's build the{' '}
          <span className="glow-cyan text-bros-cyan">future of play.</span>
        </motion.h2>

        <motion.p
          className="text-lg text-bros-muted max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textShadow: '0 1px 8px rgba(4,6,10,0.8)' }}
        >
          Whether you're a publisher, accessibility researcher, player, or potential collaborator, we want to hear from you.
        </motion.p>

        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="mailto:boundlessrealityoriginstudio@gmail.com"
            className="group relative px-8 py-4 rounded-xl bg-bros-cyan text-bros-black font-bold text-sm tracking-wide overflow-hidden
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bros-black"
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0,229,255,0.55)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700" aria-hidden="true" />
            <span className="relative">boundlessrealityoriginstudio@gmail.com</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="section-divider max-w-xs mx-auto mb-12"
          initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          aria-hidden="true"
        />

        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          role="list"
          aria-label="Social media links"
        >
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} link`}
              role="listitem"
              className="w-11 h-11 rounded-xl border border-white/12 glass flex items-center justify-center
                         text-bros-muted hover:text-bros-white hover:border-bros-cyan/50
                         transition-all duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
              whileHover={{ y: -3, boxShadow: '0 0 12px rgba(0,229,255,0.2)' }}
              whileTap={{ scale: 0.93 }}
            >
              <span className="text-xs font-bold" aria-hidden="true">{s.symbol}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// EXPORT - all stations in order
// ================================================================
export default function JourneyHome() {
  return (
    <>
      <HeroStation />
      <MissionStation />
      <EotsStation />
      <ApproachStation />
      <FoundersStation />
      <ContactStation />
      <Footer />
    </>
  )
}
