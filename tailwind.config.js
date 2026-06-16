/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bros-black': '#080A0F',
        'bros-dark': '#0D1117',
        'bros-charcoal': '#161B22',
        'bros-surface': '#1C2230',
        'bros-cyan': '#00D4FF',
        'bros-cyan-dim': '#007A94',
        'bros-cyan-glow': 'rgba(0,212,255,0.15)',
        'bros-white': '#F0F4F8',
        'bros-muted': '#8B9BB4',
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'sonar': 'sonar 3s ease-out infinite',
        'grain': 'grain 0.4s steps(1) infinite',
      },
      keyframes: {
        sonar: {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -2%)' },
          '20%': { transform: 'translate(2%, 1%)' },
          '30%': { transform: 'translate(-1%, 3%)' },
          '40%': { transform: 'translate(3%, -1%)' },
          '50%': { transform: 'translate(-2%, 2%)' },
          '60%': { transform: 'translate(1%, -3%)' },
          '70%': { transform: 'translate(2%, 2%)' },
          '80%': { transform: 'translate(-3%, 1%)' },
          '90%': { transform: 'translate(1%, -1%)' },
        },
      },
      backgroundImage: {
        'radial-cyan': 'radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(180deg, #080A0F 0%, #0D1117 50%, #080A0F 100%)',
      },
    },
  },
  plugins: [],
}
