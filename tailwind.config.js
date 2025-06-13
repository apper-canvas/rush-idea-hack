/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00FFFF',
        secondary: '#FF00FF',
        accent: '#FFFF00',
        surface: '#1a1a2e',
        background: '#0a0a0f',
        success: '#00FF88',
        warning: '#FF8800',
        error: '#FF0044',
        info: '#00AAFF'
      },
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        mono: ['Space Mono', 'monospace']
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'screen-shake': 'screen-shake 0.5s ease-in-out',
        'particle-float': 'particle-float 1s ease-out forwards'
      },
      keyframes: {
        'glow-pulse': {
          '0%': { filter: 'drop-shadow(0 0 5px currentColor)' },
          '100%': { filter: 'drop-shadow(0 0 20px currentColor)' }
        },
        'screen-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
        },
        'particle-float': {
          '0%': { opacity: 1, transform: 'scale(1) translateY(0)' },
          '100%': { opacity: 0, transform: 'scale(0) translateY(-50px)' }
        }
      }
    },
  },
  plugins: [],
}