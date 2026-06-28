import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Lightweight animated particle / glow field for hero + auth backgrounds.
// Pure CSS/Framer Motion — no canvas, no external deps.
const ParticleField = ({ count = 16, className = '' }) => {
  // Deterministic pseudo-random so layout is stable across renders (no Math.random in render path issues)
  const particles = useMemo(() => {
    const items = []
    for (let i = 0; i < count; i++) {
      const seed = (i * 9301 + 49297) % 233280
      const r = seed / 233280
      const r2 = ((i * 49297 + 9301) % 233280) / 233280
      const r3 = ((i * 12345 + 6789) % 233280) / 233280
      items.push({
        left: `${(r * 100).toFixed(2)}%`,
        top: `${(r2 * 100).toFixed(2)}%`,
        size: 2 + Math.round(r3 * 5),
        duration: 6 + (r * 8),
        delay: r2 * 5,
        magenta: i % 3 === 0,
      })
    }
    return items
  }, [count])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Floating glow orbs (kept to 2 for performance) */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-600/20 blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-24 w-72 h-72 rounded-full bg-accent-500/20 blur-3xl animate-float" style={{ animationDelay: '2.5s' }} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.6) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Twinkling particles */}
      {particles.map((pp, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${pp.magenta ? 'bg-accent-400' : 'bg-primary-300'}`}
          style={{ left: pp.left, top: pp.top, width: pp.size, height: pp.size }}
          animate={{ opacity: [0, 1, 0], y: [0, -30, 0] }}
          transition={{ duration: pp.duration, delay: pp.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default ParticleField
