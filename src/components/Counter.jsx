import { useCountUp } from '../hooks/useCountUp'

const format = new Intl.NumberFormat('es-CO')

/** Cifra que cuenta hacia arriba al entrar en pantalla. */
export default function Counter({ to, prefix = '', suffix = '', className = '' }) {
  const { ref, value } = useCountUp(to)

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {format.format(Math.round(value))}
      {suffix}
    </span>
  )
}
