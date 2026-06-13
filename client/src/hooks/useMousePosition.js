import { useEffect, useState } from 'react'

/**
 * useMousePosition — returns the current mouse position normalized to
 * (-1, -1) → (1, 1) inside the viewport. Used for parallax/glow effects.
 *
 * Returns { x, y, nx, ny } where x/y are px from top-left, and nx/ny are
 * normalized to the viewport center.
 */
export default function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const handler = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      setPos({ x: e.clientX, y: e.clientY, nx, ny })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return pos
}
