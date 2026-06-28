import { useState, useEffect } from 'react'
import { FaClock } from 'react-icons/fa'

const getRemaining = (target) => {
  const diff = new Date(target).getTime() - Date.now()
  if (isNaN(diff)) return null
  if (diff <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    done: false,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const pad = (n) => String(n).padStart(2, '0')

// Live countdown to a tournament date. `compact` renders an inline pill.
const Countdown = ({ date, compact = false, className = '' }) => {
  const [t, setT] = useState(() => getRemaining(date))

  useEffect(() => {
    setT(getRemaining(date))
    const id = setInterval(() => setT(getRemaining(date)), 1000)
    return () => clearInterval(id)
  }, [date])

  if (!t) return null

  if (t.done) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-bold text-accent-400 ${className}`}>
        <FaClock /> Started
      </span>
    )
  }

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-bold text-primary-300 ${className}`}>
        <FaClock className="text-primary-400" />
        {t.days > 0 && `${t.days}d `}
        {pad(t.hours)}:{pad(t.minutes)}:{pad(t.seconds)}
      </span>
    )
  }

  const Box = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="min-w-[2.75rem] px-2 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/30 text-lg sm:text-xl font-display font-black text-[color:var(--text-main)] tabular-nums">
        {pad(value)}
      </div>
      <span className="mt-1 text-[10px] uppercase tracking-wider text-[color:var(--text-muted)]">{label}</span>
    </div>
  )

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <Box value={t.days} label="Days" />
      <Box value={t.hours} label="Hrs" />
      <Box value={t.minutes} label="Min" />
      <Box value={t.seconds} label="Sec" />
    </div>
  )
}

export default Countdown
