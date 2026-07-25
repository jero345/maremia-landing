import { useReveal } from '../hooks/useReveal'

/**
 * Envoltura de aparición al hacer scroll.
 * `as` conserva la semántica del HTML y `variant` elige la dirección del movimiento
 * (up · down · left · right · scale · blur · clip).
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  variant = 'up',
  threshold,
  className = '',
  style,
  children,
  ...rest
}) {
  const { ref, props } = useReveal({ delay, variant, threshold })

  return (
    <Tag
      ref={ref}
      className={className}
      {...props}
      style={{ ...props.style, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
