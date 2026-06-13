/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — premium esports neon
        brand: {
          cyan:    '#22d3ee',
          'cyan-soft': '#67e8f9',
          violet:  '#a855f7',
          magenta: '#ec4899',
          lime:    '#a3e635',
          amber:   '#fbbf24',
        },
        // Surfaces
        surface: {
          0:   '#030712', // page base
          1:   '#0b1220', // panels
          2:   '#111827', // raised
          3:   '#1f2937', // hover
        },
        // Border tints
        line: {
          subtle: 'rgba(255,255,255,0.08)',
          glow:   'rgba(34,211,238,0.40)',
        },
        // Existing tokens preserved
        primary: {
          50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
          400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
          800: '#075985', 900: '#0c4a6e',
        },
        accent: {
          50: '#fef3c7', 100: '#fde68a', 200: '#fcd34d', 300: '#fbbf24',
          400: '#f59e0b', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#92400e', 900: '#78350f',
        },
        dark: {
          50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db',
          400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151',
          800: '#1f2937', 900: '#111827', 950: '#030712',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Montserrat', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Display scale for hero / marketing
        'display-1': ['clamp(2.75rem, 6vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-2': ['clamp(2.25rem, 4.5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-3': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      boxShadow: {
        'glow-cyan':    '0 0 40px -8px rgba(34,211,238,0.55), 0 8px 32px -12px rgba(34,211,238,0.35)',
        'glow-violet':  '0 0 40px -8px rgba(168,85,247,0.55), 0 8px 32px -12px rgba(168,85,247,0.35)',
        'glow-magenta': '0 0 40px -8px rgba(236,72,153,0.55), 0 8px 32px -12px rgba(236,72,153,0.35)',
        'glow-amber':   '0 0 40px -8px rgba(251,191,36,0.55), 0 8px 32px -12px rgba(251,191,36,0.30)',
        'inner-glow':   'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)',
        'card':         '0 1px 2px rgba(0,0,0,0.4), 0 8px 32px -8px rgba(0,0,0,0.5)',
        'card-hover':   '0 1px 2px rgba(0,0,0,0.4), 0 24px 48px -12px rgba(34,211,238,0.18)',
      },
      backgroundImage: {
        'mesh-aurora': 'radial-gradient(at 20% 20%, rgba(34,211,238,0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(168,85,247,0.18) 0px, transparent 50%), radial-gradient(at 0% 80%, rgba(236,72,153,0.15) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(34,211,238,0.12) 0px, transparent 50%)',
        'noise': "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")",
        'grid-overlay': "url(\"data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'><path d='M0 0H40M0 0V40' stroke='rgba(255,255,255,0.04)' stroke-width='1'/></svg>\")",
        'grid-fine': "url(\"data:image/svg+xml;utf8,<svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M0 0H24M0 0V24' stroke='rgba(34,211,238,0.06)' stroke-width='1'/></svg>\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'aurora-shift': 'auroraShift 18s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'border-spin': 'borderSpin 4s linear infinite',
        'float-y': 'floatY 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'shimmer-sweep': 'shimmerSweep 2.5s linear infinite',
        'gradient-pan': 'gradientPan 8s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(239, 68, 68, 0.8)' },
        },
        auroraShift: {
          '0%, 100%': { backgroundPosition: '0% 50%, 50% 0%, 100% 100%, 0% 50%' },
          '50%':      { backgroundPosition: '50% 0%, 100% 100%, 0% 50%, 50% 0%' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        borderSpin: {
          '0%':   { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        shimmerSweep: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientPan: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
