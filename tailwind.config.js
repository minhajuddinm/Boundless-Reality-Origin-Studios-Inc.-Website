/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bros-black':    '#04060A',
        'bros-dark':     '#080C12',
        'bros-charcoal': '#0E1420',
        'bros-surface':  '#141C2C',
        'bros-elevated': '#1A2438',
        'bros-cyan':     '#00E5FF',
        'bros-cyan-dim': '#0099BB',
        'bros-cyan-pale':'#B3F0FF',
        'bros-violet':   '#7B5EA7',
        'bros-white':    '#EEF4FF',
        'bros-muted':    '#7A8BAA',
        'bros-subtle':   '#3A4A66',
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-radial':   'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(0,229,255,0.10) 0%, rgba(4,6,10,0) 60%)',
        'card-shine':    'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%)',
        'cyan-glow':     'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,229,255,0.18) 0%, transparent 70%)',
        'violet-glow':   'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(123,94,167,0.18) 0%, transparent 70%)',
      },
      boxShadow: {
        'cyan-sm':    '0 0 12px rgba(0,229,255,0.25)',
        'cyan-md':    '0 0 30px rgba(0,229,255,0.20), 0 0 60px rgba(0,229,255,0.08)',
        'cyan-lg':    '0 0 60px rgba(0,229,255,0.25), 0 0 120px rgba(0,229,255,0.10)',
        'card':       '0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04) inset',
        'card-hover': '0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.25)',
        'nav':        '0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-slow':  'pulse 5s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':       'float 6s ease-in-out infinite',
        'sonar-ring':  'sonar-ring 3s ease-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'grain':       'grain 0.5s steps(1) infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
        'scan':        'scan 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        'sonar-ring': {
          '0%':   { transform: 'scale(0.5)', opacity: '0.8' },
          '100%': { transform: 'scale(3.5)', opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '20%':     { transform: 'translate(-2%,-2%)' },
          '40%':     { transform: 'translate(2%,1%)' },
          '60%':     { transform: 'translate(-1%,3%)' },
          '80%':     { transform: 'translate(3%,-1%)' },
        },
        'border-glow': {
          '0%,100%': { opacity: '0.4' },
          '50%':     { opacity: '1' },
        },
        scan: {
          '0%':   { transform: 'translateY(-5%)' },
          '100%': { transform: 'translateY(105vh)' },
        },
      },
    },
  },
  plugins: [],
}
