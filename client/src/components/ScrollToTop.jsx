import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scroll to top on route change
export default function ScrollToTop({ behavior = 'smooth' }) {
  const location = useLocation()

  useEffect(() => {
    // Use requestAnimationFrame to ensure after route render
    const id = requestAnimationFrame(() => {
      try {
        window.scrollTo({ top: 0, behavior })
      } catch {
        // Fallback for older browsers
        window.scrollTo(0, 0)
      }
    })
    return () => cancelAnimationFrame(id)
  }, [location.pathname, location.search])

  return null
}
