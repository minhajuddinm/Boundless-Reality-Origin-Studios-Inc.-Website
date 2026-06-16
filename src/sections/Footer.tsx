export default function Footer() {
  return (
    <footer
      className="relative border-t border-white/5 bg-bros-black px-6 py-10 overflow-hidden"
      role="contentinfo"
    >
      {/* Subtle gradient behind */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(0,229,255,0.03) 0%, transparent 70%)' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-bros-cyan/8 border border-bros-cyan/25 flex items-center justify-center flex-shrink-0" aria-hidden="true">
            <div className="w-1.5 h-1.5 rounded-full bg-bros-cyan" />
          </div>
          <div>
            <p className="text-xs font-bold text-bros-white tracking-wide">Boundless Reality Origin Studios Inc.</p>
            <p className="text-[10px] text-bros-muted/50 tracking-[0.18em] uppercase mt-0.5">BROS Inc.</p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-bros-muted/60 text-center">
          © 2026 Boundless Reality Origin Studios Inc. All rights reserved.
        </p>

        {/* Right wordmark */}
        <p className="text-xs text-bros-subtle/40 tracking-[0.25em] font-black uppercase">BROS</p>
      </div>
    </footer>
  )
}
