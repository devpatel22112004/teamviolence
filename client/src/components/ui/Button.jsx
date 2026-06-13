import { forwardRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Button — typed premium button with variants: primary, secondary, ghost, danger, glass.
 * Drop-in replacement for the bare .btn-* classes. Renders a <button> by default, or
 * any element via the `as` prop. Forwards refs.
 */
const variants = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
  danger:    'btn-danger',
  glass:     'btn-secondary',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-4 text-lg rounded-2xl',
}

const Button = forwardRef(function Button(
  {
    as: Component = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    iconLeft,
    iconRight,
    fullWidth = false,
    loading = false,
    disabled,
    ...rest
  },
  ref
) {
  const base = variants[variant] || variants.primary
  const sz   = sizes[size] || sizes.md
  const cls  = [
    base,
    sz,
    fullWidth ? 'w-full' : '',
    (disabled || loading) ? 'opacity-60 pointer-events-none' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Component ref={ref} className={cls} disabled={disabled || loading} {...rest}>
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      ) : iconLeft}
      <span>{children}</span>
      {iconRight}
    </Component>
  )
})

export default Button
export { motion }
