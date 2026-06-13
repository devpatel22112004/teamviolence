import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal — returns a ref to attach to an element. Adds an `isVisible`
 * state that flips to true once the element enters the viewport. Use with
 * framer-motion's `whileInView`, or use the returned `isVisible` directly.
 *
 *   const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })
 */
export default function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -50px 0px', once = true } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Reduced motion: treat as visible immediately
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}
