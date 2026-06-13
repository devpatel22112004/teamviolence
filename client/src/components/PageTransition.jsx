import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * PageTransition — wraps page content and animates fade+slide on route change.
 * Respects prefers-reduced-motion: if the user has it set, we skip the
 * motion entirely and just swap the content.
 */
export default function PageTransition({ children }) {
  const location = useLocation()
  const scrollY = useRef(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    // Reset scroll on route change (in addition to ScrollToTop)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  if (reduce) {
    return <div className="w-full">{children}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
