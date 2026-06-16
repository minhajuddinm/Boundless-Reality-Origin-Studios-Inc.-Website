import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Eyes of the Soul', href: '/#eyes-of-the-soul' },
  { label: 'Approach', href: '/#approach' },
  { label: 'Founders', href: '/founders' },
  { label: 'Contact', href: '/#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { motionEnabled, toggleMotion } = useMotion()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location])

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' })
      }
    }
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bros-black/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Studio name */}
        <Link
          to="/"
          className="flex items-center gap-2 group focus-visible:outline-none"
          aria-label="Boundless Reality Origin Studios Inc. — home"
        >
          {/* Logo mark placeholder */}
          <div
            className="w-8 h-8 rounded-full bg-bros-cyan/20 border border-bros-cyan/40 flex items-center justify-center
                       group-hover:bg-bros-cyan/30 transition-colors duration-200 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-bros-cyan"
            aria-hidden="true"
          >
            <span className="text-bros-cyan font-black text-xs">B</span>
          </div>
          <span className="font-black text-sm tracking-widest text-bros-white uppercase hidden sm:block">
            BROS<span className="text-bros-cyan">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.href.startsWith('/founders') ? (
              <Link
                key={link.label}
                to={link.href}
                className="px-4 py-2 text-sm text-bros-muted hover:text-bros-white transition-colors duration-200 rounded-md
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm text-bros-muted hover:text-bros-white transition-colors duration-200 rounded-md
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Motion toggle */}
          <button
            onClick={toggleMotion}
            aria-pressed={!motionEnabled}
            aria-label={motionEnabled ? 'Disable animations and 3D effects' : 'Enable animations and 3D effects'}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10
                       text-xs text-bros-muted hover:text-bros-white hover:border-bros-cyan/40
                       transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                motionEnabled ? 'bg-bros-cyan' : 'bg-bros-muted'
              }`}
              aria-hidden="true"
            />
            {motionEnabled ? 'Motion On' : 'Motion Off'}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan rounded-md"
          >
            <span
              className={`w-5 h-0.5 bg-bros-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              aria-hidden="true"
            />
            <span
              className={`w-5 h-0.5 bg-bros-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
              aria-hidden="true"
            />
            <span
              className={`w-5 h-0.5 bg-bros-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bros-dark/95 backdrop-blur-md border-b border-white/5"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.href.startsWith('/founders') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="px-4 py-3 text-sm text-bros-muted hover:text-bros-white transition-colors duration-200 rounded-md
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 text-sm text-bros-muted hover:text-bros-white transition-colors duration-200 rounded-md
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
                  >
                    {link.label}
                  </button>
                )
              )}
              {/* Motion toggle in mobile menu */}
              <button
                onClick={toggleMotion}
                aria-pressed={!motionEnabled}
                aria-label={motionEnabled ? 'Disable animations' : 'Enable animations'}
                className="flex items-center gap-2 px-4 py-3 text-sm text-bros-muted hover:text-bros-white
                           transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bros-cyan"
              >
                <span
                  className={`w-2 h-2 rounded-full ${motionEnabled ? 'bg-bros-cyan' : 'bg-bros-muted'}`}
                  aria-hidden="true"
                />
                {motionEnabled ? 'Motion On' : 'Motion Off'}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
