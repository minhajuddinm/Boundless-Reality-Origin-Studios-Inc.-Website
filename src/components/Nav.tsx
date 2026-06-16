import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const navLinks = [
  { label: 'Home',             href: '/#home' },
  { label: 'Eyes of the Soul', href: '/#eyes-of-the-soul' },
  { label: 'Approach',         href: '/#approach' },
  { label: 'Founders',         href: '/founders', isRoute: true },
  { label: 'Contact',          href: '/#contact' },
]

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false)
  const [hidden,     setHidden]     = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('/#home')
  const lastY = useRef(0)
  const { motionEnabled, toggleMotion } = useMotion()
  const location = useLocation()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 50)
    if (y > lastY.current + 60 && y > 200) setHidden(true)
    if (y < lastY.current - 10 || y < 100)  setHidden(false)
    lastY.current = y
  })

  useEffect(() => setMenuOpen(false), [location])

  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' })
    setActiveLink(`/#${id}`)
    setMenuOpen(false)
  }

  useEffect(() => {
    const ids = ['home', 'mission', 'eyes-of-the-soul', 'approach', 'contact']
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(`/#${id}`) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [location])

  return (
    <motion.header
      animate={hidden ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-nav' : 'bg-transparent'
      }`}
      role="banner"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          opacity: scrolled ? 1 : 0,
          background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), rgba(123,94,167,0.4), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus-visible:outline-none flex-shrink-0"
          aria-label="Boundless Reality Origin Studios — home"
        >
          <div className="relative w-9 h-9 flex-shrink-0" aria-hidden="true">
            <div className="absolute inset-0 rounded-full border border-bros-cyan/30 group-hover:border-bros-cyan/70 transition-colors duration-300" />
            <motion.div
              className="absolute inset-1.5 rounded-full bg-bros-cyan/10 group-hover:bg-bros-cyan/20 transition-colors duration-300"
              animate={motionEnabled ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-bros-cyan shadow-cyan-sm" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border border-bros-cyan/0"
              whileHover={{ scale: 1.6, opacity: 0 }}
              initial={{ borderColor: 'rgba(0,229,255,0.5)' }}
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-bros-white font-black text-sm tracking-[0.18em] leading-none uppercase">BROS</p>
            <p className="text-bros-cyan/50 text-[9px] tracking-[0.22em] uppercase font-semibold mt-0.5">Studios</p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-0 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = link.isRoute
              ? location.pathname === '/founders'
              : activeLink === link.href

            const cls = `relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan
              ${isActive ? 'text-bros-white' : 'text-bros-muted hover:text-bros-white hover:bg-white/5'}`

            return link.isRoute ? (
              <Link key={link.label} to={link.href} className={cls}>
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-bros-cyan to-transparent"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href.replace('/#', ''))}
                className={cls}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-bros-cyan to-transparent"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.button
            onClick={toggleMotion}
            aria-pressed={!motionEnabled}
            aria-label={motionEnabled ? 'Disable animations' : 'Enable animations'}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full glass
                       text-xs font-medium text-bros-muted hover:text-bros-white
                       transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
            whileHover={motionEnabled ? { scale: 1.04 } : undefined}
            whileTap={motionEnabled  ? { scale: 0.97 } : undefined}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              animate={motionEnabled ? { backgroundColor: '#00E5FF', boxShadow: '0 0 6px rgba(0,229,255,0.8)' } : { backgroundColor: '#3A4A66', boxShadow: 'none' }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
            {motionEnabled ? 'Motion On' : 'Motion Off'}
          </motion.button>

          <motion.button
            onClick={() => scrollTo('eyes-of-the-soul')}
            className="hidden xl:flex items-center px-4 py-2 rounded-lg
                       bg-bros-cyan text-bros-black text-xs font-bold tracking-wide
                       hover:bg-white transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bros-black"
            whileHover={motionEnabled ? { scale: 1.05, boxShadow: '0 0 20px rgba(0,229,255,0.5)' } : undefined}
            whileTap={motionEnabled  ? { scale: 0.97 } : undefined}
          >
            Explore Game
          </motion.button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]
                       rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="w-5 h-0.5 bg-bros-white rounded-full block" aria-hidden="true" />
            <motion.span animate={menuOpen ? { opacity: 0 }          : { opacity: 1 }}     transition={{ duration: 0.15 }} className="w-5 h-0.5 bg-bros-white rounded-full block" aria-hidden="true" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -6.5 }: { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="w-5 h-0.5 bg-bros-white rounded-full block" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mob"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{  opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden glass border-t border-white/5"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="px-4 py-3 flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                >
                  {link.isRoute ? (
                    <Link to={link.href} className="flex items-center gap-3 px-4 py-3 text-sm text-bros-muted hover:text-bros-white rounded-lg hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan">
                      <span className="w-1 h-1 rounded-full bg-bros-cyan/50" aria-hidden="true" />
                      {link.label}
                    </Link>
                  ) : (
                    <button onClick={() => scrollTo(link.href.replace('/#', ''))} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-bros-muted hover:text-bros-white rounded-lg hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan">
                      <span className="w-1 h-1 rounded-full bg-bros-cyan/50" aria-hidden="true" />
                      {link.label}
                    </button>
                  )}
                </motion.div>
              ))}
              <div className="border-t border-white/5 mt-1 pt-1">
                <button onClick={toggleMotion} aria-pressed={!motionEnabled} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-bros-muted hover:text-bros-white rounded-lg hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan">
                  <span className={`w-1 h-1 rounded-full ${motionEnabled ? 'bg-bros-cyan' : 'bg-bros-subtle'}`} aria-hidden="true" />
                  {motionEnabled ? 'Motion On' : 'Motion Off'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
