import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

/**
 * Card — flexible container with variants: glass, premium, glow, outline, conic.
 * - variant="conic" gives you the rotating-gradient border.
 * - hoverLift adds a small translateY on hover.
 * - as lets you choose the root element.
 */
const variants = {
  glass:   'glass rounded-2xl',
  premium: 'card-premium',
  glow:    'card-glow',
  outline: 'card-outline',
  conic:   'card-conic',
  plain:   'rounded-2xl',
}

const Card = forwardRef(function Card(
  {
    as: Component = 'div',
    variant = 'premium',
    hoverLift = false,
    className = '',
    children,
    ...rest
  },
  ref
) {
  const base = variants[variant] || variants.premium
  const cls  = [
    base,
    hoverLift ? 'transition-all duration-300 hover:-translate-y-1' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Component ref={ref} className={cls} {...rest}>
      {children}
    </Component>
  )
})

/** Motion-wrapped card that animates on scroll-into-view. Respects prefers-reduced-motion. */
export function MotionCard({ children, className = '', delay = 0, ...rest }) {
  const reduce = useReducedMotion()
  if (reduce) {
    return <div className={className} {...rest}>{children}</div>
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default Card
