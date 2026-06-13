import { useEffect, useState } from 'react'

/**
 * useReducedMotion — single source of truth for prefers-reduced-motion.
 * Returns true when the user has reduced motion enabled at the OS level.
 *
 * SSR-safe: returns false on the server, then hydrates on mount.
 * Listens to media-query changes so toggling the OS setting live updates.
 */
export default function useReducedMotion() {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const handler = (e) => setReduce(e.matches)
    // Older Safari uses addListener; new API is addEventListener
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else mq.addListener(handler)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else mq.removeListener(handler)
    }
  }, [])

  return reduce
}
