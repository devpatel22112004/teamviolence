import { forwardRef } from 'react'
import LazyImage from '../LazyImage'

/**
 * Avatar — circular avatar with a gradient border ring, optional fallback initials,
 * and size presets. Pass `src` to show the image; otherwise it renders initials.
 */
const sizes = {
  xs: 'w-8 h-8 text-[10px]',
  sm: 'w-10 h-10 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-20 h-20 text-lg',
  '2xl': 'w-24 h-24 text-xl',
}

const rings = {
  none: '',
  cyan:   'p-[2px] bg-gradient-to-br from-cyan-400 to-cyan-600',
  violet: 'p-[2px] bg-gradient-to-br from-violet-400 to-violet-600',
  magenta:'p-[2px] bg-gradient-to-br from-pink-400 to-pink-600',
  aurora: 'p-[2px] bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500',
  warm:   'p-[2px] bg-gradient-to-br from-amber-400 to-pink-500',
}

const fallbackBg = {
  cyan:   'from-cyan-500 to-cyan-700',
  violet: 'from-violet-500 to-violet-700',
  magenta:'from-pink-500 to-pink-700',
  aurora: 'from-cyan-500 via-violet-500 to-pink-500',
  warm:   'from-amber-500 to-pink-500',
  dark:   'from-slate-700 to-slate-900',
}

function getInitials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(s => s[0] || '').join('').toUpperCase() || '?'
}

const Avatar = forwardRef(function Avatar(
  {
    src,
    alt = '',
    name = '',
    size = 'md',
    ring = 'aurora',
    fallbackTone = 'aurora',
    className = '',
    ...rest
  },
  ref
) {
  const sz   = sizes[size] || sizes.md
  const rng  = rings[ring] || rings.aurora
  const tone = fallbackBg[fallbackTone] || fallbackBg.aurora

  return (
    <div ref={ref} className={['relative inline-flex shrink-0 rounded-full', rng, className].filter(Boolean).join(' ')} {...rest}>
      <div className={['relative w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center', sz].join(' ')}>
        {src ? (
          <LazyImage
            src={src}
            alt={alt || name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className={['font-display font-black text-white bg-gradient-to-br', tone, 'w-full h-full flex items-center justify-center'].join(' ')}>
            {getInitials(name)}
          </span>
        )}
      </div>
    </div>
  )
})

export default Avatar
export { getInitials }
