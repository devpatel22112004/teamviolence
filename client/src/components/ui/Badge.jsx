import { forwardRef } from 'react'

const variants = {
  default:  'bg-white/5 text-gray-300 border border-white/10',
  cyan:     'bg-cyan-500/10   text-cyan-200    border border-cyan-500/30',
  violet:   'bg-violet-500/10 text-violet-200  border border-violet-500/30',
  magenta:  'bg-pink-500/10   text-pink-200    border border-pink-500/30',
  lime:     'bg-lime-500/10   text-lime-200    border border-lime-500/30',
  amber:    'bg-amber-500/10  text-amber-200   border border-amber-500/30',
  red:      'bg-red-500/10    text-red-200     border border-red-500/30',
  gradient: 'bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 text-white border border-white/10',
}

const sizes = {
  sm: 'px-2 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2',
}

const Badge = forwardRef(function Badge(
  {
    variant = 'default',
    size = 'md',
    icon: Icon,
    pulse = false,
    className = '',
    children,
    ...rest
  },
  ref
) {
  const v = variants[variant] || variants.default
  const s = sizes[size] || sizes.md
  const cls = [
    'inline-flex items-center rounded-full font-semibold tracking-wider uppercase whitespace-nowrap',
    v, s, className,
  ].filter(Boolean).join(' ')

  return (
    <span ref={ref} className={cls} {...rest}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {Icon && <Icon className="text-current" />}
      {children}
    </span>
  )
})

export default Badge
