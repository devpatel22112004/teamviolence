import { forwardRef, useId, useState } from 'react'

/**
 * Input — premium text input with floating label and focus glow.
 * Variants: text, email, password, tel, textarea.
 * Pass `iconLeft` to render an icon inside the input on the left.
 */
const Input = forwardRef(function Input(
  {
    as: Component = 'input',
    label,
    type = 'text',
    iconLeft: IconLeft,
    iconRight: IconRight,
    error,
    hint,
    className = '',
    inputClassName = '',
    id,
    value,
    onChange,
    ...rest
  },
  ref
) {
  const autoId = useId()
  const inputId = id || autoId
  const [focused, setFocused] = useState(false)
  const hasValue = value !== undefined && value !== null && String(value).length > 0
  const float = focused || hasValue

  const isTextarea = Component === 'textarea'
  const baseField = [
    'peer w-full bg-slate-900/40 text-white rounded-xl px-4 pt-5 pb-2 text-sm',
    'border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20',
    'outline-none transition-all placeholder-transparent',
    IconLeft ? 'pl-11' : '',
    IconRight ? 'pr-11' : '',
    error ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20' : '',
    isTextarea ? 'resize-y min-h-[120px]' : '',
    inputClassName,
  ].filter(Boolean).join(' ')

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      <div className="relative">
        {IconLeft && (
          <IconLeft className={[
            'absolute left-3 top-1/2 -translate-y-1/2 text-base pointer-events-none transition-colors',
            focused ? 'text-cyan-400' : 'text-gray-500',
            isTextarea ? 'top-4 -translate-y-0' : '',
          ].filter(Boolean).join(' ')} />
        )}
        <Component
          ref={ref}
          id={inputId}
          type={isTextarea ? undefined : type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={float || !label ? rest.placeholder || ' ' : ' '}
          className={baseField}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...rest}
        />
        {IconRight && (
          <IconRight className={[
            'absolute right-3 top-1/2 -translate-y-1/2 text-base pointer-events-none transition-colors',
            focused ? 'text-cyan-400' : 'text-gray-500',
            isTextarea ? 'top-4 -translate-y-0' : '',
          ].filter(Boolean).join(' ')} />
        )}
        {label && (
          <label
            htmlFor={inputId}
            className={[
              'absolute left-3 pointer-events-none transition-all duration-200 origin-left',
              IconLeft ? 'left-11' : '',
              isTextarea ? 'top-2.5' : 'top-1/2 -translate-y-1/2',
              float
                ? 'top-2 text-[10px] font-bold tracking-widest uppercase ' + (error ? 'text-red-400' : focused ? 'text-cyan-400' : 'text-gray-400')
                : 'text-sm text-gray-500',
            ].filter(Boolean).join(' ')}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-400 font-semibold">{error}</p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  )
})

export default Input
