import { useEffect, useRef, useState } from 'react'
import { motionOk } from '../lib/motion'

/**
 * Revela un elemento al entrar en viewport.
 * Devuelve los atributos `data-*` que activan las transiciones definidas en index.css.
 * Con `prefers-reduced-motion` el contenido aparece de inmediato (nunca queda oculto).
 */
export function useReveal({ threshold = 0.15, delay = 0, variant = 'up' } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(() => !motionOk())

  useEffect(() => {
    if (shown) return
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, shown])

  return {
    ref,
    props: {
      'data-reveal': variant,
      'data-shown': shown ? 'true' : 'false',
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
  }
}
