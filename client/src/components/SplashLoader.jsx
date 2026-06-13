import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * SplashLoader — full-screen first-paint loader. Sits on top of the app via a
 * portal-like z-index 100 layer. Waits for window.load (or 1200ms) + a small
 * exit animation before unmounting.
 */
export default function SplashLoader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1200)
      setProgress(Math.round(70 + t * 30))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const minTime = new Promise((r) => setTimeout(r, reduce ? 0 : 900))
    const onLoad = new Promise((r) => {
      if (document.readyState === 'complete') r()
      else window.addEventListener('load', r, { once: true })
    })

    Promise.all([minTime, onLoad]).then(() => setVisible(false))

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] text-white"
        >
          {/* Background */}
          <div className="absolute inset-0 aurora-bg opacity-50" />
          <div className="absolute inset-0 grid-overlay-fine" />

          {/* V monogram with rotating gradient ring */}
          <div className="relative mb-8">
            <motion.div
              className="absolute -inset-3 rounded-2xl"
              style={{
                background: 'conic-gradient(from 0deg, #22d3ee, #a855f7, #ec4899, #22d3ee)',
                filter: 'blur(20px)',
                opacity: 0.7,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#030712] border border-white/10 flex items-center justify-center shadow-glow-cyan">
              <span className="font-display font-black text-5xl sm:text-6xl gradient-text-static">V</span>
            </div>
          </div>

          {/* Wordmark */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-display font-black text-2xl sm:text-3xl tracking-wide mb-2"
          >
            <span className="gradient-text">Team VioLencE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-xs sm:text-sm text-gray-400 uppercase tracking-[0.4em] mb-10"
          >
            Esports
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 sm:w-64 h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-glow-cyan"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <p className="mt-3 text-[10px] text-gray-500 font-mono tracking-widest">LOADING · {progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
