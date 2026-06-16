export default function Footer() {
  return (
    <footer
      className="border-t border-white/5 bg-bros-black px-6 py-10"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div
            className="w-7 h-7 rounded-full bg-bros-cyan/10 border border-bros-cyan/30 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-bros-cyan font-black text-[10px]">B</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-bros-white">
              Boundless Reality Origin Studios Inc.
            </p>
            <p className="text-[10px] text-bros-muted tracking-widest uppercase">BROS Inc.</p>
          </div>
        </div>

        <p className="text-xs text-bros-muted text-center">
          © 2026 Boundless Reality Origin Studios Inc. All rights reserved.
        </p>

        <p className="text-xs text-bros-muted/40 tracking-widest">BROS</p>
      </div>
    </footer>
  )
}
