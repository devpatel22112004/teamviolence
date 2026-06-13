import { forwardRef } from 'react'

/**
 * Section — a top-level page section wrapper. Adds an optional aurora background,
 * grid overlay, and consistent vertical padding. Use `contained` for max-width centering.
 */
const Section = forwardRef(function Section(
  {
    as: Component = 'section',
    aurora = false,
    gridOverlay = false,
    contained = true,
    className = '',
    children,
    id,
    ...rest
  },
  ref
) {
  const cls = [
    'relative',
    aurora ? 'aurora-bg' : '',
    'py-16 sm:py-20 lg:py-24',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Component ref={ref} id={id} className={cls} {...rest}>
      {gridOverlay && <div className="absolute inset-0 grid-overlay pointer-events-none" />}
      {contained ? (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        <div className="relative">{children}</div>
      )}
    </Component>
  )
})

export default Section
